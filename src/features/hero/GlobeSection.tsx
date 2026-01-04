import { useEffect, useRef } from 'react';
import createGlobe from 'cobe';
import { Globe, Zap, Shield } from 'lucide-react';

export function GlobeSection() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let phi = 0;
        let globe: ReturnType<typeof createGlobe> | null = null;
        let resizeTimeout: NodeJS.Timeout;

        const initGlobe = () => {
            const container = containerRef.current;
            const canvas = canvasRef.current;
            if (!container || !canvas) return;

            const w = container.offsetWidth;
            const SIZE = Math.max(w * 1.5, 1000);

            canvas.style.opacity = '0';

            globe = createGlobe(canvas, {
                devicePixelRatio: 2,
                width: SIZE,
                height: SIZE,
                phi: 0,
                theta: 0.25,
                dark: 0,
                diffuse: 1.2,
                mapSamples: 12000,
                mapBrightness: 6,
                baseColor: [1, 1, 1],
                markerColor: [234 / 255, 88 / 255, 12 / 255],
                glowColor: [1, 1, 1],
                opacity: 0.8,
                markers: [
                    { location: [37.7595, -122.4367], size: 0.05 }, // San Francisco
                    { location: [40.7128, -74.0060], size: 0.05 },  // New York
                    { location: [51.5074, -0.1278], size: 0.05 },   // London
                    { location: [35.6762, 139.6503], size: 0.05 }, // Tokyo
                    { location: [-33.8688, 151.2093], size: 0.05 }, // Sydney
                    { location: [1.3521, 103.8198], size: 0.05 },  // Singapore
                    { location: [52.5200, 13.4050], size: 0.05 },  // Berlin
                    { location: [48.8566, 2.3522], size: 0.05 },   // Paris
                    { location: [25.2048, 55.2708], size: 0.05 },  // Dubai
                    { location: [-23.5505, -46.6333], size: 0.05 }, // São Paulo
                ],
                onRender: (state) => {
                    state['phi'] = phi;
                    phi += 0.0005;
                },
            });

            canvas.style.width = `${SIZE / 2}px`;
            canvas.style.height = `${SIZE / 2}px`;
            canvas.style.position = 'absolute';
            canvas.style.left = '50%';
            canvas.style.top = '0%';
            canvas.style.transform = 'translate(-50%, 0)';

            setTimeout(() => {
                canvas.style.transition = 'opacity 1s ease';
                canvas.style.opacity = '1';
            }, 100);
        };

        initGlobe();

        const onResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                if (globe) {
                    globe.destroy();
                }
                initGlobe();
            }, 200);
        };

        window.addEventListener('resize', onResize);

        return () => {
            window.removeEventListener('resize', onResize);
            clearTimeout(resizeTimeout);
            if (globe) {
                globe.destroy();
            }
        };
    }, []);

    return (
        <section className="relative pt-32 pb-0 bg-transparent">
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

            {/* Container for Content */}
            <div className="relative z-10 w-full">

                {/* Header */}
                <div className="container mx-auto px-6 max-w-7xl relative z-20 text-center mb-0">
                    <h2 className="text-4xl md:text-6xl font-serif font-medium text-ink-950 tracking-tight">
                        Intelligence Without Borders
                    </h2>
                    <p className="mt-6 text-ink-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
                        We are an AI Solutions Agency providing services worldwide. Your digital workforce knows no borders.
                    </p>
                </div>

                {/* GLOBE HORIZON CONTAINER */}
                <div ref={containerRef} className="relative w-full h-[400px] md:h-[600px] overflow-hidden bg-transparent">

                    {/* Background Grid - Cloudflare style dots */}
                    <div className="absolute inset-0 z-0 pointer-events-none opacity-20"
                        style={{
                            backgroundImage: 'radial-gradient(#0A0A0A 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                            maskImage: 'radial-gradient(ellipse at center, black 0%, transparent 80%)'
                        }}
                    />

                    {/* Top Fade Gradient - Transparent */}
                    <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-transparent to-transparent z-20 pointer-events-none" />

                    {/* CANVAS */}
                    <canvas
                        ref={canvasRef}
                        className="outline-none opacity-0"
                        style={{
                            mixBlendMode: 'multiply'
                        }}
                    />

                </div>

                {/* Stats Cards - Matches Contact.tsx style EXACTLY */}
                <div className="container mx-auto px-6 max-w-7xl relative z-30 -mt-20 md:-mt-32 pb-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-0">

                        {/* Card 1 */}
                        <div className="relative group p-8 md:p-12 text-center md:text-left bg-white/90 backdrop-blur-md hover:bg-white/95 transition-colors">
                            {/* Tech Border - Top Left */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-ink-950"></div>
                            <div className="absolute top-0 left-6 right-0 h-[1px] bg-ink-950/20 dashed-line"></div>
                            <div className="absolute top-6 left-0 bottom-0 w-[1px] bg-ink-950/20 dashed-vertical"></div>

                            {/* Tech Border - Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-ink-950"></div>
                            <div className="absolute bottom-0 right-6 left-0 h-[1px] bg-ink-950/20 dashed-line"></div>
                            <div className="absolute bottom-6 right-0 top-0 w-[1px] bg-ink-950/20 dashed-vertical"></div>

                            <Globe strokeWidth={1} size={32} className="mx-auto md:mx-0 text-orange-600 mb-4" />
                            <h3 className="text-xl font-serif font-medium text-ink-950 mb-2">Multi-Language Support</h3>
                            <p className="text-sm text-ink-600 leading-relaxed font-sans font-light">
                                Our agents are fluent in <strong className="font-medium text-ink-950">95+ languages</strong>, ready to support your customers globally.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="relative group p-8 md:p-12 text-center md:text-left bg-white/90 backdrop-blur-md hover:bg-white/95 transition-colors">
                            {/* Tech Border - Top Left */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-ink-950"></div>
                            <div className="absolute top-0 left-6 right-0 h-[1px] bg-ink-950/20 dashed-line"></div>
                            <div className="absolute top-6 left-0 bottom-0 w-[1px] bg-ink-950/20 dashed-vertical"></div>

                            {/* Tech Border - Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-ink-950"></div>
                            <div className="absolute bottom-0 right-6 left-0 h-[1px] bg-ink-950/20 dashed-line"></div>
                            <div className="absolute bottom-6 right-0 top-0 w-[1px] bg-ink-950/20 dashed-vertical"></div>

                            <Zap strokeWidth={1} size={32} className="mx-auto md:mx-0 text-orange-600 mb-4" />
                            <h3 className="text-xl font-serif font-medium text-ink-950 mb-2">24/7 Availability</h3>
                            <p className="text-sm text-ink-600 leading-relaxed font-sans font-light">
                                Intelligence that never sleeps. Your automation runs <strong className="font-medium text-ink-950">round the clock</strong> across all time zones.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="relative group p-8 md:p-12 text-center md:text-left bg-white/90 backdrop-blur-md hover:bg-white/95 transition-colors">
                            {/* Tech Border - Top Left */}
                            <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-ink-950"></div>
                            <div className="absolute top-0 left-6 right-0 h-[1px] bg-ink-950/20 dashed-line"></div>
                            <div className="absolute top-6 left-0 bottom-0 w-[1px] bg-ink-950/20 dashed-vertical"></div>

                            {/* Tech Border - Bottom Right */}
                            <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-ink-950"></div>
                            <div className="absolute bottom-0 right-6 left-0 h-[1px] bg-ink-950/20 dashed-line"></div>
                            <div className="absolute bottom-6 right-0 top-0 w-[1px] bg-ink-950/20 dashed-vertical"></div>

                            <Shield strokeWidth={1} size={32} className="mx-auto md:mx-0 text-orange-600 mb-4" />
                            <h3 className="text-xl font-serif font-medium text-ink-950 mb-2">Global Compliance</h3>
                            <p className="text-sm text-ink-600 leading-relaxed font-sans font-light">
                                Systems built to strict standards, ensuring <strong className="font-medium text-ink-950">GDPR & CCPA</strong> compliance wherever you operate.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
