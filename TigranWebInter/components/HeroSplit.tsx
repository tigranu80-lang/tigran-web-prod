import React, { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';

const HeroSplit: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const scrollToContent = () => {
    document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Generate chaotic data for left side "Data Wall"
  const [dataLines] = useState(() => {
    return Array.from({ length: 100 }, () => 
      Array.from({ length: 8 }, () => Math.random().toString(36).substring(2, 7)).join(' ')
    );
  });

  // Large Slow Matrix Rain Animation (Bottom to Top)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth / 2; // Only takes up half screen effectively
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Configuration
    const fontSize = 32; // Massive digits
    const columns = Math.ceil(canvas.width / fontSize);
    const drops: number[] = [];
    
    // Initialize drops scattered vertically
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const characters = "01";
    let lastTime = 0;
    const fps = 20; // Lower frame rate for "slower" feel
    const interval = 1000 / fps;

    const draw = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(draw);

      const deltaTime = currentTime - lastTime;
      if (deltaTime < interval) return;

      lastTime = currentTime - (deltaTime % interval);

      // Fade effect (Alabaster color with low opacity for trails)
      ctx.fillStyle = 'rgba(245, 245, 240, 0.2)'; 
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#0A0A0A'; // Deep Ink Black
      ctx.font = `bold ${fontSize}px 'JetBrains Mono'`;

      for (let i = 0; i < drops.length; i++) {
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Drawing text
        ctx.fillText(text, i * fontSize, drops[i]);

        // Move drop UP (Decrease Y)
        drops[i] -= fontSize;

        // Reset to bottom if it goes off screen (with randomness)
        if (drops[i] < -50 && Math.random() > 0.95) {
          drops[i] = canvas.height;
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
    <section className="relative h-screen w-full overflow-hidden bg-alabaster flex">
      
      {/* LEFT SIDE: The Prison of Manual Data (Static, Chaotic, Dense) */}
      <div className="w-1/2 h-full relative overflow-hidden border-r-2 border-ink-950 bg-alabaster flex items-center justify-center">
        {/* The Wall of Text Background */}
        <div className="absolute inset-0 opacity-10 select-none overflow-hidden leading-none text-xs font-mono text-ink-950 break-all whitespace-pre-wrap">
            {dataLines.join('\n')}
        </div>
        
        {/* Overlay Content */}
        <div className="relative z-10 p-12 text-right w-full flex flex-col items-end">
           <h2 className="text-[12vw] leading-[0.8] font-display font-bold text-ink-950/20 mix-blend-multiply tracking-tighter select-none">
             MAN<br/>UAL
           </h2>
           <div className="mt-8 font-mono text-sm uppercase tracking-widest text-ink-950 bg-alabaster px-2 py-1 border border-ink-950">
             Legacy Protocol
           </div>
        </div>
      </div>

      {/* RIGHT SIDE: The Flow of Automation (Animated, Clean, Massive) */}
      <div onClick={scrollToContent} className="w-1/2 h-full relative overflow-hidden bg-alabaster cursor-pointer group flex items-center justify-center">
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-80 pointer-events-none" />
        
        <div className="relative z-10 p-12 text-left w-full flex flex-col items-start">
           <h2 className="text-[12vw] leading-[0.8] font-display font-bold text-ink-950 mix-blend-darken tracking-tighter select-none group-hover:scale-105 transition-transform duration-700">
             AUTO<br/>MATE
           </h2>
           <div className="mt-8 flex items-center gap-4">
              <div className="font-mono text-sm uppercase tracking-widest text-alabaster bg-ink-950 px-4 py-2 hover:bg-ink-800 transition-colors">
                Initialize
              </div>
              <ArrowDown className="animate-bounce text-ink-950" />
           </div>
        </div>
      </div>

      {/* CENTER: The Monolith (Founders) */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
        <div className="relative w-32 md:w-56 h-[60vh] bg-ink-950 border-4 border-alabaster shadow-2xl overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=1000&auto=format&fit=crop" 
            alt="Founders" 
            className="w-full h-full object-cover grayscale contrast-125 hover:scale-110 transition-transform duration-1000"
          />
          {/* Stylized Glitch Overlays */}
          <div className="absolute top-0 left-0 w-full h-1 bg-alabaster/50"></div>
          <div className="absolute bottom-10 left-0 w-full h-[1px] bg-alabaster/30"></div>
          
          <div className="absolute bottom-0 left-0 w-full bg-alabaster p-4 text-center">
             <p className="font-mono text-[10px] md:text-xs font-bold uppercase tracking-widest text-ink-950">
               Choose Your Future
             </p>
          </div>
        </div>
      </div>

    </section>
  );
};

export default HeroSplit;