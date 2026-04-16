import { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { HelpCircle, ChevronRight, CheckCircle2, AlertCircle, RefreshCcw, Layers, Calendar, Zap, Clock } from 'lucide-react';
import { useStore } from '../store/useStore';
import { generateQuizQuestions, shuffleAndScoreQuiz, QuizQuestion } from '../modules/studyEngine';
import { getPageContent, hashString } from '../utils/deterministicVariationEngine';
import AdSlot from '../components/AdSlot';
import studyData from '../data/studyTopics.json';


const Quiz = () => {
  const { subject } = useParams();
  const { addQuizResult, incrementStreak } = useStore();
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [scoreResult, setScoreResult] = useState<any>(null);

  const slug = subject || 'biology-cell-biology';
  const topicData = useMemo(() => (studyData as any[]).find(t => t.slug === slug) || (studyData as any[])[0], [slug]);
  const formattedSubject = topicData.subTopic || 'Biology';
  const level = topicData.level || 'High School';

  const pageContent = useMemo(() => {
    const seed = topicData.variationSeed || hashString(slug);
    return getPageContent(formattedSubject, level, seed);
  }, [formattedSubject, level, topicData.variationSeed, slug]);

  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    incrementStreak();
    const quizQuestions = generateQuizQuestions(topicData, 10);
    setQuestions(quizQuestions);
  }, [slug, topicData]);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

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
    setCurrentIndex(0);
    setUserAnswers({});
    setIsFinished(false);
    setSelectedOption(null);
    setScoreResult(null);
    setShowReview(false);
    setQuestions(generateQuizQuestions(topicData, 10));
  };

  if (questions.length === 0) return <div className="p-20 text-center">Loading quiz...</div>;

  return (
    <div className="max-w-4xl mx-auto py-8 space-y-12">
      <Helmet>
        <title>{formattedSubject} Quiz - {level} Practice Questions</title>
        <meta name="description" content={topicData.description || `Practice ${formattedSubject} with these ${level} quiz questions. Instant feedback and detailed explanations included.`} />
        <link rel="canonical" href={`https://study.freetoolshubs.com/quiz/${subject}`} />

        {/* Structured Data (JSON-LD) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://study.freetoolshubs.com/" },
              { "@type": "ListItem", "position": 2, "name": "Quizzes", "item": "https://study.freetoolshubs.com/quiz/biology-cell-biology" },
              { "@type": "ListItem", "position": 3, "name": formattedSubject, "item": `https://study.freetoolshubs.com/quiz/${subject}` }
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
                  "text": `This practice test contains ${questions.length} randomized questions covering core ${formattedSubject} topics for ${level} students.`
                }
              },
              {
                "@type": "Question",
                "name": "Are there explanations for the answers?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Yes, every question in our quiz maker includes a detailed explanation to help you learn while you practice."
                }
              }
            ]
          })}
        </script>
      </Helmet>


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
                <span>Interactive Quiz • {level}</span>
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
                <AlertCircle className="w-4 h-4" /> Final answer select
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
            <p className="text-slate-500 text-sm">Yes, you can retake the quiz as many times as you like. We randomize the question order to ensure you're learning, not just memorizing.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Is this for {level}?</h4>
            <p className="text-slate-500 text-sm">Exactly. This set is specifically tuned for {level} curriculum standards and exam requirements.</p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-slate-800 dark:text-slate-200">Are these real exam questions?</h4>
            <p className="text-slate-500 text-sm">While these are practice questions, they are modeled after standard {formattedSubject} assessments to provide a realistic experience.</p>
          </div>
        </div>
      </section>
    </div>
  );
};


export default Quiz;
