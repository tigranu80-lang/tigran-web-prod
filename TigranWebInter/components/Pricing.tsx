import React from 'react';
import { Check, Plus } from 'lucide-react';

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
    highlight: true
  },
  {
    name: 'Scale',
    price: '$4,000',
    description: 'Full Retainer.',
    features: ['Unlimited Tweaks', 'AI Agent Monitoring', 'Priority Support', 'Monthly Optimization'],
  }
];

const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="border-t border-ink-950/10 bg-white/30 backdrop-blur-sm">
      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end p-12 md:p-24 border-b border-ink-950/10">
          <div>
             <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">Investment Protocols</span>
             <h2 className="text-6xl md:text-8xl font-serif font-medium mt-6 text-ink-950 tracking-tight">Pricing Models</h2>
          </div>
          <div className="flex items-center gap-2">
             <div className="h-[1px] w-12 bg-ink-950"></div>
             <p className="text-ink-400 text-sm font-mono uppercase tracking-wide">
               Transparent.<br/>Flat Rate.
             </p>
          </div>
        </div>

        {/* Strict Grid Table - No Gaps */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink-950/10 border-b border-ink-950/10">
          {plans.map((plan, index) => (
            <div key={index} className={`relative p-12 flex flex-col min-h-[600px] transition-colors duration-500 group ${plan.highlight ? 'bg-ink-950/5' : 'hover:bg-white/40'}`}>
              
              {/* Technical Crosshair */}
              <div className="absolute top-4 right-4 text-ink-950/20">
                <Plus size={12} />
              </div>

              <div className="mb-16">
                <h3 className="font-mono text-xs uppercase tracking-[0.2em] mb-4 text-ink-400 flex items-center gap-2">
                  {plan.highlight && <span className="w-2 h-2 bg-ink-950 rounded-full animate-pulse"></span>}
                  0{index + 1} — {plan.name}
                </h3>
                <div className="flex items-baseline gap-1 mt-8">
                  <span className="text-6xl font-serif font-medium text-ink-950">{plan.price}</span>
                  {plan.name === 'Scale' && <span className="font-mono text-xs text-ink-400">/MO</span>}
                </div>
                <p className="text-sm mt-4 font-mono uppercase tracking-wide text-ink-500 border-l border-ink-950/20 pl-4">{plan.description}</p>
              </div>

              <div className="flex-1">
                <ul className="space-y-6">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-4 text-sm font-mono uppercase tracking-wide text-ink-600 group-hover:text-ink-950 transition-colors">
                      <div className="w-4 h-4 border border-ink-950/20 flex items-center justify-center shrink-0 mt-0.5">
                        <Check size={8} className="text-ink-950" />
                      </div>
                      <span className="opacity-80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button className={`w-full mt-12 py-4 text-[10px] font-mono uppercase tracking-[0.2em] border transition-all ${
                plan.highlight 
                  ? 'bg-ink-950 text-alabaster border-ink-950 hover:bg-ink-800' 
                  : 'bg-transparent text-ink-950 border-ink-950/20 hover:border-ink-950'
              }`}>
                Initialize {plan.name}
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Pricing;