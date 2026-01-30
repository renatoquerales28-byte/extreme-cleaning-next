"use client";

import React, { useEffect, useState, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { CheckCircle2, Pencil, Calendar, MapPin, User, Home, Sparkles, X, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { calculateTotal } from "@/lib/utils/pricing";
import { toast } from "sonner";
import { updateLead, createLead, getPricingConfig } from "@/app/actions/admin";
import { submitBooking } from "@/app/actions/booking";
import { StepId } from "@/lib/wizard/config";
import { validatePromoCode, type ValidatePromoResult } from "@/app/actions/promotions";

interface ReviewStepProps {
    onNext: () => void;
    onEditStep: (step: StepId) => void;
}

const Section = ({ title, icon: Icon, children, stepId, onEdit }: { title: string, icon: any, children: React.ReactNode, stepId: StepId, onEdit: (id: StepId) => void }) => (
    <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 relative group">
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(stepId);
            }}
            className="absolute top-6 right-6 p-2 z-20 bg-slate-50 text-[#024653]/40 rounded-full hover:bg-[#024653] hover:text-white transition-colors cursor-pointer"
        >
            <Pencil size={14} />
        </button>
        <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-[#05D16E]/10 rounded-xl">
                <Icon size={18} className="text-[#05D16E]" />
            </div>
            <h3 className="text-sm font-black uppercase tracking-wider text-[#024653]">{title}</h3>
        </div>
        <div className="pl-12 space-y-1">
            {children}
        </div>
    </div>
);

export default function ReviewStep({ onNext, onEditStep }: ReviewStepProps) {
    const { watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Re-calculate total to display accurate price
    const [total, setTotal] = useState<number | null>(null);

    // Promo Code State
    const [promoCode, setPromoCode] = useState("");
    const [isCheckingPromo, setIsCheckingPromo] = useState(false);
    const [promoError, setPromoError] = useState<string | null>(null);
    const [appliedDiscount, setAppliedDiscount] = useState<NonNullable<ValidatePromoResult['discount']> | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            const res = await getPricingConfig();
            const config = res.success ? res.config : {};
            setTotal(calculateTotal(data, config));
        };
        fetchConfig();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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

    const finalPrice = useMemo(() => {
        if (!total) return 0;
        if (!appliedDiscount) return total;

        let discountAmount = 0;
        if (appliedDiscount.type === 'percent') {
            discountAmount = (total * appliedDiscount.value) / 100;
        } else {
            discountAmount = appliedDiscount.value;
        }

        // Ensure price doesn't go below 0
        return Math.max(0, Math.round(total - discountAmount));
    }, [total, appliedDiscount]);

    useEffect(() => {
        setAction({
            label: isSubmitting ? "Finalizing..." : "Confirm Booking",
            disabled: isSubmitting,
            isLoading: isSubmitting,
            icon: <CheckCircle2 size={18} strokeWidth={2.5} />,
            onClick: async () => {
                setIsSubmitting(true);
                const toastId = toast.loading("Securing your slot...");
                const processStart = Date.now();

                try {
                    console.log('🚀 [BOOKING] Starting process at', new Date().toISOString());

                    // Preparar datos
                    const t1 = Date.now();

                    const enrichedDetails = {
                        ...data,
                        promoCode: appliedDiscount?.code,
                        discountApplied: !!appliedDiscount,
                        originalPrice: total,
                        finalPrice: finalPrice
                    };

                    const dbPayload = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        serviceType: data.serviceType,
                        frequency: data.frequency,
                        totalPrice: finalPrice || 0,
                        status: "booked" as const,
                        serviceDate: data.serviceDate ? new Date(data.serviceDate) : undefined,
                        serviceTime: data.serviceTime,
                        details: enrichedDetails
                    };
                    console.log(`✅ [BOOKING] Data prepared in ${Date.now() - t1}ms`);

                    // Guardar en base de datos
                    const t2 = Date.now();
                    console.log('📝 [BOOKING] Saving to database...');

                    let dbSuccess = false;
                    let dbError = null;

                    try {
                        if (data.leadId) {
                            console.log(`📝 [BOOKING] Updating lead ${data.leadId}...`);
                            const res = await updateLead(Number(data.leadId), {
                                status: "booked",
                                totalPrice: finalPrice || 0,
                                serviceDate: dbPayload.serviceDate,
                                serviceTime: data.serviceTime,
                                details: enrichedDetails
                            });
                            dbSuccess = res.success;
                            if (!res.success) dbError = res.error;
                        } else {
                            console.log('📝 [BOOKING] Creating new lead...');
                            const res = await createLead(dbPayload as any);
                            dbSuccess = res.success;
                            if (!res.success) dbError = res.error;
                        }
                    } catch (err: any) {
                        dbError = err.message;
                        console.error('❌ [BOOKING] Database error:', err);
                    }

                    const dbDuration = Date.now() - t2;
                    console.log(`${dbSuccess ? '✅' : '❌'} [BOOKING] Database ${dbSuccess ? 'saved' : 'failed'} in ${dbDuration}ms`);

                    if (!dbSuccess) {
                        throw new Error(`Database error: ${dbError || 'Unknown error'}`);
                    }

                    // Email en background (no bloqueante)
                    console.log('📧 [BOOKING] Attempting email send (non-blocking)...');
                    submitBooking(data).then(emailRes => {
                        if (emailRes.skipped) {
                            console.log('⚠️ [BOOKING] Email skipped (no API key)');
                        } else if (emailRes.emailFailed) {
                            console.warn('⚠️ [BOOKING] Email failed:', emailRes.error);
                        } else {
                            console.log('✅ [BOOKING] Email sent successfully');
                        }
                    }).catch(err => {
                        console.error('❌ [BOOKING] Email error:', err);
                    });

                    // Continuar inmediatamente sin esperar email
                    const totalDuration = Date.now() - processStart;
                    console.log(`🎉 [BOOKING] Process completed in ${totalDuration}ms`);

                    toast.success("Booking confirmed!", { id: toastId });
                    onNext();

                } catch (e: any) {
                    const elapsed = Date.now() - processStart;
                    console.error(`❌ [BOOKING] Failed after ${elapsed}ms:`, e);

                    toast.error(
                        `Booking failed: ${e.message || "Unknown error"}. Please try again or contact support.`,
                        { id: toastId, duration: 6000 }
                    );
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    }, [isSubmitting, onNext, data, setAction, total, finalPrice, appliedDiscount]);

    const formattedDate = data.serviceDate ? format(new Date(data.serviceDate), "MMMM do, yyyy") : "Not selected";

    return (
        <div className="h-full w-full relative flex flex-col">
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Review <br /> <span className="text-[#05D16E]">Details</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Double check everything looks good.</p>
                    </div>

                    <div className="space-y-4">
                        <Section title="Service" icon={Home} stepId="service" onEdit={onEditStep}>
                            <p className="font-bold text-[#024653] capitalize">{data.serviceType} Cleaning</p>
                            <p className="text-xs font-bold text-[#024653]/80 capitalize mt-0.5 mb-1">
                                {(data.cleaningType || 'standard').replace('_', ' ')} Intensity
                            </p>
                            {data.serviceType === 'residential' && (
                                <p className="text-xs text-[#024653]/60">{data.bedrooms} Bed, {data.bathrooms} Bath, ~{data.sqFt} sqft</p>
                            )}
                            {data.serviceType === 'commercial' && (
                                <p className="text-xs text-[#024653]/60">{data.businessType}, {data.commSqFt} sqft</p>
                            )}
                            <p className="text-xs text-[#05D16E] font-bold mt-1 uppercase tracking-wider">{data.frequency} Plan</p>
                        </Section>

                        <Section title="Schedule" icon={Calendar} stepId="date" onEdit={onEditStep}>
                            <p className="font-bold text-[#024653]">{formattedDate}</p>
                            <p className="text-xs text-[#024653]/60">@ {data.serviceTime}</p>
                        </Section>

                        <Section title="Location" icon={MapPin} stepId="address" onEdit={onEditStep}>
                            <p className="font-bold text-[#024653]">{data.address}</p>
                            <p className="text-xs text-[#024653]/60">{data.city}, {data.zipCode}</p>
                        </Section>

                        <Section title="Contact" icon={User} stepId="quote" onEdit={onEditStep}>
                            <p className="font-bold text-[#024653]">{data.firstName} {data.lastName}</p>
                            <p className="text-xs text-[#024653]/60">{data.email}</p>
                            <p className="text-xs text-[#024653]/60">{data.phone}</p>
                        </Section>

                        {/* Promo Code Section */}
                        <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 space-y-4">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-[#05D16E]/10 rounded-xl">
                                    <Sparkles size={18} className="text-[#05D16E]" />
                                </div>
                                <h3 className="text-sm font-black uppercase tracking-wider text-[#024653]">Promo Code</h3>
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
                                    placeholder="Enter code (e.g. SUMMER20)"
                                    className="flex-1 bg-slate-50 border-2 border-slate-100 rounded-xl px-4 py-3 text-sm font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all uppercase placeholder:normal-case placeholder:font-medium"
                                />
                                {appliedDiscount ? (
                                    <button
                                        onClick={() => {
                                            setAppliedDiscount(null);
                                            setPromoCode("");
                                        }}
                                        className="bg-red-50 text-red-500 p-3 rounded-xl hover:bg-red-100 transition-colors"
                                    >
                                        <X size={20} />
                                    </button>
                                ) : (
                                    <button
                                        onClick={handleApplyPromo}
                                        disabled={!promoCode || isCheckingPromo}
                                        className="bg-[#024653] text-white px-6 rounded-xl font-bold text-sm hover:bg-[#024653]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                                <div className="bg-[#F0FDF4] border border-[#05D16E]/20 rounded-xl p-3 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <CheckCircle2 size={14} className="text-[#05D16E]" />
                                        <span className="text-xs font-bold text-[#024653]">Code {appliedDiscount.code} applied!</span>
                                    </div>
                                    <span className="text-xs font-black text-[#05D16E]">
                                        -{appliedDiscount.type === 'percent' ? `${appliedDiscount.value}%` : `$${appliedDiscount.value}`}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Total */}
                        <div className="bg-[#024653] p-8 rounded-[2rem] text-center text-white space-y-2 shadow-xl shadow-[#024653]/20 relative overflow-hidden">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Estimated Total</p>
                            <div className="flex flex-col items-center justify-center gap-0">
                                {appliedDiscount && (
                                    <span className="text-lg font-bold text-white/40 line-through decoration-white/40 decoration-2">
                                        ${total}
                                    </span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-5xl font-black">${finalPrice}</span>
                                    <span className="text-sm font-bold opacity-60">/service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
