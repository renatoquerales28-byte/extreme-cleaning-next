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
        <div className="flex flex-col h-full justify-start md:justify-center gap-6 w-full py-2 antialiased">
            {/* Nav removed in favor of parent wizard layout */}

            <div className="text-center space-y-2 shrink-0">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1">
                    Choose Your <span className="text-accent">Service</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">
                    Select the type of space we&apos;ll be transforming today.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 w-full shrink-0">
                {services.map((service) => (
                    <button
                        key={service.id}
                        type="button"
                        onClick={() => handleSelect(service.id)}
                        className={`group p-4 md:p-5 glass-card rounded-3xl text-left relative overflow-hidden transition-all duration-300 border-2 ${selectedService === service.id
                            ? "border-brand-dark bg-white shadow-md scale-[1.02] z-10"
                            : "border-transparent bg-white/50 hover:border-slate-100 hover:scale-[1.01]"
                            }`}
                    >
                        <div className={`p-2.5 md:p-3 rounded-2xl ${service.bg} ${service.color} w-fit mb-3 md:mb-4 transition-transform group-hover:scale-110`}>
                            <service.icon size={22} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-lg md:text-xl font-black tracking-tighter mb-0.5 md:mb-1 leading-tight">{service.label}</h3>
                        <p className="text-[10px] md:text-[11px] text-slate-500 font-bold leading-snug tracking-tight">{service.desc}</p>
                    </button>
                ))}
            </div>

            <div className="mt-2 shrink-0">
                <button
                    onClick={() => selectedService && onNext()}
                    disabled={!selectedService}
                    className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-3 transition-all duration-500 ${selectedService
                        ? "bg-brand-dark text-white shadow-md hover:bg-black hover:scale-[1.01] active:scale-95"
                        : "bg-slate-100 text-slate-300 cursor-not-allowed"
                        }`}
                >
                    Confirm & Continue <ArrowRight size={16} strokeWidth={3} />
                </button>
            </div>
        </div>
    );
}
