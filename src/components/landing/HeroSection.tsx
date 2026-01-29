"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [isFocused, setIsFocused] = useState(false);

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length >= 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section className="relative w-full bg-[#f3f6f6] pt-32 pb-20 overflow-hidden font-sans selection:bg-[#05D16E] selection:text-[#024653]">
            {/* Background decorations */}
            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#05D16E]/5 blur-[120px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#024653]/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">

                {/* Left Column: Content & CTA */}
                <div className="lg:col-span-4 relative z-20 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="space-y-8"
                    >
                        <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full text-xs font-bold shadow-sm text-[#024653] uppercase tracking-wider border border-gray-100">
                            <span className="w-1.5 h-1.5 bg-[#05D16E] rounded-full animate-pulse"></span>
                            Premium Cleaning
                        </div>

                        <div className="relative">
                            <h1 className="text-5xl xl:text-6xl font-black tracking-tight text-[#024653] leading-[1.1]">
                                Extreme <br />
                                <span className="inline-flex items-center gap-3 flex-wrap">
                                    <span className="bg-white px-4 py-1 rounded-full shadow-sm border border-gray-100 flex items-center justify-center transform -rotate-2 hover:rotate-0 transition-transform duration-300">
                                        <Sparkles className="text-[#05D16E] fill-[#05D16E]/20" size={24} />
                                    </span>
                                    <span className="text-[#05D16E]">Cleaning</span>
                                </span>
                                <br />
                                Solutions
                            </h1>
                        </div>

                        {/* Zip Code Form Integration */}
                        <div className="pt-2">
                            <form onSubmit={handleStart} className={`relative flex items-center p-2 bg-white rounded-full transition-all duration-300 border-2 ${isFocused ? 'border-[#05D16E] shadow-xl shadow-[#05D16E]/10' : 'border-transparent shadow-lg'}`}>
                                <div className="pl-4 text-[#024653]/50">
                                    <MapPin size={20} />
                                </div>
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    onFocus={() => setIsFocused(true)}
                                    onBlur={() => setIsFocused(false)}
                                    placeholder="Enter Zip Code"
                                    className="w-full bg-transparent border-none focus:ring-0 text-[#024653] font-bold placeholder:text-[#024653]/30 text-lg px-3 py-2"
                                />
                                <button
                                    type="submit"
                                    disabled={zipCode.length < 5}
                                    className="bg-[#024653] hover:bg-[#023540] text-white p-3 rounded-full transition-all disabled:opacity-50 disabled:cursor-not-allowed group"
                                >
                                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </form>
                            <p className="text-xs text-gray-400 mt-3 ml-4 font-medium">
                                * Serve Spokane & surrounding areas
                            </p>
                        </div>

                        {/* Icons Row */}
                        <div className="flex gap-4 pt-4 border-t border-gray-200/50">
                            {[
                                { icon: <Sparkles size={20} />, label: "Quality" },
                                { icon: <ArrowRight size={20} className="-rotate-45" />, label: "Fast" },
                                { icon: <div className="w-5 h-5 bg-[#05D16E] rounded-full" />, label: "Eco" }
                            ].map((item, i) => (
                                <div key={i} className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm border border-gray-100 text-[#024653] hover:text-[#05D16E] hover:border-[#05D16E]/30 hover:scale-110 transition-all duration-300 cursor-default">
                                    {item.icon}
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Center Column: Main Image */}
                <div className="lg:col-span-5 relative h-[500px] lg:h-[620px]">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="w-full h-full relative"
                    >
                        {/* Floating Badges */}
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1 }}
                            className="absolute top-10 left-6 z-40 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-[#024653] shadow-lg border border-white/40"
                        >
                            <span className="w-2 h-2 bg-[#05D16E] rounded-full animate-pulse"></span>
                            Residential
                        </motion.div>
                        <motion.div
                            initial={{ x: 20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 1.2 }}
                            className="absolute top-24 -right-4 lg:right-auto lg:left-32 z-40 bg-white/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold text-[#024653] shadow-lg border border-white/40"
                        >
                            <span className="w-2 h-2 bg-[#024653] rounded-full"></span>
                            Commercial
                        </motion.div>

                        {/* Main Image */}
                        <div className="w-full h-full rounded-[3.5rem] overflow-hidden shadow-2xl relative group border-4 border-white/50">
                            <Image
                                src="/brand/hero_woman_cleaning.png"
                                alt="Professional Cleaner"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                                priority
                            />

                            {/* Stats Overlay */}
                            <div className="absolute bottom-6 left-6 right-6 p-6 bg-[#024653]/90 backdrop-blur-md rounded-[2.5rem] text-white border border-[#05D16E]/20">
                                <div className="flex items-end justify-between">
                                    <div>
                                        <div className="text-4xl lg:text-5xl font-bold tracking-tighter flex items-center gap-1">
                                            100<span className="text-[#05D16E] text-3xl">%</span>
                                        </div>
                                        <div className="text-[10px] opacity-80 mt-1 uppercase tracking-widest font-bold">Satisfaction Guaranteed</div>
                                    </div>
                                    <div className="p-3 bg-white/10 rounded-full">
                                        <Sparkles className="text-[#05D16E]" size={24} />
                                    </div>
                                </div>
                                <div className="flex gap-2 mt-5 overflow-hidden">
                                    <span className="bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 whitespace-nowrap">
                                        <span className="w-1.5 h-1.5 bg-[#05D16E] rounded-full"></span> Vetted Staff
                                    </span>
                                    <span className="bg-white/10 border border-white/10 px-4 py-1.5 rounded-full text-[10px] font-bold text-white flex items-center gap-1.5 whitespace-nowrap">
                                        <span className="w-1.5 h-1.5 bg-[#05D16E] rounded-full"></span> Insured
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Decorative Dots */}
                        <div className="absolute bottom-20 -left-6 flex flex-col gap-2 z-10 opacity-50">
                            <div className="w-2 h-2 bg-[#024653] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#05D16E] rounded-full"></div>
                            <div className="w-2 h-2 bg-[#024653] rounded-full"></div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Secondary Info */}
                <div className="lg:col-span-3 pl-0 lg:pl-10 flex flex-col justify-between h-auto lg:h-[620px] py-1 gap-8 lg:gap-0 hidden md:flex">
                    <div className="space-y-4 pt-10">
                        <h2 className="text-3xl font-bold tracking-tight leading-tight text-[#024653]">
                            Explore Our <br /> <span className="text-[#05D16E]">Excellence</span>
                        </h2>
                        <p className="text-gray-500 text-sm leading-relaxed font-medium">
                            Whether it&apos;s your home or office, our dedicated team ensures a pristine environment every time.
                        </p>
                    </div>

                    {/* Secondary Card */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        className="relative rounded-[3rem] overflow-hidden h-[340px] shadow-lg group border-2 border-white"
                    >
                        <Image
                            src="/brand/service-residential.png"
                            alt="Clean Home"
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />

                        {/* Upper Badge */}
                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 text-[10px] font-bold text-[#024653]">
                            <span className="w-1.5 h-1.5 bg-[#05D16E] rounded-full"></span>
                            Impeccable
                        </div>

                        {/* Lower Overlay */}
                        <div className="absolute inset-x-5 bottom-5 bg-[#024653]/90 backdrop-blur-md p-5 rounded-[2rem] text-white">
                            <div className="text-2xl font-bold">5000+</div>
                            <p className="text-[10px] opacity-70 leading-tight mt-1 font-medium uppercase tracking-wider">
                                Cleans Completed <br /> Successfully
                            </p>
                        </div>
                    </motion.div>
                </div>

            </div>
        </section>
    );
}
