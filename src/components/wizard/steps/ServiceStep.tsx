"use client";

import React from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData, serviceTypes } from "@/lib/schemas/wizard";
import { Home, Building2, Key, ChevronLeft, ArrowRight } from "lucide-react";

interface ServiceStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function ServiceStep({ onNext, onBack }: ServiceStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const selectedService = watch("serviceType");

    const handleSelect = (id: string) => {
        setValue("serviceType", id as any);
    };

    const services = [
        { id: "residential", label: "Residential", icon: Home, desc: "Homes, apartments, and studios.", color: "text-brand-dark", bg: "bg-brand-light/10" },
        { id: "commercial", label: "Commercial", icon: Building2, desc: "Offices, retail, and business spaces.", color: "text-accent", bg: "bg-accent/10" },
        { id: "property_mgmt", label: "Airbnb / PM", icon: Key, desc: "Portfolio management & turnovers.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ];

    return (
        <div className="flex flex-col h-full justify-center gap-4 w-full py-2 antialiased max-w-lg mx-auto">
            <div className="text-center space-y-1 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-[0.85] py-1">
                    Choose Your <span className="text-[#05D16E]">Service</span>
                </h2>
                <p className="text-xs text-[#024653]/60 font-medium tracking-tight">
                    Select the type of space we&apos;ll be transforming today.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 w-full shrink-0">
                {services.map((service) => (
                    <button
                        key={service.id}
                        type="button"
                        onClick={() => handleSelect(service.id)}
                        className={`group p-4 bg-white rounded-[2rem] text-left relative overflow-hidden transition-all duration-500 border-2 ${selectedService === service.id
                            ? "border-[#05D16E] shadow-2xl shadow-[#05D16E]/10 scale-[1.02] z-10"
                            : "border-slate-50 hover:border-[#024653]/10 hover:shadow-xl hover:-translate-y-1"
                            }`}
                    >
                        <div className={`p-3 rounded-2xl ${selectedService === service.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#F9F8F2] text-[#024653]/60"} w-fit mb-4 transition-all duration-500 group-hover:scale-110 shadow-sm`}>
                            <service.icon size={20} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-lg md:text-xl font-black tracking-tight mb-1 leading-tight text-[#024653] uppercase">{service.label}</h3>
                        <p className="text-[9px] md:text-[10px] text-[#024653]/40 font-bold leading-relaxed tracking-widest uppercase">{service.desc}</p>
                    </button>
                ))}
            </div>

            <div className="mt-2 shrink-0">
                <button
                    onClick={() => selectedService && onNext()}
                    disabled={!selectedService}
                    className={`w-full py-4 rounded-3xl font-black uppercase tracking-[0.2em] text-[10px] flex items-center justify-center gap-3 transition-all duration-500 shadow-xl ${selectedService
                        ? "bg-[#024653] text-white hover:bg-[#0E6168] hover:scale-[1.01] active:scale-95 shadow-[#024653]/20"
                        : "bg-slate-100 text-[#024653]/20 cursor-not-allowed shadow-none"
                        }`}
                >
                    Confirm & Continue <ArrowRight size={16} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
