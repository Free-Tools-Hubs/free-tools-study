import { Helmet } from 'react-helmet-async';
import { Shield, Lock, FileText, Mail } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-6 space-y-12">
      <Helmet>
        <title>Privacy Policy - StudyToolsHub</title>
        <meta name="robots" content="noindex" />
      </Helmet>

      <div className="space-y-4 text-center">
        <div className="w-16 h-16 bg-primary/10 text-primary rounded-full flex items-center justify-center mx-auto mb-4">
          <Shield className="w-8 h-8" />
        </div>
        <h1 className="text-4xl font-black">Privacy Policy</h1>
        <p className="text-slate-500">Effective Date: April 16, 2026</p>
      </div>

      <div className="prose prose-slate dark:prose-invert max-w-none space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4">1. Data Collection</h2>
          <p>
            StudyToolsHub is a 100% client-side application. We do NOT collect, store, or transmit your personal data to any external server.
            All flashcards, quiz history, and study plans you create stay exclusively on your device within your browser's LocalStorage and IndexedDB.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">2. Cookies and Tracking</h2>
          <p>
            We use Google Analytics and Google AdSense to monitor website traffic and display advertisements. These services may use cookies to
            collect anonymous usage data (like your IP address and browser type). You can disable cookies in your browser settings if you wish to opt out.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">3. Third-Party Services</h2>
          <p>
            Our site contains links to third-party tools and advertisements. We are not responsible for the privacy practices or content of these external sites.
          </p>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">4. Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us at support@studytoolshub.com.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
