"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { Sparkles, Zap, Box, HardHat, CalendarDays, CalendarClock, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

interface QuickConfigStepProps {
    onNext: () => void;
}

const CLEANING_TYPES = [
    { id: "standard", label: "Standard", icon: Sparkles },
    { id: "deep", label: "Deep Clean", icon: Zap },
    { id: "move", label: "Move In/Out", icon: Box },
];

const FREQUENCIES = [
    { id: "weekly", label: "Weekly", discount: "-20%", icon: CalendarDays },
    { id: "biweekly", label: "Biweekly", discount: "-15%", icon: CalendarClock },
    { id: "monthly", label: "Monthly", discount: "-10%", icon: Calendar },
    { id: "onetime", label: "One-time", discount: null, icon: Clock },
];

export default function QuickConfigStep({ onNext }: QuickConfigStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();

    // Watch values to update UI and validity
    const cleaningType = watch("cleaningType") || "standard";
    const frequency = watch("frequency") || "biweekly";

    // Update Action Button
    useEffect(() => {
        setAction({
            label: "Review Quote",
            disabled: !cleaningType || !frequency,
            onClick: onNext
        });
    }, [cleaningType, frequency, onNext, setAction]);

    const handleTypeSelect = (id: string) => setValue("cleaningType", id as any);
    const handleFreqSelect = (id: string) => setValue("frequency", id as any);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-10">

                    {/* Header for Mobile */}
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Quick <br /> <span className="text-[#05D16E]">Config</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Customize your cleaning plan</p>
                    </div>

                    {/* SECTION: Cleaning Type */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#024653]/60">Intensity</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {CLEANING_TYPES.map((type) => {
                                const isSelected = cleaningType === type.id;
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => handleTypeSelect(type.id)}
                                        className={`
                                            relative flex flex-col items-center justify-center p-4 rounded-3xl border-2 transition-all h-32
                                            ${isSelected
                                                ? "bg-[#024653] border-[#024653] text-white shadow-lg scale-[1.02]"
                                                : "bg-white border-slate-100 text-[#024653] hover:border-[#05D16E]/50 hover:bg-[#05D16E]/5"
                                            }
                                        `}
                                    >
                                        <Icon size={28} className={`mb-3 ${isSelected ? "text-[#05D16E]" : "text-[#024653]/40"}`} />
                                        <span className={`text-xs font-black uppercase tracking-tight ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                            {type.label}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* SECTION: Frequency */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-sm font-black uppercase tracking-widest text-[#024653]/60">Frequency</h3>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {FREQUENCIES.map((freq) => {
                                const isSelected = frequency === freq.id;
                                const Icon = freq.icon;
                                return (
                                    <button
                                        key={freq.id}
                                        onClick={() => handleFreqSelect(freq.id)}
                                        className={`
                                            relative flex items-center gap-4 p-4 rounded-3xl border-2 transition-all text-left group
                                            ${isSelected
                                                ? "bg-white border-[#05D16E] shadow-md ring-4 ring-[#05D16E]/5"
                                                : "bg-white border-slate-100 hover:border-[#024653]/20"
                                            }
                                        `}
                                    >
                                        <div className={`
                                            w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                                            ${isSelected ? "bg-[#05D16E] text-white" : "bg-slate-50 text-[#024653]/30 group-hover:bg-[#024653]/10"}
                                        `}>
                                            <Icon size={18} />
                                        </div>
                                        <div>
                                            <div className="text-xs font-black uppercase tracking-tight text-[#024653]">{freq.label}</div>
                                            {freq.discount && (
                                                <div className="text-[10px] font-bold text-[#05D16E]">{freq.discount} Discount</div>
                                            )}
                                        </div>

                                        {isSelected && (
                                            <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-[#05D16E] animate-pulse" />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
