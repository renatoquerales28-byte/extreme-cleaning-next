"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { Minus, Plus, Building, Check } from "lucide-react";
import { motion } from "framer-motion";

interface PMSelectionStepProps {
    onNext: () => void;
}

export default function PMSelectionStep({ onNext }: PMSelectionStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const propertyCount = watch("propertyCount") || 1;
    const selectedNeeds = watch("serviceNeeds") || [];

    useEffect(() => {
        setAction({
            label: "Initialize Configuration",
            disabled: !propertyCount,
            onClick: () => propertyCount && onNext()
        });
    }, [propertyCount, onNext, setAction]);

    const handleCount = (val: number) => {
        setValue("propertyCount", Math.max(0, val));
    };

    const needs = [
        { id: "move-out", label: "Move-out cleaning" },
        { id: "common", label: "Common areas" },
        { id: "deep", label: "Deep clean" }
    ];

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">

                {/* Unit Counter Card */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-[#024653]/5 shadow-sm flex flex-col justify-between">
                    <div>
                        <div className="w-12 h-12 rounded-2xl bg-[#024653]/5 flex items-center justify-center text-[#024653] mb-6">
                            <Building size={24} />
                        </div>
                        <h3 className="text-2xl font-bold text-[#024653]">Properties</h3>
                        <p className="text-sm text-[#024653]/40">How many units in your portfolio?</p>
                    </div>

                    <div className="flex items-center justify-between bg-[#F9F8F2] p-2 rounded-2xl mt-12">
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleCount(propertyCount - 1)} className="w-14 h-14 flex items-center justify-center rounded-xl bg-white shadow-sm text-[#024653] hover:text-red-500 transition-colors">
                            <Minus size={24} />
                        </motion.button>
                        <span className="text-4xl font-bold text-[#024653] w-16 text-center">{propertyCount}</span>
                        <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleCount(propertyCount + 1)} className="w-14 h-14 flex items-center justify-center rounded-xl bg-white shadow-sm text-[#024653] hover:text-[#05D16E] transition-colors">
                            <Plus size={24} />
                        </motion.button>
                    </div>
                </div>

                {/* Service Needs Card */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-[#024653]/5 shadow-sm space-y-6">
                    <div>
                        <h3 className="text-xl font-bold text-[#024653]">Service Spectrum</h3>
                        <p className="text-sm text-[#024653]/40">Select all that apply</p>
                    </div>

                    <div className="space-y-3">
                        {needs.map((need) => {
                            const isSelected = selectedNeeds.includes(need.label);
                            return (
                                <label key={need.id} className={`group flex items-center justify-between p-5 rounded-2xl cursor-pointer transition-all border ${isSelected
                                    ? "bg-[#024653] border-[#024653] text-white shadow-lg"
                                    : "bg-[#F9F8F2] border-transparent text-[#024653]/60 hover:border-[#024653]/20"
                                    }`}>
                                    <span className={`font-bold text-xs uppercase tracking-widest ${isSelected ? "text-white" : "text-[#024653]/60"}`}>{need.label}</span>
                                    <div className="relative">
                                        <input
                                            type="checkbox"
                                            value={need.label}
                                            {...register("serviceNeeds")}
                                            className="sr-only"
                                        />
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-all ${isSelected ? "bg-[#05D16E] text-[#024653]" : "bg-white border border-[#024653]/10"}`}>
                                            {isSelected && <Check size={14} strokeWidth={4} />}
                                        </div>
                                    </div>
                                </label>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
