# Validation Baseline & Reproducible Evidence Log

**Target Property:** `https://study.freetoolshubs.com/`  
**Source Repository:** `d:/freetoolshubs/free-tools-study`  
**Audit Date:** 2026-11-05  
**Evidence Classification:** `VERIFIED_SOURCE`, `VERIFIED_PRODUCTION`, `UNKNOWN` (GSC/Cloudflare internal logs).

---

## 1. Commands & Reproducible Audit Scripts Executed

All findings in this audit were produced deterministically without modifying any source or production files:

| Step | Command / Script Executed | Purpose | Exit Code |
|---:|---|---|---:|
| 1 | `git status; git remote -v; git log -n 10 --oneline` | Verify repository branch (`dev`), commit (`6e2e136`), remote URL, and working tree cleanliness. | `0` |
| 2 | `Get-ChildItem -Path "d:\freetoolshubs" -Force` & `Get-ChildItem -Path "d:\freetoolshubs\#deployments" -Force` | Inspect workspace and check whether `free-tools-study-prod` deployment repo exists locally. | `0` |
| 3 | `python scratch/audit.py` | Parse `src/data/studyTopics.json` (37.81 MB) and `public/sitemap.xml` (1.73 MB); reproduce exact record, slug, flashcard, quiz, and sitemap counts. | `0` |
| 4 | `python scratch/deep_audit.py` | Measure exact `(subject, subTopic, level)` repetition, intra-record card/question duplication, fallback vs. `realContentMap` distribution, and nonsensical level mappings. | `0` |
| 5 | `python scratch/classify_dataset.py` | Quantify the `VARIATION_CYCLE = 500` bug (`500` unversioned + `605` first-time combos with `-v1/-v2` + `3,895` cycle duplicates) and inspect all 65 subtopics. | `0` |
| 6 | `python scratch/crawl_and_bundle_analysis.py` | Execute Breadth-First Search (BFS) over all React Router `<Link to="...">` targets starting from `/` to map the complete internal link graph and orphan rate. | `0` |
| 7 | `python scratch/probe_prod.py` | Probe 25 live URLs and bundle assets on `https://study.freetoolshubs.com/` (recording redirect chains, status codes, headers, cache status, byte sizes, and HTML bodies). | `0` |

---

## 2. Live Production HTTP & Crawl Probe Results (`VERIFIED_PRODUCTION`)

Probed on `2026-11-05T10:39:58Z` against `https://study.freetoolshubs.com/`:

| # | URL Category | Requested URL | Redirect Chain | Final Status | `Content-Type` | `cf-cache-status` | `cache-status` (Netlify) | `Cache-Control` | Body Size (Bytes) | Pre-JS Content / Canonical Present? |
|---:|---|---|---|---:|---|---|---|---|---:|---|
| 00 | Homepage (HTTPS) | `https://study.freetoolshubs.com/` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; hit` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Empty `<div id="root">`, **No canonical** |
| 01 | Homepage (HTTP) | `http://study.freetoolshubs.com/` | `301` → `https://study.freetoolshubs.com/` | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; hit` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Empty `<div id="root">`, **No canonical** |
| 02 | Robots.txt | `https://study.freetoolshubs.com/robots.txt` | None | `200` | `text/plain; charset=UTF-8` | `MISS` | `"Netlify Edge"; fwd=miss` | `public, max-age=14400, must-revalidate` | `76` | ✅ `Allow: /` + Sitemap URL |
| 03 | Sitemap.xml | `https://study.freetoolshubs.com/sitemap.xml` | None | `200` | `application/xml` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `1,684,222` | ⚠️ 10,005 URLs (**1,110 invalid with spaces**) |
| 04 | Valid Flashcard Slug | `https://study.freetoolshubs.com/biology-cell-biology-high-school` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Identical generic shell; **No pre-JS canonical** |
| 05 | Nav Link Flashcard Slug (Invalid in JSON) | `https://study.freetoolshubs.com/biology-cell-biology` | None | `200` (Soft 404) | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Falls back to `studyData[0]` in JS! |
| 06 | Valid Quiz Slug | `https://study.freetoolshubs.com/quiz/biology-cell-biology-high-school` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Identical generic shell; **No pre-JS canonical** |
| 07 | Nav Link Quiz Slug (Invalid in JSON) | `https://study.freetoolshubs.com/quiz/biology-cell-biology` | None | `200` (Soft 404) | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Falls back to `studyData[0]` in JS! |
| 08 | Planner Template | `https://study.freetoolshubs.com/study-timetable-template` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ No `<Helmet>` even after JS executes! |
| 09 | Planner Exam Route | `https://study.freetoolshubs.com/planner/mcat` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ No `<Helmet>` even after JS executes! |
| 10 | About | `https://study.freetoolshubs.com/about` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Empty pre-JS shell; no canonical in `<Helmet>` |
| 11 | Privacy Policy | `https://study.freetoolshubs.com/privacy-policy` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ⚠️ `noindex` in JS, yet listed in `sitemap.xml`! |
| 12 | Terms of Service | `https://study.freetoolshubs.com/terms-of-service` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ⚠️ `noindex` in JS, yet listed in `sitemap.xml`! |
| 13 | Contact | `https://study.freetoolshubs.com/contact` | None | `200` | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ Empty pre-JS shell; missing from `sitemap.xml` |
| 14 | Deliberately Invalid Flashcard Slug | `https://study.freetoolshubs.com/nonexistent-flashcard-slug-xyz-999` | None | **`200` (Soft 404)** | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ **Returns HTTP 200 & renders Cell Biology (`studyData[0]`) with self-canonical!** |
| 15 | Deliberately Invalid Quiz Slug | `https://study.freetoolshubs.com/quiz/nonexistent-quiz-slug-xyz-999` | None | **`200` (Soft 404)** | `text/html; charset=UTF-8` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `3,130` | ❌ **Returns HTTP 200 & renders Cell Biology quiz (`studyData[0]`) with self-canonical!** |
| 16 | Static Asset (`logo.svg`) | `https://study.freetoolshubs.com/logo.svg` | None | `200` | `image/svg+xml` | `REVALIDATED` | `"Netlify Edge"; fwd=miss` | `public, max-age=14400, must-revalidate` | `685` | ✅ Valid SVG asset |
| 17 | Static Asset (`manifest.json`) | `https://study.freetoolshubs.com/manifest.json` | None | `200` | `application/json` | `DYNAMIC` | `"Netlify Edge"; fwd=miss` | `public,max-age=0,must-revalidate` | `646` | ⚠️ References missing `/icon-192.png` & `/icon-512.png` |
| 18 | Static Asset (`og-main.png`) | `https://study.freetoolshubs.com/og-main.png` | None | `200` | `image/png` | `MISS` | `"Netlify Edge"; fwd=miss` | `public, max-age=14400, must-revalidate` | `637,715` | ✅ Valid PNG asset |
| 19 | Missing OG Asset (`og-flashcards.png`) | `https://study.freetoolshubs.com/og-flashcards.png` | None | **`200` (Soft 404)** | **`text/html; charset=UTF-8`** | `MISS` | `"Netlify Edge"; fwd=miss` | `public, max-age=14400, must-revalidate` | `2,016` | ❌ **Referenced in `Flashcards.tsx` `og:image`, but missing! Returns HTML instead of PNG!** |

---

## 3. Production JavaScript & CSS Bundle Statistics (`VERIFIED_PRODUCTION`)

All 5 assets referenced in the live `https://study.freetoolshubs.com/` `<head>` were fetched and measured directly:

| Asset Path | Role | Uncompressed Size (Bytes) | Uncompressed Size (Human) | Loaded Blocking on Every Page? | `Cache-Control` Header |
|---|---|---:|---:|---|---|
| `/assets/study-data-DpJRgXNR.js` | Compiled `src/data/studyTopics.json` | **29,677,219** | **29.68 MB** | ✅ **YES (`<link rel="modulepreload">` + static `import` in `index.js`)** | `public, max-age=31536000, immutable` |
| `/assets/vendor-ByPFI132.js` | React 19, React DOM, React Router v7, Zustand, Lucide, Helmet | **256,382** | **256.38 KB** | ✅ **YES (`<link rel="modulepreload">` + static `import` in `index.js`)** | `public, max-age=31536000, immutable` |
| `/assets/index-CVe2Dvj_.js` | Application entry point + all 9 page components (eagerly bundled) | **67,457** | **67.46 KB** | ✅ **YES (`<script type="module" src="...">`)** | `public, max-age=31536000, immutable` |
| `/assets/rolldown-runtime-DF2fYuay.js` | Vite 8 Rolldown chunk runtime | **558** | **0.56 KB** | ✅ **YES (`<link rel="modulepreload">`)** | `public, max-age=31536000, immutable` |
| `/assets/index--uzkF-ef.css` | Tailwind CSS stylesheet | **27,556** | **27.56 KB** | ✅ **YES (`<link rel="stylesheet">`)** | `public, max-age=31536000, immutable` |
| **Total Initial Critical Path** | **All 5 files required before React mounts** | **30,029,172** | **30.03 MB** | **100% Eagerly Loaded** | — |

---

## 4. Baseline Metrics Summary (Pre-Remediation vs. Phase 2 Target)

| Validation Dimension | Current Baseline (`VERIFIED_SOURCE` / `VERIFIED_PRODUCTION`) | Phase 2 Target Acceptance Criteria |
|---|---|---|
| **Initial JS Critical Path (Uncompressed)** | **30.00 MB** (`29.68 MB` data + `324 KB` code) | **< 200 KB** (99.3% reduction) |
| **Dataset File Size (`src/data/studyTopics.json`)** | **37.81 MB** (5,000 records; 77.9% duplicate combos, 70.7% placeholder text) | **< 250 KB** partitioned by subject (65 curated subtopics, 0 duplicates, 0 placeholders) |
| **Pre-JS `<title>`, `<meta description>`, `<link rel="canonical">`** | **0%** of routes have canonical; 100% share identical generic homepage title | **100%** of indexable routes have unique title, description, and self-referencing canonical in initial HTML |
| **Pre-JS `<h1>`, Study Content & Internal `<a href>` Links** | **0 words**, **0 `<h1>`**, **0 `<a href>` links** in initial HTML | **100%** of indexable routes contain `<h1>`, full study guide content, and internal `<a href>` links in static HTML |
| **Invalid Slug HTTP Status (`/nonexistent-slug`)** | **`HTTP 200 OK`** rendering High School Cell Biology (`studyData[0]`) | **`HTTP 404 Not Found`** serving `404.html` (`<NotFound />` with `noindex`) |
| **Malformed Sitemap URLs (Unencoded Spaces)** | **1,110 URLs** (`https://study.freetoolshubs.com/computer science-...`) | **0 malformed URLs** (100% RFC 3986 compliant) |
| **`noindex` Pages in `sitemap.xml`** | **2 URLs** (`/privacy-policy`, `/terms-of-service`) | **0 `noindex` URLs** in `sitemap.xml` |
| **Orphan Rate of Sitemap URLs** | **99.77%** (9,982 of 10,005 URLs have 0 internal links) | **0.00%** (100% of sitemap URLs reachable within ≤ 2 clicks from `/`) |
| **Broken Internal Navigation Links** | **8 broken links** (`/biology-cell-biology`, `/chemistry-organic-chemistry`, `/physics-mechanics`, `/psychology-intro` + `/quiz/*`) | **0 broken internal links** |

---

## 5. Missing External Evidence (`UNKNOWN` — Requires Owner Action)

As documented in `PROJECT-OWNER-ACTION-REQUIRED.md`, the following external baseline artifacts cannot be captured from the repository or anonymous HTTP requests and must be provided by the project owner:

1. **Google Search Console Property & Sitemap Status Screenshots** (to confirm whether GSC is inspecting the correct property and whether `sitemap.xml` failed validation on the 1,110 space-containing URLs).
2. **Google Search Console URL Inspection Live Test** for `/` and `/biology-cell-biology-high-school` (to confirm whether Googlebot WRS aborts on the 29.68 MB `study-data-DpJRgXNR.js` bundle or is blocked by Cloudflare).
3. **Cloudflare Security Events Log (`AS15169`) & Bot Settings** (to confirm whether Bot Fight Mode or Managed Challenges have intercepted Googlebot).
4. **Separate Production Deployment Repository URL / Local Path** (to automate deployment verification and ensure `netlify.toml` / `_headers` / `_redirects` stay synchronized).

