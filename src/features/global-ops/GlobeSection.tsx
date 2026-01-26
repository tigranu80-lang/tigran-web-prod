import { WorldMap } from './WorldMap';

export function GlobeSection() {
    return (
        <section className="relative pt-24 pb-24 bg-transparent border-t border-ink-950">
            {/* Technical Cut - Section Label */}
            <div className="absolute top-6 w-full z-10 pointer-events-none">
                <div className="container mx-auto px-6 max-w-7xl">
                    <div className="bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
                        <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                        <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                            SYS.06 /// GLOBAL_OPS
                        </span>
                    </div>
                </div>
            </div>

            {/* Header Content */}
            <div className="container mx-auto px-6 max-w-7xl relative z-20 mb-12 mt-6 text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium text-ink-950 tracking-tight">
                    Building automation systems for clients across <span className="text-orange-600">multiple countries</span>
                </h2>
            </div>

            {/* Main Console Device Container - Industrial Hardware Look */}
            <div className="container mx-auto px-4 md:px-6 max-w-6xl relative z-10">
                <div className="bg-white border-2 border-ink-950 shadow-[8px_8px_0px_0px_#0A0A0A]">

                    {/* 1. Terminal Header Strip */}
                    {/* 1. Terminal Header Strip - High Contrast Black */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-ink-800 bg-ink-950">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500 shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-sm" />
                            <div className="w-3 h-3 rounded-full bg-green-500 shadow-sm" />
                        </div>
                        <div className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-white shadow-black drop-shadow-md">
                            Working with clients across multiple countries
                        </div>
                        <div className="w-16"></div> {/* Spacer for balance */}
                    </div>

                    {/* 2. Map Screen Area - The 'Monitor' */}
                    {/* Removed overflow-hidden to allow tooltips to pop out */}
                    <div className="relative w-full h-[400px] md:h-[500px] bg-[#F5F5F0] border-b-2 border-ink-950">
                        {/* Vignette Overlay for Screen Effect */}
                        <div className="absolute inset-0 pointer-events-none z-20 shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]" />

                        {/* Grid Background */}
                        <div className="absolute inset-0 z-0 opacity-10"
                            style={{ backgroundImage: 'radial-gradient(#0A0A0A 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                        />

                        {/* The Map Component (Untouched Logic) */}
                        <div className="absolute inset-0 z-10">
                            <WorldMap />
                        </div>
                    </div>

                    {/* 3. The Data Deck - Grid Layout (No Floating Cards) */}
                    <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x-2 divide-ink-950 bg-white">

                        {/* Stat Column 1 - Industries */}
                        <div className="group relative p-5 md:p-6 hover:bg-ink-50 transition-colors duration-200">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">/// INDUSTRIES</span>
                                <span className="font-mono text-[10px] text-ink-300">FIG. 01</span>
                            </div>
                            <div className="font-serif text-2xl md:text-3xl font-medium text-ink-950 mb-2 leading-tight">Who We Serve</div>
                            <div className="font-sans text-xs text-ink-600 leading-relaxed font-light">
                                Small and medium businesses ready to scale operations without scaling headcount. E-commerce stores, SaaS companies, marketing agencies, consulting firms, healthcare providers.
                            </div>
                        </div>

                        {/* Stat Column 2 - London Content Agency */}
                        <div className="group relative p-5 md:p-6 hover:bg-ink-50 transition-colors duration-200">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">/// SECURITY</span>
                                <span className="font-mono text-[10px] text-ink-300">FIG. 02</span>
                            </div>
                            <div className="font-serif text-2xl md:text-3xl font-medium text-ink-950 mb-2 leading-tight">Built for Trust</div>
                            <div className="font-sans text-xs text-ink-600 leading-relaxed font-light">
                                GDPR-compliant infrastructure. SOC 2 security standards. Data encryption at rest and in transit.<br /><br />
                                Your customer data stays secure. We build systems that meet regulatory requirements across industries and regions.
                            </div>
                        </div>

                        {/* Stat Column 3 - Global Reach */}
                        <div className="group relative p-5 md:p-6 hover:bg-ink-50 transition-colors duration-200">
                            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                            <div className="flex justify-between items-start mb-3">
                                <span className="font-mono text-[10px] uppercase tracking-widest text-ink-400">/// GLOBAL_REACH</span>
                                <span className="font-mono text-[10px] text-ink-300">FIG. 03</span>
                            </div>
                            <div className="font-serif text-2xl md:text-3xl font-medium text-ink-950 mb-2 leading-tight">15+ Countries</div>
                            <div className="font-sans text-xs text-ink-600 leading-relaxed font-light">
                                English • Spanish • Russian • Ukrainian<br />
                                Multi-language automation workflows. Multi-region compliance. 24/7 system monitoring across time zones.<br /><br />
                                Build once, deploy globally.
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
}
