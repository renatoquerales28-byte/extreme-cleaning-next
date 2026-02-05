"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { Sparkles, Zap, Box, CalendarDays, CalendarClock, Calendar, Clock, Check } from "lucide-react";
import { motion } from "framer-motion";

interface QuickConfigStepProps {
    onNext: () => void;
}

const CLEANING_TYPES = [
    { id: "standard", label: "Standard", icon: Sparkles, sub: "Tidy up" },
    { id: "deep", label: "Deep Clean", icon: Zap, sub: "Heavy duty" },
    { id: "move", label: "Move In/Out", icon: Box, sub: "Turnover" },
];

const FREQUENCIES = [
    { id: "weekly", label: "Weekly", discount: "20% OFF", icon: CalendarDays },
    { id: "biweekly", label: "Biweekly", discount: "15% OFF", icon: CalendarClock },
    { id: "monthly", label: "Monthly", discount: "10% OFF", icon: Calendar },
    { id: "onetime", label: "One-time", discount: null, icon: Clock },
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
            onClick: onNext
        });
    }, [cleaningType, frequency, onNext, setAction]);

    const handleTypeSelect = (id: string) => setValue("cleaningType", id as any);
    const handleFreqSelect = (id: string) => setValue("frequency", id as any);

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl space-y-10">

                {/* SECTION: Cleaning Type */}
                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">Cleaning Intensity</label>
                    <div className="grid grid-cols-3 gap-4">
                        {CLEANING_TYPES.map((type) => {
                            const isSelected = cleaningType === type.id;
                            const Icon = type.icon;
                            return (
                                <motion.button
                                    key={type.id}
                                    whileHover={{ y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleTypeSelect(type.id)}
                                    className={`
                                        relative flex flex-col items-center justify-center p-6 rounded-[2rem] border transition-all h-36
                                        ${isSelected
                                            ? "bg-[#024653] border-[#024653] text-white shadow-xl"
                                            : "bg-white border-[#024653]/5 text-[#024653] shadow-sm hover:border-[#024653]/20"
                                        }
                                    `}
                                >
                                    <Icon size={28} className={`mb-4 ${isSelected ? "text-[#05D16E]" : "text-[#024653]/40"}`} />
                                    <div className="text-center">
                                        <div className="text-xs font-bold uppercase tracking-tight leading-none mb-1">{type.label}</div>
                                        <div className={`text-[9px] font-bold uppercase tracking-[0.1em] opacity-40 ${isSelected ? "text-white" : "text-[#024653]"}`}>{type.sub}</div>
                                    </div>
                                    {isSelected && (
                                        <div className="absolute top-4 right-4 text-[#05D16E]"><Check size={14} strokeWidth={4} /></div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>

                {/* SECTION: Frequency */}
                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">Service Schedule</label>
                    <div className="grid grid-cols-2 gap-4">
                        {FREQUENCIES.map((freq) => {
                            const isSelected = frequency === freq.id;
                            const Icon = freq.icon;
                            return (
                                <motion.button
                                    key={freq.id}
                                    whileHover={{ x: 2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleFreqSelect(freq.id)}
                                    className={`
                                        flex items-center gap-4 p-6 rounded-[2rem] border transition-all text-left shadow-sm
                                        ${isSelected
                                            ? "bg-[#024653] border-[#024653] text-white shadow-xl"
                                            : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20"
                                        }
                                    `}
                                >
                                    <div className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors
                                        ${isSelected ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"}
                                    `}>
                                        <Icon size={20} />
                                    </div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold tracking-tight">{freq.label}</div>
                                        {freq.discount && (
                                            <div className="text-[10px] font-bold text-[#05D16E]">{freq.discount} SAVINGS</div>
                                        )}
                                    </div>
                                    {isSelected && (
                                        <div className="text-[#05D16E]"><Check size={14} strokeWidth={4} /></div>
                                    )}
                                </motion.button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
