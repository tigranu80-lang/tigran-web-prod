import { onCLS, onINP, onFCP, onLCP, onTTFB, type Metric } from 'web-vitals';

/**
 * Performance Monitoring Utility
 * Tracks Core Web Vitals and logs them for analysis
 */

type PerformanceMetric = {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: string;
};

/**
 * Sends performance metrics to analytics endpoint
 * In production, send to your analytics service (e.g., Google Analytics, Vercel Analytics)
 */
function sendToAnalytics(metric: PerformanceMetric) {
  // Log to console in development
  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.log('[Performance]', {
      metric: metric.name,
      value: `${metric.value.toFixed(2)}ms`,
      rating: metric.rating,
    });
  }

  // In production, send to analytics service
  if (import.meta.env.PROD) {
    // Example: Send to Google Analytics
    const win = window as Window & { gtag?: (command: string, name: string, params: Record<string, unknown>) => void };
    if (typeof window !== 'undefined' && win.gtag) {
      win.gtag('event', metric.name, {
        event_category: 'Web Vitals',
        value: Math.round(metric.value),
        event_label: metric.id,
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    const body = JSON.stringify({
      name: metric.name,
      value: metric.value,
      rating: metric.rating,
      delta: metric.delta,
      id: metric.id,
      navigationType: metric.navigationType,
      url: window.location.href,
      userAgent: navigator.userAgent,
    });

    // Use sendBeacon if available, fallback to fetch
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/analytics', body);
    } else {
      fetch('/api/analytics', {
        method: 'POST',
        body,
        keepalive: true,
        // eslint-disable-next-line no-console
      }).catch(console.error);
    }
  }
}

/**
 * Report Web Vitals handler
 */
function reportWebVitals(metric: Metric) {
  const performanceMetric: PerformanceMetric = {
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    navigationType: metric.navigationType,
  };

  sendToAnalytics(performanceMetric);
}

/**
 * Initialize performance monitoring
 * Call this once when your app starts
 */
export function initPerformanceMonitoring() {
  // Core Web Vitals
  onCLS(reportWebVitals);  // Cumulative Layout Shift
  onINP(reportWebVitals);  // Interaction to Next Paint (replaces FID)
  onFCP(reportWebVitals);  // First Contentful Paint
  onLCP(reportWebVitals);  // Largest Contentful Paint
  onTTFB(reportWebVitals); // Time to First Byte

  // Long Tasks Observer - detect tasks blocking main thread > 50ms
  if (import.meta.env.DEV && typeof PerformanceObserver !== 'undefined') {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // eslint-disable-next-line no-console
            console.warn(`[LongTask] ${entry.name}: ${entry.duration.toFixed(2)}ms`, {
              startTime: entry.startTime.toFixed(2),
              duration: entry.duration.toFixed(2),
            });
          }
        }
      });
      longTaskObserver.observe({ type: 'longtask', buffered: true });
    } catch {
      // PerformanceObserver for longtask not supported
    }

    // Layout Shift Observer - detect unexpected layout shifts
    try {
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const layoutShift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
          if (!layoutShift.hadRecentInput && layoutShift.value > 0.01) {
            // eslint-disable-next-line no-console
            console.warn(`[LayoutShift] Score: ${layoutShift.value.toFixed(4)}`, {
              startTime: entry.startTime.toFixed(2),
            });
          }
        }
      });
      layoutShiftObserver.observe({ type: 'layout-shift', buffered: true });
    } catch {
      // PerformanceObserver for layout-shift not supported
    }
  }

  // Log performance timing information in development
  if (import.meta.env.DEV) {
    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const connectTime = perfData.responseEnd - perfData.requestStart;
      const renderTime = perfData.domComplete - perfData.domLoading;

      // eslint-disable-next-line no-console
      console.log('[Performance] Page Metrics:', {
        'Page Load Time': `${pageLoadTime}ms`,
        'Connection Time': `${connectTime}ms`,
        'Render Time': `${renderTime}ms`,
      });
    });
  }
}

/**
 * Mark a custom performance milestone
 * Useful for tracking specific app interactions
 */
export function markPerformance(name: string) {
  if (typeof window !== 'undefined' && window.performance) {
    window.performance.mark(name);
  }
}

/**
 * Measure time between two performance marks
 */
export function measurePerformance(name: string, startMark: string, endMark: string) {
  if (typeof window !== 'undefined' && window.performance) {
    try {
      window.performance.measure(name, startMark, endMark);
      const measure = window.performance.getEntriesByName(name)[0];

      if (import.meta.env.DEV && measure) {
        // eslint-disable-next-line no-console
        console.log(`[Performance] ${name}: ${measure.duration.toFixed(2)}ms`);
      }

      return measure;
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Performance measurement failed:', error);
      return null;
    }
  }
  return null;
}
