"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Twitter, ArrowRight } from "lucide-react";

export default function FooterSection() {
    return (
        <footer className="w-full bg-[#F9F8F2] text-[#024653] h-screen min-h-[700px] flex flex-col justify-center snap-start relative z-10 overflow-hidden">
            <div className="max-w-[1700px] w-full mx-auto px-6 lg:px-10 flex flex-col justify-between h-[85%] lg:h-[75%]">

                {/* --- TOP ROW --- */}
                <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-0">
                    {/* Newsletter Side */}
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                            ECS Excellence in <br />
                            your mailbox
                        </h2>

                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-widest text-[#024653]/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E]" />
                                Email address
                            </div>
                            <div className="relative group w-[320px] md:w-[400px]">
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-white border border-[#024653]/10 px-6 py-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all font-normal text-[#024653]"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-black text-white rounded-full text-[10px] font-medium uppercase tracking-widest hover:bg-[#024653] transition-all">
                                    Send
                                </button>
                            </div>
                            <label className="flex items-center gap-3 cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-[#024653]/10 accent-[#024653]" />
                                <span className="text-[10px] font-normal text-[#024653]/40 group-hover:text-[#024653]/60 transition-colors">
                                    I agree to the <Link href="/privacy" className="underline underline-offset-2">privacy statement</Link>
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Big Agency Logo Style */}
                    <div className="flex flex-col items-start lg:items-end lg:text-right space-y-1">
                        <div className="relative h-16 w-48 md:w-64">
                            <Image
                                src="/brand/logo-full.png"
                                alt="ECS Logo"
                                fill
                                className="object-contain object-left lg:object-right"
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(464%) hue-rotate(142deg) brightness(91%) contrast(97%)'
                                }}
                            />
                        </div>
                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#024653] leading-tight">
                            PREMIUM <br /> CLEANING <br /> AGENCY
                        </p>
                    </div>
                </div>

                {/* --- SEPARATOR LINE --- */}
                <div className="w-full h-px bg-[#024653]/10" />

                {/* --- MIDDLE ROW --- */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-0 h-fit">
                    {/* Primary Links */}
                    <div className="lg:col-span-5 grid grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <h4 className="text-[10px] font-normal uppercase tracking-widest text-[#024653]/30">Directly to</h4>
                            <nav className="flex flex-col gap-4 text-sm font-normal">
                                <Link href="#vision" className="hover:opacity-60 transition-opacity">Vision</Link>
                                <Link href="#cases" className="hover:opacity-60 transition-opacity">Cases</Link>
                                <Link href="#solutions" className="group flex items-center gap-2 hover:opacity-60 transition-opacity">
                                    Solutions <span className="text-[8px] transform group-hover:translate-x-1 transition-transform">▼</span>
                                </Link>
                            </nav>
                        </div>
                        <div className="space-y-6 pt-10">
                            <nav className="flex flex-col gap-4 text-sm font-normal">
                                <Link href="/about" className="hover:opacity-60 transition-opacity">About ECS</Link>
                                <Link href="/updates" className="hover:opacity-60 transition-opacity">Updates</Link>
                                <Link href="/work" className="group flex items-center gap-2 hover:opacity-60 transition-opacity">
                                    Work <span className="text-[8px] transform group-hover:translate-x-1 transition-transform">▼</span>
                                </Link>
                            </nav>
                        </div>
                    </div>

                    {/* Locations Grid */}
                    <div className="lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-4">
                        {[
                            { name: "ECS Spokane", addr: "509 N Howard St", city: "Spokane, WA 99201", country: "United States", phone: "+1 (509) 123-4567" },
                            { name: "ECS Liberty", addr: "8017 Liberty Lake", city: "Spokane, WA 99019", country: "United States", phone: "+1 (509) 123-4568" },
                            { name: "ECS Valley", addr: "1013 BC Broadway", city: "Spokane, WA 99206", country: "United States", phone: "+1 (509) 123-4569" }
                        ].map((loc, i) => (
                            <div key={i} className="space-y-5">
                                <div className="space-y-1">
                                    <h4 className="text-[10px] font-bold text-[#024653]">{loc.name}</h4>
                                    <div className="text-[10px] space-y-0.5 font-normal leading-relaxed opacity-60">
                                        <p>{loc.addr}</p>
                                        <p>{loc.city}</p>
                                        <p>{loc.country}</p>
                                        <p className="pt-1">{loc.phone}</p>
                                    </div>
                                </div>
                                <button className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#E1F724] text-[#024653] rounded-full text-[10px] font-bold uppercase tracking-widest hover:scale-105 transition-all">
                                    Route <span className="text-lg leading-none">→</span>
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* --- SEPARATOR LINE --- */}
                <div className="w-full h-px bg-[#024653]/10" />

                {/* --- BOTTOM ROW --- */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2 text-xs font-normal">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#E1F724]" />
                        <span className="opacity-80">info@ecscleaningspot.com</span>
                    </div>

                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            {[Linkedin, Instagram, Twitter].map((Icon, i) => (
                                <Link key={i} href="#" className="w-8 h-8 rounded-full border border-[#024653]/10 flex items-center justify-center hover:bg-[#024653] hover:text-white transition-all">
                                    <Icon size={14} />
                                </Link>
                            ))}
                        </div>
                        <Link href="/privacy" className="text-[10px] font-normal text-[#024653]/60 hover:text-[#024653] transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

            </div>

            {/* Fixed copyright at the very bottom edge */}
            <div className="absolute bottom-6 left-0 right-0 text-center opacity-10">
                <p className="text-[8px] font-normal uppercase tracking-[0.3em]">
                    © 2025 Extreme Cleaning 509 LLC. All rights reserved.
                </p>
            </div>
        </footer>
    );
}
