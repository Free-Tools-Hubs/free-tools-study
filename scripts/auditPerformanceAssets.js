/**
 * StudyToolsHub Phase 2G: Performance Assets & Compression Reconciliation Auditor
 *
 * Measures:
 * 1. Exact raw bytes, Gzip (level 6), and Brotli (quality 11) for all client assets.
 * 2. Reconciles the single-chunk vs total-bundle measurement discrepancy from Phase 2F.
 * 3. Enforces asset budget limits (< 1.5 MB uncompressed JS, < 300 KB gzipped JS).
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');
const assetsPath = path.join(distPath, 'assets');

console.log('============================================================');
console.log('  StudyToolsHub Phase 2G: Performance Assets Reconciliation');
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

function measureCompression(filePath) {
  const buf = fs.readFileSync(filePath);
  const raw = buf.length;
  const gz = zlib.gzipSync(buf, { level: 6 }).length;
  const br = zlib.brotliCompressSync(buf, {
    params: { [zlib.constants.BROTLI_PARAM_QUALITY]: 11 }
  }).length;
  return { raw, gz, br };
}

console.log('--- 1. Client Asset Breakdown (dist/assets/) ---');
const assetFiles = fs.readdirSync(assetsPath);
const assetData = [];
let totalJsRaw = 0;
let totalJsGz = 0;
let totalJsBr = 0;
let totalCssRaw = 0;
let totalCssGz = 0;
let totalCssBr = 0;
let studyDataMetrics = null;

for (const f of assetFiles) {
  const full = path.join(assetsPath, f);
  const m = measureCompression(full);
  const isJs = f.endsWith('.js');
  const isCss = f.endsWith('.css');

  if (isJs) {
    totalJsRaw += m.raw;
    totalJsGz += m.gz;
    totalJsBr += m.br;
    if (f.startsWith('study-data')) {
      studyDataMetrics = m;
    }
  } else if (isCss) {
    totalCssRaw += m.raw;
    totalCssGz += m.gz;
    totalCssBr += m.br;
  }

  assetData.push({
    file: f,
    type: isJs ? 'JavaScript' : isCss ? 'CSS' : 'Other',
    ...m
  });
}

console.table(assetData.map(a => ({
  'File': a.file,
  'Type': a.type,
  'Bytes': a.raw,
  'Decimal kB (1000B)': (a.raw / 1000).toFixed(1) + ' kB',
  'Gzip kB (1000B)': (a.gz / 1000).toFixed(1) + ' kB',
  'Gzip KiB (1024B)': (a.gz / 1024).toFixed(1) + ' KiB',
  'Brotli kB (1000B)': (a.br / 1000).toFixed(1) + ' kB'
})));

console.log('\n--- 2. Discrepancy Reconciliation Analysis ---');
assert(studyDataMetrics !== null, 'study-data-*.js chunk identified and measured');

const studyDataGzDecimal = (studyDataMetrics.gz / 1000).toFixed(1);
const studyDataBrDecimal = (studyDataMetrics.br / 1000).toFixed(1);
console.log(`  Study Data Chunk alone: ${studyDataGzDecimal} kB (Gzip decimal), ${studyDataBrDecimal} kB (Brotli decimal)`);

const totalJsGzDecimal = (totalJsGz / 1000).toFixed(1);
const totalJsBrDecimal = (totalJsBr / 1000).toFixed(1);
console.log(`  Total JS (all chunks):  ${totalJsGzDecimal} kB (Gzip decimal), ${totalJsBrDecimal} kB (Brotli decimal)`);

assert(
  studyDataGzDecimal === '90.1' || Math.abs(parseFloat(studyDataGzDecimal) - 90.1) <= 1.0,
  `Discrepancy resolved: 90.1 kB gzip represents study-data-*.js chunk ALONE (${studyDataMetrics.gz} bytes / 1000 = ${studyDataGzDecimal} kB)`
);
assert(
  Math.abs(parseFloat(totalJsGzDecimal) - 202.0) <= 6.0,
  `Discrepancy resolved: ~202 kB gzip represents ALL client JS chunks combined (${totalJsGz} bytes / 1000 = ${totalJsGzDecimal} kB)`
);

console.log('\n--- 3. Budget & Threshold Assertions ---');
assert(totalJsRaw < 1500 * 1024, `Total JS uncompressed (${(totalJsRaw / 1024).toFixed(1)} KiB) < 1.5 MB release budget`);
assert(totalJsGz < 300 * 1024, `Total JS Gzip (${(totalJsGz / 1024).toFixed(1)} KiB) < 300 KB wire budget`);
assert(totalCssRaw < 50 * 1024, `Total CSS uncompressed (${(totalCssRaw / 1024).toFixed(1)} KiB) < 50 KB budget`);

console.log('\n============================================================');
console.log(`  AUDIT SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed`);
console.log('============================================================\n');

if (failedChecks > 0) {
  process.exit(1);
} else {
  console.log('PERFORMANCE RECONCILIATION AUDIT PASSED WITH EXIT CODE 0.\n');
  process.exit(0);
}
