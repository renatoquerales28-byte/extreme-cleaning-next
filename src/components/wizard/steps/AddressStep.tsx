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
                        Thank you! We&apos;ve received your address. Our team is now preparing for your visit. One of our experts will call you shortly to finalize the details.
                    </p>
                </div>
                <button onClick={() => router.push("/")} className="btn-sentient bg-brand-dark text-white">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto py-2 antialiased">
            {/* Header */}
            <div className="text-center space-y-2 mb-10 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Where should we <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Sparkle?</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Finalize your cleaning schedule</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-8 shrink-0">
                {/* Address Form Section */}
                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Service Address</label>
                        <div className="relative flex items-center">
                            <MapPin size={18} className="absolute left-6 text-[#024653]/20" />
                            <input
                                {...register("address")}
                                placeholder="123 Sparkling Way"
                                className={`w-full pl-14 pr-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.address ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`}
                            />
                        </div>
                        {errors.address && <p className="text-[10px] text-rose-500 font-bold ml-4 uppercase tracking-widest">{errors.address.message}</p>}
                    </div>

                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">City</label>
                            <input
                                {...register("city")}
                                placeholder="Spokane"
                                className={`w-full px-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.city ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`}
                            />
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">State</label>
                            <input
                                {...register("state")}
                                placeholder="WA"
                                className={`w-full px-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.state ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`}
                            />
                        </div>
                    </div>
                </div>

                {/* Booking Summary Card */}
                <div className="p-8 bg-[#F9F8F2] rounded-[3rem] border-2 border-[#024653]/5 relative overflow-hidden group">
                    <div className="flex items-center gap-6">
                        <div className="p-4 bg-[#024653] rounded-2xl text-[#05D16E] shadow-xl shadow-[#024653]/10">
                            <Calendar size={24} strokeWidth={3} />
                        </div>
                        <div className="flex-1">
                            <p className="text-[10px] font-black text-[#024653]/40 uppercase tracking-widest mb-1">Your Selected Plan</p>
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-black text-[#024653] uppercase tracking-tight">{data.frequency} {data.cleaningType}</h3>
                                <div className="text-right">
                                    <span className="text-2xl font-black text-[#024653]">${totalPrice}</span>
                                    <span className="text-[10px] font-black text-[#024653]/30 ml-1 uppercase">Total</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Final Trust Note */}
                <div className="flex items-center justify-center gap-4 text-[#024653]/30">
                    <div className="h-px flex-1 bg-slate-100" />
                    <div className="flex items-center gap-2">
                        <Lock size={12} strokeWidth={3} />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em]">Secure Booking</span>
                    </div>
                    <div className="h-px flex-1 bg-slate-100" />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-accent shadow-2xl shadow-[#05D16E]/20 flex items-center justify-center gap-4 w-full py-8 text-base rounded-[2.5rem] group disabled:opacity-50"
                >
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">{isSubmitting ? "Processing..." : "Confirm My Booking"}</span>
                    {!isSubmitting && <CheckCircle size={24} strokeWidth={3} className="transition-transform group-hover:scale-110" />}
                </button>

                <p className="text-[10px] text-center text-[#024653]/40 font-black uppercase tracking-[0.2em] max-w-sm mx-auto leading-relaxed">
                    By clicking confirm, you agree to our <Link href="#" className="text-[#05D16E] hover:underline">Terms of Service</Link> & <Link href="#" className="text-[#05D16E] hover:underline">Privacy Policy</Link>.
                </p>
            </form>
        </div>
    );
}
