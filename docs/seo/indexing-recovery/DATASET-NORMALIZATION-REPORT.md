# Phase 2A — Dataset Normalization & Compatibility Report

**Source Dataset:** `src/data/studyTopics.json` (Preserved untouched for backward compatibility)  
**Normalized Canonical Dataset:** `src/data/canonicalStudyTopics.json`  
**Legacy Migration Manifest:** `src/data/legacyTopicUrlManifest.json`  
**Builder Script:** `scripts/buildCanonicalStudyData.js` (`npm run build:study-data`)  
**Validator Script:** `scripts/validateCanonicalStudyData.js` (`npm run validate:study-data`)

---

## 1. Original vs. Normalized Dataset Statistics (Step A & Step D)

Every metric below was independently calculated from `src/data/studyTopics.json` and `src/data/canonicalStudyTopics.json`:

| Metric | Original Dataset (`src/data/studyTopics.json`) | Normalized Canonical Dataset (`src/data/canonicalStudyTopics.json`) | Change / Audit Note |
|---|---:|---:|---|
| **File Size (Bytes)** | **37,805,944 bytes** (37.81 MB) | **385,663 bytes** (385.66 KB / 0.37 MiB) | **−98.98% (−37.42 MB)** |
| **Total Records** | **5,000** | **65** | **4,935 redundant records consolidated** |
| **Unique Slugs** | **5,000** (500 unversioned, 4,500 versioned `-v1`..`-v9`) | **65** (100% URL-safe, unversioned canonical slugs) | **0 versioned suffixes; 0 malformed spaces** |
| **Slugs with Malformed Spaces (`" "`)** | **555** (`"computer science-..."`) | **0** (`"computer-science-..."`) | Fixed via deterministic slug generator |
| **Unique Subjects** | **9** | **9** | 100% preserved (`Biology` .. `Psychology`) |
| **Unique Subtopics** | **65** | **65** | 100% preserved (`1` canonical topic per `(subject, subTopic)`) |
| **Unique Education Levels** | **17** (1 string per record) | **17** (represented as `educationLevels: string[]` per topic) | Incompatible pairings (`MCAT` Literature/Math/CS, `Kids` Quantum Physics, etc.) removed |
| **Unique `(subject, subTopic, level)` Combos** | **1,105** (`65 × 17`) | **65** canonical topics (covering **1,034** compatible `(subject, subTopic, level)` combos) | **71 incompatible `(subject, subTopic, level)` combos excluded** |
| **Cycle-Repeat Duplicate Records (`i = 1105..4999`)** | **3,895** (77.90% of dataset) | **0** | Eliminated; recorded in `legacyTopicUrlManifest.json` |
| **Records with Synthetic Placeholder Content** | **3,536** (70.72% of dataset, across 47 subtopics) | **47** (explicitly flagged `status: "insufficient"`, `hasPlaceholderContent: true`) | Zero fabricated content; flagged for educational review |
| **Records with Real Seed Content** | **1,464** (29.28% of dataset, across 18 subtopics) | **18** (explicitly flagged `status: "needs_review"`, `hasPlaceholderContent: false`) | 100% of real cards and quiz questions preserved |
| **Records with Missing or Empty Required Fields** | **0** | **0** | Verified across all records |
| **Total Flashcard Instances** | **45,967** | **285** (`50` real + `235` deduplicated subtopic placeholders) | All **50 / 50 (100%)** unique real flashcards preserved |
| **Distinct Flashcard Questions / Answers** | **4,045** (`50` real + `3,995` level-interpolated templates) | **285** (`50` real + `235` level-representative templates) | Eliminated `3,760` redundant level-interpolated copies & all intra-deck duplicates |
| **Duplicate Flashcard Collections (Ordered Lists)** | **4,183** duplicate instances (`817` unique ordered lists: `18` real + `799` fallback) | **0** | Every canonical topic has a unique flashcard deck |
| **Total Quiz Question Instances** | **33,344** | **254** (`19` real + `235` deduplicated subtopic placeholders) | All **19 / 19 (100%)** unique real quiz questions preserved |
| **Distinct Quiz Question Texts / Explanations** | **818** (`19` real + `799` level-interpolated templates) | **66** distinct question stems (`19` real + `47` subtopic templates across `254` Q+A tuples) | Eliminated intra-quiz repeated questions |
| **Duplicate Quiz Collections** | **1,446** exact ordered list duplicates (`3,554` ordered lists; **`4,183` duplicates once intra-quiz repeats are deduplicated to `817` unique sets**) | **0** | Why `3,554` ordered lists existed: `numQuestions = 6 + (i % 7)` varied array length (`6..12`) by repeating the same `5` questions (`j % 5`) |

---

## 2. Canonical Topic Identity & Slug Generation Model (Step B)

### 2.1 Canonical Identity Rules
In `src/data/canonicalStudyTopics.json`, a topic's canonical identity is defined strictly by its normalized `(subject, subTopic)` pair:
- **Deterministic ID (`id`):** `"topic-" + generateDeterministicSlug([subject, subTopic])` (e.g., `"topic-biology-cell-biology"`, `"topic-computer-science-algorithms"`). Does not depend on array insertion index, random numbers, education level, or `variationSeed`.
- **Deterministic Slug (`slug`):** `generateDeterministicSlug([subject, subTopic])` (e.g., `"biology-cell-biology"`, `"computer-science-algorithms"`).
- **Deterministic Subject Slug (`subjectSlug`):** `generateDeterministicSlug(subject)` (e.g., `"biology"`, `"computer-science"`).
- **Deterministic Ordering:** All 65 canonical topics are sorted lexicographically by `(subject, subTopic)`.

### 2.2 Explicit Slug Generation Function (`generateDeterministicSlug`)
Implemented in [`scripts/buildCanonicalStudyData.js`](file:///d:/freetoolshubs/free-tools-study/scripts/buildCanonicalStudyData.js#L31-L52) and unit-tested in [`scripts/validateCanonicalStudyData.js`](file:///d:/freetoolshubs/free-tools-study/scripts/validateCanonicalStudyData.js#L38-L78):
1. Joins multi-part inputs with `-`.
2. Applies Unicode `NFKD` normalization and strips combining diacritical marks (`[\u0300-\u036f]`).
3. Lowercases all characters.
4. Replaces any sequence of non-alphanumeric characters (`[^a-z0-9]+`, including spaces, punctuation, underscores, and symbols) with a single `-`.
5. Collapses repeated hyphens (`-{2,}`) and trims leading/trailing hyphens (`^-+|-+$`).
6. Throws an explicit error if the resulting slug is empty or collides with an existing canonical slug.

### 2.3 Verification of the Computer Science Slug Defect
In [`scripts/seedData.js`](file:///d:/freetoolshubs/free-tools-study/scripts/seedData.js#L293), the original generator computed:
```js
const slugBase = `${sub.name.toLowerCase()}-${topic.toLowerCase().replace(/ /g, '-')}`;
```
Because `sub.name.toLowerCase()` did not replace spaces with hyphens, all **555 `Computer Science` records** in `src/data/studyTopics.json` received malformed slugs containing a literal space (`"computer science-algorithms-gre"`, etc.). This defect had two cascading consequences:
1. It injected **1,110 invalid URLs with spaces** into `public/sitemap.xml`.
2. It caused `realContentMap[slugBase]` in `seedData.js` to return `undefined` for `'computer-science-algorithms'`, `'computer-science-data-structures'`, and `'computer-science-machine-learning'`, forcing all 555 Computer Science records in `studyTopics.json` into synthetic fallback content.

In `src/data/canonicalStudyTopics.json`, all 8 Computer Science subtopics now have valid URL-safe slugs (`computer-science-algorithms`, `computer-science-cloud-computing`, `computer-science-cybersecurity`, `computer-science-data-structures`, `computer-science-database-systems`, `computer-science-machine-learning`, `computer-science-operating-systems`, `computer-science-web-development`).

---

## 3. Multi-Level Deduplication & Content Preservation Analysis (Step C)

We executed 6-level comparison across all 5,000 records in `src/data/studyTopics.json`:
1. **Identity Comparison:** Grouped all 5,000 records into 65 `(subject, subTopic)` groups (`55` to `111` records per group).
2. **Description Comparison:** Verified that all 1,105 unique descriptions in `studyTopics.json` follow the single boilerplate pattern `"Comprehensive ${level} study guide for ${topic} in ${sub.name}..."`.
3. **Flashcard Q&A Comparison:**
   - Across the **18 real-content subtopics** (`1,464` records), every record for a given `(subject, subTopic)` has the **exact same 2–4 flashcards** across all 17 levels and all 10 versions (`v0..v9`). Zero level-specific variations exist. All **50 unique real flashcards** are 100% preserved.
   - Across the **47 placeholder subtopics** (`3,536` records), every record contained `8 to 16` flashcards generated by cycling through 5 subject words (`j % 5`), causing cards `6..16` within every single deck to be exact duplicates of cards `1..5`. Deduplicating within each subtopic preserved the 5 unique template cards per subtopic (`235` cards total) while removing `41,632` redundant/intra-deck duplicate card instances.
4. **Quiz Q/O/A & Explanation Comparison:**
   - Across the **18 real-content subtopics** (`1,464` records), every record for a given `(subject, subTopic)` has the **exact same 1–2 quiz questions, options, answers, and explanations**. All **19 unique real quiz questions** are 100% preserved.
   - Across the **47 placeholder subtopics** (`3,536` records), every record contained `6 to 12` quiz questions cycling through the same 5 subject words (`j % 5`) with literal options `["Correct application of ...", "Common student misconception", "Related but incorrect concept", "Irrelevant distractor"]`. Deduplicating within each subtopic preserved the 5 unique template questions per subtopic (`235` questions total) while removing `29,829` redundant/intra-quiz duplicate question instances.
5. **SHA-256 Content Fingerprint Verification:** Every canonical topic stores a deterministic 16-character SHA-256 hex digest (`contentFingerprint`) computed over its normalized flashcards and quiz questions.

---

## 4. Consumer Regression & Compatibility Assessment (Step H)

In compliance with Phase 2A scope boundaries, **no application component imports were switched from `src/data/studyTopics.json` to `src/data/canonicalStudyTopics.json` during this phase**. The existing application continues to compile (`tsc --noEmit` exit code `0`) and run without change.

### 4.1 Complete Inventory of `src/data/studyTopics.json` Consumers

| File | Current Usage of `studyTopics.json` | Schema Difference in `canonicalStudyTopics.json` | Phase 2B Migration / Adapter Requirement |
|---|---|---|---|
| [`src/pages/Home.tsx`](file:///d:/freetoolshubs/free-tools-study/src/pages/Home.tsx#L5) | Line 123: `studyData.find(t => t.subject.toLowerCase() === cat.toLowerCase())` → links to `/${match.slug}`. | `subject` and `slug` are identical in name; `slug` is now clean (`computer-science-algorithms` instead of `"computer science-data-structures-graduate"`). | Point category pills to `/subjects/${topic.subjectSlug}` (or clean canonical `/${topic.slug}`). |
| [`src/pages/Flashcards.tsx`](file:///d:/freetoolshubs/free-tools-study/src/pages/Flashcards.tsx#L9) | Line 20: `.find(t => t.slug === slug) \|\| studyData[0]`. Reads `subTopic`, `level`, `variationSeed`, `description`, `difficulty`, `estimatedTime`, `tags`, and passes `topicData` to `generateFlashcards(topicData, 12)`. | 1. `level: string` → `educationLevels: string[]`.<br/>2. `baseFlashcards` → `flashcards`.<br/>3. `variationSeed` removed (use `hashString(topic.slug)`). | 1. Remove `\|\| studyData[0]` soft-404 fallback; check `legacyTopicUrlManifest` for redirects or render `<NotFound />`.<br/>2. Display `topicData.educationLevels[0] \|\| 'All Levels'` (or level badges).<br/>3. Read `topicData.flashcards` in `studyEngine.ts`. |
| [`src/pages/Quiz.tsx`](file:///d:/freetoolshubs/free-tools-study/src/pages/Quiz.tsx#L9) | Line 23: `.find(t => t.slug === slug) \|\| studyData[0]`. Reads `subTopic`, `level`, `variationSeed`, `description`, `difficulty`, `estimatedTime`, `tags`, and passes `topicData` to `generateQuizQuestions(topicData, 10)`. | 1. `level: string` → `educationLevels: string[]`.<br/>2. `baseQuestions` → `quizQuestions`.<br/>3. `variationSeed` removed. | 1. Remove `\|\| studyData[0]` soft-404 fallback.<br/>2. Read `topicData.quizQuestions` in `studyEngine.ts`.<br/>3. Add `<meta name="robots" content="noindex, follow" />` when `topicData.contentQuality.status === 'insufficient'`. |
| [`src/pages/Planner.tsx`](file:///d:/freetoolshubs/free-tools-study/src/pages/Planner.tsx#L7) | Line 128: `studyData.find(t => t.slug === examType)` → reads `subTopic` and `plannerTemplates` (`title`, `sessions`). | `slug`, `subTopic`, and `plannerTemplates` (`title`, `sessions`) are 100% compatible! | Switch import to `canonicalStudyTopics.json` directly. |
| [`src/modules/studyEngine.ts`](file:///d:/freetoolshubs/free-tools-study/src/modules/studyEngine.ts#L32-L52) | `generateFlashcards` reads `topicData.baseFlashcards`; `generateQuizQuestions` reads `topicData.baseQuestions`. | `canonicalStudyTopics.json` uses `flashcards` and `quizQuestions`. | Support both schemas cleanly: `const cards = topicData.flashcards ?? topicData.baseFlashcards;` and `const questions = topicData.quizQuestions ?? topicData.baseQuestions;`. |
| [`scripts/generateSEOFiles.js`](file:///d:/freetoolshubs/free-tools-study/scripts/generateSEOFiles.js#L9) | Iterates over all 5,000 records in `studyTopics.json` and writes 10,000 topic/quiz URLs to `public/sitemap.xml`. | `canonicalStudyTopics.json` has 65 topics with `contentQuality.status`. | In Phase 2B, filter `canonicalStudyTopics.json` to exclude `status === 'insufficient'` and exclude `noindex` static pages. |
| `localStorage` / `IndexedDB` (`useStore.ts`) | `decks` dictionary in `localStorage`/`IndexedDB` is keyed by `slug` (e.g., `decks['biology-cell-biology-high-school']`). | Canonical slugs no longer have `-{level}` or `-v{N}` suffixes (`decks['biology-cell-biology']`). | In `useStore.ts` `loadState()`, migrate any existing user-saved deck keys matching legacy slugs to their canonical slug so returning users do not lose saved confidence scores. |

