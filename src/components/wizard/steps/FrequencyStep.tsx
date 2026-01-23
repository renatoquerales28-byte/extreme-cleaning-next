"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { FREQUENCIES } from "@/lib/utils/pricing";
import { ChevronLeft, ArrowRight, TrendingDown, Star } from "lucide-react";

interface FrequencyStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function FrequencyStep({ onNext, onBack }: FrequencyStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const selectedFreq = watch("frequency");

    return (
        <div className="flex flex-col h-full justify-center gap-3 w-full max-w-xl mx-auto py-2">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={14} /> Back
                </button>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Step 04 / 05</span>
            </div>

            <div className="text-center space-y-1 shrink-0">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-dark leading-none">
                    How <span className="text-accent">Often</span>?
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                    Choose a plan that fits your lifestyle. Save up to 20%.
                </p>
            </div>

            <div className="grid gap-2 w-full shrink-0">
                {FREQUENCIES.map((freq) => (
                    <button
                        key={freq.id}
                        type="button"
                        onClick={() => {
                            setValue("frequency", freq.id as any);
                            onNext();
                        }}
                        className={`group relative flex items-center justify-between p-3 rounded-2xl glass-card transition-all overflow-hidden ${selectedFreq === freq.id ? "bg-brand-dark border-brand-dark text-white shadow-md scale-[1.01]" : "hover:scale-[1.01] hover:border-brand-light/30"
                            }`}
                    >
                        <div className="flex items-center gap-3">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedFreq === freq.id ? "border-brand-light" : "border-slate-100"
                                }`}>
                                <div className={`w-2.5 h-2.5 rounded-full bg-brand-light transition-transform ${selectedFreq === freq.id ? "scale-100" : "scale-0"
                                    }`} />
                            </div>
                            <div className="text-left">
                                <span className="block text-base font-black tracking-tight leading-none mb-0.5">{freq.label}</span>
                                {freq.discount > 0 ? (
                                    <span className={`text-[9px] font-black uppercase tracking-[0.2em] flex items-center gap-1 ${selectedFreq === freq.id ? "text-accent" : "text-emerald-500"
                                        }`}>
                                        <TrendingDown size={10} /> Save {freq.labelDiscount}
                                    </span>
                                ) : (
                                    <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400">Regular Price</span>
                                )}
                            </div>
                        </div>

                        {freq.id === "biweekly" && selectedFreq !== freq.id && (
                            <div className="bg-brand-light/10 text-brand-light px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest flex items-center gap-1">
                                <Star size={8} className="fill-brand-light" /> Popular
                            </div>
                        )}

                        <ArrowRight className={`opacity-0 group-hover:opacity-100 transition-all ${selectedFreq === freq.id ? "text-accent" : "text-slate-300"}`} size={16} />
                    </button>
                ))}
            </div>

            <button
                onClick={onNext}
                className="btn-sentient bg-accent text-brand-dark shadow-md hover:shadow-lg hover:scale-[1.01] transition-all flex items-center justify-center gap-2 w-full py-3 text-base shrink-0"
            >
                View My Estimate <ArrowRight size={16} />
            </button>
        </div>
    );
}
