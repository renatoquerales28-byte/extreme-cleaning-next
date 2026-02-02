"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
    return (
        <section className="w-full bg-transparent relative py-12 lg:py-16 -translate-y-[80px]">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10">

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="bg-[#024653] rounded-3xl px-8 py-16 lg:px-16 lg:py-24 text-center relative overflow-hidden"
                >
                    {/* Decorative Pattern - Subtle Dots */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                        <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                            backgroundSize: '24px 24px'
                        }} />
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-3xl mx-auto">
                        <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[1.2] tracking-tight text-white mb-6 lg:mb-8">
                            Since 2018, <span className="font-bold">ECS</span> has been transforming
                            spaces with passion, precision, and unwavering
                            commitment to <span className="text-[#05D16E] font-bold">excellence</span>.
                        </h2>

                        <p className="text-white/60 font-light text-base lg:text-lg leading-relaxed max-w-2xl mx-auto">
                            At Extreme Cleaning Solutions, we believe every space deserves
                            exceptional care. Our dedicated team combines professional expertise
                            with genuine passion to deliver results that exceed expectations.
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}
