import React, { useState, useEffect } from 'react';
import FadeIn from './FadeIn';

const About: React.FC = () => {
  const [names, setNames] = useState(['Tigran', 'Dima']);

  useEffect(() => {
    // Randomize names on mount to solve the "who goes first" dilemma
    if (Math.random() > 0.5) {
      setNames(['Dima', 'Tigran']);
    }
  }, []);

  return (
    <section id="about" className="border-t border-ink-950/10 bg-alabaster-dark/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10">
        
        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink-950/10">
          
          {/* Left Column: Content */}
          <div className="p-12 md:p-24 flex flex-col justify-between min-h-[600px]">
            <FadeIn direction="left">
            <div>
              <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">The Architects</span>
              <h2 className="text-6xl md:text-8xl font-serif font-medium mt-8 text-ink-950 tracking-tight leading-[0.9]">
                {names[0]} &<br/> <span className="italic text-ink-400">{names[1]}.</span>
              </h2>
              
              <p className="mt-12 text-ink-600 text-lg leading-relaxed font-sans font-light max-w-md">
                We are a two-person unit obsessed with efficiency. Founded in 2025, AutoMate was built on a simple premise: human potential is wasted on repetitive tasks.
              </p>
            </div>
            </FadeIn>
            
            <div className="mt-16 pt-8 border-t border-ink-950/10 grid grid-cols-2 gap-8">
              {/* Dynamic rendering for the footer names too, to match the order */}
              <div>
                <p className="text-ink-950 font-serif text-xl font-bold">{names[0] === 'Tigran' ? 'Tigran' : 'Dima'}</p>
                <p className="text-ink-400 font-mono text-[10px] tracking-widest uppercase mt-2">Co-Founder</p>
              </div>
              <div>
                <p className="text-ink-950 font-serif text-xl font-bold">{names[1] === 'Tigran' ? 'Tigran' : 'Dima'}</p>
                <p className="text-ink-400 font-mono text-[10px] tracking-widest uppercase mt-2">Co-Founder</p>
              </div>
            </div>
          </div>

          {/* Right Column: Image */}
          <FadeIn direction="right" delay={200}>
          <div className="relative group overflow-hidden bg-ink-950/5 min-h-[400px] md:min-h-[600px]">
             <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" alt="Working" className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 transition-opacity duration-700 mix-blend-multiply" />
             
             {/* Overlay Grid */}
             <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
             
             {/* Technical Marker */}
             <div className="absolute bottom-0 left-0 bg-alabaster px-6 py-4 border-t border-r border-ink-950/10">
               <span className="font-mono text-[10px] uppercase tracking-widest text-ink-950">Fig 2.1 — The Lab</span>
             </div>
          </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
};

export default About;