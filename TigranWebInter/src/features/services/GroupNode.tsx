import { ReactNode } from 'react';

interface GroupNodeProps {
    id: string;
    label: string;
    color: string;
    width: number;
    height: number;
    position: { x: number; y: number };
    children?: ReactNode;
}

// Utility function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function GroupNode({
    id,
    label,
    color,
    width,
    height,
    position,
    children,
}: GroupNodeProps) {
    const rgbaColor = hexToRgba(color, 0.02);
    const rgbaBorder = hexToRgba(color, 0.314);
    const rgbaLabelBorder = hexToRgba(color, 0.19);

    return (
        <div
            className="group-node-container relative transition-all duration-500 pointer-events-none"
            data-node-id={`group-node-${id}`}
            data-node-type="group"
            data-node-label={label}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                display: 'flex',
                flexWrap: 'wrap',
                width: `${width}px`,
                height: `${height}px`,
                border: `1.5px dashed ${rgbaBorder}`,
                backgroundColor: rgbaColor,
                backdropFilter: 'blur(2px)',
                boxShadow: 'none',
                outline: 'none',
                zIndex: 10,
            }}
        >
            {/* Group label */}
            <div
                className="group-node-label absolute top-0 px-2 py-0.5 text-xs font-mono tracking-[0.15em] uppercase"
                data-label="group"
                style={{
                    color: color,
                    backgroundColor: '#F5F5F0',
                    border: `1px solid ${rgbaLabelBorder}`,
                    left: '50%',
                    transform: 'translate(-50%, -130%)',
                    whiteSpace: 'nowrap',
                }}
            >
                {label}
            </div>

            {/* Corner dots - static */}
            <div
                className="group-corner-dot corner-top-left absolute -top-1 -left-1 w-2 h-2 rounded-full border-2"
                data-corner="top-left"
                style={{
                    borderColor: color,
                    backgroundColor: '#F5F5F0',
                }}
            ></div>
            <div
                className="group-corner-dot corner-top-right absolute -top-1 -right-1 w-2 h-2 rounded-full border-2"
                data-corner="top-right"
                style={{
                    borderColor: color,
                    backgroundColor: '#F5F5F0',
                }}
            ></div>
            <div
                className="group-corner-dot corner-bottom-left absolute -bottom-1 -left-1 w-2 h-2 rounded-full border-2"
                data-corner="bottom-left"
                style={{
                    borderColor: color,
                    backgroundColor: '#F5F5F0',
                }}
            ></div>
            <div
                className="group-corner-dot corner-bottom-right absolute -bottom-1 -right-1 w-2 h-2 rounded-full border-2"
                data-corner="bottom-right"
                style={{
                    borderColor: color,
                    backgroundColor: '#F5F5F0',
                }}
            ></div>

            {/* Children nodes */}
            {children}
        </div>
    );
}
