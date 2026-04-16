import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BASE_URL = 'https://study.freetoolshubs.com';
const studyData = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/data/studyTopics.json'), 'utf8'));

// Generate Sitemap
const generateSitemap = () => {
  let sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  sitemap += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;

  // Static pages
  const staticPages = ['', 'study-timetable-template', 'about', 'privacy-policy', 'terms-of-service'];
  staticPages.forEach(page => {
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/${page}</loc>\n`;
    sitemap += `    <changefreq>weekly</changefreq>\n`;
    sitemap += `    <priority>1.0</priority>\n`;
    sitemap += `  </url>\n`;
  });

  // Dynamic pages
  studyData.forEach(topic => {
    // Flashcard page (Main topic page)
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/${topic.slug}</loc>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.9</priority>\n`;
    sitemap += `  </url>\n`;

    // Quiz page
    sitemap += `  <url>\n`;
    sitemap += `    <loc>${BASE_URL}/quiz/${topic.slug}</loc>\n`;
    sitemap += `    <changefreq>monthly</changefreq>\n`;
    sitemap += `    <priority>0.7</priority>\n`;
    sitemap += `  </url>\n`;

    // Planner page (if specific examType exists - optionally)
  });


  sitemap += `</urlset>`;
  fs.writeFileSync(path.resolve(__dirname, '../public/sitemap.xml'), sitemap, 'utf8');
};

// Generate Robots.txt
const generateRobots = () => {
  const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE_URL}/sitemap.xml`;
  fs.writeFileSync(path.resolve(__dirname, '../public/robots.txt'), robots, 'utf8');
};

generateSitemap();
generateRobots();
console.log('SEO files (sitemap.xml, robots.txt) generated successfully.');
