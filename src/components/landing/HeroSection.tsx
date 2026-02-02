"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, MapPin, Star } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length === 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section id="hero-section" className="relative w-full bg-transparent pt-[60px] lg:pt-[20px] lg:h-[100svh] lg:max-h-[1000px] overflow-hidden font-sans text-[#024653] snap-start scroll-mt-[60px]">
            <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 h-full gap-4 lg:gap-0">

                {/* Left Column: Content & Conversion */}
                <div className="relative z-20 flex flex-col justify-center p-6 lg:p-10 lg:pr-0 h-full lg:pt-[53px]">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col gap-5 lg:gap-6 xl:gap-8"
                    >
                        {/* Main Content Group */}
                        <div className="space-y-4 lg:space-y-6 xl:space-y-8">
                            {/* Minimalist Headline */}
                            <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal leading-[1.1] tracking-tight">
                                Illuminate in style: <br />
                                <span className="italic font-light">extreme</span> cleaning <br />
                                solutions
                            </h1>

                            <p className="text-lg font-light opacity-70 max-w-md leading-relaxed">
                                Explore our collection and uncover the radiant treasures that will add a touch of enchantment to your world.
                            </p>

                            {/* Premium Elevated Zip Code Input - Refined Shadow */}
                            <div className="max-w-md">
                                <form onSubmit={handleStart} className="relative group">
                                    <div className={`flex items-center bg-white rounded-2xl p-1.5 transition-all duration-500 border border-gray-100/50 ${isFocused
                                        ? 'shadow-[0_12px_30px_rgba(2,70,83,0.12)] scale-[1.01]'
                                        : 'shadow-[0_4px_12px_rgba(2,70,83,0.05)]'
                                        }`}>
                                        <div className={`pl-5 transition-colors duration-300 ${isFocused ? 'text-[#024653]' : 'text-[#024653]/40'}`}>
                                            <MapPin size={20} />
                                        </div>
                                        <input
                                            type="text"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                            onFocus={() => setIsFocused(true)}
                                            onBlur={() => setIsFocused(false)}
                                            placeholder="Enter Zip Code"
                                            className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-base px-4 py-2 h-12"
                                        />
                                        <button
                                            type="submit"
                                            className="bg-[#05D16E] hover:bg-[#04bd63] text-[#024653] w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-[0_2px_4px_rgba(5,209,110,0.1)] active:scale-95"
                                        >
                                            <ArrowRight size={20} className="stroke-[3px]" />
                                        </button>
                                    </div>
                                </form>
                            </div>

                            {/* Service Tags */}
                            <div className="flex flex-wrap gap-2">
                                {["Residential Deep Clean", "Post-Construction", "Move-In Ready"].map((tag, i) => (
                                    <span key={i} className="px-3.5 py-1.5 rounded-full bg-[#f3f6f6] text-[10px] font-medium tracking-wide text-[#024653]/80">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Promo Widget - Coordinated position */}
                        <div className="flex items-center gap-3 w-fit">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-xl bg-gray-100 relative overflow-hidden flex-shrink-0">
                                <Image src="/brand/service-residential.png" alt="Promo" fill className="object-cover" />
                            </div>
                            <div className="space-y-0">
                                <div className="text-[13px] font-bold">Spring Cleaning Sale</div>
                                <div className="text-[10px] opacity-60 max-w-[160px] lg:max-w-[180px] font-light leading-snug">Get 15% off your first deep cleaning service this month.</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Floating Sheet Image */}
                <div className="relative h-[430px] lg:h-full w-full p-4 lg:p-10 lg:pl-0 flex items-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full h-[95%] rounded-2xl lg:rounded-3xl overflow-hidden shadow-sm"
                    >
                        <Image
                            src="/brand/hero_woman_cleaning.png"
                            alt="Extreme Cleaning Professional"
                            fill
                            className="object-cover"
                            priority
                        />


                        {/* Glassmorphism Chip */}
                        <div className="absolute bottom-24 right-16 bg-white/20 backdrop-blur-xl p-3.5 rounded-2xl flex items-center gap-3 text-white border border-white/20 max-w-[180px]">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <Sparkles size={14} />
                            </div>
                            <div>
                                <div className="text-xs font-bold">Exterior Glow</div>
                                <div className="text-[9px] opacity-80">$230.00</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Rotating Stamp - Absolute Center */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="backdrop-blur-md bg-white/20 border border-white/30 p-2.5 rounded-full shadow-sm"
                >
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        className="w-24 h-24 xl:w-28 xl:h-28 relative"
                    >
                        <svg viewBox="0 0 200 200" className="w-full h-full">
                            <defs>
                                <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                            </defs>
                            <text fill="#024653" fontSize="20" fontWeight="bold" letterSpacing="4">
                                <textPath href="#circlePath" startOffset="0%">
                                    • EXCELLENCE • RELIABILITY • PROFESSIONALISM
                                </textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Sparkles size={18} className="text-[#024653]" />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section >
    );
}
