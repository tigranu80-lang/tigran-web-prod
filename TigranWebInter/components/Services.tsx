import React from 'react';
import { Service } from '../types';

const services: Service[] = [
  {
    id: '1',
    title: 'Orchestration',
    description: 'Linking disparate APIS into unified pipelines.',
    icon: '01'
  },
  {
    id: '2',
    title: 'AI Agents',
    description: 'Autonomous agents for support and sales.',
    icon: '02'
  },
  {
    id: '3',
    title: 'Refactoring',
    description: 'Modernizing outdated business logic.',
    icon: '03'
  }
];

const Services: React.FC = () => {
  return (
    <section id="services" className="border-t border-ink-950/10 bg-white/30 backdrop-blur-sm relative">
      
      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10 min-h-screen flex flex-col justify-center">
        
        {/* Header Section styled as a technical block */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-ink-950/10 p-12 md:p-24">
           <div className="max-w-xl">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-4 h-4 border border-ink-950 rounded-full flex items-center justify-center">
                 <div className="w-1 h-1 bg-ink-950 rounded-full"></div>
               </div>
               <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">System Capabilities</span>
            </div>
            <h2 className="text-6xl md:text-8xl font-serif font-medium text-ink-950 tracking-tight">Core Functions</h2>
           </div>
           <div className="hidden md:block font-mono text-[10px] text-right text-ink-400 opacity-60">
             SECTOR: A-1<br/>
             STATUS: ONLINE
           </div>
        </div>

        {/* Grid Layout - No Gaps, just borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink-950/10 border-b border-ink-950/10">
          {services.map((service) => (
            <div key={service.id} className="group cursor-default p-12 hover:bg-white/40 transition-colors duration-500 relative flex flex-col justify-between min-h-[400px]">
              
              {/* Top marking */}
              <div className="w-full flex justify-between items-start mb-12 opacity-30">
                <span className="font-mono text-xs">Fig.{service.icon}</span>
                <span className="text-xl">+</span>
              </div>

              <div>
                <h3 className="text-4xl font-serif font-medium text-ink-950 mb-6 group-hover:translate-x-2 transition-transform duration-500">{service.title}</h3>
                <p className="text-ink-500 font-mono text-xs leading-relaxed max-w-xs uppercase tracking-wide">
                  {service.description}
                </p>
              </div>
              
              {/* Bottom marking */}
              <div className="mt-12 font-mono text-6xl text-ink-950/5 font-bold absolute bottom-6 right-6 select-none">
                {service.icon}
              </div>
            </div>
          ))}
        </div>
        
        {/* Bottom Technical Footer for Section */}
        <div className="p-6 flex justify-between items-center text-[10px] font-mono uppercase text-ink-300">
           <span>Grid System V2</span>
           <span>/// End Section</span>
        </div>

      </div>
    </section>
  );
};

export default Services;