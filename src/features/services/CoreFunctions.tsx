import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";
import { OrganicSketchFlowchart } from "./CoreFunctionsV2";
import { tabsV2, tabContentV2 } from "./constants/coreFunctionsData";

const tabs = tabsV2;
const tabContent = tabContentV2;

export function CoreFunctions() {
    const [activeTab, setActiveTab] = useState("workflow");
    const content = tabContent[activeTab as keyof typeof tabContent];

    return (
        <section
            id="core-functions"
            className="relative py-24 bg-transparent content-visibility-auto contain-intrinsic-size-[800px]"
        >
            {/* Technical Cut - Section Label */}
            <div className="absolute top-6 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-ink-950 text-white px-8 py-3 inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.02 /// Core_Functions
                        </span>
                    </div>
                </div>
            </div>

            {/* Vertical Structural Guides - Desktop only */}
            <div className="hidden lg:block absolute inset-y-0 left-12 w-[1px] bg-dashed border-l border-ink-950/20 pointer-events-none"></div>

            <div className="hidden lg:block absolute inset-y-0 right-12 w-[1px] bg-dashed border-r border-ink-950/20 pointer-events-none"></div>

            {/* Corner Details - Desktop only */}
            <div className="hidden lg:block absolute top-0 right-12 w-4 h-4 border-t border-r border-ink-950 -translate-y-[1px] translate-x-[1px]"></div>

            {/* Decorative elements (Grid Refs) - Desktop only */}
            <div className="hidden lg:block absolute top-6 right-16 opacity-40 text-ink-950 pointer-events-none text-right">
                <span className="text-[9px] font-mono block tracking-widest mb-1">
                    SECTOR_B
                </span>
                <span className="text-[9px] font-mono block tracking-widest">
                    GRID_OPACITY: 100%
                </span>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
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

                                    <p className="text-ink-950/80 text-base leading-relaxed font-sans font-light mb-24 max-w-md">
                                        {content.description}
                                    </p>

                                    <div className="mb-0 p-4 bg-white border-2 border-ink-950 shadow-[4px_4px_0px_0px_#ea580c] max-w-sm">
                                        <p className="font-mono text-xs font-bold text-ink-950">
                                            <span className="text-orange-600 mr-2">///</span>
                                            RESULT: {content.benefit}
                                        </p>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                    </div>


                    {/* RIGHT COLUMN: ORGANIC DIAGRAM (7 cols) */}
                    {/* NO CONTAINER, NO BORDERS, NO SHADOWS - JUST FLOATING */}
                    <div className="lg:col-span-7 flex items-start justify-center relative pt-0 translate-x-16">
                        {/* Dynamic Diagram */}
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.05 }}
                                transition={{ duration: 0.4 }}
                                className="w-full h-full flex items-center justify-center p-4"
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
