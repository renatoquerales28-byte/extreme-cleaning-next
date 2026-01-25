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
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto py-0 antialiased justify-center min-h-[500px]">
            {/* Header */}
            <div className="text-center space-y-2 mb-6 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Tell us about <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Your Space.</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Customize your cleaning plan</p>
            </div>

            <div className="w-full space-y-4 shrink-0">

                {/* Room Counters */}
                <div className="flex gap-4">
                    {/* Bedrooms */}
                    <div className="flex-1 bg-white p-4 rounded-[2rem] border-2 border-slate-50 shadow-sm flex flex-col items-center justify-between gap-2 transition-all hover:shadow-xl group">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 group-hover:text-[#024653] transition-colors">Bedrooms</span>
                        <div className="flex items-center gap-4 w-full justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm font-black"
                            >-</button>
                            <span className="text-3xl font-black text-[#024653]">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm font-black"
                            >+</button>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="flex-1 bg-white p-4 rounded-[2rem] border-2 border-slate-50 shadow-sm flex flex-col items-center justify-between gap-2 transition-all hover:shadow-xl group">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 group-hover:text-[#024653] transition-colors">Bathrooms</span>
                        <div className="flex items-center gap-4 w-full justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm font-black"
                            >-</button>
                            <span className="text-3xl font-black text-[#024653]">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm font-black"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="bg-white p-5 rounded-[2rem] border-2 border-slate-50 shadow-sm space-y-4 transition-all hover:shadow-xl group">
                    <div className="flex justify-between items-end">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 group-hover:text-[#024653] transition-colors">Approx. Size</label>
                        <div className="text-right">
                            <span className="text-2xl font-black text-[#024653]">{sqFt}</span>
                            <span className="text-[9px] font-black text-[#024653]/40 ml-2 uppercase tracking-widest">Sq Ft</span>
                        </div>
                    </div>
                    <div className="relative h-2 bg-[#F9F8F2] rounded-full overflow-visible">
                        <input
                            type="range" min="500" max="6000" step="100"
                            value={sqFt}
                            onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                            className="absolute inset-x-0 -top-1 w-full h-4 bg-transparent appearance-none cursor-pointer z-10 
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#05D16E] 
                                [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#024653]
                                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                        <div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#024653] to-[#05D16E] rounded-full"
                            style={{ width: `${((sqFt - 500) / 5500) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[9px] font-black text-[#024653]/20 uppercase tracking-[0.2em]">
                        <span>500</span>
                        <span>6000+</span>
                    </div>
                </div>

                {/* Cleaning Intensity Cards */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 pl-4">Cleaning Intensity</label>
                    <div className="grid grid-cols-3 gap-3">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`relative p-3 pt-6 pb-4 rounded-[1.5rem] border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden ${cleaningType === opt.id
                                    ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20 scale-[1.02]"
                                    : "bg-white border-slate-50 hover:border-[#024653]/10 hover:shadow-lg"
                                    }`}
                            >
                                <div className={`absolute top-0 inset-x-0 h-1.5 ${cleaningType === opt.id ? "bg-[#05D16E]" : "bg-transparent transition-colors duration-500"}`} />

                                <span className={`text-[10px] md:text-xs font-black tracking-widest uppercase ${cleaningType === opt.id ? "text-white" : "text-[#024653]"}`}>
                                    {opt.label}
                                </span>
                                <span className={`text-[9px] font-black uppercase tracking-tighter leading-none ${cleaningType === opt.id ? "text-[#05D16E]" : "text-[#024653]/40"}`}>
                                    {opt.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="mt-6 shrink-0">
                <button
                    onClick={onNext}
                    className="btn-accent shadow-xl shadow-[#05D16E]/10 flex items-center justify-center gap-3 w-full py-4 rounded-[2rem] group"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Select Frequency</span>
                    <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-1" />
                </button>
            </div>
        </div>
    );
}
