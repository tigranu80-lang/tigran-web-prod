import { useState, useEffect } from 'react';

/**
 * usePerformanceMode Hook
 * Detects if the device is likely "low-end" or in battery saver mode.
 * 
 * Heuristics:
 * - navigator.hardwareConcurrency <= 4 implies a lower-end mobile device or older laptop.
 * - (Optional) navigator.deviceMemory (if supported/typed) could be added.
 * 
 * Usage:
 * const isLowPower = usePerformanceMode();
 * if (isLowPower) { return <StaticImage />; }
 */
export const usePerformanceMode = () => {
    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
        // Run check once on mount
        const checkPerformance = () => {
            // Check logical cores
            const cores = navigator.hardwareConcurrency || 4; // Default to 4 if unknown

            // If 4 or fewer cores, assume "Low Power" / "Low End" environment
            // Modern "high-end" phones usually report 8.
            // Laptops usually report 8+.
            // Older phones or budget devices report 4.
            const isLowEnd = cores <= 4;

            setIsLowPower(isLowEnd);
        };

        checkPerformance();
    }, []);

    return isLowPower;
};
