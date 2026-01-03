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
} from 'lucide-react';
import { MobileNode, MobileGroup, AnimatedArrow, MobileCanvasWrapper } from './MobilePrimitives';

/**
 * Mobile Orchestration Diagram - Canvas-style vertical layout
 */
export function MobileOrchestrationDiagram() {
    return (
        <MobileCanvasWrapper>
            <div className="space-y-2">
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

                <AnimatedArrow delay={0.2} color="#f97316" />

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

                <AnimatedArrow delay={0.4} color="#3b82f6" />

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
        </MobileCanvasWrapper>
    );
}

/**
 * Mobile AI Agents Diagram - Canvas-style vertical layout
 */
export function MobileAIAgentsDiagram() {
    return (
        <MobileCanvasWrapper>
            <div className="space-y-2">
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

                <AnimatedArrow delay={0.2} color="#3b82f6" />

                {/* Compute */}
                <MobileGroup label="Compute" color="#10b981" delay={0.2}>
                    <div className="grid grid-cols-2 gap-3">
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

                <AnimatedArrow delay={0.5} color="#10b981" />

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
        </MobileCanvasWrapper>
    );
}

/**
 * Mobile Refactoring Diagram - Canvas-style vertical layout
 */
export function MobileRefactoringDiagram() {
    return (
        <MobileCanvasWrapper>
            <div className="space-y-2">
                {/* Source */}
                <MobileGroup label="Source" color="#ef4444" delay={0}>
                    <MobileNode
                        label="Codebase"
                        sublabel="Legacy Code"
                        icon={FileCode}
                        color="#ef4444"
                        delay={0.1}
                    />
                </MobileGroup>

                <AnimatedArrow delay={0.2} color="#ef4444" />

                {/* Analysis */}
                <MobileGroup label="Analysis" color="#f97316" delay={0.2}>
                    <MobileNode
                        label="AST Parser"
                        sublabel="Structure"
                        icon={GitBranch}
                        color="#f97316"
                        delay={0.3}
                    />
                    <MobileNode
                        label="AI Review"
                        sublabel="Patterns"
                        icon={Brain}
                        color="#f97316"
                        delay={0.35}
                    />
                </MobileGroup>

                <AnimatedArrow delay={0.4} color="#f97316" />

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

                <AnimatedArrow delay={0.55} color="#10b981" />

                {/* Output */}
                <MobileGroup label="Output" color="#22c55e" delay={0.55}>
                    <MobileNode
                        label="Validated"
                        sublabel="Ready to Deploy"
                        icon={CheckCircle}
                        color="#22c55e"
                        delay={0.65}
                    />
                </MobileGroup>
            </div>
        </MobileCanvasWrapper>
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
