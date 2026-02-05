"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { Search, Phone } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { useWizardAction } from "../WizardActionContext";
import { motion } from "framer-motion";

interface ReturningLookupStepProps {
    onBack: () => void;
    onFound: (data: any) => void;
}

export default function ReturningLookupStep({ onBack, onFound }: ReturningLookupStepProps) {
    const { register, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const phone = watch("phone") || "";
    const [loading, setLoading] = useState(false);

    const handleSearch = useCallback(async () => {
        setLoading(true);
        try {
            const { findCustomerByPhone } = await import("@/app/actions/admin");
            const res = await findCustomerByPhone(phone);
            if (res.success) {
                onFound(res);
            } else {
                import("sonner").then(({ toast }) => toast.error(res.error || "No profile found"));
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, [phone, onFound]);

    useEffect(() => {
        setAction({
            label: "Find My Profile",
            disabled: phone.length < 10 || loading,
            isLoading: loading,
            onClick: handleSearch,
            icon: <Search size={18} strokeWidth={4} />,
            secondaryContent: (
                <button onClick={onBack} className="w-full text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors py-2 text-center">
                    I&apos;m a new customer →
                </button>
            )
        });
    }, [phone, loading, onBack, setAction, handleSearch]);

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-2xl bg-white p-10 md:p-14 rounded-[2.5rem] border border-[#024653]/5 shadow-sm space-y-10"
            >
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                        <Phone size={24} />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold text-[#024653]">Welcome Back</h3>
                        <p className="text-sm text-[#024653]/40">Search for your current profile</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/40 ml-1">Phone Number</label>
                    <div className="relative">
                        <input
                            {...register("phone")}
                            type="tel"
                            placeholder="(305) 555-0123"
                            autoComplete="tel"
                            className="w-full bg-[#F9F8F2] p-8 rounded-[2rem] text-3xl font-bold tracking-tight text-[#024653] border-none outline-none focus:ring-2 focus:ring-[#05D16E]/20 transition-all text-center placeholder:text-[#024653]/10 phone-input"
                        />
                    </div>
                    <p className="text-[10px] text-center text-[#024653]/30 uppercase tracking-[0.2em]">Enter the number linked to your previous bookings</p>
                </div>
            </motion.div>

            <style jsx>{`
                .phone-input:-webkit-autofill {
                    -webkit-box-shadow: 0 0 0 1000px #F9F8F2 inset !important;
                    -webkit-text-fill-color: #024653 !important;
                }
            `}</style>
        </div>
    );
}
