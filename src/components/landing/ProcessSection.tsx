"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

import ZipCodeInput from "./ZipCodeInput";

interface ProcessSectionProps {
    onOpenWizard?: (zip: string) => void;
}

export default function ProcessSection({ onOpenWizard }: ProcessSectionProps) {
    const router = useRouter();

    const steps = [
        {
            num: "01",
            title: "Share Your Space Details",
            desc: "Tell us about your property and the type of service you need in under 60 seconds."
        },
        {
            num: "02",
            title: "Coordination & Site Visit",
            desc: "We will call you to schedule a technical visit. We evaluate your space in person to provide an exact quote based on your specific requirements."
        },
        {
            num: "03",
            title: "Enjoy Your Clean Space",
            desc: "Our expert team arrives on time to transform your environment and bring it to absolute perfection."
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
                        Our process is designed for precision and absolute clarity. From high-end residential first cleanings to specialized post-construction projects, we ensure every detail is tailored to your environment through an expert on-site evaluation.
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

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col items-center w-full"
                >
                    <ZipCodeInput variant="process" className="max-w-2xl" onSuccess={onOpenWizard} />
                </motion.div>
            </div>
        </section>
    );
}
