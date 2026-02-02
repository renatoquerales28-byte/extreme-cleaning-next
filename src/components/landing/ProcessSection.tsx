"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, ClipboardList, CircleDollarSign, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProcessSection() {
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
        <section className="w-full bg-transparent py-24 lg:py-32 relative overflow-hidden" id="process">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10">

                {/* Section Title - Matching Reference */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-20 lg:mb-28"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#024653]">
                        From Chaos to <br />
                        <span className="font-bold text-[#05D16E]">Calm</span> in 3 Steps.
                    </h2>
                </motion.div>

                {/* VISUAL PROCESS FLOW - Exact Replica */}
                <div className="relative min-h-[400px] lg:min-h-[350px] mb-24 lg:mb-32">

                    {/* The Connecting Wave - Exact S-Curve */}
                    <div className="absolute inset-0 hidden lg:block overflow-visible pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 1200 350" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full" preserveAspectRatio="none">
                            <motion.path
                                d="M0 280 C100 280, 200 280, 280 280 C360 280, 420 80, 600 80 C780 80, 840 180, 920 180 C1000 180, 1100 180, 1200 180"
                                stroke="#05D16E"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {/* Step Nodes & Content - Positioned on Curve */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-0 w-full relative z-10">

                        {/* STEP 1: LOW on curve (y=280), Text BELOW */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="relative flex flex-col items-center lg:items-start lg:pl-8"
                        >
                            {/* Ghost Number */}
                            <div className="absolute -left-4 lg:left-16 top-0 text-[120px] lg:text-[160px] font-thin text-[#024653]/5 leading-none select-none pointer-events-none">1</div>

                            {/* Node - Positioned at y=280 (bottom area) */}
                            <div className="lg:translate-y-[180px] mb-6">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#085560]">
                                    <ClipboardList size={22} />
                                </div>
                            </div>

                            {/* Text Below Node */}
                            <div className="lg:translate-y-[180px] text-center lg:text-left">
                                <h3 className="text-xl lg:text-2xl font-semibold text-[#024653] tracking-tight mb-2">General concept</h3>
                                <p className="text-[#024653]/60 font-light leading-relaxed text-sm max-w-[200px]">Select your service type and tell us about your space in 60 seconds.</p>
                            </div>
                        </motion.div>

                        {/* STEP 2: PEAK of curve (y=80), Text BELOW */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            className="relative flex flex-col items-center"
                        >
                            {/* Ghost Number */}
                            <div className="absolute left-1/2 -translate-x-1/2 lg:translate-x-8 -top-4 text-[120px] lg:text-[160px] font-thin text-[#024653]/5 leading-none select-none pointer-events-none">2</div>

                            {/* Node - Positioned at y=80 (peak) */}
                            <div className="lg:translate-y-[20px] mb-6">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#085560]">
                                    <CircleDollarSign size={22} />
                                </div>
                            </div>

                            {/* Text Below Node */}
                            <div className="lg:translate-y-[20px] text-center">
                                <h3 className="text-xl lg:text-2xl font-semibold text-[#024653] tracking-tight mb-2">Post product</h3>
                                <p className="text-[#024653]/60 font-light leading-relaxed text-sm max-w-[200px]">Get an instant transparent price. No hidden fees, ever.</p>
                            </div>
                        </motion.div>

                        {/* STEP 3: MEDIUM on curve (y=180), Text BELOW */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            className="relative flex flex-col items-center lg:items-end lg:pr-8"
                        >
                            {/* Ghost Number */}
                            <div className="absolute right-0 lg:right-16 -top-4 text-[120px] lg:text-[160px] font-thin text-[#024653]/5 leading-none select-none pointer-events-none">3</div>

                            {/* Node - Positioned at y=180 (medium) */}
                            <div className="lg:translate-y-[100px] mb-6">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#085560]">
                                    <Sparkles size={22} />
                                </div>
                            </div>

                            {/* Text Below Node */}
                            <div className="lg:translate-y-[100px] text-center lg:text-right">
                                <h3 className="text-xl lg:text-2xl font-semibold text-[#024653] tracking-tight mb-2">Design process</h3>
                                <p className="text-[#024653]/60 font-light leading-relaxed text-sm max-w-[200px]">We arrive on time, equipped, and ready to transform your space.</p>
                            </div>
                        </motion.div>

                    </div>
                </div>

                {/* BOTTOM CTAs - Wireframe Implementation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center border-t border-[#024653]/5 pt-20"
                >
                    {/* Zipcode & Send Integrated Block */}
                    <div className="lg:col-span-5 flex gap-4">
                        <div className={`flex-grow flex items-center bg-white rounded-full px-6 py-4 shadow-[0_10px_30px_rgba(2,70,83,0.05)] border border-gray-100 transition-all duration-500 ${isFocused ? 'shadow-[0_12px_40px_rgba(2,70,83,0.1)] border-[#05D16E]/30' : ''}`}>
                            <MapPin size={20} className={isFocused ? 'text-[#05D16E]' : 'text-[#024653]/40'} />
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Zipcode"
                                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-lg ml-3"
                            />
                        </div>
                        <button
                            onClick={handleStart}
                            className="bg-white px-10 rounded-2xl text-[#024653] font-bold uppercase tracking-widest text-xs border border-gray-100 shadow-[0_10px_30px_rgba(2,70,83,0.05)] hover:bg-[#024653] hover:text-white transition-all duration-300"
                        >
                            Send
                        </button>
                    </div>

                    {/* Main CTA Button */}
                    <div className="lg:col-span-7">
                        <button
                            onClick={() => router.push('/quote')}
                            className="w-full bg-[#024653] group text-white py-4 lg:py-5 rounded-2xl lg:rounded-3xl font-bold uppercase tracking-[0.2em] text-sm lg:text-base flex items-center justify-center gap-4 hover:bg-[#02333d] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(2,70,83,0.2)] hover:-translate-y-1"
                        >
                            Start Your Transformation <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
