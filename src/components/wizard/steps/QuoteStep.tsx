import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { Sparkles, X, AlertCircle, CheckCircle2, User, Gift } from "lucide-react";
import { validatePromoCode, type ValidatePromoResult } from "@/app/actions/promotions";
import { toast } from "sonner";
import { FEATURE_FLAGS } from "@/lib/config/features";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

interface QuoteStepProps {
    onNext: () => void;
}

export default function QuoteStep({ onNext }: QuoteStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);
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

    const baseTotal = useMemo(() => {
        const { calculateTotal } = require("@/lib/utils/pricing");
        return calculateTotal(data, config);
    }, [data, config]);

    const finalPrice = useMemo(() => {
        if (!baseTotal) return 0;
        if (!appliedDiscount) return baseTotal;
        let discountAmount = appliedDiscount.type === 'percent'
            ? (baseTotal * appliedDiscount.value) / 100
            : appliedDiscount.value;
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
                totalPrice: finalPrice,
                details: { ...data, promoCode: appliedDiscount?.code, discountApplied: !!appliedDiscount, originalPrice: baseTotal, finalPrice: finalPrice },
            };

            let res = data.leadId
                ? await updateLead(Number(data.leadId), leadData)
                : await createLead(leadData);

            if (res.success) {
                if ((res as any).leadId) setValue("leadId", (res as any).leadId);
                onNext();
            } else {
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
            label: "Calculate My Quote",
            disabled: !isValid || isSubmitting,
            isLoading: isSubmitting,
            onClick: handleNext
        });
    }, [data.firstName, data.lastName, data.email, isSubmitting, setAction, handleNext]);

    return (
        <div className="h-full w-full flex items-start justify-center p-6 md:p-0 md:pt-10">
            <div className="w-full max-w-lg pb-32">
                {/* Contact Form */}
                <div className="bg-white p-8 rounded-xl border border-[#024653]/5 shadow-sm space-y-6 flex flex-col justify-center">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                            <User size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-[#024653]">Your Info</h3>
                    </div>

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40">First Name</label>
                                <input {...register("firstName")} placeholder="Jane" className="w-full bg-[#F9F8F2] p-4 rounded-xl font-bold text-[#024653] border-none outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all placeholder:text-[#024653]/10" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40">Last Name</label>
                                <input {...register("lastName")} placeholder="Doe" className="w-full bg-[#F9F8F2] p-4 rounded-xl font-bold text-[#024653] border-none outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all placeholder:text-[#024653]/10" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40">Email Address</label>
                            <input {...register("email")} type="email" placeholder="jane@example.com" className="w-full bg-[#F9F8F2] p-4 rounded-xl font-bold text-[#024653] border-none outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all placeholder:text-[#024653]/10" />
                        </div>
                        <p className="text-xs text-[#024653]/40 leading-relaxed italic pt-2">
                            * Your final quote is calculated based on home size and selected frequency.
                        </p>
                    </div>
                </div>
            </div>

            <style jsx>{`
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #F9F8F2 inset !important;
                    -webkit-text-fill-color: #024653 !important;
                }
            `}</style>
        </div>
    );
}
