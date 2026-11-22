/**
 * StudyToolsHub Release Suite: Performance Assets & Compression Reconciliation Auditor
 */

import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');
const distPath = path.join(projectRoot, 'dist');
const assetsPath = path.join(distPath, 'assets');

console.log('============================================================');
console.log('  Release Gate 6: Performance Assets & Compression Audit');
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

const assetFiles = fs.readdirSync(assetsPath);
const assetData = [];
let totalJsRaw = 0;
let totalJsGz = 0;
let totalJsBr = 0;
let totalCssRaw = 0;
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
    if (f.startsWith('study-data')) studyDataMetrics = m;
  } else if (isCss) {
    totalCssRaw += m.raw;
  }

  assetData.push({
    file: f,
    type: isJs ? 'JavaScript' : isCss ? 'CSS' : 'Other',
    ...m
  });
}

assert(studyDataMetrics !== null, 'study-data-*.js chunk identified and measured');

const studyDataGzDecimal = (studyDataMetrics.gz / 1000).toFixed(1);
const totalJsGzDecimal = (totalJsGz / 1000).toFixed(1);

assert(
  Math.abs(parseFloat(studyDataGzDecimal) - 90.1) <= 1.0,
  `Discrepancy resolved: 90.1 kB gzip represents study-data-*.js chunk ALONE (${studyDataMetrics.gz}B / 1000 = ${studyDataGzDecimal} kB)`
);
assert(
  Math.abs(parseFloat(totalJsGzDecimal) - 202.0) <= 6.0,
  `Discrepancy resolved: ~202 kB gzip represents ALL client JS chunks combined (${totalJsGz}B / 1000 = ${totalJsGzDecimal} kB)`
);

assert(totalJsRaw < 1500 * 1024, `Total JS uncompressed (${(totalJsRaw / 1024).toFixed(1)} KiB) < 1.5 MB release budget`);
assert(totalJsGz < 300 * 1024, `Total JS Gzip (${(totalJsGz / 1024).toFixed(1)} KiB) < 300 KB wire budget`);
assert(totalCssRaw < 50 * 1024, `Total CSS uncompressed (${(totalCssRaw / 1024).toFixed(1)} KiB) < 50 KB budget`);

console.log('\n============================================================');
console.log(`  GATE 6 SUMMARY: ${passedChecks} Passed, ${failedChecks} Failed`);
console.log('============================================================\n');

if (failedChecks > 0) process.exit(1);
process.exit(0);

