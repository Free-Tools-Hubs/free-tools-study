import { useState } from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Home as HomeIcon, Menu, X, Layers, Target, Calendar, Globe } from 'lucide-react';
import StreakBanner from '../components/StreakBanner';

const MainLayout = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <StreakBanner />
      <header className="glass sticky top-0 z-50 px-6 py-4 flex justify-between items-center bg-white/50 dark:bg-slate-900/50">

        <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
          <BookOpen className="w-8 h-8" />
          <span>StudyToolsHub</span>
        </Link>

        <nav className="hidden md:flex gap-8 items-center text-sm font-semibold">
          <Link to="/" className="hover:text-primary flex items-center gap-1 transition-colors">
            <HomeIcon className="w-4 h-4" /> Home
          </Link>
          <Link to="/biology-cell-biology" className="hover:text-primary flex items-center transition-colors">Flashcards</Link>
          <Link to="/quiz/biology-cell-biology" className="hover:text-primary flex items-center transition-colors">Quizzes</Link>
          <Link to="/study-timetable-template" className="hover:text-primary flex items-center transition-colors">Planner</Link>
          <button
            onClick={() => navigate('/biology-cell-biology')}
            className="bg-primary text-white px-5 py-2 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all active:scale-95 ml-4"
          >
            Start Studying
          </button>
        </nav>

        <button
          className="md:hidden p-2 text-slate-600 dark:text-slate-400"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
        </button>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white dark:bg-slate-900 border-b border-border shadow-2xl p-6 space-y-4 animate-slide-down z-50">
            <Link to="/" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold">
              <HomeIcon className="w-5 h-5 text-primary" /> Home
            </Link>
            <Link to="/biology-cell-biology" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold">
              <Layers className="w-5 h-5 text-primary" /> Flashcards
            </Link>
            <Link to="/quiz/biology-cell-biology" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold">
              <Target className="w-5 h-5 text-primary" /> Quizzes
            </Link>
            <Link to="/study-timetable-template" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 dark:bg-slate-800 font-bold">
              <Calendar className="w-5 h-5 text-primary" /> Planner
            </Link>
            <button
              onClick={() => { setIsMenuOpen(false); navigate('/biology-cell-biology'); }}
              className="w-full bg-primary text-white p-4 rounded-xl font-bold shadow-lg"
            >
              Start Learning Now
            </button>
          </div>
        )}
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 animate-fade-in">
        <Outlet />
      </main>

      <footer className="mt-auto py-12 px-6 border-t border-border bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">StudyToolsHub</h3>
            <p className="text-sm text-slate-500">100% free, offline-first study tools for students worldwide. No sign-ups required.</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Tools</h4>
            <ul className="text-sm space-y-2 text-slate-500">
              <li><Link to="/biology-cell-biology">Flashcard Generator</Link></li>
              <li><Link to="/quiz/biology-cell-biology">Quiz Maker</Link></li>
              <li><Link to="/study-timetable-template">Timetable Template</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Popular Subjects</h4>
            <ul className="text-sm space-y-2 text-slate-500">
              <li><Link to="/biology-cell-biology" className="hover:text-primary transition-colors">Biology</Link></li>
              <li><Link to="/chemistry-organic-chemistry" className="hover:text-primary transition-colors">Chemistry</Link></li>
              <li><Link to="/physics-mechanics" className="hover:text-primary transition-colors">Physics</Link></li>
              <li><Link to="/psychology-intro" className="hover:text-primary transition-colors">Psychology</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 text-slate-700 dark:text-slate-300">Support</h4>
            <ul className="text-sm space-y-2 text-slate-500">
              <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
              <li><Link to="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-border text-center text-xs text-slate-400">
          © {new Date().getFullYear()} StudyToolsHub. Built for students, by students.
        </div>
      </footer>
    </div>
  );
};

export default MainLayout;
