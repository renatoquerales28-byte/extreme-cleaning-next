"use client";

import { Star, Quote } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import { motion } from "framer-motion";

export default function SocialProofSection() {
    return (
        // SECTION: Horizontal Ribbon Layout
        <section className="w-full bg-transparent relative py-8 lg:py-12 snap-start scroll-mt-[90px] -translate-y-[100px]">

            {/* CONTAINER: Single Row Layout */}
            <div className="w-full max-w-[1700px] mx-auto px-6 lg:px-10">

                <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-10">

                    {/* LEFT: Title Block (Fixed Width) */}
                    <div className="shrink-0 lg:w-[280px] xl:w-[320px]">
                        <div className="pl-4 border-l-4 border-[#024653]">
                            <h3 className="text-2xl md:text-3xl lg:text-4xl font-light text-[#024653] mb-2 leading-tight">
                                What our <br /> <span className="font-black">Clients Say.</span>
                            </h3>
                            <div className="flex items-center gap-2">
                                <div className="flex text-[#F4B400]">
                                    {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                                </div>
                                <span className="text-xs font-medium text-[#024653]/60">5.0 on Google</span>
                            </div>
                        </div>
                    </div>

                    {/* RIGHT: Scrolling Reviews Marquee */}
                    <div className="flex-1 relative overflow-visible">
                        {/* Extra padding for shadow overflow */}
                        <div className="py-6 -my-6 overflow-hidden">
                            <motion.div
                                className="flex gap-5"
                                animate={{ x: ["0%", "-50%"] }}
                                transition={{
                                    repeat: Infinity,
                                    ease: "linear",
                                    duration: 35
                                }}
                                style={{ width: "max-content" }}
                            >
                                {/* Duplicate list for seamless loop */}
                                {[...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS, ...GOOGLE_REVIEWS].map((review, i) => (
                                    <div
                                        key={`${review.id}-${i}`}
                                        className="bg-white p-5 rounded-2xl shadow-md shadow-[#024653]/8 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative group w-[260px] md:w-[300px] shrink-0 border border-[#024653]/5"
                                    >
                                        <Quote className="absolute top-4 right-5 text-[#024653]/5 transform rotate-180 group-hover:scale-110 transition-transform" size={32} />

                                        <div className="flex items-center gap-3 mb-3">
                                            <div className="w-10 h-10 rounded-full bg-[#F9F8F2] flex items-center justify-center text-[#024653] font-black text-sm shadow-sm">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#024653] text-sm">{review.name}</h4>
                                                <span className="text-[9px] text-[#024653]/40 font-bold uppercase tracking-widest">{review.date}</span>
                                            </div>
                                        </div>

                                        <p className="text-[#024653]/80 text-sm font-light leading-relaxed italic relative z-10 line-clamp-3">
                                            &quot;{review.text}&quot;
                                        </p>
                                    </div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Gradient Masks - Match cream background */}
                        <div className="absolute top-0 left-0 w-16 h-full bg-gradient-to-r from-[#F9F8F2] to-transparent z-10 pointer-events-none" />
                        <div className="absolute top-0 right-0 w-20 h-full bg-gradient-to-l from-[#F9F8F2] to-transparent z-10 pointer-events-none" />
                    </div>

                </div>

            </div>
        </section>
    );
}
