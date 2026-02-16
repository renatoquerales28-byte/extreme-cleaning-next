"use client";

import { Sparkles, Box, HardHat, ArrowRight, ShieldCheck, Building2, Briefcase } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface CleaningTypeStepProps {
    onNext: () => void;
}

export default function CleaningTypeStep({ onNext }: CleaningTypeStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const serviceType = data.serviceType || "residential";

    const currentTypes = useMemo(() => {
        if (serviceType === "commercial") {
            return [
                { id: "first_cleaning", label: "First Cleaning", icon: Sparkles, tag: "Introductory", desc: "Deep Initial Clean" },
                { id: "office_maintenance", label: "Maintenance", icon: Building2, tag: "Daily/Weekly", desc: "Janitorial & Upkeep" },
                { id: "post_construction", label: "Post Construction", icon: HardHat, tag: "Heavy Duty", desc: "Debris & Dust Removal" }
            ];
        }
        if (serviceType === "property_mgmt") {
            return [
                { id: "first_cleaning", label: "First Cleaning", icon: Sparkles, tag: "Introductory", desc: "Deep Initial Clean" },
                { id: "move_in_out", label: "Move In/Out", icon: Box, tag: "Empty Unit", desc: "Ready for Tenant" },
                { id: "post_construction", label: "Post-Con", icon: HardHat, tag: "Heavy Duty", desc: "Construction Cleanup" }
            ];
        }
        // Default Residential
        return [
            { id: "first_cleaning", label: "First Cleaning", icon: Sparkles, tag: "Introductory", desc: "Premium Deep Session" },
            { id: "move_in_out", label: "Move In/Out", icon: Box, tag: "Empty House", desc: "Relocation Protocol" },
            { id: "post_construction", label: "Post-Con", icon: HardHat, tag: "Dust Removal", desc: "After Reno Clean" }
        ];
    }, [serviceType]);

    useEffect(() => {
        setAction({
            label: "Continue to Setup",
            disabled: !data.cleaningType,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [data.cleaningType, onNext, setAction]);

    return (
        <div className="w-full h-full flex flex-col justify-center py-4">
            <div className="max-w-5xl mx-auto w-full px-6 space-y-8">

                <div className="flex items-center gap-3 ml-1 mb-2">
                    <div className="w-5 h-5 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20">
                        <ShieldCheck size={12} className="text-white" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">
                        {serviceType === 'commercial' ? 'Commercial Protocol' : 'Service Protocol'}
                    </span>
                </div>

                <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-6 lg:p-10">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                        {currentTypes.map((type) => {
                            const isSelected = data.cleaningType === type.id;
                            const Icon = type.icon;
                            return (
                                <button
                                    key={type.id}
                                    type="button"
                                    onClick={() => setValue("cleaningType", type.id as any)}
                                    className={`
                                        p-8 rounded-2xl border-2 flex flex-col items-center gap-4 transition-all duration-300 group relative
                                        ${isSelected
                                            ? "bg-[#024653] border-[#024653] text-white shadow-2xl shadow-[#024653]/20 -translate-y-2 scale-[1.02]"
                                            : "bg-white border-[#024653]/5 text-[#024653] hover:border-[#024653]/10 hover:shadow-xl hover:-translate-y-1"
                                        }
                                    `}
                                >
                                    {/* TAG */}
                                    <div className={`
                                        absolute top-4 left-4 px-2 py-0.5 rounded text-[7px] font-black uppercase tracking-widest
                                        ${isSelected ? 'bg-white/10 text-[#05D16E]' : 'bg-[#024653]/5 text-[#024653]/30'}
                                    `}>
                                        {type.tag}
                                    </div>

                                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-all duration-500 ${isSelected ? 'bg-white/10 text-[#05D16E]' : 'bg-[#024653]/5 text-[#024653]'}`}>
                                        <Icon size={32} />
                                    </div>
                                    <div className="text-center">
                                        <p className="text-xs font-black uppercase tracking-[0.2em] leading-none mb-2">{type.label}</p>
                                        <p className={`text-[9px] font-bold uppercase tracking-widest opacity-40 leading-none ${isSelected ? "text-[#05D16E]" : ""}`}>
                                            {type.desc}
                                        </p>
                                    </div>

                                    {isSelected && (
                                        <div className="absolute top-4 right-4">
                                            <div className="w-2 h-2 rounded-full bg-[#05D16E] shadow-[0_0_12px_#05D16E]" />
                                        </div>
                                    )}
                                </button>
                            );
                        })}
                    </div>

                    <div className="mt-10 pt-8 border-t border-[#024653]/5">
                        <p className="text-[9px] font-black uppercase tracking-[0.3em] text-[#024653]/20 text-center">
                            {serviceType === 'commercial' ? 'Elite Spokane Business Standards Applied' : 'Elite Professional Standards Apply to All Selections'}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
