"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// Deployment version bump
import Image from "next/image";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import ServicesSection from "@/components/landing/ServicesSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import ServiceSelectorSection from "@/components/home/ServiceSelectorSection";
import LegacySocialProof from "@/components/landing/SocialProofSection"; // Renaming old to avoid collision if still needed
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
        <main className="min-h-screen bg-[#F9F8F2] selection:bg-accent selection:text-white">
            {/* Conventional Header - 60px version */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[60px] bg-[#F9F8F2]/80 backdrop-blur-xl border-b border-white/20 ${scrolled
                    ? "shadow-sm"
                    : ""
                    }`}
            >
                <div className="max-w-[1700px] mx-auto h-full px-6 lg:px-10 flex items-center justify-between">
                    {/* Left: Logo (48px height) */}
                    <Link href="/" className="flex items-center gap-2 group shrink-0">
                        <div className="relative h-12 w-32 md:w-36 overflow-hidden">
                            <Image
                                src="/brand/logo-full.png"
                                alt="ECS Logo"
                                fill
                                style={{
                                    filter: 'brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(464%) hue-rotate(142deg) brightness(91%) contrast(97%)'
                                }}
                                className="object-contain object-left transition-opacity duration-300 opacity-100 group-hover:opacity-80"
                            />
                        </div>
                    </Link>

                    {/* Center: Centered Nav Links */}
                    <nav className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center gap-12 text-[11px] font-normal text-[#024653] uppercase tracking-[0.2em]">
                        <Link href="#services" className="hover:opacity-70 transition-opacity">Services</Link>
                        <Link href="#process" className="hover:opacity-70 transition-opacity">Process</Link>
                        <Link href="#reviews" className="hover:opacity-70 transition-opacity">Reviews</Link>
                    </nav>

                    {/* Right: Conditional Action Button */}
                    <div className="flex items-center gap-4">
                        <AnimatePresence>
                            {scrolled && (
                                <motion.div
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className="flex items-center"
                                >
                                    <Link
                                        href="/quote"
                                        className="px-6 py-2 bg-[#024653] text-white rounded-xl text-[10px] font-normal uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#024653]/10 whitespace-nowrap"
                                    >
                                        Get Quote
                                    </Link>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Mobile Toggle */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="lg:hidden w-10 h-10 flex items-center justify-center rounded-full bg-[#024653]/5 text-[#024653]"
                        >
                            <div className="w-5 flex flex-col gap-1">
                                <span className={`w-full h-0.5 bg-current rounded-full transition-transform ${mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""}`} />
                                <span className={`w-full h-0.5 bg-current rounded-full transition-opacity ${mobileMenuOpen ? "opacity-0" : "opacity-100"}`} />
                                <span className={`w-full h-0.5 bg-current rounded-full transition-transform ${mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""}`} />
                            </div>
                        </button>
                    </div>
                </div>
            </header>

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

            {/* NEW STRATEGIC SECTIONS */}
            <ServiceSelectorSection />
            <ProcessSection />
            <SocialProofSection />

            <ProblemSolutionSection />
            <ServicesSection />
            <div id="reviews"><LegacySocialProof /></div>
            <FooterSection />
        </main>
    );
}
