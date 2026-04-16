/**
 * Deterministic Variation Engine for Programmatic SEO
 * Ensures unique content per page based on a seed or slug hash.
 */

const introTemplates = [
  "Welcome to the most comprehensive {topic} study guide. Whether you are prepping for {level} midterms or just need a quick refresher, these resources are for you.",
  "Master {topic} today with our {level}-focused study tools. We've compiled the most critical concepts to help you excel in your studies.",
  "Looking for {topic} flashcards? You've come to the right place. Our database is optimized for {level} students who need fast, reliable info.",
  "Struggling with {topic}? Our {level} flashcards and quizzes are designed to break down complex ideas into manageable pieces.",
  "Join thousands of students mastering {topic} for {level}. Our interactive platform works 100% offline for your convenience.",
  "Get exam-ready with our curated {topic} questions. Perfect for {level} level coursework and deep-dive learning."
];

const tipTemplates = [
  "Focus on the 'why' behind {topic}. Understanding the core logic makes memorization much easier.",
  "Space out your {topic} review sessions. Studying {level} material in short bursts leads to better retention.",
  "Try teaching {topic} to a friend. If you can explain it simply, you've mastered it.",
  "Use our flashcards daily. Consistency is the key to mastering {topic} at the {level} level.",
  "Link {topic} to real-world examples. It's easier to remember {level} concepts when they're practical.",
  "Draw diagrams for {topic}. Visual aids are powerful study tools for {level} students."
];

const successStories = [
  "Jamie used these {topic} cards to ace her {level} finals: 'I went from a C to an A in just two weeks!'",
  "Sam says: 'The offline flashcards were a lifesaver for my {topic} exam prep during my commute.'",
  "Alex: 'Best free tool for {level} {topic} I've found. No sign-ups required!'",
  "Our {topic} community has helped over 5,000 students pass their {level} certifications this year.",
  "Maria saved 10 hours a week using our {topic} planner for her {level} course."
];

/**
 * Returns a deterministic variation of a text block based on a seed
 */
export const getVariation = (templates: string[], seed: number, replacements: Record<string, string>) => {
  const index = Math.abs(seed) % templates.length;
  let text = templates[index];
  
  Object.keys(replacements).forEach(key => {
    text = text.replace(new RegExp(`{${key}}`, 'g'), replacements[key]);
  });
  
  return text;
};

export const getPageContent = (topic: string, level: string, seed: number) => {
  const replacements = { topic, level };
  
  return {
    intro: getVariation(introTemplates, seed, replacements),
    tip: getVariation(tipTemplates, seed + 1, replacements),
    successStory: getVariation(successStories, seed + 2, replacements)
  };
};

/**
 * Generates a simple hash from a string to use as a seed
 */
export const hashString = (str: string): number => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
};
