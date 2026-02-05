import React, { useEffect, useState, useCallback } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { MapPin, CheckCircle2, AlertCircle, User, ArrowRight } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { motion } from "framer-motion";

interface ZipStepProps {
    onNext: () => void;
    onReturning: () => void;
}

export default function ZipStep({ onNext, onReturning }: ZipStepProps) {
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
        <div className="h-full w-full flex flex-col items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-lg space-y-12">

                {/* Visual Context */}
                <div className="flex justify-center">
                    <div className="w-20 h-20 rounded-3xl bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                        <MapPin size={40} strokeWidth={1.5} />
                    </div>
                </div>

                {/* Input Container */}
                <div className="space-y-6">
                    <div className="relative group">
                        <input
                            {...register("zipCode")}
                            type="text"
                            maxLength={5}
                            placeholder="00000"
                            autoComplete="postal-code"
                            className={`
                                w-full pb-6 text-center text-6xl font-normal tracking-[0.2em] text-[#024653] 
                                border-b-2 outline-none transition-all bg-transparent 
                                placeholder:text-[#024653]/10
                                focus:border-[#05D16E]
                                zip-input
                                ${status === 'unavailable' ? 'border-red-200' : status === 'active' ? 'border-[#05D16E]' : 'border-[#024653]/10'}
                            `}
                        />
                        <style jsx>{`
                            .zip-input:-webkit-autofill,
                            .zip-input:-webkit-autofill:hover, 
                            .zip-input:-webkit-autofill:focus, 
                            .zip-input:-webkit-autofill:active {
                                -webkit-box-shadow: 0 0 0 1000px transparent inset !important;
                                -webkit-text-fill-color: #024653 !important;
                                font-size: 3.75rem !important;
                                font-weight: 400 !important;
                                background-color: transparent !important;
                                transition: background-color 5000s ease-in-out 0s;
                            }
                        `}</style>

                        {status === 'active' && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute -right-4 bottom-8 text-[#05D16E]"
                            >
                                <CheckCircle2 size={32} />
                            </motion.div>
                        )}
                    </div>

                    {/* Messages */}
                    <div className="h-12 flex items-center justify-center">
                        {status === 'unavailable' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex items-center gap-2 text-red-500 font-medium text-sm"
                            >
                                <AlertCircle size={16} />
                                <span>We don&apos;t service this area yet.</span>
                            </motion.div>
                        )}

                        {status === 'coming_soon' && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center"
                            >
                                <p className="text-[#024653]/60 font-medium text-sm">
                                    Coming soon to <span className="text-[#024653] font-bold">{city || zipCode}</span>!
                                </p>
                            </motion.div>
                        )}
                    </div>
                </div>

                {/* Returning Customer Link */}
                <button
                    onClick={onReturning}
                    className="w-full py-6 rounded-[2.5rem] border border-dashed border-[#024653]/20 hover:border-[#05D16E] hover:bg-white transition-all group"
                >
                    <div className="flex items-center justify-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-[#024653]/5 flex items-center justify-center text-[#024653]/60 group-hover:bg-[#05D16E]/10 group-hover:text-[#05D16E] transition-colors">
                            <User size={18} />
                        </div>
                        <div className="text-left">
                            <p className="text-[#024653]/40 text-[10px] font-bold uppercase tracking-widest leading-none mb-1 group-hover:text-[#05D16E] transition-colors">Returning Customer?</p>
                            <p className="text-[#024653] font-bold text-sm leading-none">Access your profile here</p>
                        </div>
                        <ArrowRight size={16} className="text-[#05D16E] opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </div>
                </button>
            </div>
        </div>
    );
}
