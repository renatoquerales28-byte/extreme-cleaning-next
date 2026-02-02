"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Linkedin, Twitter, ArrowRight } from "lucide-react";

export default function FooterSection() {
    return (
        <footer className="w-full bg-[#F9F8F2] text-[#024653] py-20 lg:py-32 relative z-[100]">
            <div className="max-w-[1700px] w-full mx-auto px-6 lg:px-10">

                {/* TOP SECTION: Newsletter & Large Logo */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-start">

                    {/* Newsletter Side */}
                    <div className="space-y-10">
                        <h2 className="text-4xl lg:text-5xl font-light leading-tight tracking-tight">
                            ECS Excellence in <br />
                            <span className="font-black italic underline decoration-[#05D16E] decoration-4 underline-offset-8">your mailbox</span>
                        </h2>

                        <div className="space-y-5">
                            <div className="flex items-center gap-2 text-[10px] font-normal uppercase tracking-widest text-[#024653]/60">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E]" />
                                Email address
                            </div>
                            <div className="relative group max-w-md">
                                <input
                                    type="email"
                                    placeholder="name@example.com"
                                    className="w-full bg-white border border-[#024653]/10 px-6 py-4 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all font-normal text-[#024653]"
                                />
                                <button className="absolute right-1.5 top-1.5 bottom-1.5 px-6 bg-[#024653] text-white rounded-full text-xs font-medium uppercase tracking-widest hover:bg-[#0E6168] transition-all">
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

                    {/* Logo Side */}
                    <div className="flex flex-col items-start lg:items-end lg:text-right space-y-3 pt-4">
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
                        <p className="text-[10px] font-normal uppercase tracking-[0.3em] text-[#024653]/40 leading-relaxed">
                            Premium <br /> Cleaning <br /> Professionals
                        </p>
                    </div>
                </div>

                {/* MIDDLE SECTION: Links & Contact */}
                <div className="border-t border-[#024653]/10 pt-16 pb-16">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

                        {/* Nav Links Column */}
                        <div className="md:col-span-2 grid grid-cols-2 gap-4">
                            <div className="space-y-6">
                                <h4 className="text-[10px] font-normal uppercase tracking-widest text-[#024653]/30">Explore</h4>
                                <nav className="flex flex-col gap-5 text-sm font-normal">
                                    <Link href="#services" className="hover:translate-x-1 transition-transform">Services</Link>
                                    <Link href="#process" className="hover:translate-x-1 transition-transform">Process</Link>
                                    <Link href="#reviews" className="hover:translate-x-1 transition-transform">Reviews</Link>
                                </nav>
                            </div>
                            <div className="space-y-6">
                                <nav className="flex flex-col gap-5 text-sm font-normal pt-10">
                                    <Link href="/about" className="hover:translate-x-1 transition-transform">About Us</Link>
                                    <Link href="/contact" className="hover:translate-x-1 transition-transform">Contact</Link>
                                    <Link href="/quote" className="hover:translate-x-1 transition-transform text-[#05D16E] font-medium">Get Quote</Link>
                                </nav>
                            </div>
                        </div>

                        {/* Location Column 1 */}
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-normal uppercase tracking-widest text-[#024653]/30">ECS Spokane</h4>
                            <div className="text-xs space-y-1 font-normal leading-relaxed opacity-60">
                                <p>509 N Howard St</p>
                                <p>Spokane, WA 99201</p>
                                <p>United States</p>
                                <p className="pt-2 font-medium opacity-100">+1 (509) 123-4567</p>
                            </div>
                            <Link href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-[#05D16E]/10 text-[#024653] rounded-full text-[10px] font-normal uppercase tracking-widest hover:bg-[#05D16E]/20 transition-all">
                                Route <ArrowRight size={14} />
                            </Link>
                        </div>

                        {/* Location Column 2 */}
                        <div className="space-y-8">
                            <h4 className="text-[10px] font-normal uppercase tracking-widest text-[#024653]/30">Service Area</h4>
                            <div className="text-xs space-y-1 font-normal leading-relaxed opacity-60">
                                <p>Greater Spokane Area</p>
                                <p>Liberty Lake, WA</p>
                                <p>Cheney, WA</p>
                                <p className="pt-2 font-medium opacity-100">info@ecscleaningspot.com</p>
                            </div>
                            <Link href="/quote" className="inline-flex items-center gap-2 px-6 py-3 bg-[#05D16E]/10 text-[#024653] rounded-full text-[10px] font-normal uppercase tracking-widest hover:bg-[#05D16E]/20 transition-all">
                                Get Clean <ArrowRight size={14} />
                            </Link>
                        </div>

                    </div>
                </div>

                {/* BOTTOM SECTION: Socials & Email */}
                <div className="border-t border-[#024653]/10 pt-10 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-3 text-xs font-normal">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E]" />
                        <span className="opacity-80">info@ecscleaningspot.com</span>
                    </div>

                    <div className="flex items-center gap-10">
                        <div className="flex items-center gap-8 text-[#024653]/50">
                            <Link href="#" className="hover:text-[#024653] transition-colors"><Linkedin size={20} /></Link>
                            <Link href="#" className="hover:text-[#024653] transition-colors"><Instagram size={20} /></Link>
                            <Link href="#" className="hover:text-[#024653] transition-colors"><Facebook size={20} /></Link>
                        </div>
                        <Link href="/privacy" className="text-[10px] font-normal uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors">
                            Privacy Policy
                        </Link>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-16 text-center border-t border-[#024653]/5 pt-8">
                    <p className="text-[9px] font-normal uppercase tracking-[0.3em] text-[#024653]/20">
                        © 2025 Extreme Cleaning 509 LLC. All rights reserved.
                    </p>
                </div>

            </div>
        </footer>
    );
}
