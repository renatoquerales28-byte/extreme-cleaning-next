"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProcessSection() {
    const router = useRouter();
    const [zipCode, setZipCode] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleStart = (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        if (zipCode.length === 5) {
            router.push(`/quote?zip=${zipCode}`);
        }
    };

    const steps = [
        {
            num: "01.",
            title: "Share Your\nSpace Details",
            desc: "Tell us about your property in 60 seconds. Select your service type and let us know your specific needs."
        },
        {
            num: "02.",
            title: "Get Instant\nPricing",
            desc: "Receive a transparent, upfront quote immediately. No hidden fees, no surprises—just honest pricing."
        },
        {
            num: "03.",
            title: "Enjoy Your\nClean Space",
            desc: "Our expert team arrives on time, fully equipped, and ready to transform your space to perfection."
        }
    ];

    return (
        <section
            className="w-full bg-transparent min-h-screen flex flex-col justify-center py-16 lg:py-0 relative"
            id="process"
        >
            <div className="max-w-[1400px] mx-auto px-6 lg:px-10 w-full">

                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12 lg:mb-16"
                >
                    {/* Eyebrow */}
                    <p className="text-sm uppercase tracking-[0.3em] text-[#024653]/50 mb-4 lg:mb-6">
                        Our Process
                    </p>

                    {/* Main Headline */}
                    <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-normal leading-[1.15] tracking-tight text-[#024653] mb-6 lg:mb-8">
                        Premium Cleaning Services,<br />
                        From <span className="font-bold">Chaos to Calm</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#024653]/60 font-light text-base lg:text-lg max-w-2xl mx-auto leading-relaxed">
                        We specialize in providing top-tier cleaning solutions tailored to your needs. Our expertise spans
                        residential deep cleaning, commercial maintenance, and specialized post-construction services.
                    </p>
                </motion.div>

                {/* Three Steps Grid */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 mb-12 lg:mb-16"
                >
                    {steps.map((step, i) => (
                        <div key={i} className="text-center md:text-left">
                            {/* Number */}
                            <div className="text-4xl lg:text-5xl font-light text-[#05D16E] mb-3 lg:mb-4">
                                {step.num}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl lg:text-2xl font-bold text-[#024653] tracking-tight mb-4 lg:mb-6 whitespace-pre-line leading-tight">
                                {step.title}
                            </h3>

                            {/* Divider */}
                            <div className="w-12 h-px bg-[#024653]/10 mb-4 lg:mb-6 mx-auto md:mx-0" />

                            {/* Description */}
                            <p className="text-[#024653]/60 font-light text-sm lg:text-base leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* CTAs Row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-3xl mx-auto"
                >
                    {/* Zipcode Input */}
                    <div className={`flex items-center bg-white rounded-full px-5 py-3.5 shadow-[0_4px_20px_rgba(2,70,83,0.06)] border transition-all duration-300 w-full sm:w-auto sm:min-w-[220px] ${isFocused ? 'border-[#05D16E]/40 shadow-[0_4px_25px_rgba(5,209,110,0.1)]' : 'border-gray-100'}`}>
                        <MapPin size={18} className={isFocused ? 'text-[#05D16E]' : 'text-[#024653]/30'} />
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Enter Zipcode"
                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-base ml-2.5 w-full"
                        />
                    </div>

                    {/* Main CTA Button */}
                    <button
                        onClick={() => router.push('/quote')}
                        className="bg-[#024653] group text-white px-8 py-3.5 rounded-full font-semibold text-base flex items-center justify-center gap-3 hover:bg-[#02333d] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(2,70,83,0.2)] w-full sm:w-auto whitespace-nowrap"
                    >
                        Get Your Free Quote
                        <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
