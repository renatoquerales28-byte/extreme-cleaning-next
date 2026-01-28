"use client";

import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, Star } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface PriceStepProps {
    onNext: () => void;
    totalPrice: number;
}

export default function PriceStep({ onNext, totalPrice }: PriceStepProps) {
    const { setAction } = useWizardAction();
    const { watch } = useFormContext<WizardData>();
    const data = watch();

    useEffect(() => {
        setAction({
            label: "Proceed to Booking", // Soft commit
            disabled: false,
            isLoading: false,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={2.5} />
        });
    }, [setAction, onNext]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Your <br /> <span className="text-[#05D16E]">Estimate</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Based on your selection</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-8 relative overflow-hidden">
                        {/* Decorative Background Blob */}
                        <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#05D16E]/10 rounded-full blur-3xl pointer-events-none" />

                        <div className="text-center space-y-4 relative z-10">
                            <span className="inline-block px-3 py-1 bg-[#05D16E]/10 text-[#05D16E] rounded-full text-[10px] font-black uppercase tracking-widest">
                                Instant Quote
                            </span>
                            <div className="flex items-center justify-center gap-1">
                                <span className="text-2xl font-bold text-[#024653] self-start mt-2">$</span>
                                <span className="text-7xl font-black text-[#024653] tracking-tighter">{totalPrice}</span>
                            </div>
                            <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">Per Service</p>
                        </div>

                        {/* Breakdown / Value Props */}
                        <div className="space-y-3 pt-6 border-t border-slate-100">
                            <div className="flex items-center gap-3 text-[#024653]/80">
                                <CheckCircle2 size={16} className="text-[#05D16E]" />
                                <span className="text-xs font-bold">{data.bedrooms} Bedrooms, {data.bathrooms} Bathrooms</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#024653]/80">
                                <CheckCircle2 size={16} className="text-[#05D16E]" />
                                <span className="text-xs font-bold capitalize">{data.serviceType} Cleaning ({data.cleaningType})</span>
                            </div>
                            <div className="flex items-center gap-3 text-[#024653]/80">
                                <ShieldCheck size={16} className="text-[#05D16E]" />
                                <span className="text-xs font-bold">100% Satisfaction Guarantee</span>
                            </div>
                        </div>

                        {/* Trust Badge */}
                        <div className="bg-slate-50 rounded-xl p-4 flex items-center justify-center gap-3">
                            <div className="flex -space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={12} className="fill-yellow-400 text-yellow-400" />
                                ))}
                            </div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wide">Top Rated in Spokane</span>
                        </div>
                    </div>

                    <div className="text-center">
                        <p className="text-[10px] text-slate-300 font-medium max-w-xs mx-auto leading-relaxed">
                            *This is an estimate. Final price may vary slightly based on actual property condition.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
