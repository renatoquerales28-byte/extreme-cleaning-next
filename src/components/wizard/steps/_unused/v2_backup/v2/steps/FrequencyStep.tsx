import { Calendar, Check } from "lucide-react";
import { useWizardAction } from "../../WizardActionContext";
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
        <div className="h-full w-full flex items-start justify-center p-6 md:p-0 md:pt-10">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-3 auto-rows-fr pb-32">
                {options.map((opt) => (
                    <motion.button
                        key={opt.id}
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setValue("frequency", opt.id as any)}
                        className={`group relative p-6 rounded-xl transition-all duration-500 text-left flex flex-col justify-between h-full border ${selectedFreq === opt.id
                            ? "bg-[#024653] border-[#024653] shadow-lg text-white"
                            : "bg-white border-[#024653]/5 hover:border-[#024653]/20 shadow-sm text-[#024653]"
                            }`}
                    >
                        <div className="space-y-4">
                            <div className="flex items-start justify-between">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors ${selectedFreq === opt.id ? "bg-white/10 text-white" : "bg-[#05D16E]/10 text-[#05D16E]"
                                    }`}>
                                    <Calendar size={20} />
                                </div>
                                {opt.discount && (
                                    <span className={`px-3 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest ${selectedFreq === opt.id ? "bg-[#05D16E] text-[#024653]" : "bg-[#05D16E]/10 text-[#05D16E]"
                                        }`}>
                                        {opt.discount}
                                    </span>
                                )}
                            </div>

                            <div className="space-y-1">
                                <h3 className={`text-lg font-bold tracking-tight ${selectedFreq === opt.id ? "text-white" : "text-[#024653]"
                                    }`}>{opt.label}</h3>
                                <p className={`text-[13px] leading-snug opacity-60 ${selectedFreq === opt.id ? "text-white" : "text-[#024653]"
                                    }`}>{opt.sub}</p>
                            </div>
                        </div>


                    </motion.button>
                ))}
            </div>
        </div>
    );
}
