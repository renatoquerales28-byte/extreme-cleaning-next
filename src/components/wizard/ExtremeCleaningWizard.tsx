"use client";

import React, { useEffect } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { calculateTotal } from "@/lib/utils/pricing";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useWizardAction, WizardActionProvider } from './WizardActionContext';
import { ArrowRight, Loader2 } from 'lucide-react';
import { Toaster } from "sonner";

// NEW ARCHITECTURE IMPORTS
import { useWizardEngine } from "@/hooks/useWizardEngine";
import { StepId } from "@/lib/wizard/config";

const inter = Inter({ subsets: ["latin"] });

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

    // Handle deep linking / initial routing (Cleanup: removed the flash-causing useEffect)

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
        <div className={`w-full h-screen fixed inset-0 flex flex-col lg:flex-row bg-[#F9F8F2] overflow-hidden ${inter.className}`}>
            <HelpCallbackModal open={isHelpOpen} onOpenChange={setIsHelpOpen} />

            {/* LEFT PANEL */}
            <div className="hidden lg:flex w-1/3 bg-[#024653] relative flex-col justify-between p-12 text-white overflow-hidden shrink-0 border-r-4 border-[#10f081]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={stepId}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="relative z-10 flex flex-col h-full justify-between"
                    >
                        <div>
                            <div className="w-24 mb-10">
                                <Image src="/brand/logo-full.png" alt="Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter leading-tight mb-6 uppercase text-white">
                                {stepConfig.title} <br /> <span className="text-[#10f081]">{stepConfig.accent}</span>
                            </h2>
                            <p className="text-white/80 font-medium text-base leading-relaxed max-w-xs">{stepConfig.description}</p>
                        </div>
                    </motion.div>
                </AnimatePresence>

                {/* Desktop Help Trigger */}
                <div className="relative z-10 pt-8 border-t border-white/10">
                    <button
                        onClick={() => setIsHelpOpen(true)}
                        className="flex items-center gap-3 group"
                    >
                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-[#05D16E] transition-colors">
                            <span className="text-lg">👋</span>
                        </div>
                        <div className="text-left">
                            <p className="text-xs font-bold uppercase tracking-widest text-[#05D16E]">Need Help?</p>
                            <p className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">Text us now</p>
                        </div>
                    </button>
                </div>
            </div>

            {/* RIGHT PANEL */}
            <div className="flex-1 w-full lg:w-2/3 h-screen bg-[#F9F8F2] relative flex flex-col overflow-hidden">

                {/* Header */}
                <div className="shrink-0 w-full px-6 py-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center bg-[#F9F8F2] z-50 relative">
                    <div className="flex justify-start">
                        {!isFirstStep && stepId !== 'success' && (
                            <button onClick={goBack} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#024653]/60 hover:text-[#024653] transition-colors group py-2">
                                <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} strokeWidth={3} /> Back
                            </button>
                        )}
                    </div>
                    <div className="flex justify-center w-full">
                        {stepId !== 'success' && (
                            <div className="flex flex-col items-center gap-1">
                                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/30">Progress</span>
                                <div className="w-24 h-1 bg-[#024653]/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-[#05D16E] transition-all duration-500" style={{ width: `${progress}%` }} />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex justify-end">
                        <button onClick={handleClose} className="w-8 h-8 rounded-full bg-[#024653]/5 flex items-center justify-center hover:bg-[#024653]/10 transition-colors cursor-pointer active:scale-95">
                            <span className="text-lg font-bold text-[#024653] mb-1">×</span>
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                        key={stepId}
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -20, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="flex-1 w-full relative overflow-hidden"
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

                {/* Footer (Actions) */}
                <WizardFooter onHelp={() => setIsHelpOpen(true)} />

            </div>
        </div>
    );
}

function WizardFooter({ onHelp }: { onHelp: () => void }) {
    const { action } = useWizardAction();
    const hideMain = (action as any)?.hideMainButton;

    return (
        <div className="shrink-0 w-full bg-white border-t border-slate-100 p-6 md:px-12 pb-8 z-50">
            <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">

                {/* Mobile Help Trigger */}
                <button
                    onClick={onHelp}
                    className="md:hidden text-[10px] font-black uppercase tracking-widest text-[#05D16E] hover:text-[#024653] transition-colors py-2"
                >
                    Need Help? Call us.
                </button>

                <div className="hidden md:block">
                    {action?.secondaryContent}
                </div>
                {!hideMain && (
                    <button
                        onClick={action?.onClick}
                        disabled={action?.disabled || action?.isLoading}
                        className={`
                            w-full md:w-auto px-8 py-4 rounded-full font-black text-xs uppercase tracking-[0.15em] transition-all flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:-translate-y-0.5
                            ${action?.disabled
                                ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                                : "bg-[#024653] text-white hover:bg-[#02333d] shadow-[#024653]/20"
                            }
                        `}
                    >
                        {action?.isLoading ? (
                            <>Processing <Loader2 className="animate-spin" size={16} /></>
                        ) : (
                            <>
                                {action?.label || "Continue"}
                                {!action?.disabled && (action?.icon || <ArrowRight size={16} strokeWidth={3} />)}
                            </>
                        )}
                    </button>
                )}
            </div>
        </div>
    );
}
