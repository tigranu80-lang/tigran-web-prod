import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, ArrowRight, Zap } from "lucide-react";

const useCases = [
    {
        id: "01",
        shortTitle: "Leads",
        fullTitle: "Never Miss Leads",
        tag: "#leadgen",
        problem: "Leads arrive in 5 places and get missed.",
        solution: "Enrichment → CRM Sync → Slack Alert.",
        stats: "Lost leads ↓ 70%",
    },
    {
        id: "02",
        shortTitle: "Onboard",
        fullTitle: "Instant Onboarding",
        tag: "#onboarding",
        problem: "Users don't activate, support gets flooded.",
        solution: "Welcome sequence + checklist + usage alerts.",
        stats: "Activation ↑ 24%",
    },
    {
        id: "03",
        shortTitle: "Support",
        fullTitle: "24/7 Support Triage",
        tag: "#support",
        problem: "Slow replies kill conversions.",
        solution: "AI intent tagging → Draft reply → Handoff.",
        stats: "Response: 3h → 15m",
    },
    {
        id: "04",
        shortTitle: "Finance",
        fullTitle: "Ops Reconciliation",
        tag: "#finance",
        problem: "Copy-pasting invoice data manually.",
        solution: "OCR scan → Match PO → Accounting Sync.",
        stats: "Manual work ↓ 8 hrs/wk",
    },
];

/** Spring transition config for consistent animations */
const springTransition = { type: "spring", stiffness: 300, damping: 30 };

/** Content fade transition */
const contentTransition = { duration: 0.2, ease: "easeOut" };

export function UseCases() {
    // Two states: pendingIndex for click target, activeIndex for actual display
    const [activeIndex, setActiveIndex] = useState(0);
    const [pendingIndex, setPendingIndex] = useState<number | null>(null);
    const [isContentVisible, setIsContentVisible] = useState(true);

    // Animation State for Typewriter Effect
    const [animState, setAnimState] = useState({
        title: "",
        problem: "",
        solution: "",
        impact: "",
    });

    // State to track if we're in exit animation
    const [isExiting, setIsExiting] = useState(false);
    const exitCancelledRef = useRef(false);

    // Delete text helper (for exit animation)
    const deleteTextAsync = async (
        currentText: string,
        setter: (value: string) => void,
        delay: number = 15
    ) => {
        for (let i = currentText.length; i >= 0; i--) {
            if (exitCancelledRef.current) return false;
            setter(currentText.slice(0, i));
            await new Promise((r) => setTimeout(r, delay));
        }
        return true;
    };

    // Handle card click - start reverse typewriter then switch
    const handleCardClick = useCallback(async (index: number) => {
        if (index === activeIndex || isExiting) return;

        setIsExiting(true);
        exitCancelledRef.current = false;

        const target = useCases[activeIndex];

        // Reverse typewriter: delete in reverse order (impact → solution → problem → title)
        // Delete impact
        await deleteTextAsync(animState.impact, (v) =>
            setAnimState((prev) => ({ ...prev, impact: v })), 3
        );
        if (exitCancelledRef.current) return;

        // Delete solution
        await deleteTextAsync(animState.solution, (v) =>
            setAnimState((prev) => ({ ...prev, solution: v })), 2
        );
        if (exitCancelledRef.current) return;

        // Delete problem
        await deleteTextAsync(animState.problem, (v) =>
            setAnimState((prev) => ({ ...prev, problem: v })), 2
        );
        if (exitCancelledRef.current) return;

        // Delete title back to shortTitle
        await deleteTextAsync(animState.title, (v) =>
            setAnimState((prev) => ({ ...prev, title: v })), 5
        );
        if (exitCancelledRef.current) return;

        // Now hide content and switch cards
        setIsContentVisible(false);
        setPendingIndex(index);
        setIsExiting(false);
    }, [activeIndex, isExiting, animState]);

    // After content fades out, switch the active card
    const handleContentExitComplete = useCallback(() => {
        if (pendingIndex !== null) {
            // Switch grid layout
            setActiveIndex(pendingIndex);
            setPendingIndex(null);

            // Show new content after grid starts animating
            setTimeout(() => {
                setIsContentVisible(true);
            }, 150);
        }
    }, [pendingIndex]);

    // Typewriter effect
    useEffect(() => {
        if (!isContentVisible) return;

        let isCancelled = false;
        const target = useCases[activeIndex];

        // Reset state for new animation
        setAnimState({
            title: target.shortTitle,
            problem: "",
            solution: "",
            impact: "",
        });

        const typeText = async (
            text: string,
            setter: (value: string) => void,
            delay: number = 30
        ) => {
            for (let i = 0; i <= text.length; i++) {
                if (isCancelled) return false;
                setter(text.slice(0, i));
                await new Promise((r) => setTimeout(r, delay));
            }
            return true;
        };

        const deleteText = async (
            text: string,
            setter: (value: string) => void,
            delay: number = 50
        ) => {
            for (let i = text.length; i >= 0; i--) {
                if (isCancelled) return false;
                setter(text.slice(0, i));
                await new Promise((r) => setTimeout(r, delay));
            }
            return true;
        };

        const runAnimation = async () => {
            // Wait for card expansion
            await new Promise((r) => setTimeout(r, 100));
            if (isCancelled) return;

            // Delete short title
            await deleteText(target.shortTitle, (v) =>
                setAnimState((prev) => ({ ...prev, title: v }))
            );
            if (isCancelled) return;

            // Type full title
            await typeText(target.fullTitle, (v) =>
                setAnimState((prev) => ({ ...prev, title: v }))
            );
            if (isCancelled) return;

            // Type problem
            await typeText(
                target.problem,
                (v) => setAnimState((prev) => ({ ...prev, problem: v })),
                10
            );
            if (isCancelled) return;

            // Type solution
            await typeText(
                target.solution,
                (v) => setAnimState((prev) => ({ ...prev, solution: v })),
                10
            );
            if (isCancelled) return;

            // Type impact
            await typeText(
                target.stats,
                (v) => setAnimState((prev) => ({ ...prev, impact: v })),
                20
            );
        };

        runAnimation();

        return () => {
            isCancelled = true;
        };
    }, [activeIndex, isContentVisible]);

    // Grid configuration for smooth layout transition
    const gridConfig = [
        "grid-rows-[auto_60px_60px_60px] lg:grid-cols-[2.5fr_1fr_1fr_1fr] lg:grid-rows-1",
        "grid-rows-[60px_auto_60px_60px] lg:grid-cols-[1fr_2.5fr_1fr_1fr] lg:grid-rows-1",
        "grid-rows-[60px_60px_auto_60px] lg:grid-cols-[1fr_1fr_2.5fr_1fr] lg:grid-rows-1",
        "grid-rows-[60px_60px_60px_auto] lg:grid-cols-[1fr_1fr_1fr_2.5fr] lg:grid-rows-1",
    ];

    return (
        <section className="relative py-24 bg-[#F5F5F0] border-b border-[#0A0A0A]/5">
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-[#0A0A0A] text-white px-8 py-3 inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.03 /// Operational Use Cases
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                <motion.div
                    className={`grid w-full min-h-[500px] lg:h-[600px] gap-2 ${gridConfig[activeIndex]}`}
                    layout
                    transition={springTransition}
                >
                    {useCases.map((item, index) => {
                        const isActive = activeIndex === index;
                        const showContent = isActive && isContentVisible;

                        return (
                            <motion.div
                                key={index}
                                layout
                                onClick={() => handleCardClick(index)}
                                className={`relative cursor-pointer group overflow-hidden ${isActive
                                    ? "border-2 border-[#0A0A0A]"
                                    : "border border-[#0A0A0A]/5"
                                    }`}
                                animate={{
                                    backgroundColor: isActive ? "#FFFFFF" : "#E5E5E5",
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
                                            <span className="font-mono text-lg sm:text-xl md:text-2xl text-[#0A0A0A]">
                                                {item.id}
                                            </span>
                                            {/* Tag - Only visible when active */}
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
                                                        className="font-mono text-xs uppercase tracking-widest border px-2 py-1 border-[#0A0A0A]/10 bg-[#0A0A0A] text-white"
                                                    >
                                                        {item.tag}
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl leading-tight mt-1 sm:mt-2 min-h-[1.2em] text-[#0A0A0A]">
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
                                                        <div className="relative pl-4 sm:pl-6 border-l-2 border-[#0A0A0A]/10">
                                                            <span className="absolute -left-[5px] -top-1 w-2 h-2 rounded-full bg-[#0A0A0A]/20"></span>
                                                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 mb-1 sm:mb-2">
                                                                Problem
                                                            </h4>
                                                            <p className="font-sans text-sm sm:text-base text-[#0A0A0A]/80 leading-relaxed max-w-sm min-h-[2em] sm:min-h-[3em]">
                                                                {animState.problem}
                                                            </p>
                                                        </div>

                                                        {/* Solution Block */}
                                                        <div className="relative pl-4 sm:pl-6 border-l-2 border-[#0A0A0A]">
                                                            <span className="absolute -left-[5px] -top-1 w-2 h-2 rounded-full bg-orange-600"></span>
                                                            <h4 className="font-mono text-[10px] uppercase tracking-widest text-orange-600 mb-1 sm:mb-2">
                                                                Solution
                                                            </h4>
                                                            <p className="font-sans text-sm sm:text-base font-medium text-[#0A0A0A] leading-relaxed max-w-sm min-h-[2em] sm:min-h-[3em]">
                                                                {animState.solution}
                                                            </p>
                                                        </div>

                                                        {/* Result Metric */}
                                                        <div className="pt-4 sm:pt-6 mt-4 sm:mt-6 border-t border-[#0A0A0A]/10 flex items-center gap-3 sm:gap-4">
                                                            <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-[#0A0A0A] text-white shadow-[2px_2px_0px_0px_rgba(234,88,12,1)]">
                                                                <Zap size={16} strokeWidth={1.5} className="sm:w-[18px] sm:h-[18px]" />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-mono text-[9px] sm:text-[10px] uppercase tracking-widest text-[#0A0A0A]/50 mb-0.5">
                                                                    Impact
                                                                </h4>
                                                                <p className="font-mono text-base sm:text-lg font-bold text-[#0A0A0A] tracking-tight min-w-[80px] sm:min-w-[100px]">
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
                                                    className="w-8 h-8 flex items-center justify-center text-[#737373] group-hover:text-[#0A0A0A]"
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
                                                    className="px-4 py-2.5 sm:px-6 sm:py-3 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-none font-mono text-[10px] sm:text-xs uppercase tracking-widest shadow-[3px_3px_0px_0px_#0A0A0A] sm:shadow-[4px_4px_0px_0px_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#0A0A0A] sm:hover:translate-x-[2px] sm:hover:translate-y-[2px] sm:hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center gap-2"
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
                </motion.div>
            </div>
        </section>
    );
}
