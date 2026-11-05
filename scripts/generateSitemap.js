/**
/**
 * StudyToolsHub — Deterministic Sitemap Generator
 *
 * Generates public/sitemap.xml and dist/sitemap.xml containing ONLY
 * approved, 200-returning canonical URLs.
 *
 * SITEMAP COMPLIANCE RULES:
 * 1. Exactly 17 verified canonical educational topics at primary /${slug}
 * 2. Exactly 6 approved static pages (/, /about, /contact, /study-timetable-template, /privacy-policy, /terms-of-service)
 * 3. EXCLUDE all 4 needs_review topics (noindex)
 * 4. EXCLUDE all 44 insufficient topics (noindex)
 * 5. EXCLUDE all 65 /quiz/${slug} interactive tool routes (noindex, canonical to topic)
 * 6. EXCLUDE all obsolete legacy URLs (410)
 * 7. EXCLUDE all redirecting URLs (301)
 * 8. Total URLs: EXACTLY 23
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://study.freetoolshubs.com';
const TODAY = new Date().toISOString().split('T')[0];

const canonicalDataPath = path.resolve(__dirname, '../src/data/canonicalStudyTopics.json');
const canonicalTopics = JSON.parse(fs.readFileSync(canonicalDataPath, 'utf8'));

// Filter strictly for verified topics
const verifiedTopics = canonicalTopics.filter(t => t.contentQuality.status === 'verified');

// Approved static pages with index, follow
const staticPages = [
  '',
  'about',
  'contact',
  'study-timetable-template',
  'privacy-policy',
  'terms-of-service'
];

export function buildSitemapXml() {
  const urls = [];

  // 1. Static pages
  for (const page of staticPages) {
    const loc = page === '' ? `${BASE_URL}/` : `${BASE_URL}/${page}`;
    urls.push({
      loc,
      lastmod: TODAY
    });
  }

  // 2. 17 Verified Educational Topics (Sorted deterministically by slug)
  const sortedTopics = [...verifiedTopics].sort((a, b) => a.slug.localeCompare(b.slug));
  for (const topic of sortedTopics) {
    urls.push({
      loc: `${BASE_URL}/${topic.slug}`,
      lastmod: TODAY
    });
  }

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  for (const entry of urls) {
    xml += `  <url>\n`;
    xml += `    <loc>${entry.loc}</loc>\n`;
    xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  return { xml, count: urls.length, urls };
}

export function writeSitemap() {
  const { xml, count, urls } = buildSitemapXml();

  const publicPath = path.resolve(__dirname, '../public/sitemap.xml');
  fs.writeFileSync(publicPath, xml, 'utf8');

  const distDir = path.resolve(__dirname, '../dist');
  if (fs.existsSync(distDir)) {
    fs.writeFileSync(path.join(distDir, 'sitemap.xml'), xml, 'utf8');
  }

  console.log(`\n============================================================`);
  console.log(`  StudyToolsHub Sitemap Generator`);
  console.log(`============================================================`);
  console.log(`  Total URLs in sitemap: ${count}`);
  console.log(`  - Static pages:        ${staticPages.length}`);
  console.log(`  - Verified topics:     ${verifiedTopics.length}`);
  console.log(`  - Output:              ${publicPath}`);
  console.log(`============================================================\n`);

  return { count, urls };
}

// Run directly when invoked
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  writeSitemap();
}

