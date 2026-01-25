"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function ProcessSection() {
    const steps = [
        {
            num: "01",
            title: "Customize",
            desc: "Select your service type and tell us about your space in 60 seconds."
        },
        {
            num: "02",
            title: "Connect",
            desc: "Get an instant transparent price. No hidden fees, ever."
        },
        {
            num: "03",
            title: "Clean",
            desc: "We arrive on time, equipped, and ready to transform your space."
        }
    ];

    return (
        <section className="py-24 bg-[#024653] text-white relative overflow-hidden" id="process">
            {/* Background Line Animation - Premium Teal Accent */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-[#0E6168] -translate-y-1/2 hidden md:block" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8 lg:px-6">
                    <div className="space-y-4 max-w-xl">
                        <span className="text-[#05D16E] font-black tracking-[0.2em] text-xs uppercase">Simplicity First</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white leading-[0.9]">
                            From Chaos to <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05D16E] to-[#1D7F7F]">Calm in 3 Steps.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative lg:px-6">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            {/* Number Background */}
                            <span className="absolute -top-10 -left-6 text-[140px] font-black text-white/[0.03] select-none z-0 transition-all duration-700 group-hover:text-white/[0.08] group-hover:-translate-y-2">
                                {step.num}
                            </span>

                            <div className="relative z-10 pt-12 md:pt-16">
                                <div className="w-6 h-6 rounded-full bg-[#05D16E] border-4 border-[#024653] mb-8 relative md:absolute md:-top-3 md:left-0 md:transform md:-translate-y-1/2 shadow-xl shadow-[#05D16E]/20" />

                                <h3 className="text-2xl font-black tracking-tight mb-4 uppercase">{step.title}</h3>
                                <p className="text-white/40 font-medium leading-relaxed mb-6 max-w-xs font-opensans">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <Link href="/quote" className="btn-accent px-12 py-5 shadow-2xl shadow-[#05D16E]/10 flex items-center gap-3">
                        Start Your Quote <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
