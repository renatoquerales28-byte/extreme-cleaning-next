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
            className="w-full bg-transparent h-screen flex flex-col justify-center py-12 lg:py-0 relative"
            id="process"
        >
            <div className="max-w-[1000px] mx-auto px-6 lg:px-8 w-full">

                {/* Header Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 lg:mb-12"
                >
                    {/* Eyebrow */}
                    <p className="text-xs uppercase tracking-[0.3em] text-[#024653]/50 mb-3 lg:mb-4">
                        Our Process
                    </p>

                    {/* Main Headline */}
                    <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-normal leading-[1.15] tracking-tight text-[#024653] mb-4 lg:mb-5">
                        Premium Cleaning Services,<br />
                        From <span className="font-bold">Chaos to Calm</span>
                    </h2>

                    {/* Subtitle */}
                    <p className="text-[#024653]/60 font-light text-sm lg:text-base max-w-xl mx-auto leading-relaxed">
                        We specialize in providing top-tier cleaning solutions tailored to your needs. Our expertise spans
                        residential deep cleaning, commercial maintenance, and specialized post-construction services.
                    </p>
                </motion.div>

                {/* Three Steps Grid - More Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10 mb-10 lg:mb-12"
                >
                    {steps.map((step, i) => (
                        <div key={i} className="text-center md:text-left">
                            {/* Number */}
                            <div className="text-3xl lg:text-4xl font-light text-[#05D16E] mb-2 lg:mb-3">
                                {step.num}
                            </div>

                            {/* Title */}
                            <h3 className="text-lg lg:text-xl font-bold text-[#024653] tracking-tight mb-3 lg:mb-4 whitespace-pre-line leading-tight">
                                {step.title}
                            </h3>

                            {/* Divider */}
                            <div className="w-10 h-px bg-[#024653]/10 mb-3 lg:mb-4 mx-auto md:mx-0" />

                            {/* Description */}
                            <p className="text-[#024653]/60 font-light text-xs lg:text-sm leading-relaxed">
                                {step.desc}
                            </p>
                        </div>
                    ))}
                </motion.div>

                {/* CTAs Row - Compact */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="flex flex-col sm:flex-row gap-3 justify-center items-center max-w-2xl mx-auto"
                >
                    {/* Zipcode Input */}
                    <div className={`flex items-center bg-white rounded-full px-4 py-3 shadow-[0_4px_20px_rgba(2,70,83,0.06)] border transition-all duration-300 w-full sm:w-auto sm:min-w-[200px] ${isFocused ? 'border-[#05D16E]/40 shadow-[0_4px_25px_rgba(5,209,110,0.1)]' : 'border-gray-100'}`}>
                        <MapPin size={16} className={isFocused ? 'text-[#05D16E]' : 'text-[#024653]/30'} />
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => setZipCode(e.target.value.replace(/\D/g, '').slice(0, 5))}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Enter Zipcode"
                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-sm ml-2 w-full"
                        />
                    </div>

                    {/* Main CTA Button */}
                    <button
                        onClick={() => router.push('/quote')}
                        className="bg-[#024653] group text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#02333d] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(2,70,83,0.2)] w-full sm:w-auto whitespace-nowrap"
                    >
                        Get Your Free Quote
                        <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                    </button>
                </motion.div>

            </div>
        </section>
    );
}
