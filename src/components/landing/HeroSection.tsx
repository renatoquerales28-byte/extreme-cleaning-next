"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length >= 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section className="relative w-full antialiased overflow-hidden flex flex-col justify-center min-h-[85vh]">
            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center h-full">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-8"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#05D16E]/10 text-[#024653] text-xs font-bold uppercase tracking-widest mb-4">
                        <Sparkles size={14} className="text-[#05D16E]" />
                        <span>Premium Cleaning Services</span>
                    </div>

                    {/* Headline - Reduced size as requested */}
                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#024653] leading-tight">
                        Experience the peace <br /> of a <span className="text-[#05D16E]">perfectly clean space.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-base md:text-lg text-[#024653]/60 font-medium leading-relaxed max-w-xl mx-auto">
                        We create the ideal conditions in your environment to fulfill our purpose: <br className="hidden md:block" />
                        Generating Well-being and Efficiency in your spaces.
                    </p>

                    {/* Zip Code CTA */}
                    <form onSubmit={handleStart} className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8 pt-4">
                        <div className="relative w-full max-w-xs group">
                            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-[#024653]/30 group-focus-within:text-[#05D16E] transition-colors">
                                <MapPin size={20} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Zip Code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                className="w-full pl-12 pr-6 py-4 bg-white border-2 border-slate-100 rounded-full font-bold text-[#024653] placeholder:text-[#024653]/30 focus:border-[#05D16E] focus:ring-4 focus:ring-[#05D16E]/10 outline-none transition-all shadow-lg shadow-[#024653]/5"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={zipCode.length < 5}
                            className="h-[58px] px-8 rounded-full bg-[#024653] text-white font-bold tracking-wide hover:bg-[#02333d] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-xl shadow-[#024653]/20 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            Get Started <ArrowRight size={18} />
                        </button>
                    </form>

                    <p className="text-xs text-[#024653]/40 font-semibold tracking-wide mt-6">
                        Serving Spokane and surrounding areas
                    </p>

                </motion.div>
            </div>

            {/* Very subtle background blur to keep it clean */}
            <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#F9F8F2]/50 to-transparent -z-10 pointer-events-none" />
        </section>
    );
}
