import Link from "next/link";
import { Sparkles, ArrowRight } from "lucide-react";

export default function Home() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 py-20 text-center">
            <nav className="fixed top-8 left-1/2 -translate-x-1/2 px-6 py-3 glass-card rounded-full z-50 flex items-center gap-8 translate-y-0 animate-in fade-in slide-in-from-top-4 duration-1000">
                <span className="font-black tracking-tighter text-xl">Extreme<span className="text-cyan-500">Cleaning</span></span>
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
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 text-[10px] font-black uppercase tracking-widest text-slate-500">
                    <Sparkles className="text-cyan-500" size={12} /> Reimagining the Clean Experience
                </div>

                <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-900">
                    Pure <span className="text-fuchsia-500">Precision</span>.<br />
                    Extreme <span className="text-cyan-500">Shine</span>.
                </h1>

                <p className="max-w-xl mx-auto text-lg md:text-xl text-slate-500 font-medium">
                    Spokane&apos;s most advanced cleaning service, powered by meticulous detail and a passion for perfection.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                    <Link href="/quote" className="btn-sentient btn-sentient-fuchsia w-full sm:w-auto flex items-center justify-center gap-2">
                        Start Your Transformation <ArrowRight size={20} />
                    </Link>
                    <Link href="/services" className="px-8 py-4 border-2 border-slate-200 rounded-full font-bold hover:bg-slate-50 transition-colors w-full sm:w-auto">
                        Explore Services
                    </Link>
                </div>
            </div>
        </div>
    );
}
