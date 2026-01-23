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

export default function ExtremeCleaningWizard() {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(0);

    const methods = useForm<WizardData>({
        resolver: zodResolver(wizardSchema),
        defaultValues: {
            step: 0,
            zipCode: "",
            bedrooms: 1,
            bathrooms: 1,
            sqFt: 1000,
            cleaningType: "regular",
            frequency: "biweekly",
            smallPortfolio: [],
        },
    });

    const nextStep = () => {
        setDirection(1);
        setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setDirection(-1);
        setStep((prev) => Math.max(0, prev - 1));
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return <ZipStep onNext={nextStep} />;
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
                return <QuoteStep onBack={prevStep} />;
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

        const content = {
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
            }
        };

        return content[step as keyof typeof content] || content[0];
    };

    const lp = getLeftPanelContent();

    return (
        <FormProvider {...methods}>
            {/* Main Card Container - Fixed Dimensions for "Window" feel */}
            <div className="w-full max-w-6xl h-[680px] max-h-[95vh] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden relative z-10 ring-1 ring-slate-900/5">

                {/* Left Panel - Dynamic Content */}
                <div className="hidden lg:flex w-[40%] bg-brand-dark relative flex-col justify-between p-10 text-white overflow-hidden transition-all duration-500">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/90" />

                    <AnimatePresence mode="wait">
                        {step === 4 ? (
                            // QUOTE SUMMARY CARD VIEW (Step 4)
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                className="relative z-10 flex flex-col h-full duration-500"
                            >
                                <div className="flex items-center gap-2 mb-6 opacity-80">
                                    <Image src="/brand/logo.png" alt="Logo" width={24} height={24} className="object-contain" />
                                    <span className="font-bold tracking-widest text-xs uppercase">Estimate Summary</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-6">
                                    <div>
                                        <div className="flex items-baseline gap-2 mb-1">
                                            <h2 className="text-6xl font-black tracking-tighter text-white">${totalPrice}</h2>
                                            <span className="text-xl font-bold text-slate-400">/service</span>
                                        </div>
                                        <p className="text-brand-light font-bold text-sm tracking-wide flex items-center gap-2">
                                            <Star size={14} className="fill-brand-light" /> Your Personalized Quote
                                        </p>
                                    </div>

                                    <div className="space-y-4 py-6 border-t border-white/10">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Frequency</span>
                                            <span className="font-black bg-white/10 px-3 py-1 rounded-full text-xs">{selectedFreq?.label}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Plan Type</span>
                                            <span className="font-black capitalize">{data.cleaningType}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Size</span>
                                            <span className="font-black">{data.sqFt} sq ft</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-slate-400 font-bold uppercase tracking-wider text-xs">Zip Code</span>
                                            <span className="font-black text-brand-light">{data.zipCode}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/10">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-emerald-500/20 rounded-lg"><Shield size={20} className="text-emerald-500" /></div>
                                        <div>
                                            <p className="font-black text-xs uppercase tracking-widest">Extreme Guarantee</p>
                                            <p className="text-[10px] text-slate-400 font-medium">100% Satisfaction or we re-clean for free.</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            // DYNAMIC MARKETING VIEW (Steps 0-3)
                            <motion.div
                                key={step + (data.serviceType || "")}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.4 }}
                                className="relative z-10 flex flex-col h-full justify-between"
                            >
                                <div>
                                    <div className="w-40 mb-8">
                                        <Image src="/brand/logo-full.png" alt="Extreme Cleaning Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                                    </div>
                                    <h2 className="text-4xl font-black tracking-tighter leading-tight mb-4 capitalize">
                                        {lp?.title} <br />
                                        <span className="text-brand-light">{lp?.accent}</span>
                                    </h2>
                                    <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-xs">
                                        {lp?.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} className="fill-accent text-accent" />)}
                                    </div>
                                    <p className="font-bold text-[10px] tracking-widest uppercase opacity-80">Trusted by 500+ Neighbors</p>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Right Panel - Wizard Form */}
                <div className="flex-1 w-full lg:w-[60%] bg-white relative flex flex-col p-6 md:p-10">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={step}
                            custom={direction}
                            initial={{ opacity: 0, x: direction > 0 ? 30 : -30, filter: "blur(4px)", scale: 0.98 }}
                            animate={{ opacity: 1, x: 0, filter: "blur(0px)", scale: 1 }}
                            exit={{ opacity: 0, x: direction > 0 ? -30 : 30, filter: "blur(4px)", scale: 0.98 }}
                            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                            className="flex-1 flex flex-col justify-center min-h-0"
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </FormProvider>
    );
}
