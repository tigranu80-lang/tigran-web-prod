import { useRef, useEffect, useCallback } from 'react';
import { useSpring, useMotionValue } from 'framer-motion';
import { useInView } from '../../hooks/useInView';
import { Zap, ArrowRight, TrendingUp, User, Bell, Plus, Crosshair } from 'lucide-react';
import { DecryptedText } from '../ui/DecryptedText';

function CountUp({ to, prefix = '', suffix = '' }: { to: number; prefix?: string; suffix?: string }) {
    const spanRef = useRef<HTMLSpanElement | null>(null);
    const { ref: inViewRef, inView: isInView } = useInView<HTMLSpanElement>({ once: true, margin: "-20px" });

    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
        duration: 2
    });

    // Combine refs: inViewRef for intersection, spanRef for textContent
    const setRefs = useCallback((node: HTMLSpanElement | null) => {
        spanRef.current = node;
        (inViewRef as React.MutableRefObject<HTMLSpanElement | null>).current = node;
    }, [inViewRef]);

    useEffect(() => {
        if (isInView) {
            motionValue.set(to);
        }
    }, [isInView, to, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (spanRef.current) {
                let formatted = latest.toFixed(0);
                if (to >= 1000) {
                    formatted = Math.round(latest).toLocaleString('en-US');
                }
                spanRef.current.textContent = `${prefix}${formatted}${suffix}`;
            }
        });
    }, [springValue, to, prefix, suffix]);

    return <span ref={setRefs} />;
}

export function HeroNew() {

    const scrollToPricing = () => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <section className="relative w-full pt-28 pb-12 md:pt-32 md:pb-16 lg:pt-20 lg:pb-0 lg:min-h-screen lg:flex lg:items-center overflow-hidden border-b border-ink-950/5">

            {/* Micro-Graphics / Architectural Marks - Desktop only (lg+) */}
            <div className="hidden lg:block absolute top-24 left-12 opacity-30 text-ink-950 pointer-events-none">
                <Plus size={16} strokeWidth={1} />
                <span className="text-xs font-mono mt-1 block tracking-widest">FIG. 01</span>
            </div>
            <div className="hidden lg:block absolute top-24 right-12 opacity-30 text-ink-950 pointer-events-none">
                <Plus size={16} strokeWidth={1} />
                <span className="text-xs font-mono mt-1 block tracking-widest text-right">GRID.SYSTEM</span>
            </div>
            <div className="hidden lg:block absolute bottom-12 left-12 opacity-30 text-ink-950 pointer-events-none">
                <div className="h-12 w-[1px] bg-ink-950"></div>
            </div>

            <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16 lg:gap-20 items-start lg:items-center">

                {/* LEFT COLUMN: Typography & Action */}
                <div className="relative z-20 flex flex-col items-start text-left">

                    {/* Decorative Dash */}
                    <div className="flex items-center gap-4 mb-6 md:mb-8 lg:mb-10">
                        <div className="w-12 h-[1px] bg-ink-950"></div>
                        <span className="font-mono text-xs font-medium text-ink-500 uppercase tracking-widest">Architecting Efficiency</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-[3.5rem] sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-semibold md:font-medium text-ink-950 tracking-tight leading-[0.95] md:leading-[1.05] lg:leading-[0.95] mb-6 md:mb-8 lg:mb-10">
                        <DecryptedText text="Agency" /><br />
                        <span className="italic relative inline-block z-10">
                            <DecryptedText text="Automation." className="italic" />
                            <span className="absolute bottom-1 md:bottom-2 left-0 w-full h-[4px] md:h-[6px] bg-[#e5e5e5]/50 -z-10"></span>
                        </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="text-base md:text-lg lg:text-xl text-ink-500 max-w-lg mb-4 md:mb-5 lg:mb-6 font-sans font-light leading-[1.7] md:leading-[1.6] lg:leading-relaxed">
                        We design and ship automation systems that save time, cut costs, and scale operations.
                    </p>
                    <p className="text-sm md:text-base lg:text-lg text-ink-500 max-w-lg mb-8 md:mb-10 lg:mb-12 font-sans font-light leading-[1.7] md:leading-[1.6] lg:leading-relaxed">
                        Start with a strategy session. Get a clear <b className="text-ink-950 font-medium italic">roadmap in 72 hours.</b>
                    </p>

                    {/* CTA Group */}
                    <div className="flex flex-col sm:flex-row items-start gap-4 md:gap-6 mb-8 md:mb-10 lg:mb-12">
                        <button
                            onClick={scrollToPricing}
                            className="px-8 py-4 bg-white text-ink-950 border-2 border-ink-950 rounded-none font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center gap-3 group"
                        >
                            Start Building
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <button
                            onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                            className="px-6 py-4 text-ink-950 font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-[#525252] transition-colors"
                        >
                            View Blueprints
                        </button>
                    </div>

                    {/* Trust Metric */}
                    <div className="mt-0 pt-8 border-t border-ink-950/5">
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-4 md:mb-5">
                            <div>
                                <span className="block font-mono text-3xl font-bold text-ink-950 mb-1">
                                    <CountUp to={120} suffix="+" />
                                </span>
                                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-500">Systems Deployed</span>
                            </div>
                            <div>
                                <span className="block font-mono text-3xl font-bold text-ink-950 mb-1">
                                    <CountUp to={2400} suffix="+" />
                                </span>
                                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-500">Hours Saved</span>
                            </div>
                            <div>
                                <span className="block font-mono text-3xl font-bold text-ink-950 mb-1">
                                    <CountUp to={14250} prefix="$" suffix="+" />
                                </span>
                                <span className="block font-mono text-[10px] font-medium uppercase tracking-[0.15em] text-ink-500">Estimated Cost Saved</span>
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
                <div className="relative z-10 h-auto lg:h-[600px] w-full flex items-center justify-center mt-8 lg:mt-0">

                    {/* The Gradient Blob Anchor - Desktop only (lg+) */}
                    <div className="hidden lg:block absolute inset-0 bg-gradient-to-tr from-gray-200 via-slate-200 to-stone-200 blur-[80px] opacity-80 rounded-full scale-75 animate-drift-slow"></div>

                    {/* Floating Card Cluster Container */}
                    <div className="relative w-full h-full perspective-1000 lg:scale-100 origin-center">

                        {/* CARD 1: Main Dashboard (Center) - static on mobile/tablet, absolute on desktop */}
                        <div className="relative lg:absolute w-full lg:w-auto lg:top-[20%] lg:left-[20%] lg:right-[20%] bg-white rounded-none p-5 lg:p-6 shadow-2xl shadow-[#0A0A0A]/5 border border-ink-950/5 lg:animate-float z-20">
                            <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-ink-950 text-white flex items-center justify-center">
                                        <Zap size={16} />
                                    </div>
                                    <div>
                                        <div className="font-serif font-bold text-lg text-ink-950 leading-none">Total Saved</div>
                                        <div className="text-xs text-[#a3a3a3] font-mono uppercase mt-1">Ref: 04-22</div>
                                    </div>
                                </div>
                                <div className="px-3 py-1 bg-gray-100 text-ink-950 text-xs font-mono uppercase tracking-wider flex items-center gap-1">
                                    <TrendingUp size={10} /> +24% YOY
                                </div>
                            </div>
                            <div className="text-5xl font-serif font-medium text-ink-950 mb-2">$14,250<span className="text-xl text-[#a3a3a3]">.00</span></div>
                            <div className="text-xs font-mono text-[#a3a3a3] mb-6 uppercase tracking-wider">Resource allocation optimized</div>

                            {/* Mock Graph */}
                            <div className="flex items-end gap-2 h-16 w-full opacity-80">
                                {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                                    <div key={i} style={{ height: `${h}%` }} className={`flex-1 ${i === 5 ? 'bg-ink-950' : 'bg-gray-200'}`}></div>
                                ))}
                            </div>
                        </div>

                        {/* CARD 2: Active Agent (Left Floating) - Desktop only (lg+) */}
                        <div className="hidden lg:block absolute lg:top-[50%] lg:left-[5%] w-48 bg-white rounded-none p-4 shadow-xl shadow-[#0A0A0A]/5 border border-ink-950/5 animate-float-delayed z-30">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-ink-950">
                                    <User size={14} />
                                </div>
                                <div>
                                    <div className="text-sm font-serif font-bold text-ink-950">Agent Alpha</div>
                                    <div className="text-xs text-green-600 font-mono uppercase tracking-wider">● Active</div>
                                </div>
                            </div>
                            <button className="w-full py-2 border border-ink-950 text-ink-950 text-xs font-mono font-bold uppercase hover:bg-ink-950 hover:text-white transition-colors">View Logs</button>
                        </div>

                        {/* CARD 3: Notification (Right Bottom) - Desktop only (lg+) */}
                        <div className="hidden lg:block absolute lg:bottom-[10%] lg:right-[5%] w-64 bg-white/90 backdrop-blur-md rounded-none p-5 shadow-xl shadow-[#0A0A0A]/5 border-l-2 border-ink-950 animate-float z-10">
                            <div className="flex items-start gap-3">
                                <div className="w-6 h-6 rounded-full bg-ink-950 flex items-center justify-center text-white shrink-0 mt-1">
                                    <Bell size={12} />
                                </div>
                                <div>
                                    <div className="text-sm font-serif font-bold text-ink-950">New Lead Captured</div>
                                    <div className="text-xs text-ink-500 font-mono mt-2 leading-relaxed">
                                        Source: LinkedIn<br />
                                        Sequence: #04 Initiated
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Elements around cards - Desktop only (lg+) */}
                        <div className="hidden lg:block absolute top-[10%] right-[15%] text-ink-950 opacity-20 animate-spin-slow">
                            <Crosshair size={40} strokeWidth={1} />
                        </div>

                    </div>
                </div>

            </div>

        </section>
    );
}
