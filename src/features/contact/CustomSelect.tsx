import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, ChevronDown } from 'lucide-react';

interface CustomSelectProps {
    label: string;
    sublabel?: string;
    value: string | string[];
    onChange: (value: string | string[]) => void;
    options: string[];
    placeholder?: string;
    id: string;
    multiple?: boolean;
}

export function CustomSelect({ label, sublabel, value, onChange, options, placeholder, id, multiple = false }: CustomSelectProps) {
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

    const handleSelect = (option: string) => {
        if (multiple) {
            const currentValues = Array.isArray(value) ? value : (value ? [value] : []);
            const isSelected = currentValues.includes(option);

            let newValues;
            if (isSelected) {
                newValues = currentValues.filter(v => v !== option);
            } else {
                newValues = [...currentValues, option];
            }
            onChange(newValues);
            // Don't close on multiple select
        } else {
            onChange(option);
            setIsOpen(false);
        }
    };

    // Helper to check if an option is selected
    const isOptionSelected = (option: string) => {
        if (multiple) {
            return Array.isArray(value) ? value.includes(option) : value === option;
        }
        return value === option;
    };

    // For multiple select, we might want to show tags or just a count
    // Implementing a simple comma-separated view for now if not too long, otherwise count
    const renderValue = () => {
        if (!value || (Array.isArray(value) && value.length === 0)) {
            return <span className="text-ink-300">{placeholder || 'Select option'}</span>;
        }

        if (multiple && Array.isArray(value)) {
            return (
                <div className="flex flex-wrap gap-1">
                    {value.map(val => (
                        <span key={val} className="inline-flex items-center gap-1 bg-ink-950/5 px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wide">
                            {val}
                            <span
                                className="cursor-pointer hover:text-orange-600"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleSelect(val);
                                }}
                            >
                                &times;
                            </span>
                        </span>
                    ))}
                </div>
            );
        }

        return <span>{value as string}</span>;
    };


    return (
        <div className="relative group p-8 focus-within:bg-white/40 transition-colors" ref={containerRef}>
            <label
                htmlFor={id}
                className="inline-block bg-ink-950 text-white px-2 py-1 font-mono text-[10px] uppercase tracking-widest mb-2"
            >
                {label}
            </label>
            {sublabel && <div className="text-ink-600 font-sans text-sm mb-3">{sublabel}</div>}

            <div className="relative">
                <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className={`w-full text-left bg-transparent border-b border-dashed ${isOpen ? 'border-orange-500' : 'border-ink-950/20'} py-2 text-ink-950 focus:outline-none transition-colors font-mono text-xs flex items-center justify-between group-hover/trigger:border-ink-950/50 min-h-[34px]`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                >
                    <div className="flex-1 pr-2">
                        {renderValue()}
                    </div>
                    <ChevronDown
                        size={14}
                        className={`text-ink-400 transition-transform duration-300 shrink-0 ${isOpen ? 'rotate-180 text-orange-600' : ''}`}
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
                                {options.map((option) => {
                                    const selected = isOptionSelected(option);
                                    return (
                                        <li
                                            key={option}
                                            role="option"
                                            aria-selected={selected}
                                            onClick={() => handleSelect(option)}
                                            className={`relative px-4 py-3 mx-2 text-xs font-mono uppercase tracking-wide cursor-pointer text-ink-950 transition-colors flex items-center justify-between group/item ${selected ? 'bg-neutral-50' : 'hover:bg-neutral-100'}`}
                                        >
                                            <span>{option}</span>
                                            {selected && (
                                                <Check size={12} className="text-orange-600" />
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
