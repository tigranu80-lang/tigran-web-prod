import { useEffect, useState } from 'react';

/**
 * Preloader - Pure CSS animated preloader
 * NO framer-motion dependency - keeps critical bundle lean
 * Uses CSS transitions and animations for smooth fade-out
 */
export function Preloader({ onComplete }: { onComplete?: () => void }) {
    const [progress, setProgress] = useState(0);
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 15;
                if (next >= 100) {
                    clearInterval(timer);
                    // Start exit animation
                    setIsExiting(true);
                    // Call onComplete after exit animation duration (800ms)
                    if (onComplete) setTimeout(onComplete, 800);
                    return 100;
                }
                return next;
            });
        }, 150);

        return () => clearInterval(timer);
    }, [onComplete]);

    return (
        <div
            className={`fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] text-[#F5F5F0] transition-opacity duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
                isExiting ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
        >
            <div className="w-full max-w-md px-6">
                {/* Cinematic Logo Sequence - CSS Animations */}
                <div className="relative flex flex-col items-center justify-center mb-12">
                    <div
                        className="w-16 h-16 bg-[#F5F5F0] rounded-lg flex items-center justify-center mb-6 animate-[preloaderLogo_1s_ease-out_forwards]"
                        style={{ opacity: 0, transform: 'scale(0.8)' }}
                    >
                        <span className="text-[#0A0A0A] font-bold text-3xl font-sans">E</span>
                    </div>

                    <h1
                        className="text-2xl md:text-3xl font-serif font-medium tracking-tight animate-[preloaderFadeUp_0.8s_ease-out_0.3s_forwards]"
                        style={{ opacity: 0, transform: 'translateY(10px)' }}
                    >
                        EsperaStudio
                    </h1>

                    <div
                        className="mt-2 flex items-center gap-2 animate-[preloaderFade_0.5s_ease-out_0.6s_forwards]"
                        style={{ opacity: 0 }}
                    >
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#737373]">
                            Initializing Systems
                        </span>
                    </div>
                </div>

                {/* Technical Progress Bar - CSS transition */}
                <div className="relative w-full h-[1px] bg-[#333]">
                    <div
                        className="absolute top-0 left-0 h-full bg-[#F5F5F0] transition-[width] duration-100 ease-linear"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="flex justify-between mt-2 font-mono text-[9px] text-[#525252] uppercase tracking-wider">
                    <span>Core.v2.5.0</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </div>
    );
}
