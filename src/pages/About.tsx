import { Helmet } from 'react-helmet-async';
import { BookOpen, Zap, Target, Globe } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-16">
      <Helmet>
        <title>About Us - StudyToolsHub</title>
        <meta name="description" content="Learn about the mission behind StudyToolsHub - providing free, fast, and offline study tools for students worldwide." />
      </Helmet>

      <section className="text-center space-y-6">
        <h1 className="text-5xl font-black tracking-tight">Revolutionizing <span className="text-primary">Free Education.</span></h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto">
          We believe every student deserves access to premium study tools without paywalls, sign-ups, or internet dependencies.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm">
          <Zap className="w-10 h-10 text-primary mb-4" />
          <h3 className="text-xl font-bold mb-2">Speed First</h3>
          <p className="text-slate-500">No loading bars, no login forms. Search a topic and start studying in under 2 seconds.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm">
          <Globe className="w-10 h-10 text-emerald-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Offline Ready</h3>
          <p className="text-slate-500">Perfect for commuters and rural areas. Once loaded, all tools work perfectly without Wi-Fi.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm">
          <Target className="w-10 h-10 text-amber-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Science Based</h3>
          <p className="text-slate-500">Our planner uses interleaving and spaced repetition principles to maximize retention.</p>
        </div>
        <div className="bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-sm">
          <BookOpen className="w-10 h-10 text-indigo-500 mb-4" />
          <h3 className="text-xl font-bold mb-2">Open Database</h3>
          <p className="text-slate-500">Curated by educators, scaled by technology. We cover over 5,000 unique academic subjects.</p>
        </div>
      </div>

      <section className="bg-primary/5 rounded-3xl p-12 border border-primary/20 text-center">
        <h2 className="text-3xl font-bold mb-4">Our Commitment</h2>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          StudyToolsHub will always remain 100% free for students. We monetize solely through unobtrusive advertising to keep our servers running and our tools sharp.
        </p>
      </section>
    </div>
  );
};

export default About;
