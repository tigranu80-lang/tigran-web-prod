import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { BLUEPRINTS, Blueprint } from "./constants/blueprintsData";
import { BlueprintCard } from "./components/BlueprintCard";
import { BlueprintModal } from "./components/BlueprintModal";
import { ArchiveModal } from "./components/ArchiveModal";

interface ModalState {
    blueprint: Blueprint | null;
    sourceRect: DOMRect | null;
}

export function Blueprints() {
    const [modalState, setModalState] = useState<ModalState>({
        blueprint: null,
        sourceRect: null
    });
    const [isArchiveOpen, setIsArchiveOpen] = useState(false);

    const handleSelectBlueprint = (blueprint: Blueprint, rect: DOMRect) => {
        setModalState({ blueprint, sourceRect: rect });
    };

    const handleSelectFromArchive = (blueprint: Blueprint) => {
        // Close archive first, then open blueprint detail
        setIsArchiveOpen(false);
        // Use a small delay to let archive close animation start
        setTimeout(() => {
            // Use center of viewport as source since we're coming from archive
            const centerRect = new DOMRect(
                window.innerWidth / 2 - 150,
                window.innerHeight / 2 - 100,
                300,
                200
            );
            setModalState({ blueprint, sourceRect: centerRect });
        }, 150);
    };

    const handleCloseModal = () => {
        setModalState({ blueprint: null, sourceRect: null });
    };

    return (
        <>
            <section id="services" className="relative py-24 border-t border-ink-950 bg-transparent">
                {/* Technical Cut - Section Label */}
                <div className="absolute top-6 w-full z-10 pointer-events-none">
                    <div className="container mx-auto px-6 max-w-7xl">
                        <div className="bg-ink-950 text-white px-8 py-3 shadow-md inline-flex items-center gap-4 pointer-events-auto">
                            <span className="w-2 h-2 bg-orange-600 rounded-sm"></span>
                            <span className="font-mono text-xs font-bold tracking-[0.2em] uppercase">
                                SYS.04 /// Blueprints
                            </span>
                        </div>
                    </div>
                </div>

                {/* Vertical Structural Guides */}
                <div className="absolute inset-y-0 left-6 md:left-12 w-[1px] bg-dashed border-l border-ink-950/20 pointer-events-none"></div>
                <div className="absolute inset-y-0 right-6 md:right-12 w-[1px] bg-dashed border-r border-ink-950/20 pointer-events-none"></div>

                {/* Corner Details */}
                <div className="absolute top-0 right-6 md:right-12 w-4 h-4 border-t border-r border-ink-950 -translate-y-[1px] translate-x-[1px]"></div>

                <div className="container mx-auto px-6 max-w-7xl relative z-10">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {BLUEPRINTS.map((bp, i) => (
                            <BlueprintCard
                                key={i}
                                data={bp}
                                onSelect={(rect) => handleSelectBlueprint(bp, rect)}
                            />
                        ))}
                    </div>

                    <div className="mt-16 flex justify-start">
                        <button
                            onClick={() => setIsArchiveOpen(true)}
                            className="group relative px-8 py-4 bg-white text-ink-950 border-2 border-ink-950 rounded-none font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#0A0A0A] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0A0A0A] transition-all"
                        >
                            <span className="relative z-10 flex items-center gap-3">
                                View Full Archive{" "}
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                        </button>
                    </div>
                </div>
            </section>

            {/* Blueprint Detail Modal */}
            <BlueprintModal
                data={modalState.blueprint}
                sourceRect={modalState.sourceRect}
                onClose={handleCloseModal}
            />

            {/* Archive Modal */}
            <ArchiveModal
                isOpen={isArchiveOpen}
                onClose={() => setIsArchiveOpen(false)}
                onSelectBlueprint={handleSelectFromArchive}
            />
        </>
    );
}
