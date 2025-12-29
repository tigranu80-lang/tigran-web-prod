import { motion } from 'framer-motion';
import React from 'react';

interface AnimatedDotProps {
    color: string;
    delay?: number;
    x?: number;
    y?: number;
}

export const AnimatedDot: React.FC<AnimatedDotProps> = ({
    color,
    delay = 0,
    x = 0,
    y = 0
}) => (
    <motion.div
        className="absolute w-2 h-2 rounded-full"
        style={{
            backgroundColor: color,
            left: x,
            top: y,
            transform: 'translate(-50%, -50%)'
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
            scale: [0, 1, 1, 0],
            opacity: [0, 1, 1, 0],
        }}
        transition={{
            duration: 2,
            delay,
            repeat: Infinity,
            ease: "easeInOut"
        }}
    />
);
