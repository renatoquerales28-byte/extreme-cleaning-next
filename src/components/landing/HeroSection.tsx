"use client";

import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();

    return (
        <section className="relative w-full bg-[#F9F8F2] antialiased overflow-hidden">
            {/* Header / Navbar */}
            <nav className="container mx-auto px-6 py-8 flex items-center justify-between relative z-50">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-[#024653] rounded-xl flex items-center justify-center">
                        <span className="text-white font-black text-xl">E</span>
                    </div>
                    <span className="text-2xl font-black tracking-tighter text-[#024653]">ECS</span>
                </div>

                <div className="hidden md:flex items-center gap-10">
                    {["Home", "Services", "About Us", "Contact"].map((item) => (
                        <a
                            key={item}
                            href="#"
                            className="text-[#024653]/60 hover:text-[#024653] font-bold text-sm transition-colors"
                        >
                            {item}
                        </a>
                    ))}
                </div>

                <button
                    onClick={() => router.push("/quote")}
                    className="bg-[#024653] text-white px-8 py-3 rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#085560] transition-all shadow-lg shadow-[#024653]/10"
                >
                    Hire Service
                </button>
            </nav>

            <div className="container mx-auto px-6 pt-12 pb-24 grid lg:grid-cols-12 gap-16 items-center">

                {/* Left Content Area */}
                <div className="lg:col-span-5 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h1 className="text-7xl md:text-8xl font-black tracking-tighter text-[#024653] leading-[0.85] flex flex-col">
                            <span>Professional</span>
                            <span className="flex items-center gap-4 italic underline decoration-[#05D16E] decoration-8 underline-offset-8">
                                Cleaning
                                <Sparkles className="text-[#05D16E] w-12 h-12 inline-block" strokeWidth={3} />
                            </span>
                        </h1>

                        <div className="space-y-2 mt-12">
                            <p className="text-3xl font-bold tracking-tight text-[#05D16E] leading-tight max-w-md">
                                Your Well-being Demands High Standards.
                            </p>
                            <p className="text-3xl font-black tracking-tight text-[#024653] leading-tight">
                                Ours is Excellence.
                            </p>
                        </div>

                        <p className="text-lg text-[#024653]/50 font-medium leading-relaxed max-w-sm">
                            We create the ideal conditions in your environment to fulfill our purpose: <span className="text-[#024653] font-bold">Generating Well-being and Efficiency in your spaces.</span>
                        </p>
                    </motion.div>

                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        onClick={() => router.push("/quote")}
                        className="group flex items-center gap-4 bg-[#05D16E] text-white px-10 py-6 rounded-full font-black text-lg tracking-tight hover:bg-[#08BF5F] transition-all shadow-2xl shadow-[#05D16E]/30"
                    >
                        Book a Call
                        <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center transition-transform group-hover:translate-x-2">
                            <ArrowRight size={24} strokeWidth={3} />
                        </div>
                    </motion.button>
                </div>

                {/* Right Bento Grid Area */}
                <div className="lg:col-span-7 h-full w-full">
                    <div className="grid grid-cols-12 grid-rows-6 gap-4 h-[700px]">

                        {/* 1. Large Portrait (Top Left) */}
                        <div className="col-span-4 row-span-4 relative rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/brand/hero_woman_cleaning.png"
                                alt="Residential Cleaning"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* 2. Text Card Teal (Top Center) */}
                        <div className="col-span-4 row-span-3 bg-[#024653] rounded-[3rem] p-10 flex flex-col justify-end gap-2 text-white shadow-xl">
                            <p className="text-2xl font-bold leading-tight">A tidy workspace increases your team's <span className="text-[#05D16E] italic">productivity.</span></p>
                        </div>

                        {/* 3. Small Square (Top Right) */}
                        <div className="col-span-4 row-span-2 relative rounded-[3rem] overflow-hidden shadow-xl">
                            <Image
                                src="/brand/hero_industrial_cleaner.png"
                                alt="Industrial Services"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* 4. Small Green Card (Center Right) */}
                        <div className="col-span-4 row-span-4 relative rounded-[3rem] overflow-hidden shadow-2xl">
                            <Image
                                src="/brand/hero_office_meeting.png"
                                alt="Team Meeting"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* 5. Medium Card (Bottom Left) */}
                        <div className="col-span-4 row-span-2 bg-[#024653] rounded-[3rem] p-10 flex flex-col justify-center gap-2 text-white shadow-xl">
                            <p className="text-2xl font-bold leading-tight"><span className="text-[#05D16E] italic">Enjoy</span> your home to the fullest.</p>
                        </div>

                        {/* 6. Text Card Bottom Right */}
                        <div className="col-span-4 row-span-1 bg-[#024653] rounded-[3rem] p-8 flex flex-col justify-center text-white shadow-xl">
                            <p className="text-lg font-bold leading-tight"><span className="text-[#05D16E]">Ensure</span> your company's regulatory compliance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
