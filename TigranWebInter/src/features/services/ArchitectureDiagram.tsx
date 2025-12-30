import { OrchestrationDiagram } from './diagrams/OrchestrationDiagram';
import { AIAgentsDiagram } from './diagrams/AIAgentsDiagram';
import { RefactoringDiagram } from './diagrams/RefactoringDiagram';
import { ErrorBoundary } from '../../components/ErrorBoundary';

/**
 * ArchitectureDiagram - Main wrapper component
 * Renders the appropriate diagram based on activeTab
 * Wrapped in ErrorBoundary to prevent crashes
 */
export function ArchitectureDiagram({ activeTab }: { activeTab: string }) {
    if (activeTab === 'orchestration') {
        return (
            <ErrorBoundary>
                <OrchestrationDiagram />
            </ErrorBoundary>
        );
    }

    if (activeTab === 'ai-agents') {
        return (
            <ErrorBoundary>
                <AIAgentsDiagram />
            </ErrorBoundary>
        );
    }

    // Default: refactoring
    return (
        <ErrorBoundary>
            <RefactoringDiagram />
        </ErrorBoundary>
    );
}
