"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState } from "react";
import { CheckCircle, MapPin } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { warmUpServer } from "@/app/actions/admin";

interface AddressStepProps {
    onSubmit: (data: WizardData) => void;
}

export default function AddressStep({ onSubmit }: AddressStepProps) {
    const { register, watch, handleSubmit, formState: { errors } } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Pre-warm server connection for faster final submission
    useEffect(() => {
        warmUpServer();
    }, []);

    const leadId = watch("leadId");

    useEffect(() => {
        setAction({
            label: isSubmitting ? "Saving..." : "Review Booking",
            disabled: isSubmitting,
            isLoading: isSubmitting,
            onClick: handleSubmit(async (d) => {
                setIsSubmitting(true);
                try {
                    if (!leadId) {
                        console.error("No leadId found");
                        onSubmit(d);
                        return;
                    }

                    const { updateLead } = await import("@/app/actions/admin");
                    const res = await updateLead(Number(leadId), {
                        details: d, // Save full wizard state into details
                        // Status remains draft until review
                    });

                    if (res.success) {
                        onSubmit(d);
                    } else {
                        console.error("Failed to update lead", res.error || "Unknown error");
                        // Fallback: Proceed to success step anyway so user isn't stuck
                        onSubmit(d);
                    }
                } catch (error) {
                    console.error(error);
                    onSubmit(d); // Fallback on crash
                } finally {
                    setIsSubmitting(false);
                }
            }, (errors) => {
                const firstError = Object.values(errors)[0];
                const msg = firstError?.message || "Please check required fields";
                toast.error(`Validation: ${msg}`);
                console.error("Validation errors:", errors);
            }),
            icon: <CheckCircle size={18} strokeWidth={2.5} />,
            secondaryContent: (
                <p className="pointer-events-auto text-[7px] text-center text-[#024653]/40 font-black uppercase tracking-[0.2em] max-w-sm leading-relaxed mb-4">
                    By confirming, you agree to our <Link href="#" className="text-[#05D16E] hover:underline">Terms</Link> & <Link href="#" className="text-[#05D16E] hover:underline">Privacy</Link>.
                </p>
            )
        });
    }, [isSubmitting, handleSubmit, onSubmit, setAction, leadId]);

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Where do <br /> <span className="text-[#05D16E]">we go?</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Enter the service address</p>
                    </div>

                    <div className="bg-white border-2 border-slate-50 p-8 rounded-[2rem] shadow-sm space-y-6">
                        <div className="space-y-4">
                            <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Address Line 1</label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#024653]/20" size={20} />
                                <input
                                    {...register("address")}
                                    placeholder="123 Main St"
                                    className={`w-full pl-12 p-4 bg-slate-50 border-2 rounded-xl font-bold text-[#024653] outline-none transition-all ${errors.address ? 'border-rose-400' : 'border-slate-100 focus:border-[#05D16E]'}`}
                                />
                            </div>
                            {errors.address && <p className="text-[8px] text-rose-500 font-bold ml-4 uppercase tracking-widest">{errors.address.message}</p>}
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">City</label>
                                <input
                                    {...register("city")}
                                    placeholder="Miami"
                                    className={`w-full p-4 bg-slate-50 border-2 rounded-xl font-bold text-[#024653] outline-none transition-all ${errors.city ? 'border-rose-400' : 'border-slate-100 focus:border-[#05D16E]'}`}
                                />
                                {errors.city && <p className="text-[8px] text-rose-500 font-bold ml-4 uppercase tracking-widest">{errors.city.message}</p>}
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-wider text-[#024653]">Zip</label>
                                <input
                                    {...register("zipCode")}
                                    readOnly
                                    className="w-full p-4 bg-slate-100 border-2 border-slate-100 rounded-xl font-bold text-[#024653]/50 outline-none cursor-not-allowed"
                                />
                                {errors.zipCode && <p className="text-[8px] text-rose-500 font-bold ml-4 uppercase tracking-widest">{errors.zipCode.message}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
