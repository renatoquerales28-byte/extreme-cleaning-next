import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../../WizardActionContext";
import { useEffect, useState } from "react";
import { Check, MapPin, Phone, Building2 } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { warmUpServer } from "@/app/actions/admin";
import { motion } from "framer-motion";

interface AddressStepProps {
    onSubmit: (data: WizardData) => void;
}

export default function AddressStep({ onSubmit }: AddressStepProps) {
    const { register, watch, handleSubmit, formState: { errors } } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();
    const [isSubmitting, setIsSubmitting] = useState(false);

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
                        onSubmit(d);
                        return;
                    }

                    const { updateLead } = await import("@/app/actions/admin");
                    const res = await updateLead(Number(leadId), {
                        details: d,
                    });

                    if (res.success) {
                        onSubmit(d);
                    } else {
                        onSubmit(d);
                    }
                } catch (error) {
                    onSubmit(d);
                } finally {
                    setIsSubmitting(false);
                }
            }, (errs) => {
                const firstError = Object.values(errs)[0];
                toast.error(`Validation: ${firstError?.message || "Please check required fields"}`);
            }),
            icon: <Check size={18} strokeWidth={4} />,
            secondaryContent: (
                <p className="pointer-events-auto text-[8px] text-center text-[#024653]/40 font-bold uppercase tracking-[0.2em] max-w-sm leading-relaxed mb-4 px-6">
                    By confirming, you agree to our <Link href="#" className="text-[#05D16E] hover:underline">Terms</Link> & <Link href="#" className="text-[#05D16E] hover:underline">Privacy</Link>.
                </p>
            )
        });
    }, [isSubmitting, handleSubmit, onSubmit, setAction, leadId]);

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl bg-white p-8 md:p-12 rounded-xl border border-[#024653]/5 shadow-sm space-y-8">

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                        <Building2 size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#024653]">Service Address</h3>
                        <p className="text-sm text-[#024653]/40">Where should we perform the magic?</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Full Address */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">Street Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#024653]/20" size={18} />
                            <input
                                {...register("address")}
                                placeholder="123 Ocean Drive"
                                className={`w-full pl-12 pr-4 py-4 bg-[#F9F8F2] rounded-xl font-bold text-[#024653] border-none outline-none focus:ring-2 transition-all placeholder:text-[#024653]/10 ${errors.address ? 'ring-2 ring-rose-400/20' : 'focus:ring-[#05D16E]/20'}`}
                            />
                        </div>
                    </div>

                    {/* City */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">City</label>
                        <input
                            {...register("city")}
                            placeholder="Miami"
                            className={`w-full px-4 py-4 bg-[#F9F8F2] rounded-xl font-bold text-[#024653] border-none outline-none focus:ring-2 transition-all placeholder:text-[#024653]/10 ${errors.city ? 'ring-2 ring-rose-400/20' : 'focus:ring-[#05D16E]/20'}`}
                        />
                    </div>

                    {/* Zip (ReadOnly as it's from first step) */}
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">Zip Code</label>
                        <input
                            {...register("zipCode")}
                            readOnly
                            className="w-full px-4 py-4 bg-[#024653]/5 rounded-xl font-bold text-[#024653]/30 border-none outline-none cursor-not-allowed"
                        />
                    </div>

                    {/* Phone Number */}
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#024653]/20" size={18} />
                            <input
                                {...register("phone")}
                                type="tel"
                                placeholder="(305) 555-0123"
                                className={`w-full pl-12 pr-4 py-4 bg-[#F9F8F2] rounded-xl font-bold text-[#024653] border-none outline-none focus:ring-2 transition-all placeholder:text-[#024653]/10 ${errors.phone ? 'ring-2 ring-rose-400/20' : 'focus:ring-[#05D16E]/20'}`}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #F9F8F2 inset !important;
                    -webkit-text-fill-color: #024653 !important;
                }
            `}</style>
        </div>
    );
}
