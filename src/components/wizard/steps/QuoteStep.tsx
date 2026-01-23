"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { ChevronLeft, Check, CreditCard, Shield, Star, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";

import { createLead } from "@/app/actions/admin";

interface QuoteStepProps {
    onBack: () => void;
}

export default function QuoteStep({ onBack }: QuoteStepProps) {
    const { register, watch, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);
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
                    <h2 className="text-5xl font-black tracking-tighter text-brand-dark">You&apos;re All Set!</h2>
                    <p className="text-slate-500 font-medium max-w-md mx-auto">
                        We&apos;ve received your request. One of our cleaning experts will contact you within 15 minutes to confirm your booking.
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
            {/* Nav removed in favor of parent wizard layout */}

            <div className="text-center space-y-2 shrink-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Final <span className="text-accent">Details</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Almost there! We just need your contact info.</p>
            </div>

            {/* Mobile-only Price Summary */}
            <div className="lg:hidden bg-brand-dark shadow-sm rounded-2xl p-6 mb-8 flex items-baseline justify-between text-white">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Your Total Estimate</p>
                    <p className="text-3xl font-black text-white">${totalPrice}<span className="text-sm font-bold text-slate-400">/svc</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-300 mb-1">Frequency</p>
                    <p className="font-black text-brand-light text-sm capitalize">{selectedFreq?.label}</p>
                </div>
            </div>

            <div className="space-y-4 w-full shrink-0 mb-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">First Name</label>
                        <div className="relative flex items-center">
                            <User size={18} className="absolute left-4 text-slate-300" />
                            <input {...register("firstName")} autoFocus={true} className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-100 focus:border-brand-light rounded-2xl outline-none transition-all font-bold text-sm" placeholder="John" />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Last Name</label>
                        <input {...register("lastName")} className="w-full px-4 py-3.5 bg-white border-2 border-slate-100 focus:border-brand-light rounded-2xl outline-none transition-all font-bold text-sm" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Email Identity</label>
                    <div className="relative flex items-center">
                        <Mail size={18} className="absolute left-4 text-slate-300" />
                        <input {...register("email")} type="email" placeholder="john@example.com" className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-100 focus:border-brand-light rounded-2xl outline-none transition-all font-bold text-sm" />
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Phone Primary</label>
                    <div className="relative flex items-center">
                        <Phone size={18} className="absolute left-4 text-slate-300" />
                        <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-100 focus:border-brand-light rounded-2xl outline-none transition-all font-bold text-sm" />
                    </div>
                </div>

                <div className="pt-2">
                    <button onClick={handleSubmit} disabled={isSubmitting} className="btn-sentient bg-accent hover:bg-accent-hover text-brand-dark w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait">
                        {isSubmitting ? "Processing..." : "Secure Booking Now"} <CreditCard size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <p className="text-[10px] text-center text-slate-400 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-4">
                    <Shield size={12} className="text-emerald-500" strokeWidth={3} /> SSL Encrypted • No charge today
                </p>
            </div>
        </div>
    );
}
