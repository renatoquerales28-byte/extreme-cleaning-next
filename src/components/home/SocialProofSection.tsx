"use client";

import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Gift, Clock, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState(15 * 60);

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

function CarouselControl({ direction, onClick }: { direction: 'prev' | 'next', onClick: () => void }) {
    return (
        <button
            onClick={onClick}
            className="w-12 h-12 rounded-full border border-[#024653]/10 flex items-center justify-center text-[#024653] hover:bg-[#024653] hover:text-white transition-all active:scale-95 bg-white shadow-sm z-30 pointer-events-auto"
        >
            {direction === 'prev' ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </button>
    );
}

export default function SocialProofSection() {
    // State for the infinite rotation stack
    const [cards, setCards] = useState(() => {
        return GOOGLE_REVIEWS.map((review, i) => ({
            ...review,
            uniqueId: `${review.id}-${i}-${Date.now()}` // Ensure unique keys for animations
        }));
    });
    const [isPaused, setIsPaused] = useState(false);

    // Auto-advance logic
    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(interval);
    }, [cards, isPaused]);

    const handleNext = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const first = newCards.shift();
            if (first) {
                // Regenerate ID to ensure it enters as a "new" card
                first.uniqueId = `${first.id}-${Date.now()}`;
                newCards.push(first);
            }
            return newCards;
        });
    };

    const handlePrev = () => {
        setCards((prev) => {
            const newCards = [...prev];
            const last = newCards.pop();
            if (last) {
                last.uniqueId = `${last.id}-${Date.now()}`;
                newCards.unshift(last);
            }
            return newCards;
        });
    };

    const currentId = parseInt(cards[0]?.id || "1", 10);
    const progress = (currentId / GOOGLE_REVIEWS.length) * 100;
    const currentDisplayIndex = currentId;

    const cardColors = ['#024653', '#0E6168', '#167375'];
    const cardShadows = [
        '0 20px 40px rgba(2, 70, 83, 0.15)',
        '0 10px 20px rgba(2, 70, 83, 0.08)',
        '0 5px 10px rgba(2, 70, 83, 0.05)'
    ];

    return (
        <section className="w-full min-h-screen bg-[#F9F8F2] relative flex items-center justify-center overflow-hidden py-12 md:py-16 lg:py-20">
            <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8 items-center justify-center">

                <div className="w-full lg:col-span-3">
                    <div className="bg-white rounded-[2.5rem] shadow-xl shadow-[#024653]/5 border border-white relative overflow-hidden min-h-[600px] md:min-h-[650px] flex items-center">

                        <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 items-center">

                            <div className="relative z-20 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                                <div className="mb-6">
                                    <Quote className="text-[#05D16E] opacity-20 transform rotate-180" size={48} />
                                </div>

                                <motion.h3
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    className="text-4xl md:text-5xl font-light text-[#024653] mb-4 leading-tight"
                                >
                                    What our <br /> <span className="font-black italic">Clients Say.</span>
                                </motion.h3>

                                <div className="flex items-center gap-3 mb-10">
                                    <div className="flex text-[#F4B400]">
                                        {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                                    </div>
                                    <span className="text-xs font-bold text-[#024653]/60 uppercase tracking-widest">5.0 Google Score</span>
                                </div>

                                <div className="flex flex-col gap-6">
                                    <div className="flex items-center gap-4">
                                        <CarouselControl direction="prev" onClick={handlePrev} />
                                        <CarouselControl direction="next" onClick={handleNext} />
                                    </div>

                                    <div className="flex flex-col gap-2 w-32">
                                        <div className="h-[3px] bg-[#024653]/5 rounded-full overflow-hidden">
                                            <motion.div
                                                className="h-full bg-[#05D16E]"
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progress}%` }}
                                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                                            />
                                        </div>
                                        <span className="text-[10px] font-black text-[#024653]/30 uppercase tracking-[0.2em]">
                                            {String(currentDisplayIndex).padStart(2, '0')} / {String(GOOGLE_REVIEWS.length).padStart(2, '0')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div
                                className="relative flex items-center justify-center p-8 md:p-12 min-h-[400px] md:min-h-[500px]"
                                onMouseEnter={() => setIsPaused(true)}
                                onMouseLeave={() => setIsPaused(false)}
                            >
                                <div className="relative w-full max-w-[350px] h-[380px] flex items-center justify-center">
                                    <AnimatePresence mode="popLayout">
                                        {cards.slice(0, 3).map((review, index) => {
                                            return (
                                                <motion.div
                                                    key={review.uniqueId}
                                                    layoutId={review.uniqueId}
                                                    initial={{ opacity: 0, scale: 0.9, x: 100, zIndex: 0 }}
                                                    animate={{
                                                        opacity: 1,
                                                        scale: index === 0 ? 1 : (1 - index * 0.05),
                                                        x: index * 20,
                                                        y: 0,
                                                        zIndex: 10 - index,
                                                    }}
                                                    exit={{
                                                        x: -200,
                                                        opacity: 0,
                                                        scale: 0.95,
                                                        zIndex: 20,
                                                        transition: { duration: 0.4, ease: "easeInOut" }
                                                    }}
                                                    transition={{
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 25,
                                                        mass: 1
                                                    }}
                                                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[280px] md:w-[300px] p-8 md:p-10 rounded-[2.5rem] overflow-hidden"
                                                    style={{
                                                        transformOrigin: "center left",
                                                        backgroundColor: cardColors[index],
                                                        boxShadow: cardShadows[index]
                                                    }}
                                                >
                                                    <div className="absolute top-0 right-0 p-6 opacity-5">
                                                        <Quote size={80} className="transform rotate-180" />
                                                    </div>

                                                    <div className="relative z-10">
                                                        <p className="text-white/90 text-base md:text-lg font-light leading-relaxed italic mb-6 line-clamp-4 min-h-[120px]">
                                                            &quot;{review.text}&quot;
                                                        </p>

                                                        <div className="flex items-center gap-4 border-t border-white/10 pt-6">
                                                            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-[#024653] font-black text-sm shadow-inner">
                                                                {review.name.charAt(0)}
                                                            </div>
                                                            <div>
                                                                <h4 className="font-bold text-white text-sm tracking-tight">{review.name}</h4>
                                                                <div className="flex items-center gap-2">
                                                                    <span className="text-[10px] text-[#05D16E] font-black uppercase tracking-widest">{review.date}</span>
                                                                    <span className="w-1 h-1 rounded-full bg-white/20" />
                                                                    <div className="flex text-[#F4B400] scale-75 origin-left">
                                                                        {[1, 2, 3, 4, 5].map(st => <Star key={st} size={10} fill="currentColor" />)}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#05D16E] to-transparent opacity-30" />
                                                </motion.div>
                                            )
                                        })}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div className="w-full lg:col-span-2 flex flex-col h-auto lg:h-full gap-6">
                    <div className="bg-white rounded-[2.5rem] p-8 flex items-center justify-between shadow-xl shadow-[#024653]/5 border border-white">
                        <div>
                            <span className="inline-block px-3 py-1 bg-[#024653]/5 text-[#024653] text-[9px] font-black uppercase tracking-[0.2em] rounded-full mb-2">
                                Limited Availability
                            </span>
                            <h4 className="font-black text-[#024653] text-xl tracking-tight">Winter Special</h4>
                        </div>
                        <div className="pl-8 border-l border-[#024653]/10">
                            <CountdownTimer />
                        </div>
                    </div>

                    <div className="bg-white rounded-[3rem] p-10 text-center shadow-2xl shadow-[#024653]/5 border border-white relative overflow-hidden flex-grow flex flex-col justify-center">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#05D16E]/5 rounded-full blur-3xl" />

                        <div className="relative z-10">
                            <Gift className="mx-auto text-[#05D16E] mb-6" size={40} strokeWidth={1.5} />

                            <h3 className="text-6xl font-normal text-[#024653] mb-2 tracking-tighter">
                                15% <span className="font-black">OFF</span>
                            </h3>

                            <p className="text-lg text-[#024653]/60 mb-10 font-medium">
                                On your first <strong>Deep Cleaning</strong> session.
                            </p>

                            <Link
                                href="/wizard?type=residential&intensity=deep&promo=WELCOME15"
                                className="w-full flex items-center justify-center gap-4 py-6 bg-[#024653] text-white rounded-[2rem] font-black text-sm uppercase tracking-[0.2em] hover:bg-[#02333d] transition-all transform hover:-translate-y-2 shadow-2xl shadow-[#024653]/30 active:scale-95 group"
                            >
                                Claim Offer <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </Link>

                            <div className="mt-8 flex items-center justify-center gap-2">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-bold text-[#024653]">
                                            U{i}
                                        </div>
                                    ))}
                                </div>
                                <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest">
                                    Joined by 500+ locals this month
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
