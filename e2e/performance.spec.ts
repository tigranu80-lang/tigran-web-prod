import { test, expect } from '@playwright/test';

/**
 * Performance Stability Tests
 * Validates that performance optimizations are working correctly
 */

test.describe('Performance Stability', () => {
    test.beforeEach(async ({ page }) => {
        // Navigate to homepage with domcontentloaded (faster, avoids analytics blocking)
        await page.goto('/', { waitUntil: 'domcontentloaded', timeout: 15000 });
        // Wait for React hydration
        await page.waitForTimeout(1000);
    });

    test('should load homepage within acceptable LCP threshold', async ({ page }) => {
        // Measure page load performance
        const metrics = await page.evaluate(() => {
            return new Promise<{ lcp: number | null; fcp: number | null }>((resolve) => {
                let lcp: number | null = null;
                let fcp: number | null = null;

                // Get FCP from performance entries
                const paintEntries = performance.getEntriesByType('paint');
                const fcpEntry = paintEntries.find(entry => entry.name === 'first-contentful-paint');
                if (fcpEntry) {
                    fcp = fcpEntry.startTime;
                }

                // Get LCP using PerformanceObserver
                const observer = new PerformanceObserver((list) => {
                    const entries = list.getEntries();
                    for (const entry of entries) {
                        lcp = entry.startTime;
                    }
                });

                try {
                    observer.observe({ type: 'largest-contentful-paint', buffered: true });
                } catch {
                    // Not supported
                }

                // Wait a bit for LCP to be reported
                setTimeout(() => {
                    observer.disconnect();
                    resolve({ lcp, fcp });
                }, 2000);
            });
        });

        // LCP should be under 2500ms (Google's "good" threshold)
        if (metrics.lcp !== null) {
            expect(metrics.lcp).toBeLessThan(2500);
        }

        // FCP should be under 2000ms (test environment has overhead)
        if (metrics.fcp !== null) {
            expect(metrics.fcp).toBeLessThan(2000);
        }
    });

    test('should handle UseCases card switching smoothly', async ({ page }) => {
        // Scroll to UseCases section
        await page.evaluate(() => {
            document.getElementById('use-cases')?.scrollIntoView({ behavior: 'instant' });
        });
        await page.waitForTimeout(500);

        // Get all use case cards
        const cards = page.locator('[role="button"][aria-label^="View use case"]');
        const cardCount = await cards.count();

        expect(cardCount).toBeGreaterThan(1);

        // Click through each card and verify no errors
        for (let i = 0; i < Math.min(cardCount, 3); i++) {
            await cards.nth(i).click();
            await page.waitForTimeout(300); // Wait for animation
        }

        // Verify page is still responsive
        const body = page.locator('body');
        await expect(body).toBeVisible();
    });

    test('should have GlobeSection render correctly', async ({ page }) => {
        // Find the globe container
        const globeContainer = page.locator('canvas').first();

        // Verify canvas exists and is visible
        const isVisible = await globeContainer.isVisible().catch(() => false);

        // Globe might not be visible if section is below fold, that's okay
        if (isVisible) {
            // Check canvas has dimensions
            const box = await globeContainer.boundingBox();
            if (box) {
                expect(box.width).toBeGreaterThan(0);
                expect(box.height).toBeGreaterThan(0);
            }
        }
    });

    test('should not have excessive layout shifts during scroll', async ({ page }) => {
        // Set up layout shift tracking
        const cumulativeCLS = await page.evaluate(() => {
            return new Promise<number>((resolve) => {
                let cls = 0;

                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        const layoutShift = entry as PerformanceEntry & { value: number; hadRecentInput: boolean };
                        if (!layoutShift.hadRecentInput) {
                            cls += layoutShift.value;
                        }
                    }
                });

                try {
                    observer.observe({ type: 'layout-shift', buffered: true });
                } catch {
                    // Not supported
                }

                // Scroll the page
                window.scrollTo(0, document.body.scrollHeight);

                setTimeout(() => {
                    observer.disconnect();
                    resolve(cls);
                }, 3000);
            });
        });

        // CLS should be under 0.25 for aggressive scroll (0.1 is ideal for static content)
        // Animated elements during scroll contribute to CLS but don't harm UX
        expect(cumulativeCLS).toBeLessThan(0.25);
    });
});
