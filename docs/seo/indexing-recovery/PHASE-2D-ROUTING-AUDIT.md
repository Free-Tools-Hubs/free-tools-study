# StudyToolsHub — Phase 2D Forensic Routing Audit & URL Reconciliation Report

**Document Status:** Complete Forensic Audit  
**Phase:** Phase 2D — HTTP Routing & Legacy URL Migration  
**Repository:** `free-tools-study` (`https://study.freetoolshubs.com/`)  
**Target:** React 19 + TypeScript + Vite 8 (Rolldown) + Netlify  
**Date:** March 2026  
**Auditor:** Senior Infrastructure Engineer & Technical SEO Specialist  

---

## 1. Executive Summary

Phase 2D audits the existing routing architecture, Netlify deployment configurations, and the complete legacy migration manifest (`src/data/legacyTopicUrlManifest.json`).

Prior to this phase, the application suffered from two severe routing defects:
1. **Unconditional SPA Catch-All (`/* /index.html 200`):** Every requested path—including deleted legacy pages, non-existent slugs, and missing assets—was rewritten to `/index.html` with an HTTP 200 status code. This created systematic **Soft-404** crawl anomalies in Google Search Console.
2. **Configuration Drift Between `netlify.toml` and `_redirects`:** `netlify.toml` contained a blanket SPA rewrite that threatened to override or leak 200 status codes for unhandled requests falling through `_redirects`.

This audit establishes the authoritative URL reconciliation baseline across all 10,008 source paths in the migration manifest, proves zero mapping conflicts, eliminates self-redirect loops, and defines deterministic routing semantics for Netlify deployment.

---

## 2. Existing Routing & Configuration Architecture

### 2.1 React Router Routing Table (`src/App.tsx`)
The client SPA defines the following route hierarchy under `<MainLayout />`:

| Path Pattern | Component | Purpose | Target Type |
| :--- | :--- | :--- | :--- |
| `/` | `Home` | Homepage and subject browse entry | Static Landing |
| `/:subject` | `Flashcards` | Canonical flashcard study deck | Dynamic Canonical |
| `/quiz/:subject` | `Quiz` | Interactive practice test | Dynamic Canonical |
| `/planner/:examType` | `Planner` | Timetable aligned to exam curriculum | Dynamic Utility |
| `/study-timetable-template` | `Planner` | Drag-and-drop study schedule builder | Static Utility |
| `/about` | `About` | About StudyToolsHub | Static Informational |
| `/contact` | `Contact` | Contact & inquiry form | Static Informational |
| `/privacy-policy` | `PrivacyPolicy` | Privacy disclosure | Legal Document |
| `/terms-of-service` | `TermsOfService` | Terms of service | Legal Document |
| `*` | `NotFound` | React client fallback | Fallback Component |

### 2.2 Client-Side Routing vs. HTTP Server Realities
In an SPA, React Router runs entirely in the browser after JavaScript execution. Search engine crawlers (Googlebot, Bingbot) and automated HTTP clients evaluate the **initial HTTP response status code and headers** before executing JavaScript.
- A client-side `<meta name="robots" content="noindex" />` or `<NotFound />` component rendered within an HTTP 200 payload does **not** convert the response to HTTP 404/410. Google classifies this as a Soft-404 and expends crawl budget revisiting the URL.
- To recover Google search indexation, the Netlify edge must return genuine **HTTP 301**, **HTTP 410**, and **HTTP 404** headers *before* serving any page body.

---

## 3. Authoritative URL Classification Reconciliation

The previous phase reports cited disparate numbers:
- 1,404 dataset redirect records
- 3 navigation redirect slugs
- 1,494 active client redirect map entries
- 2,856 obsolete dataset records
- 10,000 legacy dataset URL variants
- 8 navigation URL variants

### Complete Reconciliation Table

| Metric | Authoritative Count | Verification Method / Source |
| :--- | :---: | :--- |
| **Total manifest dataset records** | **5,000** | Count of objects in `manifest.records` |
| **Total dataset URL variants** | **10,000** | Each record has 1 `flashcardUrl` (`/:slug`) and 1 `quizUrl` (`/quiz/:slug`) |
| **Navigation URL variants** | **8** | 4 hardcoded navigation entries in `nonDatasetNavigationUrls` $\times 2$ URLs |
| **Total unique normalized source paths** | **10,008** | Union of all dataset URLs (10,000) and nav URLs (8) |
| **Unique redirect source paths** | **2,814** | 1,404 dataset records $\times 2$ (2,808) + 3 nav entries $\times 2$ (6) |
| **Active 301 Netlify redirect rules** | **2,808** | 2,814 total redirect source paths minus 6 self-redirects |
| **Self-redirect paths skipped** | **6** | 3 navigation slugs identical to canonical (`source === target`) |
| **Unique redirect destinations** | **36** | 18 canonical topics $\times 2$ (18 flashcard + 18 quiz destinations) |
| **Unique manual-review paths** | **1,482** | 740 dataset records $\times 2$ (1,480) + 1 nav entry $\times 2$ (`/psychology-intro`) |
| **Unique obsolete paths** | **5,712** | 2,856 dataset records $\times 2$ |
| **Duplicate source paths** | **0** | Verified: every source path occurs exactly once across all records |
| **Conflicting source mappings** | **0** | Verified: zero source paths mapped to multiple dispositions |
| **Malformed source paths (spaces in path)**| **1,110** | 555 Computer Science records $\times 2$ URLs with space in `legacySlug` |
| **Unresolved canonical destinations** | **0** | Verified: 100% of 301 destinations exist in `canonicalStudyTopics.json` |

---

## 4. Reconciliation of Count Discrepancies

### Discrepancy 1: Why 1,404 records vs. 1,494 entries in `legacySlugRedirectMap.json`?
- **Dataset Redirect Records:** Exactly 1,404 records in `studyTopics.json` represented unversioned, first-occurrence compatible education levels.
- **Recovered Computer Science Records:** 43 records in `manifest.records` had `disposition: 'manual_review'` but `reviewStatus: 'recovered_canonical_content_ready_for_routing_migration'`. In Phase 2C, client-side compatibility registered both their space variant (`computer science-...`) and hyphenated variant (`computer-science-...`) for in-browser self-healing ($43 \times 2 = 86$ keys).
- **Navigation Slugs:** 3 canonical nav slugs (`biology-cell-biology`, etc.) + 1 corrected footer slug (`psychology-intro` $\to$ `psychology-cognitive-psychology`) added 4 keys.
- **Reconciliation:** $1,404 + 86 + 4 = 1,494$ client keys.
- **Phase 2D HTTP Decision:** For Netlify HTTP rules, manual-review records (including the 43 CS space records and `/psychology-intro`) are strictly **excluded** from automatic 301/410 rules. Therefore, exactly **2,808 HTTP 301 rules** are emitted.

### Discrepancy 2: Why 2,814 redirect source paths vs. 2,808 Netlify rules?
- 1,404 dataset redirect records generate $1,404 \times 2 = 2,808$ rules.
- 3 non-dataset navigation entries (`biology-cell-biology`, `chemistry-organic-chemistry`, `physics-mechanics`) have `legacySlug === canonicalSlug`.
- Emitting rules like `/biology-cell-biology /biology-cell-biology 301` would cause an immediate **redirect loop**!
- The generator skips these 6 self-redirects, yielding exactly **2,808 valid HTTP 301 rules**.

---

## 5. Disposition Breakdown & Quality Distribution

### 5.1 Approved HTTP 301 Redirect Records (1,404 records / 2,808 URLs)
- Target Quality Status:
  - **`verified`:** 985 records (1,970 URLs) pointing to 14 verified priority topics.
  - **`needs_review`:** 419 records (838 URLs) pointing to 4 priority topics awaiting specialist syllabus review.
  - **`insufficient`:** **0 records (0 URLs)**. Zero redirect rules point to placeholder topics.

### 5.2 Confirmed Permanently Obsolete Records (2,856 records / 5,712 URLs)
- Composed of:
  - **2,820 versioned duplicate records (`v1` through `v9`):** Synthetic duplicates generated by previous seed cycles with intra-deck repetition.
  - **36 unversioned records with incompatible education levels:** Nonsensical pairings such as *Kids Calculus*, *Kids Thermodynamics*, *Kids Operating Systems*, and *MCAT Shakespeare*.
- All 5,712 URLs represent permanently retired, low-quality synthetic content with no educational value. They are mapped to **HTTP 410 Gone**.

### 5.3 Manual-Review Records (741 records / 1,482 URLs)
- Composed of:
  - **613 records:** Level variants pointing to the 44 insufficient placeholder canonical topics.
  - **72 records:** Space-defect Computer Science records pointing to insufficient canonical topics.
  - **43 records:** Space-defect Computer Science records pointing to recovered canonical topics (`computer-science-algorithms`, `computer-science-data-structures`, `computer-science-machine-learning`).
  - **12 records:** Real seed topics paired with incompatible education levels (e.g. *MCAT Shakespeare*, *MCAT World War II*).
  - **1 navigation slug (2 URLs):** `/psychology-intro` (hardcoded footer link).
- **Policy Enforcement:** All 1,482 URLs are strictly **excluded** from automatic 301 or 410 rule generation. They fall through to the deliberate 404 response.

