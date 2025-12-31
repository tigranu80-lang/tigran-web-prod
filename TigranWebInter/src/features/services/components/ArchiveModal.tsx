import { X, ArrowLeft } from "lucide-react";
import { Blueprint, BLUEPRINTS } from "../constants/blueprintsData";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";

interface ArchiveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectBlueprint: (blueprint: Blueprint) => void;
}

export function ArchiveModal({ isOpen, onClose, onSelectBlueprint }: ArchiveModalProps) {
    // Lock body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on Escape key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <AnimatePresence>
            {isOpen && (
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
                        aria-labelledby="archive-modal-title"
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 30
                        }}
                        className="fixed inset-4 md:inset-8 lg:inset-12 bg-[#F5F5F0] border border-ink-950/10 z-50 overflow-auto shadow-2xl"
                    >
                        <div className="p-6 md:p-12 min-h-full">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-12">
                                <button
                                    onClick={onClose}
                                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-500 hover:text-orange-600 transition-colors"
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    Back
                                </button>

                                <button
                                    onClick={onClose}
                                    className="p-2 hover:bg-ink-950/5 transition-colors"
                                >
                                    <X className="w-5 h-5 text-ink-500" />
                                </button>
                            </div>

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.1 }}
                                className="mb-12"
                            >
                                <div className="inline-flex items-center gap-4 mb-6">
                                    <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                                    <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase text-ink-950">
                                        SYS.04 /// Archive
                                    </span>
                                </div>
                                <h1 id="archive-modal-title" className="text-4xl md:text-6xl font-serif text-ink-950 mb-4">
                                    Blueprints Archive
                                </h1>
                                <p className="text-xl text-ink-500 font-light max-w-2xl leading-relaxed">
                                    A collection of pre-built automation architectures ready for deployment.
                                </p>
                            </motion.div>

                            {/* Grid */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {BLUEPRINTS.map((bp, i) => (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.15 + i * 0.05 }}
                                        onClick={() => onSelectBlueprint(bp)}
                                        className="group relative bg-white border border-ink-950/10 p-8 hover:border-orange-600 hover:shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] transition-all duration-200 flex flex-col min-h-[280px] cursor-pointer"
                                    >
                                        <div className="flex flex-col gap-4 mb-auto">
                                            <span className="font-mono text-xs text-ink-950/40 uppercase tracking-widest border-b border-ink-950/10 pb-2 w-fit group-hover:text-orange-600 group-hover:border-orange-600/30 transition-colors">
                                                {bp.code}
                                            </span>

                                            <h3 className="text-xl font-serif text-ink-950 group-hover:text-orange-600 transition-colors">
                                                {bp.title}
                                            </h3>

                                            <p className="text-ink-500 text-sm leading-relaxed">
                                                {bp.desc}
                                            </p>
                                        </div>

                                        <div className="mt-6 pt-4 border-t border-ink-950/5">
                                            <div className="flex flex-wrap gap-2">
                                                {bp.tags.map((t, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="text-[10px] font-mono text-ink-950/60 uppercase tracking-wider bg-[#F5F5F0] border border-ink-950/10 px-2 py-1"
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
