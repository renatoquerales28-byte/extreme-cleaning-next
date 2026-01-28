"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { Inter } from "next/font/google";
import { useSearchParams } from "next/navigation";
import { useWizardAction, WizardActionProvider } from './WizardActionContext';
import { ArrowRight, Loader2 } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

import ZipStep from "./steps/ZipStep";
import ServiceStep from "./steps/ServiceStep";
import ResidentialStep from "./steps/ResidentialStep";
import CommercialStep from "./steps/CommercialStep";
import PMSelectionStep from "./steps/PMSelectionStep";
import FrequencyStep from "./steps/FrequencyStep";
import QuoteStep from "./steps/QuoteStep";
import ReturningLookupStep from "./steps/ReturningLookupStep";
import PropertySelectionStep from "./steps/PropertySelectionStep";
import QuickConfigStep from "./steps/QuickConfigStep";
import DateStep from "./steps/DateStep";
import AddressStep from "./steps/AddressStep";
import ReviewStep from "./steps/ReviewStep";
import SuccessStep from "./steps/SuccessStep";
import { Toaster } from "sonner";

const TOTAL_STEPS = 8; // 0 to 7 (Review) + Success (8)

export default function ExtremeCleaningWizard() {
    const searchParams = useSearchParams();
    const urlZip = searchParams.get("zip");
    const urlType = searchParams.get("type"); // residential, commercial, property_mgmt
    const urlIntensity = searchParams.get("intensity"); // regular, deep, move

    // Logic to determine initial step
    const getInitialStep = () => {
        const mode = searchParams.get("mode");
        if (mode === "returning") return "returning_lookup";

        if (!urlZip) return 0;
        if (urlType) return 2;
        return 1;
    };

    const [step, setStep] = useState<number | string>(getInitialStep());
    const [direction, setDirection] = useState(0);
    const [customerName, setCustomerName] = useState("");

    const methods = useForm<WizardData>({
        resolver: zodResolver(wizardSchema),
        defaultValues: {
            step: typeof getInitialStep() === 'number' ? getInitialStep() as number : 0,
            zipCode: urlZip || "",
            serviceType: (urlType as any) || "",
            bedrooms: 1,
            bathrooms: 1,
            sqFt: 1000,
            cleaningType: (urlIntensity as any) || "regular",
            frequency: "biweekly",
            smallPortfolio: [],
        },
    });

    const data = methods.watch();

    // Persist to LocalStorage
    useEffect(() => {
        const subscription = methods.watch((value) => {
            if (typeof window !== 'undefined') {
                localStorage.setItem("wizard-data", JSON.stringify(value));
            }
        });
        return () => subscription.unsubscribe();
    }, [methods]);

    // Hydrate from LocalStorage
    useEffect(() => {
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem("wizard-data");
            if (saved) {
                try {
                    const parsed = JSON.parse(saved);
                    // Only restore if user is not in a 'new' flow (step 0 with no url params)
                    // Or just verify if parsed has meaningful data.
                    // Merging logic:
                    if (parsed.step < 8) { // Don't restore if finished
                        methods.reset({ ...parsed, ...methods.getValues() }); // Keep current defaults if missing
                        setStep(parsed.step); // Restore step
                    }
                } catch (e) {
                    console.error("Failed to parse wizard data", e);
                }
            }
        }
    }, [methods]);

    // Clear Storage on Success
    useEffect(() => {
        if (step === 8) {
            localStorage.removeItem("wizard-data");
        }
    }, [step]);


    const nextStep = () => {
        setDirection(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => {
            if (prev === 0 && methods.getValues("serviceType")) return 2;
            if (prev === 0) return 1;
            if (prev === 1) return 2;
            if (prev === 2) return 3;
            if (prev === 3) return 4;
            if (prev === 4) return 5;
            if (prev === 5) return 6;
            if (prev === 6) return 7; // Address -> Review
            if (prev === 7) return 8; // Review -> Success
            if (prev === 8) return 8;

            // Returning flow transitions
            if (prev === "returning_lookup") return "returning_select";
            if (prev === "returning_select") return "returning_config";
            if (prev === "returning_config") return 4;

            return prev;
        });
    };

    const prevStep = () => {
        setDirection(-1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => {
            if (prev === 1) return 0;
            if (prev === 2) {
                if (urlType) return 0;
                return 1;
            }
            if (prev === 3) return 2;
            if (prev === 4) {
                return customerName ? "returning_config" : 3;
            }
            if (prev === 5) return 4;
            if (prev === 6) return 5;
            if (prev === 7) return 6; // Review -> Address
            if (prev === 8) return 8; // Can't go back from success

            if (prev === "returning_lookup") return 0;
            if (prev === "returning_select") return "returning_lookup";
            if (prev === "returning_config") return "returning_select";
            return 0;
        });
    };

    // Sync step changes to form state (so it saves to LS)
    useEffect(() => {
        const current = step;
        if (typeof current === 'number') {
            methods.setValue("step", current);
        }
    }, [step, methods]);

    const goToReturning = () => {
        setStep("returning_lookup");
    };

    const renderStep = () => {
        switch (step) {
            case 0: return <ZipStep onNext={nextStep} onReturning={goToReturning} />;
            case 1: return <ServiceStep onNext={nextStep} />;
            case 2:
                const serviceType = methods.watch("serviceType");
                if (serviceType === "residential") return <ResidentialStep onNext={nextStep} />;
                if (serviceType === "commercial") return <CommercialStep onNext={nextStep} />;
                if (serviceType === "property_mgmt") return <PMSelectionStep onNext={nextStep} />;
                return null;
            case 3: return <FrequencyStep onNext={nextStep} />;
            case 4: return <QuoteStep onNext={nextStep} />;
            case 5: return <DateStep onNext={nextStep} />;
            case 6: return <AddressStep onSubmit={() => nextStep()} />;
            case 7: return <ReviewStep onNext={nextStep} onEditStep={(s) => setStep(s)} />;
            case 8: return <SuccessStep />;

            // Returning Flow
            case "returning_lookup": return <ReturningLookupStep
                onBack={prevStep}
                onFound={(data: any) => { setCustomerName(data.name); nextStep(); }}
            />;
            case "returning_select": return <PropertySelectionStep
                onSelect={(id) => {
                    if (id === 0) {
                        methods.setValue("serviceType", "residential");
                        setStep(2);
                    } else {
                        nextStep();
                    }
                }}
                onBack={prevStep}
                customerName={customerName}
            />;
            case "returning_config": return <QuickConfigStep onNext={nextStep} />;
            default: return null;
        }
    };

    // Calculate dynamic pricing config (simulated or real)
    const [pricingConfig, setPricingConfig] = useState<any>({});
    useEffect(() => {
        import("@/app/actions/admin").then(async ({ getPricingConfig }) => {
            const res = await getPricingConfig();
            if (res.success) setPricingConfig(res.config);
        });
    }, []);

    const totalPrice = calculateTotal(data, pricingConfig);

    // Dynamic Left Panel Content Logic
    const getLeftPanelContent = (currentStep: number | string, sType?: string) => {
        const content = {
            0: {
                title: "Where is the",
                accent: "Sparkle Needed?",
                description: "Enter your zip code to check availability in the Spokane area."
            },
            1: {
                title: "Choose Your",
                accent: "Service.",
                description: "Select the type of space we'll be transforming today."
            },
            2: {
                title: "Tell us about",
                accent: "Your Space.",
                description: "Customize your cleaning plan for a perfect fit."
            },
            3: {
                title: "Select",
                accent: "Frequency.",
                description: "Save up to 20% with our recurring care plans."
            },
            4: {
                title: "Your Final",
                accent: "Estimate.",
                description: "Premium Care, Guaranteed Quality. No hidden fees."
            },
            5: {
                title: "When should",
                accent: "we Clean?",
                description: "Select your preferred date and time for the service."
            },
            6: {
                title: "Location",
                accent: "Details.",
                description: "Finalize your cleaning schedule and secure your slot."
            },
            7: {
                title: "Almost",
                accent: "Done.",
                description: "Please review your details before confirming."
            },
            8: {
                title: "All",
                accent: "Set!",
                description: "Your appointment has been confirmed."
            },
            "returning_lookup": { title: "Welcome", accent: "Back.", description: "Access your saved properties and preferences." },
            "returning_select": { title: "Glad you're", accent: "Here.", description: "Select which property needs care today." },
            "returning_config": { title: "Almost", accent: "Done.", description: "Confirm your cleaning intensity and frequency." }
        };

        let activeContent: any = (content as any)[currentStep] || content[0];

        // Specific overrides for Step 2 based on Service Type
        if (currentStep === 2) {
            if (sType === "commercial") {
                activeContent = {
                    title: "Commercial",
                    accent: "Specs.",
                    description: "Tell us about your facility size.",
                };
            } else if (sType === "property_mgmt") {
                activeContent = {
                    title: "Property",
                    accent: "Management.",
                    description: "Volume pricing for pros.",
                };
            } else {
                // Default Residential
                activeContent = {
                    title: "Home",
                    accent: "Details.",
                    description: "Bedrooms, bathrooms, and size.",
                };
            }
        }

        return activeContent;
    };

    const lp = getLeftPanelContent(step, data.serviceType);

    return (
        <WizardActionProvider>
            <WizardLayout
                lp={lp}
                step={step}
                totalPrice={totalPrice}
                prevStep={prevStep}
                renderStep={renderStep}
                className={inter.className}
                methods={methods}
            />
            <Toaster richColors position="top-center" />
        </WizardActionProvider>
    );
}

function WizardLayout({ lp, step, totalPrice, prevStep, renderStep, className, methods }: any) {
    const { action } = useWizardAction();

    // 0-7 are steps (8 total). 8 is success (no progress bar needed ideally or full).
    const progressBarWidth = typeof step === 'number' && step < 8 ? ((step + 1) / 8) * 100 : 100;

    return (
        <FormProvider {...methods}>
            <div className={`w-full h-screen fixed inset-0 flex flex-col lg:flex-row bg-[#F9F8F2] overflow-hidden ${className}`}>
                {/* Left Panel */}
                <div className="hidden lg:flex w-[40%] bg-[#024653] relative flex-col justify-between p-12 text-white overflow-hidden shrink-0 border-r-4 border-[#10f081]">
                    <AnimatePresence mode="wait">
                        <motion.div key="lp-content" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-24 mb-10">
                                    <Image src="/brand/logo-full.png" alt="Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter leading-tight mb-6 uppercase text-white">
                                    {lp?.title} <br /> <span className="text-[#10f081]">{lp?.accent}</span>
                                </h2>
                                <p className="text-white/80 font-medium text-base leading-relaxed max-w-xs">{lp?.description}</p>
                            </div>

                            {/* Optional: Show running total in bottom left for steps > 1 */}
                            {typeof step === 'number' && step > 1 && step < 8 && (
                                <div className="mt-auto pt-6 border-t border-white/10">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#10f081] mb-1">Estimated Total</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-white">${totalPrice}</span>
                                        <span className="text-sm font-bold text-white/70">/service</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Panel */}
                <div className="flex-1 w-full lg:w-[60%] h-screen bg-[#F9F8F2] relative flex flex-col overflow-hidden">
                    {/* Header with Progress */}
                    <div className="shrink-0 w-full px-6 py-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center bg-[#F9F8F2] z-40">
                        <div className="flex justify-start">
                            {step !== 0 && step !== "returning_lookup" && step !== 8 && (
                                <button onClick={prevStep} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#024653]/60 hover:text-[#024653] transition-colors group py-2">
                                    <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} strokeWidth={3} /> Back
                                </button>
                            )}
                        </div>
                        <div className="flex justify-center w-full">
                            {typeof step === 'number' && step < 8 && (
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/30">Step {step + 1} of 8</span>
                                    <div className="w-24 h-1 bg-[#024653]/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#05D16E] transition-all duration-500" style={{ width: `${progressBarWidth}%` }} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button className="w-8 h-8 rounded-full bg-[#024653]/5 flex items-center justify-center hover:bg-[#024653]/10 transition-colors">
                                <span className="text-lg font-bold text-[#024653] mb-1">×</span>
                            </button>
                        </div>
                    </div>

                    {/* Step Content */}
                    <AnimatePresence mode="wait" initial={false}>
                        <motion.div
                            key={step}
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -20, opacity: 0 }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                            className="flex-1 w-full relative overflow-hidden"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>

                    {/* Footer for Actions */}
                    <div className="shrink-0 w-full bg-white border-t border-slate-100 p-6 md:px-12 pb-8 z-50">
                        <div className="max-w-xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                            <div className="hidden md:block">
                                {action?.secondaryContent}
                            </div>
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
                        </div>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
