"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { Building2, Minus, Plus, ArrowRight, Layers, Target, Ruler, ShieldCheck } from "lucide-react";

interface CommercialStepProps {
    onNext: () => void;
}

const businessTypes = [
    { label: "Office", id: "Office" },
    { label: "Retail", id: "Retail" },
    { label: "Healthcare", id: "Healthcare" },
    { label: "Restaurant", id: "Restaurant" },
    { label: "Industrial", id: "Industrial" },
    { label: "Other", id: "Other" }
];

export default function CommercialStep({ onNext }: CommercialStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const businessType = watch("businessType") || "";
    const commSqFt = watch("commSqFt") || "";
    const floors = watch("floors") || 1;

    useEffect(() => {
        setAction({
            label: "Review Logistics",
            disabled: !businessType || !commSqFt,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [businessType, commSqFt, onNext, setAction]);

    const handleFloor = (val: number) => {
        setValue("floors", Math.max(1, val));
    };

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: FACILITY METRICS */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Facility Blueprint</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 space-y-6 flex flex-col justify-center">
                        {/* SQ FT CARD */}
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-6 shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-lg bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                                    <Ruler size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Facility Footprint</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <input
                                    {...register("commSqFt", { valueAsNumber: true })}
                                    type="number"
                                    placeholder="5000"
                                    className="bg-transparent text-5xl font-black text-[#024653] outline-none w-full tabular-nums placeholder:text-[#024653]/5"
                                />
                                <span className="text-[11px] font-black text-[#024653]/10 uppercase tracking-[0.2em]">Sq. Ft.</span>
                            </div>
                        </div>

                        {/* FLOORS COUNTER */}
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-6 flex items-center justify-between shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-lg bg-[#024653]/5 flex items-center justify-center text-[#024653] shrink-0">
                                    <Layers size={20} />
                                </div>
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Vertical</span>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Levels</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 bg-[#024653]/5 rounded-xl p-1.5 min-w-[140px] justify-between">
                                <button type="button" onClick={() => handleFloor(floors - 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-[#024653] shadow-sm hover:text-red-500 transition-all active:scale-90">
                                    <Minus size={14} />
                                </button>
                                <span className="text-2xl font-black text-[#024653] tabular-nums text-center">{floors}</span>
                                <button type="button" onClick={() => handleFloor(floors + 1)} className="w-10 h-10 flex items-center justify-center bg-white rounded-lg text-[#024653] shadow-sm hover:text-[#05D16E] transition-all active:scale-90">
                                    <Plus size={14} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: DIVISION CLASSIFICATION */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <Building2 size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Business Classification</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-3">
                            {businessTypes.map((type) => {
                                const isSelected = businessType === type.id;
                                return (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setValue("businessType", type.id)}
                                        className={`
                                            p-4 rounded-xl border-2 transition-all duration-300 group relative text-center
                                            ${isSelected
                                                ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20 -translate-y-1"
                                                : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20 hover:shadow-md"
                                            }
                                        `}
                                    >
                                        <span className="text-[10px] font-black uppercase tracking-[0.15em]">
                                            {type.label}
                                        </span>
                                        {isSelected && (
                                            <div className="absolute top-2 right-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E] shadow-[0_0_8px_#05D16E]" />
                                            </div>
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        <div className="pt-8 mt-auto border-t border-[#024653]/5 flex items-center justify-center gap-3 opacity-20">
                            <ShieldCheck size={14} className="text-[#024653]" />
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] leading-tight text-center">
                                Commercial High-Traffic Optimization Included
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
