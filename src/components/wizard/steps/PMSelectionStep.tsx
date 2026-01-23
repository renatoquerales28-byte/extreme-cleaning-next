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
        <div className="flex flex-col h-full justify-start md:justify-center gap-6 w-full max-w-xl mx-auto py-2 antialiased">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-brand-dark transition-all">
                    <ChevronLeft size={14} strokeWidth={3} /> Back
                </button>
                <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">Phase 03 / 05</span>
            </div>

            <div className="text-center space-y-2 shrink-0">
                <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Property <span className="text-emerald-500">Portfolio</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">How many units do you manage?</p>
            </div>

            <div className="grid md:grid-cols-2 gap-4 w-full shrink-0">
                {options.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                            setValue("propertyCount", option.id as any);
                        }}
                        className={`group p-6 glass-card rounded-3xl text-left relative overflow-hidden transition-all duration-300 border-2 ${propertyCount === option.id
                            ? "border-brand-dark bg-slate-50/50 shadow-2xl scale-[1.03] z-10"
                            : "border-transparent hover:border-slate-100 hover:scale-[1.01]"
                            }`}
                    >
                        <div className={`p-3 rounded-2xl bg-emerald-500/10 text-emerald-500 w-fit mb-4 transition-transform group-hover:scale-110`}>
                            <option.icon size={22} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-xl font-black tracking-tighter mb-1 leading-tight">{option.label}</h3>
                        <p className="text-[11px] text-slate-500 font-bold leading-snug tracking-tight">{option.desc}</p>
                    </button>
                ))}
            </div>

            <div className="mt-2 shrink-0">
                <button
                    onClick={() => propertyCount && onNext()}
                    disabled={!propertyCount}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all duration-500 shrink-0 ${propertyCount
                        ? "bg-brand-dark text-white shadow-[0_10px_30px_rgba(2,70,83,0.3)] hover:bg-black hover:scale-[1.01] active:scale-95"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                        }`}
                >
                    Confirm & Continue <ArrowRight size={18} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
