import {
    Globe,
    Layers,
    Database,
    MessageSquare,
    Zap,
    Bot,
    Code2,
    Brain,
    GitBranch,
    FileCode,
    CheckCircle,
    ArrowDown,
    ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';

interface MobileNodeProps {
    label: string;
    sublabel: string;
    icon: React.ElementType;
    color: string;
    delay?: number;
}

function MobileNode({ label, sublabel, icon: Icon, color, delay = 0 }: MobileNodeProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="flex items-center gap-3 p-3 bg-white border-2 rounded-none shadow-sm"
            style={{ borderColor: color }}
        >
            <div 
                className="w-10 h-10 flex items-center justify-center rounded-none border"
                style={{ borderColor: color, color }}
            >
                <Icon size={20} />
            </div>
            <div>
                <div className="text-xs font-mono font-semibold uppercase" style={{ color }}>
                    {label}
                </div>
                <div className="text-[10px] font-mono text-neutral-500">
                    {sublabel}
                </div>
            </div>
        </motion.div>
    );
}

interface MobileGroupProps {
    label: string;
    color: string;
    children: React.ReactNode;
    delay?: number;
}

function MobileGroup({ label, color, children, delay = 0 }: MobileGroupProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay }}
            className="border-2 border-dashed p-3 rounded-none relative"
            style={{ borderColor: color }}
        >
            <div 
                className="absolute -top-2.5 left-3 px-2 bg-neutral-50 text-[10px] font-mono font-semibold uppercase"
                style={{ color }}
            >
                {label}
            </div>
            <div className="flex flex-col gap-2 mt-1">
                {children}
            </div>
        </motion.div>
    );
}

function AnimatedArrow({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay }}
            className="flex justify-center py-2"
        >
            <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
                <ArrowDown className="w-5 h-5 text-neutral-300" />
            </motion.div>
        </motion.div>
    );
}

/**
 * Mobile Orchestration Diagram - Vertical layout
 */
export function MobileOrchestrationDiagram() {
    return (
        <div className="p-4 bg-neutral-50/50 space-y-1">
            {/* Trigger */}
            <MobileGroup label="Trigger" color="#f97316" delay={0}>
                <MobileNode
                    label="Webhook"
                    sublabel="HTTP Trigger"
                    icon={Globe}
                    color="#f97316"
                    delay={0.1}
                />
            </MobileGroup>

            <AnimatedArrow delay={0.2} />

            {/* Workflow */}
            <MobileGroup label="Workflow" color="#3b82f6" delay={0.2}>
                <MobileNode
                    label="Orchestrator"
                    sublabel="Process Flow"
                    icon={Layers}
                    color="#3b82f6"
                    delay={0.3}
                />
            </MobileGroup>

            <AnimatedArrow delay={0.4} />

            {/* Integrations */}
            <MobileGroup label="Integrations" color="#ec4899" delay={0.4}>
                <MobileNode
                    label="CRM"
                    sublabel="Salesforce"
                    icon={Database}
                    color="#ec4899"
                    delay={0.5}
                />
                <MobileNode
                    label="Slack"
                    sublabel="Alerts"
                    icon={MessageSquare}
                    color="#ec4899"
                    delay={0.55}
                />
                <MobileNode
                    label="Email"
                    sublabel="Resend"
                    icon={Zap}
                    color="#ec4899"
                    delay={0.6}
                />
            </MobileGroup>
        </div>
    );
}

/**
 * Mobile AI Agents Diagram - Vertical layout
 */
export function MobileAIAgentsDiagram() {
    return (
        <div className="p-4 bg-neutral-50/50 space-y-1">
            {/* Input */}
            <MobileGroup label="Input" color="#3b82f6" delay={0}>
                <MobileNode
                    label="User"
                    sublabel="Query"
                    icon={MessageSquare}
                    color="#3b82f6"
                    delay={0.1}
                />
            </MobileGroup>

            <AnimatedArrow delay={0.2} />

            {/* Compute */}
            <MobileGroup label="Compute" color="#10b981" delay={0.2}>
                <div className="grid grid-cols-2 gap-2">
                    <MobileNode
                        label="LLM"
                        sublabel="GPT-4"
                        icon={Bot}
                        color="#10b981"
                        delay={0.3}
                    />
                    <MobileNode
                        label="RAG"
                        sublabel="Vector DB"
                        icon={Database}
                        color="#10b981"
                        delay={0.35}
                    />
                    <MobileNode
                        label="Code"
                        sublabel="Executor"
                        icon={Code2}
                        color="#10b981"
                        delay={0.4}
                    />
                    <MobileNode
                        label="Memory"
                        sublabel="Context"
                        icon={Brain}
                        color="#10b981"
                        delay={0.45}
                    />
                </div>
            </MobileGroup>

            <AnimatedArrow delay={0.5} />

            {/* Action */}
            <MobileGroup label="Action" color="#8b5cf6" delay={0.5}>
                <MobileNode
                    label="Execute"
                    sublabel="Actions"
                    icon={Zap}
                    color="#8b5cf6"
                    delay={0.6}
                />
            </MobileGroup>
        </div>
    );
}

/**
 * Mobile Refactoring Diagram - Vertical layout
 */
export function MobileRefactoringDiagram() {
    return (
        <div className="p-4 bg-neutral-50/50 space-y-1">
            {/* Source */}
            <MobileGroup label="Source" color="#f97316" delay={0}>
                <MobileNode
                    label="Codebase"
                    sublabel="Legacy Code"
                    icon={FileCode}
                    color="#f97316"
                    delay={0.1}
                />
            </MobileGroup>

            <AnimatedArrow delay={0.2} />

            {/* Analysis */}
            <MobileGroup label="Analysis" color="#3b82f6" delay={0.2}>
                <MobileNode
                    label="AST Parser"
                    sublabel="Structure"
                    icon={GitBranch}
                    color="#3b82f6"
                    delay={0.3}
                />
                <MobileNode
                    label="AI Review"
                    sublabel="Patterns"
                    icon={Brain}
                    color="#3b82f6"
                    delay={0.35}
                />
            </MobileGroup>

            <AnimatedArrow delay={0.4} />

            {/* Transform */}
            <MobileGroup label="Transform" color="#10b981" delay={0.4}>
                <MobileNode
                    label="Refactor"
                    sublabel="Clean Code"
                    icon={Code2}
                    color="#10b981"
                    delay={0.5}
                />
            </MobileGroup>

            <AnimatedArrow delay={0.55} />

            {/* Output */}
            <MobileGroup label="Output" color="#8b5cf6" delay={0.55}>
                <MobileNode
                    label="Validated"
                    sublabel="Ready to Deploy"
                    icon={CheckCircle}
                    color="#8b5cf6"
                    delay={0.65}
                />
            </MobileGroup>
        </div>
    );
}

/**
 * Mobile Architecture Diagram wrapper
 */
export function MobileArchitectureDiagram({ activeTab }: { activeTab: string }) {
    if (activeTab === 'orchestration') {
        return <MobileOrchestrationDiagram />;
    }

    if (activeTab === 'ai-agents') {
        return <MobileAIAgentsDiagram />;
    }

    // Default: refactoring
    return <MobileRefactoringDiagram />;
}

