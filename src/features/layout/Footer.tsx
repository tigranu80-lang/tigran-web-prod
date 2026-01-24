import { Linkedin, Mail, ArrowUpRight } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-20 bg-ink-950 text-white py-16 border-t border-ink-800">
      <div className="container mx-auto px-6 max-w-7xl">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 mb-12">

          {/* Brand Column */}
          <div className="space-y-4">
            <div className="font-serif text-2xl font-medium tracking-tight text-white">
              EsperaStudio
            </div>
            <p className="text-ink-400 text-sm font-sans leading-relaxed max-w-xs">
              Better than yesterday.
            </p>
          </div>

          {/* Navigation Column */}
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-ink-500 uppercase tracking-widest">/// Navigation</span>
            <div className="flex flex-col gap-2">
              <a href="#services" className="text-ink-300 hover:text-white transition-colors text-sm font-mono uppercase tracking-wider">Services</a>
              <a href="#pricing" className="text-ink-300 hover:text-white transition-colors text-sm font-mono uppercase tracking-wider">Pricing</a>
              <a href="#contact" className="text-ink-300 hover:text-white transition-colors text-sm font-mono uppercase tracking-wider">Contact</a>
            </div>
          </div>

          {/* Connect Column */}
          <div className="space-y-4">
            <span className="font-mono text-[10px] text-ink-500 uppercase tracking-widest">/// Connect</span>
            <div className="flex flex-col gap-3">
              <a
                href="https://www.linkedin.com/company/espera-studio/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-ink-300 hover:text-white transition-colors text-sm font-mono uppercase tracking-wider group"
              >
                <Linkedin size={16} strokeWidth={1.5} />
                <span>LinkedIn</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="mailto:helllo@esperastudio.com"
                className="flex items-center gap-2 text-ink-300 hover:text-white transition-colors text-sm font-mono uppercase tracking-wider group"
              >
                <Mail size={16} strokeWidth={1.5} />
                <span>helllo@esperastudio.com</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-ink-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-ink-500 text-xs font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} EsperaStudio. All systems operational.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-ink-500 text-xs font-mono uppercase tracking-widest">Status: Online</span>
          </div>
        </div>

      </div>
    </footer>
  );
}