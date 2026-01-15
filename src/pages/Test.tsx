/**
 * Test Page for experimenting with new component versions
 * Access at: http://localhost:3000/test
 * 
 * This page is isolated from production and safe for experimentation.
 */

import { CoreFunctionsV2 } from '../features/services/CoreFunctionsV2';

export function Test() {
    return (
        <div className="min-h-screen bg-alabaster">
            {/* Test Header */}
            <div className="bg-orange-600 text-white py-2 px-4 font-mono text-xs text-center tracking-widest uppercase">
                <span className="animate-pulse mr-2">●</span>
                TEST MODE — SYS.02 /// Core_Functions V2
            </div>

            {/* Component Under Test */}
            <CoreFunctionsV2 />
        </div>
    );
}
