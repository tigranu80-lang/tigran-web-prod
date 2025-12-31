import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface CustomSelectProps {
    label: string;
    value: string;
    onChange: (value: string) => void;
    options: string[];
    placeholder?: string;
    id: string;
}

export function CustomSelect({ label, value, onChange, options, placeholder, id }: CustomSelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    // Close when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative group p-8 focus-within:bg-white/40 transition-colors" ref={containerRef}>
            <label
                htmlFor={id}
                className="inline-block bg-ink-950 text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest mb-4"
            >
                {label}
            </label>

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full text-left bg-transparent border-b border-dashed ${isOpen ? 'border-orange-500' : 'border-ink-950/20'} py-2 text-ink-950 focus:outline-none transition-colors font-mono text-xs flex items-center justify-between group-hover/trigger:border-ink-950/50`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <span className={!value ? 'text-ink-300' : ''}>
                        {value || placeholder || 'Select option'}
                    </span>
                    <ChevronDown
                        size={14}
                        className={`text-ink-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-orange-600' : ''}`}
                    />
                </button>

                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-full left-0 w-full z-50 mt-2 bg-white border border-ink-950 shadow-[4px_4px_0px_0px_#0A0A0A]"
                        >
                            <ul role="listbox" className="py-2 max-h-60 overflow-auto">
                                {options.map((option) => (
                                    <li
                                        key={option}
                                        role="option"
                                        aria-selected={value === option}
                                        onClick={() => {
                                            onChange(option);
                                            setIsOpen(false);
                                        }}
                                        className="relative px-4 py-3 mx-2 text-xs font-mono uppercase tracking-wide cursor-pointer hover:bg-neutral-100 text-ink-950 transition-colors flex items-center justify-between group/item"
                                    >
                                        <span>{option}</span>
                                        {value === option && (
                                            <Check size={12} className="text-orange-600" />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
