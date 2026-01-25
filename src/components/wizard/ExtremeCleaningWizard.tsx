"use client";

import React, { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Star, Shield } from "lucide-react";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";

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

import { useSearchParams } from "next/navigation";

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
        if (urlType) return 2; // Zip and type provided, go to details
        return 1; // Only zip provided, go to service selection
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

    const nextStep = () => {
        setDirection(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => {
            if (prev === 0 && methods.getValues("serviceType")) return 2;
            if (prev === 0) return 1;
            if (prev === 1) return 2;
            if (prev === 2) return 3;
            if (prev === 3) return 4;
            if (prev === 4) return 5; // QuoteStep → DateStep
            if (prev === 5) return 6; // DateStep → AddressStep
            if (prev === 6) return 6; // AddressStep is final

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
            if (prev === 5) return 4; // DateStep → QuoteStep
            if (prev === 6) return 5; // AddressStep → DateStep
            if (prev === "returning_lookup") return 0;
            if (prev === "returning_select") return "returning_lookup";
            if (prev === "returning_config") return "returning_select";
            return 0;
        });
    };

    // Clean up fields when service type changes
    React.useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === "serviceType") {
                const newType = value.serviceType;
                if (newType === "residential") {
                    methods.setValue("smallPortfolio", []);
                    methods.setValue("commSqFt", "");
                } else if (newType === "commercial") {
                    methods.setValue("bedrooms", 1);
                    methods.setValue("bathrooms", 1);
                    methods.setValue("sqFt", 1000);
                    methods.setValue("smallPortfolio", []);
                } else if (newType === "property_mgmt") {
                    methods.setValue("bedrooms", 1);
                    methods.setValue("bathrooms", 1);
                    methods.setValue("sqFt", 1000);
                    methods.setValue("commSqFt", "");
                }
            }
        });
        return () => subscription.unsubscribe();
    }, [methods]);

    const goToReturning = () => {
        setDirection(1);
        setStep("returning_lookup");
    };

    const renderStep = () => {
        switch (step) {
            case 0: return <ZipStep onNext={nextStep} onReturning={goToReturning} />;
            case 1: return <ServiceStep onNext={nextStep} onBack={prevStep} />;
            case 2:
                const serviceType = methods.watch("serviceType");
                if (serviceType === "residential") return <ResidentialStep onNext={nextStep} onBack={prevStep} />;
                if (serviceType === "commercial") return <CommercialStep onNext={nextStep} onBack={prevStep} />;
                if (serviceType === "property_mgmt") return <PMSelectionStep onNext={nextStep} onBack={prevStep} />;
                return null;
            case 3: return <FrequencyStep onNext={nextStep} onBack={prevStep} />;
            case 4: return <QuoteStep onBack={prevStep} customerName={customerName} isFinalStep={false} onNext={nextStep} />;
            case 5: return <DateStep onNext={nextStep} onBack={prevStep} />;
            case 6: return <AddressStep onBack={prevStep} />;

            // Returning Flow
            case "returning_lookup": return <ReturningLookupStep onNext={nextStep} onBack={prevStep} setCustomerName={setCustomerName} />;
            case "returning_select": return <PropertySelectionStep
                onSelectSaved={nextStep}
                onStartNew={() => { methods.setValue("serviceType", "residential"); setStep(2); }}
                onBack={prevStep}
                customerName={customerName}
            />;
            case "returning_config": return <QuickConfigStep onNext={nextStep} onBack={prevStep} address="123 South Hill Dr" />;
            default: return null;
        }
    };

    // Calculate data for the quote card
    const data = methods.watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);

    // Dynamic Left Panel Content Logic
    const getLeftPanelContent = () => {
        const serviceType = data.serviceType;

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
                title: "Select Your",
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
                title: "Where should",
                accent: "we Sparkle?",
                description: "Finalize your cleaning schedule and secure your slot."
            },
            "returning_lookup": { title: "Welcome", accent: "Back.", description: "Access your saved properties and preferences." },
            "returning_select": { title: "Glad you're", accent: "Here.", description: "Select which property needs care today." },
            "returning_config": { title: "Almost", accent: "Done.", description: "Confirm your cleaning intensity and frequency." }
        };
        // @ts-ignore
        return content[step] || content[0];
    };

    const lp = getLeftPanelContent();

    return (
        <FormProvider {...methods}>
            <div className="w-full h-screen fixed inset-0 flex flex-col lg:flex-row bg-[#F9F8F2] overflow-hidden">
                {/* Left Panel */}
                <div className="hidden lg:flex w-[40%] bg-[#024653] relative flex-col justify-between p-12 text-white overflow-hidden shrink-0 border-r-4 border-[#05D16E]">
                    <AnimatePresence mode="wait">
                        <motion.div key="lp-content" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="relative z-10 flex flex-col h-full justify-between">
                            <div>
                                <div className="w-32 mb-12">
                                    <Image src="/brand/logo-full.png" alt="Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                                </div>
                                <h2 className="text-5xl font-black tracking-tighter leading-tight mb-6 uppercase text-white">
                                    {lp?.title} <br /> <span className="text-[#05D16E]">{lp?.accent}</span>
                                </h2>
                                <p className="text-white/50 font-medium text-base leading-relaxed max-w-xs">{lp?.description}</p>
                            </div>

                            {/* Optional: Show running total in bottom left for steps > 1 */}
                            {typeof step === 'number' && step > 1 && (
                                <div className="mt-auto pt-6 border-t border-white/20">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#05D16E] mb-1">Estimated Total</p>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-4xl font-black text-white">${totalPrice}</span>
                                        <span className="text-sm font-bold text-white/40">/service</span>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Panel */}
                <div className="flex-1 w-full lg:w-[60%] bg-[#F9F8F2] relative flex flex-col h-full overflow-hidden">
                    <a href="/" className="absolute top-6 right-6 z-50 p-3 rounded-full bg-white hover:bg-[#024653] hover:text-white transition-colors border-2 border-slate-100" title="Exit">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                    </a>

                    {/* Header with Progress */}
                    <div className="shrink-0 w-full px-6 py-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center bg-[#F9F8F2] z-40">
                        <div className="flex justify-start">
                            {step !== 0 && step !== "returning_lookup" && (
                                <button onClick={prevStep} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#024653]/60 hover:text-[#024653] transition-colors group py-2">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform"><path d="m15 18-6-6 6-6" /></svg> Back
                                </button>
                            )}
                        </div>

                        <div className="flex flex-col items-center gap-3 w-32 md:w-48">
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]/30">Step {typeof step === 'number' ? Math.min(step + 1, 7) : 1} of 7</span>
                            <div className="w-full h-1 bg-[#024653]/10">
                                <motion.div className="h-full bg-[#05D16E]" initial={{ width: 0 }} animate={{ width: typeof step === 'number' ? `${((Math.max(step, 0) + 1) / 7) * 100}%` : "14%" }} transition={{ duration: 0.5, ease: "easeInOut" }} />
                            </div>
                        </div>

                        <div className="flex justify-end"></div>
                    </div>

                    <div className="flex-1 flex flex-col p-4 md:p-8 lg:p-12 lg:px-20 h-full justify-center overflow-y-auto w-full max-w-4xl mx-auto">
                        <AnimatePresence mode="wait">
                            <motion.div key={step} initial={{ opacity: 0, scale: 0.98, y: 10 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 1.02, y: -10 }} transition={{ duration: 0.3 }} className="w-full">
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
