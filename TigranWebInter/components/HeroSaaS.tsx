import React from 'react';
import { Zap, ArrowRight, TrendingUp, User, Bell, Plus, Crosshair } from 'lucide-react';

const HeroSaaS: React.FC = () => {

  const scrollToPricing = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative w-full flex items-center pt-32 pb-16 lg:pt-20 lg:pb-0 lg:min-h-screen overflow-hidden border-b border-ink-950/5">
      
      {/* Micro-Graphics / Architectural Marks */}
      <div className="absolute top-24 left-6 md:left-12 opacity-30 text-ink-950 pointer-events-none">
        <Plus size={16} strokeWidth={1} />
        <span className="text-[10px] font-mono mt-1 block tracking-widest">FIG. 01</span>
      </div>
      <div className="absolute top-24 right-6 md:right-12 opacity-30 text-ink-950 pointer-events-none">
        <Plus size={16} strokeWidth={1} />
        <span className="text-[10px] font-mono mt-1 block tracking-widest text-right">GRID.SYSTEM</span>
      </div>
      <div className="absolute bottom-12 left-6 md:left-12 opacity-30 text-ink-950 pointer-events-none">
        <div className="h-12 w-[1px] bg-ink-950"></div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT COLUMN: Typography & Action */}
        <div className="relative z-20 flex flex-col items-start text-left">
          
          {/* Decorative Dash */}
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[1px] bg-ink-950"></div>
            <span className="font-mono text-xs font-medium text-ink-500 uppercase tracking-widest">Architecting Efficiency</span>
          </div>

          {/* Headline */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-serif font-medium text-ink-950 tracking-tight leading-[0.95] mb-8">
            Agency <br/>
            <span className="italic relative inline-block z-10">
              Automation.
              <span className="absolute bottom-2 left-0 w-full h-[6px] bg-ink-200/50 -z-10"></span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl text-ink-500 max-w-lg mb-10 font-sans font-light leading-relaxed">
            Stop trading time for money. We build autonomous digital infrastructure that handles outreach, onboarding, and fulfillment.
          </p>

          {/* CTA Group */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
             <button 
                onClick={scrollToPricing}
                className="px-8 py-4 bg-ink-950 text-white rounded-none font-mono text-xs uppercase tracking-widest hover:bg-ink-800 transition-all shadow-xl shadow-ink-950/20 flex items-center gap-3 group"
              >
                Start Building
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button className="px-6 py-4 text-ink-950 font-mono text-xs uppercase tracking-widest underline underline-offset-4 hover:text-ink-600 transition-colors">
                View Blueprints
              </button>
          </div>

          {/* Trust Metric */}
          <div className="mt-16 flex items-center gap-4 border-l border-ink-950/20 pl-6">
            <div className="text-sm font-mono text-ink-500">
              <span className="font-bold text-ink-950 block text-lg">120+</span> 
              <span className="text-[10px] uppercase tracking-wider">Systems Deployed</span>
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
             <div className="absolute top-[5%] left-[5%] right-[5%] bg-white rounded-none p-6 shadow-2xl shadow-ink-950/5 border border-ink-950/5 animate-float z-20 md:top-[20%] md:left-[20%] md:right-[20%]">
                <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-ink-950 text-white flex items-center justify-center">
                      <Zap size={16} />
                    </div>
                    <div>
                      <div className="font-serif font-bold text-lg text-ink-950 leading-none">Total Saved</div>
                      <div className="text-[10px] text-ink-400 font-mono uppercase mt-1">Ref: 04-22</div>
                    </div>
                  </div>
                  <div className="px-3 py-1 bg-gray-100 text-ink-950 text-[10px] font-mono uppercase tracking-wider flex items-center gap-1">
                    <TrendingUp size={10} /> +24% YOY
                  </div>
                </div>
                <div className="text-5xl font-serif font-medium text-ink-950 mb-2">$14,250<span className="text-xl text-ink-400">.00</span></div>
                <div className="text-xs font-mono text-ink-400 mb-6 uppercase tracking-wider">Resource allocation optimized</div>
                
                {/* Mock Graph */}
                <div className="flex items-end gap-2 h-16 w-full opacity-80">
                  {[40, 65, 50, 80, 55, 90, 70].map((h, i) => (
                    <div key={i} style={{ height: `${h}%` }} className={`flex-1 ${i === 5 ? 'bg-ink-950' : 'bg-gray-200'}`}></div>
                  ))}
                </div>
             </div>

             {/* CARD 2: Active Agent (Left Floating) */}
             <div className="absolute top-[60%] -left-2 md:top-[50%] md:left-[5%] w-48 bg-white rounded-none p-4 shadow-xl shadow-ink-950/5 border border-ink-950/5 animate-float-delayed z-30">
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-8 h-8 bg-gray-100 flex items-center justify-center text-ink-950">
                     <User size={14} />
                   </div>
                   <div>
                     <div className="text-sm font-serif font-bold text-ink-950">Agent Alpha</div>
                     <div className="text-[10px] text-green-600 font-mono uppercase tracking-wider">● Active</div>
                   </div>
                </div>
                <button className="w-full py-2 border border-ink-950 text-ink-950 text-[10px] font-mono font-bold uppercase hover:bg-ink-950 hover:text-white transition-colors">View Logs</button>
             </div>

             {/* CARD 3: Notification (Right Bottom) */}
             <div className="absolute bottom-[5%] -right-2 md:bottom-[10%] md:right-[5%] w-64 bg-white/90 backdrop-blur-md rounded-none p-5 shadow-xl shadow-ink-950/5 border-l-2 border-ink-950 animate-float z-10">
               <div className="flex items-start gap-3">
                 <div className="w-6 h-6 rounded-full bg-ink-950 flex items-center justify-center text-white shrink-0 mt-1">
                   <Bell size={12} />
                 </div>
                 <div>
                   <div className="text-sm font-serif font-bold text-ink-950">New Lead Captured</div>
                   <div className="text-[10px] text-ink-500 font-mono mt-2 leading-relaxed">
                     Source: LinkedIn<br/>
                     Sequence: #04 Initiated
                   </div>
                 </div>
               </div>
             </div>

             {/* Decorative Elements around cards */}
             <div className="absolute top-[10%] right-[15%] text-ink-950 opacity-20 animate-spin-slow">
                <Crosshair size={40} strokeWidth={1} />
             </div>

           </div>
        </div>

      </div>

    </section>
  );
};

export default HeroSaaS;