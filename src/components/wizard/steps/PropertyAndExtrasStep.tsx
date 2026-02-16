"use client";

import { Minus, Plus, Ruler, Bed, Bath, Target, Sparkles, ArrowRight, ShieldPlus } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { EXTRAS_LIST } from "@/lib/utils/pricing";

interface PropertyAndExtrasStepProps {
    onNext: () => void;
}

export default function PropertyAndExtrasStep({ onNext }: PropertyAndExtrasStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    const extras = useMemo(() => data.extras || [], [data.extras]);

    useEffect(() => {
        if (data.cleaningType === "move_in_out" || data.cleaningType === "post_construction") {
            setValue("frequency", "onetime");
        }

        const canAdvance = !!(data.sqFt && data.sqFt > 0);

        setAction({
            label: "Continue to Contact",
            disabled: !canAdvance,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [data.sqFt, data.bedrooms, data.bathrooms, data.frequency, data.cleaningType, onNext, setAction, setValue]);

    const adjust = (field: "bedrooms" | "bathrooms", delta: number) => {
        const current = (data[field] || 1) as number;
        setValue(field, Math.max(1, current + delta));
    };

    const toggleExtra = (id: string) => {
        const current = [...extras];
        const index = current.indexOf(id);
        if (index > -1) {
            current.splice(index, 1);
        } else {
            current.push(id);
        }
        setValue("extras", current);
    };

    const filteredExtras = EXTRAS_LIST.filter(e => ["oven", "fridge", "windows", "cabinets"].includes(e.id));

    return (
        <div className="w-full h-full flex flex-col justify-center py-4">
            <div className={`max-w-6xl mx-auto w-full px-6 grid grid-cols-1 ${!(data.cleaningType === "move_in_out" || data.cleaningType === "post_construction") ? 'lg:grid-cols-2' : ''} gap-10 items-stretch`}>

                {/* 1. LEFT: PROPERTY INTELLIGENCE */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3 ml-1">
                        <div className="w-5 h-5 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Property Intelligence</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-6 lg:p-8 space-y-6 flex flex-col justify-center">
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-6 shadow-sm group hover:border-[#024653]/20 transition-all">
                            <div className="flex items-center gap-4 mb-3">
                                <div className="w-10 h-10 rounded-xl bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                                    <Ruler size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Total Liveable Area</span>
                            </div>
                            <div className="flex items-baseline gap-3">
                                <input
                                    {...register("sqFt", { valueAsNumber: true })}
                                    type="number"
                                    placeholder="2400"
                                    className="bg-transparent text-4xl font-black text-[#024653] outline-none w-full tabular-nums"
                                />
                                <span className="text-[12px] font-black text-[#024653]/20 uppercase tracking-[0.3em] whitespace-nowrap">Sq. Ft.</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { id: "bedrooms", label: "Bedrooms", icon: Bed },
                                { id: "bathrooms", label: "Bathrooms", icon: Bath }
                            ].map((spec) => (
                                <div key={spec.id} className="bg-white border-2 border-[#024653]/5 rounded-xl p-4 flex flex-col items-center gap-3 shadow-sm group hover:border-[#024653]/20 transition-all">
                                    <div className="flex items-center gap-2">
                                        <spec.icon size={14} className="text-[#024653]/20 group-hover:text-[#024653] transition-colors" />
                                        <span className="text-[9px] font-black uppercase tracking-widest text-[#024653]/30 group-hover:text-[#024653] transition-colors">{spec.label}</span>
                                    </div>
                                    <div className="flex items-center justify-between w-full bg-[#024653]/5 rounded-xl p-1.5">
                                        <button
                                            type="button"
                                            onClick={() => adjust(spec.id as any, -1)}
                                            className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#024653] shadow-sm hover:text-red-500 transition-all active:scale-90"
                                        >
                                            <Minus size={14} />
                                        </button>
                                        <span className="text-xl font-black text-[#024653] tabular-nums">
                                            {data[spec.id as "bedrooms" | "bathrooms"] || 1}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => adjust(spec.id as any, 1)}
                                            className="w-10 h-10 rounded-lg bg-white flex items-center justify-center text-[#024653] shadow-sm hover:text-[#05D16E] transition-all active:scale-90"
                                        >
                                            <Plus size={14} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT: PREMIUM EXTRAS */}
                {!(data.cleaningType === "move_in_out" || data.cleaningType === "post_construction") && (
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-3 ml-1">
                            <div className="w-5 h-5 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20">
                                <Sparkles size={12} className="text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Premium Extras</span>
                            {extras.length > 0 && (
                                <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-[#024653] rounded-full">
                                    <ShieldPlus size={10} className="text-[#05D16E]" />
                                    <span className="text-[8px] font-black uppercase text-white tracking-widest">{extras.length} Selected</span>
                                </div>
                            )}
                        </div>

                        <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-6 lg:p-8 flex flex-col justify-center">
                            <div className="grid grid-cols-2 gap-4">
                                {filteredExtras.map((extra) => {
                                    const isSelected = extras.includes(extra.id);
                                    return (
                                        <button
                                            key={extra.id}
                                            type="button"
                                            onClick={() => toggleExtra(extra.id)}
                                            className={`
                                                p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-300 group relative
                                                ${isSelected
                                                    ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20 -translate-y-1"
                                                    : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/20 hover:shadow-md"
                                                }
                                            `}
                                        >
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all ${isSelected ? 'bg-white/10' : 'bg-[#024653]/5'}`}>
                                                {extra.icon}
                                            </div>
                                            <div className="text-center">
                                                <p className="text-[10px] font-black uppercase tracking-tight leading-none mb-1">{extra.label}</p>
                                                <p className={`text-[7px] font-bold uppercase tracking-widest opacity-40 leading-none ${isSelected ? "text-[#05D16E]" : ""}`}>
                                                    Elite Add-on
                                                </p>
                                            </div>
                                            {isSelected && (
                                                <div className="absolute top-3 right-3">
                                                    <div className="w-2 h-2 rounded-full bg-[#05D16E]" />
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                )}

            </div>

            {/* 3. BOTTOM: SERVICE FREQUENCY */}
            {!(data.cleaningType === "move_in_out" || data.cleaningType === "post_construction" || data.cleaningType === "first_cleaning") && (
                <div className="max-w-6xl mx-auto w-full px-6 mt-10">
                    <div className="flex items-center gap-3 ml-1 mb-4">
                        <div className="w-5 h-5 rounded-md bg-[#111111] flex items-center justify-center shadow-lg shadow-black/10">
                            <ArrowRight size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">3. Service Schedule</span>
                    </div>

                    <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-2 relative overflow-hidden">
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 relative z-10">
                            {[
                                { id: "weekly", label: "Weekly", offer: "Save 15%" },
                                { id: "biweekly", label: "Bi-Weekly", offer: "Save 10%" },
                                { id: "monthly", label: "Monthly", offer: "Save 5%" },
                                { id: "onetime", label: "One-Time", offer: "Unique" }
                            ].map((freq) => {
                                const isSelected = data.frequency === freq.id;
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
                                        <span className="text-[10px] font-black uppercase tracking-widest">{freq.label}</span>
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
