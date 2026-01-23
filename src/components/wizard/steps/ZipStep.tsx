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
        <div className="flex flex-col items-center gap-8 text-center py-8">
            <div className="space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-slate-900">
                    Where is the <span className="text-brand-light">Sparkle</span> needed?
                </h2>
                <p className="text-base text-slate-500 font-medium">
                    Enter your zip code to check availability in the Spokane area.
                </p>
            </div>

            <div className="w-full max-w-sm relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-brand-light to-accent rounded-[2rem] blur opacity-10 group-focus-within:opacity-20 transition duration-1000"></div>
                <div className="relative flex items-center">
                    <MapPin className="absolute left-5 text-slate-400 group-focus-within:text-brand-light transition-colors" size={20} />
                    <input
                        {...register("zipCode")}
                        type="text"
                        placeholder="99201"
                        className="w-full pl-14 pr-6 py-4 bg-white border-2 border-slate-100 rounded-[2rem] text-xl font-bold tracking-widest focus:border-brand-light focus:ring-0 transition-all outline-none"
                        maxLength={5}
                    />
                </div>
                {errors.zipCode && <p className="mt-2 text-rose-500 font-bold text-xs tracking-tight">{errors.zipCode.message}</p>}
            </div>

            <button
                onClick={onNext}
                disabled={!isValidZip}
                className="btn-sentient btn-sentient-fuchsia disabled:opacity-30 disabled:grayscale disabled:scale-100 flex items-center gap-3 py-4 px-8 text-lg tracking-tight"
            >
                Check Availability <ArrowRight size={20} />
            </button>

            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                Active in Spokane, WA and surrounding areas
            </p>
        </div>
    );
}
