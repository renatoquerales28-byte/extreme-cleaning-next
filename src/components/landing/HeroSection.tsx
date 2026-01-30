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
        <section className="relative w-full bg-white pt-24 lg:pt-0 min-h-[90vh] overflow-hidden font-sans text-[#024653]">
            <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 h-full gap-8 lg:gap-0">

                {/* Left Column: Content & Conversion */}
                <div className="relative z-20 flex flex-col justify-center px-6 lg:px-20 xl:px-32 py-10 lg:py-0 h-full">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-8 lg:space-y-10"
                    >
                        {/* Eyebrow */}
                        <div className="text-[10px] tracking-[0.4em] uppercase font-medium opacity-50 pl-1">
                            Luxury of Exclusive Cleaning
                        </div>

                        {/* Minimalist Headline */}
                        <h1 className="text-5xl lg:text-7xl xl:text-8xl font-normal leading-tight tracking-tight">
                            Illuminate in style: <br />
                            <span className="italic font-light">extreme</span> cleaning <br />
                            solutions
                        </h1>

                        <p className="text-lg font-light opacity-70 max-w-md leading-relaxed">
                            Explore our collection and uncover the radiant treasures that will add a touch of enchantment to your world.
                        </p>

                        {/* Minimalist Zip Code Input */}
                        <div className="max-w-md pt-2">
                            <form onSubmit={handleStart} className="relative group">
                                <div className={`flex items-center bg-[#024653] rounded-full p-1.5 transition-all duration-300 ${isFocused ? 'scale-[1.02]' : ''}`}>
                                    <div className="pl-6 text-white/50">
                                        <MapPin size={20} />
                                    </div>
                                    <input
                                        type="text"
                                        value={zipCode}
                                        onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                        onFocus={() => setIsFocused(true)}
                                        onBlur={() => setIsFocused(false)}
                                        placeholder="Enter Zip Code"
                                        className="w-full bg-transparent border-none focus:ring-0 text-white font-medium placeholder:text-white/40 text-lg px-4 py-3 h-14"
                                    />
                                    <button
                                        type="submit"
                                        disabled={zipCode.length < 5}
                                        className="bg-[#05D16E] hover:bg-[#04bd63] text-[#024653] w-14 h-14 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed shrink-0"
                                    >
                                        <ArrowRight size={24} className="stroke-[3px]" />
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Service Tags */}
                        <div className="flex flex-wrap gap-3 pt-4">
                            {["Residential Deep Clean", "Post-Construction", "Move-In Ready"].map((tag, i) => (
                                <span key={i} className="px-5 py-2 rounded-full bg-[#f3f6f6] text-xs font-medium tracking-wide text-[#024653]/80">
                                    {tag}
                                </span>
                            ))}
                        </div>

                        {/* Promo Widget */}
                        <div className="flex items-center gap-4 pt-8 lg:pt-16 border-t border-gray-100 lg:border-none w-fit">
                            <div className="w-16 h-16 rounded-2xl bg-gray-100 relative overflow-hidden">
                                <Image src="/brand/service-residential.png" alt="Promo" fill className="object-cover" />
                            </div>
                            <div className="space-y-1">
                                <div className="text-sm font-bold">Spring Cleaning Sale</div>
                                <div className="text-xs opacity-60 max-w-[200px]">Get 15% off your first deep cleaning service this month.</div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Floating Sheet Image */}
                <div className="relative h-[600px] lg:h-full w-full p-4 lg:p-8 lg:pl-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="relative w-full h-full rounded-[3rem] lg:rounded-[5rem] overflow-hidden"
                    >
                        <Image
                            src="/brand/hero_woman_cleaning.png"
                            alt="Extreme Cleaning Professional"
                            fill
                            className="object-cover"
                            priority
                        />

                        {/* Overlay: Minimal Counter */}
                        <div className="absolute top-10 left-10 text-white">
                            <div className="text-3xl font-light">+500</div>
                            <div className="text-xs uppercase tracking-widest opacity-80 mt-1">Cleans Completed</div>
                        </div>

                        {/* Overlay: Social Links */}
                        <div className="absolute bottom-10 right-10 text-white flex gap-6 text-xs font-bold tracking-widest uppercase">
                            <a href="#" className="hover:opacity-70 transition-opacity">Instagram ↗</a>
                            <a href="#" className="hover:opacity-70 transition-opacity">Facebook ↗</a>
                        </div>

                        {/* Glassmorphism Chip */}
                        <div className="absolute bottom-32 right-20 bg-white/30 backdrop-blur-xl p-4 rounded-2xl flex items-center gap-4 text-white border border-white/20 max-w-[200px]">
                            <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                                <Sparkles size={16} />
                            </div>
                            <div>
                                <div className="text-sm font-bold">Exterior Glow</div>
                                <div className="text-[10px] opacity-80">$230.00</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Rotating Stamp - Absolute Center */}
            <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none mix-blend-multiply">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="w-40 h-40 relative"
                >
                    <svg viewBox="0 0 200 200" className="w-full h-full">
                        <defs>
                            <path id="circlePath" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                        </defs>
                        <text fill="#024653" fontSize="18" fontWeight="bold" letterSpacing="4">
                            <textPath href="#circlePath" startOffset="0%">
                                • EXCELLENCE • RELIABILITY • PROFESSIONALISM
                            </textPath>
                        </text>
                        <circle cx="100" cy="100" r="40" fill="white" />
                        <g transform="translate(88, 88)">
                            <Sparkles size={24} className="text-[#024653]" />
                        </g>
                    </svg>
                </motion.div>
            </div>
        </section>
    );
}
