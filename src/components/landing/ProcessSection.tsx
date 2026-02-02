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
        <section className="w-full bg-[#024653] py-20 lg:py-28 relative overflow-hidden" id="process">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10">

                {/* Section Title - White on Dark */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 lg:mb-20"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-white">
                        From Chaos to <br />
                        <span className="font-bold text-[#05D16E]">Calm</span> in 3 Steps.
                    </h2>
                </motion.div>

                {/* VISUAL PROCESS FLOW - Dark Mode Pixel Perfect */}
                <div className="relative h-[420px] lg:h-[350px] mb-20 lg:mb-24">

                    {/* Ghost Numbers - White on Dark */}
                    <div className="absolute inset-0 hidden lg:block pointer-events-none select-none overflow-hidden">
                        <div className="absolute left-[5%] top-[20%] text-[180px] font-extralight text-white/[0.03] leading-none">1</div>
                        <div className="absolute left-[43%] -top-[5%] text-[180px] font-extralight text-white/[0.03] leading-none">2</div>
                        <div className="absolute right-[8%] top-[5%] text-[180px] font-extralight text-white/[0.03] leading-none">3</div>
                    </div>

                    {/* The S-Curve - Reference Perfect Match */}
                    <div className="absolute inset-0 hidden lg:block overflow-visible">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 1200 350"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* Curve: Low → Peak → Medium Plateau (NOT back to bottom) */}
                            <motion.path
                                d="M-20 290 C80 290, 140 290, 200 280 C280 265, 350 180, 450 100 C550 20, 620 20, 700 60 C780 100, 850 160, 950 180 C1050 200, 1120 200, 1220 200"
                                stroke="#05D16E"
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {/* Nodes Positioned on Curve */}
                    <div className="absolute inset-0 hidden lg:block">
                        {/* Node 1 - LOW position (y=290 -> translate to ~75%) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                            className="absolute left-[12%] top-[75%] -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#05D16E]">
                                <ClipboardList size={22} />
                            </div>
                        </motion.div>

                        {/* Node 2 - PEAK position (y=60 -> translate to ~17%) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.2 }}
                            className="absolute left-[50%] top-[17%] -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#05D16E]">
                                <CircleDollarSign size={22} />
                            </div>
                        </motion.div>

                        {/* Node 3 - MEDIUM PLATEAU position (y=180 -> translate to ~52%) */}
                        <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.6 }}
                            className="absolute left-[85%] top-[52%] -translate-x-1/2 -translate-y-1/2"
                        >
                            <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#05D16E]">
                                <Sparkles size={22} />
                            </div>
                        </motion.div>
                    </div>

                    {/* Text Labels */}
                    <div className="absolute inset-0 hidden lg:block">
                        {/* Step 1 Text - Below Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1 }}
                            className="absolute left-[5%] bottom-[2%] text-left"
                        >
                            <h3 className="text-lg font-semibold text-white tracking-tight mb-1">General concept</h3>
                            <p className="text-white/50 font-light leading-relaxed text-sm max-w-[180px]">Select your service type and tell us about your space in 60 seconds.</p>
                        </motion.div>

                        {/* Step 2 Text - Below Node (Peak) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.4 }}
                            className="absolute left-[50%] top-[32%] -translate-x-1/2 text-center"
                        >
                            <h3 className="text-lg font-semibold text-white tracking-tight mb-1">Post product</h3>
                            <p className="text-white/50 font-light leading-relaxed text-sm max-w-[180px]">Get an instant transparent price. No hidden fees, ever.</p>
                        </motion.div>

                        {/* Step 3 Text - ABOVE Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.8 }}
                            className="absolute right-[5%] top-[8%] text-right"
                        >
                            <h3 className="text-lg font-semibold text-white tracking-tight mb-1">Design process</h3>
                            <p className="text-white/50 font-light leading-relaxed text-sm max-w-[180px] ml-auto">We arrive on time, equipped, and ready to transform your space.</p>
                        </motion.div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex flex-col gap-14 lg:hidden">
                        {[
                            { icon: ClipboardList, title: "General concept", desc: "Select your service type and tell us about your space in 60 seconds.", num: "1" },
                            { icon: CircleDollarSign, title: "Post product", desc: "Get an instant transparent price. No hidden fees, ever.", num: "2" },
                            { icon: Sparkles, title: "Design process", desc: "We arrive on time, equipped, and ready to transform your space.", num: "3" }
                        ].map((step, i) => (
                            <div key={i} className="relative flex items-start gap-5">
                                <div className="absolute -left-2 -top-6 text-[80px] font-extralight text-white/[0.03] leading-none">{step.num}</div>
                                <div className="w-11 h-11 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#05D16E] shrink-0 relative z-10">
                                    <step.icon size={20} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white tracking-tight mb-1">{step.title}</h3>
                                    <p className="text-white/50 font-light leading-relaxed text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM CTAs - Adapted for Dark */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center border-t border-white/10 pt-14"
                >
                    {/* Zipcode & Send */}
                    <div className="lg:col-span-5 flex gap-4">
                        <div className={`flex-grow flex items-center bg-white/10 backdrop-blur-sm rounded-full px-6 py-4 border border-white/20 transition-all duration-500 ${isFocused ? 'bg-white/15 border-[#05D16E]/50' : ''}`}>
                            <MapPin size={20} className={isFocused ? 'text-[#05D16E]' : 'text-white/40'} />
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Zipcode"
                                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-white font-medium placeholder:text-white/30 text-lg ml-3"
                            />
                        </div>
                        <button
                            onClick={handleStart}
                            className="bg-white/10 backdrop-blur-sm px-8 rounded-2xl text-white font-bold uppercase tracking-widest text-xs border border-white/20 hover:bg-[#05D16E] hover:border-[#05D16E] hover:text-[#024653] transition-all duration-300"
                        >
                            Send
                        </button>
                    </div>

                    {/* Main CTA */}
                    <div className="lg:col-span-7">
                        <button
                            onClick={() => router.push('/quote')}
                            className="w-full bg-[#05D16E] group text-[#024653] py-4 lg:py-5 rounded-2xl lg:rounded-3xl font-bold uppercase tracking-[0.2em] text-sm lg:text-base flex items-center justify-center gap-4 hover:bg-[#04bd63] transition-all duration-500 hover:shadow-[0_20px_50px_rgba(5,209,110,0.3)] hover:-translate-y-1"
                        >
                            Start Your Transformation <ArrowRight size={20} className="transition-transform group-hover:translate-x-2" />
                        </button>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
