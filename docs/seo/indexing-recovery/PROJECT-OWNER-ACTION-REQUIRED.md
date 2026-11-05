# Project Owner Action Required — External Access & Verification Checklist

**Target Property:** `https://study.freetoolshubs.com/`  
**Purpose:** This document lists **only** the external data, screenshots, exports, and configuration checks that cannot be obtained from the source repository (`d:/freetoolshubs/free-tools-study`) or anonymous public HTTP probes.

---

## 1. Google Search Console (GSC) Exports & Screenshots Required

Our source and live production audit confirmed technical root causes inside the codebase (a 29.68 MB blocking JS bundle, 100% empty pre-JS HTML, 99.77% orphan pages, and 1,110 invalid URLs with literal spaces in `sitemap.xml`). However, because you reported **both `0 indexed pages` AND `0 reported non-indexed pages`**, we must verify whether GSC is also affected by a property mismatch or sitemap fetch failure.

Please provide the following **4 screenshots or exports** from Google Search Console:

### Action 1.1 — Verify the Exact GSC Property Selector (Top-Left Dropdown)
- **Check:** What does the property selector in the top-left corner of Google Search Console say?
  - Is it a **Domain property** (`freetoolshubs.com`)?
  - Or a **URL-prefix property** for `https://study.freetoolshubs.com/`?
  - *(Note: A URL-prefix property for `https://freetoolshubs.com/` does **not** track `https://study.freetoolshubs.com/` at all, and an `http://study.freetoolshubs.com/` prefix property will show 0 data because all traffic is on `https://`.)*
- **Deliverable Needed:** Screenshot showing the exact property selected in the top-left dropdown.

### Action 1.2 — Sitemaps Report (`Indexing` → `Sitemaps`)
- **Check:** Open **Sitemaps** in the left sidebar and click on the submitted `sitemap.xml` row.
- **Deliverable Needed:** Screenshot showing:
  1. Submitted sitemap URL (`https://study.freetoolshubs.com/sitemap.xml`).
  2. **Status** (e.g., `Success`, `Couldn't fetch`, or `Has errors`).
  3. **Last read** date and **Discovered pages** count.
  4. Any error details (specifically whether GSC flagged the **1,110 invalid URLs containing unencoded spaces** such as `https://study.freetoolshubs.com/computer science-data-structures-graduate` starting at line 37 of `sitemap.xml`).

### Action 1.3 — Page Indexing Report (`Indexing` → `Pages`)
- **Deliverable Needed:** Screenshot of the **Pages** (Page indexing) overview showing the exact counts for `Not indexed` and `Indexed`, plus the table of reasons ("Why pages aren't indexed", if any rows exist).

### Action 1.4 — Live URL Inspection Test (3 Representative URLs)
In the top search bar of Google Search Console ("Inspect any URL in..."), inspect the following 3 URLs and click **"Test Live URL"** on each:
1. `https://study.freetoolshubs.com/`
2. `https://study.freetoolshubs.com/biology-cell-biology-high-school`
3. `https://study.freetoolshubs.com/sitemap.xml`

- **Deliverable Needed:** For each URL, provide a screenshot of the **Live Test** result (and click **"View Tested Page" → "HTML" / "Screenshot" / "More Info"**) showing:
  - `Page fetch` status (`Successful` vs. `Failed: Blocked` / `Timeout`)
  - `Crawled as` (`Googlebot smartphone` / `desktop`)
  - `Indexing allowed?` and `User-declared canonical`
  - Under **View Tested Page → HTML**, whether `<div id="root">` is empty (`<div id="root"></div>`) or populated after Googlebot WRS execution, and under **More Info → Page resources**, whether `/assets/study-data-DpJRgXNR.js` (29.68 MB) failed to load or timed out.

---

## 2. Cloudflare Dashboard Checks Required (`study.freetoolshubs.com`)

Live HTTP responses from `https://study.freetoolshubs.com/` confirm that Cloudflare is proxying traffic (`server: cloudflare`, `cf-cache-status: DYNAMIC`) and dynamically injecting Cloudflare JS Detections (`/cdn-cgi/challenge-platform/scripts/jsd/main.js`) into every HTML response.

Please inspect the following in your Cloudflare account for `freetoolshubs.com` (do **not** disable all security protections indiscriminately):

### Action 2.1 — Security Events Filtered for Googlebot (`AS15169`)
1. Go to **Cloudflare Dashboard → `freetoolshubs.com` → Security → Events**.
2. Add two filters:
   - `Hostname` equals `study.freetoolshubs.com`
   - `AS Num` equals `15169` (Googlebot's Autonomous System Number) — or `User Agent` contains `Googlebot`.
3. **Deliverable Needed:** Screenshot or confirmation of whether any requests from `AS15169` / `Googlebot` have been **Managed Challenged**, **JS Challenged**, or **Blocked**, and which service triggered it (e.g., `Bot Fight Mode`, `WAF`, `Browser Integrity Check`).

### Action 2.2 — Bot Fight Mode & AI Scrapers Settings
1. Go to **Security → Bots**.
2. Record the current state of:
   - **Bot Fight Mode** / **Super Bot Fight Mode** (specifically how `Verified Bots` are configured).
   - **Block AI Scrapers and Crawlers** (ensure Verified Search Engine Crawlers like Googlebot are not blocked).
   - **Manage `robots.txt` / AI Audit** (confirm Cloudflare is not prepending or modifying `robots.txt` for bot user-agents).

---

## 3. Separate Production Deployment Repository Information Required

In `d:/freetoolshubs/#deployments`, we found `free-tools-life-prod` and `free-tools-prod`, but **`free-tools-study-prod` is not present locally**.

Please provide:
1. **The Git remote URL or local directory path** of the production deployment repository that Netlify deploys for `study.freetoolshubs.com`.
2. **Which branch** Netlify deploys from (e.g., `main` or `master`) and what **Publish directory** is configured in the Netlify UI (e.g., `dist` or root `/`).
   - *(Note: Once you clone or provide the path to `free-tools-study-prod` in `d:/freetoolshubs/#deployments/free-tools-study-prod`, Phase 2 can deploy the remediated `dist/` build directly using the same workflow as `free-tools-life-prod`.)*

