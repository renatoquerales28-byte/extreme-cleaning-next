"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect } from "react";
import { Building2, Minus, Plus } from "lucide-react";
import { motion } from "framer-motion";

interface CommercialStepProps {
    onNext: () => void;
}

export default function CommercialStep({ onNext }: CommercialStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const businessType = watch("businessType") || "";
    const commSqFt = watch("commSqFt") || "";
    const floors = watch("floors") || 1;

    useEffect(() => {
        setAction({
            label: "Review Quote",
            disabled: !businessType || !commSqFt,
            onClick: onNext
        });
    }, [businessType, commSqFt, onNext, setAction]);

    const businessTypes = [
        "Office", "Retail", "Healthcare", "Restaurant", "Industrial", "Other"
    ];

    const handleFloor = (val: number) => {
        setValue("floors", Math.max(1, val));
    };

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl space-y-8">

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Facility Type Picker */}
                    <div className="flex-1 bg-white p-8 rounded-[2.5rem] border border-[#024653]/5 shadow-sm space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                                <Building2 size={20} />
                            </div>
                            <h3 className="text-xl font-bold text-[#024653]">Facility Type</h3>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {businessTypes.map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setValue("businessType", type)}
                                    className={`p-4 rounded-2xl border text-[10px] font-bold uppercase tracking-widest transition-all ${businessType === type
                                        ? "bg-[#024653] border-[#024653] text-white"
                                        : "bg-[#F9F8F2] border-transparent text-[#024653]/40 hover:border-[#024653]/20"
                                        }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Floor Counter */}
                    <div className="md:w-64 bg-white p-8 rounded-[2.5rem] border border-[#024653]/5 shadow-sm flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-[#024653]">Floors</h3>
                            <p className="text-sm text-[#024653]/40">Vertical Levels</p>
                        </div>
                        <div className="flex items-center justify-between bg-[#F9F8F2] p-2 rounded-2xl mt-8">
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFloor(floors - 1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-[#024653] hover:text-red-500 transition-colors">
                                <Minus size={18} />
                            </motion.button>
                            <span className="text-2xl font-bold text-[#024653]">{floors}</span>
                            <motion.button whileTap={{ scale: 0.95 }} onClick={() => handleFloor(floors + 1)} className="w-10 h-10 flex items-center justify-center rounded-xl bg-white shadow-sm text-[#024653] hover:text-[#05D16E] transition-colors">
                                <Plus size={18} />
                            </motion.button>
                        </div>
                    </div>
                </div>

                {/* Sq Ft Input */}
                <div className="bg-white p-8 md:p-12 rounded-[2.5rem] border border-[#024653]/5 shadow-sm flex items-center justify-between">
                    <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-[#024653]">Estimated Area</h3>
                        <p className="text-sm text-[#024653]/40">Approximate Square Footage</p>
                    </div>
                    <div className="relative max-w-[200px]">
                        <input
                            {...register("commSqFt")}
                            type="number"
                            placeholder="2500"
                            className="w-full text-right py-4 pr-12 text-4xl font-bold text-[#024653] bg-transparent border-b-2 border-[#024653]/10 focus:border-[#05D16E] outline-none transition-all placeholder:text-[#024653]/10"
                        />
                        <span className="absolute right-0 bottom-5 text-[10px] font-bold uppercase tracking-widest text-[#024653]/40">sqft</span>
                    </div>
                </div>
            </div>

            <style jsx>{`
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px white inset !important;
                    -webkit-text-fill-color: #024653 !important;
                }
            `}</style>
        </div>
    );
}
