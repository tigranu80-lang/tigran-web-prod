import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, ArrowRight } from 'lucide-react';
import DecryptedText from './DecryptedText';

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
  // Extended details for modal
  fullDescription: string;
  features: string[];
  useCases: string[];
  techStack?: string[];
}

const services: ServiceDetail[] = [
  {
    id: '1',
    title: 'Orchestration',
    description: 'Linking disparate APIS into unified pipelines.',
    icon: '01',
    fullDescription: 'We connect your scattered tools into a unified data pipeline. No more manual data entry, no more copy-pasting between apps. Your systems talk to each other automatically.',
    features: [
      'API Integration & Middleware',
      'Real-time Data Synchronization',
      'Error Handling & Retry Logic',
      'Webhook Management',
      'Custom Workflow Triggers'
    ],
    useCases: [
      'CRM ↔ Email Marketing sync',
      'E-commerce → Inventory → Shipping',
      'Lead capture → CRM → Slack notifications',
      'Calendar → Project Management → Invoicing'
    ],
    techStack: ['Zapier', 'Make', 'n8n', 'Custom APIs']
  },
  {
    id: '2',
    title: 'AI Agents',
    description: 'Autonomous agents for support and sales.',
    icon: '02',
    fullDescription: 'Deploy intelligent agents that work 24/7. They handle customer inquiries, qualify leads, and execute tasks without human intervention. Think of them as your digital workforce.',
    features: [
      'Natural Language Processing',
      'Context-Aware Responses',
      'Multi-Channel Deployment',
      'Learning & Adaptation',
      'Human Handoff Protocols'
    ],
    useCases: [
      'Customer support chatbots',
      'Lead qualification & scoring',
      'Appointment scheduling',
      'FAQ automation',
      'Sales outreach sequences'
    ],
    techStack: ['GPT-4', 'Claude', 'Custom LLMs', 'RAG Systems']
  },
  {
    id: '3',
    title: 'Refactoring',
    description: 'Modernizing outdated business logic.',
    icon: '03',
    fullDescription: 'Your business processes evolved over years of spreadsheets and workarounds. We analyze, document, and rebuild them into clean, scalable systems that actually make sense.',
    features: [
      'Process Documentation',
      'Bottleneck Analysis',
      'System Architecture Design',
      'Migration Planning',
      'Performance Optimization'
    ],
    useCases: [
      'Spreadsheet → Database migration',
      'Legacy system modernization',
      'Manual process automation',
      'Data structure optimization',
      'Reporting pipeline rebuild'
    ],
    techStack: ['Airtable', 'Notion', 'Supabase', 'Custom Dashboards']
  }
];

const Services: React.FC = () => {
  const [selectedService, setSelectedService] = useState<ServiceDetail | null>(null);

  const openModal = (service: ServiceDetail) => {
    setSelectedService(service);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedService(null);
    document.body.style.overflow = 'auto';
  };

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
            <div 
              key={service.id} 
              onClick={() => openModal(service)}
              className="group cursor-pointer p-8 md:p-12 hover:bg-white/40 transition-colors duration-500 relative flex flex-col justify-between min-h-[300px] md:min-h-[400px]"
            >
              
              {/* Top marking */}
              <div className="w-full flex justify-between items-start mb-6 md:mb-12 opacity-30">
                <span className="font-mono text-xs">Fig.{service.icon}</span>
                <span className="text-xl group-hover:rotate-45 transition-transform duration-300">+</span>
              </div>

              {/* Centered Content Container */}
              <div className="flex flex-col items-center w-full">
                <div className="w-full max-w-full md:max-w-[240px]">
                  <h3 className="text-3xl md:text-4xl font-serif font-medium text-ink-950 mb-4 md:mb-6 group-hover:-translate-y-2 transition-transform duration-500 text-left">
                    {service.title}
                  </h3>
                  <p className="text-ink-500 font-mono text-xs leading-relaxed uppercase tracking-wide text-left max-w-xs md:max-w-none">
                    {service.description}
                  </p>
                </div>
              </div>

              {/* Click hint */}
              <div className="mt-8 flex items-center gap-2 text-ink-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="font-mono text-[10px] uppercase tracking-widest">Learn More</span>
                <ArrowRight size={12} />
              </div>
              
              {/* Bottom marking */}
              <div className="font-mono text-6xl text-ink-950/5 font-bold absolute bottom-6 right-6 select-none">
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

      {/* Modal - rendered via Portal to body */}
      {selectedService && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm"
            onClick={closeModal}
          />
          
          {/* Modal Content */}
          <div className="relative bg-alabaster border border-ink-950 w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            
            {/* Modal Header */}
            <div className="p-6 md:p-8 border-b border-ink-950/10 flex justify-between items-start shrink-0">
              <div>
                <span className="font-mono text-[10px] text-ink-400 uppercase tracking-[0.2em] block mb-2">
                  Module {selectedService.icon}
                </span>
                <h3 className="text-3xl md:text-4xl font-serif font-medium text-ink-950">
                  {selectedService.title}
                </h3>
              </div>
              <button 
                onClick={closeModal}
                className="text-ink-400 hover:text-ink-950 transition-colors p-2 -m-2"
              >
                <X size={24} />
              </button>
            </div>

            {/* Modal Body - Scrollable */}
            <div className="p-6 md:p-8 overflow-y-auto flex-1">
              
              {/* Description */}
              <p className="text-ink-600 text-lg leading-relaxed font-sans font-light mb-8">
                {selectedService.fullDescription}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h4 className="font-mono text-[10px] text-ink-400 uppercase tracking-[0.2em] mb-4">
                  Capabilities
                </h4>
                <ul className="space-y-3">
                  {selectedService.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3 text-ink-950">
                      <span className="w-4 h-4 border border-ink-950/20 flex items-center justify-center shrink-0 mt-0.5">
                        <span className="w-1 h-1 bg-ink-950 rounded-full"></span>
                      </span>
                      <span className="font-mono text-sm uppercase tracking-wide">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Use Cases */}
              <div className="mb-8">
                <h4 className="font-mono text-[10px] text-ink-400 uppercase tracking-[0.2em] mb-4">
                  Use Cases
                </h4>
                <div className="space-y-2">
                  {selectedService.useCases.map((useCase, index) => (
                    <div key={index} className="p-3 bg-white/50 border border-ink-950/5">
                      <span className="font-mono text-xs text-ink-600">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tech Stack */}
              {selectedService.techStack && (
                <div>
                  <h4 className="font-mono text-[10px] text-ink-400 uppercase tracking-[0.2em] mb-4">
                    Tech Stack
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedService.techStack.map((tech, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-ink-950 text-alabaster font-mono text-[10px] uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="p-6 md:p-8 border-t border-ink-950/10 shrink-0">
              <button 
                onClick={() => {
                  closeModal();
                  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-4 bg-ink-950 text-alabaster font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink-800 transition-colors flex items-center justify-center gap-3"
              >
                Discuss {selectedService.title}
                <ArrowRight size={14} />
              </button>
            </div>

          </div>
        </div>,
        document.body
      )}

    </section>
  );
};

export default Services;