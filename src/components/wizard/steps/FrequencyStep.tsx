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
        <div className="flex flex-col h-full w-full max-w-xl mx-auto py-2 antialiased">
            <div className="text-center space-y-2 mb-4 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Select Your <br /><span className="text-[#05D16E]">Frequency.</span>
                </h2>
                <p className="text-[9px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Save more with recurring care</p>
            </div>

            <div className="grid grid-cols-1 gap-3 w-full shrink-0">
                {FREQUENCIES.map((freq) => (
                    <button
                        key={freq.id}
                        type="button"
                        onClick={() => setValue("frequency", freq.id as any)}
                        className={`group relative p-5 rounded-[2rem] border-2 text-left transition-all duration-500 overflow-hidden ${selectedFreq === freq.id
                            ? "bg-[#024653] border-[#024653] text-white"
                            : "bg-white border-slate-50 hover:border-[#024653]/20"
                            }`}
                    >
                        {/* Discount Badge */}
                        {freq.discount > 0 && (
                            <div className={`absolute top-5 right-5 px-2 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${selectedFreq === freq.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E]/10 text-[#05D16E]"}`}>
                                Save {Math.round(freq.discount * 100)}%
                            </div>
                        )}

                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-2xl transition-all duration-500 ${selectedFreq === freq.id ? "bg-white/10 text-[#05D16E] scale-110" : "bg-[#F9F8F2] text-[#024653]/40 group-hover:scale-110"}`}>
                                <Calendar size={20} strokeWidth={3} />
                            </div>
                            <div>
                                <h3 className="text-lg md:text-xl font-black tracking-tight uppercase mb-0.5">{freq.label}</h3>
                                <p className={`text-[10px] font-bold uppercase tracking-widest ${selectedFreq === freq.id ? "text-white/40" : "text-[#024653]/40"}`}>
                                    {freq.id === "onetime" ? "Perfect for occasional needs" : `The preferred choice for ${freq.label.toLowerCase()} maintenance`}
                                </p>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            <div className="mt-4 shrink-0">
                <button
                    onClick={onNext}
                    className="btn-accent flex items-center justify-center gap-4 w-full py-4 rounded-[2rem] group bg-[#024653] text-white hover:bg-[#0E6168]"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">View Your Quote</span>
                    <ArrowRight size={18} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    );
}
