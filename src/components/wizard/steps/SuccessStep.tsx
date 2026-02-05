import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { Check, Calendar, MapPin, PartyPopper, ArrowRight } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

export default function SuccessStep() {
    const { watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    useEffect(() => {
        setAction({
            label: "Explore Our Quality",
            disabled: false,
            onClick: () => window.location.href = "/",
            icon: <ArrowRight size={18} />,
            secondaryContent: null
        });
    }, [setAction]);

    const formattedDate = data.serviceDate ? format(new Date(data.serviceDate), "EEEE, MMMM do") : "";

    return (
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="max-w-md w-full bg-white rounded-[3rem] p-10 md:p-14 text-center space-y-10 border border-[#024653]/5 shadow-xl shadow-[#024653]/5"
            >
                {/* Celebratory Icon */}
                <div className="relative mx-auto w-24 h-24">
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1.2, rotate: [0, 10, -10, 0] }}
                        transition={{ delay: 0.2, type: "spring" }}
                        className="w-full h-full bg-[#05D16E] rounded-[2rem] flex items-center justify-center text-white shadow-lg shadow-[#05D16E]/20"
                    >
                        <Check size={48} strokeWidth={4} />
                    </motion.div>
                    <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                        className="absolute inset-x-[-15px] inset-y-[-15px] border-2 border-dashed border-[#05D16E]/20 rounded-[2.5rem]"
                    />
                </div>

                <div className="space-y-4">
                    <h2 className="text-4xl font-bold tracking-tighter text-[#024653]">
                        It&apos;s <span className="text-[#05D16E]">Official!</span>
                    </h2>
                    <p className="text-[#024653]/60 text-sm leading-relaxed">
                        We&apos;ve reserved your spot. A confirmation email is on its way to <br />
                        <span className="text-[#024653] font-bold">{data.email}</span>
                    </p>
                </div>

                {/* Booking Summary Card */}
                <div className="bg-[#F9F8F2] rounded-[2.5rem] p-8 space-y-6 text-left border border-[#024653]/5">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#024653] shadow-sm">
                            <Calendar size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#024653]/30">Arrival Window</p>
                            <p className="font-bold text-[#024653]">{formattedDate} @ {data.serviceTime}</p>
                        </div>
                    </div>

                    <div className="w-full h-px bg-[#024653]/5" />

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-[#024653] shadow-sm">
                            <MapPin size={18} />
                        </div>
                        <div>
                            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#024653]/30">Location</p>
                            <p className="font-bold text-[#024653] truncate max-w-[180px]">{data.address}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-2">
                    <p className="text-[10px] font-bold uppercase tracking-widest text-[#024653]/30">
                        Need help? <span className="text-[#024653] underline cursor-pointer hover:text-[#05D16E] transition-colors">Contact Support</span>
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
