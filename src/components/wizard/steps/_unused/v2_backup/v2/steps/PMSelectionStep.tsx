"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../../WizardActionContext";
import { Minus, Plus, Building, Check, ArrowRight, Target, ShieldCheck, Briefcase } from "lucide-react";

interface PMSelectionStepProps {
    onNext: () => void;
}

const needs = [
    { id: "move-out", label: "Move-out clean" },
    { id: "common", label: "Common areas" },
    { id: "deep", label: "Deep clean" },
    { id: "post-con", label: "Post-con" }
];

export default function PMSelectionStep({ onNext }: PMSelectionStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const propertyCount = watch("propertyCount") || 1;
    const selectedNeeds = watch("serviceNeeds") || [];

    useEffect(() => {
        setAction({
            label: "Schedule Deployment",
            disabled: !propertyCount || selectedNeeds.length === 0,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [propertyCount, selectedNeeds.length, onNext, setAction]);

    const handleCount = (val: number) => {
        setValue("propertyCount", Math.max(1, val));
    };

    return (
        <div className="w-full h-full flex flex-col justify-center py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: PORTFOLIO SCALE */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Portfolio Scaling</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-center">
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-8 flex flex-col items-center gap-6 shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-3">
                                <Building size={16} className="text-[#024653]/30" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Active Units</span>
                            </div>

                            <div className="flex items-center gap-10">
                                <button type="button" onClick={() => handleCount(propertyCount - 1)} className="w-12 h-12 flex items-center justify-center bg-[#024653]/5 rounded-xl text-[#024653] hover:text-red-500 transition-all active:scale-90">
                                    <Minus size={18} />
                                </button>
                                <span className="text-7xl font-black text-[#024653] tabular-nums leading-none">{propertyCount}</span>
                                <button type="button" onClick={() => handleCount(propertyCount + 1)} className="w-12 h-12 flex items-center justify-center bg-[#024653]/5 rounded-xl text-[#024653] hover:text-[#05D16E] transition-all active:scale-90">
                                    <Plus size={18} />
                                </button>
                            </div>

                            <p className="text-[9px] font-black uppercase tracking-widest text-[#05D16E] bg-[#05D16E]/5 px-4 py-1.5 rounded-full">
                                {propertyCount > 5 ? 'Elite Portfolio Rates Active' : 'Standard Pro Pricing'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: OPERATIONAL NEEDS */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <Briefcase size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Operational Protocol</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-center">
                        <div className="grid grid-cols-1 gap-2">
                            {needs.map((need) => {
                                const isSelected = selectedNeeds.includes(need.label);
                                return (
                                    <label
                                        key={need.id}
                                        className={`
                                            group relative flex items-center justify-between p-5 rounded-xl border-2 cursor-pointer transition-all duration-300
                                            ${isSelected
                                                ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20 -translate-y-1"
                                                : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20 hover:shadow-md"
                                            }
                                        `}
                                    >
                                        <div className="flex items-center gap-4">
                                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-white/10 text-[#05D16E]' : 'bg-[#024653]/5 text-[#024653]'}`}>
                                                <Target size={14} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase tracking-[0.15em]">{need.label}</span>
                                        </div>
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isSelected ? "bg-[#05D16E] text-[#024653]" : "bg-[#024653]/5 text-transparent"}`}>
                                            <Check size={12} strokeWidth={4} />
                                        </div>
                                        <input type="checkbox" value={need.label} {...register("serviceNeeds")} className="sr-only" />
                                    </label>
                                );
                            })}
                        </div>

                        <div className="pt-8 mt-auto border-t border-[#024653]/5 flex items-center justify-center gap-3 opacity-20">
                            <ShieldCheck size={14} className="text-[#024653]" />
                            <p className="text-[8px] font-black uppercase tracking-[0.3em] leading-tight text-center">
                                High-Volume Operational Guarantee Active
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
