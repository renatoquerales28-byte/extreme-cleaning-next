import Link from "next/link";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

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

            <div className="max-w-4xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cream text-[10px] font-black uppercase tracking-widest text-slate-500 border border-slate-200">
                    <Sparkles className="text-brand-light" size={12} /> Reimagining the Clean Experience
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-brand-dark">
                    Pure <span className="text-accent">Precision</span>.<br />
                    Extreme <span className="text-brand">Shine</span>.
                </h1>

                <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-500 font-medium">
                    Spokane&apos;s most advanced cleaning service, powered by meticulous detail and a passion for perfection.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <Link href="/quote" className="btn-sentient bg-accent text-brand-dark shadow-[0_0_20px_rgba(5,209,110,0.4)] hover:shadow-[0_0_30px_rgba(5,209,110,0.6)] w-full sm:w-auto flex items-center justify-center gap-2">
                        Start Your Transformation <ArrowRight size={20} />
                    </Link>
                    <Link href="/services" className="px-8 py-4 border-2 border-brand-light/30 text-brand-dark rounded-full font-bold hover:bg-white transition-colors w-full sm:w-auto">
                        Explore Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
