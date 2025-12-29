import { useState } from 'react';
import { LucideIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductNodeProps {
    id: string;
    label: string;
    sublabel: string;
    icon: LucideIcon;
    color: string;
    position?: { x: number; y: number };
    size?: number;
    onClick?: () => void;
    parentId?: string;
}

// Utility function to convert hex to rgba
function hexToRgba(hex: string, alpha: number): string {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function ProductNode({
    id,
    label,
    sublabel,
    icon: Icon,
    color,
    position = { x: 0, y: 0 },
    size = 64,
    onClick,
    parentId,
}: ProductNodeProps) {
    const [isHovered, setIsHovered] = useState(false);

    const rgbaColor = hexToRgba(color, 0.063);

    return (
        <motion.div
            className="product-node-container relative group flex flex-col items-center justify-center cursor-pointer"
            data-node-id={`product-node-${id}`}
            data-node-type="product"
            data-node-label={label}
            data-parent-id={parentId}
            style={{
                position: 'absolute',
                left: position.x,
                top: position.y,
                zIndex: 15,
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.1 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
        >
            <motion.div
                className="product-node-icon-container flex items-center justify-center transition-all duration-300 relative"
                data-container-type="icon-box"
                style={{
                    width: `${size}px`,
                    height: `${size}px`,
                    backgroundColor: rgbaColor,
                    border: `1.5px dashed ${color}`,
                    boxShadow: isHovered ? `0 0 20px ${hexToRgba(color, 0.3)}` : 'none',
                }}
                animate={{
                    scale: isHovered ? 1.05 : 1,
                    borderWidth: '1.5px',
                    borderColor: color,
                    borderStyle: isHovered ? 'solid' : 'dashed',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
                {/* Corner markers */}
                <div
                    className="corner-marker corner-top-left absolute -top-[4px] -left-[4px] w-2 h-2 border-t-2 border-l-2"
                    data-marker="top-left"
                    style={{ borderColor: color }}
                ></div>
                <div
                    className="corner-marker corner-top-right absolute -top-[4px] -right-[4px] w-2 h-2 border-t-2 border-r-2"
                    data-marker="top-right"
                    style={{ borderColor: color }}
                ></div>
                <div
                    className="corner-marker corner-bottom-left absolute -bottom-[4px] -left-[4px] w-2 h-2 border-b-2 border-l-2"
                    data-marker="bottom-left"
                    style={{ borderColor: color }}
                ></div>
                <div
                    className="corner-marker corner-bottom-right absolute -bottom-[4px] -right-[4px] w-2 h-2 border-b-2 border-r-2"
                    data-marker="bottom-right"
                    style={{ borderColor: color }}
                ></div>

                {/* Pulse effect on hover */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className="pulse-effect absolute inset-0"
                            style={{ border: `2px solid ${color}` }}
                            initial={{ opacity: 0, scale: 1 }}
                            animate={{ opacity: [0.5, 0], scale: [1, 1.3] }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.6, repeat: Infinity }}
                        />
                    )}
                </AnimatePresence>

                {/* Icon */}
                <div
                    className="product-node-icon-wrapper absolute inset-0 flex items-center justify-center"
                    data-icon-wrapper="true"
                >
                    <motion.div
                        className="product-node-icon"
                        data-icon="true"
                        style={{ color: color }}
                        animate={{
                            scale: isHovered ? 1.1 : 1,
                            rotate: isHovered ? [0, -5, 5, 0] : 0
                        }}
                        transition={{
                            scale: { type: 'spring', stiffness: 300, damping: 20 },
                            rotate: { duration: 0.3 }
                        }}
                    >
                        <Icon size={26} strokeWidth={1.5} aria-hidden="true" />
                    </motion.div>
                </div>

                {/* Label container */}
                <div
                    className="product-node-label-container absolute text-center pointer-events-none"
                    data-container-type="label"
                    style={{
                        top: `calc(100% + 20px)`,
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: 'max-content',
                        minWidth: `${size}px`,
                    }}
                >
                    <div
                        className="product-node-label text-[11px] font-mono font-medium uppercase tracking-wider whitespace-nowrap"
                        data-label="main"
                        style={{ color: color }}
                    >
                        {label}
                    </div>
                    <div
                        className="product-node-sublabel text-[9px] font-mono text-[#a3a3a3] mt-0.5 whitespace-nowrap"
                        data-label="sub"
                    >
                        {sublabel}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
