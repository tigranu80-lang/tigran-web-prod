import { useEffect, useRef, useState } from 'react';

interface UseInViewOptions {
    /** Only trigger once when element comes into view */
    once?: boolean;
    /** Threshold for intersection (0-1) */
    threshold?: number;
    /** Margin around the root */
    margin?: string;
}

/**
 * Custom hook to detect when an element is in the viewport.
 * Replaces framer-motion's useInView with native Intersection Observer API.
 * 
 * @example
 * const { ref, inView } = useInView({ once: true, margin: "-20px" });
 * return <div ref={ref}>{inView && <AnimatedContent />}</div>;
 */
export function useInView<T extends HTMLElement = HTMLDivElement>(
    options: UseInViewOptions = {}
): { ref: React.RefObject<T | null>; inView: boolean } {
    const { once = false, threshold = 0.1, margin = '0px' } = options;

    const ref = useRef<T>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

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
    }, [once, threshold, margin]);

    return { ref, inView };
}
