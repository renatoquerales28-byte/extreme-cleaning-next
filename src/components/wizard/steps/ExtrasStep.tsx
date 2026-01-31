"use client";

import React, { useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { EXTRAS_LIST } from "@/lib/utils/pricing";
import { CheckCircle2, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ExtrasStepProps {
    onNext: () => void;
}

export default function ExtrasStep({ onNext }: ExtrasStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedExtras = watch("extras") || [];

    const toggleExtra = (id: string) => {
        const current = [...selectedExtras];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setValue("extras", current);
    };

    const handleNext = useCallback(() => {
        onNext();
    }, [onNext]);

    useEffect(() => {
        setAction({
            label: "Continue to Frequency",
            onClick: handleNext,
            disabled: false,
            secondaryContent: selectedExtras.length > 0 && (
                <div className="flex items-center gap-2 px-4 py-2 bg-[#05D16E]/10 rounded-full border border-[#05D16E]/20 animate-in fade-in zoom-in">
                    <CheckCircle2 size={12} className="text-[#05D16E]" />
                    <span className="text-[10px] font-black text-[#024653] uppercase tracking-widest">
                        {selectedExtras.length} Extras Added
                    </span>
                </div>
            )
        });
    }, [selectedExtras, handleNext, setAction]);

    return (
        <div className="h-full w-full relative flex flex-col">
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Want some <br /> <span className="text-[#05D16E]">Extras?</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">
                            Add premium services to your cleaning plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {EXTRAS_LIST.map((extra, idx) => {
                            const isSelected = selectedExtras.includes(extra.id);
                            return (
                                <motion.button
                                    key={extra.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => toggleExtra(extra.id)}
                                    className={`
                                        relative p-6 rounded-[2rem] border-2 text-left transition-all group flex flex-col justify-between h-40
                                        ${isSelected
                                            ? "bg-white border-[#05D16E] shadow-md ring-4 ring-[#05D16E]/5"
                                            : "bg-white border-slate-50 hover:border-[#05D16E]/30"
                                        }
                                    `}
                                >
                                    <div className="flex justify-between items-start">
                                        <span className="text-3xl">{extra.icon}</span>
                                        <div className={`
                                            w-6 h-6 rounded-full flex items-center justify-center transition-all
                                            ${isSelected ? "bg-[#05D16E] text-white" : "bg-slate-100 text-[#024653]/20 group-hover:bg-slate-200"}
                                        `}>
                                            {isSelected ? <CheckCircle2 size={14} strokeWidth={3} /> : <Plus size={14} strokeWidth={3} />}
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-[#024653] font-black text-sm uppercase tracking-tight">{extra.label}</h3>
                                        <p className="text-[10px] font-bold text-[#024653]/40 uppercase tracking-widest">Add to plan</p>
                                    </div>

                                    {isSelected && (
                                        <div className="absolute top-4 right-4 animate-ping-slow pointer-events-none">
                                            <div className="w-2 h-2 rounded-full bg-[#05D16E]" />
                                        </div>
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
