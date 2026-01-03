/**
 * Design Tokens - Single Source of Truth
 * 
 * This file contains all color values used across the application.
 * These values MUST match the CSS variables defined in index.css.
 * 
 * Usage in Framer Motion:
 *   import { colors } from '@/config/theme';
 *   const accentColor = useTransform(progress, [0, 1], [colors.neutral.muted, colors.accent.orange]);
 * 
 * Usage in Tailwind (via tailwind.config.js extension):
 *   className="bg-brand-bg text-brand-text"
 */

export const colors = {
    // Brand Core
    brand: {
        bg: '#F5F5F0',       // --color-brand-bg (alabaster)
        text: '#0A0A0A',     // --color-brand-text (ink-950)
    },

    // Accents (Semantic)
    accent: {
        orange: '#ea580c',   // --color-accent-orange (Primary action, Protocol highlight)
        blue: '#3b82f6',     // --color-accent-blue (Workflow)
        green: '#10b981',    // --color-accent-green (Success, Compute)
        pink: '#ec4899',     // --color-accent-pink (Integrations)
        purple: '#a855f7',   // --color-accent-purple (Action/Output)
        red: '#ef4444',      // --color-accent-red (Error)
    },

    // Diagram-specific (matches CSS vars)
    diagram: {
        trigger: '#f97316',  // Orange for Trigger group
        workflow: '#3b82f6', // Blue for Workflow group
        integrations: '#ec4899', // Pink for Integrations
        compute: '#10b981',  // Green for Compute/AI
        action: '#8b5cf6',   // Purple for Action/Output
    },

    // Neutral Scale (for animations, text states)
    neutral: {
        muted: '#73737333',    // Muted gray with alpha (for inactive states)
        mutedSolid: '#737373', // Solid muted gray (ink-500)
        light: '#a3a3a3',      // ink-400
        border: '#0A0A0A',     // For borders (same as brand.text)
        borderLight: 'rgba(10, 10, 10, 0.1)', // 10% opacity border
        white: '#FFFFFF',
    },
} as const;

// Type helper for strict typing
export type ColorToken = typeof colors;
