import React from 'react';
import { motion } from 'framer-motion';

export function Background() {
  // Grid configuration
  const gridSpacing = 48; // 3rem = 48px
  const majorGridSpacing = 192; // 12rem = 192px

  // Animation delay for initial draw
  const drawDuration = 2; // seconds for initial draw to complete

  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* LAYER 1: Parallax Color Blobs (Bottom) */}

      {/* Gradient Blob 1: Stone/Warm Grey (Top Left) */}
      <div className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] z-0">
        <div className="w-full h-full bg-stone-200/60 blur-[120px] rounded-full animate-drift-slow mix-blend-multiply"></div>
      </div>

      {/* Gradient Blob 2: Slate/Cool Grey (Bottom Right) */}
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] z-0">
        <div className="w-full h-full bg-slate-200/60 blur-[120px] rounded-full animate-drift-medium mix-blend-multiply"></div>
      </div>

      {/* Gradient Blob 3: Very Faint Grey (Middle Accent) */}
      <div className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] z-0">
        <div className="w-full h-full bg-gray-100/60 blur-[100px] rounded-full animate-pulse mix-blend-multiply"></div>
      </div>

      {/* LAYER 2: Animated SVG Grid (Draws itself in, then breathes) */}
      <svg
        className="absolute inset-0 w-full h-full z-10"
        style={{
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      >
        {/* Minor Grid Lines - Horizontal */}
        {Array.from({ length: Math.ceil(2000 / gridSpacing) }).map((_, i) => (
          <motion.line
            key={`h-minor-${i}`}
            x1="0"
            y1={i * gridSpacing}
            x2="100%"
            y2={i * gridSpacing}
            stroke="rgba(10, 10, 10, 0.07)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0.04, 0.08, 0.04] // Draw in, then breathe
            }}
            transition={{
              pathLength: { duration: 1.5, delay: i * 0.02, ease: "easeOut" },
              opacity: {
                duration: 6,
                delay: drawDuration + (i % 5) * 0.5, // Stagger breathing
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.1, 0.5, 0.9, 1] // Quick draw, then slow breathe
              }
            }}
          />
        ))}

        {/* Minor Grid Lines - Vertical */}
        {Array.from({ length: Math.ceil(2000 / gridSpacing) }).map((_, i) => (
          <motion.line
            key={`v-minor-${i}`}
            x1={i * gridSpacing}
            y1="0"
            x2={i * gridSpacing}
            y2="100%"
            stroke="rgba(10, 10, 10, 0.07)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0.04, 0.08, 0.04]
            }}
            transition={{
              pathLength: { duration: 1.5, delay: 0.5 + i * 0.02, ease: "easeOut" },
              opacity: {
                duration: 8,
                delay: drawDuration + 0.5 + (i % 7) * 0.3,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.1, 0.5, 0.9, 1]
              }
            }}
          />
        ))}

        {/* Major Grid Lines - Horizontal */}
        {Array.from({ length: Math.ceil(2000 / majorGridSpacing) }).map((_, i) => (
          <motion.line
            key={`h-major-${i}`}
            x1="0"
            y1={i * majorGridSpacing}
            x2="100%"
            y2={i * majorGridSpacing}
            stroke="rgba(10, 10, 10, 0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0.08, 0.14, 0.08]
            }}
            transition={{
              pathLength: { duration: 2, delay: 1 + i * 0.1, ease: "easeOut" },
              opacity: {
                duration: 10,
                delay: drawDuration + 1 + i * 0.8,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.1, 0.5, 0.9, 1]
              }
            }}
          />
        ))}

        {/* Major Grid Lines - Vertical */}
        {Array.from({ length: Math.ceil(2000 / majorGridSpacing) }).map((_, i) => (
          <motion.line
            key={`v-major-${i}`}
            x1={i * majorGridSpacing}
            y1="0"
            x2={i * majorGridSpacing}
            y2="100%"
            stroke="rgba(10, 10, 10, 0.12)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: 1,
              opacity: [0, 1, 0.08, 0.14, 0.08]
            }}
            transition={{
              pathLength: { duration: 2, delay: 1.5 + i * 0.1, ease: "easeOut" },
              opacity: {
                duration: 12,
                delay: drawDuration + 1.5 + i * 0.6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                times: [0, 0.1, 0.5, 0.9, 1]
              }
            }}
          />
        ))}
      </svg>

      {/* LAYER 3: Paper Texture (Top - unifies everything) */}
      <div className="absolute inset-0 bg-paper opacity-[0.25] mix-blend-multiply z-20"></div>
    </div>
  );
}