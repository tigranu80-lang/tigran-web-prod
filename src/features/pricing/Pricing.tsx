import { FirecrawlAscii } from '../../components/ui/FirecrawlAscii';
import { useState } from 'react';
import { Check, ArrowRight } from 'lucide-react';
import { DecryptedText } from '../ui/DecryptedText';

// ... (inside component)

{/* ASCII Art Effect - Firecrawl Style (Float Animation) */ }
<div className="absolute bottom-0 left-0 right-0 h-[220px] overflow-hidden pointer-events-none z-0 mix-blend-multiply opacity-50">
  <FirecrawlAscii className="text-[#ff4500]/80 text-[8px] leading-[10px] bottom-[-20px] left-[-20px] scale-110" />
</div>

{/* Decorative corner accents - Technical */ }

interface ServiceTier {
  name: string;
  description: string;
  features: string[];
  price?: string;
  timeline?: string;
  validation?: string;
  benefits?: {
    title: string;
    items: string[];
  };
}

const services: ServiceTier[] = [
  {
    name: 'Audit',
    description: 'DEEP ANALYSIS.',
    features: ['WORKFLOW MAPPING', 'TECH STACK REVIEW', 'BOTTLENECK REPORT'],
    price: '€500',
    timeline: '3-5 days',
    validation: 'Credits toward Build if you proceed',
    benefits: {
      title: 'Why Start Here?',
      items: ['Zero risk: know ROI before spending', 'Credits apply to full build', 'Get exact savings forecast']
    }
  },
  {
    name: 'Build',
    description: 'IMPLEMENTATION.',
    features: ['CUSTOM INTEGRATIONS', 'SCRIPT DEVELOPMENT', 'DASHBOARD SETUP'],
    price: 'Custom Quoted',
    timeline: '2-6 weeks',
    validation: 'INCLUDES AUDIT IF SKIPPED',
    benefits: {
      title: 'Why Choose This?',
      items: ['Production-ready system in weeks', 'No hiring, no training needed', 'Ongoing support included']
    }
  },
  {
    name: 'Training',
    description: 'TEAM EMPOWERMENT.',
    features: ['INTERNAL WORKSHOPS', 'AI AGENT MONITORING', 'SOP DOCUMENTATION'],
    price: '€200/hour',
    timeline: '1-2 weeks',
    benefits: {
      title: 'Why Add This?',
      items: ['Your team runs it independently', 'Reduce reliance on external help', 'Custom SOPs for your workflow']
    }
  }
];

export function Pricing() {
  const [activeTab, setActiveTab] = useState(0);

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
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-6 items-stretch">

          {/* LEFT COLUMN: Primary CTA (Free Strategy Call) - 45% */}
          {/* Styled matching the 'Active Blueprint' logic: Thin Orange Border, Clean White Bg */}
          <div className="w-full lg:w-[45%] flex flex-col">
            <div className="relative flex-1 bg-white border border-orange-500/50 p-8 md:p-12 shadow-[0px_4px_24px_-12px_rgba(234,88,12,0.15)] flex flex-col justify-between group overflow-hidden">

              {/* ASCII Art Effect - Firecrawl Style Animation */}
              {/* ASCII Art Effect - Firecrawl Style (Float Animation) */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[60%] overflow-hidden pointer-events-none z-0 mix-blend-multiply opacity-50"
                style={{
                  maskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 15%, black 85%, transparent 100%)'
                }}
              >
                <FirecrawlAscii className="text-[#ff4500]/80 text-[8px] leading-[10px] bottom-0 left-1/2 -translate-x-1/2" />
              </div>

              {/* Decorative corner accents - Technical */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-orange-500"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-orange-500"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-orange-500"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-orange-500"></div>

              <div className="absolute top-8 right-8 z-10">
                <span className="font-mono text-[10px] text-orange-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-orange-600 animate-pulse rounded-full"></span>
                  FREE
                </span>
              </div>

              <div className="relative z-10">
                <span className="font-mono text-xs text-ink-400 uppercase tracking-widest mb-6 block">/// STEP 01</span>

                <h3 className="text-3xl md:text-4xl font-serif font-medium leading-tight mb-6 text-ink-950">
                  <span className="text-orange-600">Discovery</span> Call{' '}
                  <span className="text-base md:text-lg text-ink-400 font-light">(free · 30 min)</span>
                </h3>

                <p className="text-ink-500 font-sans font-light leading-relaxed mb-10 text-sm md:text-base border-l-2 border-orange-500/20 pl-4 py-1">
                  We discuss your current workflow, biggest time sinks, and quick automation opportunities.
                </p>

                {/* Vertical Step Timeline - Technical Minimalist */}
                <div className="space-y-6 mb-12 relative pl-2">
                  {/* Vertical Line */}
                  <div className="absolute top-2 bottom-full left-[19px] w-[1px] bg-dashed border-l border-ink-950/10 h-[80%]"></div>

                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border border-ink-950/20 flex items-center justify-center shrink-0 z-10">
                      <span className="text-[10px] font-mono text-ink-400">01</span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-950/70">Your Workflow</span>
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-white border border-ink-950/20 flex items-center justify-center shrink-0 z-10">
                      <span className="text-[10px] font-mono text-ink-400">02</span>
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-ink-950/70">Time Sinks</span>
                  </div>
                  <div className="relative flex items-center gap-4">
                    <div className="w-6 h-6 rounded-full bg-orange-600 border border-orange-600 flex items-center justify-center shrink-0 z-10 shadow-sm">
                      <Check size={12} className="text-white" />
                    </div>
                    <span className="font-mono text-xs uppercase tracking-wider text-orange-600 font-bold">Clear Recommendation</span>
                  </div>
                </div>
              </div>

              {/* Button matching 'View Full Archive' style exactly */}
              <button
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full py-4 bg-white text-ink-950 border-2 border-ink-950 rounded-none font-mono text-xs uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center justify-center gap-3 group/btn"
              >
                <span>Book <strong>Free</strong> Discovery Call</span>
                <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Vertical Divider Text - Hidden on mobile */}
          <div className="hidden lg:flex items-center justify-center">
            <span
              className="font-mono text-xs font-bold text-orange-600 uppercase tracking-[0.3em] whitespace-nowrap"
              style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
            >
              AFTER THE CALL, WE OFFER:
            </span>
          </div>

          {/* RIGHT COLUMN: Engagement Options - 55% */}
          {/* Lighter, grid-based, 'Blueprints' aesthetic */}
          <div className="w-full lg:w-[52%] flex flex-col gap-6">

            {/* Tabs Navigation */}
            <div className="flex items-center gap-1 border-b border-ink-950/10">
              {services.map((service, index) => (
                <button
                  key={index}
                  onClick={() => setActiveTab(index)}
                  className={`px-6 py-3 text-xs font-mono uppercase tracking-widest transition-all relative ${activeTab === index
                    ? 'text-ink-950 font-bold bg-[#F9F9F9] border-t border-l border-r border-ink-950/10 -mb-[1px]'
                    : 'text-ink-400 hover:text-orange-600'
                    }`}
                >
                  [{service.name}]
                  {activeTab === index && (
                    <span className="absolute top-0 left-0 w-full h-[2px] bg-orange-600"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Active Service Card - Blueprint Layout */}
            {(() => {
              const activeService = services[activeTab];
              if (!activeService) return null;
              return (
                <div className="flex-1 group relative bg-white border border-ink-950/10 transition-all duration-300 min-h-[280px]">

                  {/* Card Header */}
                  <div className="flex items-center justify-between px-6 py-4 border-b border-ink-950/10 bg-[#FAFAFA]">
                    <div className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-orange-600"></span>
                      <span className="font-mono text-[10px] text-ink-400 uppercase tracking-widest">
                        Module 0{activeTab + 1}
                      </span>
                    </div>
                    <h4 className="text-lg font-serif font-medium text-ink-950">{activeService.name}</h4>
                  </div>

                  {/* Two Column Content */}
                  <div className="flex flex-col md:flex-row">

                    {/* LEFT: Features + Benefits */}
                    <div className="flex-1 p-6 md:p-8 flex flex-col gap-6">

                      {/* Features */}
                      <div className="flex flex-col gap-3">
                        <span className="text-[10px] font-mono text-ink-400 uppercase tracking-widest">/// Includes</span>
                        {activeService.features.map((feature, i) => (
                          <div key={i} className="flex items-center gap-3 text-sm text-ink-700 font-sans">
                            <Check size={14} className="text-orange-600 shrink-0" strokeWidth={2.5} />
                            <span>{feature.charAt(0) + feature.slice(1).toLowerCase()}</span>
                          </div>
                        ))}
                      </div>

                      {/* Benefits */}
                      {activeService.benefits && (
                        <div className="flex flex-col gap-3 pt-4 border-t border-dashed border-ink-950/10">
                          <span className="text-[10px] font-mono text-ink-400 uppercase tracking-widest">
                            /// {activeService.benefits.title}
                          </span>
                          {activeService.benefits.items.map((item: string, i: number) => (
                            <div key={i} className="flex items-start gap-3 text-sm text-ink-500 font-sans leading-relaxed">
                              <ArrowRight size={12} className="text-orange-600 shrink-0 mt-1" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Vertical Divider */}
                    <div className="hidden md:block w-px bg-ink-950/10"></div>

                    {/* RIGHT: Price/Timeline + CTA */}
                    <div className="w-full md:w-[240px] p-6 md:p-8 flex flex-col justify-between bg-[#FAFAFA] border-t md:border-t-0 border-ink-950/10">

                      {/* Price Block */}
                      <div className="flex flex-col gap-4">
                        <div>
                          <span className="text-[10px] font-mono text-ink-400 uppercase tracking-widest block mb-2">Investment</span>
                          <span className="text-2xl font-serif font-medium text-ink-950">{activeService.price ?? '—'}</span>
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-ink-400 uppercase tracking-widest block mb-2">Timeline</span>
                          <span className="text-lg font-serif text-ink-950">{activeService.timeline ?? '—'}</span>
                        </div>
                        {activeService.validation && (
                          <div className="text-[10px] font-mono uppercase tracking-widest text-orange-600 font-bold flex items-center gap-2 pt-2 border-t border-dashed border-ink-950/10">
                            <span className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse"></span>
                            {activeService.validation}
                          </div>
                        )}
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                        className="mt-6 w-full py-4 bg-ink-950 text-white border-2 border-ink-950 font-mono text-xs uppercase tracking-[0.15em] shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all flex items-center justify-center gap-2"
                      >
                        Get Started
                        <ArrowRight size={12} />
                      </button>
                    </div>

                  </div>
                </div>
              );
            })()}

          </div>

        </div>

      </div>
    </section>
  );
}