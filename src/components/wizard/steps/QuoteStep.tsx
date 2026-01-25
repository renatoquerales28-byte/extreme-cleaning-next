"use client";

import React, { useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { calculateTotal, FREQUENCIES } from "@/lib/utils/pricing";
import { ShieldCheck, Star, Mail, Phone, User, ArrowRight, Calendar, Sparkles } from "lucide-react";
import { createLead } from "@/app/actions/admin";

interface QuoteStepProps {
    onBack: () => void;
    onNext: () => void;
    customerName?: string;
    isFinalStep?: boolean;
}

export default function QuoteStep({ onBack, onNext, customerName }: QuoteStepProps) {
    const { register, watch, trigger, setValue, formState: { errors } } = useFormContext<WizardData>();
    const data = watch();
    const totalPrice = calculateTotal(data);
    const selectedFreq = FREQUENCIES.find(f => f.id === data.frequency);
    const frequencyLabel = selectedFreq?.label || "N/A";
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = async () => {
        setIsSubmitting(true);

        try {
            // Validate contact fields before proceeding
            const fieldsToValidate: (keyof WizardData)[] = ["firstName", "lastName", "email", "phone"];
            const isValid = await trigger(fieldsToValidate);

            if (isValid || customerName) {
                // Create lead with "incomplete" status to capture contact info
                // even if user abandons before completing address
                const existingLeadId = data.leadId;

                if (!existingLeadId && !customerName) {
                    // Only create new lead if we don't have one already and it's not a returning customer
                    const leadData = {
                        ...data,
                        totalPrice,
                        status: "incomplete" // Mark as incomplete until address is provided
                    };

                    const result = await createLead(leadData);

                    if (result.success && result.leadId) {
                        // Save leadId to form for use in AddressStep
                        setValue("leadId", result.leadId);
                        console.log("Lead created with ID:", result.leadId);
                    } else {
                        console.error("Failed to create lead:", result.error);
                        // Continue anyway - we'll try again in AddressStep
                    }
                }

                onNext();
            }
        } catch (error) {
            console.error("Error in handleNext:", error);
            // Continue to next step even if lead creation fails
            // AddressStep will handle it as fallback
            onNext();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex flex-col h-full w-full max-w-xl mx-auto py-2 antialiased">
            {/* Header */}
            <div className="text-center space-y-1 mb-4 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Your Final <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Estimate.</span>
                </h2>
                <p className="text-[9px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Premium Care, Guaranteed Quality</p>
            </div>

            <div className="w-full space-y-4 shrink-0">
                {/* Main Estimate Display */}
                <div className="relative p-6 bg-white rounded-[2rem] border-2 border-slate-50 overflow-hidden group">
                    {/* Removed decorative blob */}

                    <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                        <div className="text-center md:text-left">
                            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/40 mb-1 block">Estimated Investment</span>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-5xl md:text-6xl font-black tracking-tighter text-[#024653]">${totalPrice}</h3>
                                <span className="text-sm font-bold text-[#024653]/30 font-outfit">/service</span>
                            </div>
                        </div>

                        <div className="h-16 w-px bg-slate-100 hidden md:block" />

                        <div className="flex flex-col items-center md:items-end gap-2 text-center md:text-right">
                            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#05D16E]/10 rounded-xl border border-[#05D16E]/20">
                                <Star size={12} className="text-[#05D16E] fill-[#05D16E]" />
                                <span className="text-[#05D16E] font-black text-[9px] uppercase tracking-widest leading-none">Price Locked</span>
                            </div>
                            <p className="text-[10px] text-[#024653]/40 font-black uppercase tracking-widest leading-tight">
                                Valid for Spokane & <br /> Surrounding Areas
                            </p>
                        </div>
                    </div>
                </div>

                {/* Contact Form Section */}
                <div className="space-y-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">First Name</label>
                            <div className="relative flex items-center">
                                <User size={16} className="absolute left-4 text-[#024653]/20" />
                                <input {...register("firstName")} className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-[1.5rem] outline-none transition-all font-bold text-sm ${errors.firstName ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} placeholder="John" />
                            </div>
                        </div>
                        <div className="flex-1 space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Last Name</label>
                            <input {...register("lastName")} className={`w-full px-4 py-3 bg-white border-2 rounded-[1.5rem] outline-none transition-all font-bold text-sm ${errors.lastName ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} placeholder="Doe" />
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Email Identity</label>
                            <div className="relative flex items-center">
                                <Mail size={16} className="absolute left-4 text-[#024653]/20" />
                                <input {...register("email")} type="email" placeholder="john@example.com" className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-[1.5rem] outline-none transition-all font-bold text-sm ${errors.email ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} />
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Phone Primary</label>
                            <div className="relative flex items-center">
                                <Phone size={16} className="absolute left-4 text-[#024653]/20" />
                                <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className={`w-full pl-10 pr-4 py-3 bg-white border-2 rounded-[1.5rem] outline-none transition-all font-bold text-sm ${errors.phone ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Trust Footer */}
                <div className="p-4 bg-[#024653] rounded-[2rem] border border-white/5 flex items-center justify-between gap-4 group overflow-hidden relative">
                    <div className="flex items-center gap-3 relative z-10">
                        <div className="p-2 bg-[#05D16E]/20 rounded-xl"><ShieldCheck size={20} className="text-[#05D16E]" strokeWidth={2.5} /></div>
                        <div>
                            <p className="text-[10px] font-black text-white uppercase tracking-widest mb-0.5">Secure Checkout</p>
                            <p className="text-[9px] text-white/40 font-medium">SSL Encrypted • No upfront charge</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Final Action */}
            <div className="mt-4 shrink-0">
                <button
                    onClick={handleNext}
                    disabled={isSubmitting}
                    className="btn-accent flex items-center justify-center gap-3 w-full py-4 text-sm rounded-[2rem] group disabled:opacity-50 bg-[#024653] text-white hover:bg-[#0E6168]"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">{isSubmitting ? "Processing..." : "Finalize Appointment"}</span>
                    {!isSubmitting && <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />}
                </button>
            </div>
        </div>
    );
}
