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
        <div className="flex flex-col h-full w-full max-w-2xl mx-auto py-2 antialiased">
            {/* Header */}
            <div className="text-center space-y-2 mb-8 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Tell us about <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Your Space.</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Customize your cleaning plan</p>
            </div>

            <div className="w-full space-y-6 shrink-0">

                {/* Room Counters */}
                <div className="flex gap-4">
                    {/* Bedrooms */}
                    <div className="flex-1 bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm flex flex-col items-center justify-between gap-4 transition-all hover:shadow-xl group">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 group-hover:text-[#024653] transition-colors">Bedrooms</span>
                        <div className="flex items-center gap-6 w-full justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm"
                            >-</button>
                            <span className="text-4xl font-black text-[#024653]">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm"
                            >+</button>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="flex-1 bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm flex flex-col items-center justify-between gap-4 transition-all hover:shadow-xl group">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 group-hover:text-[#024653] transition-colors">Bathrooms</span>
                        <div className="flex items-center gap-6 w-full justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm"
                            >-</button>
                            <span className="text-4xl font-black text-[#024653]">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-10 h-10 flex items-center justify-center rounded-2xl bg-[#F9F8F2] text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-90 shadow-sm"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="bg-white p-8 rounded-[2.5rem] border-2 border-slate-50 shadow-sm space-y-6 transition-all hover:shadow-xl group">
                    <div className="flex justify-between items-end">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 group-hover:text-[#024653] transition-colors">Approx. Size</label>
                        <div className="text-right">
                            <span className="text-3xl font-black text-[#024653]">{sqFt}</span>
                            <span className="text-[10px] font-black text-[#024653]/40 ml-2 uppercase tracking-widest">Sq Ft</span>
                        </div>
                    </div>
                    <div className="relative h-2 bg-[#F9F8F2] rounded-full overflow-visible">
                        <input
                            type="range" min="500" max="6000" step="100"
                            value={sqFt}
                            onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                            className="absolute inset-x-0 -top-1 w-full h-4 bg-transparent appearance-none cursor-pointer z-10 
                                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 
                                [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#05D16E] 
                                [&::-webkit-slider-thumb]:border-4 [&::-webkit-slider-thumb]:border-[#024653]
                                [&::-webkit-slider-thumb]:shadow-lg [&::-webkit-slider-thumb]:transition-transform [&::-webkit-slider-thumb]:hover:scale-110"
                        />
                        <div
                            className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#024653] to-[#05D16E] rounded-full"
                            style={{ width: `${((sqFt - 500) / 5500) * 100}%` }}
                        />
                    </div>
                    <div className="flex justify-between text-[10px] font-black text-[#024653]/20 uppercase tracking-[0.2em]">
                        <span>500 sqft</span>
                        <span>6000+ sqft</span>
                    </div>
                </div>

                {/* Cleaning Intensity Cards */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 pl-4">Cleaning Intensity</label>
                    <div className="grid grid-cols-3 gap-4">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`relative p-5 pt-8 pb-6 rounded-[2rem] border-2 transition-all duration-500 flex flex-col items-center justify-center gap-3 overflow-hidden ${cleaningType === opt.id
                                    ? "bg-[#024653] border-[#024653] text-white shadow-2xl shadow-[#024653]/20 scale-[1.02]"
                                    : "bg-white border-slate-50 hover:border-[#024653]/10 hover:shadow-xl"
                                    }`}
                            >
                                <div className={`absolute top-0 inset-x-0 h-1.5 ${cleaningType === opt.id ? "bg-[#05D16E]" : "bg-transparent transition-colors duration-500"}`} />

                                <span className={`text-xs font-black tracking-widest uppercase ${cleaningType === opt.id ? "text-white" : "text-[#024653]"}`}>
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
            <div className="mt-8 shrink-0">
                <button
                    onClick={onNext}
                    className="btn-accent shadow-2xl shadow-[#05D16E]/10 flex items-center justify-center gap-4 w-full py-6 rounded-[2.5rem] group"
                >
                    <span className="text-[11px] font-black uppercase tracking-[0.3em]">Select Frequency</span>
                    <ArrowRight size={20} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    );
}
