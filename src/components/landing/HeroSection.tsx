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
        if (zipCode.length >= 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section id="hero-section" className="relative w-full bg-white pt-[55px] lg:pt-0 lg:h-[100svh] lg:max-h-[1000px] overflow-hidden font-sans text-[#024653]">
            <div className="max-w-[1700px] mx-auto grid grid-cols-1 lg:grid-cols-2 h-full gap-4 lg:gap-0">

                {/* Left Column: Content & Conversion */}
                <div className="relative z-20 flex flex-col justify-center px-6 lg:px-20 xl:px-32 py-10 lg:py-0 h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4 lg:space-y-6 xl:space-y-8"
                    >
                        {/* Eyebrow */}
                        <div className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-50 pl-1">
                            Luxury of Exclusive Cleaning
                        </div>

                        {/* Minimalist Headline */}
                        <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal leading-[1.1] tracking-tight">
                            Illuminate in style: <br />
                            <span className="italic font-light">extreme</span> cleaning <br />
                            solutions
                        </h1>

                        <p className="text-lg font-light opacity-70 max-w-md leading-relaxed">
                            Explore our collection and uncover the radiant treasures that will add a touch of enchantment to your world.
                        </p>

                        {/* Minimalist Zip Code Input */}
                        <div className="max-w-md">
                            <form onSubmit={handleStart} className="relative group">
                                <div className={`flex items-center bg-[#024653] rounded-full p-1 transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                                    <div className="pl-5 text-white/50">
                                        <MapPin size={18} />
                                    </div>
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="Enter Zip Code"
                                        className="w-full bg-transparent border-none focus:ring-0 text-white font-medium placeholder:text-white/40 text-base px-4 py-1.5 h-11"
                                    />
                                    <button
                                        type="submit"
                                        disabled={zipCode.length < 5}
                                        className="bg-[#05D16E] hover:bg-[#04bd63] text-[#024653] w-11 h-11 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                    >
                                        <ArrowRight size={18} className="stroke-[3px]" />
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

                        {/* Promo Widget */}
                        <div className="flex items-center gap-4 pt-4 lg:pt-6 xl:pt-10 border-t border-gray-100 lg:border-none w-fit">
                            <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-2xl bg-gray-100 relative overflow-hidden flex-shrink-0">
                                <Image src="/brand/service-residential.png" alt="Promo" fill className="object-cover" />
                            </div>
                            <div className="space-y-0.5">
                                <div className="text-sm font-bold">Spring Cleaning Sale</div>
                                <div className="text-[11px] opacity-60 max-w-[180px] lg:max-w-[200px] font-light leading-snug">Get 15% off your first deep cleaning service this month.</div>
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
                        className="relative w-full h-[95%] rounded-[2.5rem] lg:rounded-[4rem] overflow-hidden shadow-sm"
                    >
                        <Image
                            src="/brand/hero_woman_cleaning.png"
                            alt="Extreme Cleaning Professional"
                            fill
                            className="object-cover"
                            priority
                        />

                        <div className="absolute top-6 left-6 lg:top-8 lg:left-8 text-white">
                            <div className="text-xl lg:text-2xl font-light">+500</div>
                            <div className="text-[9px] lg:text-[10px] uppercase tracking-widest opacity-80 mt-0.5">Cleans Completed</div>
                        </div>

                        {/* Overlay: Social Links */}
                        <div className="absolute bottom-8 right-8 text-white flex gap-6 text-[10px] font-bold tracking-widest uppercase">
                            <a href="#" className="hover:opacity-70 transition-opacity">Instagram ↗</a>
                            <a href="#" className="hover:opacity-70 transition-opacity">Facebook ↗</a>
                        </div>

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
        </section>
    );
}
