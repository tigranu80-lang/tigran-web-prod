import { useSyncExternalStore } from "react";

// Server-safe initial state
function getServerSnapshot() {
    return false;
}

export function useMediaQuery(query: string): boolean {
    // Use useSyncExternalStore for proper SSR support and no cascading renders
    const subscribe = (callback: () => void) => {
        const media = window.matchMedia(query);
        media.addEventListener("change", callback);
        return () => media.removeEventListener("change", callback);
    };

    const getSnapshot = () => {
        return window.matchMedia(query).matches;
    };

    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
