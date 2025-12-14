import React from 'react';

const Header: React.FC = () => {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
          <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-neutral-900 font-bold font-sans">
            A
          </div>
          <span className="font-sans font-bold text-white tracking-tight text-xl hidden sm:inline">AutoMate</span>
          <span className="font-sans font-bold text-white tracking-tight text-xl sm:hidden">AM</span>
        </div>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {['About', 'Services', 'Pricing', 'Contact'].map((item) => (
            <button
              key={item}
              onClick={() => scrollToSection(item.toLowerCase())}
              className="text-sm font-medium text-neutral-400 hover:text-white transition-colors"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <button
          onClick={() => scrollToSection('contact')}
          className="px-5 py-2.5 bg-white text-neutral-900 rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
        >
          Get Started
        </button>

      </div>
    </header>
  );
};

export default Header;