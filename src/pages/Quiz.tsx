import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  HelpCircle,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  RefreshCcw,
  Layers,
  Calendar,
  Zap,
  Clock,
  Sparkles,
  AlertTriangle,
  GraduationCap
} from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateQuizQuestions, shuffleAndScoreQuiz, QuizQuestion } from '../modules/studyEngine';
import { getPageContent, hashString } from '../utils/deterministicVariationEngine';
import AdSlot from '../components/AdSlot';
import { studyDataService, CanonicalTopic } from '../services/studyDataService';
import TopicNotFound from '../components/TopicNotFound';

const Quiz = () => {
  const { subject } = useParams();
  const navigate = useNavigate();
  const { addQuizResult, incrementStreak } = useStore();

  // Resolve topic through centralized data access layer
  const resolution = useMemo(() => {
    return studyDataService.resolveTopic(subject || 'biology-cell-biology');
  }, [subject]);

  const topicData: CanonicalTopic | null = resolution.topic;

  // In-client self-healing redirect: replace legacy URL with canonical URL
  useEffect(() => {
    if (resolution.isLegacyRedirect && resolution.canonicalSlug && resolution.canonicalSlug !== subject) {
      navigate(`/quiz/${resolution.canonicalSlug}`, { replace: true });
    }
  }, [resolution, subject, navigate]);

  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const slug = topicData ? topicData.slug : (subject || '');
  const formattedSubject = topicData ? topicData.subTopic : 'Biology';
  const educationLevels = topicData ? topicData.educationLevels : ['High School'];
  const activeLevel = selectedLevel || educationLevels[0] || 'High School';

  // Deterministic initial questions: guarantees rich HTML on initial render & SSR
  const initialQuestions = useMemo(() => {
    if (!topicData) return [];
    return generateQuizQuestions(topicData, 10, false);
  }, [topicData]);

  const [questions, setQuestions] = useState<QuizQuestion[]>(initialQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<any>(null);
  const [showReview, setShowReview] = useState(false);

  const pageContent = useMemo(() => {
    const seed = hashString(slug);
    return getPageContent(formattedSubject, activeLevel, seed);
  }, [formattedSubject, activeLevel, slug]);

  useEffect(() => {
    if (!topicData) return;
    incrementStreak();
    if (questions.length === 0) {
      const quizQuestions = generateQuizQuestions(topicData, 10, false);
      setQuestions(quizQuestions);
    }
  }, [slug, topicData]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption || questions.length === 0) return;

    const currentQuestion = questions[currentIndex];
    const newAnswers = { ...userAnswers, [currentQuestion.id]: selectedOption };
    setUserAnswers(newAnswers);
    setSelectedOption(null);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const result = shuffleAndScoreQuiz(newAnswers, questions);
      setScoreResult(result);
      setIsFinished(true);
      addQuizResult({
        subject: slug,
        score: result.score,
        total: result.total,
        date: new Date().toISOString()
      });
    }
  };

  const restartQuiz = () => {
    if (!topicData) return;
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setSelectedOption(null);
    setScoreResult(null);
    setShowReview(false);
    setQuestions(generateQuizQuestions(topicData, 10, true));
  };

  // SOFT-404 ELIMINATION: Explicit Not-Found UI for invalid/missing slugs
  if (!topicData) {
    return <TopicNotFound slug={subject} tool="quiz" />;
  }

  const effectiveQuestions = questions.length > 0 ? questions : generateQuizQuestions(topicData, 10, false);
  const currentQuestion = effectiveQuestions[currentIndex] || effectiveQuestions[0];
  const isVerified = topicData.contentQuality.status === 'verified';
  const isNeedsReview = topicData.contentQuality.status === 'needs_review';

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <Helmet>
        <title>{`${formattedSubject} Practice Quiz — ${activeLevel} Questions | StudyToolsHub`}</title>
        <meta
          name="description"
          content={topicData.description || `Practice ${formattedSubject} with these ${activeLevel} quiz questions. Instant feedback and detailed explanations included.`}
        />
        {/* Primary Canonical Policy: Consolidate link equity to primary educational topic page */}
        <link rel="canonical" href={`https://study.freetoolshubs.com/${topicData.slug}`} />

        {/* Interactive Tool Directive: All quiz routes carry noindex, follow to prevent cannibalization */}
        <meta name="robots" content="noindex, follow" />

        {/* Open Graph / Social Media */}
        <meta property="og:title" content={`${formattedSubject} Practice Quiz — ${activeLevel}`} />
        <meta property="og:description" content={topicData.description || `Practice ${formattedSubject} with instant quiz questions.`} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={`https://study.freetoolshubs.com/quiz/${topicData.slug}`} />
        <meta property="og:image" content="https://study.freetoolshubs.com/og-quiz.png" />
        <meta name="twitter:card" content="summary_large_image" />

        {/* Structured Data (JSON-LD) */}
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
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": `How many questions are in the ${formattedSubject} quiz?`,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": `This practice test contains ${effectiveQuestions.length} questions covering core ${formattedSubject} topics for ${activeLevel} students.`
                }
              },
              {
                "@type": "Question",
                "name": "Are there explanations for the answers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, every question in our quiz includes an explanation to reinforce conceptual mastery."
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
          <span>Verified Academic Curriculum — Pedagogically validated questions with authoritative explanations.</span>
        </div>
      ) : isNeedsReview ? (
        <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-xl text-amber-800 dark:text-amber-300 text-xs font-medium">
          <AlertTriangle className="w-4 h-4 text-amber-600 flex-shrink-0" />
          <span>Curated Questions undergoing specialist syllabus review.</span>
        </div>
      ) : (
        <div className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-xs font-medium">
          <GraduationCap className="w-4 h-4 text-slate-500 flex-shrink-0" />
          <span>Foundational Practice Questions. Evaluates core concepts in {topicData.subject}.</span>
        </div>
      )}

      {isFinished ? (
        <div className="max-w-xl mx-auto py-12 text-center space-y-8 animate-fade-in">
          <div className="w-24 h-24 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-12 h-12" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-extrabold">Quiz Completed!</h1>
            <p className="text-slate-500 text-lg">You scored {scoreResult.percentage}% in {formattedSubject}</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-border rounded-3xl p-8 shadow-xl">
            <div className="text-5xl font-black text-primary mb-2">{scoreResult.score} / {scoreResult.total}</div>
            <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Correct Answers</div>
          </div>

          <div className="flex flex-col gap-3">
            <button
              onClick={() => setShowReview(!showReview)}
              className="w-full py-4 text-primary font-bold hover:underline"
            >
              {showReview ? 'Hide Explanations' : 'Review Correct Answers & Explanations'}
            </button>

            {showReview && (
              <div className="text-left space-y-4 max-w-2xl mx-auto mt-4">
                {questions.map((q, idx) => {
                  const isCorrect = userAnswers[q.id] === q.correctAnswer;
                  return (
                    <div key={q.id} className={`p-6 rounded-2xl border ${isCorrect ? 'border-emerald-100 bg-emerald-50/30' : 'border-red-100 bg-red-50/30'}`}>
                      <div className="font-bold mb-2">{idx + 1}. {q.question}</div>
                      <div className="text-sm space-y-1">
                        <div className={`${isCorrect ? 'text-emerald-600' : 'text-red-600'}`}>Your Answer: {userAnswers[q.id]}</div>
                        {!isCorrect && <div className="text-emerald-600 font-semibold">Correct Answer: {q.correctAnswer}</div>}
                        <div className="mt-3 text-slate-500 italic">"{q.explanation}"</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <button onClick={restartQuiz} className="bg-primary text-white py-4 rounded-2xl font-bold shadow-lg flex items-center justify-center gap-2 hover:bg-primary-hover transition-all">
              <RefreshCcw className="w-5 h-5" /> Retake Quiz
            </button>

            <div className="grid grid-cols-2 gap-3">
              <Link
                to={`/${slug}`}
                className="px-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Layers className="w-4 h-4" /> Review Cards
              </Link>
              <Link
                to={`/study-timetable-template`}
                className="px-4 py-4 bg-slate-100 dark:bg-slate-800 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2 text-sm"
              >
                <Calendar className="w-4 h-4" /> Add to Plan
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <>
          <header className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-emerald-600 font-semibold">
                <HelpCircle className="w-5 h-5" />
                <span>Interactive Quiz • {topicData.subject}</span>
              </div>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${topicData.difficulty === 'Advanced' ? 'bg-red-100 text-red-600' :
                    topicData.difficulty === 'Intermediate' ? 'bg-amber-100 text-amber-600' :
                      'bg-emerald-100 text-emerald-600'
                  }`}>
                  {topicData.difficulty || 'Beginner'}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {topicData.estimatedTime || '20 mins'}
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-4xl font-extrabold">{formattedSubject} Practice Questions</h1>
              <p className="text-lg text-slate-500 max-w-3xl">
                {topicData.description || pageContent.intro}
              </p>
            </div>

            {/* Compatible Education Levels */}
            {educationLevels.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Target Education Level:
                </div>
                <div className="flex flex-wrap gap-2">
                  {educationLevels.map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setSelectedLevel(lvl)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        activeLevel === lvl
                          ? 'bg-emerald-600 text-white shadow-sm'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-wrap gap-2 pt-2">
              {(topicData.tags || []).map((tag: string) => (
                <span key={tag} className="text-[10px] font-bold text-slate-400">#{tag}</span>
              ))}
            </div>
          </header>

          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 border border-border shadow-xl">
            <div className="flex justify-between items-center mb-8 pb-4 border-b border-border">
              <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">Question {currentIndex + 1} of {questions.length}</div>
              <div className="h-2 w-32 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-8">
              <h2 className="text-2xl font-bold leading-snug">{questions[currentIndex].question}</h2>

              <div className="grid gap-4">
                {questions[currentIndex].options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleOptionSelect(option)}
                    aria-label={`Select option ${idx + 1}: ${option}`}
                    className={`flex items-center justify-between p-5 rounded-2xl border-2 transition-all group font-medium text-left ${selectedOption === option
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                      }`}
                  >
                    <span>{option}</span>
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOption === option ? 'border-primary bg-primary' : 'border-slate-300'
                      }`}>
                      {selectedOption === option && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-12 pt-8 flex justify-between items-center border-t border-border">
              <div className="flex items-center gap-2 text-slate-400 text-sm">
                <AlertCircle className="w-4 h-4" /> Choose best answer
              </div>
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`px-8 py-3 rounded-xl font-bold shadow-lg flex items-center gap-2 transition-all ${selectedOption
                    ? 'bg-primary text-white hover:bg-primary-hover'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
              >
                {currentIndex === questions.length - 1 ? 'Finish Quiz' : 'Next'} <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </>
      )}

      <section className="mt-12 pt-12 border-t border-border">
        <h3 className="text-2xl font-bold mb-8">Quiz FAQs</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">How is this quiz scored?</h4>
            <p className="text-slate-500 text-sm">We calculate your score instantly based on correct answers. You need a 70% or higher to "Master" this {formattedSubject} topic.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Can I retake the test?</h4>
            <p className="text-slate-500 text-sm">Yes, you can retake the quiz as many times as you like. Shuffle question order to ensure you're learning, not just memorizing.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Is this for {activeLevel}?</h4>
            <p className="text-slate-500 text-sm">Exactly. This set is tuned for {activeLevel} curriculum standards and exam requirements.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Are these real exam questions?</h4>
            <p className="text-slate-500 text-sm">
              {isVerified
                ? `Yes, questions have been authored and verified against standard ${formattedSubject} assessment frameworks.`
                : `While these are practice questions, they are modeled after standard ${formattedSubject} assessments to provide a realistic experience.`}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
