import { useEffect } from 'react';
import { Header } from '../features/layout/Header';
import { Footer } from '../features/layout/Footer';
import { Background } from '../features/layout/Background';
import { BlueprintCard } from '../features/services/components/BlueprintCard';
import { BLUEPRINTS } from '../features/services/constants/blueprintsData';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function BlueprintsArchive() {
    const navigate = useNavigate();

    // Scroll to top on mount
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className="min-h-screen font-sans bg-alabaster text-ink-950 selection:bg-ink-950 selection:text-alabaster relative">
            <Background />
            <Header />

            <main className="relative z-10 pt-32 pb-24">
                <div className="container mx-auto px-6 max-w-7xl">
                    <button
                        onClick={() => navigate('/')}
                        className="group inline-flex items-center gap-2 mb-8 text-xs font-mono uppercase tracking-widest text-ink-500 hover:text-orange-600 transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    {/* Header */}
                    <div className="mb-16">
                        <div className="inline-flex items-center gap-4 mb-6">
                            <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-ink-950">
                                SYS.04 /// Archive
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-6xl font-serif text-ink-950 mb-6">
                            Blueprints Archive
                        </h1>
                        <p className="text-xl text-ink-500 font-light max-w-2xl leading-relaxed">
                            A collection of pre-built automation architectures ready for deployment.
                        </p>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {BLUEPRINTS.map((bp, i) => (
                            <BlueprintCard key={i} data={bp} />
                        ))}
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
