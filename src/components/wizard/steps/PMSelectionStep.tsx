"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { ChevronLeft, Building, Key, ArrowRight } from "lucide-react";

interface PMSelectionStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function PMSelectionStep({ onNext, onBack }: PMSelectionStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const propertyCount = watch("propertyCount");

    const options = [
        { id: "1-3", label: "1-3 Properties", desc: "Small portfolio / Individual host", icon: Key },
        { id: "4+", label: "4+ Properties", desc: "Professional Property Manager", icon: Building },
    ];

    return (
        <div className="flex flex-col gap-8 w-full py-4">
            <div className="flex items-center justify-between w-full">
                <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={16} /> Back
                </button>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Step 03 / 05</span>
            </div>

            <div className="space-y-2">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900">
                    Property <span className="text-emerald-500">Portfolio</span>
                </h2>
                <p className="text-base text-slate-500 font-medium">How many units do you manage?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 w-full">
                {options.map((option) => (
                    <button
                        key={option.id}
                        onClick={() => {
                            setValue("propertyCount", option.id as any);
                            onNext();
                        }}
                        className={`group p-6 glass-card rounded-[1.5rem] text-left relative overflow-hidden transition-all duration-300 ${propertyCount === option.id ? "ring-4 ring-black scale-[1.02]" : "hover:scale-[1.02]"
                            }`}
                    >
                        <option.icon size={24} className={`mb-3 ${propertyCount === option.id ? "text-emerald-500" : "text-slate-400 group-hover:text-emerald-500"}`} />
                        <h3 className="text-xl font-black tracking-tighter mb-1">{option.label}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{option.desc}</p>
                    </button>
                ))}
            </div>
        </div>
    );
}
