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
        <div className="flex flex-col gap-8 w-full">
            <div className="flex items-center justify-between w-full">
                <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={16} /> Back
                </button>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Step 03 / 05</span>
            </div>

            <div className="space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900">
                    Commercial <span className="text-fuchsia-500">Details</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium">Tell us about your business space.</p>
            </div>

            <div className="grid gap-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Business Type</label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {businessTypes.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setValue("businessType", type.id)}
                                className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${businessType === type.id
                                    ? "border-black bg-black text-white"
                                    : "border-slate-100 bg-white text-slate-500 hover:border-slate-300"
                                    }`}
                            >
                                <type.icon size={20} />
                                <span className="text-xs font-bold uppercase tracking-wide">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wider mb-3">Approx Sq. Footage {commSqFt && <span className="text-fuchsia-500">({commSqFt} sqft)</span>}</label>
                    <input
                        type="number"
                        placeholder="e.g. 2500"
                        {...register("commSqFt")}
                        className="w-full text-3xl font-black bg-transparent border-b-2 border-slate-200 focus:border-black outline-none py-2 placeholder:text-slate-200 transition-colors"
                    />
                </div>
            </div>

            <button
                onClick={onNext}
                disabled={!isValid}
                className={`mt-8 w-full py-6 rounded-full font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 transition-all duration-300 ${isValid
                    ? "bg-black text-white shadow-xl hover:scale-[1.02]"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    }`}
            >
                Continue <ArrowRight size={16} />
            </button>
        </div>
    );
}
