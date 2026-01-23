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
        <div className="flex flex-col items-center gap-12 w-full max-w-2xl mx-auto">
            <div className="flex items-center justify-between w-full">
                <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={16} /> Back
                </button>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Step 03 / 05</span>
            </div>

            <div className="text-center space-y-4">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-slate-900 leading-none">
                    Tell us about your <span className="text-cyan-500">Space</span>
                </h2>
                <p className="text-lg text-slate-500 font-medium italic">&quot;A clean home is a clean mind.&quot;</p>
            </div>

            <div className="w-full space-y-10">
                {/* Beds / Baths */}
                <div className="grid grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bedrooms</label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.max(1, bedrooms - 1))}
                                className="w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                            >-</button>
                            <span className="text-3xl font-black w-8 text-center">{bedrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bedrooms", Math.min(10, bedrooms + 1))}
                                className="w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                            >+</button>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Bathrooms</label>
                        <div className="flex items-center gap-4">
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.max(1, bathrooms - 1))}
                                className="w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                            >-</button>
                            <span className="text-3xl font-black w-8 text-center">{bathrooms}</span>
                            <button
                                type="button"
                                onClick={() => setValue("bathrooms", Math.min(10, bathrooms + 1))}
                                className="w-12 h-12 flex items-center justify-center border-2 border-slate-100 rounded-xl hover:bg-slate-50 transition-colors"
                            >+</button>
                        </div>
                    </div>
                </div>

                {/* SqFt Slider */}
                <div className="space-y-4">
                    <div className="flex justify-between items-center">
                        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Approx. Square Feet</label>
                        <span className="px-3 py-1 bg-cyan-50 text-cyan-600 rounded-full text-xs font-black">{sqFt} SQ FT</span>
                    </div>
                    <input
                        type="range" min="500" max="6000" step="100"
                        value={sqFt}
                        onChange={(e) => setValue("sqFt", parseInt(e.target.value))}
                        className="w-full h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                    />
                </div>

                {/* Cleaning Type */}
                <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Choose Cleaning Intensity</label>
                    <div className="grid grid-cols-3 gap-3">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`py-4 px-2 rounded-2xl border-2 transition-all font-bold text-xs ${cleaningType === opt.id ? "bg-black border-black text-white shadow-xl translate-y-[-2px]" : "border-slate-100 text-slate-400 hover:border-slate-200"
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
                className="btn-sentient btn-sentient-fuchsia flex items-center justify-center gap-3 w-full py-6 text-xl"
            >
                Select Frequency <ArrowRight size={20} />
            </button>

            <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100/50 flex items-start gap-4">
                <div className="p-3 bg-white text-cyan-500 rounded-2xl shadow-sm"><Sparkles size={20} /></div>
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                    <strong>Tip:</strong> Deep Cleaning is highly recommended if your home hasn&apos;t been professionally cleaned in the last 30 days.
                </p>
            </div>
        </div>
    );
}
