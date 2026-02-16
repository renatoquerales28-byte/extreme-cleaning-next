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
    const data = watch();
    const businessType = data.businessType || "";
    const commSqFt = data.commSqFt || "";
    const floors = data.floors || 1;

    useEffect(() => {
        if (data.cleaningType === "post_construction" || data.cleaningType === "first_cleaning") {
            setValue("frequency", "onetime");
        }

        const canAdvance = !!(businessType && commSqFt && commSqFt > 0);

        setAction({
            label: "Review Logistics",
            disabled: !canAdvance,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [businessType, commSqFt, data.frequency, data.cleaningType, onNext, setAction, setValue]);

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
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#024653]">1. Facility Blueprint</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 space-y-6 flex flex-col justify-center">
                        {/* SQ FT CARD */}
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-6 shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="flex items-center justify-center text-[#05D16E] transition-all">
                                    <Ruler size={24} />
                                </div>
                                <span className="text-[10px] font-semibold uppercase tracking-widest text-[#024653]/30">Facility Footprint</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <input
                                    {...register("commSqFt", { valueAsNumber: true })}
                                    type="number"
                                    placeholder="5000"
                                    className="bg-transparent text-5xl font-bold text-[#024653] outline-none w-full tabular-nums placeholder:text-[#024653]/5"
                                />
                                <span className="text-[11px] font-bold text-[#024653]/10 uppercase tracking-[0.2em]">Sq. Ft.</span>
                            </div>
                        </div>

                        {/* FLOORS COUNTER */}
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-6 flex items-center justify-between shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center justify-center text-[#024653] shrink-0 transition-all">
                                    <Layers size={24} />
                                </div>
                                <div className="flex flex-col items-start leading-none">
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#024653]/30 group-hover:text-[#024653] transition-colors">Vertical</span>
                                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#024653]/30 group-hover:text-[#024653] transition-colors">Levels</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-5 justify-end">
                                <button type="button" onClick={() => handleFloor(floors - 1)} className="flex items-center justify-center text-[#024653] hover:text-red-500 transition-all active:scale-90">
                                    <Minus size={20} />
                                </button>
                                <span className="text-4xl font-bold text-[#024653] tabular-nums text-center min-w-[1ch]">{floors}</span>
                                <button type="button" onClick={() => handleFloor(floors + 1)} className="flex items-center justify-center text-[#024653] hover:text-[#05D16E] transition-all active:scale-90">
                                    <Plus size={20} />
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
                        <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#024653]">2. Business Classification</span>
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
                                        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
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
                            <p className="text-[8px] font-semibold uppercase tracking-[0.3em] leading-tight text-center">
                                Commercial High-Traffic Optimization Included
                            </p>
                        </div>
                    </div>
                </div>

            </div>

            {/* 3. BOTTOM: SERVICE FREQUENCY */}
            {data.cleaningType !== "post_construction" && data.cleaningType !== "first_cleaning" && (
                <div className="max-w-6xl mx-auto w-full px-6 mt-10">
                    <div className="flex items-center gap-3 ml-1 mb-4">
                        <div className="w-5 h-5 rounded-md bg-[#111111] flex items-center justify-center shadow-lg shadow-black/10">
                            <ArrowRight size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#024653]">3. Operational Schedule</span>
                    </div>

                    <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-2 relative overflow-hidden">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 relative z-10">
                            {[
                                { id: "daily", label: "Daily", offer: "Priority" },
                                { id: "weekly", label: "Weekly", offer: "Elite Upkeep" },
                                { id: "biweekly", label: "Bi-Weekly", offer: "Standard" },
                                { id: "onetime", label: "One-Time", offer: "Unique" }
                            ].map((freq) => {
                                const isSelected = watch("frequency") === freq.id;
                                return (
                                    <button
                                        key={freq.id}
                                        type="button"
                                        onClick={() => setValue("frequency", freq.id as any)}
                                        className={`
                                            relative py-4 px-6 rounded-xl border-2 transition-all duration-300 flex flex-col items-center justify-center gap-1
                                            ${isSelected
                                                ? "bg-[#024653] border-[#024653] text-white shadow-xl -translate-y-1"
                                                : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/10"
                                            }
                                        `}
                                    >
                                        <span className="text-[10px] font-bold uppercase tracking-widest">{freq.label}</span>
                                        <span className={`text-[8px] font-bold uppercase tracking-tighter ${isSelected ? "text-[#05D16E]" : "text-[#024653]/30"}`}>
                                            {freq.offer}
                                        </span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
