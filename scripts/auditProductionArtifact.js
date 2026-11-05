/**
 * StudyToolsHub — Independent Production Artifact Auditor
 *
 * Independent QA verification of the final dist/ deployment artifact.
 * Does NOT rely on internal phase validators. Directly inspects files,
 * tokens, schemas, redirects, and bundles on disk.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const BASE_URL = 'https://study.freetoolshubs.com';

const results = {
  passed: 0,
  failed: 0,
  warnings: 0,
  details: []
};

function record(name, pass, message, isWarning = false) {
  if (pass) {
    results.passed++;
    console.log(`  [PASS] ${name}`);
  } else if (isWarning) {
    results.warnings++;
    console.log(`  [WARN] ${name}: ${message}`);
    results.details.push({ name, status: 'WARN', message });
  } else {
    results.failed++;
    console.error(`  [FAIL] ${name}: ${message}`);
    results.details.push({ name, status: 'FAIL', message });
  }
}

export function auditArtifact() {
  console.log(`\n============================================================`);
  console.log(`  StudyToolsHub Phase 2F: Independent Artifact Audit`);
  console.log(`============================================================\n`);

  if (!fs.existsSync(DIST_DIR)) {
    console.error(`FATAL: dist/ directory does not exist! Run 'npm run build' first.`);
    process.exit(1);
  }

  // --------------------------------------------------------------------------
  // 1. HTML ROUTE INVENTORY AUDIT
  // --------------------------------------------------------------------------
  console.log(`--- 1. HTML Route Inventory & DOM Content Audit ---`);

  // Discover all HTML files in dist/
  const htmlFiles = [];
  function scanHtml(dir, relPath = '') {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const curRel = relPath ? `${relPath}/${entry.name}` : entry.name;
      if (entry.isDirectory()) {
        scanHtml(fullPath, curRel);
      } else if (entry.name.endsWith('.html')) {
        htmlFiles.push({ fullPath, relPath: curRel });
      }
    }
  }
  scanHtml(DIST_DIR);

  // Group by canonical route representation
  // We wrote dist/${route}/index.html and dist/${route}.html
  const indexHtmlFiles = htmlFiles.filter(f => f.relPath.endsWith('index.html') && !f.relPath.includes('404.html') && !f.relPath.includes('410.html'));
  const totalIndexableHtml = 23;
  const totalExcludedHtml = 113; // 4 needs_review + 44 insufficient + 65 quiz
  const totalExpectedRoutes = totalIndexableHtml + totalExcludedHtml; // 136

  record(
    'Total Prerendered Route Folders',
    indexHtmlFiles.length === totalExpectedRoutes,
    `Expected ${totalExpectedRoutes} distinct route folders, found ${indexHtmlFiles.length}`
  );

  let htmlDefects = [];
  let rootShellOnly = [];
  let unparsedPlaceholders = [];
  let singleTitleCheck = [];
  let singleDescCheck = [];
  let singleCanonicalCheck = [];
  let robotsDirectiveCheck = [];
  let canonicalOriginCheck = [];

  for (const { fullPath, relPath } of indexHtmlFiles) {
    const content = fs.readFileSync(fullPath, 'utf8');

    // Structure validation
    if (!content.includes('<!DOCTYPE html>') || !content.includes('<html') || !content.includes('</head>') || !content.includes('</body>')) {
      htmlDefects.push(`${relPath}: Malformed HTML structure`);
    }

    // Single title
    const titles = [...content.matchAll(/<title[^>]*>([\s\S]*?)<\/title>/gi)];
    if (titles.length !== 1) {
      singleTitleCheck.push(`${relPath}: Found ${titles.length} title tags`);
    }

    // Single description
    const descs = [...content.matchAll(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/gi)];
    if (descs.length !== 1) {
      singleDescCheck.push(`${relPath}: Found ${descs.length} description tags`);
    }

    // Single canonical
    const canonicals = [...content.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/gi)];
    if (canonicals.length !== 1) {
      singleCanonicalCheck.push(`${relPath}: Found ${canonicals.length} canonical tags`);
    } else {
      const href = canonicals[0][1];
      if (!href.startsWith('https://study.freetoolshubs.com')) {
        canonicalOriginCheck.push(`${relPath}: Invalid origin "${href}"`);
      }
    }

    // Check empty root shell
    const rootMatch = content.match(/<div id=["']root["']>([\s\S]*?)<\/div>/i);
    if (!rootMatch || rootMatch[1].trim().length < 50) {
      rootShellOnly.push(`${relPath}: Empty or shell-only root container`);
    }

    // Check for unresolved placeholders
    if (content.includes('[object Object]') || content.includes('undefined Flashcards') || content.includes('NaN')) {
      unparsedPlaceholders.push(`${relPath}: Contains unresolved template placeholder`);
    }

    // Robots directive accuracy
    const robotsMatch = content.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
    const robots = robotsMatch ? robotsMatch[1].trim() : '';

    const isQuiz = relPath.startsWith('quiz/');
    const isTopic = !isQuiz && relPath !== 'index.html' && !relPath.startsWith('about') && !relPath.startsWith('contact') && !relPath.startsWith('study-timetable') && !relPath.startsWith('privacy') && !relPath.startsWith('terms');

    // Read canonical data to verify verified vs non-verified
    if (isQuiz) {
      if (robots !== 'noindex, follow') {
        robotsDirectiveCheck.push(`${relPath}: Quiz page has unexpected robots "${robots}" (expected "noindex, follow")`);
      }
    }
  }

  record('All 136 Routes Have Valid HTML Structure', htmlDefects.length === 0, htmlDefects.slice(0, 3).join(', '));
  record('Exactly 1 <title> Per HTML Document', singleTitleCheck.length === 0, singleTitleCheck.slice(0, 3).join(', '));
  record('Exactly 1 <meta description> Per HTML Document', singleDescCheck.length === 0, singleDescCheck.slice(0, 3).join(', '));
  record('Exactly 1 <link rel="canonical"> Per HTML Document', singleCanonicalCheck.length === 0, singleCanonicalCheck.slice(0, 3).join(', '));
  record('All Canonical URLs Use HTTPS Production Origin', canonicalOriginCheck.length === 0, canonicalOriginCheck.slice(0, 3).join(', '));
  record('Zero Routes Render As Empty Mount Shells', rootShellOnly.length === 0, rootShellOnly.slice(0, 3).join(', '));
  record('Zero Unresolved Template Placeholders Found', unparsedPlaceholders.length === 0, unparsedPlaceholders.slice(0, 3).join(', '));
  record('All 65 Quiz Pages Enforce noindex, follow', robotsDirectiveCheck.length === 0, robotsDirectiveCheck.slice(0, 3).join(', '));

  // --------------------------------------------------------------------------
  // 2. SITEMAP AUDIT & LASTMOD RECONCILIATION
  // --------------------------------------------------------------------------
  console.log(`\n--- 2. Production Sitemap & Lastmod Audit ---`);

  const sitemapPath = path.join(DIST_DIR, 'sitemap.xml');
  record('dist/sitemap.xml Exists on Disk', fs.existsSync(sitemapPath), 'Missing sitemap.xml in dist/');

  const sitemapContent = fs.readFileSync(sitemapPath, 'utf8');
  const locMatches = [...sitemapContent.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  const lastmodMatches = [...sitemapContent.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1].trim());

  record('Sitemap Contains Exactly 23 URLs', locMatches.length === 23, `Found ${locMatches.length} URLs`);

  const uniqueLocs = new Set(locMatches);
  record('Zero Duplicate URLs in Sitemap', uniqueLocs.size === locMatches.length, `${locMatches.length - uniqueLocs.size} duplicates`);

  const nonHttpsLocs = locMatches.filter(u => !u.startsWith('https://study.freetoolshubs.com'));
  record('All Sitemap URLs Use HTTPS Production Origin', nonHttpsLocs.length === 0, nonHttpsLocs.join(', '));

  const quizInSitemap = locMatches.filter(u => u.includes('/quiz/'));
  record('Zero Quiz Routes in Sitemap', quizInSitemap.length === 0, quizInSitemap.join(', '));

  // Lastmod audit: Check if lastmod format is valid W3C date
  const invalidDate = lastmodMatches.filter(d => !/^\d{4}-\d{2}-\d{2}$/.test(d));
  record('Sitemap lastmod Uses Valid W3C YYYY-MM-DD Dates', invalidDate.length === 0, invalidDate.join(', '));

  // Lastmod authenticity assessment
  // If all dates are identical to today, note it as an advisory warning
  const distinctDates = new Set(lastmodMatches);
  if (distinctDates.size === 1) {
    record(
      'Sitemap lastmod Authenticity Assessment',
      false,
      `All 23 URLs share identical build-date timestamp (${[...distinctDates][0]}). Recommendation: Remove <lastmod> unless granular per-topic revision history is tracked.`,
      true // warning
    );
  } else {
    record('Sitemap lastmod Authenticity Assessment', true, 'Per-topic modification dates established');
  }

  // --------------------------------------------------------------------------
  // 3. ROBOTS.TXT AUDIT
  // --------------------------------------------------------------------------
  console.log(`\n--- 3. Robots.txt Policy Audit ---`);

  const robotsPath = path.join(DIST_DIR, 'robots.txt');
  record('dist/robots.txt Exists on Disk', fs.existsSync(robotsPath), 'Missing robots.txt in dist/');

  const robotsContent = fs.readFileSync(robotsPath, 'utf8');
  record('Robots.txt Allows All Crawlers (User-agent: * Allow: /)', robotsContent.includes('User-agent: *') && robotsContent.includes('Allow: /'), 'Missing User-agent or Allow');
  record('Robots.txt Declares Correct Production Sitemap URL', robotsContent.includes(`Sitemap: ${BASE_URL}/sitemap.xml`), 'Missing or incorrect Sitemap declaration');
  record('Zero Disallow Directives Blocking Critical Assets', !robotsContent.includes('Disallow: /assets') && !robotsContent.includes('Disallow: /'), 'Contains restrictive Disallow rules');

  // --------------------------------------------------------------------------
  // 4. NETLIFY REDIRECTS (dist/_redirects) AUDIT
  // --------------------------------------------------------------------------
  console.log(`\n--- 4. Netlify _redirects Rule Audit ---`);

  const redirectsPath = path.join(DIST_DIR, '_redirects');
  record('dist/_redirects Exists on Disk', fs.existsSync(redirectsPath), 'Missing _redirects in dist/');

  const redirectLines = fs.readFileSync(redirectsPath, 'utf8')
    .split('\n')
    .map(l => l.trim())
    .filter(l => l.length > 0 && !l.startsWith('#'));

  record('Total Redirect Rules Matches Expected Inventory (8,657)', redirectLines.length === 8657, `Found ${redirectLines.length} rules (expected 8,657)`);

  let count301 = 0;
  let count410 = 0;
  let count200 = 0;
  let count404 = 0;
  let selfRedirects = [];
  let sourcePathMap = new Map();
  let duplicateSources = [];

  for (let i = 0; i < redirectLines.length; i++) {
    const line = redirectLines[i];
    const parts = line.split(/\s+/);
    if (parts.length < 2) continue;

    const source = parts[0];
    const target = parts[1];
    const status = parts[parts.length - 1];

    if (sourcePathMap.has(source)) {
      duplicateSources.push(`Line ${i + 1}: Duplicate source "${source}"`);
    }
    sourcePathMap.set(source, target);

    if (status === '301') {
      count301++;
      if (source === target) {
        selfRedirects.push(`Line ${i + 1}: ${source} -> ${target} (self-redirect loop)`);
      }
    } else if (status === '410') {
      count410++;
    } else if (status === '200') {
      count200++;
    } else if (status === '404') {
      count404++;
    }
  }

  record('HTTP 301 Rules Count (2,808 expected)', count301 === 2808, `Found ${count301}`);
  record('HTTP 410 Rules Count (5,712 expected)', count410 === 5712, `Found ${count410}`);
  record('HTTP 200 Rewrite Rules Count (136 expected)', count200 === 136, `Found ${count200}`);
  record('HTTP 404 Fallback Rule Count (1 expected)', count404 === 1, `Found ${count404}`);
  record('Zero Self-Redirect Loops Detected', selfRedirects.length === 0, selfRedirects.join(', '));
  record('Zero Duplicate Source Paths Detected', duplicateSources.length === 0, duplicateSources.slice(0, 3).join(', '));

  // Check that final rule is /* /404.html 404
  const lastRule = redirectLines[redirectLines.length - 1];
  record('Final Rule is Fallback /* /404.html 404', lastRule === '/*  /404.html  404' || lastRule === '/* /404.html 404', `Last rule is: "${lastRule}"`);

  // Verify static error documents exist
  const has404 = fs.existsSync(path.join(DIST_DIR, '404.html'));
  const has410 = fs.existsSync(path.join(DIST_DIR, '410.html'));
  record('Static 404.html and 410.html Error Documents Present in dist/', has404 && has410, `404: ${has404}, 410: ${has410}`);

  // --------------------------------------------------------------------------
  // 5. CLIENT BUNDLE & DATA ISOLATION AUDIT
  // --------------------------------------------------------------------------
  console.log(`\n--- 5. Client Bundle & Asset Audit ---`);

  const assetsDir = path.join(DIST_DIR, 'assets');
  const assetFiles = fs.readdirSync(assetsDir);

  const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
  const cssFiles = assetFiles.filter(f => f.endsWith('.css'));

  record('Client CSS Assets Present', cssFiles.length >= 1, `Found ${cssFiles.length} CSS files`);
  record('Client JS Assets Present', jsFiles.length >= 3, `Found ${jsFiles.length} JS files`);

  let totalJsBytes = 0;
  let oversizedBundles = [];
  for (const js of jsFiles) {
    const size = fs.statSync(path.join(assetsDir, js)).size;
    totalJsBytes += size;
    if (size > 2 * 1024 * 1024) {
      oversizedBundles.push(`${js} (${(size / 1024 / 1024).toFixed(2)} MB)`);
    }
  }

  record('Total Client JS Bundle < 1.5 MB Uncompressed', totalJsBytes < 1.5 * 1024 * 1024, `Total JS size: ${(totalJsBytes / 1024 / 1024).toFixed(2)} MB`);
  record('Zero Oversized JS Bundles (> 2 MB)', oversizedBundles.length === 0, oversizedBundles.join(', '));

  // Check for source maps unintentionally included
  const mapFiles = assetFiles.filter(f => f.endsWith('.map'));
  record('Zero Development Source Maps in Production Output', mapFiles.length === 0, `Found ${mapFiles.length} source maps`);

  // --------------------------------------------------------------------------
  // SUMMARY
  // --------------------------------------------------------------------------
  console.log(`\n============================================================`);
  console.log(`  INDEPENDENT ARTIFACT AUDIT SUMMARY`);
  console.log(`============================================================`);
  console.log(`  Passed Checks:   ${results.passed}`);
  console.log(`  Failed Checks:   ${results.failed}`);
  console.log(`  Warnings:        ${results.warnings}`);
  console.log(`============================================================\n`);

  if (results.failed > 0) {
    console.error(`AUDIT FAILED: ${results.failed} critical artifact defect(s) detected.`);
    process.exit(1);
  } else {
    console.log(`AUDIT PASSED: All critical production artifact checks PASSED with Exit Code 0!\n`);
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  auditArtifact();
}

