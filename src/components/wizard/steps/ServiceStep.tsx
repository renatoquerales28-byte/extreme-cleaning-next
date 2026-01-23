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
        <div className="flex flex-col items-center gap-8 w-full py-4">
            <div className="flex items-center justify-between w-full">
                <button onClick={onBack} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-slate-400 hover:text-black transition-colors">
                    <ChevronLeft size={16} /> Back
                </button>
                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Step 02 / 05</span>
            </div>

            <div className="text-center space-y-3">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-none">
                    Choose Your <span className="text-accent">Service</span>
                </h2>
                <p className="text-base text-slate-500 font-medium">
                    Select the type of space we&apos;ll be transforming today.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4 w-full">
                {services.map((service) => (
                    <button
                        key={service.id}
                        onClick={() => {
                            setValue("serviceType", service.id as any);
                            onNext();
                        }}
                        className={`group p-6 glass-card rounded-[2rem] text-left relative overflow-hidden transition-all duration-500 ${selectedService === service.id ? "ring-4 ring-black scale-[1.02]" : "hover:scale-[1.02]"
                            }`}
                    >
                        <div className={`p-3 rounded-xl ${service.bg} ${service.color} w-fit mb-4 group-hover:scale-110 transition-transform`}>
                            <service.icon size={24} />
                        </div>
                        <h3 className="text-xl font-black tracking-tighter mb-1">{service.label}</h3>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed">{service.desc}</p>
                        <div className="absolute bottom-4 right-6 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                            <ArrowRight className={service.color} size={18} />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
}
