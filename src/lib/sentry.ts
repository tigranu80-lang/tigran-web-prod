/**
 * Sentry Error Monitoring Configuration
 * 
 * To activate:
 * 1. Create account at https://sentry.io (free tier: 5k errors/month)
 * 2. Create a React project in Sentry dashboard
 * 3. Copy DSN and add to .env.local: VITE_SENTRY_DSN=your-dsn-here
 * 4. Uncomment the initialization code below
 * 5. Import and call initSentry() in src/index.tsx
 */

// TODO: Install Sentry when ready: npm install @sentry/react

/*
import * as Sentry from '@sentry/react';

export function initSentry() {
  if (import.meta.env.VITE_SENTRY_DSN) {
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE,
      integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
      ],
      // Performance Monitoring
      tracesSampleRate: 0.1, // 10% of transactions
      // Session Replay
      replaysSessionSampleRate: 0.1,
      replaysOnErrorSampleRate: 1.0, // 100% when error occurs
    });
  }
}
*/

// Placeholder export until Sentry is activated
export function initSentry() {
    // Sentry not configured - see instructions above
}
