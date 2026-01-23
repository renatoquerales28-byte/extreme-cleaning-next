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

            <ExtremeCleaningWizard />
        </div>
    );
}
