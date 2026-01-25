"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { ShieldCheck, Star, Mail, Phone, User, ArrowRight, Calendar, Sparkles } from "lucide-react";

interface QuoteStepProps {
    onBack: () => void;
    onNext: () => void;
    customerName?: string;
    isFinalStep?: boolean;
}

export default function QuoteStep({ onBack, onNext, customerName }: QuoteStepProps) {
    const { register, watch, trigger, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);
    const frequencyLabel = selectedFreq?.label || "N/A";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        setIsSubmitting(true);
        // Validate contact fields before proceeding
        const fieldsToValidate: (keyof WizardData)[] = ["firstName", "lastName", "email", "phone"];
        const isValid = await trigger(fieldsToValidate);

        if (isValid || customerName) {
            onNext();
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto py-2 antialiased">
            {/* Header */}
            <div className="text-center space-y-2 mb-10 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Your Final <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Estimate.</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Premium Care, Guaranteed Quality</p>
            </div>

            <div className="w-full space-y-8 shrink-0">
                {/* Main Estimate Display */}
                <div className="relative p-10 bg-white rounded-[3rem] border-2 border-slate-50 shadow-2xl shadow-[#024653]/5 overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#05D16E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

                    <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                        <div className="text-center md:text-left">
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 mb-2 block">Estimated Investment</span>
                            <div className="flex items-baseline gap-3">
                                <h3 className="text-7xl font-black tracking-tighter text-[#024653]">${totalPrice}</h3>
                                <span className="text-xl font-bold text-[#024653]/30 font-outfit">/service</span>
                            </div>
                        </div>

                        <div className="h-20 w-px bg-slate-100 hidden md:block" />

                        <div className="flex flex-col items-center md:items-end gap-3 text-center md:text-right">
                            <div className="flex items-center gap-2 px-4 py-2 bg-[#05D16E]/10 rounded-2xl border border-[#05D16E]/20">
                                <Star size={14} className="text-[#05D16E] fill-[#05D16E]" />
                                <span className="text-[#05D16E] font-black text-[10px] uppercase tracking-widest leading-none">Price Locked</span>
                            </div>
                            <p className="text-[11px] text-[#024653]/40 font-black uppercase tracking-widest leading-tight">
                                Valid for Spokane & <br /> Surrounding Areas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="space-y-6">
                    <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">First Name</label>
                            <div className="relative flex items-center">
                                <User size={18} className="absolute left-6 text-[#024653]/20" />
                                <input {...register("firstName")} className={`w-full pl-14 pr-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.firstName ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} placeholder="John" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Last Name</label>
                            <input {...register("lastName")} className={`w-full px-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.lastName ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Email Identity</label>
                            <div className="relative flex items-center">
                                <Mail size={18} className="absolute left-6 text-[#024653]/20" />
                                <input {...register("email")} type="email" placeholder="john@example.com" className={`w-full pl-14 pr-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.email ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Phone Primary</label>
                            <div className="relative flex items-center">
                                <Phone size={18} className="absolute left-6 text-[#024653]/20" />
                                <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className={`w-full pl-14 pr-6 py-5 bg-white border-2 rounded-[2rem] outline-none transition-all font-bold text-sm ${errors.phone ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="p-8 bg-[#024653] rounded-[2.5rem] border border-white/5 shadow-2xl flex items-center justify-between gap-6 group overflow-hidden relative">
                    <div className="flex items-center gap-4 relative z-10">
                        <div className="p-3 bg-[#05D16E]/20 rounded-2xl"><ShieldCheck size={28} className="text-[#05D16E]" strokeWidth={2.5} /></div>
                        <div>
                            <p className="text-xs font-black text-white uppercase tracking-widest mb-0.5">Secure Checkout</p>
                            <p className="text-[10px] text-white/40 font-medium">SSL Encrypted • No upfront charge</p>
                        </div>
                    </div>
                    <Star size={24} className="text-white/10 group-hover:text-[#05D16E]/20 transition-all duration-700 group-hover:scale-125" />
                </div>
            </div>

            {/* Final Action */}
            <div className="mt-10 shrink-0">
                <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="btn-accent shadow-2xl shadow-[#05D16E]/20 flex items-center justify-center gap-4 w-full py-8 text-base rounded-[2.5rem] group disabled:opacity-50"
                >
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">{isSubmitting ? "Processing..." : "Finalize Appointment"}</span>
                    {!isSubmitting && <ArrowRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />}
                </button>
            </div>
        </div>
    );
}
