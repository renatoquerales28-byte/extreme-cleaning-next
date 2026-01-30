"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ArrowRight, Sparkles, X, AlertCircle, CheckCircle2 } from "lucide-react";
import { validatePromoCode, type ValidatePromoResult } from "@/app/actions/promotions";
import { toast } from "sonner";

interface QuoteStepProps {
    onNext: () => void;
}

export default function QuoteStep({ onNext }: QuoteStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pricing & Promo State
    const [config, setConfig] = useState<any>({});
    const [promoCode, setPromoCode] = useState("");
    const [isCheckingPromo, setIsCheckingPromo] = useState(false);
    const [promoError, setPromoError] = useState<string | null>(null);
    const [appliedDiscount, setAppliedDiscount] = useState<NonNullable<ValidatePromoResult['discount']> | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            const { getPricingConfig } = await import("@/app/actions/admin");
            const res = await getPricingConfig();
            if (res.success) setConfig(res.config);
        };
        fetchConfig();
    }, []);

    // Calculate Base Total
    const baseTotal = useMemo(() => {
        const { calculateTotal } = require("@/lib/utils/pricing");
        return calculateTotal(data, config);
    }, [data, config]);

    // Calculate Final Price with Discount
    const finalPrice = useMemo(() => {
        if (!baseTotal) return 0;
        if (!appliedDiscount) return baseTotal;

        let discountAmount = 0;
        if (appliedDiscount.type === 'percent') {
            discountAmount = (baseTotal * appliedDiscount.value) / 100;
        } else {
            discountAmount = appliedDiscount.value;
        }

        return Math.max(0, Math.round(baseTotal - discountAmount));
    }, [baseTotal, appliedDiscount]);

    const handleApplyPromo = async () => {
        if (!promoCode) return;
        setIsCheckingPromo(true);
        setPromoError(null);

        try {
            const result = await validatePromoCode(promoCode);
            if (result.success && result.discount) {
                setAppliedDiscount(result.discount);
                toast.success("Promo code applied!");
            } else {
                setPromoError(result.message || "Invalid code");
                setAppliedDiscount(null);
            }
        } catch (error) {
            setPromoError("Failed to validate code");
        } finally {
            setIsCheckingPromo(false);
        }
    };

    const handleNext = useCallback(async () => {
        setIsSubmitting(true);
        try {
            const { createLead, updateLead } = await import("@/app/actions/admin");

            // Save Promo Info to Form Context
            if (appliedDiscount) {
                setValue("promoCode", appliedDiscount.code);
                setValue("discountApplied", true);
                setValue("originalPrice", baseTotal);
            }
            setValue("totalPrice", finalPrice);


            const leadData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                serviceType: data.serviceType,
                frequency: data.frequency,
                totalPrice: finalPrice, // Save DISCOUNTED price
                details: {
                    ...data,
                    promoCode: appliedDiscount?.code,
                    discountApplied: !!appliedDiscount,
                    originalPrice: baseTotal,
                    finalPrice: finalPrice
                },
            };

            let res;
            if (data.leadId) {
                // Update existing lead
                res = await updateLead(Number(data.leadId), leadData);
            } else {
                // Create new lead
                res = await createLead(leadData);
            }

            if (res.success) {
                const newLeadId = (res as any).leadId;
                if (newLeadId) setValue("leadId", newLeadId);
                onNext();
            } else {
                console.error(res.error);
                toast.error("Something went wrong. Please try again.");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }, [data, onNext, setValue, finalPrice, baseTotal, appliedDiscount]);

    useEffect(() => {
        const isValid = data.firstName && data.lastName && data.email;
        setAction({
            label: "See My Price",
            disabled: !isValid,
            isLoading: isSubmitting,
            onClick: handleNext
        });
    }, [data.firstName, data.lastName, data.email, isSubmitting, setAction, handleNext]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Unlock <br /> <span className="text-[#05D16E]">Quote</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Enter details to see price</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">

                        {/* Promo Code Input - Moved Here */}
                        <div className="bg-slate-50 p-4 rounded-xl space-y-3">
                            <div className="flex items-center gap-2">
                                <Sparkles size={16} className="text-[#05D16E]" />
                                <span className="text-xs font-bold uppercase tracking-wider text-[#024653]">Have a Promo Code?</span>
                            </div>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={promoCode}
                                    onChange={(e) => {
                                        setPromoCode(e.target.value);
                                        setPromoError(null);
                                    }}
                                    disabled={!!appliedDiscount}
                                    placeholder="Enter code"
                                    className="flex-1 bg-white border-2 border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all uppercase placeholder:normal-case placeholder:font-medium"
                                />
                                {appliedDiscount ? (
                                    <button
                                        onClick={() => {
                                            setAppliedDiscount(null);
                                            setPromoCode("");
                                        }}
                                        className="bg-red-50 text-red-500 p-2 rounded-lg hover:bg-red-100 transition-colors"
                                    >
                                        <X size={18} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleApplyPromo}
                                        disabled={!promoCode || isCheckingPromo}
                                        className="bg-[#024653] text-white px-4 py-2 rounded-lg font-bold text-xs hover:bg-[#024653]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isCheckingPromo ? "..." : "Apply"}
                                    </button>
                                )}
                            </div>
                            {promoError && (
                                <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                                    <AlertCircle size={12} /> {promoError}
                                </p>
                            )}
                            {appliedDiscount && (
                                <div className="flex items-center justify-between text-xs font-bold text-[#05D16E] bg-[#05D16E]/10 p-2 rounded-lg">
                                    <span className="flex items-center gap-1"><CheckCircle2 size={12} /> Code Applied!</span>
                                    <span>-{appliedDiscount.type === 'percent' ? `${appliedDiscount.value}%` : `$${appliedDiscount.value}`}</span>
                                </div>
                            )}
                        </div>


                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">First Name</label>
                                <input
                                    {...register("firstName")}
                                    placeholder="Jane"
                                    className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium contact-input"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Last Name</label>
                                <input
                                    {...register("lastName")}
                                    placeholder="Doe"
                                    className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium contact-input"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Email Address</label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium contact-input"
                            />
                        </div>


                    </div>
                </div>
            </div>
            <style jsx>{`
                .contact-input:-webkit-autofill,
                .contact-input:-webkit-autofill:hover, 
                .contact-input:-webkit-autofill:focus, 
                .contact-input:-webkit-autofill:active {
                    -webkit-box-shadow: 0 0 0 1000px white inset !important;
                    -webkit-text-fill-color: #024653 !important;
                    font-size: 1rem !important;
                    font-weight: 700 !important;
                    background-color: transparent !important;
                    background-clip: content-box !important;
                }
            `}</style>
        </div >
    );
}
