import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { X, ArrowRight, AlertCircle, Loader2 } from 'lucide-react';
import { DecryptedText } from '../ui/DecryptedText';
import { CustomSelect } from './CustomSelect';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', email: '', system: 'Manual data entry between systems', impact: 'Save time', message: '' });
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

      navigate('/thank-you', {
        state: {
          name: formData.name,
          email: formData.email
        }
      });
    } catch {
      // eslint-disable-next-line no-console
      console.error('Contact form error');
      setStatus('error');
      setErrorMessage('Failed to send message. Please try again.');
    }
  };

  const closeModal = () => {
    setStatus('idle');
    setErrorMessage('');
  };

  // Handle Escape key to close modal
  useEffect(() => {
    if (status !== 'error') {
      return;
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status]);

  return (
    <section id="contact" className="relative border-t border-ink-950/10 bg-transparent backdrop-blur-sm">
      {/* Technical Cut - Section Label */}
      <div className="absolute top-6 w-full z-10 pointer-events-none">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
            <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
              SYS.08 /// CONTACT_RELAY
            </span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-7xl border-x border-ink-950/10">

        <div className="grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-ink-950/10">

          {/* Left: Heading */}
          <div className="p-6 md:p-12 lg:p-24 flex flex-col justify-between">
            <div>
              <span className="font-mono text-xs text-ink-500 tracking-[0.2em] uppercase">Initiate Protocol</span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-8xl font-serif font-medium mt-6 text-ink-950 tracking-tight">
                <DecryptedText text="Get In" /><br />
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
          <div className="relative">
            {/* Technical Frame around form */}
            <div className="absolute -inset-4 border border-dashed border-ink-950/10 pointer-events-none hidden md:block"></div>
            {/* Corner Ticks */}
            <div className="absolute -top-4 -left-4 w-4 h-4 border-t border-l border-ink-950/30 hidden md:block"></div>
            <div className="absolute -top-4 -right-4 w-4 h-4 border-t border-r border-ink-950/30 hidden md:block"></div>
            <div className="absolute -bottom-4 -left-4 w-4 h-4 border-b border-l border-ink-950/30 hidden md:block"></div>
            <div className="absolute -bottom-4 -right-4 w-4 h-4 border-b border-r border-ink-950/30 hidden md:block"></div>

            <form className="flex flex-col h-full bg-white/20 backdrop-blur-sm border border-ink-950/5" onSubmit={handleSubmit}>

              {/* Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink-950/5 border-b border-ink-950/5">
                <div className="p-8 group focus-within:bg-white/40 transition-colors">
                  <label htmlFor="name" className="inline-block bg-ink-950 text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest mb-2">/// IDENTITY_NAME</label>
                  <div className="text-ink-600 font-sans text-sm mb-3">Your Name</div>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter your name"
                    className="w-full bg-transparent border-b border-dashed border-ink-950/20 py-2 text-ink-950 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-ink-300 font-mono text-xs"
                  />
                </div>
                <div className="p-8 group focus-within:bg-white/40 transition-colors">
                  <label htmlFor="email" className="inline-block bg-ink-950 text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest mb-2">/// CONTACT_RELAY</label>
                  <div className="text-ink-600 font-sans text-sm mb-3">Email Address</div>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="Enter your email"
                    className="w-full bg-transparent border-b border-dashed border-ink-950/20 py-2 text-ink-950 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-ink-300 font-mono text-xs"
                  />
                </div>
              </div>

              {/* Row 2: Selectors */}
              <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-ink-950/5 border-b border-ink-950/5">
                <CustomSelect
                  id="system"
                  label="/// TARGET_SYSTEM"
                  sublabel="Which best describes your biggest challenge?"
                  value={formData.system}
                  onChange={(val) => setFormData({ ...formData, system: val })}
                  options={[
                    "Manual data entry between systems",
                    "Email and document overload",
                    "Approval bottlenecks and delays",
                    "Scaling operations without more staff",
                    "Other"
                  ]}
                />

                <CustomSelect
                  id="impact"
                  label="/// DESIRED_IMPACT"
                  sublabel="Expected outcome?"
                  value={formData.impact}
                  onChange={(val) => setFormData({ ...formData, impact: val })}
                  options={[
                    "Save time",
                    "Reduce costs",
                    "Increase revenue",
                    "Quality & errors"
                  ]}
                />
              </div>

              {/* Row 3: Message */}
              <div className="p-8 flex-1 border-b border-ink-950/5 min-h-[160px] group focus-within:bg-white/40 transition-colors flex flex-col">
                <label htmlFor="message" className="inline-block bg-ink-950 text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest mb-2 w-fit">/// ADDITIONAL_CONTEXT</label>
                <div className="text-ink-600 font-sans text-sm mb-3">Tell us more about your challenge...</div>
                <textarea
                  id="message"
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Describe your current process, pain points, and goals..."
                  className="w-full flex-1 bg-transparent resize-none text-ink-950 focus:outline-none placeholder:text-ink-300 font-mono text-xs leading-relaxed border-l-2 border-transparent focus:border-orange-500 pl-0 focus:pl-4 transition-all duration-300"
                ></textarea>
              </div>

              {/* Submit Button Area */}
              <button
                type="submit"
                disabled={status === 'loading'}
                className="group w-full p-6 text-left hover:bg-ink-950 transition-colors flex justify-between items-center disabled:opacity-50 disabled:cursor-not-allowed border-t border-ink-950/5"
              >
                <div className="flex flex-col">
                  <span className="font-mono text-xs uppercase tracking-[0.2em] text-ink-950 group-hover:text-alabaster transition-colors">
                    {status === 'loading' ? 'Transmitting...' : 'Initiate Sequence'}
                  </span>
                  <span className="text-[9px] font-mono text-ink-400 group-hover:text-ink-500 mt-1">
                    SECURE_CHANNEL_READY
                  </span>
                </div>
                {status === 'loading' ? (
                  <Loader2 className="text-orange-600 animate-spin" size={20} />
                ) : (
                  <ArrowRight className="text-orange-600 group-hover:translate-x-1 transition-transform" size={20} />
                )}
              </button>
            </form>
          </div>

        </div>

      </div>


      {/* Error Modal */}
      {status === 'error' && createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink-950/40 backdrop-blur-sm" onClick={closeModal}></div>
          <div className="relative bg-alabaster shadow-2xl border border-red-500 p-12 max-w-md w-full animate-[fadeIn_0.3s_ease-out]">
            <button
              onClick={closeModal}
              aria-label="Close error modal"
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
                className="mt-8 px-8 py-3 bg-ink-950 text-white font-mono uppercase tracking-widest text-xs hover:bg-ink-800 transition-colors"
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
}