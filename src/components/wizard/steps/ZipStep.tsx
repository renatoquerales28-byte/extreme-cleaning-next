"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { ArrowRight, MapPin } from "lucide-react";

interface ZipStepProps {
    onNext: () => void;
}

export default function ZipStep({ onNext }: ZipStepProps) {
    const { register, watch, formState: { errors } } = useFormContext<WizardData>();
    const zipCode = watch("zipCode");

    const isValidZip = zipCode?.length === 5 && /^\d+$/.test(zipCode);

    return (
        <div className="flex flex-col items-center gap-12 text-center">
            <div className="space-y-4">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-900">
                    Where is the <span className="text-cyan-500">Sparkle</span> needed?
                </h2>
                <p className="text-lg text-slate-500 font-medium">
                    Enter your zip code to check availability in the Spokane area.
                </p>
            </div>

            <div className="w-full max-w-md relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-fuchsia-500 rounded-[2.5rem] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
                <div className="relative flex items-center">
                    <MapPin className="absolute left-6 text-slate-400 group-focus-within:text-cyan-500 transition-colors" size={24} />
                    <input
                        {...register("zipCode")}
                        type="text"
                        placeholder="99201"
                        className="w-full pl-16 pr-6 py-6 bg-white border-2 border-slate-100 rounded-[2.5rem] text-2xl font-bold tracking-widest focus:border-cyan-500 focus:ring-0 transition-all outline-none"
                        maxLength={5}
                    />
                </div>
                {errors.zipCode && <p className="mt-4 text-rose-500 font-bold text-sm tracking-tight">{errors.zipCode.message}</p>}
            </div>

            <button
                onClick={onNext}
                disabled={!isValidZip}
                className="btn-sentient btn-sentient-fuchsia disabled:opacity-30 disabled:grayscale disabled:scale-100 flex items-center gap-3 py-6 text-xl tracking-tight"
            >
                Check Availability <ArrowRight size={24} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Active in Spokane, WA and surrounding areas
            </p>
        </div>
    );
}
