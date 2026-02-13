"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

export default function SocialProofSection() {
    const reviews = [
        {
            id: 1,
            author: "Suzanne Heutmaker",
            role: "Homeowner",
            text: "I have never had my house this clean! They did an excellent job deep cleaning and added in unexpected special touches and attention to detail. Professional and friendly staff.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1888&auto=format&fit=crop"
        },
        {
            id: 2,
            author: "Philip Salgado",
            role: "Residential Client",
            text: "Ricardo and Ana are both punctual, quiet, careful, courteous, and thorough. I find the clutter neatly stacked and organized. Uplifting to be rescued from my inattention to my surroundings.",
            rating: 5,
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop"
        },
        {
            id: 3,
            author: "Jennifer Piani",
            role: "Deep Clean Client",
            text: "I was so impressed and pleased with their professionalism and efficiency! Also, being a woman owned family business is a plus in my book. I highly recommend them!",
            rating: 5,
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop"
        }
    ];

    return (
        <section className="py-24 bg-white relative overflow-hidden snap-start scroll-mt-[60px]" id="reviews">
            {/* Decor - Soft Cream Contrast */}
            {/* Decor - Soft Cream Contrast */}
            {/* Removed cream background decor to keep it clean white */}

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-16 space-y-4">
                    <span className="text-[#05D16E] font-black tracking-[0.2em] text-xs uppercase">Community Trust</span>
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.9]">
                        Don&apos;t Just Take <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] to-[#0E6168]">Our Word For It.</span>
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
                            className="break-inside-avoid bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-[#024653]/5 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 block"
                        >
                            <div className="flex text-[#05D16E] gap-1 mb-6">
                                {[...Array(review.rating)].map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 shadow-sm">
                                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                    </svg>
                                ))}
                            </div>

                            <p className="text-[#024653]/80 font-medium leading-relaxed mb-8 font-opensans">&quot;{review.text}&quot;</p>

                            <div className="flex items-center gap-4">
                                <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-[#05D16E]/20">
                                    <Image
                                        src={review.image}
                                        alt={review.author}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div>
                                    <h4 className="font-black text-[#024653] text-sm uppercase tracking-tight">{review.author}</h4>
                                    <p className="text-[#0E6168]/40 text-[10px] font-black uppercase tracking-widest">{review.role}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
