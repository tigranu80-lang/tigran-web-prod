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
// Exported for use in CoreFunctions.tsx
export const OrganicSketchFlowchart = memo(function OrganicSketchFlowchart({ content }: { content: typeof tabContent.workflow }) {
    const isLowPower = usePerformanceMode();

    // Dimensions - scaled up 1.2x
    const width = 600; // Wider to fit 3 features with spacing
    const height = 500; // Taller to fit features row
    const centerX = width / 2 - 30; // Offset left to account for Side Loop on right

    // Y-Positions with more spacing
    const yTrigger = 60;
    const yHero = 170;
    const yFeatures = 300; // Horizontal Features Row - more space
    const yResult = 420;

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
        <div className="relative w-full mx-auto flex items-center justify-center select-none bg-white border-2 border-ink-950 p-12 lg:p-16">
            {/* Background Dot Grid inside Card - 75% Transparency */}
            <div className="absolute inset-0 opacity-25 pointer-events-none"
                style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '24px 24px'
                }}
            />
            <svg viewBox={`0 0 ${width} ${height}`} className="relative z-10 w-full h-auto overflow-visible" style={{ maxHeight: '70vh' }} preserveAspectRatio="xMidYMid meet">
                <defs>
                    <marker id="arrowhead-sketch" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
                        <path d="M0,0 L6,2 L0,4" fill="none" stroke="#262626" strokeWidth="1" strokeLinecap="round" />
                    </marker>
                </defs>

                {/* --- CONNECTIONS (Straight angles, dashed, animated) --- */}

                {/* Trigger -> Hero Connections (Smooth Curves) */}
                {content.triggers.length > 1 ? (
                    // Multiple Triggers Connections
                    content.triggers.map((_, index) => {
                        // Funnel Layout: Top items close to center, Bottom items wide
                        const messyConfig = [
                            [-110, -65],  // 0: Messy Spreadsheets (Top Left-Center)
                            [110, -65],   // 1: Endless Emails (Top Right-Center)
                            [-210, 20],   // 2: Paper Forms (Bottom Far Left)
                            [210, 20]     // 3: Monkey Job (Bottom Far Right)
                        ];

                        const config = messyConfig[index] || [0, 0];
                        const xStart = centerX + (config[0] ?? 0);
                        const yStart = yTrigger + (config[1] ?? 0) + 15; // Start from bottom of text

                        // Stepped path (Right angles)
                        // Path: Start -> Down -> Horizontal to Center -> Down to Hero
                        const pathD = `M ${xStart} ${yStart} L ${xStart} ${yHero - 40} L ${centerX} ${yHero - 40} L ${centerX} ${yHero - 22}`;

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
                    // Single Trigger Connection
                    <motion.path
                        d={`M ${centerX} ${yTrigger + 20} L ${centerX} ${yHero - 22}`}
                        stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.2, duration: 0.5 }}
                    />
                )}
                {/* Hero -> Features branching (with straight angles) */}
                {/* Left branch */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
                    <path
                        d={`M ${centerX} ${yHero + 24} L ${centerX} ${yHero + 40} L ${centerX - 200} ${yHero + 40} L ${centerX - 200} ${yFeatures - 24}`}
                        stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                </motion.g>
                {/* Center branch */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.3 }}>
                    <path
                        d={`M ${centerX} ${yHero + 24} L ${centerX} ${yFeatures - 24}`}
                        stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                </motion.g>
                {/* Right branch */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }}>
                    <path
                        d={`M ${centerX} ${yHero + 24} L ${centerX} ${yHero + 40} L ${centerX + 200} ${yHero + 40} L ${centerX + 200} ${yFeatures - 24}`}
                        stroke="#ea580c" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                </motion.g>

                {/* Features -> Result (straight angles converging) */}
                {/* Left to center */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
                    <path
                        d={`M ${centerX - 200} ${yFeatures + 24} L ${centerX - 200} ${yFeatures + 40} L ${centerX} ${yFeatures + 40} L ${centerX} ${yResult - 24}`}
                        stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                </motion.g>
                {/* Center to result */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.3 }}>
                    <path
                        d={`M ${centerX} ${yFeatures + 24} L ${centerX} ${yResult - 24}`}
                        stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                </motion.g>
                {/* Right to center */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8, duration: 0.4 }}>
                    <path
                        d={`M ${centerX + 200} ${yFeatures + 24} L ${centerX + 200} ${yFeatures + 40} L ${centerX} ${yFeatures + 40}`}
                        stroke="#22c55e" strokeWidth="1.5" strokeDasharray="6 4" fill="none"
                    >
                        <animate attributeName="stroke-dashoffset" from="20" to="0" dur="1s" repeatCount="indefinite" />
                    </path>
                </motion.g>



                {/* Side Loop (Feedback) - Arrow from orange block to sync button */}
                <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
                    {/* Dashed arrow from orange block to white button */}
                    <path
                        d={`M ${centerX + 110} ${yHero} L ${centerX + 145} ${yHero}`}
                        fill="none" stroke="#a3a3a3" strokeWidth="1" strokeDasharray="4 3"
                    >
                        <animate attributeName="stroke-dashoffset" from="14" to="0" dur="1.5s" repeatCount="indefinite" />
                    </path>
                    {/* Button-styled label - vertically centered with orange block */}
                    <rect
                        x={centerX + 150}
                        y={yHero - 14}
                        width="160"
                        height="28"
                        rx="0"
                        fill="white"
                        stroke="#262626"
                        strokeWidth="1"
                    />
                    <text
                        x={centerX + 230}
                        y={yHero + 5}
                        textAnchor="middle"
                        className="text-[9px] fill-ink-950 font-mono uppercase tracking-wide"
                    >
                        Always in sync with you
                    </text>
                </motion.g>


                {/* --- NODES (Clean White Pills or Text Only) --- */}

                {/* 1. TRIGGER (Top) - Conditional Handling for 1 vs 4 */}
                {content.triggers.length > 1 ? (
                    content.triggers.map((trigger, index) => {
                        // Funnel Layout: Top items close to center, Bottom items wide
                        const messyConfig = [
                            [-110, -65],  // 0: Messy Spreadsheets (Top Left-Center)
                            [110, -65],   // 1: Endless Emails (Top Right-Center)
                            [-210, 20],   // 2: Paper Forms (Bottom Far Left)
                            [210, 20]     // 3: Monkey Job (Bottom Far Right)
                        ];

                        const config = messyConfig[index] || [0, 0];
                        const xPos = centerX + (config[0] ?? 0);
                        const yPos = yTrigger + (config[1] ?? 0);

                        // Dimensions for the box
                        const boxWidth = 140; // Approx based on content
                        const boxHeight = 50;

                        return (
                            <motion.g
                                key={`trigger-${index}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                {/* Box background - centered on xPos, yPos - same styling as single mode */}
                                <rect
                                    x={xPos - boxWidth / 2}
                                    y={yPos - boxHeight / 2}
                                    width={boxWidth}
                                    height={boxHeight}
                                    rx="0"
                                    fill="white"
                                    stroke="#262626"
                                    strokeWidth="1"
                                />

                                {/* Icon LEFT of text, centered vertically */}
                                <g transform={`translate(${xPos}, ${yPos})`}>
                                    <foreignObject x={-65} y={-7} width="14" height="14">
                                        <div className="flex items-center justify-center text-orange-600">
                                            {content.triggerIcon}
                                        </div>
                                    </foreignObject>
                                    {/* Multi-line text support */}
                                    {trigger.includes('\n') ? (
                                        <text y={-5} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">
                                            {trigger.split('\n').map((line, i) => (
                                                <tspan key={i} x={5} dy={i === 0 ? 0 : 12}>{line}</tspan>
                                            ))}
                                        </text>
                                    ) : (
                                        <text x={5} y={4} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">
                                            {trigger}
                                        </text>
                                    )}
                                </g>
                            </motion.g>
                        );
                    })
                ) : (
                    <motion.g
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        <rect x={centerX - 100} y={yTrigger - 22} width="200" height="44" rx="0" fill="white" stroke="#262626" strokeWidth="1" />
                        {/* Icon left */}
                        <circle cx={centerX - 75} cy={yTrigger} r="14" fill="#f5f5f5" />
                        <foreignObject x={centerX - 82} y={yTrigger - 7} width="14" height="14">
                            <div className="flex items-center justify-center text-ink-950">
                                {content.triggerIcon}
                            </div>
                        </foreignObject>
                        <text x={centerX - 52} y={yTrigger + 5} className="text-[14px] font-medium fill-ink-950 font-sans">
                            {content.triggers[0]}
                        </text>
                    </motion.g>
                )}

                {/* Handwriting & Stick Figure - ONLY for single trigger mode */}
                {content.triggers.length === 1 && (
                    <>
                        <text
                            x={centerX - 260}
                            y={yTrigger - 60}
                            className="fill-neutral-500 text-[35px] font-medium"
                            style={{ fontFamily: "'Caveat', cursive" }}
                        >
                            {content.handwrittenTop}
                        </text>
                        <motion.g
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <foreignObject x={centerX - 270} y={yTrigger - 40} width="140" height="140">
                                <div className="w-full h-full" style={{ transform: "scaleX(-1)" }}>
                                    <Suspense fallback={null}>
                                        <PeepCharacter
                                            style={{ width: 120, height: 120 }}
                                            accessory='None'
                                            body='MediumBW'
                                            face='Hectic'
                                            hair='ShortVolumed'
                                            facialHair='None'
                                            strokeColor='#262626'
                                            viewBox={{ x: '0', y: '0', width: '1050', height: '1200' }}
                                        />
                                    </Suspense>
                                </div>
                            </foreignObject>
                        </motion.g>
                    </>
                )}



                {/* 2. HERO ACTION (Center) - Solid Color */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    <rect x={centerX - 110} y={yHero - 24} width="220" height="48" rx="0" fill="#ea580c" stroke="#ea580c" strokeWidth="1" />
                    <text x={centerX} y={yHero + 6} textAnchor="middle" className="text-[13px] font-bold fill-white tracking-wide uppercase">
                        {content.heroAction}
                    </text>
                </motion.g>

                {/* 3. FEATURES (Restored Horizontal Row) */}

                {/* Feature 1 (Left) */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    {/* ProductNode Style Feature 1 */}
                    <rect x={centerX - 280} y={yFeatures - 24} width="160" height="48" rx="0" fill="rgba(234,88,12,0.08)" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                    {/* L-shaped corner markers */}
                    <path d={`M ${centerX - 280} ${yFeatures - 24} L ${centerX - 280} ${yFeatures - 30} L ${centerX - 274} ${yFeatures - 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX - 120} ${yFeatures - 24} L ${centerX - 120} ${yFeatures - 30} L ${centerX - 126} ${yFeatures - 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX - 280} ${yFeatures + 24} L ${centerX - 280} ${yFeatures + 30} L ${centerX - 274} ${yFeatures + 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX - 120} ${yFeatures + 24} L ${centerX - 120} ${yFeatures + 30} L ${centerX - 126} ${yFeatures + 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <foreignObject x={centerX - 272} y={yFeatures - 7} width="14" height="14">
                        <div className="flex items-center justify-center text-ink-950">
                            {content.features?.[0]?.icon}
                        </div>
                    </foreignObject>
                    <text x={centerX - 200} y={yFeatures + 5} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">
                        {content.features?.[0]?.label}
                    </text>
                </motion.g>

                {/* Feature 2 (Center) */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    {/* ProductNode Style Feature 2 */}
                    <rect x={centerX - 80} y={yFeatures - 24} width="160" height="48" rx="0" fill="rgba(234,88,12,0.08)" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                    {/* L-shaped corner markers */}
                    <path d={`M ${centerX - 80} ${yFeatures - 24} L ${centerX - 80} ${yFeatures - 30} L ${centerX - 74} ${yFeatures - 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 80} ${yFeatures - 24} L ${centerX + 80} ${yFeatures - 30} L ${centerX + 74} ${yFeatures - 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX - 80} ${yFeatures + 24} L ${centerX - 80} ${yFeatures + 30} L ${centerX - 74} ${yFeatures + 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 80} ${yFeatures + 24} L ${centerX + 80} ${yFeatures + 30} L ${centerX + 74} ${yFeatures + 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <foreignObject x={centerX - 72} y={yFeatures - 7} width="14" height="14">
                        <div className="flex items-center justify-center text-ink-950">
                            {content.features?.[1]?.icon}
                        </div>
                    </foreignObject>
                    <text x={centerX} y={yFeatures + 5} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">
                        {content.features?.[1]?.label}
                    </text>
                </motion.g>

                {/* Feature 3 (Right) */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, type: 'spring', stiffness: 200, damping: 15 }}
                >
                    {/* ProductNode Style Feature 3 */}
                    <rect x={centerX + 120} y={yFeatures - 24} width="160" height="48" rx="0" fill="rgba(234,88,12,0.08)" stroke="#ea580c" strokeWidth="1.5" strokeDasharray="4 3" />
                    {/* L-shaped corner markers */}
                    <path d={`M ${centerX + 120} ${yFeatures - 24} L ${centerX + 120} ${yFeatures - 30} L ${centerX + 126} ${yFeatures - 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 280} ${yFeatures - 24} L ${centerX + 280} ${yFeatures - 30} L ${centerX + 274} ${yFeatures - 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 120} ${yFeatures + 24} L ${centerX + 120} ${yFeatures + 30} L ${centerX + 126} ${yFeatures + 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 280} ${yFeatures + 24} L ${centerX + 280} ${yFeatures + 30} L ${centerX + 274} ${yFeatures + 30}`} stroke="#ea580c" strokeWidth="2" fill="none" />
                    <foreignObject x={centerX + 128} y={yFeatures - 7} width="14" height="14">
                        <div className="flex items-center justify-center text-ink-950">
                            {content.features?.[2]?.icon}
                        </div>
                    </foreignObject>
                    <text x={centerX + 200} y={yFeatures + 5} textAnchor="middle" className="text-[10px] font-bold fill-ink-950 font-mono uppercase tracking-wide">
                        {content.features?.[2]?.label}
                    </text>
                </motion.g>



                {/* 4. RESULT (Bottom) */}
                <motion.g
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 }}
                >
                    {/* ProductNode Style Result - wider for text */}
                    <rect x={centerX - 100} y={yResult - 24} width="200" height="48" rx="0" fill="rgba(34,197,94,0.06)" stroke="#22c55e" strokeWidth="1.5" strokeDasharray="4 3" />
                    {/* L-shaped corner markers */}
                    <path d={`M ${centerX - 100} ${yResult - 24} L ${centerX - 100} ${yResult - 30} L ${centerX - 94} ${yResult - 30}`} stroke="#22c55e" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 100} ${yResult - 24} L ${centerX + 100} ${yResult - 30} L ${centerX + 94} ${yResult - 30}`} stroke="#22c55e" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX - 100} ${yResult + 24} L ${centerX - 100} ${yResult + 30} L ${centerX - 94} ${yResult + 30}`} stroke="#22c55e" strokeWidth="2" fill="none" />
                    <path d={`M ${centerX + 100} ${yResult + 24} L ${centerX + 100} ${yResult + 30} L ${centerX + 94} ${yResult + 30}`} stroke="#22c55e" strokeWidth="2" fill="none" />
                    <foreignObject x={centerX - 80} y={yResult - 8} width="16" height="16">
                        <div className="flex items-center justify-center text-green-600">
                            <CheckCircle2 className="w-4 h-4" />
                        </div>
                    </foreignObject>
                    <text x={centerX + 10} y={yResult + 5} textAnchor="middle" className="text-[12px] font-mono font-bold fill-ink-950">
                        {content.result}
                    </text>

                    {/* Happy Open Peep - Full Body Standing, Crossed Arms */}
                    <motion.g
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, type: 'spring', stiffness: 200 }}
                    >
                        <foreignObject x={centerX + 200} y={yResult - 100} width="180" height="200">
                            <div style={{ transform: 'scaleX(-1)', width: '100%', height: '100%' }}>
                                <Suspense fallback={null}>
                                    <PeepCharacter
                                        style={{ width: 160, height: 180 }}
                                        accessory='None'
                                        body='CrossedArmsWB'
                                        face='SmileTeeth'
                                        hair='CornRows'
                                        facialHair='None'
                                        strokeColor='#262626'
                                    />
                                </Suspense>
                            </div>
                        </foreignObject>
                    </motion.g>

                    {/* Handwriting - ON TOP of character */}
                    <text
                        x={centerX}
                        y={yResult + 70}
                        className="fill-green-600 text-[35px] font-medium"
                        style={{ fontFamily: "'Caveat', cursive" }}
                    >
                        {content.handwrittenBottom}
                    </text>
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

            <div className="container mx-auto px-6 max-w-[1240px] h-full relative z-10 pt-12">

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pl-4">

                    {/* LEFT COLUMN: NAVIGATION & TEXT (5 cols) - LOCKED */}
                    <div className="lg:col-span-5 flex flex-col gap-8 pt-8">

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
                                        className={`group relative flex flex-col items-center justify-center gap-2 px-2 py-3 transition-all duration-300 border-b-[2px] ${activeTab === tab.id
                                            ? "border-orange-600 bg-white shadow-sm"
                                            : "border-transparent hover:bg-neutral-100/50 hover:border-ink-950/20"
                                            }`}
                                    >
                                        <div className={`transition-colors duration-300 ${activeTab === tab.id ? "text-orange-600" : "text-neutral-400 group-hover:text-ink-950"
                                            }`}>
                                            {tab.icon}
                                        </div>
                                        <span className={`font-mono text-[10px] uppercase tracking-widest font-bold text-center transition-colors ${activeTab === tab.id ? "text-ink-950" : "text-neutral-500 group-hover:text-ink-950"
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

                                    <h2 className="text-3xl lg:text-4xl font-serif text-ink-950 mb-6 tracking-tight leading-[1.1]">
                                        {content.title}
                                    </h2>

                                    <p className="text-ink-950/80 text-base leading-relaxed font-sans font-light mb-8 max-w-md">
                                        {content.description}
                                    </p>

                                    <div className="mb-8 p-4 bg-white border-2 border-ink-950 shadow-[4px_4px_0px_0px_#ea580c] max-w-sm">
                                        <p className="font-mono text-xs font-bold text-ink-950">
                                            <span className="text-orange-600 mr-2">///</span>
                                            RESULT: {content.benefit}
                                        </p>
                                    </div>

                                    <button className="w-fit group flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-widest text-white bg-ink-950 px-6 py-3 hover:bg-orange-600 transition-colors shadow-[4px_4px_0px_0px_#e5e5e5]">
                                        Explore Details
                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                    </button>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: ORGANIC DIAGRAM (7 cols) */}
                    {/* NO CONTAINER, NO BORDERS, NO SHADOWS - JUST FLOATING */}
                    <div className="lg:col-span-7 flex items-start justify-center relative pt-16">

                        {/* Dynamic Diagram */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full flex items-center justify-center p-4 will-change-transform"
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
