import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
    children: ReactNode;
    fallback?: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
    error: Error | null;
}

/**
 * ErrorBoundary - Catches JavaScript errors in child component tree
 * Prevents entire app from crashing on component errors
 */
export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    state: ErrorBoundaryState = {
        hasError: false,
        error: null,
    };

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
        console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            // Fallback UI
            if (this.props.fallback) {
                return this.props.fallback;
            }

            return (
                <div className="p-8 bg-alabaster border border-ink-950/10 text-center">
                    <p className="font-mono text-xs text-ink-500 uppercase tracking-widest mb-2">
                        /// System Error
                    </p>
                    <p className="text-ink-600 text-sm">
                        Something went wrong loading this component.
                    </p>
                </div>
            );
        }

        return this.props.children;
    }
}
