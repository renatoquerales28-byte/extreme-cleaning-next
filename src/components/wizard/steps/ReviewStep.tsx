"use client";

import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { CheckCircle2, Pencil, Calendar, MapPin, User, Home } from "lucide-react";
import { format } from "date-fns";
import { calculateTotal } from "@/lib/utils/pricing";
import { toast } from "sonner";
import { updateLead, createLead, getPricingConfig } from "@/app/actions/admin";
import { submitBooking } from "@/app/actions/booking";

interface ReviewStepProps {
    onNext: () => void;
    onEditStep: (step: number) => void;
}

export default function ReviewStep({ onNext, onEditStep }: ReviewStepProps) {
    const { watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Re-calculate total to display accurate price
    const [total, setTotal] = useState<number | null>(null);

    useEffect(() => {
        const fetchConfig = async () => {
            const res = await getPricingConfig();
            const config = res.success ? res.config : {};
            setTotal(calculateTotal(data, config));
        };
        fetchConfig();
    }, [data]);

    useEffect(() => {
        setAction({
            label: isSubmitting ? "Finalizing..." : "Confirm Booking",
            disabled: isSubmitting,
            isLoading: isSubmitting,
            icon: <CheckCircle2 size={18} strokeWidth={2.5} />,
            onClick: async () => {
                setIsSubmitting(true);
                const toastId = toast.loading("Securing your slot...");

                try {
                    let success = false;
                    let errorMsg = "";

                    // FINAL CLEANUP: Ensure all data is serializable and DB-friendly
                    const sanitizedData = {
                        ...data,
                        // Convert Date object back to ISO string if present
                        serviceDate: data.serviceDate instanceof Date
                            ? data.serviceDate.toISOString()
                            : data.serviceDate,
                        leadId: data.leadId ? Number(data.leadId) : undefined
                    };

                    // FINAL CLEANUP: Ensure all data matches the Server Action's expected types (Date objects, numbers)
                    const dbPayload = {
                        ...data,
                        serviceDate: data.serviceDate ? new Date(data.serviceDate) : undefined,
                        leadId: data.leadId ? Number(data.leadId) : undefined,
                        totalPrice: total || 0,
                        status: "booked" as const,
                        details: data
                    };

                    if (data.leadId) {
                        try {
                            const res = await updateLead(Number(data.leadId), {
                                status: "booked",
                                details: data
                            });

                            if (res.success) {
                                success = true;
                            } else {
                                console.warn("Update failed, attempting recovery", res.error);
                                // Session Recovery: use dbPayload (proper Dates)
                                const createRes = await createLead(dbPayload as any);
                                if (createRes.success) success = true;
                                else errorMsg = createRes.error || "Recovery failed";
                            }
                        } catch (err: any) {
                            errorMsg = err.message || "Server update error";
                        }
                    } else {
                        const createRes = await createLead(dbPayload as any);
                        if (createRes.success) success = true;
                        else errorMsg = createRes.error || "Creation failed";
                    }

                    if (success) {
                        // Send Receipt Logic
                        toast.loading("Sending confirmation...", { id: toastId });
                        try {
                            const emailRes = await submitBooking(dbPayload);
                            if (emailRes.success) {
                                toast.success("Confirmed! Receipt sent.", { id: toastId });
                            } else {
                                console.warn("Email warning:", emailRes.error);
                                toast.success("Booking confirmed!", { id: toastId });
                            }
                        } catch (emailErr) {
                            console.error("Email failed", emailErr);
                            toast.success("Booking confirmed!", { id: toastId });
                        }

                        if (typeof window !== 'undefined') localStorage.removeItem("wizard-data");
                        onNext();
                    } else {
                        toast.error(`Booking Error: ${errorMsg}`, { id: toastId });
                    }

                } catch (e: any) {
                    console.error("Critical error in ReviewStep:", e);
                    toast.error(`System Error: ${e.message || "Connection failed"}`, { id: toastId });
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    }, [isSubmitting, onNext, data, setAction, total]);

    const formattedDate = data.serviceDate ? format(new Date(data.serviceDate), "MMMM do, yyyy") : "Not selected";

    const Section = ({ title, icon: Icon, children, stepIndex }: any) => (
        <div className="bg-white p-6 rounded-3xl border-2 border-slate-50 relative group">
            <button
                onClick={() => onEditStep(stepIndex)}
                className="absolute top-6 right-6 p-2 bg-slate-50 text-[#024653]/40 rounded-full hover:bg-[#024653] hover:text-white transition-colors"
            >
                <Pencil size={14} />
            </button>
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-[#05D16E]/10 rounded-xl">
                    <Icon size={18} className="text-[#05D16E]" />
                </div>
                <h3 className="text-sm font-black uppercase tracking-wider text-[#024653]">{title}</h3>
            </div>
            <div className="pl-12 space-y-1">
                {children}
            </div>
        </div>
    );

    return (
        <div className="h-full w-full relative flex flex-col">
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2 md:hidden">
                        <h2 className="text-3xl font-black tracking-tighter text-[#024653] leading-tight">
                            Review <br /> <span className="text-[#05D16E]">Details</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Double check everything looks good.</p>
                    </div>

                    <div className="space-y-4">
                        <Section title="Service" icon={Home} stepIndex={2}>
                            <p className="font-bold text-[#024653] capitalize">{data.serviceType} Cleaning</p>
                            {data.serviceType === 'residential' && (
                                <p className="text-xs text-[#024653]/60">{data.bedrooms} Bed, {data.bathrooms} Bath, ~{data.sqFt} sqft</p>
                            )}
                            {data.serviceType === 'commercial' && (
                                <p className="text-xs text-[#024653]/60">{data.businessType}, {data.commSqFt} sqft</p>
                            )}
                            <p className="text-xs text-[#05D16E] font-bold mt-1 uppercase tracking-wider">{data.frequency} Plan</p>
                        </Section>

                        <Section title="Schedule" icon={Calendar} stepIndex={6}>
                            <p className="font-bold text-[#024653]">{formattedDate}</p>
                            <p className="text-xs text-[#024653]/60">@ {data.serviceTime}</p>
                        </Section>

                        <Section title="Location" icon={MapPin} stepIndex={7}>
                            <p className="font-bold text-[#024653]">{data.address}</p>
                            <p className="text-xs text-[#024653]/60">{data.city}, {data.zipCode}</p>
                        </Section>

                        <Section title="Contact" icon={User} stepIndex={5}>
                            <p className="font-bold text-[#024653]">{data.firstName} {data.lastName}</p>
                            <p className="text-xs text-[#024653]/60">{data.email}</p>
                            <p className="text-xs text-[#024653]/60">{data.phone}</p>
                        </Section>

                        {/* Total */}
                        <div className="bg-[#024653] p-8 rounded-[2rem] text-center text-white space-y-2 shadow-xl shadow-[#024653]/20">
                            <p className="text-[10px] font-black uppercase tracking-widest opacity-60">Estimated Total</p>
                            <div className="flex items-baseline justify-center gap-1">
                                <span className="text-5xl font-black">${total || "..."}</span>
                                <span className="text-sm font-bold opacity-60">/service</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
