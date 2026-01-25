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
        <div className="h-full flex flex-col">
            {/* 🥓 Relleno: Área de Scroll */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
                <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 w-full">
                        {services.map((service) => (
                            <button
                                key={service.id}
                                type="button"
                                onClick={() => handleSelect(service.id)}
                                className={`group p-4 rounded-xl text-left relative transition-all duration-300 border-[3px] flex flex-col items-start gap-3 ${selectedService === service.id
                                    ? "bg-[#024653] border-[#10f081] text-white shadow-xl scale-[1.02] z-10"
                                    : "bg-white border-slate-100 hover:border-[#024653]/10 text-[#024653]"
                                    }`}
                            >
                                <div className={`p-3 rounded-lg transition-colors ${selectedService === service.id ? "bg-[#10f081] text-[#024653]" : "bg-[#F9F8F2] text-[#024653]"}`}>
                                    <service.icon size={24} strokeWidth={2.5} />
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
            </div>

            {/* 🍞 Capa Inferior: Botón Sticky */}
            <div className="shrink-0 w-full p-6 bg-white border-t border-gray-100 z-10">
                <button
                    onClick={() => selectedService && onNext()}
                    disabled={!selectedService}
                    className={`w-full py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-xs flex items-center justify-center gap-3 transition-all ${selectedService
                        ? "bg-[#024653] text-white hover:bg-[#0E6168]"
                        : "bg-slate-100 text-[#024653]/20 cursor-not-allowed"
                        }`}
                >
                    Continue <ArrowRight size={18} strokeWidth={2.5} />
                </button>
            </div>
        </div>
    );
}
