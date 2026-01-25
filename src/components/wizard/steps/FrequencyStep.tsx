"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";

interface FrequencyStepProps {
    onNext: () => void;
}

export default function FrequencyStep({ onNext }: FrequencyStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedFreq = watch("frequency");

    useEffect(() => {
        setAction({
            label: "View Your Quote",
            disabled: !selectedFreq,
            onClick: onNext
        });
    }, [selectedFreq, onNext, setAction]);

    const options = [
        { id: "one_time", label: "Just Once", discount: null },
        { id: "weekly", label: "Weekly", discount: "20% OFF" },
        { id: "biweekly", label: "Bi-Weekly", discount: "15% OFF" },
        { id: "monthly", label: "Monthly", discount: "10% OFF" },
    ];

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Cleaning <br /> <span className="text-[#05D16E]">Calendar</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">How often should we visit?</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {options.map((opt) => (
                            <button
                                key={opt.id}
                                onClick={() => setValue("frequency", opt.id as any)}
                                className={`p-6 rounded-[2rem] border-2 transition-all flex items-center justify-between group ${selectedFreq === opt.id
                                        ? "bg-[#024653] border-[#024653] shadow-lg scale-[1.02]"
                                        : "bg-white border-slate-100 hover:border-[#05D16E]"
                                    }`}
                            >
                                <span className={`text-lg font-black tracking-tight uppercase ${selectedFreq === opt.id ? "text-white" : "text-[#024653]"
                                    }`}>{opt.label}</span>

                                {opt.discount && (
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${selectedFreq === opt.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E]/10 text-[#05D16E]"
                                        }`}>
                                        {opt.discount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
