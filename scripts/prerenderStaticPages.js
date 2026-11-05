/**
 * StudyToolsHub — Static HTML Prerendering Engine
 *
 * Pre-renders eligible educational pages and static utility pages into
 * crawlable, production-ready static HTML files.
 *
 * ARCHITECTURAL SPECIFICATIONS:
 * 1. Preserves React 19 + TypeScript + Vite 8 architecture.
 * 2. Uses dist/index.html as template to preserve exact hashed client CSS/JS bundles.
 * 3. Compiles src/entry-server.tsx via Vite SSR to render complete pre-JS DOM markup.
 * 4. Injects page-specific <title>, <meta name="description">, <link rel="canonical">,
 *    <meta name="robots">, Open Graph tags, and valid Schema.org JSON-LD into <head>.
 * 5. Injects rendered application HTML into <div id="root">.
 * 6. Generates Netlify-compatible file structure: dist/${route}/index.html and dist/${route}.html.
 * 7. Enforces strict quality-based indexing eligibility:
 *    - 17 verified topics: index, follow
 *    - 4 needs_review topics: noindex, follow
 *    - 44 insufficient topics: noindex, follow
 *    - 65 quiz routes: noindex, follow with canonical pointing to primary /${slug}
 * 8. Cleans up temporary SSR artifacts after completion.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath, pathToFileURL } from 'url';
import { build } from 'vite';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const SSR_TEMP_DIR = path.resolve(DIST_DIR, '.ssr-temp');
const CANONICAL_DATA_PATH = path.resolve(ROOT_DIR, 'src/data/canonicalStudyTopics.json');

const canonicalTopics = JSON.parse(fs.readFileSync(CANONICAL_DATA_PATH, 'utf8'));

// Route list
const staticRoutes = [
  '/',
  '/about',
  '/contact',
  '/study-timetable-template',
  '/privacy-policy',
  '/terms-of-service'
];

const topicRoutes = canonicalTopics.map(t => `/${t.slug}`);
const quizRoutes = canonicalTopics.map(t => `/quiz/${t.slug}`);
const allRoutes = [...staticRoutes, ...topicRoutes, ...quizRoutes];

/**
 * Builds the SSR bundle using Vite programmatically
 */
async function buildSsrBundle() {
  console.log('Compiling SSR bundle with Vite...');
  await build({
    configFile: path.resolve(ROOT_DIR, 'vite.config.ts'),
    build: {
      ssr: path.resolve(ROOT_DIR, 'src/entry-server.tsx'),
      outDir: SSR_TEMP_DIR,
      emptyOutDir: true,
      minify: false,
    },
    logLevel: 'warn',
  });
  console.log('SSR bundle compiled successfully.');
}

/**
 * Extracts head elements, structured data, and DOM HTML from rendered markup
 */
function processRenderedMarkup(appHtml, url) {
  // Find where DOM elements start
  const domStartIdx = appHtml.indexOf('<div class="min-h-screen');
  const headElementsStr = domStartIdx !== -1 ? appHtml.slice(0, domStartIdx) : '';
  let domHtml = domStartIdx !== -1 ? appHtml.slice(domStartIdx) : appHtml;

  // Extract Title
  const titleMatch = headElementsStr.match(/<title>([\s\S]*?)<\/title>/i) || appHtml.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : 'StudyToolsHub — Free Flashcards, Quizzes & Study Planners';

  // Extract Description
  const descMatch = headElementsStr.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i)
    || appHtml.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
  const description = descMatch ? descMatch[1].trim() : 'Instant flashcards, adaptive quizzes, and smart study planners for students.';

  // Extract Canonical
  const canonicalMatch = headElementsStr.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/i)
    || appHtml.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : (url === '/' ? 'https://study.freetoolshubs.com/' : `https://study.freetoolshubs.com${url}`);

  // Extract Robots
  const robotsMatch = headElementsStr.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i)
    || appHtml.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
  const robots = robotsMatch ? robotsMatch[1].trim() : 'index, follow';

  // Extract Open Graph tags
  const ogTags = [];
  const ogRegex = /<meta[^>]*property=["'](og:[^"']*)["'][^>]*content=["']([^"']*)["'][^>]*\/?>/gi;
  let match;
  while ((match = ogRegex.exec(headElementsStr)) !== null) {
    ogTags.push(`<meta property="${match[1]}" content="${match[2]}" />`);
  }

  // Extract Twitter tags
  const twitterRegex = /<meta[^>]*name=["'](twitter:[^"']*)["'][^>]*content=["']([^"']*)["'][^>]*\/?>/gi;
  while ((match = twitterRegex.exec(headElementsStr)) !== null) {
    ogTags.push(`<meta name="${match[1]}" content="${match[2]}" />`);
  }

  // Extract all JSON-LD scripts
  const jsonLdScripts = [];
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  while ((match = jsonLdRegex.exec(appHtml)) !== null) {
    jsonLdScripts.push(`<script type="application/ld+json">${match[1]}</script>`);
  }

  // Strip JSON-LD from domHtml to avoid duplication in body
  domHtml = domHtml.replace(jsonLdRegex, '');

  return {
    title,
    description,
    canonical,
    robots,
    ogTags,
    jsonLdScripts,
    domHtml
  };
}

/**
 * Injects metadata and prerendered DOM into template HTML
 */
function assembleHtml(templateHtml, pageData) {
  let html = templateHtml;

  // 1. Replace <title>
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${pageData.title}</title>`);

  // 2. Replace <meta name="description">
  html = html.replace(
    /<meta[^>]*name=["']description["'][^>]*\/?>/i,
    `<meta name="description" content="${pageData.description}" />`
  );

  // 3. Prepare head injection string
  const headInjections = [
    `  <link rel="canonical" href="${pageData.canonical}" />`,
    `  <meta name="robots" content="${pageData.robots}" />`,
    ...pageData.ogTags.map(tag => `  ${tag}`),
    ...pageData.jsonLdScripts.map(script => `  ${script}`),
  ].join('\n');

  // Inject before </head>
  html = html.replace('</head>', `${headInjections}\n</head>`);

  // 4. Inject prerendered markup into <div id="root">
  html = html.replace(
    '<div id="root"></div>',
    `<div id="root">${pageData.domHtml}</div>`
  );

  return html;
}

export async function prerenderAllPages() {
  const startTime = Date.now();
  console.log(`\n============================================================`);
  console.log(`  StudyToolsHub Static HTML Prerendering Engine`);
  console.log(`============================================================`);
  console.log(`  Total routes to render: ${allRoutes.length}`);
  console.log(`  - Root & static pages:  ${staticRoutes.length}`);
  console.log(`  - Topic landing pages:  ${topicRoutes.length}`);
  console.log(`  - Quiz interactive tool: ${quizRoutes.length}`);
  console.log(`============================================================\n`);

  const templatePath = path.join(DIST_DIR, 'index.html');
  if (!fs.existsSync(templatePath)) {
    throw new Error(`Client build not found at ${templatePath}. Run 'vite build' first.`);
  }

  const templateHtml = fs.readFileSync(templatePath, 'utf8');

  // Build SSR bundle
  await buildSsrBundle();

  const ssrEntryPath = path.join(SSR_TEMP_DIR, 'entry-server.js');
  const { render } = await import(pathToFileURL(ssrEntryPath).href);

  let renderedCount = 0;
  let verifiedCount = 0;
  let noindexCount = 0;
  let totalBytes = 0;

  for (const route of allRoutes) {
    const { appHtml } = render(route);
    const pageData = processRenderedMarkup(appHtml, route);
    const finalHtml = assembleHtml(templateHtml, pageData);
    totalBytes += Buffer.byteLength(finalHtml, 'utf8');

    if (pageData.robots.includes('noindex')) {
      noindexCount++;
    } else {
      verifiedCount++;
    }

    if (route === '/') {
      // Overwrite dist/index.html with prerendered root
      fs.writeFileSync(path.join(DIST_DIR, 'index.html'), finalHtml, 'utf8');
    } else {
      const cleanPath = route.replace(/^\/+/, '');
      const targetDir = path.join(DIST_DIR, cleanPath);
      fs.mkdirSync(targetDir, { recursive: true });
      fs.writeFileSync(path.join(targetDir, 'index.html'), finalHtml, 'utf8');

      // Also write clean .html file for hosts supporting clean URLs
      const targetFile = path.join(DIST_DIR, `${cleanPath}.html`);
      fs.mkdirSync(path.dirname(targetFile), { recursive: true });
      fs.writeFileSync(targetFile, finalHtml, 'utf8');
    }

    renderedCount++;
    if (renderedCount % 20 === 0 || renderedCount === allRoutes.length) {
      console.log(`  Prerendered ${renderedCount}/${allRoutes.length} pages...`);
    }
  }

  // Cleanup temporary SSR build directory
  try {
    fs.rmSync(SSR_TEMP_DIR, { recursive: true, force: true });
  } catch (err) {
    console.warn('Warning: Could not remove temporary SSR directory:', err.message);
  }

  const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
  console.log(`\n============================================================`);
  console.log(`  Prerendering Complete!`);
  console.log(`============================================================`);
  console.log(`  Total pages rendered: ${renderedCount}`);
  console.log(`  - Indexable pages:    ${verifiedCount} (index, follow)`);
  console.log(`  - Excluded pages:     ${noindexCount} (noindex, follow)`);
  console.log(`  - Total HTML output:  ${(totalBytes / (1024 * 1024)).toFixed(2)} MB`);
  console.log(`  - Elapsed time:       ${elapsed}s`);
  console.log(`============================================================\n`);

  return {
    renderedCount,
    verifiedCount,
    noindexCount,
    totalBytes,
    elapsed
  };
}

// Run directly when invoked
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  prerenderAllPages().catch(err => {
    console.error('Fatal Prerendering Error:', err);
    process.exit(1);
  });
}

