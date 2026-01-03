export interface Blueprint {
    title: string;
    tags: string[];
    desc: string;
    code: string;
}

export const BLUEPRINTS: Blueprint[] = [
    {
        title: "Inbound Lead Engine",
        tags: ["n8n", "OpenAI", "CRM"],
        desc: "Full automated routing and qualification system.",
        code: "BLU-01",
    },
    {
        title: "Inventory Control",
        tags: ["Make", "Shopify", "Sheets"],
        desc: "Real-time sync between warehouse and frontend.",
        code: "BLU-02",
    },
    {
        title: "Support Triaging",
        tags: ["LangChain", "Zendesk", "Vector"],
        desc: "Semantic search and auto-drafting for agents.",
        code: "BLU-03",
    },
];
