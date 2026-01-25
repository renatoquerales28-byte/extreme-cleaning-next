"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { FREQUENCIES } from "@/lib/utils/pricing";
import { ChevronLeft, ArrowRight, Sparkles, Info } from "lucide-react";

interface QuickConfigStepProps {
    onNext: () => void;
    onBack: () => void;
    address: string;
}

export default function QuickConfigStep({ onNext, onBack, address }: QuickConfigStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const cleaningType = watch("cleaningType");
    const frequency = watch("frequency");

    const cleaningOptions = [
        { id: "regular", label: "Standard" },
        { id: "deep", label: "Deep Clean" },
        { id: "move", label: "Move-In/Out" },
    ];

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-4">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Quick <span className="text-[#05D16E]">Setup</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest bg-[#F9F8F2] py-1.5 px-6 rounded-full w-fit mx-auto border-2 border-[#024653]/5">{address}</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-6 rounded-[2rem] space-y-6">
                        <div className="flex items-start gap-3 p-4 bg-[#05D16E]/5 rounded-2xl border border-[#05D16E]/10">
                            <Info size={18} className="text-[#05D16E] shrink-0 mt-0.5" />
                            <p className="text-[10px] text-[#024653]/40 font-bold leading-normal tracking-tight uppercase">
                                Property specs (Beds/Baths) are synced from your last visit. If you&apos;ve renovated, please use the &quot;New Property&quot; option.
                            </p>
                        </div>

                        {/* Cleaning Type */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-1">Intensity</label>
                            <div className="grid grid-cols-3 gap-2">
                                {cleaningOptions.map((opt) => (
                                    <button
                                        key={opt.id}
                                        type="button"
                                        onClick={() => setValue("cleaningType", opt.id as any)}
                                        className={`py-4 rounded-xl border-[3px] transition-all font-black text-[10px] uppercase tracking-wider ${cleaningType === opt.id
                                            ? "bg-[#024653] border-[#10f081] text-white shadow-md scale-[1.02] z-10"
                                            : "border-slate-50 text-[#024653]/40 hover:border-[#024653]/10 bg-white"
                                            }`}
                                    >
                                        {opt.label}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Frequency */}
                        <div className="space-y-3">
                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/40 ml-1">Frequency</label>
                            <div className="relative">
                                <select
                                    className="w-full p-4 pl-6 pr-12 bg-white border-2 border-slate-50 rounded-xl font-black text-xs text-[#024653] appearance-none focus:border-[#024653] outline-none transition-all"
                                    value={frequency}
                                    onChange={(e) => setValue("frequency", e.target.value as any)}
                                >
                                    {FREQUENCIES.map(f => (
                                        <option key={f.id} value={f.id}>
                                            {f.label} {f.discount > 0 ? `(Ahorra ${f.labelDiscount})` : ""}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <Sparkles size={18} className="text-[#05D16E]" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="absolute bottom-0 left-0 w-full z-20 bg-white border-t border-gray-100">
                <div className="w-full max-w-xl mx-auto p-6">
                    <button
                        onClick={onNext}
                        className="w-full py-6 bg-[#024653] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#0E6168] transition-all"
                    >
                        <span className="text-xs font-black uppercase tracking-[0.25em]">Calculate New Quote</span>
                        <ArrowRight size={18} strokeWidth={2.5} />
                    </button>
                </div>
            </div>
        </div>
    );
}
