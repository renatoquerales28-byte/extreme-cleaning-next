"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();

    return (
        <section className="relative w-full antialiased overflow-hidden pt-28 pb-10 lg:pt-32 lg:pb-16 flex flex-col justify-center min-h-[90vh]">

            <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-8 lg:gap-12 items-center h-full">

                {/* Left Content Area (Text) - Spans 5 columns */}
                <div className="lg:col-span-5 space-y-10 relative z-10 flex flex-col justify-center">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter text-[#024653] leading-[0.9] flex flex-col">
                            <span>Professional</span>
                            <span className="flex items-center gap-4 italic text-[#024653]">
                                Cleaning
                                <div className="relative inline-flex mb-2">
                                    <Sparkles className="text-[#05D16E] w-10 h-10 md:w-14 md:h-14" strokeWidth={2.5} />
                                </div>
                            </span>
                        </h1>

                        <div className="max-w-md pt-2">
                            <p className="text-2xl md:text-3xl font-medium tracking-tight text-[#024653]/80 leading-snug">
                                Your Well-being Demands High Standards. <span className="font-bold text-[#024653] block mt-1">Ours is Excellence.</span>
                            </p>
                            <p className="text-base text-[#024653]/60 font-medium leading-relaxed mt-6">
                                We create the ideal conditions in your environment to fulfill our purpose: <span className="text-[#024653] font-bold">Generating Well-being and Efficiency in your spaces.</span>
                            </p>
                        </div>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => router.push("/quote")}
                        className="w-fit group flex items-center gap-4 bg-[#05D16E] text-white pl-10 pr-3 py-3 rounded-full font-black text-lg tracking-wide hover:bg-[#08BF5F] transition-all shadow-xl shadow-[#05D16E]/20 hover:scale-[1.02] active:scale-95"
                    >
                        <span>Book a Call</span>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:rotate-[-45deg] duration-300">
                            <ArrowRight size={20} strokeWidth={3} className="text-white" />
                        </div>
                    </motion.button>
                </div>

                {/* Right Area - Single Hero Image */}
                <div className="lg:col-span-7 h-[500px] lg:h-[700px] relative mt-8 lg:mt-0">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative w-full h-full rounded-[3rem] overflow-hidden shadow-2xl shadow-[#024653]/10"
                    >
                        <Image
                            src="/brand/hero_woman_cleaning.png"
                            alt="Professional Cleaning"
                            fill
                            className="object-cover object-top"
                            priority
                        />

                        {/* Subtle Gradient Overlay */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[#024653]/20 to-transparent mix-blend-multiply" />
                    </motion.div>

                    {/* Checkmark Floating Badge */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.8 }}
                        className="absolute bottom-10 left-10 bg-white/90 backdrop-blur-xl p-6 rounded-[2rem] shadow-xl max-w-xs border border-white/50 hidden md:block"
                    >
                        <p className="text-[#024653] font-bold text-lg leading-tight mb-2">
                            Ready for <span className="text-[#05D16E]">Perfection?</span>
                        </p>
                        <p className="text-[#024653]/60 text-sm font-medium">Join 500+ satisfied clients in Spokane.</p>
                    </motion.div>
                </div>
            </div>

            {/* Minimal decorative blur for depth */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[400px] h-[400px] bg-[#05D16E]/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-[#024653]/5 rounded-full blur-[100px]" />
            </div>
        </section>
    );
}
