"use client";

import React, { useEffect } from "react";
import { useWizardAction } from "../../WizardActionContext";
import { Building2, MapPin, Plus, UserCircle2, ArrowRight, LogOut, Target, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface PropertySelectionStepProps {
    onSelect: (prop: any) => void;
    onBack: () => void;
    customerName: string;
    properties: any[];
}

export default function PropertySelectionStep({ onSelect, onBack, customerName, properties }: PropertySelectionStepProps) {
    const { setAction } = useWizardAction();

    useEffect(() => {
        setAction({
            label: "Select Vault Item",
            onClick: () => { },
            disabled: true, // Manual selection required
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [setAction]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: PROPERTY ARCHIVE */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Building2 size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Saved Blueprint Gallery</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 lg:p-6 space-y-3">
                        <AnimatePresence mode="popLayout">
                            {properties.map((prop, idx) => (
                                <motion.button
                                    key={prop.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    onClick={() => onSelect(prop)}
                                    className="group w-full p-4 text-left transition-all flex items-center justify-between bg-white rounded-xl border-2 border-[#024653]/5 hover:border-[#024653] hover:shadow-xl hover:shadow-[#024653]/10"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-10 h-10 bg-[#F9F8F2] rounded-lg flex items-center justify-center text-[#024653] group-hover:bg-[#024653] group-hover:text-white transition-all duration-300 shrink-0">
                                            <Building2 size={18} />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-sm font-black text-[#024653] tracking-tight truncate">{prop.address}</h3>
                                            <div className="flex items-center gap-2 text-[#024653]/40 text-[9px] font-black uppercase tracking-widest">
                                                <MapPin size={10} className="text-[#05D16E]" /> {prop.city}
                                            </div>
                                        </div>
                                    </div>
                                    <ArrowRight size={14} className="text-[#024653]/10 group-hover:text-[#024653] transition-all" />
                                </motion.button>
                            ))}

                            <motion.button
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: properties.length * 0.05 }}
                                onClick={() => onSelect(0)}
                                className="w-full p-4 border-2 border-dashed border-[#024653]/10 hover:border-[#024653]/30 rounded-xl text-left text-[#024653]/40 hover:text-[#024653] transition-all flex items-center gap-4 group bg-white/50"
                            >
                                <div className="w-10 h-10 rounded-lg bg-[#024653]/5 flex items-center justify-center group-hover:bg-[#024653] group-hover:text-white transition-all">
                                    <Plus size={16} strokeWidth={4} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-widest leading-none mb-1">Add New Property</h4>
                                    <p className="text-[8px] font-bold opacity-40 uppercase tracking-tighter">New Operational Deployment</p>
                                </div>
                            </motion.button>
                        </AnimatePresence>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: SESSION CONTEXT */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Vault Session</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-between items-center text-center">
                        <div className="space-y-6 flex-1 flex flex-col justify-center w-full">
                            <div className="bg-white border-2 border-[#024653]/5 rounded-2xl p-8 shadow-2xl shadow-[#024653]/5 w-full relative overflow-hidden">
                                <div className="absolute -right-8 -bottom-8 text-[#024653]/5 rotate-12">
                                    <UserCircle2 size={120} />
                                </div>
                                <div className="relative z-10 space-y-4">
                                    <div className="w-16 h-16 rounded-full bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E] mx-auto mb-4">
                                        <ShieldCheck size={32} />
                                    </div>
                                    <div className="space-y-2">
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#024653]/40">Authorized Client</p>
                                        <h2 className="text-2xl font-black text-[#024653] tracking-tight">{customerName}</h2>
                                    </div>
                                    <div className="pt-4 mt-4 border-t border-[#024653]/5">
                                        <p className="text-[9px] font-bold text-[#024653]/40 uppercase tracking-widest italic">
                                            Vault Security verified by connection nexus.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Back Action */}
                        <div className="pt-8 w-full">
                            <button
                                onClick={onBack}
                                className="w-full bg-white border border-[#024653]/10 rounded-xl p-5 flex items-center justify-center gap-4 group hover:border-red-500/30 hover:shadow-xl transition-all"
                            >
                                <div className="w-10 h-10 rounded-lg bg-red-500/5 flex items-center justify-center text-red-500/30 group-hover:bg-red-500 group-hover:text-white transition-all">
                                    <LogOut size={18} />
                                </div>
                                <div className="text-left">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]">Not {customerName.split(' ')[0]}?</p>
                                    <p className="text-[9px] font-bold text-red-500/40 uppercase tracking-tighter italic">Terminate Secure Session</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
