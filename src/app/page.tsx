import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/landing/HeroSection";
import ProblemSolutionSection from "@/components/landing/ProblemSolutionSection";
import ServicesSection from "@/components/landing/ServicesSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#F9F8F2] selection:bg-accent selection:text-white">
            {/* Sticky Navigation */}
            <nav className="fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 glass-card rounded-full z-50 flex items-center gap-8 bg-white/70 backdrop-blur-xl border border-white/40 shadow-xl shadow-black/5 w-fit max-w-[90vw]">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative w-10 h-10 overflow-hidden rounded-xl bg-brand-dark p-1.5 shadow-lg border border-white/20 transition-transform group-hover:scale-105">
                        <Image
                            src="/brand/logo.png"
                            alt="ECS Logo"
                            width={40}
                            height={40}
                            className="object-contain w-full h-full brightness-0 invert"
                        />
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-8 text-[11px] font-black text-slate-500 uppercase tracking-[0.2em]">
                    <Link href="#services" className="hover:text-brand-dark transition-colors">Services</Link>
                    <Link href="#process" className="hover:text-brand-dark transition-colors">Process</Link>
                    <Link href="#reviews" className="hover:text-brand-dark transition-colors">Reviews</Link>
                </div>
                <div className="h-6 w-px bg-slate-200 hidden md:block" />
                <Link href="/quote" className="px-6 py-2.5 bg-brand-dark text-white rounded-full text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-lg hover:bg-black">
                    Get Quote
                </Link>
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
