import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import DecryptedText from './DecryptedText';
import FadeIn from './FadeIn';
import ArchitectureDemo from './ArchitectureDemo';
import { motion, AnimatePresence } from 'framer-motion';

interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  icon: string;
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
  const [selectedServiceId, setSelectedServiceId] = useState<string>('1');
  
  const activeService = services.find(s => s.id === selectedServiceId) || services[0];

  return (
    <section id="services" className="border-t border-ink-950/10 bg-white/30 backdrop-blur-sm relative py-12 md:py-24">
      
      <div className="container mx-auto px-6 max-w-7xl">
        
        {/* Header Section */}
        <div className="flex flex-col items-center text-center mb-12 md:mb-20">
           <div className="flex items-center gap-4 mb-6">
              <div className="w-4 h-4 border border-ink-950 rounded-full flex items-center justify-center">
                <div className="w-1 h-1 bg-ink-950 rounded-full"></div>
              </div>
              <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">System Capabilities</span>
           </div>
           <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-medium text-ink-950 tracking-tight">
             <DecryptedText text="Core Functions" />
           </h2>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8">
            <div className="bg-neutral-100 p-1.5 rounded-full flex gap-1 overflow-x-auto max-w-full">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => setSelectedServiceId(service.id)}
                        className={`relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap z-10 ${
                            selectedServiceId === service.id 
                            ? 'text-neutral-900' 
                            : 'text-neutral-500 hover:text-neutral-700'
                        }`}
                    >
                        {selectedServiceId === service.id && (
                            <motion.div
                                layoutId="activeTab"
                                className="absolute inset-0 bg-white rounded-full shadow-sm z-[-1]"
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            />
                        )}
                        <span className="flex items-center gap-2">
                             {/* Small dot for active state */}
                             {selectedServiceId === service.id && <span className="w-1.5 h-1.5 bg-neutral-900 rounded-full"></span>}
                             {service.title}
                        </span>
                    </button>
                ))}
            </div>
        </div>

        {/* Main Content Area: Diagram + Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Left: Diagram (Spans 2 columns on large screens) */}
            <div className="lg:col-span-2">
                 <FadeIn key={selectedServiceId} duration={0.4}>
                    <ArchitectureDemo activeTab={selectedServiceId} />
                 </FadeIn>
            </div>

            {/* Right: Details Panel */}
            <div className="lg:col-span-1 bg-white/50 border border-ink-950/5 rounded-2xl p-8 min-h-[500px] flex flex-col justify-between">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedServiceId}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="mb-6">
                            <span className="font-mono text-xs text-ink-400 uppercase tracking-[0.2em] block mb-2">
                                Module {activeService.icon}
                            </span>
                            <h3 className="text-3xl font-serif font-medium text-ink-950 mb-4">
                                {activeService.title}
                            </h3>
                            <p className="text-ink-600 text-sm leading-relaxed font-sans font-light">
                                {activeService.fullDescription}
                            </p>
                        </div>

                        <div className="mb-6">
                            <h4 className="font-mono text-[10px] text-ink-400 uppercase tracking-[0.2em] mb-3">
                                Capabilities
                            </h4>
                            <ul className="space-y-2">
                                {activeService.features.slice(0, 4).map((feature, i) => (
                                    <li key={i} className="flex items-start gap-2 text-ink-950 text-xs">
                                        <Check size={12} className="mt-0.5 text-neutral-400" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <div className="flex flex-wrap gap-2 mb-8">
                             {activeService.techStack?.map((tech, i) => (
                                 <span key={i} className="px-2 py-1 bg-neutral-100 text-neutral-600 text-[10px] uppercase tracking-wider rounded">
                                     {tech}
                                 </span>
                             ))}
                        </div>

                    </motion.div>
                </AnimatePresence>

                <button 
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="w-full py-3 bg-ink-950 text-alabaster font-mono text-xs uppercase tracking-[0.2em] hover:bg-ink-800 transition-colors flex items-center justify-center gap-3 rounded-lg"
                >
                  Configure System
                  <ArrowRight size={14} />
                </button>
            </div>

        </div>
        
        {/* Footer Technical Marker */}
        <div className="mt-12 pt-6 border-t border-ink-950/10 flex justify-between items-center text-[10px] font-mono uppercase text-ink-300">
           <span>Interactive System View</span>
           <span>/// End Section</span>
        </div>

      </div>
    </section>
  );
};

export default Services;