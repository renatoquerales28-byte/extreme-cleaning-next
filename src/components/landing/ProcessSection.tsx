"use client";

import React from "react";

export default function ProcessSection() {
    return (
        <section className="py-20 px-4 w-full max-w-7xl mx-auto">
            <div className="bg-slate-50/50 rounded-[3rem] p-12 border border-slate-100">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark">
                        How ECS Works?
                    </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((step) => (
                        <div key={step} className="aspect-square glass-card rounded-[2.5rem] flex flex-col items-center justify-center relative overlow-hidden group hover:scale-[1.02] transition-transform duration-500">
                            <span className="text-9xl font-black text-slate-100 group-hover:text-brand-light/10 transition-colors pointer-events-none absolute select-none">
                                {step}
                            </span>
                            <div className="relative z-10 text-center px-6">
                                <h3 className="text-xl font-black uppercase tracking-widest text-brand-dark mb-2">Step {step}</h3>
                                <p className="text-slate-500 font-medium text-sm">
                                    {step === 1 ? "Enter your zip code & details." :
                                        step === 2 ? "Customize your cleaning plan." :
                                            "Enjoy your spotless sanctuary."}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
