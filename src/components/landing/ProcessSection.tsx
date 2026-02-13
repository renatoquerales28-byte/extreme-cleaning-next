"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin, ClipboardList, Banknote, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProcessSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const steps = [
        {
            num: "01",
            title: "Share Your Space Details",
            desc: "Tell us about your property in 60 seconds. Select your service type and specific needs."
        },
        {
            num: "02",
            title: "Get Instant Pricing",
            desc: "Receive a transparent, upfront quote immediately. No hidden fees, no surprises."
        },
        {
            num: "03",
            title: "Enjoy Your Clean Space",
            desc: "Our expert team arrives on time and transforms your space to absolute perfection."
        }
    ];

    return (
        <section
            className="w-full bg-transparent h-auto lg:h-[100svh] lg:max-h-[1000px] flex flex-col justify-center pt-0 pb-[140px] lg:py-10 relative lg:-translate-y-[30px] snap-start scroll-mt-[130px]"
            id="process"
        >
            {/* =========================================
                MOBILE LAYOUT (lg:hidden)
               ========================================= */}
            <div className="lg:hidden w-full px-8 flex flex-col relative">

                {/* 1. Minimalist Header */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mb-14"
                >
                    <h2 className="text-[32px] font-normal leading-none text-[#024653] tracking-tight whitespace-nowrap">
                        Process & <span className="font-bold">Simplicity</span>
                    </h2>
                    <div className="w-10 h-[1.5px] bg-[#024653] mt-4 rounded-full opacity-80" />
                </motion.div>

                {/* 2. Timeline Flow (Inspired by Reference Image) */}
                <div className="flex flex-col relative ml-1">
                    {/* Vertical Simple Line */}
                    <div className="absolute left-[4px] top-2 bottom-2 w-[1.5px] bg-[#024653]/10 z-0" />

                    <div className="flex flex-col gap-12">
                        {steps.map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                className="flex gap-8 relative z-10 items-start"
                            >
                                {/* Dot on the line */}
                                <div className="mt-1.5 shrink-0">
                                    <div className="w-[10px] h-[10px] rounded-full bg-[#024653]/30 border-2 border-[#F9F8F2] shadow-sm" />
                                </div>

                                {/* Content Block */}
                                <div className="flex flex-col -mt-1">
                                    <div className="flex items-baseline gap-4 mb-2">
                                        <span className="text-[17px] font-bold text-[#024653]/30 tabular-nums">
                                            {step.num}
                                        </span>
                                        <h3 className="text-[18px] font-bold text-[#024653] tracking-tight">
                                            {step.title}
                                        </h3>
                                    </div>
                                    <p className="text-[14px] text-[#024653]/60 font-light leading-relaxed max-w-[280px]">
                                        {step.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>


            </div>

            {/* =========================================
                DESKTOP LAYOUT (hidden lg:flex)
               ========================================= */}
            <div className="hidden lg:flex flex-col items-center w-full max-w-[1000px] mx-auto px-8 lg:-translate-y-[30px]">
                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl xl:text-5xl font-normal leading-[1.15] tracking-tight text-[#024653] mb-5">
                        <span className="font-bold">Simplicity</span> Redefined.
                    </h2>
                    <p className="text-[#024653]/60 font-light text-base max-w-xl mx-auto leading-relaxed">
                        We specialize in providing top-tier cleaning solutions tailored to your needs. Our expertise spans
                        residential deep cleaning, commercial maintenance, and specialized post-construction services.
                    </p>
                </motion.div>

                {/* Steps Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-3 gap-10 mb-12 w-full"
                >
                    {steps.map((step, i) => (
                        <div key={i} className="text-center">
                            <div className="text-4xl font-semibold text-[#024653] mb-3">{step.num}</div>
                            <h3 className="text-xl font-bold text-[#024653] tracking-tight mb-4 whitespace-pre-line leading-tight">{step.title}</h3>
                            <div className="w-10 h-px bg-[#024653]/10 mb-4 mx-auto" />
                            <p className="text-[#024653]/60 font-light text-sm leading-relaxed">{step.desc}</p>
                        </div>
                    ))}
                </motion.div>

                {/* CTAs Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex justify-center w-full"
                >
                    <form
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (zipCode.length === 5) {
                                router.push(`/quote?zip=${zipCode}`);
                            } else {
                                router.push('/quote');
                            }
                        }}
                        className="flex gap-3 justify-center items-center w-full max-w-2xl"
                    >
                        <div className={`flex items-center bg-white rounded-full px-4 py-3 shadow-[0_4px_20px_rgba(2,70,83,0.06)] border transition-all duration-300 sm:min-w-[200px] ${isFocused ? 'border-[#05D16E]/40 shadow-[0_4px_25px_rgba(5,209,110,0.1)]' : 'border-gray-100'}`}>
                            <MapPin size={16} className={isFocused ? 'text-[#05D16E]' : 'text-[#024653]/30'} />
                            <input
                                type="text"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                                onFocus={() => setIsFocused(true)}
                                onBlur={() => setIsFocused(false)}
                                placeholder="Enter Zipcode"
                                className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-sm ml-2 w-full"
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#024653] group text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#02333d] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(2,70,83,0.2)] whitespace-nowrap"
                        >
                            Get Your Free Quote
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>
                </motion.div>
            </div>
        </section>
    );
}
