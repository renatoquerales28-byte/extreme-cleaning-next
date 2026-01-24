"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ArrowRight, MapPin, Star, ShieldCheck, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function HeroSection() {
    const router = useRouter();
    const [zip, setZip] = useState("");

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault();
        if (zip.length === 5) {
            router.push(`/quote?zip=${zip}`);
        }
    };

    return (
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-ecs-paramount">
            {/* Background Image with Parallax-like feel */}
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0">
                <Image
                    src="/brand/hero-bg.png"
                    alt="Pristine Luxury Interior"
                    fill
                    className="object-cover object-center brightness-[0.95]"
                    priority
                />
                {/* Subtle fade to blend image with porcelain background */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-ecs-paramount/50 to-ecs-paramount z-10" />
            </div>

            <div className="container relative z-20 px-4 mx-auto grid md:grid-cols-2 gap-12 items-center h-full pt-20">
                {/* Left Content Area */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8 text-left max-w-xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full w-fit shadow-sm">
                        <span className="w-2 h-2 bg-ecs-accent rounded-full animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-ecs-brand-dark uppercase">Serving Spokane & Surrounding Areas</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-ecs-brand-dark leading-[0.9]">
                        Clean Spaces, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-ecs-brand-light to-ecs-accent">Clear Minds.</span>
                    </h1>

                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                        Top-tier professionalism, attention to detail, and reliable results. We specialize in delivering a spotless, sanitized environment for your home or business.
                    </p>

                    {/* Zip Code CTA */}
                    <form onSubmit={handleStart} className="w-full max-w-sm relative group mt-2">
                        {/* Removed fuzzy glow for cleaner look */}
                        <div className="relative flex items-center bg-white rounded-2xl shadow-lg border border-slate-100 p-1.5 pl-6 w-full h-16 transition-shadow hover:shadow-xl">
                            <MapPin className="text-slate-400 shrink-0" size={20} />
                            <input
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="Enter Zip Code"
                                maxLength={5}
                                className="flex-1 bg-transparent border-none outline-none px-4 text-ecs-brand-dark font-bold placeholder:text-slate-300 h-full w-full min-w-0"
                            />
                            <button
                                type="submit"
                                disabled={zip.length !== 5}
                                className="bg-ecs-brand-dark text-white h-full px-6 rounded-xl font-bold text-xs md:text-sm tracking-wide uppercase hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                            >
                                <span className="hidden md:inline">Get Estimate</span>
                                <span className="md:hidden">Go</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>

                    {/* Returning Client Link */}
                    <div className="pl-6">
                        <button
                            onClick={() => router.push("/quote?mode=returning")}
                            className="text-xs font-bold text-slate-400 hover:text-ecs-brand-dark transition-colors flex items-center gap-2"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-ecs-accent"></span>
                            Already an ECS Client? <span className="underline decoration-slate-300 underline-offset-4 cursor-pointer">Log in here</span>
                        </button>
                    </div>

                    {/* Trust Anchors */}
                    <div className="flex items-center gap-8 pt-8 border-t border-ecs-brand-dark/5 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden">
                                        <div className={`w-full h-full bg-slate-300`}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex text-amber-400 gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                                <span className="text-[10px] font-bold text-slate-400 tracking-wide">500+ Happy Neighbors</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-slate-200" />
                        <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300">
                            <ShieldCheck size={24} className="text-ecs-brand-dark" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-tight">Licensed & <br /> Insured</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
