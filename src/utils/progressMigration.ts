/**
 * StudyToolsHub — Local Progress Migration Utility
 *
 * Idempotently migrates user study progress, custom decks, quiz history,
 * and planner schedules from legacy topic slugs to normalized canonical slugs.
 */

import { Flashcard, StudySlot, resolveTopic } from '../services/studyDataService';

export interface ProgressState {
  decks: Record<string, Flashcard[]>;
  quizHistory: any[];
  planner: StudySlot[];
}

export interface MigrationSummary {
  migratedDecksCount: number;
  mergedDecksCount: number;
  migratedQuizHistoryCount: number;
  migratedPlannerSlotsCount: number;
  unchangedDecksCount: number;
  warnings: string[];
}

export interface MigrationResult {
  state: ProgressState;
  summary: MigrationSummary;
  success: boolean;
}

const BACKUP_STORAGE_KEY = 'study-tools-legacy-progress-backup-v1';
const MIGRATION_VERSION_KEY = 'study-tools-progress-migration-version';
const CURRENT_MIGRATION_VERSION = 1;

/**
 * Merges two flashcard arrays safely and deterministically.
 * Avoids duplicate cards, preserves highest confidence and latest review timestamps.
 */
export function mergeFlashcards(existing: Flashcard[] = [], incoming: Flashcard[] = []): Flashcard[] {
  const mergedMap = new Map<string, Flashcard>();

  const getFingerprint = (card: Flashcard): string => {
    return card.id || card.question.trim().toLowerCase();
  };

  for (const card of existing) {
    mergedMap.set(getFingerprint(card), { ...card });
  }

  for (const card of incoming) {
    const key = getFingerprint(card);
    const prev = mergedMap.get(key);

    if (prev) {
      // Merge: preserve highest confidence and latest review timestamp
      mergedMap.set(key, {
        ...prev,
        ...card,
        confidence: Math.max(prev.confidence ?? 0, card.confidence ?? 0),
        nextReview: Math.max(prev.nextReview ?? 0, card.nextReview ?? 0)
      });
    } else {
      mergedMap.set(key, { ...card });
    }
  }

  return Array.from(mergedMap.values());
}

/**
 * Pure migration function operating on a state object.
 * Fully deterministic and testable without browser localStorage dependencies.
 */
export function migrateProgressState(currentState: ProgressState): MigrationResult {
  const summary: MigrationSummary = {
    migratedDecksCount: 0,
    mergedDecksCount: 0,
    migratedQuizHistoryCount: 0,
    migratedPlannerSlotsCount: 0,
    unchangedDecksCount: 0,
    warnings: []
  };

  const newDecks: Record<string, Flashcard[]> = {};

  // 1. Process Decks
  for (const [rawSlug, cards] of Object.entries(currentState.decks || {})) {
    try {
      const resolution = resolveTopic(rawSlug);

      if (resolution.status === 'redirect' && resolution.canonicalSlug) {
        const canonicalKey = resolution.canonicalSlug;

        if (newDecks[canonicalKey]) {
          // Merge with previously established deck
          newDecks[canonicalKey] = mergeFlashcards(newDecks[canonicalKey], cards);
          summary.mergedDecksCount++;
        } else {
          newDecks[canonicalKey] = [...cards];
          summary.migratedDecksCount++;
        }
      } else {
        // Either already canonical, or unknown/unmapped legacy slug
        if (newDecks[rawSlug]) {
          newDecks[rawSlug] = mergeFlashcards(newDecks[rawSlug], cards);
        } else {
          newDecks[rawSlug] = [...cards];
          summary.unchangedDecksCount++;
        }
      }
    } catch (err: any) {
      summary.warnings.push(`Failed to migrate deck "${rawSlug}": ${err?.message || String(err)}`);
      // Preserve original data
      newDecks[rawSlug] = cards;
    }
  }

  // 2. Process Quiz History
  const newQuizHistory = (currentState.quizHistory || []).map(entry => {
    if (!entry || typeof entry !== 'object' || !entry.subject) return entry;
    try {
      const resolution = resolveTopic(entry.subject);
      if (resolution.status === 'redirect' && resolution.canonicalSlug) {
        summary.migratedQuizHistoryCount++;
        return {
          ...entry,
          subject: resolution.canonicalSlug,
          legacySubject: entry.subject
        };
      }
    } catch (err: any) {
      summary.warnings.push(`Failed to migrate quiz history entry for "${entry.subject}": ${err?.message || String(err)}`);
    }
    return entry;
  });

  // 3. Process Planner Slots
  const newPlanner = (currentState.planner || []).map(slot => {
    if (!slot || typeof slot !== 'object') return slot;
    let updatedSlot = { ...slot };
    try {
      if (slot.topic) {
        const resolution = resolveTopic(slot.topic);
        if (resolution.status === 'redirect' && resolution.canonicalSlug) {
          summary.migratedPlannerSlotsCount++;
          updatedSlot.topic = resolution.canonicalSlug;
          (updatedSlot as any).legacyTopic = slot.topic;
        }
      }
    } catch (err: any) {
      summary.warnings.push(`Failed to migrate planner slot for topic "${slot.topic}": ${err?.message || String(err)}`);
    }
    return updatedSlot;
  });

  return {
    state: {
      decks: newDecks,
      quizHistory: newQuizHistory,
      planner: newPlanner
    },
    summary,
    success: summary.warnings.length === 0
  };
}

/**
 * Runs browser-side progress migration on application startup.
 * Idempotent, safe, and maintains an auditable backup.
 */
export function runBrowserProgressMigration(): MigrationSummary {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
    return {
      migratedDecksCount: 0,
      mergedDecksCount: 0,
      migratedQuizHistoryCount: 0,
      migratedPlannerSlotsCount: 0,
      unchangedDecksCount: 0,
      warnings: ['Window or localStorage unavailable']
    };
  }

  try {
    const rawDecks = localStorage.getItem('study-tools-decks');
    const rawHistory = localStorage.getItem('study-tools-quizHistory');
    const rawPlanner = localStorage.getItem('study-tools-planner');

    if (!rawDecks && !rawHistory && !rawPlanner) {
      // Nothing stored in localStorage yet
      localStorage.setItem(MIGRATION_VERSION_KEY, String(CURRENT_MIGRATION_VERSION));
      return {
        migratedDecksCount: 0,
        mergedDecksCount: 0,
        migratedQuizHistoryCount: 0,
        migratedPlannerSlotsCount: 0,
        unchangedDecksCount: 0,
        warnings: []
      };
    }

    const currentState: ProgressState = {
      decks: rawDecks ? JSON.parse(rawDecks) : {},
      quizHistory: rawHistory ? JSON.parse(rawHistory) : [],
      planner: rawPlanner ? JSON.parse(rawPlanner) : []
    };

    // Save initial backup before any modification if not already backed up
    if (!localStorage.getItem(BACKUP_STORAGE_KEY)) {
      localStorage.setItem(BACKUP_STORAGE_KEY, JSON.stringify({
        timestamp: new Date().toISOString(),
        state: currentState
      }));
    }

    const { state: migratedState, summary } = migrateProgressState(currentState);

    // Save migrated state back to localStorage
    localStorage.setItem('study-tools-decks', JSON.stringify(migratedState.decks));
    localStorage.setItem('study-tools-quizHistory', JSON.stringify(migratedState.quizHistory));
    localStorage.setItem('study-tools-planner', JSON.stringify(migratedState.planner));
    localStorage.setItem(MIGRATION_VERSION_KEY, String(CURRENT_MIGRATION_VERSION));

    if (summary.migratedDecksCount > 0 || summary.mergedDecksCount > 0 || summary.migratedQuizHistoryCount > 0) {
      console.info(
        `[StudyToolsHub] Migrated legacy user progress to canonical topics: ` +
        `${summary.migratedDecksCount} decks migrated, ${summary.mergedDecksCount} decks merged, ` +
        `${summary.migratedQuizHistoryCount} quiz entries updated.`
      );
    }

    return summary;
  } catch (err: any) {
    console.warn('[StudyToolsHub] Warning during local progress migration:', err);
    return {
      migratedDecksCount: 0,
      mergedDecksCount: 0,
      migratedQuizHistoryCount: 0,
      migratedPlannerSlotsCount: 0,
      unchangedDecksCount: 0,
      warnings: [err?.message || String(err)]
    };
  }
}
