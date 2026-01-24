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
        <section className="py-24 bg-ecs-brand-dark text-white relative overflow-hidden" id="process">
            {/* Background Line Animation */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2 hidden md:block" />

            <div className="container px-4 mx-auto relative z-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                    <div className="space-y-4 max-w-lg container">
                        <span className="text-ecs-accent font-black tracking-[0.2em] text-xs uppercase">Simplicity First</span>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white leading-[0.9]">
                            From Chaos to <br />
                            <span className="text-ecs-brand-light">Calm in 3 Steps.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-12 relative">
                    {steps.map((step, i) => (
                        <div key={i} className="relative group">
                            {/* Number Background */}
                            <span className="absolute -top-10 -left-6 text-[120px] font-black text-white/5 select-none z-0 transition-colors group-hover:text-white/10">
                                {step.num}
                            </span>

                            <div className="relative z-10 pt-12 md:pt-16">
                                <div className="w-4 h-4 rounded-full bg-ecs-accent border-4 border-ecs-brand-dark mb-8 relative md:absolute md:-top-2 md:left-0 md:transform md:-translate-y-1/2" />

                                <h3 className="text-2xl font-black tracking-tight mb-4">{step.title}</h3>
                                <p className="text-white/60 font-medium leading-relaxed mb-6 max-w-xs">
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-20 flex justify-center">
                    <Link href="/quote" className="inline-flex h-14 items-center justify-center gap-2 rounded-2xl bg-white px-8 text-sm font-bold uppercase tracking-wide text-ecs-brand-dark transition-all hover:bg-ecs-secondary hover:scale-105">
                        Start Your Quote <ArrowRight size={20} />
                    </Link>
                </div>
            </div>
        </section>
    );
}
