import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import { useStore } from './store/useStore';
import ErrorBoundary from './components/ErrorBoundary';


// For Phase 1, we'll keep it simple and then add lazy loading
import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Planner from './pages/Planner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';


function App() {

  const { loadState, incrementStreak } = useStore();

  useEffect(() => {
    loadState();
    incrementStreak();
  }, []);

  return (
    <HelmetProvider>
      <ErrorBoundary>
        <Router>
          <Routes>

        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/:subject" element={<Flashcards />} />
          <Route path="/quiz/:subject" element={<Quiz />} />
          <Route path="/planner/:examType" element={<Planner />} />
          <Route path="study-timetable-template" element={<Planner />} />
          <Route path="about" element={<About />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
          <Route path="terms-of-service" element={<TermsOfService />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />

        </Route>
      </Routes>

    </Router>
    </ErrorBoundary>
    </HelmetProvider>
  );
}


export default App;

