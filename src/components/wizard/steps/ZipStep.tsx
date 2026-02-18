"use client";

import React, { useEffect, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { MapPin, CheckCircle2, AlertCircle, User, ArrowRight, Scan, Target, Map } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { motion, AnimatePresence } from "framer-motion";

interface ZipStepProps {
    onNext: () => void;
    onReturning: () => void;
}

export default function ZipStep({ onNext, onReturning }: ZipStepProps) {
    const { register, watch, trigger, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const zipCode = watch("zipCode") || "";

    const [status, setStatus] = useState<'idle' | 'active' | 'coming_soon' | 'unavailable'>('idle');
    const [city, setCity] = useState<string | undefined>();
    const [isChecking, setIsChecking] = useState(false);
    const [isFocused, setIsFocused] = useState(false);

    const checkAvailability = useCallback(async (codeToCheck?: string) => {
        const targetZip = codeToCheck || zipCode;
        if (targetZip.length !== 5) return;

        setIsChecking(true);
        try {
            const { checkZipAvailability } = await import("@/app/actions/location");
            const res = await checkZipAvailability(targetZip);
            setCity(res.city);
            setStatus(res.status);
        } catch (error) {
            console.error("ZIP Check error:", error);
            setStatus('unavailable');
        } finally {
            setIsChecking(false);
        }
    }, [zipCode]);

    const lastValidatedZip = React.useRef<string>("");

    // Handle ZIP changes & Auto-validation
    useEffect(() => {
        if (zipCode.length === 5 && zipCode !== lastValidatedZip.current) {
            lastValidatedZip.current = zipCode;
            checkAvailability();
        } else if (zipCode.length !== 5) {
            lastValidatedZip.current = "";
            setStatus('idle');
            setCity(undefined);
        }
    }, [zipCode, checkAvailability]);

    useEffect(() => {
        const canCheck = zipCode.length === 5;
        const isActive = status === 'active';

        setAction({
            label: isActive ? "Initialize Service" : (isChecking ? "Scanning Territory..." : "Verify Territory"),
            disabled: zipCode.length < 5 || (isChecking && !isActive),
            isLoading: isChecking,
            onClick: async () => {
                if (isActive) {
                    onNext();
                } else {
                    await checkAvailability();
                }
            },
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [zipCode, isChecking, checkAvailability, setAction, status, onNext]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-12">
            <div className="max-w-xl mx-auto w-full px-6 flex flex-col items-center space-y-16">


                {/* Input Capsule Centered */}
                <div className="w-full max-w-md relative">
                    <div className={`flex items-center bg-white rounded-[2rem] p-2 transition-all duration-300 border-2 ${status === 'unavailable'
                        ? 'border-red-500'
                        : status === 'active'
                            ? 'border-[#05D16E]'
                            : isFocused
                                ? 'border-[#024653]/40'
                                : 'border-[#024653]/10'
                        }`}>
                        <div className={`pl-5 transition-colors duration-300 ${status === 'unavailable' ? 'text-red-500' : isFocused ? 'text-[#024653]' : 'text-[#024653]/40'}`}>
                            <MapPin size={22} />
                        </div>
                        <input
                            {...register("zipCode")}
                            type="text"
                            maxLength={5}
                            autoFocus
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Enter Zip Code"
                            autoComplete="off"
                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium text-base md:text-lg px-4 py-2 h-14 placeholder:text-[#024653]/20 appearance-none selection:bg-[#05D16E]/20"
                        />
                        <button
                            onClick={() => status === 'active' ? onNext() : checkAvailability()}
                            disabled={isChecking || zipCode.length < 5}
                            className={`${status === 'unavailable' ? 'bg-red-500' : 'bg-[#05D16E]'} text-white w-14 h-14 rounded-full flex items-center justify-center transition-all shrink-0 shadow-[0_4px_12px_rgba(5,209,110,0.2)] active:scale-95 disabled:opacity-50`}
                        >
                            {isChecking ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <ArrowRight size={22} className="stroke-[3px]" />
                            )}
                        </button>
                    </div>

                    {/* Feedback Messages - Absolute to prevent jump */}
                    <AnimatePresence mode="wait">
                        {status === 'unavailable' && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute left-6 top-full mt-3 flex items-center gap-2 text-red-500 font-bold text-[10px] uppercase tracking-widest"
                            >
                                <AlertCircle size={14} />
                                <span>Outside Spokane Radius</span>
                            </motion.div>
                        )}
                        {status === 'active' && (
                            <motion.div
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute left-6 top-full mt-3 flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#05D16E] animate-pulse" />
                                <span className="text-[#05D16E] font-bold text-[10px] uppercase tracking-widest">
                                    Operational Zone: {city}
                                </span>
                            </motion.div>
                        )}
                        {isChecking && !status && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute left-6 top-full mt-3 flex items-center gap-2"
                            >
                                <div className="w-2 h-2 rounded-full bg-[#024653]/20 animate-ping" />
                                <span className="text-[#024653]/40 font-bold text-[10px] uppercase tracking-widest">
                                    Scanning Territory...
                                </span>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Returning Client Selection - Matches Aesthetic */}
                <div className="pt-12 w-full max-w-sm">
                    <button
                        onClick={onReturning}
                        className="w-full bg-[#024653]/5 hover:bg-[#024653]/10 border border-transparent rounded-[2rem] p-4 flex items-center justify-between group transition-all duration-300"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#024653] shadow-sm group-hover:scale-110 transition-transform">
                                <User size={18} />
                            </div>
                            <div className="text-left">
                                <p className="text-[9px] font-bold uppercase tracking-[0.15em] text-[#024653]/40">Existing Account?</p>
                                <p className="text-[11px] font-semibold text-[#024653] uppercase tracking-widest">Access Saved Dashboard</p>
                            </div>
                        </div>
                        <div className="pr-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
                            <ArrowRight size={16} className="text-[#024653]" />
                        </div>
                    </button>
                </div>
            </div>
        </div>
    );
}
