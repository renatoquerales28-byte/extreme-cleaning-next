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
            {/* Background Image with Parallax-like feel */}
            <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0">
                <Image
                    src="/brand/hero-bg.png"
                    alt="Pristine Luxury Interior"
                    fill
                    className="object-cover object-center brightness-[0.95]"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-[#F9F8F2]/50 to-[#F9F8F2] z-10" />
            </div>

            <div className="container relative z-20 px-4 mx-auto grid md:grid-cols-2 gap-12 items-center h-full pt-20">
                {/* Left Content Area */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col gap-8 text-left max-w-xl"
                >
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-brand-dark/10 rounded-full w-fit">
                        <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black tracking-[0.2em] text-brand-dark uppercase">Available in Spokane, WA</span>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-brand-dark leading-[0.9]">
                        Experience the <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-light to-accent">Luxury of Clean.</span>
                    </h1>

                    <p className="text-lg text-slate-500 font-medium leading-relaxed max-w-md">
                        Reclaim your time and sanity. We provide premium, reliable cleaning services for homes and businesses that demand perfection.
                    </p>

                    {/* Zip Code CTA */}
                    <form onSubmit={handleStart} className="w-full max-w-sm relative group mt-2">
                        <div className="absolute -inset-1 bg-gradient-to-r from-brand-light to-accent rounded-full blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                        <div className="relative flex items-center bg-white rounded-full p-2 shadow-xl border border-slate-100">
                            <MapPin className="ml-4 text-slate-400" size={20} />
                            <input
                                type="text"
                                value={zip}
                                onChange={(e) => setZip(e.target.value)}
                                placeholder="Enter Zip Code"
                                maxLength={5}
                                className="flex-1 bg-transparent border-none outline-none px-4 text-brand-dark font-bold placeholder:text-slate-300"
                            />
                            <button
                                type="submit"
                                disabled={zip.length !== 5}
                                className="bg-brand-dark text-white px-6 py-3 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                Get Estimate <ArrowRight size={16} />
                            </button>
                        </div>
                    </form>

                    {/* Trust Anchors */}
                    <div className="flex items-center gap-8 pt-8 border-t border-brand-dark/5 mt-4">
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
                            <ShieldCheck size={24} className="text-brand-dark" />
                            <span className="text-[10px] font-black uppercase tracking-wider text-slate-400 leading-tight">Licensed & <br /> Insured</span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
