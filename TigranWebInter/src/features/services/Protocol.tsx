import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowRight } from "lucide-react";

interface Step {
    id: string;
    phase: string;
    title: string;
    description: string;
    output: string;
}

const steps: Step[] = [
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

const springConfig = { stiffness: 50, damping: 20 };

const ProtocolStep: React.FC<{ step: Step }> = ({ step }) => {
    const containerRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Opacity: fade in at 0.2, fade out at 0.8
    const opacity = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        [0.1, 1, 1, 0.1]
    );

    // Y-axis: rise from bottom, exit to top
    const y = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        [30, 0, 0, -30]
    );

    // Number/Phase color: muted gray → brand orange → muted gray
    const accentColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        ["#73737333", "#ea580c", "#ea580c", "#73737333"]
    );

    // Circle indicator colors
    const circleColor = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        ["#F5F5F0", "#ea580c", "#ea580c", "#F5F5F0"]
    );
    const circleBorder = useTransform(
        smoothProgress,
        [0, 0.2, 0.8, 1],
        ["#A3A3A3", "#ea580c", "#ea580c", "#A3A3A3"]
    );

    return (
        <motion.div
            ref={containerRef}
            style={{ opacity, y, willChange: "transform, opacity" }}
            className="relative pl-12 md:pl-20 py-4 group"
        >
            {/* Circle Indicator on the line */}
            <motion.div
                style={{ backgroundColor: circleColor, borderColor: circleBorder }}
                className="absolute left-[3px] top-6 w-4 h-4 rounded-full border-2 z-10 hidden md:block"
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
                <h4 className="text-3xl md:text-4xl font-serif text-[#0A0A0A] tracking-tight">
                    {step.title}
                </h4>

                {/* Description */}
                <p className="text-[#737373] text-base leading-relaxed max-w-lg">
                    {step.description}
                </p>

                {/* Output Badge */}
                <div className="mt-1">
                    <div className="inline-flex items-center gap-2 bg-white border border-[#0A0A0A]/10 px-4 py-2 shadow-sm">
                        <span className="font-mono text-[10px] uppercase font-bold text-[#0A0A0A]/60">Output:</span>
                        <span className="font-sans text-xs font-bold text-[#0A0A0A]">{step.output}</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export const Protocol: React.FC = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Track scroll progress of entire section
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    // Smooth the progress
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Progress line height (0% to 100%)
    const progressHeight = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);

    // CTA opacity - appears after 80%
    const ctaOpacity = useTransform(smoothProgress, [0.7, 0.85], [0, 1]);
    const ctaY = useTransform(smoothProgress, [0.7, 0.85], [20, 0]);

    return (
        <section
            ref={sectionRef}
            id="protocol"
            className="relative w-full py-24 md:py-32 bg-[#F5F5F0] border-t border-[#0A0A0A]"
        >
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-[#0A0A0A] text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
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
                            <h2 className="text-5xl md:text-7xl font-serif text-[#0A0A0A] mb-8 leading-[1.0] tracking-tight">
                                From leaks to <br />
                                <span className="font-normal text-[#0A0A0A]">stable systems.</span>
                            </h2>

                            <p className="text-xl text-[#737373] font-light leading-relaxed mb-12 max-w-sm">
                                A universal delivery path to ensure ROI.
                            </p>

                            {/* CTA Button - Appears after 80% scroll */}
                            <motion.div
                                style={{ opacity: ctaOpacity, y: ctaY }}
                                className="flex flex-col items-start gap-4"
                            >
                                <button className="group relative px-8 py-4 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center gap-3">
                                    START WITH AUDIT
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </button>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Column - Stepper Timeline */}
                    <div className="lg:w-7/12 relative pt-8 lg:pt-0">
                        {/* Background Vertical Line (gray) */}
                        <div className="absolute left-[10px] top-6 bottom-16 w-[1px] bg-[#0A0A0A]/20 md:left-[10px]"></div>

                        {/* Progress Line (orange) - tracks scroll */}
                        <motion.div
                            style={{ height: progressHeight }}
                            className="absolute left-[10px] top-6 w-[2px] bg-orange-600 md:left-[10px] origin-top z-[5]"
                        />

                        <div className="flex flex-col gap-8 md:gap-16 pb-12">
                            {steps.map((step) => (
                                <ProtocolStep key={step.id} step={step} />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
