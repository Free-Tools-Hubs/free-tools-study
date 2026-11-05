# Phase 2A — Legacy URL Migration Manifest Report

**Manifest Artifact:** [`src/data/legacyTopicUrlManifest.json`](file:///d:/freetoolshubs/free-tools-study/src/data/legacyTopicUrlManifest.json) (5,201,343 bytes)  
**Generator Script:** [`scripts/buildCanonicalStudyData.js`](file:///d:/freetoolshubs/free-tools-study/scripts/buildCanonicalStudyData.js)  
**Validator Script:** [`scripts/validateCanonicalStudyData.js`](file:///d:/freetoolshubs/free-tools-study/scripts/validateCanonicalStudyData.js)

---

## 1. Executive Summary of Legacy URL Coverage (Step E)

Every single record in `src/data/studyTopics.json` (**5,000 records** → **10,000 sitemap URLs**: 5,000 flashcard URLs `/:slug` + 5,000 quiz URLs `/quiz/:slug`) AND every hardcoded non-dataset navigation slug in `src/layouts/MainLayout.tsx` and `src/pages/Home.tsx` (**4 slug pairs** → **8 navigation URLs**) is explicitly accounted for in `src/data/legacyTopicUrlManifest.json`.

### 1.1 High-Level Migration Summary Table

| Category | Legacy Record / Slug Count | Legacy Unique URLs (`/:slug` + `/quiz/:slug`) | % of Dataset | Target Disposition & Verification Basis |
|---|---:|---:|---:|---|
| **Safe Redirect Mappings (`redirect`) — Dataset Records** | **1,404** | **2,808** | **28.08%** | Verified 100% content-fingerprint match (`exactFingerprintMatch: true`) against a real-content canonical topic (`status: "needs_review"`) with a pedagogically compatible education level. |
| **Safe Redirect / Direct Canonical Resolution — Hardcoded Nav Slugs** | **3** | **6** | — | `/biology-cell-biology`, `/chemistry-organic-chemistry`, `/physics-mechanics` (and `/quiz/*`) were broken links in `studyTopics.json` that now resolve **directly** as the exact canonical slugs of their respective topics! |
| **Manual Review Mappings (`manual_review`) — Dataset Records** | **740** | **1,480** | **14.80%** | **728 records** (`115` with malformed spaces + `613` hyphenated) are first-occurrence compatible-level records pointing to the 47 `insufficient` (placeholder-only) canonical topics; **12 records** are first-occurrence incompatible-level pairings on the 18 real-content topics (e.g., `literature-shakespeare-mcat`). |
| **Manual Review / Unresolved Mapping (`manual_review`) — Hardcoded Nav Slug** | **1** | **2** | — | `/psychology-intro` and `/quiz/psychology-intro` (`MainLayout.tsx` line 91) have **no matching `"Intro"` subtopic** in `studyTopics.json` (`canonicalId: null`, `canonicalSlug: null`). |
| **Obsolete Mappings (`obsolete`) — Dataset Records** | **2,856** | **5,712** | **57.12%** | **2,459** cycle-repeat (`-v1`..`-v9`) duplicates of placeholder templates; **278** cycle-repeat duplicates of incompatible-level placeholder records; **71** first-occurrence incompatible-level placeholder records; **48** cycle-repeat duplicates of incompatible-level real-topic records. |
| **Missing / Unaccounted Legacy Records** | **0** | **0** | **0.00%** | 100% of `studyTopics.json` records and `public/sitemap.xml` dynamic URLs are accounted for. |
| **Total Legacy Dataset Inventory** | **5,000** | **10,000** | **100.00%** | Plus **4** non-dataset hardcoded nav slugs (**8 URLs**) = **5,004 slug entries / 10,008 URLs**. |

---

## 2. Granular Breakdown by Disposition & Reason Code

Every entry in `src/data/legacyTopicUrlManifest.json` carries a deterministic `disposition`, `reason`, `confidence`, and `reviewStatus`:

| Disposition | Exact Reason Code in Manifest | Legacy Records | Legacy URLs (`/:slug` + `/quiz/:slug`) | Confidence | Review Status | Explanation |
|---|---|---:|---:|---|---|---|
| `redirect` | `verified_identical_real_content_consolidating_level_variant_to_canonical_subtopic` | 294 | 588 | `high` | `verified_equivalent` | First-occurrence (`i = 0..1104`) compatible-level records for the 18 real-content subtopics. SHA-256 content fingerprint is 100% identical to the canonical topic. |
| `redirect` | `verified_identical_real_content_consolidating_cycle_duplicate_v1..v9_to_canonical_subtopic` | 1,110 | 2,220 | `high` | `verified_equivalent` | Cycle-repeat (`-v1`..`-v9`) records for the 18 real-content subtopics with compatible education levels. Verified via SHA-256 fingerprint that 100% of flashcards and quiz questions match the canonical topic. |
| `manual_review` | `incompatible_education_level_on_real_topic` | 12 | 24 | `medium` | `requires_curriculum_review` | First-occurrence records in the 18 real-content subtopics where the level is pedagogically incompatible with the subject/subtopic (e.g., `literature-shakespeare-mcat`, `history-ancient-egypt-mcat`, `economics-microeconomics-mcat`, `math-calculus-mcat`, `chemistry-organic-chemistry-kids`, `math-calculus-kids`). |
| `manual_review` | `target_canonical_topic_has_insufficient_placeholder_content_and_level_interpolated_templates` | 613 | 1,226 | `medium` | `awaiting_canonical_content_remediation` | First-occurrence compatible-level records for the 39 non-CS placeholder-only subtopics (`status: "insufficient"`). Mapped to their target `canonicalId`/`canonicalSlug`, but held in `manual_review` until real academic content replaces the fallback templates. |
| `manual_review` | `malformed_space_slug_and_target_canonical_topic_has_insufficient_placeholder_content` | 115 | 230 | `medium` | `awaiting_canonical_content_remediation` | First-occurrence compatible-level records for the 8 `Computer Science` subtopics (`"computer science-..."`). Contains both a malformed literal space in the legacy slug and placeholder fallback content in `studyTopics.json`. |
| `obsolete` | `synthetic_placeholder_cycle_repeat_duplicate` | 2,459 | 4,918 | `high` | `verified_obsolete` | Pure cycle-repeat (`-v1`..`-v9`, `i >= 1105`) generator artifacts of compatible-level placeholder records. Never internally linked, 0 real educational items, 100% duplicate of an earlier placeholder combo. |
| `obsolete` | `synthetic_placeholder_cycle_repeat_with_incompatible_level` | 278 | 556 | `high` | `verified_obsolete` | Cycle-repeat (`-v1`..`-v9`) generator artifacts that both contain 100% synthetic placeholder text and pair incompatible levels (e.g., `history-industrial-revolution-mcat-v3`). |
| `obsolete` | `synthetic_placeholder_with_incompatible_education_level` | 71 | 142 | `high` | `verified_obsolete` | First-occurrence placeholder records with nonsensical subject/level pairings (e.g., `math-linear-algebra-kids`, `physics-quantum-physics-kids`, `computer science-algorithms-mcat`). |
| `obsolete` | `cycle_repeat_duplicate_of_incompatible_level_pairing` | 48 | 96 | `high` | `verified_obsolete` | Cycle-repeat (`-v1`..`-v9`) duplicates of the 12 incompatible-level pairings in the 18 real-content subtopics (e.g., `literature-shakespeare-mcat-v2`..`v9`). |
| **Total** | — | **5,000** | **10,000** | — | — | **100% of `src/data/studyTopics.json` records accounted for.** |

---

## 3. Non-Dataset Hardcoded Navigation URLs Accounted For

During Phase 1, we discovered 4 hardcoded topic slugs in `MainLayout.tsx` and `Home.tsx` that did not exist in `src/data/studyTopics.json`. All 4 slug pairs (8 URLs) are explicitly tracked in `legacyTopicUrlManifest.json` under `nonDatasetNavigationUrls`:

| Legacy Slug | Flashcard & Quiz URLs | Source Location | Canonical Target | Disposition | Review Status & Rationale |
|---|---|---|---|---|---|
| `biology-cell-biology` | `/biology-cell-biology`<br/>`/quiz/biology-cell-biology` | `MainLayout.tsx` (lines 24, 25, 48, 51, 80, 81, 88), `Home.tsx` (lines 50, 62, 69) | `topic-biology-cell-biology` (`/biology-cell-biology`) | `redirect` *(Direct Canonical Match)* | Previously fell back to `studyData[0]`; now matches the exact canonical slug `biology-cell-biology`. |
| `chemistry-organic-chemistry` | `/chemistry-organic-chemistry`<br/>`/quiz/chemistry-organic-chemistry` | `MainLayout.tsx` (line 89) | `topic-chemistry-organic-chemistry` (`/chemistry-organic-chemistry`) | `redirect` *(Direct Canonical Match)* | Previously rendered Cell Biology by mistake; now matches the exact canonical slug `chemistry-organic-chemistry`. |
| `physics-mechanics` | `/physics-mechanics`<br/>`/quiz/physics-mechanics` | `MainLayout.tsx` (line 90) | `topic-physics-mechanics` (`/physics-mechanics`) | `redirect` *(Direct Canonical Match)* | Previously rendered Cell Biology by mistake; now matches the exact canonical slug `physics-mechanics`. |
| `psychology-intro` | `/psychology-intro`<br/>`/quiz/psychology-intro` | `MainLayout.tsx` (line 91) | `null` *(Unresolved)* | **`manual_review`** | **Unresolved mapping:** Psychology in `studyTopics.json` has 5 subtopics (`Cognitive Psychology`, `Social Psychology`, `Developmental Psychology`, `Behavioral Neuroscience`, `Clinical Psychology`) and no `"Intro"` subtopic. Must not be blindly redirected without owner confirmation (recommended target in Phase 2B: `/subjects/psychology` or `/psychology-cognitive-psychology`). |

---

## 4. Migration Safety Verification

1. **Zero Unverified `-vN` Redirects:** Every single record with `disposition: "redirect"` (`1,404` records) was verified via SHA-256 content fingerprinting (`exactFingerprintMatch === true`) to have the exact same flashcards and quiz questions as its target canonical topic.
2. **Zero Incompatible-Level Auto-Redirects:** All 83 incompatible `(subject, subTopic, level)` combinations (`12` on real-content topics + `71` on placeholder topics, spanning `397` total records including cycle repeats) were separated from `redirect` and placed into `manual_review` (`12` records) or `obsolete` (`385` records).
3. **Zero Silent Redirects to Placeholder Destinations:** None of the 3,536 records belonging to the 47 `insufficient` placeholder subtopics were assigned `redirect`; their 728 compatible first-occurrence records are held in `manual_review` (`awaiting_canonical_content_remediation`) with their target `canonicalId` and `canonicalSlug` pre-populated for Phase 2B content remediation.

