# StudyToolsHub — Phase 2F: Deployment Artifact Packaging & Transfer Report

**Date:** 2026-11-05  
**Auditor:** Senior Release Engineer & Web Infrastructure Architect  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Source Repository:** `d:\freetoolshubs\free-tools-study`  
**Target Repository:** `free-tools-study-prod` (External Production Deployment Repository)  
**Artifact Manifest:** `dist-manifest.json` (SHA-256 Verified)  
**Status:** **PACKAGING COMPLETE & READY FOR TRANSFER**

---

## 1. Architecture Context: Separate Deployment Repository

As discovered in Phase 1 and confirmed in Phase 2F-A, the FreeToolsHub deployment architecture maintains two distinct repositories:
1. **Source Repository (`free-tools-study`):**
   - Contains React 19 + TypeScript + Vite source code, tests, documentation, and generators.
2. **Production Deployment Repository (`free-tools-study-prod`):**
   - Dedicated repository connected to Netlify production webhooks.
   - Contains solely the generated production build files (the contents of `dist/`).

Because of this separation, standard CI/CD direct branch pushes do not deploy production. Production deployment requires an explicit artifact transfer from `dist/` into the root of `free-tools-study-prod`.

---

## 2. Artifact Package Summary & Manifest

The complete contents of `dist/` were indexed and hashed using SHA-256 into `dist-manifest.json`.

### 2.1 High-Level Package Statistics

| Metric | Measured Value |
|---|---|
| **Total Files** | 285 files |
| **Total Uncompressed Size** | 8.28 MB (8,677,256 bytes) |
| **Prerendered HTML Documents** | 272 files (136 `/index.html` + 136 `/${slug}.html`) |
| **Dedicated Error Documents** | 2 files (`404.html`, `410.html`) |
| **Netlify Routing & Headers** | 2 files (`_redirects`, `_headers`) |
| **Search Engine Files** | 2 files (`robots.txt`, `sitemap.xml`) |
| **Client Bundles (`/assets`)** | 4 files (1 CSS, 3 JS chunks) |
| **Public Icons / Media** | 3 files (`vite.svg`, etc.) |

### 2.2 Critical Infrastructure File Hashes

| Relative Path | Size (Bytes) | SHA-256 Checksum | Purpose |
|---|---|---|---|
| `_redirects` | 337,163 | `2ea8693c1be4a613941865324ec78465fc2a50a1df277c08a9bf9543e498c442` | 8,657 Edge routing rules |
| `_headers` | 425 | `f592ba9cf2ab5d5dbcaeb0cbeaa17eb65e04cb245c48b26e033f74ce9a6ebc60` | Edge security & caching rules |
| `robots.txt` | 74 | `b78e63b652873130d4a974b88d8b4e7235a9f5d3768f001efce23cf2093a2160` | Crawler directives |
| `sitemap.xml` | 2,752 | `168670df5c760b9ebba407aa0e2b9560fecf31f9b3cf286bfeee5f00e26b1d40` | 23 Canonical URLs |
| `404.html` | 3,923 | `2a84e90897b233a0604f3fb8d43d1fb5233bc56598c11fb6bca0f5ec6696dbbb` | Anti-Soft-404 document |
| `410.html` | 3,989 | `2dc1a61c3fc9ebbf531c3c9fc2d1be31a238fb347c617c0c1ae0446736dd6505` | Gone confirmation document |

*(Complete checksums for all 285 files are recorded in [`dist-manifest.json`](file:///d:/freetoolshubs/free-tools-study/dist-manifest.json)).*

---

## 3. Step-by-Step Artifact Transfer Protocol

To guarantee that the production repository receives the exact build artifacts without orphaned legacy files, follow this standardized deployment sequence:

### Step 1: Ensure Clean Local Source Build
Verify that the current source repository has executed the full production pipeline:
```powershell
npm run build
node scripts/prerenderStaticPages.js
node scripts/generateSitemap.js
node scripts/generateDistManifest.js
```

### Step 2: Clone or Pull the Production Repository
Ensure your local clone of the deployment repository is up to date:
```bash
git clone git@github.com:freetoolshubs/free-tools-study-prod.git
# or if already cloned:
cd free-tools-study-prod
git checkout main
git pull origin main
```

### Step 3: Mirror the `dist/` Directory to Production
Use a clean mirroring command to copy all files while deleting obsolete assets from previous builds:
- **On Windows (PowerShell / Robocopy):**
  ```powershell
  robocopy "D:\freetoolshubs\free-tools-study\dist" "D:\path\to\free-tools-study-prod" /MIR /XD .git
  ```
- **On macOS / Linux (rsync):**
  ```bash
  rsync -av --delete --exclude='.git' /path/to/free-tools-study/dist/ /path/to/free-tools-study-prod/
  ```

### Step 4: Verify Deployment Repository Checksums
Run a post-transfer checksum verification script against `dist-manifest.json` inside the target directory to verify 0 dropped or corrupted files.

### Step 5: Verify Git Tracking of Critical Underscore Files
Ensure that `.gitignore` in the production repository does NOT ignore files starting with an underscore:
```bash
git status
# Must show _redirects and _headers as modified/tracked!
```

### Step 6: Commit and Push
```bash
git add -A
git commit -m "chore(release): StudyToolsHub Phase 2 recovery deployment [285 files, 23 canonical sitemap]"
git push origin main
```

---

## 4. Verification Checkpoints After Transfer

Once pushed to `free-tools-study-prod`, the following automated checks should be confirmed on the Netlify dashboard:
1. **Deploy Hook Trigger:** Netlify should initiate a build with trigger `Git push to main`.
2. **Redirect Rules Processed:** The deploy log must state:
   `8,657 redirect rules processed`
3. **Header Rules Processed:** The deploy log must state:
   `4 header rules processed`
4. **Deploy Status:** Deploy state turns to `Published`.

