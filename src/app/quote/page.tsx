import ExtremeCleaningWizard from "@/components/wizard/ExtremeCleaningWizard";
import Image from "next/image";
import { Star } from "lucide-react";

export default function QuotePage() {
    return (
        <div className="min-h-[100dvh] w-full bg-slate-50 flex items-center justify-center p-4 md:p-8 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-multiply pointer-events-none" />
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-light/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[50%] h-[50%] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Main Card Container - Fixed Dimensions for "Window" feel */}
            <div className="w-full max-w-6xl h-[700px] max-h-[90vh] bg-white rounded-[2rem] shadow-2xl flex overflow-hidden relative z-10 animate-in fade-in zoom-in duration-500 ring-1 ring-slate-900/5">

                {/* Left Panel - Visuals (40%) */}
                <div className="hidden lg:flex w-[40%] bg-brand-dark relative flex-col justify-between p-12 text-white overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1581578731117-104f2a41272c?q=80&w=1974&auto=format&fit=crop')] bg-cover bg-center opacity-40 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/40 to-brand-dark/90" />

                    {/* Content over image */}
                    <div className="relative z-10">
                        <div className="w-48 mb-8">
                            <Image src="/brand/logo-full.png" alt="Extreme Cleaning Logo" width={200} height={60} className="object-contain brightness-0 invert" />
                        </div>
                        <h2 className="text-4xl font-black tracking-tighter leading-tight mb-4">
                            Expert Cleaning, <br />
                            <span className="text-brand-light">Simplified.</span>
                        </h2>
                        <p className="text-slate-300 font-medium text-lg leading-relaxed max-w-xs">
                            Get your personalized quote in under 60 seconds. Premium service for residential and commercial spaces.
                        </p>
                    </div>

                    <div className="relative z-10 space-y-4">
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map(i => <Star key={i} size={20} className="fill-accent text-accent" />)}
                        </div>
                        <p className="font-bold text-sm tracking-widest uppercase opacity-80">Trusted by 500+ Neighbors</p>
                    </div>
                </div>

                {/* Right Panel - Wizard Form (60%) */}
                <div className="flex-1 w-full lg:w-[60%] bg-white relative flex flex-col">
                    <ExtremeCleaningWizard />
                </div>
            </div>
        </div>
    );
}
