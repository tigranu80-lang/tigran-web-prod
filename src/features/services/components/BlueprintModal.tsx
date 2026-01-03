import { X, Check, ArrowRight } from "lucide-react";
import { Blueprint } from "../constants/blueprintsData";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface BlueprintModalProps {
    data: Blueprint | null;
    sourceRect: DOMRect | null;
    onClose: () => void;
}

export function BlueprintModal({ data, sourceRect, onClose }: BlueprintModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (data) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [data]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    // Calculate initial transform based on source card position
    const getInitialTransform = () => {
        if (!sourceRect) return { scale: 0.8, opacity: 0 };

        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Calculate the center of the card relative to viewport center
        const cardCenterX = sourceRect.left + sourceRect.width / 2;
        const cardCenterY = sourceRect.top + sourceRect.height / 2;
        const viewportCenterX = viewportWidth / 2;
        const viewportCenterY = viewportHeight / 2;

        const translateX = cardCenterX - viewportCenterX;
        const translateY = cardCenterY - viewportCenterY;

        // Scale based on card size vs modal size (approximate)
        const scaleX = sourceRect.width / (viewportWidth * 0.9);
        const scaleY = sourceRect.height / (viewportHeight * 0.85);
        const scale = Math.max(scaleX, scaleY, 0.3);

        return {
            scale,
            x: translateX,
            y: translateY,
            opacity: 0.5
        };
    };

    return (
        <AnimatePresence>
            {data && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        onClick={onClose}
                        aria-hidden="true"
                        className="fixed inset-0 bg-ink-950/60 backdrop-blur-sm z-50"
                    />

                    {/* Modal Content */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="blueprint-modal-title"
                        initial={getInitialTransform()}
                        animate={{
                            scale: 1,
                            x: 0,
                            y: 0,
                            opacity: 1
                        }}
                        exit={{
                            scale: 0.9,
                            opacity: 0
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30,
                            mass: 0.8
                        }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 bg-[#F9F9F9] border border-ink-950/10 z-50 overflow-auto shadow-2xl"
                    >
                        <div className="p-6 md:p-12 min-h-full flex flex-col">
                            {/* Top Bar: Close Button & Code */}
                            <div className="flex justify-between items-start mb-8 md:mb-12">
                                <button
                                    onClick={onClose}
                                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-500 hover:text-orange-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                    Close
                                </button>

                                <span className="font-mono text-xs text-ink-950/40 uppercase tracking-widest border border-ink-950/10 px-3 py-1 bg-white">
                                    {data.code}
                                </span>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 flex-1">
                                {/* Left Column: Info */}
                                <div className="lg:w-1/2">
                                    <motion.h2
                                        id="blueprint-modal-title"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                        className="text-4xl md:text-5xl font-serif text-ink-950 mb-6 leading-tight"
                                    >
                                        {data.title}
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-lg text-ink-500 font-light leading-relaxed mb-8"
                                    >
                                        {data.desc}
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.2 }}
                                        className="mb-8"
                                    >
                                        <h3 className="font-mono text-[10px] uppercase tracking-widest text-ink-950/40 mb-3">
                                            Stack Integration
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            {data.tags.map((tag, i) => (
                                                <span key={i} className="px-3 py-1.5 bg-white border border-ink-950/10 text-xs font-mono uppercase tracking-wider text-ink-950">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>

                                    <motion.button
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.25 }}
                                        onClick={() => {
                                            onClose();
                                            // Small delay to let modal close animation start
                                            setTimeout(() => {
                                                const contactSection = document.getElementById('contact');
                                                if (contactSection) {
                                                    contactSection.scrollIntoView({ behavior: 'smooth' });
                                                }
                                            }, 200);
                                        }}
                                        className="group px-8 py-4 bg-ink-950 text-white font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#ea580c] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#ea580c] transition-all flex items-center gap-3"
                                    >
                                        Deploy Blueprint
                                        <ArrowRight className="w-4 h-4" />
                                    </motion.button>
                                </div>

                                {/* Right Column: Key Features */}
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="lg:w-1/2 pt-2"
                                >
                                    <h3 className="font-mono text-[10px] uppercase tracking-widest text-ink-950/40 mb-6 pb-2 border-b border-ink-950/10">
                                        System Specifications
                                    </h3>
                                    <ul className="space-y-4">
                                        {[
                                            "Automated Error Handling & Retry Logic",
                                            "Real-time Dashboard & Reporting",
                                            "Full API Documentation & Webhooks",
                                            "Scalable Infrastructure (Serverless)"
                                        ].map((feature, i) => (
                                            <motion.li
                                                key={i}
                                                initial={{ opacity: 0, x: 10 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.25 + i * 0.05 }}
                                                className="flex items-start gap-3"
                                            >
                                                <span className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-700">
                                                    <Check size={10} />
                                                </span>
                                                <span className="text-sm text-ink-950 font-sans">{feature}</span>
                                            </motion.li>
                                        ))}
                                    </ul>

                                    <div className="mt-12 p-6 bg-orange-50 border border-orange-100">
                                        <p className="text-xs font-mono text-orange-800 leading-relaxed">
                                            <span className="font-bold">NOTE:</span> This blueprint requires API access to your CRM and OpenAI account. Setup time is approximately 2-4 hours.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
