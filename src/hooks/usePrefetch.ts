import { useEffect, useRef } from 'react';

type ImportFn = () => Promise<unknown>;

interface UsePrefetchOptions {
    /** Delay before starting prefetch (ms). Default: 0 */
    delay?: number;
    /** Only prefetch when connection is good. Default: true */
    respectConnection?: boolean;
}

/**
 * Enterprise-grade prefetch hook using requestIdleCallback
 * 
 * Preloads chunks during browser idle time, ensuring they're cached
 * before the user scrolls to them. Used by Vercel, Next.js, etc.
 * 
 * @example
 * // Prefetch first 3 sections after Hero loads
 * usePrefetch([
 *   () => import('../features/services/Protocol'),
 *   () => import('../features/services/Services'),
 *   () => import('../features/team/Team'),
 * ], { delay: 1000 });
 */
export function usePrefetch(
    imports: ImportFn[],
    options: UsePrefetchOptions = {}
): void {
    const { delay = 0, respectConnection = true } = options;
    const hasPrefetched = useRef(false);

    useEffect(() => {
        // Prevent double-prefetch in StrictMode
        if (hasPrefetched.current) return;

        // Check connection quality (skip prefetch on slow connections)
        if (respectConnection && typeof navigator !== 'undefined') {
            const connection = (navigator as Navigator & { 
                connection?: { saveData?: boolean; effectiveType?: string } 
            }).connection;
            
            if (connection) {
                // Skip prefetch if user has data saver enabled
                if (connection.saveData) return;
                // Skip prefetch on 2G connections
                if (connection.effectiveType === '2g') return;
            }
        }

        const prefetchChunks = () => {
            hasPrefetched.current = true;
            
            // Use requestIdleCallback for non-blocking prefetch
            const scheduleImport = (importFn: ImportFn, index: number) => {
                if ('requestIdleCallback' in window) {
                    requestIdleCallback(
                        () => {
                            importFn().catch(() => {
                                // Silently fail - prefetch is opportunistic
                            });
                        },
                        { timeout: 3000 + (index * 500) } // Stagger timeouts
                    );
                } else {
                    // Fallback for Safari
                    setTimeout(() => {
                        importFn().catch(() => {});
                    }, 100 + (index * 200));
                }
            };

            imports.forEach((importFn, index) => {
                scheduleImport(importFn, index);
            });
        };

        // Delay prefetch to not compete with critical resources
        const timeoutId = setTimeout(prefetchChunks, delay);

        return () => {
            clearTimeout(timeoutId);
        };
    }, [imports, delay, respectConnection]);
}

/**
 * Prefetch a single chunk imperatively
 * Useful for hover-based prefetching
 */
export function prefetchChunk(importFn: ImportFn): void {
    if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
            importFn().catch(() => {});
        }, { timeout: 2000 });
    } else {
        setTimeout(() => {
            importFn().catch(() => {});
        }, 100);
    }
}
