"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProcessSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const steps = [
        {
            num: "01",
            title: "Customize",
            desc: "Select your service type and tell us about your space in 60 seconds."
        },
        {
            num: "02",
            title: "Connect",
            desc: "Get an instant transparent price. No hidden fees, ever."
        },
        {
            num: "03",
            title: "Clean",
            desc: "We arrive on time, equipped, and ready to transform your space."
        }
    ];

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length === 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    return (
        <section className="w-full bg-transparent py-20 lg:py-32 relative overflow-hidden snap-start scroll-mt-[60px]" id="process">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10">

                {/* Section Title - Matching Hero Typography */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 lg:mb-24"
                >
                    <h2 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-normal leading-[1.1] tracking-tight text-[#024653]">
                        How <span className="italic font-light text-[#05D16E]">ECS</span> <br />
                        Works?
                    </h2>
                </motion.div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-16 lg:mb-24">
                    {steps.map((step, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="group bg-white rounded-[2.5rem] p-10 lg:p-12 shadow-[0_15px_45px_rgba(2,70,83,0.04)] border border-white relative overflow-hidden flex flex-col items-center text-center hover:shadow-[0_20px_60px_rgba(2,70,83,0.08)] transition-all duration-500"
                        >
                            {/* Decorative Sparkle */}
                            <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-20 transition-opacity duration-500 text-[#05D16E]">
                                <Sparkles size={24} />
                            </div>

                            {/* Step Number */}
                            <span className="text-6xl lg:text-8xl font-black text-[#024653]/5 mb-8 select-none group-hover:text-[#05D16E]/10 transition-colors duration-500">
                                {step.num}
                            </span>

                            <h3 className="text-2xl lg:text-3xl font-normal text-[#024653] mb-4 tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-base lg:text-lg text-[#024653]/60 font-light leading-relaxed max-w-[260px]">
                                {step.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

                {/* Bottom Action Row - Wireframe Implementation */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-6 items-center"
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
