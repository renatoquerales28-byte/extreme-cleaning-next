import Link from "next/link";
import Image from "next/image";
import HeroSection from "@/components/landing/HeroSection";
import SocialProofSection from "@/components/landing/SocialProofSection";
import ProcessSection from "@/components/landing/ProcessSection";
import StrategySection from "@/components/landing/StrategySection";
import FooterSection from "@/components/landing/FooterSection";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 glass-card rounded-full z-50 flex items-center gap-8 translate-y-0 animate-in fade-in slide-in-from-top-4 duration-1000 bg-white/50 backdrop-blur-md border border-white/20">
                <Link href="/" className="flex items-center gap-2">
                    <div className="relative w-12 h-12 overflow-hidden rounded-xl bg-white p-1.5 shadow-lg border border-slate-100">
                        <Image
                            src="/brand/logo.png"
                            alt="Extreme Cleaning Logo"
                            width={48}
                            height={48}
                            className="object-contain w-full h-full"
                        />
                    </div>
                </Link>
                <div className="hidden md:flex items-center gap-6 text-sm font-bold text-slate-500 uppercase tracking-widest">
                    <Link href="/services" className="hover:text-black transition-colors">Services</Link>
                    <Link href="/about" className="hover:text-black transition-colors">About</Link>
                    <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
                </div>
                <Link href="/quote" className="px-5 py-2 bg-black text-white rounded-full text-xs font-bold uppercase tracking-widest hover:scale-105 transition-transform">
                    Get Quote
                </Link>
            </nav>

            {/* Landing Page Content Assembled from Components */}
            <div className="w-full flex flex-col gap-0 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <HeroSection />
                <SocialProofSection />
                <ProcessSection />
                <StrategySection />
                <FooterSection />
            </div>
        </div>
    );
}
