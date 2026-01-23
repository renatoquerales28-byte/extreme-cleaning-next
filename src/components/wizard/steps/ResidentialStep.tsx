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
        <div className="flex flex-col h-full justify-start md:justify-center gap-5 w-full max-w-xl mx-auto py-2 antialiased">
            {/* Nav removed in favor of parent wizard layout */}

            <div className="text-center space-y-2 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Tell us about your <span className="text-brand-light">Space</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight italic">&quot;A clean home is a clean mind.&quot;</p>
            </div>

            <div className="w-full space-y-5 shrink-0">
                {/* Beds / Baths */}
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Bedrooms</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-10 h-10 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-white hover:border-brand-light/30 transition-all font-bold text-lg active:scale-90"
                            >-</button>
                            <span className="text-2xl font-black w-8 text-center text-brand-dark">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-10 h-10 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-white hover:border-brand-light/30 transition-all font-bold text-lg active:scale-90"
                            >+</button>
                        </div>
                    </div>
                    <div className="space-y-2">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Bathrooms</label>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-10 h-10 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-white hover:border-brand-light/30 transition-all font-bold text-lg active:scale-90"
                            >-</button>
                            <span className="text-2xl font-black w-8 text-center text-brand-dark">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-10 h-10 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-white hover:border-brand-light/30 transition-all font-bold text-lg active:scale-90"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="space-y-2">
                    <div className="flex justify-between items-center mb-1">
                        <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Approx. Square Feet</label>
                        <span className="px-3 py-1 bg-brand-light/10 text-brand-light rounded-full text-[11px] font-black tracking-tight">{sqFt} SQ FT</span>
                    </div>
                    <input
                        type="range" min="500" max="6000" step="100"
                        value={sqFt}
                        onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-light outline-none transition-all focus:ring-2 focus:ring-brand-light/20"
                    />
                </div>

                {/* Cleaning Type */}
                <div className="space-y-2">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Choose Cleaning Intensity</label>
                    <div className="grid grid-cols-3 gap-3">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`py-3 px-2 rounded-xl border-2 transition-all font-black text-[11px] uppercase tracking-wider ${cleaningType === opt.id
                                    ? "bg-brand-dark border-brand-dark text-white shadow-sm scale-[1.02]"
                                    : "border-slate-100 text-slate-400 hover:border-brand-light/30 bg-white"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-2 shrink-0 space-y-4">
                <button
                    onClick={onNext}
                    className="btn-sentient bg-accent text-brand-dark shadow-md hover:scale-[1.01] transition-all flex items-center justify-center gap-3 w-full py-4 md:py-5 text-[11px] font-black uppercase tracking-[0.2em] active:scale-95"
                >
                    Select Frequency <ArrowRight size={18} strokeWidth={3} />
                </button>

                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
                    <div className="p-2 bg-white text-brand-light rounded-xl shadow-sm"><Sparkles size={16} strokeWidth={2.5} /></div>
                    <p className="text-[11px] text-slate-500 font-bold leading-normal text-left tracking-tight">
                        <strong>Pro Tip:</strong> Deep Cleaning is recommended if your home hasn&apos;t been professionally cleaned in over 30 days.
                    </p>
                </div>
            </div>
        </div>
    );
}
