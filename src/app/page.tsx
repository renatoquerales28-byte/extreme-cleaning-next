"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
// Deployment version bump
import Image from "next/image";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofSection from "@/components/home/SocialProofSection";
import ServiceSelectorSection from "@/components/home/ServiceSelectorSection";
import ProcessSection from "@/components/landing/ProcessSection";
import AboutSection from "@/components/landing/AboutSection";
import FooterSection from "@/components/landing/FooterSection";
import { AnimatePresence, motion } from "framer-motion";

import { Instagram, Facebook, Sparkles } from "lucide-react";
import dynamic from "next/dynamic";

const ExtremeCleaningWizard = dynamic(() => import("@/components/wizard/ExtremeCleaningWizard"), {
    ssr: false,
});

export default function Home() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isOverAbout, setIsOverAbout] = useState(false);
    const [wizardOpen, setWizardOpen] = useState(false);

    useEffect(() => {
        // Check for query params to auto-open wizard
        const params = new URLSearchParams(window.location.search);
        if (params.get('quote') === 'true' || params.get('zip')) {
            setWizardOpen(true);
        }

        const handleScroll = () => {
            const heroSection = document.getElementById('hero-section');
            const aboutSection = document.getElementById('about');

            if (heroSection) {
                const heroBottom = heroSection.getBoundingClientRect().bottom;
                setScrolled(heroBottom < 150);
            }

            if (aboutSection) {
                const rect = aboutSection.getBoundingClientRect();
                setIsOverAbout(rect.top <= 60 && rect.bottom >= 60);
            }
        };

        window.addEventListener("scroll", handleScroll);
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <main className="min-h-screen bg-[#F9F8F2] selection:bg-accent selection:text-white light">
            {/* Conventional Header - 60px version */}
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 h-[60px] border-b border-white/20 ${isOverAbout
                    ? "bg-[#F9F8F2] shadow-md"
                    : "bg-[#F9F8F2]/80 backdrop-blur-xl"
                    } ${scrolled && !isOverAbout ? "shadow-sm" : ""}`}
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
                        <Link href="#about" className="hover:opacity-70 transition-opacity">About Us</Link>
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
                                    <button
                                        onClick={() => setWizardOpen(true)}
                                        className="px-6 py-2 bg-[#024653] text-white rounded-xl text-[10px] font-normal uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#024653]/10 whitespace-nowrap"
                                    >
                                        Get Quote
                                    </button>
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
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[60] bg-[#F9F8F2] flex flex-col lg:hidden"
                    >
                        {/* 1. Header inside Menu */}
                        <div className="h-[60px] px-6 flex items-center justify-between border-b border-[#024653]/5">
                            <Link href="#hero-section" onClick={() => setMobileMenuOpen(false)} className="relative h-7 w-24 shrink-0 overflow-hidden">
                                <Image
                                    src="/brand/logo-full.png"
                                    alt="ECS Logo"
                                    fill
                                    className="object-contain"
                                    style={{
                                        filter: "brightness(0) saturate(100%) invert(18%) sepia(87%) saturate(464%) hue-rotate(142deg) brightness(91%) contrast(97%)"
                                    }}
                                />
                            </Link>
                            <button
                                onClick={() => setMobileMenuOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#024653]/5 text-[#024653]"
                            >
                                <div className="w-5 h-5 flex flex-col items-center justify-center gap-1.5 relative">
                                    <span className="absolute w-full h-0.5 bg-current rotate-45" />
                                    <span className="absolute w-full h-0.5 bg-current -rotate-45" />
                                </div>
                            </button>
                        </div>

                        {/* 2. Navigation Content */}
                        <div className="flex-1 px-8 pt-16 flex flex-col justify-between pb-12">
                            <nav className="flex flex-col gap-8 text-[#024653]">
                                {[
                                    { label: 'Services', href: '#services' },
                                    { label: 'Process', href: '#process' },
                                    { label: 'About Us', href: '#about' },
                                ].map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="text-5xl font-light tracking-tight hover:italic transition-all"
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </nav>

                            {/* 3. Bottom Section: Search & Socials */}
                            <div className="space-y-12">
                                {/* Zip Code Block */}
                                <div className="space-y-4">
                                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#024653]/40">Get an instant quote</p>
                                    <div className="flex bg-white rounded-2xl p-1.5 shadow-sm border border-[#024653]/5">
                                        <input
                                            type="text"
                                            placeholder="Zip Code"
                                            className="flex-1 bg-transparent px-4 outline-none text-[#024653] text-sm font-medium"
                                        />
                                        <button
                                            onClick={() => {
                                                setMobileMenuOpen(false);
                                                setWizardOpen(true);
                                            }}
                                            className="bg-[#024653] text-white px-6 py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all"
                                        >
                                            Start
                                        </button>
                                    </div>
                                </div>

                                {/* Social Media & Copyright */}
                                <div className="flex items-center justify-between border-t border-[#024653]/5 pt-8">
                                    <div className="flex gap-6 text-[#024653]">
                                        <Link href="https://www.instagram.com/extremecleaning509/" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                                            IG
                                        </Link>
                                        <Link href="https://www.facebook.com/profile.php?id=100076351471060" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                                            FB
                                        </Link>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                                            TT
                                        </Link>
                                        <Link href="#" className="text-[10px] font-bold uppercase tracking-widest hover:opacity-50 transition-opacity">
                                            YT
                                        </Link>
                                    </div>
                                    <p className="text-[8px] font-medium uppercase tracking-widest text-[#024653]/30">© 2024 ECS</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <HeroSection onOpenWizard={(zip) => {
                if (zip) setWizardOpen(true); // Simplified for now
                setWizardOpen(true);
            }} />

            {/* NEW STRATEGIC SECTIONS */}
            <ServiceSelectorSection onOpenWizard={(type, intensity) => {
                setWizardOpen(true);
                // The URL state is handled within the component's handleContinue
            }} />
            <ProcessSection />
            <AboutSection />

            <FooterSection />

            {/* INTEGRATED WIZARD MODAL */}
            <ExtremeCleaningWizard
                isOpen={wizardOpen}
                onClose={() => setWizardOpen(false)}
            />
        </main>
    );
}
