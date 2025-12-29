import React from 'react';
import { Zap, ArrowRight, TrendingUp, User, Bell, Plus, Crosshair } from 'lucide-react';
import { DecryptedText } from '../ui/DecryptedText';

export function HeroNew() {

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full flex items-center pt-32 pb-16 lg:pt-20 lg:pb-0 lg:min-h-screen overflow-hidden border-b border-[#0A0A0A]/5">

            {/* Micro-Graphics / Architectural Marks */}
            <div className="absolute top-24 left-6 md:left-12 opacity-30 text-[#0A0A0A] pointer-events-none">
                <Plus size={16} strokeWidth={1} />
                <span className="text-xs font-mono mt-1 block tracking-widest">FIG. 01</span>
            </div>
            <div className="absolute top-24 right-6 md:right-12 opacity-30 text-[#0A0A0A] pointer-events-none">
                <Plus size={16} strokeWidth={1} />
                <span className="text-xs font-mono mt-1 block tracking-widest text-right">GRID.SYSTEM</span>
            </div>
            <div className="absolute bottom-12 left-6 md:left-12 opacity-30 text-[#0A0A0A] pointer-events-none">
                <div className="h-12 w-[1px] bg-[#0A0A0A]"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

                {/* LEFT COLUMN: Typography & Action */}
                <div className="relative z-20 flex flex-col items-start text-left">

                    {/* Decorative Dash */}
                    <div className="flex items-center gap-4 mb-8">
                        <div className="w-12 h-[1px] bg-[#0A0A0A]"></div>
                        <span className="font-mono text-xs font-medium text-[#737373] uppercase tracking-widest">Architecting Efficiency</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-medium text-[#0A0A0A] tracking-tight leading-[0.95] mb-8">
                        <DecryptedText text="Agency" /><br />
                        <span className="italic relative inline-block z-10">
                            <DecryptedText text="Automation." className="italic" />
                            <span className="absolute bottom-2 left-0 w-full h-[6px] bg-[#e5e5e5]/50 -z-10"></span>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-xl text-[#737373] max-w-lg mb-4 font-sans font-light leading-relaxed">
                        We design and ship automation systems that save time, cut costs, and scale operations.
                    </p>
                    <p className="text-lg text-[#737373] max-w-lg mb-10 font-sans font-light leading-relaxed">
                        Start with an audit. Get a clear roadmap in 72 hours.
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <button
                            onClick={scrollToPricing}
                            className="px-8 py-4 bg-white text-[#0A0A0A] border-2 border-[#0A0A0A] rounded-none font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center gap-3 group"
                        >
                            Start Building
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button className="px-6 py-4 text-[#0A0A0A] font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-[#525252] transition-colors">
                            View Blueprints
                        </button>
                    </div>

                    {/* Trust Metric */}
                    <div className="mt-16">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-4">
                            <div>
                                <span className="block font-mono text-3xl font-bold text-[#0A0A0A] mb-1">120+</span>
                                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#737373]">Systems Deployed</span>
                            </div>
                            <div>
                                <span className="block font-mono text-3xl font-bold text-[#0A0A0A] mb-1">2,400+</span>
                                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#737373]">Hours Saved</span>
                            </div>
                            <div>
                                <span className="block font-mono text-3xl font-bold text-[#0A0A0A] mb-1">$14,250+</span>
                                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-[#737373]">Estimated Cost Saved</span>
                            </div>
                        </div>

                        <div className="text-[10px] font-mono text-[#a3a3a3] uppercase tracking-widest flex items-center gap-3 opacity-80">
                            <span>Updated monthly</span>
                            <div className="w-1 h-1 rounded-full bg-[#a3a3a3]"></div>
                            <span>Based on delivered projects</span>
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN: Visuals / Card Cluster */}
                <div className="relative z-10 h-[500px] md:h-[600px] w-full flex items-center justify-center">

                    {/* The Gradient Blob Anchor */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 via-slate-200 to-stone-200 blur-[80px] opacity-80 rounded-full scale-75 animate-drift-slow"></div>

                    {/* Floating Card Cluster Container */}
                    <div className="relative w-full h-full perspective-1000 scale-75 md:scale-100 origin-center">

                        {/* CARD 1: Main Dashboard (Center) */}
                        <div className="absolute top-[5%] left-[5%] right-[5%] bg-white rounded-none p-6 shadow-2xl shadow-[#0A0A0A]/5 border border-[#0A0A0A]/5 animate-float z-20 md:top-[20%] md:left-[20%] md:right-[20%]">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-[#0A0A0A] text-white flex items-center justify-center">
                                        <Zap size={16} />
                                    </div>
                                    <div>
                                        <div className="font-serif font-bold text-lg text-[#0A0A0A] leading-none">Total Saved</div>
                                        <div className="text-xs text-[#a3a3a3] font-mono uppercase mt-1">Ref: 04-22</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-gray-100 text-[#0A0A0A] text-xs font-mono uppercase tracking-wider flex items-center gap-1">
                                    <TrendingUp size={10} /> +24% YOY
                                </div>
                            </div>
                            <div className="text-5xl font-serif font-medium text-[#0A0A0A] mb-2">$14,250<span className="text-xl text-[#a3a3a3]">.00</span></div>
                            <div className="text-xs font-mono text-[#a3a3a3] mb-6 uppercase tracking-wider">Resource allocation optimized</div>

                            {/* Mock Graph */}
                            <div className="flex items-end gap-2 h-16 w-full opacity-80">
                                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className={`flex-1 ${i === 5 ? 'bg-[#0A0A0A]' : 'bg-gray-200'}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* CARD 2: Active Agent (Left Floating) */}
                        <div className="absolute top-[60%] -left-2 md:top-[50%] md:left-[5%] w-48 bg-white rounded-none p-4 shadow-xl shadow-[#0A0A0A]/5 border border-[#0A0A0A]/5 animate-float-delayed z-30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-[#0A0A0A]">
                                    <User size={14} />
                                </div>
                                <div>
                                    <div className="text-sm font-serif font-bold text-[#0A0A0A]">Agent Alpha</div>
                                    <div className="text-xs text-green-600 font-mono uppercase tracking-wider">● Active</div>
                                </div>
                            </div>
                            <button className="w-full py-2 border border-[#0A0A0A] text-[#0A0A0A] text-xs font-mono font-bold uppercase hover:bg-[#0A0A0A] hover:text-white transition-colors">View Logs</button>
                        </div>

                        {/* CARD 3: Notification (Right Bottom) */}
                        <div className="absolute bottom-[5%] -right-2 md:bottom-[10%] md:right-[5%] w-64 bg-white/90 backdrop-blur-md rounded-none p-5 shadow-xl shadow-[#0A0A0A]/5 border-l-2 border-[#0A0A0A] animate-float z-10">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-[#0A0A0A] flex items-center justify-center text-white shrink-0 mt-1">
                                    <Bell size={12} />
                                </div>
                                <div>
                                    <div className="text-sm font-serif font-bold text-[#0A0A0A]">New Lead Captured</div>
                                    <div className="text-xs text-[#737373] font-mono mt-2 leading-relaxed">
                                        Source: LinkedIn<br />
                                        Sequence: #04 Initiated
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements around cards */}
                        <div className="absolute top-[10%] right-[15%] text-[#0A0A0A] opacity-20 animate-spin-slow">
                            <Crosshair size={40} strokeWidth={1} />
                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
}
