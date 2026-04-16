import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { BookMarked, Share2, Layers, Repeat, Target, ChevronLeft, ChevronRight, Zap, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateFlashcards, Flashcard } from '../modules/studyEngine';
import { getPageContent, hashString } from '../utils/deterministicVariationEngine';
import AdSlot from '../components/AdSlot';
import studyData from '../data/studyTopics.json';

const Flashcards = () => {
  const { subject } = useParams();
  const { decks, saveDeck, incrementStreak } = useStore();
  const [currentDeck, setCurrentDeck] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const slug = subject || 'biology-cell-biology';
  const topicData = useMemo(() => (studyData as any[]).find(t => t.slug === slug) || (studyData as any[])[0], [slug]);
  const formattedSubject = topicData.subTopic || 'Biology';
  const level = topicData.level || 'High School';

  // Deterministic content
  const pageContent = useMemo(() => {
    const seed = topicData.variationSeed || hashString(slug);
    return getPageContent(formattedSubject, level, seed);
  }, [formattedSubject, level, topicData.variationSeed, slug]);

  useEffect(() => {
    incrementStreak();
    if (decks[slug]) {
      setCurrentDeck(decks[slug]);
    } else {
      const cards = generateFlashcards(topicData, 12);
      setCurrentDeck(cards);
      saveDeck(slug, cards);
    }
    setIsLoading(false);
  }, [slug, topicData]);

  const handleNext = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % currentDeck.length);
    }, 150);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev - 1 + currentDeck.length) % currentDeck.length);
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

  if (isLoading || currentDeck.length === 0) return <div className="p-20 text-center">Loading deck...</div>;

  const currentCard = currentDeck[currentIndex];

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-8">
      <Helmet>
        <title>{formattedSubject} Flashcards - {level} Study Tools</title>
        <meta name="description" content={topicData.description || `Master ${formattedSubject} with our free ${level} flashcards. 100% offline, no sign-up needed.`} />
        <link rel="canonical" href={`https://study.freetoolshubs.com/${subject}`} />
        
        {/* Open Graph / Social Media */}
        <meta property="og:title" content={`${formattedSubject} Flashcards - ${level}`} />
        <meta property="og:description" content={topicData.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://study.freetoolshubs.com/${subject}`} />
        <meta property="og:image" content="https://study.freetoolshubs.com/og-flashcards.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://study.freetoolshubs.com/" },
              { "@type": "ListItem", "position": 2, "name": formattedSubject, "item": `https://study.freetoolshubs.com/${subject}` }
            ]
          })}
        </script>
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
                  "text": `This deck covers ${currentDeck.length} essential concepts for ${level} ${formattedSubject}, including key definitions and practical applications.`
                }
              },
              {
                "@type": "Question",
                "name": "Can I use these flashcards offline?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes! All StudyToolsHub materials are 100% offline-ready once the initial page has loaded."
                }
              }
            ]
          })}
        </script>
      </Helmet>


      <header className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-primary font-semibold">
            <Layers className="w-5 h-5" />
            <span>Flashcard Deck • {level}</span>
          </div>
          <div className="flex gap-2">
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${topicData.difficulty === 'Advanced' ? 'bg-red-100 text-red-600' :
                topicData.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-600' :
                  'bg-emerald-100 text-emerald-600'
              }`}>
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
              <p className="text-sm text-slate-500 mt-1">Test your knowledge with 15 exam-style questions.</p>
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
              <p className="text-slate-500">Perfect for {level} students, adult learners, and anyone preparing for {formattedSubject} exams and advanced concepts.</p>
            </div>

            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">How often should I review?</h4>
              <p className="text-slate-500">We recommend daily sessions using our integrated spaced-repetition logic. Mark your confidence on every card to optimize your review schedule.</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-bold text-slate-800 dark:text-slate-200">Is this data accurate?</h4>
              <p className="text-slate-500">Our study guides are curated by academic experts and cross-referenced with standard {level} curricula to ensure accuracy and relevance.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};



export default Flashcards;
