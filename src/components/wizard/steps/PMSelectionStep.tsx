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
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="text-center space-y-1 mb-2 shrink-0">
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Property <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Portfolio.</span>
                        </h2>
                        <p className="text-[9px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Tailored Management Solutions</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 w-full shrink-0">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => {
                                    setValue("propertyCount", option.id as any);
                                }}
                                className={`group p-6 bg-white rounded-[2rem] text-left relative overflow-hidden transition-all duration-500 border-[3px] ${propertyCount === option.id
                                    ? "border-[#10f081] bg-[#024653] text-white shadow-xl scale-[1.02] z-10"
                                    : "border-slate-50 hover:border-[#024653]/10"
                                    }`}
                            >
                                <div className={`p-3 rounded-xl transition-colors ${propertyCount === option.id ? "bg-[#10f081] text-[#024653]" : "bg-[#F9F8F2] text-[#024653]/40"} w-fit mb-4 transition-all duration-500`}>
                                    <option.icon size={20} strokeWidth={2.5} />
                                </div>
                                <h3 className={`text-lg md:text-xl font-black tracking-tight mb-1 leading-tight uppercase ${propertyCount === option.id ? "text-white" : "text-[#024653]"}`}>{option.label}</h3>
                                <p className={`text-[9px] font-bold leading-relaxed tracking-widest uppercase ${propertyCount === option.id ? "text-white/60" : "text-[#024653]/40"}`}>{option.desc}</p>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="fixed bottom-6 right-0 w-full lg:w-[60%] z-50 flex justify-center pointer-events-none bg-transparent border-none shadow-none">
                <button
                    onClick={() => propertyCount && onNext()}
                    disabled={!propertyCount}
                    className="pointer-events-auto w-[380px] h-[56px] bg-[#024653] text-white font-bold rounded-xl shadow-2xl flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-xs hover:bg-[#0E6168] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Initialize Setup <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
