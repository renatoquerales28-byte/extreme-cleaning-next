import React from "react";
import ExtremeCleaningWizard from "@/components/wizard/ExtremeCleaningWizard";
import Image from "next/image";
import { Star } from "lucide-react";

export default function QuotePage() {
    return (
        <div className="min-h-[100dvh] w-full flex items-center justify-center p-4 md:p-8 overflow-hidden relative selection:bg-accent selection:text-white">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/brand/hero-bg.png"
                    alt="Background"
                    fill
                    className="object-cover object-center"
                    priority
                />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            </div>

            <React.Suspense fallback={
                <div className="w-full max-w-6xl h-[680px] bg-white/80 backdrop-blur-xl rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                    <div className="w-16 h-16 border-4 border-brand-light border-t-accent rounded-full animate-spin"></div>
                </div>
            }>
                <ExtremeCleaningWizard />
            </React.Suspense>
        </div>
    );
}
