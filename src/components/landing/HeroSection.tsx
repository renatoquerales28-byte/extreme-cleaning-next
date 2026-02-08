"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles, MapPin, Star } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isStickyFocused, setIsStickyFocused] = useState(false);
    const [showSticky, setShowSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 1024) {
                const strategicSection = document.getElementById('strategic-section');
                if (strategicSection) {
                    const rect = strategicSection.getBoundingClientRect();
                    // Trigger when the bottom of the strategic section (with its CTAs) 
                    // is about to disappear under the header (60px)
                    // Increased threshold to 250 to appear slightly earlier
                    setShowSticky(rect.bottom < 250);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Check initial state
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length === 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section id="hero-section" className="relative w-full bg-transparent p-0 lg:pt-[20px] lg:h-[100svh] lg:max-h-[1000px] overflow-hidden font-sans text-[#024653] snap-start scroll-mt-[60px]">

            {/* =========================================
                MOBILE LAYOUT (lg:hidden)
               ========================================= */}
            <div className="lg:hidden w-full bg-gray-100/50">
                {/* Mobile Header Image */}
                <div className="relative w-full h-[45vh] bg-gray-100">
                    <Image
                        src="/brand/hero_woman_cleaning.png"
                        alt="Extreme Cleaning Professional"
                        fill
                        className="object-cover object-top"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-transparent" />
                </div>

                {/* Mobile Content Card */}
                <div className="relative z-20 -mt-10 rounded-t-[2.5rem] bg-[#F9F8F2] px-6 pt-16 pb-[30px] shadow-[0_-10px_40px_rgba(0,0,0,0.05)] text-center">

                    {/* Mobile Stamp - Centered on Edge */}
                    <div className="absolute left-1/2 -top-9 -translate-x-1/2 z-40 pointer-events-none">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="backdrop-blur-md bg-white/20 border border-white/30 p-1.5 rounded-full shadow-sm"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 relative"
                            >
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <defs>
                                        <path id="circlePathMobile" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                    </defs>
                                    <text fill="#024653" fontSize="24" fontWeight="bold" letterSpacing="6">
                                        <textPath href="#circlePathMobile" startOffset="0%">
                                            EXCELLENCE&nbsp;&nbsp;&nbsp;RELIABILITY&nbsp;&nbsp;&nbsp;
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles size={14} className="text-[#024653]" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Mobile Content */}
                    <div className="space-y-5">
                        <h1 className="text-3xl font-normal leading-[1.1] tracking-tight">
                            Professional Cleaning <br />
                            <span className="italic font-light">Excellence</span> in Spokane <br />
                            for your home
                        </h1>

                        <p className="text-[14px] font-light opacity-70 leading-[1.4] max-w-[300px] mx-auto">
                            Precision in every detail, reliability in every visit. <br className="hidden xs:block" /> We redefine maintenance across Spokane and surrounding areas.
                        </p>

                        {/* Mobile Delicate Input */}
                        <div className="max-w-md mx-auto relative group pt-2">
                            <div className="flex items-center bg-white rounded-2xl p-1 transition-all duration-500 border border-gray-100 shadow-[0_4px_15px_rgba(0,0,0,0.05)]">
                                <div className="pl-4 text-[#024653]/40">
                                    <MapPin size={18} />
                                </div>
                                <input
                                    type="text"
                                    value={zipCode}
                                    onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                    placeholder="Enter Zip Code"
                                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-base px-3 h-10"
                                />
                                <button className="bg-[#05D16E] text-[#024653] w-10 h-10 rounded-xl flex items-center justify-center shrink-0">
                                    <ArrowRight size={18} className="stroke-[3px]" />
                                </button>
                            </div>
                        </div>

                        {/* Mobile Spacer & Ticker */}
                        <div className="h-[3px] w-full" />
                        <div className="w-full overflow-hidden mask-linear-fade relative">
                            <motion.div
                                className="flex gap-3 w-max"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                            >
                                {[
                                    "Residential Cleaning", "Commercial Janitorial", "Post-Construction", "Move-In/Move-Out",
                                    "Deep Cleaning", "Eco-Friendly", "Office Cleaning", "Sanitization",
                                    "Residential Cleaning", "Commercial Janitorial", "Post-Construction", "Move-In/Move-Out",
                                    "Deep Cleaning", "Eco-Friendly", "Office Cleaning", "Sanitization"
                                ].map((tag, i) => (
                                    <span key={i} className="px-5 py-2.5 rounded-full bg-[#f3f6f6] text-xs font-medium tracking-wide text-[#024653]/90 whitespace-nowrap shadow-sm">
                                        {tag}
                                    </span>
                                ))}
                            </motion.div>
                            <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#F9F8F2] to-transparent z-10" />
                            <div className="absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-[#F9F8F2] to-transparent z-10" />
                        </div>
                    </div>
                </div>

                {/* Mobile Sticky Footer */}
                <AnimatePresence>
                    {showSticky && (
                        <motion.div
                            initial={{ y: "100%", opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: "100%", opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed bottom-0 left-0 right-0 z-50 bg-[#F9F8F2] border-t border-[#024653]/5 rounded-t-[1.25rem] px-6 pt-6 pb-10 shadow-[0_-10px_40px_rgba(0,0,0,0.12)]"
                        >
                            <div className="flex flex-col gap-5">
                                <div className="flex items-center gap-2 w-full">
                                    {/* Input side */}
                                    <div className={`flex-1 flex items-center bg-white rounded-full px-4 h-12 shadow-[0_4px_20px_rgba(2,70,83,0.06)] border transition-all duration-300 ${isStickyFocused ? 'border-[#05D16E]/40 shadow-[0_4px_25px_rgba(5,209,110,0.1)]' : 'border-gray-100'}`}>
                                        <MapPin size={16} className={`shrink-0 transition-colors ${isStickyFocused ? 'text-[#05D16E]' : 'text-[#024653]/30'}`} />
                                        <input
                                            type="text"
                                            value={zipCode}
                                            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                            onFocus={() => setIsStickyFocused(true)}
                                            onBlur={() => setIsStickyFocused(false)}
                                            placeholder="Zipcode"
                                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-sm ml-2 w-full"
                                        />
                                    </div>

                                    {/* Button side */}
                                    <button
                                        onClick={() => handleStart()}
                                        className="bg-[#024653] text-white px-5 h-12 rounded-full font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_25px_rgba(2,70,83,0.2)] active:scale-95 whitespace-nowrap"
                                    >
                                        <span>Get Free Quote</span>
                                        <ArrowRight size={14} />
                                    </button>
                                </div>
                                <div className="text-center text-[10px] text-[#024653]/60 font-medium px-4 leading-tight">
                                    Get 15% off your first deep cleaning service this month.
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>


            {/* =========================================
                DESKTOP LAYOUT (hidden lg:block)
               ========================================= */}
            <div className="hidden lg:block w-full h-full max-w-[1700px] mx-auto relative">
                <div className="grid grid-cols-2 h-full gap-0">
                    {/* Left Column: Content & Conversion */}
                    <div className="relative z-20 flex flex-col justify-center p-10 pr-0 h-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="flex flex-col gap-6 lg:gap-6 xl:gap-8"
                        >
                            {/* Main Content Group */}
                            <div className="space-y-6 lg:space-y-6 xl:space-y-8">
                                {/* Minimalist Headline */}
                                <h1 className="text-4xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-normal leading-[1.1] tracking-tight">
                                    Professional Cleaning <br />
                                    <span className="italic font-light">Excellence</span> in Spokane <br />
                                    for your home
                                </h1>

                                <p className="text-lg font-light opacity-70 max-w-md leading-relaxed">
                                    Precision in every detail, reliability in every visit. <br />
                                    We redefine maintenance across Spokane and surrounding areas.
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
                    <div className="relative h-full w-full p-10 pl-0 flex items-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="relative w-full h-[95%] rounded-3xl overflow-hidden shadow-sm"
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
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
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
            </div>

        </section >
    );
}
