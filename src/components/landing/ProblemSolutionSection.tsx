"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProblemSolutionSection() {
    return (
        <section className="py-24 relative overflow-hidden text-[#024653] snap-start scroll-mt-[90px] translate-y-[30px]">
            {/* Ambient Botanical Glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#05D16E]/5 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#024653]/5 rounded-full blur-[120px]" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4 shadow-sm py-2">
                    <span className="text-[#05D16E] font-black tracking-[0.2em] text-xs uppercase">The Difference</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-[#024653]">
                        Not All Cleans <br /> Are Created <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E6168] to-[#05D16E]">Equal.</span>
                    </h2>
                    <p className="text-[#024653]/60 font-medium">Stop settling for &quot;good enough&quot;. Experience the peace of mind that comes with perfection.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Problem Card */}
                    <div className="bg-white/40 backdrop-blur-md border border-[#024653]/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-6 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight mb-4 text-[#024653]/40 group-hover:text-[#024653] transition-colors uppercase">The Standard Service</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-[#024653]/60">
                                    <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold">X</div>
                                    <span className="font-medium">Rushed appointments & missed spots</span>
                                </li>
                                <li className="flex items-center gap-4 text-[#024653]/60">
                                    <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold">X</div>
                                    <span className="font-medium">Inconsistent cleaners & schedules</span>
                                </li>
                                <li className="flex items-center gap-4 text-[#024653]/60">
                                    <div className="w-8 h-8 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500 font-bold">X</div>
                                    <span className="font-medium">Hidden fees & confusing quotes</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* The Solution Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-white border-2 border-[#05D16E]/20 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden shadow-2xl shadow-[#05D16E]/5"
                    >
                        {/* Elite Badge */}
                        <div className="absolute top-6 right-6 px-3 py-1 bg-[#05D16E] text-[#024653] text-[10px] font-black uppercase tracking-widest rounded-full z-20">Elite</div>

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight mb-4 text-[#024653] uppercase">The ECS Standard</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-[#024653]">
                                    <div className="w-8 h-8 rounded-full bg-[#05D16E] flex items-center justify-center text-[#024653] font-bold shadow-lg shadow-[#05D16E]/20"><ArrowRight size={14} strokeWidth={4} /></div>
                                    <span className="font-black">50-Point checklist guarantee</span>
                                </li>
                                <li className="flex items-center gap-4 text-[#024653]">
                                    <div className="w-8 h-8 rounded-full bg-[#05D16E] flex items-center justify-center text-[#024653] font-bold shadow-lg shadow-[#05D16E]/20"><ArrowRight size={14} strokeWidth={4} /></div>
                                    <span className="font-black">Vetted, trained & insured pros</span>
                                </li>
                                <li className="flex items-center gap-4 text-[#024653]">
                                    <div className="w-8 h-8 rounded-full bg-[#05D16E] flex items-center justify-center text-[#024653] font-bold shadow-lg shadow-[#05D16E]/20"><ArrowRight size={14} strokeWidth={4} /></div>
                                    <span className="font-black">Transparent flat-rate pricing</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
