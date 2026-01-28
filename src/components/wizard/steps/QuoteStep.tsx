"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState, useCallback } from "react";
import { ArrowRight } from "lucide-react";

interface QuoteStepProps {
    onNext: () => void;
}

export default function QuoteStep({ onNext }: QuoteStepProps) {
    const { register, watch, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNext = useCallback(async () => {
        setIsSubmitting(true);
        try {
            const { calculateTotal } = await import("@/lib/utils/pricing");
            const { createLead, updateLead, getPricingConfig } = await import("@/app/actions/admin");

            // Get latest pricing config
            const configRes = await getPricingConfig();
            const config = configRes.success ? configRes.config : {};

            const total = calculateTotal(data, config);
            const leadData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                serviceType: data.serviceType,
                frequency: data.frequency,
                totalPrice: total,
                details: data,
            };

            let res;
            if (data.leadId) {
                // Update existing lead
                res = await updateLead(Number(data.leadId), leadData);
            } else {
                // Create new lead
                res = await createLead(leadData);
            }

            if (res.success) {
                const newLeadId = (res as any).leadId;
                if (newLeadId) setValue("leadId", newLeadId);
                onNext();
            } else {
                console.error(res.error);
                // Ideally show a toast here
            }
        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    }, [data, onNext, setValue]);

    useEffect(() => {
        const isValid = data.firstName && data.lastName && data.email && data.phone;
        setAction({
            label: "Select Schedule",
            disabled: !isValid,
            isLoading: isSubmitting,
            onClick: handleNext
        });
    }, [data.firstName, data.lastName, data.email, data.phone, isSubmitting, setAction, handleNext]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Contact <br /> <span className="text-[#05D16E]">Details</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Who should we send the booking confirmation to?</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">First Name</label>
                                <input
                                    {...register("firstName")}
                                    placeholder="Jane"
                                    className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:-webkit-text-fill-color-[#024653]"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Last Name</label>
                                <input
                                    {...register("lastName")}
                                    placeholder="Doe"
                                    className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:-webkit-text-fill-color-[#024653]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Email Address</label>
                            <input
                                {...register("email")}
                                type="email"
                                placeholder="jane@example.com"
                                className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:-webkit-text-fill-color-[#024653]"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Phone Number</label>
                            <input
                                {...register("phone")}
                                type="tel"
                                placeholder="(555) 123-4567"
                                className="w-full p-4 bg-transparent border-2 border-slate-100 rounded-xl font-bold text-[#024653] focus:border-[#05D16E] outline-none transition-all placeholder:text-slate-200 placeholder:font-medium [&:-webkit-autofill]:shadow-[0_0_0_1000px_white_inset] [&:-webkit-autofill]:-webkit-text-fill-color-[#024653]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
