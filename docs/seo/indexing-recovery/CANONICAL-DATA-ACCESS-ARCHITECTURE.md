# Canonical Data Access Architecture & API Reference

**Document Status:** Architectural Specification & API Contract  
**Phase:** Phase 2C — Data Access Standardization  
**File Location:** `src/services/studyDataService.ts`  
**Date:** March 2026  

---

## 1. Architectural Overview

The Canonical Data Access Layer acts as the single source of truth for all educational topics, flashcards, quizzes, study planner templates, and routing metadata in StudyToolsHub.

Prior to Phase 2C, individual React components imported a 37.8 MB unversioned JSON file (`studyTopics.json`) directly, resulting in redundant in-memory parsing, repeated iterations, loose type casting (`as any[]`), and silent soft-404 fallback bugs.

The new architecture isolates the underlying JSON data behind an immutable, high-performance in-memory index service with strict TypeScript contracts.

```
┌────────────────────────────────────────────────────────┐
│                   Consumer Components                  │
│       (Home, Flashcards, Quiz, Planner, Store)         │
└──────────────────────────┬─────────────────────────────┘
                           │ Typed Calls
                           ▼
┌────────────────────────────────────────────────────────┐
│             src/services/studyDataService.ts            │
│  - O(1) ID Map (idIndex)                               │
│  - O(1) Slug Map (slugIndex)                           │
│  - O(1) Subject Groupings (subjectIndex)               │
│  - O(1) Legacy Redirect Map (LEGACY_REDIRECT_MAP)      │
└──────────────┬──────────────────────────┬──────────────┘
               │                          │
               ▼                          ▼
┌───────────────────────────┐  ┌─────────────────────────┐
│ canonicalStudyTopics.json │  │ legacySlugRedirectMap   │
│   (65 Topics, 650 KB)     │  │   (1,494 entries, 97KB) │
└───────────────────────────┘  └─────────────────────────┘
```

---

## 2. Core TypeScript Interfaces

```typescript
export type ContentQualityStatus = 'verified' | 'needs_review' | 'insufficient';

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  confidence?: number;
  nextReview?: number;
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface PlannerTemplate {
  title: string;
  sessions: number;
}

export interface ContentQuality {
  status: ContentQualityStatus;
  structuralStatus: ContentQualityStatus;
  accuracyStatus: ContentQualityStatus;
  coverageStatus: ContentQualityStatus;
  editorialStatus: ContentQualityStatus;
  indexabilityStatus: ContentQualityStatus;
  hasPlaceholderContent: boolean;
  flashcardCount: number;
  quizQuestionCount: number;
  reviewReasons: string[];
  specialistReviewConcepts?: string[];
  editorialCorrectionsApplied?: boolean;
  orphanedSeedRecovered?: boolean;
  issues?: string[];
}

export interface TopicProvenance {
  primarySourceRecordId: string;
  primarySourceSlug: string;
  consolidatedRecordCount: number;
  hadLegacyUnversionedCanonicalSlug: boolean;
  seedSource: string;
  remediationSource: string | null;
  seedFlashcardCount: number;
  seedQuizQuestionCount: number;
  addedFlashcardCount: number;
  addedQuizQuestionCount: number;
  editorialCorrectionsCount: number;
}

export interface CanonicalTopic {
  id: string;
  slug: string;
  subject: string;
  subjectSlug: string;
  subTopic: string;
  description: string;
  learningObjectives: string[];
  educationLevels: string[];
  difficulty: string;
  estimatedTime: string;
  tags: string[];
  flashcards: Flashcard[];
  quizQuestions: QuizQuestion[];
  plannerTemplates: PlannerTemplate[];
  contentFingerprint: string;
  seedContentFingerprint: string;
  provenance: TopicProvenance;
  contentQuality: ContentQuality;
}

export interface TopicResolutionResult {
  topic: CanonicalTopic | null;
  isLegacyRedirect: boolean;
  canonicalSlug?: string;
  canonicalUrl?: string;
  legacySlug?: string;
  status: 'canonical' | 'redirect' | 'not_found';
}

export interface TopicFilterOptions {
  subject?: string;
  educationLevel?: string;
  qualityStatus?: ContentQualityStatus;
  onlyIndexable?: boolean;
  searchQuery?: string;
}
```

---

## 3. API Reference

### `getAllCanonicalTopics(): readonly CanonicalTopic[]`
- **Description:** Returns the complete array of 65 canonical educational topics.
- **Complexity:** $O(1)$ memory reference to frozen array.

### `getTopicById(id: string): CanonicalTopic | undefined`
- **Description:** Retrieves a topic by its unique canonical ID (e.g. `'topic-biology-cell-biology'`).
- **Complexity:** $O(1)$ hash map lookup.

### `getTopicBySlug(slug: string): CanonicalTopic | undefined`
- **Description:** Retrieves a topic by its normalized canonical slug (e.g. `'biology-cell-biology'`).
- **Complexity:** $O(1)$ hash map lookup.

### `resolveTopic(slugOrId: string | undefined | null): TopicResolutionResult`
- **Description:** Central entry point for all route parameters and search queries. Evaluates inputs against the canonical hierarchy:
  1. Empty/undefined $\to$ `{ topic: null, status: 'not_found' }`.
  2. Direct canonical slug match $\to$ `{ topic, isLegacyRedirect: false, status: 'canonical' }`.
  3. Direct canonical ID match $\to$ `{ topic, isLegacyRedirect: false, status: 'canonical' }`.
  4. Match in `legacySlugRedirectMap` $\to$ `{ topic: target, isLegacyRedirect: true, canonicalSlug: target.slug, status: 'redirect' }`.
  5. Unmatched or obsolete $\to$ `{ topic: null, status: 'not_found' }`.
- **Soft-404 Guarantee:** Never returns a fallback topic when an item is not found.

### `getTopicsBySubject(subject: string): CanonicalTopic[]`
- **Description:** Returns all topics belonging to a subject, accepting both subject names (`'Biology'`) and subject slugs (`'biology'`).
- **Complexity:** $O(1)$ index lookup.

### `getTopicsByEducationLevel(level: string): CanonicalTopic[]`
- **Description:** Returns topics that have confirmed compatibility with the specified level.
- **Complexity:** $O(N)$ where $N = 65$.

### `getIndexableTopics(): CanonicalTopic[]`
- **Description:** Filters the dataset strictly for topics with `contentQuality.status === 'verified'`. Returns exactly the 17 indexable topics.
- **Complexity:** $O(N)$ where $N = 65$.

### `getSubjectLandingTopic(subject: string): CanonicalTopic | undefined`
- **Description:** Returns the optimal topic for subject landing cards (e.g. on Home). Prioritizes `verified` topics with the highest flashcard count.

### `getTopicFlashcards(topic: CanonicalTopic): Flashcard[]`
- **Description:** Returns a deterministic copy of the topic's flashcards, ensuring stability during initial render.

### `getTopicQuiz(topic: CanonicalTopic): QuizQuestion[]`
- **Description:** Returns a deterministic copy of the topic's quiz questions with complete option sets and explanations.

---

## 4. Performance & Memory Characteristics

| Dimension | Legacy Implementation | Canonical Data Access Service | Improvement |
| :--- | :--- | :--- | :--- |
| **Dataset Size** | 37,805,944 bytes (5,000 records) | 650,440 bytes (65 records) | **-98.28%** |
| **JSON Parse Time** | ~140ms on mobile CPU | ~2ms on mobile CPU | **70x faster** |
| **Heap Memory** | ~48 MB V8 heap | ~1.2 MB V8 heap | **40x less memory** |
| **Lookup Time** | $O(N)$ linear scan (.find()) | $O(1)$ indexed Map | **Instantaneous** |
| **Client Redirect Map** | N/A (5.2 MB uncompressed manifest) | 97.4 KB lightweight map | **98.13% smaller** |

---

## 5. Bundle Separation & Caching Strategy

In `vite.config.ts`, Rollup/Rolldown chunking isolates the data layer:
```typescript
manualChunks: (id) => {
  if (id.includes('canonicalStudyTopics.json') || id.includes('legacySlugRedirectMap.json')) {
    return 'study-data';
  }
  if (id.includes('node_modules')) {
    return 'vendor';
  }
}
```
This ensures:
1. Application route code (`index-[hash].js`) can be downloaded and parsed without waiting for data.
2. The `study-data-[hash].js` bundle (634 KB uncompressed, 93 KB gzip) is cached aggressively by Cloudflare and browser caches via content-hash naming.
3. Subsequent page navigations within the SPA experience zero latency.

