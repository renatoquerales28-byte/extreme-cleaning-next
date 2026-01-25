"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { ChevronLeft, ArrowRight, Sparkles } from "lucide-react";

interface ResidentialStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function ResidentialStep({ onNext, onBack }: ResidentialStepProps) {
    const { register, setValue, watch } = useFormContext<WizardData>();
    const bedrooms = watch("bedrooms");
    const bathrooms = watch("bathrooms");
    const sqFt = watch("sqFt");
    const cleaningType = watch("cleaningType");

    const cleaningOptions = [
        { id: "regular", label: "Standard", desc: "Maintenance clean", icon: Sparkles, color: "text-cyan-400", bg: "bg-cyan-950/20" },
        { id: "deep", label: "Deep Clean", desc: "Thorough scrub", icon: Sparkles, color: "text-fuchsia-400", bg: "bg-fuchsia-950/20" },
        { id: "move", label: "Move-In/Out", desc: "Empty home", icon: Sparkles, color: "text-emerald-400", bg: "bg-emerald-950/20" },
    ];

    return (
        <div className="flex flex-col h-full w-full max-w-xl mx-auto py-2 antialiased overflow-hidden">
            {/* Header */}


            <div className="flex-1 flex flex-col justify-center space-y-3 min-h-0 w-full">
                {/* Room Counters */}
                <div className="grid grid-cols-2 gap-3 shrink-0">
                    {/* Bedrooms */}
                    <div className="bg-white p-4 rounded-xl border-2 border-slate-100 flex flex-col items-center justify-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]/50">Bedrooms</span>
                        <div className="flex items-center justify-between w-full max-w-[120px]">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-base"
                            >-</button>
                            <span className="text-2xl font-black text-[#024653] tabular-nums">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-base"
                            >+</button>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="bg-white p-4 rounded-xl border-2 border-slate-100 flex flex-col items-center justify-center gap-3">
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]/50">Bathrooms</span>
                        <div className="flex items-center justify-between w-full max-w-[120px]">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-base"
                            >-</button>
                            <span className="text-2xl font-black text-[#024653] tabular-nums">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-base"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="bg-white p-5 rounded-xl border-2 border-slate-100 space-y-4 shrink-0">
                    <div className="flex justify-between items-end">
                        <label className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]/50">Approx. Size</label>
                        <div className="text-right">
                            <span className="text-2xl font-black text-[#024653] tabular-nums">{sqFt}</span>
                            <span className="text-[9px] font-black text-[#024653]/30 ml-1 uppercase tracking-widest">Sq Ft</span>
                        </div>
                    </div>
                    <div className="relative h-2 bg-[#F9F8F2] rounded-full">
                        <input
                            type="range" min="500" max="6000" step="100"
                            value={sqFt}
                            onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                            className="absolute inset-x-0 -top-2 w-full h-6 opacity-0 cursor-pointer z-10"
                        />
                        <div
                            className="absolute left-0 top-0 h-full bg-[#05D16E] rounded-full"
                            style={{ width: `${((sqFt - 500) / 5500) * 100}%` }}
                        />
                        <div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-[#024653] border-[3px] border-white rounded-full shadow-sm pointer-events-none"
                            style={{ left: `${((sqFt - 500) / 5500) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[8px] font-black text-[#024653]/20 uppercase tracking-widest">
                        <span>500</span>
                        <span>6000+</span>
                    </div>
                </div>

                {/* Cleaning Intensity Cards */}
                <div className="space-y-2 shrink-0">
                    <label className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]/50 ml-1">Cleaning Intensity</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`p-3 rounded-lg border-2 transition-all duration-200 flex flex-row md:flex-col items-center justify-between md:justify-center gap-2 ${cleaningType === opt.id
                                    ? "bg-[#024653] border-[#024653] text-white"
                                    : "bg-white border-slate-100 hover:border-[#024653]/20 text-[#024653]"
                                    }`}
                            >
                                <span className="text-[10px] font-black tracking-widest uppercase text-left md:text-center">
                                    {opt.label}
                                </span>
                                {cleaningType === opt.id && <div className="md:hidden w-1.5 h-1.5 rounded-full bg-[#05D16E]" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="mt-4 pb-2 shrink-0">
                <button
                    onClick={onNext}
                    className="w-full py-4 bg-[#024653] text-white rounded-xl flex items-center justify-center gap-3 hover:bg-[#0E6168] transition-colors"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.25em]">Select Frequency</span>
                    <ArrowRight size={16} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
