"use client";

import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { CheckCircle2, Calendar, MapPin } from "lucide-react";
import { format } from "date-fns";

export default function SuccessStep() {
    const { watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    useEffect(() => {
        // Hide/Reset the main action button or change it to "Home"
        setAction({
            label: "Back to Home",
            disabled: false,
            onClick: () => window.location.href = "/", // Force consistency
            secondaryContent: null
        });
    }, [setAction]);

    const formattedDate = data.serviceDate ? format(new Date(data.serviceDate), "EEEE, MMMM do, yyyy") : "";

    return (
        <div className="h-full w-full relative flex flex-col items-center justify-center p-6">
            <div className="max-w-md w-full bg-white rounded-[2.5rem] p-8 md:p-12 shadow-xl border-2 border-slate-50 text-center space-y-8 animate-in zoom-in-95 duration-500">

                <div className="w-24 h-24 bg-[#05D16E]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={48} className="text-[#05D16E]" />
                </div>

                <div className="space-y-2">
                    <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-[#024653]">
                        Booking <br /><span className="text-[#05D16E]">Confirmed!</span>
                    </h2>
                    <p className="text-[#024653]/60 font-medium">We've sent a confirmation email to <br /> <span className="text-[#024653] font-bold">{data.email}</span></p>
                </div>

                <div className="bg-slate-50 rounded-2xl p-6 space-y-4 text-left">
                    <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                            <Calendar size={20} className="text-[#05D16E]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]/40">When</p>
                            <p className="font-bold text-[#024653]">{formattedDate}</p>
                            <p className="text-sm text-[#024653]/80">@ {data.serviceTime}</p>
                        </div>
                    </div>

                    <div className="h-px bg-slate-200" />

                    <div className="flex items-start gap-4">
                        <div className="bg-white p-2 rounded-xl shadow-sm">
                            <MapPin size={20} className="text-[#05D16E]" />
                        </div>
                        <div>
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]/40">Where</p>
                            <p className="font-bold text-[#024653]">{data.address}</p>
                            <p className="text-sm text-[#024653]/80">{data.city}, {data.state} {data.zipCode}</p>
                        </div>
                    </div>
                </div>

                <p className="text-xs text-[#024653]/40 font-medium pt-4">
                    Questions? Call us at <span className="font-bold text-[#024653]">(555) 123-4567</span>
                </p>
            </div>
            {/* Mobile Header (Hidden on Desktop) */}
            <div className="absolute top-8 left-0 w-full text-center md:hidden pointer-events-none">
                {/* Optional: Add confetti or similar visual feedback here */}
            </div>
        </div>
    );
}
