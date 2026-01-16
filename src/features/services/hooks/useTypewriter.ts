import { useState, useEffect } from "react";
import { UseCase } from "../constants/useCasesData";

interface TypewriterState {
    title: string;
    problem: string;
    solution: string;
    impact: string;
}

interface UseTypewriterOptions {
    activeIndex: number;
    isContentVisible: boolean;
    useCases: UseCase[];
}

/**
 * useTypewriter - Custom hook for typewriter animation effect
 * Extracted from UseCases.tsx for better code organization
 */
export function useTypewriter({ activeIndex, isContentVisible, useCases }: UseTypewriterOptions) {
    const [animState, setAnimState] = useState<TypewriterState>({
        title: "",
        problem: "",
        solution: "",
        impact: "",
    });

    // Typewriter effect
    useEffect(() => {
        if (!isContentVisible) return;

        let isCancelled = false;
        const target = useCases[activeIndex];
        if (!target) return;

        // Reset state for new animation
        // eslint-disable-next-line react-hooks/set-state-in-effect -- Intentional: needed for animation reset on index change
        setAnimState({
            title: target.shortTitle,
            problem: "",
            solution: "",
            impact: "",
        });

        const typeText = async (
            text: string,
            setter: (value: string) => void,
            delay: number = 30
        ) => {
            for (let i = 0; i <= text.length; i++) {
                if (isCancelled) return false;
                setter(text.slice(0, i));
                await new Promise((r) => setTimeout(r, delay));
            }
            return true;
        };

        const runAnimation = async () => {
            await new Promise((r) => setTimeout(r, 100));
            if (isCancelled) return;

            // Title is shown immediately (no typing animation since shortTitle === fullTitle)
            // Run all typewriters in parallel with staggered starts (500ms offset)
            const typeProblem = typeText(
                target.problem,
                (v) => setAnimState((prev) => ({ ...prev, problem: v })),
                12
            );

            // Start solution 500ms after problem starts
            const typeSolution = new Promise((resolve) => {
                setTimeout(async () => {
                    if (isCancelled) return resolve(false);
                    await typeText(
                        target.solution,
                        (v) => setAnimState((prev) => ({ ...prev, solution: v })),
                        12
                    );
                    resolve(true);
                }, 500);
            });

            // Start impact 500ms after solution starts (1000ms after problem)
            const typeImpact = new Promise((resolve) => {
                setTimeout(async () => {
                    if (isCancelled) return resolve(false);
                    await typeText(
                        target.stats,
                        (v) => setAnimState((prev) => ({ ...prev, impact: v })),
                        25
                    );
                    resolve(true);
                }, 1000);
            });

            // Wait for all to complete
            await Promise.all([typeProblem, typeSolution, typeImpact]);
        };

        runAnimation();

        return () => {
            isCancelled = true;
        };
    }, [activeIndex, isContentVisible, useCases]);

    return {
        animState,
    };
}
