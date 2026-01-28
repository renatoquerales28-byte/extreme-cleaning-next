"use client";

import React, { useState, useEffect } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema, type WizardData } from "@/lib/schemas/wizard";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { Inter } from "next/font/google";
import { useSearchParams, useRouter } from "next/navigation";
import { useWizardAction, WizardActionProvider } from './WizardActionContext';
import { ArrowRight, Loader2 } from 'lucide-react';

const inter = Inter({ subsets: ["latin"] });

import ZipStep from "./steps/ZipStep";
import ServiceStep from "./steps/ServiceStep";
import ResidentialStep from "./steps/ResidentialStep";
import CommercialStep from "./steps/CommercialStep";
import PMSelectionStep from "./steps/PMSelectionStep";
import FrequencyStep from "./steps/FrequencyStep";
import PriceStep from "./steps/PriceStep";
import QuoteStep from "./steps/QuoteStep";
import ReturningLookupStep from "./steps/ReturningLookupStep";
import PropertySelectionStep from "./steps/PropertySelectionStep";
import QuickConfigStep from "./steps/QuickConfigStep";
import DateStep from "./steps/DateStep";
import AddressStep from "./steps/AddressStep";
import ReviewStep from "./steps/ReviewStep";
import SuccessStep from "./steps/SuccessStep";
import { Toaster } from "sonner";

const TOTAL_STEPS = 10; // 0 to 9 (Review) + Success (10)

import CleaningTypeStep from "./steps/CleaningTypeStep";

// ... (imports remain)

export default function ExtremeCleaningWizard() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const urlZip = searchParams.get("zip");
    const urlType = searchParams.get("type"); // residential, commercial, property_mgmt
    const urlIntensity = searchParams.get("intensity"); // regular, deep, move

    // Update initial step logic if needed, but 0/1/2 logic needs shift
    const getInitialStep = () => {
        const mode = searchParams.get("mode");
        if (mode === "returning") return "returning_lookup";

        if (!urlZip) return 0;
        if (urlType) return 3; // Was 2, now 3 (Property Details)
        // If we want to jump to cleaning type selection after type url param?
        // Let's stick to flow: Zip -> Service -> Cleaning -> Property
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
            cleaningType: (urlIntensity as any) || "standard",
            frequency: "biweekly",
            smallPortfolio: [],
        },
    });

    const data = methods.watch();

    // OPTIMIZACIÓN: Warm-up de la conexión a DB al cargar el wizard
    useEffect(() => {
        const warmUp = async () => {
            try {
                console.log('🔥 Pre-warming database connection...');
                const start = Date.now();
                // Importar dinámicamente para no bloquear el render inicial
                const { warmUpServer } = await import('@/app/actions/admin');
                const result = await warmUpServer();
                const duration = Date.now() - start;

                if (result.success) {
                    console.log(`✅ Database ready in ${duration}ms`);
                } else {
                    console.warn(`⚠️ Database warm-up failed (${duration}ms)`);
                }
            } catch (error) {
                console.error('❌ Failed to warm up database:', error);
            }
        };

        // Ejecutar warm-up en background (no bloquea la UI)
        warmUp();
    }, []); // Solo ejecutar una vez al montar

    const nextStep = () => {
        setDirection(1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => {
            if (prev === 0 && methods.getValues("serviceType")) return 3; // Skip if type known? Maybe go to 2
            if (prev === 0) return 1; // Zip -> Service

            // Step 1 (Service) -> Step 2 (Cleaning Type)
            // But Commercial/PM might skip Cleaning Type or have different one?
            // User requested "After step 1, must exist basic clean...". Assuming for all or residential.
            // Let's assume for Residential mainly. Commercial usually has custom specs.
            if (prev === 1) {
                const sType = methods.getValues("serviceType");
                if (sType === "commercial" || sType === "property_mgmt") return 3; // Skip cleaning type for comm/pm for now unless specified
                return 2; // Residential go to Cleaning Type
            }

            if (prev === 2) return 3; // Cleaning Type -> Property Details
            if (prev === 3) return 4; // Property -> Frequency
            if (prev === 4) return 5; // Frequency -> Quote
            if (prev === 5) return 6; // Quote -> Price
            if (prev === 6) return 7; // Price -> Date
            if (prev === 7) return 8; // Date -> Address
            if (prev === 8) return 9; // Address -> Review
            if (prev === 9) return 10; // Review -> Success
            if (prev === 10) return 10;

            // Returning flow transitions
            if (prev === "returning_lookup") return "returning_select";
            if (prev === "returning_select") return "returning_config";
            if (prev === "returning_config") return 5; // Go to Quote (Step 5)

            return prev;
        });
    };

    const prevStep = () => {
        setDirection(-1);
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setStep((prev) => {
            if (prev === 1) return 0;
            if (prev === 2) return 1; // Cleaning -> Service
            if (prev === 3) {
                const sType = methods.getValues("serviceType");
                if (sType === "commercial" || sType === "property_mgmt") return 1; // Comm skip cleaning type
                return 2; // Residential go back to Cleaning Type
            }
            if (prev === 4) return 3;
            if (prev === 5) {
                return customerName ? "returning_config" : 4;
            }
            if (prev === 6) return 5;
            if (prev === 7) return 6;
            if (prev === 8) return 7;
            if (prev === 9) return 8;
            if (prev === 10) return 10;

            if (prev === "returning_lookup") return 0;
            if (prev === "returning_select") return "returning_lookup";
            if (prev === "returning_config") return "returning_select";
            return 0;
        });
    };

    // ... (useEffect sync remains)

    const renderStep = () => {
        switch (step) {
            case 0: return <ZipStep onNext={nextStep} onReturning={goToReturning} />;
            case 1: return <ServiceStep onNext={nextStep} />;
            case 2: return <CleaningTypeStep onNext={nextStep} />;
            case 3:
                const serviceType = methods.watch("serviceType");
                if (serviceType === "residential") return <ResidentialStep onNext={nextStep} />;
                if (serviceType === "commercial") return <CommercialStep onNext={nextStep} />;
                if (serviceType === "property_mgmt") return <PMSelectionStep onNext={nextStep} />;
                return null;
            case 4: return <FrequencyStep onNext={nextStep} />;
            case 5: return <QuoteStep onNext={nextStep} />;
            case 6: return <PriceStep onNext={nextStep} totalPrice={totalPrice} />;
            case 7: return <DateStep onNext={nextStep} />;
            case 8: return <AddressStep onSubmit={() => nextStep()} />;
            case 9: return <ReviewStep onNext={nextStep} onEditStep={(s) => setStep(s)} />;
            case 10: return <SuccessStep />;

            // Returning Flow logic updated
            case "returning_lookup": return <ReturningLookupStep
                onBack={prevStep}
                onFound={(data: any) => { setCustomerName(data.name); nextStep(); }}
            />;
            case "returning_select": return <PropertySelectionStep
                onSelect={(id) => {
                    if (id === 0) {
                        methods.setValue("serviceType", "residential");
                        setStep(3); // Start new residential flow at Property Details (Skip cleaning type? make user choose?)
                        // User probably wants to choose cleaning type for new property
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

    // ... (pricing logic remains)

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
                title: "Select",
                accent: "Intensity.",
                description: "From a quick refresh to a deep scrub."
            },
            3: {
                title: "Tell us about",
                accent: "Your Space.",
                description: "Customize your cleaning plan for a perfect fit."
            },
            4: {
                title: "Select",
                accent: "Frequency.",
                description: "Save up to 20% with our recurring care plans."
            },
            5: {
                title: "Unlock your",
                accent: "Quote.",
                description: "Enter your details to view your instant price."
            },
            6: {
                title: "Your Final",
                accent: "Estimate.",
                description: "Premium Care, Guaranteed Quality. No hidden fees."
            },
            7: {
                title: "When should",
                accent: "we Clean?",
                description: "Select your preferred date and time for the service."
            },
            8: {
                title: "Location",
                accent: "Details.",
                description: "Finalize your cleaning schedule and secure your slot."
            },
            9: {
                title: "Almost",
                accent: "Done.",
                description: "Please review your details before confirming."
            },
            10: {
                title: "All",
                accent: "Set!",
                description: "Your appointment has been confirmed."
            },
            "returning_lookup": { title: "Welcome", accent: "Back.", description: "Access your saved properties and preferences." },
            "returning_select": { title: "Glad you're", accent: "Here.", description: "Select which property needs care today." },
            "returning_config": { title: "Almost", accent: "Done.", description: "Confirm your cleaning intensity and frequency." }
        };

        let activeContent: any = (content as any)[currentStep] || content[0];

        // Specific overrides for Step 3 based on Service Type
        if (currentStep === 3) {
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
                onClose={() => window.location.href = '/'}
            />
            <Toaster richColors position="top-center" />
        </WizardActionProvider>
    );
}

function WizardLayout({ lp, step, totalPrice, prevStep, renderStep, className, methods, onClose }: any) {
    const { action } = useWizardAction();

    // 0-8 are steps (9 total). 9 is success (no progress bar needed ideally or full).
    const progressBarWidth = typeof step === 'number' && step < 9 ? ((step + 1) / 9) * 100 : 100;

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


                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Right Panel */}
                <div className="flex-1 w-full lg:w-[60%] h-screen bg-[#F9F8F2] relative flex flex-col overflow-hidden">
                    {/* Header with Progress */}
                    <div className="shrink-0 w-full px-6 py-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center bg-[#F9F8F2] z-50 relative">
                        <div className="flex justify-start">
                            {step !== 0 && step !== "returning_lookup" && step !== 9 && (
                                <button onClick={prevStep} className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.2em] text-[#024653]/60 hover:text-[#024653] transition-colors group py-2">
                                    <ArrowRight className="rotate-180 group-hover:-translate-x-1 transition-transform" size={16} strokeWidth={3} /> Back
                                </button>
                            )}
                        </div>
                        <div className="flex justify-center w-full">
                            {typeof step === 'number' && step < 9 && (
                                <div className="flex flex-col items-center gap-1">
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/30">Step {step + 1} of 9</span>
                                    <div className="w-24 h-1 bg-[#024653]/5 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#05D16E] transition-all duration-500" style={{ width: `${progressBarWidth}%` }} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="flex justify-end">
                            <button onClick={onClose} className="w-8 h-8 rounded-full bg-[#024653]/5 flex items-center justify-center hover:bg-[#024653]/10 transition-colors cursor-pointer active:scale-95">
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
