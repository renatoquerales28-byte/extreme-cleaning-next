import { useState, useCallback, useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { WizardData } from '@/lib/schemas/wizard';
import { WIZARD_FLOW, StepId, INITIAL_STEP, STEP_ORDER } from '@/lib/wizard/config';

export function useWizardEngine() {
    const [currentStepId, setCurrentStepId] = useState<StepId>(INITIAL_STEP);
    const [history, setHistory] = useState<StepId[]>([]);
    const [direction, setDirection] = useState<number>(0);

    const { watch, getValues } = useFormContext<WizardData>();
    const data = watch(); // Watch all data for guard checks

    // --- NAVIGATION ---

    const goToStep = useCallback((stepId: StepId, navDirection: number = 0) => {
        // Validate target step exists
        if (!WIZARD_FLOW[stepId]) {
            console.error(`Attempted to go to invalid step: ${stepId}`);
            return;
        }

        // GUARD CHECK
        const config = WIZARD_FLOW[stepId];
        if (config.guard) {
            const isSafe = config.guard(getValues());
            if (!isSafe) {
                console.warn(`Guard failed for step ${stepId}. Redirecting to ${config.safeFallback || INITIAL_STEP}`);
                setCurrentStepId(config.safeFallback || INITIAL_STEP);
                return;
            }
        }

        setDirection(navDirection);
        setCurrentStepId(stepId);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [getValues]);

    const goNext = useCallback(() => {
        const currentConfig = WIZARD_FLOW[currentStepId];
        const nextId = currentConfig.next(getValues());

        if (nextId) {
            setHistory(prev => [...prev, currentStepId]);
            goToStep(nextId, 1);
        }
    }, [currentStepId, getValues, goToStep]);

    const goBack = useCallback(() => {
        setHistory(prev => {
            const newHistory = [...prev];
            const prevStepId = newHistory.pop();

            if (prevStepId) {
                goToStep(prevStepId, -1);
                return newHistory;
            } else {
                // If no history, maybe go to zip? or stay.
                return prev;
            }
        });
    }, [goToStep]);

    // Calculate progress based on configured linear order
    // This is visual approximation
    const progress = (() => {
        const idx = STEP_ORDER.indexOf(currentStepId);
        if (idx === -1) return 100; // Special steps or unknown
        return ((idx + 1) / (STEP_ORDER.length - 1)) * 100;
    })();

    return {
        stepId: currentStepId,
        stepConfig: WIZARD_FLOW[currentStepId],
        goNext,
        goBack,
        goToStep,
        direction,
        history,
        progress,
        isFirstStep: history.length === 0
    };
}
