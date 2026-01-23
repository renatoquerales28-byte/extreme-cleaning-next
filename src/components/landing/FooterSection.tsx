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
                        <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-brand-dark leading-[0.85]">
                            Ready for the <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-600">Upgrade?</span>
                        </h2>
                        <p className="text-lg text-slate-500 font-medium">Join happy customers in Spokane who have reclaimed their time.</p>
                    </div>
                    <div className="flex justify-start md:justify-end">
                        <Link href="/quote" className="btn-sentient btn-sentient-fuchsia px-10 py-6 text-xl shadow-2xl shadow-emerald-500/30 flex items-center gap-4">
                            Book Now <ArrowRight size={24} strokeWidth={3} />
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
                        <h4 className="font-black text-brand-dark uppercase tracking-widest text-xs mb-6">Company</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><Link href="#" className="hover:text-brand-dark transition-colors">About Us</Link></li>
                            <li><Link href="#" className="hover:text-brand-dark transition-colors">Careers</Link></li>
                            <li><Link href="#" className="hover:text-brand-dark transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-brand-dark uppercase tracking-widest text-xs mb-6">Services</h4>
                        <ul className="space-y-4 text-sm font-medium text-slate-500">
                            <li><Link href="/quote?type=residential" className="hover:text-brand-dark transition-colors">Residential</Link></li>
                            <li><Link href="/quote?type=commercial" className="hover:text-brand-dark transition-colors">Commercial</Link></li>
                            <li><Link href="/quote?type=residential&intensity=move" className="hover:text-brand-dark transition-colors">Move In/Out</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-black text-brand-dark uppercase tracking-widest text-xs mb-6">Connect</h4>
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-dark hover:border-brand-dark transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:text-brand-dark hover:border-brand-dark transition-all">
                                <Facebook size={18} />
                            </a>
                        </div>
                    </div>
                </div>

                <div className="py-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">© 2025 Extreme Cleaning 509 LLC. All rights reserved.</p>
                    <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest">Designed in Spokane, WA</p>
                </div>
            </div>
        </footer>
    );
}
