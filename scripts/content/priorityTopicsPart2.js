/**
 * Phase 2B — Remediated & Expanded Educational Content (Part 2: Topics 12–21)
 *
 * Covers:
 * 12. history-world-war-ii
 * 13. literature-modernism
 * 14. literature-shakespeare
 * 15. math-algebra
 * 16. math-calculus
 * 17. math-statistics
 * 18. physics-electromagnetism
 * 19. physics-mechanics
 * 20. psychology-cognitive-psychology
 * 21. psychology-social-psychology
 */

export const PRIORITY_TOPICS_PART_2 = {
  'history-world-war-ii': {
    description:
      'Examine the global conflict of World War II (1939–1945), encompassing the rise of Axis totalitarianism, major military campaigns across European and Pacific theaters, wartime alliances and diplomacy, the Holocaust, and the dawn of the nuclear and Cold War eras.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Analyze the geopolitical causes of World War II, including the Treaty of Versailles, the failure of the League of Nations, and fascist/militarist expansion in Europe and East Asia.',
      'Trace turning-point battles in both theaters, including the Battle of Britain, the Battle of Midway, the Battle of Stalingrad, the Normandy Invasion (D-Day), and the Battle of the Bulge.',
      'Explain the strategic dynamics of Allied diplomacy and summit conferences (Tehran, Yalta, Potsdam) in coordinating military action and postwar territorial arrangements.',
      'Document the systemic genocide of six million Jewish people and millions of other victims by Nazi Germany during the Holocaust (Shoah).',
      'Assess the strategic and humanitarian consequences of total war, industrial mobilization, strategic bombing, and the atomic bombings of Hiroshima and Nagasaki.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'Kids', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (WWII start date Sept 1 1939 with invasion of Poland; D-Day Normandy invasion June 6 1944; Winston Churchill UK Prime Minister) and 1 quiz question (Pearl Harbor attack Dec 7 1941 leading to US entry) verified against established historical records.',
    additionalFlashcards: [
      {
        question: 'Why was the Battle of Stalingrad (August 1942 – February 1943) a decisive turning point in the European theater?',
        answer: 'The catastrophic defeat and encirclement of the German Sixth Army by Soviet forces halted the Axis advance into the Soviet Union and marked the permanent shift to a strategic Soviet counter-offensive driving toward Berlin.',
        verificationBasis: 'Military historiography of the Eastern Front in WWII (Overy, Why the Allies Won; Beevor, Stalingrad).',
        requiresSpecialistReview: false
      },
      {
        question: 'What made the Battle of Midway (June 4–7, 1942) the critical turning point in the Pacific War?',
        answer: 'US naval cryptanalysts broke Japanese naval codes (JN-25), allowing the US Pacific Fleet to ambush and sink four frontline Japanese aircraft carriers (Akagi, Kaga, Soryu, Hiryu), permanently breaking Japanese naval offensive momentum.',
        verificationBasis: 'US Naval History and Heritage Command records on Midway intelligence and carrier action.',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the Holocaust (Shoah), and what took place at the January 1942 Wannsee Conference?',
        answer: 'The Holocaust was the state-sponsored, systematic persecution and murder of six million Jewish people and millions of others (Romani, disabled persons, Soviet prisoners of war, political dissidents) by the Nazi regime; the Wannsee Conference coordinated the bureaucratic logistics for the "Final Solution" (mass extermination via death camps).',
        verificationBasis: 'United States Holocaust Memorial Museum (USHMM) historical archives and Wannsee Protocol (1942).',
        requiresSpecialistReview: false
      },
      {
        question: 'What were the major agreements reached at the Yalta Conference (February 1945) by the "Big Three" (Roosevelt, Churchill, Stalin)?',
        answer: 'Agreement on the unconditional surrender of Nazi Germany, its postwar division into four occupation zones, Soviet commitment to enter the war against Japan within three months of Germany’s defeat, and plans for the founding of the United Nations.',
        verificationBasis: 'Foreign Relations of the United States (FRUS) Yalta Conference proceedings (1945).',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the Manhattan Project, and what occurred on August 6 and 9, 1945?',
        answer: 'A top-secret US-led research and development project (directed by J. Robert Oppenheimer and General Leslie Groves) that developed the first atomic weapons; the US detonated atomic bombs over Hiroshima ("Little Boy") and Nagasaki ("Fat Man"), precipitating Japan’s unconditional surrender.',
        verificationBasis: 'US Department of Energy Manhattan Project history and US Strategic Bombing Survey.',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the Lend-Lease Act (passed by the US Congress in March 1941) prior to formal US entry into the war?',
        answer: 'Legislation authorizing the President to sell, transfer, lend, or lease military equipment, food, and industrial supplies to any nation whose defense was deemed vital to the security of the United States (primarily Great Britain, the Soviet Union, and China).',
        verificationBasis: 'US Public Law 77-11 (Lend-Lease Act of March 11, 1941).',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'Which military campaign in the Soviet Union resulted in the encirclement and surrender of the German Sixth Army in February 1943, marking the major turning point on the Eastern Front?',
        options: [
          'The Battle of Stalingrad',
          'The Siege of Leningrad',
          'The Battle of Moscow (Operation Typhoon)',
          'The Battle of the Bulge'
        ],
        correctAnswer: 'The Battle of Stalingrad',
        explanation: 'The Soviet encirclement (Operation Uranus) of Field Marshal Friedrich Paulus’s Sixth Army at Stalingrad resulted in over 800,000 Axis casualties and destroyed Germany’s strategic initiative on the Eastern Front.',
        verificationBasis: 'Eastern Front WWII military chronology.',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the primary Allied strategic rationale for conducting the amphibious landings on the beaches of Normandy, France, on June 6, 1944 (Operation Overlord)?',
        options: [
          'To establish a major Western European front, liberate Western Europe from Nazi control, and force Germany into a two-front land war alongside the Soviet Red Army in the East',
          'To capture the Suez Canal and protect Mediterranean petroleum routes',
          'To evacuate encircled British and French troops from the European continent back to England',
          'To destroy the Japanese combined fleet in the English Channel'
        ],
        correctAnswer: 'To establish a major Western European front, liberate Western Europe from Nazi control, and force Germany into a two-front land war alongside the Soviet Red Army in the East',
        explanation: 'Operation Overlord fulfilled Allied commitments to open a true "Second Front" in Northwestern Europe, relieving pressure on Soviet forces and liberating France, Belgium, and Western Europe.',
        verificationBasis: 'Supreme Headquarters Allied Expeditionary Force (SHAEF) operational objectives.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which international conference held in July–August 1945 saw Truman, Attlee, and Stalin issue an ultimatum demanding the unconditional surrender of Japan and finalize details of Germany’s postwar demilitarization and border adjustments?',
        options: [
          'The Potsdam Conference',
          'The Munich Conference',
          'The Casablanca Conference',
          'The Bretton Woods Conference'
        ],
        correctAnswer: 'The Potsdam Conference',
        explanation: 'The Potsdam Conference in occupied Germany was the final wartime summit between the victorious Allied leaders, resulting in the Potsdam Declaration demanding Japan’s unconditional surrender.',
        verificationBasis: 'Potsdam Declaration (July 26, 1945) and Protocol of Proceedings.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which intelligence breakthrough provided US Admiral Chester Nimitz with the critical operational warning and Japanese battle plan necessary to achieve victory at the Battle of Midway in June 1942?',
        options: [
          'Naval cryptanalysts at Station HYPO in Pearl Harbor breaking the Japanese naval code JN-25 and identifying target "AF" as Midway Island',
          'The capture of a German Enigma machine during the invasion of Normandy',
          'Radar installations detecting the Japanese fleet 500 miles off the California coast',
          'Aerial reconnaissance photographs of the Japanese home island naval yards'
        ],
        correctAnswer: 'Naval cryptanalysts at Station HYPO in Pearl Harbor breaking the Japanese naval code JN-25 and identifying target "AF" as Midway Island',
        explanation: 'Commander Joseph Rochefort and the Station HYPO team confirmed target designation "AF" was Midway by having the island radio an unencrypted false report of water-distillation failure, which Japanese stations intercepted and rebroadcast as "AF is short of water."',
        verificationBasis: 'Prange, Miracle at Midway; Holmes, Double-Edged Secrets.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Nuances in historiographical debates regarding atomic bomb necessity vs Soviet entry impact on Japan’s surrender decision.'
      ]
    }
  },

  'literature-modernism': {
    description:
      'Investigate early 20th-century modernist literature (c. 1890s–1940s), including the disillusionment of the post-WWI Lost Generation, aesthetic experimentation, fragmentation, free indirect discourse, high modernist poetry, and stream-of-consciousness narration.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Characterize the core aesthetic and thematic concerns of modernism: fragmentation, alienation, subjective perception, skepticism of grand narratives, and Ezra Pound’s dictum "Make it new."',
      'Explain the literary technique of stream of consciousness and analyze its implementation in Virginia Woolf and James Joyce.',
      'Examine the formal innovations of high modernist poetry, particularly T.S. Eliot’s "The Waste Land" (allusion, polyphony, objective correlative) and W.B. Yeats.',
      'Analyze the disillusionment and expatriate identity of the "Lost Generation" through F. Scott Fitzgerald and Ernest Hemingway.',
      'Distinguish modernism from 19th-century Victorian realism and late 20th-century postmodernism.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'College', 'Exam Prep', 'Final Review',
      'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (James Joyce Ulysses 1922; stream of consciousness technique) and 1 quiz question (T.S. Eliot The Waste Land 1922) verified; topic marked needs_review in accuracyStatus because literary interpretation and high-modernist canon debates benefit from humanities specialist review.',
    additionalFlashcards: [
      {
        question: 'What did Ezra Pound mean by the modernist modernist slogan "Make it new!"?',
        answer: 'Modernist writers rejected Victorian sentimentality, rigid formal meter, and conventional narrative linearity, seeking revolutionary linguistic, rhythmic, and psychological techniques suited to the rapid technological and urban changes of the modern era.',
        verificationBasis: 'Pound (1934) Make It New and Imagist manifestos.',
        requiresSpecialistReview: false
      },
      {
        question: 'How did Virginia Woolf employ stream of consciousness and free indirect discourse in novels like Mrs. Dalloway (1925) and To the Lighthouse (1927)?',
        answer: 'Woolf depicted the continuous, non-linear flow of human thought, interior monologues, memories, and sensory impressions, allowing the narrative perspective to glide fluidly between the private psyches of multiple characters.',
        verificationBasis: 'Woolf (1925) Modern Fiction essay and narrative theory.',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Distinction between interior monologue, stream of consciousness, and free indirect discourse across literary theory schools.'
      },
      {
        question: 'What is the "Objective Correlative," a literary term formulated by T.S. Eliot in his 1919 essay "Hamlet and His Problems"?',
        answer: 'A set of objects, a situation, or a chain of events that serves as the concrete formula for a particular emotion, evoking that emotional response in the reader without direct explanation.',
        verificationBasis: 'Eliot (1919) Selected Essays: Hamlet and His Problems.',
        requiresSpecialistReview: false
      },
      {
        question: 'Who coined the term the "Lost Generation," and what social and literary reality did it describe?',
        answer: 'Coined by Gertrude Stein and popularized by Ernest Hemingway (in The Sun Also Rises), it described the cohort of young writers and artists who reached adulthood during World War I and were left culturally displaced and disillusioned with pre-war values.',
        verificationBasis: 'Stein/Hemingway expatriate literary history in 1920s Paris.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does Ernest Hemingway’s "Iceberg Theory" (Theory of Omission) structure his minimalist prose style?',
        answer: 'Hemingway believed that the dignity and emotional power of a story reside beneath the surface: a writer can omit known underlying facts and psychological motives, and the reader will intuitively feel them as long as the surface prose is true and unadorned.',
        verificationBasis: 'Hemingway (1932) Death in the Afternoon (Chapter 16).',
        requiresSpecialistReview: false
      },
      {
        question: 'Why was 1922 considered the "Annus Mirabilis" (Miracle Year) of High Modernism?',
        answer: 'The year 1922 saw the synchronized publication of James Joyce’s groundbreaking novel Ulysses (published in Paris by Sylvia Beach) and T.S. Eliot’s landmark modernist poem The Waste Land, fundamentally redefining Western fiction and poetry.',
        verificationBasis: 'Ellmann, James Joyce biography; Rainey, The Annotated Waste Land.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the Harlem Renaissance, and how did it intersect with literary Modernism in the 1920s?',
        answer: 'An African American cultural and literary flowering centered in Harlem, New York, where writers such as Langston Hughes, Zora Neale Hurston, and Claude McKay forged modernist innovations by incorporating African American vernacular, jazz and blues rhythms, and anti-racist themes.',
        verificationBasis: 'Locke (1925) The New Negro anthology and Harlem Renaissance literary history.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'Which modernist novel follows Leopold Bloom, Stephen Dedalus, and Molly Bloom through the streets and establishments of Dublin over the course of a single day (June 16, 1904)?',
        options: [
          'Ulysses by James Joyce',
          'Mrs. Dalloway by Virginia Woolf',
          'The Great Gatsby by F. Scott Fitzgerald',
          'The Sound and the Fury by William Faulkner'
        ],
        correctAnswer: 'Ulysses by James Joyce',
        explanation: 'James Joyce’s Ulysses is structured as a modern parallel to Homer’s Odyssey, mapping the wanderings of advertising canvasser Leopold Bloom through Dublin on June 16, 1904 (Bloomsday).',
        verificationBasis: 'Joyce Ulysses structural schema (Gilbert and Linati schemas).',
        requiresSpecialistReview: false
      },
      {
        question: 'In T.S. Eliot’s 1922 poem "The Waste Land," what famous paradox opens Section I ("The Burial of the Dead")?',
        options: [
          '"April is the cruellest month, breeding / Lilacs out of the dead land"',
          '"Water, water, everywhere, / Nor any drop to drink"',
          '"Things fall apart; the centre cannot hold"',
          '"In my beginning is my end"'
        ],
        correctAnswer: '"April is the cruellest month, breeding / Lilacs out of the dead land"',
        explanation: 'Eliot subverts Chaucer’s celebratory spring opening in The Canterbury Tales by declaring April the "cruellest month" because the regeneration of spring cruelly forces memory and desire upon a spiritually barren, post-war world.',
        verificationBasis: 'Eliot The Waste Land lines 1–2 text and allusive inversion of Chaucer.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which literary technique is famously exemplified in Section IV of William Faulkner’s The Sound and the Fury and the final unpunctuated chapter of James Joyce’s Ulysses?',
        options: [
          'Stream of consciousness (interior monologue)',
          'Epistolary letter exchange',
          'Allegorical morality play structure',
          'Strict heroic couplet verse'
        ],
        correctAnswer: 'Stream of consciousness (interior monologue)',
        explanation: 'Molly Bloom’s soliloquy at the conclusion of Ulysses consists of eight long, unpunctuated sentences representing the uninterrupted, fluid flow of her waking and drifting consciousness.',
        verificationBasis: 'Narrative theory of interior monologue and modernist fiction.',
        requiresSpecialistReview: false
      },
      {
        question: 'What central philosophical theme unites the works of the "Lost Generation" writers such as F. Scott Fitzgerald (The Great Gatsby) and Ernest Hemingway (The Sun Also Rises)?',
        options: [
          'Profound disillusionment with traditional moral ideals, bourgeois materialism, and the psychological trauma of World War I',
          'Unquestioning faith in industrial progress and American imperial expansion',
          'Celebration of pastoral agrarian life and Medieval chivalric codes',
          'Advocacy of complete political isolationism and strict Victorian censorship'
        ],
        correctAnswer: 'Profound disillusionment with traditional moral ideals, bourgeois materialism, and the psychological trauma of World War I',
        explanation: 'Writers of the Lost Generation grappled with spiritual hollowness, physical and emotional wounds from the Great War, and the reckless hedonism of the Jazz Age.',
        verificationBasis: 'American literary modernism curriculum standards.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'needs_review',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'needs_review',
      reviewReasons: [
        'specialist_review_literary_canon: Literary analysis of modernist stream-of-consciousness, free indirect discourse, and non-Western/Harlem Renaissance modernisms warrants review by an academic literature specialist to balance aesthetic theory with high-school/undergraduate curriculum standards.'
      ],
      specialistReviewConcepts: [
        'Formal distinction between direct interior monologue, stream of consciousness, and free indirect speech in Woolf and Joyce.'
      ]
    }
  },

  'literature-shakespeare': {
    description:
      'Examine the dramatic and poetic works of William Shakespeare (1564–1616), including tragedy, comedy, history, and romance genres, Elizabethan/Jacobean theatrical staging, blank verse and iambic pentameter, soliloquies, dramatic irony, and sonnet form.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Distinguish Shakespeare’s dramatic genres (tragedy, comedy, history, romance) and identify their structural conventions.',
      'Analyze Shakespeare’s poetic meter, contrasting unrhymed iambic pentameter (blank verse) with prose and rhyming couplets.',
      'Examine the psychological and dramatic functions of soliloquies, asides, and dramatic irony in Hamlet, Macbeth, and Othello.',
      'Describe the Elizabethan and Jacobean theatrical context of the Globe Theatre, including open-air staging, all-male performance companies, and the patronage of the Lord Chamberlain’s Men / King’s Men.',
      'Explain the structure of the Shakespearean (English) sonnet (ABAB CDCD EFEF GG) and the role of the volta (thematic turn).'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'Kids', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (Prince Hamlet in Hamlet; Shakespeare nickname Bard of Avon; Romeo and Juliet set in Verona, Italy) and 1 quiz question (A Midsummer Night’s Dream is a comedy, not a great tragedy) verified against the Shakespeare First Folio (1623) canon.',
    additionalFlashcards: [
      {
        question: 'What is iambic pentameter, and why did Shakespeare frequently write his noble characters’ dialogue in blank verse?',
        answer: 'Iambic pentameter consists of lines with five metric feet (iambs), each containing an unstressed syllable followed by a stressed syllable (da-DUM × 5 = 10 syllables). Unrhymed iambic pentameter (blank verse) closely mimics natural elevated English speech rhythms while conveying poetic dignity.',
        verificationBasis: 'Shakespearean prosody and poetic meter.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is a dramatic soliloquy, and how does it differ from an aside?',
        answer: 'A soliloquy is an extended speech delivered by a character alone on stage that reveals their innermost thoughts, moral conflicts, and intentions directly to the audience; an aside is a brief remark spoken to the audience (or to one character) that other characters on stage pretend not to hear.',
        verificationBasis: 'Elizabethan theatrical terminology and dramatic conventions.',
        requiresSpecialistReview: false
      },
      {
        question: 'What defines a Shakespearean tragedy according to classical and Renaissance dramatic conventions?',
        answer: 'A noble protagonist possesses a tragic flaw or fatal error in judgment (hamartia), confronts internal moral struggle and external pressures, and suffers a dramatic downfall that culminates in catastrophe/death and evokes catharsis (pity and fear) in the audience.',
        verificationBasis: 'Aristotelian/Renaissance tragedy theory applied to Shakespeare (Bradley, Shakespearean Tragedy).',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the structure of a Shakespearean (English) sonnet, and what is the "volta"?',
        answer: 'It consists of 14 lines written in iambic pentameter with the rhyme scheme ABAB CDCD EFEF GG (three quatrains followed by a rhyming couplet). The "volta" (turn) is the shift in thought, argument, or tone that typically occurs at line 9 or in the final couplet.',
        verificationBasis: 'Shakespeare’s Sonnets (1609) formal poetic structure.',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the First Folio (1623), and why is it crucial to world literature?',
        answer: 'Compiled seven years after Shakespeare’s death by his fellow actors John Heminges and Henry Condell, Mr. William Shakespeare’s Comedies, Histories, & Tragedies preserved 36 plays—including 18 plays (such as Macbeth, Twelfth Night, and Julius Caesar) that had never been previously published.',
        verificationBasis: '1623 First Folio bibliographic history (Folger Shakespeare Library).',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the Globe Theatre, and how did its staging conditions shape Shakespeare’s dramaturgy?',
        answer: 'An open-air, polygonal amphitheater built by the Lord Chamberlain’s Men in 1599 in Southwark, London; with no artificial stage lighting and minimal scenery, plays relied heavily on descriptive poetic language to establish setting, time, and atmosphere.',
        verificationBasis: 'Globe Theatre architectural and theatrical archaeology.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'In Hamlet’s famous soliloquy beginning "To be, or not to be, that is the question" (Act 3, Scene 1), what central dilemma is Prince Hamlet contemplating?',
        options: [
          'Whether it is nobler to endure life’s suffering and injustices or to end one’s life, and why the fear of what comes after death ("the undiscovered country") paralyzes action',
          'Whether to accept the crown of Denmark from his uncle Claudius or go into exile in England',
          'Whether Ophelia truly loves him or is acting as an agent for Polonius',
          'Whether the Ghost is the devil disguised as his father'
        ],
        correctAnswer: 'Whether it is nobler to endure life’s suffering and injustices or to end one’s life, and why the fear of what comes after death ("the undiscovered country") paralyzes action',
        explanation: 'Hamlet’s soliloquy is a philosophical meditation on existence, suffering, suicide, and the dread of the afterlife that makes people bear earthly calamities rather than venture into the unknown.',
        verificationBasis: 'Hamlet Act 3 Scene 1 textual analysis.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which of the following plays is classified as one of Shakespeare’s romantic comedies, featuring cross-dressing heroines, disguised identities, and multiple weddings?',
        options: [
          'Twelfth Night (or What You Will)',
          'King Lear',
          'Richard III',
          'Othello'
        ],
        correctAnswer: 'Twelfth Night (or What You Will)',
        explanation: 'Twelfth Night is a classic Shakespearean romantic comedy centered on Viola disguising herself as the page Cesario, unrequited love triangles in Illyria, and comic resolution through multiple marriages.',
        verificationBasis: 'First Folio generic classification of Shakespearean comedies.',
        requiresSpecialistReview: false
      },
      {
        question: 'What rhyme scheme defines a traditional Shakespearean (English) sonnet?',
        options: [
          'ABAB CDCD EFEF GG',
          'ABBA ABBA CDECDE',
          'AABB CCDD EEFF GG',
          'ABAB BCBC CDCD EE'
        ],
        correctAnswer: 'ABAB CDCD EFEF GG',
        explanation: 'The Shakespearean sonnet consists of three alternating-rhyme quatrains (ABAB CDCD EFEF) concluding with a pithy rhyming couplet (GG).',
        verificationBasis: 'Prosody of Shakespeare’s 154 Sonnets.',
        requiresSpecialistReview: false
      },
      {
        question: 'In the tragedy Macbeth, what tragic flaw (hamartia) drives Macbeth from an honored Scottish general to a murderous tyrant?',
        options: [
          '"Vaulting ambition" that overrides his moral conscience, spurred on by the Witches’ prophecies and Lady Macbeth',
          'Cowardice in battle that forces him to rely on mercenaries',
          'Uncontrolled jealousy toward his wife Lady Macbeth',
          'Blind obedience to the legitimate King Duncan'
        ],
        correctAnswer: '"Vaulting ambition" that overrides his moral conscience, spurred on by the Witches’ prophecies and Lady Macbeth',
        explanation: 'In his Act 1 Scene 7 soliloquy, Macbeth identifies his own tragic flaw: "I have no spur / To prick the sides of my intent, but only / Vaulting ambition, which o’erleaps itself / And falls on th’ other."',
        verificationBasis: 'Macbeth Act 1 Scene 7 textual evidence.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Distinction between problem plays (Measure for Measure, All’s Well That Ends Well) and late romances (The Tempest, The Winter’s Tale).'
      ]
    }
  },

  'math-algebra': {
    description:
      'Master core algebraic structures, including linear equations and inequalities, systems of linear equations, quadratic equations and factoring, exponents and radical expressions, polynomial operations, rational expressions, and functional notation.',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    learningObjectives: [
      'Solve linear equations, absolute value equations, and linear inequalities in one and two variables.',
      'Solve systems of linear equations using graphing, substitution, and elimination (linear combinations).',
      'Solve quadratic equations by factoring, completing the square, and applying the quadratic formula (including interpreting the discriminant b² - 4ac).',
      'Perform polynomial operations (addition, subtraction, multiplication using FOIL/distributive property, and polynomial division).',
      'Simplify radical expressions and evaluate rational (fractional) exponents using standard exponent laws.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'Kids', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (quadratic formula x = [-b ± √(b² - 4ac)] / (2a); FOIL First Outer Inner Last) and 1 quiz question (solve 2x + 5 = 17 -> x = 6) verified against standard algebra curriculum.',
    additionalFlashcards: [
      {
        question: 'What information does the discriminant (Δ = b² - 4ac) provide about the solutions of the quadratic equation ax² + bx + c = 0 (where a ≠ 0)?',
        answer: 'If Δ > 0, there are two distinct real solutions; if Δ = 0, there is exactly one real repeated solution (vertex lies on the x-axis); if Δ < 0, there are two complex conjugate solutions with non-zero imaginary parts.',
        verificationBasis: 'Quadratic formula discriminant analysis over the real and complex fields.',
        requiresSpecialistReview: false
      },
      {
        question: 'What are the three forms of a linear equation, and what information does each highlight?',
        answer: 'Slope-Intercept form (y = mx + b: slope m and y-intercept (0, b)); Point-Slope form (y - y₁ = m(x - x₁): passes through point (x₁, y₁) with slope m); Standard form (Ax + By = C: easy calculation of x- and y-intercepts).',
        verificationBasis: 'Standard Cartesian coordinate geometry of linear equations.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do you multiply exponential expressions with the same base, and what does a negative exponent mean?',
        answer: 'Product Rule: aᵐ · aⁿ = aᵐ⁺ⁿ (add exponents). Negative Exponent Rule: a⁻ⁿ = 1 / aⁿ (for a ≠ 0, taking the reciprocal).',
        verificationBasis: 'Algebraic laws of integer and rational exponents.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference of two squares factoring formula, and what is a perfect square trinomial formula?',
        answer: 'Difference of Squares: a² - b² = (a - b)(a + b). Perfect Square Trinomials: a² + 2ab + b² = (a + b)² and a² - 2ab + b² = (a - b)².',
        verificationBasis: 'Polynomial factoring identities.',
        requiresSpecialistReview: false
      },
      {
        question: 'When solving a system of two linear equations in two variables, what do parallel lines versus coincident lines signify?',
        answer: 'Parallel lines (same slope, different y-intercepts) never intersect, representing an inconsistent system with no solution (0 solutions); coincident lines (same slope, same y-intercept) intersect everywhere, representing a dependent system with infinitely many solutions.',
        verificationBasis: 'Linear system classification (consistent/independent, consistent/dependent, inconsistent).',
        requiresSpecialistReview: false
      },
      {
        question: 'How do you solve an absolute value equation of the form |ax + b| = c (where c > 0)?',
        answer: 'Split into two separate linear equations: ax + b = c OR ax + b = -c, solve each equation independently for x, and check for extraneous solutions.',
        verificationBasis: 'Absolute value distance definition on the real number line.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'What are the solutions to the quadratic equation x² - 7x + 12 = 0?',
        options: [
          'x = 3 and x = 4',
          'x = -3 and x = -4',
          'x = 2 and x = 6',
          'x = -2 and x = -6'
        ],
        correctAnswer: 'x = 3 and x = 4',
        explanation: 'Factoring the trinomial into two binomials whose product is 12 and sum is -7 gives (x - 3)(x - 4) = 0. Setting each factor to zero yields x = 3 and x = 4.',
        verificationBasis: 'Quadratic trinomial factoring over integers.',
        requiresSpecialistReview: false
      },
      {
        question: 'Solve the system of linear equations:\n  2x + y = 11\n  3x - 2y = 6',
        options: [
          'x = 4, y = 3',
          'x = 5, y = 1',
          'x = 3, y = 5',
          'x = 2, y = 7'
        ],
        correctAnswer: 'x = 4, y = 3',
        explanation: 'Multiply the first equation by 2 to eliminate y: 4x + 2y = 22. Add to the second equation: (4x + 2y) + (3x - 2y) = 22 + 6 -> 7x = 28 -> x = 4. Substitute x = 4 into the first equation: 2(4) + y = 11 -> 8 + y = 11 -> y = 3.',
        verificationBasis: 'Linear elimination method arithmetic verification.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the value of the discriminant for the quadratic equation 2x² - 4x + 5 = 0, and what does it indicate about the roots?',
        options: [
          'Discriminant = -24; two complex (non-real) conjugate solutions',
          'Discriminant = +24; two distinct real solutions',
          'Discriminant = 0; exactly one real repeated root',
          'Discriminant = -56; no mathematical solutions exist'
        ],
        correctAnswer: 'Discriminant = -24; two complex (non-real) conjugate solutions',
        explanation: 'With a = 2, b = -4, c = 5, the discriminant is Δ = b² - 4ac = (-4)² - 4(2)(5) = 16 - 40 = -24. Because Δ < 0, the equation has two complex conjugate roots (x = (4 ± i√24)/4 = 1 ± (i√6)/2).',
        verificationBasis: 'Exact algebraic discriminant evaluation.',
        requiresSpecialistReview: false
      },
      {
        question: 'Simplify the algebraic expression: ((2x³y⁻²)³ · 4x⁻²y⁴)',
        options: [
          '32x⁷y⁻²',
          '24x⁹y²',
          '32x⁵y²',
          '8x⁷y⁻²'
        ],
        correctAnswer: '32x⁷y⁻²',
        explanation: 'First expand the cube: (2x³y⁻²)³ = 2³ · (x³)³ · (y⁻²)³ = 8x⁹y⁻⁶. Next multiply by 4x⁻²y⁴: (8 · 4) · x^(9 - 2) · y^(-6 + 4) = 32 · x⁷ · y⁻² (or 32x⁷ / y²).',
        verificationBasis: 'Exponent rules arithmetic.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Higher-degree polynomial roots (Rational Root Theorem, synthetic division) for pre-calculus algebra alignment.'
      ]
    }
  },

  'math-calculus': {
    description:
      'Master differential and integral single-variable calculus, including limits and continuity, the derivative as an instantaneous rate of change, differentiation rules (product, quotient, chain rule), curve sketching, related rates, optimization, definite integrals, and the Fundamental Theorem of Calculus.',
    difficulty: 'Advanced',
    estimatedTime: '30 minutes',
    learningObjectives: [
      'Evaluate limits algebraically, graphically, and via L’Hôpital’s rule for indeterminate forms (0/0 and ∞/∞).',
      'Explain the derivative as the limit of a difference quotient and interpret it geometrically as the slope of the tangent line.',
      'Apply differentiation techniques, including power, product, quotient, chain, and implicit differentiation to algebraic and transcendental functions.',
      'Apply derivative tests (first and second derivative tests) to determine intervals of increase/decrease, local extrema, concavity, and points of inflection.',
      'State both parts of the Fundamental Theorem of Calculus and compute definite integrals using substitution (u-substitution) and integration by parts.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'College', 'Exam Prep', 'Final Review',
      'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (power rule d/dx[x²] = 2x; derivative of sin(x) = cos(x); derivative as instantaneous rate of change) and 1 quiz question (lim_{x->0} sin(x)/x = 1) verified against standard single-variable calculus theorems.',
    additionalFlashcards: [
      {
        question: 'What is the formal limit definition of the derivative of a function f(x) at x?',
        answer: 'f\'(x) = lim_{h -> 0} [f(x + h) - f(x)] / h, provided this limit exists.',
        verificationBasis: 'Cauchy/Weierstrass difference quotient definition of the derivative.',
        requiresSpecialistReview: false
      },
      {
        question: 'What are the Product Rule and Quotient Rule for differentiation?',
        answer: 'Product Rule: d/dx[f(x)g(x)] = f\'(x)g(x) + f(x)g\'(x). Quotient Rule: d/dx[f(x)/g(x)] = [f\'(x)g(x) - f(x)g\'(x)] / [g(x)]² (for g(x) ≠ 0).',
        verificationBasis: 'Differentiation rules of single-variable calculus.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the Chain Rule for differentiating a composite function y = f(g(x))?',
        answer: 'dy/dx = f\'(g(x)) · g\'(x), or in Leibniz notation: dy/dx = (dy/du) · (du/dx) where u = g(x).',
        verificationBasis: 'Chain rule for differentiable composite functions.',
        requiresSpecialistReview: false
      },
      {
        question: 'What does Part 1 and Part 2 of the Fundamental Theorem of Calculus (FTC) establish?',
        answer: 'Part 1 states that if f is continuous on [a, b], then g(x) = ∫_a^x f(t) dt is continuous and differentiable with g\'(x) = f(x). Part 2 states that ∫_a^b f(x) dx = F(b) - F(a), where F is any antiderivative of f (F\'(x) = f(x)), uniting differentiation and integration as inverse operations.',
        verificationBasis: 'Fundamental Theorem of Calculus (Stewart, Calculus Early Transcendentals).',
        requiresSpecialistReview: false
      },
      {
        question: 'When can L’Hôpital’s Rule be applied to evaluate a limit lim_{x->c} [f(x) / g(x)]?',
        answer: 'When f and g are differentiable near c (with g\'(x) ≠ 0 near c) and the direct substitution yields an indeterminate form of type 0/0 or ±∞/±∞, then lim [f(x)/g(x)] = lim [f\'(x)/g\'(x)], provided the second limit exists or is ±∞.',
        verificationBasis: 'Johann Bernoulli / Guillaume de L’Hôpital (1696) indeterminate limit theorem.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do the First and Second Derivative Tests determine local extrema and concavity of a twice-differentiable function f(x)?',
        answer: 'Critical points occur where f\'(c) = 0 or is undefined. If f\' changes from + to -, x = c is a local maximum; if - to +, local minimum. For the Second Derivative Test, if f\'(c) = 0: f\'\'(c) > 0 implies concave up (local minimum); f\'\'(c) < 0 implies concave down (local maximum). Points where concavity changes are points of inflection.',
        verificationBasis: 'Calculus curve-sketching optimization tests.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the technique of integration by parts, and on which differentiation rule is it based?',
        answer: 'Derived from the Product Rule of differentiation, the formula is ∫ u dv = uv - ∫ v du, used to integrate products of algebraic, exponential, logarithmic, or trigonometric functions by choosing u via LIATE (Logarithmic, Inverse trig, Algebraic, Trig, Exponential).',
        verificationBasis: 'Integration by parts formula derived from d(uv) = u dv + v du.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'What is the derivative of f(x) = e^(3x) · cos(x) with respect to x?',
        options: [
          'e^(3x) · [3 cos(x) - sin(x)]',
          '3e^(3x) · [-sin(x)]',
          'e^(3x) · [cos(x) - 3 sin(x)]',
          '3e^(3x) · cos(x)'
        ],
        correctAnswer: 'e^(3x) · [3 cos(x) - sin(x)]',
        explanation: 'Applying the Product Rule d/dx[u·v] = u\'v + uv\': with u = e^(3x) (so u\' = 3e^(3x) via chain rule) and v = cos(x) (so v\' = -sin(x)), we get f\'(x) = 3e^(3x) cos(x) + e^(3x)(-sin(x)) = e^(3x)[3 cos(x) - sin(x)].',
        verificationBasis: 'Product rule combined with exponential chain rule.',
        requiresSpecialistReview: false
      },
      {
        question: 'Evaluate the definite integral: ∫₀² (3x² - 4x + 1) dx',
        options: [
          '2',
          '4',
          '0',
          '6'
        ],
        correctAnswer: '2',
        explanation: 'Find the antiderivative: F(x) = x³ - 2x² + x. Evaluate from 0 to 2: F(2) = 2³ - 2(2²) + 2 = 8 - 8 + 2 = 2. Since F(0) = 0, the integral equals F(2) - F(0) = 2 - 0 = 2.',
        verificationBasis: 'FTC Part 2 polynomial integration arithmetic.',
        requiresSpecialistReview: false
      },
      {
        question: 'Evaluate the limit using L’Hôpital’s Rule: lim_{x -> 0} [ (e^(2x) - 1) / (5x) ]',
        options: [
          '2/5',
          '0',
          'Infinity',
          '1/5'
        ],
        correctAnswer: '2/5',
        explanation: 'Direct substitution yields (e⁰ - 1) / 0 = 0/0 (an indeterminate form). Differentiating numerator and denominator with respect to x gives lim_{x -> 0} [ 2e^(2x) / 5 ] = 2e⁰ / 5 = 2/5.',
        verificationBasis: 'L’Hôpital’s rule on 0/0 exponential indeterminate form.',
        requiresSpecialistReview: false
      },
      {
        question: 'A function f(x) has a first derivative f\'(x) = (x - 2)(x + 3). At which value of x does f(x) have a local minimum?',
        options: [
          'x = 2',
          'x = -3',
          'x = 0',
          'x = -0.5'
        ],
        correctAnswer: 'x = 2',
        explanation: 'The critical points are x = -3 and x = 2. Testing intervals for f\'(x): for x < -3, f\' > 0; for -3 < x < 2, f\' < 0; for x > 2, f\' > 0. At x = 2, f\' changes from negative to positive, which by the First Derivative Test indicates a local minimum (at x = -3, f\' changes from + to -, so it is a local maximum).',
        verificationBasis: 'First derivative test sign chart.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Epsilon-delta formal limit proofs (Weierstrass definition) for undergraduate advanced calculus / real analysis alignment.'
      ]
    }
  },

  'math-statistics': {
    description:
      'Study descriptive statistics and inferential probability, including measures of central tendency and dispersion, the normal distribution and Empirical Rule, Central Limit Theorem, hypothesis testing (z-tests and t-tests), p-values, Type I/II errors, and linear regression correlation.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Calculate and interpret measures of central tendency (mean, median, mode) and dispersion (range, variance, standard deviation, interquartile range).',
      'Apply the 68–95–99.7 Empirical Rule to normal distributions and calculate standardized z-scores.',
      'Explain the Central Limit Theorem (CLT) and why the sampling distribution of the sample mean approaches normality as sample size increases (n ≥ 30).',
      'Formulate null and alternative hypotheses (H₀, Hₐ), interpret p-values against significance levels (α), and distinguish Type I (false positive) from Type II (false negative) errors.',
      'Evaluate Pearson correlation coefficient (r) and coefficient of determination (r²) and distinguish correlation from causation.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (mean definition; standard deviation as measure of dispersion) and 1 quiz question (Empirical Rule 95% within 2 standard deviations) verified against foundational statistical theory.',
    additionalFlashcards: [
      {
        question: 'When a data distribution is strongly skewed to the right (positive skew), how do the mean, median, and mode typically compare?',
        answer: 'Mode < Median < Mean. Extreme high values in the long right tail pull the mean upward, while the median remains resistant to extreme outliers.',
        verificationBasis: 'Descriptive statistics skewness properties and resistant measures.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is a standardized z-score, and what does it tell you about a data value x?',
        answer: 'z = (x - μ) / σ measures the signed number of standard deviations a data value x lies above (if z > 0) or below (if z < 0) the population mean μ.',
        verificationBasis: 'Standard normal z-score standardization transform.',
        requiresSpecialistReview: false
      },
      {
        question: 'What does the Central Limit Theorem (CLT) state about the sampling distribution of the sample mean (x̄)?',
        answer: 'For any population with mean μ and standard deviation σ, as the sample size n becomes sufficiently large (typically n ≥ 30), the sampling distribution of the sample mean approaches a normal distribution with mean μ and standard error σ / √n, regardless of the population’s underlying shape.',
        verificationBasis: 'Lindeberg-Lévy Central Limit Theorem.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is a p-value in statistical hypothesis testing, and what does "p < α" indicate?',
        answer: 'The p-value is the probability of observing test results at least as extreme as the actual sample data, assuming the null hypothesis (H₀) is true. If p < α (significance level, e.g., 0.05), we reject the null hypothesis as statistically significant.',
        verificationBasis: 'Fisherian/Neyman-Pearson p-value definition.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between a Type I error and a Type II error in hypothesis testing?',
        answer: 'A Type I error (false positive, probability α) occurs when you reject a true null hypothesis (H₀); a Type II error (false negative, probability β) occurs when you fail to reject a false null hypothesis.',
        verificationBasis: 'Neyman-Pearson statistical decision theory.',
        requiresSpecialistReview: false
      },
      {
        question: 'What does the Pearson correlation coefficient (r) measure, and what does r² (the coefficient of determination) represent?',
        answer: 'r measures the strength and direction of a linear relationship between two quantitative variables (-1 ≤ r ≤ +1); r² represents the proportion of variance in the dependent variable (y) that is explained by the linear regression model with the independent variable (x).',
        verificationBasis: 'Bivariate linear regression and Pearson product-moment correlation.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'A standardized test has a normally distributed score distribution with a mean μ = 500 and a standard deviation σ = 100. What percentage of test-takers score between 400 and 600 according to the Empirical Rule (68–95–99.7 Rule)?',
        options: [
          'Approximately 68%',
          'Approximately 95%',
          'Approximately 99.7%',
          'Exactly 50%'
        ],
        correctAnswer: 'Approximately 68%',
        explanation: 'Scores between 400 and 600 represent values within one standard deviation of the mean (500 ± 100). By the 68–95–99.7 Empirical Rule for normal distributions, approximately 68% of the data falls within μ ± 1σ.',
        verificationBasis: 'Standard normal distribution empirical rule.',
        requiresSpecialistReview: false
      },
      {
        question: 'A medical researcher tests a new drug against a placebo with null hypothesis H₀: "The drug has no effect." In reality, the drug is completely ineffective, but due to sampling variation the study obtains p = 0.02 and rejects H₀ at α = 0.05. Which type of error was committed?',
        options: [
          'Type I error (False Positive)',
          'Type II error (False Negative)',
          'Confounding variable bias',
          'Measurement rounding error'
        ],
        correctAnswer: 'Type I error (False Positive)',
        explanation: 'A Type I error is the rejection of a true null hypothesis (claiming an effect or difference exists when in reality it does not).',
        verificationBasis: 'Hypothesis testing error taxonomy.',
        requiresSpecialistReview: false
      },
      {
        question: 'If the linear correlation coefficient between hours spent studying (x) and final exam score (y) is r = 0.80, what is the coefficient of determination (r²), and how is it interpreted?',
        options: [
          'r² = 0.64; 64% of the variation in exam scores can be explained by the linear relationship with study hours',
          'r² = 0.80; 80% of students will score higher on the exam',
          'r² = 0.16; only 16% of the variance is accounted for by the model',
          'r² = 1.60; exam scores increase by 1.6 points per hour studied'
        ],
        correctAnswer: 'r² = 0.64; 64% of the variation in exam scores can be explained by the linear relationship with study hours',
        explanation: 'The coefficient of determination is r² = (0.80)² = 0.64 (or 64%), representing the fraction of total variance in the response variable explained by the least-squares regression line.',
        verificationBasis: 'Linear regression ANOVA variance decomposition.',
        requiresSpecialistReview: false
      },
      {
        question: 'A random sample of n = 64 measurements is drawn from an unknown population with mean μ = 120 and standard deviation σ = 32. What are the mean and standard error of the sampling distribution of the sample mean (x̄)?',
        options: [
          'Mean = 120; Standard Error = 4 (σ / √n = 32 / √64 = 32 / 8 = 4)',
          'Mean = 120; Standard Error = 32',
          'Mean = 15; Standard Error = 4',
          'Mean = 120; Standard Error = 0.5'
        ],
        correctAnswer: 'Mean = 120; Standard Error = 4 (σ / √n = 32 / √64 = 32 / 8 = 4)',
        explanation: 'By the Central Limit Theorem, the expected value of the sample mean is E[x̄] = μ = 120, and the standard error of the mean is SE = σ / √n = 32 / √64 = 32 / 8 = 4.',
        verificationBasis: 'Central Limit Theorem standard error formula.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Bayesian inference (prior/posterior) vs frequentist p-value interpretations for advanced statistics modules.'
      ]
    }
  },

  'physics-electromagnetism': {
    description:
      'Investigate electric charges and fields, Coulomb’s law, Gauss’s law, electric potential, capacitance, direct and alternating current circuits, magnetic fields and Lorentz force, Ampère’s law, Faraday’s law of induction, and Maxwell’s equations.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Apply Coulomb’s law to calculate electrostatic forces between point charges and relate electric field (E) to electric potential (V).',
      'Analyze direct current (DC) circuits using Ohm’s law (V = IR), Joule heating (P = IV), and Kirchhoff’s current and voltage laws (KCL, KVL).',
      'Use the right-hand rule to find the direction of magnetic forces on moving charges (F = q(v × B)) and current-carrying wires (F = I(L × B)).',
      'Explain Faraday’s law of induction and Lenz’s law, and calculate induced electromotive force (emf = -dΦ_B/dt) in generators and inductors.',
      'Summarize Maxwell’s four equations and explain how oscillating electric and magnetic fields propagate as electromagnetic waves at the speed of light.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (right-hand rule for magnetic force/field; Faraday’s Law of induction) and 1 quiz question (generator converts mechanical energy to electrical energy via electromagnetic induction) verified against classical electrodynamics.',
    additionalFlashcards: [
      {
        question: 'What is Coulomb’s Law, and how does the electrostatic force vary with distance between two point charges?',
        answer: 'F = k_e · |q₁q₂| / r², where k_e ≈ 8.99 × 10⁹ N·m²/C². The force is directly proportional to the product of the charges and follows an inverse-square law with distance r (attractive for opposite charges, repulsive for like charges).',
        verificationBasis: 'Coulomb’s electrostatic inverse-square law (1785).',
        requiresSpecialistReview: false
      },
      {
        question: 'What are Kirchhoff’s Current Law (KCL) and Kirchhoff’s Voltage Law (KVL)?',
        answer: 'KCL (conservation of electric charge) states that the sum of currents entering any circuit node equals the sum of currents leaving; KVL (conservation of energy) states that the directed sum of potential differences (voltages) around any closed circuit loop is zero.',
        verificationBasis: 'Gustav Kirchhoff (1845) circuit laws.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the magnetic Lorentz force on a particle with electric charge q moving with velocity v in a magnetic field B?',
        answer: 'F = q(v × B), with magnitude F = |q|vB sin(θ), where θ is the angle between v and B. The force is perpendicular to both velocity and magnetic field, doing zero work and deflecting the particle into circular or helical motion.',
        verificationBasis: 'Lorentz force equation in classical electrodynamics.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is Lenz’s Law, and how does it relate to the minus sign in Faraday’s Law of Induction (ε = -dΦ_B / dt)?',
        answer: 'Lenz’s Law states that the direction of an induced current always creates a magnetic field that opposes the change in magnetic flux that produced it, ensuring conservation of energy (preventing runaway perpetual energy generation).',
        verificationBasis: 'Heinrich Lenz (1834) electromagnetic induction law.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do equivalent resistance and equivalent capacitance combine in series versus parallel circuits?',
        answer: 'Resistors in series add directly (R_eq = R₁ + R₂), while in parallel their reciprocals add (1/R_eq = 1/R₁ + 1/R₂). Capacitors combine in the exact opposite manner: in parallel they add directly (C_eq = C₁ + C₂), while in series their reciprocals add (1/C_eq = 1/C₁ + 1/C₂).',
        verificationBasis: 'Linear circuit element impedance combinations.',
        requiresSpecialistReview: false
      },
      {
        question: 'What are Maxwell’s four equations, and what fundamental revelation did they provide about light?',
        answer: 'Gauss’s Law (charges produce electric fields), Gauss’s Law for Magnetism (no magnetic monopoles), Faraday’s Law (changing magnetic fields induce electric fields), and Ampère-Maxwell Law (currents and changing electric fields produce magnetic fields). Together, they prove that electromagnetic disturbances travel as waves through vacuum at the speed of light c = 1/√(μ₀ε₀).',
        verificationBasis: 'James Clerk Maxwell (1865) electromagnetic field theory.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'Two point charges of +2 μC and +8 μC are separated by a distance r. If the distance between them is DOUBLED to 2r, what happens to the electrostatic repulsive force between them?',
        options: [
          'The force decreases to 1/4 of its original value',
          'The force decreases to 1/2 of its original value',
          'The force doubles',
          'The force remains unchanged'
        ],
        correctAnswer: 'The force decreases to 1/4 of its original value',
        explanation: 'Coulomb’s law follows an inverse-square relationship F ∝ 1/r². Doubling the distance (2r) scales the force by 1 / (2)² = 1/4 of the original force.',
        verificationBasis: 'Inverse-square law scaling.',
        requiresSpecialistReview: false
      },
      {
        question: 'A proton (charge q = +1.6 × 10⁻¹⁹ C) moves horizontally due east at 3.0 × 10⁶ m/s into a uniform magnetic field directed vertically upward. According to the right-hand rule, in which direction is the initial magnetic force on the proton?',
        options: [
          'Due South',
          'Due North',
          'Due West',
          'Vertically Downward'
        ],
        correctAnswer: 'Due South',
        explanation: 'Using the right-hand rule for F = q(v × B): point fingers of the right hand in the direction of velocity (East), curl fingers toward the magnetic field (Up). The outstretched thumb points due South.',
        verificationBasis: 'Right-hand rule cross-product orientation (East × Up = South in standard geographical coordinates).',
        requiresSpecialistReview: false
      },
      {
        question: 'Three identical 6 Ω resistors are connected in PARALLEL across a 12 V battery. What is the equivalent resistance of the circuit, and what is the total current supplied by the battery?',
        options: [
          'Equivalent resistance = 2 Ω; Total current = 6 A',
          'Equivalent resistance = 18 Ω; Total current = 0.67 A',
          'Equivalent resistance = 3 Ω; Total current = 4 A',
          'Equivalent resistance = 0.5 Ω; Total current = 24 A'
        ],
        correctAnswer: 'Equivalent resistance = 2 Ω; Total current = 6 A',
        explanation: 'For three identical resistors in parallel, 1/R_eq = 1/6 + 1/6 + 1/6 = 3/6 = 1/2, so R_eq = 2 Ω. By Ohm’s Law, total current is I = V / R_eq = 12 V / 2 Ω = 6 A.',
        verificationBasis: 'Ohm’s law parallel circuit arithmetic.',
        requiresSpecialistReview: false
      },
      {
        question: 'A circular wire loop with an area of 0.20 m² is oriented perpendicular to a magnetic field. If the magnetic field decreases uniformly from 1.5 T to 0.5 T in 0.05 seconds, what is the magnitude of the induced electromotive force (emf) in the loop?',
        options: [
          '4.0 V',
          '0.04 V',
          '2.0 V',
          '10.0 V'
        ],
        correctAnswer: '4.0 V',
        explanation: 'Change in magnetic flux is ΔΦ_B = A · ΔB = 0.20 m² · (0.5 T - 1.5 T) = -0.20 Wb. By Faraday’s Law, |ε| = |ΔΦ_B / Δt| = 0.20 Wb / 0.05 s = 4.0 V.',
        verificationBasis: 'Faraday’s law of induction flux calculation.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Vector calculus formulation of curl and divergence in Maxwell’s equations for upper-level calculus-based physics courses.'
      ]
    }
  },

  'physics-mechanics': {
    description:
      'Master classical Newtonian mechanics, kinematics in one and two dimensions, Newton’s laws of motion, free-body diagram analysis, friction, circular motion and gravitation, work-energy theorem, conservation of mechanical energy, linear momentum and collisions, and rotational dynamics.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Solve one- and two-dimensional kinematic problems using constant-acceleration kinematic equations (including projectile motion).',
      'Construct free-body diagrams and apply Newton’s laws of motion (ΣF = ma) to single and multi-body systems with friction.',
      'Apply the Work-Energy Theorem (W_net = ΔK) and identify conservative versus non-conservative forces in the conservation of mechanical energy.',
      'Analyze elastic and inelastic collisions using the conservation of linear momentum and impulse (J = Δp = ∫ F dt).',
      'Relate rotational dynamics (torque τ = Iα, moment of inertia, angular momentum) to their linear mechanical counterparts.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (Newton’s First Law; Newton unit kg·m/s²; velocity-time graph slope represents acceleration) and 1 quiz question (F = ma -> a = 50 N / 10 kg = 5 m/s²) verified against Newtonian mechanics.',
    additionalFlashcards: [
      {
        question: 'What are the four kinematic equations for motion with constant acceleration a in one dimension?',
        answer: '1. v = v₀ + at; 2. Δx = v₀t + ½at²; 3. v² = v₀² + 2aΔx; 4. Δx = ½(v₀ + v)t.',
        verificationBasis: 'Uniformly accelerated linear motion kinematics.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is Newton’s Third Law of Motion, and why do action-reaction pairs never cancel each other out?',
        answer: 'When object A exerts a force on object B, object B simultaneously exerts an equal and opposite force on object A (F_AB = -F_BA). They never cancel because the two forces act on two completely different objects, not on the same free body.',
        verificationBasis: 'Newton’s Principia (1687) Third Law of Motion.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the Work-Energy Theorem, and what is the difference between conservative and non-conservative forces?',
        answer: 'The net work done on an object equals its change in kinetic energy (W_net = ΔK = ½mv² - ½mv₀²). A conservative force (e.g., gravity, spring force) does path-independent work and stores potential energy, whereas non-conservative forces (e.g., friction, air resistance) dissipate mechanical energy as thermal energy.',
        verificationBasis: 'Work-energy theorem in classical mechanics.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between an elastic collision and a perfectly inelastic collision in an isolated system?',
        answer: 'Linear momentum is conserved in both collisions (assuming no net external forces). In an elastic collision, total mechanical kinetic energy is also conserved; in an inelastic collision, kinetic energy is lost (converted to heat/sound/deformation), and if the objects stick together (perfectly inelastic), kinetic energy loss is maximized.',
        verificationBasis: 'Conservation of linear momentum and kinetic energy collision taxonomy.',
        requiresSpecialistReview: false
      },
      {
        question: 'What provides the centripetal acceleration (a_c = v² / r) for an object undergoing uniform circular motion?',
        answer: 'Centripetal acceleration is not an independent physical force; it is the required net inward radial force provided by real forces such as tension, friction, gravity, or normal force that turns the velocity vector without changing speed.',
        verificationBasis: 'Centripetal acceleration kinematics in circular motion.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the rotational analogue of Newton’s Second Law (F = ma) and linear momentum (p = mv)?',
        answer: 'The rotational analogue of force is Torque (τ = r × F, with net torque Στ = Iα), where I is Moment of Inertia (rotational inertia) and α is angular acceleration; the analogue of linear momentum is Angular Momentum (L = Iω), which is conserved when net external torque is zero.',
        verificationBasis: 'Rotational dynamics of rigid bodies.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'A ball is launched horizontally at 20 m/s from the top of a 45-meter-tall cliff overlooking flat ground. Neglecting air resistance and using g = 10 m/s², how long does the ball take to strike the ground, and how far horizontally from the cliff base does it land?',
        options: [
          'Time = 3.0 seconds; Horizontal distance = 60 meters',
          'Time = 4.5 seconds; Horizontal distance = 90 meters',
          'Time = 2.0 seconds; Horizontal distance = 40 meters',
          'Time = 3.0 seconds; Horizontal distance = 30 meters'
        ],
        correctAnswer: 'Time = 3.0 seconds; Horizontal distance = 60 meters',
        explanation: 'Vertical motion is independent of horizontal motion: y = ½gt² -> 45 = ½(10)t² -> 5t² = 45 -> t² = 9 -> t = 3.0 s. Horizontal distance is x = v_x · t = 20 m/s · 3.0 s = 60 meters.',
        verificationBasis: 'Two-dimensional projectile motion kinematic independence.',
        requiresSpecialistReview: false
      },
      {
        question: 'A 2.0 kg block slides down a frictionless inclined plane from a vertical height of h = 5.0 meters above the ground. Using g = 9.8 m/s², what is the speed of the block at the bottom of the incline?',
        options: [
          '9.9 m/s (approx. √98)',
          '49.0 m/s',
          '14.0 m/s',
          '7.0 m/s'
        ],
        correctAnswer: '9.9 m/s (approx. √98)',
        explanation: 'By conservation of mechanical energy, potential energy converts fully to kinetic energy: mgh = ½mv² -> v = √(2gh) = √(2 · 9.8 · 5.0) = √98 ≈ 9.899 ≈ 9.9 m/s. The mass m cancels and the path angle does not affect the final speed.',
        verificationBasis: 'Conservation of mechanical energy on a conservative incline.',
        requiresSpecialistReview: false
      },
      {
        question: 'A 1,000 kg car traveling east at 20 m/s collides with a stationary 2,000 kg truck. If the vehicles lock bumpers and stick together (a perfectly inelastic collision), what is their combined velocity immediately after the collision?',
        options: [
          '6.67 m/s East (20/3 m/s)',
          '10.0 m/s East',
          '13.33 m/s East',
          '0 m/s (they come to a complete stop)'
        ],
        correctAnswer: '6.67 m/s East (20/3 m/s)',
        explanation: 'Linear momentum is conserved: p_initial = m₁v₁ + m₂v₂ = (1,000 kg)(20 m/s) + 0 = 20,000 kg·m/s. After collision: v_final = p_total / (m₁ + m₂) = 20,000 / (1,000 + 2,000) = 20,000 / 3,000 = 6.67 m/s East.',
        verificationBasis: 'Conservation of linear momentum in perfectly inelastic collision.',
        requiresSpecialistReview: false
      },
      {
        question: 'A figure skater spinning on the ice pulls her outstretched arms tightly in toward her chest, decreasing her rotational moment of inertia I by a factor of 2. What happens to her spinning angular velocity ω and her rotational kinetic energy K_rot (assuming zero external friction)?',
        options: [
          'Her angular velocity doubles (2ω), and her rotational kinetic energy doubles (2K_rot)',
          'Her angular velocity doubles, but her rotational kinetic energy remains unchanged',
          'Her angular velocity is cut in half, and her rotational kinetic energy drops to 1/4',
          'Both her angular velocity and rotational kinetic energy remain constant'
        ],
        correctAnswer: 'Her angular velocity doubles (2ω), and her rotational kinetic energy doubles (2K_rot)',
        explanation: 'With no external torque, angular momentum L = Iω is conserved: halving I requires doubling ω (I_new · 2ω = L). Rotational kinetic energy is K_rot = L² / (2I): halving I in the denominator doubles K_rot (the extra kinetic energy comes from the skater’s muscles doing mechanical work to pull her arms inward).',
        verificationBasis: 'Conservation of angular momentum and internal muscular work.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Non-inertial reference frames and fictitious forces (Coriolis and centrifugal forces) for advanced mechanics alignment.'
      ]
    }
  },

  'psychology-cognitive-psychology': {
    description:
      'Investigate human mental processes, sensory perception, selective and divided attention, working memory architectures (Baddeley-Hitch model), encoding and retrieval in long-term memory, cognitive schemas, heuristics and cognitive biases, and language acquisition.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Define cognitive psychology and outline the information-processing model of the human mind.',
      'Compare iconic and echoic sensory memory, Atkinson-Shiffrin multi-store memory, and Baddeley and Hitch’s multi-component working memory model.',
      'Explain selective attention mechanisms, Cherry’s dichotic listening task, the cocktail party effect, and the Stroop effect.',
      'Distinguish explicit (declarative: episodic and semantic) memory from implicit (non-declarative: procedural and priming) long-term memory systems.',
      'Analyze cognitive heuristics (availability and representativeness heuristics) and biases (confirmation bias, framing effect) in human judgment and decision-making.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (Cognitive psychology definition; George Miller short-term memory capacity 7 ± 2 items; neuroplasticity definition) and 1 quiz question (Stroop Effect selective attention interference) verified against cognitive psychology textbooks (Sternberg; Anderson).',
    additionalFlashcards: [
      {
        question: 'What are the four components of Baddeley and Hitch’s working memory model?',
        answer: 'The Central Executive (attentional control system), the Phonological Loop (auditory rehearsal), the Visuospatial Sketchpad (visual and spatial imagery), and the Episodic Buffer (integrating cross-modal information into coherent chronological episodes).',
        verificationBasis: 'Baddeley and Hitch (1974) and Baddeley (2000) working memory architecture.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do Explicit (Declarative) memory and Implicit (Non-declarative) memory differ, and what brain structures are associated with each?',
        answer: 'Explicit memory involves conscious, intentional recall of facts (semantic memory) and personal events (episodic memory), dependent on the hippocampus and medial temporal lobe; Implicit memory involves automatic motor skills (procedural memory) and conditioning, supported by the basal ganglia and cerebellum.',
        verificationBasis: 'Neuropsychological dissociation studies (Patient H.M., Scoville & Milner 1957; Squire 2004).',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the serial position effect, and what causes the primacy effect versus the recency effect?',
        answer: 'In a list-learning task, items at the beginning (primacy effect) are recalled well due to greater opportunity for rehearsal and consolidation into long-term memory; items at the end (recency effect) are recalled well because they are still active in short-term working memory.',
        verificationBasis: 'Ebbinghaus / Murdock (1962) serial position curve.',
        requiresSpecialistReview: false
      },
      {
        question: 'How did Elizabeth Loftus demonstrate the "Misinformation Effect" and the reconstructive nature of human memory?',
        answer: 'Loftus showed that exposing eyewitnesses to misleading post-event information (e.g., asking how fast cars were going when they "smashed" versus "hit" each other) alters their subsequent memory recall, proving memory is actively reconstructed rather than an indelible video recording.',
        verificationBasis: 'Loftus and Palmer (1974) eyewitness testimony reconstructive memory experiments.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between the Availability Heuristic and the Representativeness Heuristic (Tversky and Kahneman)?',
        answer: 'The availability heuristic judges an event’s likelihood based on how easily examples come to mind (e.g., overestimating plane crash risks after news coverage); the representativeness heuristic judges probability by how closely an outcome matches a mental prototype (often committing the base-rate fallacy).',
        verificationBasis: 'Tversky and Kahneman (1973, 1974) judgment under uncertainty heuristics.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is Confirmation Bias, and how does Wason’s Selection Task (Four-Card Problem) demonstrate it?',
        answer: 'Confirmation bias is the tendency to search for, interpret, and recall information that confirms existing hypotheses while ignoring disconfirming evidence; in Wason’s four-card task, participants overwhelmingly select cards to verify a conditional rule rather than seeking cards that could falsify it.',
        verificationBasis: 'Peter Wason (1960, 1968) four-card reasoning experiments.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'Patient H.M. (Henry Molaison) underwent bilateral medial temporal lobe resection to treat severe epilepsy, resulting in profound anterograde amnesia. Which memory ability remained remarkably INTACT in Patient H.M.?',
        options: [
          'His ability to acquire new procedural motor skills (such as mirror-drawing) without any conscious memory of practicing the task',
          'His ability to remember new people’s names and faces for years after his surgery',
          'His ability to recall personal autobiographical episodes occurring after 1953',
          'His ability to memorize long lists of new vocabulary words indefinitely'
        ],
        correctAnswer: 'His ability to acquire new procedural motor skills (such as mirror-drawing) without any conscious memory of practicing the task',
        explanation: 'Brenda Milner demonstrated that Patient H.M. could learn motor skills (like mirror-tracing) over days with normal learning curves despite having zero conscious recollection of ever performing the task, establishing the distinct neural basis of implicit procedural vs explicit declarative memory.',
        verificationBasis: 'Milner (1962) and Scoville & Milner (1957) neuropsychological case study of H.M.',
        requiresSpecialistReview: false
      },
      {
        question: 'In Baddeley’s model of working memory, which component acts as the supervisory control system that allocates attention, switches between tasks, and suppresses irrelevant distractions?',
        options: [
          'The Central Executive',
          'The Phonological Loop',
          'The Visuospatial Sketchpad',
          'The Iconic Sensor'
        ],
        correctAnswer: 'The Central Executive',
        explanation: 'The Central Executive is the attentional controller responsible for focusing, dividing, and switching attention between the subsidiary slave systems (phonological loop and visuospatial sketchpad).',
        verificationBasis: 'Baddeley working memory model components.',
        requiresSpecialistReview: false
      },
      {
        question: 'A participant in an attention experiment wears headphones that play two different spoken audio streams simultaneously into their left and right ears and is instructed to repeat aloud ("shadow") the message in the right ear. What is this classic experimental paradigm called?',
        options: [
          'Dichotic listening task',
          'Stroop color-naming task',
          'Wason selection task',
          'Sternberg memory-scanning task'
        ],
        correctAnswer: 'Dichotic listening task',
        explanation: 'Colin Cherry’s (1953) dichotic listening paradigm investigated selective auditory attention by having subjects shadow one ear while measuring how much unattended information from the other ear penetrates awareness.',
        verificationBasis: 'Cherry (1953) selective auditory attention study.',
        requiresSpecialistReview: false
      },
      {
        question: 'After viewing news reports of two separate commercial airline crashes, a traveler decides to drive 1,500 miles instead of flying, believing flying is more dangerous, despite statistical data proving driving has a far higher fatality rate per passenger-mile. Which cognitive heuristic explains this decision?',
        options: [
          'The Availability Heuristic',
          'The Representativeness Heuristic',
          'The Gambler’s Fallacy',
          'The Anchoring and Adjustment Heuristic'
        ],
        correctAnswer: 'The Availability Heuristic',
        explanation: 'The availability heuristic leads people to evaluate the frequency or likelihood of an event by the ease with which vivid instances come to mind. Vivid news coverage of plane crashes makes them highly available in memory.',
        verificationBasis: 'Kahneman, Thinking, Fast and Slow; Tversky and Kahneman (1973).',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'verified',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'verified',
      reviewReasons: [],
      specialistReviewConcepts: [
        'Kahneman System 1 (fast/intuitive) vs System 2 (slow/deliberative) dual-process theory nuances and working-memory capacity updates (Cowan 4-chunk limit).'
      ]
    }
  },

  'psychology-social-psychology': {
    description:
      'Examine how individual thoughts, feelings, and behaviors are influenced by actual, imagined, or implied social presence, including conformity (Asch), obedience (Milgram), social roles (Stanford Prison Experiment and its modern critiques), the bystander effect, attribution theory, and cognitive dissonance.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Distinguish normative and informational social influence and analyze Solomon Asch’s line-judgment conformity experiments.',
      'Explain Stanley Milgram’s obedience studies, the ethical issues they raised, and the situational factors that influenced obedience rates.',
      'Analyze the Stanford Prison Experiment (Zimbardo 1971), contextualize its claims regarding deindividuation and social roles, and document modern methodological and ethical critiques.',
      'Explain the bystander effect and identify its underlying mechanisms: diffusion of responsibility, pluralistic ignorance, and evaluation apprehension.',
      'Describe Leon Festinger’s cognitive dissonance theory and evaluate attribution theory (the Fundamental Attribution Error and self-serving bias).'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (bystander effect definition; Asch line-judgment experiment on conformity) and 1 quiz question (Philip Zimbardo associated with Stanford Prison Experiment) preserved; topic marked needs_review in accuracyStatus because modern social psychology has extensively reassessed the methodology, demand characteristics, and replication status of the Stanford Prison Experiment and early obedience research.',
    additionalFlashcards: [
      {
        question: 'What is the Fundamental Attribution Error (FAE), and how does it relate to the actor-observer bias?',
        answer: 'The FAE (Lee Ross, 1977) is the tendency to overestimate internal dispositional traits (personality, character) and underestimate external situational factors when explaining others’ behavior; the actor-observer bias adds that we attribute our own behavior to external situational circumstances.',
        verificationBasis: 'Ross (1977) The Intuitive Psychologist and His Shortcomings (Advances in Experimental Social Psychology).',
        requiresSpecialistReview: false
      },
      {
        question: 'What is Cognitive Dissonance (Leon Festinger, 1957), and how do individuals resolve it?',
        answer: 'Cognitive dissonance is the psychological discomfort experienced when holding contradictory beliefs, values, or behaviors. Individuals reduce dissonance by changing their attitude, changing their behavior, acquiring new justifying cognitions, or trivializing the inconsistency.',
        verificationBasis: 'Festinger (1957) A Theory of Cognitive Dissonance and Festinger & Carlsmith (1959) $1 vs $20 experiment.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between Informational Social Influence and Normative Social Influence in conformity?',
        answer: 'Informational social influence stems from the desire to be correct, conforming because we believe others possess accurate information (e.g., Sherif’s autokinetic effect); Normative social influence stems from the desire to be liked and accepted, conforming to avoid social rejection (e.g., Asch’s line experiment).',
        verificationBasis: 'Deutsch and Gerard (1955) two-process model of social influence.',
        requiresSpecialistReview: false
      },
      {
        question: 'What are the three psychological mechanisms that produce the Bystander Effect (Darley and Latané, 1968)?',
        answer: '1. Diffusion of Responsibility (each person assumes someone else will intervene); 2. Pluralistic Ignorance (observing others’ inaction leads individuals to conclude no true emergency exists); 3. Evaluation Apprehension (fear of social embarrassment or making a mistake in public).',
        verificationBasis: 'Darley and Latané (1968) bystander intervention experiments and decision model.',
        requiresSpecialistReview: false
      },
      {
        question: 'What situational factors significantly reduced obedience in Stanley Milgram’s shock experiments?',
        answer: 'Obedience dropped when the learner (victim) was in the same room as the teacher (40%), when the teacher had to physically press the learner’s hand onto a shock plate (30%), when the experimenter gave orders by telephone (20.5%), and when peer confederates rebelled against the experimenter (10%).',
        verificationBasis: 'Milgram (1974) Obedience to Authority: An Experimental View situational variations.',
        requiresSpecialistReview: false
      },
      {
        question: 'What major methodological critiques have historians and social scientists raised regarding Philip Zimbardo’s 1971 Stanford Prison Experiment?',
        answer: 'Audio recordings and archives reveal demand characteristics: guards received explicit coaching from the experimenters on how to behave, guard brutality was not spontaneous, prisoners were misled, and the study lacked an objective control group, leading many contemporary textbooks to reclassify it as a theatrical demonstration rather than a rigorous experiment.',
        verificationBasis: 'Le Texier (2019, American Psychologist) archival debunking of the Stanford Prison Experiment and Blum (2018).',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Preserved seed quiz question links Zimbardo to the Stanford Prison Experiment; while factually correct, the explanation and cards must accurately convey modern scientific consensus and methodological critiques.'
      },
      {
        question: 'What is Groupthink (Irving Janis), and what conditions foster it?',
        answer: 'Groupthink is a flawed decision-making process in highly cohesive groups where the desire for harmony and consensus overrides realistic critical evaluation of alternative viewpoints, fostered by high stress, insulation from outside experts, and a directive leader.',
        verificationBasis: 'Janis (1972, 1982) Victims of Groupthink and foreign-policy case studies.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'In Solomon Asch’s classic 1951 line-judgment experiment, approximately what percentage of participants conformed to the unanimous incorrect consensus of confederates on at least one critical trial?',
        options: [
          'Approximately 75% conformed at least once (with overall trials averaging about 37% conformity)',
          '100% of participants conformed on every trial',
          'Less than 5% conformed',
          'Approximately 25% conformed'
        ],
        correctAnswer: 'Approximately 75% conformed at least once (with overall trials averaging about 37% conformity)',
        explanation: 'In Asch’s experiment, about 75% of participants conformed to the group’s visibly incorrect judgment on at least one critical trial, while 25% never conformed, demonstrating the powerful influence of normative social pressure.',
        verificationBasis: 'Asch (1951, 1956) experimental conformity data.',
        requiresSpecialistReview: false
      },
      {
        question: 'In Stanley Milgram’s original 1963 baseline study of obedience at Yale University, what percentage of ordinary adult participants administered the maximum electrical shock level of 450 volts when instructed by the experimenter?',
        options: [
          '65% (26 out of 40 participants)',
          'Less than 1% (only clinical sadists)',
          '100%',
          '20%'
        ],
        correctAnswer: '65% (26 out of 40 participants)',
        explanation: 'Prior to the study, psychiatrists predicted that fewer than 1% of participants would go to 450 volts. In the baseline experiment, 65% of participants obeyed all instructions up to the maximum 450-volt shock, despite hearing distress from the learner.',
        verificationBasis: 'Milgram (1963) Behavioral Study of Obedience (JASP 67: 371–378).',
        requiresSpecialistReview: false
      },
      {
        question: 'In Leon Festinger and J. Merrill Carlsmith’s famous 1959 cognitive dissonance study, which group of participants subsequently reported genuinely enjoying a dull, boring task the most?',
        options: [
          'Participants paid only $1 to tell the next person the task was fun and exciting',
          'Participants paid $20 to tell the next person the task was fun and exciting',
          'Control participants who were paid nothing and told no lies',
          'Participants who refused to participate in the study'
        ],
        correctAnswer: 'Participants paid only $1 to tell the next person the task was fun and exciting',
        explanation: 'The $20 group had a strong external financial justification for lying ("I lied for $20"), so they experienced little dissonance. The $1 group lacked sufficient external justification, experiencing cognitive dissonance between their belief (the task was boring) and behavior (saying it was fun); to reduce dissonance, they shifted their private attitude to believe the task was genuinely interesting.',
        verificationBasis: 'Festinger and Carlsmith (1959) Cognitive Consequences of Forced Compliance.',
        requiresSpecialistReview: false
      },
      {
        question: 'When a car abruptly swerves in front of you on the highway, you immediately conclude, "That driver is an aggressive, reckless person," without considering that they might be rushing to an emergency hospital room. Which cognitive tendency does this illustrate?',
        options: [
          'The Fundamental Attribution Error',
          'The Halo Effect',
          'Pluralistic Ignorance',
          'Deindividuation'
        ],
        correctAnswer: 'The Fundamental Attribution Error',
        explanation: 'The Fundamental Attribution Error describes our tendency to attribute other people’s actions to internal character traits rather than external situational circumstances.',
        verificationBasis: 'Social perception and attribution theory.',
        requiresSpecialistReview: false
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'needs_review',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'needs_review',
      reviewReasons: [
        'specialist_review_replication_crisis: Social psychology has undergone major reassessments regarding the replication of classic studies, demand characteristics in Zimbardo’s prison simulation, and priming effects; specialist review is recommended to ensure curriculum alignment with modern critical historiography.'
      ],
      specialistReviewConcepts: [
        'Ethical and methodological critiques of the Stanford Prison Experiment (Le Texier 2019) and Milgram obedience variations.',
        'Modern open-science and replication crisis in social psychology.'
      ]
    }
  }
};

