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

    const services = [
        { id: "residential", label: "Residential", icon: Home, desc: "Homes, apartments, and studios.", color: "text-brand-dark", bg: "bg-brand-light/10" },
        { id: "commercial", label: "Commercial", icon: Building2, desc: "Offices, retail, and business spaces.", color: "text-accent", bg: "bg-accent/10" },
        { id: "property_mgmt", label: "Airbnb / PM", icon: Key, desc: "Portfolio management & turnovers.", color: "text-emerald-500", bg: "bg-emerald-500/10" },
    ];

    return (
        <div className="flex flex-col h-full justify-start md:justify-center gap-4 w-full py-2">
            <div className="flex items-center justify-between w-full shrink-0">
                <button onClick={onBack} className="flex items-center gap-1 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={14} /> Back
                </button>
                <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Step 02 / 05</span>
            </div>

            <div className="text-center space-y-1 shrink-0">
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-brand-dark leading-none">
                    Choose Your <span className="text-accent">Service</span>
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                    Select the type of space we&apos;ll be transforming today.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-3 w-full shrink-0">
                {services.map((service) => (
                    <button
                        key={service.id}
                        type="button"
                        onClick={() => {
                            setValue("serviceType", service.id as any);
                        }}
                        className={`group p-3 md:p-4 glass-card rounded-2xl text-left relative overflow-hidden transition-all duration-300 border-2 ${selectedService === service.id ? "border-brand-dark bg-slate-50 shadow-md scale-[1.02]" : "border-transparent hover:border-slate-100"
                            }`}
                    >
                        <div className={`p-2 rounded-lg ${service.bg} ${service.color} w-fit mb-2 transition-transform`}>
                            <service.icon size={18} />
                        </div>
                        <h3 className="text-base font-black tracking-tighter mb-0.5">{service.label}</h3>
                        <p className="text-[9px] text-slate-500 font-medium leading-tight">{service.desc}</p>
                    </button>
                ))}
            </div>

            <button
                onClick={() => selectedService && onNext()}
                disabled={!selectedService}
                className={`w-full py-3 rounded-xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2 transition-all duration-300 shrink-0 ${selectedService
                    ? "bg-brand-dark text-white shadow-lg hover:bg-black"
                    : "bg-slate-100 text-slate-300 cursor-not-allowed"
                    }`}
            >
                Confirm Service <ArrowRight size={14} />
            </button>
        </div>
    );
}
