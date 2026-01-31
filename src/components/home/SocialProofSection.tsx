"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronLeft, ChevronRight, Gift, Clock, Bell, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

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

// Internal Component for the Carousel Logic
function ReviewCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    // Auto-advance logic
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 5000); // 5 seconds per slide
        return () => clearInterval(interval);
    }, [activeIndex]);

    // Event Listeners for Custom Navigation
    useEffect(() => {
        const onNext = () => handleNext();
        const onPrev = () => handlePrev();

        window.addEventListener('next-review', onNext);
        window.addEventListener('prev-review', onPrev);

        return () => {
            window.removeEventListener('next-review', onNext);
            window.removeEventListener('prev-review', onPrev);
        };
    }, [activeIndex]);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % GOOGLE_REVIEWS.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + GOOGLE_REVIEWS.length) % GOOGLE_REVIEWS.length);
    };

    return (
        <div className="flex gap-6 items-center transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${activeIndex * 320}px)` }} // Adjust width multiplier as needed
        >
            {GOOGLE_REVIEWS.map((review, i) => (
                <div
                    key={`${review.id}-${i}`}
                    className={`
                        shrink-0 w-[300px] bg-[#085560] p-8 rounded-[2rem] shadow-sm relative group border border-transparent transition-all duration-300
                        ${i === activeIndex ? 'opacity-100 scale-100' : 'opacity-50 scale-95 blur-[1px]'}
                    `}
                >
                    <Quote className="absolute top-6 right-8 text-white/10 transform rotate-180" size={40} />

                    <p className="text-white/90 text-sm md:text-base font-light leading-relaxed italic relative z-10 line-clamp-4 h-[100px] mb-6">
                        &quot;{review.text}&quot;
                    </p>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#024653] font-black text-sm shadow-sm">
                            {review.name.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-bold text-white text-sm">{review.name}</h4>
                            <span className="text-[9px] text-[#05D16E] font-bold uppercase tracking-widest">{review.date}</span>
                        </div>
                    </div>

                    {/* Speech Bubble Tail */}
                    <div className="absolute -bottom-2 left-12 w-4 h-4 bg-[#085560] rotate-45 transform" />
                </div>
            ))}
            {/* Duplicates for infinite feel if desired, but here we just loop index logic */}
        </div>
    );
}

function CarouselControl({ direction, onClick }: { direction: 'prev' | 'next', onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-10 h-10 rounded-full border border-[#024653]/10 flex items-center justify-center text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-95"
        >
            {direction === 'prev' ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
        </button>
    );
}

export default function SocialProofSection() {
    return (
        // SECTION CONTAINER: Adjusted spacing (reduced top padding), Background #F9F8F2
        <section className="w-full bg-[#F9F8F2] relative flex items-center overflow-hidden pt-8 pb-16 lg:pt-12 lg:pb-24">

            {/* CONTAINER: Max width of 1700px to match Hero */}
            <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-5 gap-3 items-stretch justify-center">

                {/* LEFT COLUMN: REVIEWS - CAROUSEL REDESIGN */}
                <div className="w-full lg:col-span-3">

                    {/* MODULAR CONTAINER */}
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-[#024653]/5 border border-white h-full relative overflow-hidden flex items-center">

                        {/* 1. MIST OVERLAY & TITLE (Fixed Left Layer) */}
                        <div className="absolute left-0 top-0 bottom-0 w-[90%] md:w-[60%] lg:w-[45%] bg-gradient-to-r from-white via-white/95 to-transparent z-20 flex flex-col justify-center pl-8 lg:pl-12 pr-12 pointer-events-none">
                            <div className="pointer-events-auto"> {/* Make interactive contents clickable */}
                                <Quote className="text-[#024653]/10 mb-6 transform rotate-180" size={60} />

                                <h3 className="text-3xl md:text-5xl font-light text-[#024653] mb-4 leading-tight">
                                    What our <br /> <span className="font-black">Clients Say.</span>
                                </h3>

                                <div className="flex items-center gap-3 mb-8">
                                    <div className="flex text-[#F4B400]">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={18} fill="currentColor" />)}
                                    </div>
                                    <span className="text-sm font-bold text-[#024653]">5.0 on Google</span>
                                </div>

                                {/* Custom Navigation Controls */}
                                <div className="flex items-center gap-4">
                                    <CarouselControl
                                        direction="prev"
                                        onClick={() => window.dispatchEvent(new CustomEvent('prev-review'))}
                                    />
                                    <div className="h-[2px] w-16 bg-[#024653]/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-[#05D16E] w-1/3 animate-pulse" /> {/* Progress bar simulation */}
                                    </div>
                                    <CarouselControl
                                        direction="next"
                                        onClick={() => window.dispatchEvent(new CustomEvent('next-review'))}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* 2. CAROUSEL TRACK (Sliding Layer) */}
                        <div className="w-full h-full flex items-center lg:pl-[40%] pl-[20%]">
                            <ReviewCarousel />
                        </div>

                    </div>
                </div>

                {/* RIGHT COLUMN: PROMO (40% -> 2/5 cols) */}
                <div className="w-full lg:col-span-2 flex flex-col justify-center items-center lg:items-end relative h-full">

                    <div className="w-full max-w-md space-y-4 relative z-10 flex flex-col h-full justify-center">

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
