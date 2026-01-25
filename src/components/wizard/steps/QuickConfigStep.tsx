"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { ArrowRight, SlidersHorizontal } from "lucide-react";

interface QuickConfigStepProps {
    onNext: () => void;
}

export default function QuickConfigStep({ onNext }: QuickConfigStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const frequency = watch("frequency");

    useEffect(() => {
        setAction({
            label: "Calculate New Quote",
            disabled: false,
            onClick: onNext
        });
    }, [onNext, setAction]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Quick <br /> <span className="text-[#05D16E]">Config</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Adjust your service preferences</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-8">
                        <div className="flex items-center justify-center">
                            <SlidersHorizontal size={48} className="text-[#024653]/20" />
                        </div>
                        <p className="text-center text-[#024653]/60 font-bold text-sm">
                            (Configuration options would go here)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
