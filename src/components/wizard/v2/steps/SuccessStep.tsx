"use client";

import React from "react";
import { Calendar, MapPin, ArrowRight, ShieldCheck, Target } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

export default function SuccessStep() {
    const router = useRouter();
    const { watch } = useFormContext<WizardData>();
    const data = watch();

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 max-w-6xl mx-auto w-full px-6 items-center">

                {/* LEFT COLUMN: CELEBRATION */}
                <div className="space-y-8 lg:space-y-12">
                    <div className="space-y-6">
                        {/* Status Badge */}
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-[#05D16E]/5 border border-[#05D16E]/20 rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-[#05D16E] animate-pulse shadow-[0_0_10px_#05D16E]" />
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#05D16E]">Protocol Secured</span>
                        </div>

                        {/* Big Celebration Text */}
                        <div className="space-y-4">
                            <h2 className="text-5xl lg:text-7xl font-normal tracking-tight text-[#024653] leading-[0.95]">
                                Reservation <br />
                                <span className="italic font-light">Confirmed.</span>
                            </h2>
                            <p className="text-base lg:text-lg font-light text-[#024653]/40 leading-relaxed max-w-md">
                                Registration successful. Your elite cleaning team has been synchronized in our Spokane scheduling nexus.
                            </p>
                        </div>
                    </div>

                    {/* Final Action - Adjusted for Desktop */}
                    <div className="pt-4">
                        <button
                            onClick={() => router.push('/')}
                            className="group flex items-center gap-4 text-[11px] font-black uppercase tracking-[0.3em] text-[#024653] hover:text-[#05D16E] transition-all"
                        >
                            <span>Return to Main Terminal</span>
                            <div className="w-12 h-12 rounded-xl bg-[#024653] flex items-center justify-center text-white group-hover:bg-[#05D16E] group-hover:scale-110 transition-all shadow-lg shadow-[#024653]/20">
                                <ArrowRight size={20} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* RIGHT COLUMN: SECURE RECEIPT */}
                <div className="relative group">
                    <div className="absolute -top-3 left-6 px-3 py-1 bg-white border border-[#024653]/10 rounded flex items-center gap-2 z-10 shadow-sm">
                        <Target size={12} className="text-[#05D16E]" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-[#024653]">Transmission Receipt</span>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-8 lg:p-10 space-y-8 shadow-2xl shadow-[#024653]/5 relative overflow-hidden"
                    >
                        {/* Background Shield Watermark */}
                        <div className="absolute -right-8 -bottom-8 opacity-[0.03] rotate-12">
                            <ShieldCheck size={280} />
                        </div>

                        <div className="flex items-center justify-between border-b border-[#024653]/10 pb-8 relative z-10">
                            <div className="space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Vault ID</p>
                                <p className="text-sm font-mono font-black text-[#024653]">#ECS-{Math.random().toString(36).substr(2, 6).toUpperCase()}</p>
                            </div>
                            <div className="text-right space-y-2">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Security Status</p>
                                <div className="flex items-center gap-2 justify-end">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E]" />
                                    <p className="text-[10px] font-black text-[#024653] uppercase tracking-widest">Active Encryption</p>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-10 relative z-10">
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#024653]/5 shadow-sm">
                                <div className="flex items-center gap-2 text-[#024653]/30">
                                    <Calendar size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Service Window</span>
                                </div>
                                <p className="text-base font-black text-[#024653]">{data.serviceTime || "Morning Slot"}</p>
                                <p className="text-[9px] font-bold text-[#05D16E] uppercase tracking-tighter italic">Precision Scheduled</p>
                            </div>
                            <div className="space-y-3 bg-white p-4 rounded-xl border border-[#024653]/5 shadow-sm">
                                <div className="flex items-center gap-2 text-[#024653]/30">
                                    <MapPin size={14} />
                                    <span className="text-[9px] font-black uppercase tracking-widest">Identity Nexus</span>
                                </div>
                                <p className="text-base font-black text-[#024653] truncate">{data.city || "Spokane Valley"}</p>
                                <p className="text-[9px] font-bold text-[#05D16E] uppercase tracking-tighter italic">Regional HQ Zone</p>
                            </div>
                        </div>

                        <div className="pt-6 relative z-10">
                            <div className="bg-[#024653] text-white p-4 rounded-xl text-center space-y-2">
                                <p className="text-[9px] font-medium opacity-60 uppercase tracking-[0.3em]">
                                    Confirmation Dispatched To
                                </p>
                                <p className="text-xs font-black tracking-widest truncate">{data.email || "recipient@terminal.com"}</p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}
