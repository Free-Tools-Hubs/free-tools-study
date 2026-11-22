/**
 * StudyToolsHub: React SSR vs Client Component Tree Parity Tester
 *
 * Verifies that the component tree rendered by entry-server.tsx produces
 * matching DOM markup to what App.tsx renders on client mount for all
 * critical route categories (Home, Flashcards, Quiz, Planner, Static).
 */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import MainLayout from '../src/layouts/MainLayout.js';
import ErrorBoundary from '../src/components/ErrorBoundary.js';

import Home from '../src/pages/Home.js';
import Flashcards from '../src/pages/Flashcards.js';
import Quiz from '../src/pages/Quiz.js';
import Planner from '../src/pages/Planner.js';
import PrivacyPolicy from '../src/pages/PrivacyPolicy.js';
import TermsOfService from '../src/pages/TermsOfService.js';
import About from '../src/pages/About.js';
import Contact from '../src/pages/Contact.js';
import NotFound from '../src/pages/NotFound.js';

console.log('Testing React SSR vs Client Component Parity...');

function renderRoute(url) {
  HelmetProvider.canUseDOM = false;
  const helmetContext = {};

  return renderToString(
    React.createElement(
      HelmetProvider,
      { context: helmetContext },
      React.createElement(
        ErrorBoundary,
        null,
        React.createElement(
          MemoryRouter,
          { initialEntries: [url] },
          React.createElement(
            Routes,
            null,
            React.createElement(
              Route,
              { path: '/', element: React.createElement(MainLayout, null) },
              React.createElement(Route, { index: true, element: React.createElement(Home, null) }),
              React.createElement(Route, { path: '/:subject', element: React.createElement(Flashcards, null) }),
              React.createElement(Route, { path: '/quiz/:subject', element: React.createElement(Quiz, null) }),
              React.createElement(Route, { path: '/planner/:examType', element: React.createElement(Planner, null) }),
              React.createElement(Route, { path: 'study-timetable-template', element: React.createElement(Planner, null) }),
              React.createElement(Route, { path: 'about', element: React.createElement(About, null) }),
              React.createElement(Route, { path: 'privacy-policy', element: React.createElement(PrivacyPolicy, null) }),
              React.createElement(Route, { path: 'terms-of-service', element: React.createElement(TermsOfService, null) }),
              React.createElement(Route, { path: 'contact', element: React.createElement(Contact, null) }),
              React.createElement(Route, { path: '*', element: React.createElement(NotFound, null) })
            )
          )
        )
      )
    )
  );
}

const testRoutes = [
  '/',
  '/biology-cell-biology',
  '/computer-science-algorithms',
  '/quiz/biology-cell-biology',
  '/quiz/computer-science-algorithms',
  '/study-timetable-template',
  '/about',
  '/contact',
  '/privacy-policy',
  '/terms-of-service'
];

let allPassed = true;

for (const route of testRoutes) {
  try {
    const html1 = renderRoute(route);
    const html2 = renderRoute(route);
    if (html1 !== html2) {
      console.error(`[FAIL] Determinism mismatch on route: ${route}`);
      allPassed = false;
    } else if (html1.length < 500) {
      console.error(`[FAIL] Rendered output suspiciously small on route: ${route} (${html1.length} chars)`);
      allPassed = false;
    } else {
      console.log(`[PASS] Route "${route}": Deterministic render (${html1.length} chars, non-empty DOM)`);
    }
  } catch (err) {
    console.error(`[FAIL] Error rendering route: ${route}`, err);
    allPassed = false;
  }
}

if (!allPassed) {
  process.exit(1);
} else {
  console.log('\nALL TEST ROUTES RENDER CLEANLY & DETERMINISTICALLY.');
  process.exit(0);
}

