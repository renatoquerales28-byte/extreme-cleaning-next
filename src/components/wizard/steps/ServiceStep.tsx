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
        <div className="flex flex-col h-full w-full max-w-[800px] mx-auto py-2 antialiased overflow-hidden justify-center">
            <div className="flex flex-col justify-center w-full min-h-0 shrink">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                    {services.map((service) => (
                        <button
                            key={service.id}
                            type="button"
                            onClick={() => handleSelect(service.id)}
                            className={`group p-4 rounded-xl text-left relative transition-all duration-200 border-2 flex flex-col items-start gap-3 ${selectedService === service.id
                                ? "bg-[#024653] border-[#024653] text-white"
                                : "bg-white border-slate-200 hover:border-[#024653]/30 text-[#024653]"
                                }`}
                        >
                            <div className={`p-3 rounded-lg ${selectedService === service.id ? "bg-white/10 text-[#05D16E]" : "bg-[#F9F8F2] text-[#024653]"}`}>
                                <service.icon size={24} strokeWidth={2} />
                            </div>
                            <div>
                                <h3 className="text-base font-black tracking-tight uppercase mb-1">{service.label}</h3>
                                <p className={`text-[10px] font-medium leading-relaxed ${selectedService === service.id ? "text-white/60" : "text-[#024653]/60"}`}>
                                    {service.desc}
                                </p>
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex justify-center shrink-0">
                <button
                    onClick={() => selectedService && onNext()}
                    disabled={!selectedService}
                    className={`w-full md:w-auto px-12 py-4 rounded-xl font-black uppercase tracking-[0.25em] text-[10px] flex items-center justify-center gap-3 transition-all ${selectedService
                        ? "bg-[#05D16E] text-[#024653] hover:bg-[#04b861]"
                        : "bg-slate-100 text-[#024653]/20 cursor-not-allowed"
                        }`}
                >
                    Continue <ArrowRight size={16} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
