# Educational Content Provenance & Verification Audit

**Dataset:** [`src/data/canonicalStudyTopics.json`](file:///d:/freetoolshubs/free-tools-study/src/data/canonicalStudyTopics.json)  
**Primary Generators & Source Files:**
- [`src/data/studyTopics.json`](file:///d:/freetoolshubs/free-tools-study/src/data/studyTopics.json) (Original 5,000-record dataset)
- [`scripts/seedData.js`](file:///d:/freetoolshubs/free-tools-study/scripts/seedData.js) (`realContentMap` lines 32–238)
- [`scripts/content/priorityTopicsPart1.js`](file:///d:/freetoolshubs/free-tools-study/scripts/content/priorityTopicsPart1.js) (Topics 1–11)
- [`scripts/content/priorityTopicsPart2.js`](file:///d:/freetoolshubs/free-tools-study/scripts/content/priorityTopicsPart2.js) (Topics 12–21)
- [`scripts/content/remediatedPriorityContent.js`](file:///d:/freetoolshubs/free-tools-study/scripts/content/remediatedPriorityContent.js) (Aggregator registry)

---

## 1. Provenance Inventory Summary

Every single educational flashcard and quiz question in [`src/data/canonicalStudyTopics.json`](file:///d:/freetoolshubs/free-tools-study/src/data/canonicalStudyTopics.json) is mapped to its precise origin:

```
Total Items in Canonical Dataset: 418 Flashcards, 336 Quiz Questions
│
├── 21 Priority Remediated Topics (198 Flashcards, 116 Quiz Questions)
│   ├── Original Real Content from studyTopics.json
│   │   ├── 50 Flashcards (100% preserved verbatim)
│   │   └── 19 Quiz Questions (17 preserved verbatim + 2 editorially corrected)
│   ├── Recovered Orphaned Seed Content from seedData.js
│   │   ├── 7 Flashcards (Algorithms: 3, Data Structures: 2, Machine Learning: 2)
│   │   └── 3 Quiz Questions (Algorithms: 1, Data Structures: 1, Machine Learning: 1)
│   └── Newly Authored & Verified Curricular Expansion
│       ├── 141 Flashcards with explicit verificationBasis
│       └── 94 Quiz Questions with 4 options, answers, explanations, and verificationBasis
│
└── 44 Non-Priority Fallback Topics (220 Flashcards, 220 Quiz Questions)
    ├── 220 Deduplicated Subtopic Placeholder Flashcards (5 per topic, flagged insufficient)
    └── 220 Deduplicated Subtopic Placeholder Quiz Questions (5 per topic, flagged insufficient)
```

---

## 2. Provenance of Original Seed Content (57 Cards, 22 Questions)

### 2.1 The 18 Bound Subtopics in `studyTopics.json` (50 Flashcards, 19 Quiz Questions)

| Subtopic Slug | Flashcards Preserved | Quiz Qs Preserved | Original Source Record in `studyTopics.json` | Pedagogical Domain Verified |
|---|---:|---:|---|---|
| `biology-cell-biology` | 4 | 2 | `study-00000` (`biology-cell-biology-high-school`) | Mitochondria, Chloroplasts, Nucleus, Ribosomes; Cell wall, Golgi apparatus |
| `biology-evolution` | 3 | 1 (corr) | `study-00018` (`biology-evolution-ap`) | Natural selection, Darwin/Wallace, Genetic drift; Artificial selection distinction |
| `biology-genetics` | 4 | 1 | `study-00009` (`biology-genetics-intermediate`) | Gregor Mendel, Alleles, Punnett square, Central dogma; Monohybrid cross 3:1 |
| `chemistry-organic-chemistry` | 3 | 1 (corr) | `study-00001` (`chemistry-organic-chemistry-college`) | Hydroxyl group, Hydrocarbons, Alkane general formula; Branched isobutane IUPAC name |
| `chemistry-periodic-table` | 4 | 1 | `study-00010` (`chemistry-periodic-table-advanced`) | Carbon Z=6, Hydrogen lightest, Periods, Groups; Group 18 Noble gases |
| `economics-macroeconomics` | 2 | 1 | `study-00007` (`economics-macroeconomics-final-review`) | GDP definition, Inflation definition; Phillips Curve trade-off |
| `economics-microeconomics` | 3 | 1 | `study-00016` (`economics-microeconomics-high-school`) | Opportunity cost, Law of Demand, Market equilibrium; Perfect competition structure |
| `history-ancient-egypt` | 2 | 1 | `study-00004` (`history-ancient-egypt-undergraduate`) | Khufu Great Pyramid, Rosetta Stone; Nile River annual inundation |
| `history-world-war-ii` | 3 | 1 | `study-00013` (`history-world-war-ii-vocational`) | Sept 1 1939 Poland invasion, D-Day June 6 1944, Churchill; Pearl Harbor attack Dec 7 1941 |
| `literature-modernism` | 2 | 1 | `study-00008` (`literature-modernism-beginner`) | Joyce Ulysses 1922, Stream of consciousness; T.S. Eliot The Waste Land 1922 |
| `literature-shakespeare` | 3 | 1 | `study-00017` (`literature-shakespeare-college`) | Prince Hamlet, Bard of Avon, Verona; A Midsummer Night’s Dream comedy vs tragedy |
| `math-algebra` | 2 | 1 | `study-00003` (`math-algebra-graduate`) | Quadratic formula, FOIL acronym; Linear equation 2x + 5 = 17 -> x = 6 |
| `math-calculus` | 3 | 1 | `study-00012` (`math-calculus-sat`) | d/dx[x²]=2x, d/dx[sin x]=cos x, Instantaneous rate of change; lim_{x->0} sin(x)/x = 1 |
| `math-statistics` | 2 | 1 | `study-00021` (`math-statistics-undergraduate`) | Mean definition, Standard deviation dispersion; Empirical Rule 95% within 2 SDs |
| `physics-electromagnetism` | 2 | 1 | `study-00002` (`physics-electromagnetism-ap`) | Right-hand rule, Faraday’s Law of induction; Electric generator mechanism |
| `physics-mechanics` | 3 | 1 | `study-00011` (`physics-mechanics-ib`) | Newton’s First Law, Newton unit kg·m/s², Velocity-time slope; F = ma calculation |
| `psychology-cognitive-psychology` | 3 | 1 | `study-00006` (`psychology-cognitive-psychology-exam-prep`) | Cognitive psychology, Short-term memory 7±2, Neuroplasticity; Stroop Effect attention |
| `psychology-social-psychology` | 2 | 1 | `study-00015` (`psychology-social-psychology-mcat`) | Bystander effect, Asch conformity experiment; Zimbardo Stanford Prison Experiment |
| **Subtotal (18 Topics)** | **50** | **19** | — | — |

---

### 2.2 The 3 Recovered Computer Science Subtopics (7 Flashcards, 3 Quiz Questions)

Recovered directly from `scripts/seedData.js` lines 76–85, 193–201, and 202–210:

| Subtopic Slug | Recovered Flashcards | Recovered Quiz Questions | Authoritative Textbook Verification Basis |
|---|---:|---:|---|
| `computer-science-algorithms` | 3 | 1 | Cormen, Leiserson, Rivest, Stein (CLRS), *Introduction to Algorithms* (3rd/4th ed.), Chapters 2, 7, 22. |
| `computer-science-data-structures` | 2 | 1 | Knuth, *The Art of Computer Programming*, Vol. 1: Fundamental Algorithms; Sedgewick, *Algorithms*. |
| `computer-science-machine-learning` | 2 | 1 | Hastie, Tibshirani, Friedman, *The Elements of Statistical Learning* (2nd ed.); Goodfellow et al., *Deep Learning*. |
| **Subtotal (3 CS Topics)** | **7** | **3** | — |

---

## 3. Provenance of the Two Documented Editorial Corrections

### 3.1 Chemistry — Organic Chemistry (`chemistry-organic-chemistry`, Question Index 0)
- **Problem Stem:** Branched structural isomer of butane ($C_4H_{10}$).
- **Original Source Text:**
  - *Question:* `"Which compound is an isomer of butane?"`
  - *Options:* `["n-Butane", "Isobutane", "Propane", "Pentane"]`
  - *Correct:* `"Isobutane"`
  - *Explanation:* `"Both have formula C₄H₁₀ but different structures."`
- **Corrected Text:**
  - *Question:* `"What is the preferred IUPAC name for branched isobutane, the constitutional isomer of unbranched butane (C₄H₁₀)?"`
  - *Options:* `["2-methylpropane", "butan-2-ol", "2-methylbutane", "cyclobutane"]`
  - *Correct:* `"2-methylpropane"`
  - *Explanation:* `"Isobutane and unbranched butane (n-butane) are constitutional (structural) isomers sharing the molecular formula C₄H₁₀. Unbranched butane has a continuous four-carbon chain, whereas branched isobutane has a three-carbon principal chain with a methyl substituent at carbon-2, giving the preferred IUPAC name 2-methylpropane."`
- **Authoritative Reference:** IUPAC *Nomenclature of Organic Chemistry* (IUPAC Blue Book, 2013 Recommendations), Rule P-41.2 (Preferred IUPAC Names for Acyclic Alkanes).

---

### 3.2 Biology — Evolution (`biology-evolution`, Question Index 0)
- **Problem Stem:** Mechanisms of evolutionary change and selective forces.
- **Original Source Text:**
  - *Question:* `"Which of the following is NOT a mechanism of evolution?"`
  - *Options:* `["Natural selection", "Genetic drift", "Mutation", "Artificial selection"]`
  - *Correct:* `"Artificial selection"`
  - *Explanation:* `"Artificial selection is human-driven, not a natural evolutionary mechanism."`
- **Corrected Text:**
  - *Question:* `"Which of the following evolutionary processes is driven by intentional human selective breeding rather than operating as an autonomous natural mechanism of evolution in wild populations?"`
  - *Options:* `["Natural selection", "Genetic drift", "Mutation", "Artificial selection"]`
  - *Correct:* `"Artificial selection"`
  - *Explanation:* `"Artificial selection causes genuine evolutionary change by altering allele frequencies across generations, but it is directed by intentional human breeding choices rather than operating as an autonomous natural mechanism of evolution (such as natural selection, genetic drift, mutation, or gene flow) in wild populations."`
- **Authoritative Reference:** Futuyma & Kirkpatrick, *Evolution* (4th ed.), Chapter 3; Charles Darwin, *On the Origin of Species* (1859), Chapter 1 ("Variation under Domestication").

---

## 4. Authoritative Verification Bases for Newly Authored Expansion Content (141 Cards, 94 Questions)

Every newly authored flashcard and quiz question was engineered to assess a distinct learning objective and carries an explicit verification basis:

### 4.1 Biological Sciences
- **Cell Biology:**
  - Fluid mosaic membrane structure: Singer & Nicolson (1972) *Science* 175: 720–731.
  - Endomembrane vesicular transport: Palade (1975) Nobel Lecture; Alberts et al., *Molecular Biology of the Cell* (6th ed.), Chapter 13.
  - Primary active transport & $Na^+/K^+$-ATPase: Skou (1957) *Biochimica et Biophysica Acta*; Campbell Biology (12th ed.), Chapter 7.
  - Mitotic chromosome segregation: Lodish et al., *Molecular Cell Biology* (8th ed.), Chapter 19.
- **Evolution:**
  - Hardy-Weinberg equilibrium: Hardy (1908) *Science*; Weinberg (1908) *Jahreshefte des Vereins für vaterländische Naturkunde in Württemberg*.
  - Modes of selection (stabilizing human birth weight): Karn & Penrose (1951) *Annals of Eugenics* 16: 147–164.
  - Prezygotic vs postzygotic reproductive isolation: Mayr, *Animal Species and Evolution* (1963); Coyne & Orr, *Speciation* (2004).
- **Genetics:**
  - Semiconservative replication: Meselson & Stahl (1958) *PNAS* 44: 671–682.
  - Dihybrid independent assortment: Mendel (1866) *Versuche über Pflanzen-Hybriden*.
  - Epistasis in coat color: Griffiths et al., *An Introduction to Genetic Analysis* (11th ed.).

### 4.2 Chemical Sciences
- **Organic Chemistry:**
  - Carbon orbital hybridization ($sp^3, sp^2, sp$): Pauling, *The Nature of the Chemical Bond* (3rd ed.).
  - $S_N2$ backside attack & Walden inversion: Ingold, *Structure and Mechanism in Organic Chemistry* (2nd ed.); Carey & Sundberg, *Advanced Organic Chemistry*.
  - Inductive substituent effects on carboxylic acid $pK_a$: March’s *Advanced Organic Chemistry* (8th ed.), Chapter 8.
- **Periodic Table:**
  - Isoelectronic ionic radii & effective nuclear charge: Slater (1930) *Physical Review* 36: 57–64; Brown, LeMay, Bursten, *Chemistry: The Central Science* (14th ed.).
  - Nitrogen vs Oxygen ionization anomaly: Hund’s rule of maximum multiplicity; Miessler, Fischer, Tarr, *Inorganic Chemistry* (5th ed.).
  - Period 3 successive ionization jumps: NIST Atomic Spectra Database.

### 4.3 Computer Science
- **Algorithms:**
  - Randomized QuickSort vs worst-case $\Theta(n^2)$: Hoare (1962) *The Computer Journal* 5(1): 10–16.
  - HeapSort in-place $O(n \log n)$: Williams (1964) *CACM* 7(6): 347–348; Floyd (1964) *CACM* 7(12): 701.
  - Master Theorem: Bentley, Haken, Saxe (1980); CLRS Chapter 4.
  - Negative edge shortest paths (Bellman-Ford): Bellman (1958) *Quarterly of Applied Mathematics*; Ford (1956).
- **Data Structures:**
  - Dynamic array geometric amortized analysis: Knuth, TAOCP Vol. 1.
  - Binary Min-Heap array indices ($2i + 1, 2i + 2$): Williams (1964).
  - Graph representation tradeoffs: Sedgewick & Wayne, *Algorithms* (4th ed.), Chapter 4.
- **Machine Learning:**
  - Bias-variance decomposition: Geman, Bienenstock, Doursat (1992) *Neural Computation* 4(1): 1–58.
  - L1 (Lasso) vs L2 (Ridge) penalty geometry: Tibshirani (1996) *JRSS Series B* 58(1): 267–288; Hoerl & Kennard (1970).
  - Class imbalance & Precision/Recall evaluation: Davis & Goadrich (2006) *ICML*.

### 4.4 Social Sciences & Economics
- **Macroeconomics:**
  - Expenditure GDP identity: Bureau of Economic Analysis (BEA) NIPA Handbook.
  - Keynesian autonomous multiplier: Keynes, *The General Theory of Employment, Interest and Money* (1936), Chapter 10.
  - Fisher real interest rate equation: Irving Fisher, *The Theory of Interest* (1930).
- **Microeconomics:**
  - Price elasticity & total revenue test: Marshall, *Principles of Economics* (8th ed., 1920), Book III.
  - Monopoly output in elastic region: Amoroso (1938); Robinson, *The Economics of Imperfect Competition* (1933).
  - Price ceiling shortages & deadweight loss: Varian, *Intermediate Microeconomics* (9th ed.).
- **Psychology (Cognitive):**
  - Working memory multicomponent model: Baddeley & Hitch (1974) *Psychology of Learning and Motivation*; Baddeley (2000) *Trends in Cognitive Sciences*.
  - Neuropsychology of Patient H.M.: Scoville & Milner (1957) *JNNP* 20: 11–21; Squire (2004) *Hippocampus*.
  - Availability and Representativeness heuristics: Tversky & Kahneman (1973, 1974) *Science* 185: 1124–1131.
- **Psychology (Social):**
  - Conformity critical trial frequencies: Asch (1951, 1956) *Psychological Monographs* 70(9): 1–70.
  - Milgram baseline obedience (65% at 450V): Milgram (1963) *JASP* 67(4): 371–378.
  - Cognitive dissonance forced compliance ($1 vs $20): Festinger & Carlsmith (1959) *JASP* 58(2): 203–210.

### 4.5 Humanities & Mathematics
- **History (Ancient Egypt):**
  - Old Kingdom pyramid chronology: Shaw, *The Oxford History of Ancient Egypt* (2000); Lehner, *The Complete Pyramids*.
  - Rosetta Stone trilingual decipherment: Champollion (1822) *Lettre à M. Dacier*; Parkinson, *Cracking Codes: The Rosetta Stone and Decipherment*.
- **History (World War II):**
  - Stalingrad encirclement (Operation Uranus): Beevor, *Stalingrad* (1998); Overy, *Why the Allies Won* (1995).
  - Midway cryptanalysis (Station HYPO): Prange, *Miracle at Midway* (1982); Holmes, *Double-Edged Secrets*.
- **Literature (Modernism & Shakespeare):**
  - High modernism 1922 milestone: Rainey, *The Annotated Waste Land* (2005); Ellmann, *James Joyce* (1982).
  - Elizabethan dramatic conventions: Bradley, *Shakespearean Tragedy* (1904); Gurr, *The Shakespearean Stage 1574–1642*.
- **Mathematics (Algebra, Calculus, Statistics):**
  - Fundamental Theorem of Calculus: Stewart, *Calculus: Early Transcendentals* (8th ed.), Chapter 5.
  - L’Hôpital’s rule on 0/0 and $\infty/\infty$: Rudin, *Principles of Mathematical Analysis* (3rd ed.).
  - Central Limit Theorem: Casella & Berger, *Statistical Inference* (2nd ed.), Chapter 5.

---

## 5. Items Flagged for Human Specialist Review

In accordance with strict audit requirements, the following concepts are transparently flagged in `contentQuality.specialistReviewConcepts` and documented here:

1. **`economics-macroeconomics`:**
   - Central bank monetary policy execution under modern *Ample-Reserves* frameworks (Interest on Reserve Balances / ON RRP administered rates) versus traditional *Scarce-Reserves* models (open market bond purchases adjusting reserve quantities). Both are pedagogically valid depending on course level (AP Macroeconomics revised in 2023; college textbooks vary).
2. **`economics-microeconomics`:**
   - Formal mathematical derivation of the Amoroso-Robinson relation ($MR = P(1 - 1/|E_d|)$) is appropriate for intermediate microeconomics and calculus-based AP, but graphical interpretations are standard in introductory courses.
3. **`literature-modernism`:**
   - Stylistic demarcations between direct interior monologue, stream of consciousness, and free indirect discourse vary slightly across narrative theorists (Genette vs Cohn); curriculum scoping should ensure secondary students are not penalized on subtle terminological distinctions.
4. **`psychology-social-psychology`:**
   - The Stanford Prison Experiment (Zimbardo 1971) requires careful framing: while historically prominent, archival releases (Le Texier 2019) have exposed severe demand characteristics and experimenter coaching, necessitating that quiz explanations reflect modern scientific skepticism without invalidating standard curriculum exam questions.

