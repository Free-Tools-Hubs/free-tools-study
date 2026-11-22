# StudyToolsHub — Phase 2G: Netlify Origin & Cloudflare Public Delivery Verification Report

**Date:** 2026-11-06  
**Auditor:** Principal Web Infrastructure Engineer & Cloudflare/Netlify Specialist  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Public Website:** `https://study.freetoolshubs.com/`  
**Netlify Origin Hostname:** `free-tools-study.netlify.app` (or custom site hash)  
**Status:** **STATIC ARCHITECTURE VERIFIED — LIVE NETWORK PROBING BLOCKED (OPERATOR RUNBOOK PROVIDED)**

---

## 1. Truthful Delivery Tier Status

In accordance with Phase 2G independent auditing rules:
> *"A successful Netlify origin response does not prove the Cloudflare-proxied public website works correctly. A successful Cloudflare response does not prove the Netlify origin is configured correctly. Test and report both layers separately... Do not fabricate HTTP results."*

### Empirical Environment Constraints:
Attempting outbound HTTP socket connection from within the local sandbox environment confirms network isolation:
`curl: (7) Failed to connect to study.freetoolshubs.com:443 over proxy 127.0.0.1`

Therefore, live external network calls are marked **BLOCKED BY ENVIRONMENT POLICY**. Below is the static architectural verification paired with the exact operational test suite for the site owner.

---

## 2. Layer A: Netlify Origin Architecture & Edge Execution

### 2.1 Static Edge Rules Inventory
Netlify processes two configuration files deployed in the publish root of `free-tools-study-prod`:
1. **`_headers`:**
   - Global HTML revalidation: `/*` -> `Cache-Control: public, max-age=0, must-revalidate`
   - Hashed asset caching: `/assets/*` -> `Cache-Control: public, max-age=31536000, immutable`
   - Security headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`
   - XML sitemap MIME type: `Content-Type: application/xml; charset=utf-8`
2. **`_redirects` (8,657 Rules):**
   - 2,808 HTTP 301 permanent redirects from legacy URLs to canonical slugs
   - 5,712 HTTP 410 gone rules for obsolete permutation records
   - 136 HTTP 200 static HTML rewrites
   - 1 HTTP 404 fallback rule: `/*  /404.html  404`

### 2.2 Operator Netlify Origin Smoke-Test Suite
Run these commands from an external terminal with network access against your direct Netlify origin (`https://[site-id].netlify.app`):

```bash
# 1. Prerendered HTML Document
curl -i https://[site-id].netlify.app/biology-cell-biology
# Expected: HTTP/2 200 | Cache-Control: max-age=0, must-revalidate | Non-empty HTML body

# 2. Approved Legacy 301 Redirect
curl -i https://[site-id].netlify.app/biology-cell-biology-flashcards
# Expected: HTTP/2 301 Moved Permanently | Location: /biology-cell-biology

# 3. Obsolete 410 URL
curl -i https://[site-id].netlify.app/biology-cell-biology-kids
# Expected: HTTP/2 410 Gone | Content from 410.html

# 4. Unknown Path 404 Fallback
curl -i https://[site-id].netlify.app/non-existent-random-page
# Expected: HTTP/2 404 Not Found | Content from 404.html

# 5. Production XML Sitemap
curl -i https://[site-id].netlify.app/sitemap.xml
# Expected: HTTP/2 200 OK | Content-Type: application/xml; charset=utf-8
```

---

## 3. Layer B: Cloudflare-Proxied Public Domain

### 3.1 Cloudflare Edge Behavior Analysis
`study.freetoolshubs.com` is configured behind Cloudflare's reverse proxy (Orange-cloud enabled). When a request hits Cloudflare:

1. **SSL / TLS Termination:** Cloudflare terminates client TLS and initiates a secure TLS connection to the Netlify origin.
2. **Header Passthrough & Modification:**
   - Cloudflare preserves origin `Cache-Control` headers.
   - For HTML (`max-age=0, must-revalidate`), Cloudflare passes requests through to Netlify or revalidates with origin via `If-None-Match`. Response header `cf-cache-status: DYNAMIC` or `BYPASS` is expected.
   - For `/assets/*` (`max-age=31536000, immutable`), Cloudflare caches chunks at the edge. Subsequent requests return `cf-cache-status: HIT`.
3. **Brotli Compression:** Cloudflare automatically compresses text payloads with Brotli (`content-encoding: br`), reducing HTML wire size by ~70–80%.
4. **WAF & Security Challenges:**
   - Cloudflare bot protection must allow Googlebot, Bingbot, and legitimate crawlers without triggering CAPTCHAs or JavaScript challenges (`Managed Challenge`).

### 3.2 Operator Cloudflare Public Domain Verification Matrix
Run these commands directly against the live public domain (`https://study.freetoolshubs.com/`):

```bash
# 1. Homepage Pre-rendered HTML & Cloudflare Headers
curl -i -H "Accept-Encoding: gzip, br" https://study.freetoolshubs.com/
# Verify:
# - HTTP/2 200
# - content-encoding: br
# - cf-ray header present
# - Pre-rendered DOM markup in body

# 2. Verified Topic & Canonical Header
curl -i https://study.freetoolshubs.com/biology-cell-biology | grep -i "canonical"
# Verify:
# - <link rel="canonical" href="https://study.freetoolshubs.com/biology-cell-biology" />

# 3. Quiz Route Canonicalization & Robots
curl -i https://study.freetoolshubs.com/quiz/biology-cell-biology | grep -E "canonical|robots"
# Verify:
# - <meta name="robots" content="noindex, follow" />
# - <link rel="canonical" href="https://study.freetoolshubs.com/biology-cell-biology" />

# 4. Edge 301 Redirect Traversal
curl -i https://study.freetoolshubs.com/biology-cell-biology-flashcards
# Verify:
# - HTTP/2 301 Moved Permanently
# - location: /biology-cell-biology

# 5. Edge 410 Gone Confirmation
curl -i https://study.freetoolshubs.com/biology-cell-biology-kids
# Verify:
# - HTTP/2 410 Gone

# 6. Edge 404 Soft-404 Elimination
curl -i https://study.freetoolshubs.com/random-url-xyz
# Verify:
# - HTTP/2 404 Not Found
```

---

## 4. Potential Cloudflare Edge Conflicts & Diagnostics

| Potential Cloudflare Conflict | Symptom | Diagnostic Indicator | Recommended Resolution |
|---|---|---|---|
| **Stale HTML Cache** | Old SPA shell served after release | `cf-cache-status: HIT` on HTML URLs | Ensure Cloudflare Page Rules do not have "Cache Everything" on `study.freetoolshubs.com/*`. HTML must revalidate. |
| **Bot Challenge on Crawlers** | Search engines cannot index pages | Google Search Console "Failed to fetch" | In Cloudflare Security -> Bots, verify "Verified Bots" is set to "Allow". |
| **301 Redirect Caching** | Obsolete redirects cached at edge | Legacy URL returns 301 to obsolete destination | Execute Cloudflare cache purge for specific legacy URL paths after release. |
| **SSL Handshake Loop** | "Too many redirects" error | Browser loops between HTTP and HTTPS | Set Cloudflare SSL/TLS encryption mode to "Full" or "Full (Strict)". |

---

## 5. Verification Status Summary

| Delivery Layer | Scope | Testing Method | Status |
|---|---|---|---|
| **Layer A (Netlify Origin)** | Edge rules, headers, prerendered files | Static syntax audit & in-memory simulation | **PASSED (Static)** |
| **Layer A (Netlify Origin)** | Live network socket responses | Direct origin curl | **BLOCKED (Requires Operator Network)** |
| **Layer B (Cloudflare Proxy)** | Edge caching, compression, WAF | Public domain curl | **BLOCKED (Requires Operator Network)** |

