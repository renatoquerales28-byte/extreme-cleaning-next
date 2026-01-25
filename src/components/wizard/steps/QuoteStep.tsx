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
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-4">
                    {/* Main Estimate Display */}
                    <div className="relative p-5 bg-white rounded-xl border-2 border-slate-50 overflow-hidden group shrink-0">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4 relative z-10">
                            <div className="text-center md:text-left">
                                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 mb-1 block">Estimated Investment</span>
                                <div className="flex items-baseline gap-2">
                                    <h3 className="text-4xl md:text-5xl font-black tracking-tighter text-[#024653]">${totalPrice}</h3>
                                    <span className="text-xs font-bold text-[#024653]/30 font-outfit">/service</span>
                                </div>
                            </div>

                            <div className="h-12 w-px bg-slate-100 hidden md:block" />

                            <div className="flex flex-col items-center md:items-end gap-1 text-center md:text-right">
                                <div className="flex items-center gap-2 px-2 py-1 bg-[#05D16E]/10 rounded-lg border border-[#05D16E]/20">
                                    <Star size={10} className="text-[#05D16E] fill-[#05D16E]" />
                                    <span className="text-[#05D16E] font-black text-[8px] uppercase tracking-widest leading-none">Price Locked</span>
                                </div>
                                <p className="text-[8px] text-[#024653]/40 font-black uppercase tracking-widest leading-tight">
                                    Valid for Spokane & <br /> Surrounding Areas
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form Section */}
                    <div className="space-y-3 w-full">
                        <div className="flex flex-col md:flex-row gap-2">
                            <div className="flex-1 space-y-1">
                                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">First Name</label>
                                <div className="relative flex items-center">
                                    <User size={14} className="absolute left-3 text-[#024653]/20" />
                                    <input {...register("firstName")} className={`w-full pl-8 pr-3 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.firstName ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} placeholder="John" />
                                </div>
                            </div>
                            <div className="flex-1 space-y-1">
                                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Last Name</label>
                                <input {...register("lastName")} className={`w-full px-3 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.lastName ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} placeholder="Doe" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="space-y-1">
                                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Email Identity</label>
                                <div className="relative flex items-center">
                                    <Mail size={14} className="absolute left-3 text-[#024653]/20" />
                                    <input {...register("email")} type="email" placeholder="john@example.com" className={`w-full pl-8 pr-3 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.email ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-[8px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-2">Phone Primary</label>
                                <div className="relative flex items-center">
                                    <Phone size={14} className="absolute left-3 text-[#024653]/20" />
                                    <input {...register("phone")} type="tel" placeholder="(509) 555-0123" className={`w-full pl-8 pr-3 py-2.5 bg-white border-2 rounded-xl outline-none transition-all font-bold text-xs ${errors.phone ? 'border-rose-400' : 'border-slate-50 focus:border-[#05D16E]'}`} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Trust Footer - Compact */}
                    <div className="p-3 bg-[#024653] rounded-xl border border-white/5 flex items-center justify-between gap-3 group overflow-hidden relative shrink-0">
                        <div className="flex items-center gap-3 relative z-10 w-full justify-center">
                            <ShieldCheck size={16} className="text-[#05D16E]" strokeWidth={2.5} />
                            <div>
                                <p className="text-[8px] font-black text-white uppercase tracking-widest mb-0.5">Secure Checkout</p>
                                <p className="text-[8px] text-white/40 font-medium">SSL Encrypted • No upfront charge</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="fixed bottom-6 right-0 w-full lg:w-[60%] z-50 flex justify-center pointer-events-none bg-transparent border-none shadow-none">
                <button
                    onClick={handleNext}
                    disabled={isSubmitting || !data.firstName || !data.lastName || !data.email || !data.phone}
                    className="pointer-events-auto w-[90%] md:w-[380px] h-[56px] bg-[#024653] text-white font-bold rounded-xl shadow-2xl flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-xs hover:bg-[#0E6168] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Select Schedule <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
