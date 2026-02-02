"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import { motion } from "framer-motion";

export default function FooterSection() {
    return (
        <footer id="footer" className="w-full bg-[#F9F8F2] text-[#024653] relative z-10 overflow-hidden pt-[85px] pb-16">

            {/* --- SOCIAL PROOF MARQUEE --- */}
            <div className="w-full bg-transparent pb-12 -mt-[60px]">
                <div className="max-w-[1700px] mx-auto px-6 lg:px-10">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
                        {/* Title Block */}
                        <div className="shrink-0">
                            <h3 className="text-xl font-light text-[#024653] leading-tight">
                                Trusted by <br /> <span className="font-black">the Community.</span>
                            </h3>
                            <div className="flex items-center gap-2 mt-1">
                                <div className="flex text-[#F4B400]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={10} fill="currentColor" />)}
                                </div>
                                <span className="text-[9px] font-bold text-[#024653]/40 tracking-widest uppercase">5.0 Google Rating</span>
                            </div>
                        </div>

                        {/* Scrolling Marquee */}
                        <div className="flex-1 relative overflow-hidden">
                            <motion.div
                                className="flex gap-4"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 45
                                }}
                                style={{ width: "max-content" }}
                            >
                                {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                    <div
                                        key={i}
                                        className="bg-white p-4 rounded-xl border border-[#024653]/5 w-[260px] shrink-0 flex flex-col justify-between min-h-[110px]"
                                    >
                                        <p className="text-[11px] text-[#024653]/70 font-normal leading-relaxed italic line-clamp-2">
                                            &quot;{review.text}&quot;
                                        </p>
                                        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[#024653]/5">
                                            <div className="w-6 h-6 rounded-full bg-[#024653]/5 text-[#024653] flex items-center justify-center text-[9px] font-bold">
                                                {review.name.charAt(0)}
                                            </div>
                                            <span className="text-[10px] font-bold text-[#024653]">{review.name}</span>
                                        </div>
                                    </div>
                                ))}
                            </motion.div>
                            <div className="absolute top-0 left-0 w-20 h-full bg-gradient-to-r from-[#F9F8F2] to-transparent z-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#F9F8F2] to-transparent z-10 pointer-events-none" />
                        </div>
                    </div>
                </div>
            </div>

            {/* --- MAIN FOOTER CONTENT --- */}
            <div className="max-w-[1700px] w-full mx-auto px-6 lg:px-10 flex flex-col gap-12 lg:gap-24">

                {/* --- TOP SECTION --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">

                    {/* Newsletter Side */}
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                            ECS Excellence in <br />
                            your mailbox
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-widest text-[#024653]/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E]" />
                                Email address
                            </div>
                            <div className="relative group w-full max-w-[400px]">
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

                    {/* Brand Block */}
                    <div className="flex flex-col items-start lg:items-end lg:text-right space-y-1">
                        <div className="relative h-14 w-44 md:w-56">
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

                {/* --- BOTTOM SECTION: Links & Right-Aligned Locations --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-end">

                    {/* Links Section (Left) - Takes 4 columns */}
                    <div className="lg:col-span-4 grid grid-cols-2 gap-6">
                        <div className="space-y-6">
                            <h4 className="text-[9px] font-normal uppercase tracking-widest text-[#024653]/30">DIRECTLY TO</h4>
                            <nav className="flex flex-col gap-4 text-sm font-normal">
                                <Link href="#vision" className="hover:opacity-60 transition-opacity">Vision</Link>
                                <Link href="#cases" className="hover:opacity-60 transition-opacity">Cases</Link>
                                <button className="flex items-center gap-2 hover:opacity-60 transition-opacity w-fit text-left uppercase text-[11px] font-black tracking-widest">
                                    Solutions <span className="text-[7px]">▼</span>
                                </button>
                            </nav>
                        </div>

                        <div className="space-y-6 lg:pt-8">
                            <nav className="flex flex-col gap-4 text-sm font-normal pt-1.5">
                                <Link href="/about" className="hover:opacity-60 transition-opacity">About ECS</Link>
                                <Link href="/updates" className="hover:opacity-60 transition-opacity">Updates</Link>
                                <button className="flex items-center gap-2 hover:opacity-60 transition-opacity w-fit text-left uppercase text-[11px] font-black tracking-widest">
                                    Work <span className="text-[7px]">▼</span>
                                </button>
                            </nav>
                        </div>
                    </div>

                    {/* Spacer (1 column) */}
                    <div className="hidden lg:block lg:col-span-1" />

                    {/* Locations Grid (Right Aligned) - Takes 7 columns */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-6">
                        {[
                            { name: "ECS Spokane", addr: "509 N Howard St", city: "Spokane, WA", phone: "+1 (509) 123-4567" },
                            { name: "ECS Liberty", addr: "8017 Liberty Lake", city: "Spokane, WA", phone: "+1 (509) 123-4568" },
                            { name: "ECS Valley", addr: "1013 BC Broadway", city: "Spokane, WA", phone: "+1 (509) 123-4569" }
                        ].map((loc, i) => (
                            <div key={i} className="space-y-6 lg:text-right flex flex-col lg:items-end">
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-[#024653] opacity-80">{loc.name}</h4>
                                    <div className="text-[10px] space-y-0.5 font-normal leading-relaxed opacity-40">
                                        <p>{loc.addr}</p>
                                        <p>{loc.city}</p>
                                        <p className="pt-1">{loc.phone}</p>
                                    </div>
                                </div>
                                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#0BAA53] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">
                                    ROUTE <span className="text-lg leading-none translate-y-[-1px]">→</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </footer>
    );
}
