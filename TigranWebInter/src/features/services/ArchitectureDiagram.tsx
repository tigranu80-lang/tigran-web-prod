import { OrchestrationDiagram } from './diagrams/OrchestrationDiagram';
import { AIAgentsDiagram } from './diagrams/AIAgentsDiagram';
import { RefactoringDiagram } from './diagrams/RefactoringDiagram';

/**
 * ArchitectureDiagram - Main wrapper component
 * Renders the appropriate diagram based on activeTab
 */
export function ArchitectureDiagram({ activeTab }: { activeTab: string }) {
    if (activeTab === 'orchestration') {
        return <OrchestrationDiagram />;
    }

    if (activeTab === 'ai-agents') {
        return <AIAgentsDiagram />;
    }

    // Default: refactoring
    return <RefactoringDiagram />;
}
