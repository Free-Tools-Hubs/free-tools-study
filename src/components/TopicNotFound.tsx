import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { AlertCircle, ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { studyDataService } from '../services/studyDataService';

interface TopicNotFoundProps {
  slug?: string;
  tool?: 'flashcards' | 'quiz';
}

export const TopicNotFound: React.FC<TopicNotFoundProps> = ({ slug, tool = 'flashcards' }) => {
  const verifiedTopics = studyDataService.getIndexableTopics().slice(0, 6);

  return (
    <div className="max-w-3xl mx-auto py-16 px-4 space-y-8 text-center">
      <Helmet>
        <title>Topic Not Found — StudyToolsHub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="w-20 h-20 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
        <AlertCircle className="w-10 h-10" />
      </div>

      <div className="space-y-3">
        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300">
          Resource Unavailable
        </span>
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white">
          Study Topic Not Found
        </h1>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          The requested study topic <code className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-sm font-mono text-primary">{slug || 'unknown'}</code> is not available in our verified academic database.
        </p>
      </div>

      <div className="p-6 bg-slate-50 dark:bg-slate-900 border border-border rounded-2xl text-left max-w-xl mx-auto text-sm text-slate-600 dark:text-slate-400 space-y-2">
        <div className="font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-primary" /> Why am I seeing this?
        </div>
        <p>
          StudyToolsHub recently migrated to a verified, high-quality canonical curriculum. Synthetic variations and obsolete duplicates have been retired to ensure all content is educational and pedagogically sound.
        </p>
      </div>

      <div className="space-y-4 pt-4">
        <h2 className="text-sm font-bold uppercase tracking-wider text-slate-400">
          Explore Verified Study Topics
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-w-2xl mx-auto">
          {verifiedTopics.map(topic => {
            const targetUrl = tool === 'quiz' ? `/quiz/${topic.slug}` : `/${topic.slug}`;
            return (
              <Link
                key={topic.id}
                to={targetUrl}
                className="p-4 rounded-xl border border-border bg-white dark:bg-slate-800 hover:border-primary hover:shadow-md transition-all text-left block group"
              >
                <div className="text-xs font-semibold text-primary">{topic.subject}</div>
                <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors">
                  {topic.subTopic}
                </div>
                <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-emerald-500" /> Verified Curriculum
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="pt-6">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-primary text-white font-bold hover:bg-primary-hover transition-colors shadow-md text-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </div>
    </div>
  );
};

export default TopicNotFound;

