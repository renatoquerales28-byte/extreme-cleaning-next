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
        { id: "regular", label: "Standard", desc: "For maintained homes." },
        { id: "deep", label: "Deep Clean", desc: "For homes needing extra love." },
        { id: "move", label: "Move-In/Out", desc: "Empty home perfection." },
    ];

    return (
        <div className="flex flex-col h-full justify-center gap-3 w-full max-w-xl mx-auto py-2">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={14} /> Back
                </button>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Step 03 / 05</span>
            </div>

            <div className="text-center space-y-1 shrink-0">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-dark leading-none">
                    Tell us about your <span className="text-brand-light">Space</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium italic">&quot;A clean home is a clean mind.&quot;</p>
            </div>

            <div className="w-full space-y-3 shrink-0">
                {/* Beds / Baths */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Bedrooms</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white hover:border-brand-light/30 transition-colors"
                            >-</button>
                            <span className="text-xl font-black w-6 text-center text-brand-dark">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white hover:border-brand-light/30 transition-colors"
                            >+</button>
                        </div>
                    </div>
                    <div className="space-y-1">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Bathrooms</label>
                        <div className="flex items-center gap-2">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white hover:border-brand-light/30 transition-colors"
                            >-</button>
                            <span className="text-xl font-black w-6 text-center text-brand-dark">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-8 h-8 flex items-center justify-center border border-slate-200 rounded-lg hover:bg-white hover:border-brand-light/30 transition-colors"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="space-y-1">
                    <div className="flex justify-between items-center">
                        <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Approx. Square Feet</label>
                        <span className="px-2 py-0.5 bg-brand-light/10 text-brand-light rounded-full text-[9px] font-black">{sqFt} SQ FT</span>
                    </div>
                    <input
                        type="range" min="500" max="6000" step="100"
                        value={sqFt}
                        onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                        className="w-full h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-light"
                    />
                </div>

                {/* Cleaning Type */}
                <div className="space-y-1">
                    <label className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Choose Cleaning Intensity</label>
                    <div className="grid grid-cols-3 gap-2">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`py-2 px-1 rounded-lg border transition-all font-bold text-[9px] ${cleaningType === opt.id ? "bg-brand-dark border-brand-dark text-white shadow-md translate-y-[-1px]" : "border-slate-100 text-slate-400 hover:border-brand-light/30"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={onNext}
                className="btn-sentient bg-accent text-brand-dark shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 w-full py-3 text-base shrink-0"
            >
                Select Frequency <ArrowRight size={16} />
            </button>

            <div className="bg-white/50 p-3 rounded-xl border border-brand-light/20 flex items-center gap-3 shrink-0">
                <div className="p-1.5 bg-white text-brand-light rounded-lg shadow-sm"><Sparkles size={14} /></div>
                <p className="text-[9px] text-slate-500 font-medium leading-tight text-left">
                    <strong>Tip:</strong> Deep Cleaning is recommended if not cleaned professionally in 30 days.
                </p>
            </div>
        </div>
    );
}
