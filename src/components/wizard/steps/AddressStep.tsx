"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal } from "@/lib/utils/pricing";
import { Check, MapPin, Building2, Home, ArrowRight, Shield, Calendar, Lock, CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createLead, updateLead } from "@/app/actions/admin";

interface AddressStepProps {
    onBack: () => void;
}

export default function AddressStep({ onBack }: AddressStepProps) {
    const { register, watch, handleSubmit, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const onSubmit = async (formData: WizardData) => {
        setIsSubmitting(true);
        try {
            const leadId = formData.leadId;

            if (leadId) {
                // Update existing lead with address and mark as complete
                console.log("Updating existing lead:", leadId);
                const result = await updateLead(leadId, {
                    ...formData,
                    totalPrice,
                    status: "new" // Mark as complete now that we have address
                });

                if (!result.success) {
                    throw new Error(result.error || "Failed to update lead");
                }

                console.log("Lead updated successfully");
            } else {
                // Fallback: create new lead if somehow we don't have a leadId
                console.log("No leadId found, creating new lead");
                const result = await createLead({
                    ...formData,
                    totalPrice,
                    status: "new"
                });

                if (!result.success) {
                    throw new Error(result.error || "Failed to create lead");
                }

                console.log("Lead created successfully");
            }

            setSubmitted(true);
        } catch (error) {
            console.error("Error submitting address:", error);
            alert("Something went wrong. Please try again or contact support at (509) 555-0123.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-6 py-10 text-center animate-in fade-in zoom-in duration-700 h-full">
                <div className="w-20 h-20 bg-brand-light text-white rounded-full flex items-center justify-center shadow-lg">
                    <Check size={40} strokeWidth={3} />
                </div>
                <div className="space-y-2">
                    <h2 className="text-4xl font-black tracking-tighter text-brand-dark">Booking Confirmed!</h2>
                    <p className="text-sm text-slate-700 font-medium max-w-md mx-auto">
                        Thank you! We&apos;ve received your address. Our team is now preparing for your visit. One of our experts will call you shortly to finalize the details.
                    </p>
                </div>
                <button onClick={() => router.push("/")} className="btn-sentient bg-brand-dark text-white px-8 py-3 rounded-full text-sm">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full max-w-xl mx-auto py-2 antialiased">
            <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-center min-h-0 w-full space-y-4">
                {/* Address Form Section */}
                <div className="space-y-3">
                    <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Service Address</label>
                        <div className="relative flex items-center">
                            <MapPin size={14} className="absolute left-3 text-[#024653]/20" />
                            <input
                                {...register("address")}
                                placeholder="123 Sparkling Way"
                                className={`w-full pl-8 pr-4 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.address ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`}
                            />
                        </div>
                        {errors.address && <p className="text-[8px] text-rose-500 font-bold ml-4 uppercase tracking-widest">{errors.address.message}</p>}
                    </div>

                    <div className="flex flex-col md:flex-row gap-2">
                        <div className="flex-1 space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">City</label>
                            <input
                                {...register("city")}
                                placeholder="Spokane"
                                className={`w-full px-3 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.city ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`}
                            />
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">State</label>
                            <input
                                {...register("state")}
                                placeholder="WA"
                                className={`w-full px-3 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.state ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Booking Summary Card */}
                <div className="p-3 bg-white rounded-xl border-2 border-slate-50 relative overflow-hidden group shrink-0">
                    <div className="flex items-center gap-3">
                        <div className="hidden xs:block p-2 bg-[#F9F8F2] rounded-lg text-[#024653] shrink-0">
                            <Calendar size={16} strokeWidth={3} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-[8px] font-black text-[#024653]/40 uppercase tracking-widest mb-0.5 truncate">Your Selected Plan</p>
                            <div className="flex items-center justify-between gap-2">
                                <h3 className="text-sm md:text-base font-black text-[#024653] uppercase tracking-tight truncate">{data.frequency} {data.cleaningType}</h3>
                                <div className="text-right shrink-0">
                                    <span className="text-base md:text-lg font-black text-[#024653]">${totalPrice}</span>
                                    <span className="text-[8px] font-black text-[#024653]/30 ml-1 uppercase hidden sm:inline">Total</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Trust Note */}
                <div className="flex items-center justify-center gap-4 text-[#024653]/30 my-1">
                    <div className="h-px flex-1 bg-slate-100" />
                    <div className="flex items-center gap-2">
                        <Lock size={8} strokeWidth={3} />
                        <span className="text-[7px] font-black uppercase tracking-[0.2em]">Secure Booking</span>
                    </div>
                    <div className="h-px flex-1 bg-slate-100" />
                </div>
            </form>

            <div className="mt-auto pt-8 w-full max-w-xl mx-auto space-y-4">
                <p className="text-[7px] text-center text-[#024653]/40 font-black uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
                    By confirming, you agree to our <Link href="#" className="text-[#05D16E] hover:underline">Terms</Link> & <Link href="#" className="text-[#05D16E] hover:underline">Privacy</Link>.
                </p>

                <button
                    onClick={handleSubmit(onSubmit)}
                    disabled={isSubmitting}
                    className="w-full py-5 bg-[#024653] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#0E6168] transition-all disabled:opacity-50"
                >
                    <span className="text-xs font-black uppercase tracking-[0.25em]">{isSubmitting ? "Processing..." : "Confirm My Booking"}</span>
                    {!isSubmitting && <CheckCircle size={18} strokeWidth={2.5} />}
                </button>
            </div>
        </div>
    );
}
