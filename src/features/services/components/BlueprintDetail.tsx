import { ArrowLeft, Check, ArrowRight } from "lucide-react";
import { Blueprint } from "../constants/blueprintsData";
import { motion } from "framer-motion";

interface BlueprintDetailProps {
    data: Blueprint;
    onBack: () => void;
    layoutId?: string;
}

export function BlueprintDetail({ data, onBack, layoutId }: BlueprintDetailProps) {
    return (
        <motion.div
            layoutId={layoutId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full bg-[#F9F9F9] border border-ink-950/10 p-6 md:p-12 relative min-h-[500px] flex flex-col"
        >
            {/* Top Bar: Back Button & Code */}
            <div className="flex justify-between items-start mb-8 md:mb-12">
                <button
                    onClick={onBack}
                    className="group inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-ink-500 hover:text-orange-600 transition-colors"
                >
                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    Back to Blueprints
                </button>

                <motion.span
                    layoutId={layoutId ? `${layoutId}-code` : undefined}
                    className="font-mono text-xs text-ink-950/40 uppercase tracking-widest border border-ink-950/10 px-3 py-1 bg-white"
                >
                    {data.code}
                </motion.span>
            </div>

            <div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
                {/* Left Column: Info */}
                <div className="lg:w-1/2">
                    <motion.h2
                        layoutId={layoutId ? `${layoutId}-title` : undefined}
                        className="text-4xl md:text-5xl font-serif text-ink-950 mb-6 leading-tight"
                    >
                        {data.title}
                    </motion.h2>
                    <p className="text-lg text-ink-500 font-light leading-relaxed mb-8">
                        {data.desc}
                    </p>

                    <div className="mb-8">
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
                    </div>

                    <button className="group px-8 py-4 bg-ink-950 text-white font-mono text-xs uppercase tracking-widest shadow-[4px_4px_0px_0px_#ea580c] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#ea580c] transition-all flex items-center gap-3">
                        Deploy Blueprint
                        <ArrowRight className="w-4 h-4" />
                    </button>
                </div>

                {/* Right Column: Key Features (Mock) */}
                <div className="lg:w-1/2 pt-2">
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
                            <li key={i} className="flex items-start gap-3">
                                <span className="mt-1 flex items-center justify-center w-4 h-4 rounded-full bg-green-100 text-green-700">
                                    <Check size={10} />
                                </span>
                                <span className="text-sm text-ink-950 font-sans">{feature}</span>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-12 p-6 bg-orange-50 border border-orange-100">
                        <p className="text-xs font-mono text-orange-800 leading-relaxed">
                            <span className="font-bold">NOTE:</span> This blueprint requires API access to your CRM and OpenAI account. Setup time is approximately 2-4 hours.
                        </p>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
