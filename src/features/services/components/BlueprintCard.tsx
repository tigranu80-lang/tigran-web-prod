import { ArrowRight } from "lucide-react";
import { Blueprint } from "../constants/blueprintsData";
import { motion } from "framer-motion";
import { useRef } from "react";

interface BlueprintCardProps {
    data: Blueprint;
    onSelect?: (rect: DOMRect) => void;
}

export function BlueprintCard({ data, onSelect }: BlueprintCardProps) {
    const cardRef = useRef<HTMLDivElement>(null);

    const handleClick = () => {
        if (onSelect && cardRef.current) {
            onSelect(cardRef.current.getBoundingClientRect());
        }
    };

    return (
        <motion.div
            ref={cardRef}
            onClick={handleClick}
            whileHover={{ y: -4 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
            className="group relative bg-[#F9F9F9] border border-ink-950/10 p-8 hover:bg-white hover:border-orange-600 hover:shadow-[4px_4px_0px_0px_rgba(234,88,12,1)] transition-colors duration-200 flex flex-col min-h-[320px] cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <ArrowRight className="w-5 h-5 text-orange-600 -rotate-45" />
            </div>

            <div className="flex flex-col gap-6 mb-auto">
                <span className="font-mono text-xs text-ink-950/40 uppercase tracking-widest border-b border-ink-950/10 pb-2 w-fit group-hover:text-orange-600 group-hover:border-orange-600/30 transition-colors">
                    {data.code}
                </span>

                <h3 className="text-2xl font-serif text-ink-950 group-hover:text-orange-600 transition-colors">
                    {data.title}
                </h3>

                <p className="text-ink-500 text-sm leading-relaxed">
                    {data.desc}
                </p>
            </div>

            <div className="mt-8 pt-6 border-t border-ink-950/5 group-hover:border-orange-600/10">
                <div className="flex flex-wrap gap-2">
                    {data.tags.map((t, idx) => (
                        <span
                            key={idx}
                            className="text-[10px] font-mono text-ink-950/60 uppercase tracking-wider bg-white border border-ink-950/10 px-2 py-1"
                        >
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
