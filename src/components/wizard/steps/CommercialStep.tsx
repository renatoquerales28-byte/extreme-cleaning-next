"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { ChevronLeft, Building, Users, ArrowRight } from "lucide-react";

interface CommercialStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function CommercialStep({ onNext, onBack }: CommercialStepProps) {
    const { register, watch, setValue, formState: { errors } } = useFormContext<WizardData>();
    const businessType = watch("businessType");
    const commSqFt = watch("commSqFt");

    const isValid = businessType && commSqFt && parseInt(commSqFt) > 0;

    const businessTypes = [
        { id: "office", label: "Office", icon: Building },
        { id: "retail", label: "Retail / Store", icon: Users },
        { id: "medical", label: "Medical / Clinic", icon: Building },
        { id: "gym", label: "Gym / Fitness", icon: Users },
        { id: "other", label: "Other", icon: Building },
    ];

    return (
        <div className="flex flex-col h-full justify-start md:justify-center gap-6 w-full max-w-xl mx-auto py-2 antialiased">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-dark transition-all">
                    <ChevronLeft size={14} strokeWidth={3} /> Back
                </button>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Phase 03 / 05</span>
            </div>

            <div className="text-center space-y-2 shrink-0">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Commercial <span className="text-accent">Details</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">Tell us about your business space.</p>
            </div>

            <div className="grid gap-6 w-full shrink-0">
                <div>
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Business Categorization</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {businessTypes.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setValue("businessType", type.id)}
                                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${businessType === type.id
                                    ? "border-brand-dark bg-brand-dark text-white shadow-sm scale-[1.02]"
                                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"
                                    }`}
                            >
                                <type.icon size={20} strokeWidth={2.5} />
                                <span className="text-[10px] font-black uppercase tracking-wider">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-3">
                    <label className="block text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Approximate Square Footage</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="e.g. 2500"
                            {...register("commSqFt")}
                            className="w-full text-3xl font-black bg-white border-2 border-slate-100 rounded-2xl px-6 py-4 focus:border-brand-dark outline-none placeholder:text-slate-200 transition-all"
                        />
                        <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-slate-300 tracking-tighter uppercase text-xs">SQ FT</span>
                    </div>
                </div>
            </div>

            <div className="mt-2 shrink-0">
                <button
                    onClick={onNext}
                    disabled={!isValid}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all duration-500 shrink-0 ${isValid
                        ? "bg-brand-dark text-white shadow-md hover:bg-black hover:scale-[1.01] active:scale-95"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                        }`}
                >
                    Confirm & Continue <ArrowRight size={18} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
