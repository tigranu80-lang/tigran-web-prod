import { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Background } from '../features/layout/Background';

const CALENDLY_URL = 'https://calendly.com/hello-esperastudio/30min';

interface LocationState {
    name?: string;
    email?: string;
}

export function ThankYou() {
    const location = useLocation();
    const state = location.state as LocationState | null;
    const { name = '', email = '' } = state || {};

    // Inject Calendly script and transparency styles
    useEffect(() => {
        // 1. Inject Styles
        const style = document.createElement('style');
        style.textContent = `
            .calendly-inline-widget iframe {
                background: transparent !important;
            }
        `;
        document.head.appendChild(style);

        // 2. Inject Script
        const script = document.createElement('script');
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.head.removeChild(style);
            if (document.body.contains(script)) {
                document.body.removeChild(script);
            }
        };
    }, []);

    return (
        <div className="min-h-screen font-sans bg-alabaster text-ink-950 selection:bg-ink-950 selection:text-alabaster relative">
            <Background />

            <div className="relative z-10 w-full px-4 py-8">
                {/* Header Section */}
                <div className="text-center mb-6">
                    <div className="w-14 h-14 bg-ink-950 rounded-full flex items-center justify-center mx-auto mb-4 text-alabaster">
                        <CheckCircle size={28} />
                    </div>

                    <h1 className="text-3xl font-serif font-medium mb-2">Request Received</h1>
                    <p className="text-ink-500 font-light text-sm font-sans max-w-md mx-auto">
                        Book a 30-minute strategy call to discuss your requirements.
                    </p>
                </div>

                {/* Calendly Embed - Native Implementation */}
                <div className="max-w-[1100px] mx-auto mb-6 relative min-h-[700px]">
                    <div
                        className="calendly-inline-widget w-full h-[700px]"
                        data-url={`${CALENDLY_URL}?hide_gdpr_banner=1&background_color=f5f5f0&primary_color=0a0a0a&text_color=0a0a0a&name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`}
                    />

                    {/* Fallback Link (Visible if iframe is blocked/fails) */}
                    <div className="text-center mt-4 text-xs text-ink-400 font-mono">
                        <p>Calendar not loading?</p>
                        <a
                            href={`${CALENDLY_URL}?name=${encodeURIComponent(name)}&email=${encodeURIComponent(email)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-ink-600"
                        >
                            Open scheduling page directly
                        </a>
                    </div>
                </div>

                {/* Return Link */}
                <div className="text-center">
                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-widest hover:text-ink-500 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Return to System
                    </Link>
                </div>
            </div>
        </div>
    );
}
