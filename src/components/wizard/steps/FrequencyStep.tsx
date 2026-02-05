import { Calendar, Check } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface FrequencyStepProps {
    onNext: () => void;
}

export default function FrequencyStep({ onNext }: FrequencyStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedFreq = watch("frequency");

    useEffect(() => {
        setAction({
            label: "View Your Quote",
            disabled: !selectedFreq,
            onClick: onNext
        });
    }, [selectedFreq, onNext, setAction]);

    const options = [
        { id: "onetime", label: "Just Once", discount: null, sub: "Perfect for a deep cleaning or special occasion." },
        { id: "weekly", label: "Weekly", discount: "20% OFF", sub: "Maximum consistency and the highest savings." },
        { id: "biweekly", label: "Bi-Weekly", discount: "15% OFF", sub: "Our most popular choice for busy homes." },
        { id: "monthly", label: "Monthly", discount: "10% OFF", sub: "Great for keeping things fresh year-round." },
    ];

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-fr">
                {options.map((opt) => (
                    <motion.button
                        key={opt.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setValue("frequency", opt.id as any)}
                        className={`group relative p-8 rounded-[2.5rem] transition-all duration-500 text-left flex flex-col justify-between h-full border ${selectedFreq === opt.id
                            ? "bg-[#024653] border-[#024653] shadow-xl text-white"
                            : "bg-white border-[#024653]/5 hover:border-[#024653]/20 shadow-sm text-[#024653]"
                            }`}
                    >
                        <div className="space-y-6">
                            <div className="flex items-start justify-between">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${selectedFreq === opt.id ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"
                                    }`}>
                                    <Calendar size={24} />
                                </div>
                                {opt.discount && (
                                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${selectedFreq === opt.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E]/10 text-[#05D16E]"
                                        }`}>
                                        {opt.discount}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-2">
                                <h3 className={`text-xl font-bold tracking-tight ${selectedFreq === opt.id ? "text-white" : "text-[#024653]"
                                    }`}>{opt.label}</h3>
                                <p className={`text-sm leading-relaxed opacity-60 ${selectedFreq === opt.id ? "text-white" : "text-[#024653]"
                                    }`}>{opt.sub}</p>
                            </div>
                        </div>

                        {selectedFreq === opt.id && (
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
