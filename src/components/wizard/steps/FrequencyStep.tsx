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
        <div className="flex flex-col h-full justify-start md:justify-center gap-6 w-full max-w-xl mx-auto py-2 antialiased">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-dark transition-all">
                    <ChevronLeft size={14} strokeWidth={3} /> Back
                </button>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Phase 04 / 05</span>
            </div>

            <div className="text-center space-y-2 shrink-0">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    How <span className="text-accent">Often</span>?
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">
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
                        }}
                        className={`group relative flex items-center justify-between px-4 py-3.5 rounded-2xl glass-card transition-all overflow-hidden border-2 ${selectedFreq === freq.id
                            ? "bg-brand-dark border-brand-dark text-white shadow-2xl scale-[1.01]"
                            : "border-transparent hover:border-slate-100 bg-white"
                            }`}
                    >
                        <div className="flex items-center gap-4">
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${selectedFreq === freq.id ? "border-brand-light" : "border-slate-200"
                                }`}>
                                <div className={`w-3 h-3 rounded-full bg-brand-light transition-transform duration-300 ${selectedFreq === freq.id ? "scale-100" : "scale-0"
                                    }`} />
                            </div>
                            <div className="text-left">
                                <span className={`block text-lg font-black tracking-tighter leading-none mb-1 transition-colors ${selectedFreq === freq.id ? "text-white" : "text-brand-dark"}`}>{freq.label}</span>
                                {freq.discount > 0 ? (
                                    <span className={`text-[10px] font-black uppercase tracking-[0.2em] flex items-center gap-1.5 ${selectedFreq === freq.id ? "text-accent" : "text-emerald-500"
                                        }`}>
                                        <TrendingDown size={10} strokeWidth={3} /> Save {freq.labelDiscount}
                                    </span>
                                ) : (
                                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Regular Price</span>
                                )}
                            </div>
                        </div>

                        {freq.id === "biweekly" && selectedFreq !== freq.id && (
                            <div className="bg-brand-light/10 text-brand-light px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-[0.2em] border border-brand-light/20 flex items-center gap-2 animate-pulse">
                                <Star size={10} className="fill-brand-light" /> Popular
                            </div>
                        )}

                        <ArrowRight className={`transition-all duration-300 ${selectedFreq === freq.id ? "opacity-100 text-accent translate-x-0" : "opacity-0 -translate-x-4"}`} size={18} strokeWidth={3} />
                    </button>
                ))}
            </div>

            <div className="mt-2 shrink-0">
                <button
                    onClick={onNext}
                    disabled={!selectedFreq}
                    className={`btn-sentient w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all duration-500 ${selectedFreq
                        ? "bg-accent text-brand-dark shadow-[0_10px_30px_rgba(5,209,110,0.2)] hover:scale-[1.01] active:scale-95"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                        }`}
                >
                    View My Estimate <ArrowRight size={18} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
