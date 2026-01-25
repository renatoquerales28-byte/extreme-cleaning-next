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
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-4">
                    <div className="space-y-3 w-full">
                        {FREQUENCIES.map((freq) => (
                            <button
                                key={freq.id}
                                type="button"
                                onClick={() => setValue("frequency", freq.id as any)}
                                className={`w-full group relative p-5 rounded-2xl border-[3px] text-left transition-all duration-300 flex items-center gap-4 ${selectedFreq === freq.id
                                    ? "bg-[#024653] border-[#10f081] text-white shadow-xl scale-[1.01] z-10"
                                    : "bg-white border-slate-50 hover:border-[#024653]/10"
                                    }`}
                            >
                                <div className={`shrink-0 w-12 h-12 rounded-[1rem] flex items-center justify-center transition-colors ${selectedFreq === freq.id ? "bg-[#10f081] text-[#024653]" : "bg-[#F9F8F2] text-[#024653]/30"}`}>
                                    <Calendar size={20} strokeWidth={2.5} />
                                </div>

                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-black tracking-wide uppercase mb-0.5 truncate">{freq.label}</h3>
                                    <p className={`text-[9px] font-bold uppercase tracking-wider truncate ${selectedFreq === freq.id ? "text-white/40" : "text-[#024653]/40"}`}>
                                        {freq.id === "onetime" ? "Standard Rates Apply" : `Best Value for maintenance`}
                                    </p>
                                </div>

                                {/* Discount Badge */}
                                {freq.discount > 0 ? (
                                    <div className={`shrink-0 px-2 py-1 rounded-md text-[9px] font-black uppercase tracking-widest ${selectedFreq === freq.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E]/10 text-[#024653]"}`}>
                                        -{Math.round(freq.discount * 100)}%
                                    </div>
                                ) : (
                                    <div className="w-8" /> // Spacer
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="fixed bottom-0 right-0 w-full lg:w-[60%] z-50 px-6 pb-6 pt-12 bg-gradient-to-t from-[#F9F8F2] via-[#F9F8F2] to-transparent pointer-events-none">
                <div className="w-full max-w-xl mx-auto pointer-events-auto">
                    <button
                        onClick={onNext}
                        disabled={!selectedFreq}
                        className="w-full py-6 bg-[#024653] text-white rounded-2xl shadow-xl text-xs font-black uppercase tracking-[0.25em] hover:bg-[#0E6168] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                    >
                        View Your Quote <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
