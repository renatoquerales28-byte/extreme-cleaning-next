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
        <div className="flex flex-col h-full justify-center gap-3 w-full py-2">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={14} /> Back
                </button>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Step 03 / 05</span>
            </div>

            <div className="space-y-1 shrink-0">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-dark">
                    Commercial <span className="text-accent">Details</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">Tell us about your business space.</p>
            </div>

            <div className="grid gap-3 w-full shrink-0">
                <div>
                    <label className="block text-[9px] font-bold text-slate-700 uppercase tracking-wider mb-1">Business Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {businessTypes.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setValue("businessType", type.id)}
                                className={`p-2 rounded-lg border transition-all flex flex-col items-center gap-1 ${businessType === type.id
                                    ? "border-black bg-black text-white"
                                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"
                                    }`}
                            >
                                <type.icon size={16} />
                                <span className="text-[9px] font-bold uppercase tracking-wide">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-[9px] font-bold text-slate-700 uppercase tracking-wider mb-1">Approx Sq. Footage {commSqFt && <span className="text-accent">({commSqFt} sqft)</span>}</label>
                    <input
                        type="number"
                        placeholder="e.g. 2500"
                        {...register("commSqFt")}
                        className="w-full text-xl font-black bg-transparent border-b border-slate-200 focus:border-brand-dark outline-none py-1 placeholder:text-slate-200 transition-colors"
                    />
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className={`mt-2 w-full py-3 rounded-full font-black uppercase tracking-widest text-[10px] flex items-center justify-center gap-2 transition-all duration-300 shrink-0 ${isValid
                    ? "bg-black text-white shadow-lg hover:scale-[1.01]"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    }`}
            >
                Continue <ArrowRight size={16} />
            </button>
        </div>
    );
}
