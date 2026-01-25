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
        <div className="flex flex-col h-full justify-start md:justify-center gap-8 w-full max-w-2xl mx-auto py-2 antialiased">
            {/* Header */}
            <div className="text-center space-y-2 mb-4 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Business <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Spaces.</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Professional Grade Solutions</p>
            </div>

            <div className="grid gap-8 w-full shrink-0">
                <div className="space-y-4">
                    <label className="block text-[10px] font-black text-[#024653]/40 uppercase tracking-[0.2em] ml-2">Business Categorization</label>
                    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                        {businessTypes.map((type) => (
                            <button
                                key={type.id}
                                type="button"
                                onClick={() => setValue("businessType", type.id)}
                                className={`p-5 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center gap-3 ${businessType === type.id
                                    ? "border-[#024653] bg-[#024653] text-white shadow-xl scale-[1.05] z-10"
                                    : "border-slate-50 bg-white text-[#024653]/60 hover:border-[#024653]/10 hover:shadow-lg"
                                    }`}
                            >
                                <type.icon size={24} strokeWidth={2.5} className={businessType === type.id ? "text-[#05D16E]" : "text-[#024653]/30"} />
                                <span className="text-[9px] font-black uppercase tracking-widest text-center leading-tight">{type.label}</span>
                            </button>
                        ))}
                    </div>
                </div>

                <div className="space-y-4 bg-white p-8 rounded-[3rem] border-2 border-slate-50 shadow-sm transition-all hover:shadow-xl group">
                    <label className="block text-[10px] font-black text-[#024653]/40 uppercase tracking-[0.2em] group-hover:text-[#024653] transition-colors">Approximate Square Footage</label>
                    <div className="relative">
                        <input
                            type="number"
                            placeholder="e.g. 2500"
                            {...register("commSqFt")}
                            onInput={(e) => {
                                const val = (e.target as HTMLInputElement).value;
                                if (parseInt(val) > 100000) (e.target as HTMLInputElement).value = "100000";
                            }}
                            className="w-full text-5xl font-black bg-white border-none p-0 focus:ring-0 outline-none placeholder:text-[#024653]/10 text-[#024653] tracking-tighter"
                        />
                        <span className="absolute right-0 bottom-2 font-black text-[#05D16E] tracking-[0.2em] uppercase text-[10px]">SQ FT</span>
                    </div>
                    <div className="h-1 bg-[#F9F8F2] w-full rounded-full overflow-hidden">
                        <div className="h-full bg-[#05D16E] transition-all duration-1000" style={{ width: commSqFt ? `${Math.min(100, (parseInt(commSqFt) / 10000) * 100)}%` : '0%' }} />
                    </div>
                </div>
            </div>

            <div className="mt-4 shrink-0">
                <button
                    onClick={onNext}
                    disabled={!isValid}
                    className="btn-accent shadow-2xl shadow-[#05D16E]/10 flex items-center justify-center gap-4 w-full py-8 text-base rounded-[2.5rem] group disabled:opacity-50"
                >
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">Review Estimate</span>
                    <ArrowRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    );
}
