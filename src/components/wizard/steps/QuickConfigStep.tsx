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
        <div className="flex flex-col h-full justify-start md:justify-center gap-6 w-full max-w-xl mx-auto py-2 antialiased">


            <div className="text-center space-y-2">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-ecs-brand-dark leading-[0.85] py-1 text-center w-full">
                    Quick <span className="text-ecs-accent">Setup</span>
                </h2>
                <p className="text-sm text-slate-500 font-bold tracking-tight bg-slate-100 py-1 px-4 rounded-full w-fit mx-auto">{address}</p>
            </div>

            <div className="bg-white border-2 border-slate-100 p-6 rounded-[2rem] shadow-sm space-y-8">
                <div className="flex items-start gap-3 p-4 bg-ecs-brand-light/5 rounded-2xl border border-ecs-brand-light/10">
                    <Info size={18} className="text-ecs-brand-light shrink-0 mt-0.5" />
                    <p className="text-[11px] text-slate-500 font-bold leading-normal tracking-tight">
                        Property specs (Beds/Baths) are synced from your last visit. If you&apos;ve renovated, please use the &quot;New Property&quot; option.
                    </p>
                </div>

                {/* Cleaning Type */}
                <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Intensity</label>
                    <div className="grid grid-cols-3 gap-3">
                        {cleaningOptions.map((opt) => (
                            <button
                                key={opt.id}
                                type="button"
                                onClick={() => setValue("cleaningType", opt.id as any)}
                                className={`py-4 rounded-2xl border-2 transition-all font-black text-[11px] uppercase tracking-wider ${cleaningType === opt.id
                                    ? "bg-ecs-brand-dark border-ecs-brand-dark text-white shadow-md scale-[1.02]"
                                    : "border-slate-100 text-slate-400 hover:border-ecs-brand-light/30 bg-white"
                                    }`}
                            >
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Frequency */}
                <div className="space-y-3">
                    <label className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">Frequency</label>
                    <div className="relative">
                        <select
                            className="w-full p-4 pl-6 pr-12 bg-white border-2 border-slate-100 rounded-2xl font-black text-sm text-ecs-brand-dark appearance-none focus:border-ecs-brand-light outline-none transition-all shadow-sm"
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
                            <Sparkles size={18} className="text-ecs-brand-light" />
                        </div>
                    </div>
                </div>
            </div>

            <button onClick={onNext} className="btn-accent text-ecs-brand-dark w-full py-5 flex items-center justify-center gap-3 shadow-md active:scale-95 transition-all text-[11px] font-black uppercase tracking-widest">
                Calculate New Quote <ArrowRight size={20} strokeWidth={3} />
            </button>
        </div>
    );
}
