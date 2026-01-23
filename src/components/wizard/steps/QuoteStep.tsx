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
                <div className="w-24 h-24 bg-cyan-50 text-cyan-500 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(0,224,255,0.2)]">
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
        <div className="grid md:grid-cols-2 gap-12 w-full max-w-5xl mx-auto">
            {/* Left: Summary */}
            <div className="space-y-8 order-2 md:order-1">
                <div className="flex items-center justify-between">
                    <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                        <ChevronLeft size={16} /> Back
                    </button>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-500">Instant Estimate</span>
                </div>

                <div className="glass-card p-10 rounded-[3rem] space-y-8 bg-black text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-fuchsia-500/20 rounded-full blur-3xl -mr-16 -mt-16" />

                    <div className="space-y-2">
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-2">
                            <Star size={12} className="text-cyan-500 fill-cyan-500" /> Your Personalized Clean
                        </p>
                        <div className="flex items-baseline gap-2">
                            <span className="text-7xl font-black tracking-tighter">${totalPrice}</span>
                            <span className="text-slate-400 font-bold">/service</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-white/10">
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Frequency</span>
                            <span className="font-black px-4 py-1 bg-white/10 rounded-full">{selectedFreq?.label}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Plan Type</span>
                            <span className="font-black capitalize">{data.cleaningType}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Space Size</span>
                            <span className="font-black">{data.sqFt} SQ FT</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                            <span className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Zip Code</span>
                            <span className="font-black text-cyan-400">{data.zipCode}</span>
                        </div>
                    </div>

                    <div className="pt-8 flex items-center gap-4 border-t border-white/10">
                        <div className="p-3 bg-white/5 rounded-2xl"><Shield size={24} className="text-emerald-500" /></div>
                        <div>
                            <p className="font-black text-xs uppercase tracking-widest">Extreme Guarantee</p>
                            <p className="text-[10px] text-slate-400 font-medium">Not 100% happy? We&apos;ll re-clean for free.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right: Contact Form */}
            <div className="space-y-10 order-1 md:order-2">
                <div className="space-y-4">
                    <h3 className="text-4xl font-black tracking-tighter">Final <span className="text-fuchsia-500">Details</span></h3>
                    <p className="text-slate-500 font-medium">Almost there! We just need your contact info to secure your spot.</p>
                </div>

                <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">First Name</label>
                            <div className="relative flex items-center">
                                <User size={18} className="absolute left-5 text-slate-300" />
                                <input {...register("firstName")} className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-cyan-500 focus:bg-white rounded-2xl outline-none transition-all font-bold" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Last Name</label>
                            <input {...register("lastName")} className="w-full px-6 py-4 bg-slate-50 border-2 border-transparent focus:border-cyan-500 focus:bg-white rounded-2xl outline-none transition-all font-bold" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Identity</label>
                        <div className="relative flex items-center">
                            <Mail size={18} className="absolute left-5 text-slate-300" />
                            <input {...register("email")} type="email" placeholder="example@email.com" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-cyan-500 focus:bg-white rounded-2xl outline-none transition-all font-bold" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone Primary</label>
                        <div className="relative flex items-center">
                            <Phone size={18} className="absolute left-5 text-slate-300" />
                            <input {...register("phone")} type="tel" placeholder="(509) 000-0000" className="w-full pl-14 pr-6 py-4 bg-slate-50 border-2 border-transparent focus:border-cyan-500 focus:bg-white rounded-2xl outline-none transition-all font-bold" />
                        </div>
                    </div>

                    <button onClick={handleSubmit} className="btn-sentient btn-sentient-fuchsia w-full py-6 text-xl flex items-center justify-center gap-3">
                        Secure Booking Now <CreditCard size={24} />
                    </button>

                    <p className="text-[10px] text-center text-slate-400 font-bold uppercase tracking-widest flex items-center justify-center gap-2">
                        <Shield size={14} className="text-emerald-500" /> Secure Encryption • No upfront payment
                    </p>
                </div>
            </div>
        </div>
    );
}
