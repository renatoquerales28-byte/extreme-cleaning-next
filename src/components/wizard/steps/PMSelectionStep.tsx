"use client";

import React, { useEffect, useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { Building2, Plus, ArrowRight, Trash2, MapPin, Building } from "lucide-react";
import { toast } from "sonner";

interface PMSelectionStepProps {
    onNext: () => void;
    onGoToStep: (step: string) => void;
}

export default function PMSelectionStep({ onNext, onGoToStep }: PMSelectionStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const portfolio = useMemo(() => watch("smallPortfolio") || [], [watch]);
    const data = watch();

    // The current property is stored in the root data (zipCode, cleaningType, etc.)
    // until the user clicks "Add Another" or "Proceed"

    const handleSaveCurrent = React.useCallback(() => {
        const newProperty = {
            id: Date.now(),
            name: `${data.cleaningType} @ ${data.zipCode}`,
            bedrooms: data.bedrooms || 1,
            bathrooms: data.bathrooms || 1,
            sqFt: data.sqFt || 1000,
            cleaningType: data.cleaningType || "regular",
            address: data.address, // We need to ensure address is captured for each
            city: data.city || "Spokane",
            zipCode: data.zipCode
        };
        setValue("smallPortfolio", [...portfolio, newProperty as any]);
    }, [data.cleaningType, data.zipCode, data.bedrooms, data.bathrooms, data.sqFt, data.address, data.city, portfolio, setValue]);

    useEffect(() => {
        const canAdvance = !!(data.address && data.city);

        setAction({
            label: portfolio.length > 0 ? "Identify & Finalize" : "Proceed to Contact",
            disabled: !canAdvance,
            onClick: () => {
                // Save current property before finalizing
                handleSaveCurrent();
                onNext();
            },
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [data.address, data.city, portfolio.length, onNext, setAction, handleSaveCurrent]);

    const handleAddAnother = () => {
        if (!data.address || !data.city) {
            toast.error("Please provide an address for the current property first.");
            return;
        }
        handleSaveCurrent();
        // Reset current property fields for the new loop
        setValue("cleaningType", "regular");
        setValue("bedrooms", 1);
        setValue("bathrooms", 1);
        setValue("sqFt", 1000);
        setValue("extras", []);
        setValue("address", "");
        // Go back to the very start of the property spec flow
        onGoToStep("zip");
    };

    const removeProperty = (id: number) => {
        setValue("smallPortfolio", portfolio.filter(p => p.id !== id));
    };

    return (
        <div className="w-full h-full flex flex-col justify-center py-4">
            <div className="max-w-6xl mx-auto w-full px-6 space-y-10">

                {/* 1. CURRENT PROPERTY ADDRESS */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3 ml-1">
                        <div className="w-5 h-5 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20">
                            <MapPin size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Current Property Location</span>
                        <div className="ml-auto flex items-center gap-2 px-3 py-1 bg-[#024653]/5 rounded-full">
                            <span className="text-[8px] font-black uppercase text-[#024653]/40 tracking-widest">ZIP: {data.zipCode}</span>
                        </div>
                    </div>

                    <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-2xl p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Service Address</label>
                                <input
                                    {...register("address")}
                                    placeholder="123 Example St"
                                    className="w-full bg-white border border-[#024653]/10 rounded-xl p-4 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">City</label>
                                <input
                                    {...register("city")}
                                    placeholder="Spokane"
                                    className="w-full bg-white border border-[#024653]/10 rounded-xl p-4 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                        </div>

                        <div className="bg-[#024653] text-white rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-4 shadow-xl shadow-[#024653]/20">
                            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                                <Building2 size={32} className="text-[#05D16E]" />
                            </div>
                            <div className="space-y-1">
                                <h3 className="text-sm font-black uppercase tracking-widest">Adding another Property?</h3>
                                <p className="text-[10px] opacity-40 uppercase tracking-widest font-bold">Save this location and start the next specs.</p>
                            </div>
                            <button
                                type="button"
                                onClick={handleAddAnother}
                                className="bg-[#05D16E] hover:bg-[#05D16E]/90 text-[#024653] px-8 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-lg active:scale-95 flex items-center gap-3"
                            >
                                <Plus size={14} strokeWidth={3} />
                                Add Another Property
                            </button>
                        </div>
                    </div>
                </div>

                {/* 2. PORTFOLIO QUEUE */}
                {portfolio.length > 0 && (
                    <div className="flex flex-col space-y-4">
                        <div className="flex items-center gap-3 ml-1">
                            <div className="w-5 h-5 rounded-md bg-[#111111] flex items-center justify-center shadow-lg shadow-black/10">
                                <Building size={12} className="text-white" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Portfolio Queue ({portfolio.length})</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {portfolio.map((prop) => (
                                <div key={prop.id} className="bg-white border-2 border-[#024653]/5 rounded-2xl p-6 flex flex-col gap-4 relative group hover:border-[#05D16E]/20 transition-all">
                                    <button
                                        type="button"
                                        onClick={() => removeProperty(prop.id)}
                                        className="absolute top-4 right-4 text-[#024653]/20 hover:text-red-500 transition-colors"
                                    >
                                        <Trash2 size={14} />
                                    </button>

                                    <div className="space-y-1">
                                        <p className="text-[8px] font-black uppercase tracking-widest text-[#05D16E]">{prop.cleaningType}</p>
                                        <h4 className="text-xs font-black text-[#024653] uppercase tracking-tight truncate pr-6">{prop.address}</h4>
                                        <p className="text-[9px] font-bold text-[#024653]/40 uppercase tracking-widest">{prop.city}, {prop.zipCode}</p>
                                    </div>

                                    <div className="flex items-center gap-4 pt-4 border-t border-[#024653]/5">
                                        <div className="text-[9px] font-black text-[#024653]/40">
                                            <span className="text-[#024653]">{prop.bedrooms}</span> BEDS
                                        </div>
                                        <div className="text-[9px] font-black text-[#024653]/40">
                                            <span className="text-[#024653]">{prop.bathrooms}</span> BATHS
                                        </div>
                                        <div className="text-[10px] font-black text-[#024653] ml-auto">
                                            {prop.sqFt} SQFT
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

