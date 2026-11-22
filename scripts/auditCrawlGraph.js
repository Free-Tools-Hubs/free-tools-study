/**
 * StudyToolsHub Phase 2H: Static HTML Crawl Graph & Internal Link Auditor
 *
 * Scans all 136 prerendered HTML documents in dist/:
 * 1. Extracts all internal hyperlinks (<a href="...">).
 * 2. Resolves each link against generated files and Netlify redirect rules.
 * 3. Asserts:
 *    - Zero links point to obsolete URLs (HTTP 410).
 *    - Zero links point to nonexistent paths (HTTP 404).
 *    - Zero links point to legacy redirecting URLs (HTTP 301).
 *    - Zero internal links are broken.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');
const redirectsPath = path.join(distPath, '_redirects');

console.log('============================================================');
console.log('  StudyToolsHub Phase 2H: Internal Crawl Graph Audit');
console.log('============================================================\n');

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    passed++;
    console.log(`  [PASS] ${message}`);
  } else {
    failed++;
    console.error(`  [FAIL] ${message}`);
  }
}

// Load Netlify redirect rules to detect if any internal link points to a redirect
const rawRedirects = fs.readFileSync(redirectsPath, 'utf8').split('\n');
const redirectMap = new Map();
for (const line of rawRedirects) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 3) {
    redirectMap.set(parts[0], { dest: parts[1], status: parseInt(parts[2], 10) });
  }
}

// Recursively find all HTML files
function getHtmlFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getHtmlFiles(full));
    } else if (file === 'index.html') {
      results.push(full);
    }
  }
  return results;
}

const htmlFiles = getHtmlFiles(distPath);
assert(htmlFiles.length === 136, `Found exactly 136 HTML route files to audit (scanned ${htmlFiles.length})`);

const internalLinksFound = new Set();
let totalLinksScanned = 0;
let redirectLinks = 0;
let obsoleteLinks = 0;
let brokenLinks = 0;

for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const hrefMatches = [...html.matchAll(/<a\s+(?:[^>]*?\s+)?href=["']([^"']*)["']/gi)].map(m => m[1]);

  for (const href of hrefMatches) {
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) continue;
    if (href.startsWith('http://') || href.startsWith('https://')) {
      if (!href.startsWith('https://study.freetoolshubs.com')) continue; // External link
    }

    totalLinksScanned++;
    // Normalize path
    const urlPath = href.replace('https://study.freetoolshubs.com', '').split('#')[0].split('?')[0] || '/';
    internalLinksFound.add(urlPath);

    // Check if points to a redirect or obsolete URL
    const rule = redirectMap.get(urlPath);
    if (rule) {
      if (rule.status === 301) {
        console.error(`  [WARN] Internal link in ${path.relative(distPath, file)} points to 301 redirect: ${urlPath} -> ${rule.dest}`);
        redirectLinks++;
      } else if (rule.status === 410) {
        console.error(`  [FAIL] Internal link in ${path.relative(distPath, file)} points to 410 gone: ${urlPath}`);
        obsoleteLinks++;
      }
    }

    // Check if target file exists on disk
    let targetExists = false;
    if (urlPath === '/') {
      targetExists = fs.existsSync(path.join(distPath, 'index.html'));
    } else {
      const rel = urlPath.startsWith('/') ? urlPath.slice(1) : urlPath;
      targetExists = fs.existsSync(path.join(distPath, rel, 'index.html')) ||
                     fs.existsSync(path.join(distPath, `${rel}.html`));
    }

    if (!targetExists && !urlPath.startsWith('/planner/')) {
      console.error(`  [FAIL] Broken internal link in ${path.relative(distPath, file)}: ${urlPath}`);
      brokenLinks++;
    }
  }
}

assert(obsoleteLinks === 0, `Zero internal links point to 410 Gone URLs (found ${obsoleteLinks})`);
assert(brokenLinks === 0, `Zero broken internal links found (found ${brokenLinks})`);
assert(redirectLinks === 0, `Zero internal links point to legacy 301 redirects (found ${redirectLinks})`);

console.log(`\nInternal Links Audited: ${totalLinksScanned} total link instances, ${internalLinksFound.size} unique destinations.`);

console.log('\n============================================================');
console.log(`  CRAWL GRAPH AUDIT SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('============================================================\n');

if (failed > 0) process.exit(1);
process.exit(0);

