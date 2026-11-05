# Phase 2A — Canonical Content Quality Audit Report

**Evaluated Dataset:** [`src/data/canonicalStudyTopics.json`](file:///d:/freetoolshubs/free-tools-study/src/data/canonicalStudyTopics.json) (65 canonical topics)  
**Source Provenance:** [`src/data/studyTopics.json`](file:///d:/freetoolshubs/free-tools-study/src/data/studyTopics.json) (5,000 legacy records)

---

## 1. Content Quality Classification Summary (Step F)

Every canonical topic in `src/data/canonicalStudyTopics.json` was evaluated across 11 educational quality criteria:
1. Subject accuracy
2. Topic relevance
3. Flashcard correctness
4. Flashcard usefulness
5. Quiz question correctness
6. Answer correctness
7. Explanation quality
8. Coverage of the named topic
9. Repetition (intra-deck and cross-record)
10. Placeholder content detection
11. Educational-level suitability

### 1.1 Classification Distribution Across All 65 Canonical Topics

| Status | Topic Count | % of Canonical Topics | Source Records Consolidated | Classification Rationale |
|---|---:|---:|---:|---|
| **`verified`** | **0** | **0.00%** | 0 | **Zero topics in `src/data/studyTopics.json` meet the threshold for a complete, standalone verified educational resource.** Even the 18 topics with genuine factual flashcards/questions contain only **2–4 flashcards** and **1–2 quiz questions** (whereas the UI promises 12–20+ flashcards and 10–15 quiz questions) and use a generic boilerplate description template. |
| **`needs_review`** | **18** | **27.69%** | 1,464 | Contains genuine, non-placeholder academic flashcards (`50` cards total, `2–4` per topic) and quiz questions (`19` questions total, `1–2` per topic) from `realContentMap`. Requires human/educational content expansion (`insufficient_topic_coverage`), custom descriptions (`generic_template_description`), and specific question wording edits on 2 topics (`chemistry-organic-chemistry` and `biology-evolution`). |
| **`insufficient`** | **47** | **72.31%** | 3,536 | Contains **100% synthetic placeholder flashcards and quiz questions** in `studyTopics.json` (`"Explain the role of {concept} in {topic}..."` and quiz options `["Correct application of ...", "Common student misconception", "Related but incorrect concept", "Irrelevant distractor"]`). Includes the **3 Computer Science topics** (`Algorithms`, `Data Structures`, `Machine Learning`) whose real seed content in `scripts/seedData.js` failed to bind due to the `"computer science-..."` slug space defect. |
| **Total** | **65** | **100.00%** | **5,000** | 100% of canonical topics evaluated and classified without fabricating educational content. |

---

## 2. Detailed Audit of the 18 `needs_review` Canonical Topics (Real Seed Content, Thin Coverage)

All 18 topics below have real, non-placeholder flashcards and quiz questions preserved from `src/data/studyTopics.json`, but **cannot be marked `verified`** until their topic coverage is expanded beyond 2–4 cards and 1–2 quiz questions and their boilerplate descriptions are replaced:

| # | Canonical ID & Slug | Subject & Subtopic | Real Flashcards | Real Quiz Questions | Valid Levels | Specific Audit Findings & Reasons for `needs_review` |
|---:|---|---|---:|---:|---:|---|
| 1 | `topic-biology-cell-biology`<br/>`biology-cell-biology` | Biology — Cell Biology | 4 | 2 | 17 | Cards (Mitochondria, Chloroplasts, Nucleus, Ribosomes) and 2 quiz questions (Cell Wall, Golgi Apparatus) are factually accurate, but 4 cards / 2 questions are insufficient for a comprehensive Cell Biology deck; uses generic template description. |
| 2 | `topic-biology-evolution`<br/>`biology-evolution` | Biology — Evolution | 3 | 1 | 17 | **Editorial Accuracy Issue (`editorial_review_quiz_q1`):** Quiz Q1 asks *"Which of the following is NOT a mechanism of evolution?"* with answer `"Artificial selection"`. Should specify *"natural mechanism of evolution"* because artificial selection is human-driven evolutionary selection. Only 3 cards / 1 quiz question; generic description. |
| 3 | `topic-biology-genetics`<br/>`biology-genetics` | Biology — Genetics | 4 | 1 | 17 | Cards (Mendel, alleles, Punnett square, central dogma) and monohybrid cross 3:1 quiz question are accurate, but 4 cards / 1 question provide minimal topic coverage; generic description. |
| 4 | `topic-chemistry-organic-chemistry`<br/>`chemistry-organic-chemistry` | Chemistry — Organic Chemistry | 3 | 1 | 16 *(Kids excluded)* | **Editorial Ambiguity Issue (`editorial_review_quiz_q1`):** Quiz Q1 asks *"Which compound is an isomer of butane?"* with options `["n-Butane", "Isobutane", "Propane", "Pentane"]` and answer `"Isobutane"`. Because IUPAC "butane" denotes `n-butane`, listing both `n-Butane` and `Isobutane` is ambiguous unless the stem specifies *"structural isomer of n-butane"*. Only 3 cards / 1 quiz question; generic description. |
| 5 | `topic-chemistry-periodic-table`<br/>`chemistry-periodic-table` | Chemistry — Periodic Table | 4 | 1 | 17 | Cards (Carbon atomic number, Hydrogen, Periods, Groups) and Noble Gases Group 18 quiz question are accurate, but 4 cards / 1 question are too thin for standalone mastery; generic description. |
| 6 | `topic-economics-macroeconomics`<br/>`economics-macroeconomics` | Economics — Macroeconomics | 2 | 1 | 16 *(MCAT excluded)* | Only **2 flashcards** (GDP, inflation) and **1 quiz question** (Phillips Curve); generic description; excluded incompatible `MCAT` level. |
| 7 | `topic-economics-microeconomics`<br/>`economics-microeconomics` | Economics — Microeconomics | 3 | 1 | 16 *(MCAT excluded)* | Only **3 flashcards** (Opportunity Cost, Law of Demand, Equilibrium) and **1 quiz question** (Perfect Competition); generic description; excluded incompatible `MCAT` level. |
| 8 | `topic-history-ancient-egypt`<br/>`history-ancient-egypt` | History — Ancient Egypt | 2 | 1 | 16 *(MCAT excluded)* | Only **2 flashcards** (Great Pyramid of Giza, Rosetta Stone) and **1 quiz question** (Nile River); generic description; excluded incompatible `MCAT` level. |
| 9 | `topic-history-world-war-ii`<br/>`history-world-war-ii` | History — World War II | 3 | 1 | 16 *(MCAT excluded)* | Only **3 flashcards** (Sept 1 1939, D-Day, Winston Churchill) and **1 quiz question** (Pearl Harbor); generic description; excluded incompatible `MCAT` level. |
| 10 | `topic-literature-modernism`<br/>`literature-modernism` | Literature — Modernism | 2 | 1 | 15 *(Kids, MCAT excluded)* | Only **2 flashcards** (Ulysses, stream of consciousness) and **1 quiz question** (T.S. Eliot's *The Waste Land*); generic description; excluded incompatible `Kids` and `MCAT` levels. |
| 11 | `topic-literature-shakespeare`<br/>`literature-shakespeare` | Literature — Shakespeare | 3 | 1 | 16 *(MCAT excluded)* | Only **3 flashcards** (Hamlet, Bard of Avon, Verona) and **1 quiz question** (*A Midsummer Night's Dream*); generic description; excluded incompatible `MCAT` level. |
| 12 | `topic-math-algebra`<br/>`math-algebra` | Math — Algebra | 2 | 1 | 16 *(MCAT excluded)* | Only **2 flashcards** (quadratic formula, FOIL) and **1 quiz question** (`2x + 5 = 17`); generic description; excluded incompatible `MCAT` level. |
| 13 | `topic-math-calculus`<br/>`math-calculus` | Math — Calculus | 3 | 1 | 15 *(Kids, MCAT excluded)* | Only **3 flashcards** (`d/dx[x^2]`, `d/dx[sin(x)]`, meaning of first derivative) and **1 quiz question** (`lim sin(x)/x`); generic description; excluded incompatible `Kids` and `MCAT` levels. |
| 14 | `topic-math-statistics`<br/>`math-statistics` | Math — Statistics | 2 | 1 | 16 *(MCAT excluded)* | Only **2 flashcards** (mean, standard deviation) and **1 quiz question** (95% within 2 SDs); generic description; excluded incompatible `MCAT` level. |
| 15 | `topic-physics-electromagnetism`<br/>`physics-electromagnetism` | Physics — Electromagnetism | 2 | 1 | 17 | Only **2 flashcards** (right-hand rule, Faraday's Law) and **1 quiz question** (Generator); generic description. |
| 16 | `topic-physics-mechanics`<br/>`physics-mechanics` | Physics — Mechanics | 3 | 1 | 17 | Only **3 flashcards** (Newton's First Law, Newton unit, velocity-time slope) and **1 quiz question** (`F = ma`); generic description. |
| 17 | `topic-psychology-cognitive-psychology`<br/>`psychology-cognitive-psychology` | Psychology — Cognitive Psychology | 3 | 1 | 17 | Only **3 flashcards** (Cognitive Psychology definition, 7±2 STM capacity, neuroplasticity) and **1 quiz question** (Stroop Effect); generic description. |
| 18 | `topic-psychology-social-psychology`<br/>`psychology-social-psychology` | Psychology — Social Psychology | 2 | 1 | 17 | Only **2 flashcards** (bystander effect, Asch conformity) and **1 quiz question** (Philip Zimbardo); generic description. |

---

## 3. Complete 65-Topic Classification Inventory

The table below lists all **65 canonical topics** in `src/data/canonicalStudyTopics.json` in deterministic order (`0` `verified`, `18` `needs_review`, `47` `insufficient`):

| # | Canonical ID | Canonical Slug | Subject | Subtopic | Status | Cards | Quiz Qs | Valid Levels | Consolidated Records | Content Fingerprint | Primary Defect Codes |
|---:|---|---|---|---|---|---:|---:|---:|---:|---|---|
| 01 | `topic-biology-biochemistry` | `biology-biochemistry` | Biology | Biochemistry | `insufficient` | 5 | 5 | 16 | 56 | `40f5c50fa9beec73` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`) |
| 02 | `topic-biology-botany` | `biology-botany` | Biology | Botany | `insufficient` | 5 | 5 | 17 | 55 | `a882967ccb1d9730` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 03 | `topic-biology-cell-biology` | `biology-cell-biology` | Biology | Cell Biology | `needs_review` | 4 | 2 | 17 | 56 | `515f348dc9ac9dcd` | `insufficient_topic_coverage` (4 cards, 2 quiz Qs), `generic_template_description` |
| 04 | `topic-biology-ecology` | `biology-ecology` | Biology | Ecology | `insufficient` | 5 | 5 | 17 | 56 | `e77929eb8d33dc2e` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 05 | `topic-biology-evolution` | `biology-evolution` | Biology | Evolution | `needs_review` | 3 | 1 | 17 | 56 | `2cfc7717e9c40857` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `editorial_review_quiz_q1`, `generic_template_description` |
| 06 | `topic-biology-genetics` | `biology-genetics` | Biology | Genetics | `needs_review` | 4 | 1 | 17 | 56 | `3009b099cd834ab1` | `insufficient_topic_coverage` (4 cards, 1 quiz Q), `generic_template_description` |
| 07 | `topic-biology-human-anatomy` | `biology-human-anatomy` | Biology | Human Anatomy | `insufficient` | 5 | 5 | 17 | 56 | `12b68bb5f955deca` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 08 | `topic-biology-marine-biology` | `biology-marine-biology` | Biology | Marine Biology | `insufficient` | 5 | 5 | 17 | 55 | `55c4c26ae5504660` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 09 | `topic-biology-microbiology` | `biology-microbiology` | Biology | Microbiology | `insufficient` | 5 | 5 | 17 | 55 | `d27bc725777f6c34` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 10 | `topic-biology-zoology` | `biology-zoology` | Biology | Zoology | `insufficient` | 5 | 5 | 17 | 55 | `b5635c9ce6796e61` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 11 | `topic-chemistry-acids-and-bases` | `chemistry-acids-and-bases` | Chemistry | Acids and Bases | `insufficient` | 5 | 5 | 17 | 69 | `0389718516952f5c` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 12 | `topic-chemistry-analytical-chemistry` | `chemistry-analytical-chemistry` | Chemistry | Analytical Chemistry | `insufficient` | 5 | 5 | 16 | 69 | `977ac88bbef6d677` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`) |
| 13 | `topic-chemistry-chemical-bonding` | `chemistry-chemical-bonding` | Chemistry | Chemical Bonding | `insufficient` | 5 | 5 | 17 | 70 | `caf0b2898bc50f26` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 14 | `topic-chemistry-inorganic-chemistry` | `chemistry-inorganic-chemistry` | Chemistry | Inorganic Chemistry | `insufficient` | 5 | 5 | 17 | 69 | `850b5fcbcb12e5d2` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 15 | `topic-chemistry-organic-chemistry` | `chemistry-organic-chemistry` | Chemistry | Organic Chemistry | `needs_review` | 3 | 1 | 16 | 70 | `c49ceeabc2016e23` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `editorial_review_quiz_q1`, `excluded_incompatible_levels` (`Kids`) |
| 16 | `topic-chemistry-periodic-table` | `chemistry-periodic-table` | Chemistry | Periodic Table | `needs_review` | 4 | 1 | 17 | 70 | `43c9b6444c56fc78` | `insufficient_topic_coverage` (4 cards, 1 quiz Q), `generic_template_description` |
| 17 | `topic-chemistry-physical-chemistry` | `chemistry-physical-chemistry` | Chemistry | Physical Chemistry | `insufficient` | 5 | 5 | 16 | 69 | `92abfb1b1f6e1b75` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`) |
| 18 | `topic-chemistry-thermodynamics` | `chemistry-thermodynamics` | Chemistry | Thermodynamics | `insufficient` | 5 | 5 | 16 | 70 | `5244fd4b88cb7af7` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`) |
| 19 | `topic-computer-science-algorithms` | `computer-science-algorithms` | Computer Science | Algorithms | `insufficient` | 5 | 5 | 15 | 70 | `7db212d275f07d2f` | `placeholder_flashcards`, `placeholder_quiz_questions`, `orphaned_seed_content_defect`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 20 | `topic-computer-science-cloud-computing` | `computer-science-cloud-computing` | Computer Science | Cloud Computing | `insufficient` | 5 | 5 | 13 | 69 | `357ddadfdbc0092a` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `MCAT`, `SAT`) |
| 21 | `topic-computer-science-cybersecurity` | `computer-science-cybersecurity` | Computer Science | Cybersecurity | `insufficient` | 5 | 5 | 15 | 69 | `e05159ca2ef9bada` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 22 | `topic-computer-science-data-structures` | `computer-science-data-structures` | Computer Science | Data Structures | `insufficient` | 5 | 5 | 15 | 70 | `16e492048ef498ac` | `placeholder_flashcards`, `placeholder_quiz_questions`, `orphaned_seed_content_defect`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 23 | `topic-computer-science-database-systems` | `computer-science-database-systems` | Computer Science | Database Systems | `insufficient` | 5 | 5 | 15 | 69 | `7c3734a2dd14879c` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 24 | `topic-computer-science-machine-learning` | `computer-science-machine-learning` | Computer Science | Machine Learning | `insufficient` | 5 | 5 | 13 | 69 | `2ca42da113bfca6f` | `placeholder_flashcards`, `placeholder_quiz_questions`, `orphaned_seed_content_defect`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `MCAT`, `SAT`) |
| 25 | `topic-computer-science-operating-systems` | `computer-science-operating-systems` | Computer Science | Operating Systems | `insufficient` | 5 | 5 | 13 | 69 | `573923f92de1f939` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `MCAT`, `SAT`) |
| 26 | `topic-computer-science-web-development` | `computer-science-web-development` | Computer Science | Web Development | `insufficient` | 5 | 5 | 16 | 70 | `5353a51a4310b885` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 27 | `topic-economics-econometrics` | `economics-econometrics` | Economics | Econometrics | `insufficient` | 5 | 5 | 13 | 111 | `90e04fcc20d64d21` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `MCAT`, `SAT`) |
| 28 | `topic-economics-game-theory` | `economics-game-theory` | Economics | Game Theory | `insufficient` | 5 | 5 | 15 | 111 | `faab08373f1d104d` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 29 | `topic-economics-international-trade` | `economics-international-trade` | Economics | International Trade | `insufficient` | 5 | 5 | 15 | 111 | `93304a384277b67d` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 30 | `topic-economics-macroeconomics` | `economics-macroeconomics` | Economics | Macroeconomics | `needs_review` | 2 | 1 | 16 | 111 | `f282e5f2aa1a5131` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 31 | `topic-economics-microeconomics` | `economics-microeconomics` | Economics | Microeconomics | `needs_review` | 3 | 1 | 16 | 111 | `c4e175a2a94d05e4` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 32 | `topic-history-american-civil-war` | `history-american-civil-war` | History | American Civil War | `insufficient` | 5 | 5 | 16 | 69 | `5c3b3f260a1774cf` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 33 | `topic-history-ancient-egypt` | `history-ancient-egypt` | History | Ancient Egypt | `needs_review` | 2 | 1 | 16 | 70 | `1363611610c916dd` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 34 | `topic-history-cold-war` | `history-cold-war` | History | Cold War | `insufficient` | 5 | 5 | 16 | 70 | `6717c9b0e0615728` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 35 | `topic-history-french-revolution` | `history-french-revolution` | History | French Revolution | `insufficient` | 5 | 5 | 16 | 69 | `2607ba7e73ae11bd` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 36 | `topic-history-industrial-revolution` | `history-industrial-revolution` | History | Industrial Revolution | `insufficient` | 5 | 5 | 16 | 70 | `4ead5b2e8f6d017d` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 37 | `topic-history-ming-dynasty` | `history-ming-dynasty` | History | Ming Dynasty | `insufficient` | 5 | 5 | 16 | 69 | `bf681fdf3a1871d0` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 38 | `topic-history-roman-empire` | `history-roman-empire` | History | Roman Empire | `insufficient` | 5 | 5 | 16 | 69 | `a8cc4db3f3c67b47` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 39 | `topic-history-world-war-ii` | `history-world-war-ii` | History | World War II | `needs_review` | 3 | 1 | 16 | 70 | `58ec633243859897` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 40 | `topic-literature-modernism` | `literature-modernism` | Literature | Modernism | `needs_review` | 2 | 1 | 15 | 111 | `bbc3abb5df24536e` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 41 | `topic-literature-post-colonial-literature` | `literature-post-colonial-literature` | Literature | Post-Colonial Literature | `insufficient` | 5 | 5 | 13 | 111 | `6c32a5fba1daaecb` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `MCAT`, `SAT`) |
| 42 | `topic-literature-renaissance-prose` | `literature-renaissance-prose` | Literature | Renaissance Prose | `insufficient` | 5 | 5 | 13 | 111 | `0abae3e4f409f390` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `MCAT`, `SAT`) |
| 43 | `topic-literature-shakespeare` | `literature-shakespeare` | Literature | Shakespeare | `needs_review` | 3 | 1 | 16 | 111 | `82dd5eacf4ec01ca` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 44 | `topic-literature-victorian-literature` | `literature-victorian-literature` | Literature | Victorian Literature | `insufficient` | 5 | 5 | 15 | 111 | `8f11cf495bac218b` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 45 | `topic-math-algebra` | `math-algebra` | Math | Algebra | `needs_review` | 2 | 1 | 16 | 70 | `ce1ec57cd6641260` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 46 | `topic-math-calculus` | `math-calculus` | Math | Calculus | `needs_review` | 3 | 1 | 15 | 70 | `add950cbb5c5a405` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 47 | `topic-math-geometry` | `math-geometry` | Math | Geometry | `insufficient` | 5 | 5 | 16 | 70 | `0dce9e1d39c1f2d5` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 48 | `topic-math-graph-theory` | `math-graph-theory` | Math | Graph Theory | `insufficient` | 5 | 5 | 15 | 69 | `e7b74e794492f23d` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 49 | `topic-math-linear-algebra` | `math-linear-algebra` | Math | Linear Algebra | `insufficient` | 5 | 5 | 15 | 69 | `26e63ddc3ab33397` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 50 | `topic-math-number-theory` | `math-number-theory` | Math | Number Theory | `insufficient` | 5 | 5 | 15 | 69 | `ce295981924e1a5e` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`, `MCAT`) |
| 51 | `topic-math-statistics` | `math-statistics` | Math | Statistics | `needs_review` | 2 | 1 | 16 | 70 | `8db74bc1e0258982` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `excluded_incompatible_levels` (`MCAT`) |
| 52 | `topic-math-trigonometry` | `math-trigonometry` | Math | Trigonometry | `insufficient` | 5 | 5 | 16 | 69 | `24c5579ebea4ba57` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`MCAT`) |
| 53 | `topic-physics-astrophysics` | `physics-astrophysics` | Physics | Astrophysics | `insufficient` | 5 | 5 | 17 | 69 | `20a616ff8892af68` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 54 | `topic-physics-electromagnetism` | `physics-electromagnetism` | Physics | Electromagnetism | `needs_review` | 2 | 1 | 17 | 70 | `ef6903804887cee0` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `generic_template_description` |
| 55 | `topic-physics-fluid-dynamics` | `physics-fluid-dynamics` | Physics | Fluid Dynamics | `insufficient` | 5 | 5 | 16 | 69 | `9a4ff6c8fc24bc1c` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`) |
| 56 | `topic-physics-mechanics` | `physics-mechanics` | Physics | Mechanics | `needs_review` | 3 | 1 | 17 | 70 | `05962d1f522b6fed` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `generic_template_description` |
| 57 | `topic-physics-nuclear-physics` | `physics-nuclear-physics` | Physics | Nuclear Physics | `insufficient` | 5 | 5 | 16 | 69 | `efe179905e4a6977` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`Kids`) |
| 58 | `topic-physics-optics` | `physics-optics` | Physics | Optics | `insufficient` | 5 | 5 | 17 | 70 | `8eecd9c56e79b6bc` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 59 | `topic-physics-quantum-physics` | `physics-quantum-physics` | Physics | Quantum Physics | `insufficient` | 5 | 5 | 14 | 70 | `1c14795494156175` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `SAT`) |
| 60 | `topic-physics-relativity` | `physics-relativity` | Physics | Relativity | `insufficient` | 5 | 5 | 14 | 69 | `3049bc6c89b18d8b` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `SAT`) |
| 61 | `topic-psychology-behavioral-neuroscience` | `psychology-behavioral-neuroscience` | Psychology | Behavioral Neuroscience | `insufficient` | 5 | 5 | 14 | 111 | `d6fbaf3940ad90f6` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `SAT`) |
| 62 | `topic-psychology-clinical-psychology` | `psychology-clinical-psychology` | Psychology | Clinical Psychology | `insufficient` | 5 | 5 | 14 | 111 | `39c7b2550a8c28a1` | `placeholder_flashcards`, `placeholder_quiz_questions`, `excluded_incompatible_levels` (`GCSE`, `Kids`, `SAT`) |
| 63 | `topic-psychology-cognitive-psychology` | `psychology-cognitive-psychology` | Psychology | Cognitive Psychology | `needs_review` | 3 | 1 | 17 | 111 | `29a4805e70489c0a` | `insufficient_topic_coverage` (3 cards, 1 quiz Q), `generic_template_description` |
| 64 | `topic-psychology-developmental-psychology` | `psychology-developmental-psychology` | Psychology | Developmental Psychology | `insufficient` | 5 | 5 | 17 | 111 | `6f405769f81a6690` | `placeholder_flashcards`, `placeholder_quiz_questions`, `generic_template_description` |
| 65 | `topic-psychology-social-psychology` | `psychology-social-psychology` | Psychology | Social Psychology | `needs_review` | 2 | 1 | 17 | 111 | `b90ebdbbda045468` | `insufficient_topic_coverage` (2 cards, 1 quiz Q), `generic_template_description` |

