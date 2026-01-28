import { useState } from "react";
import { Menu, X } from "lucide-react";

/**
 * Header - Main navigation header
 * PERFORMANCE: Uses pure CSS transitions instead of framer-motion
 * This removes ~50KB from the critical bundle path
 */
export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  const navItems = [
    { name: "Protocol", id: "protocol" },
    { name: "Core Functions", id: "core-functions" },
    { name: "Use Cases", id: "use-cases" },

    { name: "About", id: "about" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-ink-950/90 backdrop-blur-md border-b border-white/10">
      {/* Skip to main content - Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-white focus:text-ink-950 focus:font-mono focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>
      <div className="container mx-auto px-4 md:px-6 h-16 lg:h-20 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => window.scrollTo(0, 0)}
        >
          <div className="w-8 h-8 bg-white flex items-center justify-center text-neutral-900 font-bold font-sans">
            E
          </div>
          <span className="font-sans font-bold text-white tracking-tight text-xl hidden sm:inline">
            EsperaStudio
          </span>
          <span className="font-sans font-bold text-white tracking-tight text-xl sm:hidden">
            ES
          </span>
        </div>

        {/* Center Navigation - Desktop only (lg+) */}
        <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right Side */}
        <div className="flex items-center gap-4">
          {/* CTA Button - Desktop only */}
          <button
            onClick={() => scrollToSection("contact")}
            className="hidden lg:block px-6 py-3 bg-white text-neutral-900 text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors"
          >
            Get Started
          </button>

          {/* Burger Menu - Mobile & Tablet */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 text-white hover:text-neutral-300 transition-colors"
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown - Pure CSS Transitions (no framer-motion) */}
      <div
        className={`lg:hidden bg-ink-950 border-t border-white/10 overflow-hidden transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${isMenuOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
          }`}
      >
        <div className="container mx-auto px-4 py-6">
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.id)}
                className="text-left text-sm font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors py-2"
              >
                {item.name}
              </button>
            ))}
            <button
              onClick={() => scrollToSection("contact")}
              className="mt-4 w-full px-6 py-4 bg-white text-neutral-900 text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors"
            >
              Get Started
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
}