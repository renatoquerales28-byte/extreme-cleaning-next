"use client";

import { Home, Building2, LayoutGrid, ArrowRight, Target, ShieldCheck } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface ServiceStepProps {
    onNext: () => void;
}

const services = [
    {
        id: "residential",
        label: "Residential",
        desc: "Private homes & apartments",
        icon: Home
    },
    {
        id: "commercial",
        label: "Commercial",
        desc: "Offices & business spaces",
        icon: Building2
    },
    {
        id: "property_mgmt",
        label: "Property Mgmt",
        desc: "Portfolios & unit turns",
        icon: LayoutGrid
    }
];

export default function ServiceStep({ onNext }: ServiceStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selected = watch("serviceType");

    const handleSelect = (id: "residential" | "commercial" | "property_mgmt") => {
        setValue("serviceType", id);
    };

    useEffect(() => {
        setAction({
            label: "Continue",
            disabled: !selected,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [selected, onNext, setAction]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-4">
            <div className="max-w-5xl mx-auto w-full px-6 space-y-4">

                {/* Section Header */}
                <div className="flex items-center gap-3 ml-1">
                    <div className="w-5 h-5 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                        <Target size={12} className="text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">Select Service Division</span>
                </div>

                {/* Grid Container */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
                    {services.map((option) => {
                        const isSelected = selected === option.id;
                        const Icon = option.icon;

                        return (
                            <button
                                key={option.id}
                                type="button"
                                onClick={() => handleSelect(option.id as any)}
                                className={`
                                    relative flex flex-col items-center p-8 lg:p-10 rounded-2xl border transition-all duration-500 group
                                    ${isSelected
                                        ? "bg-[#024653] border-[#024653] text-white shadow-2xl shadow-[#024653]/30 -translate-y-2 scale-[1.02]"
                                        : "bg-white border-[#024653]/10 text-[#024653] hover:border-[#024653]/20 hover:shadow-xl hover:shadow-[#024653]/5"
                                    }
                                `}
                            >
                                {/* Selected State Visuals handled by background and shadow */}


                                <div className={`
                                    w-16 h-16 rounded-2xl flex items-center justify-center mb-8 transition-all duration-500
                                    ${isSelected ? "bg-white/10 text-[#05D16E]" : "bg-[#024653]/5 text-[#024653] group-hover:bg-[#024653]/10"}
                                `}>
                                    <Icon size={28} />
                                </div>

                                <div className="text-center space-y-3">
                                    <h4 className="font-black text-lg tracking-widest uppercase leading-none">{option.label}</h4>
                                    <div className="space-y-1">
                                        <p className={`text-[10px] font-bold uppercase tracking-widest opacity-40 leading-relaxed ${isSelected ? "text-[#05D16E]" : "text-[#024653]"}`}>
                                            {option.desc}
                                        </p>
                                    </div>
                                </div>
                            </button>
                        );
                    })}
                </div>

                {/* Footer Info */}
                <div className="flex justify-center pt-2">
                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#024653]/20">
                        Tailored expertise for every environment
                    </p>
                </div>
            </div>
        </div>
    );
}
