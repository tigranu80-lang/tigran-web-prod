import React from "react";
import { motion } from "framer-motion";

const technologies = [
    { name: "n8n", stroke: false },
    { name: "OpenAI", stroke: true },
    { name: "Claude", stroke: false },
    { name: "AI Agents", stroke: true },
    { name: "Make", stroke: false },
    { name: "Supabase", stroke: true },
    { name: "React", stroke: false },
    { name: "TypeScript", stroke: true },
    { name: "Stripe", stroke: false },
    { name: "Vercel", stroke: true },
];

export function TechTicker() {
    return (
        <section className="w-full bg-[#F5F5F0] border-b border-[#0A0A0A] overflow-hidden py-8 sm:py-12">
            <div className="flex whitespace-nowrap">
                <motion.div
                    className="flex shrink-0 gap-8 sm:gap-16 items-center"
                    animate={{
                        x: "-100%",
                    }}
                    transition={{
                        ease: "linear",
                        duration: 60,
                        repeat: Infinity,
                    }}
                >
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className={`
                                text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tighter
                                ${tech.stroke
                                    ? "text-transparent [-webkit-text-stroke:1px_#0A0A0A] sm:[-webkit-text-stroke:2px_#0A0A0A]"
                                    : "text-[#0A0A0A]"
                                }
                                font-sans
                            `}
                        >
                            {tech.name}
                            <span className="text-orange-600 ml-8 sm:ml-16">.</span>
                        </div>
                    ))}
                </motion.div>

                {/* Duplicate track for seamless loop (just in case the first one isn't enough for wide screens, though the tripling above usually covers it) */}
                <motion.div
                    className="flex shrink-0 gap-8 sm:gap-16 items-center pl-8 sm:pl-16"
                    animate={{
                        x: "-100%",
                    }}
                    transition={{
                        ease: "linear",
                        duration: 60,
                        repeat: Infinity,
                    }}
                >
                    {[...technologies, ...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className={`
                                text-6xl sm:text-8xl md:text-9xl font-bold uppercase tracking-tighter
                                ${tech.stroke
                                    ? "text-transparent [-webkit-text-stroke:1px_#0A0A0A] sm:[-webkit-text-stroke:2px_#0A0A0A]"
                                    : "text-[#0A0A0A]"
                                }
                                font-sans
                            `}
                        >
                            {tech.name}
                            <span className="text-orange-600 ml-8 sm:ml-16">.</span>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
