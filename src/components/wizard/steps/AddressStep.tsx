"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal } from "@/lib/utils/pricing";
import { Check, MapPin, Building2, Home, ArrowRight, Shield } from "lucide-react";
import { useRouter } from "next/navigation";
import { createLead } from "@/app/actions/admin";

interface AddressStepProps {
    onBack: () => void;
}

export default function AddressStep({ onBack }: AddressStepProps) {
    const { register, watch, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const [submitted, setSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            await createLead({ ...data, totalPrice });
            setSubmitted(true);
        } catch (error) {
            alert("Something went wrong. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-8 py-20 text-center animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-brand-light text-white rounded-full flex items-center justify-center shadow-lg">
                    <Check size={48} strokeWidth={3} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tighter text-brand-dark">Booking Confirmed!</h2>
                    <p className="text-slate-700 font-medium max-w-md mx-auto">
                        Thank you! We've received your address. Our team is now preparing for your visit. One of our experts will call you shortly to finalize the details.
                    </p>
                </div>
                <button onClick={() => router.push("/")} className="btn-sentient bg-brand-dark text-white">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full justify-start md:justify-center w-full max-w-lg mx-auto py-4 antialiased">
            <div className="text-center space-y-2 shrink-0 mb-8">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Last <span className="text-accent">Step</span>
                </h2>
                <p className="text-sm text-slate-700 font-medium tracking-tight">Where should we go to make everything sparkle?</p>
            </div>

            <div className="space-y-5 w-full shrink-0">
                <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Street Address</label>
                    <div className="relative flex items-center">
                        <MapPin size={18} className="absolute left-4 text-slate-400" />
                        <input
                            {...register("address")}
                            autoFocus={true}
                            className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-2xl outline-none transition-all font-bold text-sm ${errors.address ? 'border-rose-400' : 'border-slate-100 focus:border-brand-light'}`}
                            placeholder="1234 N Shine Ave"
                        />
                    </div>
                    {errors.address && <p className="text-[10px] text-rose-500 font-bold ml-1 uppercase tracking-wider">{errors.address.message}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Unit / Apt (Optional)</label>
                        <div className="relative flex items-center">
                            <Building2 size={18} className="absolute left-4 text-slate-400" />
                            <input {...register("unit")} className="w-full pl-12 pr-4 py-4 bg-white border-2 border-slate-100 focus:border-brand-light rounded-2xl outline-none transition-all font-bold text-sm" placeholder="Suite 101" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">City</label>
                        <div className="relative flex items-center">
                            <Home size={18} className="absolute left-4 text-slate-400" />
                            <input {...register("city")} disabled className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl outline-none font-bold text-sm text-slate-500 cursor-not-allowed" value="Spokane" />
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <button
                        onClick={handleSubmit}
                        disabled={isSubmitting || !data.address}
                        className="btn-sentient bg-brand-dark hover:bg-black text-white w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:grayscale disabled:cursor-not-allowed"
                    >
                        {isSubmitting ? "Processing..." : "Finish Booking"} <ArrowRight size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <p className="text-[10px] text-center text-slate-500 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-4">
                    <Shield size={12} className="text-emerald-500" strokeWidth={3} /> We respect your privacy.
                </p>
            </div>
        </div>
    );
}
