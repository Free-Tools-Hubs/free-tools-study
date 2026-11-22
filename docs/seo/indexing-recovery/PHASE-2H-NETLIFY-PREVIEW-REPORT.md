# StudyToolsHub — Phase 2H: Netlify Deploy Preview Creation & Environment Report

**Date:** 2026-11-06  
**Auditor:** Principal Release Engineer & Netlify Deployment Specialist  
**Project:** StudyToolsHub (`https://study.freetoolshubs.com/`)  
**Workspace:** `d:\freetoolshubs\free-tools-study`  
**Deploy-Preview Status:** **EXTERNAL DEPENDENCY — PENDING OPERATOR AUTHORIZATION**

---

## 1. Truthful Authorization & Environmental Status

Per the Phase 2H safety mandate:
> *"Never push directly to the production branch... Never assume a deploy preview exists. Never invent a preview URL... Classify unavailable tests as BLOCKED."*

### Current Deployment Environment Assessment:
1. **Repository Boundary:**
   - The active local workspace is the development repository (`free-tools-study`).
   - The production hosting on Netlify is connected to the separate external repository (`free-tools-study-prod`).
2. **Access Token Availability:**
   - No `NETLIFY_AUTH_TOKEN` or `NETLIFY_SITE_ID` exists in the local development environment or `.env` files.
   - The local environment lacks authenticated push credentials for remote Git hosting (`github.com/Free-Tools-Hubs/free-tools-study-prod.git`).
3. **Sandbox Network Policy:**
   - Outbound network requests are restricted by sandbox policy.

**Status:** A live Netlify Deploy-Preview cannot be provisioned autonomously by the agent without external operator credentials. The preview must be triggered by the repository owner following the protocol below.

---

## 2. Safe Preview Creation Protocol (For Operator)

To instantiate an isolated Netlify Deploy Preview without risking production publishing:

### Step 1: Create a Dedicated Feature Branch in `free-tools-study-prod`
```bash
cd D:\deployments\free-tools-study-prod
git checkout main
git pull origin main
git checkout -b preview/phase-2h-validation
```

### Step 2: Apply the Verified Build Artifacts
From `D:\freetoolshubs\free-tools-study`:
```powershell
node scripts/safeArtifactTransfer.js "D:\deployments\free-tools-study-prod" --confirm
```

### Step 3: Commit and Push to the Preview Branch
```bash
cd D:\deployments\free-tools-study-prod
git add -A
git commit -m "chore(release): StudyToolsHub Phase 2H release candidate [285 files, 23 canonical sitemap]"
git push -u origin preview/phase-2h-validation
```

### Step 4: Open a Non-Production Pull Request on GitHub
1. Go to `https://github.com/Free-Tools-Hubs/free-tools-study-prod/pulls`.
2. Open a Pull Request from `preview/phase-2h-validation` into `main`.
3. **DO NOT MERGE THE PULL REQUEST.**
4. Netlify's GitHub integration will automatically build and publish a preview comment:
   `Deploy Preview: https://deploy-preview-XX--free-tools-study.netlify.app`
5. Copy the generated URL to execute the test suite in `PHASE-2H-NETLIFY-HTTP-RESULTS.md`.

---

## 3. Pre-Merge Verification Gate

The Pull Request must remain in open draft status until:
1. All 15 route categories in `PHASE-2H-NETLIFY-HTTP-RESULTS.md` pass with expected HTTP status codes.
2. The pre-rendered HTML DOM is verified in a browser.
3. Sitemap XML and robots.txt are confirmed reachable and compliant.

Once verified, the operator can safely merge into `main` to trigger the automatic production deployment.

