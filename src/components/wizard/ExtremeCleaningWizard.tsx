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
            if (prev === 4) return 5;
            if (prev === 5) return 5;

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
            if (prev === "returning_lookup") return 0;
            if (prev === "returning_select") return "returning_lookup";
            if (prev === "returning_config") return "returning_select";
            return 0;
        });
    };

    // Clean up fields when service type changes to avoid cross-contamination of data
    React.useEffect(() => {
        const subscription = methods.watch((value, { name }) => {
            if (name === "serviceType") {
                const newType = value.serviceType;
                // Reset fields not relevant to the new type
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
                return <QuoteStep onBack={prevStep} customerName={customerName} isFinalStep={false} onNext={nextStep} />;
            case 5:
                return <AddressStep onBack={prevStep} />;

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

        if (step === 4 || step === 5) return null; // Handled by summary view or final steps

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
                <div className="hidden lg:flex w-[40%] bg-[#024653] relative flex-col justify-between p-16 text-white overflow-hidden shrink-0 border-r border-white/5 shadow-2xl">
                    {/* Ambient Botanical Glow */}
                    <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-[#05D16E]/10 blur-[120px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-[#0E6168]/20 blur-[120px] rounded-full animate-pulse delay-700" />

                    <AnimatePresence mode="wait">
                        {step === 4 || step === 5 ? (
                            <motion.div
                                key="summary"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="relative z-10 flex flex-col h-full"
                            >
                                <div className="flex items-center gap-2 mb-6 opacity-80">
                                    <Image src="/brand/logo.png" alt="Logo" width={24} height={24} className="object-contain brightness-0 invert" />
                                    <span className="font-black tracking-widest text-[10px] uppercase text-white/60">Estimate Summary</span>
                                </div>

                                <div className="flex-1 flex flex-col justify-center space-y-8">
                                    <div>
                                        <div className="flex items-baseline gap-3 mb-2">
                                            <h2 className="text-7xl font-black tracking-tighter text-white drop-shadow-2xl shadow-[#05D16E]/10">${totalPrice}</h2>
                                            <span className="text-xl font-bold text-white/40 font-outfit">/service</span>
                                        </div>
                                        <div className="flex items-center gap-2 px-3 py-1 bg-[#05D16E]/10 border border-[#05D16E]/20 rounded-full w-fit">
                                            <Star size={12} className="fill-[#05D16E] text-[#05D16E]" />
                                            <span className="text-[#05D16E] font-black text-[9px] uppercase tracking-widest">Your Personalized Quote</span>
                                        </div>
                                    </div>

                                    <div className="space-y-5 py-8 border-y border-white/5">
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">Frequency</span>
                                            <span className="font-black bg-white/5 px-4 py-1.5 rounded-2xl text-[10px] uppercase text-white border border-white/5 tracking-widest">{selectedFreq?.label}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">Plan Type</span>
                                            <span className="font-black capitalize text-[#05D16E] text-sm tracking-tight">{data.cleaningType}</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">Size</span>
                                            <span className="font-black text-white text-sm tracking-tight">{data.sqFt} SQ FT</span>
                                        </div>
                                        <div className="flex justify-between items-center text-sm">
                                            <span className="text-white/40 font-black uppercase tracking-widest text-[10px]">Zip Code</span>
                                            <span className="font-black text-[#05D16E] text-sm tracking-widest">{data.zipCode}</span>
                                        </div>
                                    </div>

                                    <div className="pt-4">
                                        <div className="flex items-center gap-4 bg-white/5 p-6 rounded-[2.5rem] border border-white/5 backdrop-blur-md">
                                            <div className="p-3 bg-[#05D16E]/10 rounded-2xl border border-[#05D16E]/20"><Shield size={24} className="text-[#05D16E]" /></div>
                                            <div>
                                                <p className="font-black text-xs uppercase tracking-widest text-white mb-0.5">Extreme Guarantee</p>
                                                <p className="text-[10px] text-white/40 font-medium leading-relaxed">100% Satisfaction or we re-clean for free.</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3 }}
                                className="relative z-10 flex flex-col h-full justify-between"
                            >
                                <div>
                                    <div className="w-40 mb-12">
                                        <Image src="/brand/logo-full.png" alt="Extreme Cleaning Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                                    </div>
                                    <h2 className="text-5xl font-black tracking-tighter leading-[0.9] mb-6 uppercase text-white">
                                        {lp?.title} <br />
                                        <span className="text-[#05D16E]">{lp?.accent}</span>
                                    </h2>
                                    <p className="text-white/50 font-medium text-base leading-relaxed max-w-xs font-opensans">
                                        {lp?.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="p-8 bg-white/5 backdrop-blur-xl rounded-[2.5rem] border border-white/10 shadow-2xl">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-[#05D16E]/10 border border-[#05D16E]/20 rounded-xl"><Star size={16} className="text-[#05D16E] fill-[#05D16E]" /></div>
                                            <p className="font-black text-white text-[10px] uppercase tracking-widest">Client Centric</p>
                                        </div>
                                        <p className="text-[12px] text-white/40 leading-relaxed font-medium">
                                            Need specialized care? We offer <strong className="text-white">Deep Cleaning</strong> and <strong className="text-white">Premium Maintenance</strong>. Contact us for custom portfolio solutions.
                                        </p>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Close Button */}
                <a href="/" className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2.5 rounded-2xl bg-white hover:bg-[#024653] hover:text-white transition-all border border-slate-100 shadow-xl" title="Exit Wizard">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M18 6 6 18" />
                        <path d="m6 6 12 12" />
                    </svg>
                </a>

                {/* Right Panel - Wizard Form */}
                <div className="flex-1 w-full lg:w-[60%] bg-[#F9F8F2] relative flex flex-col min-h-screen overflow-y-auto">

                    {/* Unified Navigation Header */}
                    <div className="sticky top-0 z-20 w-full p-6 md:p-10 grid grid-cols-3 items-center bg-[#F9F8F2]/90 backdrop-blur-md">

                        {/* Left: Back Button */}
                        <div className="flex justify-start">
                            {step !== 0 && step !== "returning_lookup" && (
                                <button
                                    onClick={prevStep}
                                    className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 hover:text-[#05D16E] transition-all group"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1 transition-transform">
                                        <path d="m15 18-6-6 6-6" />
                                    </svg>
                                    Back
                                </button>
                            )}
                        </div>

                        {/* Center: Progress Bar */}
                        <div className="flex flex-col items-center gap-2 w-full max-w-[200px] mx-auto">
                            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-[#024653]/20">
                                Step {typeof step === 'number' ? Math.min(step + 1, 6) : 1} / 6
                            </span>
                            <div className="w-full h-1.5 bg-[#024653]/5 rounded-full overflow-hidden p-[1px]">
                                <motion.div
                                    className="h-full bg-[#05D16E] rounded-full shadow-[0_0_10px_rgba(5,209,110,0.3)]"
                                    initial={{ width: 0 }}
                                    animate={{
                                        width: typeof step === 'number'
                                            ? `${((Math.max(step, 0) + 1) / 6) * 100}%`
                                            : "16%"
                                    }}
                                    transition={{ duration: 0.8, ease: "circOut" }}
                                />
                            </div>
                        </div>

                        {/* Right: Spacer (to balance Back button) */}
                        <div className="flex justify-end"></div>
                    </div>

                    <div className="flex-1 flex flex-col p-6 lg:p-12 lg:px-20 pt-0 h-full justify-center">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={step}
                                initial={{ opacity: 0, scale: 0.98, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 1.02, y: -10 }}
                                transition={{ duration: 0.3, ease: "circOut" }}
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
