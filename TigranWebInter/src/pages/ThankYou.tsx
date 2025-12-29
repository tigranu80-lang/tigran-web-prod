import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Background } from '../features/layout/Background';

export function ThankYou() {
    return (
        <div className="min-h-screen font-sans bg-alabaster text-ink-950 selection:bg-ink-950 selection:text-alabaster relative flex items-center justify-center">
            <Background />

            <div className="relative z-10 max-w-md w-full px-6 text-center">
                <div className="w-16 h-16 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-8 text-alabaster">
                    <CheckCircle size={32} />
                </div>

                <h1 className="text-4xl font-serif font-medium mb-4">Request Received</h1>
                <p className="text-ink-500 font-light mb-8 font-sans">
                    We have received your configuration inquiry. Our team will analyze your requirements and reach out within 24 hours.
                </p>

                <div className="space-y-4">
                    {/* Placeholder for Calendly or other next steps */}
                    <div className="p-4 border border-dashed border-ink-950/20 bg-white/50">
                        <p className="text-xs font-mono uppercase tracking-widest text-ink-400 mb-2">Next Step</p>
                        <p className="text-sm">Check your email for the confirmation dossier.</p>
                    </div>

                    <Link to="/" className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-ink-500 transition-colors mt-8">
                        <ArrowLeft size={16} />
                        Return to System
                    </Link>
                </div>
            </div>
        </div>
    );
}
