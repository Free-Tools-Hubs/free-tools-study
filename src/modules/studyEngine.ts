/**
 * Pure functions for data generation and processing
 * Core of the StudyToolsHub engine
 */

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  confidence?: number; // 0-5 for spaced repetition
  nextReview?: number; // timestamp
}

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
}

export interface StudySlot {
  day: string;
  time: string;
  subject: string;
  topic: string;
}

/**
 * Generates flashcards based on topic from canonical or legacy data.
 * Returns deterministic slice by default, with optional shuffle.
 */
export const generateFlashcards = (
  topicData: { flashcards?: Flashcard[]; baseFlashcards?: Flashcard[] } | null | undefined,
  count?: number,
  shuffle: boolean = false
): Flashcard[] => {
  if (!topicData) return [];
  const rawCards = topicData.flashcards ?? topicData.baseFlashcards;
  if (!Array.isArray(rawCards) || rawCards.length === 0) return [];

  const cards = shuffle
    ? [...rawCards].sort(() => Math.random() - 0.5)
    : [...rawCards];

  const targetCount = typeof count === 'number' && count > 0 ? count : cards.length;

  return cards.slice(0, targetCount).map(card => ({
    ...card,
    confidence: card.confidence ?? 0,
    nextReview: card.nextReview ?? Date.now()
  }));
};

/**
 * Generates quiz questions based on topic from canonical or legacy data.
 * Returns deterministic slice by default, with optional shuffle.
 */
export const generateQuizQuestions = (
  topicData: { quizQuestions?: QuizQuestion[]; baseQuestions?: QuizQuestion[] } | null | undefined,
  count?: number,
  shuffle: boolean = false
): QuizQuestion[] => {
  if (!topicData) return [];
  const rawQuestions = topicData.quizQuestions ?? topicData.baseQuestions;
  if (!Array.isArray(rawQuestions) || rawQuestions.length === 0) return [];

  const questions = shuffle
    ? [...rawQuestions].sort(() => Math.random() - 0.5)
    : [...rawQuestions];

  const targetCount = typeof count === 'number' && count > 0 ? count : questions.length;

  return questions.slice(0, targetCount).map(q => ({
    ...q,
    options: [...q.options]
  }));
};

/**
 * Evaluates user answers against correct answers and returns score breakdown
 */
export const shuffleAndScoreQuiz = (userAnswers: Record<string, string>, questions: QuizQuestion[]) => {
  let score = 0;
  const incorrectIds: string[] = [];
  
  questions.forEach(q => {
    if (userAnswers[q.id] === q.correctAnswer) {
      score++;
    } else {
      incorrectIds.push(q.id);
    }
  });
  
  return {
    score,
    total: questions.length,
    percentage: questions.length > 0 ? Math.round((score / questions.length) * 100) : 0,
    incorrectIds
  };
};

/**
 * Creates a weekly study plan
 */
export const createStudyPlan = (subjects: string[], hoursPerDay: number): StudySlot[] => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const times = ['08:00', '10:00', '14:00', '16:00', '19:00'];
  const plan: StudySlot[] = [];
  
  if (subjects.length === 0) return plan;

  let subjectIdx = 0;
  days.forEach(day => {
    // Allocate slots based on hoursPerDay (2 slots = ~4 hours with breaks)
    const slotsToday = Math.min(times.length, Math.ceil(hoursPerDay / 2));
    
    for (let i = 0; i < slotsToday; i++) {
      plan.push({
        day,
        time: times[i],
        subject: subjects[subjectIdx % subjects.length],
        topic: 'General Review'
      });
      subjectIdx++;
    }
  });
  
  return plan;
};

/**
 * SM-2 Spaced Repetition Algorithm (Simplified)
 * confidence: 0 (forgot) to 5 (perfect)
 */
export const calculateNextReview = (confidence: number, currentInterval: number) => {
  let interval = 1;
  if (confidence >= 3) {
    if (currentInterval === 0) interval = 1;
    else if (currentInterval === 1) interval = 6;
    else interval = Math.round(currentInterval * 2.5);
  } else {
    interval = 1;
  }
  
  return Date.now() + interval * 24 * 60 * 60 * 1000;
};
