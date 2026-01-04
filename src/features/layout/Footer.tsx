import React from 'react';

export function Footer() {
  return (
    <footer className="bg-alabaster-dark py-12 border-t border-ink-950/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-ink-400 uppercase tracking-widest gap-4">
        <p>&copy; {new Date().getFullYear()} EsperaStudio. All systems operational.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-ink-950 transition-colors">X / Twitter</a>
          <span className="text-xl font-bold tracking-tighter">EsperaStudio</span>
          <a href="mailto:hello@esperastudio.agency" className="hover:text-ink-950 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
}