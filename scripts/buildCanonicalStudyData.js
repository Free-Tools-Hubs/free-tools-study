/**
 * Phase 2B — Canonical Study Dataset Builder & Legacy URL Migration Generator
 *
 * Deterministically analyzes `src/data/studyTopics.json` (5,000 records),
 * recovers orphaned Computer Science authored content, applies documented editorial
 * quiz corrections, integrates verified & expanded educational content across all 21
 * priority topics, establishes a multi-dimensional content quality model, and
 * preserves the complete legacy migration manifest in `src/data/legacyTopicUrlManifest.json`.
 */

import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import { fileURLToPath } from 'url';
import { REMEDIATED_PRIORITY_TOPICS, getRemediatedTopic } from './content/remediatedPriorityContent.js';
import { loadSeedRealContentMap } from './content/seedContentExtractor.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const REPO_ROOT = path.resolve(__dirname, '..');
const SOURCE_DATA_PATH = path.join(REPO_ROOT, 'src', 'data', 'studyTopics.json');
const CANONICAL_OUT_PATH = path.join(REPO_ROOT, 'src', 'data', 'canonicalStudyTopics.json');
const MANIFEST_OUT_PATH = path.join(REPO_ROOT, 'src', 'data', 'legacyTopicUrlManifest.json');

/**
 * Explicit deterministic URL-safe slug generator.
 * Handles:
 * - Unicode normalization (NFKD) & combining diacritical marks removal
 * - Whitespace (spaces, tabs, newlines) -> single hyphen
 * - Punctuation & non-alphanumeric characters -> hyphen
 * - Repeated hyphens -> collapsed to single hyphen
 * - Leading/trailing hyphens -> trimmed
 * - Empty string validation
 */
export function generateDeterministicSlug(parts, existingSlugs = null) {
  const raw = Array.isArray(parts) ? parts.join('-') : String(parts ?? '');
  const normalized = raw
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/^-+|-+$/g, '');

  if (!normalized) {
    throw new Error(`Slug generation produced an empty slug for input: ${JSON.stringify(parts)}`);
  }

  if (existingSlugs) {
    if (existingSlugs.has(normalized)) {
      throw new Error(`Duplicate canonical slug collision detected: "${normalized}"`);
    }
    existingSlugs.add(normalized);
  }

  return normalized;
}

/**
 * Known synthetic placeholder detectors from `scripts/seedData.js` (`generateFallbackContent`)
 */
export const PLACEHOLDER_PATTERNS = {
  quizOptions: [
    'Common student misconception',
    'Related but incorrect concept',
    'Irrelevant distractor'
  ],
  quizCorrectPrefix: 'Correct application of ',
  flashcardQuestionPrefix: 'Explain the role of ',
  flashcardAnswerSubstring: 'has direct applications in real-world research and industry.',
  quizQuestionPrefix: 'Which of the following best illustrates a key principle of ',
  quizExplanationPrefix: 'This question tests deep conceptual understanding required for ',
  genericDescriptionRegex: /^Comprehensive .+ study guide for .+ in .+\. Master key concepts with flashcards, practice questions, and structured learning plans\.$/
};

/**
 * Detects whether a flashcard object is a synthetic placeholder from `generateFallbackContent`.
 */
export function isPlaceholderFlashcard(card) {
  if (!card || typeof card.question !== 'string' || typeof card.answer !== 'string') return true;
  return (
    card.question.startsWith(PLACEHOLDER_PATTERNS.flashcardQuestionPrefix) &&
    card.answer.includes(PLACEHOLDER_PATTERNS.flashcardAnswerSubstring)
  );
}

/**
 * Detects whether a quiz question object is a synthetic placeholder from `generateFallbackContent`.
 */
export function isPlaceholderQuizQuestion(q) {
  if (!q || typeof q.question !== 'string' || !Array.isArray(q.options)) return true;
  const hasPlaceholderDistractors = PLACEHOLDER_PATTERNS.quizOptions.every(opt => q.options.includes(opt));
  const hasPlaceholderCorrect = typeof q.correctAnswer === 'string' && q.correctAnswer.startsWith(PLACEHOLDER_PATTERNS.quizCorrectPrefix);
  const hasPlaceholderExplanation = typeof q.explanation === 'string' && q.explanation.startsWith(PLACEHOLDER_PATTERNS.quizExplanationPrefix);
  return hasPlaceholderDistractors || hasPlaceholderCorrect || hasPlaceholderExplanation;
}

/**
 * Evaluates whether an education level is pedagogically compatible with a given (subject, subTopic).
 */
export function evaluateLevelCompatibility(subject, subTopic, level) {
  // 1. MCAT is a medical school admissions exam covering Biology, Chemistry, Physics, and Psychology.
  if (level === 'MCAT' && ['Computer Science', 'Economics', 'History', 'Literature', 'Math'].includes(subject)) {
    return {
      compatible: false,
      reason: `MCAT is a medical school admissions exam and does not test ${subject} (${subTopic}).`
    };
  }

  // 2. 'Kids' (elementary level) is incompatible with specialized upper-secondary / university subtopics.
  const advancedSubtopicsIneligibleForKids = new Set([
    'Quantum Physics', 'Relativity', 'Nuclear Physics', 'Fluid Dynamics',
    'Organic Chemistry', 'Physical Chemistry', 'Analytical Chemistry', 'Thermodynamics',
    'Calculus', 'Linear Algebra', 'Graph Theory', 'Number Theory',
    'Econometrics', 'Game Theory', 'International Trade',
    'Post-Colonial Literature', 'Modernism', 'Victorian Literature', 'Renaissance Prose',
    'Behavioral Neuroscience', 'Clinical Psychology',
    'Operating Systems', 'Database Systems', 'Cloud Computing', 'Machine Learning', 'Cybersecurity', 'Algorithms', 'Data Structures',
    'Biochemistry'
  ]);
  if (level === 'Kids' && advancedSubtopicsIneligibleForKids.has(subTopic)) {
    return {
      compatible: false,
      reason: `Education level 'Kids' is pedagogically incompatible with advanced topic '${subTopic}' in ${subject}.`
    };
  }

  // 3. Secondary school standardized tests (SAT, GCSE) do not test specialized graduate/upper-undergraduate subtopics.
  const specializedUniversitySubtopics = new Set([
    'Quantum Physics', 'Relativity', 'Econometrics', 'Behavioral Neuroscience', 'Clinical Psychology',
    'Post-Colonial Literature', 'Renaissance Prose', 'Operating Systems', 'Cloud Computing', 'Machine Learning'
  ]);
  if ((level === 'SAT' || level === 'GCSE') && specializedUniversitySubtopics.has(subTopic)) {
    return {
      compatible: false,
      reason: `Secondary-school exam level '${level}' is incompatible with specialized university subtopic '${subTopic}'.`
    };
  }

  return { compatible: true, reason: null };
}

/**
 * Computes a deterministic SHA-256 fingerprint of normalized flashcards and quiz questions.
 */
export function computeContentFingerprint(flashcards, quizQuestions) {
  const normCards = Array.from(
    new Map(
      (flashcards || []).map(c => [
        `${c.question.trim()}|||${c.answer.trim()}`,
        { q: c.question.trim(), a: c.answer.trim() }
      ])
    ).values()
  ).sort((a, b) => (a.q + a.a).localeCompare(b.q + b.a));

  const normQuestions = Array.from(
    new Map(
      (quizQuestions || []).map(q => [
        `${q.question.trim()}|||${(q.options || []).map(o => o.trim()).join('||')}|||${q.correctAnswer.trim()}|||${q.explanation.trim()}`,
        {
          q: q.question.trim(),
          o: (q.options || []).map(o => o.trim()),
          a: q.correctAnswer.trim(),
          e: q.explanation.trim()
        }
      ])
    ).values()
  ).sort((a, b) => (a.q + a.a).localeCompare(b.q + b.a));

  const payload = JSON.stringify({ flashcards: normCards, quizQuestions: normQuestions });
  return crypto.createHash('sha256').update(payload, 'utf8').digest('hex').slice(0, 16);
}

/**
 * Computes a level-agnostic structural fingerprint for fallback template comparison.
 */
function computeLevelNeutralFingerprint(flashcards, quizQuestions, level) {
  const stripLevel = str => String(str ?? '').replace(new RegExp(level, 'gi'), '{LEVEL}');
  const normCards = (flashcards || []).map(c => ({
    question: stripLevel(c.question),
    answer: stripLevel(c.answer)
  }));
  const normQuestions = (quizQuestions || []).map(q => ({
    question: stripLevel(q.question),
    options: (q.options || []).map(stripLevel),
    correctAnswer: stripLevel(q.correctAnswer),
    explanation: stripLevel(q.explanation)
  }));
  return computeContentFingerprint(normCards, normQuestions);
}

/**
 * Computer Science subtopics that had real content defined in `scripts/seedData.js` (`realContentMap`)
 * but received placeholder content in `src/data/studyTopics.json` due to the `"computer science-..."` slug space defect.
 */
const ORPHANED_CS_SEED_SUBTOPICS = new Set([
  'computer-science-algorithms',
  'computer-science-data-structures',
  'computer-science-machine-learning'
]);

export function main() {
  const rawContent = fs.readFileSync(SOURCE_DATA_PATH, 'utf8');
  const studyData = JSON.parse(rawContent);
  const seedRealContentMap = loadSeedRealContentMap();

  console.log(`Loaded ${studyData.length} records from ${SOURCE_DATA_PATH} (${Buffer.byteLength(rawContent, 'utf8').toLocaleString()} bytes)`);

  // Group records by canonical identity: (subject, subTopic)
  const groups = new Map();
  const seenComboFirstRecord = new Map();

  for (let i = 0; i < studyData.length; i++) {
    const rec = studyData[i];
    const identityKey = `${rec.subject.trim()}|||${rec.subTopic.trim()}`;
    if (!groups.has(identityKey)) {
      groups.set(identityKey, []);
    }
    groups.get(identityKey).push({ index: i, record: rec });

    const comboKey = `${rec.subject.trim()}|||${rec.subTopic.trim()}|||${rec.level.trim()}`;
    if (!seenComboFirstRecord.has(comboKey)) {
      seenComboFirstRecord.set(comboKey, rec.id);
    }
  }

  // Sort canonical groups deterministically by subject name, then subTopic name
  const sortedGroupKeys = Array.from(groups.keys()).sort((a, b) => a.localeCompare(b));
  const usedCanonicalSlugs = new Set();
  const usedCanonicalIds = new Set();

  const canonicalTopics = [];
  const canonicalByIdentity = new Map();

  let totalRealFlashcardsPreserved = 0;
  let totalRealQuizQuestionsPreserved = 0;
  let totalCSFlashcardsRecovered = 0;
  let totalCSQuizQuestionsRecovered = 0;
  let totalRemediatedCardsAdded = 0;
  let totalRemediatedQuestionsAdded = 0;

  for (const identityKey of sortedGroupKeys) {
    const entries = groups.get(identityKey);
    const firstEntry = entries[0].record;
    const subject = firstEntry.subject.trim();
    const subTopic = firstEntry.subTopic.trim();

    const subjectSlug = generateDeterministicSlug(subject);
    const slug = generateDeterministicSlug([subject, subTopic], usedCanonicalSlugs);
    const id = `topic-${slug}`;
    if (usedCanonicalIds.has(id)) {
      throw new Error(`Duplicate canonical ID: ${id}`);
    }
    usedCanonicalIds.add(id);

    // Collect all unique non-placeholder flashcards & quiz questions across ALL records in this (subject, subTopic) group
    const uniqueRealFlashcardsMap = new Map();
    const uniquePlaceholderFlashcardsMap = new Map();
    const uniqueRealQuizMap = new Map();
    const uniquePlaceholderQuizMap = new Map();

    const compatibleLevelsSet = new Set();
    const incompatibleLevelsObserved = new Set();
    const allLevelsObserved = new Set();

    // Use the first compatible-level record (or first record) as representative for fallback templates
    const primaryRec = entries.find(e => evaluateLevelCompatibility(subject, subTopic, e.record.level).compatible)?.record || firstEntry;

    for (const { record } of entries) {
      allLevelsObserved.add(record.level);
      const compat = evaluateLevelCompatibility(subject, subTopic, record.level);
      if (compat.compatible) {
        compatibleLevelsSet.add(record.level);
      } else {
        incompatibleLevelsObserved.add(record.level);
      }

      for (const fc of record.baseFlashcards || []) {
        const key = `${fc.question.trim()}|||${fc.answer.trim()}`;
        if (!isPlaceholderFlashcard(fc)) {
          if (!uniqueRealFlashcardsMap.has(key)) {
            uniqueRealFlashcardsMap.set(key, {
              question: fc.question.trim(),
              answer: fc.answer.trim()
            });
          }
        }
      }

      for (const q of record.baseQuestions || []) {
        const key = `${q.question.trim()}|||${(q.options || []).join('||')}|||${q.correctAnswer.trim()}|||${q.explanation.trim()}`;
        if (!isPlaceholderQuizQuestion(q)) {
          if (!uniqueRealQuizMap.has(key)) {
            uniqueRealQuizMap.set(key, {
              question: q.question.trim(),
              options: q.options.map(o => o.trim()),
              correctAnswer: q.correctAnswer.trim(),
              explanation: q.explanation.trim()
            });
          }
        }
      }
    }

    // Check if this topic is one of the 3 orphaned Computer Science topics that had authored content in seedData.js
    const isOrphanedCS = ORPHANED_CS_SEED_SUBTOPICS.has(slug);
    if (isOrphanedCS && seedRealContentMap[slug]) {
      const seedData = seedRealContentMap[slug];
      for (const fc of seedData.flashcards || []) {
        const key = `${fc.q.trim()}|||${fc.a.trim()}`;
        if (!uniqueRealFlashcardsMap.has(key)) {
          uniqueRealFlashcardsMap.set(key, {
            question: fc.q.trim(),
            answer: fc.a.trim(),
            recoveredFromSeed: true
          });
          totalCSFlashcardsRecovered++;
        }
      }
      for (const q of seedData.questions || []) {
        const key = `${q.q.trim()}|||${(q.o || []).join('||')}|||${q.a.trim()}|||${q.e.trim()}`;
        if (!uniqueRealQuizMap.has(key)) {
          uniqueRealQuizMap.set(key, {
            question: q.q.trim(),
            options: q.o.map(o => o.trim()),
            correctAnswer: q.a.trim(),
            explanation: q.e.trim(),
            recoveredFromSeed: true
          });
          totalCSQuizQuestionsRecovered++;
        }
      }
    }

    // Capture the unexpanded seed content for legacy fingerprint reconciliation
    const seedFlashcardsRaw = Array.from(uniqueRealFlashcardsMap.values()).map(c => ({
      question: c.question,
      answer: c.answer
    }));
    const seedQuizQuestionsRaw = Array.from(uniqueRealQuizMap.values()).map(q => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation
    }));
    const seedContentFingerprint = computeContentFingerprint(seedFlashcardsRaw, seedQuizQuestionsRaw);

    // For placeholder-only topics, deduplicate the representative record's flashcards/questions (eliminating intra-deck j%5 repeats)
    if (uniqueRealFlashcardsMap.size === 0) {
      for (const fc of primaryRec.baseFlashcards || []) {
        const key = `${fc.question.trim()}|||${fc.answer.trim()}`;
        if (!uniquePlaceholderFlashcardsMap.has(key)) {
          uniquePlaceholderFlashcardsMap.set(key, {
            question: fc.question.trim(),
            answer: fc.answer.trim()
          });
        }
      }
    }

    if (uniqueRealQuizMap.size === 0) {
      for (const q of primaryRec.baseQuestions || []) {
        const key = `${q.question.trim()}|||${(q.options || []).join('||')}|||${q.correctAnswer.trim()}|||${q.explanation.trim()}`;
        if (!uniquePlaceholderQuizMap.has(key)) {
          uniquePlaceholderQuizMap.set(key, {
            question: q.question.trim(),
            options: q.options.map(o => o.trim()),
            correctAnswer: q.correctAnswer.trim(),
            explanation: q.explanation.trim()
          });
        }
      }
    }

    const hasRealFlashcards = uniqueRealFlashcardsMap.size > 0;
    const hasRealQuiz = uniqueRealQuizMap.size > 0;
    const isPriorityTopic = REMEDIATED_PRIORITY_TOPICS[slug] !== undefined;
    const remediatedData = getRemediatedTopic(slug);

    // Build base flashcards and quiz questions
    let baseFlashcards = Array.from(
      (hasRealFlashcards ? uniqueRealFlashcardsMap : uniquePlaceholderFlashcardsMap).values()
    ).map((c, idx) => ({
      id: `card-${slug}-${String(idx + 1).padStart(2, '0')}`,
      question: c.question,
      answer: c.answer,
      ...(c.recoveredFromSeed ? { recoveredFromSeed: true } : {})
    }));

    let baseQuizQuestions = Array.from(
      (hasRealQuiz ? uniqueRealQuizMap : uniquePlaceholderQuizMap).values()
    ).map((q, idx) => ({
      id: `quiz-${slug}-${String(idx + 1).padStart(2, '0')}`,
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      explanation: q.explanation,
      ...(q.recoveredFromSeed ? { recoveredFromSeed: true } : {})
    }));

    // If documented editorial corrections apply to base quiz questions (chemistry-organic-chemistry, biology-evolution)
    if (remediatedData && remediatedData.editorialCorrections) {
      for (const [qIdxStr, correction] of Object.entries(remediatedData.editorialCorrections)) {
        const qIdx = parseInt(qIdxStr, 10);
        if (baseQuizQuestions[qIdx]) {
          baseQuizQuestions[qIdx] = {
            id: baseQuizQuestions[qIdx].id,
            question: correction.correctedQuestion,
            options: correction.correctedOptions,
            correctAnswer: correction.correctedCorrectAnswer,
            explanation: correction.correctedExplanation,
            editorialCorrectionApplied: true,
            correctionReason: correction.correctionReason,
            originalQuestion: correction.originalQuestion
          };
        }
      }
    }

    // Append newly authored additional flashcards and quiz questions if remediated
    let finalFlashcards = [...baseFlashcards];
    let finalQuizQuestions = [...baseQuizQuestions];

    if (remediatedData) {
      const startCardIdx = finalFlashcards.length;
      for (let j = 0; j < remediatedData.additionalFlashcards.length; j++) {
        const addCard = remediatedData.additionalFlashcards[j];
        finalFlashcards.push({
          id: `card-${slug}-${String(startCardIdx + j + 1).padStart(2, '0')}`,
          question: addCard.question,
          answer: addCard.answer,
          verificationBasis: addCard.verificationBasis,
          requiresSpecialistReview: addCard.requiresSpecialistReview ?? false,
          ...(addCard.specialistReviewNote ? { specialistReviewNote: addCard.specialistReviewNote } : {})
        });
        totalRemediatedCardsAdded++;
      }

      const startQuizIdx = finalQuizQuestions.length;
      for (let j = 0; j < remediatedData.additionalQuizQuestions.length; j++) {
        const addQ = remediatedData.additionalQuizQuestions[j];
        finalQuizQuestions.push({
          id: `quiz-${slug}-${String(startQuizIdx + j + 1).padStart(2, '0')}`,
          question: addQ.question,
          options: addQ.options,
          correctAnswer: addQ.correctAnswer,
          explanation: addQ.explanation,
          verificationBasis: addQ.verificationBasis,
          requiresSpecialistReview: addQ.requiresSpecialistReview ?? false,
          ...(addQ.specialistReviewNote ? { specialistReviewNote: addQ.specialistReviewNote } : {})
        });
        totalRemediatedQuestionsAdded++;
      }
    }

    if (hasRealFlashcards && !isOrphanedCS) totalRealFlashcardsPreserved += baseFlashcards.length;
    if (hasRealQuiz && !isOrphanedCS) totalRealQuizQuestionsPreserved += baseQuizQuestions.length;

    // Content Quality model
    let contentQuality;
    let description;
    let learningObjectives = [];
    let supportedEducationLevels;

    if (remediatedData) {
      description = remediatedData.description;
      learningObjectives = remediatedData.learningObjectives || [];
      supportedEducationLevels = remediatedData.supportedEducationLevels
        ? remediatedData.supportedEducationLevels.filter(lvl => compatibleLevelsSet.has(lvl)).sort((a, b) => a.localeCompare(b))
        : Array.from(compatibleLevelsSet).sort((a, b) => a.localeCompare(b));

      const qAssess = remediatedData.qualityAssessment;
      contentQuality = {
        status: qAssess.indexabilityStatus === 'verified' ? 'verified' : 'needs_review',
        structuralStatus: qAssess.structuralStatus,
        accuracyStatus: qAssess.accuracyStatus,
        coverageStatus: qAssess.coverageStatus,
        editorialStatus: qAssess.editorialStatus,
        indexabilityStatus: qAssess.indexabilityStatus,
        hasPlaceholderContent: false,
        flashcardCount: finalFlashcards.length,
        quizQuestionCount: finalQuizQuestions.length,
        reviewReasons: qAssess.reviewReasons || [],
        specialistReviewConcepts: qAssess.specialistReviewConcepts || [],
        editorialCorrectionsApplied: Boolean(remediatedData.editorialCorrections),
        orphanedSeedRecovered: isOrphanedCS,
        issues: qAssess.reviewReasons || []
      };
    } else {
      // 44 remaining placeholder fallback subtopics
      description = `Comprehensive study guide for ${subTopic} in ${subject}. Master key concepts with flashcards, practice questions, and structured learning plans.`;
      supportedEducationLevels = Array.from(compatibleLevelsSet).sort((a, b) => a.localeCompare(b));

      const issues = [
        'placeholder_flashcards: All flashcards in studyTopics.json use synthetic fallback template ("Explain the role of {concept} in {topic}...").',
        'placeholder_quiz_questions: All quiz questions in studyTopics.json use literal placeholder options ("Common student misconception", "Related but incorrect concept", "Irrelevant distractor").',
        'intra_record_duplication_removed: Original records repeated the same 5 concept templates 8-16 times per deck and 6-12 times per quiz.',
        'generic_template_description: Topic description uses the boilerplate generator template ("Comprehensive {level} study guide for {subTopic} in {subject}...).'
      ];
      if (incompatibleLevelsObserved.size > 0) {
        issues.push(
          `excluded_incompatible_levels: Removed ${incompatibleLevelsObserved.size} incompatible education level(s) (${Array.from(incompatibleLevelsObserved).sort().join(', ')}) from canonical metadata.`
        );
      }

      contentQuality = {
        status: 'insufficient',
        structuralStatus: 'insufficient',
        accuracyStatus: 'insufficient',
        coverageStatus: 'insufficient',
        editorialStatus: 'insufficient',
        indexabilityStatus: 'insufficient',
        hasPlaceholderContent: true,
        flashcardCount: finalFlashcards.length,
        quizQuestionCount: finalQuizQuestions.length,
        reviewReasons: issues,
        specialistReviewConcepts: [],
        editorialCorrectionsApplied: false,
        orphanedSeedRecovered: false,
        issues
      };
    }

    const subTopicSlug = generateDeterministicSlug(subTopic);
    const contentFingerprint = computeContentFingerprint(finalFlashcards, finalQuizQuestions);
    const levelNeutralFingerprint = computeLevelNeutralFingerprint(
      primaryRec.baseFlashcards,
      primaryRec.baseQuestions,
      primaryRec.level
    );

    const canonicalTopic = {
      id,
      slug,
      subject,
      subjectSlug,
      subTopic,
      description,
      learningObjectives,
      educationLevels: supportedEducationLevels,
      difficulty: remediatedData?.difficulty || primaryRec.difficulty || 'Beginner',
      estimatedTime: remediatedData?.estimatedTime || primaryRec.estimatedTime || '15 minutes',
      tags: Array.from(new Set([subjectSlug, subTopicSlug, 'study-guide', 'exam-prep'])),
      flashcards: finalFlashcards,
      quizQuestions: finalQuizQuestions,
      plannerTemplates: [
        { title: `Mastery Plan – ${subTopic}`, sessions: 6 },
        { title: `Fast-Track Review: ${subTopic}`, sessions: 2 },
        { title: `Exam-Crunch ${subject} – ${subTopic}`, sessions: 4 },
        { title: `Deep Dive: ${subTopic}`, sessions: 6 }
      ],
      contentFingerprint,
      seedContentFingerprint,
      provenance: {
        primarySourceRecordId: primaryRec.id,
        primarySourceSlug: primaryRec.slug,
        consolidatedRecordCount: entries.length,
        hadLegacyUnversionedCanonicalSlug: entries.some(e => e.record.slug === slug),
        seedSource: isOrphanedCS
          ? 'scripts/seedData.js (recovered from realContentMap)'
          : isPriorityTopic
            ? 'src/data/studyTopics.json + scripts/seedData.js'
            : 'src/data/studyTopics.json (synthetic fallback)',
        remediationSource: isPriorityTopic ? 'scripts/content/remediatedPriorityContent.js' : null,
        seedFlashcardCount: baseFlashcards.length - (remediatedData ? remediatedData.additionalFlashcards.length : 0),
        seedQuizQuestionCount: baseQuizQuestions.length - (remediatedData ? remediatedData.additionalQuizQuestions.length : 0),
        addedFlashcardCount: remediatedData ? remediatedData.additionalFlashcards.length : 0,
        addedQuizQuestionCount: remediatedData ? remediatedData.additionalQuizQuestions.length : 0,
        editorialCorrectionsCount: remediatedData?.editorialCorrections ? Object.keys(remediatedData.editorialCorrections).length : 0
      },
      contentQuality
    };

    canonicalTopics.push(canonicalTopic);
    canonicalByIdentity.set(identityKey, {
      canonicalTopic,
      levelNeutralFingerprint
    });
  }

  // Build Legacy URL Migration Manifest for all 5,000 records + 4 hardcoded nav slugs
  const manifestRecords = [];
  const dispositionCounts = {
    redirect: 0,
    manual_review: 0,
    obsolete: 0
  };

  for (let i = 0; i < studyData.length; i++) {
    const rec = studyData[i];
    const identityKey = `${rec.subject.trim()}|||${rec.subTopic.trim()}`;
    const { canonicalTopic, levelNeutralFingerprint } = canonicalByIdentity.get(identityKey);

    const comboKey = `${rec.subject.trim()}|||${rec.subTopic.trim()}|||${rec.level.trim()}`;
    const isFirstComboOccurrence = seenComboFirstRecord.get(comboKey) === rec.id;

    const versionMatch = rec.slug.match(/-(v\d+)$/);
    const versionSuffix = versionMatch ? versionMatch[1] : null;
    const hasMalformedSpace = rec.slug.includes(' ');

    const recordFingerprint = computeContentFingerprint(rec.baseFlashcards, rec.baseQuestions);
    // In Phase 2B, verify whether the legacy record's content matches the unexpanded seed content of the topic
    const exactFingerprintMatch = recordFingerprint === canonicalTopic.seedContentFingerprint;
    const recordLevelNeutralFp = computeLevelNeutralFingerprint(rec.baseFlashcards, rec.baseQuestions, rec.level);
    const templateStructureMatch = recordLevelNeutralFp === levelNeutralFingerprint;

    const levelCompat = evaluateLevelCompatibility(rec.subject, rec.subTopic, rec.level);
    // Real topic determination in studyTopics.json (18 bound topics had real content in the legacy dataset)
    const hadRealContentInSource = exactFingerprintMatch && !isPlaceholderFlashcard(rec.baseFlashcards[0]);

    let disposition;
    let reason;
    let confidence;
    let reviewStatus;

    if (hadRealContentInSource) {
      if (!exactFingerprintMatch) {
        disposition = 'manual_review';
        reason = 'content_fingerprint_mismatch_with_canonical_topic';
        confidence = 'low';
        reviewStatus = 'requires_content_diff_review';
      } else if (!levelCompat.compatible) {
        if (isFirstComboOccurrence) {
          disposition = 'manual_review';
          reason = `incompatible_education_level_on_real_topic: ${levelCompat.reason}`;
          confidence = 'medium';
          reviewStatus = 'requires_curriculum_review';
        } else {
          disposition = 'obsolete';
          reason = `cycle_repeat_duplicate_of_incompatible_level_pairing (${versionSuffix}): ${levelCompat.reason}`;
          confidence = 'high';
          reviewStatus = 'verified_obsolete';
        }
      } else {
        // Real content in studyTopics.json, 100% verified content fingerprint match, compatible education level
        disposition = 'redirect';
        reason = isFirstComboOccurrence
          ? 'verified_identical_real_content_consolidating_level_variant_to_canonical_subtopic'
          : `verified_identical_real_content_consolidating_cycle_duplicate_${versionSuffix}_to_canonical_subtopic`;
        confidence = 'high';
        reviewStatus = 'verified_equivalent';
      }
    } else {
      // Topic contained synthetic placeholder fallback content in studyTopics.json
      if (!levelCompat.compatible) {
        disposition = 'obsolete';
        reason = isFirstComboOccurrence
          ? `synthetic_placeholder_with_incompatible_education_level: ${levelCompat.reason}`
          : `synthetic_placeholder_cycle_repeat_with_incompatible_level (${versionSuffix}): ${levelCompat.reason}`;
        confidence = 'high';
        reviewStatus = 'verified_obsolete';
      } else if (!isFirstComboOccurrence) {
        // Cycle-repeat duplicate (i >= 1105) of synthetic placeholder template
        disposition = 'obsolete';
        reason = `synthetic_placeholder_cycle_repeat_duplicate (${versionSuffix || 'repeat'})_with_zero_unique_content`;
        confidence = 'high';
        reviewStatus = 'verified_obsolete';
      } else {
        // First occurrence of a compatible (subject, subTopic, level) in a placeholder record in studyTopics.json
        disposition = 'manual_review';
        reason = hasMalformedSpace
          ? (ORPHANED_CS_SEED_SUBTOPICS.has(canonicalTopic.slug)
              ? 'malformed_space_slug_with_recovered_canonical_topic_awaiting_url_rewrite_review'
              : 'malformed_space_slug_and_target_canonical_topic_has_insufficient_placeholder_content')
          : 'target_canonical_topic_has_insufficient_placeholder_content_and_level_interpolated_templates';
        confidence = 'medium';
        reviewStatus = ORPHANED_CS_SEED_SUBTOPICS.has(canonicalTopic.slug)
          ? 'recovered_canonical_content_ready_for_routing_migration'
          : 'awaiting_canonical_content_remediation';
      }
    }

    dispositionCounts[disposition]++;

    manifestRecords.push({
      legacyRecordId: rec.id,
      legacySlug: rec.slug,
      flashcardUrl: `/${rec.slug}`,
      quizUrl: `/quiz/${rec.slug}`,
      canonicalId: canonicalTopic.id,
      canonicalSlug: canonicalTopic.slug,
      canonicalFlashcardUrl: `/${canonicalTopic.slug}`,
      canonicalQuizUrl: `/quiz/${canonicalTopic.slug}`,
      originalSubject: rec.subject,
      originalSubTopic: rec.subTopic,
      originalEducationLevel: rec.level,
      originalVersionSuffix: versionSuffix,
      hasMalformedSpaceInSlug: hasMalformedSpace,
      isFirstComboOccurrence,
      contentFingerprint: recordFingerprint,
      exactFingerprintMatch,
      templateStructureMatch,
      disposition,
      reason,
      confidence,
      reviewStatus
    });
  }

  // Account for the 4 hardcoded navigation slugs in MainLayout.tsx & Home.tsx that did not exist in studyTopics.json
  const nonDatasetNavSlugs = [
    {
      legacySlug: 'biology-cell-biology',
      flashcardUrl: '/biology-cell-biology',
      quizUrl: '/quiz/biology-cell-biology',
      sourceLocation: 'src/layouts/MainLayout.tsx (lines 24, 25, 48, 51, 80, 81, 88) & src/pages/Home.tsx (lines 50, 62, 69)',
      canonicalId: 'topic-biology-cell-biology',
      canonicalSlug: 'biology-cell-biology',
      disposition: 'redirect',
      reason: 'legacy_hardcoded_nav_slug_now_resolves_directly_as_canonical_topic_slug',
      confidence: 'high',
      reviewStatus: 'resolved_as_canonical_slug'
    },
    {
      legacySlug: 'chemistry-organic-chemistry',
      flashcardUrl: '/chemistry-organic-chemistry',
      quizUrl: '/quiz/chemistry-organic-chemistry',
      sourceLocation: 'src/layouts/MainLayout.tsx (line 89)',
      canonicalId: 'topic-chemistry-organic-chemistry',
      canonicalSlug: 'chemistry-organic-chemistry',
      disposition: 'redirect',
      reason: 'legacy_hardcoded_nav_slug_now_resolves_directly_as_canonical_topic_slug',
      confidence: 'high',
      reviewStatus: 'resolved_as_canonical_slug'
    },
    {
      legacySlug: 'physics-mechanics',
      flashcardUrl: '/physics-mechanics',
      quizUrl: '/quiz/physics-mechanics',
      sourceLocation: 'src/layouts/MainLayout.tsx (line 90)',
      canonicalId: 'topic-physics-mechanics',
      canonicalSlug: 'physics-mechanics',
      disposition: 'redirect',
      reason: 'legacy_hardcoded_nav_slug_now_resolves_directly_as_canonical_topic_slug',
      confidence: 'high',
      reviewStatus: 'resolved_as_canonical_slug'
    },
    {
      legacySlug: 'psychology-intro',
      flashcardUrl: '/psychology-intro',
      quizUrl: '/quiz/psychology-intro',
      sourceLocation: 'src/layouts/MainLayout.tsx (line 91)',
      canonicalId: null,
      canonicalSlug: null,
      disposition: 'manual_review',
      reason: 'unresolved_hardcoded_footer_slug_no_intro_subtopic_exists_in_psychology_dataset',
      confidence: 'low',
      reviewStatus: 'unresolved_requires_owner_target_selection'
    }
  ];

  const manifestPayload = {
    schemaVersion: '1.1.0',
    phase: 'Phase 2B',
    generatedFrom: 'src/data/studyTopics.json',
    summary: {
      totalLegacyDatasetRecords: studyData.length,
      totalLegacyDatasetUrls: studyData.length * 2,
      totalNonDatasetHardcodedNavSlugs: nonDatasetNavSlugs.length,
      totalNonDatasetHardcodedNavUrls: nonDatasetNavSlugs.length * 2,
      totalCanonicalTopics: canonicalTopics.length,
      datasetRecordDispositions: {
        redirect: dispositionCounts.redirect,
        manual_review: dispositionCounts.manual_review,
        obsolete: dispositionCounts.obsolete,
        unresolved: 0
      },
      datasetUrlDispositions: {
        redirect: dispositionCounts.redirect * 2,
        manual_review: dispositionCounts.manual_review * 2,
        obsolete: dispositionCounts.obsolete * 2,
        unresolved: 0
      },
      nonDatasetNavSlugDispositions: {
        resolved_as_canonical_or_redirect: 3,
        manual_review_unresolved: 1
      }
    },
    nonDatasetNavigationUrls: nonDatasetNavSlugs,
    records: manifestRecords
  };

  fs.writeFileSync(CANONICAL_OUT_PATH, JSON.stringify(canonicalTopics, null, 2) + '\n', 'utf8');
  fs.writeFileSync(MANIFEST_OUT_PATH, JSON.stringify(manifestPayload, null, 2) + '\n', 'utf8');

  const canonicalBytes = fs.statSync(CANONICAL_OUT_PATH).size;
  const manifestBytes = fs.statSync(MANIFEST_OUT_PATH).size;

  console.log('\n=== PHASE 2B GENERATION COMPLETE ===');
  console.log(`Canonical topics written: ${canonicalTopics.length} -> ${CANONICAL_OUT_PATH} (${canonicalBytes.toLocaleString()} bytes)`);
  console.log(`  - verified: ${canonicalTopics.filter(t => t.contentQuality.status === 'verified').length}`);
  console.log(`  - needs_review: ${canonicalTopics.filter(t => t.contentQuality.status === 'needs_review').length}`);
  console.log(`  - insufficient: ${canonicalTopics.filter(t => t.contentQuality.status === 'insufficient').length}`);
  console.log(`  - total flashcards across dataset: ${canonicalTopics.reduce((acc, t) => acc + t.flashcards.length, 0)}`);
  console.log(`  - total quiz questions across dataset: ${canonicalTopics.reduce((acc, t) => acc + t.quizQuestions.length, 0)}`);
  console.log(`  - original real flashcards preserved: ${totalRealFlashcardsPreserved} / 50`);
  console.log(`  - original real quiz questions preserved: ${totalRealQuizQuestionsPreserved} / 19`);
  console.log(`  - orphaned CS seed flashcards recovered: ${totalCSFlashcardsRecovered} / 7`);
  console.log(`  - orphaned CS seed quiz questions recovered: ${totalCSQuizQuestionsRecovered} / 3`);
  console.log(`  - newly authored educational flashcards added: ${totalRemediatedCardsAdded}`);
  console.log(`  - newly authored educational quiz questions added: ${totalRemediatedQuestionsAdded}`);
  console.log(`Legacy URL manifest written: ${manifestRecords.length} dataset records (${manifestRecords.length * 2} URLs) + ${nonDatasetNavSlugs.length} nav slugs -> ${MANIFEST_OUT_PATH} (${manifestBytes.toLocaleString()} bytes)`);
  console.log('  - Dataset Record Dispositions:', dispositionCounts);
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(__filename)) {
  main();
}
