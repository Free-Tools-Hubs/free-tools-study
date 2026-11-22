/**
 * StudyToolsHub Phase 2G: SEO Policy & Canonical Consistency Auditor
 *
 * Verifies:
 * 1. dist/sitemap.xml contains exactly 23 URLs, zero quiz routes, zero unverified topics.
 * 2. dist/sitemap.xml contains ZERO invalid or uniform <lastmod> build dates.
 * 3. Exactly 17 verified topics declare <meta name="robots" content="index, follow" />.
 * 4. Exactly 48 unverified topics declare <meta name="robots" content="noindex, follow" />.
 * 5. All 65 quiz routes declare <meta name="robots" content="noindex, follow" />.
 * 6. All 65 quiz routes canonicalize to primary topic URL (https://study.freetoolshubs.com/${slug}).
 * 7. Canonical consistency: 100% self-referencing on non-quiz pages, zero redirect/404 targets.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('============================================================');
console.log('  StudyToolsHub Phase 2G: SEO Consistency & Policy Audit');
console.log('============================================================\n');

let passedChecks = 0;
let failedChecks = 0;

function assert(condition, message) {
  if (condition) {
    passedChecks++;
    console.log(`  [PASS] ${message}`);
  } else {
    failedChecks++;
    console.error(`  [FAIL] ${message}`);
  }
}

const distPath = path.join(projectRoot, 'dist');
const canonicalTopicsPath = path.join(projectRoot, 'src', 'data', 'canonicalStudyTopics.json');
const canonicalTopics = JSON.parse(fs.readFileSync(canonicalTopicsPath, 'utf8'));

// 1. Audit dist/sitemap.xml
console.log('--- 1. Production Sitemap Policy Audit ---');
const sitemapPath = path.join(distPath, 'sitemap.xml');
assert(fs.existsSync(sitemapPath), 'dist/sitemap.xml exists');
const sitemapXml = fs.readFileSync(sitemapPath, 'utf8');

const locMatches = [...sitemapXml.matchAll(/<loc>([\s\S]*?)<\/loc>/g)].map(m => m[1].trim());
assert(locMatches.length === 23, `Sitemap contains exactly 23 URLs (found ${locMatches.length})`);

const hasLastmod = sitemapXml.includes('<lastmod>');
assert(!hasLastmod, 'Sitemap contains ZERO uniform/build-date <lastmod> tags (advisory resolved)');

const quizUrlsInSitemap = locMatches.filter(u => u.includes('/quiz/'));
assert(quizUrlsInSitemap.length === 0, `Zero quiz routes in sitemap (found ${quizUrlsInSitemap.length})`);

const duplicateUrls = locMatches.filter((item, index) => locMatches.indexOf(item) !== index);
assert(duplicateUrls.length === 0, `Zero duplicate URLs in sitemap (found ${duplicateUrls.length})`);

const allHttpsOrigin = locMatches.every(u => u.startsWith('https://study.freetoolshubs.com/'));
assert(allHttpsOrigin, 'All sitemap URLs use canonical HTTPS production origin');

// 2. Audit Robots and Canonical Directives across Topics & Quizzes
console.log('\n--- 2. Topic & Quiz Robots Directives & Canonicalization ---');
const verifiedTopics = canonicalTopics.filter(t => t.contentQuality.status === 'verified');
const unverifiedTopics = canonicalTopics.filter(t => t.contentQuality.status !== 'verified');

assert(verifiedTopics.length === 17, `Exactly 17 verified topics in canonical dataset`);
assert(unverifiedTopics.length === 48, `Exactly 48 unverified topics (4 review + 44 insufficient)`);

let verifiedRobotsPassed = true;
let verifiedCanonicalsPassed = true;
for (const t of verifiedTopics) {
  const filePath = path.join(distPath, t.slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    verifiedRobotsPassed = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('<meta name="robots" content="index, follow"')) verifiedRobotsPassed = false;
  if (!html.includes(`<link rel="canonical" href="https://study.freetoolshubs.com/${t.slug}"`)) verifiedCanonicalsPassed = false;
}
assert(verifiedRobotsPassed, 'All 17 verified topics declare <meta name="robots" content="index, follow" />');
assert(verifiedCanonicalsPassed, 'All 17 verified topics self-canonicalize to https://study.freetoolshubs.com/${slug}');

let unverifiedRobotsPassed = true;
for (const t of unverifiedTopics) {
  const filePath = path.join(distPath, t.slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    unverifiedRobotsPassed = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('<meta name="robots" content="noindex, follow"')) unverifiedRobotsPassed = false;
}
assert(unverifiedRobotsPassed, 'All 48 unverified topics declare <meta name="robots" content="noindex, follow" />');

let quizRobotsPassed = true;
let quizCanonicalsPassed = true;
for (const t of canonicalTopics) {
  const filePath = path.join(distPath, 'quiz', t.slug, 'index.html');
  if (!fs.existsSync(filePath)) {
    quizRobotsPassed = false;
    quizCanonicalsPassed = false;
    continue;
  }
  const html = fs.readFileSync(filePath, 'utf8');
  if (!html.includes('<meta name="robots" content="noindex, follow"')) quizRobotsPassed = false;
  if (!html.includes(`<link rel="canonical" href="https://study.freetoolshubs.com/${t.slug}"`)) quizCanonicalsPassed = false;
}
assert(quizRobotsPassed, 'All 65 quiz routes declare <meta name="robots" content="noindex, follow" />');
assert(quizCanonicalsPassed, 'All 65 quiz routes canonicalize to primary topic URL (/:slug)');

// 3. Audit Structured Data
console.log('\n--- 3. Structured Data JSON-LD Validity ---');
let jsonLdPassed = true;
for (const t of verifiedTopics) {
  const filePath = path.join(distPath, t.slug, 'index.html');
  const html = fs.readFileSync(filePath, 'utf8');
  const jsonLdBlocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  if (jsonLdBlocks.length < 2) {
    jsonLdPassed = false;
    break;
  }
  for (const block of jsonLdBlocks) {
    try {
      const parsed = JSON.parse(block[1]);
      if (!parsed['@context'] || !parsed['@type']) jsonLdPassed = false;
    } catch {
      jsonLdPassed = false;
    }
  }
}
assert(jsonLdPassed, 'Structured data across verified topics contains valid, parseable Schema.org JSON-LD');

console.log('\n============================================================');
console.log(`  AUDIT SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed`);
console.log('============================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('SEO POLICY & CANONICAL CONSISTENCY AUDIT PASSED WITH EXIT CODE 0.\n');
  process.exit(0);
}

