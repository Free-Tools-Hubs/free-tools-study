import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Search, Home, ArrowLeft } from 'lucide-react';

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-6">
      <Helmet>
        <title>404 - Page Not Found | StudyToolsHub</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="space-y-6">
        <div className="relative">
          <span className="text-[12rem] font-black text-slate-100 dark:text-slate-900 leading-none select-none">404</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <Search className="w-24 h-24 text-primary animate-bounce" />
          </div>
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-extrabold">Topic Not Found</h1>
          <p className="text-xl text-slate-500 max-w-md mx-auto">
            We couldn't find the study guide you're looking for. It might have moved or is being updated.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link to="/" className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg flex items-center gap-2 hover:bg-primary-hover transition-all">
            <Home className="w-5 h-5" /> Back to Home
          </Link>
          <button onClick={() => window.history.back()} className="bg-white dark:bg-slate-800 border border-border px-8 py-4 rounded-xl font-bold flex items-center gap-2 hover:shadow-md transition-all">
            <ArrowLeft className="w-5 h-5" /> Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
