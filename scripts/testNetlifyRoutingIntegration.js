/**
 * StudyToolsHub Phase 2F: Netlify Routing In-Memory Integration Tester
 *
 * Simulates Netlify's redirects engine according to official Netlify documentation:
 * 1. Static files on disk are served directly by Netlify edge.
 * 2. _redirects rules are evaluated in top-down order for non-file requests or redirects.
 * 3. 301 redirects redirect to the destination URL.
 * 4. 410 rules serve /410.html with HTTP status 410 Gone.
 * 5. 200 rewrite rules map canonical SPA paths to /index.html with HTTP 200.
 * 6. The final catch-all rule maps any unknown path to /404.html with HTTP 404.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const redirectsPath = path.join(projectRoot, 'dist', '_redirects');
const manifestPath = path.join(projectRoot, 'src', 'data', 'legacyTopicUrlManifest.json');
const canonicalPath = path.join(projectRoot, 'src', 'data', 'canonicalStudyTopics.json');

console.log('============================================================');
console.log('  StudyToolsHub Phase 2F: Netlify Routing Engine Simulation');
console.log('============================================================\n');

if (!fs.existsSync(redirectsPath)) {
  console.error(`FAIL: ${redirectsPath} does not exist.`);
  process.exit(1);
}

const rawLines = fs.readFileSync(redirectsPath, 'utf8').split('\n');
const rules = [];

for (const line of rawLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const from = parts[0];
    const to = parts[1];
    const status = parts[2] ? parseInt(parts[2], 10) : 301;
    rules.push({ from, to, status });
  }
}

console.log(`Loaded ${rules.length} Netlify rules from dist/_redirects.`);

// Function to resolve request URL through Netlify redirect rule list
function resolveNetlifyRequest(requestPath) {
  // Normalize trailing slash and URL-encode spaces as an HTTP client would
  const normalized = (requestPath.endsWith('/') && requestPath.length > 1
    ? requestPath.slice(0, -1)
    : requestPath).replace(/\s+/g, '%20');

  for (const rule of rules) {
    if (rule.from === requestPath || rule.from === normalized) {
      return { matched: true, rule, status: rule.status, destination: rule.to };
    }
    // Wildcard / Splat rule check
    if (rule.from.endsWith('/*')) {
      const prefix = rule.from.slice(0, -2);
      if (normalized.startsWith(prefix) || rule.from === '/*') {
        return { matched: true, rule, status: rule.status, destination: rule.to };
      }
    }
    // Parameter rule check (e.g. /planner/:examType)
    if (rule.from.includes('/:')) {
      const prefix = rule.from.split('/:')[0];
      if (normalized.startsWith(`${prefix}/`)) {
        return { matched: true, rule, status: rule.status, destination: rule.to };
      }
    }
  }

  return { matched: false, status: 404, destination: '/404.html' };
}

let passedTests = 0;
let failedTests = 0;

function assertRoute(url, expectedStatus, expectedDestinationPattern, description) {
  const res = resolveNetlifyRequest(url);
  const statusMatch = res.status === expectedStatus;
  const destMatch = expectedDestinationPattern
    ? (expectedDestinationPattern instanceof RegExp
        ? expectedDestinationPattern.test(res.destination)
        : res.destination === expectedDestinationPattern)
    : true;

  if (statusMatch && destMatch) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`  [FAIL] ${description}`);
    console.error(`         URL: ${url}`);
    console.error(`         Expected: Status ${expectedStatus}, Dest: ${expectedDestinationPattern}`);
    console.error(`         Received: Status ${res.status}, Dest: ${res.destination}`);
  }
}

console.log('\n--- 1. Testing Core Navigation & Static Route Rules in _redirects (HTTP 200 Rewrite) ---');
assertRoute('/about', 200, '/index.html', 'About Page 200 Rewrite');
assertRoute('/contact', 200, '/index.html', 'Contact Page 200 Rewrite');
assertRoute('/privacy-policy', 200, '/index.html', 'Privacy Policy 200 Rewrite');
assertRoute('/terms-of-service', 200, '/index.html', 'Terms of Service 200 Rewrite');
assertRoute('/study-timetable-template', 200, '/index.html', 'Timetable Template 200 Rewrite');
assertRoute('/planner/gre', 200, '/index.html', 'Planner Parameterized Route 200 Rewrite');

console.log('\n--- 2. Testing Canonical Topic Route Rules in _redirects (HTTP 200 Rewrite) ---');
assertRoute('/biology-cell-biology', 200, '/index.html', 'Cell Biology Topic Rewrite');
assertRoute('/computer-science-algorithms', 200, '/index.html', 'Algorithms Topic Rewrite');
assertRoute('/physics-mechanics', 200, '/index.html', 'Physics Mechanics Topic Rewrite');
assertRoute('/quiz/biology-cell-biology', 200, '/index.html', 'Cell Biology Quiz Rewrite');
assertRoute('/quiz/computer-science-algorithms', 200, '/index.html', 'Algorithms Quiz Rewrite');
assertRoute('/quiz/physics-mechanics', 200, '/index.html', 'Physics Mechanics Quiz Rewrite');

console.log('\n--- 3. Testing Static HTML Disk Presence for All 136 Routes ---');
const distPath = path.join(projectRoot, 'dist');
const canonicalTopics = JSON.parse(fs.readFileSync(canonicalPath, 'utf8'));

// Verify root static HTML files
const staticHtmlPaths = [
  'index.html',
  'study-timetable-template/index.html',
  'about/index.html',
  'contact/index.html',
  'privacy-policy/index.html',
  'terms-of-service/index.html',
  '404.html',
  '410.html'
];
for (const rel of staticHtmlPaths) {
  const full = path.join(distPath, rel);
  if (fs.existsSync(full)) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`  [FAIL] Missing prerendered static file on disk: ${rel}`);
  }
}

// Verify topic static HTML files
for (const t of canonicalTopics) {
  const fcHtml = path.join(distPath, t.slug, 'index.html');
  const qzHtml = path.join(distPath, 'quiz', t.slug, 'index.html');
  if (fs.existsSync(fcHtml)) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`  [FAIL] Missing prerendered flashcard file: ${t.slug}/index.html`);
  }
  if (fs.existsSync(qzHtml)) {
    passedTests++;
  } else {
    failedTests++;
    console.error(`  [FAIL] Missing prerendered quiz file: quiz/${t.slug}/index.html`);
  }
}

console.log(`\n--- 4. Testing Legacy 301 Permanent Redirects ---`);
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

let legacy301SampleCount = 0;
for (const record of manifest.records) {
  if (record.disposition === 'redirect') {
    const rawFc = record.flashcardUrl.startsWith('/') ? record.flashcardUrl : `/${record.flashcardUrl}`;
    const rawQz = record.quizUrl.startsWith('/') ? record.quizUrl : `/${record.quizUrl}`;
    const targetFc = `/${record.canonicalSlug}`;
    const targetQz = `/quiz/${record.canonicalSlug}`;

    if (rawFc !== targetFc) {
      assertRoute(rawFc, 301, targetFc, `Legacy Flashcard 301: ${rawFc} -> ${targetFc}`);
      assertRoute(rawQz, 301, targetQz, `Legacy Quiz 301: ${rawQz} -> ${targetQz}`);
      legacy301SampleCount++;
      if (legacy301SampleCount >= 50) break; // Sample 50 pairs = 100 rules
    }
  }
}

console.log(`\n--- 5. Testing Obsolete 410 Gone URLs ---`);
let legacy410SampleCount = 0;
for (const record of manifest.records) {
  if (record.disposition === 'obsolete') {
    const rawFc = record.flashcardUrl.startsWith('/') ? record.flashcardUrl : `/${record.flashcardUrl}`;
    const rawQz = record.quizUrl.startsWith('/') ? record.quizUrl : `/${record.quizUrl}`;

    assertRoute(rawFc, 410, '/410.html', `Obsolete Flashcard 410: ${rawFc}`);
    assertRoute(rawQz, 410, '/410.html', `Obsolete Quiz 410: ${rawQz}`);
    legacy410SampleCount++;
    if (legacy410SampleCount >= 50) break; // Sample 50 pairs = 100 rules
  }
}

console.log('\n--- 6. Testing Non-Existent Unknown Paths (HTTP 404 Fallback) ---');
assertRoute('/non-existent-page-xyz', 404, '/404.html', 'Unknown Path 404 Fallback');
assertRoute('/random/sub/path', 404, '/404.html', 'Deep Unknown Path 404 Fallback');
assertRoute('/api/non-existent-endpoint', 404, '/404.html', 'Unknown API 404 Fallback');
assertRoute('/old-wp-admin/login.php', 404, '/404.html', 'Unknown Exploit Path 404 Fallback');

console.log('\n============================================================');
console.log(`  ROUTING INTEGRATION TEST SUMMARY: ${passedTests} Passed, ${failedTests} Failed`);
console.log('============================================================');

if (failedTests > 0) {
  process.exit(1);
} else {
  console.log('NETLIFY ROUTING SIMULATION COMPLETED SUCCESSFULLY WITH EXIT CODE 0.\n');
  process.exit(0);
}
