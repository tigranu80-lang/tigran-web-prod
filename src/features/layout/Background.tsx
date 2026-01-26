import { useState, useEffect } from 'react';

/**
 * Background - Decorative background with animated blobs
 * PERFORMANCE: Detects low-end devices and disables expensive blur effects
 * blur-[100px] + mix-blend-multiply is CATASTROPHIC on mobile GPUs
 */
export function Background() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(motionQuery.matches);

    // Detect low-end device:
    // - 4 or fewer CPU cores (budget phones, old laptops)
    // - OR mobile device (blur is expensive on mobile GPUs)
    const cores = navigator.hardwareConcurrency ?? 8;
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const isLowEndDevice = cores <= 4 || isMobile;
    
    setIsLowEnd(isLowEndDevice);
  }, []);

  // LOW-END FALLBACK: Simple solid background, no blurs
  if (isLowEnd || prefersReducedMotion) {
    return (
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none bg-alabaster">
        {/* LAYER 2: Static CSS Grid only - no blurs */}
        <div
          className="absolute inset-0 z-10 opacity-[0.06]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(10, 10, 10, 0.5) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 10, 10, 0.5) 1px, transparent 1px),
              linear-gradient(rgba(10, 10, 10, 1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(10, 10, 10, 1) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px, 48px 48px, 192px 192px, 192px 192px',
            maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
          }}
        />
      </div>
    );
  }

  // FULL EXPERIENCE: Animated blobs with blur (desktop only)
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">

      {/* LAYER 1: Parallax Color Blobs (Bottom) - GPU accelerated */}

      {/* Gradient Blob 1: Stone/Warm Grey (Top Left) */}
      <div
        className="absolute top-[-10%] left-[-5%] w-[60vw] h-[60vw] z-0"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className="w-full h-full bg-stone-200/60 blur-[100px] rounded-full mix-blend-multiply animate-drift-slow"></div>
      </div>

      {/* Gradient Blob 2: Slate/Cool Grey (Bottom Right) */}
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] z-0"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className="w-full h-full bg-slate-200/60 blur-[100px] rounded-full mix-blend-multiply animate-drift-medium"></div>
      </div>

      {/* Gradient Blob 3: Very Faint Grey (Middle Accent) */}
      <div
        className="absolute top-[40%] right-[20%] w-[40vw] h-[40vw] z-0"
        style={{ willChange: 'transform', transform: 'translateZ(0)' }}
      >
        <div className="w-full h-full bg-gray-100/60 blur-[80px] rounded-full mix-blend-multiply animate-pulse"></div>
      </div>

      {/* LAYER 2: Static CSS Grid (GPU-accelerated, no JS) */}
      <div
        className="absolute inset-0 z-10 opacity-[0.06] animate-grid-fade"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 10, 10, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 10, 10, 0.5) 1px, transparent 1px),
            linear-gradient(rgba(10, 10, 10, 1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(10, 10, 10, 1) 1px, transparent 1px)
          `,
          backgroundSize: '48px 48px, 48px 48px, 192px 192px, 192px 192px',
          maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
        }}
      />

      {/* LAYER 3: Paper Texture (Top - unifies everything) */}
      <div className="absolute inset-0 bg-paper opacity-[0.25] mix-blend-multiply z-20"></div>
    </div>
  );
}
