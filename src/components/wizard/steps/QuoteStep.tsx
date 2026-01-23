"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { ChevronLeft, Check, CreditCard, Shield, Star, Mail, Phone, User } from "lucide-react";

interface QuoteStepProps {
    onBack: () => void;
}

export default function QuoteStep({ onBack }: QuoteStepProps) {
    const { register, watch, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = () => {
        setSubmitted(true);
        // Real submission logic would go here
    };

    if (submitted) {
        return (
            <div className="flex flex-col items-center justify-center gap-8 py-20 text-center animate-in fade-in zoom-in duration-700">
                <div className="w-24 h-24 bg-brand-light/10 text-brand-light rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(2,70,83,0.2)]">
                    <Check size={48} strokeWidth={3} />
                </div>
                <div className="space-y-4">
                    <h2 className="text-5xl font-black tracking-tighter">You&apos;re All Set!</h2>
                    <p className="text-slate-500 font-medium max-w-md mx-auto">
                        We&apos;ve received your request. One of our cleaning experts will contact you within 15 minutes to confirm your booking.
                    </p>
                </div>
                <button onClick={() => window.location.href = "/"} className="btn-sentient">
                    Back to Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full justify-center w-full max-w-lg mx-auto py-2">
            <div className="flex items-center justify-between w-full shrink-0 mb-4">
                <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={14} /> Back
                </button>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Final Step</span>
            </div>

            <div className="text-center space-y-1 shrink-0 mb-4">
                <h2 className="text-3xl font-black tracking-tighter text-brand-dark leading-none">
                    Final <span className="text-accent">Details</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">Almost there! We just need your contact info.</p>
            </div>

            <div className="space-y-3 w-full shrink-0">
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                        <div className="relative flex items-center">
                            <User size={14} className="absolute left-3 text-slate-300" />
                            <input {...register("firstName")} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" placeholder="John" />
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                        <input {...register("lastName")} className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" placeholder="Doe" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Identity</label>
                    <div className="relative flex items-center">
                        <Mail size={14} className="absolute left-3 text-slate-300" />
                        <input {...register("email")} type="email" placeholder="john@example.com" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone Primary</label>
                    <div className="relative flex items-center">
                        <Phone size={14} className="absolute left-3 text-slate-300" />
                        <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" />
                    </div>
                </div>

                <button onClick={handleSubmit} className="btn-sentient btn-sentient-fuchsia w-full py-3 text-base flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl">
                    Secure Booking Now <CreditCard size={18} />
                </button>

                <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                    <Shield size={10} className="text-emerald-500" /> SSL Encrypted • No charge today
                </p>
            </div>
        </div>
    );
}
