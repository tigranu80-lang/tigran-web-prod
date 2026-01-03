import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

/**
 * Mobile Diagram Primitives - Canvas Style
 * Matches desktop diagrams with dot pattern, dashed borders, corner dots
 */

export interface MobileNodeProps {
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    delay?: number;
}

/** Single node in mobile diagram - styled like desktop ProductNode */
export function MobileNode({ label, sublabel, icon: Icon, color, delay = 0 }: MobileNodeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="flex items-center gap-4 p-4 bg-white border-2 rounded-none shadow-sm relative"
            style={{ borderColor: color }}
        >
            {/* Corner details like desktop */}
            <div
                className="absolute -top-[3px] -left-[3px] w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
            />
            <div
                className="absolute -top-[3px] -right-[3px] w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
            />
            <div
                className="absolute -bottom-[3px] -left-[3px] w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
            />
            <div
                className="absolute -bottom-[3px] -right-[3px] w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: color }}
            />

            <div
                className="w-12 h-12 flex items-center justify-center rounded-none border-2 bg-white"
                style={{ borderColor: color, color }}
            >
                <Icon size={24} strokeWidth={1.5} />
            </div>
            <div>
                <div className="text-sm font-mono font-bold uppercase tracking-widest" style={{ color }}>
                    {label}
                </div>
                <div className="text-xs font-mono text-neutral-500 mt-0.5">
                    {sublabel}
                </div>
            </div>
        </motion.div>
    );
}

export interface MobileGroupProps {
    label: string;
    color: string;
    children: React.ReactNode;
    delay?: number;
}

/** Dashed border group container with corner dots - like desktop GroupNode */
export function MobileGroup({ label, color, children, delay = 0 }: MobileGroupProps) {
    // Convert hex to rgba for subtle background
    const hexToRgba = (hex: string, alpha: number) => {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay }}
            className="border-2 border-dashed p-4 rounded-none relative"
            style={{
                borderColor: hexToRgba(color, 0.5),
                backgroundColor: hexToRgba(color, 0.02),
            }}
        >
            {/* Label badge on top border */}
            <div
                className="absolute -top-3 left-4 px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-[0.15em]"
                style={{
                    color: color,
                    backgroundColor: 'var(--color-brand-bg, #F5F5F0)',
                    border: `1px solid ${hexToRgba(color, 0.3)}`,
                }}
            >
                {label}
            </div>

            {/* Corner dots */}
            <div
                className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border-2"
                style={{ borderColor: color, backgroundColor: 'var(--color-brand-bg, #F5F5F0)' }}
            />
            <div
                className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2"
                style={{ borderColor: color, backgroundColor: 'var(--color-brand-bg, #F5F5F0)' }}
            />
            <div
                className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full border-2"
                style={{ borderColor: color, backgroundColor: 'var(--color-brand-bg, #F5F5F0)' }}
            />
            <div
                className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border-2"
                style={{ borderColor: color, backgroundColor: 'var(--color-brand-bg, #F5F5F0)' }}
            />

            <div className="flex flex-col gap-3 mt-2">
                {children}
            </div>
        </motion.div>
    );
}

/** Animated arrow between groups - SVG style */
export function AnimatedArrow({ delay = 0, color = '#a3a3a3' }: { delay?: number; color?: string }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className="flex justify-center py-3 relative"
        >
            {/* Dashed line */}
            <svg width="2" height="24" className="absolute">
                <line
                    x1="1"
                    y1="0"
                    x2="1"
                    y2="24"
                    stroke={color}
                    strokeWidth="2"
                    strokeDasharray="4,4"
                />
            </svg>

            {/* Animated arrow */}
            <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown className="w-5 h-5" style={{ color }} />
            </motion.div>
        </motion.div>
    );
}

/** Canvas wrapper with dot pattern background */
export function MobileCanvasWrapper({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative bg-white border border-ink-950/10 rounded-none overflow-hidden">
            {/* Corner markers */}
            <div className="absolute -top-[1px] -left-[1px] w-3 h-3 border-t-2 border-l-2 border-ink-950 z-20" />
            <div className="absolute -top-[1px] -right-[1px] w-3 h-3 border-t-2 border-r-2 border-ink-950 z-20" />
            <div className="absolute -bottom-[1px] -left-[1px] w-3 h-3 border-b-2 border-l-2 border-ink-950 z-20" />
            <div className="absolute -bottom-[1px] -right-[1px] w-3 h-3 border-b-2 border-r-2 border-ink-950 z-20" />

            {/* Dot pattern background */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
                <defs>
                    <pattern
                        id="mobile-dots-pattern"
                        x="0"
                        y="0"
                        width="16"
                        height="16"
                        patternUnits="userSpaceOnUse"
                    >
                        <circle cx="0.6" cy="0.6" r="1" fill="#d4d4d4" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#mobile-dots-pattern)" />
            </svg>

            {/* Content */}
            <div className="relative z-10 p-5">
                {children}
            </div>

            {/* Gradient overlay */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-transparent via-transparent to-white/30 z-5" />
        </div>
    );
}
