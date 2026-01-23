"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { ArrowRight, MapPin, User } from "lucide-react";

interface ZipStepProps {
    onNext: () => void;
    onReturning: () => void;
}

export default function ZipStep({ onNext, onReturning }: ZipStepProps) {
    const { register, watch, formState: { errors } } = useFormContext<WizardData>();
    const zipCode = watch("zipCode");

    const isValidZip = zipCode?.length === 5 && /^\d+$/.test(zipCode);

    return (
        <div className="flex flex-col items-center justify-center gap-8 md:gap-10 text-center py-4 antialiased">
            <div className="space-y-4">
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Where is the <br />
                    <span className="text-brand-light">Sparkle</span> needed?
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">
                    Enter your zip code to check availability in the Spokane area.
                </p>
            </div>

            <div className="w-full max-w-sm relative group">
                <div className="absolute -inset-1 border-2 border-brand-light/20 rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center">
                    <MapPin className="absolute left-6 text-slate-400 group-focus-within:text-brand-light transition-colors" size={24} strokeWidth={2.5} />
                    <input
                        {...register("zipCode")}
                        type="text"
                        placeholder="99201"
                        autoFocus={true}
                        className="w-full pl-12 md:pl-16 pr-6 md:pr-8 py-4 md:py-5 bg-white border-2 border-slate-100 rounded-[2.5rem] text-xl md:text-2xl font-black tracking-[0.2em] focus:border-brand-light focus:ring-0 transition-all outline-none"
                        maxLength={5}
                    />
                </div>
                {errors.zipCode && <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full text-rose-500 font-black text-[10px] uppercase tracking-wider">{errors.zipCode.message}</p>}
            </div>

            <div className="w-full max-w-sm mt-4">
                <button
                    onClick={onNext}
                    disabled={!isValidZip}
                    className="btn-sentient btn-sentient-fuchsia w-full disabled:opacity-20 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-4 py-5 px-10 text-[11px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] active:scale-95 transition-all shadow-sm"
                >
                    Check Availability <ArrowRight size={20} strokeWidth={3} />
                </button>
            </div>

            {/* Existing Clients Section */}
            <div className="pt-8 border-t border-slate-100 w-full max-w-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Already an ECS Client?</p>
                <div
                    onClick={onReturning}
                    className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-brand-light/30 transition-all group cursor-pointer shadow-sm"
                >
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-white rounded-xl shadow-sm"><User size={16} className="text-brand-dark" strokeWidth={3} /></div>
                        <div className="text-left">
                            <p className="text-xs font-black text-brand-dark">Customer Login</p>
                            <p className="text-[10px] text-slate-500 font-bold">Manage your cleanings</p>
                        </div>
                    </div>
                    <ArrowRight size={16} className="text-slate-300 group-hover:text-brand-light transition-colors" />
                </div>
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-300">
                Area: Spokane, WA
            </p>
        </div>
    );
}
