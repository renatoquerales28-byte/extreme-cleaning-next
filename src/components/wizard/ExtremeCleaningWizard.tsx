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
        setStep((prev) => {
            if (prev === 0 && methods.getValues("serviceType")) return 2;
            if (prev === 0) return 1;
            if (prev === 1) return 2;
            if (prev === 2) return 3;
            if (prev === 3) return 4;

            // Returning flow transitions
            if (prev === "returning_lookup") return "returning_select";
            if (prev === "returning_select") return "returning_config";
            if (prev === "returning_config") return 4;

            return prev;
        });
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => {
            if (prev === 1) return 0;
            if (prev === 2) {
                if (urlType) return 0; // Skip service selection if it was pre-selected
                return 1;
            }
            if (prev === 3) return 2;
            if (prev === 4) {
                // Determine if we came from returning flow or normal flow
                // For now, if we have a name, maybe we were returning? 
                // Better to have a explicit state, but let's just go to frequency if in doubt
                return 3;
            }
            if (prev === "returning_lookup") return 0;
            if (prev === "returning_select") return "returning_lookup";
            if (prev === "returning_config") return "returning_select";
            return 0;
        });
    };

    const goToReturning = () => {
        setDirection(1);
        setStep("returning_lookup");
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <ZipStep onNext={nextStep} onReturning={goToReturning} />;
            case 1:
                return <ServiceStep onNext={nextStep} onBack={prevStep} />;
            case 2:
                const serviceType = methods.watch("serviceType");
                if (serviceType === "residential") return <ResidentialStep onNext={nextStep} onBack={prevStep} />;
                if (serviceType === "commercial") return <CommercialStep onNext={nextStep} onBack={prevStep} />;
                if (serviceType === "property_mgmt") return <PMSelectionStep onNext={nextStep} onBack={prevStep} />;
                return null;
            case 3:
                return <FrequencyStep onNext={nextStep} onBack={prevStep} />;
            case 4:
                return <QuoteStep onBack={prevStep} customerName={customerName} />;

            // Returning Flow
            case "returning_lookup":
                return <ReturningLookupStep onNext={nextStep} onBack={prevStep} setCustomerName={setCustomerName} />;
            case "returning_select":
                return <PropertySelectionStep
                    onSelectSaved={nextStep}
                    onStartNew={() => {
                        methods.setValue("serviceType", "residential");
                        setStep(2);
                    }}
                    onBack={prevStep}
                    customerName={customerName}
                />;
            case "returning_config":
                return <QuickConfigStep onNext={nextStep} onBack={prevStep} address="123 South Hill Dr" />;

            default:
                return null;
        }
    };

    // Calculate data for the quote card
    const data = methods.watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);

    // Dynamic Left Panel Content Logic
    const getLeftPanelContent = () => {
        const serviceType = data.serviceType;

        if (step === 4) return null; // Handled by summary view

        interface PanelContent {
            title: string;
            accent: string;
            description: string;
        }

        const content: Record<string | number, PanelContent> = {
            0: {
                title: "Expert Cleaning,",
                accent: "Simplified.",
                description: "Get your personalized quote in under 60 seconds. Premium service for residential and commercial spaces."
            },
            1: {
                title: serviceType === "residential" ? "Home" : serviceType === "commercial" ? "Business" : "Property",
                accent: "Solutions.",
                description: serviceType === "residential"
                    ? "Premium house cleaning tailored to your lifestyle. We treat your home like our own."
                    : serviceType === "commercial"
                        ? "Professional office and retail cleaning to keep your business shining for clients."
                        : "Efficient turnover and management cleaning for Airbnbs and property portfolios."
            },
            2: {
                title: "Tailored to",
                accent: "Your Space.",
                description: serviceType === "residential"
                    ? `Configuring for a ${data.bedrooms} bed, ${data.bathrooms} bath home. Accurate sizing ensures a perfect clean.`
                    : "Tell us the scope of your commercial needs so we can provide the best team for the job."
            },
            3: {
                title: "consistency",
                accent: "is Key.",
                description: "Save up to 20% by booking recurring services. A cleaner space, more often, for less."
            },
            "returning_lookup": {
                title: "Welcome",
                accent: "Back.",
                description: "Access your saved properties and preferences. We&apos;ve missed you!"
            },
            "returning_select": {
                title: "Glad you&apos;re",
                accent: "Here.",
                description: "Select which property needs some Extreme care today, or add a new one to your portfolio."
            },
            "returning_config": {
                title: "Almost",
                accent: "Done.",
                description: "Confirm your cleaning intensity and frequency. We'll handle the rest."
            }
        };

        return content[step] || content[0];
    };

    const lp = getLeftPanelContent();

    return (
        <FormProvider {...methods}>
            {/* Main Full-Screen Split Layout */}
            <div className="w-full min-h-screen flex flex-col lg:flex-row bg-[#F9F8F2] relative overflow-hidden">

                {/* Left Panel - Hidden on Mobile, Fixed Width on Desktop */}
                <div className="hidden lg:flex w-[40%] bg-brand-dark relative flex-col justify-between p-16 text-white overflow-hidden shrink-0 border-r border-white/5">
                    <div className="absolute inset-0 bg-black/5 pointer-events-none" />

                    <AnimatePresence mode="wait">
                        {step === 4 ? (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-2 mb-6 opacity-80">
                                    <Image src="/brand/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
                                    <span className="font-bold tracking-widest text-xs uppercase">Estimate Summary</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-6">
                                    <div>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <h2 className="text-6xl font-black tracking-tighter text-white">${totalPrice}</h2>
                                            <span className="text-xl font-bold text-slate-300">/service</span>
                                        </div>
                                        <p className="text-brand-light font-bold text-sm tracking-wide flex items-center gap-2">
                                            <Star size={14} className="fill-brand-light" /> Your Personalized Quote
                                        </p>
                                    </div>

                                    <div className="space-y-4 py-6 border-t border-white/10">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-200 font-bold uppercase tracking-wider text-xs">Frequency</span>
                                            <span className="font-black bg-white/10 px-3 py-1 rounded-full text-xs text-white">{selectedFreq?.label}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-200 font-bold uppercase tracking-wider text-xs">Plan Type</span>
                                            <span className="font-black capitalize text-white">{data.cleaningType}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-200 font-bold uppercase tracking-wider text-xs">Size</span>
                                            <span className="font-black text-white">{data.sqFt} sq ft</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-200 font-bold uppercase tracking-wider text-xs">Zip Code</span>
                                            <span className="font-black text-brand-light">{data.zipCode}</span>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-white/10">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-emerald-500/20 rounded-lg"><Shield size={20} className="text-emerald-400" /></div>
                                            <div>
                                                <p className="font-black text-xs uppercase tracking-widest text-white">Extreme Guarantee</p>
                                                <p className="text-[10px] text-slate-100 font-medium">100% Satisfaction or we re-clean for free.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10 flex flex-col h-full justify-between"
                            >
                                <div>
                                    <div className="w-40 mb-8">
                                        <Image src="/brand/logo-full.png" alt="Extreme Cleaning Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tighter leading-tight mb-4 capitalize text-white">
                                        {lp?.title} <br />
                                        <span className="text-brand-light">{lp?.accent}</span>
                                    </h2>
                                    <p className="text-slate-100 font-medium text-sm leading-relaxed max-w-xs shadow-black drop-shadow-md">
                                        {lp?.description}
                                    </p>
                                </div>

                                <div className="space-y-4 pt-12">
                                    <div className="p-4 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-1.5 bg-accent/20 rounded-lg"><Star size={14} className="text-accent fill-accent" /></div>
                                            <p className="font-black text-white text-xs uppercase tracking-wider">Emergency Services</p>
                                        </div>
                                        <p className="text-[11px] text-slate-100 leading-snug font-medium">
                                            Need a clean ASAP? We offer <strong>Emergency</strong> and <strong>After-Party</strong> cleanup services. Call us directly for immediate dispatch.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Close Button */}
                <a href="/" className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 rounded-full bg-white hover:bg-slate-50 text-slate-600 transition-colors border border-slate-100" title="Exit Wizard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </a>

                {/* Right Panel - Wizard Form */}
                <div className="flex-1 w-full lg:w-[60%] bg-[#F9F8F2] relative flex flex-col min-h-screen overflow-y-auto">

                    {/* Unified Navigation Header */}
                    <div className="sticky top-0 z-20 w-full p-6 md:p-8 grid grid-cols-3 items-center bg-[#F9F8F2]/80 backdrop-blur-sm">

                        {/* Left: Back Button */}
                        <div className="flex justify-start">
                            {step !== 0 && step !== "returning_lookup" && (
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 hover:text-brand-dark transition-colors group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                    Back
                                </button>
                            )}
                        </div>

                        {/* Center: Progress Bar */}
                        <div className="flex flex-col items-center gap-1.5 w-full max-w-[200px] mx-auto">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-500">
                                Step {typeof step === 'number' ? Math.min(step + 1, 5) : 1} of 5
                            </span>
                            <div className="w-full h-1 bg-slate-200 rounded-full overflow-hidden">
                                <motion.div
                                    className="h-full bg-brand-light"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: typeof step === 'number'
                                            ? `${((Math.max(step, 0) + 1) / 5) * 100}%`
                                            : "20%"
                                    }}
                                    transition={{ duration: 0.5, ease: "anticipate" }}
                                />
                            </div>
                        </div>

                        {/* Right: Spacer (to balance Back button) */}
                        <div className="flex justify-end"></div>
                    </div>

                    <div className="flex-1 flex flex-col p-6 lg:p-8 lg:px-12 pt-0 h-full justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex-1 flex flex-col justify-center min-h-0"
                            >
                                {renderStep()}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </FormProvider>
    );
}
