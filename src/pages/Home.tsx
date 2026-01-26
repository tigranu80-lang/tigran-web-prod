import { lazy, useMemo } from 'react';
import { Header } from '../features/layout/Header';
import { HeroNew } from '../features/hero/HeroNew';
import { Background } from '../features/layout/Background';
import { Footer } from '../features/layout/Footer';
import { LazySection } from '../components/utils/LazySection';
import { usePrefetch } from '../hooks/usePrefetch';

// Lazy load heavy sections (Staged Loading Act 3)
const Protocol = lazy(() => import('../features/services/Protocol').then(m => ({ default: m.Protocol })));
const Services = lazy(() => import('../features/services/Services').then(m => ({ default: m.Services })));
const About = lazy(() => import('../features/team/Team').then(m => ({ default: m.About })));
const Pricing = lazy(() => import('../features/pricing/Pricing').then(m => ({ default: m.Pricing })));
const TechTicker = lazy(() => import('../features/ui/TechTicker').then(m => ({ default: m.TechTicker })));
const Contact = lazy(() => import('../features/contact/Contact').then(m => ({ default: m.Contact })));
const GlobeSection = lazy(() => import('../features/global-ops/GlobeSection').then(m => ({ default: m.GlobeSection })));

// import { AIConsultant } from '../features/hero/AIConsultant';

interface HomeProps {
    isHeroReady?: boolean; // Kept for prop compatibility, but logic is now Scroll-based
}

export function Home({ isHeroReady: _isHeroReady }: HomeProps) {
    // ENTERPRISE PREFETCH STRATEGY
    // Prefetch the first 3 sections during idle time after Hero loads
    // This ensures chunks are cached before user scrolls
    const prefetchImports = useMemo(() => [
        () => import('../features/services/Protocol'),
        () => import('../features/services/Services'),
        () => import('../features/team/Team'),
    ], []);

    usePrefetch(prefetchImports, { 
        delay: 1500,  // Start 1.5s after page load (after Hero animations)
        respectConnection: true  // Skip on slow connections
    });
    return (
        <div className="min-h-screen font-sans bg-alabaster text-ink-950 selection:bg-ink-950 selection:text-alabaster relative">
            {/* Global Effects */}
            <Background />

            <Header />

            <main id="main-content" className="relative z-10">
                {/* Hero Section - Act 1 (Always Critical) */}
                <HeroNew />

                {/* ═══════════════════════════════════════════════════════════════
                    ENTERPRISE LAZY LOADING STRATEGY
                    
                    Key principles:
                    1. BOTTOM margin (0px 0px 2500px 0px) = detect elements 2500px BELOW viewport
                    2. Prefetch first 3 sections during idle time (see usePrefetch above)
                    3. Professional skeleton loaders during chunk loading
                    4. Smooth fade-in when content renders
                    5. content-visibility-auto for off-screen paint optimization
                    ═══════════════════════════════════════════════════════════════ */}

                <LazySection 
                    id="protocol"
                    className="content-visibility-auto" 
                    margin="0px 0px 2500px 0px"
                    minHeight="600px"
                    skeletonVariant="default"
                >
                    <Protocol />
                </LazySection>

                {/* Services Wrapper */}
                <div className="w-full relative bg-transparent content-visibility-auto">
                    <LazySection 
                        id="services"
                        className="w-full" 
                        margin="0px 0px 2500px 0px"
                        minHeight="800px"
                        skeletonVariant="mixed"
                    >
                        <Services />
                    </LazySection>
                </div>

                <LazySection 
                    id="about"
                    className="content-visibility-auto" 
                    margin="0px 0px 2500px 0px"
                    minHeight="500px"
                    skeletonVariant="default"
                >
                    <About />
                </LazySection>

                <LazySection 
                    id="globe"
                    className="content-visibility-auto" 
                    margin="0px 0px 2500px 0px"
                    minHeight="700px"
                    skeletonVariant="mixed"
                >
                    <GlobeSection />
                </LazySection>

                <LazySection 
                    id="ticker"
                    className="content-visibility-auto" 
                    margin="0px 0px 2000px 0px"
                    minHeight="150px"
                    skeletonVariant="text"
                >
                    <TechTicker />
                </LazySection>

                <LazySection 
                    id="pricing"
                    className="content-visibility-auto" 
                    margin="0px 0px 2500px 0px"
                    minHeight="700px"
                    skeletonVariant="cards"
                >
                    <Pricing />
                </LazySection>

                <LazySection 
                    id="contact"
                    className="content-visibility-auto" 
                    margin="0px 0px 2000px 0px"
                    minHeight="600px"
                    skeletonVariant="default"
                >
                    <Contact />
                </LazySection>

            </main>

            <LazySection 
                id="footer"
                className="content-visibility-auto"
                margin="0px 0px 1000px 0px"
                minHeight="200px"
                skeletonVariant="text"
            >
                <Footer />
            </LazySection>
            {/* <AIConsultant /> */}
        </div>
    );
}
