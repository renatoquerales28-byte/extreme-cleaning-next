"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../../WizardActionContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { ShieldCheck, ArrowRight, Lock, User, Mail, DollarSign, Target } from "lucide-react";
import { calculateTotal } from "@/lib/utils/pricing";
import { motion, AnimatePresence } from "framer-motion";

interface PriceAndQuoteStepProps {
    onNext: () => void;
}

export default function PriceAndQuoteStep({ onNext }: PriceAndQuoteStepProps) {
    const { register, watch, setValue, formState: { errors } } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    const [showPrice, setShowPrice] = useState(false);

    const total = useMemo(() => calculateTotal(data), [data]);

    useEffect(() => {
        const canShow = data.firstName && data.lastName && data.email && !errors.firstName && !errors.lastName && !errors.email;
        if (canShow && !showPrice) {
            const timer = setTimeout(() => setShowPrice(true), 1200);
            return () => clearTimeout(timer);
        }
    }, [data.firstName, data.lastName, data.email, errors, showPrice]);

    const handleNext = useCallback(() => {
        setValue("totalPrice", total);
        onNext();
    }, [onNext, setValue, total]);

    useEffect(() => {
        setAction({
            label: "Initialize Logistics",
            disabled: !showPrice,
            onClick: handleNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [showPrice, handleNext, setAction]);

    return (
        <div className="w-full h-full flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: IDENTITY VERIFICATION */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3 ml-1 mb-1">
                        <div className="w-5 h-5 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <User size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Client Identification</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 space-y-6 flex flex-col justify-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">First Name</label>
                                <input
                                    {...register("firstName")}
                                    placeholder="Enter first name"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Last Name</label>
                                <input
                                    {...register("lastName")}
                                    placeholder="Enter last name"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#024653]/20" />
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 pl-10 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-[#024653]/5 opacity-30 mt-auto">
                            <Lock size={12} />
                            <p className="text-[8px] font-black uppercase tracking-[0.2em]">Spokane Secure Data Transmission</p>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: QUOTE REVEAL */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3 ml-1 mb-1">
                        <div className="w-5 h-5 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <DollarSign size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Guaranteed Pricing</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col items-center justify-center relative overflow-hidden text-center">
                        <AnimatePresence mode="wait">
                            {!showPrice ? (
                                <motion.div
                                    key="waiting"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="space-y-4"
                                >
                                    <div className="w-16 h-16 rounded-full border-4 border-[#024653]/5 flex items-center justify-center mx-auto relative overflow-hidden mb-6">
                                        <div className="absolute inset-0 bg-conic-gradient from-[#05D16E] to-transparent animate-spin opacity-40" />
                                        <Lock size={20} className="text-[#024653]/20" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#024653]/40">Scanning Value Metrics...</span>
                                </motion.div>
                            ) : (
                                <motion.div
                                    key="revealed"
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-full space-y-6 z-10"
                                >
                                    <div className="bg-white border-2 border-[#05D16E]/20 rounded-2xl p-8 shadow-2xl shadow-[#05D16E]/5 relative">
                                        <div className="absolute top-4 right-6 text-[#05D16E] opacity-20">
                                            <ShieldCheck size={40} />
                                        </div>
                                        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#05D16E] block mb-4 italic">Commitment Price</span>
                                        <div className="flex items-start justify-center text-[#024653] mb-4">
                                            <span className="text-3xl font-black mt-2 opacity-20 pr-1">$</span>
                                            <span className="text-[90px] font-black tracking-tighter tabular-nums leading-none">{total}</span>
                                        </div>
                                        <div className="pt-6 border-t border-[#024653]/5">
                                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]/40">
                                                Elite Standard Guaranteed
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-center gap-3 opacity-20">
                                        <Target size={12} className="text-[#024653]" />
                                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#024653]">
                                            Locked Performance Rate
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>

            </div>
        </div>
    );
}
