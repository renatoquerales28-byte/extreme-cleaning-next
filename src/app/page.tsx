"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// Deployment version bump
import Image from "next/image";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import ServicesSection from "@/components/landing/ServicesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import FooterSection from "@/components/landing/FooterSection";
import { AnimatePresence, motion } from "framer-motion";

import { Instagram, Facebook, Sparkles } from "lucide-react";

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const heroSection = document.getElementById('hero-section');
            if (heroSection) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                // Trigger when hero is 80% out of view
                setScrolled(heroBottom < 150);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-white selection:bg-accent selection:text-white">
            {/* Modular Navbar Container */}
            <div className="fixed top-6 left-6 right-6 z-50 pointer-events-none flex justify-between items-center h-[76px]">

                {/* Left Piece (Macho) - Identity & Nav */}
                <motion.nav
                    initial={false}
                    animate={{
                        width: scrolled ? "auto" : "fit-content",
                        paddingRight: scrolled ? "4.5rem" : "3rem",
                        backgroundColor: scrolled ? "rgba(255, 255, 255, 0.9)" : "rgba(255, 255, 255, 0.4)",
                    }}
                    transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                    className="pointer-events-auto backdrop-blur-xl border border-white/20 shadow-xl rounded-[2.5rem] flex items-center gap-10 pl-8 h-full relative"
                >
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="relative h-9 w-28 md:h-10 md:w-32 overflow-hidden">
                            <Image
                                src="/brand/logo-full.png"
                                alt="ECS Logo"
                                fill
                                className="object-contain transition-opacity duration-300 opacity-100 group-hover:opacity-80"
                            />
                        </div>
                    </Link>

                    <div className="hidden lg:flex items-center gap-8 text-[11px] font-black text-[#024653]/70 uppercase tracking-[0.2em]">
                        <Link href="#services" className="hover:text-[#024653] transition-colors">Services</Link>
                        <Link href="#process" className="hover:text-[#024653] transition-colors">Process</Link>
                        <Link href="#reviews" className="hover:text-[#024653] transition-colors">Reviews</Link>
                    </div>

                    {/* Macho Convex Tip */}
                    <motion.div
                        initial={false}
                        animate={{
                            opacity: scrolled ? 1 : 0,
                            x: scrolled ? 0 : -20
                        }}
                        className="absolute right-0 top-0 bottom-0 w-8 flex items-center justify-end pointer-events-none"
                    >
                        <div
                            className="w-8 h-full bg-white/90"
                            style={{
                                clipPath: "path('M 0 0 C 20 0, 32 20, 32 50 C 32 80, 20 100, 0 100 Z')",
                                transform: "translateX(100%)"
                            }}
                        />
                    </motion.div>

                    {/* Mobile Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#024653]/5 text-[#024653] mr-2"
                    >
                        <div className="w-5 flex flex-col gap-1">
                            <span className={`w-full h-0.5 bg-current rounded-full transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                            <span className={`w-full h-0.5 bg-current rounded-full transition-opacity ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                            <span className={`w-full h-0.5 bg-current rounded-full transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                        </div>
                    </button>
                </motion.nav>

                {/* Right Piece (Hembra) - Action & Social */}
                <AnimatePresence>
                    {scrolled && (
                        <motion.nav
                            initial={{ x: 100, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: 100, opacity: 0 }}
                            transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
                            className="pointer-events-auto bg-[#024653] shadow-2xl rounded-full flex items-center h-full relative"
                        >
                            {/* Hembra Concave Cutout */}
                            <div
                                className="absolute left-0 top-0 bottom-0 w-8 -translate-x-full"
                                style={{
                                    background: "#024653",
                                    clipPath: "path('M 32 0 L 32 100 L 0 100 C 12 80, 0 70, 0 50 C 0 30, 12 20, 0 0 L 0 0 Z')"
                                }}
                            />

                            <div className="flex items-center gap-8 pl-6 pr-4">
                                {/* Minimalist Social Icons */}
                                <div className="flex items-center gap-5 text-white/40">
                                    <a href="#" className="hover:text-[#08BF5F] transition-colors"><Instagram size={18} strokeWidth={2.5} /></a>
                                    <a href="#" className="hover:text-[#08BF5F] transition-colors"><Facebook size={18} strokeWidth={2.5} /></a>
                                </div>

                                {/* Get Quote Button */}
                                <Link
                                    href="/quote"
                                    className="px-10 py-3.5 bg-[#08BF5F] text-[#024653] rounded-full text-[11px] font-black uppercase tracking-[0.2em] hover:brightness-110 active:scale-95 transition-all shadow-lg shadow-[#08BF5F]/30 whitespace-nowrap"
                                >
                                    Get Quote
                                </Link>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-x-6 top-32 z-40 bg-white rounded-[2.5rem] p-8 shadow-2xl lg:hidden flex flex-col gap-6"
                    >
                        <Link href="#services" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-[#024653]">Services</Link>
                        <Link href="#process" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-[#024653]">Process</Link>
                        <Link href="#reviews" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-black text-[#024653]">Reviews</Link>
                        <div className="h-px bg-[#024653]/10" />
                        <Link href="/quote" onClick={() => setMobileMenuOpen(false)} className="w-full py-5 bg-[#08BF5F] text-[#024653] rounded-2xl font-black uppercase text-center shadow-lg shadow-[#08BF5F]/20">Get My Quote</Link>
                    </motion.div>
                )}
            </AnimatePresence>

            <HeroSection />
            <ProblemSolutionSection />
            <ServicesSection />
            <div id="process"><ProcessSection /></div>
            <div id="reviews"><SocialProofSection /></div>
            <FooterSection />
        </main>
    );
}
