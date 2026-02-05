import React, { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { Check, Pencil, Calendar, MapPin, User, Home, Sparkles, Clock, Map } from "lucide-react";
import { format } from "date-fns";
import { calculateTotal } from "@/lib/utils/pricing";
import { toast } from "sonner";
import { updateLead, createLead, getPricingConfig } from "@/app/actions/admin";
import { submitBooking } from "@/app/actions/booking";
import { StepId } from "@/lib/wizard/config";
import { redeemPromoCode } from "@/app/actions/promotions";
import { motion } from "framer-motion";

interface ReviewStepProps {
    onNext: () => void;
    onEditStep: (step: StepId) => void;
}

const SummaryCard = ({ title, icon: Icon, children, stepId, onEdit }: { title: string, icon: any, children: React.ReactNode, stepId: StepId, onEdit: (id: StepId) => void }) => (
    <div className="bg-white p-6 rounded-[2rem] border border-[#024653]/5 relative group flex items-start gap-4">
        <div className="w-12 h-12 rounded-2xl bg-[#024653]/5 flex items-center justify-center text-[#024653] shrink-0">
            <Icon size={20} />
        </div>
        <div className="flex-1 min-w-0">
            <h3 className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 mb-1">{title}</h3>
            <div className="text-[#024653]">
                {children}
            </div>
        </div>
        <button
            type="button"
            onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                onEdit(stepId);
            }}
            className="p-2 text-[#024653]/20 hover:text-[#05D16E] transition-colors"
        >
            <Pencil size={14} />
        </button>
    </div>
);

export default function ReviewStep({ onNext, onEditStep }: ReviewStepProps) {
    const { watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);
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
            icon: <Check size={18} strokeWidth={4} />,
            onClick: async () => {
                setIsSubmitting(true);
                const toastId = toast.loading("Securing your slot...");
                const processStart = Date.now();

                try {
                    const finalBookingPrice = data.totalPrice || total || 0;
                    const dbPayload = {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        phone: data.phone,
                        serviceType: data.serviceType,
                        frequency: data.frequency,
                        totalPrice: finalBookingPrice,
                        status: "booked" as const,
                        serviceDate: data.serviceDate ? new Date(data.serviceDate) : undefined,
                        serviceTime: data.serviceTime,
                        details: data
                    };

                    let dbSuccess = false;
                    let dbError = null;

                    if (data.leadId) {
                        const res = await updateLead(Number(data.leadId), {
                            status: "booked",
                            totalPrice: finalBookingPrice,
                            serviceDate: dbPayload.serviceDate,
                            serviceTime: data.serviceTime,
                            details: data
                        });
                        dbSuccess = res.success;
                        if (!res.success) dbError = res.error;
                    } else {
                        const res = await createLead(dbPayload as any);
                        dbSuccess = res.success;
                        if (!res.success) dbError = res.error;
                    }

                    if (!dbSuccess) throw new Error(dbError || 'Database failure');

                    submitBooking(data).catch(console.error);

                    if (data.promoCode) {
                        redeemPromoCode(data.promoCode).catch(console.error);
                    }

                    toast.success("Booking confirmed!", { id: toastId });
                    onNext();
                } catch (e: any) {
                    toast.error(`Booking failed: ${e.message}`, { id: toastId });
                } finally {
                    setIsSubmitting(false);
                }
            }
        });
    }, [isSubmitting, onNext, data, setAction, total]);

    const formattedDate = data.serviceDate ? format(new Date(data.serviceDate), "MMMM do, yyyy") : "Not selected";

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">

                {/* Summary Cards */}
                <div className="space-y-4">
                    <SummaryCard title="Service" icon={Home} stepId="service" onEdit={onEditStep}>
                        <p className="font-bold text-lg leading-none mb-1 capitalize">{data.serviceType} Clean</p>
                        <p className="text-sm opacity-60">{(data.cleaningType || 'standard').replace('_', ' ')} intensity · {data.frequency}</p>
                    </SummaryCard>

                    <SummaryCard title="Schedule" icon={Calendar} stepId="date" onEdit={onEditStep}>
                        <p className="font-bold text-lg leading-none mb-1">{formattedDate}</p>
                        <p className="text-sm opacity-60">Starting at {data.serviceTime}</p>
                    </SummaryCard>

                    <SummaryCard title="Location" icon={MapPin} stepId="address" onEdit={onEditStep}>
                        <p className="font-bold text-lg leading-none mb-1 truncate">{data.address}</p>
                        <p className="text-sm opacity-60">{data.city}, {data.zipCode}</p>
                    </SummaryCard>
                </div>

                <div className="space-y-4 flex flex-col h-full">
                    <SummaryCard title="Contact" icon={User} stepId="quote" onEdit={onEditStep}>
                        <p className="font-bold text-lg leading-none mb-1">{data.firstName} {data.lastName}</p>
                        <p className="text-sm opacity-60 truncate">{data.email}</p>
                    </SummaryCard>

                    {/* Price Card */}
                    <div className="flex-1 bg-[#024653] p-8 rounded-[2.5rem] text-white flex flex-col justify-center items-center text-center shadow-xl shadow-[#024653]/10 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-2 relative z-10"
                        >
                            <span className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-40">Estimated Quote</span>
                            <div className="flex flex-col items-center">
                                {data.discountApplied && (
                                    <span className="text-sm font-bold text-white/20 line-through mb-1">
                                        ${data.originalPrice || total}
                                    </span>
                                )}
                                <div className="flex items-baseline gap-1">
                                    <span className="text-6xl font-bold tracking-tighter">${data.totalPrice || total}</span>
                                    <span className="text-sm font-bold opacity-40">/visit</span>
                                </div>
                            </div>
                            <div className="pt-4 flex items-center justify-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E] animate-pulse" />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#05D16E]">Available Now</span>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
