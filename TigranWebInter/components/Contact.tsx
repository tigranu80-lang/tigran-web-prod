import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, CheckCircle, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import DecryptedText from './DecryptedText';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to send message');
      }

      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('Contact form error:', error);
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  const closeModal = () => {
    setStatus('idle');
    setErrorMessage('');
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
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="DESCRIBE YOUR MANUAL PROCESSES..."
                  className="w-full h-full bg-transparent resize-none text-ink-950 focus:outline-none placeholder:text-ink-200 font-mono text-sm leading-relaxed"
                ></textarea>
              </div>

              {/* Submit Button Area */}
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="group w-full p-8 text-left hover:bg-ink-950 transition-colors flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-950 group-hover:text-alabaster transition-colors">
                  {status === 'loading' ? 'Transmitting...' : 'Transmit Signal'}
                </span>
                {status === 'loading' ? (
                  <Loader2 className="text-ink-950 group-hover:text-alabaster transition-colors animate-spin" size={20} />
                ) : (
                  <ArrowRight className="text-ink-950 group-hover:text-alabaster transition-colors" size={20} />
                )}
              </button>
            </form>
          </div>

        </div>

      </div>

      {/* Success Modal */}
      {status === 'success' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-alabaster shadow-2xl border border-ink-950 p-12 max-w-md w-full animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={closeModal}
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
                onClick={closeModal}
                className="mt-8 px-8 py-3 bg-ink-950 text-white font-mono uppercase tracking-widest text-[10px] hover:bg-ink-800 transition-colors"
              >
                Acknowledge
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Error Modal */}
      {status === 'error' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-alabaster shadow-2xl border border-red-500 p-12 max-w-md w-full animate-[fadeIn_0.3s_ease-out]">
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 text-ink-400 hover:text-ink-950 transition-colors"
            >
              <X size={20} />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 border border-red-500 rounded-full flex items-center justify-center text-red-500 mb-6">
                <AlertCircle size={24} strokeWidth={1} />
              </div>
              <h3 className="text-3xl font-serif font-medium text-ink-950 mb-2">Transmission Failed</h3>
              <p className="text-ink-500 font-mono text-xs uppercase tracking-wide leading-relaxed">
                {errorMessage || 'An error occurred. Please try again.'}
              </p>
              <button 
                onClick={closeModal}
                className="mt-8 px-8 py-3 bg-ink-950 text-white font-mono uppercase tracking-widest text-[10px] hover:bg-ink-800 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
};

export default Contact;