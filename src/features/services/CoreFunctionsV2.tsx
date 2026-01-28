/**
 * CoreFunctionsV2 - Redesigned SYS.02 /// Core_Functions
 *
 * Updated Layout: 3 Columns
 * 1. Left: Horizontal Tabs (3 Columns Grid) -> User Requested "3 in a line", "smaller"
 * 2. Left-Bottom: Text Content (Locked - "Perfect")
 * 3. Right: Vertical Flowchart Diagram (Organic Sketch Style - V2.6 Horizontal Features)
 *
 * Updates:
 * - Converted Navigation Tabs from Vertical Stack to Horizontal Grid (3 cols).
 * - Tabs now align with the width of the text block below.
 * - Tab styling: Compact, Icon+Label, Active state uses bottom border.
 * - Diagram remains UNTOUCHED (V2.6).
 *
 * Test URL: http://localhost:3000/test
 */

import { useState, lazy, Suspense, memo } from "react";
import { usePerformanceMode } from "../../hooks/usePerformanceMode";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

// --- Data Constants (extracted for better HMR) ---
// Import from constants file - do NOT re-export to fix HMR
import { tabsV2, tabContentV2 } from "./constants/coreFunctionsData";

// Lazy load the heavy react-peeps library (~2MB)
const PeepCharacter = lazy(() => import('./PeepCharacter').then(m => ({ default: m.PeepCharacter })));

// Internal references
const tabs = tabsV2;
const tabContent = tabContentV2;

// --- Organic Sketch Flowchart (No Container) ---
// --- Organic Sketch Flowchart (No Container) ---
// Exported for use in CoreFunctions.tsx
import { useMediaQuery } from "../../hooks/useMediaQuery";

export const OrganicSketchFlowchart = memo(function OrganicSketchFlowchart({ content }: { content: typeof tabContent.workflow }) {
    const isLowPower = usePerformanceMode();
    const isMobile = useMediaQuery("(max-width: 768px)");

    // Dimensions - dynamic based on view
    const width = isMobile ? 350 : 600;
    const height = isMobile ? 800 : 500;
    const centerX = width / 2;

    // Y-Positions Config
    const config = isMobile ? {
        // Mobile Vertical Stack
        yTrigger: 80,
        yHero: 200,
        // Vertical Features Stack
        yFeature1: 300,
        yFeature2: 380,
        yFeature3: 460,
        yResult: 600,
        triggerSpread: 0, // No horizontal spread for triggers on mobile (or minimal)
        featureSpread: 0  // No horizontal spread for features
    } : {
        // Desktop Horizontal Layout
        yTrigger: 60,
        yHero: 170,
        yFeature1: 300, // All on same row
        yFeature2: 300,
        yFeature3: 300,
        yResult: 420,
        triggerSpread: 110,
        featureSpread: 200
    };

    // --- MOBILE SIMPLIFIED DIAGRAM ---
    if (isMobile) {
        return (
            <div className="w-full max-w-md mx-auto bg-white border-2 border-ink-950 p-4">
                {/* Header */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-ink-950/10">
                    <div className="w-2 h-2 bg-orange-600 rounded-full" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-ink-950/60">
                        Workflow Process
                    </span>
                </div>

                {/* Flow Steps */}
                <div className="space-y-3">
                    {/* Trigger */}
                    <div className="flex items-center gap-3 p-3 bg-neutral-50 border border-ink-950/10">
                        <div className="text-ink-950/60">{content.triggerIcon}</div>
                        <span className="font-mono text-xs text-ink-950">{content.triggers[0]}</span>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <div className="w-px h-4 bg-orange-600" />
                    </div>

                    {/* Hero Action */}
                    <div className="flex items-center justify-center gap-2 p-3 bg-orange-600 text-white">
                        <span className="font-mono text-xs font-bold uppercase tracking-wider">{content.heroAction}</span>
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <div className="w-px h-4 bg-orange-600" />
                    </div>

                    {/* Features Row */}
                    <div className="grid grid-cols-3 gap-2">
                        {content.features?.map((feature, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5 p-2 border border-orange-600/30 border-dashed bg-orange-50/50">
                                <div className="text-ink-950">{feature.icon}</div>
                                <span className="font-mono text-[8px] uppercase tracking-wide text-ink-950 text-center leading-tight">
                                    {feature.label}
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Arrow Down */}
                    <div className="flex justify-center">
                        <div className="w-px h-4 bg-green-600" />
                    </div>

                    {/* Result */}
                    <div className="flex items-center justify-center gap-2 p-3 border border-green-600/30 border-dashed bg-green-50/50">
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                        <span className="font-mono text-xs font-bold text-ink-950">{content.result}</span>
                    </div>
                </div>

                {/* Handwritten Note */}
                <p className="mt-4 text-center text-green-600 text-lg font-medium" style={{ fontFamily: "'Caveat', cursive" }}>
                    {content.handwrittenBottom}
                </p>
            </div>
        );
    }

    // --- LOW POWER MODE FALLBACK ---
    if (isLowPower) {
        return (
            <div className="relative w-full aspect-[6/5] flex items-center justify-center bg-white border border-ink-950/10 p-8 rounded-sm">
                <div className="text-center space-y-4">
                    <div className="flex justify-center gap-4 text-ink-400">
                        {content.triggerIcon}
                        <ArrowRight className="w-4 h-4" />
                        <span className="font-bold text-orange-600">Espera</span>
                        <ArrowRight className="w-4 h-4" />
                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-ink-950">
                        {content.result}
                    </p>
                    <p className="font-serif text-sm text-ink-500 italic">
                        {content.handwrittenBottom}
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full mx-auto flex items-center justify-center select-none bg-white border-2 border-ink-950 p-3 sm:p-6 md:p-10 lg:p-14">
            {/* Background Dot Grid inside Card - 75% Transparency */}
            <div className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />
            <svg viewBox={`0 0 ${width} ${height}`} className="relative z-10 w-full h-auto overflow-visible" style={{ maxHeight: '80vh' }} preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrowhead-sketch" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <path d="M0,0 L6,2 L0,4" fill="none" stroke="#262626" strokeWidth="1" strokeLinecap="round" />
                    </marker>
                </defs>

                {/* --- CONNECTIONS --- */}

                {/* 1. Trigger -> Hero */}
                {content.triggers.length > 1 ? (
                    // Multiple Triggers
                    content.triggers.map((_, index) => {
                        // Desktop: Funnel. Mobile: Compact cluster or Stack
                        let xStart, yStart;

                        if (isMobile) {
                            // Mobile: 2x2 Grid tightly packed or just vertical list
                            // Let's do a tight 2x2 grid for mobile triggers to save vertical space
                            const col = index % 2;
                            const row = Math.floor(index / 2);
                            xStart = centerX + (col === 0 ? -75 : 75);
                            yStart = config.yTrigger + (row * 60);
                        } else {
                            // Desktop: Existing Messy Funnel
                            const messyConfig = [
                                [-110, -65], [110, -65], [-210, 20], [210, 20]
                            ];
                            const mx = messyConfig[index]?.[0] ?? 0;
                            const my = messyConfig[index]?.[1] ?? 0;
                            xStart = centerX + mx;
                            yStart = config.yTrigger + my + 15;
                        }

                        // Path logic
                        const entryPointY = config.yHero - 40;
                        const pathD = `M ${xStart} ${yStart} L ${xStart} ${entryPointY} L ${centerX} ${entryPointY} L ${centerX} ${config.yHero - 22}`;

                        return (
                            <motion.path
                                key={`conn-${index}`}
                                d={pathD}
                                stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
                            />
                        );
                    })
                ) : (
                    // Single Trigger
                    <motion.path
                        d={`M ${centerX} ${config.yTrigger + 20} L ${centerX} ${config.yHero - 22}`}
                        stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                    />
                )}

                {/* 2. Hero -> Features */}
                {isMobile ? (
                    // -- MOBILE: Vertical Chain (Hero -> F1 -> F2 -> F3) --
                    <>
                        {/* Hero -> Feature 1 */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
                            <path d={`M ${centerX} ${config.yHero + 24} L ${centerX} ${config.yFeature1 - 24}`} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                        </motion.g>
                        {/* Feature 1 -> Feature 2 */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
                            <path d={`M ${centerX} ${config.yFeature1 + 24} L ${centerX} ${config.yFeature2 - 24}`} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                        </motion.g>
                        {/* Feature 2 -> Feature 3 */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
                            <path d={`M ${centerX} ${config.yFeature2 + 24} L ${centerX} ${config.yFeature3 - 24}`} stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                        </motion.g>
                    </>
                ) : (
                    // -- DESKTOP: Horizontal Branching --
                    <>
                        {/* Left Branch */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
                            <path
                                d={`M ${centerX} ${config.yHero + 24} L ${centerX} ${config.yHero + 40} L ${centerX - config.featureSpread} ${config.yHero + 40} L ${centerX - config.featureSpread} ${config.yFeature1 - 24}`}
                                stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                            >
                                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                            </path>
                        </motion.g>
                        {/* Center Branch */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
                            <path
                                d={`M ${centerX} ${config.yHero + 24} L ${centerX} ${config.yFeature2 - 24}`}
                                stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                            >
                                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                            </path>
                        </motion.g>
                        {/* Right Branch */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
                            <path
                                d={`M ${centerX} ${config.yHero + 24} L ${centerX} ${config.yHero + 40} L ${centerX + config.featureSpread} ${config.yHero + 40} L ${centerX + config.featureSpread} ${config.yFeature3 - 24}`}
                                stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                            >
                                <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                            </path>
                        </motion.g>
                    </>
                )}

                {/* 3. Features -> Result */}
                {isMobile ? (
                    // -- MOBILE: Vertical Chain (Feature 3 -> Result) --
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
                        <path d={`M ${centerX} ${config.yFeature3 + 24} L ${centerX} ${config.yResult - 24}`} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                    </motion.g>
                ) : (
                    // -- DESKTOP: Converging --
                    <>
                        {/* Left to center */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
                            <path
                                d={`M ${centerX - config.featureSpread} ${config.yFeature1 + 24} L ${centerX - config.featureSpread} ${config.yFeature1 + 40} L ${centerX} ${config.yFeature1 + 40} L ${centerX} ${config.yResult - 24}`}
                                stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                            />
                        </motion.g>
                        {/* Center to result */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.3 }}>
                            <path d={`M ${centerX} ${config.yFeature2 + 24} L ${centerX} ${config.yResult - 24}`} stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none" />
                        </motion.g>
                        {/* Right to center */}
                        <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
                            <path
                                d={`M ${centerX + config.featureSpread} ${config.yFeature3 + 24} L ${centerX + config.featureSpread} ${config.yFeature3 + 40} L ${centerX} ${config.yFeature3 + 40}`}
                                stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                            />
                        </motion.g>
                    </>
                )}


                {/* Side Loop is Desktop Only or adjusted for mobile? Let's hide on mobile or simplify */}
                {!isMobile && (
                    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                        <path d={`M ${centerX + 110} ${config.yHero} L ${centerX + 145} ${config.yHero}`} fill="none" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="4 3" />
                        <rect x={centerX + 150} y={config.yHero - 14} width="160" height="28" rx="0" fill="white" stroke="#262626" strokeWidth="1" />
                        <text x={centerX + 230} y={config.yHero + 5} textAnchor="middle" className="text-[9px] fill-ink-950 font-mono uppercase tracking-wide">Always in sync with you</text>
                    </motion.g>
                )}


                {/* --- NODES --- */}

                {/* 1. TRIGGERS */}
                {content.triggers.length > 1 ? (
                    content.triggers.map((trigger, index) => {
                        let xPos, yPos;
                        if (isMobile) {
                            const col = index % 2;
                            const row = Math.floor(index / 2);
                            xPos = centerX + (col === 0 ? -75 : 75);
                            yPos = config.yTrigger + (row * 60);
                        } else {
                            const messyConfig = [[-110, -65], [110, -65], [-210, 20], [210, 20]];
                            const mx = messyConfig[index]?.[0] ?? 0;
                            const my = messyConfig[index]?.[1] ?? 0;
                            xPos = centerX + mx;
                            yPos = config.yTrigger + my;
                        }

                        const boxWidth = 140;
                        const boxHeight = 50;

                        return (
                            <motion.g key={`trigger-${index}`} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
                                <rect x={xPos - boxWidth / 2} y={yPos - boxHeight / 2} width={boxWidth} height={boxHeight} rx="0" fill="white" stroke="#262626" strokeWidth="1" />
                                <g transform={`translate(${xPos}, ${yPos})`}>
                                    <foreignObject x={-65} y={-7} width="14" height="14">
                                        <div className="flex items-center justify-center text-orange-600">{content.triggerIcon}</div>
                                    </foreignObject>
                                    <text x={5} y={4} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">
                                        {trigger.includes('\n') ? trigger.split('\n')[0] : trigger}
                                    </text>
                                </g>
                            </motion.g>
                        );
                    })
                ) : (
                    // Single Trigger Node
                    <motion.g initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                        <rect x={centerX - 100} y={config.yTrigger - 22} width="200" height="44" rx="0" fill="white" stroke="#262626" strokeWidth="1" />
                        <circle cx={centerX - 75} cy={config.yTrigger} r="14" fill="#f5f5f5" />
                        <foreignObject x={centerX - 82} y={config.yTrigger - 7} width="14" height="14">
                            <div className="flex items-center justify-center text-ink-950">{content.triggerIcon}</div>
                        </foreignObject>
                        <text x={centerX - 52} y={config.yTrigger + 5} className="text-[14px] font-medium fill-ink-950 font-sans">{content.triggers[0]}</text>
                    </motion.g>
                )}

                {/* 2. HERO ACTION */}
                <motion.g initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                    <rect x={centerX - 110} y={config.yHero - 24} width="220" height="48" rx="0" fill="#ea580c" stroke="#ea580c" strokeWidth="1" />
                    <text x={centerX} y={config.yHero + 6} textAnchor="middle" className="text-[13px] font-bold fill-white tracking-wide uppercase">{content.heroAction}</text>
                </motion.g>

                {/* 3. FEATURES NODES in a loop */}
                {[0, 1, 2].map((i) => {
                    const feature = content.features?.[i];
                    if (!feature) return null;

                    let fx, fy;
                    if (isMobile) {
                        fx = centerX;
                        // Map index to yFeature1, yFeature2, yFeature3
                        fy = i === 0 ? config.yFeature1 : (i === 1 ? config.yFeature2 : config.yFeature3);
                    } else {
                        fy = config.yFeature1; // all same row on desktop
                        fx = i === 0 ? centerX - config.featureSpread : (i === 1 ? centerX : centerX + config.featureSpread);
                    }

                    return (
                        <motion.g key={`feat-${i}`} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 + i * 0.1, type: 'spring' }}>
                            <rect x={fx - 80} y={fy - 24} width="160" height="48" rx="0" fill="rgba(234,88,12,0.08)" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                            {/* Simplified corners for cleaner code/less SVG verbosity, or keep full detail */}
                            <foreignObject x={fx - 72} y={fy - 7} width="14" height="14">
                                <div className="flex items-center justify-center text-ink-950">{feature.icon}</div>
                            </foreignObject>
                            <text x={fx} y={fy + 5} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">{feature.label}</text>
                        </motion.g>
                    );
                })}


                {/* 4. RESULT */}
                <motion.g initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.9 }}>
                    <rect x={centerX - 100} y={config.yResult - 24} width="200" height="48" rx="0" fill="rgba(34,197,94,0.06)" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" />
                    <foreignObject x={centerX - 80} y={config.yResult - 8} width="16" height="16">
                        <div className="flex items-center justify-center text-green-600"><CheckCircle2 className="w-4 h-4" /></div>
                    </foreignObject>
                    <text x={centerX + 10} y={config.yResult + 5} textAnchor="middle" className="text-[12px] font-mono font-bold fill-ink-950">{content.result}</text>

                    {/* Peep Character - Hidden on mobile to prevent overflow */}
                    {!isMobile && (
                        <motion.g initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
                            <foreignObject x={centerX + 200} y={config.yResult - 100} width="180" height="200">
                                <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }}>
                                    <Suspense fallback={null}>
                                        <PeepCharacter style={{ width: 160, height: 180 }} accessory='None' body='CrossedArmsWB' face='SmileTeeth' hair='CornRows' strokeColor='#262626' />
                                    </Suspense>
                                </div>
                            </foreignObject>
                        </motion.g>
                    )}

                    <text x={centerX} y={config.yResult + 70} textAnchor="middle" className="fill-green-600 text-[35px] font-medium" style={{ fontFamily: "'Caveat', cursive" }}>{content.handwrittenBottom}</text>
                </motion.g>

            </svg>
        </div >
    );
});



// --- Main Layout ---

export function CoreFunctionsV2() {
    const [activeTab, setActiveTab] = useState("workflow");
    const content = tabContent[activeTab as keyof typeof tabContent];

    return (
        <section
            id="core-functions"
            className="relative py-24 bg-alabaster select-none overflow-hidden min-h-screen"
        >
            {/* Technical Cut - Section Label */}
            <div className="absolute top-6 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-ink-950 text-white px-8 py-3 inline-flex items-center gap-4 pointer-events-auto shadow-xl">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.02 /// Core_Functions
                        </span>
                        <span className="ml-2 px-2 py-0.5 bg-orange-600 text-[10px] font-bold tracking-wider">
                            V2.8 HORIZONTAL_TABS
                        </span>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 max-w-[1240px] h-full relative z-10 pt-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pl-0 lg:pl-4">

                    {/* LEFT COLUMN: NAVIGATION & TEXT (4 cols) - Compacted for more diagram space */}
                    <div className="lg:col-span-4 flex flex-col gap-5 md:gap-6 lg:gap-8 pt-4 md:pt-8">

                        {/* 1. TABS (Horizontal Grid) */}
                        <div className="flex flex-col gap-3">
                            <span className="font-mono text-[10px] text-ink-950/40 uppercase tracking-widest pl-1">
                                SELECT MODULE
                            </span>
                            <div className="grid grid-cols-3 gap-2 w-full">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`group relative flex flex-col items-center justify-center gap-1.5 md:gap-2 px-2 py-2.5 md:py-3 transition-all duration-300 border-b-[2px] min-h-[56px] md:min-h-0 ${activeTab === tab.id
                                            ? "border-orange-600 bg-white shadow-sm"
                                            : "border-transparent hover:bg-neutral-100/50 hover:border-ink-950/20"
                                            }`}
                                    >
                                        <div className={`transition-colors duration-300 ${activeTab === tab.id ? "text-orange-600" : "text-neutral-400 group-hover:text-ink-950"
                                            }`}>
                                            {tab.icon}
                                        </div>
                                        <span className={`font-mono text-[9px] md:text-[10px] uppercase tracking-wider md:tracking-widest font-bold text-center leading-tight transition-colors ${activeTab === tab.id ? "text-ink-950" : "text-neutral-500 group-hover:text-ink-950"
                                            }`}>
                                            {tab.label}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* 2. TEXT CONTENT */}
                        <div className="flex flex-col pt-4">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {/* Active Tab Label */}
                                    <div className="inline-flex items-center gap-2 mb-6">
                                        <span className="font-mono text-[10px] text-orange-600 uppercase tracking-widest font-bold border border-orange-600/20 px-2 py-1 bg-orange-50">
                                            ACTIVE: {content.subtitle}
                                        </span>
                                    </div>

                                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif text-ink-950 mb-4 md:mb-6 tracking-tight leading-[1.1]">
                                        {content.title}
                                    </h2>

                                    <p className="text-ink-950/80 text-sm md:text-base leading-relaxed font-sans font-light mb-6 md:mb-8">
                                        {content.description}
                                    </p>

                                    <div className="mb-6 md:mb-8 p-3 md:p-4 bg-white border-2 border-ink-950 shadow-[4px_4px_0px_0px_#ea580c]">
                                        <p className="font-mono text-[11px] md:text-xs font-bold text-ink-950">
                                            <span className="text-orange-600 mr-2">///</span>
                                            RESULT: {content.benefit}
                                        </p>
                                    </div>

                                    <button className="w-full md:w-fit group flex items-center justify-center gap-3 text-[11px] md:text-xs font-mono font-bold uppercase tracking-widest text-white bg-ink-950 px-5 md:px-6 py-3.5 md:py-3 hover:bg-orange-600 transition-colors shadow-[4px_4px_0px_0px_#e5e5e5] min-h-[48px]">
                                        Explore Details
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: ORGANIC DIAGRAM (8 cols) - Increased from 7 for larger diagram */}
                    {/* NO CONTAINER, NO BORDERS, NO SHADOWS - JUST FLOATING */}
                    <div className="lg:col-span-8 w-full flex items-start justify-center relative pt-4 md:pt-6 lg:pt-10">

                        {/* Dynamic Diagram */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                // --- ИСПРАВЛЕНИЕ НИЖЕ ---
                                // Было: className="h-full flex items-center justify-center p-0 md:p-4 will-change-transform"
                                // Добавлено: w-full
                                className="w-full h-full flex items-center justify-center will-change-transform"
                            >
                                <OrganicSketchFlowchart content={content} />
                            </motion.div>
                        </AnimatePresence>
                    </div>

                </div>
            </div>
        </section>
    );
}
