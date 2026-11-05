import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from './layouts/MainLayout';
import ErrorBoundary from './components/ErrorBoundary';

import Home from './pages/Home';
import Flashcards from './pages/Flashcards';
import Quiz from './pages/Quiz';
import Planner from './pages/Planner';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import About from './pages/About';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export interface RenderResult {
  appHtml: string;
  helmet: {
    title: string;
    meta: string;
    link: string;
    script: string;
  };
}

export function render(url: string): RenderResult {
  HelmetProvider.canUseDOM = false;
  const helmetContext: { helmet?: any } = {};

  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <ErrorBoundary>
        <MemoryRouter initialEntries={[url]}>
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
        </MemoryRouter>
      </ErrorBoundary>
    </HelmetProvider>
  );

  const { helmet } = helmetContext;

  return {
    appHtml,
    helmet: {
      title: helmet?.title ? helmet.title.toString() : '',
      meta: helmet?.meta ? helmet.meta.toString() : '',
      link: helmet?.link ? helmet.link.toString() : '',
      script: helmet?.script ? helmet.script.toString() : '',
    }
  };
}
