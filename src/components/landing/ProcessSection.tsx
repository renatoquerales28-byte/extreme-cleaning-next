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
        <section className="w-full bg-transparent py-20 lg:py-28 relative overflow-hidden" id="process">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10">

                {/* Section Title */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 lg:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#024653]">
                        From Chaos to <br />
                        <span className="font-bold text-[#05D16E]">Calm</span> in 3 Steps.
                    </h2>
                </motion.div>

                {/* VISUAL PROCESS FLOW - Pixel Perfect Replica */}
                <div className="relative h-[450px] lg:h-[380px] mb-20 lg:mb-28">

                    {/* SVG Container - Full Width */}
                    <div className="absolute inset-0 hidden lg:block">
                        <svg
                            width="100%"
                            height="100%"
                            viewBox="0 0 1200 380"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-full h-full"
                            preserveAspectRatio="xMidYMid meet"
                        >
                            {/* The S-Curve - Dramatic Rise and Fall */}
                            <motion.path
                                d="M-20 320 C80 320, 120 320, 180 310 C240 300, 280 280, 340 220 C400 160, 450 60, 600 60 C750 60, 800 160, 860 220 C920 280, 1000 320, 1100 320 L1220 320"
                                stroke="#05D16E"
                                strokeWidth="3"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />

                            {/* Node 1 - On the line at x=180, y=310 */}
                            <motion.g
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8, duration: 0.4 }}
                            >
                                <rect x="156" y="286" width="48" height="48" rx="12" fill="white" filter="url(#shadow1)" />
                                <g transform="translate(168, 298)">
                                    <ClipboardList size={24} color="#085560" />
                                </g>
                            </motion.g>

                            {/* Node 2 - On the line at x=600, y=60 (PEAK) */}
                            <motion.g
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.2, duration: 0.4 }}
                            >
                                <rect x="576" y="36" width="48" height="48" rx="12" fill="white" filter="url(#shadow1)" />
                                <g transform="translate(588, 48)">
                                    <CircleDollarSign size={24} color="#085560" />
                                </g>
                            </motion.g>

                            {/* Node 3 - On the line at x=1020, y=320 */}
                            <motion.g
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.6, duration: 0.4 }}
                            >
                                <rect x="996" y="296" width="48" height="48" rx="12" fill="white" filter="url(#shadow1)" />
                                <g transform="translate(1008, 308)">
                                    <Sparkles size={24} color="#085560" />
                                </g>
                            </motion.g>

                            {/* Shadow Filter */}
                            <defs>
                                <filter id="shadow1" x="-20%" y="-20%" width="140%" height="140%">
                                    <feDropShadow dx="0" dy="4" stdDeviation="8" floodOpacity="0.1" />
                                </filter>
                            </defs>
                        </svg>
                    </div>

                    {/* Ghost Numbers - Large and Prominent */}
                    <div className="absolute inset-0 hidden lg:block pointer-events-none select-none">
                        {/* Number 1 */}
                        <div className="absolute left-[8%] top-[15%] text-[200px] font-extralight text-[#024653]/[0.04] leading-none">
                            1
                        </div>
                        {/* Number 2 */}
                        <div className="absolute left-[45%] -top-[5%] text-[200px] font-extralight text-[#024653]/[0.04] leading-none">
                            2
                        </div>
                        {/* Number 3 */}
                        <div className="absolute right-[5%] top-[10%] text-[200px] font-extralight text-[#024653]/[0.04] leading-none">
                            3
                        </div>
                    </div>

                    {/* Text Labels - Positioned Precisely */}
                    <div className="absolute inset-0 hidden lg:block">
                        {/* Step 1 Text - Below Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="absolute left-[10%] bottom-[2%] text-left"
                        >
                            <h3 className="text-xl font-semibold text-[#024653] tracking-tight mb-1 underline underline-offset-4 decoration-1">General concept</h3>
                            <p className="text-[#024653]/60 font-light leading-relaxed text-sm max-w-[180px]">Select your service type and tell us about your space in 60 seconds.</p>
                        </motion.div>

                        {/* Step 2 Text - Below Node (Peak) */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.4, duration: 0.5 }}
                            className="absolute left-[50%] -translate-x-1/2 top-[30%] text-center"
                        >
                            <h3 className="text-xl font-semibold text-[#024653] tracking-tight mb-1">Post product</h3>
                            <p className="text-[#024653]/60 font-light leading-relaxed text-sm max-w-[180px]">Get an instant transparent price. No hidden fees, ever.</p>
                        </motion.div>

                        {/* Step 3 Text - Above Node */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 1.8, duration: 0.5 }}
                            className="absolute right-[5%] top-[25%] text-right"
                        >
                            <h3 className="text-xl font-semibold text-[#024653] tracking-tight mb-1 underline underline-offset-4 decoration-1">Design process</h3>
                            <p className="text-[#024653]/60 font-light leading-relaxed text-sm max-w-[180px] ml-auto">We arrive on time, equipped, and ready to transform your space.</p>
                        </motion.div>
                    </div>

                    {/* Mobile Layout */}
                    <div className="flex flex-col gap-16 lg:hidden">
                        {[
                            { icon: ClipboardList, title: "General concept", desc: "Select your service type and tell us about your space in 60 seconds.", num: "1" },
                            { icon: CircleDollarSign, title: "Post product", desc: "Get an instant transparent price. No hidden fees, ever.", num: "2" },
                            { icon: Sparkles, title: "Design process", desc: "We arrive on time, equipped, and ready to transform your space.", num: "3" }
                        ].map((step, i) => (
                            <div key={i} className="relative flex items-start gap-6">
                                <div className="absolute -left-4 -top-8 text-[100px] font-extralight text-[#024653]/[0.04] leading-none">{step.num}</div>
                                <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center text-[#085560] shrink-0 relative z-10">
                                    <step.icon size={22} />
                                </div>
                                <div>
                                    <h3 className="text-xl font-semibold text-[#024653] tracking-tight mb-1">{step.title}</h3>
                                    <p className="text-[#024653]/60 font-light leading-relaxed text-sm">{step.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* BOTTOM CTAs */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center border-t border-[#024653]/5 pt-16"
                >
                    {/* Zipcode & Send */}
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

                    {/* Main CTA */}
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
