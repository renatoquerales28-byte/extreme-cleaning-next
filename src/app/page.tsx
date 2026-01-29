"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import ServicesSection from "@/components/landing/ServicesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import FooterSection from "@/components/landing/FooterSection";
import { AnimatePresence, motion } from "framer-motion";

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <main className="min-h-screen bg-white selection:bg-accent selection:text-white">
            {/* Sticky Navigation - Full Width Glassmorphism */}
            <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-white/20">
                <div className="container mx-auto px-6 py-4 md:py-5 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="relative h-8 md:h-10 w-24 md:w-32 overflow-hidden">
                            <Image
                                src="/brand/logo-full.png"
                                alt="ECS Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                    <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                        <Link href="#services" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-2 decoration-[#05D16E] transition-all">Services</Link>
                        <Link href="#process" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-2 decoration-[#05D16E] transition-all">Process</Link>
                        <Link href="#reviews" className="hover:text-brand-dark hover:underline underline-offset-4 decoration-2 decoration-[#05D16E] transition-all">Reviews</Link>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="hidden md:block">
                            <Link href="/quote" className="px-6 py-2.5 bg-brand-dark text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:bg-black transition-colors shadow-lg hover:shadow-xl">
                                Get Quote
                            </Link>
                        </div>

                        {/* Mobile Menu Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-brand-dark"
                        >
                            <div className="w-5 flex flex-col gap-1">
                                <span className={`w-full h-0.5 bg-current rounded-full transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                                <span className={`w-full h-0.5 bg-current rounded-full transition-opacity ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                                <span className={`w-full h-0.5 bg-current rounded-full transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 p-6 shadow-xl flex flex-col gap-4 md:hidden z-40">
                        <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black tracking-tighter text-brand-dark border-b border-slate-100 pb-3">Services</Link>
                        <Link href="#process" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black tracking-tighter text-brand-dark border-b border-slate-100 pb-3">Process</Link>
                        <Link href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-xl font-black tracking-tighter text-brand-dark border-b border-slate-100 pb-3">Reviews</Link>
                        <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="w-full py-4 bg-accent text-brand-dark rounded-2xl font-black uppercase tracking-widest text-center shadow-xl shadow-accent/20 text-sm">Get My Quote</Link>
                    </div>
                )}
            </nav>

            <HeroSection />
            <ProblemSolutionSection />
            <ServicesSection />
            <div id="process"><ProcessSection /></div>
            <div id="reviews"><SocialProofSection /></div>
            <FooterSection />
        </main>
    );
}
