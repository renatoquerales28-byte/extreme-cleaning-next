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
        <div className="flex flex-col md:flex-row gap-4 w-full h-full max-w-5xl mx-auto">
            {/* Left: Summary - Makes it fill height but compact */}
            <div className="w-full md:w-5/12 flex flex-col gap-2 order-2 md:order-1 h-full">
                <div className="flex items-center justify-between shrink-0">
                    <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                        <ChevronLeft size={14} /> Back
                    </button>
                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-brand-light">Estimate</span>
                </div>

                <div className="glass-card flex-1 p-4 rounded-3xl bg-brand-dark text-white relative overflow-hidden flex flex-col justify-between min-h-0">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-full blur-2xl -mr-10 -mt-10" />

                    <div className="space-y-1 shrink-0">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-1">
                            <Star size={10} className="text-brand-light fill-brand-light" /> Quote
                        </p>
                        <div className="flex items-baseline gap-1">
                            <span className="text-4xl font-black tracking-tighter">${totalPrice}</span>
                            <span className="text-slate-400 font-bold text-xs">/service</span>
                        </div>
                    </div>

                    <div className="space-y-2 py-3 border-t border-white/10 shrink-0">
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold uppercase tracking-widest">Frequency</span>
                            <span className="font-black px-2 py-0.5 bg-white/10 rounded-full">{selectedFreq?.label}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold uppercase tracking-widest">Plan</span>
                            <span className="font-black capitalize">{data.cleaningType}</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold uppercase tracking-widest">Size</span>
                            <span className="font-black">{data.sqFt} sq ft</span>
                        </div>
                        <div className="flex justify-between items-center text-[10px]">
                            <span className="text-slate-400 font-bold uppercase tracking-widest">Zip</span>
                            <span className="font-black text-brand-light">{data.zipCode}</span>
                        </div>
                    </div>

                    <div className="pt-3 flex items-center gap-2 border-t border-white/10 shrink-0">
                        <div className="p-1.5 bg-white/5 rounded-lg"><Shield size={16} className="text-emerald-500" /></div>
                        <div>
                            <p className="font-black text-[9px] uppercase tracking-widest">Guarantee</p>
                            <p className="text-[8px] text-slate-400 font-medium leading-tight">100% Satisfaction or free re-clean.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Contact Form */}
            <div className="flex-1 w-full md:w-7/12 flex flex-col gap-3 order-1 md:order-2 h-full justify-center">
                <div className="shrink-0 mb-1">
                    <h3 className="text-2xl font-black tracking-tighter leading-none">Final <span className="text-accent">Details</span></h3>
                </div>

                <div className="space-y-2 w-full">
                    <div className="grid grid-cols-2 gap-2">
                        <div className="space-y-0.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">First Name</label>
                            <div className="relative flex items-center">
                                <User size={14} className="absolute left-3 text-slate-300" />
                                <input {...register("firstName")} className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" placeholder="John" />
                            </div>
                        </div>
                        <div className="space-y-0.5">
                            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Last Name</label>
                            <input {...register("lastName")} className="w-full px-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email</label>
                        <div className="relative flex items-center">
                            <Mail size={14} className="absolute left-3 text-slate-300" />
                            <input {...register("email")} type="email" placeholder="john@example.com" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" />
                        </div>
                    </div>

                    <div className="space-y-0.5">
                        <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Phone</label>
                        <div className="relative flex items-center">
                            <Phone size={14} className="absolute left-3 text-slate-300" />
                            <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 focus:border-brand-light focus:bg-white rounded-xl outline-none transition-all font-bold text-xs" />
                        </div>
                    </div>

                    <button onClick={handleSubmit} className="btn-sentient btn-sentient-fuchsia w-full py-3 text-base flex items-center justify-center gap-2 mt-2 shadow-lg hover:shadow-xl">
                        Secure Booking <CreditCard size={18} />
                    </button>

                    <p className="text-[9px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-1">
                        <Shield size={10} className="text-emerald-500" /> SSL Encrypted • No charge today
                    </p>
                </div>
            </div>
        </div>
    );
}
