import React, { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

// Lazy load route components for code splitting
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const BlueprintsArchive = lazy(() => import('./pages/BlueprintsArchive').then(m => ({ default: m.BlueprintsArchive })));
const ThankYou = lazy(() => import('./pages/ThankYou').then(m => ({ default: m.ThankYou })));
const Test = lazy(() => import('./pages/Test').then(m => ({ default: m.Test })));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-alabaster flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-ink-950 border-r-transparent mb-4" />
        <p className="text-ink-600 text-sm font-mono">Loading...</p>
      </div>
    </div>
  );
}

import { Preloader } from './features/ui/Preloader';
import { AnimatePresence } from 'framer-motion';

export function App() {
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Artificial delay for the cinematic preloader
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Helmet>
        <title>EsperaStudio | Agency Automation Infrastructure</title>
        <meta name="description" content="Stop trading time for money. We build autonomous digital infrastructure that handles outreach, onboarding, and fulfillment." />
      </Helmet>

      {/* Main App loads in background */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blueprints" element={<BlueprintsArchive />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>

      {/* Cinematic Preloader Overlay */}
      <AnimatePresence mode="wait">
        {isLoading && <Preloader key="preloader" />}
      </AnimatePresence>

      <Analytics />
    </>
  );
}