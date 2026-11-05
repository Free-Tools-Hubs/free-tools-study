import { Helmet } from 'react-helmet-async';
import { Mail, MessageSquare, MapPin, Send } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-16">
      <Helmet>
        <title>Contact Us — StudyToolsHub</title>
        <meta name="description" content="Have questions or feedback? Contact the StudyToolsHub team for support, feature suggestions, and educational partnerships." />
        <link rel="canonical" href="https://study.freetoolshubs.com/contact" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Contact Us — StudyToolsHub" />
        <meta property="og:description" content="Reach out to the StudyToolsHub team for support and educational partnerships." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://study.freetoolshubs.com/contact" />
        <meta property="og:image" content="https://study.freetoolshubs.com/og-main.png" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section className="text-center space-y-4">
        <h1 className="text-4xl font-black">Get in Touch</h1>
        <p className="text-xl text-slate-500 max-w-xl mx-auto">
          We're here to help you master your curriculum. Reach out with any questions, bug reports, or tool suggestions.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-border shadow-xl">
          <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Message sent! (Simulation)'); }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Full Name</label>
                <input type="text" placeholder="John Doe" className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" required />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-500 ml-1">Email Address</label>
                <input type="email" placeholder="john@example.com" className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" required />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Subject</label>
              <select className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all">
                <option>General Inquiry</option>
                <option>Report a Bug</option>
                <option>Subject Suggestion</option>
                <option>Partnership</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-500 ml-1">Message</label>
              <textarea placeholder="How can we help you?" rows={5} className="w-full p-4 rounded-2xl border border-border bg-slate-50 dark:bg-slate-800 focus:ring-2 focus:ring-primary outline-none transition-all" required></textarea>
            </div>
            <button type="submit" className="w-full bg-primary text-white py-4 rounded-2xl font-black shadow-lg shadow-primary/30 flex items-center justify-center gap-2 hover:bg-primary-hover transform hover:-translate-y-1 transition-all">
              <Send className="w-5 h-5" /> Send Message
            </button>
          </form>
        </div>

        <div className="space-y-8">
          <div className="bg-slate-900 text-white p-8 rounded-3xl space-y-6">
            <h3 className="text-2xl font-bold">Contact Info</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="text-slate-400">Email Us</p>
                  <p className="font-bold">support@studytoolshub.com</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center text-emerald-500">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div className="text-sm">
                  <p className="text-slate-400">Response Time</p>
                  <p className="font-bold">Under 24 Hours</p>
                </div>
              </div>
            </div>
          </div>
          <div className="p-8 border border-border rounded-3xl text-sm italic text-slate-500">
            "Your feedback helps us build the best free education platform on the web."
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
