"use client";

import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { EXTRAS_LIST } from "@/lib/utils/pricing";
import { ArrowRight, Sparkles, Target, ShieldPlus } from "lucide-react";

interface ExtrasStepProps {
    onNext: () => void;
}

export default function ExtrasStep({ onNext }: ExtrasStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const watchedExtras = watch("extras");
    const extras = useMemo(() => watchedExtras || [], [watchedExtras]);

    const toggleExtra = (id: string) => {
        const current = [...extras];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setValue("extras", current);
    };

    useEffect(() => {
        setAction({
            label: "Continue",
            onClick: onNext,
            disabled: false,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [onNext, setAction]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-2">
            <div className="max-w-6xl mx-auto w-full px-6 space-y-6">

                {/* Section Header */}
                <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20">
                            <Sparkles size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">Premium Enhancements</span>
                    </div>
                    {extras.length > 0 && (
                        <div className="flex items-center gap-2 px-3 py-1 bg-[#024653] rounded-full">
                            <ShieldPlus size={10} className="text-[#05D16E]" />
                            <span className="text-[9px] font-black uppercase text-white tracking-widest">{extras.length} Selected</span>
                        </div>
                    )}
                </div>

                {/* Bento Container */}
                <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 lg:p-6">
                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {EXTRAS_LIST.filter(e => ["oven", "fridge", "windows", "cabinets"].includes(e.id)).map((extra) => {
                            const isSelected = extras.includes(extra.id);
                            return (
                                <button
                                    key={extra.id}
                                    type="button"
                                    onClick={() => toggleExtra(extra.id)}
                                    className={`
                                        relative p-5 lg:p-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-4 group
                                        ${isSelected
                                            ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20 -translate-y-1"
                                            : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20 hover:shadow-md"
                                        }
                                    `}
                                >
                                    <div className={`
                                        w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-500
                                        ${isSelected ? "bg-white/10" : "bg-[#024653]/5 group-hover:bg-[#024653]/10"}
                                    `}>
                                        <span className={isSelected ? "saturate-100" : "grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100"}>
                                            {extra.icon}
                                        </span>
                                    </div>
                                    <div className="text-center">
                                        <span className="text-[10px] font-black uppercase tracking-tight block leading-none mb-1">
                                            {extra.label}
                                        </span>
                                        <span className={`text-[7px] font-bold uppercase tracking-widest opacity-40 ${isSelected ? 'text-[#05D16E]' : ''}`}>
                                            Elite Add-on
                                        </span>
                                    </div>

                                    {isSelected && (
                                        <div className="absolute top-2 right-2">
                                            <div className="w-2 h-2 rounded-full bg-[#05D16E] shadow-[0_0_8px_#05D16E]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Insight */}
                <div className="flex items-center justify-center gap-3 pt-2 opacity-20">
                    <Target size={12} className="text-[#024653]" />
                    <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#024653]">
                        Tailored Perfection Protocol
                    </p>
                </div>
            </div>
        </div>
    );
}
