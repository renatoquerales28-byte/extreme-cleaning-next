"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface CommercialStepProps {
    onNext: () => void;
}

export default function CommercialStep({ onNext }: CommercialStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const businessType = watch("businessType") || "";
    const commSqFt = watch("commSqFt") || "";
    const floors = watch("floors") || 1;

    useEffect(() => {
        setAction({
            label: "Review Estimate",
            disabled: !businessType || !commSqFt,
            onClick: onNext
        });
    }, [businessType, commSqFt, onNext, setAction]);

    const businessTypes = [
        "Office", "Retail", "Healthcare", "Restaurant", "Industrial", "Other"
    ];

    const handleFloor = (val: number) => {
        setValue("floors", Math.max(1, val));
    };

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Business <br /> <span className="text-[#05D16E]">Details</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Tell us about your facility</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">
                        {/* Type */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-wider text-[#024653]">Facility Type</label>
                            <div className="grid grid-cols-2 gap-3">
                                {businessTypes.map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setValue("businessType", type)}
                                        className={`p-3 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all ${businessType === type
                                            ? "bg-[#024653] border-[#024653] text-white shadow-lg"
                                            : "bg-slate-50 border-slate-100 text-[#024653]/60 hover:border-[#05D16E]"
                                            }`}
                                    >
                                        {type}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Sq Ft */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-wider text-[#024653]">Approx Sq. Ft.</label>
                            <input
                                {...register("commSqFt")}
                                type="number"
                                placeholder="e.g. 2500"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all"
                            />
                        </div>

                        {/* Floors */}
                        <div className="space-y-4">
                            <label className="block text-xs font-black uppercase tracking-wider text-[#024653]">Number of Floors</label>
                            <div className="flex items-center gap-4">
                                <button onClick={() => handleFloor(floors - 1)} className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-[#024653] hover:bg-[#024653] hover:text-white transition-colors">-</button>
                                <span className="text-2xl font-black text-[#024653] w-8 text-center">{floors}</span>
                                <button onClick={() => handleFloor(floors + 1)} className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center font-black text-[#024653] hover:bg-[#05D16E] hover:text-white transition-colors">+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
