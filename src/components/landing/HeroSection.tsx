"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();

    return (
        <section className="relative w-full bg-[#F9F8F2] antialiased overflow-hidden pt-24 pb-12 lg:pt-32 lg:pb-24">

            <div className="container mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center">

                {/* Left Content Area (Text) - Spans 5 columns */}
                <div className="lg:col-span-5 space-y-10 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-6xl md:text-7xl xl:text-8xl font-black tracking-tighter text-[#024653] leading-[0.9] flex flex-col">
                            <span>Professional</span>
                            <span className="flex items-center gap-3 italic text-[#024653]">
                                Cleaning
                                <div className="relative inline-flex">
                                    <Sparkles className="text-[#05D16E] w-10 h-10 md:w-14 md:h-14" strokeWidth={2.5} />
                                </div>
                            </span>
                        </h1>

                        <div className="space-y-3 mt-8">
                            <p className="text-2xl md:text-3xl font-bold tracking-tight text-[#05D16E] leading-tight">
                                Your Well-being Demands High Standards.
                            </p>
                            <p className="text-2xl md:text-3xl font-black tracking-tight text-[#024653] leading-tight">
                                Ours is Excellence.
                            </p>
                        </div>

                        <p className="text-lg text-[#024653]/60 font-medium leading-relaxed max-w-md pt-4">
                            We create the ideal conditions in your environment to fulfill our purpose: <span className="text-[#024653] font-bold">Generating Well-being and Efficiency in your spaces.</span>
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => router.push("/quote")}
                        className="group flex items-center gap-4 bg-[#05D16E] text-white pl-8 pr-2 py-2 rounded-full font-black text-lg tracking-wide hover:bg-[#08BF5F] transition-all shadow-xl shadow-[#05D16E]/20 hover:scale-[1.02] active:scale-95"
                    >
                        <span>Book a Call</span>
                        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:rotate-[-45deg] duration-300">
                            <ArrowRight size={20} strokeWidth={3} className="text-white" />
                        </div>
                    </motion.button>
                </div>

                {/* Right Bento Grid Area - Spans 7 columns */}
                <div className="lg:col-span-7 w-full h-full min-h-[600px] lg:h-[700px] relative">
                    <div className="grid grid-cols-3 gap-5 h-full w-full">

                        {/* COLUMN 1 */}
                        <div className="flex flex-col gap-5 pt-8">
                            {/* Image: Woman (Taller) */}
                            <div className="relative w-full flex-[1.4] rounded-[2.5rem] overflow-hidden shadow-lg group">
                                <Image
                                    src="/brand/hero_woman_cleaning.png"
                                    alt="Residential Cleaning"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* Card: Enjoy (Shorter) */}
                            <div className="bg-[#024653] w-full flex-[0.8] rounded-[2.5rem] p-8 flex flex-col justify-center text-white shadow-lg overflow-hidden relative">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-[#05D16E]/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
                                <p className="text-xl md:text-2xl font-bold leading-tight relative z-10">
                                    <span className="text-[#05D16E] italic block mb-1">Enjoy</span>
                                    your home to the fullest.
                                </p>
                            </div>
                        </div>

                        {/* COLUMN 2 */}
                        <div className="flex flex-col gap-5">
                            {/* Card: Productivity (Taller relative to img below) */}
                            <div className="bg-[#024653] w-full flex-1 rounded-[2.5rem] p-8 flex flex-col justify-end text-white shadow-lg overflow-hidden relative">
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#0E6168] rounded-full blur-2xl -ml-10 -mb-10 opacity-50"></div>
                                <p className="text-xl md:text-2xl font-bold leading-tight relative z-10">
                                    A tidy workspace increases your team&apos;s <span className="text-[#05D16E] italic">productivity.</span>
                                </p>
                            </div>
                            {/* Image: Meeting (Medium) */}
                            <div className="relative w-full flex-[1.2] rounded-[2.5rem] overflow-hidden shadow-lg group">
                                <Image
                                    src="/brand/hero_office_meeting.png"
                                    alt="Team Meeting"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                        </div>

                        {/* COLUMN 3 */}
                        <div className="flex flex-col gap-5 pt-12">
                            {/* Image: Industrial (Short/Square) */}
                            <div className="relative w-full flex-[0.8] rounded-[2.5rem] overflow-hidden shadow-lg group">
                                <Image
                                    src="/brand/hero_industrial_cleaner.png"
                                    alt="Industrial Services"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>
                            {/* Card: Compliance (Taller) */}
                            <div className="bg-[#024653] w-full flex-[1.4] rounded-[2.5rem] p-8 flex flex-col justify-center text-white shadow-lg overflow-hidden relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#05D16E]/5 rounded-full blur-xl"></div>
                                <p className="text-lg md:text-xl font-bold leading-tight relative z-10">
                                    <span className="text-[#05D16E] block mb-2 text-2xl">Ensure</span>
                                    your company&apos;s regulatory compliance.
                                </p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* Minimal decorative blur for depth */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
                <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#05D16E]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#024653]/5 rounded-full blur-[120px]" />
            </div>
        </section>
    );
}
