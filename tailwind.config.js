/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Cormorant Garamond', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Brand tokens (use CSS variables for dynamic theming)
        'brand-bg': 'var(--color-brand-bg, #F5F5F0)',
        'brand-text': 'var(--color-brand-text, #0A0A0A)',
        'brand-accent': 'var(--color-accent-orange, #ea580c)',
        // Legacy tokens (kept for backward compatibility)
        'alabaster': '#F5F5F0',
        'alabaster-dark': '#EBEBE6',
        'ink-950': '#0A0A0A',
        'ink-800': '#171717',
        'ink-600': '#525252',
        'ink-500': '#737373',
        'ink-400': '#a3a3a3',
        'ink-300': '#d4d4d4',
        'ink-200': '#e5e5e5',
      },
      backgroundImage: {
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.4'/%3E%3C/svg%3E\")",
        'paper': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 500 500' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='paperFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23paperFilter)' opacity='1'/%3E%3C/svg%3E\")",
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 3s infinite',
        'drift-slow': 'drift 15s ease-in-out infinite alternate',
        'drift-medium': 'drift 10s ease-in-out infinite alternate-reverse',
        'spin-slow': 'spin 20s linear infinite',
        'blob': 'blob 7s infinite',
      },
      keyframes: {
        // GPU-accelerated float - translateZ(0) forces compositor layer
        float: {
          "0%": { transform: "translateY(0px) translateZ(0)" },
          "50%": { transform: "translateY(-20px) translateZ(0)" },
          "100%": { transform: "translateY(0px) translateZ(0)" }
        },
        // GPU-accelerated drift
        drift: {
          "0%": { transform: "translate(0, 0) translateZ(0)" },
          "100%": { transform: "translate(30px, 40px) translateZ(0)" }
        },
        // GPU-accelerated blob
        blob: {
          "0%": { transform: "translate(0px, 0px) scale(1) translateZ(0)" },
          "33%": { transform: "translate(30px, -50px) scale(1.1) translateZ(0)" },
          "66%": { transform: "translate(-20px, 20px) scale(0.9) translateZ(0)" },
          "100%": { transform: "translate(0px, 0px) scale(1) translateZ(0)" }
        },
        converge: {
          "0%": { opacity: "0", transform: "translate(0, 0) translateZ(0)" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { opacity: "0", transform: "translate(var(--tx), var(--ty)) translateZ(0)" }
        }
      }
    }
  },
  plugins: [],
}