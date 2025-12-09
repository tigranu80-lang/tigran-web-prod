import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-alabaster/80 backdrop-blur-md border-b border-ink-950/5">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0,0)}>
          <div className="w-8 h-8 bg-ink-950 rounded-lg flex items-center justify-center text-white font-bold font-display">
            A
          </div>
          <span className="font-display font-bold text-ink-950 tracking-tight text-xl">AutoMate</span>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Pricing', 'Contact'].map((item) => (
            <button 
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium text-ink-400 hover:text-ink-950 transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <button 
          onClick={() => scrollToSection('contact')}
          className="px-5 py-2.5 bg-ink-950 text-white rounded-full text-sm font-medium hover:bg-ink-800 transition-colors"
        >
          Get Started
        </button>

      </div>
    </header>
  );
};

export default Header;