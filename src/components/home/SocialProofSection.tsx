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
        // SECTION CONTAINER: Full Height (Frame), Background #F9F8F2
        <section className="w-full min-h-screen bg-[#F9F8F2] relative flex items-center overflow-hidden py-12 md:py-0">

            {/* CONTAINER: Matches Hero Section Margins/Width */}
            <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-10 h-full flex flex-col md:flex-row gap-8 lg:gap-20 items-stretch justify-center">

                {/* LEFT COLUMN: REVIEWS (Adapted Style) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center relative">

                    {/* Header for Reviews */}
                    <div className="mb-10 pl-4 border-l-4 border-[#024653]">
                        <h3 className="text-4xl md:text-5xl font-light text-[#024653] mb-2">
                            What our <br /> <span className="font-black">Clients Say.</span>
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="flex text-[#F4B400]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-sm font-medium text-[#024653]/60">5.0 on Google</span>
                        </div>
                    </div>

                    {/* Marquee Container - Styled as Floating Cards */}
                    <div className="relative w-full h-[500px] overflow-hidden mask-vertical-fade">
                        <motion.div
                            className="flex flex-col gap-6"
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 25
                            }}
                        >
                            {/* Duplicate list for loop */}
                            {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                <div key={`${review.id}-${i}`} className="bg-white p-8 rounded-[2rem] shadow-sm hover:shadow-md transition-shadow relative group">
                                    <Quote className="absolute top-6 right-8 text-[#024653]/5 transform rotate-180 group-hover:scale-110 transition-transform" size={48} />

                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-12 h-12 rounded-full bg-[#05D16E]/10 flex items-center justify-center text-[#024653] font-black text-lg">
                                            {review.name.charAt(0)}
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-[#024653] text-sm md:text-base">{review.name}</h4>
                                            <span className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest">{review.date}</span>
                                        </div>
                                    </div>

                                    <p className="text-[#024653]/80 text-base font-light leading-relaxed italic relative z-10">
                                        &quot;{review.text}&quot;
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                        {/* Soft Gradient Masks for "Airy" fade */}
                        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-b from-[#F9F8F2] to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#F9F8F2] to-transparent z-10" />
                    </div>
                </div>

                {/* RIGHT COLUMN: PROMO (Redesigned White/Shadow) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center items-center relative">

                    <div className="w-full max-w-md space-y-6 relative z-10">

                        {/* Top Card: Timer & Hook (White Card) */}
                        <div className="bg-white rounded-[2rem] p-8 flex items-center justify-between shadow-lg shadow-[#024653]/5 border border-white">
                            <div>
                                <h4 className="font-black text-[#024653] text-lg uppercase tracking-tight mb-1">Winter Special</h4>
                                <p className="text-sm text-[#024653]/70 font-medium">Limited Time Offer</p>
                            </div>
                            <div className="pl-6 border-l border-[#024653]/5">
                                <CountdownTimer />
                            </div>
                        </div>

                        {/* Main Offer Card (White Card) */}
                        <div className="bg-white rounded-[2.5rem] p-10 text-center shadow-xl shadow-[#024653]/5 border border-white relative overflow-hidden group">

                            {/* Subtle Hover Decoration */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#05D16E]/5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:bg-[#05D16E]/10 transition-colors" />

                            <div className="relative z-10">
                                <span className="inline-block px-4 py-1.5 rounded-full bg-[#05D16E]/10 text-[#024653] text-[10px] font-black uppercase tracking-widest mb-6">
                                    Exclusive Online Deal
                                </span>

                                <h3 className="text-5xl font-light text-[#024653] mb-2 tracking-tight">
                                    15% <span className="font-black">OFF</span>
                                </h3>

                                <p className="text-base text-[#024653]/60 mb-10 font-medium max-w-xs mx-auto">
                                    Book your first <strong>Deep Clean</strong> today and experience the difference.
                                </p>

                                <Link
                                    href="/wizard?type=residential&intensity=deep&promo=WELCOME15"
                                    className="w-full flex items-center justify-center gap-3 py-5 bg-[#024653] text-white rounded-2xl font-black text-xs uppercase tracking-[0.15em] hover:bg-[#02333d] transition-all transform hover:-translate-y-1 shadow-lg shadow-[#024653]/20"
                                >
                                    Get Clean <ChevronRight size={16} />
                                </Link>

                                <p className="text-[10px] text-[#024653]/30 mt-6 font-bold uppercase tracking-widest">
                                    *Valid for new residential customers only
                                </p>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
