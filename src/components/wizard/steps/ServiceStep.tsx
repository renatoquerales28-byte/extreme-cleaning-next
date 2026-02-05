import { Home, Building2, LayoutGrid, Check } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface ServiceStepProps {
    onNext: () => void;
}

export default function ServiceStep({ onNext }: ServiceStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedService = watch("serviceType");

    useEffect(() => {
        setAction({
            label: "Continue",
            disabled: !selectedService,
            onClick: () => selectedService && onNext()
        });
    }, [selectedService, onNext, setAction]);

    const handleSelect = (value: "residential" | "commercial" | "property_mgmt") => {
        setValue("serviceType", value);
    };

    const options = [
        { id: "residential", icon: Home, label: "Residential", sub: "For houses, apartments, and personal living spaces." },
        { id: "commercial", icon: Building2, label: "Commercial", sub: "For offices, retail stores, and business facilities." },
        { id: "property_mgmt", icon: LayoutGrid, label: "Property Management", sub: "For multi-unit complexes and recurring rentals." }
    ];

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {options.map((option) => (
                    <motion.button
                        key={option.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleSelect(option.id as any)}
                        className={`group relative p-8 rounded-[2.5rem] transition-all duration-500 text-left flex flex-col justify-between h-full border ${selectedService === option.id
                            ? "bg-[#024653] border-[#024653] shadow-xl text-white"
                            : "bg-white border-[#024653]/5 hover:border-[#024653]/20 shadow-sm text-[#024653]"
                            }`}
                    >
                        <div className="space-y-6">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedService === option.id ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"
                                }`}>
                                <option.icon size={24} />
                            </div>

                            <div className="space-y-2">
                                <h3 className={`text-xl font-bold tracking-tight ${selectedService === option.id ? "text-white" : "text-[#024653]"
                                    }`}>{option.label}</h3>
                                <p className={`text-sm leading-relaxed opacity-60 ${selectedService === option.id ? "text-white" : "text-[#024653]"
                                    }`}>{option.sub}</p>
                            </div>
                        </div>

                        {selectedService === option.id && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="absolute top-6 right-6 w-6 h-6 rounded-full bg-[#05D16E] flex items-center justify-center text-[#024653]"
                            >
                                <Check size={14} strokeWidth={4} />
                            </motion.div>
                        )}
                    </motion.button>
                ))}
            </div>
        </div>
    );
}
