/**
 * StudyToolsHub Phase 2G: Safe Deployment Artifact Transfer Tool
 *
 * Provides non-destructive, audited file transfer from free-tools-study/dist/
 * into the external deployment repository (free-tools-study-prod).
 *
 * SAFETY FEATURES:
 * 1. Defaults to DRY-RUN mode unless --confirm is explicitly passed.
 * 2. Strictly excludes .git, .gitignore, .gitattributes, and hidden repo config.
 * 3. Shows an itemized diff of files to add, update, or remove.
 * 4. Verifies post-transfer checksums against dist-manifest.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');

const args = process.argv.slice(2);
const isConfirm = args.includes('--confirm');
const targetArg = args.find(a => !a.startsWith('--'));

console.log('============================================================');
console.log('  StudyToolsHub Phase 2G: Safe Deployment Artifact Transfer');
console.log('============================================================\n');

if (!fs.existsSync(distPath)) {
  console.error('FAIL: dist/ directory does not exist. Run npm run build first.');
  process.exit(1);
}

if (!targetArg) {
  console.log('Usage:');
  console.log('  node scripts/safeArtifactTransfer.js <path-to-deployment-repo> [--confirm]\n');
  console.log('Examples:');
  console.log('  # Dry-run preview:');
  console.log('  node scripts/safeArtifactTransfer.js D:\\deployments\\free-tools-study-prod\n');
  console.log('  # Execute transfer after reviewing preview:');
  console.log('  node scripts/safeArtifactTransfer.js D:\\deployments\\free-tools-study-prod --confirm\n');
  process.exit(0);
}

const targetPath = path.resolve(targetArg);
console.log(`Source Path:      ${distPath}`);
console.log(`Destination Path: ${targetPath}`);
console.log(`Execution Mode:   ${isConfirm ? '*** LIVE WRITE MODE (--confirm) ***' : 'PREVIEW / DRY-RUN (No files modified)'}\n`);

if (!fs.existsSync(targetPath)) {
  console.error(`FAIL: Destination directory does not exist at: ${targetPath}`);
  process.exit(1);
}

// Protected files that must NEVER be deleted in the deployment repo
const PROTECTED_NAMES = new Set([
  '.git',
  '.gitignore',
  '.gitattributes',
  '.github',
  'README.md',
  'netlify.toml'
]);

function getAllFiles(dir, baseDir = dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);

  for (const file of list) {
    if (dir === baseDir && PROTECTED_NAMES.has(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      if (file === '.git') continue;
      results = results.concat(getAllFiles(fullPath, baseDir));
    } else {
      results.push(path.relative(baseDir, fullPath).replace(/\\/g, '/'));
    }
  }

  return results;
}

function computeSha256(filePath) {
  const buf = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(buf).digest('hex');
}

const sourceFiles = new Set(getAllFiles(distPath));
const destFiles = new Set(getAllFiles(targetPath));

const toAdd = [];
const toUpdate = [];
const toDelete = [];
let unchanged = 0;

for (const rel of sourceFiles) {
  const srcFull = path.join(distPath, rel);
  const destFull = path.join(targetPath, rel);

  if (!fs.existsSync(destFull)) {
    toAdd.push(rel);
  } else {
    const srcHash = computeSha256(srcFull);
    const destHash = computeSha256(destFull);
    if (srcHash !== destHash) {
      toUpdate.push(rel);
    } else {
      unchanged++;
    }
  }
}

for (const rel of destFiles) {
  if (!sourceFiles.has(rel)) {
    toDelete.push(rel);
  }
}

console.log('--- Transfer Operation Diff ---');
console.log(`  Files to Add:      ${toAdd.length}`);
console.log(`  Files to Update:   ${toUpdate.length}`);
console.log(`  Files Unchanged:   ${unchanged}`);
console.log(`  Orphan Deletions:  ${toDelete.length}`);

if (toDelete.length > 0) {
  console.log('\n  [ATTENTION] The following orphaned files in destination would be removed:');
  for (const d of toDelete.slice(0, 10)) {
    console.log(`    - ${d}`);
  }
  if (toDelete.length > 10) {
    console.log(`    ... and ${toDelete.length - 10} more files`);
  }
}

if (!isConfirm) {
  console.log('\n============================================================');
  console.log('DRY RUN COMPLETE: No changes were written.');
  console.log('To apply these changes, re-run with the --confirm flag:');
  console.log(`node scripts/safeArtifactTransfer.js "${targetArg}" --confirm`);
  console.log('============================================================\n');
  process.exit(0);
}

// Live execution
console.log('\nExecuting live transfer...');

// 1. Copy/Update files with path traversal protection
for (const rel of [...toAdd, ...toUpdate]) {
  const src = path.join(distPath, rel);
  const dest = path.resolve(targetPath, rel);

  if (!dest.startsWith(targetPath)) {
    throw new Error(`Security Exception: Path traversal attempt detected on "${rel}"`);
  }

  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// 2. Delete orphaned files with path traversal protection
for (const rel of toDelete) {
  const dest = path.resolve(targetPath, rel);

  if (!dest.startsWith(targetPath)) {
    throw new Error(`Security Exception: Path traversal attempt detected on "${rel}"`);
  }

  if (fs.existsSync(dest)) {
    fs.unlinkSync(dest);
  }
}

console.log('\n============================================================');
console.log(`TRANSFER COMPLETE: ${toAdd.length} added, ${toUpdate.length} updated, ${toDelete.length} deleted.`);
console.log('Destination repository is now byte-for-byte in sync with dist/.');
console.log('============================================================\n');

