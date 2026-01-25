"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Instagram, Facebook, Twitter } from "lucide-react";

export default function FooterSection() {
    return (
        <footer className="bg-white pt-24 pb-8 border-t border-slate-100">
            <div className="container px-4 mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                    <div className="space-y-6 max-w-xl">
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                            Ready for the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Upgrade?</span>
                        </h2>
                        <p className="text-lg text-[#024653]/60 font-medium leading-relaxed">Join happy customers in Spokane who have reclaimed their time.</p>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <Link href="/quote" className="btn-accent px-12 py-6 text-xl shadow-2xl shadow-[#05D16E]/20 flex items-center gap-4 group">
                            Book Now <ArrowRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />
                        </Link>
                    </div>
                </div>

                <div className="grid md:grid-cols-4 gap-12 py-12 border-t border-slate-100">
                    <div className="col-span-1 md:col-span-1 space-y-6">
                        <Link href="/" className="block w-32 opacity-80 hover:opacity-100 transition-opacity">
                            <Image src="/brand/logo.png" alt="ECS" width={100} height={100} className="object-contain" />
                        </Link>
                        <p className="text-xs text-slate-400 font-medium leading-relaxed">
                            Top-tier professionalism, attention to detail, and reliable results. Serving Spokane, WA.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-black text-[#024653] uppercase tracking-widest text-[10px] mb-8 opacity-40">Company</h4>
                        <ul className="space-y-5 text-sm font-black text-[#024653]/60 uppercase tracking-widest">
                            <li><Link href="#" className="hover:text-[#05D16E] transition-all">About Us</Link></li>
                            <li><Link href="#" className="hover:text-[#05D16E] transition-all">Careers</Link></li>
                            <li><Link href="#" className="hover:text-[#05D16E] transition-all">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-[#024653] uppercase tracking-widest text-[10px] mb-8 opacity-40">Services</h4>
                        <ul className="space-y-5 text-sm font-black text-[#024653]/60 uppercase tracking-widest">
                            <li><Link href="/quote?type=residential" className="hover:text-[#05D16E] transition-all">Residential</Link></li>
                            <li><Link href="/quote?type=commercial" className="hover:text-[#05D16E] transition-all">Commercial</Link></li>
                            <li><Link href="/quote?type=residential&intensity=move" className="hover:text-[#05D16E] transition-all">Move In/Out</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-[#024653] uppercase tracking-widest text-[10px] mb-8 opacity-40">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-12 h-12 rounded-2xl bg-[#024653]/5 border border-[#024653]/5 flex items-center justify-center text-[#024653]/40 hover:text-white hover:bg-[#024653] transition-all shadow-sm">
                                <Instagram size={20} />
                            </a>
                            <a href="#" className="w-12 h-12 rounded-2xl bg-[#024653]/5 border border-[#024653]/5 flex items-center justify-center text-[#024653]/40 hover:text-white hover:bg-[#024653] transition-all shadow-sm">
                                <Facebook size={20} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">© 2025 Extreme Cleaning 509 LLC. All rights reserved.</p>
                    <div className="flex items-center gap-1.5 grayscale opacity-30">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Designed by</span>
                        <Image src="/brand/logo.png" alt="ECS" width={20} height={20} className="object-contain" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
