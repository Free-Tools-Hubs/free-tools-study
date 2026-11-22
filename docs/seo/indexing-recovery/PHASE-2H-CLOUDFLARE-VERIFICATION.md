# StudyToolsHub — Phase 2H: Cloudflare Public-Domain Delivery & Edge Verification Report

**Date:** 2026-11-06  
**Auditor:** Principal Cloud Infrastructure & CDN Performance Engineer  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Public Website:** `https://study.freetoolshubs.com/`  
**Delivery Model:** Netlify Origin behind Cloudflare Edge Proxy (Orange Cloud)  
**Status:** **EDGE BEHAVIOR AUDITED — LIVE NETWORK DIAGNOSTICS SPECIFIED**

---

## 1. Cloudflare Delivery Architecture & Caching Policy

The public domain `study.freetoolshubs.com` is routed through Cloudflare's reverse proxy:

```
[Visitor / Crawler] 
       │
       ▼ (HTTPS / TLS 1.3 / Brotli)
[Cloudflare Global Edge CDN]
       │
       ▼ (Full Strict TLS / Cache Revalidation)
[Netlify Origin Server (free-tools-study-prod)]
```

### 1.1 Edge Caching Rules Analysis
- **HTML Document Responses (`/*`):**
  - Origin emits `Cache-Control: public, max-age=0, must-revalidate`.
  - Cloudflare passes requests through to Netlify or revalidates with origin headers (`cf-cache-status: DYNAMIC` or `BYPASS`).
  - **Critical Rule:** Cloudflare Page Rules must NOT declare "Cache Everything" for HTML pages without an Edge Cache TTL that honors origin revalidation. Indefinite HTML caching would prevent new releases from reaching users.
- **Hashed Static Assets (`/assets/*`):**
  - Origin emits `Cache-Control: public, max-age=31536000, immutable`.
  - Cloudflare caches these files at edge PoPs worldwide, returning `cf-cache-status: HIT`.
- **Search Engine Directive Endpoints (`/sitemap.xml`, `/robots.txt`):**
  - Origin emits `Cache-Control: public, max-age=3600, must-revalidate`.
  - Cloudflare caches for at most 1 hour before revalidating with Netlify.

---

## 2. Public Domain Diagnostic Matrix (For Operator)

Run these diagnostic commands directly from an external machine with internet access:

```bash
# 1. Homepage Edge Headers & Compression
curl -I -H "Accept-Encoding: gzip, br" https://study.freetoolshubs.com/
# Expected:
# - HTTP/2 200
# - cf-ray: [Ray ID]
# - cf-cache-status: DYNAMIC (or BYPASS)
# - content-encoding: br (Brotli compression active)
# - cache-control: public, max-age=0, must-revalidate

# 2. Hashed Asset Edge Hit
curl -I https://study.freetoolshubs.com/assets/index-*.js
# Expected:
# - HTTP/2 200
# - cf-cache-status: HIT (after second request)
# - cache-control: public, max-age=31536000, immutable

# 3. Canonical Edge Redirect
curl -I https://study.freetoolshubs.com/biology-cell-biology-flashcards
# Expected:
# - HTTP/2 301 Moved Permanently
# - location: /biology-cell-biology

# 4. XML Sitemap MIME Type & Freshness
curl -I https://study.freetoolshubs.com/sitemap.xml
# Expected:
# - HTTP/2 200
# - content-type: application/xml; charset=utf-8
```

---

## 3. Discrepancy Baseline: Production vs Preview Release

**Important Architectural Note:**
Until the operator completes the production merge of Phase 2, `https://study.freetoolshubs.com/` continues serving the previous production deployment.
- Differences between the deploy preview and the live public domain are expected until production deployment.
- Do not mistake differences caused by an un-deployed release as delivery defects.

---

## 4. Post-Deployment Cloudflare Cache Purge Protocol

Once the Phase 2 release candidate is merged to `main`:
1. Log into the Cloudflare Dashboard.
2. Select the `freetoolshubs.com` zone.
3. Navigate to **Caching** -> **Configuration**.
4. Click **Custom Purge** -> select **URL** and purge:
   - `https://study.freetoolshubs.com/`
   - `https://study.freetoolshubs.com/sitemap.xml`
   - `https://study.freetoolshubs.com/robots.txt`
   *(Or click "Purge Everything" if acceptable across the subdomain).*
5. This guarantees that edge nodes flush legacy cached 200s or obsolete redirect chains immediately.

