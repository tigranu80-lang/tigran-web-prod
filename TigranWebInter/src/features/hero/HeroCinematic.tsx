import React, { useEffect, useRef } from 'react';
import { ArrowDown, ShieldCheck, Zap } from 'lucide-react';

const HeroCinematic: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const scrollToContent = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Matrix Rain Animation (Dense, Slow, Long Trails, Rising)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Configuration
    const fontSize = 24; // Smaller font = denser grid
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops scattered
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const characters = "01";
    let lastTime = 0;
    const fps = 24;
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;

      lastTime = currentTime - (deltaTime % interval);

      // Fade effect (Alabaster color)
      // Low opacity (0.1) creates VERY LONG trails
      ctx.fillStyle = 'rgba(245, 245, 240, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Text Color (Subtle Grey)
      ctx.fillStyle = '#A1A1AA'; // Zinc-400
      ctx.font = `500 ${fontSize}px 'JetBrains Mono'`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));

        // Drawing text
        ctx.fillText(text, i * fontSize, drops[i]);

        // Move drop UP (Decrease Y) - Very Slow
        drops[i] -= fontSize * 0.4;

        // Reset to bottom if it goes off screen
        if (drops[i] < -50 && Math.random() > 0.99) {
          drops[i] = canvas.height + 50;
        }
      }
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-alabaster flex flex-col items-center justify-center perspective-1000">

      {/* LAYER 0: Background Canvas (Matrix) */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40 pointer-events-none" />

      {/* LAYER 1: Main Typography (Background Layer) */}
      <div className="absolute top-[15%] w-full text-center z-10 pointer-events-none">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-sans font-medium text-ink-950 tracking-tighter leading-none">
          Silent.<span className="text-ink-400">Invisible.</span><br />
          Infinite.
        </h1>
        <p className="mt-6 text-ink-400 font-mono text-sm uppercase tracking-widest max-w-lg mx-auto">
          The manual era is over. Welcome to the age of the autonomous enterprise.
        </p>
      </div>

      {/* LAYER 2: The Liquid Glass Orb (Center) */}
      <div className="relative z-20 mt-32 md:mt-16 w-64 h-64 md:w-96 md:h-96 group cursor-pointer">

        {/* The Blob Container */}
        <div className="absolute inset-0 flex items-center justify-center">

          {/* LIQUID GLASS ORB */}
          {/* We use border-radius animation 'animate-blob' defined in index.html */}
          {/* Hover: Scale up and speed up animation via CSS or just visual intensity */}
          <div className="relative w-48 h-48 md:w-64 md:h-64 transition-all duration-700 ease-out group-hover:scale-110">

            {/* The Glass Material */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/80 to-transparent backdrop-blur-md border border-white/40 shadow-[inset_10px_10px_20px_rgba(255,255,255,0.8),inset_-10px_-10px_20px_rgba(0,0,0,0.1),0_20px_50px_rgba(0,0,0,0.1)] animate-blob group-hover:shadow-[inset_10px_10px_30px_rgba(255,255,255,0.9),inset_-10px_-10px_30px_rgba(0,0,0,0.2),0_20px_60px_rgba(0,0,0,0.2),0_0_30px_rgba(255,255,255,0.8)]"></div>

            {/* Internal 'Core' Reflection/Refraction */}
            <div className="absolute inset-4 bg-gradient-to-tl from-white/90 to-transparent opacity-50 animate-blob" style={{ animationDelay: '-2s' }}></div>

            {/* Reaction Effect: Sparkle/Highlight on Hover */}
            <div className="absolute top-1/4 left-1/4 w-8 h-8 bg-white rounded-full blur-sm opacity-60 group-hover:opacity-100 group-hover:scale-150 transition-all duration-500"></div>

          </div>

          {/* Shadow underneath */}
          <div className="absolute -bottom-12 w-32 h-4 bg-ink-950/20 blur-xl rounded-full group-hover:w-40 transition-all duration-700"></div>
        </div>

        {/* Floating Labels (Ivory Clinic Style) - Positioned relative to the Orb container */}

        {/* Label 1: Top Right */}
        <div className="absolute top-0 -right-4 md:-right-24 flex flex-col items-start opacity-0 animate-[fadeIn_1s_ease-out_1s_forwards] group-hover:translate-x-2 transition-transform duration-500">
          <div className="flex items-center gap-2">
            <div className="w-12 h-[1px] bg-ink-950"></div>
            <ShieldCheck size={16} className="text-ink-950" />
          </div>
          <p className="ml-14 font-sans text-xl text-ink-950">0% Error</p>
          <p className="ml-14 font-mono text-xs text-ink-400">Precision Logic</p>
        </div>

        {/* Label 2: Bottom Left */}
        <div className="absolute bottom-10 -left-4 md:-left-24 flex flex-col items-end opacity-0 animate-[fadeIn_1s_ease-out_1.5s_forwards] group-hover:-translate-x-2 transition-transform duration-500">
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-ink-950" />
            <div className="w-12 h-[1px] bg-ink-950"></div>
          </div>
          <p className="mr-14 font-sans text-xl text-ink-950 text-right">Instant</p>
          <p className="mr-14 font-mono text-xs text-ink-400 text-right">Real-time Scale</p>
        </div>

        {/* Label 3: Middle Right (Hidden on mobile) */}
        <div className="hidden md:flex absolute top-1/2 -right-40 flex-col items-start opacity-0 animate-[fadeIn_1s_ease-out_2s_forwards] group-hover:translate-x-2 transition-transform duration-500">
          <div className="flex items-center gap-2">
            <div className="w-24 h-[1px] bg-ink-950/50 -rotate-12 transform origin-left"></div>
            <div className="w-2 h-2 rounded-full bg-ink-950"></div>
          </div>
          <p className="ml-24 font-sans text-lg text-ink-950">24/7 Uptime</p>
        </div>

      </div>

      {/* LAYER 3: CTA */}
      <div className="absolute bottom-12 z-30">
        <button
          onClick={scrollToContent}
          className="group relative px-8 py-4 bg-ink-950 text-alabaster font-mono uppercase tracking-widest text-xs hover:bg-ink-800 transition-all overflow-hidden"
        >
          <span className="relative z-10 flex items-center gap-2">
            Configure System <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </span>
        </button>
      </div>

    </section>
  );
};

export default HeroCinematic;