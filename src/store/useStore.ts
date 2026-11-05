import { create } from 'zustand';
import { storage } from '../utils/storage';
import { Flashcard, QuizQuestion, StudySlot } from '../modules/studyEngine';
import { runBrowserProgressMigration } from '../utils/progressMigration';

interface UserState {
  decks: Record<string, Flashcard[]>;
  quizHistory: any[];
  planner: StudySlot[];
  streak: number;
  lastVisit: string;
  
  // Actions
  saveDeck: (subject: string, cards: Flashcard[]) => void;
  addQuizResult: (result: any) => void;
  updatePlanner: (slots: StudySlot[]) => void;
  incrementStreak: () => void;
  loadState: () => void;
}

export const useStore = create<UserState>((set, get) => ({
  decks: {},
  quizHistory: [],
  planner: [],
  streak: 0,
  lastVisit: new Date().toISOString().split('T')[0],

  saveDeck: (subject, cards) => {
    const newDecks = { ...get().decks, [subject]: cards };
    set({ decks: newDecks });
    storage.saveLocal('decks', newDecks);
    storage.saveDeep('decks', newDecks);
  },

  addQuizResult: (result) => {
    const newHistory = [result, ...get().quizHistory].slice(0, 50); // Keep last 50
    set({ quizHistory: newHistory });
    storage.saveLocal('quizHistory', newHistory);
    storage.saveDeep('quizHistory', newHistory);
  },

  updatePlanner: (slots) => {
    set({ planner: slots });
    storage.saveLocal('planner', slots);
    storage.saveDeep('planner', slots);
  },

  incrementStreak: () => {
    const today = new Date().toISOString().split('T')[0];
    const { lastVisit, streak } = get();
    
    if (lastVisit === today) return;
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let newStreak = 1;
    if (lastVisit === yesterdayStr) {
      newStreak = streak + 1;
    }
    
    set({ streak: newStreak, lastVisit: today });
    storage.saveLocal('streak', newStreak);
    storage.saveLocal('lastVisit', today);
  },

  loadState: () => {
    // Run idempotent local progress migration before reading stored data
    runBrowserProgressMigration();

    const decks = storage.getLocal<Record<string, Flashcard[]>>('decks') || {};
    const quizHistory = storage.getLocal<any[]>('quizHistory') || [];
    const planner = storage.getLocal<StudySlot[]>('planner') || [];
    const streak = storage.getLocal<number>('streak') || 0;
    const lastVisit = storage.getLocal<string>('lastVisit') || new Date().toISOString().split('T')[0];
    
    set({ decks, quizHistory, planner, streak, lastVisit });
    
    // Fallback to IndexedDB if local is empty
    if (Object.keys(decks).length === 0) {
      storage.getDeep<any>('decks').then(data => {
        if (data) set({ decks: data });
      });
    }
  }
}));
