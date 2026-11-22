# StudyToolsHub — Phase 2G: Safe Deployment Artifact Transfer Protocol

**Date:** 2026-11-06  
**Auditor:** Senior Release Engineer & Web Infrastructure Architect  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Tool:** `scripts/safeArtifactTransfer.js`  
**Status:** **AUDITED, DRY-RUN PROTECTED & MANIFEST VERIFIED**

---

## 1. Context & Architectural Safety Boundaries

As established throughout the SEO recovery project:
1. **Source Repository (`free-tools-study`):** Contains React 19 source, tests, TypeScript configurations, and documentation.
2. **Production Deployment Repository (`free-tools-study-prod`):** Contains exclusively the published output of `dist/` deployed via Netlify.

### The Danger of Raw `robocopy /MIR`:
In Phase 2F, a basic robocopy command was suggested:
`robocopy source\dist destination /MIR /XD .git`

While functional in an automated CI container, running `/MIR` locally carries severe risks:
- If the operator mistakenly points to the wrong destination directory, `/MIR` permanently deletes all files in that directory without a confirmation prompt.
- If `.git` or `.github` subfolders are not strictly protected, Git repository history or deployment actions can be destroyed.

---

## 2. Dedicated Safe Transfer Engine (`scripts/safeArtifactTransfer.js`)

To eliminate transfer risks, a dedicated transfer utility was engineered with multi-layered safety gates:

### Core Safety Features:
1. **Preview / Dry-Run by Default:** Running the tool without `--confirm` performs zero filesystem writes. It prints an itemized diff of files to add, files to update, files unchanged, and files slated for deletion.
2. **Strict Repository Whitelist:** Protected deployment repository assets (`.git`, `.gitignore`, `.gitattributes`, `.github`, `README.md`, `netlify.toml`) are completely immune to deletion.
3. **Explicit Write Confirmation:** Files are only modified when `--confirm` is explicitly passed.
4. **Byte-Level Checksum Matching:** Compares SHA-256 hashes of source files vs destination files before copying, skipping unchanged assets.

---

## 3. Operator Execution Protocol

When ready to transfer build artifacts to `free-tools-study-prod`:

### Step 1: Ensure Latest Production Build
```powershell
cd D:\freetoolshubs\free-tools-study
npm run build
node scripts/generateDistManifest.js
```

### Step 2: Run Transfer Preview (Dry-Run)
Execute the dry-run against the deployment repository clone:
```powershell
node scripts/safeArtifactTransfer.js "D:\path\to\free-tools-study-prod"
```

**Expected Output:**
```
Source Path:      D:\freetoolshubs\free-tools-study\dist
Destination Path: D:\path\to\free-tools-study-prod
Execution Mode:   PREVIEW / DRY-RUN (No files modified)

--- Transfer Operation Diff ---
  Files to Add:      285
  Files to Update:   0
  Files Unchanged:   0
  Orphan Deletions:  0
```

### Step 3: Execute Confirmed Transfer
Once the diff is reviewed and approved, pass `--confirm`:
```powershell
node scripts/safeArtifactTransfer.js "D:\path\to\free-tools-study-prod" --confirm
```

### Step 4: Verify Deployment Repository Working Tree
Navigate to the deployment repository and inspect Git status:
```bash
cd D:\path\to\free-tools-study-prod
git status
```
- Confirm `_redirects` and `_headers` are staged/tracked.
- Confirm 136 HTML route folders and assets exist.
- Confirm zero unauthorized files were committed.

---

## 4. Current Artifact Manifest Summary (`dist-manifest.json`)

| Manifest Property | Metric | Description |
|---|---|---|
| **Total Files** | 285 files | 136 route folders, error pages, routing rules, headers, assets |
| **Total Uncompressed Size** | 8.27 MB (8,676,869 bytes) | Verified against SHA-256 manifest |
| **Edge Rules (`_redirects`)** | 8,657 lines | 2,808 301s, 5,712 410s, 136 200s, 1 404 |
| **Edge Headers (`_headers`)** | 20 lines | Security headers, HTML revalidation, asset caching |
| **Sitemap (`sitemap.xml`)** | 23 URLs | 6 static core pages + 17 verified topics (zero lastmod) |

*(Full SHA-256 hashes for all 285 files are recorded in [`dist-manifest.json`](file:///d:/freetoolshubs/free-tools-study/dist-manifest.json)).*

