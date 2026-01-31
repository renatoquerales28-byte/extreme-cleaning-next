"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronRight, Gift, Clock, Bell } from "lucide-react";
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
            <Clock size={16} className="text-slate-500 mb-1" />
            <span className="text-[10px] uppercase tracking-widest text-[#024653]/60 font-medium">Time Left</span>
            <span className="font-mono text-lg font-bold text-[#024653]">
                {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
            </span>
        </div>
    );
}

export default function SocialProofSection() {
    return (
        <section className="w-full bg-[#f9f9f9] border-y border-slate-100 overflow-hidden">
            <div className="w-full flex flex-col md:flex-row min-h-[600px]">

                {/* LEFT COLUMN: REVIEWS (Auto Slider) */}
                <div className="w-full md:w-1/2 p-8 md:p-20 border-b md:border-b-0 md:border-r border-slate-200 flex flex-col justify-center relative bg-white md:bg-transparent">

                    <div className="mb-12 relative z-10">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="relative w-8 h-8">
                                <Image src="/brand/logo.png" alt="Google" width={32} height={32} className="object-contain" />
                            </div>
                            <span className="text-sm font-bold text-slate-400 uppercase tracking-widest">Google Reviews</span>
                        </div>
                        <h3 className="text-4xl md:text-5xl font-light text-[#024653] leading-tight">
                            Loved by <span className="font-bold">Spokane.</span>
                        </h3>
                    </div>

                    {/* Marquee Container */}
                    <div className="relative w-full overflow-hidden mask-linear-fade">
                        <motion.div
                            className="flex flex-col gap-6"
                            animate={{ y: ["0%", "-50%"] }}
                            transition={{
                                repeat: Infinity,
                                ease: "linear",
                                duration: 20
                            }}
                        >
                            {/* Duplicate list for seamless loop */}
                            {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                <div key={`${review.id}-${i}`} className="bg-white p-6 rounded-xl shadow-sm border border-slate-100/50">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-[#024653]/5 flex items-center justify-center text-[#024653] font-bold text-xs">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#024653] text-xs">{review.name}</h4>
                                                <div className="flex text-[#F4B400] text-[10px] gap-0.5">
                                                    {[...Array(review.rating)].map((_, idx) => (
                                                        <Star key={idx} size={10} fill="currentColor" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[9px] text-slate-300 font-medium uppercase tracking-wider">{review.date}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm font-light leading-relaxed">&quot;{review.text}&quot;</p>
                                </div>
                            ))}
                        </motion.div>

                        {/* Gradient Masks */}
                        <div className="absolute top-0 left-0 w-full h-12 bg-gradient-to-b from-[#f9f9f9] to-transparent z-10" />
                        <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#f9f9f9] to-transparent z-10" />
                    </div>

                    <div className="mt-8 relative z-10">
                        <a href="#" className="text-[#05D16E] text-[10px] font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4 flex items-center gap-2">
                            View 150+ Reviews <ChevronRight size={12} strokeWidth={3} />
                        </a>
                    </div>
                </div>

                {/* RIGHT COLUMN: PROMO (Minimalist) */}
                <div className="w-full md:w-1/2 bg-white flex flex-col justify-center items-center p-8 md:p-20 relative">

                    {/* Background decoration */}
                    <div className="absolute inset-0 opacity-30 pointer-events-none bg-[radial-gradient(#024653_1px,transparent_1px)] [background-size:16px_16px]" />

                    <div className="w-full max-w-sm relative z-10 space-y-6">

                        {/* Top Card: Timer & Hook */}
                        <div className="bg-[#EAE8DD] rounded-2xl p-6 flex items-center justify-between shadow-sm">
                            <div className="flex-1">
                                <h4 className="font-medium text-[#024653] text-sm mb-1">Winter Cleaning Special</h4>
                                <p className="text-xs text-[#024653]/70 font-light">Get your home cleaned for <strong className="text-[#024653]">$19!*</strong></p>
                            </div>
                            <div className="pl-6 border-l border-[#024653]/10">
                                <CountdownTimer />
                            </div>
                        </div>

                        {/* Bell Icon Visual (Center) */}
                        <div className="flex justify-center opacity-20 py-2">
                            <Bell size={32} className="text-[#024653]" />
                        </div>

                        {/* Main Offer Card */}
                        <div className="bg-[#EAE8DD] rounded-2xl p-8 text-center shadow-lg transform transition-transform hover:scale-[1.02]">
                            <div className="flex justify-center mb-4 text-[#024653]">
                                <Gift size={28} strokeWidth={1.5} />
                            </div>

                            <h3 className="text-xl font-normal text-[#024653] mb-2">Get a Discount Voucher</h3>

                            <p className="text-sm font-light text-[#024653]/80 mb-8 leading-relaxed">
                                Two, Three, Four, or Six Hours of Cleaning from ECS (Up to 82% Off)
                            </p>

                            <Link
                                href="/wizard?type=residential&promo=WINTER_SPECIAL"
                                className="w-full block py-4 bg-[#FCD34D] text-[#024653] rounded-xl font-medium text-sm hover:bg-[#fbbf24] transition-colors shadow-sm"
                            >
                                GET CLEAN
                            </Link>

                            <p className="text-[10px] text-[#024653]/50 mt-4 font-medium uppercase tracking-wider">
                                100% Refundable if not used!
                            </p>
                        </div>

                        {/* Notification Bubble */}
                        <div className="bg-sky-50 border border-sky-100 rounded-lg p-3 text-center">
                            <p className="text-[10px] text-sky-700 font-medium">
                                Limited quantities - lock in your savings now.
                            </p>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}
