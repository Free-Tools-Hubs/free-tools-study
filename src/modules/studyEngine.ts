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
 * Generates flashcards based on topic from the JSON data
 */
export const generateFlashcards = (topicData: any, count: number): Flashcard[] => {
  if (!topicData || !topicData.baseFlashcards) return [];
  
  // In Phase 2, we shuffle and pick 'count' cards
  const shuffled = [...topicData.baseFlashcards].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count).map(card => ({
    ...card,
    confidence: 0,
    nextReview: Date.now()
  }));
};

/**
 * Generates quiz questions based on topic from JSON data
 */
export const generateQuizQuestions = (topicData: any, count: number): QuizQuestion[] => {
  if (!topicData || !topicData.baseQuestions) return [];
  
  const shuffled = [...topicData.baseQuestions].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

/**
 * Shuffles quiz answers and returns a score
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
    percentage: Math.round((score / questions.length) * 100),
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
  
  let subjectIdx = 0;
  days.forEach(day => {
    // Basic logic: allocate slots based on hoursPerDay (2 slots = ~4 hours with breaks)
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
