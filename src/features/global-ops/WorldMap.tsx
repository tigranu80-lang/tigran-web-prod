import { useState, useMemo, useRef } from 'react';
import { WORLD_MAP_PATH_TECH, WORLD_MAP_VIEWBOX } from '../../utils/worldMapData';
import { projectPoint } from '../../utils/mapProjection';
import { useRadarScan } from './useRadarScan';

// Client project locations
const CLIENT_LOCATIONS = [
    { city: 'London', country: '🇬🇧 UK', lat: 51.5074, lng: -0.1278, industry: 'E-commerce', impact: '40h/week saved' },
    { city: 'Berlin', country: '🇩🇪 DE', lat: 52.5200, lng: 13.4050, industry: 'SaaS Startup', impact: '10x content' },
    { city: 'New York', country: '🇺🇸 USA', lat: 40.7128, lng: -74.0060, industry: 'Marketing Agency', impact: '70% less leads lost' },
    { city: 'Kyiv', country: '🇺🇦 UA', lat: 50.4501, lng: 30.5234, industry: 'FMCG Expansion', impact: '100+ leads/week' },
    { city: 'Singapore', country: '🇸🇬 SG', lat: 1.3521, lng: 103.8198, industry: 'Fintech', impact: '5 days → 30 min' },
    { city: 'Dubai', country: '🇦🇪 UAE', lat: 25.2048, lng: 55.2708, industry: 'Real Estate', impact: 'Support 24/7' },
].map(loc => ({
    ...loc,
    ...projectPoint(loc.lat, loc.lng)
}));

/**
 * WorldMap - Interactive map with radar scan animation
 * PERFORMANCE: Uses containerRef for visibility detection to pause animation when off-screen
 */
export function WorldMap() {
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    // Map Locations for collision detection hook
    const mapLocations = useMemo(() =>
        CLIENT_LOCATIONS.map(loc => ({ city: loc.city, x: loc.x })),
        []);

    // Pass containerRef for visibility-based pause optimization
    const { revealedCities, isScanning } = useRadarScan({
        locations: mapLocations,
        cycleDuration: 20000, // 20s cycle (slower scan)
        tolerance: 1.5, // 1.5% tolerance window (tighter sync with line)
        holdDuration: 5000, // 5s hold time for pulsing dots
        containerRef // PERFORMANCE: Pauses animation when off-screen
    });

    // Tooltip shows ONLY on hover - no auto-reveal to avoid chaos
    const tooltipCity = hoveredCity;

    return (
        <div ref={containerRef} className="relative w-full h-full bg-transparent select-none isolate">

            {/* CLIPPED LAYER: Grid, Map, Radar */}
            <div className="absolute inset-0 overflow-hidden z-0">
                {/* CLIPPED LAYER: Grid, Map, Radar */}
                <div className="absolute inset-0 overflow-hidden">
                    {/* 1. Base Grid Layer - Lighter Stroke */}
                    <div className="absolute inset-0 z-0">
                        <svg className="w-full h-full opacity-10" preserveAspectRatio="none">
                            <pattern id="grid-pattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" className="text-ink-400" strokeWidth="1" />
                            </pattern>
                            <rect width="100%" height="100%" fill="url(#grid-pattern)" />
                        </svg>
                    </div>

                    {/* 2. Map Layer (SVG) */}
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-4 md:p-12">
                        <div className="relative w-full max-w-6xl aspect-[2/1]">

                            <svg
                                viewBox={WORLD_MAP_VIEWBOX}
                                className="w-full h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.05)]"
                                style={{ filter: 'drop-shadow(0 0 2px rgba(234,88,12,0.05))' }}
                            >
                                <defs>
                                    {/* Dotted Pattern Definition - Maximum Visibility Fix */}
                                    <pattern id="dotPattern" x="0" y="0" width="8" height="8" patternUnits="userSpaceOnUse">
                                        <circle cx="4" cy="4" r="2" className="fill-ink-500" opacity="1" />
                                    </pattern>
                                </defs>

                                {/* World Map with Dotted Fill & Visible Outline */}
                                <path
                                    d={WORLD_MAP_PATH_TECH}
                                    fill="url(#dotPattern)"
                                    className="stroke-ink-300"
                                    strokeWidth="0.5"
                                    strokeOpacity="0.6"
                                />

                                {/* Interactive Nodes */}
                                {CLIENT_LOCATIONS.map((loc) => {
                                    const isRevealed = hoveredCity === loc.city || revealedCities.has(loc.city);
                                    return (
                                        <g key={loc.city}>
                                            <circle
                                                cx={loc.x}
                                                cy={loc.y}
                                                r={isRevealed ? 6 : 4}
                                                className="fill-brand-accent transition-all duration-300"
                                                opacity={isRevealed ? 1 : 0.6}
                                            />
                                        </g>
                                    );
                                })}
                            </svg>

                            {/* 3. Sharp Radar Line (Interactive Scan) */}
                            {isScanning && <div className="radar-line-sharp" />}

                        </div>
                    </div>
                </div>

            </div>

            {/* 4. HTML Overlay for Interactivity (Tooltips & Beacons with CSS Shadows) */}
            <div className="absolute inset-0 z-50 pointer-events-none">
                <div className="relative w-full h-full flex items-center justify-center p-4 md:p-12">
                    <div className="relative w-full max-w-6xl aspect-[2/1]">
                        {CLIENT_LOCATIONS.map((loc) => {
                            // Dual Trigger Logic: Hover OR Scan
                            // Hover manual override gets higher z-index focus
                            const isHovered = hoveredCity === loc.city;
                            const isScanned = revealedCities.has(loc.city);
                            // Beacon pulsing: any revealed city
                            const isPulsing = isHovered || isScanned;
                            // Tooltip: only ONE city at a time (priority: hover > last scanned)
                            const showTooltip = loc.city === tooltipCity;

                            // Smart positioning: tooltip on left for right-side cities, on right for left-side
                            const isRightSide = loc.x > 1000; // 1000 = center of 2000 viewBox width

                            return (
                                <div
                                    key={loc.city}
                                    className="absolute pointer-events-auto cursor-crosshair group flex items-center justify-center"
                                    style={{
                                        left: `${(loc.x / 2000) * 100}%`,
                                        top: `${(loc.y / 1000) * 100}%`,
                                        transform: 'translate(-50%, -50%)',
                                        width: '24px',
                                        height: '24px',
                                        zIndex: isHovered ? 100 : (isScanned ? 50 : 10)
                                    }}
                                    onMouseEnter={() => setHoveredCity(loc.city)}
                                    onMouseLeave={() => setHoveredCity(null)}
                                    tabIndex={0}
                                    aria-label={`Client in ${loc.city}, ${loc.industry}`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setHoveredCity(prev => prev === loc.city ? null : loc.city);
                                        }
                                    }}
                                >
                                    {/* Beacon Pulse (Shows for any revealed city) */}
                                    <div className={`absolute w-3 h-3 rounded-full bg-brand-accent transition-all duration-300
                                        ${isPulsing ? 'pulse-beacon scale-125 shadow-[0_0_20px_rgba(234,88,12,0.8)]' : 'opacity-60 scale-100'}`}
                                    />

                                    {/* Tooltip - ONLY for the single selected city */}
                                    {showTooltip && (
                                        <div className={`absolute top-1/2 -translate-y-1/2 bg-white/95 backdrop-blur-md border border-ink-200 text-ink-950 p-3 min-w-[160px] pointer-events-none transition-all duration-300 shadow-xl opacity-100
                                            ${isRightSide ? 'right-full mr-4 origin-right' : 'left-full ml-4 origin-left'}`}>

                                            {/* Connector line - flips based on position */}
                                            <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-[1px] bg-brand-accent
                                                ${isRightSide ? 'right-0 translate-x-full' : 'left-0 -translate-x-full'}`} />

                                            <div className="text-[10px] uppercase tracking-widest text-brand-accent font-mono mb-1">
                                                /// CLIENT_FOOTPRINT
                                            </div>
                                            <div className="font-serif text-lg leading-none mb-1 font-medium">{loc.city}, {loc.country}</div>
                                            <div className="font-sans text-xs text-ink-500 mb-2">{loc.industry}</div>

                                            <div className="pt-2 border-t border-ink-100">
                                                <div className="font-mono text-xs font-bold text-ink-950">{loc.impact}</div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Decorative Corners - Lighter for Neubrutalism */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t border-l border-ink-200 pointer-events-none" />
            <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-ink-200 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b border-l border-ink-200 pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b border-r border-ink-200 pointer-events-none" />

        </div>
    );
}
