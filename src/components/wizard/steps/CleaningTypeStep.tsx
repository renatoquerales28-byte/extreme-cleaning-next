import React from "react";
import { useFormContext } from "react-hook-form";
import { useWizardAction } from "../WizardActionContext";
import { motion } from "framer-motion";
import { Sparkles, Zap, Box, HardHat } from "lucide-react";

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
        features: ["Dusting & Mopping", "Bathrooms & Kitchen", "Exterior of Appliances", "Making Beds"]
    },
    {
        id: "deep",
        label: "Deep Clean",
        description: "Thorough cleaning for neglected spaces.",
        icon: Zap,
        popular: false,
        features: ["Standard Clean Included", "Inside Microwave", "Baseboards & Doors", "Heavy Scrubbing"]
    },
    {
        id: "move",
        label: "Move In / Move Out",
        description: "Get your deposit back or start fresh.",
        icon: Box,
        popular: false,
        features: ["Deep Clean Included", "Inside Cabinets", "Inside Fridge & Oven", "Interior Windows"]
    },
    {
        id: "post_construction",
        label: "Post Construction",
        description: "Remove dust and debris after renovation.",
        icon: HardHat,
        popular: false,
        features: ["Dust & Debris Removal", "Polishing Services", "Paint Spot Removal", "Sanitization"]
    }
];

export default function CleaningTypeStep({ onNext }: CleaningTypeStepProps) {
    const { setValue, watch } = useFormContext();
    const { setAction } = useWizardAction();
    const selectedType = watch("cleaningType");

    // Update wizard action button state whenever selection changes
    React.useEffect(() => {
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
        <div className="h-full w-full relative flex flex-col">
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="space-y-2 lg:hidden text-center">
                        <h2 className="text-2xl font-black text-[#024653]">What kind of clean?</h2>
                        <p className="text-slate-500">Choose the intensity level you need.</p>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        {cleaningTypes.map((type) => {
                            const isSelected = selectedType === type.id;
                            const Icon = type.icon;

                            return (
                                <motion.button
                                    type="button"
                                    key={type.id}
                                    whileHover={{ scale: 1.01 }}
                                    whileTap={{ scale: 0.99 }}
                                    onClick={() => handleSelect(type.id)}
                                    className={`
                                        group relative p-6 rounded-[2rem] text-left transition-all duration-200 border-2
                                        flex flex-col sm:flex-row items-start sm:items-center gap-6 w-full
                                        ${isSelected
                                            ? "bg-[#024653] border-[#024653] shadow-lg"
                                            : "bg-white border-slate-100 hover:border-[#024653]/30"
                                        }
                                    `}
                                >
                                    {type.popular && (
                                        <span className={`
                                            absolute top-0 right-8 -translate-y-1/2 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm
                                            ${isSelected ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E] text-white"}
                                        `}>
                                            Popular
                                        </span>
                                    )}

                                    <div className={`
                                        w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-colors
                                        ${isSelected ? "bg-white/10 text-[#05D16E]" : "bg-[#F0FDF4] text-[#024653]"}
                                    `}>
                                        <Icon size={24} strokeWidth={2.5} />
                                    </div>

                                    <div className="flex-1 w-full">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className={`font-black text-lg ${isSelected ? "text-white" : "text-[#024653]"}`}>
                                                {type.label}
                                            </h3>
                                            <div className={`
                                                w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0
                                                ${isSelected
                                                    ? "border-[#05D16E] bg-[#05D16E] text-[#024653]"
                                                    : "border-slate-200 text-transparent group-hover:border-[#024653]/30"
                                                }
                                            `}>
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                                    <polyline points="20 6 9 17 4 12"></polyline>
                                                </svg>
                                            </div>
                                        </div>
                                        <p className={`text-xs font-medium leading-relaxed mb-4 ${isSelected ? "text-white/70" : "text-slate-400"}`}>
                                            {type.description}
                                        </p>

                                        {/* Features List */}
                                        <div className="grid grid-cols-2 gap-2">
                                            {type.features.map((feature, i) => (
                                                <div key={i} className="flex items-center gap-2">
                                                    <div className={`w-1.5 h-1.5 rounded-full ${isSelected ? "bg-[#05D16E]" : "bg-[#05D16E]/60"}`} />
                                                    <span className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? "text-white/90" : "text-[#024653]/70"}`}>
                                                        {feature}
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
            </div>
        </div>
    );
}
