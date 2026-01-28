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
        popular: true
    },
    {
        id: "deep",
        label: "Deep Clean",
        description: "Thorough cleaning for neglected spaces.",
        icon: Zap,
        popular: false
    },
    {
        id: "move",
        label: "Move In / Move Out",
        description: "Get your deposit back or start fresh.",
        icon: Box,
        popular: false
    },
    {
        id: "post_construction",
        label: "Post Construction",
        description: "Remove dust and debris after renovation.",
        icon: HardHat,
        popular: false
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
        <div className="space-y-6">
            <div className="space-y-2">
                <h2 className="text-2xl font-black text-[#024653]">What kind of clean?</h2>
                <p className="text-slate-500">Choose the intensity level you need.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cleaningTypes.map((type) => {
                    const isSelected = selectedType === type.id;
                    const Icon = type.icon;

                    return (
                        <motion.button
                            key={type.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handleSelect(type.id)}
                            className={`
                                relative p-6 rounded-2xl text-left transition-all duration-200 border-2
                                flex flex-col gap-4 h-full
                                ${isSelected
                                    ? "border-[#024653] bg-[#024653]/5 shadow-md"
                                    : "border-slate-100 bg-white hover:border-[#024653]/30 hover:shadow-sm"
                                }
                            `}
                        >
                            {type.popular && (
                                <span className="absolute top-4 right-4 text-[10px] font-black uppercase tracking-wider bg-[#05D16E]/10 text-[#05D16E] px-2 py-1 rounded-full">
                                    Popular
                                </span>
                            )}

                            <div className={`
                                w-12 h-12 rounded-xl flex items-center justify-center transition-colors
                                ${isSelected ? "bg-[#024653] text-white" : "bg-slate-50 text-[#024653]"}
                            `}>
                                <Icon size={24} strokeWidth={2.5} />
                            </div>

                            <div>
                                <h3 className={`font-black text-lg mb-1 ${isSelected ? "text-[#024653]" : "text-slate-700"}`}>
                                    {type.label}
                                </h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                    {type.description}
                                </p>
                            </div>

                            {isSelected && (
                                <motion.div
                                    layoutId="check"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="absolute bottom-4 right-4 w-6 h-6 bg-[#05D16E] rounded-full flex items-center justify-center text-white"
                                >
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                </motion.div>
                            )}
                        </motion.button>
                    );
                })}
            </div>
        </div>
    );
}
