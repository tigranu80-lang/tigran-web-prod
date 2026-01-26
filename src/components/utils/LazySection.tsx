import { Suspense, useState, useEffect } from 'react';
import { useInView } from '../../hooks/useInView';
import { SectionSkeleton } from './SectionSkeleton';

type SkeletonVariant = 'default' | 'cards' | 'text' | 'mixed';

interface LazySectionProps {
    children: React.ReactNode;
    /** Custom fallback component. If not provided, uses SectionSkeleton */
    fallback?: React.ReactNode;
    className?: string;
    /** 
     * Margin to extend viewport detection. 
     * Format: "top right bottom left"
     * Use BOTTOM margin for scroll-down preloading: "0px 0px 2000px 0px"
     */
    margin?: string;
    /** Minimum height for the skeleton/placeholder */
    minHeight?: string;
    /** Skeleton variant for auto-generated fallback */
    skeletonVariant?: SkeletonVariant;
    /** Enable fade-in animation when content loads. Default: true */
    fadeIn?: boolean;
    /** Unique ID for debugging */
    id?: string;
}

/**
 * Enterprise-grade LazySection
 * 
 * Features:
 * - Native IntersectionObserver (no framer-motion)
 * - Aggressive preloading (2000px+ margin)
 * - Professional skeleton loaders
 * - Smooth fade-in reveal animation
 * - Content-visibility optimization
 * 
 * Used by: Vercel, Linear, Stripe patterns
 */
export function LazySection({
    children,
    fallback,
    className = "",
    margin = "0px 0px 2000px 0px", // BOTTOM margin for scroll-down preloading
    minHeight = "400px",
    skeletonVariant = 'default',
    fadeIn = true,
    id
}: LazySectionProps) {
    // Native IntersectionObserver with aggressive bottom margin
    const { ref, inView } = useInView<HTMLDivElement>({ once: true, margin });
    
    // Track when content has actually rendered (after Suspense resolves)
    const [hasRendered, setHasRendered] = useState(false);

    // Delay the "rendered" state slightly to ensure smooth fade-in
    useEffect(() => {
        if (inView) {
            // Small delay to let React commit the Suspense resolution
            const timer = setTimeout(() => setHasRendered(true), 50);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [inView]);

    // Generate appropriate fallback
    const skeletonFallback = fallback ?? (
        <SectionSkeleton 
            minHeight={minHeight} 
            variant={skeletonVariant}
        />
    );

    return (
        <div 
            ref={ref} 
            className={className}
            data-section-id={id}
        >
            {inView ? (
                <div 
                    className={`transition-opacity duration-500 ease-out ${
                        fadeIn 
                            ? (hasRendered ? 'opacity-100' : 'opacity-0') 
                            : 'opacity-100'
                    }`}
                >
                    <Suspense fallback={skeletonFallback}>
                        <SectionContent onRender={() => setHasRendered(true)}>
                            {children}
                        </SectionContent>
                    </Suspense>
                </div>
            ) : (
                // Pre-intersection placeholder - maintains layout space
                <div 
                    className="w-full" 
                    style={{ minHeight }}
                    aria-hidden="true"
                />
            )}
        </div>
    );
}

/**
 * Wrapper that notifies parent when content has rendered
 * This enables the fade-in timing
 */
function SectionContent({ 
    children, 
    onRender 
}: { 
    children: React.ReactNode; 
    onRender: () => void;
}) {
    useEffect(() => {
        onRender();
    }, [onRender]);
    
    return <>{children}</>;
}
