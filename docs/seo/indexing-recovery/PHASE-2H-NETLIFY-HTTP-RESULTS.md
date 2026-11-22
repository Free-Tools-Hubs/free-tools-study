# StudyToolsHub — Phase 2H: Netlify Deploy Preview HTTP Results & Route Matrix

**Date:** 2026-11-06  
**Auditor:** Principal Infrastructure & Technical SEO Auditor  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Test Automation Script:** `scripts/testDeployPreviewHTTP.ps1`  
**Status:** **TEST SUITE SPECIFIED — EXECUTION BLOCKED PENDING OPERATOR PREVIEW URL**

---

## 1. Required 15-Category Verification Route Matrix

The operator must execute `scripts/testDeployPreviewHTTP.ps1` against the live deploy-preview URL once provisioned. Below is the full specification matrix:

| Category ID | Route Category | Sample Test URL | Expected Status | Expected Redirect / Target | Robots Header / Meta |
|---|---|---|:---:|---|---|
| **CAT-01** | Homepage | `/` | **200** | `/index.html` | `index, follow` |
| **CAT-02** | Static Utility | `/about` | **200** | `/about/index.html` | `index, follow` |
| **CAT-03** | Static Utility | `/contact` | **200** | `/contact/index.html` | `index, follow` |
| **CAT-04** | Study Planner | `/study-timetable-template` | **200** | `/study-timetable-template/index.html` | `index, follow` |
| **CAT-05** | Verified Topic | `/biology-cell-biology` | **200** | `/biology-cell-biology/index.html` | `index, follow` |
| **CAT-06** | Verified Topic | `/computer-science-algorithms` | **200** | `/computer-science-algorithms/index.html` | `index, follow` |
| **CAT-07** | Needs Review Topic | `/economics-macroeconomics` | **200** | `/economics-macroeconomics/index.html` | `noindex, follow` |
| **CAT-08** | Insufficient Topic | `/biology-botany` | **200** | `/biology-botany/index.html` | `noindex, follow` |
| **CAT-09** | Quiz Interactive Tool | `/quiz/biology-cell-biology` | **200** | `/quiz/biology-cell-biology/index.html` | `noindex, follow` (Canonical to `/:slug`) |
| **CAT-10** | Legacy 301 Flashcard | `/biology-cell-biology-flashcards` | **301** | `/biology-cell-biology` | Location header |
| **CAT-11** | Legacy 301 Quiz | `/quiz/biology-cell-biology-flashcards` | **301** | `/quiz/biology-cell-biology` | Location header |
| **CAT-12** | Obsolete 410 Flashcard | `/biology-cell-biology-kids` | **410** | Serves `/410.html` content | 410 status |
| **CAT-13** | Unknown Path Fallback | `/nonexistent-url-random` | **404** | Serves `/404.html` content | 404 status (No soft-404) |
| **CAT-14** | Production XML Sitemap | `/sitemap.xml` | **200** | Direct static file | `Content-Type: application/xml` |
| **CAT-15** | Production Robots.txt | `/robots.txt` | **200** | Direct static file | `Content-Type: text/plain` |

---

## 2. Preview Environment vs Production SEO Header Distinction

When evaluating HTTP response headers on a Netlify Deploy Preview:

1. **Netlify Preview X-Robots-Tag:**
   - Netlify automatically injects `x-robots-tag: noindex` into the HTTP response headers of all `deploy-preview-*.netlify.app` URLs to prevent search engines from indexing draft staging environments.
   - **Auditor Note:** Do NOT mistake Netlify's hosting-level preview protection for a defect in the application's SEO configuration.
2. **Production HTML Document Directives:**
   - The application's true production indexing behavior is declared in the HTML document `<head>` via `<meta name="robots" content="..." />`.
   - On the 17 verified topics, the HTML contains `<meta name="robots" content="index, follow" />`.
   - On the 48 unverified topics and 65 quiz routes, the HTML contains `<meta name="robots" content="noindex, follow" />`.
   - When merged to `main` and published to `https://study.freetoolshubs.com/`, Netlify removes the staging `x-robots-tag`, allowing search engines to index the 17 verified topics per the HTML meta tags.

---

## 3. Automated PowerShell Execution Instructions

Run the test suite directly from an external PowerShell terminal with internet access:

```powershell
# Syntax:
.\scripts\testDeployPreviewHTTP.ps1 -PreviewUrl "https://deploy-preview-XX--free-tools-study.netlify.app"
```

The script evaluates all 17 endpoint rules without following redirects, capturing raw HTTP response statuses and reporting PASS/FAIL status for each category.

