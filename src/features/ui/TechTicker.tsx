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
        <section className="w-full bg-transparent border-b border-ink-950 overflow-hidden pt-1 pb-5 sm:pt-3 sm:pb-7 pl-4">
            <div className="flex whitespace-nowrap ticker-wrapper">
                <div className="flex shrink-0 gap-8 sm:gap-16 items-center ticker-track">
                    {[...technologies, ...technologies].map((tech, index) => (
                        <div
                            key={index}
                            className={`
                                text-5xl sm:text-7xl md:text-8xl uppercase tracking-tighter
                                ${tech.stroke
                                    ? "text-transparent [-webkit-text-stroke:1px_#0A0A0A] sm:[-webkit-text-stroke:1.5px_#0A0A0A] font-mono font-normal tracking-widest"
                                    : "text-ink-950 font-bold font-sans"
                                }
                            `}
                        >
                            {tech.name}
                            <span className="text-orange-600 ml-8 sm:ml-16">.</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
