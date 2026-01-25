"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

interface QuoteStepProps {
    onNext: () => void;
}

export default function QuoteStep({ onNext }: QuoteStepProps) {
    const { register, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = useCallback(async () => {
        setIsSubmitting(true);
        // Simulate submit
        setTimeout(() => {
            setIsSubmitting(false);
            onNext();
        }, 1000);
    }, [onNext]);

    useEffect(() => {
        const isValid = data.firstName && data.lastName && data.email && data.phone;
        setAction({
            label: "Select Schedule",
            disabled: !isValid,
            isLoading: isSubmitting,
            onClick: handleNext
        });
    }, [data.firstName, data.lastName, data.email, data.phone, isSubmitting, setAction, handleNext]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Personal <br /> <span className="text-[#05D16E]">Details</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Where should we send the quote?</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">First Name</label>
                                <input {...register("firstName")} placeholder="Jane" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Last Name</label>
                                <input {...register("lastName")} placeholder="Doe" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Email Address</label>
                            <input {...register("email")} type="email" placeholder="jane@example.com" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all" />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Phone Number</label>
                            <input {...register("phone")} type="tel" placeholder="(555) 123-4567" className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
