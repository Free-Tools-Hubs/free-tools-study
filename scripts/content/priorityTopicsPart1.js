/**
 * Phase 2B — Remediated & Expanded Educational Content (Part 1: Topics 1–11)
 *
 * Covers:
 *  1. biology-cell-biology
 *  2. biology-evolution
 *  3. biology-genetics
 *  4. chemistry-organic-chemistry
 *  5. chemistry-periodic-table
 *  6. computer-science-algorithms
 *  7. computer-science-data-structures
 *  8. computer-science-machine-learning
 *  9. economics-macroeconomics
 * 10. economics-microeconomics
 * 11. history-ancient-egypt
 */

export const PRIORITY_TOPICS_PART_1 = {
  'biology-cell-biology': {
    description:
      'Examine the structural organization and molecular machinery of prokaryotic and eukaryotic cells, including organelle compartmentalization, phospholipid bilayer transport, ATP bioenergetics, and mitotic cell division.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Distinguish prokaryotic and eukaryotic cellular organization and identify structures unique to plant versus animal cells.',
      'Explain how mitochondria and chloroplasts transduce energy via cellular respiration and photosynthesis.',
      'Trace the endomembrane pathway of protein synthesis, folding, modification, and vesicular trafficking from the nucleus and ribosomes through the rough ER and Golgi apparatus.',
      'Compare passive diffusion, facilitated diffusion, osmosis, and primary active transport across selectively permeable phospholipid membranes.',
      'Describe the stages of the eukaryotic cell cycle and mitosis (prophase, metaphase, anaphase, telophase) that ensure accurate chromosome segregation.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 4 flashcards and 2 quiz questions verified against foundational cell biology principles (eukaryotic organelle functions, ATP synthesis, plant cell wall composition, and Golgi vesicular sorting).',
    additionalFlashcards: [
      {
        question: 'How does the fluid mosaic model describe the structure of the plasma membrane?',
        answer: 'A flexible amphipathic phospholipid bilayer with embedded integral and peripheral proteins, cholesterol (which buffers fluidity), and extracellular glycolipids/glycoproteins.',
        verificationBasis: 'Singer and Nicolson (1972) fluid mosaic membrane model and standard AP/undergraduate cell biology curriculum.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the functional difference between Rough Endoplasmic Reticulum (Rough ER) and Smooth Endoplasmic Reticulum (Smooth ER)?',
        answer: 'Rough ER is studded with cytosolic ribosomes that synthesize secreted and membrane-bound proteins; Smooth ER lacks ribosomes and synthesizes lipids, steroid hormones, and detoxifies metabolic byproducts.',
        verificationBasis: 'Eukaryotic endomembrane system compartmentalization in cell biology.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why do lysosomes maintain an acidic internal pH (~4.5–5.0)?',
        answer: 'Their hydrolytic enzymes (acid hydrolases) require an acidic environment to degrade macromolecules, which also protects the neutral cytosol (~pH 7.2) if a lysosome leaks.',
        verificationBasis: 'Vacuolar-type H+-ATPase proton pump mechanism and lysosomal acid hydrolase biochemistry.',
        requiresSpecialistReview: false
      },
      {
        question: 'What distinguishes primary active transport from facilitated diffusion across a cell membrane?',
        answer: 'Primary active transport moves solutes against their electrochemical gradient using direct ATP hydrolysis (e.g., Na+/K+-ATPase pump), whereas facilitated diffusion moves solutes down their concentration gradient via channels or carriers without ATP input.',
        verificationBasis: 'Thermodynamics of membrane transport and Na+/K+-ATPase stoichiometry (3 Na+ out, 2 K+ in per ATP).',
        requiresSpecialistReview: false
      },
      {
        question: 'What happens to an animal cell placed in a hypertonic extracellular solution?',
        answer: 'Water exits the cell via osmosis toward the higher extracellular solute concentration, causing the cell to shrivel (crenate).',
        verificationBasis: 'Osmotic tonicity principles across semipermeable biological membranes.',
        requiresSpecialistReview: false
      },
      {
        question: 'According to the endosymbiotic theory, what evidence supports the prokaryotic origin of mitochondria and chloroplasts?',
        answer: 'Both organelles possess double membranes, circular DNA lacking histones, 70S ribosomes similar to bacteria, and replicate independently via binary-like fission.',
        verificationBasis: 'Lynn Margulis endosymbiotic theory molecular and ultrastructural evidence.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'How does the sodium-potassium pump (Na+/K+-ATPase) maintain the resting electrochemical gradient of an animal cell?',
        options: [
          'It pumps 3 Na+ ions out of the cell and 2 K+ ions into the cell per ATP hydrolyzed',
          'It pumps 2 Na+ ions into the cell and 3 K+ ions out of the cell via facilitated diffusion',
          'It allows Na+ and K+ ions to flow down their concentration gradients through aquaporin channels',
          'It synthesizes ATP by transporting protons across the plasma membrane into the cytosol'
        ],
        correctAnswer: 'It pumps 3 Na+ ions out of the cell and 2 K+ ions into the cell per ATP hydrolyzed',
        explanation: 'The Na+/K+-ATPase is a primary active transporter that hydrolyzes one ATP molecule to export 3 Na+ ions and import 2 K+ ions against their respective electrochemical gradients.',
        verificationBasis: 'Skou Na+/K+-ATPase electrogenic stoichiometry.',
        requiresSpecialistReview: false
      },
      {
        question: 'A newly synthesized polypeptide destined for secretion into the extracellular space follows which intracellular trafficking sequence?',
        options: [
          'Rough ER -> transport vesicle -> Golgi apparatus -> secretory vesicle -> plasma membrane',
          'Smooth ER -> lysosome -> nucleus -> peroxisome -> plasma membrane',
          'Free cytosolic ribosome -> mitochondrion -> Golgi apparatus -> cell wall',
          'Nucleolus -> Rough ER -> central vacuole -> nuclear pore'
        ],
        correctAnswer: 'Rough ER -> transport vesicle -> Golgi apparatus -> secretory vesicle -> plasma membrane',
        explanation: 'Secreted proteins are co-translationally translocated into the Rough ER lumen, packaged into transport vesicles to the cis-Golgi, modified through the Golgi cisternae, and exported via secretory vesicles that fuse with the plasma membrane.',
        verificationBasis: 'Palade secretory pathway and endomembrane vesicular transport.',
        requiresSpecialistReview: false
      },
      {
        question: 'During which stage of mitosis do sister chromatids separate at their centromeres and move toward opposite spindle poles?',
        options: [
          'Anaphase',
          'Prophase',
          'Metaphase',
          'Telophase'
        ],
        correctAnswer: 'Anaphase',
        explanation: 'In anaphase, separase cleaves cohesin complexes holding sister chromatids together, and kinetochore microtubules shorten to pull the newly separated daughter chromosomes to opposite poles.',
        verificationBasis: 'Eukaryotic mitotic chromosome segregation stages.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which cellular structure is present in both prokaryotic bacteria and eukaryotic human cells?',
        options: [
          'Ribosomes',
          'Membrane-bound nucleus',
          'Mitochondria',
          'Endoplasmic reticulum'
        ],
        correctAnswer: 'Ribosomes',
        explanation: 'Both prokaryotes (70S ribosomes) and eukaryotes (80S cytosolic ribosomes) require ribosomes to translate mRNA into polypeptide chains, whereas prokaryotes lack membrane-bound organelles.',
        verificationBasis: 'Comparative cellular ultrastructure of prokaryotes and eukaryotes.',
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
        'Signal-peptide recognition particle (SRP) co-translational translocation mechanics for advanced MCAT/undergraduate biochemistry alignment.'
      ]
    }
  },

  'biology-evolution': {
    description:
      'Analyze the mechanisms driving evolutionary change in populations, including natural and artificial selection, genetic drift, gene flow, mutation, Hardy-Weinberg equilibrium, and allopatric versus sympatric speciation.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Compare natural selection, genetic drift, gene flow, and mutation as evolutionary mechanisms that alter allele frequencies in populations.',
      'Distinguish intentional human-directed artificial selection from autonomous natural evolutionary processes in wild populations.',
      'Apply the Hardy-Weinberg equilibrium equations (p + q = 1 and p² + 2pq + q² = 1) and identify the five assumptions required for genetic equilibrium.',
      'Differentiate homologous structures arising from shared ancestry (divergent evolution) and analogous structures arising from convergent evolution.',
      'Contrast allopatric and sympatric speciation and differentiate prezygotic from postzygotic reproductive isolation barriers.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards verified; original quiz question 1 editorially corrected to accurately distinguish human-directed artificial selection from autonomous natural evolutionary mechanisms without implying artificial selection does not alter allele frequencies.',
    editorialCorrections: {
      0: {
        originalQuestion: 'Which of the following is NOT a mechanism of evolution?',
        originalOptions: ['Natural selection', 'Genetic drift', 'Mutation', 'Artificial selection'],
        originalCorrectAnswer: 'Artificial selection',
        originalExplanation: 'Artificial selection is human-driven, not a natural evolutionary mechanism.',
        correctedQuestion:
          'Which of the following evolutionary processes is driven by intentional human selective breeding rather than operating as an autonomous natural mechanism of evolution in wild populations?',
        correctedOptions: ['Natural selection', 'Genetic drift', 'Mutation', 'Artificial selection'],
        correctedCorrectAnswer: 'Artificial selection',
        correctedExplanation:
          'Artificial selection causes genuine evolutionary change by altering allele frequencies across generations, but it is directed by intentional human breeding choices rather than operating as an autonomous natural mechanism of evolution (such as natural selection, genetic drift, mutation, or gene flow) in wild populations.',
        correctionReason:
          'Original question asked "Which of the following is NOT a mechanism of evolution?" which falsely implied that artificial selection cannot cause evolutionary change. Reworded to explicitly distinguish human-directed selective breeding from autonomous natural evolutionary mechanisms in wild populations.'
      }
    },
    additionalFlashcards: [
      {
        question: 'What does the Hardy-Weinberg principle state about allele and genotype frequencies in a population?',
        answer: 'In the absence of evolutionary influences (no mutation, random mating, no gene flow, infinite population size, and no selection), allele frequencies (p and q) and genotype frequencies (p², 2pq, q²) remain constant from generation to generation.',
        verificationBasis: 'Hardy (1908) and Weinberg (1908) population genetics equilibrium model.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between the bottleneck effect and the founder effect?',
        answer: 'Both are forms of genetic drift: a bottleneck occurs when a population size is drastically reduced by an environmental event, whereas the founder effect occurs when a small group colonizes a new habitat isolated from the source population.',
        verificationBasis: 'Population genetics sampling drift mechanisms.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do homologous structures differ from analogous structures?',
        answer: 'Homologous structures share an underlying anatomical origin inherited from a common ancestor (divergent evolution), whereas analogous structures perform similar functions in distantly related lineages due to similar environmental pressures (convergent evolution).',
        verificationBasis: 'Comparative evolutionary morphology and phylogenetics.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is gene flow (migration) and how does it affect genetic divergence between two populations?',
        answer: 'Gene flow is the transfer of alleles between populations through movement of fertile individuals or gametes; sustained gene flow reduces genetic divergence between populations.',
        verificationBasis: 'Population genetics migration-selection models.',
        requiresSpecialistReview: false
      },
      {
        question: 'What distinguishes allopatric speciation from sympatric speciation?',
        answer: 'Allopatric speciation occurs when populations become geographically isolated by a physical barrier, whereas sympatric speciation occurs within the same geographic area through mechanisms such as polyploidy, habitat differentiation, or sexual selection.',
        verificationBasis: 'Mayr biological species concept and geographic modes of speciation.',
        requiresSpecialistReview: false
      },
      {
        question: 'What are the three modes of natural selection on a quantitative polygenic trait?',
        answer: 'Directional selection (favors one extreme phenotype), stabilizing selection (favors intermediate phenotypes and reduces variance), and disruptive selection (favors both extreme phenotypes over intermediates).',
        verificationBasis: 'Quantitative genetics selection modes on phenotypic distributions.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is evolutionary fitness (relative fitness) in population genetics?',
        answer: 'An organism or genotype’s quantitative reproductive success—its relative contribution of fertile offspring to the next generation’s gene pool compared with other genotypes in the same environment.',
        verificationBasis: 'Modern evolutionary synthesis definition of Darwinian relative fitness (w).',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'In a population in Hardy-Weinberg equilibrium, the frequency of the recessive allele (q) for a biallelic trait is 0.30. What is the expected frequency of heterozygous carriers (2pq)?',
        options: [
          '0.42',
          '0.09',
          '0.49',
          '0.70'
        ],
        correctAnswer: '0.42',
        explanation: 'Since p + q = 1 and q = 0.30, the dominant allele frequency is p = 0.70. The heterozygous genotype frequency is 2pq = 2 × 0.70 × 0.30 = 0.42 (42%).',
        verificationBasis: 'Exact algebraic evaluation of Hardy-Weinberg binomial expansion (p + q)² = p² + 2pq + q² = 1.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which phenomenon occurs when a volcanic eruption randomly eliminates 95% of an island lizard population, leaving survivors whose allele frequencies differ markedly from the pre-eruption population?',
        options: [
          'Population bottleneck (genetic drift)',
          'Directional natural selection',
          'Assortative sexual selection',
          'Sympatric polyploid speciation'
        ],
        correctAnswer: 'Population bottleneck (genetic drift)',
        explanation: 'A sudden, indiscriminate demographic contraction causes random sampling changes in allele frequencies known as the bottleneck effect, a form of genetic drift.',
        verificationBasis: 'Wright-Fisher genetic drift under severe demographic bottleneck.',
        requiresSpecialistReview: false
      },
      {
        question: 'The forelimb bones of humans, bats, whales, and cats share the same arrangement of humerus, radius, ulna, carpals, and phalanges despite serving different functions. What does this illustrate?',
        options: [
          'Homologous structures resulting from divergent evolution from a common tetrapod ancestor',
          'Analogous structures resulting from convergent evolution in similar habitats',
          'Vestigial structures that no longer serve any physiological role',
          'Lamarckian inheritance of acquired somatic characteristics'
        ],
        correctAnswer: 'Homologous structures resulting from divergent evolution from a common tetrapod ancestor',
        explanation: 'Shared underlying skeletal architecture across functionally diverse tetrapod limbs is a classic example of homology inherited and modified from a common ancestor.',
        verificationBasis: 'Owen/Darwin comparative vertebrate osteology and homology.',
        requiresSpecialistReview: false
      },
      {
        question: 'Human birth weight exhibits lower neonatal mortality near the intermediate average weight (~3.2–3.5 kg) and higher mortality at both very low and very high birth weights. Which mode of selection does this represent?',
        options: [
          'Stabilizing selection',
          'Directional selection',
          'Disruptive (diversifying) selection',
          'Frequency-dependent selection'
        ],
        correctAnswer: 'Stabilizing selection',
        explanation: 'Stabilizing selection favors intermediate phenotypes and selects against individuals at both extremes of a trait distribution, reducing phenotypic variance.',
        verificationBasis: 'Karn and Penrose (1951) classic human birth-weight stabilizing selection study.',
        requiresSpecialistReview: false
      },
      {
        question: 'Two closely related frog species inhabit the same pond, but one breeds exclusively in early March and the other breeds in late May. Which reproductive isolating mechanism prevents hybridization?',
        options: [
          'Temporal isolation (a prezygotic barrier)',
          'Hybrid sterility (a postzygotic barrier)',
          'Mechanical incompatibility (a prezygotic barrier)',
          'Hybrid breakdown (a postzygotic barrier)'
        ],
        correctAnswer: 'Temporal isolation (a prezygotic barrier)',
        explanation: 'Temporal isolation is a prezygotic reproductive barrier in which species breed during different times of day, seasons, or years, preventing gamete fusion.',
        verificationBasis: 'Dobzhansky-Mayr classification of prezygotic vs postzygotic isolating barriers.',
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
        'Neutral theory of molecular evolution (Kimura) and effective population size (Ne) derivations for advanced undergraduate/graduate expansion.'
      ]
    }
  },

  'biology-genetics': {
    description:
      'Master transmission and molecular genetics, from Mendel’s laws of segregation and independent assortment to non-Mendelian inheritance patterns, DNA replication, transcription, translation, and gene regulation.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Apply Mendel’s law of segregation and law of independent assortment to predict genotypic and phenotypic ratios in monohybrid and dihybrid crosses.',
      'Distinguish incomplete dominance, codominance, multiple alleles, pleiotropy, epistasis, and X-linked inheritance from simple complete dominance.',
      'Explain the enzymatic steps of semiconservative DNA replication, including helicase, primase, DNA polymerase III,DNA ligase, and Okazaki fragments.',
      'Trace the flow of genetic information in the central dogma from DNA transcription into mRNA (including eukaryotic splicing) to ribosomal translation into polypeptides.',
      'Analyze how point mutations (silent, missense, nonsense) and frameshift insertions/deletions alter protein structure and function.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 4 flashcards and 1 quiz question verified against Mendelian inheritance principles and Crick’s central dogma of molecular biology.',
    additionalFlashcards: [
      {
        question: 'What is the difference between Mendel’s Law of Segregation and Law of Independent Assortment?',
        answer: 'The Law of Segregation states that the two alleles for a single gene separate during gamete formation (anaphase I of meiosis); the Law of Independent Assortment states that alleles of different unlinked genes assort independently of one another during metaphase I.',
        verificationBasis: 'Mendelian transmission genetics and meiotic chromosome behavior.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does incomplete dominance differ from codominance?',
        answer: 'In incomplete dominance, the heterozygote exhibits an intermediate blended phenotype (e.g., red × white snapdragons producing pink flowers); in codominance, both alleles are fully and simultaneously expressed in the heterozygote (e.g., human AB blood group expressing both IA and IB antigens).',
        verificationBasis: 'Non-Mendelian allelic dominance relationships.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why is DNA replication described as semiconservative, and why does it form a lagging strand?',
        answer: 'Each daughter DNA double helix retains one parental strand and one newly synthesized strand. Because DNA polymerase can only synthesize in the 5\' -> 3\' direction and the two template strands are antiparallel, the lagging strand must be synthesized discontinuously as Okazaki fragments.',
        verificationBasis: 'Meselson-Stahl (1958) experiment and antiparallel DNA polymerase III biochemistry.',
        requiresSpecialistReview: false
      },
      {
        question: 'What post-transcriptional modifications occur to eukaryotic pre-mRNA before it exits the nucleus?',
        answer: 'Addition of a 5\' 7-methylguanosine cap, removal of non-coding introns and splicing together of coding exons by the spliceosome, and addition of a 3\' poly-A tail.',
        verificationBasis: 'Eukaryotic mRNA processing and spliceosome molecular biology.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why do X-linked recessive traits appear more frequently in human males (XY) than in females (XX)?',
        answer: 'Males are hemizygous for most X-chromosome genes (having only one X chromosome), so a single recessive allele on the X chromosome is expressed phenotypically, whereas females must inherit two copies of the recessive allele.',
        verificationBasis: 'Sex-linked chromosomal inheritance in XY mammals.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between a missense mutation, a nonsense mutation, and a frameshift mutation?',
        answer: 'A missense mutation substitutes one amino acid for another; a nonsense mutation converts an amino-acid codon into a premature stop codon (UAA, UAG, UGA); a frameshift mutation inserts or deletes a non-multiple of 3 nucleotides, shifting the entire downstream reading frame.',
        verificationBasis: 'Genetic code triplet reading frame and point/indel mutation classification.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'In a dihybrid cross between two organisms heterozygous for two unlinked genes showing complete dominance (AaBb × AaBb), what is the expected phenotypic ratio among the offspring?',
        options: [
          '9:3:3:1',
          '3:1',
          '1:2:1',
          '1:1:1:1'
        ],
        correctAnswer: '9:3:3:1',
        explanation: 'For two independently assorting genes with complete dominance, each single trait follows a 3:1 phenotypic ratio, so their combined product is (3:1) × (3:1) = 9 (A_B_) : 3 (A_bb) : 3 (aaB_) : 1 (aabb).',
        verificationBasis: 'Mendelian dihybrid independent assortment probability rule.',
        requiresSpecialistReview: false
      },
      {
        question: 'A template strand of DNA has the sequence 3\'-TAC GGC TTA ACT-5\'. What is the corresponding mRNA sequence transcribed from this template?',
        options: [
          '5\'-AUG CCG AAU UGA-3\'',
          '5\'-ATG CCG AAT TGA-3\'',
          '5\'-UAC GGC UUA ACU-3\'',
          '3\'-AUG CCG AAU UGA-5\''
        ],
        correctAnswer: '5\'-AUG CCG AAU UGA-3\'',
        explanation: 'RNA polymerase reads the DNA template strand 3\' -> 5\' and synthesizes complementary RNA 5\' -> 3\', pairing A with U (instead of T), T with A, C with G, and G with C.',
        verificationBasis: 'Watson-Crick base-pairing rules in DNA-dependent RNA transcription.',
        requiresSpecialistReview: false
      },
      {
        question: 'In the human ABO blood group system, a parent with blood type AB (genotype IAIB) and a parent with blood type O (genotype ii) have a child. What are the possible blood types of their biological child?',
        options: [
          'Type A or Type B only (50% probability each)',
          'Type AB or Type O only (50% probability each)',
          'Type A, Type B, or Type AB',
          'Type A, Type B, Type AB, or Type O'
        ],
        correctAnswer: 'Type A or Type B only (50% probability each)',
        explanation: 'Crossing IAIB × ii yields 50% IAi (Type A) and 50% IBi (Type B); neither Type AB (IAIB) nor Type O (ii) can result because one parent contributes only i and the other contributes either IA or IB.',
        verificationBasis: 'Multiple-allele and codominance inheritance of the ABO locus.',
        requiresSpecialistReview: false
      },
      {
        question: 'During prokaryotic DNA replication, which enzyme relieves torsional strain ahead of the replication fork, and which enzyme seals nicks in the sugar-phosphate backbone between Okazaki fragments?',
        options: [
          'Topoisomerase (DNA gyrase) relieves torsional strain; DNA ligase seals backbone nicks',
          'Helicase relieves torsional strain; RNA primase seals backbone nicks',
          'DNA polymerase I relieves torsional strain; helicase seals backbone nicks',
          'Single-strand binding protein relieves torsional strain; telomerase seals backbone nicks'
        ],
        correctAnswer: 'Topoisomerase (DNA gyrase) relieves torsional strain; DNA ligase seals backbone nicks',
        explanation: 'Topoisomerase prevents supercoiling ahead of the unwinding helicase fork, while DNA ligase catalyzes phosphodiester bond formation to join adjacent Okazaki fragments after RNA primers are replaced.',
        verificationBasis: 'Prokaryotic replisome enzymology.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which genetic phenomenon occurs when the expression of one gene masks or modifies the phenotypic expression of a completely separate gene at a different locus (such as coat color deposition in Labrador retrievers)?',
        options: [
          'Epistasis',
          'Pleiotropy',
          'Codominance',
          'Genomic imprinting'
        ],
        correctAnswer: 'Epistasis',
        explanation: 'Epistasis is a gene-gene interaction in which the alleles at one locus (e.g., the MC1R extension locus in Labradors resulting in yellow coat e/e) mask the phenotypic effect of alleles at a second locus (TYRP1 black/chocolate B/b).',
        verificationBasis: 'Classical genetic epistasis vs pleiotropy definitions.',
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
        'Prokaryotic operon regulation (lac and trp operons) and eukaryotic epigenetic chromatin remodeling for upper-level genetics modules.'
      ]
    }
  },

  'chemistry-organic-chemistry': {
    description:
      'Study carbon-based molecular structure, sp³/sp²/sp orbital hybridization, IUPAC nomenclature, functional group reactivity, stereochemistry (chirality and cis-trans isomerism), and nucleophilic substitution and elimination mechanisms.',
    difficulty: 'Advanced',
    estimatedTime: '30 minutes',
    learningObjectives: [
      'Identify major organic functional groups (alkanes, alkenes, alkynes, alcohols, aldehydes, ketones, carboxylic acids, esters, amines, amides) and apply systematic IUPAC nomenclature.',
      'Relate carbon orbital hybridization (sp³, sp², sp) to bond angles, bond lengths, and sigma (σ) versus pi (π) bonding.',
      'Distinguish constitutional (structural) isomers, geometric (cis/trans or E/Z) diastereomers, and chiral enantiomers using Cahn-Ingold-Prelog priority rules.',
      'Compare concerted SN2 and stepwise carbocation-mediated SN1 nucleophilic substitution reaction mechanisms, stereochemical outcomes, and kinetics.',
      'Analyze how inductive effects and resonance delocalization stabilize reaction intermediates and influence organic Brønsted-Lowry acidity.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'College', 'Exam Prep', 'Final Review',
      'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'MCAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards verified; original quiz question 1 editorially corrected to explicitly test the preferred IUPAC name of branched isobutane (2-methylpropane) with unambiguous distractors.',
    editorialCorrections: {
      0: {
        originalQuestion: 'Which compound is an isomer of butane?',
        originalOptions: ['n-Butane', 'Isobutane', 'Propane', 'Pentane'],
        originalCorrectAnswer: 'Isobutane',
        originalExplanation: 'Both have formula C₄H₁₀ but different structures.',
        correctedQuestion:
          'What is the preferred IUPAC name for branched isobutane, the constitutional isomer of unbranched butane (C₄H₁₀)?',
        correctedOptions: ['2-methylpropane', 'butan-2-ol', '2-methylbutane', 'cyclobutane'],
        correctedCorrectAnswer: '2-methylpropane',
        correctedExplanation:
          'Isobutane and unbranched butane (n-butane) are constitutional (structural) isomers sharing the molecular formula C₄H₁₀. Unbranched butane has a continuous four-carbon chain, whereas branched isobutane has a three-carbon principal chain with a methyl substituent at carbon-2, giving the preferred IUPAC name 2-methylpropane.',
        correctionReason:
          'Original question asked "Which compound is an isomer of butane?" with both "n-Butane" and "Isobutane" as options. Under IUPAC rules, unmodified "butane" denotes unbranched n-butane, and the question used trivial naming. Updated to ask for the preferred IUPAC name (2-methylpropane) with unambiguous distractors.'
      }
    },
    additionalFlashcards: [
      {
        question: 'What are the carbon orbital hybridizations and ideal bond angles in ethane (C₂H₆), ethene (C₂H₄), and ethyne (C₂H₂)?',
        answer: 'Ethane has sp³-hybridized carbons with tetrahedral ~109.5° bond angles; ethene has sp²-hybridized carbons with trigonal planar ~120° bond angles; ethyne has sp-hybridized carbons with linear 180° bond angles.',
        verificationBasis: 'Valence bond hybridization and VSEPR geometry of carbon.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the structural difference between an aldehyde and a ketone?',
        answer: 'Both contain a carbonyl group (C=O), but in an aldehyde the carbonyl carbon is bonded to at least one hydrogen atom (R–CHO, terminal), whereas in a ketone the carbonyl carbon is bonded to two carbon groups (R–CO–R\', internal).',
        verificationBasis: 'IUPAC functional group definitions for carbonyl compounds.',
        requiresSpecialistReview: false
      },
      {
        question: 'What makes a carbon atom an asymmetric chiral center (stereocenter), and what are enantiomers?',
        answer: 'A tetrahedral sp³ carbon bonded to four different groups is a chiral center; enantiomers are stereoisomers that are non-superimposable mirror images of each other.',
        verificationBasis: 'IUPAC stereochemistry terminology and tetrahedral chirality.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do the rate laws and stereochemical outcomes of SN2 and SN1 reactions differ?',
        answer: 'SN2 is a concerted bimolecular reaction (Rate = k[substrate][nucleophile]) that proceeds with 100% inversion of configuration (Walden inversion); SN1 is a two-step unimolecular reaction via a planar carbocation intermediate (Rate = k[substrate]) that yields racemization (both retention and inversion).',
        verificationBasis: 'Ingold-Hughes nucleophilic aliphatic substitution kinetics and stereochemistry.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why are carboxylic acids (R–COOH, pKa ~4–5) vastly more acidic than alcohols (R–OH, pKa ~16)?',
        answer: 'Deprotonation of a carboxylic acid yields a carboxylate anion (R–COO⁻) whose negative charge is delocalized equally over two electronegative oxygen atoms via resonance stabilization, whereas an alkoxide ion (R–O⁻) has its negative charge localized on a single oxygen.',
        verificationBasis: 'Conjugate-base resonance stabilization and organic pKa trends.',
        requiresSpecialistReview: false
      },
      {
        question: 'What does Markovnikov’s rule state for the hydrohalogenation of an unsymmetrical alkene?',
        answer: 'In the addition of HX to an unsymmetrical alkene, the hydrogen atom bonds to the alkene carbon with more hydrogen substituents so that the halide bonds to the more substituted carbon, passing through the more stable carbocation intermediate.',
        verificationBasis: 'Regioselectivity of electrophilic alkene addition and carbocation hyperconjugation stability (3° > 2° > 1°).',
        requiresSpecialistReview: false
      },
      {
        question: 'According to Hückel’s rule, what four criteria must a molecule satisfy to be aromatic?',
        answer: 'It must be cyclic, fully conjugated (every ring atom has an unhybridized p orbital), planar, and contain (4n + 2) π electrons (where n = 0, 1, 2, ...; e.g., 6 π electrons in benzene).',
        verificationBasis: 'Hückel molecular orbital theory of aromaticity.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'How many sigma (σ) bonds and pi (π) bonds are present in one molecule of ethene (CH₂=CH₂)?',
        options: [
          '5 σ bonds and 1 π bond',
          '4 σ bonds and 2 π bonds',
          '6 σ bonds and 0 π bonds',
          '5 σ bonds and 2 π bonds'
        ],
        correctAnswer: '5 σ bonds and 1 π bond',
        explanation: 'Ethene has four C–H single bonds (4 σ bonds) and one C=C double bond consisting of one head-on σ bond and one side-by-side π bond, totaling 5 σ bonds and 1 π bond.',
        verificationBasis: 'Valence bond count of C2H4.',
        requiresSpecialistReview: false
      },
      {
        question: 'When (R)-2-bromobutane reacts with sodium hydroxide (NaOH) in a polar aprotic solvent (DMSO) via a concerted SN2 mechanism, what is the major stereochemical product?',
        options: [
          '(S)-butan-2-ol (complete inversion of configuration)',
          '(R)-butan-2-ol (complete retention of configuration)',
          'An equimolar racemic mixture of (R)-butan-2-ol and (S)-butan-2-ol',
          '2-methylpropan-2-ol via hydride shift rearrangement'
        ],
        correctAnswer: '(S)-butan-2-ol (complete inversion of configuration)',
        explanation: 'An SN2 reaction proceeds via backside nucleophilic attack concerted with leaving-group departure, inverting the stereocenter from (R)-2-bromobutane to (S)-butan-2-ol.',
        verificationBasis: 'Walden inversion in concerted SN2 reactions at a secondary stereocenter.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which order correctly ranks carbocation intermediates from MOST stable to LEAST stable in solution?',
        options: [
          'Tertiary (3°) > Secondary (2°) > Primary (1°) > Methyl',
          'Methyl > Primary (1°) > Secondary (2°) > Tertiary (3°)',
          'Primary (1°) > Tertiary (3°) > Secondary (2°) > Methyl',
          'Secondary (2°) > Tertiary (3°) > Methyl > Primary (1°)'
        ],
        correctAnswer: 'Tertiary (3°) > Secondary (2°) > Primary (1°) > Methyl',
        explanation: 'Alkyl substituents stabilize an electron-deficient carbocation carbon through hyperconjugation (donation of electron density from adjacent C–H/C–C σ bonds into the empty p orbital) and inductive electron donation.',
        verificationBasis: 'Hyperconjugation and inductive stabilization of alkyl carbocations.',
        requiresSpecialistReview: false
      },
      {
        question: 'What functional group is formed when a carboxylic acid reacts with an alcohol in the presence of an acid catalyst with loss of water (Fischer esterification)?',
        options: [
          'Ester (R–COOR\')',
          'Amide (R–CONHR\')',
          'Ether (R–O–R\')',
          'Ketone (R–CO–R\')'
        ],
        correctAnswer: 'Ester (R–COOR\')',
        explanation: 'Fischer esterification is an acid-catalyzed nucleophilic acyl substitution in which an alcohol condenses with a carboxylic acid to yield an ester (R–COOR\') and water (H₂O).',
        verificationBasis: 'Fischer esterification condensation stoichiometry.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why is trifluoroacetic acid (CF₃COOH, pKa ≈ 0.2) a much stronger acid than acetic acid (CH₃COOH, pKa ≈ 4.76)?',
        options: [
          'The three strongly electronegative fluorine atoms withdraw electron density inductively, stabilizing the conjugate base (CF₃COO⁻)',
          'Fluorine donates lone-pair electrons into the carbonyl carbon by resonance, destabilizing the neutral acid',
          'The C–F bond is weaker than the O–H bond and dissociates first in aqueous solution',
          'Trifluoroacetate forms an aromatic 6 π-electron ring after deprotonation'
        ],
        correctAnswer: 'The three strongly electronegative fluorine atoms withdraw electron density inductively, stabilizing the conjugate base (CF₃COO⁻)',
        explanation: 'The strong σ-inductive electron withdrawal of the –CF₃ group delocalizes negative charge away from the carboxylate group in CF₃COO⁻, greatly stabilizing the conjugate base and lowering pKa.',
        verificationBasis: 'Inductive substituent effects on carboxylic acid pKa.',
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
        'E1/E2 Zaitsev vs Hofmann regioselectivity and anti-periplanar transition state geometry for advanced organic chemistry modules.'
      ]
    }
  },

  'chemistry-periodic-table': {
    description:
      'Explore periodic law, electron configurations across s-, p-, d-, and f-blocks, valence shell structure, chemical families (alkali metals, alkaline earth metals, halogens, noble gases), and periodic trends in atomic radius, ionization energy, and electronegativity.',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    learningObjectives: [
      'Relate an element’s atomic number (Z), ground-state electron configuration, and valence electrons to its period and group position on the periodic table.',
      'Compare the physical and chemical reactivity properties of major periodic families: alkali metals (Group 1), alkaline earth metals (Group 2), transition metals (Groups 3–12), halogens (Group 17), and noble gases (Group 18).',
      'Explain how effective nuclear charge (Z_eff) and principal quantum shell (n) govern periodic trends in atomic radius and ionic radius.',
      'Predict first ionization energy and Pauling electronegativity trends across a period and down a group, including s/p subshell and spin-pairing exceptions.',
      'Classify elements as metals, metalloids, or nonmetals and predict the charges of their monatomic ions.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'MCAT', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 4 flashcards and 1 quiz question verified against IUPAC Periodic Table of the Elements conventions (atomic numbers of C and H, period/group definitions, and Group 18 noble gases).',
    additionalFlashcards: [
      {
        question: 'How does atomic radius change across a period from left to right and down a group from top to bottom, and why?',
        answer: 'Atomic radius decreases from left to right across a period because increasing effective nuclear charge (Z_eff) pulls valence electrons closer to the nucleus; it increases down a group because valence electrons occupy higher principal energy levels (n) with greater inner-shell shielding.',
        verificationBasis: 'Slater’s rules, effective nuclear charge (Z_eff = Z - S), and Coulombic attraction.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is first ionization energy, and how does it trend across the periodic table?',
        answer: 'First ionization energy is the minimum energy required to remove one mole of the most loosely bound electrons from one mole of gaseous ground-state atoms (X(g) -> X⁺(g) + e⁻). It generally increases from left to right across a period and decreases down a group.',
        verificationBasis: 'IUPAC definition of ionization energy and periodic trends.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is electronegativity, and which element has the highest Pauling electronegativity?',
        answer: 'Electronegativity is the relative ability of a bonded atom to attract shared electrons toward itself in a covalent bond. Fluorine (F) is the most electronegative element (4.0 on the Pauling scale).',
        verificationBasis: 'Pauling electronegativity scale.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why are Group 1 alkali metals (such as Na and K) extremely reactive and stored under mineral oil?',
        answer: 'Alkali metals have a single valence electron in an ns¹ configuration with a very low first ionization energy; they rapidly lose this electron to form +1 cations, reacting vigorously with water and atmospheric oxygen.',
        verificationBasis: 'Group 1 alkali metal valence configuration and redox reactivity.',
        requiresSpecialistReview: false
      },
      {
        question: 'What are metalloids (semimetals), and where are they located on the periodic table?',
        answer: 'Metalloids (such as B, Si, Ge, As, Sb, Te) lie along the diagonal staircase boundary separating metals and nonmetals; they exhibit intermediate electrical conductivity making them essential semiconductors.',
        verificationBasis: 'Periodic classification of metals, metalloids, and nonmetals.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does the radius of a cation compare to its neutral parent atom, and how does an anion compare to its neutral parent atom?',
        answer: 'A cation (e.g., Na⁺) is smaller than its neutral parent atom because losing valence electrons often empties the outer shell and reduces electron-electron repulsion; an anion (e.g., Cl⁻) is larger than its parent atom because added electrons increase electron-electron repulsion.',
        verificationBasis: 'Ionic radius vs atomic radius trends and isoelectronic series.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'Which of the following isoelectronic ions (each containing 10 electrons with configuration 1s²2s²2p⁶) has the SMALLEST ionic radius?',
        options: [
          'Mg²⁺ (Z = 12)',
          'Na⁺ (Z = 11)',
          'F⁻ (Z = 9)',
          'O²⁻ (Z = 8)'
        ],
        correctAnswer: 'Mg²⁺ (Z = 12)',
        explanation: 'In an isoelectronic series where all ions have the same number of electrons (10 e⁻), ionic radius decreases as nuclear charge (number of protons, Z) increases because a stronger nuclear attraction pulls the electron cloud inward. Mg²⁺ (Z = 12) has the highest nuclear charge and smallest radius.',
        verificationBasis: 'Isoelectronic ionic radius dependence on nuclear charge Z.',
        requiresSpecialistReview: false
      },
      {
        question: 'An element has the ground-state electron configuration [Ar] 4s² 3d¹⁰ 4p⁵. To which period and group (family) of the periodic table does this element belong?',
        options: [
          'Period 4, Group 17 (Halogens — Bromine)',
          'Period 3, Group 17 (Halogens — Chlorine)',
          'Period 4, Group 15 (Pnictogens — Arsenic)',
          'Period 4, Group 18 (Noble Gases — Krypton)'
        ],
        correctAnswer: 'Period 4, Group 17 (Halogens — Bromine)',
        explanation: 'The highest principal quantum number n = 4 places the element in Period 4, and the 7 valence electrons in the outer s and p subshells (4s²4p⁵) place it in Group 17 (Halogens), corresponding to Bromine (Z = 35).',
        verificationBasis: 'Aufbau electron configuration mapping to IUPAC period and group numbers.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why is the first ionization energy of Oxygen (1s²2s²2p⁴) slightly LOWER than that of Nitrogen (1s²2s²2p³), despite Oxygen lying to the right of Nitrogen in Period 2?',
        options: [
          'Oxygen has a paired electron in one of its 2p orbitals, creating electron-electron repulsion that makes removing that fourth 2p electron easier than disrupting Nitrogen’s half-filled 2p³ subshell',
          'Oxygen has a larger atomic radius and more inner core shells shielding the nucleus than Nitrogen',
          'Nitrogen has a completely filled 2p⁶ octet that resists ionization',
          'Oxygen’s valence electron is located in the 3s subshell rather than the 2p subshell'
        ],
        correctAnswer: 'Oxygen has a paired electron in one of its 2p orbitals, creating electron-electron repulsion that makes removing that fourth 2p electron easier than disrupting Nitrogen’s half-filled 2p³ subshell',
        explanation: 'According to Hund’s rule, Nitrogen (2p³) has one electron in each of the three 2p orbitals (half-filled stability), whereas Oxygen (2p⁴) must pair two electrons in a single 2p orbital, introducing spin-pairing repulsion that slightly lowers its first ionization energy.',
        verificationBasis: 'Group 15 vs Group 16 first ionization energy anomaly and Hund’s rule.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which statement accurately describes the reactivity trends of Group 1 (alkali metals) and Group 17 (halogens) as you move DOWN each group?',
        options: [
          'Alkali metal reactivity increases down Group 1, whereas halogen reactivity decreases down Group 17',
          'Both alkali metal reactivity and halogen reactivity increase down their respective groups',
          'Alkali metal reactivity decreases down Group 1, whereas halogen reactivity increases down Group 17',
          'Both alkali metal reactivity and halogen reactivity decrease down their respective groups'
        ],
        correctAnswer: 'Alkali metal reactivity increases down Group 1, whereas halogen reactivity decreases down Group 17',
        explanation: 'Alkali metals react by losing their single valence electron, which becomes easier down Group 1 as ionization energy decreases (Cs > K > Na > Li). Halogens react by gaining an electron to complete their valence p subshell, which becomes less favorable down Group 17 as atomic radius and shielding increase (F₂ > Cl₂ > Br₂ > I₂).',
        verificationBasis: 'Periodic redox reactivity trends of Group 1 metals vs Group 17 nonmetals.',
        requiresSpecialistReview: false
      },
      {
        question: 'Successive ionization energies (in kJ/mol) for a Period 3 element are: IE₁ = 578, IE₂ = 1,817, IE₃ = 2,745, IE₄ = 11,577, IE₅ = 14,842. Which element do these values represent?',
        options: [
          'Aluminum (Al, Group 13, 3 valence electrons)',
          'Magnesium (Mg, Group 2, 2 valence electrons)',
          'Silicon (Si, Group 14, 4 valence electrons)',
          'Sodium (Na, Group 1, 1 valence electron)'
        ],
        correctAnswer: 'Aluminum (Al, Group 13, 3 valence electrons)',
        explanation: 'The massive jump occurs between IE₃ (2,745 kJ/mol) and IE₄ (11,577 kJ/mol), indicating that the fourth electron is being removed from a stable inner noble-gas core ([Ne]). Thus, the element has 3 valence electrons: Aluminum (Al, [Ne] 3s²3p¹).',
        verificationBasis: 'NIST successive ionization energies of Period 3 elements (Al: 577.5, 1816.7, 2744.8, 11577 kJ/mol).',
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
        'Lanthanide contraction and relativistic orbital effects in heavy d- and f-block elements for advanced inorganic courses.'
      ]
    }
  },

  'computer-science-algorithms': {
    description:
      'Analyze algorithmic design paradigms, asymptotic time and space complexity (Big-O, Big-Omega, Big-Theta), comparison and non-comparison sorting, binary search, graph traversal (BFS, DFS, Dijkstra’s algorithm), greedy strategies, and dynamic programming.',
    difficulty: 'Intermediate',
    estimatedTime: '30 minutes',
    learningObjectives: [
      'Evaluate asymptotic time and space complexity using Big-O, Big-Omega (Ω), and Big-Theta (Θ) notation and solve divide-and-conquer recurrences.',
      'Compare the average-case, worst-case, space complexity, and stability of MergeSort, QuickSort, HeapSort, and Insertion Sort.',
      'Trace Breadth-First Search (BFS), Depth-First Search (DFS), topological sorting, and Dijkstra’s shortest-path algorithm on directed and undirected graphs.',
      'Distinguish when an optimization problem requires Dynamic Programming (overlapping subproblems and optimal substructure) versus a Greedy strategy.',
      'Apply binary search and two-pointer techniques to sorted collections and analyze why comparison-based sorting has an Ω(n log n) lower bound.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'SAT', 'Undergraduate', 'Vocational'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (QuickSort average complexity O(n log n), Binary Search definition, Big O notation definition) and 1 quiz question (BFS Queue FIFO structure) recovered verbatim from scripts/seedData.js realContentMap["computer-science-algorithms"] (lines 76–85).',
    additionalFlashcards: [
      {
        question: 'What is the worst-case time complexity of QuickSort, when does it occur, and how is it mitigated?',
        answer: 'O(n²), which occurs when the chosen pivot repeatedly partitions an n-element array into sizes 0 and n - 1 (e.g., selecting the first/last element on an already sorted array). It is mitigated using randomized pivot selection or median-of-three partitioning.',
        verificationBasis: 'Hoare QuickSort recurrence T(n) = T(n-1) + Θ(n) = Θ(n²) vs randomized expected O(n log n).',
        requiresSpecialistReview: false
      },
      {
        question: 'How does MergeSort work, and what are its time complexity, space complexity, and stability properties?',
        answer: 'MergeSort is a divide-and-conquer algorithm that recursively splits an array in half, sorts each half, and merges them in linear time. It guarantees Θ(n log n) time complexity in best, average, and worst cases, requires O(n) auxiliary space, and is a stable sort.',
        verificationBasis: 'MergeSort recurrence T(n) = 2T(n/2) + Θ(n) = Θ(n log n) by Master Theorem.',
        requiresSpecialistReview: false
      },
      {
        question: 'What two properties must an optimization problem exhibit to be solved effectively using Dynamic Programming (DP)?',
        answer: 'Optimal substructure (an optimal solution to the problem contains optimal solutions to subproblems) and overlapping subproblems (the recursive solution recomputes the same subproblems repeatedly, allowing memoization or bottom-up tabulation).',
        verificationBasis: 'Bellman dynamic programming optimality principle (CLRS Chapter 14).',
        requiresSpecialistReview: false
      },
      {
        question: 'What is Dijkstra’s algorithm used for, and why does it fail on graphs with negative-weight edges?',
        answer: 'Dijkstra’s algorithm finds shortest paths from a single source vertex to all other vertices in a graph with non-negative edge weights. It fails with negative edge weights because its greedy assumption—that once a vertex with minimum tentative distance is extracted from the priority queue, its shortest path is final—can be violated by a subsequent negative edge.',
        verificationBasis: 'Dijkstra (1959) single-source shortest path correctness invariant vs Bellman-Ford.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between Big-O, Big-Omega (Ω), and Big-Theta (Θ) asymptotic notation?',
        answer: 'Big-O provides an asymptotic upper bound (f(n) ≤ c·g(n)), Big-Omega (Ω) provides an asymptotic lower bound (f(n) ≥ c·g(n)), and Big-Theta (Θ) provides a tight asymptotic bound when a function is bounded both above and below by g(n).',
        verificationBasis: 'Knuth (1976) formal asymptotic notation definitions.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why does any comparison-based sorting algorithm require Ω(n log n) comparisons in the worst case?',
        answer: 'A decision tree modeling comparisons among n elements must have at least n! leaves (one for each possible permutation). A binary tree of height h has at most 2^h leaves, so 2^h ≥ n!, which by Stirling’s approximation gives h ≥ log₂(n!) = Ω(n log n).',
        verificationBasis: 'Information-theoretic decision-tree lower bound for comparison sorting.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does Depth-First Search (DFS) differ from Breadth-First Search (BFS) in traversal order and underlying data structure?',
        answer: 'DFS explores as deep as possible along each branch before backtracking using a LIFO Stack (or recursion) in O(V + E) time, whereas BFS explores vertices in concentric layers of edge distance using a FIFO Queue in O(V + E) time.',
        verificationBasis: 'Tarjan/CLRS graph traversal complexity and data structure invariants.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'An array of 1,024 sorted integers is searched using Binary Search. In the worst case, approximately how many element comparisons are needed to determine that a target value is not present?',
        options: [
          'Around 10 to 11 comparisons (⌊log₂(1024)⌋ + 1 = 11)',
          'Around 512 comparisons (n / 2)',
          'Exactly 1,024 comparisons (n)',
          'Around 32 comparisons (√n)'
        ],
        correctAnswer: 'Around 10 to 11 comparisons (⌊log₂(1024)⌋ + 1 = 11)',
        explanation: 'Binary search halves the remaining search interval on each comparison. Since 1,024 = 2¹⁰, at most ⌊log₂(1024)⌋ + 1 = 11 comparisons are required in the worst case.',
        verificationBasis: 'Binary search logarithmic recurrence T(n) = T(n/2) + 1.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which sorting algorithm guarantees O(n log n) worst-case time complexity while sorting in-place with O(1) auxiliary extra space (excluding input storage)?',
        options: [
          'HeapSort',
          'MergeSort',
          'Standard QuickSort',
          'Insertion Sort'
        ],
        correctAnswer: 'HeapSort',
        explanation: 'HeapSort builds a max-heap in O(n) time and repeatedly extracts the maximum in O(log n) time across n elements, achieving O(n log n) worst-case time in-place with O(1) auxiliary space. MergeSort uses O(n) extra space, and QuickSort has O(n²) worst-case time.',
        verificationBasis: 'Williams (1964) HeapSort worst-case time and space complexity.',
        requiresSpecialistReview: false
      },
      {
        question: 'Given a divide-and-conquer algorithm with recurrence relation T(n) = 2T(n/2) + Θ(n) and base case T(1) = Θ(1), what is its asymptotic time complexity according to the Master Theorem?',
        options: [
          'Θ(n log n)',
          'Θ(n)',
          'Θ(n²)',
          'Θ(log n)'
        ],
        correctAnswer: 'Θ(n log n)',
        explanation: 'For T(n) = aT(n/b) + f(n) with a = 2, b = 2, we have n^(log_b a) = n^(log₂ 2) = n¹. Since f(n) = Θ(n) matches Θ(n^(log_b a)), Case 2 of the Master Theorem applies, yielding T(n) = Θ(n log n).',
        verificationBasis: 'Master Theorem Case 2 (Bentley, Haken, Saxe 1980 / CLRS).',
        requiresSpecialistReview: false
      },
      {
        question: 'Which algorithm correctly finds shortest paths from a single source vertex in a directed graph that contains negative-weight edges, and also detects negative-weight cycles reachable from the source?',
        options: [
          'Bellman-Ford algorithm',
          'Dijkstra’s algorithm',
          'Kruskal’s minimum spanning tree algorithm',
          'Prim’s algorithm'
        ],
        correctAnswer: 'Bellman-Ford algorithm',
        explanation: 'The Bellman-Ford algorithm relaxes all E edges V - 1 times in O(V·E) time, handling negative edge weights correctly, and performs a V-th check to detect reachable negative-weight cycles.',
        verificationBasis: 'Bellman (1958) and Ford (1956) shortest-path relaxation theorem.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why does a greedy algorithm always find the optimal solution for the Fractional Knapsack problem, whereas the 0/1 Knapsack problem requires Dynamic Programming?',
        options: [
          'In Fractional Knapsack items can be divided, so taking items in decreasing order of value-to-weight ratio satisfies the greedy-choice property; in 0/1 Knapsack items are indivisible, so a greedy choice can leave unusable capacity',
          'Fractional Knapsack has exponential input size whereas 0/1 Knapsack has linear input size',
          '0/1 Knapsack does not exhibit optimal substructure, whereas Fractional Knapsack does',
          'Greedy algorithms only work when all item weights are negative'
        ],
        correctAnswer: 'In Fractional Knapsack items can be divided, so taking items in decreasing order of value-to-weight ratio satisfies the greedy-choice property; in 0/1 Knapsack items are indivisible, so a greedy choice can leave unusable capacity',
        explanation: 'When fractions of items are allowed, sorting by value/weight ratio greedily maximizes value per unit capacity. When items must be taken whole (0/1), choosing the highest ratio item can prevent a combination of items with higher total value from fitting, requiring O(nW) dynamic programming.',
        verificationBasis: 'Greedy-choice property vs 0/1 Knapsack NP-completeness / pseudo-polynomial DP.',
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
        'Amortized analysis (potential method) and NP-completeness reductions for upper-level undergraduate/GRE computer science expansion.'
      ]
    }
  },

  'computer-science-data-structures': {
    description:
      'Master fundamental data structures and their memory layouts, operational invariants, and asymptotic time complexities, including contiguous arrays, linked lists, LIFO stacks, FIFO queues, hash tables, binary search trees, binary heaps, and graphs.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Compare contiguous memory allocation in dynamic arrays against pointer-based node allocation in singly and doubly linked lists.',
      'Explain the operational invariants and real-world systems applications of LIFO stacks, FIFO queues, and priority queues.',
      'Analyze how hash functions, load factors, and collision-resolution strategies (separate chaining and open addressing) achieve O(1) average lookup and insertion in hash tables.',
      'Contrast unbalanced and height-balanced Binary Search Trees (AVL, Red-Black trees) and trace in-order, pre-order, and post-order tree traversals.',
      'Compare adjacency matrix and adjacency list graph representations in terms of space complexity and edge/neighbor query performance.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'SAT', 'Undergraduate', 'Vocational'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (balanced BST insertion O(log n) and LIFO Stack definition) and 1 quiz question (Stack for browser back/forward history) recovered verbatim from scripts/seedData.js realContentMap["computer-science-data-structures"] (lines 193–201).',
    additionalFlashcards: [
      {
        question: 'What is the time complexity of random access by index versus inserting at the head in a contiguous dynamic array versus a singly linked list?',
        answer: 'A dynamic array provides O(1) random access by index but requires O(n) time to insert at index 0 (shifting elements); a singly linked list requires O(n) traversal for index access but supports O(1) insertion at the head.',
        verificationBasis: 'RAM memory addressing vs pointer-linked list traversal.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does a Queue differ from a Stack, and how can a Queue be implemented in O(1) time per operation?',
        answer: 'A Queue follows FIFO (First-In, First-Out) ordering where elements are enqueued at the rear and dequeued from the front, whereas a Stack is LIFO. A Queue achieves O(1) enqueue and dequeue using a circular ring buffer or a doubly/singly linked list with head and tail pointers.',
        verificationBasis: 'Abstract data type invariants for FIFO Queue vs LIFO Stack.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is a hash collision in a Hash Table, and what are the two primary strategies for resolving collisions?',
        answer: 'A collision occurs when two distinct keys hash to the same bucket index. It is resolved via Separate Chaining (storing colliding entries in a linked list/tree at that bucket) or Open Addressing (probing alternative slots via linear probing, quadratic probing, or double hashing).',
        verificationBasis: 'Hash table collision resolution and load factor α = n/m analysis.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the Binary Search Tree (BST) ordering invariant, and which traversal of a BST visits keys in non-decreasing sorted order?',
        answer: 'For every node x in a BST, all keys in its left subtree are less than (or equal to) x.key and all keys in its right subtree are greater than x.key. An in-order traversal (Left, Node, Right) visits all keys in sorted order in Θ(n) time.',
        verificationBasis: 'Binary search tree structural invariant and recursive in-order traversal.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why can an unbalanced Binary Search Tree degrade to O(n) search and insertion time, and how do AVL or Red-Black trees prevent this?',
        answer: 'Inserting sorted or nearly sorted keys into an unbalanced BST creates a degenerate linear chain of height O(n). Self-balancing BSTs (AVL, Red-Black) use tree rotations during insertion and deletion to maintain height O(log n).',
        verificationBasis: 'Adelson-Velsky and Landis (1962) AVL balance factor and Red-Black tree height invariants.',
        requiresSpecialistReview: false
      },
      {
        question: 'How is a binary min-heap typically stored in memory, and what are the time complexities of peek-min, insert, and extract-min?',
        answer: 'A binary min-heap is a complete binary tree stored compactly in a 0-indexed array where parent i has children at 2i + 1 and 2i + 2, and every parent key is ≤ its children. Peek-min is O(1), while insert (sift-up) and extract-min (sift-down) are O(log n).',
        verificationBasis: 'Implicit array representation of complete binary heap.',
        requiresSpecialistReview: false
      },
      {
        question: 'When representing a graph with V vertices and E edges, what is the space trade-off between an adjacency matrix and an adjacency list?',
        answer: 'An adjacency matrix uses Θ(V²) space and supports O(1) edge-existence lookups (best for dense graphs where E ≈ V²), whereas an adjacency list uses Θ(V + E) space and iterates over a vertex’s neighbors in O(degree(v)) time (best for sparse graphs where E ≪ V²).',
        verificationBasis: 'Graph representation space and query complexity.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why does appending n elements to a dynamic array (which doubles its capacity when full) take O(1) amortized time per append?',
        answer: 'Although resizing copies k elements at powers of two (1, 2, 4, 8, ..., n), the total copy cost across n appends is 1 + 2 + 4 + ... + n < 2n = O(n), averaging O(n)/n = O(1) amortized work per operation.',
        verificationBasis: 'Geometric series aggregate amortized analysis of dynamic array doubling.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'What is the worst-case time complexity of searching for a key in a Hash Table of n elements when all n keys hash to the exact same bucket index (using separate chaining with a linked list)?',
        options: [
          'Θ(n)',
          'Θ(1)',
          'Θ(log n)',
          'Θ(n log n)'
        ],
        correctAnswer: 'Θ(n)',
        explanation: 'If all n keys collide into a single bucket chain, searching requires traversing a linked list of length n in the worst case, taking Θ(n) time.',
        verificationBasis: 'Hash table worst-case collision chain length analysis.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which depth-first tree traversal of a valid Binary Search Tree (BST) Containing n distinct keys is guaranteed to output the keys in strictly ascending sorted order?',
        options: [
          'In-order traversal (Left subtree -> Root -> Right subtree)',
          'Pre-order traversal (Root -> Left subtree -> Right subtree)',
          'Post-order traversal (Left subtree -> Right subtree -> Root)',
          'Level-order (Breadth-First) traversal'
        ],
        correctAnswer: 'In-order traversal (Left subtree -> Root -> Right subtree)',
        explanation: 'By the BST property, all keys in the left subtree are smaller than the root and all keys in the right subtree are larger. Visiting Left, then Root, then Right recursively outputs keys in ascending order.',
        verificationBasis: 'BST in-order traversal induction proof.',
        requiresSpecialistReview: false
      },
      {
        question: 'In a 0-indexed array representation of a complete binary heap, if a node is stored at index i = 4, at which indices are its left child, right child, and parent located?',
        options: [
          'Left child: 9, Right child: 10, Parent: 1',
          'Left child: 8, Right child: 9, Parent: 2',
          'Left child: 5, Right child: 6, Parent: 3',
          'Left child: 9, Right child: 10, Parent: 2'
        ],
        correctAnswer: 'Left child: 9, Right child: 10, Parent: 1',
        explanation: 'In a 0-indexed binary heap, a node at index i has its left child at 2i + 1 = 2(4) + 1 = 9, its right child at 2i + 2 = 2(4) + 2 = 10, and its parent at ⌊(i - 1) / 2⌋ = ⌊3 / 2⌋ = 1.',
        verificationBasis: '0-indexed complete binary tree array index arithmetic.',
        requiresSpecialistReview: false
      },
      {
        question: 'A sparse social network graph has V = 100,000 users (vertices) and an average of 50 connections per user (E = 2,500,000 undirected edges). Why is an adjacency list strongly preferred over an adjacency matrix for storing this graph?',
        options: [
          'An adjacency list uses Θ(V + E) memory (~5.1 million entries), whereas an adjacency matrix requires Θ(V²) memory (10,000,000,000 entries)',
          'An adjacency list checks whether an edge (u, v) exists in O(1) worst-case time without hashing, whereas an adjacency matrix takes O(V) time',
          'An adjacency matrix cannot represent undirected graphs or weighted edges',
          'An adjacency list requires no pointers or arrays and uses O(1) total memory'
        ],
        correctAnswer: 'An adjacency list uses Θ(V + E) memory (~5.1 million entries), whereas an adjacency matrix requires Θ(V²) memory (10,000,000,000 entries)',
        explanation: 'For V = 10⁵, a V × V adjacency matrix requires 10¹⁰ cells (~10 GB at 1 byte per cell), most of which are zeros, whereas an adjacency list stores only the V lists and 2E = 5 × 10⁶ actual edge entries.',
        verificationBasis: 'Sparse vs dense graph storage complexity.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which data structure supports O(1) time insertion and deletion of a known node (given a direct pointer/reference to that node) without shifting elements or searching from the head?',
        options: [
          'Doubly linked list',
          'Singly linked list (for arbitrary node deletion)',
          'Contiguous static array',
          'Binary min-heap'
        ],
        correctAnswer: 'Doubly linked list',
        explanation: 'In a doubly linked list, each node stores both prev and next pointers, allowing a node to be unlinked (node.prev.next = node.next; node.next.prev = node.prev) or inserted adjacent to a referenced node in O(1) time. A singly linked list requires O(n) search to find the predecessor node.',
        verificationBasis: 'Doubly linked list pointer manipulation invariant.',
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
        'B-trees / B+ trees for disk-backed database indexing and Disjoint-Set (Union-Find) path compression with inverse Ackermann α(n) complexity.'
      ]
    }
  },

  'computer-science-machine-learning': {
    description:
      'Study foundational machine learning principles, including supervised, unsupervised, and reinforcement learning paradigms, bias-variance trade-offs, L1/L2 regularization, gradient descent optimization, classification evaluation metrics, and neural network architectures.',
    difficulty: 'Advanced',
    estimatedTime: '30 minutes',
    learningObjectives: [
      'Distinguish supervised learning (regression and classification), unsupervised learning (clustering and dimensionality reduction), and reinforcement learning.',
      'Diagnose overfitting and underfitting using training versus validation loss curves and analyze the bias-variance trade-off.',
      'Explain how gradient descent minimizes empirical loss functions and how L1 (Lasso) and L2 (Ridge) regularization penalize model complexity.',
      'Evaluate binary and multi-class classifiers using confusion matrices, precision, recall, F1-score, and ROC-AUC rather than raw accuracy on imbalanced datasets.',
      'Compare the mathematical mechanisms of linear regression, logistic regression, decision trees, K-Means clustering, and Principal Component Analysis (PCA).'
    ],
    supportedEducationLevels: [
      'Advanced', 'College', 'Exam Prep', 'Final Review',
      'Graduate', 'GRE', 'Intermediate', 'Undergraduate', 'Vocational'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (overfitting definition and supervised learning labeled data requirement) and 1 quiz question (Logistic Regression for binary classification) recovered verbatim from scripts/seedData.js realContentMap["computer-science-machine-learning"] (lines 202–210).',
    additionalFlashcards: [
      {
        question: 'What is the bias-variance trade-off in supervised machine learning?',
        answer: 'Bias is error from overly simplistic model assumptions (leading to underfitting), whereas variance is error from excessive sensitivity to small fluctuations in the training set (leading to overfitting). Increasing model complexity typically decreases bias but increases variance.',
        verificationBasis: 'Geman, Bienenstock, and Doursat (1992) expected generalization error decomposition into bias², variance, and irreducible noise.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why must machine learning datasets be split into separate Training, Validation, and Test sets?',
        answer: 'The training set fits model parameters (weights); the validation set tunes hyperparameters and selects models (preventing test-set leakage); the held-out test set provides an unbiased final estimate of generalization performance on unseen data.',
        verificationBasis: 'Statistical learning theory and holdout/cross-validation methodology (Hastie, Tibshirani, Friedman — Elements of Statistical Learning).',
        requiresSpecialistReview: false
      },
      {
        question: 'How does Gradient Descent update model parameters θ to minimize a differentiable loss function J(θ)?',
        answer: 'At each iteration, parameters are updated in the direction opposite to the gradient of the loss function: θ := θ - α · ∇_θ J(θ), where α > 0 is the learning rate (step size).',
        verificationBasis: 'First-order Cauchy gradient descent optimization rule.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between L1 (Lasso) regularization and L2 (Ridge) regularization?',
        answer: 'L1 regularization adds λ∑|w_i| to the loss function, driving less important feature weights to exact zero (performing sparse feature selection); L2 regularization adds λ∑w_i², shrinking weights smoothly toward zero without typically setting them to exact zero.',
        verificationBasis: 'Tibshirani (1996) Lasso L1 norm vs Hoerl-Kennard (1970) Ridge L2 norm geometry.',
        requiresSpecialistReview: false
      },
      {
        question: 'How are Precision, Recall (Sensitivity), and the F1-Score defined in binary classification?',
        answer: 'Precision = TP / (TP + FP) measures the fraction of positive predictions that are actually positive; Recall = TP / (TP + FN) measures the fraction of actual positives correctly identified; F1-score = 2 · (Precision · Recall) / (Precision + Recall) is their harmonic mean.',
        verificationBasis: 'Information retrieval and binary classification confusion-matrix definitions.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does the K-Means clustering algorithm partition unlabeled data?',
        answer: 'K-Means initializes K cluster centroids and alternates between (1) assigning each data point to its nearest centroid by Euclidean distance and (2) recomputing each centroid as the mean of all points assigned to its cluster, repeating until assignments converge.',
        verificationBasis: 'Lloyd’s (1957/1982) K-Means coordinate descent algorithm minimizing within-cluster sum of squares (WCSS).',
        requiresSpecialistReview: false
      },
      {
        question: 'What is Principal Component Analysis (PCA), and what problem does it solve?',
        answer: 'PCA is an unsupervised linear dimensionality-reduction technique that projects correlated features onto orthogonal axes (principal components, the eigenvectors of the covariance matrix) ordered by the amount of variance they capture.',
        verificationBasis: 'Pearson (1901) / Hotelling (1933) spectral decomposition of sample covariance matrix.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why do multi-layer neural networks require non-linear activation functions (such as ReLU, sigmoid, or tanh) in hidden layers?',
        answer: 'Without non-linear activation functions, a composition of multiple linear layers W₂(W₁x + b₁) + b₂ collapses into a single linear transformation W\'x + b\', making a deep network no more expressive than a single-layer linear model.',
        verificationBasis: 'Linear algebra closure of affine transformations and Cybenko (1989) universal approximation theorem.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'A medical diagnostic dataset contains 9,900 healthy patients (negative) and 100 patients with a rare disease (positive). A trivial classifier predicts "healthy" for every patient and achieves 99.0% accuracy. What is the Recall (Sensitivity) of this classifier for the disease class?',
        options: [
          '0.0% (Recall = TP / (TP + FN) = 0 / (0 + 100) = 0)',
          '99.0% (matching overall accuracy)',
          '50.0% (random baseline)',
          '100.0% (because False Positives = 0)'
        ],
        correctAnswer: '0.0% (Recall = TP / (TP + FN) = 0 / (0 + 100) = 0)',
        explanation: 'Because the model predicts 0 True Positives (TP = 0) and misses all 100 actual positive cases (FN = 100), its Recall is TP / (TP + FN) = 0 / 100 = 0%. This illustrates why raw accuracy is misleading on severely imbalanced datasets.',
        verificationBasis: 'Confusion matrix definition of Recall = TP / (TP + FN).',
        requiresSpecialistReview: false
      },
      {
        question: 'Which technique directly encourages sparsity by driving many irrelevant feature weights to exact zero during linear model training?',
        options: [
          'L1 (Lasso) regularization',
          'L2 (Ridge) weight decay',
          'Increasing the learning rate α in gradient descent',
          'Adding polynomial interaction features of degree 5'
        ],
        correctAnswer: 'L1 (Lasso) regularization',
        explanation: 'The L1 penalty (λ∑|w_i|) has constant subgradients (±λ) as weights approach zero and diamond-shaped constraint contours whose corners lie on the coordinate axes, causing optimization solutions to set weak feature weights to exact zero.',
        verificationBasis: 'L1 norm subdifferential geometry and Lasso sparsity.',
        requiresSpecialistReview: false
      },
      {
        question: 'During training of a deep neural network, the training loss continues to decrease toward zero, while the validation loss decreases for the first 15 epochs and then steadily increases over epochs 16–50. What does this divergence indicate, and which technique directly addresses it?',
        options: [
          'The model is overfitting after epoch 15; applying Early Stopping (restoring weights from epoch 15) and dropout/regularization prevents overfitting',
          'The model is underfitting; increasing the number of hidden layers and removing regularization will reduce validation loss',
          'The learning rate is zero; multiplying the learning rate by 100 after epoch 15 will guarantee convergence',
          'The validation set has fewer features than the training set'
        ],
        correctAnswer: 'The model is overfitting after epoch 15; applying Early Stopping (restoring weights from epoch 15) and dropout/regularization prevents overfitting',
        explanation: 'Falling training loss accompanied by rising validation loss is the classic signature of overfitting (memorizing training set noise). Early stopping halts training when validation loss reaches its minimum.',
        verificationBasis: 'Generalization curves and early-stopping regularization in iterative optimization.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which of the following tasks is an example of UNSUPERVISED machine learning?',
        options: [
          'Grouping e-commerce customers into purchasing-behavior segments using K-Means clustering without predefined category labels',
          'Predicting house sale prices in dollars from square footage and zip code using historical sales records',
          'Classifying incoming emails as "spam" or "not spam" trained on 50,000 human-labeled emails',
          'Training a convolutional neural network to identify 1,000 object categories on labeled ImageNet photos'
        ],
        correctAnswer: 'Grouping e-commerce customers into purchasing-behavior segments using K-Means clustering without predefined category labels',
        explanation: 'Unsupervised learning discovers latent structure or clusters in unlabeled data X without target labels y. House price prediction is supervised regression, and spam/ImageNet recognition are supervised classification.',
        verificationBasis: 'Supervised vs unsupervised learning taxonomy.',
        requiresSpecialistReview: false
      },
      {
        question: 'What role does the sigmoid (logistic) function σ(z) = 1 / (1 + e⁻ᶻ) play in binary Logistic Regression?',
        options: [
          'It maps any real-valued linear combination z = wᵀx + b into the interval (0, 1) so the output can be interpreted as the conditional probability P(y = 1 | x)',
          'It computes the Euclidean distance between unlabeled points in K-Means clustering',
          'It sets all negative activations to exact zero via max(0, z)',
          'It guarantees that the loss surface is non-convex with multiple global minima'
        ],
        correctAnswer: 'It maps any real-valued linear combination z = wᵀx + b into the interval (0, 1) so the output can be interpreted as the conditional probability P(y = 1 | x)',
        explanation: 'In logistic regression, the log-odds (logit) is modeled linearly as z = wᵀx + b, and applying the inverse-logit sigmoid function σ(z) = 1 / (1 + e⁻ᶻ) maps (-∞, +∞) smoothly onto (0, 1).',
        verificationBasis: 'Bernoulli generalized linear model canonical logit link function.',
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
        'Backpropagation chain-rule Jacobians, vanishing/exploding gradients, and transformer self-attention scaling (1/√d_k) for advanced deep learning modules.'
      ]
    }
  },

  'economics-macroeconomics': {
    description:
      'Examine economy-wide aggregates and policy mechanisms, including Gross Domestic Product (GDP) accounting, real versus nominal output, CPI inflation, unemployment categories, Aggregate Demand–Aggregate Supply (AD-AS), fiscal policy multipliers, and central bank monetary policy.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Calculate Gross Domestic Product (GDP) using the expenditure approach (Y = C + I + G + NX) and distinguish nominal GDP from inflation-adjusted real GDP.',
      'Differentiate frictional, structural, and cyclical unemployment and define the natural rate of unemployment (NRU).',
      'Analyze how Consumer Price Index (CPI) and the GDP deflator measure inflation and how unanticipated inflation redistributes purchasing power between borrowers and lenders.',
      'Compare expansionary and contractionary fiscal policy (government spending and taxation) with central bank monetary policy (open-market operations, policy interest rates, reserve requirements).',
      'Contrast the short-run Phillips Curve trade-off between inflation and unemployment with the vertical long-run Phillips Curve at the natural rate of unemployment.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (GDP definition, inflation definition) and 1 quiz question (Phillips Curve short-run trade-off) preserved from studyTopics.json; topic marked needs_review in accuracyStatus because short-run vs long-run Phillips Curve expectations-augmented dynamics and macroeconomic school-of-thought assumptions warrant specialist review.',
    additionalFlashcards: [
      {
        question: 'What are the four components of GDP in the expenditure approach formula Y = C + I + G + NX?',
        answer: 'Consumption (C, household spending on goods and services), Investment (I, business capital equipment, structures, inventories, and new residential housing), Government Purchases (G, spending on public goods/services excluding transfer payments), and Net Exports (NX = Exports - Imports).',
        verificationBasis: 'National Income and Product Accounts (NIPA) expenditure identity.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between Nominal GDP and Real GDP?',
        answer: 'Nominal GDP values current goods and services at current-year market prices (reflecting both output and price changes), whereas Real GDP values current output using constant base-year prices to isolate real changes in physical production.',
        verificationBasis: 'National income accounting and GDP deflator = (Nominal GDP / Real GDP) × 100.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do frictional, structural, and cyclical unemployment differ?',
        answer: 'Frictional unemployment arises from normal job-search transitions; structural unemployment arises from a persistent mismatch between workers’ skills/locations and employer needs; cyclical unemployment results from downturns in the business cycle (recessions).',
        verificationBasis: 'Bureau of Labor Statistics / standard macroeconomic labor-market taxonomy.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why is the Natural Rate of Unemployment (NRU) greater than zero even when an economy is at full employment?',
        answer: 'Full employment means cyclical unemployment is zero, but frictional unemployment (ongoing job search) and structural unemployment (technological and sectoral shifts) still exist in a dynamic economy, so NRU = Frictional + Structural unemployment.',
        verificationBasis: 'Friedman (1968) / Phelps (1967) natural rate of unemployment definition.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the difference between Fiscal Policy and Monetary Policy?',
        answer: 'Fiscal policy is enacted by the national government/legislature through changes in government spending (G) and taxation (T); Monetary policy is conducted by the central bank (e.g., the Federal Reserve) by managing the money supply and interest rates.',
        verificationBasis: 'Macroeconomic stabilization policy institutional framework.',
        requiresSpecialistReview: false
      },
      {
        question: 'How do central bank Open-Market Operations (buying vs selling government bonds) affect the money supply and nominal interest rates?',
        answer: 'When the central bank buys government bonds on the open market, it injects reserves into the banking system, expanding the money supply and lowering short-term interest rates; selling bonds withdraws reserves, contracting the money supply and raising interest rates.',
        verificationBasis: 'Central bank balance-sheet open-market mechanics.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is stagflation, and what causes it in the Aggregate Demand–Aggregate Supply (AD-AS) model?',
        answer: 'Stagflation is the simultaneous occurrence of stagnant/falling real GDP (rising unemployment) and high inflation, caused by an adverse leftward shift in Short-Run Aggregate Supply (SRAS), such as a major energy or supply-chain cost shock.',
        verificationBasis: 'AD-AS supply-shock analysis and 1970s oil-shock empirical history.',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Review alignment between traditional SRAS supply-shock framing and modern New Keynesian NKPC expectations modeling.'
      },
      {
        question: 'How does the Short-Run Phillips Curve (SRPC) differ from the Long-Run Phillips Curve (LRPC)?',
        answer: 'The SRPC is downward-sloping (showing an inverse trade-off between inflation and unemployment when inflation expectations are fixed), whereas the LRPC is vertical at the natural rate of unemployment because expected inflation adjusts to actual inflation in the long run.',
        verificationBasis: 'Friedman-Phelps expectations-augmented Phillips Curve hypothesis.',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Original seed quiz question 1 references the Phillips Curve without specifying Short-Run in the stem (though noted in the explanation); specialist curriculum review recommended.'
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'Which of the following transactions is INCLUDED when calculating a country’s current-year Gross Domestic Product (GDP) via the expenditure approach?',
        options: [
          'The construction of a new semiconductor manufacturing plant by a domestic firm',
          'A government Social Security transfer payment to a retired household',
          'The resale of a 10-year-old existing home between two private citizens (excluding broker commission)',
          'The purchase of 100 shares of existing corporate stock on a secondary exchange'
        ],
        correctAnswer: 'The construction of a new semiconductor manufacturing plant by a domestic firm',
        explanation: 'New business structures and equipment count toward Gross Private Domestic Investment (I) in current-year GDP. Transfer payments, financial asset trades, and resales of used goods produced in prior years are excluded to avoid double counting or non-production transfers.',
        verificationBasis: 'BEA NIPA rules on final current-period production vs transfer payments and financial transactions.',
        requiresSpecialistReview: false
      },
      {
        question: 'In a simple Keynesian model with no taxes or foreign trade, if the Marginal Propensity to Consume (MPC) is 0.80, what is the simple autonomous spending multiplier, and what is the maximum change in equilibrium output from a $50 billion increase in government purchases?',
        options: [
          'Multiplier = 5; maximum output increase = $250 billion',
          'Multiplier = 4; maximum output increase = $200 billion',
          'Multiplier = 0.8; maximum output increase = $40 billion',
          'Multiplier = 1.25; maximum output increase = $62.5 billion'
        ],
        correctAnswer: 'Multiplier = 5; maximum output increase = $250 billion',
        explanation: 'The simple spending multiplier is 1 / (1 - MPC) = 1 / (1 - 0.80) = 1 / 0.20 = 5. A $50 billion increase in government spending therefore increases equilibrium output by at most 5 × $50 billion = $250 billion (assuming constant prices and interest rates).',
        verificationBasis: 'Keynesian cross autonomous expenditure multiplier 1 / (1 - MPC).',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Simple fixed-price multiplier ignores crowding-out and price-level feedback in full AD-AS/IS-LM models.'
      },
      {
        question: 'If a borrower and a lender agree to a fixed-rate loan at a 6% nominal interest rate when both expect 2% annual inflation, who benefits if actual inflation unexpectedly rises to 5% per year?',
        options: [
          'The borrower benefits because the ex-post real interest rate falls from the expected 4% down to 1%',
          'The lender benefits because the real value of the loan principal increases with inflation',
          'Both the borrower and lender benefit equally because the nominal interest rate rises automatically',
          'Neither is affected because real interest rates are independent of inflation'
        ],
        correctAnswer: 'The borrower benefits because the ex-post real interest rate falls from the expected 4% down to 1%',
        explanation: 'By the Fisher equation (r ≈ i - π), expected real interest was 6% - 2% = 4%, but actual ex-post real interest drops to 6% - 5% = 1%. The borrower repays the loan in dollars with lower real purchasing power than anticipated.',
        verificationBasis: 'Irving Fisher equation (real interest rate vs nominal interest rate and unanticipated inflation).',
        requiresSpecialistReview: false
      },
      {
        question: 'An economy is experiencing a severe recession with high cyclical unemployment and output well below potential GDP. Which combination of fiscal and monetary policies is consistently expansionary?',
        options: [
          'Increasing government infrastructure spending and central bank open-market purchases of government bonds',
          'Raising personal income tax rates and increasing the central bank discount rate',
          'Cutting government purchases and selling government bonds on the open market',
          'Increasing the required reserve ratio on commercial banks and reducing transfer payments'
        ],
        correctAnswer: 'Increasing government infrastructure spending and central bank open-market purchases of government bonds',
        explanation: 'Increasing government purchases (G) is expansionary fiscal policy that directly boosts Aggregate Demand, while central bank open-market bond purchases expand bank reserves and lower interest rates (expansionary monetary policy).',
        verificationBasis: 'Stabilization policy instruments in recessionary gap.',
        requiresSpecialistReview: false
      },
      {
        question: 'Suppose Nominal GDP in Year 2 is $12,600 billion and the GDP deflator for Year 2 (with Base Year 1 = 100) is 105. What is Real GDP in Year 2 (in Base Year 1 dollars)?',
        options: [
          '$12,000 billion',
          '$13,230 billion',
          '$12,495 billion',
          '$11,970 billion'
        ],
        correctAnswer: '$12,000 billion',
        explanation: 'Since GDP Deflator = (Nominal GDP / Real GDP) × 100, rearranging gives Real GDP = (Nominal GDP / GDP Deflator) × 100 = ($12,600 billion / 105) × 100 = $12,000 billion.',
        verificationBasis: 'Exact algebraic identity linking Nominal GDP, Real GDP, and the GDP Deflator.',
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
        'specialist_review_macroeconomic_models: Preserved seed quiz question 1 asks "Which curve shows the relationship between unemployment and inflation?" with answer "Phillips Curve"; while explanation notes the short-run trade-off, modern macroeconomics distinguishes the downward-sloping Short-Run Phillips Curve (SRPC) from the vertical Long-Run Phillips Curve (LRPC).',
        'specialist_review_monetary_regime: Central bank policy descriptions should be reviewed by an economics curriculum specialist for alignment with post-2008 ample-reserves (IORB/administered rate) versus traditional scarce-reserves frameworks across AP/IB/undergraduate courses.'
      ],
      specialistReviewConcepts: [
        'Short-Run vs Long-Run Phillips Curve expectations augmentation (Friedman-Phelps).',
        'Ample-reserves floor system (Interest on Reserve Balances) vs traditional money-multiplier reserve requirement models.'
      ]
    }
  },

  'economics-microeconomics': {
    description:
      'Analyze individual consumer and firm decision-making, opportunity cost, supply and demand equilibrium, price elasticity, marginal revenue and cost optimization, market structures (perfect competition, monopoly, oligopoly, monopolistic competition), and market failures.',
    difficulty: 'Intermediate',
    estimatedTime: '25 minutes',
    learningObjectives: [
      'Apply opportunity cost and marginal analysis (marginal benefit equals marginal cost) to rational consumer and producer choices.',
      'Distinguish movements along a demand or supply curve (caused by a change in the good’s own price) from shifts of the entire curve (caused by non-price determinants).',
      'Calculate price elasticity of demand and relate elasticity values (elastic, inelastic, unit-elastic) to changes in total revenue.',
      'Determine the profit-maximizing output rule (MR = MC) and compare price, output, and allocative efficiency across perfect competition, monopoly, monopolistic competition, and oligopoly.',
      'Explain how price ceilings, price floors, excise taxes, and positive or negative externalities create deadweight loss and market inefficiency.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'Graduate', 'GRE', 'High School', 'IB', 'Intermediate', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 3 flashcards (Opportunity Cost, Law of Demand, Market Equilibrium) and 1 quiz question (Perfect Competition market structure) preserved from studyTopics.json; topic marked needs_review in accuracyStatus because welfare economics and market-structure assumptions warrant curriculum specialist review.',
    additionalFlashcards: [
      {
        question: 'What is the difference between a change in "quantity demanded" and a change in "demand"?',
        answer: 'A change in quantity demanded is a movement along a fixed demand curve caused solely by a change in the good’s own price; a change in demand is a shift of the entire demand curve caused by a non-price factor (such as income, tastes, population, or prices of substitutes/complements).',
        verificationBasis: 'Marshallian demand curve comparative statics.',
        requiresSpecialistReview: false
      },
      {
        question: 'How is Price Elasticity of Demand (E_d) calculated, and how does it relate to Total Revenue (TR = P × Q)?',
        answer: 'E_d = (% change in quantity demanded) / (% change in price). When demand is elastic (|E_d| > 1), raising price decreases total revenue; when demand is inelastic (|E_d| < 1), raising price increases total revenue; when unit-elastic (|E_d| = 1), total revenue is maximized.',
        verificationBasis: 'Price elasticity of demand and total revenue derivative d(P·Q(P))/dP = Q(1 + E_d).',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the universal profit-maximizing output rule for any firm, and when should a firm shut down in the short run?',
        answer: 'A firm maximizes profit (or minimizes loss) by producing the quantity where Marginal Revenue equals Marginal Cost (MR = MC), provided price covers Average Variable Cost (P ≥ AVC). If P < AVC at all output levels, the firm should shut down in the short run and incur only Fixed Costs.',
        verificationBasis: 'Neoclassical firm profit maximization d(TR - TC)/dQ = MR - MC = 0 and short-run shutdown condition.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why do firms in Perfect Competition earn zero economic profit in long-run equilibrium?',
        answer: 'Because there are no barriers to entry or exit: positive short-run economic profits attract new entrants (shifting market supply right and lowering price until P = minimum ATC), while short-run losses cause firms to exit until remaining firms earn normal profit (zero economic profit, where accounting profit equals opportunity cost).',
        verificationBasis: 'Long-run competitive equilibrium with free entry and exit.',
        requiresSpecialistReview: false
      },
      {
        question: 'How does a single-price Monopoly create Deadweight Loss (DWL) compared to a perfectly competitive market?',
        answer: 'Because a monopolist faces a downward-sloping demand curve, its Marginal Revenue lies below Price (MR < P). By setting MR = MC, the monopolist restricts output below the socially optimal quantity (where P = MC) and charges a higher price (P > MC), eliminating mutually beneficial trades and creating deadweight loss.',
        verificationBasis: 'Monopoly pricing markup (Lerner index) and allocative inefficiency (P > MC).',
        requiresSpecialistReview: false
      },
      {
        question: 'What are substitute goods and complementary goods in terms of Cross-Price Elasticity of Demand (E_xy)?',
        answer: 'Substitutes have a positive cross-price elasticity (E_xy > 0: an increase in the price of good Y increases demand for good X, like coffee and tea); complements have a negative cross-price elasticity (E_xy < 0: an increase in the price of good Y decreases demand for good X, like printers and ink cartridges).',
        verificationBasis: 'Cross-price elasticity sign definitions.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is a negative externality, and how does a Pigouvian tax restore allocative efficiency?',
        answer: 'A negative externality occurs when production or consumption imposes uncompensated external costs on third parties (e.g., industrial pollution), making Marginal Social Cost exceed Marginal Private Cost (MSC = MPC + MEC). A per-unit Pigouvian tax equal to the marginal external cost (MEC) at the socially optimal output internalizes the externality so MPC + tax = MSC.',
        verificationBasis: 'Pigou (1920) welfare economics and externality internalization.',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Coase theorem bargaining alternative vs Pigouvian taxation assumptions warrant curriculum-level review.'
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'When the price of a concert ticket increases by 10%, the quantity of tickets demanded falls by 5%. What is the price elasticity of demand, and what happens to the concert promoter’s total ticket revenue?',
        options: [
          'Demand is inelastic (|E_d| = 0.5); total ticket revenue increases',
          'Demand is elastic (|E_d| = 2.0); total ticket revenue decreases',
          'Demand is unit-elastic (|E_d| = 1.0); total ticket revenue remains unchanged',
          'Demand is perfectly elastic; total ticket revenue drops to zero'
        ],
        correctAnswer: 'Demand is inelastic (|E_d| = 0.5); total ticket revenue increases',
        explanation: '|E_d| = |(-5%) / (+10%)| = 0.5 < 1, which means demand is price-inelastic. Because the percentage drop in quantity (5%) is smaller than the percentage rise in price (10%), total revenue (P × Q) increases.',
        verificationBasis: 'Price elasticity definition and total revenue test.',
        requiresSpecialistReview: false
      },
      {
        question: 'In a perfectly competitive market, the market equilibrium price is $20 per unit. At a firm’s current output of 100 units, its Marginal Cost (MC) is $16, its Average Total Cost (ATC) is $18, and its Average Variable Cost (AVC) is $12 (with MC rising). To maximize short-run profit, what should the firm do?',
        options: [
          'Increase output beyond 100 units until Marginal Cost rises to $20 (where MR = P = MC)',
          'Decrease output because Average Total Cost ($18) is higher than Marginal Cost ($16)',
          'Shut down immediately because Marginal Cost ($16) is less than Price ($20)',
          'Raise its selling price to $25 per unit to increase its profit margin'
        ],
        correctAnswer: 'Increase output beyond 100 units until Marginal Cost rises to $20 (where MR = P = MC)',
        explanation: 'A price-taking firm in perfect competition has Marginal Revenue equal to market Price (MR = P = $20). Because MR ($20) > MC ($16) at 100 units, each additional unit adds more to revenue than to cost, so expanding output until MC = $20 increases profit.',
        verificationBasis: 'Competitive price-taking firm marginal profit condition MR = P = MC.',
        requiresSpecialistReview: false
      },
      {
        question: 'What is the immediate market effect of a government-imposed price ceiling set BELOW the competitive equilibrium price (such as a binding rent control limit)?',
        options: [
          'A persistent shortage (excess demand), because quantity demanded exceeds quantity supplied at the ceiling price',
          'A persistent surplus (excess supply), because quantity supplied exceeds quantity demanded at the ceiling price',
          'No effect on market price or quantity, because a ceiling below equilibrium is non-binding',
          'An automatic rightward shift in the market supply curve'
        ],
        correctAnswer: 'A persistent shortage (excess demand), because quantity demanded exceeds quantity supplied at the ceiling price',
        explanation: 'A price ceiling is a legal maximum price. When set below the equilibrium price, it is binding: consumers demand more units at the artificially low price while producers supply fewer units, resulting in a shortage (Q_d > Q_s) and deadweight loss.',
        verificationBasis: 'Binding price ceiling welfare and shortage analysis.',
        requiresSpecialistReview: false
      },
      {
        question: 'Coffee and tea are substitute goods for consumers. If a severe frost in Brazil destroys a large portion of the coffee bean harvest, what happens in the market for TEA, ceteris paribus?',
        options: [
          'The demand curve for tea shifts to the right, increasing both the equilibrium price and equilibrium quantity of tea',
          'The supply curve for tea shifts to the left, decreasing the equilibrium quantity of tea',
          'There is only a downward movement along the fixed demand curve for tea',
          'The demand curve for tea shifts to the left, decreasing both the equilibrium price and quantity of tea'
        ],
        correctAnswer: 'The demand curve for tea shifts to the right, increasing both the equilibrium price and equilibrium quantity of tea',
        explanation: 'The frost reduces the supply of coffee, raising the equilibrium price of coffee. Because coffee and tea are substitutes, a higher price of coffee causes consumers to substitute toward tea, shifting the entire demand curve for tea to the right and raising tea’s equilibrium price and quantity.',
        verificationBasis: 'Cross-market supply shock transmission across substitute goods.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why does a profit-maximizing single-price monopolist always produce in the elastic region (|E_d| ≥ 1) of its linear market demand curve when Marginal Cost is positive (MC > 0)?',
        options: [
          'In the inelastic region (|E_d| < 1), Marginal Revenue is negative (MR < 0), so equates MR = MC > 0 can only occur where MR > 0 in the elastic region',
          'Because a monopolist’s Marginal Revenue curve is identical to its Demand curve at all output levels',
          'Because Total Revenue is maximized where Marginal Cost equals Average Fixed Cost',
          'Because government antitrust regulations prohibit production in the inelastic region'
        ],
        correctAnswer: 'In the inelastic region (|E_d| < 1), Marginal Revenue is negative (MR < 0), so equates MR = MC > 0 can only occur where MR > 0 in the elastic region',
        explanation: 'By the relationship MR = P(1 - 1/|E_d|), whenever demand is inelastic (|E_d| < 1), Marginal Revenue is negative (reducing output both increases total revenue and reduces total cost). Since MC > 0, the profit-maximizing condition MR = MC > 0 requires |E_d| > 1.',
        verificationBasis: 'Amoroso-Robinson relation MR = P(1 - 1/|E_d|) and monopoly profit maximization.',
        requiresSpecialistReview: true,
        specialistReviewNote: 'Amoroso-Robinson algebraic derivation is standard in undergraduate microeconomics; review whether AP Microeconomics requires graphic vs algebraic explanation.'
      }
    ],
    qualityAssessment: {
      structuralStatus: 'verified',
      accuracyStatus: 'needs_review',
      coverageStatus: 'verified',
      editorialStatus: 'verified',
      indexabilityStatus: 'needs_review',
      reviewReasons: [
        'specialist_review_microeconomic_assumptions: Welfare theorems, ceteris paribus Law of Demand exceptions (Giffen/Veblen goods), and Coase vs Pigouvian externality remedies warrant curriculum specialist review across secondary vs undergraduate levels.'
      ],
      specialistReviewConcepts: [
        'Amoroso-Robinson relation MR = P(1 - 1/|E_d|) level scoping.',
        'Coase Theorem transaction-cost assumptions vs Pigouvian taxation.'
      ]
    }
  },

  'history-ancient-egypt': {
    description:
      'Explore the civilization of Ancient Egypt along the Nile Valley, spanning the unification of Upper and Lower Egypt, Old Kingdom pyramid architecture, Middle and New Kingdom imperial expansion, pharaonic religion and funerary practices, and the decipherment of hieroglyphs via the Rosetta Stone.',
    difficulty: 'Beginner',
    estimatedTime: '20 minutes',
    learningObjectives: [
      'Explain how the annual inundation of the Nile River and natural desert barriers shaped Ancient Egyptian agriculture, calendar systems, and political stability.',
      'Distinguish the major chronological eras of Ancient Egypt: the Early Dynastic Period, Old Kingdom (Age of the Pyramids), Middle Kingdom, and New Kingdom (Imperial Age).',
      'Identify key rulers and historical figures—including Narmer (Menes), Djoser, Imhotep, Khufu, Hatshepsut, Akhenaten, Tutankhamun, and Ramesses II—and their historical significance.',
      'Describe Ancient Egyptian religious beliefs, the concept of Ma’at (cosmic order), mummification, and funerary texts such as the Pyramid Texts and Book of the Dead.',
      'Explain how the trilingual Rosetta Stone (hieroglyphic, demotic, and Ancient Greek) enabled Jean-François Champollion to decipher Egyptian hieroglyphs in 1822.'
    ],
    supportedEducationLevels: [
      'Advanced', 'AP', 'Beginner', 'College', 'Exam Prep', 'Final Review',
      'GCSE', 'High School', 'IB', 'Intermediate', 'Kids', 'SAT', 'Undergraduate'
    ],
    seedVerificationBasis:
      'Original 2 flashcards (Pharaoh Khufu Great Pyramid of Giza c. 2580–2560 BCE; Rosetta Stone 1799 hieroglyphic decipherment) and 1 quiz question (centrality of the Nile River) verified against established Egyptological chronology and historical records.',
    additionalFlashcards: [
      {
        question: 'What was the political significance of the Narmer Palette (c. 3100 BCE) and the Double Crown (Pschent)?',
        answer: 'They commemorate the unification of Upper Egypt (represented by the White Crown, Hedjet) and Lower Egypt (represented by the Red Crown, Deshret) under Pharaoh Narmer (traditionally identified with Menes), founding the First Dynasty.',
        verificationBasis: 'Archaeological discovery of the Narmer Palette at Hierakonpolis (Quibell & Green, 1897–1898) and First Dynasty iconography.',
        requiresSpecialistReview: false
      },
      {
        question: 'Who designed the Step Pyramid of Pharaoh Djoser at Saqqara (c. 2670 BCE), and why was it architecturally revolutionary?',
        answer: 'Designed by the royal chancellor and high priest Imhotep during the Third Dynasty, the Step Pyramid at Saqqara was the world’s earliest monumental structure built entirely of dressed cut stone (stacking six mastabas).',
        verificationBasis: 'Old Kingdom Third Dynasty architectural history at Saqqara.',
        requiresSpecialistReview: false
      },
      {
        question: 'Which three scripts are inscribed on the Rosetta Stone (196 BCE), and who achieved the breakthrough decipherment of the hieroglyphs in 1822?',
        answer: 'The Rosetta Stone displays the same royal decree of Ptolemy V in Egyptian Hieroglyphs, Egyptian Demotic script, and Ancient Greek. French scholar Jean-François Champollion deciphered the phonetic and ideographic nature of the hieroglyphs in 1822 (building on earlier work by Thomas Young).',
        verificationBasis: 'Memphis decree of Ptolemy V (196 BCE), British Museum EA24, and Champollion’s Lettre à M. Dacier (1822).',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the concept of "Ma’at" in Ancient Egyptian religion and governance?',
        answer: 'Ma’at represented cosmic truth, balance, harmony, justice, and moral order, personified as a goddess with an ostrich feather; the Pharaoh’s supreme religious and political duty was to uphold Ma’at and prevent chaos (Isfet).',
        verificationBasis: 'Ancient Egyptian theology and funerary Weighing of the Heart ceremony.',
        requiresSpecialistReview: false
      },
      {
        question: 'What major religious and political transformation did Pharaoh Akhenaten (Amenhotep IV) enact during the 18th Dynasty (Amarna Period)?',
        answer: 'Akhenaten elevated the sun-disc deity Aten above traditional polytheistic cults (especially Amun-Ra), closed Amun temples, and moved the royal capital from Thebes to a newly built city at Akhetaten (modern Amarna) before traditional worship was restored under his successor Tutankhamun.',
        verificationBasis: '18th Dynasty Amarna Period archaeology and Restoration Stele of Tutankhamun.',
        requiresSpecialistReview: false
      },
      {
        question: 'For what achievements is the female Pharaoh Hatshepsut (18th Dynasty, r. c. 1479–1458 BCE) best known?',
        answer: 'Ruling as full pharaoh rather than merely regent, Hatshepsut re-established prosperous trade networks (notably the expedition to the Land of Punt) and commissioned monumental architecture including her terraced mortuary temple (Djeser-Djeseru) at Deir el-Bahari.',
        verificationBasis: 'Deir el-Bahari reliefs and 18th Dynasty New Kingdom inscriptions.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why is the Battle of Kadesh (c. 1274 BCE) between Pharaoh Ramesses II and the Hittite Empire historically significant?',
        answer: 'Fought in modern Syria with massive chariot forces, its strategic stalemate led to the Egyptian–Hittite Peace Treaty (c. 1259 BCE)—the earliest surviving written international peace treaty in world history, with copies preserved in both Egyptian hieroglyphs and Akkadian cuneiform.',
        verificationBasis: 'Karnak/Ramesseum treaty inscriptions and Boghazköy (Hattusa) cuneiform tablets.',
        requiresSpecialistReview: false
      },
      {
        question: 'Why did New Kingdom pharaohs abandon pyramid construction at Giza/Saqqara in favor of rock-cut tombs in the Valley of the Kings?',
        answer: 'Following the collapse of the Old Kingdom and widespread looting of conspicuous pyramids, New Kingdom rulers (18th–20th Dynasties) excavated concealed subterranean tombs in the guarded limestone cliffs of the Valley of the Kings on the west bank of Thebes (Luxor) while separating their mortuary temples along the Nile floodplain.',
        verificationBasis: 'New Kingdom Theban necropolis archaeology.',
        requiresSpecialistReview: false
      }
    ],
    additionalQuizQuestions: [
      {
        question: 'During which period of Ancient Egyptian history were the Step Pyramid at Saqqara and the three Great Pyramids of Giza (Khufu, Khafre, and Menkaure) constructed?',
        options: [
          'The Old Kingdom (3rd–6th Dynasties, c. 2686–2181 BCE)',
          'The New Kingdom (18th–20th Dynasties, c. 1550–1077 BCE)',
          'The Ptolemaic Period (305–30 BCE)',
          'The Second Intermediate Period under Hyksos rule (c. 1650–1550 BCE)'
        ],
        correctAnswer: 'The Old Kingdom (3rd–6th Dynasties, c. 2686–2181 BCE)',
        explanation: 'Monumental stone pyramid construction peaked during the Old Kingdom ("Age of the Pyramids"), beginning with Djoser’s 3rd-Dynasty Step Pyramid at Saqqara and culminating in the 4th-Dynasty pyramids of Sneferu, Khufu, Khafre, and Menkaure.',
        verificationBasis: 'Standard Egyptological periodization (Shaw, Oxford History of Ancient Egypt).',
        requiresSpecialistReview: false
      },
      {
        question: 'Why was the presence of Ancient Greek text on the Rosetta Stone essential to the decipherment of Egyptian hieroglyphs?',
        options: [
          'Scholars could already read Ancient Greek, and the Greek inscription explicitly stated that the same royal decree was written in all three scripts on the stele',
          'Egyptian hieroglyphs were an alphabetic dialect of Indo-European Greek',
          'The Greek text was a dictionary listing every Egyptian hieroglyph in alphabetical order',
          'Ancient Greek was the original language of the Old Kingdom pyramid builders'
        ],
        correctAnswer: 'Scholars could already read Ancient Greek, and the Greek inscription explicitly stated that the same royal decree was written in all three scripts on the stele',
        explanation: 'Because 19th-century European scholars knew Ancient Greek, they could read the bottom register of the 196 BCE decree of Ptolemy V and match royal names (such as Ptolemy and Cleopatra enclosed in cartouches) and vocabulary to the Demotic and Hieroglyphic sections.',
        verificationBasis: 'Rosetta Stone (196 BCE) trilingual parallel text decipherment history.',
        requiresSpecialistReview: false
      },
      {
        question: 'What did Ancient Egyptians call their fertile Nile River valley ("Kemet"), in contrast to the surrounding arid desert ("Deshret")?',
        options: [
          '"The Black Land" (after the dark, nutrient-rich alluvial silt deposited by the annual Nile flood)',
          '"The Red Land" (after the iron-rich sandstone cliffs of Nubia)',
          '"The Land Between Two Rivers" (Mesopotamia)',
          '"The Valley of the Golden Sun"'
        ],
        correctAnswer: '"The Black Land" (after the dark, nutrient-rich alluvial silt deposited by the annual Nile flood)',
        explanation: 'Ancient Egyptians called their country Kemet ("Black Land") in reference to the dark, fertile alluvial silt left along the Nile floodplains each summer during the inundation (Akhet), contrasting it with Deshret ("Red Land"), the barren desert.',
        verificationBasis: 'Egyptian toponymy km.t ("Black Land") vs dšr.t ("Red Land").',
        requiresSpecialistReview: false
      },
      {
        question: 'Which 18th-Dynasty ruler temporarily disrupted Ancient Egypt’s traditional polytheistic priesthood of Amun by promoting the exclusive worship of the solar disc Aten and relocating the capital to Akhetaten (Amarna)?',
        options: [
          'Akhenaten (formerly Amenhotep IV)',
          'Ramesses II',
          'Thutmose III',
          'Menkaure'
        ],
        correctAnswer: 'Akhenaten (formerly Amenhotep IV)',
        explanation: 'Amenhotep IV changed his name to Akhenaten ("Effective for the Aten"), elevated the Aten sun-disc to supreme status, and built a new capital at Akhetaten (Amarna) before traditional polytheism centered on Amun was restored under his son Tutankhamun.',
        verificationBasis: '18th Dynasty Amarna chronology.',
        requiresSpecialistReview: false
      },
      {
        question: 'What was the primary purpose of the four Canopic Jars placed inside Ancient Egyptian tombs during the mummification process?',
        options: [
          'To store and protect the deceased’s preserved internal organs (stomach, intestines, lungs, and liver) for the afterlife, while the heart was typically left inside the body for the Weighing of the Heart',
          'To hold the cremated ashes of the pharaoh and royal family members',
          'To store gold coins and papyrus tax records for the royal treasury',
          'To hold Nile water used by tomb builders during pyramid construction'
        ],
        correctAnswer: 'To store and protect the deceased’s preserved internal organs (stomach, intestines, lungs, and liver) for the afterlife, while the heart was typically left inside the body for the Weighing of the Heart',
        explanation: 'During embalmment, the liver, lungs, stomach, and intestines were removed, desiccated with natron, and placed in four canopic jars guarded by the Four Sons of Horus, whereas the heart (considered the seat of intelligence and morality) was left in the chest to be weighed against the feather of Ma’at.',
        verificationBasis: 'Ancient Egyptian funerary embalmment practices and Book of the Dead Spell 125.',
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
        'Low vs high astronomical chronology debates for absolute regnal dates in the Old and Middle Kingdoms.'
      ]
    }
  }
};
