"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { X, ArrowLeft, ArrowRight, Target } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { WIZARD_FLOW, StepId, STEP_ORDER } from "@/lib/wizard/config-v2";
import { WizardActionProvider, useWizardAction } from "../WizardActionContext";

export default function ExtremeCleaningWizard() {
    return (
        <WizardActionProvider>
            <WizardNavigation />
        </WizardActionProvider>
    );
}

function WizardNavigation() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const initialZip = searchParams.get("zip");
    const initialType = searchParams.get("type") as any;
    const initialIntensity = searchParams.get("intensity") as any;

    const [currentStep, setCurrentStep] = useState<StepId>("zip");
    const [history, setHistory] = useState<StepId[]>([]);
    const [customerData, setCustomerData] = useState<any>(null);
    const { action } = useWizardAction();

    const methods = useForm<WizardData>({
        resolver: zodResolver(wizardSchema),
        defaultValues: {
            zipCode: initialZip || "",
            serviceType: initialType || undefined,
            cleaningType: initialIntensity || "standard",
            extras: [],
            propertyCount: 1,
            floors: 1,
            frequency: "onetime",
            mode: "new"
        },
        mode: "onChange"
    });

    const { watch, trigger } = methods;

    useEffect(() => {
        if (initialZip && initialZip.length === 5 && currentStep === "zip") {
            // Respect pre-selected service if zip is also provided
            let nextStep: StepId = "service";
            if (initialType) {
                if (initialType === 'commercial') nextStep = 'commercial_details';
                else if (initialType === 'property_mgmt') nextStep = 'pm_details';
                else nextStep = 'space_config';
            }
            setCurrentStep(nextStep);
            setHistory(["zip"]);
        }
    }, [initialZip, currentStep, initialType]);

    const handleNext = async () => {
        const freshData = methods.getValues();
        const stepConfig = WIZARD_FLOW[currentStep];
        if (!stepConfig) return;

        // Step-specific validation
        const validationMap: Record<string, any[]> = {
            zip: ["zipCode"],
            price_and_quote: ["firstName", "lastName", "email"],
            logistics: ["address", "city", "phone", "serviceDate", "serviceTime"],
            space_config: ["bedrooms", "bathrooms", "sqFt", "cleaningType", "frequency"],
            commercial_details: ["businessType", "commSqFt", "floors"],
            pm_details: ["propertyCount"],
            extras: []
        };

        const fieldsToValidate = (validationMap as any)[currentStep] || [];

        const isValid = await trigger(fieldsToValidate);
        if (!isValid) {
            const errors = methods.formState.errors;
            const firstError = Object.values(errors)[0];
            if (firstError) toast.error(`Please check: ${firstError.message || "Required fields"}`);
            return;
        }

        // Progressive Lead Capture
        if (['price_and_quote', 'logistics', 'review'].includes(currentStep)) {
            try {
                const { createLead, updateLead } = await import("@/app/actions/admin");
                const leadId = methods.getValues("leadId");

                const leadData = {
                    firstName: freshData.firstName,
                    lastName: freshData.lastName,
                    email: freshData.email,
                    phone: freshData.phone,
                    serviceType: freshData.serviceType,
                    frequency: freshData.frequency,
                    totalPrice: freshData.totalPrice,
                    details: freshData,
                };

                const res = leadId
                    ? await updateLead(Number(leadId), leadData)
                    : await createLead(leadData);

                if (res.success && (res as any).leadId) {
                    methods.setValue("leadId", (res as any).leadId);
                }
            } catch (error) {
                console.error("Lead sync error:", error);
            }
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

    const handleReturning = () => {
        setHistory(prev => [...prev, currentStep]);
        setCurrentStep('returning_lookup');
    };

    const config = WIZARD_FLOW[currentStep];
    const ActiveStep = config?.component;

    // progress calculation using STEP_ORDER
    const progressIndex = STEP_ORDER.indexOf(currentStep);
    const progress = progressIndex >= 0 ? (progressIndex / (STEP_ORDER.length - 1)) * 100 : 0;

    const stepProps: any = {
        onNext: handleNext,
        onEditStep: handleEditStep,
        onBack: handleBack,
        onReturning: handleReturning,
    };

    if (currentStep === 'returning_lookup') {
        stepProps.onFound = (data: any) => {
            setCustomerData(data);
            handleNext();
        };
    }

    if (currentStep === 'returning_select') {
        stepProps.customerName = customerData?.customer?.firstName || "Guest";
        stepProps.properties = customerData?.properties || [];
        stepProps.onSelect = (prop: any) => {
            if (prop) {
                methods.setValue("address", prop.address);
                methods.setValue("city", prop.city);
                methods.setValue("zipCode", prop.zipCode);
                // Pre-fill personal info if available in Vault
                if (customerData?.customer) {
                    methods.setValue("firstName", customerData.customer.firstName);
                    methods.setValue("lastName", customerData.customer.lastName);
                    methods.setValue("email", customerData.customer.email);
                    methods.setValue("phone", customerData.customer.phone);
                }
            }
            handleNext();
        };
    }

    if (!config) {
        return <div className="p-20">Error: Configuration for step &quot;{currentStep}&quot; not found.</div>;
    }

    return (
        <FormProvider {...methods}>
            <div className="fixed inset-0 bg-white text-[#024653] font-sans selection:bg-[#05D16E]/30 overflow-hidden flex flex-col lg:flex-row">

                {/* LOGO LIBRE - Outside Container */}
                <Link
                    href="/"
                    className="fixed top-8 left-8 lg:top-12 lg:left-12 w-28 h-10 z-[100] cursor-pointer hover:opacity-60 transition-all grayscale contrast-125"
                >
                    <Image src="/brand/logo-full.png" alt="ECS" fill className="object-contain" priority />
                </Link>

                {/* LEFT PANE - Context Side */}
                <div className="w-full lg:w-[450px] lg:h-full bg-[#F9F8F2] border-b lg:border-b-0 lg:border-r border-[#024653]/5 flex flex-col p-8 lg:p-16 justify-end relative shrink-0">
                    <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-40">
                        <div className="absolute top-[-10%] left-[-10%] w-full h-full bg-gradient-to-br from-[#05D16E]/10 via-transparent to-transparent blur-[120px]" />
                    </div>

                    <div className="relative z-10 space-y-4 max-w-xs mb-12">
                        <h1 className="text-4xl lg:text-5xl font-bold tracking-tight text-[#024653] leading-tight text-balance">
                            {config.title}{" "}
                            {config.accent && (
                                <span className="italic font-light whitespace-nowrap opacity-30">{config.accent}</span>
                            )}
                        </h1>
                        <p className="text-sm lg:text-base font-light text-[#024653]/40 leading-relaxed">
                            {config.description}
                        </p>
                    </div>

                    <div className="relative z-10 w-full">
                        <div className="flex items-center gap-4">
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
                            <div className="w-full max-w-4xl mx-auto px-6 lg:px-10 py-6 lg:py-10 pb-20">
                                {/* Active Stage (The Step) */}
                                <div className="w-full">
                                    {ActiveStep ? <ActiveStep {...stepProps} /> : <div>Component Stage Missing</div>}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    {currentStep !== 'success' && (
                        <div className="shrink-0 p-8 lg:px-20 border-t border-[#024653]/5 bg-white relative z-20">
                            <div className="max-w-3xl mx-auto flex flex-col gap-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-8">
                                        {history.length > 0 && (
                                            <button
                                                onClick={handleBack}
                                                className="text-xs font-bold uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-all flex items-center gap-2"
                                            >
                                                <ArrowLeft size={14} />
                                                <span>Back</span>
                                            </button>
                                        )}

                                        <Link
                                            href="/"
                                            className="text-xs font-bold uppercase tracking-widest text-[#024653]/40 hover:text-red-500 transition-all flex items-center gap-2"
                                        >
                                            {history.length === 0 && <X size={14} />}
                                            <span>Exit</span>
                                        </Link>
                                    </div>

                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={action?.onClick || handleNext}
                                        disabled={action?.disabled || action?.isLoading}
                                        className={`
                                            h-14 rounded-xl flex items-center justify-center gap-4 px-12 transition-all duration-300
                                            ${(action?.disabled || action?.isLoading)
                                                ? "bg-[#024653]/5 text-[#024653]/10 cursor-not-allowed"
                                                : "bg-[#111111] text-white shadow-xl shadow-black/10"
                                            }
                                        `}
                                    >
                                        <span className="text-[11px] font-bold uppercase tracking-[0.2em]">{action?.label || "Continue"}</span>
                                        {!action?.isLoading && <ArrowRight size={18} strokeWidth={3} />}
                                        {action?.isLoading && <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />}
                                    </motion.button>
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
            </div>

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
