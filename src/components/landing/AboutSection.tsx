"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

export default function AboutSection() {
    const stats = [
        { value: "500+", label: "Homes Cleaned", sublabel: "across Spokane" },
        { value: "5.0", label: "Google Rating", sublabel: "verified reviews" },
        { value: "100%", label: "Satisfaction", sublabel: "guaranteed" },
        { value: "24h", label: "Response Time", sublabel: "or less" },
    ];

    return (
        <section className="w-full bg-[#024653] relative py-20 lg:py-28 -translate-y-[80px]">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10">

                {/* Main Content */}
                <div className="max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        {/* Rating Badge */}
                        <div className="flex items-center gap-2 mb-8">
                            <div className="flex text-[#05D16E]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} size={16} fill="currentColor" />)}
                            </div>
                            <span className="text-white/60 text-sm font-medium">5.0 from 100+ reviews</span>
                        </div>

                        {/* Main Headline */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-[3.5rem] font-normal leading-[1.15] tracking-tight text-white mb-8">
                            We are passionate about transforming
                            spaces and helping families enjoy
                            <span className="text-[#05D16E] font-bold"> spotless homes</span>.
                        </h2>

                        {/* Description */}
                        <p className="text-white/50 font-light text-base lg:text-lg leading-relaxed max-w-2xl mb-16">
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
                        className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pt-8 border-t border-white/10"
                    >
                        {stats.map((stat, i) => (
                            <div key={i} className="space-y-1">
                                <div className="text-3xl lg:text-4xl font-bold text-[#05D16E]">
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
