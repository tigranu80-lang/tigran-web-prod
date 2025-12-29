import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Home } from './pages/Home';
import { ThankYou } from './pages/ThankYou';

export function App() {
  return (
    <>
      <Helmet>
        <title>AutoMate | Agency Automation Infrastructure</title>
        <meta name="description" content="Stop trading time for money. We build autonomous digital infrastructure that handles outreach, onboarding, and fulfillment." />
      </Helmet>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/thank-you" element={<ThankYou />} />
      </Routes>

      <Analytics />
    </>
  );
}