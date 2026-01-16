/**
 * Use Cases Data - Extracted from UseCases.tsx
 * Per project rules: Keep files under 200 lines
 */

export interface UseCase {
    id: string;
    shortTitle: string;
    fullTitle: string;
    tag: string;
    problem: string;
    solution: string;
    stats: string;
    ctaText: string;
}

export const useCases: UseCase[] = [
    {
        id: "01",
        shortTitle: "Never Miss a Lead",
        fullTitle: "Never Miss a Lead",
        tag: "#LEADGEN",
        problem: "Leads arrive across multiple channels (forms, ads, emails) and slip through the cracks. Sales teams miss hot prospects while wasting time on junk leads.",
        solution: "Every lead is captured, qualified, and routed to the right salesperson with full context—automatically, in under 5 minutes.",
        stats: "70% fewer lost leads. 40% more booked calls.",
        ctaText: "Book Lead Audit",
    },
    {
        id: "02",
        shortTitle: "Zero-Friction Onboarding",
        fullTitle: "Zero-Friction Onboarding",
        tag: "#ONBOARDING",
        problem: "Deals close, then everything stalls. Manual contract routing, invoice creation, and intake forms create delays. Clients feel abandoned right after saying yes.",
        solution: "The moment a contract is signed, invoicing, workspace setup, and onboarding kick off automatically—no manual handoffs.",
        stats: "5 days to 30 minutes. 24% activation increase.",
        ctaText: "Book Onboarding Review",
    },
    {
        id: "03",
        shortTitle: "Always-On Assistant",
        fullTitle: "Always-On Assistant",
        tag: "#SUPPORT",
        problem: "Missed calls mean missed revenue. Customers ask routine questions (order status, pricing) at all hours. Team is stuck on FAQs instead of complex problems.",
        solution: "AI assistant handles appointments, FAQs, and qualification 24/7 via chat, phone, or WhatsApp—escalating only complex issues.",
        stats: "Zero missed ops. Support volume cut in half.",
        ctaText: "Book Support Assessment",
    },
    {
        id: "04",
        shortTitle: "Content on Autopilot",
        fullTitle: "Content on Autopilot",
        tag: "#CONTENT",
        problem: "Marketing needs fresh daily content (posts, images, videos). Creation is slow, expensive, and inconsistent. Designers become bottlenecks; quality suffers.",
        solution: "Feed prompts or product data into the system; get ready-to-publish images, videos, and copy matching your brand—automatically.",
        stats: "Output: 3 → 25+ pieces. Cost/asset: $45 → $2.",
        ctaText: "Book Content Strategy Call",
    },
];
