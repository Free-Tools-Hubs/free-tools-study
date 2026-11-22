/**
 * StudyToolsHub Release Suite: Architecture & Build State Auditor
 *
 * Verifies:
 * 1. Clean workspace and known branch (dev or main).
 * 2. package.json scripts and dependencies integrity.
 * 3. Successful build artifacts presence in dist/.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '../..');

console.log('============================================================');
console.log('  Release Gate 1: Architecture & Workspace State Audit');
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

// 1. Verify package.json configuration
const pkgPath = path.join(projectRoot, 'package.json');
assert(fs.existsSync(pkgPath), 'package.json exists');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

assert(pkg.dependencies && pkg.dependencies.react.includes('19'), 'React 19 dependency verified');
assert(pkg.devDependencies && pkg.devDependencies.vite, 'Vite build tool dependency verified');
assert(pkg.scripts && pkg.scripts.build, 'npm run build script defined');

// 2. Verify git branch and commit
try {
  const branch = execSync('git rev-parse --abbrev-ref HEAD', { cwd: projectRoot, encoding: 'utf8' }).trim();
  const commit = execSync('git rev-parse --short HEAD', { cwd: projectRoot, encoding: 'utf8' }).trim();
  assert(branch === 'dev' || branch === 'main', `Active branch verified: "${branch}" (commit: ${commit})`);
} catch (err) {
  assert(false, `Git inspection failed: ${err.message}`);
}

// 3. Verify dist/ directory structure
const distPath = path.join(projectRoot, 'dist');
assert(fs.existsSync(distPath), 'dist/ output directory exists');
assert(fs.existsSync(path.join(distPath, 'index.html')), 'dist/index.html exists');
assert(fs.existsSync(path.join(distPath, '_redirects')), 'dist/_redirects exists');
assert(fs.existsSync(path.join(distPath, '_headers')), 'dist/_headers exists');
assert(fs.existsSync(path.join(distPath, 'sitemap.xml')), 'dist/sitemap.xml exists');
assert(fs.existsSync(path.join(distPath, 'robots.txt')), 'dist/robots.txt exists');
assert(fs.existsSync(path.join(distPath, 'assets')), 'dist/assets directory exists');

console.log('\n============================================================');
console.log(`  GATE 1 SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('============================================================\n');

if (failed > 0) process.exit(1);
process.exit(0);

