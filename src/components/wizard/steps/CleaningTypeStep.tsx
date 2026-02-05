import React, { useEffect } from "react";
import { useWizardAction } from "../WizardActionContext";
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
        setValue("cleaningType", typeId);
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-1 gap-4">
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
                                group relative p-8 rounded-[2.5rem] text-left transition-all duration-500 border
                                flex flex-col md:flex-row items-start md:items-center gap-8 w-full
                                ${isSelected
                                    ? "bg-[#024653] border-[#024653] shadow-xl text-white"
                                    : "bg-white border-[#024653]/5 hover:border-[#024653]/20 shadow-sm text-[#024653]"
                                }
                            `}
                        >
                            {type.popular && (
                                <span className={`
                                    absolute -top-3 right-10 px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-sm
                                    ${isSelected ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E] text-white"}
                                `}>
                                    Popular Choice
                                </span>
                            )}

                            <div className={`
                                w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors
                                ${isSelected ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"}
                            `}>
                                <Icon size={28} />
                            </div>

                            <div className="flex-1 w-full space-y-4">
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className={`text-xl font-bold tracking-tight ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                            {type.label}
                                        </h3>
                                        {isSelected && (
                                            <motion.div
                                                initial={{ scale: 0 }}
                                                animate={{ scale: 1 }}
                                                className="w-6 h-6 rounded-full bg-[#05D16E] flex items-center justify-center text-[#024653]"
                                            >
                                                <Check size={14} strokeWidth={4} />
                                            </motion.div>
                                        )}
                                    </div>
                                    <p className={`text-sm leading-relaxed opacity-60 ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                        {type.description}
                                    </p>
                                </div>

                                {/* Features Grid */}
                                <div className="grid grid-cols-2 gap-y-2 gap-x-6 pt-2 border-t border-current border-opacity-5">
                                    {type.features.map((feature: any, i) => (
                                        <div key={i} className="flex items-center gap-2">
                                            {feature.included ? (
                                                <Check size={12} className={`${isSelected ? "text-[#05D16E]" : "text-[#05D16E]"}`} strokeWidth={3} />
                                            ) : (
                                                <X size={12} className={`${isSelected ? "text-white/20" : "text-[#024653]/10"}`} strokeWidth={3} />
                                            )}
                                            <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected
                                                ? (feature.included ? "text-white" : "text-white/20 line-through")
                                                : (feature.included ? "text-[#024653]/70" : "text-[#024653]/10 line-through")
                                                }`}>
                                                {feature.name}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
