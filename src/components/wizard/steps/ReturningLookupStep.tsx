"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { Search, User } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useWizardAction } from "../WizardActionContext";

interface ReturningLookupStepProps {
    onBack: () => void;
    onFound: (data: any) => void; // Mock data
}

export default function ReturningLookupStep({ onBack, onFound }: ReturningLookupStepProps) {
    const { register, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const phone = watch("phone") || "";
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback(async () => {
        setLoading(true);
        // Simulate API
        setTimeout(() => {
            setLoading(false);
            onFound({ name: "John Doe", properties: [1, 2] });
        }, 1500);
    }, [onFound]);

    useEffect(() => {
        setAction({
            label: "Find My Profile",
            disabled: phone.length < 10,
            isLoading: loading,
            loadingLabel: "Searching...",
            onClick: handleSearch,
            icon: <Search size={18} strokeWidth={2.5} />,
            secondaryContent: (
                <button onClick={onBack} className="w-full text-[10px] font-black uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors py-2 text-center">
                    I&apos;m a new customer
                </button>
            )
        });
    }, [phone, loading, onBack, setAction, handleSearch]); // Re-run when phone or loading changes

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Welcome <br /> <span className="text-[#05D16E]">Back!</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Enter your phone number to find your account</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">
                        <div className="relative">
                            <input
                                {...register("phone")}
                                type="tel"
                                placeholder="(555) 123-4567"
                                autoComplete="tel"
                                className={`
                                    w-full p-6 text-center text-3xl font-black tracking-[0.1em] text-[#024653] 
                                    border-b-4 border-slate-100 focus:border-[#05D16E] outline-none transition-all bg-transparent
                                    placeholder:text-slate-200 placeholder:font-medium placeholder:tracking-normal
                                    [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset]
                                    [&:-webkit-autofill]:-webkit-text-fill-color-[#024653]
                                `}
                                style={{ caretColor: "#05D16E" }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
