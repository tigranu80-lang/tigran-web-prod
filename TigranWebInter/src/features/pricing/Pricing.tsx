import React from 'react';
import { Check, Plus, ArrowRight } from 'lucide-react';
import { DecryptedText } from '../ui/DecryptedText';
import { FadeIn } from '../ui/FadeIn';

const services = [
  {
    name: 'Audit',
    description: 'Deep Analysis.',
    features: ['Workflow Mapping', 'Tech Stack Review', 'Bottleneck Report'],
  },
  {
    name: 'Build',
    description: 'Implementation.',
    features: ['Custom Integrations', 'Script Development', 'Dashboard Setup'],
  },
  {
    name: 'Training',
    description: 'Team Empowerment.',
    features: ['Internal Workshops', 'AI Agent Monitoring', 'SOP Documentation'],
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="relative border-t border-ink-950/10 bg-[#F5F5F0]/60 backdrop-blur-[2px]">
      {/* Technical Cut - Section Label */}
      <div className="absolute top-0 w-full z-10 pointer-events-none">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="-translate-y-1/2 bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
            <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
              SYS.07 /// PRICING_MODELS
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl pt-16 pb-12 md:pb-24">

        {/* Header */}
        <div className="mb-12 md:mb-16">
          <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">Engagement Protocols</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-medium mt-6 text-ink-950 tracking-tight">
            <DecryptedText text="Start with Strategy" />
          </h2>
        </div>

        {/* Main 2-Column Asymmetrical Layout */}
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch">

          {/* LEFT COLUMN: Primary CTA (Free Strategy Call) - 45% */}
          {/* Styled matching the 'Active Blueprint' logic: Thin Orange Border, Clean White Bg */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <div className="relative flex-1 bg-white border border-orange-500/50 p-8 md:p-12 shadow-[0px_4px_24px_-12px_rgba(234,88,12,0.15)] flex flex-col justify-between group overflow-hidden">

              {/* Decorative corner accents - Technical */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500"></div>

              <div className="absolute top-8 right-8">
                <span className="font-mono text-[10px] text-orange-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 animate-pulse rounded-full"></span>
                  Priority Access
                </span>
              </div>

              <div>
                <span className="font-mono text-xs text-ink-400 uppercase tracking-widest mb-6 block">/// Step 01.</span>

                <h3 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-6 text-ink-950">
                  <span className="text-orange-600">Discovery</span> & <br />
                  Roadmap Call
                </h3>

                <p className="text-ink-500 font-sans font-light leading-relaxed mb-10 text-sm md:text-base border-l-2 border-orange-500/20 pl-4 py-1">
                  We don't sell blind. Join us for a 30-minute discovery session to map your workflow and define your automation roadmap.
                </p>

                {/* Vertical Step Timeline - Technical Minimalist */}
                <div className="space-y-6 mb-12 relative pl-2">
                  {/* Vertical Line */}
                  <div className="absolute top-2 bottom-full left-[19px] w-[1px] bg-dashed border-l border-ink-950/10 h-[80%]"></div>

                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border border-ink-950/20 flex items-center justify-center shrink-0 z-10">
                      <span className="text-[10px] font-mono text-ink-400">01</span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-950/70">Identify Challenges</span>
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border border-ink-950/20 flex items-center justify-center shrink-0 z-10">
                      <span className="text-[10px] font-mono text-ink-400">02</span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-950/70">Blueprint</span>
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-orange-600 border border-orange-600 flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-orange-600 font-bold">Execution</span>
                  </div>
                </div>
              </div>

              {/* Button matching 'View Full Archive' style exactly */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-white text-ink-950 border-2 border-ink-950 rounded-none font-mono text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center justify-center gap-3 group/btn"
              >
                <span>Book Discovery Session</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Engagement Options - 55% */}
          {/* Lighter, grid-based, 'Blueprints' aesthetic */}
          <div className="w-full lg:w-[55%] flex flex-col gap-4">
            {services.map((service, index) => (
              <div key={index} className="flex-1 group relative bg-[#F9F9F9] border border-ink-950/5 p-6 md:p-8 hover:bg-white hover:border-ink-950/20 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">

                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 group-hover:bg-orange-600 transition-colors"></span>
                    <span className="font-mono text-[10px] text-ink-400 uppercase tracking-widest">
                        /// Option 0{index + 1}
                    </span>
                  </div>
                  <h4 className="text-xl font-serif font-medium text-ink-950 group-hover:text-orange-600 transition-colors">{service.name}</h4>
                  <p className="text-xs font-mono text-ink-500 uppercase tracking-wide max-w-xs opacity-70">
                    {service.description}
                  </p>
                </div>

                {/* Minimal Feature List */}
                <div className="flex flex-col gap-2 border-l border-ink-950/5 pl-4 md:pl-8 min-w-[180px]">
                  {service.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-xs text-ink-500 font-mono uppercase tracking-wide">
                      <Check size={10} className="text-ink-300 group-hover:text-orange-500 transition-colors" />
                      {feature}
                    </div>
                  ))}
                </div>

                <div className="md:ml-auto shrink-0">
                  <button
                    onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                    className="w-full md:w-auto px-4 py-2 border border-ink-950/10 bg-transparent text-[10px] font-mono uppercase tracking-widest text-ink-400 hover:text-orange-600 hover:border-orange-600 transition-colors flex items-center justify-center gap-2"
                  >
                    Explore
                    <ArrowRight size={10} className="-rotate-45 group-hover:rotate-0 transition-transform" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}