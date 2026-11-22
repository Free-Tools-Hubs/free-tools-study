# StudyToolsHub — Phase 2G: Operator Deploy-Preview & Safe Rollout Runbook

**Date:** 2026-11-06  
**Auditor:** Senior Release Engineer & Web Infrastructure Architect  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Target Deployment Repository:** `free-tools-study-prod`  
**Status:** **OPERATOR ACTION REQUIRED (Step-by-Step Instructions)**

---

## 1. Safety Directive: Preventing Accidental Production Publishing

In the Netlify hosting architecture connected to `free-tools-study-prod`:
- **Branch `main`** is configured as the **Production Branch**. Any push or merge directly into `main` immediately triggers a live production release published to `https://study.freetoolshubs.com/`.
- **Feature / Preview Branches** (e.g., `preview/phase-2-release`) trigger **Deploy Previews**. Netlify assigns them an isolated, non-production URL (e.g., `https://deploy-preview-123--free-tools-study.netlify.app`).

**RULE:** Never push directly to `main` until the Deploy Preview has been tested and approved.

---

## 2. Step-by-Step Operator Runbook

### Step 1: Clone or Locate the Deployment Repository
If not already cloned locally:
```bash
git clone git@github.com:Free-Tools-Hubs/free-tools-study-prod.git D:\deployments\free-tools-study-prod
cd D:\deployments\free-tools-study-prod
git checkout main
git pull origin main
```

### Step 2: Create an Isolated Preview Branch
Ensure you are on a separate non-production branch:
```bash
git checkout -b preview/phase-2g-validation
```

### Step 3: Run the Safe Transfer Engine in Dry-Run Mode
From the source repository (`D:\freetoolshubs\free-tools-study`):
```powershell
cd D:\freetoolshubs\free-tools-study
node scripts/safeArtifactTransfer.js "D:\deployments\free-tools-study-prod"
```
- Review the diff output.
- Confirm that 285 files are staged to be added/updated and zero protected files (`.git`, `.github`, `README.md`) are touched.

### Step 4: Execute the Confirmed Transfer
Once the dry-run diff is verified:
```powershell
node scripts/safeArtifactTransfer.js "D:\deployments\free-tools-study-prod" --confirm
```

### Step 5: Verify Deployment Repository Checksums
In `free-tools-study-prod`:
```bash
cd D:\deployments\free-tools-study-prod
git status
```
Verify that:
- `_redirects` and `_headers` are modified/added.
- `sitemap.xml` and `robots.txt` are present.
- All 136 HTML route folders and `/assets/*` chunks are present.

### Step 6: Commit and Push the Preview Branch
```bash
git add -A
git commit -m "chore(release): StudyToolsHub Phase 2G release candidate [285 files, 23 canonical sitemap]"
git push -u origin preview/phase-2g-validation
```

### Step 7: Open Pull Request on GitHub to Trigger Deploy Preview
1. Navigate to `https://github.com/Free-Tools-Hubs/free-tools-study-prod/pulls`.
2. Open a Pull Request from `preview/phase-2g-validation` into `main`.
3. Within 60–90 seconds, the Netlify GitHub Bot will post a comment containing the Deploy Preview URL:
   `Deploy Preview URL: https://deploy-preview-XX--free-tools-study.netlify.app`

---

## 3. Deploy-Preview Testing Matrix (Execute Against Preview URL)

Run these curl verification commands against the preview URL:

### Test 1: Prerendered HTML Document & Headers
```bash
curl -i https://deploy-preview-XX--free-tools-study.netlify.app/biology-cell-biology
```
- **Check Status:** `HTTP/2 200`
- **Check Headers:** `Cache-Control: public, max-age=0, must-revalidate`
- **Check Body:** Pre-rendered HTML present inside `<div id="root">...</div>`
- **Check Canonical:** `<link rel="canonical" href="https://study.freetoolshubs.com/biology-cell-biology" />`
- **Check Robots:** `<meta name="robots" content="index, follow" />`

### Test 2: Quiz Canonicalization & Robots
```bash
curl -i https://deploy-preview-XX--free-tools-study.netlify.app/quiz/biology-cell-biology
```
- **Check Status:** `HTTP/2 200`
- **Check Canonical:** `<link rel="canonical" href="https://study.freetoolshubs.com/biology-cell-biology" />`
- **Check Robots:** `<meta name="robots" content="noindex, follow" />`

### Test 3: Legacy URL 301 Permanent Redirect
```bash
curl -i https://deploy-preview-XX--free-tools-study.netlify.app/biology-cell-biology-flashcards
```
- **Check Status:** `HTTP/2 301 Moved Permanently`
- **Check Location:** `/biology-cell-biology`

### Test 4: Permanently Obsolete URL 410 Gone
```bash
curl -i https://deploy-preview-XX--free-tools-study.netlify.app/biology-cell-biology-kids
```
- **Check Status:** `HTTP/2 410 Gone`
- **Check Body:** Displays `410.html` content

### Test 5: Unknown URL 404 Fallback (Anti-Soft-404)
```bash
curl -i https://deploy-preview-XX--free-tools-study.netlify.app/random-missing-page
```
- **Check Status:** `HTTP/2 404 Not Found`
- **Check Body:** Displays `404.html` content

### Test 6: Production XML Sitemap
```bash
curl -i https://deploy-preview-XX--free-tools-study.netlify.app/sitemap.xml
```
- **Check Status:** `HTTP/2 200 OK`
- **Check Headers:** `Content-Type: application/xml; charset=utf-8`
- **Check Body:** Exactly 23 URLs, zero `<lastmod>` tags.

---

## 4. Production Go-Live & Post-Release Procedure

Once all 6 preview tests pass:

1. **Merge Pull Request:** Merge `preview/phase-2g-validation` into `main` on GitHub.
2. **Netlify Production Publish:** Netlify deploys `main` to the production site automatically.
3. **Cloudflare Cache Purge:** In the Cloudflare Dashboard:
   - Navigate to **Caching** -> **Configuration**.
   - Click **Purge Everything** (or purge specific legacy HTML URLs) to ensure Cloudflare edge nodes flush any stale SPA responses.
4. **Google Search Console (GSC):**
   - In GSC, submit `https://study.freetoolshubs.com/sitemap.xml`.
   - Run URL Inspection on `https://study.freetoolshubs.com/biology-cell-biology`.
   - Click **Test Live URL** and confirm that Googlebot renders the complete pre-hydrated HTML.
   - Click **Request Indexing**.

---

## 5. Rollback Runbook (In Case of Anomaly)

If an edge anomaly is detected on production:
1. In the Netlify Dashboard, navigate to **Deploys**.
2. Locate the previous production deployment.
3. Click **Options** -> **Publish deploy**.
4. Netlify will instantly roll back the production origin to the previous release in under 5 seconds.

