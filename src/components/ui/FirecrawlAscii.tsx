import { useEffect, useRef } from 'react';

interface FirecrawlAsciiProps {
    className?: string;
}

// Simple pseudo-random noise generator specifically for this visual effect.
// We don't need cryptographic quality, just visual smoothness.
// Using a simple value noise or gradient noise approach.
const perm = new Uint8Array(512);
const p = new Uint8Array(256);
for (let i = 0; i < 256; i++) p[i] = i;
// Shuffle
for (let i = 255; i > 0; i--) {
    const r = Math.floor(Math.random() * (i + 1));
    const t = p[i];
    if (t !== undefined && p[r] !== undefined) {
        p[i] = p[r] as number;
        p[r] = t;
    }
}
// Double it
for (let i = 0; i < 512; i++) {
    const val = p[i & 255];
    if (val !== undefined) perm[i] = val;
}

function fade(t: number) { return t * t * t * (t * (t * 6 - 15) + 10); }
function lerp(t: number, a: number, b: number) { return a + t * (b - a); }
function grad(hash: number, x: number, y: number, z: number) {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}

function noise(x: number, y: number, z: number) {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    const Z = Math.floor(z) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    z -= Math.floor(z);
    const u = fade(x);
    const v = fade(y);
    const w = fade(z);

    // Helper to abstract array access
    // We know these lookups are safe because of the logical construction of 'perm',
    // but Typescript's noUncheckedIndexedAccess is strict.
    const P = (i: number) => perm[i] as number;

    const A = P(X) + Y, AA = P(A) + Z, AB = P(A + 1) + Z;
    const B = P(X + 1) + Y, BA = P(B) + Z, BB = P(B + 1) + Z;

    return lerp(w, lerp(v, lerp(u, grad(P(AA), x, y, z),
        grad(P(BA), x - 1, y, z)),
        lerp(u, grad(P(AB), x, y - 1, z),
            grad(P(BB), x - 1, y - 1, z))),
        lerp(v, lerp(u, grad(P(AA + 1), x, y, z - 1),
            grad(P(BA + 1), x - 1, y, z - 1)),
            lerp(u, grad(P(AB + 1), x, y - 1, z - 1),
                grad(P(BB + 1), x - 1, y - 1, z - 1))));
}

export function FirecrawlAscii({ className }: FirecrawlAsciiProps) {
    const preRef = useRef<HTMLPreElement>(null);

    // Configuration
    const rows = 40;
    const cols = 160; // Doubled width to ensure full coverage
    // Map to the reference style: sparse dots -> dashes -> pluses -> X -> dense blocks
    const chars = " .:-=+*#%@".split("");
    const speed = 0.2;
    const noiseScale = 0.1;

    useEffect(() => {
        let frameId: number;
        let t = 0;

        const render = () => {
            if (!preRef.current) return;

            let output = "";
            t += speed;

            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    // Create a "mountain" mask

                    // 1. Vertical fade 
                    // Use a slightly steeper curve to keep the top empty
                    const vMask = Math.pow(y / (rows - 1), 1.8);

                    // 2. Horizontal fade - WIDENED
                    // Instead of a single central peak, we just fade the edges
                    // x / cols goes 0..1
                    // Power 6 makes it very flat in middle, drops at edges
                    const hMask = 1 - Math.pow(Math.abs((2 * x / cols) - 1), 6);

                    // 3. Noise value
                    // Use fractal noise (sum of octaves) for more "jagged" peaks if we wanted, 
                    // but simple 3D noise is okay.
                    // We can sharpen it by pushing values down and scaling up.
                    let n = noise(x * noiseScale, (y * 0.5 * noiseScale) - (t * 0.05), t * 0.01);

                    // Normalize -1..1 to 0..1
                    n = (n + 1) / 2;

                    // Apply contrast/threshold
                    // This pushes low values to 0 (empty space) and high values to 1 (dense chars)
                    const value = (n * vMask * hMask * 2.5) - 0.5;

                    // Map to char
                    const charIndex = Math.floor(Math.max(0, Math.min(1, value)) * (chars.length - 1));
                    output += chars[charIndex];
                }
                output += "\n";
            }

            preRef.current.innerText = output;
            frameId = requestAnimationFrame(render);
        };

        render();

        return () => cancelAnimationFrame(frameId);
    }, []);

    return (
        <pre
            ref={preRef}
            className={`pointer-events-none absolute select-none font-mono text-[10px] leading-[10px] whitespace-pre overflow-hidden text-brand-accent ${className || ''}`}
            style={{
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%, black 100%)'
            }}
            aria-hidden="true"
        />
    );
}
