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
        <div className="flex flex-col h-full justify-start md:justify-center gap-8 w-full max-w-2xl mx-auto py-2 antialiased">
            <div className="text-center space-y-2 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    Property <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Portfolio.</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Tailored Management Solutions</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 w-full shrink-0">
                {options.map((option) => (
                    <button
                        key={option.id}
                        type="button"
                        onClick={() => {
                            setValue("propertyCount", option.id as any);
                        }}
                        className={`group p-8 bg-white rounded-[3rem] text-left relative overflow-hidden transition-all duration-500 border-2 ${propertyCount === option.id
                            ? "border-[#05D16E] shadow-2xl shadow-[#05D16E]/10 scale-[1.02] z-10"
                            : "border-slate-50 hover:border-[#024653]/10 hover:shadow-xl hover:-translate-y-1"
                            }`}
                    >
                        <div className={`p-4 rounded-2xl ${propertyCount === option.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#F9F8F2] text-[#024653]/40"} w-fit mb-6 transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                            <option.icon size={24} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-xl md:text-2xl font-black tracking-tight mb-2 leading-tight text-[#024653] uppercase">{option.label}</h3>
                        <p className="text-[10px] md:text-[11px] text-[#024653]/40 font-bold leading-relaxed tracking-widest uppercase">{option.desc}</p>
                    </button>
                ))}
            </div>

            <div className="mt-4 shrink-0">
                <button
                    onClick={() => propertyCount && onNext()}
                    disabled={!propertyCount}
                    className="btn-accent shadow-2xl shadow-[#05D16E]/10 flex items-center justify-center gap-4 w-full py-8 text-base rounded-[2.5rem] group disabled:opacity-50"
                >
                    <span className="text-[12px] font-black uppercase tracking-[0.4em]">Initialize Setup</span>
                    <ArrowRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                </button>
            </div>
        </div>
    );
}
