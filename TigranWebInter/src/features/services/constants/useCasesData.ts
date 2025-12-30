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
}

export const useCases: UseCase[] = [
    {
        id: "01",
        shortTitle: "Leads",
        fullTitle: "Never Miss Leads",
        tag: "#leadgen",
        problem: "Leads arrive in 5 places and get missed.",
        solution: "Enrichment → CRM Sync → Slack Alert.",
        stats: "Lost leads ↓ 70%",
    },
    {
        id: "02",
        shortTitle: "Onboard",
        fullTitle: "Instant Onboarding",
        tag: "#onboarding",
        problem: "Users don't activate, support gets flooded.",
        solution: "Welcome sequence + checklist + usage alerts.",
        stats: "Activation ↑ 24%",
    },
    {
        id: "03",
        shortTitle: "Support",
        fullTitle: "24/7 Support Triage",
        tag: "#support",
        problem: "Slow replies kill conversions.",
        solution: "AI intent tagging → Draft reply → Handoff.",
        stats: "Response: 3h → 15m",
    },
    {
        id: "04",
        shortTitle: "Finance",
        fullTitle: "Ops Reconciliation",
        tag: "#finance",
        problem: "Copy-pasting invoice data manually.",
        solution: "OCR scan → Match PO → Accounting Sync.",
        stats: "Manual work ↓ 8 hrs/wk",
    },
];
