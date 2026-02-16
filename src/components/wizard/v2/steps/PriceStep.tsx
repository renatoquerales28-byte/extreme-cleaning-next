"use client";

import { useWizardAction } from "../../WizardActionContext";
import { useEffect } from "react";
import { ArrowRight, Check, ShieldCheck, Star } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { motion } from "framer-motion";

function getInclusions(type: 'regular' | 'deep' | 'move', service: 'residential' | 'commercial' | 'property_mgmt') {
    if (service === 'commercial') return [
        "Office Areas Sanitized",
        "Trash Removal & Liners",
        "Restroom Deep Clean",
        "Kitchen/Breakroom Detailing",
        "Floor Care (Vacuum/Mop)"
    ];

    if (service === 'property_mgmt') return [
        "Full Turnover Checklist",
        "Appliance Cleaning (In/Out)",
        "Interior Windows & Blinds",
        "Cabinet Interiors",
        "Deep Bathroom Scrub"
    ];

    const common = ["Eco-Friendly Supplies", "Vetted & Insured Team"];
    if (type === 'deep') return [
        ...common,
        "Baseboards & Door Frames",
        "Inside Oven & Fridge",
        "Interior Windows",
        "Deep Scrub Bathrooms",
        "Light Switches & Fixtures"
    ];
    if (type === 'move') return [
        ...common,
        "Inside Cabinets & Drawers",
        "Spot Clean Walls/Trims",
        "Inside Oven & Fridge",
        "Deep Scrub All Surfaces",
        "Closets & Shelves"
    ];
    return [
        ...common,
        "Dusting All Surfaces",
        "Floors Vacuumed & Mopped",
        "Bathrooms Sanitized",
        "Kitchen Counters & Sink",
        "Trash Emptying"
    ];
}

interface PriceStepProps {
    onNext: () => void;
    totalPrice: number;
}

export default function PriceStep({ onNext, totalPrice }: PriceStepProps) {
    const { setAction } = useWizardAction();
    const { watch } = useFormContext<WizardData>();
    const data = watch();

    useEffect(() => {
        setAction({
            label: "Proceed to Booking",
            disabled: false,
            isLoading: false,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [setAction, onNext]);

    return (
        <div className="h-full w-full flex items-start justify-center p-6 md:p-0 md:pt-10 overflow-y-auto">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-6 items-stretch pb-32">

                {/* Main Quote Card */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-white p-8 md:p-10 rounded-xl border border-[#024653]/5 shadow-sm space-y-8 relative overflow-hidden flex flex-col justify-between"
                >
                    <div className="space-y-6 relative z-10">
                        <div className="space-y-2">
                            <span className="inline-block px-3 py-1 bg-[#05D16E] text-[#024653] rounded-md text-[9px] font-bold uppercase tracking-widest shadow-sm">
                                Guaranteed Quote
                            </span>
                            <h3 className="text-2xl font-bold text-[#024653]">Your Cleaning Estimate</h3>
                        </div>

                        <div className="flex items-baseline gap-1.5">
                            <span className="text-2xl font-bold text-[#024653]">$</span>
                            <span className="text-7xl font-bold text-[#024653] tracking-tighter leading-none">{totalPrice}</span>
                            <span className="text-xs font-bold text-[#024653]/40 uppercase tracking-widest ml-2">Total</span>
                        </div>
                    </div>

                    <div className="space-y-4 pt-8 border-t border-[#024653]/5">
                        <div className="flex items-center gap-3 text-[#024653]">
                            <div className="w-8 h-8 rounded-lg bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                                <ShieldCheck size={18} />
                            </div>
                            <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">100% Satisfaction Guaranteed</span>
                        </div>
                    </div>

                    {/* Subtle aesthetic background element */}
                    <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-[#F9F8F2] rounded-full blur-3xl opacity-50" />
                </motion.div>

                {/* Inclusions Card */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[#024653] p-8 rounded-xl text-white space-y-6 flex flex-col"
                >
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#05D16E] mb-2">
                            What&apos;s Included
                        </h4>
                        <div className="text-xl font-bold opacity-90 border-b border-white/10 pb-4">
                            {data.cleaningType || "Standard"} Treatment
                        </div>
                    </div>

                    <div className="flex-1 space-y-3 overflow-y-auto pr-2 custom-scrollbar">
                        {getInclusions(data.cleaningType as any, data.serviceType as any).map((item, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="flex items-center gap-4 group"
                            >
                                <div className="w-5 h-5 rounded bg-[#05D16E] shrink-0 flex items-center justify-center text-[#024653]">
                                    <Check size={12} strokeWidth={4} />
                                </div>
                                <span className="text-xs font-bold tracking-tight opacity-70 group-hover:opacity-100 transition-opacity">{item}</span>
                            </motion.div>
                        ))}
                    </div>

                    <div className="pt-6 border-t border-white/10">
                        <div className="flex items-center gap-3">
                            <div className="flex -space-x-1">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <Star key={i} size={10} className="fill-[#05D16E] text-[#05D16E]" />
                                ))}
                            </div>
                            <span className="text-[9px] font-bold uppercase tracking-widest text-white/40">Verified Local Service</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            <p className="fixed bottom-6 text-[9px] text-[#024653]/30 font-bold uppercase tracking-[0.2em] text-center w-full hidden md:block">
                *Final price may vary based on property condition
            </p>
        </div>
    );
}


