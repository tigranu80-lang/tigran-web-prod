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
            mapSamples: 12000, // Reduced from 16000 for "empty" look
            mapBrightness: 12, // Increased brightness to make it lighter/fainter against white
            baseColor: [0.96, 0.96, 0.94], // Transparent match
            markerColor: [0.97, 0.45, 0.09], // Orange
            glowColor: [0.96, 0.96, 0.94], // No glow border
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
            ],
            onRender: (state) => {
                state.phi = phi;
                phi += 0.003;
            },
        });

        return () => {
            globe.destroy();
        };
    }, []);

    return (
        <section className="relative py-20 bg-alabaster border-t border-ink-950/10 overflow-hidden">

            {/* Container */}
            <div className="container mx-auto px-6 max-w-7xl relative z-10">

                {/* Header - Compact */}
                <div className="text-center mb-10 relative z-20">
                    <span className="font-mono text-xs text-orange-600 tracking-[0.2em] uppercase block mb-3">
                        Global Operations
                    </span>
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

                {/* Stats Cards - Technical Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-30 -mt-20">

                    {/* Card 1 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="relative bg-white/80 backdrop-blur-md border border-dashed border-ink-950/20 p-6 text-center md:text-left group hover:border-orange-500/30 transition-colors"
                    >
                        {/* Technical Corner Ticks */}
                        <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>

                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4 mx-auto md:mx-0">
                            <Globe size={16} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-ink-950 mb-2">Multi-Language Support</h3>
                        <p className="text-xs text-ink-600 leading-relaxed font-sans">
                            Our agents are fluent in <strong className="text-ink-950">95+ languages</strong>, ready to support your customers globally.
                        </p>
                    </motion.div>

                    {/* Card 2 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="relative bg-white/80 backdrop-blur-md border border-dashed border-ink-950/20 p-6 text-center md:text-left group hover:border-orange-500/30 transition-colors"
                    >
                        {/* Technical Corner Ticks */}
                        <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>

                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4 mx-auto md:mx-0">
                            <Zap size={16} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-ink-950 mb-2">24/7 Availability</h3>
                        <p className="text-xs text-ink-600 leading-relaxed font-sans">
                            Intelligence that never sleeps. Your automation runs <strong className="text-ink-950">round the clock</strong> across all time zones.
                        </p>
                    </motion.div>

                    {/* Card 3 */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative bg-white/80 backdrop-blur-md border border-dashed border-ink-950/20 p-6 text-center md:text-left group hover:border-orange-500/30 transition-colors"
                    >
                        {/* Technical Corner Ticks */}
                        <div className="absolute -top-[1px] -left-[1px] w-2 h-2 border-t border-l border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -top-[1px] -right-[1px] w-2 h-2 border-t border-r border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -bottom-[1px] -left-[1px] w-2 h-2 border-b border-l border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>
                        <div className="absolute -bottom-[1px] -right-[1px] w-2 h-2 border-b border-r border-ink-950/40 group-hover:border-orange-500/60 transition-colors"></div>

                        <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 mb-4 mx-auto md:mx-0">
                            <Shield size={16} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-ink-950 mb-2">Global Compliance</h3>
                        <p className="text-xs text-ink-600 leading-relaxed font-sans">
                            Systems built to strict standards, ensuring <strong className="text-ink-950">GDPR & CCPA</strong> compliance wherever you operate.
                        </p>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
