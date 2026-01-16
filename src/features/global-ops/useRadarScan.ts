import { useState, useEffect, useRef } from 'react';

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
    currentCity: string | null; // City currently being scanned (in tolerance window)
}

export function useRadarScan({
    locations,
    cycleDuration = 10000,
    tolerance = 3,
    holdDuration = 2500
}: UseRadarScanProps): UseRadarScanResult {
    const [scanProgress, setScanProgress] = useState(0);
    const [currentCity, setCurrentCity] = useState<string | null>(null);
    // Use a Map to track WHEN each city was revealed: City -> Timestamp
    const [revealedMap, setRevealedMap] = useState<Map<string, number>>(new Map());

    // Refs for mutable state in the RAF loop
    const startTimeRef = useRef<number | null>(null);
    const requestRef = useRef<number>(0);
    // Ref to hold the animate function — avoids TDZ and stale closure issues
    const animateFnRef = useRef<(timestamp: number) => void>(() => { });
    // Throttle: only check collisions every 100ms (10x per second instead of 60x)
    const lastCollisionCheckRef = useRef<number>(0);
    const COLLISION_CHECK_INTERVAL = 100; // ms

    const prefersReducedMotion = typeof window !== 'undefined'
        ? window.matchMedia('(prefers-reduced-motion: reduce)').matches
        : false;

    // Define animation function (updated on every render)
    const animate = (timestamp: number) => {
        if (!startTimeRef.current) startTimeRef.current = timestamp;

        const elapsed = timestamp - startTimeRef.current;
        const progress = (elapsed % cycleDuration) / cycleDuration * 100;

        setScanProgress(progress);

        // THROTTLE: Only check collisions every 100ms (10x/sec instead of 60x/sec)
        const now = Date.now();
        if (now - lastCollisionCheckRef.current < COLLISION_CHECK_INTERVAL) {
            // Skip collision detection this frame, just continue animation
            requestRef.current = requestAnimationFrame(animateFnRef.current);
            return;
        }
        lastCollisionCheckRef.current = now;

        // 1. Identify active collisions (only runs 10x per second now)
        const activeHits = new Set<string>();
        let closestCity: string | null = null;
        let closestDiff = Infinity;

        locations.forEach(loc => {
            const locPercent = (loc.x / 2000) * 100;
            const diff = Math.abs(progress - locPercent);
            if (diff < tolerance) {
                activeHits.add(loc.city);
                // Track the closest city to the radar line
                if (diff < closestDiff) {
                    closestDiff = diff;
                    closestCity = loc.city;
                }
            }
        });

        // Update current city (the one radar is scanning RIGHT NOW)
        setCurrentCity(closestCity);

        // 2. Update the Revealed Map state
        setRevealedMap(prevMap => {
            const nextMap = new Map(prevMap);
            let hasChanges = false;

            // A. Register NEW hits
            activeHits.forEach(city => {
                if (!nextMap.has(city)) {
                    nextMap.set(city, now);
                    hasChanges = true;
                }
            });

            // B. Prune EXPIRED hits
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

        // Call RAF through ref to always use latest function
        requestRef.current = requestAnimationFrame(animateFnRef.current);
    };

    // Keep ref updated with latest animate function (inside effect to avoid render-time update)
    useEffect(() => {
        animateFnRef.current = animate;
    });

    useEffect(() => {
        if (prefersReducedMotion) return;

        requestRef.current = requestAnimationFrame(animateFnRef.current);

        return () => {
            cancelAnimationFrame(requestRef.current);
        };
    }, [prefersReducedMotion]); // Minimal dependencies — ref always has latest function

    // Convert Map keys to Set for consumption
    const revealedCities = new Set(revealedMap.keys());

    return {
        isScanning: !prefersReducedMotion,
        scanProgress,
        revealedCities,
        currentCity
    };
}
