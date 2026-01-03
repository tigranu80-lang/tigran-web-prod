import React, { useState, useEffect } from 'react';
import { FadeIn } from '../ui/FadeIn';

export function About() {
  const [names, setNames] = useState(['Tigran', 'Dima']);

  useEffect(() => {
    // Randomize names on mount to solve the "who goes first" dilemma
    if (Math.random() > 0.5) {
      setNames(['Dima', 'Tigran']);
    }
  }, []);

  return (
    <section id="about" className="relative border-t border-ink-950/10 bg-[#F5F5F0]/60 backdrop-blur-[2px]">
      {/* Technical Cut - Section Label */}
      <div className="absolute top-0 w-full z-10 pointer-events-none">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="-translate-y-1/2 bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
            <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
              SYS.05 /// THE_ARCHITECTS
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10">

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink-950/10">

          {/* Left Column: Content */}
          <div className="p-12 md:p-24 flex flex-col justify-between min-h-[600px]">
            <FadeIn direction="left">
              <div>
                <h2 className="text-6xl md:text-8xl font-serif font-medium mt-8 text-ink-950 tracking-tight leading-[0.9]">
                  {names[0]} &<br /> <span className="italic text-ink-400">{names[1]}.</span>
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
                <p className="text-ink-400 font-mono text-xs tracking-widest uppercase mt-2">Co-Founder</p>
              </div>
              <div>
                <p className="text-ink-950 font-serif text-xl font-bold">{names[1] === 'Tigran' ? 'Tigran' : 'Dima'}</p>
                <p className="text-ink-400 font-mono text-xs tracking-widest uppercase mt-2">Co-Founder</p>
              </div>
            </div>
          </div>

          {/* Right: Image */}
          <FadeIn direction="right" delay={200}>
            <div className="relative group overflow-hidden min-h-[400px] md:min-h-[600px] p-4">
              {/* Tech Frame */}
              <div className="absolute inset-4 border border-dashed border-ink-950/20 z-10 pointer-events-none"></div>
              {/* Corner Ticks */}
              <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-ink-950 z-10"></div>
              <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-ink-950 z-10"></div>
              <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-ink-950 z-10"></div>
              <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-ink-950 z-10"></div>

              <div className="relative w-full h-full bg-ink-950/5 overflow-hidden group-hover:bg-transparent transition-colors duration-700">
                <img
                  src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
                  alt="Working"
                  loading="lazy"
                  className="w-full h-full object-cover grayscale contrast-125 opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 mix-blend-multiply"
                />

                {/* Overlay Grid */}
                <div className="absolute inset-0 bg-grid opacity-20 pointer-events-none"></div>
              </div>

              {/* Technical Marker */}
              <div className="absolute bottom-8 left-8 bg-alabaster px-4 py-2 border border-ink-950/10 z-20">
                <span className="font-mono text-[9px] uppercase tracking-widest text-ink-950 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse"></span>
                  Fig 2.1 — The Lab
                </span>
              </div>
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}