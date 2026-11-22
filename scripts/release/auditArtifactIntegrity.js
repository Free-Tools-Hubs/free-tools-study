/**
 * StudyToolsHub Release Suite: Artifact Manifest & Checksum Integrity Auditor
 *
 * Verifies:
 * 1. dist-manifest.json exists and is valid JSON.
 * 2. Every file listed in manifest exists in dist/ with exact byte size and SHA-256 match.
 * 3. Every file in dist/ is recorded in the manifest (zero untracked build artifacts).
 * 4. Total file count matches exactly 285 files.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const distPath = path.join(projectRoot, 'dist');
const manifestPath = path.join(projectRoot, 'dist-manifest.json');

console.log('============================================================');
console.log('  Release Gate 5: Artifact Manifest & Checksum Integrity Audit');
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

assert(fs.existsSync(manifestPath), 'dist-manifest.json exists');
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

assert(manifest.totalFiles === 285, `Manifest registers exactly 285 files (found ${manifest.totalFiles})`);

// 1. Verify every manifest file matches on disk
let checksumsMatch = true;
let sizesMatch = true;

for (const entry of manifest.files) {
  const fullPath = path.join(distPath, entry.path);
  if (!fs.existsSync(fullPath)) {
    console.error(`  [FAIL] Missing file on disk: dist/${entry.path}`);
    failed++;
    continue;
  }

  const buf = fs.readFileSync(fullPath);
  if (buf.length !== entry.sizeBytes) {
    console.error(`  [FAIL] Size mismatch: dist/${entry.path} (disk: ${buf.length}, manifest: ${entry.sizeBytes})`);
    sizesMatch = false;
  }

  const hash = crypto.createHash('sha256').update(buf).digest('hex');
  if (hash !== entry.sha256) {
    console.error(`  [FAIL] SHA-256 mismatch: dist/${entry.path}`);
    checksumsMatch = false;
  }
}

assert(sizesMatch, 'All 285 files match manifest byte sizes exactly');
assert(checksumsMatch, 'All 285 files match manifest SHA-256 checksums byte-for-byte');

// 2. Verify no untracked files in dist/
function getAllFiles(dir, baseDir = dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(getAllFiles(full, baseDir));
    } else {
      results.push(path.relative(baseDir, full).replace(/\\/g, '/'));
    }
  }
  return results;
}

const diskFiles = getAllFiles(distPath);
const manifestFileSet = new Set(manifest.files.map(f => f.path));

let untrackedCount = 0;
for (const df of diskFiles) {
  if (!manifestFileSet.has(df)) {
    console.error(`  [FAIL] Untracked file found in dist/: ${df}`);
    untrackedCount++;
  }
}

assert(untrackedCount === 0, `Zero untracked/orphan files in dist/ (scanned ${diskFiles.length} files)`);

console.log('\n============================================================');
console.log(`  GATE 5 SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('============================================================\n');

if (failed > 0) process.exit(1);
process.exit(0);

