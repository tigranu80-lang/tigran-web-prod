import React, { useRef, useMemo } from "react";
import { motion, useScroll, useTransform, useSpring, MotionValue } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { colors } from "@/src/config/theme";

interface Step {
    id: string;
    phase: string;
    title: string;
    description: string;
    output: string;
}

const STEPS: Step[] = [
    {
        id: "01",
        phase: "Discovery",
        title: "Audit & Baseline",
        description:
            "Find leaks. Identify quick wins. Establish current baseline metrics.",
        output: "Roadmap + ROI Hypothesis",
    },
    {
        id: "02",
        phase: "Architecture",
        title: "Design & Prototype",
        description:
            "Process mapping, role definition, data modeling, and tool selection.",
        output: "System Blueprint",
    },
    {
        id: "03",
        phase: "Implementation",
        title: "Build",
        description:
            "Connecting integrations, building agent logic, setting up logging.",
        output: "Working System",
    },
    {
        id: "04",
        phase: "Quality",
        title: "Test & Harden",
        description: "Edge cases, error handling, and load testing.",
        output: "Validation Report",
    },
];

// Pure MotionValue step component - NO useState, NO re-renders
const ProtocolStep = React.memo<{
    step: Step;
    index: number;
    sectionProgress: MotionValue<number>;
}>(({ step, index, sectionProgress }) => {
    // Calculate this step's active range (each step = 25% of section)
    const stepStart = index / STEPS.length;
    const stepEnd = (index + 1) / STEPS.length;

    // Transform progress to opacity (0.4 → 1 when active → 0.4)
    const opacity = useTransform(
        sectionProgress,
        [stepStart - 0.1, stepStart, stepEnd, stepEnd + 0.1],
        [0.4, 1, 1, 0.4]
    );

    // Transform progress to color
    const accentColor = useTransform(
        sectionProgress,
        [stepStart - 0.05, stepStart, stepEnd, stepEnd + 0.05],
        [colors.neutral.muted, colors.accent.orange, colors.accent.orange, colors.neutral.muted]
    );

    const circleColor = useTransform(
        sectionProgress,
        [stepStart - 0.05, stepStart, stepEnd, stepEnd + 0.05],
        [colors.brand.bg, colors.accent.orange, colors.accent.orange, colors.brand.bg]
    );

    const circleBorder = useTransform(
        sectionProgress,
        [stepStart - 0.05, stepStart, stepEnd, stepEnd + 0.05],
        [colors.neutral.light, colors.accent.orange, colors.accent.orange, colors.neutral.light]
    );

    return (
        <motion.div
            style={{ opacity }}
            className="relative pl-12 md:pl-20 py-4 group"
        >
            {/* Circle Indicator on the line - centered */}
            <motion.div
                style={{ backgroundColor: circleColor, borderColor: circleBorder }}
                className="absolute left-[12px] top-6 w-6 h-6 rounded-full border-2 z-10 hidden md:block -translate-x-1/2"
            />

            {/* Content */}
            <div className="flex flex-col gap-3">
                {/* ID & Phase - Orange when active */}
                <motion.div
                    style={{ color: accentColor }}
                    className="flex items-center gap-3"
                >
                    <span className="font-mono text-xs font-bold uppercase tracking-widest">
                        {step.id} — {step.phase}
                    </span>
                </motion.div>

                {/* Title - Always black */}
                <h4 className="text-3xl md:text-4xl font-serif text-ink-950 tracking-tight">
                    {step.title}
                </h4>

                {/* Description */}
                <p className="text-ink-500 text-base leading-relaxed max-w-lg">
                    {step.description}
                </p>

                {/* Output Badge */}
                <div className="mt-1">
                    <div className="inline-flex items-center gap-2 bg-white border border-ink-950/10 px-4 py-2 shadow-sm">
                        <span className="font-mono text-[10px] uppercase font-bold text-ink-950/60">Output:</span>
                        <span className="font-sans text-xs font-bold text-ink-950">{step.output}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
});

ProtocolStep.displayName = "ProtocolStep";

export const Protocol: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // SINGLE scroll listener for the entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Smooth scroll progress with spring physics
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Memoize steps array
    const steps = useMemo(() => STEPS, []);

    // Progress line scale (0 to 1) - GPU-only, no layout recalc
    const progressScale = useTransform(smoothProgress, [0, 1], [0, 1]);

    // CTA visibility - pure MotionValue
    const ctaOpacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
    const ctaY = useTransform(smoothProgress, [0.7, 0.85], [20, 0]);

    return (
        <section
            ref={sectionRef}
            id="protocol"
            className="relative w-full py-24 md:py-32 bg-[#F5F5F0]/60 backdrop-blur-[2px] border-t border-ink-950"
        >
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm animate-pulse"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.01 /// PROTOCOL
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 lg:gap-32">

                    {/* Left Column - Sticky Info */}
                    <div className="lg:w-5/12">
                        <div className="lg:sticky lg:top-32">
                            <h2 className="text-5xl md:text-7xl font-serif text-ink-950 mb-8 leading-[1.0] tracking-tight">
                                From leaks to <br />
                                <span className="font-normal text-ink-950">stable systems.</span>
                            </h2>

                            <p className="text-xl text-ink-500 font-light leading-relaxed mb-12 max-w-sm">
                                A universal delivery path to ensure ROI.
                            </p>

                            {/* CTA Button - Desktop: Appears after 70% scroll */}
                            <motion.div
                                style={{ opacity: ctaOpacity, y: ctaY }}
                                className="hidden lg:flex flex-col items-start gap-4"
                            >
                                <button className="group relative px-8 py-4 bg-white text-ink-950 border-2 border-ink-950 font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center gap-3">
                                    START WITH AUDIT
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>

                            {/* Risk Reversal - Trust Signal */}
                            <motion.div
                                style={{ opacity: ctaOpacity, y: ctaY }}
                                className="hidden lg:flex mt-8 items-start gap-4 max-w-xs"
                            >
                                <div className="w-[2px] self-stretch bg-orange-600"></div>
                                <div>
                                    <p className="font-mono text-[10px] uppercase font-bold text-ink-400 tracking-widest mb-1">
                                        Risk Reversal
                                    </p>
                                    <p className="text-sm text-ink-950 font-serif leading-relaxed">
                                        “If we don’t find ROI potential, we credit the audit toward Build.”
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - Stepper Timeline */}
                    <div className="lg:w-7/12 relative pt-8 lg:pt-0">
                        {/* Background Vertical Line (gray - thin) */}
                        <div className="absolute left-[12px] top-6 bottom-16 w-[1px] bg-ink-950/20 -translate-x-1/2"></div>

                        {/* Progress Line (orange) - GPU-only scaleY transform */}
                        <motion.div
                            style={{ scaleY: progressScale, transformOrigin: 'top' }}
                            className="absolute left-[9px] top-6 bottom-16 w-[6px] bg-orange-600 z-[5]"
                        />

                        <div className="flex flex-col gap-8 md:gap-16 pb-12">
                            {steps.map((step, index) => (
                                <ProtocolStep
                                    key={step.id}
                                    step={step}
                                    index={index}
                                    sectionProgress={smoothProgress}
                                />
                            ))}

                            {/* Mobile CTA Button */}
                            <motion.div
                                style={{ opacity: ctaOpacity, y: ctaY }}
                                className="lg:hidden pl-12 md:pl-20 pt-4"
                            >
                                <button className="group w-full px-6 py-4 bg-white text-ink-950 border-2 border-ink-950 font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center justify-center gap-3">
                                    START WITH AUDIT
                                    <ArrowRight className="w-4 h-4 group-active:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
