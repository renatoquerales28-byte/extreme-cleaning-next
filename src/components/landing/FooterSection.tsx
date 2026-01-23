"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Instagram, Facebook, Twitter, MapPin, Mail, Phone } from "lucide-react";

export default function FooterSection() {
    return (
        <footer className="w-full max-w-7xl mx-auto px-4 pb-8 space-y-6">

            {/* About Card */}
            <div className="bg-slate-100/50 rounded-[3rem] p-12 md:p-20 text-center space-y-8 border border-slate-200/50">
                <h2 className="text-3xl font-black tracking-tighter text-brand-dark uppercase">About Us</h2>
                <p className="text-lg md:text-xl text-slate-500 font-medium max-w-3xl mx-auto leading-relaxed">
                    ECS isn&apos;t just cleaning; it&apos;s a restoration of peace. Founded in Spokane, our mission is to deliver <span className="text-brand-dark font-bold">extreme</span> precision for homes and businesses that demand more than just a surface wipe. We are the architects of shine.
                </p>
            </div>

            {/* Footer + CTA */}
            <div className="bg-brand-dark text-white rounded-[3rem] p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grain.png')] opacity-10 opacity-[0.03] mix-blend-overlay pointer-events-none" />

                <div className="grid md:grid-cols-4 gap-12 relative z-10">
                    <div className="md:col-span-2 space-y-8">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 bg-white rounded-xl p-2">
                                <Image src="/brand/logo.png" alt="Logo" width={40} height={40} className="w-full h-full object-contain" />
                            </div>
                            <span className="text-2xl font-black tracking-tighter">Extreme Cleaning</span>
                        </div>
                        <p className="text-brand-light/60 font-medium max-w-md">
                            Spokane&apos;s Premier Cleaning Service. Licensed, Bonded, and Insured for your peace of mind.
                        </p>
                        <div className="flex gap-4">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <button key={i} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent hover:text-brand-dark transition-all">
                                    <Icon size={20} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black uppercase tracking-widest text-brand-light text-sm">Contact</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/80">
                            <li className="flex items-center gap-3"><MapPin size={16} className="text-accent" /> Spokane, WA 99201</li>
                            <li className="flex items-center gap-3"><Mail size={16} className="text-accent" /> hello@extremecleaning.com</li>
                            <li className="flex items-center gap-3"><Phone size={16} className="text-accent" /> (509) 555-0123</li>
                        </ul>
                    </div>

                    <div className="space-y-6">
                        <h4 className="font-black uppercase tracking-widest text-brand-light text-sm">Services</h4>
                        <ul className="space-y-4 text-sm font-medium text-white/80">
                            <li><Link href="/services" className="hover:text-accent transition-colors">Residential Deep Clean</Link></li>
                            <li><Link href="/services" className="hover:text-accent transition-colors">Commercial Janitorial</Link></li>
                            <li><Link href="/services" className="hover:text-accent transition-colors">Airbnb Turnovers</Link></li>
                            <li><Link href="/services" className="hover:text-accent transition-colors">Move-In / Move-Out</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-white/40 uppercase tracking-widest">
                    <p>© 2024 Extreme Cleaning Solutions.</p>
                    <div className="flex gap-8">
                        <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                    </div>
                </div>
            </div>

        </footer>
    );
}
