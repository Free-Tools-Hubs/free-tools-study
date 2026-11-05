# Local Progress Migration Specification & Safety Verification

**Document Status:** Implementation & Operational Specification  
**Phase:** Phase 2C — User State Continuity  
**File Location:** `src/utils/progressMigration.ts`  
**Date:** March 2026  

---

## 1. Objective & Problem Statement

Prior to Phase 2C, StudyToolsHub stored user study progress directly under URL slugs in `localStorage`:
- `study-tools-decks`: `Record<slug, Flashcard[]>`
- `study-tools-quizHistory`: `Array<{ subject: slug, score: number, total: number, date: string }>`
- `study-tools-planner`: `Array<{ day, time, subject, topic: slug }>`

Because previous versions exposed 5,000 versioned and level-variant slugs (e.g. `biology-cell-biology-high-school`, `biology-cell-biology-graduate`, `computer science-data-structures-intermediate`), existing students accumulated spaced-repetition intervals and test histories under fragmented, non-canonical keys.

Simply switching the application to canonical slugs without a migration would cause users to appear to have "lost" their saved decks, mastery ratings, and review schedules.

---

## 2. Migration Architecture

The migration utility (`src/utils/progressMigration.ts`) is designed around four non-negotiable principles:
1. **Zero Data Loss:** Before modifying any user state, a snapshot is preserved under `study-tools-legacy-progress-backup-v1`.
2. **Deterministic Merge Conflict Resolution:** When multiple level variants map to the same canonical topic, records are consolidated without discarding user effort.
3. **Strict Idempotency:** Executing the migration repeatedly on already-migrated data produces the exact same state without data distortion.
4. **Resilience & Fallback:** If an unexpected parsing error occurs on any individual entry, the original data is preserved and a diagnostic warning is emitted without blocking application startup.

---

## 3. Conflict Resolution Algorithm

When two or more legacy deck keys (e.g. `biology-cell-biology-high-school` and `biology-cell-biology-graduate`) map to the canonical topic `biology-cell-biology`:

```
Legacy Deck A (high-school)             Legacy Deck B (graduate)
Card 1: confidence=2, review=1000       Card 1: confidence=4, review=2000
Card 2: confidence=1, review=1000       Card 3: confidence=3, review=1500
                   │                               │
                   └───────────────┬───────────────┘
                                   ▼
                   Merged Canonical Deck (cell-biology)
                   Card 1: confidence=4, review=2000  (max confidence & latest review)
                   Card 2: confidence=1, review=1000  (preserved from A)
                   Card 3: confidence=3, review=1500  (preserved from B)
```

### Flashcard Merging Rules (`mergeFlashcards`):
1. **Identity Matching:** Cards are uniquely identified by `card.id` or normalized `card.question.trim().toLowerCase()`.
2. **Confidence Level:** Preserves `Math.max(existingCard.confidence ?? 0, incomingCard.confidence ?? 0)`.
3. **Next Review Timestamp:** Preserves `Math.max(existingCard.nextReview ?? 0, incomingCard.nextReview ?? 0)`.
4. **Unique Cards:** Any flashcards present in one deck but not another are retained.

### Quiz History Remapping:
- For each history record, if `entry.subject` maps to a canonical topic, `entry.subject` is updated to the canonical slug, while `entry.legacySubject` preserves the historical slug for auditability.

### Planner Slot Remapping:
- For each study slot, if `slot.topic` matches a legacy slug, it is remapped to the canonical slug, with `slot.legacyTopic` recording provenance.

---

## 4. Execution Lifecycle

```
App Boot (`useStore.loadState()`)
  │
  ├─► Check `localStorage.getItem('study-tools-progress-migration-version')`
  │
  ├─► Read `study-tools-decks`, `study-tools-quizHistory`, `study-tools-planner`
  │
  ├─► If empty: Set version = 1 and return
  │
  ├─► Create Backup: `study-tools-legacy-progress-backup-v1`
  │
  ├─► Run `migrateProgressState(currentState)`
  │     ├─ Remap legacy deck keys via `studyDataService.resolveTopic(key)`
  │     ├─ Merge conflicting decks using `mergeFlashcards()`
  │     ├─ Remap quizHistory subjects
  │     └─ Remap planner slot topics
  │
  ├─► Write back migrated state to `localStorage`
  ├─► Write version flag: `study-tools-progress-migration-version = 1`
  │
  └─► Hydrate Zustand Store with clean canonical keys
```

---

## 5. Verification Test Matrix

Tested and proven by `scripts/validateConsumerCutover.js`:

| Test Case | Scenario | Expected Outcome | Result |
| :--- | :--- | :--- | :--- |
| **TC-01** | Legacy slug remapping | `biology-cell-biology-high-school` $\to$ `biology-cell-biology` | **PASS** |
| **TC-02** | Deck conflict merge | Two decks with overlapping cards merged into 1 canonical deck | **PASS** |
| **TC-03** | Confidence preservation | Card with confidence 2 and 4 resolved to confidence 4 | **PASS** |
| **TC-04** | Timestamp preservation | NextReview timestamps 1000 and 2000 resolved to 2000 | **PASS** |
| **TC-05** | Unchanged canonical decks | Existing canonical decks left 100% unaltered | **PASS** |
| **TC-06** | Quiz history migration | Quiz entry subject updated to canonical slug | **PASS** |
| **TC-07** | Idempotency | Second execution on migrated state produces 0 modifications | **PASS** |

