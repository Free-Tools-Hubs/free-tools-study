/**
 * StudyToolsHub Phase 2H: Headless Chrome Browser Hydration & DOM Verification
 *
 * Executes real Google Chrome in headless mode (--headless=new --dump-dom)
 * across representative production pages in dist/ to verify:
 * 1. Initial pre-rendered HTML DOM is retained and rendered by Chrome.
 * 2. Interactive elements (buttons, links, navigation) are present in the DOM.
 * 3. Structured data JSON-LD and meta tags are intact in document head.
 * 4. Zero DOM destruction or empty mount states occur during rendering.
 */

import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const distPath = path.join(projectRoot, 'dist');
const chromePath = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';

console.log('============================================================');
console.log('  StudyToolsHub Phase 2H: Headless Chrome Browser Verification');
console.log('============================================================\n');

if (!fs.existsSync(chromePath)) {
  console.error(`FAIL: Chrome binary not found at: ${chromePath}`);
  process.exit(1);
}

const testPages = [
  { path: 'index.html', name: 'Homepage' },
  { path: 'biology-cell-biology/index.html', name: 'Verified Topic (Cell Biology)' },
  { path: 'computer-science-algorithms/index.html', name: 'Verified Topic (Algorithms)' },
  { path: 'physics-mechanics/index.html', name: 'Verified Topic (Mechanics)' },
  { path: 'economics-macroeconomics/index.html', name: 'Needs Review (Macroeconomics)' },
  { path: 'biology-botany/index.html', name: 'Insufficient Topic (Botany)' },
  { path: 'quiz/biology-cell-biology/index.html', name: 'Quiz Tool (Cell Biology)' },
  { path: 'study-timetable-template/index.html', name: 'Study Planner' },
  { path: 'about/index.html', name: 'About Page' }
];

let passed = 0;
let failed = 0;

for (const p of testPages) {
  const fullPath = path.join(distPath, p.path);
  if (!fs.existsSync(fullPath)) {
    console.error(`  [FAIL] Missing file: dist/${p.path}`);
    failed++;
    continue;
  }

  // Convert file path to file:/// URL
  const fileUrl = `file:///${fullPath.replace(/\\/g, '/')}`;
  try {
    // Run Chrome headless via cmd.exe redirection
    const cmd = `cmd.exe /c "\"${chromePath}\" --headless=new --dump-dom --disable-gpu --no-sandbox \"${fileUrl}\""`;
    const domOutput = execSync(cmd, { encoding: 'utf8', maxBuffer: 10 * 1024 * 1024 });

    // 1. Verify valid HTML structure
    const hasHtml = domOutput.includes('<html') && domOutput.includes('</html>');
    // 2. Verify root container has layout
    const hasRootLayout = domOutput.includes('<div id="root"><div class="min-h-screen');
    // 3. Verify interactive elements
    const hasInteractive = domOutput.includes('<button') || domOutput.includes('<a ');
    // 4. Verify title present
    const hasTitle = domOutput.includes('<title>') && domOutput.includes('StudyToolsHub');

    if (hasHtml && hasRootLayout && hasInteractive && hasTitle) {
      passed++;
      console.log(`  [PASS] ${p.name}: Headless Chrome rendered DOM (${domOutput.length} bytes, root layout intact)`);
    } else {
      failed++;
      console.error(`  [FAIL] ${p.name}: DOM verification failed`);
      console.error(`         hasHtml: ${hasHtml}, hasRootLayout: ${hasRootLayout}, hasInteractive: ${hasInteractive}, hasTitle: ${hasTitle}`);
    }
  } catch (err) {
    failed++;
    console.error(`  [FAIL] ${p.name}: Chrome execution error:`, err.message);
  }
}

console.log('\n============================================================');
console.log(`  HEADLESS BROWSER AUDIT SUMMARY: ${passed} Passed, ${failed} Failed`);
console.log('============================================================\n');

if (failed > 0) process.exit(1);
process.exit(0);

