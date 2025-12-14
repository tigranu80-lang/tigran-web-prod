import React from 'react';
import { ArrowUpRight, ArrowDownRight, ArrowUpLeft, ArrowDownLeft } from 'lucide-react';

const HeroNav: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-pattern bg-[length:40px_40px] opacity-[0.2] pointer-events-none"></div>

      {/* Main Hub Container */}
      <div className="relative w-full max-w-4xl aspect-square md:aspect-video flex items-center justify-center">

        {/* Center Image */}
        <div className="relative z-20 w-64 h-64 md:w-80 md:h-80 rounded-full border border-zinc-700 p-2 bg-zinc-950/80 backdrop-blur-sm shadow-2xl shadow-black/50">
          <div className="w-full h-full rounded-full overflow-hidden grayscale hover:grayscale-0 transition-all duration-700 ease-in-out relative group">
            <img
              src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop"
              alt="Founders"
              className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors"></div>
          </div>

          {/* Central Title */}
          <div className="absolute -bottom-16 left-0 right-0 text-center">
            <h1 className="text-xl font-sans font-bold tracking-[0.2em] uppercase text-zinc-400">AutoMate</h1>
            <p className="text-xs text-zinc-600 font-mono mt-1">EST. 2025</p>
          </div>
        </div>

        {/* Navigation Nodes - Absolute Positioning based on center */}

        {/* Top Left - Services */}
        <div
          onClick={() => scrollToSection('services')}
          className="absolute top-[10%] left-[50%] md:top-[20%] md:left-[15%] cursor-pointer group flex flex-col items-center md:items-end z-30"
        >
          <div className="text-right mb-2 transition-transform group-hover:-translate-x-2">
            <h2 className="text-2xl font-sans font-medium text-zinc-200">Services</h2>
            <p className="text-xs text-zinc-500 font-mono">AUTOMATION & AI</p>
          </div>
          <ArrowDownRight strokeWidth={1} className="w-16 h-16 text-zinc-400 group-hover:text-white transition-colors hidden md:block" />
          <div className="h-16 w-[1px] bg-zinc-700 md:hidden"></div>
        </div>

        {/* Top Right - About */}
        <div
          onClick={() => scrollToSection('about')}
          className="absolute top-[10%] right-[50%] md:top-[20%] md:right-[15%] cursor-pointer group flex flex-col items-center md:items-start z-30"
        >
          <div className="text-left mb-2 transition-transform group-hover:translate-x-2">
            <h2 className="text-2xl font-sans font-medium text-zinc-200">About</h2>
            <p className="text-xs text-zinc-500 font-mono">THE ARCHITECTS</p>
          </div>
          <ArrowDownLeft strokeWidth={1} className="w-16 h-16 text-zinc-400 group-hover:text-white transition-colors hidden md:block" />
          <div className="h-16 w-[1px] bg-zinc-700 md:hidden"></div>
        </div>

        {/* Bottom Left - Pricing */}
        <div
          onClick={() => scrollToSection('pricing')}
          className="absolute bottom-[10%] left-[50%] md:bottom-[20%] md:left-[15%] cursor-pointer group flex flex-col-reverse md:flex-col items-center md:items-end z-30"
        >
          <ArrowUpRight strokeWidth={1} className="w-16 h-16 text-zinc-400 group-hover:text-white transition-colors hidden md:block" />
          <div className="h-16 w-[1px] bg-zinc-700 md:hidden"></div>
          <div className="text-right mt-2 transition-transform group-hover:-translate-x-2">
            <h2 className="text-2xl font-sans font-medium text-zinc-200">Pricing</h2>
            <p className="text-xs text-zinc-500 font-mono">FROM $2k/MO</p>
          </div>
        </div>

        {/* Bottom Right - Contact */}
        <div
          onClick={() => scrollToSection('contact')}
          className="absolute bottom-[10%] right-[50%] md:bottom-[20%] md:right-[15%] cursor-pointer group flex flex-col-reverse md:flex-col items-center md:items-start z-30"
        >
          <ArrowUpLeft strokeWidth={1} className="w-16 h-16 text-zinc-400 group-hover:text-white transition-colors hidden md:block" />
          <div className="h-16 w-[1px] bg-zinc-700 md:hidden"></div>
          <div className="text-left mt-2 transition-transform group-hover:translate-x-2">
            <h2 className="text-2xl font-sans font-medium text-zinc-200">Contact</h2>
            <p className="text-xs text-zinc-500 font-mono">GET STARTED</p>
          </div>
        </div>

        {/* Connecting Lines (Desktop Only) */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-30 hidden md:block">
          <circle cx="50%" cy="50%" r="20%" fill="none" stroke="currentColor" strokeDasharray="4 4" className="text-zinc-600 animate-[spin_60s_linear_infinite]" />
          <line x1="15%" y1="20%" x2="50%" y2="50%" stroke="currentColor" className="text-zinc-700" />
          <line x1="85%" y1="20%" x2="50%" y2="50%" stroke="currentColor" className="text-zinc-700" />
          <line x1="15%" y1="80%" x2="50%" y2="50%" stroke="currentColor" className="text-zinc-700" />
          <line x1="85%" y1="80%" x2="50%" y2="50%" stroke="currentColor" className="text-zinc-700" />
        </svg>

      </div>
    </section>
  );
};

export default HeroNav;