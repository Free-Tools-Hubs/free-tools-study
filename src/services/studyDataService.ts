/**
 * StudyToolsHub — Canonical Study Data Access Service
 *
 * Centralized, strictly typed data-access layer for the normalized
 * 65-topic canonical educational dataset. Replaces all direct JSON
 * imports of legacy studyTopics.json across the application.
 */

import canonicalTopicsRaw from '../data/canonicalStudyTopics.json' with { type: 'json' };
import legacyRedirectMapRaw from '../data/legacySlugRedirectMap.json' with { type: 'json' };

export interface StudySlot {
  day: string;
  time: string;
  subject: string;
  topic: string;
}

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

export type ContentQualityStatus = 'verified' | 'needs_review' | 'insufficient';

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

export interface PlannerTemplate {
  title: string;
  sessions: number;
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

export interface SubjectSummary {
  name: string;
  slug: string;
  topicCount: number;
  verifiedCount: number;
  primaryCanonicalSlug: string;
}

// Immutable typed store
const CANONICAL_TOPICS: readonly CanonicalTopic[] = Object.freeze(
  canonicalTopicsRaw as CanonicalTopic[]
);

const LEGACY_REDIRECT_MAP: Readonly<Record<string, string>> = Object.freeze(
  legacyRedirectMapRaw as Record<string, string>
);

// High-performance index maps
const idIndex = new Map<string, CanonicalTopic>();
const slugIndex = new Map<string, CanonicalTopic>();
const subjectIndex = new Map<string, CanonicalTopic[]>();

for (const topic of CANONICAL_TOPICS) {
  idIndex.set(topic.id, topic);
  slugIndex.set(topic.slug.toLowerCase(), topic);

  const subKey = topic.subject.toLowerCase();
  const subSlugKey = topic.subjectSlug.toLowerCase();
  
  const existingBySub = subjectIndex.get(subKey) || [];
  existingBySub.push(topic);
  subjectIndex.set(subKey, existingBySub);

  if (subSlugKey !== subKey) {
    const existingBySlug = subjectIndex.get(subSlugKey) || [];
    if (!existingBySlug.includes(topic)) {
      existingBySlug.push(topic);
      subjectIndex.set(subSlugKey, existingBySlug);
    }
  }
}

/**
 * Normalizes an arbitrary incoming slug or route parameter.
 * Trims whitespace, lowercases, and replaces one or more spaces with hyphens.
 */
export function normalizeSlug(raw: string | undefined | null): string {
  if (!raw) return '';
  return String(raw)
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Returns all 65 canonical study topics.
 */
export function getAllCanonicalTopics(): readonly CanonicalTopic[] {
  return CANONICAL_TOPICS;
}

/**
 * Returns a canonical topic by its unique ID (e.g., 'topic-biology-cell-biology').
 */
export function getTopicById(id: string | undefined | null): CanonicalTopic | undefined {
  if (!id) return undefined;
  return idIndex.get(id.trim());
}

/**
 * Returns a canonical topic by its canonical slug (e.g., 'biology-cell-biology').
 */
export function getTopicBySlug(slug: string | undefined | null): CanonicalTopic | undefined {
  const normalized = normalizeSlug(slug);
  if (!normalized) return undefined;
  return slugIndex.get(normalized);
}

/**
 * Resolves an arbitrary slug or route parameter against canonical topics
 * and the legacy URL migration map.
 *
 * SOFT-404 ELIMINATION:
 * If the topic does not exist and does not map to a compatible redirect,
 * this function returns `{ topic: null, status: 'not_found' }`.
 * It NEVER silently returns a fallback topic like Cell Biology.
 */
export function resolveTopic(slugOrId: string | undefined | null): TopicResolutionResult {
  if (!slugOrId) {
    return { topic: null, isLegacyRedirect: false, status: 'not_found' };
  }

  const trimmed = slugOrId.trim();
  const normalized = normalizeSlug(trimmed);

  // 1. Check exact or normalized canonical slug
  const directSlugMatch = slugIndex.get(normalized);
  if (directSlugMatch) {
    return {
      topic: directSlugMatch,
      isLegacyRedirect: false,
      canonicalSlug: directSlugMatch.slug,
      canonicalUrl: `/${directSlugMatch.slug}`,
      status: 'canonical'
    };
  }

  // 2. Check canonical ID
  const directIdMatch = idIndex.get(trimmed);
  if (directIdMatch) {
    return {
      topic: directIdMatch,
      isLegacyRedirect: false,
      canonicalSlug: directIdMatch.slug,
      canonicalUrl: `/${directIdMatch.slug}`,
      status: 'canonical'
    };
  }

  // 3. Check legacy redirect map (check both raw trimmed and normalized)
  const legacyTargetSlug = LEGACY_REDIRECT_MAP[trimmed] || LEGACY_REDIRECT_MAP[normalized];
  if (legacyTargetSlug) {
    const targetTopic = slugIndex.get(legacyTargetSlug.toLowerCase());
    if (targetTopic) {
      return {
        topic: targetTopic,
        isLegacyRedirect: true,
        canonicalSlug: targetTopic.slug,
        canonicalUrl: `/${targetTopic.slug}`,
        legacySlug: trimmed,
        status: 'redirect'
      };
    }
  }

  // 4. Missing / Obsolete / Unknown slug -> Explicit Not Found
  return {
    topic: null,
    isLegacyRedirect: false,
    status: 'not_found'
  };
}

/**
 * Returns all topics belonging to a given subject name or subject slug.
 */
export function getTopicsBySubject(subject: string | undefined | null): CanonicalTopic[] {
  if (!subject) return [];
  const key = subject.trim().toLowerCase();
  return [...(subjectIndex.get(key) || [])];
}

/**
 * Returns all topics that support a specific education level.
 */
export function getTopicsByEducationLevel(level: string | undefined | null): CanonicalTopic[] {
  if (!level) return [];
  const query = level.trim().toLowerCase();
  return CANONICAL_TOPICS.filter(t =>
    t.educationLevels.some(l => l.toLowerCase() === query)
  );
}

/**
 * Returns only verified, indexable topics suitable for SEO and sitemap inclusion.
 * Excludes all 'needs_review' and 'insufficient' topics.
 */
export function getIndexableTopics(): CanonicalTopic[] {
  return CANONICAL_TOPICS.filter(t => t.contentQuality.status === 'verified');
}

/**
 * Returns the primary landing topic for a subject/category (e.g. for Home navigation pills).
 * Prioritizes verified topics first, then earliest alphabetical.
 */
export function getSubjectLandingTopic(subjectOrCategory: string | undefined | null): CanonicalTopic | undefined {
  if (!subjectOrCategory) return undefined;
  const topics = getTopicsBySubject(subjectOrCategory);
  if (topics.length === 0) return undefined;

  // Prefer verified topic with highest card count
  const verified = topics
    .filter(t => t.contentQuality.status === 'verified')
    .sort((a, b) => b.flashcards.length - a.flashcards.length);

  if (verified.length > 0) return verified[0];
  return topics[0];
}

/**
 * Filter topics across multiple criteria.
 */
export function filterTopics(options: TopicFilterOptions): CanonicalTopic[] {
  let results = [...CANONICAL_TOPICS];

  if (options.subject) {
    const subKey = options.subject.trim().toLowerCase();
    results = results.filter(
      t => t.subject.toLowerCase() === subKey || t.subjectSlug.toLowerCase() === subKey
    );
  }

  if (options.educationLevel) {
    const lvlKey = options.educationLevel.trim().toLowerCase();
    results = results.filter(t =>
      t.educationLevels.some(l => l.toLowerCase() === lvlKey)
    );
  }

  if (options.qualityStatus) {
    results = results.filter(t => t.contentQuality.status === options.qualityStatus);
  }

  if (options.onlyIndexable) {
    results = results.filter(t => t.contentQuality.status === 'verified');
  }

  if (options.searchQuery) {
    const q = options.searchQuery.trim().toLowerCase();
    results = results.filter(
      t =>
        t.subTopic.toLowerCase().includes(q) ||
        t.subject.toLowerCase().includes(q) ||
        t.tags.some(tag => tag.toLowerCase().includes(q))
    );
  }

  return results;
}

/**
 * Returns a deterministic list of flashcards for a topic.
 */
export function getTopicFlashcards(topic: CanonicalTopic | null | undefined): Flashcard[] {
  if (!topic || !Array.isArray(topic.flashcards)) return [];
  return topic.flashcards.map(c => ({
    id: c.id,
    question: c.question,
    answer: c.answer,
    confidence: c.confidence ?? 0,
    nextReview: c.nextReview ?? Date.now()
  }));
}

/**
 * Returns a deterministic list of quiz questions for a topic.
 */
export function getTopicQuiz(topic: CanonicalTopic | null | undefined): QuizQuestion[] {
  if (!topic || !Array.isArray(topic.quizQuestions)) return [];
  return topic.quizQuestions.map(q => ({
    id: q.id,
    question: q.question,
    options: [...q.options],
    correctAnswer: q.correctAnswer,
    explanation: q.explanation
  }));
}

/**
 * Returns summary statistics for all unique subjects in the canonical dataset.
 */
export function getUniqueSubjects(): SubjectSummary[] {
  const subjectsMap = new Map<string, {
    name: string;
    slug: string;
    topics: CanonicalTopic[];
  }>();

  for (const topic of CANONICAL_TOPICS) {
    const existing = subjectsMap.get(topic.subjectSlug) || {
      name: topic.subject,
      slug: topic.subjectSlug,
      topics: []
    };
    existing.topics.push(topic);
    subjectsMap.set(topic.subjectSlug, existing);
  }

  return Array.from(subjectsMap.values()).map(entry => {
    const verifiedCount = entry.topics.filter(t => t.contentQuality.status === 'verified').length;
    const landing = getSubjectLandingTopic(entry.slug);
    return {
      name: entry.name,
      slug: entry.slug,
      topicCount: entry.topics.length,
      verifiedCount,
      primaryCanonicalSlug: landing ? landing.slug : entry.topics[0].slug
    };
  });
}

export const studyDataService = {
  getAllCanonicalTopics,
  getTopicById,
  getTopicBySlug,
  resolveTopic,
  getTopicsBySubject,
  getTopicsByEducationLevel,
  getIndexableTopics,
  getSubjectLandingTopic,
  filterTopics,
  getTopicFlashcards,
  getTopicQuiz,
  getUniqueSubjects,
  normalizeSlug
};

export default studyDataService;
