"use client";

import React, { useState } from "react";
import Image from "next/image";
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
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 w-full h-full z-0">
                <Image
                    src="/brand/hero-bg.png"
                    alt="Clean Living Space"
                    fill
                    className="object-cover"
                    priority
                />
                {/* Gradient Overlay for Text Readability - Reduced opacity */}
                <div className="absolute inset-0 bg-white/40 bg-gradient-to-b from-white/80 via-white/40 to-white/90 backdrop-blur-[1px]" />
            </div>

            <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center text-center h-full">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl space-y-8"
                >
                    {/* Badge */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/50 backdrop-blur-md border border-[#05D16E]/20 text-[#024653] text-xs font-bold uppercase tracking-widest mb-4 shadow-sm">
                        <Sparkles size={14} className="text-[#05D16E]" />
                        <span>Premium Cleaning Services</span>
                    </div>

                    {/* Headline */}
                    <h1 className="text-5xl md:text-6xl font-black tracking-tight text-[#024653] leading-tight drop-shadow-sm">
                        Experience the peace <br /> of a <span className="text-[#05D16E]">perfectly clean space.</span>
                    </h1>

                    {/* Subtitle */}
                    <p className="text-lg md:text-xl text-[#024653] font-semibold leading-relaxed max-w-xl mx-auto drop-shadow-sm">
                        We create the ideal conditions in your environment to fulfill our purpose: <br className="hidden md:block" />
                        Generating Well-being and Efficiency in your spaces.
                    </p>

                    {/* Zip Code CTA - Redesigned */}
                    <form onSubmit={handleStart} className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-10 p-2 bg-white rounded-full shadow-2xl shadow-[#024653]/10 border border-[#05D16E]/10 max-w-lg mx-auto transform hover:scale-[1.01] transition-transform duration-300">
                        <div className="relative flex-1 w-full sm:w-auto group">
                            <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none text-[#024653]/40 group-focus-within:text-[#05D16E] transition-colors">
                                <MapPin size={22} />
                            </div>
                            <input
                                type="text"
                                placeholder="Enter your Zip Code"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                className="w-full pl-14 pr-6 py-4 bg-transparent border-none font-bold text-[#024653] text-lg placeholder:text-[#024653]/30 focus:ring-0 focus:outline-none"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={zipCode.length < 5}
                            className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#05D16E] text-[#024653] font-black text-lg tracking-wide hover:bg-[#04bd63] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg hover:shadow-[#05D16E]/30 flex items-center justify-center gap-2"
                        >
                            Get Started <ArrowRight size={20} strokeWidth={3} />
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
