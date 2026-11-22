/**
 * StudyToolsHub Phase 2G: Netlify Redirect & Header Configuration Auditor
 *
 * Verifies:
 * 1. dist/_headers contains required security headers, cache control, and MIME types.
 * 2. dist/_redirects contains exactly 8,657 valid, deterministic rules.
 * 3. Zero self-redirect loops and zero duplicate source paths in _redirects.
 * 4. Error documents (dist/404.html, dist/410.html) exist and are non-empty.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

console.log('============================================================');
console.log('  StudyToolsHub Phase 2G: Netlify Config & Routing Audit');
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

// 1. Audit _headers in dist/ and public/
console.log('--- 1. Netlify _headers Audit ---');
const distHeadersPath = path.join(projectRoot, 'dist', '_headers');
assert(fs.existsSync(distHeadersPath), 'dist/_headers exists');
const headersContent = fs.readFileSync(distHeadersPath, 'utf8');

assert(headersContent.includes('X-Frame-Options: DENY'), 'Security Header: X-Frame-Options declared');
assert(headersContent.includes('X-Content-Type-Options: nosniff'), 'Security Header: X-Content-Type-Options declared');
assert(headersContent.includes('Referrer-Policy: strict-origin-when-cross-origin'), 'Security Header: Referrer-Policy declared');
assert(headersContent.includes('Cache-Control: public, max-age=0, must-revalidate'), 'HTML Caching: max-age=0, must-revalidate declared');
assert(headersContent.includes('Cache-Control: public, max-age=31536000, immutable'), 'Asset Caching: immutable 1yr declared for /assets/*');
assert(headersContent.includes('Content-Type: application/xml; charset=utf-8'), 'MIME Type: XML declared for sitemap.xml');
assert(headersContent.includes('Content-Type: text/plain; charset=utf-8'), 'MIME Type: text/plain declared for robots.txt');

// 2. Audit _redirects in dist/
console.log('\n--- 2. Netlify _redirects Audit ---');
const distRedirectsPath = path.join(projectRoot, 'dist', '_redirects');
assert(fs.existsSync(distRedirectsPath), 'dist/_redirects exists');
const rawLines = fs.readFileSync(distRedirectsPath, 'utf8').split('\n');

const seenSources = new Set();
let count301 = 0;
let count410 = 0;
let count200 = 0;
let count404 = 0;
let loopsFound = 0;

for (const line of rawLines) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const parts = trimmed.split(/\s+/);
  if (parts.length >= 2) {
    const from = parts[0];
    const to = parts[1];
    const status = parts[2] ? parseInt(parts[2], 10) : 301;

    if (from === to) loopsFound++;
    if (seenSources.has(from)) {
      console.error(`  [FAIL] Duplicate source in _redirects: ${from}`);
      failedChecks++;
    } else {
      seenSources.add(from);
    }

    if (status === 301) count301++;
    else if (status === 410) count410++;
    else if (status === 200) count200++;
    else if (status === 404) count404++;
  }
}

assert(seenSources.size === 8657, `Total unique rules matches expected inventory (found ${seenSources.size})`);
assert(count301 === 2808, `HTTP 301 Permanent Redirects count matches (found ${count301}, expected 2808)`);
assert(count410 === 5712, `HTTP 410 Gone Rules count matches (found ${count410}, expected 5712)`);
assert(count200 === 136, `HTTP 200 Static Rewrites count matches (found ${count200}, expected 136)`);
assert(count404 === 1, `HTTP 404 Catch-All Fallback count matches (found ${count404}, expected 1)`);
assert(loopsFound === 0, `Zero self-redirect loops detected (found ${loopsFound})`);

// 3. Audit Error Documents in dist/
console.log('\n--- 3. Static Error Documents Audit ---');
const dist404 = path.join(projectRoot, 'dist', '404.html');
const dist410 = path.join(projectRoot, 'dist', '410.html');

assert(fs.existsSync(dist404) && fs.statSync(dist404).size > 1000, 'dist/404.html exists and contains valid document');
assert(fs.existsSync(dist410) && fs.statSync(dist410).size > 1000, 'dist/410.html exists and contains valid document');

console.log('\n============================================================');
console.log(`  AUDIT SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed`);
console.log('============================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('NETLIFY CONFIGURATION & ROUTING AUDIT PASSED WITH EXIT CODE 0.\n');
  process.exit(0);
}

