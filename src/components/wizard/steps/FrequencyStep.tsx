"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { FREQUENCIES } from "@/lib/utils/pricing";
import { ChevronLeft, ArrowRight, TrendingDown, Star, Calendar } from "lucide-react";

interface FrequencyStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function FrequencyStep({ onNext, onBack }: FrequencyStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const selectedFreq = watch("frequency");

    const handleSelect = (id: string) => {
        setValue("frequency", id as any);
    };

    return (
        <div className="flex flex-col h-full w-full max-w-xl mx-auto py-4 antialiased">
            <div className="text-center space-y-4 mb-8 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-none">
                    Select Your <br /><span className="text-[#05D16E]">Frequency.</span>
                </h2>
                <p className="text-xs text-[#024653]/60 font-bold uppercase tracking-widest">Save more with recurring care</p>
            </div>

            <div className="space-y-4 w-full shrink-0">
                {FREQUENCIES.map((freq) => (
                    <button
                        key={freq.id}
                        type="button"
                        onClick={() => setValue("frequency", freq.id as any)}
                        className={`w-full group relative p-6 rounded-2xl border-2 text-left transition-all duration-200 flex items-center gap-6 ${selectedFreq === freq.id
                            ? "bg-[#024653] border-[#024653] text-white"
                            : "bg-white border-slate-100 hover:border-[#024653]/30"
                            }`}
                    >
                        <div className={`shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${selectedFreq === freq.id ? "bg-white/10 text-[#05D16E]" : "bg-[#F9F8F2] text-[#024653]/40"}`}>
                            <Calendar size={20} strokeWidth={2.5} />
                        </div>

                        <div className="flex-1">
                            <h3 className="text-lg font-black tracking-wide uppercase mb-1">{freq.label}</h3>
                            <p className={`text-[10px] font-bold uppercase tracking-wider ${selectedFreq === freq.id ? "text-white/40" : "text-[#024653]/40"}`}>
                                {freq.id === "onetime" ? "Standard Rates Apply" : `Best Value for maintenance`}
                            </p>
                        </div>

                        {/* Discount Badge */}
                        {freq.discount > 0 ? (
                            <div className={`px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${selectedFreq === freq.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E]/10 text-[#024653]"}`}>
                                -{Math.round(freq.discount * 100)}%
                            </div>
                        ) : (
                            <div className="w-12" /> // Spacer
                        )}
                    </button>
                ))}
            </div>

            <div className="mt-8 shrink-0">
                <button
                    onClick={onNext}
                    className="w-full py-5 bg-[#024653] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#0E6168] transition-colors"
                >
                    <span className="text-xs font-black uppercase tracking-[0.25em]">View Your Quote</span>
                    <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
