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
            <div className="text-center space-y-2 mb-4 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-ecs-brand-dark leading-[0.85]">
                    Tell us about <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-ecs-brand-light to-ecs-accent">Your Space.</span>
                </h2>
                <p className="text-sm text-slate-700 font-bold tracking-widest uppercase">Customize your cleaning plan</p>
            </div>

            <div className="w-full space-y-4 shrink-0">

                {/* Room Counters */}
                <div className="flex gap-4">
                    {/* Bedrooms */}
                    <div className="flex-1 bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Bedrooms</span>
                        <div className="flex items-center gap-6 w-full justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-ecs-brand-dark hover:text-white transition-all active:scale-90"
                            >-</button>
                            <span className="text-3xl font-black text-ecs-brand-dark">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-ecs-brand-dark hover:text-white transition-all active:scale-90"
                            >+</button>
                        </div>
                    </div>

                    {/* Bathrooms */}
                    <div className="flex-1 bg-white p-4 rounded-3xl border-2 border-slate-100 shadow-sm flex flex-col items-center justify-between gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Bathrooms</span>
                        <div className="flex items-center gap-6 w-full justify-between px-2">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-ecs-brand-dark hover:text-white transition-all active:scale-90"
                            >-</button>
                            <span className="text-3xl font-black text-ecs-brand-dark">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-ecs-brand-dark hover:text-white transition-all active:scale-90"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="bg-white p-6 rounded-3xl border-2 border-slate-100 shadow-sm space-y-4">
                    <div className="flex justify-between items-end">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">Approx. Size</label>
                        <div className="text-right">
                            <span className="text-2xl font-black text-ecs-brand-dark">{sqFt}</span>
                            <span className="text-[10px] font-bold text-slate-500 ml-1 uppercase">Sq Ft</span>
                        </div>
                    </div>
                    <input
                        type="range" min="500" max="6000" step="100"
                        value={sqFt}
                        onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                        className="w-full h-2 bg-slate-100 rounded-full appearance-none cursor-pointer accent-ecs-brand-dark outline-none focus:ring-0"
                    />
                    <div className="flex justify-between text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                        <span>500 sqft</span>
                        <span>6000+ sqft</span>
                    </div>
                </div>

                {/* Cleaning Intensity Cards */}
                <div className="space-y-3">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600 pl-2">Cleaning Intensity</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`relative group p-3 pt-8 pb-4 rounded-3xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-2 overflow-hidden ${cleaningType === opt.id
                                    ? "bg-ecs-brand-dark border-ecs-brand-dark text-white shadow-lg scale-[1.02]"
                                    : "bg-white border-white hover:border-slate-200"
                                    }`}
                            >
                                <div className={`absolute top-0 inset-x-0 h-1 ${cleaningType === opt.id ? "bg-gradient-to-r from-ecs-brand-light to-ecs-accent" : "bg-transparent"}`} />

                                <span className={`text-sm font-black tracking-tighter uppercase ${cleaningType === opt.id ? "text-white" : "text-ecs-brand-dark"}`}>
                                    {opt.label}
                                </span>
                                <span className={`text-[9px] font-bold leading-none ${cleaningType === opt.id ? "text-slate-300" : "text-slate-500"}`}>
                                    {opt.desc}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="mt-4 shrink-0">
                <button
                    onClick={onNext}
                    className="bg-ecs-brand-dark text-white shadow-xl hover:shadow-2xl hover:scale-[1.01] transition-all flex items-center justify-center gap-3 w-full py-6 rounded-[2rem] text-xs font-black uppercase tracking-[0.25em] active:scale-95 group"
                >
                    Select Frequency <ArrowRight size={16} strokeWidth={3} className="text-ecs-brand-light group-hover:translate-x-1 transition-transform" />
                </button>
            </div>
        </div>
    );
}
