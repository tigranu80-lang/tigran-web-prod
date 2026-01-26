import React from 'react';

interface SectionSkeletonProps {
    /** Minimum height of the skeleton */
    minHeight?: string;
    /** Optional className for custom styling */
    className?: string;
    /** Variant determines the skeleton layout pattern */
    variant?: 'default' | 'cards' | 'text' | 'mixed';
}

/**
 * Enterprise-grade Section Skeleton
 * 
 * Professional skeleton loader that matches the visual style of the site.
 * Used during lazy loading to maintain perceived performance.
 * 
 * Inspired by: Linear, Vercel, Stripe loading states
 */
export const SectionSkeleton = React.memo(function SectionSkeleton({
    minHeight = '500px',
    className = '',
    variant = 'default'
}: SectionSkeletonProps) {
    return (
        <div 
            className={`relative w-full overflow-hidden ${className}`}
            style={{ minHeight }}
            aria-hidden="true"
            role="presentation"
        >
            {/* Background with subtle gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-alabaster-dark/30 to-transparent" />
            
            {/* Content skeleton based on variant */}
            <div className="container mx-auto px-6 max-w-7xl py-16">
                {variant === 'default' && <DefaultSkeleton />}
                {variant === 'cards' && <CardsSkeleton />}
                {variant === 'text' && <TextSkeleton />}
                {variant === 'mixed' && <MixedSkeleton />}
            </div>

            {/* Shimmer overlay effect */}
            <div className="absolute inset-0 skeleton-shimmer pointer-events-none" />
        </div>
    );
});

/** Default two-column layout skeleton */
function DefaultSkeleton() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left column - Text content */}
            <div className="space-y-6">
                {/* Section label */}
                <div className="h-8 w-48 bg-ink-950/10 rounded-sm skeleton-pulse" />
                
                {/* Heading */}
                <div className="space-y-3">
                    <div className="h-10 w-3/4 bg-ink-950/10 rounded-sm skeleton-pulse" />
                    <div className="h-10 w-1/2 bg-ink-950/10 rounded-sm skeleton-pulse" />
                </div>
                
                {/* Paragraph */}
                <div className="space-y-2 pt-4">
                    <div className="h-4 w-full bg-ink-950/5 rounded-sm skeleton-pulse" />
                    <div className="h-4 w-5/6 bg-ink-950/5 rounded-sm skeleton-pulse" />
                    <div className="h-4 w-4/6 bg-ink-950/5 rounded-sm skeleton-pulse" />
                </div>
                
                {/* Button */}
                <div className="h-12 w-40 bg-ink-950/10 rounded-sm skeleton-pulse mt-6" />
            </div>
            
            {/* Right column - Visual */}
            <div className="relative">
                <div className="aspect-square bg-ink-950/5 rounded-sm skeleton-pulse" />
                {/* Decorative corners */}
                <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-ink-950/10" />
                <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-ink-950/10" />
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-ink-950/10" />
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-ink-950/10" />
            </div>
        </div>
    );
}

/** Cards grid skeleton */
function CardsSkeleton() {
    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="space-y-3">
                <div className="h-6 w-32 bg-ink-950/10 rounded-sm skeleton-pulse" />
                <div className="h-12 w-2/3 bg-ink-950/10 rounded-sm skeleton-pulse" />
            </div>
            
            {/* Cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="bg-white/50 border border-ink-950/5 p-6 space-y-4">
                        <div className="h-8 w-8 bg-ink-950/10 rounded-sm skeleton-pulse" />
                        <div className="h-6 w-3/4 bg-ink-950/10 rounded-sm skeleton-pulse" />
                        <div className="space-y-2">
                            <div className="h-3 w-full bg-ink-950/5 rounded-sm skeleton-pulse" />
                            <div className="h-3 w-5/6 bg-ink-950/5 rounded-sm skeleton-pulse" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Text-heavy section skeleton */
function TextSkeleton() {
    return (
        <div className="max-w-3xl mx-auto space-y-8">
            {/* Heading */}
            <div className="space-y-3 text-center">
                <div className="h-6 w-24 bg-ink-950/10 rounded-sm skeleton-pulse mx-auto" />
                <div className="h-12 w-2/3 bg-ink-950/10 rounded-sm skeleton-pulse mx-auto" />
            </div>
            
            {/* Paragraphs */}
            <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="space-y-2">
                        <div className="h-4 w-full bg-ink-950/5 rounded-sm skeleton-pulse" />
                        <div className="h-4 w-11/12 bg-ink-950/5 rounded-sm skeleton-pulse" />
                        <div className="h-4 w-4/5 bg-ink-950/5 rounded-sm skeleton-pulse" />
                    </div>
                ))}
            </div>
        </div>
    );
}

/** Mixed layout skeleton */
function MixedSkeleton() {
    return (
        <div className="space-y-12">
            {/* Top section */}
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                <div className="lg:w-1/3 space-y-4">
                    <div className="h-6 w-24 bg-ink-950/10 rounded-sm skeleton-pulse" />
                    <div className="h-10 w-full bg-ink-950/10 rounded-sm skeleton-pulse" />
                    <div className="h-4 w-3/4 bg-ink-950/5 rounded-sm skeleton-pulse" />
                </div>
                <div className="lg:w-2/3 h-64 bg-ink-950/5 rounded-sm skeleton-pulse" />
            </div>
            
            {/* Bottom cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-24 bg-ink-950/5 rounded-sm skeleton-pulse" />
                ))}
            </div>
        </div>
    );
}

/**
 * Minimal inline skeleton for small loading states
 */
export function InlineSkeleton({ width = '100px', height = '1em' }: { width?: string; height?: string }) {
    return (
        <span 
            className="inline-block bg-ink-950/10 rounded-sm skeleton-pulse"
            style={{ width, height }}
            aria-hidden="true"
        />
    );
}
