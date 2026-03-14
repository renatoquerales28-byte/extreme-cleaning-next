"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
// import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { WIZARD_FLOW, StepId } from "@/lib/wizard/config";
import { WizardActionProvider, useWizardAction } from "./WizardActionContext";

interface ExtremeCleaningWizardProps {
    isOpen?: boolean;
    onClose?: () => void;
}

export default function ExtremeCleaningWizard({ isOpen = true, onClose }: ExtremeCleaningWizardProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <WizardActionProvider>
                    <WizardNavigation onClose={onClose} />
                </WizardActionProvider>
            )}
        </AnimatePresence>
    );
}

function WizardNavigation({ onClose }: { onClose?: () => void }) {
    // const router = useRouter();
    const searchParams = useSearchParams();
    const initialZip = searchParams.get("zip");
    const initialType = searchParams.get("type") as any;
    const initialIntensity = searchParams.get("intensity") as any;

    const handleExit = () => {
        if (onClose) {
            onClose();
        } else {
            window.location.href = '/';
        }
    };

    useEffect(() => {
        // Capture original styles
        const originalHtmlOverflow = document.documentElement.style.overflow;
        const originalBodyOverflow = document.body.style.overflow;
        const originalHtmlHeight = document.documentElement.style.height;
        const originalBodyHeight = document.body.style.height;

        // Apply lock
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.documentElement.style.height = '100%';
        document.body.style.height = '100%';

        return () => {
            // Restore original styles
            document.documentElement.style.overflow = originalHtmlOverflow;
            document.body.style.overflow = originalBodyOverflow;
            document.documentElement.style.height = originalHtmlHeight;
            document.body.style.height = originalBodyHeight;
        };
    }, []);

    // 1. Initialize logic to determine starting step
    const getInitialStep = (): StepId => {
        if (initialZip && initialZip.length === 5) {
            if (initialType) {
                if (initialType === 'commercial') return 'commercial_details';
                return 'cleaning_type';
            }
            return 'service';
        }
        return 'zip';
    };

    const [currentStep, setCurrentStep] = useState<StepId>(getInitialStep);
    const [isInitializing, setIsInitializing] = useState(!!(initialZip && initialZip.length === 5));
    const [history, setHistory] = useState<StepId[]>(getInitialStep() !== 'zip' ? ["zip"] : []);
    const { action } = useWizardAction();

    const methods = useForm<WizardData>({
        resolver: zodResolver(wizardSchema),
        defaultValues: {
            zipCode: initialZip || "",
            serviceType: initialType || undefined,
            cleaningType: initialIntensity || "regular",
            bedrooms: 1,
            bathrooms: 1,
            floors: 1,
            frequency: "onetime",
        },
        mode: "onChange"
    });

    const { watch, trigger } = methods;

    useEffect(() => {
        const validateInitialState = async () => {
            if (isInitializing && initialZip) {
                try {
                    const { checkZipAvailability } = await import("@/app/actions/location");
                    const res = await checkZipAvailability(initialZip);

                    if (res.status === 'unavailable') {
                        // If it turns out to be invalid, go back to zip
                        setCurrentStep("zip");
                        setHistory([]);
                    }
                } catch (error) {
                    console.error("Initial validation failed:", error);
                } finally {
                    setIsInitializing(false);
                }
            }
        };
        validateInitialState();
    }, [isInitializing, initialZip]);

    const handleNext = async () => {
        const freshData = methods.getValues();
        const stepConfig = WIZARD_FLOW[currentStep];
        if (!stepConfig) return;

        // Step-specific validation
        const fieldsToValidate = stepConfig.validationFields || [];

        const isValid = await trigger(fieldsToValidate as any);
        if (!isValid) {
            const errors = methods.formState.errors;
            const firstError = Object.values(errors)[0];
            if (firstError) toast.error(`Please check: ${firstError.message || "Required fields"}`);
            return;
        }

        // Execute Step Side Effects (Phase 2 Refactor)
        if (stepConfig.onComplete) {
            const success = await stepConfig.onComplete(freshData, {
                setValue: methods.setValue,
                getValues: methods.getValues
            });
            if (success === false) return; // Stop if hook fails
        }

        const nextStepId = typeof stepConfig.next === 'function' ? stepConfig.next(freshData) : stepConfig.next;
        if (nextStepId) {
            setHistory(prev => [...prev, currentStep]);
            setCurrentStep(nextStepId as StepId);
        }
    };

    const handleBack = () => {
        if (history.length > 0) {
            const prev = [...history];
            const last = prev.pop();
            setHistory(prev);
            setCurrentStep(last!);
        }
    };

    const handleEditStep = (stepId: StepId) => {
        setHistory(prev => [...prev, currentStep]);
        setCurrentStep(stepId);
    };

    const config = WIZARD_FLOW[currentStep];
    const ActiveStep = config?.component;

    // progress calculation using stages (Phase 3 Refactor)
    const totalStages = 5;
    const currentStage = config.stage || 1;
    const progress = currentStep === 'success' ? 100 : Math.min(100, (currentStage / totalStages) * 100);

    const stepProps: any = {
        onNext: handleNext,
        onEditStep: handleEditStep,
        onBack: handleBack,
        onGoToStep: (stepId: StepId) => {
            setHistory(prev => [...prev, currentStep]);
            setCurrentStep(stepId);
        }
    };

    if (!config) {
        return <div className="p-20">Error: Configuration for step &quot;{currentStep}&quot; not found.</div>;
    }

    return (
        <FormProvider {...methods}>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden lg:p-8"
            >
                {/* BACKDROP BLUR - Desktop Only */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="hidden lg:block absolute inset-0 bg-white/10 backdrop-blur-[25px] z-[-1] cursor-pointer"
                    onClick={handleExit}
                />

                {/* MODAL WRAPPER / MAIN WIZARD CONTAINER */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    transition={{ type: "spring", damping: 30, stiffness: 300 }}
                    className="w-full h-full lg:h-full lg:max-h-[850px] lg:max-w-[1300px] bg-white text-[#024653] font-sans selection:bg-[#05D16E]/30 lg:rounded-[48px] lg:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col lg:flex-row relative"
                >

                    {/* LOGO - Now relative to container in desktop, fixed in mobile */}
                    <div
                        onClick={handleExit}
                        className="absolute top-6 left-6 lg:top-12 lg:left-12 w-20 lg:w-28 h-8 lg:h-10 z-[100] cursor-pointer hover:opacity-60 transition-all"
                    >
                        <Image src="/brand/logo-full.png" alt="ECS" fill className="object-contain" priority />
                    </div>

                    {/* LEFT PANE - Context Side (Top on Mobile) */}
                    <div className="w-full lg:w-[450px] lg:h-full bg-[#F9F8F2] border-b lg:border-b-0 lg:border-r border-[#024653]/5 flex flex-col p-6 pt-10 lg:p-16 justify-end relative shrink-0">
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                            <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-gradient-to-br from-[#05D16E]/10 via-transparent to-transparent blur-[120px]" />
                        </div>

                        <div className="relative z-10 flex flex-col items-end lg:items-start text-right lg:text-left space-y-1 lg:space-y-4 mb-4 lg:mb-12">
                            <h1 className="text-xl lg:text-5xl font-bold tracking-tight text-[#024653] leading-tight text-balance">
                                {config.title}{" "}
                                {config.accent && (
                                    <span className="italic font-normal whitespace-nowrap opacity-30">{config.accent}</span>
                                )}
                            </h1>
                            <p className="text-[10px] lg:text-base font-light text-[#024653]/40 leading-snug max-w-[180px] lg:max-w-none">
                                {config.description}
                            </p>
                        </div>

                        <div className="relative z-10 w-full lg:max-w-none flex justify-end lg:justify-start">
                            <div className="w-1/2 lg:w-full flex items-center gap-4">
                                <div className="flex-1 h-[2px] bg-[#024653]/5 rounded-full overflow-hidden">
                                    <motion.div
                                        className="h-full bg-[#05D16E]"
                                        animate={{ width: `${progress}%` }}
                                        transition={{ duration: 0.5 }}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT PANE - Interactive Side */}
                    <div className="flex-1 bg-white h-full relative flex flex-col overflow-hidden min-w-0">

                        {/* Interaction Area (Scrolling) */}
                        <div className="flex-1 overflow-y-auto custom-scrollbar relative z-10 bg-white">
                            <div className="min-h-full flex flex-col items-center justify-center">
                                <div className="w-full max-w-4xl mx-auto px-4 lg:px-10 py-4 lg:py-10 pb-20">
                                    {/* Active Stage (The Step) */}
                                    <div className="w-full">
                                        {isInitializing ? (
                                            <div className="flex flex-col items-center justify-center py-20">
                                                <div className="w-8 h-8 border-2 border-[#024653]/10 border-t-[#05D16E] rounded-full animate-spin mb-4" />
                                                <p className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/30">Synchronizing...</p>
                                            </div>
                                        ) : ActiveStep ? (
                                            <ActiveStep {...stepProps} />
                                        ) : (
                                            <div>Component Stage Missing</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Footer Actions */}
                        {currentStep !== 'success' && (
                            <div className="shrink-0 p-4 lg:p-8 lg:px-20 border-t border-[#024653]/5 bg-white relative z-20">
                                <div className="max-w-3xl mx-auto flex flex-col gap-4 lg:gap-6">
                                    <div className="flex items-center justify-between">
                                        {/* EXIT - FAR LEFT */}
                                        <button
                                            onClick={handleExit}
                                            className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-[#024653]/40 hover:text-red-500 transition-all flex items-center gap-2"
                                        >
                                            <X size={12} className="lg:w-3.5 lg:h-3.5" />
                                            <span>Exit</span>
                                        </button>

                                        {/* NAVIGATION GROUP - FAR RIGHT */}
                                        <div className="flex items-center gap-4 lg:gap-8">
                                            {history.length > 0 && (
                                                <button
                                                    onClick={handleBack}
                                                    className="text-[10px] lg:text-xs font-semibold uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-all flex items-center gap-2 px-2 py-1"
                                                >
                                                    <ArrowLeft size={12} className="lg:w-3.5 lg:h-3.5" />
                                                    <span>Back</span>
                                                </button>
                                            )}

                                            <motion.button
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                onClick={action?.onClick || handleNext}
                                                disabled={action?.disabled || action?.isLoading}
                                                className={`
                                                    h-12 lg:h-14 rounded-xl flex items-center justify-center gap-3 lg:gap-4 px-8 lg:px-12 transition-all duration-300
                                                    ${(action?.disabled || action?.isLoading)
                                                        ? "bg-[#024653]/5 text-[#024653]/10 cursor-not-allowed"
                                                        : "bg-[#111111] text-white shadow-xl shadow-black/10"
                                                    }
                                                `}
                                            >
                                                <span className="text-[10px] lg:text-[11px] font-bold uppercase tracking-[0.2em]">{action?.label || "Continue"}</span>
                                                {!action?.isLoading && <ArrowRight size={16} strokeWidth={3} className="lg:w-[18px] lg:h-[18px]" />}
                                                {action?.isLoading && <div className="w-3 h-3 lg:w-4 lg:h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                                            </motion.button>
                                        </div>
                                    </div>

                                    {action?.secondaryContent && (
                                        <div className="w-full">
                                            {action.secondaryContent}
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {/* Debug (Visible only with special cursor) */}
            <div className="fixed bottom-0 left-0 p-2 text-[8px] opacity-0 hover:opacity-100 z-[9999] pointer-events-none bg-black text-white">
                Step: {currentStep} | Progress: {progress}% | History: {history.join(', ')}
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(2, 70, 83, 0.05); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(2, 70, 83, 0.1); }
            `}</style>
        </FormProvider>
    );
}
