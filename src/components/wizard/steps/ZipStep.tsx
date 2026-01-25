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
                <h2 className="text-3xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85] py-1">
                    Where is the <br />
                    <span className="text-[#05D16E]">Sparkle</span> Needed?
                </h2>
                <p className="text-sm text-[#024653]/60 font-medium tracking-tight">
                    Enter your zip code to check availability in the Spokane area.
                </p>
            </div>

            <div className="w-full max-w-sm relative group">
                <div className="absolute -inset-1 border-2 border-[#05D16E]/20 rounded-[2.5rem] opacity-0 group-focus-within:opacity-100 transition duration-300"></div>
                <div className="relative flex items-center">
                    <MapPin className="absolute left-6 text-[#024653]/40 group-focus-within:text-[#05D16E] transition-colors" size={24} strokeWidth={2.5} />
                    <input
                        {...register("zipCode")}
                        type="text"
                        placeholder="99201"
                        autoFocus={true}
                        className="w-full pl-12 md:pl-16 pr-6 md:pr-8 py-5 md:py-6 bg-white border-2 border-slate-100 rounded-[2.5rem] text-xl md:text-2xl font-black tracking-[0.2em] focus:border-[#05D16E] focus:ring-0 transition-all outline-none text-[#024653]"
                        maxLength={5}
                    />
                </div>
                {errors.zipCode && <p className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-full text-rose-500 font-black text-[10px] uppercase tracking-wider">{errors.zipCode.message}</p>}
            </div>

            <div className="w-full max-w-sm mt-4">
                <button
                    onClick={onNext}
                    disabled={!isValidZip}
                    className="btn-accent w-full disabled:opacity-20 disabled:grayscale disabled:scale-100 flex items-center justify-center gap-4 py-6 px-10 text-[11px] font-black uppercase tracking-[0.2em] hover:scale-[1.02] transition-all shadow-xl shadow-[#05D16E]/10"
                >
                    Check Availability <ArrowRight size={20} strokeWidth={3} />
                </button>
            </div>

            {/* Existing Clients Section */}
            <div className="pt-8 border-t border-[#024653]/5 w-full max-w-sm">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]/30 mb-4">Already an ECS Client?</p>
                <div
                    onClick={onReturning}
                    className="flex items-center justify-between p-5 bg-white rounded-3xl border border-slate-100 hover:border-[#05D16E]/20 transition-all group cursor-pointer shadow-sm hover:shadow-xl hover:-translate-y-1"
                >
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-[#F9F8F2] rounded-2xl shadow-sm group-hover:bg-[#05D16E]/10 transition-colors"><User size={18} className="text-[#024653]" strokeWidth={3} /></div>
                        <div className="text-left">
                            <p className="text-xs font-black text-[#024653] uppercase tracking-tight">Customer Login</p>
                            <p className="text-[10px] text-[#024653]/40 font-bold">Manage your cleanings</p>
                        </div>
                    </div>
                    <ArrowRight size={18} className="text-[#024653]/20 group-hover:text-[#05D16E] transition-colors" />
                </div>
            </div>

            <p className="text-[11px] font-black uppercase tracking-[0.3em] text-[#024653]/20">
                Area: Spokane, WA
            </p>
        </div>
    );
}
