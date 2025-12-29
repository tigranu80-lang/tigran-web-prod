import React from 'react';
import { Check, Plus } from 'lucide-react';
import { DecryptedText } from '../ui/DecryptedText';
import { FadeIn } from '../ui/FadeIn';

const plans = [
  {
    name: 'Audit',
    price: '$500',
    description: 'Deep Analysis.',
    features: ['Workflow Mapping', 'Tech Stack Review', 'Bottleneck Report'],
  },
  {
    name: 'Build',
    price: '$2,500',
    description: 'Implementation.',
    features: ['Custom Integrations', 'Script Development', 'Dashboard Setup', '2 Weeks Support'],
  },
  {
    name: 'Scale',
    price: '$4,000',
    description: 'Full Retainer.',
    features: ['Unlimited Tweaks', 'AI Agent Monitoring', 'Priority Support', 'Monthly Optimization'],
  }
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-ink-950/10 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10 pb-6 md:pb-12 lg:pb-24">

        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end p-6 md:p-12 lg:p-24 border-b border-ink-950/10">
          <div>
            <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">Investment Protocols</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-medium mt-6 text-ink-950 tracking-tight">
              <DecryptedText text="Pricing Models" />
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-[1px] w-12 bg-ink-950"></div>
            <p className="text-ink-400 text-sm font-mono uppercase tracking-wide">
              Transparent.<br />Flat Rate.
            </p>
          </div>
        </div>

        {/* Strict Grid Table - No Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <FadeIn key={index} delay={index * 150} direction="up">
              <div className="relative p-12 flex flex-col min-h-[600px] transition-all duration-500 group border border-dashed bg-white/40 border-ink-950/20 hover:border-orange-500/30 hover:bg-white/60">

                {/* Technical Corner Marking - Top Left */}
                <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t border-l transition-colors duration-300 border-ink-950/30 group-hover:border-orange-500"></div>
                {/* Technical Corner Marking - Top Right */}
                <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t border-r transition-colors duration-300 border-ink-950/30 group-hover:border-orange-500"></div>
                {/* Technical Corner Marking - Bottom Left */}
                <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b border-l transition-colors duration-300 border-ink-950/30 group-hover:border-orange-500"></div>
                {/* Technical Corner Marking - Bottom Right */}
                <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b border-r transition-colors duration-300 border-ink-950/30 group-hover:border-orange-500"></div>

                {/* Technical Crosshair inside */}
                <div className="absolute top-6 right-6 text-ink-950/10 group-hover:text-orange-500/20 transition-colors">
                  <Plus size={16} strokeWidth={1} />
                </div>

                <div className="mb-16">
                  <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-ink-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-ink-300 group-hover:bg-orange-500/50 transition-colors"></span>
                    0{index + 1} — {plan.name}
                  </h3>
                  <div className="flex items-baseline gap-1 mt-8">
                    <span className="text-6xl font-serif font-medium text-ink-950">{plan.price}</span>
                    {plan.name === 'Scale' && <span className="font-mono text-xs text-ink-400">/MO</span>}
                  </div>
                  <p className="text-xs mt-6 font-mono uppercase tracking-wide text-ink-500 border-l-2 border-ink-950/10 pl-4 py-1 leading-relaxed max-w-[200px]">
                    /// {plan.description}
                  </p>
                </div>

                <div className="flex-1">
                  <ul className="space-y-5">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-4 text-xs font-mono uppercase tracking-wide text-ink-600 group-hover:text-ink-950 transition-colors">
                        <div className="w-3 h-3 border border-ink-950/20 flex items-center justify-center shrink-0 mt-0.5 group-hover:border-orange-500/30 transition-colors">
                          <Check size={8} className="text-ink-950 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </div>
                        <span className="opacity-80">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <button className="w-full mt-12 py-4 text-xs font-mono uppercase tracking-[0.2em] border transition-all relative overflow-hidden group/btn bg-transparent text-ink-950 border-ink-950/20 hover:border-orange-500 hover:text-orange-600">
                  <span className="relative z-10">Initialize {plan.name}</span>
                </button>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}