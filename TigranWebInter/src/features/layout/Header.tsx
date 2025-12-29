import React from "react";

export function Header() {
  const scrollToSection = (id: string) => {
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10">
      <div className="container mx-auto px-4 md:px-6 h-20 flex items-center justify-between">
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

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {[
            { name: "Protocol", id: "build" },
            { name: "Core Functions", id: "core-functions" },
            { name: "Use Cases", id: "use-cases" },
            { name: "Blueprints", id: "services" },
            { name: "About", id: "about" },
            { name: "Contact", id: "contact" },
          ].map((item) => (
            <button
              key={item.name}
              onClick={() => scrollToSection(item.id)}
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white transition-colors"
            >
              {item.name}
            </button>
          ))}
        </nav>

        {/* Right CTA */}
        <button
          onClick={() => scrollToSection("contact")}
          className="px-6 py-3 bg-white text-neutral-900 text-xs font-mono uppercase tracking-widest hover:bg-neutral-200 transition-colors"
        >
          Get Started
        </button>
      </div>
    </header>
  );
}