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

    const handleSelect = (value: "residential" | "commercial" | "property_mgmt") => {
        setValue("serviceType", value);
    };

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Choose Your <br /> <span className="text-[#05D16E]">Service.</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Select the type of space we'll be transforming today.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[
                            { id: "residential", icon: Home, label: "Residential", sub: "House, Apt, Condo" },
                            { id: "commercial", icon: Building2, label: "Commercial", sub: "Office, Store, Building" },
                            { id: "property_mgmt", icon: Building2, label: "Property Mgmt", sub: "Multi-unit, Move-in/out" }
                        ].map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id as any)}
                                className={`group relative p-6 rounded-[2rem] border-2 transition-all duration-300 flex flex-col items-center gap-4 ${selectedService === option.id
                                    ? "bg-[#024653] border-[#024653] shadow-xl scale-[1.02]"
                                    : "bg-white border-slate-100 hover:border-[#05D16E]/50 hover:bg-slate-50"
                                    }`}
                            >
                                <div className={`p-4 rounded-2xl transition-colors ${selectedService === option.id ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"
                                    }`}>
                                    <option.icon size={32} strokeWidth={2} />
                                </div>
                                <div className="text-center">
                                    <h3 className={`text-lg font-black tracking-tight ${selectedService === option.id ? "text-white" : "text-[#024653]"
                                        }`}>{option.label}</h3>
                                    <p className={`text-[10px] font-bold uppercase tracking-widest mt-1 ${selectedService === option.id ? "text-white/60" : "text-slate-400"
                                        }`}>{option.sub}</p>
                                </div>
                                {selectedService === option.id && (
                                    <div className="absolute top-4 right-4 text-[#05D16E] animate-in fade-in zoom-in">
                                        <Sparkles size={20} fill="currentColor" />
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
