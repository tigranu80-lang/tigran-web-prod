import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-alabaster-dark py-12 border-t border-ink-950/10">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-xs font-mono text-ink-400 uppercase tracking-widest gap-4">
        <p>© 2025 AutoMate.</p>
        <div className="flex gap-8">
          <a href="#" className="hover:text-ink-950 transition-colors">X / Twitter</a>
          <a href="#" className="hover:text-ink-950 transition-colors">LinkedIn</a>
          <a href="mailto:hello@automate.agency" className="hover:text-ink-950 transition-colors">Email</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;