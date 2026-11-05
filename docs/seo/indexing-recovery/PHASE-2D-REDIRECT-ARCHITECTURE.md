# StudyToolsHub — Netlify Redirect Architecture & HTTP Status Strategy

**Document Status:** Technical Architecture & Policy Specification  
**Phase:** Phase 2D — HTTP Routing & Netlify Infrastructure  
**Generator:** `scripts/generateNetlifyRedirects.js`  
**Validator:** `scripts/validateNetlifyRedirects.js`  
**Date:** March 2026  

---

## 1. Architectural Strategy

The Phase 2D redirect architecture replaces the naive single-line SPA catch-all (`/* /index.html 200`) with an explicit, multi-tiered Netlify edge routing configuration that enforces genuine HTTP semantics for search crawlers while preserving full SPA client hydration for students.

```
                           INCOMING REQUEST TO NETLIFY EDGE
                                          │
                                          ▼
                   ┌──────────────────────────────────────────────┐
                   │   Static File on Disk? (/assets/*, /logo.svg)│ ──YES──► HTTP 200 (Static File)
                   └──────────────────────┬───────────────────────┘
                                          │ NO
                                          ▼
                   ┌──────────────────────────────────────────────┐
                   │ Approved Legacy Redirect? (2,808 Rules)      │ ──YES──► HTTP 301 Permanent Redirect
                   └──────────────────────┬───────────────────────┘
                                          │ NO
                                          ▼
                   ┌──────────────────────────────────────────────┐
                   │ Confirmed Obsolete URL? (5,712 Rules)        │ ──YES──► HTTP 410 Gone (/410.html)
                   └──────────────────────┬───────────────────────┘
                                          │ NO
                                          ▼
                   ┌──────────────────────────────────────────────┐
                   │ Valid Canonical Topic or Page? (136 Rules)   │ ──YES──► HTTP 200 Rewrite to /index.html
                   └──────────────────────┬───────────────────────┘
                                          │ NO
                                          ▼
                   ┌──────────────────────────────────────────────┐
                   │ Final Fallback for Unknown & Missing URLs    │ ───────► HTTP 404 Not Found (/404.html)
                   │ (/* /404.html 404)                           │
                   └──────────────────────────────────────────────┘
```

---

## 2. Netlify Rule Ordering

Netlify evaluates `_redirects` sequentially from top to bottom, stopping at the first matching rule. Rules in `_redirects` override rules in `netlify.toml`.

### Tier 1: Approved Canonical Legacy Redirects (HTTP 301) — Lines 1 to 2,817
- **Quantity:** 2,808 rules (1,404 Flashcard + 1,404 Quiz).
- **Semantics:** Returns HTTP 301 with `Location: /canonical-slug` or `Location: /quiz/canonical-slug`.
- **Purpose:** Transfers accumulated legacy link equity, search rank, and bookmarks from unversioned level variants directly to their canonical destination.
- **Rule Syntax:**
  ```text
  /biology-cell-biology-high-school  /biology-cell-biology  301
  /quiz/biology-cell-biology-high-school  /quiz/biology-cell-biology  301
  ```

### Tier 2: Confirmed Permanently Obsolete URLs (HTTP 410 Gone) — Lines 2,818 to 8,534
- **Quantity:** 5,712 rules (2,856 Flashcard + 2,856 Quiz).
- **Semantics:** Returns HTTP 410 with the standalone `410.html` body.
- **Purpose:** Instructs Googlebot and search indexers that synthetic cycle duplicates (`-v1` through `-v9`) and incompatible level combinations have been permanently decommissioned and will never return, accelerating de-indexing.
- **Rule Syntax:**
  ```text
  /physics-quantum-physics-sat  /410.html  410
  /quiz/physics-quantum-physics-sat  /410.html  410
  /computer%20science-operating-systems-kids  /410.html  410
  ```

### Tier 3: Explicit Valid Canonical Application Routes (HTTP 200 Rewrite) — Lines 8,535 to 8,675
- **Quantity:** 136 rules.
  - 5 Static legal and informational pages (`/about`, `/contact`, `/privacy-policy`, `/terms-of-service`, `/study-timetable-template`).
  - 1 Dynamic planner parameter route (`/planner/:examType`).
  - 65 Canonical Flashcard routes (`/${canonicalSlug}`).
  - 65 Canonical Quiz routes (`/quiz/${canonicalSlug}`).
- **Semantics:** Rewrites the internal request to `/index.html` with status HTTP 200, enabling browser refresh and deep linking within the React SPA.
- **Rule Syntax:**
  ```text
  /about  /index.html  200
  /biology-cell-biology  /index.html  200
  /quiz/biology-cell-biology  /index.html  200
  ```

### Tier 4: Deliberate Final Fallback for Unknown & Missing URLs (HTTP 404) — Line 8,676
- **Quantity:** 1 rule.
- **Semantics:** Returns HTTP 404 with the standalone `404.html` body.
- **Purpose:** Completely eliminates Soft-404. Any unmapped, random, or missing asset URL returns a legitimate HTTP 404 status.
- **Rule Syntax:**
  ```text
  /*  /404.html  404
  ```

---

## 3. Platform & Specification Constraints

### 3.1 Netlify Status Code Support
Netlify's redirect processor (`@netlify/redirect-parser`) natively supports HTTP status codes in the range `200–599`, including `301`, `302`, `404`, and `410`.
By pairing `/410.html 410` and `/404.html 404`, Netlify returns the exact status code to crawlers while presenting a styled, informative HTML document to human visitors.

### 3.2 URL Encoding for Spaces in Paths
In Netlify's `_redirects` file, whitespace (spaces and tabs) acts as the column separator between `<from>`, `<to>`, and `<status>`.
Any raw space in a source path corrupts column alignment. In accordance with Netlify documentation:
- All legacy Computer Science paths containing spaces (e.g. `computer science-operating-systems-kids`) are encoded as `%20`:
  ```text
  /computer%20science-operating-systems-kids  /410.html  410
  ```
- This ensures 100% syntactic validity and clean parsing.

### 3.3 Rule Count & Serialization Limits
- Netlify enforces no hard count limit on `_redirects` lines, but recommends keeping files under serialization limits.
- Total rules generated: **8,657 lines**.
- Total file size: **527,662 bytes (~527 KB)**.
- Build testing confirms Netlify processes this file in under 2 seconds without warnings.

---

## 4. Elimination of Configuration Drift (`netlify.toml`)

Prior to Phase 2D, `netlify.toml` contained:
```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```
Netlify appends rules from `netlify.toml` *after* `_redirects`. If a request fell through `_redirects`, this rule would catch it and return HTTP 200, reintroducing Soft-404.
The `[[redirects]]` block has been removed from `netlify.toml`. All redirect rules are now exclusively generated into `public/_redirects` (and copied by Vite to `dist/_redirects`).

---

## 5. Client-Side vs. Server-Side Redirection Synergy

In Phase 2C, an in-browser redirect layer was added to `Flashcards.tsx` and `Quiz.tsx` using `legacySlugRedirectMap.json` (97 KB).
- **First Load (External Click or Crawler):** Netlify intercepts the request at the edge and returns HTTP 301 immediately. The browser navigates to the canonical URL before downloading the React bundle.
- **Client-Side SPA Navigation:** If an internal Link or stored user state navigates to a legacy slug within an active React session, `studyDataService.resolveTopic()` catches the legacy slug and triggers `navigate(canonicalSlug, { replace: true })`, updating the address bar without a network round-trip.
- **No Conflict or Loop:** Both client-side and server-side rules share the exact same mapping definitions generated from `legacyTopicUrlManifest.json`.

