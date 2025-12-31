import React, { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { motion } from 'framer-motion';
import { Globe, Zap, Server, Shield } from 'lucide-react';

export function GlobeSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let phi = 0;

        if (!canvasRef.current) return;

        const globe = createGlobe(canvasRef.current, {
            devicePixelRatio: 2,
            width: 1000 * 2,
            height: 1000 * 2,
            phi: 0,
            theta: 0,
            dark: 0,
            diffuse: 1.2,
            mapSamples: 20000, // Richer dot density
            mapBrightness: 6, // Adjusted for clarity
            baseColor: [0.96, 0.96, 0.94], // Perfectly matches #F5F5F0 (Alabaster)
            markerColor: [234 / 255, 88 / 255, 12 / 255], // Orange #ea580c
            glowColor: [0.96, 0.96, 0.94], // Matches background to hide glow edge
            markers: [
                { location: [37.7595, -122.4367], size: 0.03 },
                { location: [40.7128, -74.0060], size: 0.03 },
                { location: [51.5074, -0.1278], size: 0.03 },
                { location: [35.6762, 139.6503], size: 0.03 },
                { location: [-33.8688, 151.2093], size: 0.03 },
                { location: [1.3521, 103.8198], size: 0.03 },
                { location: [52.5200, 13.4050], size: 0.03 },
                { location: [48.8566, 2.3522], size: 0.03 },
                { location: [25.2048, 55.2708], size: 0.03 },
                { location: [-23.5505, -46.6333], size: 0.03 },
                // Add random "active" nodes to simulate traffic
                ...Array.from({ length: 15 }).map(() => ({
                    location: [Math.random() * 160 - 80, Math.random() * 360 - 180],
                    size: Math.random() * 0.02,
                })),
            ],
            onRender: (state) => {
                // Rotation
                state.phi = phi;
                phi += 0.003;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <section className="relative pt-32 pb-20 bg-transparent border-t border-ink-950/10">
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.06 /// GLOBAL_OPS
                        </span>
                    </div>
                </div>
            </div>

            {/* Container */}
            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Header - Compact */}
                <div className="text-center mb-10 relative z-20">
                    <h2 className="text-4xl md:text-5xl font-serif font-medium text-ink-950 tracking-tight">
                        Intelligence Without Borders
                    </h2>
                    <p className="mt-4 text-ink-600 text-base font-light max-w-xl mx-auto leading-relaxed">
                        We are an AI Solutions Agency providing services worldwide. Your digital workforce knows no borders.
                    </p>
                </div>

                {/* Globe Visualization - Horizon View */}
                {/* Pushed down (-mb) and masked to show only top half */}
                <div className="relative w-full h-[400px] md:h-[500px] flex items-end justify-center pointer-events-none z-10 overflow-hidden mt-8">

                    {/* Radial Grid Background */}
                    <div className="absolute top-[60%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] z-0 opacity-40">
                        <div className="absolute inset-0 bg-grid" style={{
                            maskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)',
                            WebkitMaskImage: 'radial-gradient(circle at center, black 0%, transparent 70%)'
                        }}></div>
                    </div>

                    <div className="w-[800px] h-[800px] md:w-[1000px] md:h-[1000px] relative translate-y-[40%] opacity-80 mix-blend-multiply z-10">
                        <canvas
                            ref={canvasRef}
                            style={{ width: '100%', height: '100%', contain: 'layout paint size' }}
                        />
                    </div>
                </div>

                {/* Stats Cards - Unified Technical Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 relative z-30 -mt-20 border-t border-ink-950/10 bg-white/40 backdrop-blur-md">

                    {/* Card 1 */}
                    <div className="relative p-8 md:p-12 text-center md:text-left group border-b md:border-b-0 border-ink-950/10">
                        <div className="mb-6 text-ink-950">
                            <Globe strokeWidth={1} size={32} className="mx-auto md:mx-0" />
                        </div>
                        <h3 className="text-xl font-serif font-medium text-ink-950 mb-3">Multi-Language Support</h3>
                        <p className="text-sm text-ink-600 leading-relaxed font-sans font-light">
                            Our agents are fluent in <strong className="font-medium text-ink-950">95+ languages</strong>, ready to support your customers globally.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="relative p-8 md:p-12 text-center md:text-left group border-b md:border-b-0 md:border-l border-ink-950/10">
                        <div className="mb-6 text-ink-950">
                            <Zap strokeWidth={1} size={32} className="mx-auto md:mx-0" />
                        </div>
                        <h3 className="text-xl font-serif font-medium text-ink-950 mb-3">24/7 Availability</h3>
                        <p className="text-sm text-ink-600 leading-relaxed font-sans font-light">
                            Intelligence that never sleeps. Your automation runs <strong className="font-medium text-ink-950">round the clock</strong> across all time zones.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="relative p-8 md:p-12 text-center md:text-left group md:border-l border-ink-950/10">
                        <div className="mb-6 text-ink-950">
                            <Shield strokeWidth={1} size={32} className="mx-auto md:mx-0" />
                        </div>
                        <h3 className="text-xl font-serif font-medium text-ink-950 mb-3">Global Compliance</h3>
                        <p className="text-sm text-ink-600 leading-relaxed font-sans font-light">
                            Systems built to strict standards, ensuring <strong className="font-medium text-ink-950">GDPR & CCPA</strong> compliance wherever you operate.
                        </p>
                    </div>

                </div>

            </div>
        </section>
    );
}
