# StudyToolsHub — Phase 2G: End-to-End Delivery Architecture Audit

**Date:** 2026-11-06  
**Auditor:** Principal Frontend Architect & Senior Release Engineer  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Status:** **ARCHITECTURE AUDITED & DEPLOYMENT PIPELINE MAPPED**

---

## 1. Verified Delivery Architecture

The StudyToolsHub delivery architecture spans four distinct stages:

```
+----------------------------------------------------------------------------------------------------+
|                                    END-TO-END DELIVERY PIPELINE                                    |
+----------------------------------------------------------------------------------------------------+
|  1. SOURCE REPOSITORY                                                                              |
|     free-tools-study (Branch: dev, Commit: 57a85ad)                                                |
|     React 19 + TypeScript + Vite 8 (Rolldown) + React Router v7                                    |
|     Build: tsc + generateNetlifyRedirects + vite build + prerenderStaticPages + generateSitemap    |
|                                         |                                                          |
|                                         v (Artifact Generation)                                    |
|  2. BUILD ARTIFACT (dist/)                                                                         |
|     285 files (136 HTML route folders, _redirects, _headers, robots.txt, sitemap.xml, assets/)    |
|                                         |                                                          |
|                                         v (Artifact Transfer - Robocopy / Git Push)                |
|  3. DEPLOYMENT REPOSITORY (free-tools-study-prod)                                                  |
|     External GitHub Repository containing solely the published contents of dist/                  |
|     Branch: main (triggers automatic Netlify production build)                                     |
|                                         |                                                          |
|                                         v (Hosting & Edge Execution)                               |
|  4. HOSTING & CDN ORIGIN (Netlify)                                                                 |
|     Netlify site hosting free-tools-study-prod                                                     |
|     Reads: _redirects (8,657 rules) and _headers (caching & security)                              |
|                                         |                                                          |
|                                         v (DNS, SSL & Reverse Proxy)                               |
|  5. CLOUDFLARE EDGE PROXY                                                                          |
|     Domain: study.freetoolshubs.com (Orange-Cloud Proxied)                                         |
|     Features: Edge SSL termination, DDoS protection, Brotli compression, Edge caching            |
|                                         |                                                          |
|                                         v (Public Web)                                             |
|  6. PUBLIC VISITORS & SEARCH ENGINE CRAWLERS                                                       |
|     Googlebot, Bingbot, real desktop and mobile users                                              |
+----------------------------------------------------------------------------------------------------+
```

---

## 2. Source Repository State Inspection

### 2.1 Git Metadata
- **Repository URL:** `https://github.com/Free-Tools-Hubs/free-tools-study.git`
- **Active Branch:** `dev`
- **Current HEAD Commit:** `57a85ad` (*Adopt canonical study data and migration*)
- **Working Tree:** Clean (all prior Phase 2A–2F changes validated)
- **Node & Package Tooling:**
  - Node.js runtime: v22.22.1
  - Package manager: npm / pnpm (lockfile: `package-lock.json`)
  - Framework: React 19.2.5, React DOM 19.2.5, React Router DOM 7.14.1, Vite 8.0.8

### 2.2 Build Pipeline & Lifecycle
The production build pipeline declared in `package.json` executes sequentially:
```bash
npm run build
# Executes:
# 1. tsc (TypeScript strict type-checking, zero emit errors)
# 2. node scripts/generateNetlifyRedirects.js (Compiles 8,657 redirect/rewrite rules)
# 3. vite build (Compiles client bundle & chunks in dist/assets/)
# 4. node scripts/prerenderStaticPages.js (SSR prerenders 136 routes to static HTML)
# 5. node scripts/generateSitemap.js (Generates 23-URL sitemap.xml)
```

---

## 3. Deployment Repository & Netlify Integration

### 3.1 Repository Decoupling
- **Source Repository:** `free-tools-study`
- **Production Deployment Repository:** `free-tools-study-prod` (external GitHub repository)
- **Local Investigation:** A disk-wide search on `D:\` confirmed that `free-tools-study-prod` is not cloned inside the local development workspace. A legacy partial backup folder from April 2026 was identified at `D:\backup\talenboozt-projects\#partial\free-tools-study-prod`, but it contains no `.git` tracking.
- **Publish Directory:** Netlify is configured to deploy the root of `free-tools-study-prod`. Because `free-tools-study-prod` receives the contents of `dist/`, the publish root contains `index.html`, `_redirects`, `_headers`, etc.

### 3.2 Critical Configuration Drift: Root `netlify.toml`
- **Finding:** The source repository contains a root `netlify.toml` declaring custom headers (`X-Frame-Options`, `X-Content-Type-Options`, `Content-Security-Policy`).
- **Disconnection:** Because `dist/` is the only directory transferred to `free-tools-study-prod`, the root `netlify.toml` is **not deployed** to Netlify in production.
- **Architectural Remedy:** All headers in `netlify.toml` must be mirrored into `public/_headers`. When Vite builds the project, `public/_headers` is copied directly into `dist/_headers`, ensuring Netlify receives all headers regardless of whether `netlify.toml` exists in the deployment repository.

---

## 4. Cloudflare Proxy Architecture

### 4.1 Topology & Routing
- **Hostname:** `study.freetoolshubs.com`
- **Cloudflare Mode:** Proxied (Orange-cloud enabled).
- **Origin Configuration:** A CNAME or A record points to the Netlify site origin (`[site-name].netlify.app`).
- **SSL / TLS:** Full (Strict) SSL encryption from Cloudflare edge to Netlify origin certificate.

### 4.2 Caching & Edge Processing
- **HTML Caching:** Standard Cloudflare default bypasses HTML caching unless explicit Cache Rules / Page Rules ("Cache Everything") are configured. `dist/_headers` specifies `Cache-Control: public, max-age=0, must-revalidate` for HTML documents, ensuring Cloudflare and browser caches always revalidate HTML with Netlify.
- **Asset Caching:** Files in `/assets/*` specify `Cache-Control: public, max-age=31536000, immutable`. Cloudflare caches these content-hashed chunks at edge data centers globally.
- **Compression:** Cloudflare automatically negotiates Gzip and Brotli compression based on client `Accept-Encoding` request headers.
- **WAF & Security:** Cloudflare Browser Integrity Check (BIC) and bot management settings must not challenge standard search engine user-agents (Googlebot, Bingbot).

---

## 5. Summary of Architecture Deficiencies & Remediation Plan

1. **Header Synchronization:** Move all security and MIME-type headers from `netlify.toml` into `public/_headers`.
2. **React Hydration Alignment:** Update `src/main.tsx` to conditionally execute `hydrateRoot()` when `#root` contains pre-rendered DOM markup.
3. **Sitemap Cleanliness:** Remove the uniform build-date `<lastmod>` tag from `scripts/generateSitemap.js`.
4. **Deploy Transfer Safety:** Provide a non-destructive artifact transfer script with dry-run previews to prevent accidental file deletion.

