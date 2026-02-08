"use client";

import { Minus, Plus, Sparkles, Zap, Box, HardHat, ArrowRight, Bed, Bath, Ruler, Target, ShieldCheck } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface ResidentialStepProps {
    onNext: () => void;
}

const cleaningTypes = [
    { id: "standard", label: "Standard", icon: Sparkles, desc: "Maintenance" },
    { id: "deep", label: "Deep", icon: Zap, desc: "Intense" },
    { id: "move_in_out", label: "Move In/Out", icon: Box, desc: "Empty" },
    { id: "post_construction", label: "Post-Con", icon: HardHat, desc: "Dust" }
];

export default function ResidentialStep({ onNext }: ResidentialStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    useEffect(() => {
        if (!data.bedrooms) setValue("bedrooms", 1);
        if (!data.bathrooms) setValue("bathrooms", 1);

        setAction({
            label: "Continue to Extras",
            disabled: !data.bedrooms || !data.bathrooms || !data.sqFt || !data.cleaningType,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [data.bedrooms, data.bathrooms, data.sqFt, data.cleaningType, onNext, setAction, setValue]);

    const adjust = (field: "bedrooms" | "bathrooms", delta: number) => {
        const current = (data[field] || 1) as number;
        setValue(field, Math.max(1, current + delta));
    };

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: PROPERTY BLUEPRINT */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Property Intelligence</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 lg:p-5 flex flex-col justify-between space-y-4">
                        {/* SQ FT CARD */}
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-4 shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-4 mb-2">
                                <div className="w-8 h-8 rounded-lg bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                                    <Ruler size={16} />
                                </div>
                                <span className="text-[9px] font-black uppercase tracking-widest text-[#024653]/30">Total Liveable Area</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <input
                                    {...register("sqFt", { valueAsNumber: true })}
                                    type="number"
                                    placeholder="2400"
                                    className="bg-transparent text-3xl font-black text-[#024653] outline-none w-full tabular-nums"
                                />
                                <span className="text-[10px] font-black text-[#024653]/10 uppercase tracking-[0.2em] whitespace-nowrap">Sq. Ft.</span>
                            </div>
                        </div>

                        {/* STRUCTURE DETAILS */}
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: "bedrooms", label: "Bedrooms", icon: Bed },
                                { id: "bathrooms", label: "Bathrooms", icon: Bath }
                            ].map((spec) => (
                                <div key={spec.id} className="bg-white border-2 border-[#024653]/5 rounded-xl p-3 flex flex-col items-center gap-2 shadow-sm group hover:border-[#024653]/20 transition-all">
                                    <div className="flex items-center gap-2">
                                        <spec.icon size={12} className="text-[#024653]/20 group-hover:text-[#024653] transition-colors" />
                                        <span className="text-[8px] font-black uppercase tracking-widest text-[#024653]/30 group-hover:text-[#024653] transition-colors">{spec.label}</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full max-w-[120px] bg-[#024653]/5 rounded-lg p-1 mx-auto">
                                        <button
                                            type="button"
                                            onClick={() => adjust(spec.id as any, -1)}
                                            className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-[#024653] shadow-sm hover:text-red-500 transition-all active:scale-90"
                                        >
                                            <Minus size={10} />
                                        </button>
                                        <span className="text-lg font-black text-[#024653] tabular-nums leading-none">
                                            {data[spec.id as "bedrooms" | "bathrooms"] || 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => adjust(spec.id as any, 1)}
                                            className="w-8 h-8 rounded-md bg-white flex items-center justify-center text-[#024653] shadow-sm hover:text-[#05D16E] transition-all active:scale-90"
                                        >
                                            <Plus size={10} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: SERVICE STRATEGY */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <ShieldCheck size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Service Protocol</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 lg:p-5 flex flex-col justify-between space-y-4">
                        {/* CLEANING TYPES GRID */}
                        <div className="grid grid-cols-2 gap-2">
                            {cleaningTypes.map((type) => {
                                const isSelected = data.cleaningType === type.id;
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        type="button"
                                        onClick={() => setValue("cleaningType", type.id as any)}
                                        className={`
                                            p-3 rounded-lg border-2 flex flex-col items-center gap-2 transition-all duration-300 group relative
                                            ${isSelected
                                                ? "bg-[#024653] border-[#024653] text-white shadow-lg shadow-[#024653]/20 -translate-y-0.5"
                                                : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20 hover:shadow-md"
                                            }
                                        `}
                                    >
                                        <div className={`w-9 h-9 rounded-lg flex items-center justify-center transition-all ${isSelected ? 'bg-white/10 text-[#05D16E]' : 'bg-[#024653]/5 text-[#024653]'}`}>
                                            <Icon size={18} />
                                        </div>
                                        <div className="text-center">
                                            <p className="text-[9px] font-black uppercase tracking-widest leading-none mb-1">{type.label}</p>
                                            <p className={`text-[7px] font-bold uppercase tracking-widest opacity-40 leading-none ${isSelected ? "text-[#05D16E]" : ""}`}>
                                                {type.desc}
                                            </p>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* FREQUENCY SELECTOR */}
                        <div className="space-y-3">
                            <div className="flex bg-white p-1 rounded-lg border border-[#024653]/5 shadow-sm">
                                {["onetime", "weekly", "biweekly", "monthly"].map((f) => {
                                    const isSelected = data.frequency === f;
                                    return (
                                        <button
                                            key={f}
                                            type="button"
                                            onClick={() => setValue("frequency", f as any)}
                                            className={`
                                                flex-1 py-2 px-1 rounded-md text-[9px] font-black uppercase tracking-[0.1em] transition-all
                                                ${isSelected
                                                    ? "bg-[#05D16E] text-[#024653] shadow-md scale-[1.02]"
                                                    : "text-[#024653]/30 hover:text-[#024653] hover:bg-[#024653]/5"
                                                }
                                            `}
                                        >
                                            {f === 'onetime' ? 'Unique' : f}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
