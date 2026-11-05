# StudyToolsHub — Phase 2D Redirect Mapping & Classification Report

**Document Status:** Detailed Classification & Mapping Inventory  
**Phase:** Phase 2D — Rule Generation & Routing Audit  
**Authoritative Source:** `src/data/legacyTopicUrlManifest.json`  
**Generated Artifact:** `public/_redirects` (8,657 lines, 527.66 KB)  
**Date:** March 2026  

---

## 1. Classification Summary

| Classification | Manifest Dataset Records | Manifest Nav Slugs | Total URL Variants | Netlify Rules Emitted | HTTP Status Code | Notes |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Approved Canonical Redirects** | 1,404 | 3 | 2,814 | **2,808** | **301 Moved Permanently** | 6 nav self-redirects excluded to prevent loops |
| **Confirmed Permanently Obsolete** | 2,856 | 0 | 5,712 | **5,712** | **410 Gone** | Synthetic variations (`-v1` to `-v9`) & invalid level pairings |
| **Manual Review Exclusions** | 740 | 1 | 1,482 | **0** | **404 Not Found (Fallback)** | Excluded from automatic rules; requires owner decision |
| **Valid Canonical Application Routes** | N/A | N/A | 136 | **136** | **200 Rewrite (`/index.html`)** | 65 Flashcard + 65 Quiz + 6 Static/Planner routes |
| **Deliberate Final Fallback** | N/A | N/A | N/A | **1** | **404 Not Found (`/404.html`)** | Catch-all for unknown, unmapped, or missing URLs |
| **Total** | **5,000** | **4** | **10,008** | **8,657** | — | Fully reconciled |

---

## 2. Approved HTTP 301 Redirect Mappings (Sample Inventory)

All 1,404 redirect records represent legitimate education level variants mapping to their canonical subtopic. Both Flashcard (`/:slug`) and Quiz (`/quiz/:slug`) routes are mapped directly to their matching canonical destinations:

### Representative Redirect Examples:

| Original Flashcard Path | Canonical Flashcard Destination | Original Quiz Path | Canonical Quiz Destination | Target Subject | Target Quality |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/biology-cell-biology-high-school` | `/biology-cell-biology` | `/quiz/biology-cell-biology-high-school` | `/quiz/biology-cell-biology` | Biology | `verified` |
| `/biology-cell-biology-graduate` | `/biology-cell-biology` | `/quiz/biology-cell-biology-graduate` | `/quiz/biology-cell-biology` | Biology | `verified` |
| `/chemistry-organic-chemistry-college` | `/chemistry-organic-chemistry` | `/quiz/chemistry-organic-chemistry-college` | `/quiz/chemistry-organic-chemistry` | Chemistry | `verified` |
| `/physics-mechanics-ap` | `/physics-mechanics` | `/quiz/physics-mechanics-ap` | `/quiz/physics-mechanics` | Physics | `verified` |
| `/math-calculus-gcse` | `/math-calculus` | `/quiz/math-calculus-gcse` | `/quiz/math-calculus` | Math | `verified` |
| `/history-world-war-ii-undergraduate` | `/history-world-war-ii` | `/quiz/history-world-war-ii-undergraduate` | `/quiz/history-world-war-ii` | History | `verified` |
| `/psychology-cognitive-psychology-beginner` | `/psychology-cognitive-psychology` | `/quiz/psychology-cognitive-psychology-beginner` | `/quiz/psychology-cognitive-psychology` | Psychology | `verified` |
| `/economics-microeconomics-high-school` | `/economics-microeconomics` | `/quiz/economics-microeconomics-high-school` | `/quiz/economics-microeconomics` | Economics | `needs_review` |
| `/economics-macroeconomics-college` | `/economics-macroeconomics` | `/quiz/economics-macroeconomics-college` | `/quiz/economics-macroeconomics` | Economics | `needs_review` |
| `/literature-shakespeare-advanced` | `/literature-shakespeare` | `/quiz/literature-shakespeare-advanced` | `/quiz/literature-shakespeare` | Literature | `verified` |
| `/literature-modernism-undergraduate` | `/literature-modernism` | `/quiz/literature-modernism-undergraduate` | `/quiz/literature-modernism` | Literature | `needs_review` |

### Target Canonical Destination Distribution:
- **18 unique canonical topics** receive all 2,808 redirect URLs:
  - `biology-cell-biology`, `chemistry-organic-chemistry`, `physics-mechanics`, `math-calculus`, `history-world-war-ii`, `psychology-cognitive-psychology`, `economics-microeconomics`, `literature-shakespeare`, `biology-genetics`, `chemistry-periodic-table`, `physics-electromagnetism`, `math-algebra`, `psychology-social-psychology`, `economics-macroeconomics`, `literature-modernism`, `biology-evolution`, `math-statistics`, `history-ancient-egypt`.
- **0 redirect rules** point to `insufficient` topics.
- **0 redirect chains** or intermediate hops exist.

---

## 3. Approved HTTP 410 Gone Mappings (Sample Inventory)

All 2,856 obsolete records (5,712 URLs) represent permanently retired synthetic duplicates or incompatible level pairings:

| Obsolete Source Path | Obsolete Quiz Path | Primary Reason | Suffix |
| :--- | :--- | :--- | :---: |
| `/physics-quantum-physics-sat` | `/quiz/physics-quantum-physics-sat` | Incompatible level pairing (SAT vs University Quantum Physics) | none |
| `/chemistry-thermodynamics-kids` | `/quiz/chemistry-thermodynamics-kids` | Incompatible level pairing (Kids vs University Thermodynamics) | none |
| `/computer%20science-operating-systems-kids` | `/quiz/computer%20science-operating-systems-kids` | Incompatible level pairing (Kids vs OS) & Space defect | none |
| `/math-linear-algebra-kids` | `/quiz/math-linear-algebra-kids` | Incompatible level pairing (Kids vs Linear Algebra) | none |
| `/literature-renaissance-prose-sat` | `/quiz/literature-renaissance-prose-sat` | Incompatible level pairing (SAT vs Renaissance Prose) | none |
| `/history-industrial-revolution-mcat` | `/quiz/history-industrial-revolution-mcat` | Incompatible level pairing (MCAT Medical vs History) | none |
| `/biology-cell-biology-intermediate-v2` | `/quiz/biology-cell-biology-intermediate-v2` | Duplicate synthetic cycle repeat | `v2` |
| `/physics-mechanics-ap-v5` | `/quiz/physics-mechanics-ap-v5` | Duplicate synthetic cycle repeat | `v5` |
| `/chemistry-periodic-table-beginner-v7` | `/quiz/chemistry-periodic-table-beginner-v7` | Duplicate synthetic cycle repeat | `v7` |
| `/math-calculus-undergraduate-v8` | `/quiz/math-calculus-undergraduate-v8` | Duplicate synthetic cycle repeat | `v8` |

---

## 4. Manual-Review Exclusions (741 Records / 1,482 URLs)

In accordance with strict safety requirements, all manual-review records are excluded from automatic 301 and 410 rules. They fall through to the deliberate 404 response.

### Manual-Review Breakdown:

| Category | Record Count | URL Count | Reason Automatic Rule is Unsafe | Required Human Decision |
| :--- | :---: | :---: | :--- | :--- |
| **Insufficient Target Topics** | 613 | 1,226 | Canonical destination has placeholder content and cannot be indexed. | Await canonical content expansion in future phase before enabling redirects. |
| **Computer Science Insufficient Target Topics** | 72 | 144 | Canonical target topic has placeholder content and legacy slug contains spaces. | Await canonical content expansion. |
| **Recovered CS Level Variants** | 43 | 86 | Canonical topics are verified, but legacy slugs in `studyTopics.json` contain raw spaces (e.g. `computer science-algorithms-gre`). | Confirm whether to generate `%20` 301 rules or rely on client-side self-healing navigation. |
| **Real Topics with Incompatible Levels** | 12 | 24 | Seed topics paired with incompatible exams (e.g. `literature-shakespeare-mcat`). | Confirm whether to return 410 Gone or 301 redirect to general subtopic. |
| **Unresolved Navigation Slug** | 1 | 2 | `/psychology-intro` (hardcoded footer link). No "Intro" subtopic exists in psychology dataset. | Client link was updated to `/psychology-cognitive-psychology` in Phase 2C; decide whether to add formal 301 rule. |
| **Total Manual Review Excluded** | **741** | **1,482** | — | Zero automatic rules generated in Phase 2D |

