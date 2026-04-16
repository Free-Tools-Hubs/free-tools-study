import { ArrowRight, Zap, Target, BookMarked, Share2, History, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import AdSlot from '../components/AdSlot';
import studyData from '../data/studyTopics.json';

const Home = () => {
  const { streak, decks, quizHistory } = useStore();
  const hasHistory = streak > 0 || Object.keys(decks).length > 0 || quizHistory.length > 0;

  return (
    <div className="space-y-24 py-12">
      {hasHistory && (
        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 mb-[-4rem] animate-fade-in">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-white p-3 rounded-2xl shadow-lg">
                <History className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Welcome back!</h2>
                <p className="text-slate-500">You have a {streak} day streak. Ready to continue?</p>
              </div>
            </div>
            <div className="flex gap-3">
              {Object.keys(decks).length > 0 && (
                <Link to={`/${Object.keys(decks)[0]}`} className="px-6 py-3 bg-white dark:bg-slate-800 border border-border rounded-xl font-bold hover:shadow-md transition-all text-sm">
                  Continue Decks
                </Link>
              )}
              <Link to="/study-timetable-template" className="px-6 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-hover shadow-md transition-all text-sm">
                Open Planner
              </Link>
            </div>
          </div>
        </section>
      )}

      <section className="text-center space-y-6 max-w-3xl mx-auto">
        <div className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2">
          New: AI-Native (Zero API) Flashcard Generator
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
          Supercharge Your Study Sessions with <span className="text-primary">Instant Tools.</span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400">
          Create flashcards, quizzes, and study planners in seconds. Works offline, no accounts, 100% free forever.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
          <Link to="/biology-cell-biology" className="bg-primary hover:bg-primary-hover text-white px-8 py-4 rounded-lg font-bold shadow-lg flex items-center justify-center gap-2 text-lg">
            Create Flashcards <ArrowRight className="w-5 h-5" />
          </Link>
          <Link to="/study-timetable-template" className="bg-white dark:bg-slate-800 border border-border px-8 py-4 rounded-lg font-bold shadow-sm flex items-center justify-center gap-2 text-lg hover:shadow-md transition-all">
            Build Study Plan
          </Link>
        </div>
      </section>

      <AdSlot id="home-leaderboard" format="horizontal" className="max-w-4xl mx-auto" />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <Link to="/biology-cell-biology" className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group text-left block">
          <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Instant Flashcards</h3>
          <p className="text-slate-500">Generate 20+ interactive flashcards for any subject from our massive human-curated database. Flip, review, and master.</p>
        </Link>
        <Link to="/quiz/biology-cell-biology" className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group text-left block">
          <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Adaptive Quizzes</h3>
          <p className="text-slate-500">Test your knowledge with multiple-choice questions tailored to your level. Get instant feedback and retry tricky topics.</p>
        </Link>
        <Link to="/study-timetable-template" className="bg-white dark:bg-slate-900 p-8 rounded-2xl border border-border shadow-sm hover:shadow-xl transition-all duration-300 group text-left block">
          <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <BookMarked className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold mb-3">Smart Planners</h3>
          <p className="text-slate-500">Drag-and-drop your way to the perfect study schedule. Optimized for finals, midterm prep, and daily focus.</p>
        </Link>
      </section>

      <section className="bg-slate-900 text-white p-12 rounded-3xl relative overflow-hidden">
        <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl font-bold">Why Students Love Us</h2>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <div className="mt-1 bg-primary rounded-full p-1"><ArrowRight className="w-3 h-3 text-white" /></div>
                <span><strong>No Account Needed:</strong> Start studying immediately. Your data stays on your device.</span>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 bg-primary rounded-full p-1"><ArrowRight className="w-3 h-3 text-white" /></div>
                <span><strong>Works Offline:</strong> Study on the bus, in the library, or anywhere without Wi-Fi.</span>
              </li>
              <li className="flex gap-3">
                <div className="mt-1 bg-primary rounded-full p-1"><ArrowRight className="w-3 h-3 text-white" /></div>
                <span><strong>SEO-Powered Learning:</strong> Find precise topics searching Google, get instant tools.</span>
              </li>
            </ul>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center font-bold">JD</div>
              <div>
                <div className="font-bold">Jamie Dawson</div>
                <div className="text-sm text-slate-400">Pre-med Student</div>
              </div>
            </div>
            <p className="italic text-lg text-slate-300">"This app saved my Biology finals. I searched for 'mitosis flashcards' and within 2 seconds I was already reviewing. No login, no ads covering the content, just speed."</p>
          </div>
        </div>
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-primary/20 blur-[100px] rounded-full"></div>
      </section>

      <section className="text-center space-y-8">
        <h2 className="text-3xl font-bold">Browse Popular Categories</h2>
        <div className="flex flex-wrap gap-3 justify-center">
          {['Biology', 'Chemistry', 'Physics', 'History', 'Psychology', 'Literature', 'Math', 'Economics', 'Computer Science'].map(cat => {
            // Find the first topic matching this subject in our database
            const match = (studyData as any[]).find(t => t.subject.toLowerCase() === cat.toLowerCase());
            const targetSlug = match ? match.slug : 'biology-cell-biology';

            return (
              <Link
                key={cat}
                to={`/${targetSlug}`}
                className="px-6 py-3 rounded-full border border-border hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer font-medium transition-colors"
              >
                {cat}
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
};

export default Home;
