/**
 * StudyToolsHub Phase 2F: Deployment Artifact Manifest Generator
 *
 * Scans the built dist/ directory, computes SHA-256 checksums and exact
 * byte lengths for every file, and writes dist-manifest.json.
 */

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distDir = path.join(projectRoot, 'dist');
const manifestOutputPath = path.join(projectRoot, 'dist-manifest.json');

if (!fs.existsSync(distDir)) {
  console.error('FAIL: dist/ directory does not exist. Run build first.');
  process.exit(1);
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath);

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      getAllFiles(fullPath, arrayOfFiles);
    } else {
      arrayOfFiles.push(fullPath);
    }
  }

  return arrayOfFiles;
}

const allFilePaths = getAllFiles(distDir).sort();
const manifestEntries = [];
let totalBytes = 0;

for (const filePath of allFilePaths) {
  const relativePath = path.relative(distDir, filePath).replace(/\\/g, '/');
  const buffer = fs.readFileSync(filePath);
  const hash = crypto.createHash('sha256').update(buffer).digest('hex');
  const size = buffer.length;
  totalBytes += size;

  manifestEntries.push({
    path: relativePath,
    sizeBytes: size,
    sha256: hash
  });
}

const manifest = {
  generatedAt: new Date().toISOString(),
  totalFiles: manifestEntries.length,
  totalSizeBytes: totalBytes,
  totalSizeMB: (totalBytes / (1024 * 1024)).toFixed(2),
  files: manifestEntries
};

fs.writeFileSync(manifestOutputPath, JSON.stringify(manifest, null, 2), 'utf8');

console.log('============================================================');
console.log('  StudyToolsHub Phase 2F: Artifact Manifest Generated');
console.log('============================================================');
console.log(`  Total Files:    ${manifest.totalFiles}`);
console.log(`  Total Size:     ${manifest.totalSizeMB} MB (${totalBytes} bytes)`);
console.log(`  Manifest File:  ${manifestOutputPath}`);
console.log('============================================================\n');

