import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ====================== PRODUCTION CONFIG ====================== */
const TOTAL_RECORDS = 5000;                    // Scalable to 20k+
const VARIATION_CYCLE = 500;                   // New variation every N records for uniqueness
/* ============================================================ */

const subjects = [
  { name: 'Biology', topics: ['Cell Biology', 'Genetics', 'Evolution', 'Human Anatomy', 'Ecology', 'Biochemistry', 'Microbiology', 'Botany', 'Zoology', 'Marine Biology'] },
  { name: 'Chemistry', topics: ['Organic Chemistry', 'Periodic Table', 'Chemical Bonding', 'Thermodynamics', 'Acids and Bases', 'Inorganic Chemistry', 'Analytical Chemistry', 'Physical Chemistry'] },
  { name: 'Physics', topics: ['Mechanics', 'Electromagnetism', 'Optics', 'Quantum Physics', 'Relativity', 'Nuclear Physics', 'Astrophysics', 'Fluid Dynamics'] },
  { name: 'Math', topics: ['Calculus', 'Algebra', 'Statistics', 'Geometry', 'Trigonometry', 'Number Theory', 'Graph Theory', 'Linear Algebra'] },
  { name: 'History', topics: ['World War II', 'Industrial Revolution', 'Ancient Egypt', 'Cold War', 'French Revolution', 'American Civil War', 'Ming Dynasty', 'Roman Empire'] },
  { name: 'Computer Science', topics: ['Data Structures', 'Algorithms', 'Web Development', 'Operating Systems', 'Machine Learning', 'Cybersecurity', 'Database Systems', 'Cloud Computing'] },
  { name: 'Psychology', topics: ['Cognitive Psychology', 'Social Psychology', 'Developmental Psychology', 'Behavioral Neuroscience', 'Clinical Psychology'] },
  { name: 'Economics', topics: ['Microeconomics', 'Macroeconomics', 'Econometrics', 'Game Theory', 'International Trade'] },
  { name: 'Literature', topics: ['Shakespeare', 'Modernism', 'Victorian Literature', 'Renaissance Prose', 'Post-Colonial Literature'] }
];

const subtopics = [
  'High School', 'College', 'AP', 'GCSE', 'Undergraduate', 'Graduate',
  'Exam Prep', 'Final Review', 'Beginner', 'Intermediate', 'Advanced',
  'IB', 'SAT', 'MCAT', 'GRE', 'Kids', 'Vocational'
];

/* ====================== MASSIVELY EXPANDED REAL CONTENT ====================== */
const realContentMap = {
  'biology-cell-biology': {
    flashcards: [
      { q: "What is the 'Powerhouse' of the cell?", a: "The Mitochondria. It is responsible for creating Adenosine Triphosphate (ATP) through cellular respiration." },
      { q: "Which organelle is responsible for photosynthesis?", a: "Chloroplasts. Found in plant cells, they contain chlorophyll to capture sunlight." },
      { q: "What contains the cell's genetic material?", a: "The Nucleus. It houses the DNA and acts as the control center of the cell." },
      { q: "What is the function of Ribosomes?", a: "Protein synthesis. They translate genetic code into chains of amino acids." }
    ],
    questions: [
      { q: "Which of the following is found in plant cells but NOT in animal cells?", o: ["Cell Wall", "Plasma Membrane", "Mitochondria", "Cytoplasm"], a: "Cell Wall", e: "Plant cells have a rigid cell wall for structural support, which animal cells lack." },
      { q: "What is the primary function of the Golgi Apparatus?", o: ["Packaging and distribution of proteins", "Energy production", "DNA replication", "Waste management"], a: "Packaging and distribution of proteins", e: "The Golgi apparatus modifies, sorts, and packages proteins for secretion or delivery to other organelles." }
    ]
  },
  'chemistry-periodic-table': {
    flashcards: [
      { q: "What is the atomic number of Carbon?", a: "6. It has six protons in its nucleus." },
      { q: "Which element is the lightest in the periodic table?", a: "Hydrogen (H). It has an atomic number of 1." },
      { q: "What are the horizontal rows in the periodic table called?", a: "Periods." },
      { q: "What are the vertical columns called?", a: "Groups or Families." }
    ],
    questions: [
      { q: "Which group of elements are known as the Noble Gases?", o: ["Group 18", "Group 1", "Group 17", "Group 2"], a: "Group 18", e: "Noble gases are in Group 18 and are known for being very stable and unreactive." }
    ]
  },
  'math-calculus': {
    flashcards: [
      { q: "What is the derivative of x^2?", a: "2x. Power rule: d/dx[x^n] = nx^(n-1)." },
      { q: "What is the derivative of sin(x)?", a: "cos(x)." },
      { q: "What does the first derivative of a function represent?", a: "The slope of the tangent line or the instantaneous rate of change." }
    ],
    questions: [
      { q: "Find the limit: lim(x->0) [sin(x) / x].", o: ["1", "0", "Infinity", "Undefined"], a: "1", e: "This is a fundamental trigonometric limit in calculus." }
    ]
  },
  'history-world-war-ii': {
    flashcards: [
      { q: "When did WWII start?", a: "September 1, 1939, when Germany invaded Poland." },
      { q: "What was the 'D-Day' invasion date?", a: "June 6, 1944. Allied forces invaded the beaches of Normandy." },
      { q: "Who was the Prime Minister of the UK for most of WWII?", a: "Winston Churchill." }
    ],
    questions: [
      { q: "Which event led the United States to officially enter WWII?", o: ["Attack on Pearl Harbor", "Invasion of Poland", "Battle of Britain", "D-Day"], a: "Attack on Pearl Harbor", e: "The Japanese surprise attack on Pearl Harbor on December 7, 1941, prompted the US declaration of war." }
    ]
  },
  'computer-science-algorithms': {
    flashcards: [
      { q: "What is the average time complexity of QuickSort?", a: "O(n log n)." },
      { q: "What is a 'Binary Search'?", a: "An efficient algorithm for finding an item from a sorted list of items by repeatedly dividing the search interval in half." },
      { q: "What does Big O notation describe?", a: "The upper bound of the time complexity or space complexity of an algorithm." }
    ],
    questions: [
      { q: "Which data structure is typically used to implement Breadth-First Search (BFS)?", o: ["Queue", "Stack", "Priority Queue", "Linked List"], a: "Queue", e: "BFS explores nodes level by level, requiring a FIFO (First-In-First-Out) structure like a Queue." }
    ]
  },
  'literature-shakespeare': {
    flashcards: [
      { q: "Which play features the character 'Prince Hamlet'?", a: "Hamlet (The Tragedy of Hamlet, Prince of Denmark)." },
      { q: "What is Shakespeare's nickname?", a: "The Bard of Avon." },
      { q: "In which city is 'Romeo and Juliet' set?", a: "Verona, Italy." }
    ],
    questions: [
      { q: "Which of the following is NOT one of Shakespeare's great tragedies?", o: ["A Midsummer Night's Dream", "Macbeth", "King Lear", "Othello"], a: "A Midsummer Night's Dream", e: "A Midsummer Night's Dream is a comedy, whereas the others are tragedies." }
    ]
  },
  'economics-microeconomics': {
    flashcards: [
      { q: "What is 'Opportunity Cost'?", a: "The value of the next best alternative given up when making a choice." },
      { q: "What does the Law of Demand state?", a: "As the price of a good increases, the quantity demanded decreases, ceteris paribus." },
      { q: "What is 'Equilibrium' in a market?", a: "The point where quantity supplied equals quantity demanded." }
    ],
    questions: [
      { q: "What does a 'Perfect Competition' market structure imply?", o: ["Many buyers and sellers, homogeneous products", "One seller, unique product", "Few sellers, high barriers to entry", "Many sellers, differentiated products"], a: "Many buyers and sellers, homogeneous products", e: "Perfect competition is characterized by many participants and identical products where no single firm has market power." }
    ]
  },
  'psychology-cognitive-psychology': {
    flashcards: [
      { q: "What is 'Cognitive Psychology'?", a: "The scientific study of mental processes such as attention, language use, memory, and perception." },
      { q: "What is 'Short-term Memory' capacity?", a: "Typically 7 ± 2 items, according to George Miller." },
      { q: "What is 'Neuroplasticity'?", a: "The brain's ability to reorganize itself by forming new neural connections throughout life." }
    ],
    questions: [
      { q: "What is the primary focus of the 'Stroop Effect' study?", o: ["Selective Attention", "Visual Perception", "Long-term Memory", "Social Conformity"], a: "Selective Attention", e: "The Stroop task demonstrates the interference in the reaction time of a task when a color name is printed in a color not denoted by the name." }
    ]
  },
  'biology-genetics': {
    flashcards: [
      { q: "Who is known as the Father of Genetics?", a: "Gregor Mendel. His pea plant experiments (1865) established the laws of segregation and independent assortment." },
      { q: "What are alleles?", a: "Different versions of the same gene. Dominant alleles mask recessive ones." },
      { q: "What is a Punnett square?", a: "A diagram used to predict the genotypes and phenotypes of offspring from a genetic cross." },
      { q: "What is the central dogma of molecular biology?", a: "DNA → RNA → Protein." }
    ],
    questions: [
      { q: "In a monohybrid cross between two heterozygous parents, what is the phenotypic ratio in the F2 generation?", o: ["3:1", "1:2:1", "9:3:3:1", "1:1"], a: "3:1", e: "Classic Mendelian ratio for a single trait with complete dominance." }
    ]
  },
  'biology-evolution': {
    flashcards: [
      { q: "What is natural selection?", a: "The process where organisms better adapted to their environment tend to survive and reproduce more." },
      { q: "Who proposed the theory of evolution by natural selection?", a: "Charles Darwin and Alfred Russel Wallace (1858/1859)." },
      { q: "What is genetic drift?", a: "Random change in allele frequencies in a population, especially in small populations." }
    ],
    questions: [
      { q: "Which of the following is NOT a mechanism of evolution?", o: ["Natural selection", "Genetic drift", "Mutation", "Artificial selection"], a: "Artificial selection", e: "Artificial selection is human-driven, not a natural evolutionary mechanism." }
    ]
  },
  'chemistry-organic-chemistry': {
    flashcards: [
      { q: "What is the functional group in alcohols?", a: "–OH (hydroxyl group)." },
      { q: "What are hydrocarbons?", a: "Organic compounds containing only carbon and hydrogen." },
      { q: "What is the general formula for alkanes?", a: "CₙH₂ₙ₊₂." }
    ],
    questions: [
      { q: "Which compound is an isomer of butane?", o: ["n-Butane", "Isobutane", "Propane", "Pentane"], a: "Isobutane", e: "Both have formula C₄H₁₀ but different structures." }
    ]
  },
  'physics-mechanics': {
    flashcards: [
      { q: "What is Newton's First Law?", a: "An object at rest stays at rest and an object in motion stays in motion unless acted upon by an unbalanced force." },
      { q: "What is the unit of force?", a: "Newton (N) = kg·m/s²." },
      { q: "What does the slope of a velocity-time graph represent?", a: "Acceleration." }
    ],
    questions: [
      { q: "A 10 kg object experiences a 50 N force. What is its acceleration?", o: ["0.5 m/s²", "5 m/s²", "500 m/s²", "0.2 m/s²"], a: "5 m/s²", e: "F = ma → a = F/m = 50/10 = 5 m/s²." }
    ]
  },
  'physics-electromagnetism': {
    flashcards: [
      { q: "What is the right-hand rule used for?", a: "Determining the direction of magnetic force, field, or current." },
      { q: "What law states that a changing magnetic field induces an electric current?", a: "Faraday's Law of Electromagnetic Induction." }
    ],
    questions: [
      { q: "Which device converts mechanical energy into electrical energy?", o: ["Electric motor", "Generator", "Transformer", "Capacitor"], a: "Generator", e: "Generators use electromagnetic induction (Faraday's Law)." }
    ]
  },
  'math-algebra': {
    flashcards: [
      { q: "What is the quadratic formula?", a: "x = [-b ± √(b² - 4ac)] / (2a)." },
      { q: "What does 'FOIL' stand for when multiplying binomials?", a: "First, Outer, Inner, Last." }
    ],
    questions: [
      { q: "Solve for x: 2x + 5 = 17", o: ["x = 6", "x = 11", "x = 4", "x = 12"], a: "x = 6", e: "Subtract 5 → 2x = 12 → x = 6." }
    ]
  },
  'math-statistics': {
    flashcards: [
      { q: "What is the mean of a data set?", a: "The sum of all values divided by the number of values." },
      { q: "What does standard deviation measure?", a: "The amount of variation or dispersion in a set of values." }
    ],
    questions: [
      { q: "In a normal distribution, what percentage of data falls within 2 standard deviations of the mean?", o: ["68%", "95%", "99.7%", "50%"], a: "95%", e: "The empirical rule (68-95-99.7 rule)." }
    ]
  },
  'history-ancient-egypt': {
    flashcards: [
      { q: "Who built the Great Pyramid of Giza?", a: "Pharaoh Khufu (Cheops) around 2580–2560 BCE." },
      { q: "What is the Rosetta Stone?", a: "A stele that enabled the decipherment of Egyptian hieroglyphs (discovered 1799)." }
    ],
    questions: [
      { q: "Which river was central to Ancient Egyptian civilization?", o: ["Nile", "Tigris", "Euphrates", "Indus"], a: "Nile", e: "The Nile provided fertile soil through annual flooding." }
    ]
  },
  'computer-science-data-structures': {
    flashcards: [
      { q: "What is the time complexity of inserting into a balanced BST?", a: "O(log n)." },
      { q: "What data structure uses LIFO (Last In, First Out)?", a: "Stack." }
    ],
    questions: [
      { q: "Which data structure is ideal for implementing a browser's back/forward buttons?", o: ["Queue", "Stack", "Hash Table", "Graph"], a: "Stack", e: "Two stacks are often used to model history navigation." }
    ]
  },
  'computer-science-machine-learning': {
    flashcards: [
      { q: "What is overfitting?", a: "When a model learns the training data too well, including noise, and performs poorly on new data." },
      { q: "What does 'supervised learning' require?", a: "Labeled training data." }
    ],
    questions: [
      { q: "Which algorithm is commonly used for classification problems?", o: ["Linear Regression", "K-Means", "Logistic Regression", "PCA"], a: "Logistic Regression", e: "It outputs probabilities between 0 and 1 for binary classification." }
    ]
  },
  'psychology-social-psychology': {
    flashcards: [
      { q: "What is the bystander effect?", a: "The more people present, the less likely any one person is to help in an emergency." },
      { q: "What experiment demonstrated conformity?", a: "Asch's line experiment." }
    ],
    questions: [
      { q: "Which psychologist is associated with the Stanford Prison Experiment?", o: ["Stanley Milgram", "Philip Zimbardo", "Solomon Asch", "B.F. Skinner"], a: "Philip Zimbardo", e: "It showed how quickly social roles can influence behavior." }
    ]
  },
  'economics-macroeconomics': {
    flashcards: [
      { q: "What does GDP stand for?", a: "Gross Domestic Product – the total value of goods and services produced in a country." },
      { q: "What is inflation?", a: "A general increase in prices and fall in the purchasing value of money." }
    ],
    questions: [
      { q: "Which curve shows the relationship between unemployment and inflation?", o: ["Phillips Curve", "Laffer Curve", "IS-LM Curve", "AD-AS Curve"], a: "Phillips Curve", e: "Short-run trade-off between inflation and unemployment." }
    ]
  },
  'literature-modernism': {
    flashcards: [
      { q: "Which novel by James Joyce is a landmark of modernist literature?", a: "Ulysses (1922)." },
      { q: "What literary technique is strongly associated with modernism?", a: "Stream of consciousness." }
    ],
    questions: [
      { q: "Which author wrote 'The Waste Land'?", o: ["T.S. Eliot", "Virginia Woolf", "Ernest Hemingway", "F. Scott Fitzgerald"], a: "T.S. Eliot", e: "Published in 1922, it is a cornerstone of modernist poetry." }
    ]
  }
};

/* ====================== FALLBACK GENERATOR (much more realistic) ====================== */
const getSampleConcept = (subject, topic, index) => {
  const concepts = {
    'Biology': ['DNA', 'mitosis', 'ecosystem', 'enzyme', 'photosynthesis'],
    'Chemistry': ['bonding', 'reaction rate', 'pH scale', 'redox', 'stoichiometry'],
    'Physics': ['force', 'energy', 'wave', 'momentum', 'entropy'],
    'Math': ['derivative', 'integral', 'matrix', 'probability', 'function'],
    'History': ['revolution', 'empire', 'treaty', 'leader', 'invention'],
    'Computer Science': ['algorithm', 'complexity', 'API', 'database', 'neural network'],
    'Psychology': ['cognition', 'behavior', 'memory', 'emotion', 'bias'],
    'Economics': ['supply', 'demand', 'GDP', 'inflation', 'monopoly'],
    'Literature': ['symbolism', 'narrative', 'theme', 'characterization', 'irony']
  };
  const list = concepts[subject] || ['core concept'];
  return list[index % list.length];
};

const generateFallbackContent = (subject, topic, level, variationSeed) => {
  const numCards = 8 + (variationSeed % 9);           // 8–16 cards
  const numQuestions = 6 + (variationSeed % 7);       // 6–12 questions

  const flashcards = Array.from({ length: numCards }, (_, j) => ({
    id: `card-${variationSeed}-${j}`,
    question: `Explain the role of ${getSampleConcept(subject, topic, j)} in ${topic} for ${level} students.`,
    answer: `In ${level} ${subject}, ${getSampleConcept(subject, topic, j)} is fundamental. It governs ${topic.toLowerCase()} processes and has direct applications in real-world research and industry.`
  }));

  const questions = Array.from({ length: numQuestions }, (_, j) => ({
    id: `q-${variationSeed}-${j}`,
    question: `Which of the following best illustrates a key principle of ${topic} at the ${level} level?`,
    options: [
      `Correct application of ${getSampleConcept(subject, topic, j)}`,
      `Common student misconception`,
      `Related but incorrect concept`,
      `Irrelevant distractor`
    ],
    correctAnswer: `Correct application of ${getSampleConcept(subject, topic, j)}`,
    explanation: `This question tests deep conceptual understanding required for ${level} mastery of ${topic}.`
  }));

  return { flashcards, questions };
};

/* ====================== MAIN GENERATOR ====================== */
const generateRecords = (count) => {
  const records = [];

  for (let i = 0; i < count; i++) {
    const sub = subjects[i % subjects.length];
    const topicIndex = Math.floor(i / subjects.length) % sub.topics.length;
    const topic = sub.topics[topicIndex];
    const level = subtopics[i % subtopics.length];

    const slugBase = `${sub.name.toLowerCase()}-${topic.toLowerCase().replace(/ /g, '-')}`;
    const levelSlug = level.toLowerCase().replace(/ /g, '-');
    const variation = Math.floor(i / VARIATION_CYCLE);
    const slug = `${slugBase}-${levelSlug}${variation > 0 ? `-v${variation}` : ''}`;

    const realData = realContentMap[slugBase];
    const fallback = generateFallbackContent(sub.name, topic, level, i);

    const flashcards = realData
      ? realData.flashcards.map((c, j) => ({
        id: `card-${slug}-${j}`,
        question: c.q,
        answer: c.a
      }))
      : fallback.flashcards;

    const questions = realData
      ? realData.questions.map((q, j) => ({
        id: `q-${slug}-${j}`,
        question: q.q,
        options: q.o,
        correctAnswer: q.a,
        explanation: q.e
      }))
      : fallback.questions;

    records.push({
      id: `study-${i.toString().padStart(5, '0')}`,           // unique DB-friendly ID
      slug,
      subject: sub.name,
      subTopic: topic,
      level,
      description: `Comprehensive ${level} study guide for ${topic} in ${sub.name}. Master key concepts with flashcards, practice questions, and structured learning plans.`,
      difficulty: ['Beginner', 'Intermediate', 'Advanced'][i % 3],
      estimatedTime: `${15 + (i % 45)} minutes`,
      tags: [
        sub.name.toLowerCase(),
        topic.toLowerCase().replace(/ /g, '-'),
        level.toLowerCase().replace(/ /g, '-'),
        'study-guide',
        'exam-prep'
      ],
      baseFlashcards: flashcards,
      baseQuestions: questions,
      plannerTemplates: [
        { title: `Mastery Plan – ${topic} ${level}`, sessions: 5 + (i % 4) },
        { title: `Fast-Track ${level} Review: ${topic}`, sessions: 2 },
        { title: `Exam-Crunch ${sub.name} – ${topic}`, sessions: 3 + (i % 3) },
        { title: `Deep Dive: ${topic} for ${level}`, sessions: 6 }
      ],
      variationSeed: i
    });
  }

  return records;
};

/* ====================== EXECUTE ====================== */
const data = generateRecords(TOTAL_RECORDS);

const outputPath = path.resolve(__dirname, '../src/data/studyTopics.json');
fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf8');

console.log(`🚀 Production data seeded successfully!`);
console.log(`   → ${data.length.toLocaleString()} records generated`);
console.log(`   → Unique slugs with level + variation support`);
console.log(`   → ${Object.keys(realContentMap).length} real-world content sets`);
console.log(`   → Output: ${outputPath}`);