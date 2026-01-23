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
    const [showNavButton, setShowNavButton] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 600) {
                setShowNavButton(true);
            } else {
                setShowNavButton(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-[#F9F8F2] selection:bg-accent selection:text-white">
            {/* Sticky Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 glass-card rounded-full z-50 flex items-center gap-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 w-fit max-w-[90vw] transition-all duration-300">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative h-10 w-32 overflow-hidden transition-transform group-hover:scale-105">
                        <Image
                            src="/brand/logo-full.png"
                            alt="ECS Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <Link href="#services" className="hover:text-brand-dark transition-colors">Services</Link>
                    <Link href="#process" className="hover:text-brand-dark transition-colors">Process</Link>
                    <Link href="#reviews" className="hover:text-brand-dark transition-colors">Reviews</Link>
                </div>

                <div className="flex items-center gap-4">
                    <AnimatePresence>
                        {showNavButton && (
                            <motion.div
                                initial={{ width: 0, opacity: 0, paddingLeft: 0 }}
                                animate={{ width: "auto", opacity: 1, paddingLeft: "1rem" }}
                                exit={{ width: 0, opacity: 0, paddingLeft: 0 }}
                                className="overflow-hidden flex items-center border-l border-slate-200"
                            >
                                <Link href="/quote" className="px-6 py-2.5 bg-brand-dark text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg hover:bg-black whitespace-nowrap">
                                    Get Quote
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 border border-slate-100 text-brand-dark"
                    >
                        <div className="w-5 flex flex-col gap-1">
                            <motion.span animate={{ rotate: mobileMenuOpen ? 45 : 0, y: mobileMenuOpen ? 4 : 0 }} className="w-full h-0.5 bg-current rounded-full" />
                            <motion.span animate={{ opacity: mobileMenuOpen ? 0 : 1 }} className="w-full h-0.5 bg-current rounded-full" />
                            <motion.span animate={{ rotate: mobileMenuOpen ? -45 : 0, y: mobileMenuOpen ? -4 : 0 }} className="w-full h-0.5 bg-current rounded-full" />
                        </div>
                    </button>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="absolute top-20 left-0 right-0 bg-white/95 backdrop-blur-2xl border border-white/20 rounded-[2rem] p-8 shadow-2xl flex flex-col gap-6 md:hidden z-40"
                        >
                            <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black tracking-tighter text-brand-dark border-b border-slate-100 pb-4">Services</Link>
                            <Link href="#process" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black tracking-tighter text-brand-dark border-b border-slate-100 pb-4">Process</Link>
                            <Link href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black tracking-tighter text-brand-dark border-b border-slate-100 pb-4">Reviews</Link>
                            <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-accent text-brand-dark rounded-2xl font-black uppercase tracking-widest text-center shadow-xl shadow-accent/20">Get My Quote</Link>
                        </motion.div>
                    )}
                </AnimatePresence>
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
