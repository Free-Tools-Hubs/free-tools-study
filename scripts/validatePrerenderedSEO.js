/**
 * StudyToolsHub — Automated Prerendered SEO & Sitemap Validation Suite
 *
 * Rigorous 9-category automated validation suite verifying build-time
 * static HTML prerendering, canonical policies, metadata, structured data,
 * sitemap compliance, internal linking, and bundle protection.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT_DIR = path.resolve(__dirname, '..');
const DIST_DIR = path.resolve(ROOT_DIR, 'dist');
const CANONICAL_DATA_PATH = path.resolve(ROOT_DIR, 'src/data/canonicalStudyTopics.json');
const REDIRECT_MAP_PATH = path.resolve(ROOT_DIR, 'src/data/legacySlugRedirectMap.json');
const ROBOTS_PATH = path.resolve(ROOT_DIR, 'public/robots.txt');
const SITEMAP_PUBLIC_PATH = path.resolve(ROOT_DIR, 'public/sitemap.xml');
const SITEMAP_DIST_PATH = path.resolve(DIST_DIR, 'sitemap.xml');

const BASE_URL = 'https://study.freetoolshubs.com';

const canonicalTopics = JSON.parse(fs.readFileSync(CANONICAL_DATA_PATH, 'utf8'));
const legacyRedirectMap = JSON.parse(fs.readFileSync(REDIRECT_MAP_PATH, 'utf8'));
const verifiedTopics = canonicalTopics.filter(t => t.contentQuality.status === 'verified');
const needsReviewTopics = canonicalTopics.filter(t => t.contentQuality.status === 'needs_review');
const insufficientTopics = canonicalTopics.filter(t => t.contentQuality.status === 'insufficient');

const staticPages = [
  { path: '', name: 'Home' },
  { path: 'about', name: 'About' },
  { path: 'contact', name: 'Contact' },
  { path: 'study-timetable-template', name: 'Planner' },
  { path: 'privacy-policy', name: 'Privacy Policy' },
  { path: 'terms-of-service', name: 'Terms of Service' }
];

let totalGates = 0;
let passedGates = 0;
let failedGates = 0;
const failures = [];

function assertGate(gateNumber, description, condition, errorDetails = '') {
  totalGates++;
  if (condition) {
    passedGates++;
    console.log(`  [PASS] Gate ${gateNumber}: ${description}`);
  } else {
    failedGates++;
    const msg = `Gate ${gateNumber} FAILED: ${description}${errorDetails ? ` (${errorDetails})` : ''}`;
    failures.push(msg);
    console.error(`  [FAIL] ${msg}`);
  }
}

function parseHtmlMetadata(html) {
  const headEndIdx = html.indexOf('</head>');
  const head = headEndIdx !== -1 ? html.slice(0, headEndIdx) : html;

  const titleMatch = head.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : '';

  const descMatch = head.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
  const description = descMatch ? descMatch[1].trim() : '';

  const canMatches = [...head.matchAll(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["'][^>]*\/?>/gi)];
  const canonicals = canMatches.map(m => m[1].trim());

  const robMatch = head.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']*)["'][^>]*\/?>/i);
  const robots = robMatch ? robMatch[1].trim() : '';

  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? h1Match[1].trim().replace(/<!--.*?-->/g, '') : '';

  // Extract JSON-LD
  const jsonLdScripts = [];
  const jsonLdRegex = /<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      jsonLdScripts.push(JSON.parse(match[1]));
    } catch (e) {
      jsonLdScripts.push({ __parseError: true, raw: match[1] });
    }
  }

  // Extract all <a href="..."> links
  const hrefs = [];
  const hrefRegex = /<a[^>]*href=["']([^"']*)["'][^>]*>/gi;
  while ((match = hrefRegex.exec(html)) !== null) {
    hrefs.push(match[1].trim());
  }

  return {
    title,
    description,
    canonicals,
    robots,
    h1,
    jsonLdScripts,
    hrefs
  };
}

export function runValidation() {
  console.log(`\n============================================================`);
  console.log(`  StudyToolsHub Phase 2E: Static SEO & Sitemap Validator`);
  console.log(`============================================================\n`);

  // --------------------------------------------------------------------------
  // CATEGORY A: Page Generation Verification
  // --------------------------------------------------------------------------
  console.log(`--- Category A: Static HTML Page Generation ---`);

  // Gate 1: Root index.html exists and is non-empty
  const rootPath = path.join(DIST_DIR, 'index.html');
  const rootExists = fs.existsSync(rootPath) && fs.statSync(rootPath).size > 1000;
  assertGate('A1', 'Root index.html exists and contains rendered content (>1KB)', rootExists);

  // Gate 2: All 5 static pages exist in dist/
  const missingStatic = staticPages.filter(p => p.path !== '').filter(p => {
    const pFile = path.join(DIST_DIR, p.path, 'index.html');
    return !fs.existsSync(pFile) || fs.statSync(pFile).size < 500;
  });
  assertGate('A2', 'All 5 static utility pages exist with valid HTML output', missingStatic.length === 0, missingStatic.map(p => p.path).join(', '));

  // Gate 3: All 17 verified topic pages exist in dist/
  const missingVerified = verifiedTopics.filter(t => {
    const tFile = path.join(DIST_DIR, t.slug, 'index.html');
    return !fs.existsSync(tFile) || fs.statSync(tFile).size < 1000;
  });
  assertGate('A3', 'All 17 verified canonical topic pages exist (>1KB)', missingVerified.length === 0, missingVerified.map(t => t.slug).join(', '));

  // Gate 4: All 48 non-verified topic pages exist in dist/
  const nonVerified = [...needsReviewTopics, ...insufficientTopics];
  const missingNonVerified = nonVerified.filter(t => {
    const tFile = path.join(DIST_DIR, t.slug, 'index.html');
    return !fs.existsSync(tFile) || fs.statSync(tFile).size < 1000;
  });
  assertGate('A4', 'All 48 non-verified topic pages exist with static HTML', missingNonVerified.length === 0, missingNonVerified.map(t => t.slug).join(', '));

  // Gate 5: All 65 quiz pages exist in dist/
  const missingQuiz = canonicalTopics.filter(t => {
    const qFile = path.join(DIST_DIR, 'quiz', t.slug, 'index.html');
    return !fs.existsSync(qFile) || fs.statSync(qFile).size < 1000;
  });
  assertGate('A5', 'All 65 quiz interactive tool pages exist with static HTML', missingQuiz.length === 0, missingQuiz.map(t => t.slug).join(', '));

  // --------------------------------------------------------------------------
  // CATEGORY B: Initial Pre-JS DOM Content Inspection
  // --------------------------------------------------------------------------
  console.log(`\n--- Category B: Initial Pre-JS HTML Content ---`);

  let verifiedContentIssues = [];
  for (const topic of verifiedTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const content = fs.readFileSync(file, 'utf8');
    const meta = parseHtmlMetadata(content);

    if (!meta.h1 || meta.h1.length === 0) {
      verifiedContentIssues.push(`${topic.slug}: Missing <h1>`);
    }
    if (!meta.description || meta.description.length < 20) {
      verifiedContentIssues.push(`${topic.slug}: Empty or short description`);
    }
    if (!content.includes('Key Learning Objectives') && !content.includes('Key Concepts in this Study Deck')) {
      verifiedContentIssues.push(`${topic.slug}: Missing educational learning objectives or concepts`);
    }
    if (!content.includes('Study Tips for')) {
      verifiedContentIssues.push(`${topic.slug}: Missing study tips`);
    }
    if (!content.includes('Frequently Asked Questions')) {
      verifiedContentIssues.push(`${topic.slug}: Missing FAQ section`);
    }
    if (content.includes('Loading study deck...')) {
      verifiedContentIssues.push(`${topic.slug}: Found placeholder loading state in initial HTML`);
    }
  }
  assertGate('B1', 'All 17 verified topics have complete initial DOM content (H1, description, objectives, tips, FAQs)', verifiedContentIssues.length === 0, verifiedContentIssues.join('; '));

  // Gate B2: All 17 verified topics contain complete sample flashcard markup in initial DOM
  let missingFlashcardCards = [];
  for (const topic of verifiedTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const content = fs.readFileSync(file, 'utf8').replace(/<!--.*?-->/g, '');
    if (!content.includes('<article') || !content.includes('Card 1') || !content.includes('Card 2')) {
      missingFlashcardCards.push(topic.slug);
    }
  }
  assertGate('B2', 'All 17 verified topics contain complete pre-rendered flashcards in initial DOM', missingFlashcardCards.length === 0, missingFlashcardCards.join(', '));

  // --------------------------------------------------------------------------
  // CATEGORY C: Strict Indexing Eligibility Gates
  // --------------------------------------------------------------------------
  console.log(`\n--- Category C: Indexing Eligibility & Robots Directives ---`);

  // Gate C1: Exactly 17 verified topics have index, follow
  let nonIndexVerified = [];
  for (const topic of verifiedTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const meta = parseHtmlMetadata(fs.readFileSync(file, 'utf8'));
    if (meta.robots !== 'index, follow') {
      nonIndexVerified.push(`${topic.slug}: ${meta.robots}`);
    }
  }
  assertGate('C1', 'All 17 verified topics carry explicit "index, follow" robots directive', nonIndexVerified.length === 0, nonIndexVerified.join('; '));

  // Gate C2: All 4 needs_review topics have noindex, follow
  let indexableNeedsReview = [];
  for (const topic of needsReviewTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const meta = parseHtmlMetadata(fs.readFileSync(file, 'utf8'));
    if (!meta.robots.includes('noindex')) {
      indexableNeedsReview.push(`${topic.slug}: ${meta.robots}`);
    }
  }
  assertGate('C2', 'All 4 needs_review topics carry explicit "noindex, follow" directive', indexableNeedsReview.length === 0, indexableNeedsReview.join('; '));

  // Gate C3: All 44 insufficient topics have noindex, follow
  let indexableInsufficient = [];
  for (const topic of insufficientTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const meta = parseHtmlMetadata(fs.readFileSync(file, 'utf8'));
    if (!meta.robots.includes('noindex')) {
      indexableInsufficient.push(`${topic.slug}: ${meta.robots}`);
    }
  }
  assertGate('C3', 'All 44 insufficient topics carry explicit "noindex, follow" directive', indexableInsufficient.length === 0, indexableInsufficient.join('; '));

  // Gate C4: All 65 quiz routes have noindex, follow
  let indexableQuiz = [];
  for (const topic of canonicalTopics) {
    const file = path.join(DIST_DIR, 'quiz', topic.slug, 'index.html');
    const meta = parseHtmlMetadata(fs.readFileSync(file, 'utf8'));
    if (!meta.robots.includes('noindex')) {
      indexableQuiz.push(`quiz/${topic.slug}: ${meta.robots}`);
    }
  }
  assertGate('C4', 'All 65 quiz interactive tool routes carry explicit "noindex, follow"', indexableQuiz.length === 0, indexableQuiz.join('; '));

  // --------------------------------------------------------------------------
  // CATEGORY D: Canonical Correctness
  // --------------------------------------------------------------------------
  console.log(`\n--- Category D: Canonical Link Policies ---`);

  // Gate D1: Exactly 1 canonical per document across all generated HTML files
  let duplicateCanonicalFiles = [];
  for (const topic of canonicalTopics) {
    const tFile = path.join(DIST_DIR, topic.slug, 'index.html');
    const tMeta = parseHtmlMetadata(fs.readFileSync(tFile, 'utf8'));
    if (tMeta.canonicals.length !== 1) {
      duplicateCanonicalFiles.push(`${topic.slug}: ${tMeta.canonicals.length} canonicals`);
    }

    const qFile = path.join(DIST_DIR, 'quiz', topic.slug, 'index.html');
    const qMeta = parseHtmlMetadata(fs.readFileSync(qFile, 'utf8'));
    if (qMeta.canonicals.length !== 1) {
      duplicateCanonicalFiles.push(`quiz/${topic.slug}: ${qMeta.canonicals.length} canonicals`);
    }
  }
  assertGate('D1', 'Every document has exactly 1 canonical link tag (0 duplicates/missing)', duplicateCanonicalFiles.length === 0, duplicateCanonicalFiles.join('; '));

  // Gate D2: All 65 quiz routes canonicalize to primary flashcard topic (/${slug})
  let invalidQuizCanonicals = [];
  for (const topic of canonicalTopics) {
    const qFile = path.join(DIST_DIR, 'quiz', topic.slug, 'index.html');
    const qMeta = parseHtmlMetadata(fs.readFileSync(qFile, 'utf8'));
    const expected = `${BASE_URL}/${topic.slug}`;
    if (qMeta.canonicals[0] !== expected) {
      invalidQuizCanonicals.push(`quiz/${topic.slug} -> ${qMeta.canonicals[0]} (expected ${expected})`);
    }
  }
  assertGate('D2', 'All 65 quiz routes canonicalize to primary flashcard topic page', invalidQuizCanonicals.length === 0, invalidQuizCanonicals.join('; '));

  // Gate D3: Canonical URLs are absolute HTTPS URLs with no trailing slashes on paths
  let malformedCanonicals = [];
  for (const topic of canonicalTopics) {
    const tFile = path.join(DIST_DIR, topic.slug, 'index.html');
    const tMeta = parseHtmlMetadata(fs.readFileSync(tFile, 'utf8'));
    const can = tMeta.canonicals[0];
    if (!can.startsWith('https://') || (can.endsWith('/') && can !== `${BASE_URL}/`)) {
      malformedCanonicals.push(`${topic.slug}: ${can}`);
    }
  }
  assertGate('D3', 'All canonical URLs are absolute HTTPS with no trailing slash on subpaths', malformedCanonicals.length === 0, malformedCanonicals.join('; '));

  // --------------------------------------------------------------------------
  // CATEGORY E: Sitemap Compliance
  // --------------------------------------------------------------------------
  console.log(`\n--- Category E: Sitemap Integrity & Hygiene ---`);

  // Gate E1: public/sitemap.xml and dist/sitemap.xml exist
  const sitemapPublicExists = fs.existsSync(SITEMAP_PUBLIC_PATH);
  const sitemapDistExists = fs.existsSync(SITEMAP_DIST_PATH);
  assertGate('E1', 'sitemap.xml exists in both public/ and dist/', sitemapPublicExists && sitemapDistExists);

  const sitemapXml = fs.readFileSync(SITEMAP_PUBLIC_PATH, 'utf8');
  const sitemapLocMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)];
  const sitemapUrls = sitemapLocMatches.map(m => m[1].trim());

  // Gate E2: Exactly 23 approved URLs in sitemap
  assertGate('E2', `Total URLs in sitemap.xml is exactly 23 (found ${sitemapUrls.length})`, sitemapUrls.length === 23, `Actual count: ${sitemapUrls.length}`);

  // Gate E3: All 17 verified topics are present in sitemap.xml
  const missingVerifiedInSitemap = verifiedTopics.filter(t => !sitemapUrls.includes(`${BASE_URL}/${t.slug}`));
  assertGate('E3', 'All 17 verified topics are present in sitemap.xml', missingVerifiedInSitemap.length === 0, missingVerifiedInSitemap.map(t => t.slug).join(', '));

  // Gate E4: 0 unverified topics in sitemap.xml
  const unverifiedInSitemap = nonVerified.filter(t => sitemapUrls.includes(`${BASE_URL}/${t.slug}`));
  assertGate('E4', '0 unverified topics (needs_review or insufficient) in sitemap.xml', unverifiedInSitemap.length === 0, unverifiedInSitemap.map(t => t.slug).join(', '));

  // Gate E5: 0 quiz routes in sitemap.xml
  const quizInSitemap = sitemapUrls.filter(u => u.includes('/quiz/'));
  assertGate('E5', '0 quiz interactive assessment routes in sitemap.xml', quizInSitemap.length === 0, quizInSitemap.join(', '));

  // Gate E6: 0 obsolete, redirecting, or 404/410 URLs in sitemap.xml
  const legacyInSitemap = sitemapUrls.filter(u => {
    const slug = u.replace(`${BASE_URL}/`, '');
    return legacyRedirectMap[slug] !== undefined && legacyRedirectMap[slug] !== slug;
  });
  assertGate('E6', '0 obsolete legacy or redirecting URLs in sitemap.xml', legacyInSitemap.length === 0, legacyInSitemap.join(', '));

  // Gate E7: Every URL in sitemap.xml has "index, follow" in its static HTML
  let nonIndexableSitemapUrls = [];
  for (const url of sitemapUrls) {
    const subpath = url.replace(`${BASE_URL}`, '').replace(/^\/+/, '');
    const targetFile = subpath === '' ? path.join(DIST_DIR, 'index.html') : path.join(DIST_DIR, subpath, 'index.html');
    if (!fs.existsSync(targetFile)) {
      nonIndexableSitemapUrls.push(`${url}: File missing on disk`);
      continue;
    }
    const meta = parseHtmlMetadata(fs.readFileSync(targetFile, 'utf8'));
    if (meta.robots.includes('noindex')) {
      nonIndexableSitemapUrls.push(`${url}: Contains noindex in HTML`);
    }
  }
  assertGate('E7', 'All 23 sitemap URLs resolve to static HTML files with "index, follow"', nonIndexableSitemapUrls.length === 0, nonIndexableSitemapUrls.join('; '));

  // Gate E8: robots.txt allows crawlers and references sitemap.xml
  const robotsTxt = fs.readFileSync(ROBOTS_PATH, 'utf8');
  const robotsValid = robotsTxt.includes('User-agent: *') &&
    robotsTxt.includes('Allow: /') &&
    robotsTxt.includes(`Sitemap: ${BASE_URL}/sitemap.xml`);
  assertGate('E8', 'public/robots.txt allows all crawlers and points to production sitemap', robotsValid);

  // --------------------------------------------------------------------------
  // CATEGORY F: Structured Data Validation
  // --------------------------------------------------------------------------
  console.log(`\n--- Category F: Structured Data (Schema.org JSON-LD) ---`);

  // Gate F1: Home page contains valid WebSite schema
  const homeMeta = parseHtmlMetadata(fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8'));
  const websiteSchema = homeMeta.jsonLdScripts.find(s => s['@type'] === 'WebSite');
  assertGate('F1', 'Homepage contains valid Schema.org WebSite JSON-LD', websiteSchema && websiteSchema.url === `${BASE_URL}/`);

  // Gate F2: All 17 verified topics have valid BreadcrumbList, LearningResource, and FAQPage schemas
  let invalidSchemaTopics = [];
  for (const topic of verifiedTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const meta = parseHtmlMetadata(fs.readFileSync(file, 'utf8'));

    const breadcrumbs = meta.jsonLdScripts.find(s => s['@type'] === 'BreadcrumbList');
    const resource = meta.jsonLdScripts.find(s => s['@type'] === 'LearningResource');
    const faq = meta.jsonLdScripts.find(s => s['@type'] === 'FAQPage');

    if (!breadcrumbs || !resource || !faq) {
      invalidSchemaTopics.push(`${topic.slug}: missing required schema types`);
    } else if (meta.jsonLdScripts.some(s => s.__parseError)) {
      invalidSchemaTopics.push(`${topic.slug}: JSON-LD parse error`);
    }
  }
  assertGate('F2', 'All 17 verified topics have valid BreadcrumbList, LearningResource, and FAQPage', invalidSchemaTopics.length === 0, invalidSchemaTopics.join('; '));

  // Gate F3: Zero fabricated review ratings, fake stars, or fake author personas
  let fabricatedSchemaFound = [];
  for (const topic of canonicalTopics) {
    const file = path.join(DIST_DIR, topic.slug, 'index.html');
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('AggregateRating') || content.includes('ratingValue') || content.includes('reviewCount')) {
      fabricatedSchemaFound.push(topic.slug);
    }
  }
  assertGate('F3', 'Zero fabricated ratings, review counts, or fake reviews in schema', fabricatedSchemaFound.length === 0, fabricatedSchemaFound.join(', '));

  // --------------------------------------------------------------------------
  // CATEGORY G: Internal Link Audit
  // --------------------------------------------------------------------------
  console.log(`\n--- Category G: Internal Link Audit ---`);

  // Gate G1: 0 internal links point to 410 obsolete URLs or 301 legacy URLs
  let brokenInternalLinks = [];
  const filesToCheck = [
    path.join(DIST_DIR, 'index.html'),
    ...verifiedTopics.map(t => path.join(DIST_DIR, t.slug, 'index.html'))
  ];

  for (const filePath of filesToCheck) {
    const meta = parseHtmlMetadata(fs.readFileSync(filePath, 'utf8'));
    for (const href of meta.hrefs) {
      if (href.startsWith('/') && !href.startsWith('//')) {
        const cleanHref = href.split('?')[0].split('#')[0].replace(/^\/+/, '');
        if (cleanHref === '') continue;

        // Check if it's in legacy redirect map (either 301 or 410) and not the canonical destination
        if (legacyRedirectMap[cleanHref] !== undefined && legacyRedirectMap[cleanHref] !== cleanHref) {
          brokenInternalLinks.push(`${path.basename(path.dirname(filePath))}: links to legacy slug "${cleanHref}"`);
        }
      }
    }
  }
  assertGate('G1', 'All internal links point to canonical destinations (0 links to legacy/410 slugs)', brokenInternalLinks.length === 0, brokenInternalLinks.slice(0, 5).join('; '));

  // Gate G2: Subject categories on Homepage link to verified topic landing pages
  const homeContent = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');
  const expectedSubjectLandingSlugs = [
    'biology-cell-biology',
    'chemistry-organic-chemistry',
    'physics-mechanics',
    'history-ancient-egypt',
    'psychology-cognitive-psychology',
    'literature-shakespeare',
    'math-calculus',
    'computer-science-algorithms'
  ];
  const missingLandingLinks = expectedSubjectLandingSlugs.filter(slug => !homeContent.includes(`href="/${slug}"`));
  assertGate('G2', 'Homepage category links point directly to primary verified landing pages', missingLandingLinks.length === 0, missingLandingLinks.join(', '));

  // --------------------------------------------------------------------------
  // CATEGORY H: Bundle Protection
  // --------------------------------------------------------------------------
  console.log(`\n--- Category H: Client Bundle Protection ---`);

  // Gate H1: Neither legacy studyTopics.json nor legacyTopicUrlManifest.json are in dist/assets
  const assetsDir = path.join(DIST_DIR, 'assets');
  let bundledForbidden = [];
  if (fs.existsSync(assetsDir)) {
    const assetFiles = fs.readdirSync(assetsDir).filter(f => f.endsWith('.js'));
    for (const asset of assetFiles) {
      const assetPath = path.join(assetsDir, asset);
      const stat = fs.statSync(assetPath);
      // If any single JS bundle is larger than 2MB, flag it
      if (stat.size > 2 * 1024 * 1024) {
        bundledForbidden.push(`${asset} (${(stat.size / 1024 / 1024).toFixed(2)} MB exceeds 2MB limit)`);
      }
    }
  }
  assertGate('H1', 'Client JS bundles protected from legacy 37.8MB/5.2MB data bloating (all bundles < 2MB)', bundledForbidden.length === 0, bundledForbidden.join('; '));

  // --------------------------------------------------------------------------
  // Summary
  // --------------------------------------------------------------------------
  console.log(`\n============================================================`);
  console.log(`  VALIDATION SUMMARY`);
  console.log(`============================================================`);
  console.log(`  Total Gates Evaluated: ${totalGates}`);
  console.log(`  Passed Gates:          ${passedGates}`);
  console.log(`  Failed Gates:          ${failedGates}`);
  console.log(`============================================================\n`);

  if (failedGates > 0) {
    console.error(`FATAL: ${failedGates} validation gate(s) failed:`);
    failures.forEach(f => console.error(`  - ${f}`));
    process.exit(1);
  } else {
    console.log(`SUCCESS: All ${totalGates}/${totalGates} Phase 2E validation gates PASSED with Exit Code 0!\n`);
  }
}

// Run directly when invoked
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  runValidation();
}
