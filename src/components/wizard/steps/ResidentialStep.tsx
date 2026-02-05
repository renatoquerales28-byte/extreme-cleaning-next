import { Minus, Plus } from "lucide-react";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";

interface ResidentialStepProps {
    onNext: () => void;
}

export default function ResidentialStep({ onNext }: ResidentialStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const bedrooms = watch("bedrooms") || 1;
    const bathrooms = watch("bathrooms") || 1;

    useEffect(() => {
        setAction({
            label: "Select Frequency",
            disabled: false,
            onClick: onNext
        });
    }, [onNext, setAction]);

    const handleIncrement = (field: "bedrooms" | "bathrooms", value: number) => {
        setValue(field, Math.max(0, value + 1));
    };

    const handleDecrement = (field: "bedrooms" | "bathrooms", value: number) => {
        setValue(field, Math.max(0, value - 1));
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl space-y-8">

                {/* Residential Counters */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        { label: "Bedrooms", field: "bedrooms", value: bedrooms, sub: "Sleeping areas" },
                        { label: "Bathrooms", field: "bathrooms", value: bathrooms, sub: "Washrooms" }
                    ].map((item) => (
                        <div key={item.field} className="bg-white p-8 rounded-[2.5rem] border border-[#024653]/5 shadow-sm flex flex-col justify-between h-56">
                            <div>
                                <h3 className="text-xl font-bold text-[#024653]">{item.label}</h3>
                                <p className="text-sm text-[#024653]/40">{item.sub}</p>
                            </div>

                            <div className="flex items-center justify-between bg-[#F9F8F2] p-2 rounded-2xl">
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleDecrement(item.field as any, item.value)}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm text-[#024653] hover:bg-white hover:text-red-500 transition-colors"
                                >
                                    <Minus size={20} />
                                </motion.button>
                                <span className="text-3xl font-bold text-[#024653]">{item.value}</span>
                                <motion.button
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => handleIncrement(item.field as any, item.value)}
                                    className="w-12 h-12 flex items-center justify-center rounded-xl bg-white shadow-sm text-[#024653] hover:bg-[#05D16E] hover:text-white transition-colors"
                                >
                                    <Plus size={20} />
                                </motion.button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Sq Ft Input */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-[#024653]/5 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-[#024653]">Approx Size</h3>
                            <p className="text-sm text-[#024653]/40">Square Footage</p>
                        </div>
                        <div className="relative max-w-[200px]">
                            <input
                                {...register("sqFt", { valueAsNumber: true })}
                                type="number"
                                placeholder="1000"
                                className="w-full text-right py-4 pr-12 text-3xl font-bold text-[#024653] bg-transparent border-b-2 border-[#024653]/10 focus:border-[#05D16E] outline-none transition-all placeholder:text-[#024653]/10"
                            />
                            <span className="absolute right-0 bottom-5 text-[10px] font-bold uppercase tracking-widest text-[#024653]/40">sqft</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
