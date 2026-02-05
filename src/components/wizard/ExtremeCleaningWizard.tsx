"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { calculateTotal } from "@/lib/utils/pricing";
import { Open_Sans } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useWizardAction, WizardActionProvider } from './WizardActionContext';
import { ArrowLeft, ArrowRight, Loader2, X } from 'lucide-react';
import { Toaster } from "sonner";

// NEW ARCHITECTURE IMPORTS
import { useWizardEngine } from "@/hooks/useWizardEngine";
import { StepId } from "@/lib/wizard/config";

const openSans = Open_Sans({ subsets: ["latin"] });

export default function ExtremeCleaningWizard() {
    const searchParams = useSearchParams();

    // Initial URL params for pre-filling
    const urlZip = searchParams.get("zip");
    const urlType = searchParams.get("type");
    const urlIntensity = searchParams.get("intensity");

    const methods = useForm<WizardData>({
        resolver: zodResolver(wizardSchema),
        defaultValues: {
            step: 0,
            zipCode: urlZip || "",
            serviceType: (urlType as any) || "",
            bedrooms: 1,
            bathrooms: 1,
            sqFt: 1000,
            cleaningType: (urlIntensity as any) || "standard",
            frequency: "biweekly",
            smallPortfolio: [],
        },
    });

    return (
        <WizardActionProvider>
            <FormProvider {...methods}>
                <WizardContent />
            </FormProvider>
            <Toaster richColors position="top-center" />
        </WizardActionProvider>
    );
}

import HelpCallbackModal from "./HelpCallbackModal";

function WizardContent() {
    const searchParams = useSearchParams();
    const mode = searchParams.get("mode");
    const urlZip = searchParams.get("zip");

    // Help Modal State
    const [isHelpOpen, setIsHelpOpen] = React.useState(false);

    const { watch, setValue } = useFormContext<WizardData>();
    const data = watch();

    // Determine Start Step based on URL params - NO FLASHING
    let initialStep: StepId = 'zip';
    if (mode === "returning") {
        initialStep = 'returning_lookup';
    } else if (urlZip && urlZip.length === 5) {
        initialStep = 'service';
    }

    // Initialize Engine with calculated start step
    const {
        stepId,
        stepConfig,
        goNext,
        goBack,
        goToStep,
        progress,
        isFirstStep
    } = useWizardEngine(initialStep);

    // Database Warm-up
    useEffect(() => {
        const warmUp = async () => {
            import('@/app/actions/admin').then(({ warmUpServer }) => warmUpServer());
        };
        warmUp();
    }, []);

    // Price Calculation
    const [pricingConfig, setPricingConfig] = React.useState<any>({});
    useEffect(() => {
        import("@/app/actions/admin").then(async ({ getPricingConfig }) => {
            const res = await getPricingConfig();
            if (res.success) setPricingConfig(res.config);
        });
    }, []);
    const totalPrice = calculateTotal(data, pricingConfig);

    const [returningData, setReturningData] = React.useState<{ customer: any; properties: any[] } | null>(null);

    // Guard against undefined stepConfig
    if (!stepConfig) return null;

    const CurrentStepComponent = stepConfig.component;

    // Handlers
    const handleReturningFound = (res: any) => {
        setReturningData(res);
        setValue("firstName", res.customer.firstName);
        setValue("lastName", res.customer.lastName);
        setValue("email", res.customer.email);
        setValue("phone", res.customer.phone);
        goNext();
    };

    const handlePropertySelect = (prop: any) => {
        if (prop === 0) {
            // New Property for existing customer
            setValue("serviceType", "residential");
            goToStep("service");
        } else {
            // Pre-fill found property
            setValue("address", prop.address);
            setValue("city", prop.city);
            setValue("zipCode", prop.zipCode);
            setValue("bedrooms", prop.bedrooms || 1);
            setValue("bathrooms", prop.bathrooms || 1);
            setValue("sqFt", prop.sqFt || 1000);
            setValue("serviceType", prop.serviceType || "residential");
            goNext();
        }
    };

    const handleClose = () => window.location.href = '/';

    return (
        <div className={`w-full h-screen fixed inset-0 flex flex-col lg:flex-row bg-[#F9F8F2] overflow-hidden text-[#024653] ${openSans.className}`}>
            <HelpCallbackModal open={isHelpOpen} onOpenChange={setIsHelpOpen} />

            {/* LEFT SIDE: Information & Branding */}
            <div className="hidden lg:flex w-[40%] bg-[#F9F8F2] relative flex-col justify-between p-16 xl:p-24 overflow-hidden shrink-0">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stepId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="relative z-10 flex flex-col h-full justify-between"
                    >
                        <div>
                            {/* Logo */}
                            <div className="w-32 mb-16 cursor-pointer" onClick={() => window.location.href = '/'}>
                                <Image src="/brand/logo-full.png" alt="Logo" width={200} height={60} className="object-contain" />
                            </div>

                            <div className="space-y-6">
                                <h2 className="text-4xl xl:text-5xl font-normal tracking-tight leading-[1.1]">
                                    {stepId === 'returning_select' && returningData?.customer?.firstName ? (
                                        <>
                                            Welcome back, <br />
                                            <span className="italic font-light">{returningData.customer.firstName}</span>
                                        </>
                                    ) : (
                                        <>
                                            {stepConfig.title} <br />
                                            <span className="italic font-light">{stepConfig.accent}</span>
                                        </>
                                    )}
                                </h2>
                                <p className="text-[#024653]/70 font-normal text-lg leading-relaxed max-w-sm">
                                    {stepConfig.description}
                                </p>
                            </div>
                        </div>

                        {/* Desktop Help Trigger - Refined */}
                        <div className="relative z-10 pt-8 border-t border-[#024653]/10">
                            <button
                                onClick={() => setIsHelpOpen(true)}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-12 h-12 rounded-full bg-white shadow-sm flex items-center justify-center group-hover:bg-[#05D16E] transition-all duration-300">
                                    <span className="text-xl">👋</span>
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] uppercase tracking-widest font-bold text-[#05D16E]">Need Assistance?</p>
                                    <p className="text-base font-medium opacity-60 group-hover:opacity-100 transition-opacity text-[#024653]">Text us right now</p>
                                </div>
                            </button>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* RIGHT SIDE: Wizard Content area */}
            <div className="flex-1 w-full lg:w-[60%] h-full bg-white/50 lg:bg-[#F9F8F2] relative flex flex-col overflow-hidden">

                {/* Header: Controls & Progress */}
                <div className="shrink-0 w-full px-8 py-8 md:px-16 grid grid-cols-2 md:grid-cols-[1fr_2fr_1fr] items-center z-50 relative">
                    {/* Back Button */}
                    <div className="flex justify-start">
                        {!isFirstStep && stepId !== 'success' && (
                            <button
                                onClick={goBack}
                                className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-[#024653]/50 hover:text-[#024653] transition-colors group"
                            >
                                <ArrowLeft className="group-hover:-translate-x-1 transition-transform" size={14} />
                                Back
                            </button>
                        )}
                    </div>

                    {/* Progress Indicator */}
                    <div className="hidden md:flex justify-center flex-col items-center gap-2">
                        <div className="w-48 h-1 bg-[#024653]/5 rounded-full overflow-hidden">
                            <motion.div
                                className="h-full bg-[#05D16E]"
                                initial={{ width: 0 }}
                                animate={{ width: `${progress}%` }}
                                transition={{ duration: 0.5, ease: "easeOut" }}
                            />
                        </div>
                        <span className="text-[9px] uppercase tracking-[0.2em] font-bold text-[#024653]/30">Step Progress</span>
                    </div>

                    {/* Close Button */}
                    <div className="flex justify-end">
                        <button
                            onClick={handleClose}
                            className="w-10 h-10 rounded-full bg-white shadow-sm border border-[#024653]/5 flex items-center justify-center hover:bg-[#024653]/5 transition-all active:scale-95 group"
                        >
                            <X size={18} className="text-[#024653] opacity-40 group-hover:opacity-100 transition-opacity" />
                        </button>
                    </div>
                </div>

                {/* Main Step Transition Area */}
                <div className="flex-1 w-full h-full relative overflow-y-auto overflow-x-hidden md:px-16 pb-32">
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={stepId}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -15 }}
                            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                            className="h-full"
                        >
                            <CurrentStepComponent
                                onNext={goNext}
                                onBack={goBack}
                                onReturning={() => goToStep('returning_lookup')}
                                onFound={handleReturningFound}
                                onSelect={handlePropertySelect}
                                onEditStep={(id: StepId) => goToStep(id)}
                                totalPrice={totalPrice}
                                onSubmit={goNext}
                                // Returning Customer props
                                properties={returningData?.properties || []}
                                customerName={returningData?.customer?.firstName || "Customer"}
                            />
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Footer: Main CTA */}
                <WizardFooter onHelp={() => setIsHelpOpen(true)} />
            </div>
        </div>
    );
}

function WizardFooter({ onHelp }: { onHelp: () => void }) {
    const { action } = useWizardAction();
    const hideMain = (action as any)?.hideMainButton;

    return (
        <div className="absolute bottom-0 left-0 w-full p-8 md:px-16 md:pb-12 z-50 pointer-events-none">
            <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-end pointer-events-auto">
                {!hideMain && (
                    <button
                        onClick={action?.onClick}
                        disabled={action?.disabled || action?.isLoading}
                        className={`
                            w-full md:w-auto px-10 py-4 rounded-2xl font-bold text-xs uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-md hover:-translate-y-0.5
                            ${action?.disabled
                                ? "bg-gray-100 text-[#024653]/20 cursor-not-allowed"
                                : "bg-[#05D16E] text-[#024653] hover:bg-[#04bd63]"
                            }
                        `}
                    >
                        {action?.isLoading ? (
                            <>Processing <Loader2 className="animate-spin" size={16} /></>
                        ) : (
                            <>
                                {action?.label || "Continue"}
                                {!action?.disabled && (action?.icon || <ArrowRight size={16} className="stroke-[3px]" />)}
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
