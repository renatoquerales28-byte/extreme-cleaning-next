import React, { useEffect } from "react";
import { useWizardAction } from "../../WizardActionContext";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { motion } from "framer-motion";
import { Sparkles, Zap, Box, HardHat, Check, X } from "lucide-react";

interface CleaningTypeStepProps {
    onNext: () => void;
}

const cleaningTypes = [
    {
        id: "standard",
        label: "Standard Clean",
        description: "Perfect for maintaining a tidy home.",
        icon: Sparkles,
        popular: true,
        features: [
            { name: "Dusting & Mopping", included: true },
            { name: "Bathrooms & Kitchen", included: true },
            { name: "Inside Microwave", included: false },
            { name: "Baseboards & Doors", included: false }
        ]
    },
    {
        id: "deep",
        label: "Deep Clean",
        description: "Thorough cleaning for neglected spaces.",
        icon: Zap,
        popular: false,
        features: [
            { name: "Standard Clean Included", included: true },
            { name: "Inside Microwave", included: true },
            { name: "Baseboards & Doors", included: true },
            { name: "Heavy Scrubbing", included: true }
        ]
    },
    {
        id: "move",
        label: "Move In / Move Out",
        description: "Get your deposit back or start fresh.",
        icon: Box,
        popular: false,
        features: [
            { name: "Deep Clean Scope", included: true },
            { name: "Inside Cabinets", included: true },
            { name: "Inside Fridge & Oven", included: true },
            { name: "Trash Removal", included: true }
        ]
    },
    {
        id: "post_construction",
        label: "Post Construction",
        description: "Remove dust and debris after renovation.",
        icon: HardHat,
        popular: false,
        features: [
            { name: "Dust & Debris", included: true },
            { name: "Paint Spot Removal", included: true },
            { name: "Polishing", included: true },
            { name: "Sanitization", included: true }
        ]
    }
];

export default function CleaningTypeStep({ onNext }: CleaningTypeStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedType = watch("cleaningType");

    useEffect(() => {
        setAction({
            label: "Next Step",
            disabled: !selectedType,
            onClick: onNext
        });
    }, [selectedType, setAction, onNext]);

    const handleSelect = (typeId: string) => {
        setValue("cleaningType", typeId as any);
    };

    return (
        <div className="h-full w-full flex items-start justify-center p-6 md:p-0 md:pt-10 overflow-y-auto">
            <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-3 pb-32">
                {cleaningTypes.map((type) => {
                    const isSelected = selectedType === type.id;
                    const Icon = type.icon;

                    return (
                        <motion.button
                            type="button"
                            key={type.id}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => handleSelect(type.id)}
                            className={`
                                group relative p-5 rounded-xl text-left transition-all duration-500 border
                                flex flex-col gap-4 w-full h-full
                                ${isSelected
                                    ? "bg-[#024653] border-[#024653] shadow-lg text-white"
                                    : "bg-white border-[#024653]/5 hover:border-[#024653]/20 shadow-sm text-[#024653]"
                                }
                            `}
                        >
                            {type.popular && (
                                <span className={`
                                    absolute -top-3 right-6 px-4 py-1.5 rounded-md text-[10px] font-bold uppercase tracking-widest shadow-sm z-10
                                    ${isSelected ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E] text-white"}
                                `}>
                                    Popular
                                </span>
                            )}

                            <div className="flex items-center justify-between w-full">
                                <div className="flex items-center gap-3">
                                    <div className={`
                                        w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-colors
                                        ${isSelected ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"}
                                    `}>
                                        <Icon size={20} />
                                    </div>
                                    <h3 className={`text-lg font-bold tracking-tight ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                        {type.label}
                                    </h3>
                                </div>
                            </div>

                            <p className={`text-[12px] leading-snug opacity-60 min-h-[2.5rem] ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                {type.description}
                            </p>

                            <div className="grid grid-cols-2 gap-y-1.5 gap-x-3 pt-3 border-t border-current border-opacity-5 mt-auto">
                                {type.features.map((feature, i) => (
                                    <div key={i} className="flex items-center gap-1.5 leading-none">
                                        {feature.included ? (
                                            <Check size={10} className={`${isSelected ? "text-[#05D16E]" : "text-[#05D16E]"}`} strokeWidth={4} />
                                        ) : (
                                            <X size={10} className={`${isSelected ? "text-white/20" : "text-[#024653]/10"}`} strokeWidth={4} />
                                        )}
                                        <span className={`text-[9px] font-bold uppercase tracking-wider whitespace-nowrap overflow-hidden text-ellipsis ${isSelected
                                            ? (feature.included ? "text-white" : "text-white/20 line-through")
                                            : (feature.included ? "text-[#024653]/70" : "text-[#024653]/10 line-through")
                                            }`}>
                                            {feature.name}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
