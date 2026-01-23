"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SocialProofSection() {
    const reviews = [
        {
            id: 1,
            author: "Sarah Jenkins",
            role: "Homeowner, South Hill",
            text: "I didn't realize how dirty my carpets were until ECS came. It literally feels like a new house. The team was punctual, polite, and thorough.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
        },
        {
            id: 2,
            author: "Marcus Chen",
            role: "Office Manager",
            text: "We've gone through 3 cleaning companies in 2 years. ECS is the first one that actually does what they say. Our office has never looked better.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
        },
        {
            id: 3,
            author: "Emily & David",
            role: "Airbnb Hosts",
            text: "Reliability is everything for us. ECS has never missed a turnover, and our guests constantly mention how clean the place is in their 5-star reviews.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
        },
        {
            id: 4,
            author: "Jessica R.",
            role: "Busy Mom of 3",
            text: "The best investment for my sanity. Coming home to a sparkling clean house on Fridays is the highlight of my week.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden">
            {/* Decor */}
            <div className="absolute right-0 top-0 w-1/3 h-full bg-slate-50 -skew-x-12 z-0" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <span className="text-emerald-500 font-black tracking-[0.2em] text-xs uppercase">Community Trust</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-dark leading-[0.9]">
                        Don't Just Take <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-light">Our Word For It.</span>
                    </h2>
                </div>

                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
                    {reviews.map((review, i) => (
                        <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="break-inside-avoid bg-slate-50 p-8 rounded-3xl border border-slate-100 hover:shadow-xl transition-all duration-300"
                        >
                            <div className="flex text-amber-400 gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-brand-dark font-medium leading-relaxed mb-6">"{review.text}"</p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                                    <Image
                                        src={review.image}
                                        alt={review.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-bold text-brand-dark text-sm">{review.author}</h4>
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-wide">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
