"use client";

import React, { useEffect } from "react";
import { useWizardAction } from "../WizardActionContext";
import { Building2, MapPin, Plus, UserCircle2 } from "lucide-react";
import { motion } from "framer-motion";

interface PropertySelectionStepProps {
    onSelect: (prop: any) => void;
    onBack: () => void;
    customerName: string;
    properties: any[];
}

export default function PropertySelectionStep({ onSelect, onBack, customerName, properties }: PropertySelectionStepProps) {
    const { setAction } = useWizardAction();

    useEffect(() => {
        setAction({
            label: "Next",
            onClick: () => { },
            hideMainButton: true,
            secondaryContent: (
                <button onClick={onBack} className="pointer-events-auto text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors py-2 bg-white/80 px-6 rounded-full shadow-sm backdrop-blur-sm border border-[#024653]/5">
                    Not {customerName}? Switch account
                </button>
            )
        });
    }, [onBack, customerName, setAction]);

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl space-y-8">
                <div className="flex items-center gap-4 px-2">
                    <div className="w-12 h-12 rounded-2xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                        <UserCircle2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#024653]">Welcome back, {customerName}</h3>
                        <p className="text-sm text-[#024653]/40">Which property are we visiting today?</p>
                    </div>
                </div>

                <div className="grid gap-4">
                    {properties.map((prop, idx) => (
                        <motion.button
                            key={prop.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                            onClick={() => onSelect(prop)}
                            className="group p-8 bg-white border border-[#024653]/5 rounded-[2.5rem] text-left transition-all shadow-sm hover:shadow-xl hover:shadow-[#024653]/5 flex items-center justify-between"
                        >
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#F9F8F2] rounded-2xl flex items-center justify-center text-[#024653] group-hover:bg-[#05D16E] group-hover:text-white transition-all duration-500">
                                    <Building2 size={24} />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="text-xl font-bold text-[#024653]">{prop.address}</h3>
                                    <div className="flex items-center gap-2 text-[#024653]/40 text-xs font-bold uppercase tracking-widest">
                                        <MapPin size={12} /> {prop.city}
                                    </div>
                                </div>
                            </div>
                        </motion.button>
                    ))}

                    <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: properties.length * 0.1 }}
                        onClick={() => onSelect(0)}
                        className="p-8 border-2 border-dashed border-[#024653]/10 hover:border-[#024653]/20 rounded-[2.5rem] text-center text-[#024653]/40 hover:text-[#024653] hover:bg-white transition-all flex items-center justify-center gap-3 font-bold uppercase tracking-widest text-xs"
                    >
                        <Plus size={16} strokeWidth={3} /> Add New Property
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
