import { useState, useEffect, useRef, useCallback } from 'react';

interface UseRadarScanProps {
    locations: Array<{ city: string; x: number }>;
    cycleDuration?: number; // ms, default 10000
    tolerance?: number; // percentage width, default 3
    holdDuration?: number; // ms, default 2500
}

interface UseRadarScanResult {
    isScanning: boolean;
    scanProgress: number; // 0 to 100
    revealedCities: Set<string>;
}

export function useRadarScan({
    locations,
    cycleDuration = 10000,
    tolerance = 3,
    holdDuration = 2500
}: UseRadarScanProps): UseRadarScanResult {
    const [scanProgress, setScanProgress] = useState(0);
    // Use a Map to track WHEN each city was revealed: City -> Timestamp
    const [revealedMap, setRevealedMap] = useState<Map<string, number>>(new Map());

    // Refs for mutable state in the RAF loop
    const startTimeRef = useRef<number | null>(null);
    const requestRef = useRef<number>(0);

    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    const animate = useCallback((timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed = timestamp - startTimeRef.current;
        const progress = (elapsed % cycleDuration) / cycleDuration * 100;

        setScanProgress(progress);

        // 1. Identify active collisions in this frame
        const activeHits = new Set<string>();
        locations.forEach(loc => {
            const locPercent = (loc.x / 2000) * 100;
            const diff = Math.abs(progress - locPercent);
            if (diff < tolerance) {
                activeHits.add(loc.city);
            }
        });

        // 2. Update the Revealed Map state
        setRevealedMap(prevMap => {
            const nextMap = new Map(prevMap);
            const now = Date.now();
            let hasChanges = false;

            // A. Register NEW hits
            activeHits.forEach(city => {
                // Only register if not currently tracked (or if we want to refresh? Let's refresh on re-hit)
                // Actually, to prevent flickering, if it's already "hot", we typically keep the ORIGINAL reveal time 
                // OR we update it to keep it open longer?
                // UX decision: "Hold for 2.5s AFTER the scan passes"? Or "2.5s from first contact"?
                // Let's do "2.5s from first contact" to keep the rhythm steady.

                if (!nextMap.has(city)) {
                    nextMap.set(city, now);
                    hasChanges = true;
                }
            });

            // B. Prune EXPIRED hits
            // Logic: If (now - revealTime > holdDuration) AND (radar is NOT currently hitting it), remove it.
            // If radar IS hitting it, keep it (effectively holding it open while scanning).
            for (const [city, revealTime] of nextMap.entries()) {
                const isOverHoldTime = (now - revealTime) > holdDuration;
                const isCurrentlyHit = activeHits.has(city);

                if (isOverHoldTime && !isCurrentlyHit) {
                    nextMap.delete(city);
                    hasChanges = true;
                }
            }

            return hasChanges ? nextMap : prevMap;
        });

        requestRef.current = requestAnimationFrame(animate);
    }, [cycleDuration, holdDuration, locations, tolerance]);

    useEffect(() => {
        if (prefersReducedMotion) return;

        requestRef.current = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [animate, prefersReducedMotion]);

    // Convert Map keys to Set for consumption
    const revealedCities = new Set(revealedMap.keys());

    return {
        isScanning: !prefersReducedMotion,
        scanProgress,
        revealedCities
    };
}
