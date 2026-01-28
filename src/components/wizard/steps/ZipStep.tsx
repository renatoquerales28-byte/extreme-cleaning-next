"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { ArrowRight, CheckCircle2, AlertCircle, User } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";

interface ZipStepProps {
    onNext: () => void;
    onReturning: () => void;
}

export default function ZipStep({ onNext, onReturning }: ZipStepProps) {
    const { register, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const zipCode = watch("zipCode") || "";

    const [status, setStatus] = React.useState<'idle' | 'active' | 'coming_soon' | 'unavailable'>('idle');
    const [city, setCity] = React.useState<string | undefined>();
    const [isChecking, setIsChecking] = React.useState(false);

    // Reset status when user types
    React.useEffect(() => {
        if (status !== 'idle') setStatus('idle');
    }, [zipCode, status]);

    const checkAvailability = React.useCallback(async () => {
        setIsChecking(true);
        try {
            const { checkZipAvailability } = await import("@/app/actions/location");
            const res = await checkZipAvailability(zipCode);
            setCity(res.city);
            setStatus(res.status);

            if (res.status === 'active') {
                onNext();
            }
        } catch (error) {
            console.error(error);
            setStatus('unavailable');
        } finally {
            setIsChecking(false);
        }
    }, [zipCode, onNext]);

    useEffect(() => {
        const canCheck = zipCode.length === 5;
        setAction({
            label: isChecking ? "Checking..." : "Check Availability",
            disabled: !canCheck || isChecking,
            isLoading: isChecking,
            onClick: checkAvailability
        });
    }, [zipCode, isChecking, checkAvailability, setAction]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Let&apos;s start with <br /> <span className="text-[#05D16E]">your location</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Enter your Zip Code to check availability</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">
                        <div className="relative">
                            <input
                                {...register("zipCode")}
                                type="text"
                                maxLength={5}
                                placeholder="e.g. 90210"
                                className={`w-full p-6 text-center text-4xl font-black tracking-[0.2em] text-[#024653] border-b-4 outline-none transition-all placeholder:text-slate-200 ${status === 'unavailable' ? 'border-red-200' : status === 'active' ? 'border-[#05D16E]' : 'border-slate-100 hover:border-[#05D16E]/50'}`}
                            />
                            {status === 'active' && (
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[#05D16E] animate-in fade-in zoom-in">
                                    <CheckCircle2 size={32} strokeWidth={3} />
                                </div>
                            )}
                        </div>

                        {status === 'unavailable' && (
                            <div className="p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 animate-in slide-in-from-top-2">
                                <AlertCircle className="text-red-500 shrink-0" size={20} />
                                <p className="text-xs font-bold text-red-600">Sorry, we don&apos;t service this area yet.</p>
                            </div>
                        )}

                        {status === 'coming_soon' && (
                            <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-xl text-center space-y-2 animate-in slide-in-from-top-2">
                                <p className="text-xs font-bold text-yellow-700">
                                    We are coming to <span className="uppercase">{city || zipCode}</span> very soon!
                                </p>
                                <p className="text-[10px] font-medium text-yellow-600">Join our waitlist to get notified.</p>
                            </div>
                        )}
                    </div>

                    {/* Returning Customer Link */}
                    <button onClick={onReturning} className="w-full group">
                        <div className="flex items-center justify-between p-4 rounded-xl border border-dashed border-[#024653]/10 hover:border-[#05D16E]/50 hover:bg-[#05D16E]/5 transition-all">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                                    <User size={14} strokeWidth={2.5} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[#024653] font-black text-xs uppercase tracking-wider">Returning Customer?</p>
                                    <span className="block text-[10px] text-[#024653]/50 font-bold uppercase tracking-widest">Log in here</span>
                                </div>
                            </div>
                            <ArrowRight size={16} className="text-[#05D16E] group-hover:translate-x-1 transition-transform" strokeWidth={2.5} />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
