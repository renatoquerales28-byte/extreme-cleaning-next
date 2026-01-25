"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";

interface PMSelectionStepProps {
    onNext: () => void;
}

export default function PMSelectionStep({ onNext }: PMSelectionStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const propertyCount = watch("propertyCount") || 0;

    useEffect(() => {
        setAction({
            label: "Initialize Setup",
            disabled: !propertyCount,
            onClick: () => propertyCount && onNext()
        });
    }, [propertyCount, onNext, setAction]);

    const handleCount = (val: number) => {
        setValue("propertyCount", Math.max(0, val));
    };

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Property <br /> <span className="text-[#05D16E]">Manager?</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Manage multiple units efficiently</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-8 text-center">
                        <h3 className="text-xl font-black text-[#024653]">How many properties?</h3>

                        <div className="flex items-center justify-center gap-6">
                            <button onClick={() => handleCount(propertyCount - 1)} className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-2xl text-[#024653] hover:bg-[#024653] hover:text-white transition-colors">-</button>
                            <span className="text-5xl font-black text-[#024653] w-20 text-center">{propertyCount}</span>
                            <button onClick={() => handleCount(propertyCount + 1)} className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center font-black text-2xl text-[#024653] hover:bg-[#05D16E] hover:text-white transition-colors">+</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
