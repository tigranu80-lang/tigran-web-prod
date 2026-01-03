import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, Zap } from "lucide-react";
import { useCases } from "./constants/useCasesData";
import { useTypewriter } from "./hooks/useTypewriter";

/** Spring transition config for consistent animations */
const springTransition = { type: "spring" as const, stiffness: 300, damping: 30 };

/** Content fade transition - spring for consistency */
const contentTransition = { type: "spring" as const, stiffness: 400, damping: 30, mass: 0.5 };


export function UseCases() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [pendingIndex, setPendingIndex] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(true);

    const { animState, isExiting, handleExit, exitCancelledRef } = useTypewriter({
        activeIndex,
        isContentVisible,
        useCases,
    });

    // Handle card click - immediately switch (no reverse typewriter)
    const handleCardClick = useCallback((index: number) => {
        if (index === activeIndex) return;

        setIsContentVisible(false);
        setPendingIndex(index);
    }, [activeIndex]);

    // After content fades out, switch the active card
    const handleContentExitComplete = useCallback(() => {
        if (pendingIndex !== null) {
            setActiveIndex(pendingIndex);
            setPendingIndex(null);
            setTimeout(() => setIsContentVisible(true), 150);
        }
    }, [pendingIndex]);

    return (
        <section id="use-cases" className="relative py-24 bg-[#F5F5F0]/60 backdrop-blur-[2px] border-b border-ink-950/5">
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-ink-950 text-white px-8 py-3 inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.03 /// Operational Use Cases
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <div className="flex flex-col lg:flex-row w-full min-h-[500px] lg:h-[600px] gap-2">
                    {useCases.map((item, index) => {
                        const isActive = activeIndex === index;
                        const showContent = isActive && isContentVisible;

                        return (
                            <motion.div
                                key={index}
                                role="button"
                                tabIndex={0}
                                aria-label={`View use case: ${item.shortTitle}`}
                                onClick={() => handleCardClick(index)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        handleCardClick(index);
                                    }
                                }}
                                className={`relative cursor-pointer group overflow-hidden ${isActive
                                    ? "border-2 border-ink-950"
                                    : "border border-ink-950/5"
                                    }`}
                                style={{
                                    flex: isActive ? 2.5 : 1,
                                    willChange: 'flex',
                                    transition: isActive
                                        ? 'flex 500ms cubic-bezier(0.4, 0, 0.2, 1)'
                                        : 'flex 300ms cubic-bezier(0.4, 0, 0.6, 1)'
                                }}
                                animate={{
                                    backgroundColor: isActive ? "#FFFFFF" : "#E5E5E5",
                                    opacity: isActive ? 1 : 0.7,
                                }}
                                whileHover={{
                                    backgroundColor: isActive ? "#FFFFFF" : "#d4d4d4",
                                }}
                                transition={springTransition}
                            >
                                {/* Content */}
                                <div className="relative z-10 h-full p-4 sm:p-6 lg:p-10 flex flex-col justify-between">
                                    {/* Top: Number + Title */}
                                    <div className="flex flex-col gap-2 sm:gap-4">
                                        <div className="flex justify-between items-start">
                                            <span className="font-mono text-lg sm:text-xl md:text-2xl text-ink-950">
                                                {item.id}
                                            </span>
                                            <AnimatePresence
                                                mode="wait"
                                                onExitComplete={isActive ? handleContentExitComplete : undefined}
                                            >
                                                {showContent && (
                                                    <motion.span
                                                        initial={{ opacity: 0, scale: 0.9 }}
                                                        animate={{ opacity: 1, scale: 1 }}
                                                        exit={{ opacity: 0, scale: 0.9 }}
                                                        transition={contentTransition}
                                                        className="font-mono text-xs uppercase tracking-widest border px-2 py-1 border-ink-950/10 bg-ink-950 text-white"
                                                    >
                                                        {item.tag}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight mt-1 sm:mt-2 min-h-[1.2em] text-ink-950">
                                            {isActive ? animState.title : item.shortTitle}
                                            {showContent && (
                                                <span
                                                    className="ml-1 inline-block w-2 h-[1em] bg-orange-600 align-middle"
                                                    style={{ animation: 'blink 530ms steps(1) infinite' }}
                                                ></span>
                                            )}
                                        </h3>

                                        {/* Description - Visible on Active */}
                                        <AnimatePresence mode="wait">
                                            {showContent && (
                                                <motion.div
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={contentTransition}
                                                >
                                                    <div className="pt-4 sm:pt-6 lg:pt-8 space-y-4 sm:space-y-6 lg:space-y-8">
                                                        {/* Problem Block */}
                                                        <div className="relative pl-4 sm:pl-6 border-l-2 border-ink-950/10">
                                                            <span className="absolute -left-[5px] -top-1 w-2 h-2 rounded-full bg-ink-950/20"></span>
                                                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-ink-950/50 mb-1 sm:mb-2">
                                                                Problem
                                                            </h4>
                                                            <p className="font-sans text-sm sm:text-base text-ink-950/80 leading-relaxed max-w-sm min-h-[2em] sm:min-h-[3em]">
                                                                {animState.problem}
                                                            </p>
                                                        </div>

                                                        {/* Solution Block */}
                                                        <div className="relative pl-4 sm:pl-6 border-l-2 border-ink-950">
                                                            <span className="absolute -left-[5px] -top-1 w-2 h-2 rounded-full bg-orange-600"></span>
                                                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-orange-600 mb-1 sm:mb-2">
                                                                Solution
                                                            </h4>
                                                            <p className="font-sans text-sm sm:text-base font-medium text-ink-950 leading-relaxed max-w-sm min-h-[2em] sm:min-h-[3em]">
                                                                {animState.solution}
                                                            </p>
                                                        </div>

                                                        {/* Result Metric */}
                                                        <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-ink-950/10 flex items-center gap-3 sm:gap-4">
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-ink-950 text-white shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]">
                                                                <Zap size={16} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-ink-950/50 mb-0.5">
                                                                    Impact
                                                                </h4>
                                                                <p className="font-mono text-base sm:text-lg font-bold text-ink-950 tracking-tight min-w-[80px] sm:min-w-[100px]">
                                                                    {animState.impact}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Bottom: Toggle Icon or CTA Button */}
                                    <div className="flex justify-center lg:justify-start mt-4 sm:mt-6">
                                        <AnimatePresence mode="wait">
                                            {!isActive ? (
                                                <motion.div
                                                    key="plus-icon"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    transition={contentTransition}
                                                    className="w-8 h-8 flex items-center justify-center text-ink-500 group-hover:text-ink-950"
                                                >
                                                    <Plus
                                                        className="w-6 h-6 transition-transform duration-300 group-hover:rotate-90"
                                                        strokeWidth={1}
                                                    />
                                                </motion.div>
                                            ) : showContent ? (
                                                <motion.button
                                                    key="cta-button"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: 10 }}
                                                    transition={contentTransition}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                                                    }}
                                                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-ink-950 border-2 border-ink-950 rounded-none font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_0px_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#0A0A0A] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] sm:hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center gap-2"
                                                >
                                                    BOOK FREE CALL
                                                    <ArrowRight size={12} className="sm:w-[14px] sm:h-[14px]" />
                                                </motion.button>
                                            ) : null}
                                        </AnimatePresence>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
