"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function ProblemSolutionSection() {
    return (
        <section className="bg-brand-dark py-24 relative overflow-hidden text-white">
            {/* Ambient Glow */}
            <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-light/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px]" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <span className="text-accent font-black tracking-[0.2em] text-xs uppercase">The Difference</span>
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
                        Not All Cleans <br /> Are Created <span className="text-brand-light">Equal.</span>
                    </h2>
                    <p className="text-brand-light/60 font-medium">Stop settling for &quot;good enough&quot;. Experience the peace of mind that comes with perfection.</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {/* The Problem Card */}
                    <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12 flex flex-col gap-6 relative group overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight mb-4 text-white/50 group-hover:text-white transition-colors">The Standard Service</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-white/60">
                                    <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 font-bold">X</div>
                                    <span>Rushed appointments & missed spots</span>
                                </li>
                                <li className="flex items-center gap-4 text-white/60">
                                    <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 font-bold">X</div>
                                    <span>Inconsistent cleaners & schedules</span>
                                </li>
                                <li className="flex items-center gap-4 text-white/60">
                                    <div className="w-8 h-8 rounded-full bg-rose-500/20 flex items-center justify-center text-rose-500 font-bold">X</div>
                                    <span>Hidden fees & confusing quotes</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* The Solution Card */}
                    <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="bg-brand-light/10 backdrop-blur-md border border-brand-light/20 rounded-3xl p-8 md:p-12 flex flex-col gap-6 relative overflow-hidden shadow-2xl shadow-brand-light/10"
                    >
                        {/* Spotlight Effect */}
                        <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                        <div className="relative z-10">
                            <h3 className="text-2xl font-black tracking-tight mb-4 text-white">The ECS Standard</h3>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-4 text-white">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-brand-dark font-bold"><ArrowRight size={14} strokeWidth={4} /></div>
                                    <span className="font-bold">50-Point checklist guarantee</span>
                                </li>
                                <li className="flex items-center gap-4 text-white">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-brand-dark font-bold"><ArrowRight size={14} strokeWidth={4} /></div>
                                    <span className="font-bold">Vetted, trained & insured pros</span>
                                </li>
                                <li className="flex items-center gap-4 text-white">
                                    <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center text-brand-dark font-bold"><ArrowRight size={14} strokeWidth={4} /></div>
                                    <span className="font-bold">Transparent flat-rate pricing</span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
