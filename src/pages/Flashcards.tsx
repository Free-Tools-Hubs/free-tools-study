import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  BookMarked,
  Share2,
  Layers,
  Repeat,
  Target,
  ChevronLeft,
  ChevronRight,
  Zap,
  Clock,
  Sparkles,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateFlashcards, Flashcard } from '../modules/studyEngine';
import { getPageContent, hashString } from '../utils/deterministicVariationEngine';
import AdSlot from '../components/AdSlot';
import { studyDataService, CanonicalTopic } from '../services/studyDataService';
import TopicNotFound from '../components/TopicNotFound';

const Flashcards = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { decks, saveDeck, incrementStreak } = useStore();

  // Resolve topic through centralized data access layer
  const resolution = useMemo(() => {
    return studyDataService.resolveTopic(subject || 'biology-cell-biology');
  }, [subject]);

  const topicData: CanonicalTopic | null = resolution.topic;

  // In-client self-healing redirect: replace legacy URL with canonical URL
  useEffect(() => {
    if (resolution.isLegacyRedirect && resolution.canonicalSlug && resolution.canonicalSlug !== subject) {
      navigate(`/${resolution.canonicalSlug}`, { replace: true });
    }
  }, [resolution, subject, navigate]);

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const slug = topicData ? topicData.slug : (subject || '');
  const formattedSubject = topicData ? topicData.subTopic : 'Biology';
  const educationLevels = topicData ? topicData.educationLevels : ['High School'];
  const activeLevel = selectedLevel || educationLevels[0] || 'High School';

  // Deterministic initial deck: guarantees rich HTML on initial render & SSR
  const initialDeck = useMemo(() => {
    if (!topicData) return [];
    if (decks[slug] && decks[slug].length > 0) {
      return decks[slug];
    }
    return generateFlashcards(topicData, 12, false);
  }, [topicData, slug, decks]);

  const [currentDeck, setCurrentDeck] = useState<Flashcard[]>(initialDeck);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  // Deterministic auxiliary study content
  const pageContent = useMemo(() => {
    const seed = hashString(slug);
    return getPageContent(formattedSubject, activeLevel, seed);
  }, [formattedSubject, activeLevel, slug]);

  useEffect(() => {
    if (!topicData) return;
    incrementStreak();

    if (decks[slug] && decks[slug].length > 0) {
      setCurrentDeck(decks[slug]);
    } else if (currentDeck.length === 0) {
      const cards = generateFlashcards(topicData, 12, false);
      setCurrentDeck(cards);
      saveDeck(slug, cards);
    }
  }, [slug, topicData]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % (currentDeck.length || 1));
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + (currentDeck.length || 1)) % (currentDeck.length || 1));
    }, 150);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${formattedSubject} Flashcards`,
        text: `Master ${formattedSubject} with these free study tools.`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleReset = () => {
    if (confirm('Start this deck from the beginning?')) {
      setCurrentIndex(0);
      setIsFlipped(false);
    }
  };

  const handleConfidence = (score: number) => {
    if (currentDeck.length === 0) return;
    const updatedDeck = [...currentDeck];
    updatedDeck[currentIndex] = {
      ...updatedDeck[currentIndex],
      confidence: score,
      nextReview: Date.now() + (score * 24 * 60 * 60 * 1000)
    };
    setCurrentDeck(updatedDeck);
    saveDeck(slug, updatedDeck);
    handleNext();
  };

  // SOFT-404 ELIMINATION: Explicit Not-Found UI for invalid/missing slugs
  if (!topicData) {
    return <TopicNotFound slug={subject} tool="flashcards" />;
  }

  const effectiveDeck = currentDeck.length > 0 ? currentDeck : generateFlashcards(topicData, 12, false);
  const currentCard = effectiveDeck[currentIndex] || effectiveDeck[0];
  const isVerified = topicData.contentQuality.status === 'verified';
  const isNeedsReview = topicData.contentQuality.status === 'needs_review';

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <Helmet>
        <title>{`${formattedSubject} Flashcards — ${activeLevel} Study Guide | StudyToolsHub`}</title>
        <meta
          name="description"
          content={topicData.description || `Master ${formattedSubject} with free ${activeLevel} study flashcards. 100% offline-ready, no sign-up needed.`}
        />
        <link rel="canonical" href={`https://study.freetoolshubs.com/${topicData.slug}`} />

        {/* Indexation Gate: Strict quality-based indexing eligibility */}
        {isVerified ? (
          <meta name="robots" content="index, follow" />
        ) : (
          <meta name="robots" content="noindex, follow" />
        )}

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={`${formattedSubject} Flashcards — ${activeLevel} Study Guide`} />
        <meta property="og:description" content={topicData.description || `Master ${formattedSubject} with free ${activeLevel} study flashcards.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://study.freetoolshubs.com/${topicData.slug}`} />
        <meta property="og:image" content="https://study.freetoolshubs.com/og-flashcards.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data (JSON-LD): BreadcrumbList */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://study.freetoolshubs.com/" },
              { "@type": "ListItem", "position": 2, "name": topicData.subject, "item": `https://study.freetoolshubs.com/${studyDataService.getSubjectLandingTopic(topicData.subject)?.slug || topicData.slug}` },
              { "@type": "ListItem", "position": 3, "name": formattedSubject, "item": `https://study.freetoolshubs.com/${topicData.slug}` }
            ]
          })}
        </script>

        {/* Structured Data (JSON-LD): LearningResource */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LearningResource",
            "name": `${formattedSubject} Flashcards`,
            "description": topicData.description || `Comprehensive study flashcards for ${formattedSubject}.`,
            "educationalLevel": activeLevel,
            "learningResourceType": "Flashcard Deck",
            "inLanguage": "en",
            "url": `https://study.freetoolshubs.com/${topicData.slug}`,
            "isAccessibleForFree": true,
            "about": {
              "@type": "Thing",
              "name": formattedSubject
            },
            "provider": {
              "@type": "Organization",
              "name": "StudyToolsHub",
              "url": "https://study.freetoolshubs.com/"
            }
          })}
        </script>

        {/* Structured Data (JSON-LD): FAQPage */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `What is covered in these ${formattedSubject} flashcards?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `This deck covers ${effectiveDeck.length} essential concepts for ${activeLevel} ${formattedSubject}, including core definitions, mechanisms, and practical applications.`
                }
              },
              {
                "@type": "Question",
                "name": "Can I use these flashcards offline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! All StudyToolsHub materials are 100% offline-ready once loaded. No account or internet connection is required."
                }
              },
              {
                "@type": "Question",
                "name": `Who are these ${formattedSubject} flashcards designed for?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `These flashcards are tailored for ${activeLevel} students, exam preparation candidates, and self-directed learners mastering ${formattedSubject}.`
                }
              }
            ]
          })}
        </script>
      </Helmet>

      {/* Quality Status Banner */}
      {isVerified ? (
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-medium">
          <Sparkles className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Verified Academic Curriculum — Reviewed for pedagogical accuracy and syllabus alignment.</span>
        </div>
      ) : isNeedsReview ? (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Curated Curriculum undergoing specialist academic review.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-medium">
          <GraduationCap className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>Foundational study guide. Content reflects core curriculum principles.</span>
        </div>
      )}

      <header className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Layers className="w-5 h-5" />
            <span>Flashcard Deck • {topicData.subject}</span>
          </div>
          <div className="flex gap-2">
            <span
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                topicData.difficulty === 'Advanced'
                  ? 'bg-red-100 text-red-600'
                  : topicData.difficulty === 'Intermediate'
                  ? 'bg-amber-100 text-amber-600'
                  : 'bg-emerald-100 text-emerald-600'
              }`}
            >
              {topicData.difficulty || 'Beginner'}
            </span>
            <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" /> {topicData.estimatedTime || '15 mins'}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold">{formattedSubject} Flashcards</h1>
          <p className="text-lg text-slate-500 max-w-3xl">
            {topicData.description || pageContent.intro}
          </p>
        </div>

        {/* Education Level Selector Badges */}
        {educationLevels.length > 0 && (
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Compatible Education Levels:
            </div>
            <div className="flex flex-wrap gap-2">
              {educationLevels.map(lvl => (
                <button
                  key={lvl}
                  onClick={() => setSelectedLevel(lvl)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                    activeLevel === lvl
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Learning Objectives */}
        {topicData.learningObjectives && topicData.learningObjectives.length > 0 && (
          <div className="p-4 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl text-sm space-y-2">
            <div className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Target className="w-4 h-4 text-primary" /> Key Learning Objectives
            </div>
            <ul className="list-disc list-inside space-y-1 text-slate-600 dark:text-slate-400">
              {topicData.learningObjectives.map((obj, i) => (
                <li key={i}>{obj}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              <Share2 className="w-4 h-4" /> Share
            </button>
            <button
              onClick={handleReset}
              title="Reset from first card"
              className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-lg text-sm font-bold hover:bg-primary/20 transition-all"
            >
              <Target className="w-4 h-4" /> {currentIndex + 1} / {currentDeck.length}
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {(topicData.tags || []).map((tag: string) => (
              <span key={tag} className="text-[10px] font-bold text-slate-400">#{tag}</span>
            ))}
          </div>
        </div>
      </header>

      {/* Interactive Flashcard with 3D Flip */}
      <div
        className="aspect-[4/3] w-full max-w-2xl mx-auto perspective-1000 group cursor-pointer"
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div className={`relative w-full h-full transition-transform duration-500 transform-style-3d ${isFlipped ? 'rotate-y-180' : ''}`}>
          <div className="absolute inset-0 backface-hidden glass rounded-3xl flex flex-col items-center justify-center p-12 text-center shadow-xl border-2 border-primary/20 bg-white/80 dark:bg-slate-900/80">
            <span className="text-xs font-bold uppercase tracking-widest text-primary mb-4">Question</span>
            <h2 className="text-3xl font-bold">{currentCard.question}</h2>
            <p className="mt-8 text-slate-400 text-sm italic">Click to reveal answer</p>
          </div>
          <div className="absolute inset-0 backface-hidden glass rounded-3xl flex flex-col items-center justify-center p-12 text-center shadow-xl border-2 border-emerald-500/20 rotate-y-180 bg-emerald-50/50 dark:bg-emerald-900/10">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-600 mb-4">Answer</span>
            <h2 className="text-2xl font-bold text-emerald-700 dark:text-emerald-400">{currentCard.answer}</h2>
            <p className="mt-6 text-slate-600 dark:text-slate-300">How well did you know this?</p>
            <div className="flex gap-2 mt-6" onClick={(e) => e.stopPropagation()}>
              {[1, 2, 3, 4, 5].map(score => (
                <button
                  key={score}
                  onClick={() => handleConfidence(score)}
                  aria-label={`Confidence level ${score} out of 5`}
                  className="w-10 h-10 rounded-lg bg-white dark:bg-slate-800 border border-border hover:bg-emerald-500 hover:text-white font-bold transition-all"
                >
                  {score}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-6 mt-12">
        <button
          onClick={handlePrev}
          aria-label="Previous card"
          className="w-16 h-16 rounded-full glass border border-border flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <ChevronLeft className="w-8 h-8" />
        </button>
        <button
          onClick={handleNext}
          aria-label="Next card"
          className="px-12 py-4 bg-primary text-white rounded-2xl font-bold shadow-lg hover:bg-primary-hover transform hover:-translate-y-1 transition-all"
        >
          Next Card
        </button>
        <button
          onClick={() => setIsFlipped(!isFlipped)}
          aria-label="Flip card"
          className="w-16 h-16 rounded-full glass border border-border flex items-center justify-center hover:bg-slate-100 transition-colors"
        >
          <Repeat className="w-6 h-6" />
        </button>
      </div>

      <AdSlot id="flashcard-after-controls" format="rectangle" className="max-w-xl mx-auto" />

      {/* Comprehensive Flashcard Deck Overview for Accessibility & Search Discovery */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-border shadow-sm space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <BookMarked className="w-6 h-6 text-primary" /> Key Concepts in this Study Deck
          </h3>
          <span className="text-xs font-semibold px-3 py-1 bg-primary/10 text-primary rounded-full">
            {effectiveDeck.length} Flashcards
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {effectiveDeck.map((card, idx) => (
            <article
              key={card.id || idx}
              className="p-5 rounded-2xl border border-border bg-slate-50/50 dark:bg-slate-800/40 space-y-2"
            >
              <div className="flex items-start gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-primary/10 text-primary flex-shrink-0">
                  Card {idx + 1}
                </span>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm leading-snug">
                  {card.question}
                </h4>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm pl-8">
                {card.answer}
              </p>
            </article>
          ))}
        </div>
      </section>

      <div className="mt-16 bg-white dark:bg-slate-900 rounded-3xl p-8 border border-border shadow-sm space-y-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">Study Tips for {formattedSubject}</h3>
          <p className="text-slate-600 dark:text-slate-400">{pageContent.tip}</p>
        </div>

        <div className="p-6 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-border italic text-slate-500">
          "{pageContent.successStory}"
        </div>

        <div className="pt-8 border-t border-border">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <Zap className="w-5 h-5 text-primary" /> Ready for the next level?
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Link
              to={`/quiz/${slug}`}
              className="p-6 rounded-2xl border-2 border-primary/20 hover:border-primary bg-primary/5 transition-all text-left group"
            >
              <h4 className="font-bold text-lg text-primary flex items-center justify-between">
                Take the Quiz <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-sm text-slate-500 mt-1">
                Test your knowledge with exam-style questions for {formattedSubject}.
              </p>
            </Link>
            <Link
              to={`/study-timetable-template`}
              className="p-6 rounded-2xl border-2 border-slate-200 hover:border-slate-400 transition-all text-left group"
            >
              <h4 className="font-bold text-lg flex items-center justify-between">
                Add to Planner <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </h4>
              <p className="text-sm text-slate-500 mt-1">Schedule more {formattedSubject} sessions in your weekly timetable.</p>
            </Link>
          </div>
        </div>

        <section className="pt-12 mt-12 border-t border-border">
          <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
          <div className="space-y-6">
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Who are these {formattedSubject} cards for?</h4>
              <p className="text-slate-500">Perfect for {activeLevel} students, adult learners, and anyone preparing for {formattedSubject} exams and foundational concepts.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">How often should I review?</h4>
              <p className="text-slate-500">We recommend daily sessions using our integrated spaced-repetition logic. Mark your confidence on every card to optimize your review schedule.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Is this data accurate?</h4>
              <p className="text-slate-500">
                {isVerified
                  ? `These ${formattedSubject} materials have been validated against standard academic curricula and verified for educational accuracy.`
                  : `Our study guides are cross-referenced with standard ${activeLevel} curricula to ensure accuracy and relevance.`}
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Flashcards;
