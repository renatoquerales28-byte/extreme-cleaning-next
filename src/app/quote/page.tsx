import React from "react";
import ExtremeCleaningWizard from "@/components/wizard/ExtremeCleaningWizard";
import Image from "next/image";
import { Star } from "lucide-react";

export default function QuotePage() {
    return (
        <div className="min-h-screen w-full relative selection:bg-accent selection:text-white bg-brand-dark">
            <React.Suspense fallback={
                <div className="w-full h-screen bg-[#F9F8F2] flex items-center justify-center">
                    <div className="w-16 h-16 border-4 border-brand-light border-t-accent rounded-full animate-spin"></div>
                </div>
            }>
                <ExtremeCleaningWizard />
            </React.Suspense>
        </div>
    );
}
