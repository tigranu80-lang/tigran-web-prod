import { useState, useEffect, useCallback, useRef } from "react";
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

    const [isExiting, setIsExiting] = useState(false);
    const exitCancelledRef = useRef(false);

    // Delete text helper (for exit animation)
    const deleteTextAsync = async (
        currentText: string,
        setter: (value: string) => void,
        delay: number = 15
    ) => {
        for (let i = currentText.length; i >= 0; i--) {
            if (exitCancelledRef.current) return false;
            setter(currentText.slice(0, i));
            await new Promise((r) => setTimeout(r, delay));
        }
        return true;
    };

    // Handle exit animation
    const handleExit = useCallback(async () => {
        setIsExiting(true);
        exitCancelledRef.current = false;

        // Reverse typewriter: delete in reverse order
        await deleteTextAsync(animState.impact, (v) =>
            setAnimState((prev) => ({ ...prev, impact: v })), 3
        );
        if (exitCancelledRef.current) return;

        await deleteTextAsync(animState.solution, (v) =>
            setAnimState((prev) => ({ ...prev, solution: v })), 2
        );
        if (exitCancelledRef.current) return;

        await deleteTextAsync(animState.problem, (v) =>
            setAnimState((prev) => ({ ...prev, problem: v })), 2
        );
        if (exitCancelledRef.current) return;

        await deleteTextAsync(animState.title, (v) =>
            setAnimState((prev) => ({ ...prev, title: v })), 5
        );

        setIsExiting(false);
        return true;
    }, [animState]);

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

        const deleteText = async (
            text: string,
            setter: (value: string) => void,
            delay: number = 50
        ) => {
            for (let i = text.length; i >= 0; i--) {
                if (isCancelled) return false;
                setter(text.slice(0, i));
                await new Promise((r) => setTimeout(r, delay));
            }
            return true;
        };

        const runAnimation = async () => {
            await new Promise((r) => setTimeout(r, 100));
            if (isCancelled) return;

            await deleteText(target.shortTitle, (v) =>
                setAnimState((prev) => ({ ...prev, title: v }))
            );
            if (isCancelled) return;

            await typeText(target.fullTitle, (v) =>
                setAnimState((prev) => ({ ...prev, title: v }))
            );
            if (isCancelled) return;

            await typeText(
                target.problem,
                (v) => setAnimState((prev) => ({ ...prev, problem: v })),
                10
            );
            if (isCancelled) return;

            await typeText(
                target.solution,
                (v) => setAnimState((prev) => ({ ...prev, solution: v })),
                10
            );
            if (isCancelled) return;

            await typeText(
                target.stats,
                (v) => setAnimState((prev) => ({ ...prev, impact: v })),
                20
            );
        };

        runAnimation();

        return () => {
            isCancelled = true;
        };
    }, [activeIndex, isContentVisible, useCases]);

    return {
        animState,
        isExiting,
        handleExit,
        exitCancelledRef,
    };
}
