import { useState, useMemo } from 'react';
import { WORLD_MAP_PATH_TECH, WORLD_MAP_VIEWBOX } from '../../utils/worldMapData';
import { projectPoint } from '../../utils/mapProjection';
import { useRadarScan } from './useRadarScan';

// Active server locations
// We map these using our real projection logic now!
const SERVER_LOCATIONS = [
    { city: 'London', lat: 51.5074, lng: -0.1278, latency: '12ms', agents: 16 },
    { city: 'New York', lat: 40.7128, lng: -74.0060, latency: '8ms', agents: 24 },
    { city: 'San Francisco', lat: 37.7749, lng: -122.4194, latency: '18ms', agents: 12 },
    { city: 'Tokyo', lat: 35.6762, lng: 139.6503, latency: '22ms', agents: 14 },
    { city: 'Singapore', lat: 1.3521, lng: 103.8198, latency: '45ms', agents: 8 },
    { city: 'Sydney', lat: -33.8688, lng: 151.2093, latency: '32ms', agents: 6 },
    { city: 'São Paulo', lat: -23.5505, lng: -46.6333, latency: '54ms', agents: 9 },
    { city: 'Dubai', lat: 25.2048, lng: 55.2708, latency: '38ms', agents: 11 },
].map(loc => ({
    ...loc,
    ...projectPoint(loc.lat, loc.lng)
}));

export function WorldMap() {
    const [hoveredCity, setHoveredCity] = useState<string | null>(null);

    // Map Locations for collision detection hook
    const mapLocations = useMemo(() =>
        SERVER_LOCATIONS.map(loc => ({ city: loc.city, x: loc.x })),
        []);

    const { revealedCities, isScanning } = useRadarScan({
        locations: mapLocations,
        cycleDuration: 10000, // 10s cycle
        tolerance: 3, // 3% tolerance window
        holdDuration: 2500 // 2.5s hold time
    });

    return (
        <div className="relative w-full h-full bg-transparent select-none isolate">

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
                                {SERVER_LOCATIONS.map((loc) => {
                                    const isRevealed = hoveredCity === loc.city || revealedCities.has(loc.city);
                                    return (
                                        <g key={loc.city}>
                                            <circle
                                                cx={loc.x}
                                                cy={loc.y}
                                                r={isRevealed ? 4 : 3}
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
                        {SERVER_LOCATIONS.map((loc) => {
                            // Dual Trigger Logic: Hover OR Scan
                            // Hover manual override gets higher z-index focus
                            const isHovered = hoveredCity === loc.city;
                            const isScanned = revealedCities.has(loc.city);
                            const isVisible = isHovered || isScanned;

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
                                    aria-label={`Server in ${loc.city}, ${loc.latency} latency`}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                            setHoveredCity(prev => prev === loc.city ? null : loc.city);
                                        }
                                    }}
                                >
                                    {/* Beacon Pulse (Always visible but brighter when active) */}
                                    <div className={`absolute w-2 h-2 rounded-full bg-brand-accent transition-all duration-300
                                        ${isVisible ? 'pulse-beacon scale-110 shadow-[0_0_10px_rgba(234,88,12,0.6)]' : 'opacity-60 scale-100'}`}
                                    />

                                    {/* Tooltip */}
                                    <div className={`absolute left-full top-1/2 -translate-y-1/2 ml-4 bg-white/95 backdrop-blur-md border border-ink-200 text-ink-950 p-3 min-w-[140px] pointer-events-none transition-all duration-300 origin-left shadow-xl
                                        ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-2 pointer-events-none'}`}>

                                        <div className="absolute left-0 top-1/2 -translate-x-full -translate-y-1/2 w-4 h-[1px] bg-brand-accent" />

                                        <div className="text-[10px] uppercase tracking-widest text-brand-accent font-mono mb-1">
                                            /// SERVER_NODE
                                        </div>
                                        <div className="font-serif text-lg leading-none mb-2 font-medium">{loc.city}</div>

                                        <div className="grid grid-cols-2 gap-2 text-[10px] font-mono text-ink-500">
                                            <div>LATENCY</div>
                                            <div className="text-right text-ink-950 font-bold">{loc.latency}</div>
                                            <div>AGENTS</div>
                                            <div className="text-right text-ink-950 font-bold">{loc.agents}</div>
                                        </div>
                                    </div>
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
