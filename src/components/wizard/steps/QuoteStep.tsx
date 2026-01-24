"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { ChevronLeft, Check, CreditCard, Shield, Star, Mail, Phone, User } from "lucide-react";
import { useRouter } from "next/navigation";

interface QuoteStepProps {
    onBack: () => void;
    onNext: () => void;
    customerName?: string;
}

export default function QuoteStep({ onBack, onNext, customerName }: QuoteStepProps) {
    const { register, watch, trigger, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        setIsSubmitting(true);
        // Validate contact fields before proceeding
        const fieldsToValidate: (keyof WizardData)[] = ["firstName", "lastName", "email", "phone"];
        const isValid = await trigger(fieldsToValidate);

        console.log("Validation Result:", isValid, "Errors:", errors);

        if (isValid || customerName) {
            onNext();
        } else {
            // Scroll to the first error if it exists
            const errorKeys = Object.keys(errors);
            if (errorKeys.length > 0) {
                console.warn("Validation failed, staying on step 4");
            }
        }
        setIsSubmitting(false);
    };

    return (
        <div className="flex flex-col h-full justify-start md:justify-center w-full max-w-lg mx-auto py-4 antialiased">
            {/* Nav removed in favor of parent wizard layout */}

            <div className="text-center space-y-2 shrink-0 mb-6">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Final <span className="text-accent">Details</span>
                </h2>
                <p className="text-sm text-slate-700 font-medium tracking-tight">Almost there! We just need your contact info.</p>
            </div>

            {/* Mobile-only Price Summary */}
            <div className="lg:hidden bg-brand-dark shadow-sm rounded-2xl p-6 mb-8 flex items-baseline justify-between text-white">
                <div>
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-200 mb-1">Your Total Estimate</p>
                    <p className="text-3xl font-black text-white">${totalPrice}<span className="text-sm font-bold text-slate-300">/svc</span></p>
                </div>
                <div className="text-right">
                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-200 mb-1">Frequency</p>
                    <p className="font-black text-brand-light text-sm capitalize">{selectedFreq?.label}</p>
                </div>
            </div>

            <div className="space-y-4 w-full shrink-0 mb-4">
                {customerName ? (
                    <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-6 mb-6">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                                <User size={24} strokeWidth={2.5} />
                            </div>
                            <div>
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Welcome Back</p>
                                <h3 className="text-xl font-black text-brand-dark">{customerName}</h3>
                            </div>
                        </div>
                        <p className="text-sm text-slate-700 font-medium leading-relaxed">
                            We have your contact details on file. Simply confirm your booking below.
                        </p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">First Name</label>
                                <div className="relative flex items-center">
                                    <User size={18} className="absolute left-4 text-slate-400" />
                                    <input {...register("firstName")} autoFocus={true} className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-2xl outline-none transition-all font-bold text-sm ${errors.firstName ? 'border-rose-400' : 'border-slate-100 focus:border-brand-light'}`} placeholder="John" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Last Name</label>
                                <input {...register("lastName")} className={`w-full px-4 py-3.5 bg-white border-2 rounded-2xl outline-none transition-all font-bold text-sm ${errors.lastName ? 'border-rose-400' : 'border-slate-100 focus:border-brand-light'}`} placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Email Identity</label>
                            <div className="relative flex items-center">
                                <Mail size={18} className="absolute left-4 text-slate-400" />
                                <input {...register("email")} type="email" placeholder="john@example.com" className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-2xl outline-none transition-all font-bold text-sm ${errors.email ? 'border-rose-400' : 'border-slate-100 focus:border-brand-light'}`} />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-600 ml-1">Phone Primary</label>
                            <div className="relative flex items-center">
                                <Phone size={18} className="absolute left-4 text-slate-400" />
                                <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className={`w-full pl-12 pr-4 py-3.5 bg-white border-2 rounded-2xl outline-none transition-all font-bold text-sm ${errors.phone ? 'border-rose-400' : 'border-slate-100 focus:border-brand-light'}`} />
                            </div>
                        </div>
                    </>
                )}

                <div className="pt-2">
                    <button onClick={handleNext} disabled={isSubmitting} className="btn-sentient bg-accent hover:bg-accent-hover text-brand-dark w-full py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-95 transition-all disabled:opacity-70 disabled:cursor-wait">
                        {isSubmitting ? "Processing..." : "Continue to Address"} <ArrowRight size={20} strokeWidth={2.5} />
                    </button>
                </div>

                <p className="text-[10px] text-center text-slate-500 font-black uppercase tracking-[0.2em] flex items-center justify-center gap-2 mt-4">
                    <Shield size={12} className="text-emerald-500" strokeWidth={3} /> SSL Encrypted • No charge today
                </p>
            </div>
        </div>
    );
}
