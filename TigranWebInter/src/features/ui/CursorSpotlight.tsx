import React, { useEffect, useRef } from 'react';

const CursorSpotlight: React.FC = () => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (divRef.current) {
        divRef.current.style.setProperty('--x', `${e.clientX}px`);
        divRef.current.style.setProperty('--y', `${e.clientY}px`);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      ref={divRef}
      className="pointer-events-none fixed inset-0 z-50 transition-opacity duration-300 mix-blend-multiply"
      style={{
        background: `radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgba(147, 51, 234, 0.08), transparent 40%)` // Purple tint
      }}
    />
  );
};

export default CursorSpotlight;