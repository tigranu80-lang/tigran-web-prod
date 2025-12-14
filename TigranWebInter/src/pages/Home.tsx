import React from 'react';
import Header from '../features/layout/Header';
import Services from '../features/services/Services';
import About from '../features/team/Team';
import Pricing from '../features/pricing/Pricing';
import Footer from '../features/layout/Footer';
import AIConsultant from '../features/hero/AIConsultant';
import HeroSaaS from '../features/hero/HeroSaaS';
import Contact from '../features/contact/Contact';
import GlobeSection from '../features/hero/GlobeSection';
import Background from '../features/layout/Background';

function Home() {
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
                <GlobeSection />
                <Pricing />
                <Contact />

            </main>

            <Footer />
            <AIConsultant />
        </div>
    );
}

export default Home;
