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
        <div className="flex flex-col h-full w-full max-w-xl mx-auto py-4 antialiased">
            {/* Header */}
            <div className="text-center space-y-3 mb-8 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-none">
                    Tell us about <br /><span className="text-[#05D16E]">Your Space.</span>
                </h2>
                <p className="text-xs text-[#024653]/60 font-bold uppercase tracking-widest">Customize your cleaning plan</p>
            </div>

            <div className="w-full space-y-6 shrink-0">
                {/* Room Counters */}
                <div className="grid grid-cols-2 gap-4">
                    {/* Bedrooms */}
                    <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 flex flex-col items-center justify-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]/50">Bedrooms</span>
                        <div className="flex items-center justify-between w-full max-w-[140px]">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-lg"
                            >-</button>
                            <span className="text-3xl font-black text-[#024653] tabular-nums">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-lg"
                            >+</button>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="bg-white p-5 rounded-2xl border-2 border-slate-100 flex flex-col items-center justify-center gap-4">
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]/50">Bathrooms</span>
                        <div className="flex items-center justify-between w-full max-w-[140px]">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-lg"
                            >-</button>
                            <span className="text-3xl font-black text-[#024653] tabular-nums">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-colors font-black text-lg"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="bg-white p-6 rounded-2xl border-2 border-slate-100 space-y-6">
                    <div className="flex justify-between items-end">
                        <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]/50">Approx. Size</label>
                        <div className="text-right">
                            <span className="text-3xl font-black text-[#024653] tabular-nums">{sqFt}</span>
                            <span className="text-[10px] font-black text-[#024653]/30 ml-1 uppercase tracking-widest">Sq Ft</span>
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
                            className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-[#024653] border-4 border-white rounded-full shadow-sm pointer-events-none"
                            style={{ left: `${((sqFt - 500) / 5500) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-[#024653]/20 uppercase tracking-widest">
                        <span>500</span>
                        <span>6000+</span>
                    </div>
                </div>

                {/* Cleaning Intensity Cards */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]/50 ml-1">Cleaning Intensity</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`p-4 rounded-xl border-2 transition-all duration-200 flex flex-row md:flex-col items-center justify-between md:justify-center gap-3 ${cleaningType === opt.id
                                    ? "bg-[#024653] border-[#024653] text-white"
                                    : "bg-white border-slate-100 hover:border-[#024653]/20 text-[#024653]"
                                    }`}
                            >
                                <span className="text-xs font-black tracking-widest uppercase text-left md:text-center">
                                    {opt.label}
                                </span>
                                {cleaningType === opt.id && <div className="md:hidden w-2 h-2 rounded-full bg-[#05D16E]" />}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="mt-8 shrink-0">
                <button
                    onClick={onNext}
                    className="w-full py-5 bg-[#024653] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#0E6168] transition-colors"
                >
                    <span className="text-xs font-black uppercase tracking-[0.25em]">Select Frequency</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
