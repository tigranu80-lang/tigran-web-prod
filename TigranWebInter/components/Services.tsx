import React from 'react';
import { Service } from '../types';
import DecryptedText from './DecryptedText';

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
      
      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10 min-h-0 md:min-h-screen flex flex-col justify-center py-12 md:py-0">
        
        {/* Header Section styled as a technical block */}
        <div className="flex flex-col md:flex-row justify-between items-end border-b border-ink-950/10 p-6 md:p-12 lg:p-24 pb-8 md:pb-12">
           <div className="max-w-xl w-full">
            <div className="flex items-center gap-4 mb-6">
               <div className="w-4 h-4 border border-ink-950 rounded-full flex items-center justify-center">
                 <div className="w-1 h-1 bg-ink-950 rounded-full"></div>
               </div>
               <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">System Capabilities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-medium text-ink-950 tracking-tight">
              <DecryptedText text="Core Functions" />
            </h2>
           </div>
           <div className="hidden md:block font-mono text-[10px] text-right text-ink-400 opacity-60">
             SECTOR: A-1<br/>
             STATUS: ONLINE
           </div>
        </div>

        {/* Grid Layout - No Gaps, just borders */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-ink-950/10 border-b border-ink-950/10">
          {services.map((service) => (
            <div key={service.id} className="group cursor-default p-8 md:p-12 hover:bg-white/40 transition-colors duration-500 relative flex flex-col justify-between min-h-[300px] md:min-h-[400px]">
              
              {/* Top marking */}
              <div className="w-full flex justify-between items-start mb-6 md:mb-12 opacity-30">
                <span className="font-mono text-xs">Fig.{service.icon}</span>
                <span className="text-xl">+</span>
              </div>

              {/* Centered Content Container */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-full md:max-w-[240px]"> {/* Container specifically sized to center visually */}
                  <h3 className="text-3xl md:text-4xl font-serif font-medium text-ink-950 mb-4 md:mb-6 group-hover:-translate-y-2 transition-transform duration-500 text-left">
                    {service.title}
                  </h3>
                  <p className="text-ink-500 font-mono text-xs leading-relaxed uppercase tracking-wide text-left max-w-xs md:max-w-none">
                    {service.description}
                  </p>
                </div>
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