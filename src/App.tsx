import React, { Suspense, lazy } from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';
import { Preloader } from './features/ui/Preloader';

// Lazy load route components for code splitting
// Home is CRITICAL path, so we might want to load it eagerly or at least start it early.
// But mostly we want to split the *heavy* parts of Home.
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

/**
 * App - Main application component
 * PERFORMANCE: No framer-motion imports in critical path
 * Preloader uses pure CSS animations for zero bundle impact
 */
export function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [isHeroReady, setIsHeroReady] = React.useState(false);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
    // Allow a micro-task for React to commit the removal of Preloader
    setTimeout(() => setIsHeroReady(true), 100);
  };

  return (
    <>
      {/* Main App loads in background */}
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path="/" element={<Home isHeroReady={isHeroReady} />} />
          <Route path="/blueprints" element={<BlueprintsArchive />} />
          <Route path="/thank-you" element={<ThankYou />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </Suspense>

      {/* Cinematic Preloader Overlay - Pure CSS animations, no framer-motion */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      <Analytics />
    </>
  );
}