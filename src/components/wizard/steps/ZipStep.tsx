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

export default function ZipStep({ onReturning }: ZipStepProps) {
    const { register, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const zipCode = watch("zipCode") || "";

    const [status, setStatus] = useState<'idle' | 'active' | 'coming_soon' | 'unavailable'>('idle');
    const [city, setCity] = useState<string | undefined>();
    const [isChecking, setIsChecking] = useState(false);

    useEffect(() => {
        if (status !== 'idle' && status !== 'active') setStatus('idle');
    }, [zipCode, status]);

    const checkAvailability = useCallback(async () => {
        if (zipCode.length !== 5) return;
        setIsChecking(true);
        try {
            const { checkZipAvailability } = await import("@/app/actions/location");
            const res = await checkZipAvailability(zipCode);
            setCity(res.city);
            setStatus(res.status);
        } catch (error) {
            setStatus('unavailable');
        } finally {
            setIsChecking(false);
        }
    }, [zipCode]);

    useEffect(() => {
        const canCheck = zipCode.length === 5;
        setAction({
            label: status === 'active' ? "Initialize Service" : (isChecking ? "Validating Signal..." : "Verify Territory"),
            disabled: !canCheck || isChecking,
            isLoading: isChecking,
            onClick: status === 'active' ? undefined : checkAvailability,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [zipCode, isChecking, checkAvailability, setAction, status]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full px-6 items-stretch">

                {/* LEFT COLUMN: SECURITY CLEARANCE */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Territory Clearance</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-center">
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-6 shadow-sm group hover:border-[#024653]/20 transition-all relative">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-10 h-10 rounded-lg bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                                    <MapPin size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Enter Zip Code</span>
                            </div>

                            <input
                                {...register("zipCode")}
                                type="text"
                                maxLength={5}
                                autoFocus
                                placeholder="00000"
                                className="bg-transparent text-6xl font-black text-[#024653] outline-none w-full tabular-nums tracking-widest placeholder:text-[#024653]/5"
                            />

                            <AnimatePresence>
                                {status === 'active' && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute top-6 right-6"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-[#05D16E] flex items-center justify-center text-white shadow-lg shadow-[#05D16E]/20">
                                            <CheckCircle2 size={16} strokeWidth={4} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Feedback Slot */}
                        <div className="h-6 mt-4">
                            <AnimatePresence mode="wait">
                                {status === 'unavailable' && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-500 font-black text-[9px] uppercase tracking-widest px-2">
                                        <AlertCircle size={14} />
                                        <span>Signal Lost: Outside Spokane Radius</span>
                                    </motion.div>
                                )}
                                {status === 'active' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E] animate-pulse" />
                                        <span className="text-[#05D16E] font-black text-[9px] uppercase tracking-widest">
                                            Operational Zone Confirmed: {city}
                                        </span>
                                    </motion.div>
                                )}
                                {isChecking && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#024653] animate-ping" />
                                        <span className="text-[#024653]/40 font-black text-[9px] uppercase tracking-widest">
                                            Scanning Territory...
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: RECOGNITION & PORTAL */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <Scan size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Access Hub</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="bg-white/50 border border-[#024653]/5 rounded-xl p-5 flex items-start gap-4">
                                <Map className="text-[#024653]/20 shrink-0" size={24} />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]">Elite Coverage</p>
                                    <p className="text-[10px] font-bold text-[#024653]/40 leading-relaxed">
                                        We currently operate within the Spokane core and surrounding elite residential districts.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Returning Client Action */}
                        <div className="pt-8">
                            <button
                                onClick={onReturning}
                                className="w-full bg-white border border-[#024653]/10 rounded-xl p-5 flex items-center justify-between group hover:border-[#024653]/30 hover:shadow-xl hover:shadow-[#024653]/5 transition-all"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-lg bg-[#024653] flex items-center justify-center text-white shadow-lg shadow-[#024653]/20">
                                        <User size={18} />
                                    </div>
                                    <div className="text-left">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]">Returning Client?</p>
                                        <p className="text-[9px] font-bold text-[#05D16E] uppercase tracking-tighter">Access Saved Vault</p>
                                    </div>
                                </div>
                                <div className="w-8 h-8 rounded-lg bg-[#024653]/5 flex items-center justify-center text-[#024653] group-hover:bg-[#024653] group-hover:text-white transition-all">
                                    <ArrowRight size={14} />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
