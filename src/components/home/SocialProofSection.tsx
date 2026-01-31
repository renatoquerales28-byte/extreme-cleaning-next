"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronRight, Gift, Clock, Bell, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import Link from "next/link";
import { motion } from "framer-motion";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="flex flex-col items-center">
            <Clock size={14} className="text-[#024653]/60 mb-1" />
            <span className="text-[9px] uppercase tracking-widest text-[#024653]/40 font-bold">Expires in</span>
            <span className="font-mono text-xl font-bold text-[#024653] tracking-wider">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
        </div>
    );
}

export default function SocialProofSection() {
    return (
        // SECTION CONTAINER: Adjusted spacing (reduced top padding), Background #F9F8F2
        <section className="w-full bg-[#F9F8F2] relative flex items-center overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">

            {/* CONTAINER: Max width of 1700px to match Hero */}
            <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch justify-center">

                {/* LEFT COLUMN: REVIEWS (60% -> 3/5 cols) - NOW ENCLOSED IN WHITE CARD */}
                <div className="w-full lg:col-span-3 flex flex-col justify-center relative">

                    {/* NEW MODULAR CONTAINER */}
                    <div className="bg-white rounded-[2.5rem] p-8 lg:p-12 shadow-xl shadow-[#024653]/5 border border-white h-full flex flex-col justify-center relative overflow-hidden">

                        {/* Header for Reviews */}
                        <div className="mb-8 md:mb-12 pl-4 border-l-4 border-[#024653] relative z-10">
                            <h3 className="text-3xl md:text-5xl font-light text-[#024653] mb-2 leading-tight">
                                What our <br /> <span className="font-black">Clients Say.</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex text-[#F4B400]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                </div>
                                <span className="text-sm font-medium text-[#024653]/60">5.0 on Google</span>
                            </div>
                        </div>

                        {/* Horizontal Marquee Container */}
                        <div className="relative w-full overflow-hidden mask-horizontal-fade -mx-4 px-4 py-8"> {/* Negative margin to allow shadow bleed, py for hover space */}
                            <motion.div
                                className="flex gap-6 pl-4"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 40
                                }}
                                style={{ width: "max-content" }}
                            >
                                {/* Duplicate list for loop */}
                                {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                    <div
                                        key={`${review.id}-${i}`}
                                        className="bg-[#F9F8F2] p-8 rounded-[2rem] shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group w-[350px] md:w-[450px] shrink-0 border border-transparent hover:border-[#024653]/5"
                                    >
                                        <Quote className="absolute top-6 right-8 text-[#024653]/5 transform rotate-180 group-hover:scale-110 transition-transform" size={48} />

                                        <div className="flex items-center gap-4 mb-6">
                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#024653] font-black text-lg shadow-sm">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#024653] text-sm md:text-base">{review.name}</h4>
                                                <span className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest">{review.date}</span>
                                            </div>
                                        </div>

                                        <p className="text-[#024653]/80 text-base font-light leading-relaxed italic relative z-10 line-clamp-4">
                                            &quot;{review.text}&quot;
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                            {/* Gradient Masks for Horizontal Fade - Adjusted to match white BG */}
                            <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                            <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: PROMO (40% -> 2/5 cols) */}
                <div className="w-full lg:col-span-2 flex flex-col justify-center items-center lg:items-end relative h-full">

                    <div className="w-full max-w-md space-y-6 relative z-10 flex flex-col h-full justify-center">

                        {/* Top Card: Timer & Hook (White Card) */}
                        <div className="bg-white rounded-[2rem] p-6 lg:p-8 flex items-center justify-between shadow-lg shadow-[#024653]/5 border border-white">
                            <div>
                                <h4 className="font-black text-[#024653] text-lg uppercase tracking-tight mb-1">Winter Special</h4>
                                <p className="text-sm text-[#024653]/70 font-medium whitespace-nowrap">Limited Offer</p>
                            </div>
                            <div className="pl-4 lg:pl-6 border-l border-[#024653]/5">
                                <CountdownTimer />
                            </div>
                        </div>

                        {/* Main Offer Card (White Card) */}
                        <div className="bg-white rounded-[2.5rem] p-8 lg:p-10 text-center shadow-xl shadow-[#024653]/5 border border-white relative overflow-hidden group flex-grow flex-col justify-center">

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#05D16E]/10 text-[#024653] text-[10px] font-black uppercase tracking-widest mb-6">
                                    Exclusive Deal
                                </span>

                                <h3 className="text-5xl font-normal text-[#024653] mb-2 tracking-tight">
                                    15% <span className="font-black">OFF</span>
                                </h3>

                                <p className="text-base text-[#024653]/60 mb-10 font-medium mx-auto">
                                    Book your first <strong>Deep Clean</strong> today.
                                </p>

                                <Link
                                    href="/wizard?type=residential&intensity=deep&promo=WELCOME15"
                                    className="w-full flex items-center justify-center gap-3 py-5 bg-[#024653] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-[#02333d] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#024653]/20"
                                >
                                    Get Clean <ChevronRight size={16} />
                                </Link>

                                <p className="text-[10px] text-[#024653]/30 mt-6 font-bold uppercase tracking-widest">
                                    100% Refundable if not used!
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
