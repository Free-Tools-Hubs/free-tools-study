/**
 * StudyToolsHub Master Release Validation Runner
 *
 * Executes the complete 6-gate release regression suite:
 * Gate 1: auditReleaseArchitecture.js
 * Gate 2: auditReactRendering.js
 * Gate 3: auditSEOConsistency.js
 * Gate 4: auditNetlifyConfiguration.js
 * Gate 5: auditArtifactIntegrity.js
 * Gate 6: auditPerformanceAssets.js
 */

import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const nodeBinary = process.execPath;

const GATES = [
  { name: 'Gate 1: Release Architecture', script: 'auditReleaseArchitecture.js' },
  { name: 'Gate 2: React 19 Rendering & Hydration', script: 'auditReactRendering.js' },
  { name: 'Gate 3: SEO Policy & Canonical Consistency', script: 'auditSEOConsistency.js' },
  { name: 'Gate 4: Netlify Configuration & Routing', script: 'auditNetlifyConfiguration.js' },
  { name: 'Gate 5: Artifact Manifest & Checksum Integrity', script: 'auditArtifactIntegrity.js' },
  { name: 'Gate 6: Performance Assets & Compression', script: 'auditPerformanceAssets.js' }
];

console.log('========================================================================');
console.log('  StudyToolsHub Master Release Validation Suite (Phase 2G)');
console.log('========================================================================\n');

let allPassed = true;
const results = [];

for (const gate of GATES) {
  const scriptPath = path.join(__dirname, gate.script);
  console.log(`>>> Running ${gate.name} (${gate.script})...`);
  const startTime = Date.now();
  const res = spawnSync(nodeBinary, [scriptPath], { encoding: 'utf8', stdio: 'inherit' });
  const duration = ((Date.now() - startTime) / 1000).toFixed(2);

  const passed = res.status === 0;
  if (!passed) allPassed = false;

  results.push({
    gate: gate.name,
    script: gate.script,
    status: passed ? 'PASS' : 'FAIL',
    duration: `${duration}s`
  });
}

console.log('\n========================================================================');
console.log('  MASTER RELEASE VALIDATION SUITE SUMMARY');
console.log('========================================================================');
console.table(results);

if (allPassed) {
  console.log('\nSUCCESS: ALL 6 RELEASE VALIDATION GATES PASSED (EXIT CODE 0).\n');
  process.exit(0);
} else {
  console.error('\nFAILURE: ONE OR MORE RELEASE GATES FAILED. INSPECT LOGS ABOVE (EXIT CODE 1).\n');
  process.exit(1);
}

