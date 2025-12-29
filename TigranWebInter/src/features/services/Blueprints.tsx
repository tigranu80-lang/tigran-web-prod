import { ArrowRight } from "lucide-react";

export function Blueprints() {
    return (
        <section className="relative py-24 border-t border-[#0A0A0A] bg-transparent">
            {/* Technical Cut - Section Label */}
            <div className="absolute top-0 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="-translate-y-1/2 bg-[#0A0A0A] text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.04 /// Blueprints
                        </span>
                    </div>
                </div>
            </div>

            {/* Vertical Structural Guides */}
            <div className="absolute inset-y-0 left-6 md:left-12 w-[1px] bg-dashed border-l border-[#0A0A0A]/20 pointer-events-none"></div>

            <div className="absolute inset-y-0 right-6 md:right-12 w-[1px] bg-dashed border-r border-[#0A0A0A]/20 pointer-events-none"></div>

            {/* Corner Details */}
            <div className="absolute top-0 right-6 md:right-12 w-4 h-4 border-t border-r border-[#0A0A0A] -translate-y-[1px] translate-x-[1px]"></div>

            <div className="container mx-auto px-6 max-w-7xl relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        {
                            title: "Inbound Lead Engine",
                            tags: ["n8n", "OpenAI", "CRM"],
                            desc: "Full automated routing and qualification system.",
                            code: "BLU-01",
                        },
                        {
                            title: "Inventory Control",
                            tags: ["Make", "Shopify", "Sheets"],
                            desc: "Real-time sync between warehouse and frontend.",
                            code: "BLU-02",
                        },
                        {
                            title: "Support Triaging",
                            tags: ["LangChain", "Zendesk", "Vector"],
                            desc: "Semantic search and auto-drafting for agents.",
                            code: "BLU-03",
                        },
                    ].map((bp, i) => (
                        <div
                            key={i}
                            className="group relative bg-[#F9F9F9] border border-[#0A0A0A]/10 p-8 hover:bg-white hover:border-orange-600 hover:shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] transition-all duration-200 flex flex-col min-h-[320px]"
                        >
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <ArrowRight className="w-5 h-5 text-orange-600 -rotate-45" />
                            </div>

                            <div className="flex flex-col gap-6 mb-auto">
                                <span className="font-mono text-xs text-[#0A0A0A]/40 uppercase tracking-widest border-b border-[#0A0A0A]/10 pb-2 w-fit group-hover:text-orange-600 group-hover:border-orange-600/30 transition-colors">
                                    {bp.code}
                                </span>

                                <h3 className="text-2xl font-serif text-[#0A0A0A] group-hover:text-orange-600 transition-colors">
                                    {bp.title}
                                </h3>

                                <p className="text-[#737373] text-sm leading-relaxed">
                                    {bp.desc}
                                </p>
                            </div>

                            <div className="mt-8 pt-6 border-t border-[#0A0A0A]/5 group-hover:border-orange-600/10">
                                <div className="flex flex-wrap gap-2">
                                    {bp.tags.map((t, idx) => (
                                        <span
                                            key={idx}
                                            className="text-[10px] font-mono text-[#0A0A0A]/60 uppercase tracking-wider bg-white border border-[#0A0A0A]/10 px-2 py-1"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-16 flex justify-center">
                    <button className="group relative px-8 py-4 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-none font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all">
                        <span className="relative z-10 flex items-center gap-3">
                            View Full Archive{" "}
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                    </button>
                </div>
            </div>
        </section>
    );
}
