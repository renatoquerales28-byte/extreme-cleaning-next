"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Star, Check, ArrowRight } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import { motion } from "framer-motion";

export default function FooterSection() {
    return (
        <footer id="reviews" className="w-full bg-[#F9F8F2] text-[#024653] relative z-20 overflow-hidden pt-14 pb-16 lg:pb-16 scroll-mt-[60px] -translate-y-[65px]">

            {/* =========================================
                FOOTER SOCIAL PROOF MARQUEE (Universal)
               ========================================= */}
            <div className="w-full bg-transparent pb-12">
                <div className="max-w-[1700px] mx-auto px-6 lg:px-10 translate-y-[20px]">
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
                                className="flex gap-4 py-2"
                                animate={{ x: [0, "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 35
                                }}
                                style={{ width: "max-content" }}
                            >
                                {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                    <div
                                        key={i}
                                        className="bg-white p-4 rounded-xl border border-[#024653]/5 w-[280px] shrink-0 flex flex-col justify-between min-h-[120px] shadow-sm hover:shadow-md transition-shadow"
                                    >
                                        <p className="text-[11px] text-[#024653]/70 font-normal leading-relaxed italic line-clamp-3">
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

            {/* =========================================
                MOBILE LAYOUT (lg:hidden)
               ========================================= */}
            <div className="lg:hidden w-full px-6 flex flex-col gap-16">

                {/* 1. Newsletter Block */}
                <div className="space-y-8">
                    <h2 className="text-3xl font-light leading-tight tracking-tight">
                        Get special offers <br />
                        <span className="italic font-normal">in your mailbox</span>
                    </h2>

                    <div className="space-y-6">
                        <div className="relative group w-full">
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white border border-[#024653]/10 px-6 h-14 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-[#085560]/10 transition-all font-normal text-[#024653] shadow-sm"
                            />
                            <button className="absolute right-2 top-2 bottom-2 px-6 bg-[#085560] text-white rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all">
                                SUBSCRIBE
                            </button>
                        </div>
                        <label className="flex items-start gap-3 cursor-pointer group">
                            <div className="relative flex items-center justify-center mt-0.5">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-4 h-4 rounded border border-[#024653]/20 bg-white checked:bg-[#085560] checked:border-[#085560] transition-colors cursor-pointer"
                                />
                                <Check
                                    size={10}
                                    strokeWidth={4}
                                    className="absolute text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                />
                            </div>
                            <span className="text-[10px] font-normal text-[#024653]/50 leading-snug">
                                I agree to receive updates and news from ECS. You can unsubscribe at any time.
                            </span>
                        </label>
                    </div>
                </div>

                {/* 2. Brand & Navigation Grid */}
                <div className="grid grid-cols-2 gap-10 border-t border-[#024653]/5 pt-12">
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Navigation</h4>
                        <nav className="flex flex-col gap-4 text-sm font-light">
                            <Link href="#hero-section" className="hover:opacity-60 transition-opacity">Home</Link>
                            <Link href="#services" className="hover:opacity-60 transition-opacity">Services</Link>
                            <Link href="#process" className="hover:opacity-60 transition-opacity">Process</Link>
                            <Link href="#about" className="hover:opacity-60 transition-opacity">About</Link>
                        </nav>
                    </div>
                    <div className="space-y-6">
                        <h4 className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">Social Media</h4>
                        <nav className="flex flex-col gap-4 text-sm font-light">
                            <Link href="https://www.instagram.com/extremecleaning509/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Instagram</Link>
                            <Link href="https://www.facebook.com/profile.php?id=100076351471060" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Facebook</Link>
                            <Link href="#" className="hover:opacity-60 transition-opacity">TikTok</Link>
                            <Link href="#" className="hover:opacity-60 transition-opacity">YouTube</Link>
                        </nav>
                    </div>
                </div>

                {/* 3. ECS Work Section */}
                <div className="space-y-6 pt-4">
                    <h4 className="text-[10px] font-black uppercase tracking-widest text-[#024653]/30">ECS Work</h4>
                    <div className="bg-[#024653]/5 p-6 rounded-2xl flex justify-between items-center group">
                        <div className="space-y-1.5">
                            <h5 className="text-xs font-bold text-[#024653] uppercase tracking-tight">Career & Support</h5>
                            <div className="text-[11px] font-light opacity-60 leading-relaxed">
                                <p>+1 (509) 981-2337</p>
                                <p className="font-medium mt-1">work@ecscleaning.com</p>
                            </div>
                        </div>
                        <Link href="mailto:work@ecscleaning.com" className="w-11 h-11 rounded-full bg-[#024653] text-white flex items-center justify-center shadow-lg active:scale-90 transition-all">
                            <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>

                {/* 4. Final Brand Mark */}
                <div className="pt-8 flex flex-col items-center gap-6">
                    <div className="relative h-10 w-32">
                        <Image
                            src="/brand/logo-full.png"
                            alt="ECS Logo"
                            fill
                            className="object-contain"
                            style={{
                                filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(464%) hue-rotate(142deg) brightness(91%) contrast(97%)'
                            }}
                        />
                    </div>
                    <div className="text-[9px] font-medium uppercase tracking-[0.4em] text-[#024653]/30 text-center">
                        © 2024 • PREMIUM CLEANING SOLUTIONS
                    </div>
                </div>
            </div>

            {/* =========================================
                DESKTOP LAYOUT (hidden lg:block)
               ========================================= */}
            <div className="hidden lg:block max-w-[1700px] w-full mx-auto px-10">
                <div className="grid grid-cols-12 gap-12 items-start border-t border-[#024653]/5 pt-12 translate-y-[40px]">

                    {/* COL 1: Newsletter (4/12) */}
                    <div className="col-span-4 space-y-6">
                        <h2 className="text-3xl xl:text-4xl font-light leading-tight tracking-tight">
                            Get special offers <br />
                            <span className="italic">in your mailbox</span>
                        </h2>
                        <div className="relative group w-full max-w-[360px]">
                            <input
                                type="email"
                                placeholder="name@example.com"
                                className="w-full bg-white border border-[#024653]/10 px-6 py-3.5 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all font-normal text-[#024653]"
                            />
                            <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#085560] text-white rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#064a54] transition-all">
                                SEND
                            </button>
                        </div>
                        <label className="flex items-center gap-2 cursor-pointer group">
                            <div className="relative flex items-center justify-center">
                                <input
                                    type="checkbox"
                                    className="peer appearance-none w-3.5 h-3.5 rounded border border-[#024653]/30 bg-transparent checked:border-[#085560] transition-colors cursor-pointer"
                                />
                                <Check
                                    size={9}
                                    strokeWidth={4}
                                    className="absolute text-[#085560] opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                                />
                            </div>
                            <span className="text-[9px] font-normal text-[#024653]/40 group-hover:text-[#024653]/60 transition-colors">
                                I agree to the <Link href="#" className="underline underline-offset-2">privacy statement</Link>
                            </span>
                        </label>
                    </div>

                    {/* COL 2: Links (2/12) */}
                    <div className="col-span-2 space-y-6">
                        <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#024653]/30">Navigation</h4>
                        <nav className="flex flex-col gap-3 text-xs font-normal">
                            <Link href="#hero-section" className="hover:opacity-60 transition-opacity">Home</Link>
                            <Link href="#services" className="hover:opacity-60 transition-opacity">Services</Link>
                            <Link href="#process" className="hover:opacity-60 transition-opacity">Process</Link>
                            <Link href="#about" className="hover:opacity-60 transition-opacity">About ECS</Link>
                        </nav>
                    </div>

                    {/* COL 3: Social & Work (4/12) */}
                    <div className="col-span-4 grid grid-cols-2 gap-x-12">
                        {/* Social Media Column */}
                        <div className="space-y-6">
                            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#024653]/30">Social Media</h4>
                            <nav className="flex flex-col gap-3 text-xs font-normal">
                                <Link href="https://www.instagram.com/extremecleaning509/" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Instagram</Link>
                                <Link href="https://www.facebook.com/profile.php?id=100076351471060" target="_blank" rel="noopener noreferrer" className="hover:opacity-60 transition-opacity">Facebook</Link>
                                <Link href="#" className="hover:opacity-60 transition-opacity">TikTok</Link>
                                <Link href="#" className="hover:opacity-60 transition-opacity">YouTube</Link>
                            </nav>
                        </div>

                        {/* ECS Work Column */}
                        <div className="space-y-6">
                            <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#024653]/30">ECS Work</h4>
                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <p className="text-[10px] font-bold text-[#024653]">Career & Support</p>
                                    <div className="text-[10px] font-normal opacity-40 leading-relaxed">
                                        <p>+1 (509) 981-2337</p>
                                        <p className="pt-0.5">work@ecscleaning.com</p>
                                    </div>
                                </div>
                                <Link href="mailto:work@ecscleaning.com" className="inline-block text-[9px] font-bold text-[#024653] uppercase tracking-wider hover:underline underline-offset-4 pt-1">
                                    Work with us →
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* COL 4: Brand & Copyright (2/12) */}
                    <div className="col-span-2 flex flex-col items-end text-right space-y-8">
                        <div className="relative h-10 w-40">
                            <Image
                                src="/brand/logo-full.png"
                                alt="ECS Logo"
                                fill
                                className="object-contain object-right"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(464%) hue-rotate(142deg) brightness(91%) contrast(97%)'
                                }}
                            />
                        </div>
                        <div className="space-y-2">
                            <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#024653]/30 leading-tight">
                                PREMIUM <br /> CLEANING SOLUTIONS
                            </p>
                            <div className="text-[8px] font-medium uppercase tracking-widest text-[#024653]/20 pt-4">
                                © 2024 • SPOKANE, WA
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
