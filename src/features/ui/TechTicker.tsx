const technologies = [
    { name: "n8n", stroke: false },
    { name: "OpenAI", stroke: true },
    { name: "Make", stroke: false },
    { name: "Claude", stroke: true },
    { name: "Zapier", stroke: false },
    { name: "Supabase", stroke: true },
    { name: "Salesforce", stroke: false },
    { name: "HubSpot", stroke: true },
    { name: "Stripe", stroke: false },
    { name: "Shopify", stroke: true },
    { name: "Airtable", stroke: false },
    { name: "Google Sheets", stroke: true },
    { name: "Slack", stroke: false },
    { name: "Notion", stroke: true },
    { name: "Zendesk", stroke: false },
    { name: "Mailchimp", stroke: true },
    { name: "Calendly", stroke: false },
    { name: "Intercom", stroke: true },
    { name: "Pipedrive", stroke: false },
    { name: "ActiveCampaign", stroke: true },
    { name: "Monday", stroke: false },
    { name: "ClickUp", stroke: true },
    { name: "Asana", stroke: false },
    { name: "Webflow", stroke: true },
    { name: "Twilio", stroke: false },
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
