"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import { motion } from "framer-motion";

export default function FooterSection() {
    return (
        <footer className="w-full bg-[#F9F8F2] text-[#024653] lg:h-screen min-h-[900px] flex flex-col justify-center relative z-10 pt-[80px] pb-10 overflow-hidden">
            <div className="max-w-[1700px] w-full mx-auto px-6 lg:px-10 flex flex-col justify-between h-[85%] lg:h-[80%]">

                {/* --- TOP SECTION: Newsletter & Brand --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">

                    {/* Left: Newsletter */}
                    <div className="space-y-8 max-w-xl">
                        <h2 className="text-4xl lg:text-6xl font-light leading-tight tracking-tight">
                            ECS Excellence in <br />
                            your mailbox
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-widest text-[#024653]/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E]" />
                                Email address
                            </div>
                            <div className="relative group w-full max-w-[380px]">
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-white border border-[#024653]/10 px-6 py-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all font-normal text-[#024653]"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-8 bg-black text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#024653] transition-all">
                                    SEND
                                </button>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer group pt-1">
                                <input type="checkbox" className="w-4 h-4 rounded border-[#024653]/10 accent-[#024653]" />
                                <span className="text-[10px] font-normal text-[#024653]/40 group-hover:text-[#024653]/60 transition-colors">
                                    I agree to the <Link href="/privacy" className="underline underline-offset-2">privacy statement</Link>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Right: Brand Block */}
                    <div className="flex flex-col items-start lg:items-end lg:text-right space-y-1">
                        <div className="relative h-14 w-44 md:w-56 overflow-hidden">
                            <Image
                                src="/brand/logo-full.png"
                                alt="ECS Logo"
                                fill
                                className="object-contain object-left lg:object-right"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(464%) hue-rotate(142deg) brightness(91%) contrast(97%)'
                                }}
                            />
                        </div>
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#024653] leading-tight opacity-30 pt-2">
                            PREMIUM <br /> CLEANING <br /> AGENCY
                        </p>
                    </div>
                </div>

                {/* --- MANTRA / SOCIAL PROOF INTEGRATION --- */}
                <div className="w-full py-12 lg:py-16">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                        {/* Title for the reviews */}
                        <div className="shrink-0">
                            <h3 className="text-xl md:text-2xl font-light text-[#024653]">
                                What our <br /> <span className="font-black">Clients Say.</span>
                            </h3>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="flex text-[#F4B400]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={12} fill="currentColor" />)}
                                </div>
                                <span className="text-[10px] font-medium text-[#024653]/40 uppercase tracking-widest">5.0 ON GOOGLE</span>
                            </div>
                        </div>

                        {/* Scrolling Marquee */}
                        <div className="flex-1 relative overflow-hidden">
                            <motion.div
                                className="flex gap-6"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 40
                                }}
                                style={{ width: "max-content" }}
                            >
                                {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                    <div
                                        key={i}
                                        className="bg-white/50 backdrop-blur-sm p-6 rounded-2xl border border-[#024653]/5 w-[280px] shrink-0 space-y-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#024653] text-white flex items-center justify-center text-[10px] font-bold">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="text-xs font-bold text-[#024653]">{review.name}</h4>
                                                <div className="flex text-[#F4B400]">
                                                    {[1, 2, 3, 4, 5].map(s => <Star key={s} size={8} fill="currentColor" />)}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-[#024653]/70 font-normal leading-relaxed italic line-clamp-3">
                                            &quot;{review.text}&quot;
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                            {/* Gradients to fade edges */}
                            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#F9F8F2] to-transparent z-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#F9F8F2] to-transparent z-10 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* --- LINKS SECTION --- */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-6">

                    {/* Col 1: Links Left */}
                    <div className="space-y-6">
                        <h4 className="text-[9px] font-normal uppercase tracking-widest text-[#024653]/30">DIRECTLY TO</h4>
                        <nav className="flex flex-col gap-5 text-sm font-normal">
                            <Link href="#vision" className="hover:opacity-60 transition-opacity">Vision</Link>
                            <Link href="#cases" className="hover:opacity-60 transition-opacity">Cases</Link>
                            <button className="flex items-center gap-2 hover:opacity-60 transition-opacity w-fit text-left uppercase text-[11px] font-black tracking-widest">
                                Solutions <span className="text-[7px]">▼</span>
                            </button>
                        </nav>
                    </div>

                    {/* Col 2: Links Right */}
                    <div className="space-y-6 lg:pt-8">
                        <nav className="flex flex-col gap-5 text-sm font-normal pt-1.5">
                            <Link href="/about" className="hover:opacity-60 transition-opacity">About ECS</Link>
                            <Link href="/updates" className="hover:opacity-60 transition-opacity">Updates</Link>
                            <button className="flex items-center gap-2 hover:opacity-60 transition-opacity w-fit text-left uppercase text-[11px] font-black tracking-widest">
                                Work <span className="text-[7px]">▼</span>
                            </button>
                        </nav>
                    </div>

                    {/* Col 3: Location 1 */}
                    {[
                        { name: "ECS Spokane", addr: "509 N Howard St", city: "Spokane, WA 99201", country: "USA", phone: "+1 (509) 123-4567" },
                        { name: "ECS Liberty", addr: "8017 Liberty Lake", city: "Spokane, WA 99019", country: "USA", phone: "+1 (509) 123-4568" },
                        { name: "ECS Valley", addr: "1013 BC Broadway", city: "Spokane, WA 99206", country: "USA", phone: "+1 (509) 123-4569" }
                    ].map((loc, i) => (
                        <div key={i} className="space-y-6">
                            <div className="space-y-1">
                                <h4 className="text-[10px] font-bold text-[#024653] opacity-80">{loc.name}</h4>
                                <div className="text-[10px] space-y-0.5 font-normal leading-relaxed opacity-40">
                                    <p>{loc.addr}</p>
                                    <p>{loc.city}</p>
                                    <p>{loc.country}</p>
                                    <p className="pt-1">{loc.phone}</p>
                                </div>
                            </div>
                            <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E1F724] text-[#024653] rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">
                                ROUTE <span className="text-lg leading-none translate-y-[-1px]">→</span>
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </footer>
    );
}
