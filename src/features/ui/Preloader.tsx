import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export function Preloader() {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Simulate loading progress
        const timer = setInterval(() => {
            setProgress((prev) => {
                const next = prev + Math.random() * 15;
                return next >= 100 ? 100 : next;
            });
        }, 150);

        return () => clearInterval(timer);
    }, []);

    return (
        <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0A0A0A] text-[#F5F5F0]"
        >
            <div className="w-full max-w-md px-6">
                {/* Cinematic Logo Sequence */}
                <div className="flex flex-col items-center justify-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="w-16 h-16 bg-[#F5F5F0] rounded-lg flex items-center justify-center mb-6"
                    >
                        <span className="text-[#0A0A0A] font-bold text-3xl font-sans">E</span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.8 }}
                        className="text-2xl md:text-3xl font-serif font-medium tracking-tight"
                    >
                        EsperaStudio
                    </motion.h1>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 }}
                        className="mt-2 flex items-center gap-2"
                    >
                        <span className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-pulse" />
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#737373]">
                            Initializing Systems
                        </span>
                    </motion.div>
                </div>

                {/* Technical Progress Bar */}
                <div className="relative w-full h-[1px] bg-[#333]">
                    <motion.div
                        className="absolute top-0 left-0 h-full bg-[#F5F5F0]"
                        initial={{ width: "0%" }}
                        animate={{ width: `${progress}%` }}
                        transition={{ ease: "linear" }}
                    />
                </div>

                <div className="flex justify-between mt-2 font-mono text-[9px] text-[#525252] uppercase tracking-wider">
                    <span>Core.v2.5.0</span>
                    <span>{Math.round(progress)}%</span>
                </div>
            </div>
        </motion.div>
    );
}
