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
        <section className="relative w-full h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#F9F8F2]">
            {/* Background Image with subtle parallax */}
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 opacity-90 transition-opacity duration-1000">
                <Image
                    src="/brand/hero-bg.png"
                    alt="Pristine Luxury Interior"
                    fill
                    className="object-cover object-center"
                    priority
                />
                {/* Smooth blend to porcelain background */}
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F9F8F2]/40 to-[#F9F8F2] z-10" />
            </div>

            <div className="container relative z-20 px-4 mx-auto grid md:grid-cols-2 gap-12 items-center h-full pt-20">
                {/* Left Content Area */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8 text-left max-w-xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-white/60 rounded-full w-fit shadow-sm">
                        <span className="w-2 h-2 bg-[#05D16E] rounded-full animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-[#024653] uppercase">Serving Spokane & Surrounding Areas</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-[#024653] leading-[0.95]">
                        Clean Spaces, <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0E6168] to-[#05D16E]">Clear Minds.</span>
                    </h1>

                    <p className="text-lg text-[#024653]/70 font-medium leading-relaxed max-w-md">
                        Top-tier professionalism, attention to detail, and reliable results. We deliver a spotless, sanitized environment for your home or business.
                    </p>

                    {/* Zip Code CTA */}
                    <form onSubmit={handleStart} className="w-full max-w-sm relative group mt-2">
                        <div className="relative flex items-center bg-white rounded-3xl shadow-xl shadow-[#024653]/5 border-2 border-white p-1.5 pl-6 w-full h-16 transition-all hover:shadow-[#024653]/10">
                            <MapPin className="text-[#0E6168]/40 shrink-0" size={20} />
                            <input
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="Enter Zip Code"
                                maxLength={5}
                                className="flex-1 bg-transparent border-none outline-none px-4 text-[#024653] font-extrabold placeholder:text-slate-300 h-full w-full min-w-0"
                            />
                            <button
                                type="submit"
                                disabled={zip.length !== 5}
                                className="bg-[#024653] text-white h-full px-6 rounded-2xl font-black text-xs md:text-sm tracking-widest uppercase hover:bg-[#0E6168] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shrink-0"
                            >
                                <span className="hidden md:inline">Request Quote</span>
                                <span className="md:hidden">Go</span>
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>

                    {/* Returning Client Link */}
                    <div className="pl-6">
                        <button
                            onClick={() => router.push("/quote?mode=returning")}
                            className="text-[11px] font-black text-[#0E6168]/60 hover:text-[#05D16E] transition-colors flex items-center gap-2 uppercase tracking-widest"
                        >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#05D16E]"></span>
                            Already an ECS Client? <span className="underline decoration-[#0E6168]/20 underline-offset-4 cursor-pointer hover:decoration-[#05D16E]">Log in here</span>
                        </button>
                    </div>

                    {/* Trust Anchors */}
                    <div className="flex items-center gap-8 pt-8 border-t border-[#024653]/5 mt-4">
                        <div className="flex items-center gap-2">
                            <div className="flex -space-x-2">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-8 h-8 rounded-full bg-white border-2 border-[#F9F8F2] flex items-center justify-center text-[10px] font-bold text-slate-500 overflow-hidden shadow-sm">
                                        <div className={`w-full h-full bg-[#EAE8DF]`}></div>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col">
                                <div className="flex text-[#05D16E] gap-0.5"><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /><Star size={10} fill="currentColor" /></div>
                                <span className="text-[10px] font-black text-[#024653]/40 tracking-widest uppercase">500+ Happy Neighbors</span>
                            </div>
                        </div>
                        <div className="h-8 w-px bg-[#024653]/10" />
                        <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-300 group">
                            <ShieldCheck size={24} className="text-[#024653] group-hover:text-[#05D16E]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]/60 leading-tight">Licensed & <br /> Insured</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
