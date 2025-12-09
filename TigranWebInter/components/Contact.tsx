import React, { useState } from 'react';
import { Send, X, CheckCircle, ArrowRight } from 'lucide-react';
import DecryptedText from './DecryptedText';

const Contact: React.FC = () => {
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setShowSuccessModal(true);
    }, 500);
  };

  return (
    <section id="contact" className="border-t border-ink-950/10 bg-white/30 backdrop-blur-sm relative">
      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-ink-950/10">
          
          {/* Left: Heading */}
          <div className="p-6 md:p-12 lg:p-24 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">Initiate Protocol</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-medium mt-6 text-ink-950 tracking-tight">
                <DecryptedText text="Get In" /><br/>
                <DecryptedText text="Touch." />
              </h2>
            </div>
            <div className="mt-12 lg:mt-0">
               <p className="text-lg text-ink-500 font-sans font-light max-w-sm mb-8">
                 Ready to replace manual labor with intelligent systems? Send us a signal.
               </p>
               <div className="flex items-center gap-4 text-ink-950">
                 <div className="h-[1px] w-12 bg-ink-950"></div>
                 <span className="font-mono text-xs uppercase tracking-widest">Awaiting Input</span>
               </div>
            </div>
          </div>

          {/* Right: The "Form" Grid */}
          <div className="bg-white/40">
            <form className="flex flex-col h-full" onSubmit={handleSubmit}>
              
              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink-950/10 border-b border-ink-950/10">
                <div className="p-8">
                  <label htmlFor="name" className="block text-[10px] font-mono uppercase text-ink-400 font-bold tracking-[0.1em] mb-4">Identity / Name</label>
                  <input 
                    type="text" 
                    id="name"
                    required
                    placeholder="ENTER NAME"
                    className="w-full bg-transparent border-b border-ink-950/20 py-2 text-ink-950 focus:outline-none focus:border-ink-950 transition-colors placeholder:text-ink-200 font-mono text-sm"
                  />
                </div>
                <div className="p-8">
                  <label htmlFor="email" className="block text-[10px] font-mono uppercase text-ink-400 font-bold tracking-[0.1em] mb-4">Contact / Email</label>
                  <input 
                    type="email" 
                    id="email"
                    required
                    placeholder="ENTER EMAIL"
                    className="w-full bg-transparent border-b border-ink-950/20 py-2 text-ink-950 focus:outline-none focus:border-ink-950 transition-colors placeholder:text-ink-200 font-mono text-sm"
                  />
                </div>
              </div>

              {/* Row 2: Message */}
              <div className="p-8 flex-1 border-b border-ink-950/10 min-h-[200px]">
                <label htmlFor="message" className="block text-[10px] font-mono uppercase text-ink-400 font-bold tracking-[0.1em] mb-4">Parameters / Details</label>
                <textarea 
                  id="message"
                  required
                  placeholder="DESCRIBE YOUR MANUAL PROCESSES..."
                  className="w-full h-full bg-transparent resize-none text-ink-950 focus:outline-none placeholder:text-ink-200 font-mono text-sm leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button Area */}
              <button type="submit" className="group w-full p-8 text-left hover:bg-ink-950 transition-colors flex justify-between items-center">
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-950 group-hover:text-alabaster transition-colors">Transmit Signal</span>
                <ArrowRight className="text-ink-950 group-hover:text-alabaster transition-colors" size={20} />
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Success Modal - styled cleanly */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/20 backdrop-blur-sm" onClick={() => setShowSuccessModal(false)}></div>
          <div className="relative bg-alabaster shadow-2xl border border-ink-950 p-12 max-w-md w-full animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={() => setShowSuccessModal(false)}
              className="absolute top-4 right-4 text-ink-400 hover:text-ink-950 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border border-ink-950 rounded-full flex items-center justify-center text-ink-950 mb-6">
                <CheckCircle size={24} strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-serif font-medium text-ink-950 mb-2">Signal Received</h3>
              <p className="text-ink-500 font-mono text-xs uppercase tracking-wide leading-relaxed">
                Transmission logged. Our agents will process your request shortly.
              </p>
              <button 
                onClick={() => setShowSuccessModal(false)}
                className="mt-8 px-8 py-3 bg-ink-950 text-white font-mono uppercase tracking-widest text-[10px] hover:bg-ink-800 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Contact;