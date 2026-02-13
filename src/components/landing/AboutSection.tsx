"use client";

import { motion } from "framer-motion";
import { Star, Sparkles } from "lucide-react";

export default function AboutSection() {
    const stats = [
        { value: "500+", label: "Homes Cleaned", sublabel: "across Spokane" },
        { value: "5.0", label: "Google Rating", sublabel: "verified reviews" },
        { value: "100%", label: "Satisfaction", sublabel: "guaranteed" },
        { value: "24h", label: "Response Time", sublabel: "or less" },
    ];

    return (
        <section className="w-full bg-[#024653] relative pt-24 pb-[110px] lg:pt-28 lg:pb-[137px] -translate-y-[40px]" id="about">
            {/* =========================================
                MOBILE LAYOUT (lg:hidden)
               ========================================= */}
            <div className="lg:hidden w-full px-6 flex flex-col items-center text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    {/* Rating Badge */}
                    <div className="flex items-center justify-center gap-2 mb-6">
                        <div className="flex text-[#05D16E]">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
                        </div>
                        <span className="text-white/60 text-[12px] font-medium tracking-wide">5.0 | 100+ REAL REVIEWS</span>
                    </div>

                    {/* Main Headline */}
                    <h2 className="text-[32px] font-normal leading-tight text-white mb-5 tracking-tight">
                        We are passionate about <span className="text-[#05D16E] font-bold italic">Spotless homes.</span>
                    </h2>

                    {/* Description */}
                    <p className="text-white/50 font-light text-[15px] leading-relaxed max-w-[280px] mx-auto mb-10">
                        From Spokane with love. Our dedicated team combines expertise with genuine care.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="grid grid-cols-2 gap-x-12 gap-y-14 w-full pt-8 border-t border-white/10 relative"
                >
                    {/* Rotating Stamp - Centered in Metrics */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none mt-3">
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.4 }}
                            className="bg-white p-1.5 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.1)]"
                        >
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                                className="w-16 h-16 relative"
                            >
                                <svg viewBox="0 0 200 200" className="w-full h-full">
                                    <defs>
                                        <path id="circlePathAbout" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
                                    </defs>
                                    <text fill="#085560" fontSize="24" fontWeight="600" letterSpacing="6">
                                        <textPath href="#circlePathAbout" startOffset="0%">
                                            EXCELLENCE&nbsp;&nbsp;&nbsp;RELIABILITY&nbsp;&nbsp;&nbsp;
                                        </textPath>
                                    </text>
                                </svg>
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <Sparkles size={14} className="text-[#085560]" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>
                    {stats.map((stat, i) => (
                        <div key={i} className="flex flex-col items-center">
                            <div className="text-5xl font-semibold text-[#05D16E] mb-2">
                                {stat.value}
                            </div>
                            <div className="text-white font-medium text-[10px] uppercase tracking-[0.2em] opacity-80">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* =========================================
                DESKTOP LAYOUT (hidden lg:block)
               ========================================= */}
            <div className="hidden lg:block max-w-[1700px] mx-auto px-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Rating Badge */}
                        <div className="flex items-center justify-center gap-2 mb-8">
                            <div className="flex text-[#05D16E]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-white/60 text-sm font-medium">5.0 from 100+ reviews</span>
                        </div>

                        {/* Main Headline */}
                        <h2 className="text-5xl xl:text-[3.5rem] font-normal leading-[1.15] tracking-tight text-white mb-8">
                            We are passionate about transforming
                            spaces and helping families enjoy
                            <span className="text-[#05D16E] font-bold"> spotless homes</span>.
                        </h2>

                        {/* Description */}
                        <p className="text-white/50 font-light text-lg leading-relaxed max-w-2xl mx-auto mb-16">
                            From Spokane with love. Our dedicated team combines years of expertise
                            with genuine care for every space we touch. We don&apos;t just clean —
                            we transform.
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-4 gap-12 pt-8 border-t border-white/10"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="space-y-1 text-center">
                                <div className="text-4xl font-bold text-[#05D16E]">
                                    {stat.value}
                                </div>
                                <div className="text-white font-medium text-sm">
                                    {stat.label}
                                </div>
                                <div className="text-white/40 text-xs">
                                    {stat.sublabel}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
