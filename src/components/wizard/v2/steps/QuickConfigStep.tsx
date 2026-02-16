"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { Sparkles, Zap, Box, CalendarDays, CalendarClock, Calendar, Clock, Check, ArrowRight, Target, ShieldPlus } from "lucide-react";

const CLEANING_TYPES = [
    { id: "standard", label: "Standard", icon: Sparkles, sub: "Tidy up" },
    { id: "deep", label: "Deep Clean", icon: Zap, sub: "Heavy duty" },
    { id: "move", label: "Move In/Out", icon: Box, sub: "Turnover" },
];

const FREQUENCIES = [
    { id: "weekly", label: "Weekly", discount: "20%", icon: CalendarDays },
    { id: "biweekly", label: "Biweekly", discount: "15%", icon: CalendarClock },
    { id: "monthly", label: "Monthly", discount: "10%", icon: Calendar },
    { id: "onetime", label: "Unique", discount: null, icon: Clock },
];

export default function QuickConfigStep({ onNext }: QuickConfigStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();

    const cleaningType = watch("cleaningType") || "standard";
    const frequency = watch("frequency") || "biweekly";

    useEffect(() => {
        setAction({
            label: "Review Quote",
            disabled: !cleaningType || !frequency,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [cleaningType, frequency, onNext, setAction]);

    const handleTypeSelect = (id: string) => setValue("cleaningType", id as any);
    const handleFreqSelect = (id: string) => setValue("frequency", id as any);

    return (
        <div className="w-full h-full flex flex-col justify-center py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: CLEANING INTENSITY */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Cleaning Intensity</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 space-y-3 flex flex-col justify-center">
                        {CLEANING_TYPES.map((type) => {
                            const isSelected = cleaningType === type.id;
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => handleTypeSelect(type.id)}
                                    className={`
                                        relative flex items-center gap-6 p-5 rounded-xl border-2 transition-all duration-300 group
                                        ${isSelected
                                            ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/10 -translate-y-1"
                                            : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/30"
                                        }
                                    `}
                                >
                                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-white/10 text-[#05D16E]' : 'bg-[#024653]/5 text-[#024653]'}`}>
                                        <Icon size={24} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[11px] font-black uppercase tracking-widest leading-none mb-1">{type.label}</p>
                                        <p className={`text-[8px] font-bold uppercase tracking-widest opacity-40 ${isSelected ? "text-[#05D16E]" : ""}`}>
                                            {type.sub}
                                        </p>
                                    </div>
                                    {isSelected && (
                                        <div className="ml-auto">
                                            <div className="w-2 h-2 rounded-full bg-[#05D16E] shadow-[0_0_8px_#05D16E]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: SERVICE FREQUENCY */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <ShieldPlus size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Service Cadence</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-3">
                            {FREQUENCIES.map((freq) => {
                                const isSelected = frequency === freq.id;
                                const Icon = freq.icon;
                                return (
                                    <button
                                        key={freq.id}
                                        type="button"
                                        onClick={() => handleFreqSelect(freq.id)}
                                        className={`
                                            relative flex flex-col items-center justify-center p-6 rounded-xl border-2 transition-all duration-300 group
                                            ${isSelected
                                                ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20 -translate-y-1"
                                                : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20 hover:shadow-md"
                                            }
                                        `}
                                    >
                                        <Icon size={20} className={`mb-3 transition-colors ${isSelected ? "text-[#05D16E]" : "text-[#024653]/30"}`} />
                                        <div className="text-center">
                                            <p className="text-[10px] font-black uppercase tracking-widest leading-none">{freq.label}</p>
                                            {freq.discount && (
                                                <p className="text-[9px] font-black text-[#05D16E] mt-1 tabular-nums italic">-{freq.discount}</p>
                                            )}
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-3 right-3">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E] shadow-[0_0_8px_#05D16E]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                        <div className="pt-8 mt-auto border-t border-[#024653]/5">
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] opacity-20 text-center">
                                Tailored Continuity Protocols Active
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

interface QuickConfigStepProps {
    onNext: () => void;
}
