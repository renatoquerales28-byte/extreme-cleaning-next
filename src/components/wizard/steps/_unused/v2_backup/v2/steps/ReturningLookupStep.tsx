"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { Phone, Search, ArrowLeft, Target, ShieldCheck, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useWizardAction } from "../../WizardActionContext";
import { motion, AnimatePresence } from "framer-motion";

interface ReturningLookupStepProps {
    onBack: () => void;
    onFound: (data: any) => void;
}

export default function ReturningLookupStep({ onBack, onFound }: ReturningLookupStepProps) {
    const { register, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const phone = watch("phone") || "";
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleSearch = useCallback(async () => {
        if (phone.length < 10) return;
        setLoading(true);
        setStatus('idle');
        try {
            const { findCustomerByPhone } = await import("@/app/actions/admin");
            const res = await findCustomerByPhone(phone);
            if (res.success) {
                setStatus('success');
                setTimeout(() => onFound(res), 600);
            } else {
                setStatus('error');
                import("sonner").then(({ toast }) => toast.error(res.error || "No profile found matching this connection."));
            }
        } catch (err) {
            setStatus('error');
        } finally {
            setLoading(false);
        }
    }, [phone, onFound]);

    useEffect(() => {
        setAction({
            label: loading ? "Decrypting Vault..." : "Request Access",
            disabled: phone.length < 10 || loading,
            isLoading: loading,
            onClick: handleSearch,
            icon: <Search size={18} strokeWidth={4} />
        });
    }, [phone, loading, onBack, setAction, handleSearch]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto w-full px-6 items-stretch">

                {/* LEFT COLUMN: IDENTITY LINK */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Identity Authorization</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-center">
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-8 shadow-sm group hover:border-[#024653]/20 transition-all relative">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                                    <Phone size={20} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Phone Connection</span>
                            </div>

                            <input
                                {...register("phone")}
                                type="tel"
                                autoFocus
                                placeholder="(000) 000-0000"
                                className="bg-transparent text-4xl font-black text-[#024653] outline-none w-full tabular-nums tracking-widest placeholder:text-[#024653]/5"
                            />

                            <AnimatePresence>
                                {status === 'success' && (
                                    <motion.div
                                        initial={{ scale: 0, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="absolute top-8 right-8"
                                    >
                                        <div className="w-10 h-10 rounded-full bg-[#05D16E] flex items-center justify-center text-white shadow-lg shadow-[#05D16E]/20">
                                            <ShieldCheck size={20} strokeWidth={4} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Feedback Slot */}
                        <div className="h-6 mt-4">
                            <AnimatePresence mode="wait">
                                {status === 'error' && (
                                    <motion.div initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-red-500 font-black text-[9px] uppercase tracking-widest px-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                                        <span>Authentication Failed: Identity Not Recognized</span>
                                    </motion.div>
                                )}
                                {status === 'success' && (
                                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 px-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E] animate-bounce" />
                                        <span className="text-[#05D16E] font-black text-[9px] uppercase tracking-widest">
                                            Profile Decrypted. Synchronizing Vault...
                                        </span>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: VAULT ARCHIVE */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <User size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Vault Archive</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-between">
                        <div className="space-y-4">
                            <div className="bg-white/50 border border-[#024653]/5 rounded-xl p-5 flex items-start gap-4">
                                <ShieldCheck className="text-[#024653]/20 shrink-0" size={24} />
                                <div className="space-y-1">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]">Secure Retrieval</p>
                                    <p className="text-[10px] font-bold text-[#024653]/40 leading-relaxed">
                                        Accessing your saved property blueprints and historical protocol preferences.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Back to New Customer Action */}
                        <div className="pt-8">
                            <button
                                onClick={onBack}
                                className="w-full bg-white border border-[#024653]/10 rounded-xl p-5 flex items-center justify-start gap-4 group hover:border-[#024653]/30 hover:shadow-xl transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#024653]/5 flex items-center justify-center text-[#024653]/30 group-hover:bg-[#024653] group-hover:text-white transition-all">
                                    <ArrowLeft size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]">New Customer?</p>
                                    <p className="text-[9px] font-bold text-[#024653]/30 uppercase tracking-tighter">Initialize New Cleaning Protocol</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
