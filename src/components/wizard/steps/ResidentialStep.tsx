"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { ArrowRight } from "lucide-react";

interface ResidentialStepProps {
    onNext: () => void;
}

export default function ResidentialStep({ onNext }: ResidentialStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const bedrooms = watch("bedrooms") || 1;
    const bathrooms = watch("bathrooms") || 1;

    useEffect(() => {
        setAction({
            label: "Select Frequency",
            disabled: false,
            onClick: onNext
        });
    }, [onNext, setAction]);

    const handleIncrement = (field: "bedrooms" | "bathrooms", value: number) => {
        setValue(field, Math.max(0, value + 1));
    };

    const handleDecrement = (field: "bedrooms" | "bathrooms", value: number) => {
        setValue(field, Math.max(0, value - 1));
    };

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 lg:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Tell us about <br /> <span className="text-[#05D16E]">your home</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Customize your cleaning requirements</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-8">
                        {/* Bedrooms */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-[#024653]">Bedrooms</h3>
                                <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest">Living spaces</p>
                            </div>
                            <div className="flex items-center gap-6 bg-slate-50 p-2 rounded-2xl">
                                <button
                                    onClick={() => handleDecrement("bedrooms", bedrooms)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#024653] font-black hover:bg-[#024653] hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="text-2xl font-black text-[#024653] w-4 text-center">{bedrooms}</span>
                                <button
                                    onClick={() => handleIncrement("bedrooms", bedrooms)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#024653] font-black hover:bg-[#05D16E] hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        {/* Bathrooms */}
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-black text-[#024653]">Bathrooms</h3>
                                <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest">Washrooms</p>
                            </div>
                            <div className="flex items-center gap-6 bg-slate-50 p-2 rounded-2xl">
                                <button
                                    onClick={() => handleDecrement("bathrooms", bathrooms)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#024653] font-black hover:bg-[#024653] hover:text-white transition-colors"
                                >
                                    -
                                </button>
                                <span className="text-2xl font-black text-[#024653] w-4 text-center">{bathrooms}</span>
                                <button
                                    onClick={() => handleIncrement("bathrooms", bathrooms)}
                                    className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm border border-slate-100 text-[#024653] font-black hover:bg-[#05D16E] hover:text-white transition-colors"
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="h-px bg-slate-100 w-full" />

                        {/* Sq Ft */}
                        <div className="space-y-4">
                            <div>
                                <h3 className="text-xl font-black text-[#024653]">Approx Size</h3>
                                <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest">Square Footage</p>
                            </div>
                            <input
                                {...register("sqFt", { valueAsNumber: true })}
                                type="number"
                                placeholder="e.g. 1000"
                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-[#024653]/20"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
}
