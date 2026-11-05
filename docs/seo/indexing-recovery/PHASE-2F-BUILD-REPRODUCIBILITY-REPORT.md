# StudyToolsHub — Phase 2F: Build Reproducibility & Determinism Report

## 1. Overview & Verification Scope

An essential requirement of Phase 2F is proving that the production build of StudyToolsHub is completely reproducible from a clean slate, executes in the correct dependency order, produces zero transient or machine-specific artifacts, and yields byte-for-byte deterministic outputs across multiple build runs.

The production build command defined in `package.json` is:
```json
"build": "tsc && node scripts/generateNetlifyRedirects.js && vite build && node scripts/prerenderStaticPages.js && node scripts/generateSitemap.js"
```

---

## 2. Clean Build Lifecycle & Execution Trace

The build was executed starting from an empty workspace where `dist/` was completely removed prior to invocation.

### Build Run 1 Trace (Timestamp: 2026-11-05T23:39:15.704Z)

| Stage | Process / Command | Exit Code | Duration | Key Outputs Produced |
|---|---|:---:|---:|---|
| **1. Typecheck** | `tsc --noEmit` | `0` | 2.10 s | 0 TypeScript errors |
| **2. Redirects** | `scripts/generateNetlifyRedirects.js` | `0` | 0.42 s | `public/_redirects` (8,657 rules, 527,662 bytes) |
| **3. Client Build** | `vite build` | `0` | 1.96 s | `dist/` client bundles (`index-*.js`, `vendor-*.js`, `study-data-*.js`, CSS) |
| **4. SSR Prerender** | `scripts/prerenderStaticPages.js` | `0` | 1.41 s | 136 static HTML files in `dist/` (3.09 MB total HTML) |
| **5. Sitemap** | `scripts/generateSitemap.js` | `0` | 0.02 s | `public/sitemap.xml` & `dist/sitemap.xml` (23 URLs) |
| **Total** | Full Sequential Build | `0` | **6.54 s** | Complete `dist/` deployment artifact |

---

## 3. Determinism Verification (Two-Run Hash Comparison)

To detect non-deterministic compilation, unseeded random sorting, or timestamp drift, `dist/` was completely deleted again, and a second clean build was executed. Key artifact hashes were captured and compared using SHA-256 (truncated to 16 characters for reporting):

| Artifact Path | Build Run 1 Hash | Build Run 2 Hash | Match Status |
|---|---|---|:---:|
| `dist/_redirects` | `0714b96443212769` | `0714b96443212769` | **IDENTICAL** |
| `dist/sitemap.xml` | `065c4e66c0a9da74` | `065c4e66c0a9da74` | **IDENTICAL** |
| `dist/robots.txt` | `b57592239d98ff9e` | `b57592239d98ff9e` | **IDENTICAL** |
| `dist/404.html` | `7fc7ebe8acef0c9f` | `7fc7ebe8acef0c9f` | **IDENTICAL** |
| `dist/410.html` | `6771e48e77a51c55` | `6771e48e77a51c55` | **IDENTICAL** |
| `dist/index.html` | `c07c71a8683e1e9c` | `c07c71a8683e1e9c` | **IDENTICAL** |
| `dist/biology-cell-biology/index.html` | `bdf972fadaca92e0` | `bdf972fadaca92e0` | **IDENTICAL** |
| `dist/about/index.html` | `347a0fd8567394c4` | `347a0fd8567394c4` | **IDENTICAL** |
| `dist/assets/index-Dxpp6PKE.css` | `33ef33c0d33e6195` | `33ef33c0d33e6195` | **IDENTICAL** |
| `dist/assets/study-data-DadxopSG.js` | `0f76d6e3be64b69a` | `0f76d6e3be64b69a` | **IDENTICAL** |
| `dist/assets/vendor-DPkodN_t.js` | `1a1d1ca6d6238fc2` | `1a1d1ca6d6238fc2` | **IDENTICAL** |

**Conclusion:** 100% of tested outputs are byte-for-byte identical across separate clean builds. Zero non-deterministic mutations detected.

---

## 4. Vite Output-Cleaning & Static Asset Preservation

A key risk in build pipelines is output-cleaning behavior: when `vite build` executes with `emptyOutDir: true`, it empties `dist/` before writing files.

The build sequence strictly mitigates this risk through ordering:
1. `generateNetlifyRedirects.js` writes to `public/_redirects`.
2. `vite build` copies all files from `public/` (including `_redirects`, `_headers`, `robots.txt`, `sitemap.xml`, `404.html`, `410.html`, `logo.svg`, `og-*.png`) into `dist/`.
3. `prerenderStaticPages.js` runs *after* `vite build`, taking `dist/index.html` and generating all static HTML route directories.
4. `generateSitemap.js` writes both to `public/sitemap.xml` and `dist/sitemap.xml`.

Inspection of `dist/` confirms that all critical files are present:
- `dist/_redirects` (527.6 KB, 8,657 lines)
- `dist/_headers`
- `dist/robots.txt`
- `dist/sitemap.xml`
- `dist/404.html`
- `dist/410.html`
- `dist/index.html`
- All 136 pre-rendered route files.

No stale artifacts survive between builds, and no build-generated files are lost.

