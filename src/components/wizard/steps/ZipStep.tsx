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
        <div className="flex flex-col items-center justify-center h-full w-full max-w-lg mx-auto py-6 antialiased">
            <div className="flex-1 flex flex-col justify-center w-full space-y-10">

                <div className="w-full relative group">
                    <div className="relative flex items-center">
                        <MapPin className="absolute left-6 text-[#024653] pointer-events-none" size={24} strokeWidth={2.5} />
                        <input
                            {...register("zipCode")}
                            type="text"
                            placeholder="99201"
                            autoFocus={true}
                            className="w-full pl-16 pr-6 py-6 bg-white border-2 border-slate-200 focus:border-[#024653] text-[#024653] rounded-2xl text-3xl font-black tracking-widest outline-none transition-colors placeholder:text-slate-300 text-center"
                            maxLength={5}
                        />
                    </div>
                    {errors.zipCode && <p className="absolute -bottom-8 left-0 right-0 text-center text-rose-500 font-bold text-xs uppercase tracking-wider">{errors.zipCode.message}</p>}
                </div>

                <button
                    onClick={onNext}
                    disabled={!isValidZip}
                    className="w-full py-5 bg-[#024653] text-white rounded-2xl text-xs font-black uppercase tracking-[0.25em] hover:bg-[#0E6168] disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-3"
                >
                    Check Availability <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>

            {/* Existing Clients Link */}
            <div className="shrink-0 w-full pt-8 border-t border-[#024653]/10">
                <button
                    onClick={onReturning}
                    className="w-full flex items-center justify-between p-4 bg-white border-2 border-slate-100 hover:border-[#05D16E] rounded-2xl group transition-all"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-[#F9F8F2] rounded-xl flex items-center justify-center text-[#024653] border border-[#024653]/5">
                            <User size={20} strokeWidth={2.5} />
                        </div>
                        <div className="text-left">
                            <span className="block text-xs font-black uppercase tracking-wider text-[#024653]">Existing Customer?</span>
                            <span className="block text-[10px] text-[#024653]/50 font-bold uppercase tracking-widest">Log in here</span>
                        </div>
                    </div>
                    <ArrowRight size={16} className="text-[#05D16E] group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
