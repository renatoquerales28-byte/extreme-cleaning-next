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
