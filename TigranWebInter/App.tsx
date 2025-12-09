import React from 'react';
import Header from './components/Header';
import Services from './components/Services';
import About from './components/Team'; 
import Pricing from './components/Pricing';
import Footer from './components/Footer';
import AIConsultant from './components/AIConsultant';
import HeroSaaS from './components/HeroSaaS';
import Contact from './components/Contact';
import Background from './components/Background';

function App() {
  return (
    <div className="min-h-screen font-sans bg-alabaster text-ink-950 selection:bg-ink-950 selection:text-alabaster relative">
      {/* Global Effects */}
      <Background />

      <Header />
      
      <main className="relative z-10">
        {/* New SaaS Style Hero Section */}
        <HeroSaaS />

        {/* Content Sections */}
        <Services />
        <About />
        <Pricing />
        <Contact />

      </main>

      <Footer />
      <AIConsultant />
    </div>
  );
}

export default App;