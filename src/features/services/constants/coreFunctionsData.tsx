/**
 * Core Functions Data Constants
 * Extracted from CoreFunctionsV2.tsx for better HMR performance
 */

import {
    Zap, Database, Workflow,
    MessageSquare, Bot,
    Layers,
    CheckCircle2,
    LayoutTemplate,
    Users
} from "lucide-react";

// --- Tabs Configuration ---
export const tabsV2 = [
    { id: "workflow", label: "Workflow", icon: <LayoutTemplate className="w-4 h-4" /> },
    { id: "ai-workflow", label: "AI Workflow", icon: <Workflow className="w-4 h-4" /> },
    { id: "agentic-ai", label: "Agentic AI", icon: <Bot className="w-4 h-4" /> },
];

// --- Tab Content Data ---
export const tabContentV2 = {
    workflow: {
        title: "Workflow",
        subtitle: "Module 01",
        description:
            "Your business runs on multiple systems—CRM, email, accounting, warehouse. Workflow automation connects them so data flows automatically. When an order arrives, it updates your inventory, creates an invoice, notifies your team, and logs everything. No manual data entry, no missed steps, no waiting for someone to remember the next action.",
        benefit: "New client onboarding: 20 minutes instead of 4 hours.",
        triggers: [
            "Messy\nSpreadsheets",
            "Endless Emails",
            "Paper Forms",
            "Monkey Job"
        ],
        triggerIcon: <Zap className="w-3.5 h-3.5" />,
        heroAction: "EsperaStudio",
        features: [
            { label: "Connect Apps", icon: <Database className="w-3 h-3" /> },
            { label: "Sync Data", icon: <Workflow className="w-3 h-3" /> },
            { label: "Run Tasks", icon: <Layers className="w-3 h-3" /> }
        ],
        result: "Unified Ecosystem",
        handwrittenTop: "This takes forever...",
        handwrittenBottom: "Now takes 20 seconds!",
        sideLoop: "Sync Check"
    },
    "ai-workflow": {
        title: "AI Workflow",
        subtitle: "Module 02",
        description:
            "Standard automation moves data. AI automation understands it. It reads incoming emails, invoices, and forms—extracts key information, identifies what action is needed, and executes it. Handles requests in multiple languages, qualifies leads based on content, routes urgent issues to the right person. Your team focuses on decisions and relationships, not data processing.",
        benefit: "Email triage: 50 emails sorted in 5 minutes instead of 2 hours.",
        triggers: ["Processes are slow..."],
        triggerIcon: <Users className="w-3.5 h-3.5" />,
        heroAction: "EsperaStudio",
        features: [
            { label: "Sorts Data", icon: <Workflow className="w-3 h-3" /> },
            { label: "Takes Action", icon: <Bot className="w-3 h-3" /> },
            { label: "Fixes Issues", icon: <CheckCircle2 className="w-3 h-3" /> }
        ],
        result: "Max Efficiency",
        handwrittenTop: "So busy!",
        handwrittenBottom: "Done!",
        sideLoop: "Learning"
    },
    "agentic-ai": {
        title: "Agentic AI",
        subtitle: "Module 03",
        description:
            "Some processes require judgment, not just triggers. AI agents monitor your operations continuously and make decisions based on your criteria. They evaluate discount requests, manage inventory levels, triage customer issues, and escalate exceptions. Run complex multi-step processes independently, 24/7. You set the boundaries once; the agent applies them consistently.",
        benefit: "Approval workflows: 80% resolved instantly, 20% escalated to you.",
        triggers: ["Need more staff..."],
        triggerIcon: <Bot className="w-3.5 h-3.5" />,
        heroAction: "EsperaStudio",
        features: [
            { label: "Works Alone", icon: <Bot className="w-3 h-3" /> },
            { label: "Understands You", icon: <MessageSquare className="w-3 h-3" /> },
            { label: "Never Sleeps", icon: <Zap className="w-3 h-3" /> }
        ],
        result: "Digital Workforce",
        handwrittenTop: "Overwhelmed...",
        handwrittenBottom: "Easy!",
        sideLoop: "Feedback"
    },
};
