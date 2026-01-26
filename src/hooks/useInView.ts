import { useEffect, useRef, useState, useCallback } from 'react';

interface UseInViewOptions {
    /** Only trigger once when element comes into view */
    once?: boolean;
    /** Threshold for intersection (0-1). Default: 0 for immediate trigger */
    threshold?: number;
    /** 
     * Margin around the root (viewport). 
     * Format: "top right bottom left" like CSS margin.
     * Use BOTTOM margin to preload content below viewport when scrolling down.
     * Example: "0px 0px 1500px 0px" = trigger 1500px before element enters viewport
     */
    margin?: string;
}

interface UseInViewReturn<T> {
    ref: React.RefObject<T | null>;
    inView: boolean;
    /** Manually trigger inView (useful for prefetching) */
    triggerInView: () => void;
}

/**
 * Enterprise-grade IntersectionObserver hook
 * 
 * Key differences from framer-motion's useInView:
 * - Default threshold: 0 (triggers immediately, not at 10%)
 * - Correct margin direction guidance for scroll-down preloading
 * - Manual trigger support for prefetch scenarios
 * 
 * @example
 * // Preload 2000px before element enters viewport
 * const { ref, inView } = useInView({ 
 *   once: true, 
 *   margin: "0px 0px 2000px 0px" // BOTTOM margin for scroll-down
 * });
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {}
): UseInViewReturn<T> {
    // CRITICAL: threshold=0 means trigger as soon as ANY part enters the extended viewport
    const { once = false, threshold = 0, margin = '0px' } = options;

    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    // Manual trigger for prefetch scenarios
    const triggerInView = useCallback(() => {
        setInView(true);
    }, []);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // If already triggered and once=true, don't observe
        if (inView && once) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry) {
                    const isIntersecting = entry.isIntersecting;

                    if (isIntersecting) {
                        setInView(true);
                        if (once) {
                            observer.disconnect();
                        }
                    } else if (!once) {
                        setInView(false);
                    }
                }
            },
            {
                threshold,
                rootMargin: margin,
            }
        );

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, [once, threshold, margin, inView]);

    return { ref, inView, triggerInView };
}
