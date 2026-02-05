"use client";

import React, { useEffect, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { EXTRAS_LIST } from "@/lib/utils/pricing";
import { Check, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface ExtrasStepProps {
    onNext: () => void;
}

export default function ExtrasStep({ onNext }: ExtrasStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const extras = watch("extras") || [];

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
            label: "Select Frequency",
            onClick: onNext,
            disabled: false,
            secondaryContent: extras.length > 0 && (
                <div className="flex items-center gap-2 px-6 py-2 bg-white/80 rounded-full border border-[#024653]/5 shadow-sm backdrop-blur-sm animate-in fade-in zoom-in slide-in-from-bottom-2">
                    <div className="w-2 h-2 rounded-full bg-[#05D16E]" />
                    <span className="text-[10px] font-bold text-[#024653] uppercase tracking-widest">
                        {extras.length} Extras Selected
                    </span>
                </div>
            )
        });
    }, [extras, onNext, setAction]);

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-fr">
                {EXTRAS_LIST.map((extra, idx) => {
                    const isSelected = extras.includes(extra.id);
                    return (
                        <motion.button
                            key={extra.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            onClick={() => toggleExtra(extra.id)}
                            className={`
                                relative p-6 rounded-[2rem] border transition-all flex flex-col justify-between h-44 text-left group
                                ${isSelected
                                    ? "bg-[#024653] border-[#024653] text-white shadow-xl"
                                    : "bg-white border-[#024653]/5 text-[#024653] shadow-sm hover:border-[#024653]/20"
                                }
                            `}
                        >
                            <div className="flex justify-between items-start">
                                <span className="text-3xl filter saturate-[0.8] group-hover:saturate-100 transition-all">{extra.icon}</span>
                                <div className={`
                                    w-8 h-8 rounded-xl flex items-center justify-center transition-all
                                    ${isSelected ? "bg-[#05D16E] text-[#024653]" : "bg-[#F9F8F2] text-[#024653]/20"}
                                `}>
                                    {isSelected ? <Check size={16} strokeWidth={4} /> : <Plus size={16} strokeWidth={3} />}
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className={`text-[11px] font-bold uppercase tracking-widest leading-tight ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                    {extra.label}
                                </h3>
                                <div className={`text-[9px] font-bold uppercase tracking-tighter opacity-40 ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                    Premium Add-on
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
