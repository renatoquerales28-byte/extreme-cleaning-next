"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { Sparkles, Building2, Home } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";

interface ServiceStepProps {
    onNext: () => void;
}

export default function ServiceStep({ onNext }: ServiceStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedService = watch("serviceType");

    useEffect(() => {
        setAction({
            label: "Continue",
            disabled: !selectedService,
            onClick: () => selectedService && onNext()
        });
    }, [selectedService, onNext, setAction]);

    const handleSelect = (value: "residential" | "commercial") => {
        setValue("serviceType", value);
    };

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            What kind of <br /> <span className="text-[#05D16E]">space is this?</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Select the service type to proceed</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleSelect("residential")}
                            className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-4 ${selectedService === "residential"
                                    ? "bg-[#024653] border-[#024653] shadow-xl scale-[1.02]"
                                    : "bg-white border-slate-100 hover:border-[#05D16E]/50 hover:bg-slate-50"
                                }`}
                        >
                            <div className={`p-4 rounded-2xl transition-colors ${selectedService === "residential" ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"
                                }`}>
                                <Home size={32} strokeWidth={2} />
                            </div>
                            <div className="text-center">
                                <h3 className={`text-lg font-black tracking-tight ${selectedService === "residential" ? "text-white" : "text-[#024653]"
                                    }`}>Residential</h3>
                                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${selectedService === "residential" ? "text-white/60" : "text-slate-400"
                                    }`}>House, Apt, Condo</p>
                            </div>
                            {selectedService === "residential" && (
                                <div className="absolute top-4 right-4 text-[#05D16E] animate-in fade-in zoom-in">
                                    <Sparkles size={20} fill="currentColor" />
                                </div>
                            )}
                        </button>

                        <button
                            onClick={() => handleSelect("commercial")}
                            className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-4 ${selectedService === "commercial"
                                    ? "bg-[#024653] border-[#024653] shadow-xl scale-[1.02]"
                                    : "bg-white border-slate-100 hover:border-[#05D16E]/50 hover:bg-slate-50"
                                }`}
                        >
                            <div className={`p-4 rounded-2xl transition-colors ${selectedService === "commercial" ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"
                                }`}>
                                <Building2 size={32} strokeWidth={2} />
                            </div>
                            <div className="text-center">
                                <h3 className={`text-lg font-black tracking-tight ${selectedService === "commercial" ? "text-white" : "text-[#024653]"
                                    }`}>Commercial</h3>
                                <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${selectedService === "commercial" ? "text-white/60" : "text-slate-400"
                                    }`}>Office, Store, Building</p>
                            </div>
                            {selectedService === "commercial" && (
                                <div className="absolute top-4 right-4 text-[#05D16E] animate-in fade-in zoom-in">
                                    <Sparkles size={20} fill="currentColor" />
                                </div>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
