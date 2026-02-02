"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles, ClipboardList, CircleDollarSign } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProcessSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const steps = [
        {
            num: "1",
            title: "Customize",
            desc: "Select your service type and tell us about your space in 60 seconds.",
            icon: <ClipboardList size={22} />,
            position: "bottom" // Content relative to node
        },
        {
            num: "2",
            title: "Connect",
            desc: "Get an instant transparent price. No hidden fees, ever.",
            icon: <CircleDollarSign size={22} />,
            position: "top"
        },
        {
            num: "3",
            title: "Clean",
            desc: "We arrive on time, equipped, and ready to transform your space.",
            icon: <Sparkles size={22} />,
            position: "bottom"
        }
    ];

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length === 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section className="w-full bg-transparent py-24 lg:py-32 relative overflow-hidden" id="process">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10">

                {/* Section Title - Hero Style */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-24 text-center lg:text-left"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.1] tracking-tight text-[#024653]">
                        How <span className="italic font-light text-[#05D16E]">ECS</span> <br className="hidden lg:block" />
                        Works?
                    </h2>
                </motion.div>

                {/* VISUAL PROCESS FLOW - Wavy Line & Floating Steps */}
                <div className="relative min-h-[600px] mb-24 lg:mb-32">

                    {/* The Connecting Wave - Solid Smooth Path */}
                    <div className="absolute inset-0 hidden lg:block overflow-visible pointer-events-none">
                        <svg width="100%" height="100%" viewBox="0 0 1200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
                            <motion.path
                                d="M0 280C100 280 150 280 200 280C350 280 450 100 600 100C750 100 850 250 1000 250C1050 250 1150 200 1200 200"
                                stroke="#085560"
                                strokeWidth="3"
                                strokeLinecap="round"
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 0.4 }}
                                viewport={{ once: true }}
                                transition={{ duration: 2.5, ease: "easeInOut" }}
                            />
                        </svg>
                    </div>

                    {/* Step Nodes & Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-32 lg:gap-0 w-full relative z-10 pt-20">

                        {/* STEP 1: Content ABOVE the line */}
                        <div className="relative flex flex-col items-center lg:items-start lg:pl-20">
                            {/* Text Group */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="relative z-10 mb-12 lg:mb-32"
                            >
                                <div className="absolute -right-12 -top-12 text-[140px] font-thin text-[#024653]/5 leading-none select-none">1</div>
                                <h3 className="text-2xl lg:text-3xl font-normal text-[#024653] tracking-tight italic mb-3">General concept</h3>
                                <p className="text-[#024653]/60 font-light leading-relaxed text-sm lg:text-base max-w-[240px]">Select your service type and tell us about your space in 60 seconds.</p>
                            </motion.div>

                            {/* Hex Node */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="relative lg:ml-[-10px]"
                            >
                                <div
                                    className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-[#085560] relative z-20 hover:scale-110 transition-all duration-300"
                                >
                                    <ClipboardList size={22} />
                                </div>
                            </motion.div>
                        </div>

                        {/* STEP 2: Content BELOW the line (Peak Node) */}
                        <div className="relative flex flex-col items-center">
                            {/* Hex Node (On Peak) */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.8 }}
                                className="mb-12 lg:mb-20 lg:-translate-y-[100px]"
                            >
                                <div
                                    className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-[#085560] relative z-20 hover:scale-110 transition-all duration-300"
                                >
                                    <CircleDollarSign size={22} />
                                </div>
                            </motion.div>

                            {/* Text Group */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1 }}
                                className="relative z-10 lg:-translate-y-[40px]"
                            >
                                <div className="absolute -right-16 -top-8 text-[140px] font-thin text-[#024653]/5 leading-none select-none">2</div>
                                <h3 className="text-2xl lg:text-3xl font-normal text-[#024653] tracking-tight italic mb-3">Post product</h3>
                                <p className="text-[#024653]/60 font-light leading-relaxed text-sm lg:text-base max-w-[240px] text-center">Get an instant transparent price. No hidden fees, ever.</p>
                            </motion.div>
                        </div>

                        {/* STEP 3: Content BELOW the line */}
                        <div className="relative flex flex-col items-center lg:items-end lg:pr-20">
                            {/* Hex Node */}
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.1 }}
                                className="mb-12 lg:mb-20 lg:translate-x-[-40px] lg:translate-y-[45px]"
                            >
                                <div
                                    className="w-14 h-14 bg-white shadow-lg rounded-2xl flex items-center justify-center text-[#085560] relative z-20 hover:scale-110 transition-all duration-300"
                                >
                                    <Sparkles size={22} />
                                </div>
                            </motion.div>

                            {/* Text Group */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 1.3 }}
                                className="relative z-10 lg:translate-y-[80px]"
                            >
                                <div className="absolute -right-8 -top-8 text-[140px] font-thin text-[#024653]/5 leading-none select-none">3</div>
                                <h3 className="text-2xl lg:text-3xl font-normal text-[#024653] tracking-tight italic mb-3">Design process</h3>
                                <p className="text-[#024653]/60 font-light leading-relaxed text-sm lg:text-base max-w-[240px] text-right">We arrive on time, equipped, and ready to transform your space.</p>
                            </motion.div>
                        </div>

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

            {/* Background Ambient Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#05D16E]/5 rounded-full blur-[120px] pointer-events-none z-0" />
        </section>
    );
}
