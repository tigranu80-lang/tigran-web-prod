import { useState } from "react";
import { Check, ArrowRight } from "lucide-react";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { MobileArchitectureDiagram } from "./diagrams/MobileDiagram";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
    { id: "orchestration", label: "Orchestration" },
    { id: "ai-agents", label: "AI Agents" },
    { id: "refactoring", label: "Refactoring" },
];

const tabContent = {
    orchestration: {
        title: "Orchestration",
        subtitle: "Module 01",
        description:
            "Connect all your tools, apps, and services into one unified command center. We build the nervous system that keeps your business synchronized.",
        capabilities: [
            "API Integration",
            "Workflow Automation",
            "Event Triggers",
            "Data Synchronization",
        ],
        tools: ["Make", "Zapier", "n8n", "Custom APIs"],
    },
    "ai-agents": {
        title: "AI Agents",
        subtitle: "Module 02",
        description:
            "Deploy intelligent assistants that handle repetitive tasks, respond to customers, and make decisions based on your business rules.",
        capabilities: [
            "Natural Language Processing",
            "Contextual Responses",
            "Learning Systems",
            "Multi-channel Support",
        ],
        tools: ["GPT-4", "Claude", "Custom Models", "Voice AI"],
    },
    refactoring: {
        title: "Refactoring",
        subtitle: "Module 03",
        description:
            "Your business processes evolved over years of spreadsheets and workarounds. We analyze, document, and rebuild them into clean, scalable systems that actually make sense.",
        capabilities: [
            "Process Documentation",
            "Bottleneck Analysis",
            "System Architecture Design",
            "Migration Planning",
        ],
        tools: [
            "Airtable",
            "Notion",
            "Supabase",
            "Custom Dashboards",
        ],
    },
};

export function CoreFunctions() {
    const [activeTab, setActiveTab] = useState("refactoring");
    const content = tabContent[activeTab as keyof typeof tabContent];

    return (
        <section
            id="core-functions"
            className="relative py-24 bg-transparent"
        >
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-[#0A0A0A] text-white px-8 py-3 inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.02 /// Core_Functions
                        </span>
                    </div>
                </div>
            </div>

            {/* Vertical Structural Guides - Desktop only */}
            <div className="hidden lg:block absolute inset-y-0 left-12 w-[1px] bg-dashed border-l border-[#0A0A0A]/20 pointer-events-none"></div>

            <div className="hidden lg:block absolute inset-y-0 right-12 w-[1px] bg-dashed border-r border-[#0A0A0A]/20 pointer-events-none"></div>

            {/* Corner Details - Desktop only */}
            <div className="hidden lg:block absolute top-0 right-12 w-4 h-4 border-t border-r border-[#0A0A0A] -translate-y-[1px] translate-x-[1px]"></div>

            {/* Decorative elements (Grid Refs) - Desktop only */}
            <div className="hidden lg:block absolute top-6 right-16 opacity-40 text-[#0A0A0A] pointer-events-none text-right">
                <span className="text-[9px] font-mono block tracking-widest mb-1">
                    SECTOR_B
                </span>
                <span className="text-[9px] font-mono block tracking-widest">
                    GRID_OPACITY: 100%
                </span>
            </div>

            <div className="container mx-auto px-6 max-w-7xl">
                {/* Header */}
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 lg:gap-4 mb-12">
                    <div className="flex items-center gap-4">
                        <div className="w-4 h-4 border border-[#0A0A0A] flex items-center justify-center">
                            <div className="w-1 h-1 bg-[#0A0A0A]"></div>
                        </div>
                        <span className="font-mono text-xs text-[#0A0A0A]/50 tracking-[0.2em] uppercase">
                            System Capabilities
                        </span>
                    </div>

                    {/* Tabs */}
                    <div className="bg-neutral-100 p-1.5 inline-flex gap-1 overflow-x-auto max-w-full">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`relative px-4 py-2 text-sm transition-all duration-200 whitespace-nowrap ${activeTab === tab.id
                                    ? "text-neutral-900 bg-white rounded-sm"
                                    : "text-neutral-500 hover:text-neutral-700"
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {activeTab === tab.id && (
                                        <span className="w-1.5 h-1.5 bg-neutral-900"></span>
                                    )}
                                    {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Content Grid */}
                <div className="relative bg-white border-x border-b lg:border border-[#0A0A0A]/10 overflow-hidden">
                    <div className="absolute top-4 left-4 font-mono text-[10px] text-[#0A0A0A]/40 uppercase tracking-widest">
            /// SYSTEM_VIEW_V1
                    </div>
                    <div className="absolute top-4 right-4 font-mono text-[10px] text-orange-600 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-600 shadow-[0_0_8px_rgba(234,88,12,0.4)] animate-pulse"></span>
                        LIVE
                    </div>

                    <div
                        key={activeTab}
                        className="grid grid-cols-1 lg:grid-cols-3 gap-0"
                    >
                        {/* Details - First on mobile (order-1), Second on desktop (order-2) */}
                        <div className="order-1 lg:order-2 lg:col-span-1 p-6 pt-12 lg:p-8 lg:pt-14 lg:border-l border-[#0A0A0A]/5 flex flex-col justify-between bg-neutral-50/50">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={false}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    style={{ willChange: "transform, opacity" }}
                                >
                                    <div className="mb-8">
                                        <span className="font-mono text-[10px] text-[#0A0A0A]/40 uppercase tracking-[0.2em] block mb-3">
                                            {content.subtitle}
                                        </span>
                                        <h3 className="text-2xl font-serif text-[#0A0A0A] mb-4 tracking-wide">
                                            {content.title}
                                        </h3>
                                        <p className="text-[#0A0A0A]/60 text-[13px] leading-relaxed font-sans font-light">
                                            {content.description}
                                        </p>
                                    </div>

                                    <div className="mb-8">
                                        <h4 className="font-mono text-[10px] text-[#0A0A0A]/40 uppercase tracking-[0.2em] mb-3">
                                            Capabilities
                                        </h4>
                                        <ul className="space-y-2.5">
                                            {content.capabilities.map((capability, index) => (
                                                <motion.li
                                                    key={index}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.1 + index * 0.08 }}
                                                    className="flex items-start gap-2.5 text-[#0A0A0A] text-[13px]"
                                                >
                                                    <Check className="w-3.5 h-3.5 mt-0.5 text-neutral-400" />
                                                    <span>{capability}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="flex flex-wrap gap-2 pt-4 border-t border-[#0A0A0A]/5">
                                        {content.tools.map((tool, index) => (
                                            <motion.span
                                                key={tool}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: 0.3 + index * 0.05 }}
                                                className="px-2 py-1 bg-neutral-100 text-neutral-600 text-xs uppercase tracking-wider"
                                            >
                                                {tool}
                                            </motion.span>
                                        ))}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Diagram - Second on mobile (order-2), First on desktop (order-1) */}
                        <div className="order-2 lg:order-1 lg:col-span-2 p-6 pt-12 lg:p-8 lg:pt-14 relative flex flex-col justify-between border-t lg:border-t-0 border-[#0A0A0A]/5">
                            {/* Mobile: Vertical diagram */}
                            <div className="lg:hidden">
                                <MobileArchitectureDiagram activeTab={activeTab} />
                            </div>
                            
                            {/* Desktop: Horizontal diagram */}
                            <div className="hidden lg:flex flex-col justify-between min-h-[500px]">
                                <ArchitectureDiagram activeTab={activeTab} />
                                <div className="mt-8">
                                    <button className="px-8 py-4 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-none font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center justify-center gap-3">
                                        Configure System
                                        <ArrowRight className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            </div>
                            
                            {/* Mobile CTA */}
                            <div className="lg:hidden mt-4">
                                <button className="w-full px-8 py-4 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-none font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center justify-center gap-3">
                                    Configure System
                                    <ArrowRight className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
