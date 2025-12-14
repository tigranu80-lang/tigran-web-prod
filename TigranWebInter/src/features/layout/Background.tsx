import React, { useEffect, useState } from 'react';

const Background: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
       
       {/* LAYER 1: Parallax Color Blobs (Bottom) */}
       
       {/* Gradient Blob 1: Stone/Warm Grey (Top Left) */}
       <div 
         className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] z-0 will-change-transform transition-transform duration-75 ease-out"
         style={{ transform: `translateY(${scrollY * 0.2}px)` }}
       >
          <div className="w-full h-full bg-stone-200/60 blur-[120px] rounded-full animate-drift-slow mix-blend-multiply"></div>
       </div>
       
       {/* Gradient Blob 2: Slate/Cool Grey (Bottom Right) */}
       <div 
         className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] z-0 will-change-transform transition-transform duration-75 ease-out"
         style={{ transform: `translateY(${scrollY * -0.15}px)` }}
       >
          <div className="w-full h-full bg-slate-200/60 blur-[120px] rounded-full animate-drift-medium mix-blend-multiply"></div>
       </div>

       {/* Gradient Blob 3: Very Faint Grey (Middle Accent) */}
       <div 
         className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] z-0 will-change-transform transition-transform duration-75 ease-out"
         style={{ transform: `translateY(${scrollY * 0.1}px)` }}
       >
          <div className="w-full h-full bg-gray-100/60 blur-[100px] rounded-full animate-pulse mix-blend-multiply"></div>
       </div>

       {/* LAYER 2: Architectural Grid Overlays (Middle - sits ON TOP of color blobs) */}
       <div className="absolute inset-0 bg-grid z-10 opacity-70"></div>
       <div className="absolute inset-0 bg-grid-major z-10 opacity-60"></div>

       {/* LAYER 3: Paper Texture (Top - unifies everything) */}
       <div className="absolute inset-0 bg-paper opacity-[0.25] mix-blend-multiply z-20"></div>
    </div>
  );
};

export default Background;