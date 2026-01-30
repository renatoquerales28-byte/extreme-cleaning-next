"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length >= 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section className="relative w-full bg-white pt-32 pb-20 overflow-hidden font-sans selection:bg-[#05D16E] selection:text-[#024653]">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#05D16E]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#024653]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

                {/* Left Column: Content & CTA (60%) */}
                <div className="lg:col-span-7 relative z-20 flex flex-col justify-center py-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-10"
                    >
                        <div className="inline-flex items-center gap-2 bg-[#f3f6f6] px-4 py-1.5 rounded-full text-xs font-bold text-[#024653] uppercase tracking-wider border border-gray-100">
                            <span className="w-1.5 h-1.5 bg-[#05D16E] rounded-full animate-pulse"></span>
                            Premium Cleaning Spokane
                        </div>

                        <div className="relative">
                            <h1 className="text-6xl xl:text-8xl font-black tracking-tight text-[#024653] leading-[1.05]">
                                Extreme <br />
                                <span className="inline-flex items-center gap-4 flex-wrap">
                                    <span className="bg-white px-5 py-2 rounded-full border border-gray-100 flex items-center justify-center transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <Sparkles className="text-[#05D16E] fill-[#05D16E]/20" size={32} />
                                    </span>
                                    <span className="text-[#05D16E]">Cleaning</span>
                                </span>
                                <br />
                                Solutions
                            </h1>
                        </div>

                        <p className="text-[#024653]/70 text-xl font-medium max-w-xl leading-relaxed">
                            Professional brilliance in every corner. We bring elite cleaning standards to your home or office with background-vetted pros.
                        </p>

                        {/* Zip Code Form Integration */}
                        <div className="pt-4 max-w-lg">
                            <form onSubmit={handleStart} className={`relative flex items-center p-2 bg-white rounded-full transition-all duration-300 border-2 ${isFocused ? 'border-[#05D16E]' : 'border-transparent'}`}>
                                <div className="pl-4 text-[#024653]/50">
                                    <MapPin size={24} />
                                </div>
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Enter Zip Code"
                                    className="w-full bg-transparent border-none focus:ring-0 text-[#024653] font-bold placeholder:text-[#024653]/30 text-xl px-4 py-3"
                                />
                                <button
                                    type="submit"
                                    disabled={zipCode.length < 5}
                                    className="bg-[#024653] hover:bg-[#023540] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest text-sm transition-all disabled:opacity-50 disabled:cursor-not-allowed group flex items-center gap-2"
                                >
                                    Start <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                        </div>

                        {/* Trust Badges */}
                        <div className="flex flex-wrap gap-8 pt-6">
                            {[
                                { label: "Licensed & Insured", value: "Verified" },
                                { label: "Background Checked", value: "100%" },
                                { label: "Satisfaction", value: "Guaranteed" }
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-[#024653] font-black uppercase tracking-widest text-[10px] opacity-40">{item.label}</span>
                                    <span className="text-[#024653] font-bold text-sm tracking-tight">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Main Image (40%) */}
                <div className="lg:col-span-5 relative h-[600px] lg:h-[750px] mt-12 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full h-full relative"
                    >
                        {/* Floating Interaction Cards */}
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.8 }}
                            className="absolute -top-6 -left-6 z-40 glass p-5 rounded-[1.5rem] border border-white/50"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#05D16E] rounded-full flex items-center justify-center text-[#024653]">
                                    <Sparkles size={24} />
                                </div>
                                <div>
                                    <div className="text-[#024653] font-black text-xl leading-none">4.9/5</div>
                                    <div className="text-[#024653]/60 text-[10px] font-bold uppercase tracking-widest mt-1">Average Review</div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Main Image */}
                        <div className="w-full h-full rounded-[2rem] overflow-hidden relative group">
                            <Image
                                src="/brand/hero_woman_cleaning.png"
                                alt="Professional Cleaner"
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                priority
                            />

                            {/* Info Overlay - Liquid Glass Light */}
                            <div className="absolute bottom-8 left-8 right-8 p-8 bg-white/20 backdrop-blur-[20px] rounded-[1.75rem] text-[#024653] border border-white/50">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="space-y-1">
                                        <div className="text-5xl font-black tracking-tighter text-[#024653]">500+</div>
                                        <div className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Success Cases</div>
                                    </div>
                                    <div className="w-14 h-14 bg-[#024653] rounded-2xl flex items-center justify-center text-[#05D16E]">
                                        <ArrowRight size={28} className="-rotate-45" />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <div className="px-4 py-2 bg-[#024653]/5 border border-[#024653]/10 rounded-full text-[10px] font-bold">Residential</div>
                                    <div className="px-4 py-2 bg-[#024653]/5 border border-[#024653]/10 rounded-full text-[10px] font-bold">Commercial</div>
                                </div>
                            </div>
                        </div>

                        {/* Back Decoration */}
                        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-[#05D16E]/10 rounded-full blur-[100px] -z-10" />
                    </motion.div>
                </div>
            </div>

            <style jsx>{`
                .glass {
                    background: rgba(255, 255, 255, 0.4);
                    backdrop-filter: blur(20px);
                }
            `}</style>
        </section>
    );
}
