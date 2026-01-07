import { Header } from '../features/layout/Header';
import { Protocol } from '../features/services/Protocol';
import { Services } from '../features/services/Services';
import { About } from '../features/team/Team';
import { Pricing } from '../features/pricing/Pricing';
import { Footer } from '../features/layout/Footer';
import { AIConsultant } from '../features/hero/AIConsultant';
import { HeroNew } from '../features/hero/HeroNew';
import { TechTicker } from '../features/ui/TechTicker';
import { Contact } from '../features/contact/Contact';
import { GlobeSection } from '../features/global-ops/GlobeSection';
import { Background } from '../features/layout/Background';

export function Home() {
    return (
        <div className="min-h-screen font-sans bg-alabaster text-ink-950 selection:bg-ink-950 selection:text-alabaster relative">
            {/* Global Effects */}
            <Background />

            <Header />

            <main id="main-content" className="relative z-10">
                {/* Hero Section */}
                <HeroNew />

                {/* Protocol Section */}
                <Protocol />

                {/* Content Sections */}
                <Services />
                <About />
                <GlobeSection />
                <TechTicker />
                <Pricing />
                <Contact />

            </main>

            <Footer />
            <AIConsultant />
        </div>
    );
}

