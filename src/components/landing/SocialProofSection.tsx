"use client";

import React from "react";
import { Star, CheckCircle2 } from "lucide-react";

export default function SocialProofSection() {
    const features = [
        "Kitchen Deep Clean",
        "Bedroom Sanitization",
        "Specialized Floor Care",
        "Bathroom Descaling",
        "Living Areas & Dusting",
        "ClubECS Membership"
    ];

    return (
        <section className="py-20 px-4 w-full max-w-7xl mx-auto space-y-16">

            {/* Validation Social */}
            <div className="bg-white/40 backdrop-blur-md border border-white/60 rounded-[3rem] p-12 text-center shadow-xl">
                <div className="flex flex-col items-center gap-4">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <Star key={i} className="text-emerald-500 fill-emerald-500" size={24} />
                        ))}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-dark">
                        Trusted by 500+ Spokane Families
                    </h2>
                    <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">
                        &quot;Extreme Cleaning transformed my home. The detail is unmatched.&quot;
                        <span className="block mt-2 text-sm font-bold text-brand-dark">- Sarah J., South Hill</span>
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* What Includes */}
                <div className="glass-panel p-10 rounded-[3rem] h-full flex flex-col justify-center">
                    <h3 className="text-2xl font-black tracking-tighter text-brand-dark mb-8 pl-4 border-l-4 border-accent">
                        What&apos;s Included?
                    </h3>
                    <ul className="space-y-4">
                        {features.map((item, idx) => (
                            <li key={idx} className="flex items-center gap-4 text-lg font-bold text-slate-600">
                                <div className="w-8 h-8 rounded-full bg-brand-light/10 text-brand-light flex items-center justify-center shrink-0">
                                    <CheckCircle2 size={16} />
                                </div>
                                {item}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Call to Action & Service Selection */}
                <div className="space-y-6">
                    <div className="glass-card p-12 rounded-[3rem] flex flex-col items-center justify-center text-center gap-4 hover:scale-[1.02] transition-transform duration-300">
                        <h3 className="text-2xl font-black tracking-tighter text-brand-dark">Ready to shine?</h3>
                        <button className="btn-sentient bg-brand-dark text-white w-full max-w-sm">
                            Get Your Quote
                        </button>
                    </div>

                    <div className="space-y-4">
                        {["Deep Cleaning Service", "Move-In / Move-Out", "Post-Party Recovery"].map((service, i) => (
                            <div key={i} className="px-8 py-6 rounded-[2rem] bg-slate-50 border border-slate-200 flex items-center gap-4 cursor-pointer hover:border-brand-light transition-colors group">
                                <div className="w-6 h-6 rounded-full border-2 border-slate-300 group-hover:border-brand-light group-hover:bg-brand-light/10 transition-all" />
                                <span className="font-bold text-slate-600 group-hover:text-brand-dark transition-colors">{service}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
