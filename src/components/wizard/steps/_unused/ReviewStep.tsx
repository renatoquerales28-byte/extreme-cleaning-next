"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useMemo } from "react";
import { Calendar, MapPin, User, CheckCircle2, Sparkles, Edit3, ArrowRight, ShieldCheck, Target } from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { calculateTotal } from "@/lib/utils/pricing";

interface ReviewStepProps {
    onNext: () => void;
    onEditStep: (stepId: any) => void;
}

export default function ReviewStep({ onNext, onEditStep }: ReviewStepProps) {
    const { watch } = useFormContext<WizardData>();
    const data = watch();
    const { setAction } = useWizardAction();

    const total = useMemo(() => calculateTotal(data), [data]);
    const formattedDate = data.serviceDate ? format(new Date(data.serviceDate), "EEEE, MMM do") : "Pending";

    useEffect(() => {
        setAction({
            label: "Confirm My Booking",
            onClick: onNext,
            disabled: false,
            icon: <CheckCircle2 size={18} strokeWidth={4} />
        });
    }, [onNext, setAction]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: MANIFEST SUMMARY */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <Target size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Booking Manifest</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 lg:p-6 space-y-3">
                        <SummaryBlock
                            title="The Service"
                            value={data.serviceType === 'residential' ? 'Residential Elite' : data.serviceType === 'commercial' ? 'Commercial Pro' : 'Property Master'}
                            sub={`${data.cleaningType?.replace('_', ' ')} · ${data.bedrooms}br / ${data.bathrooms}ba · Approx ${data.sqFt}sqft`}
                            icon={Sparkles}
                            stepId="space_config"
                            onEdit={onEditStep}
                        />
                        <SummaryBlock
                            title="The Logistics"
                            value={`${formattedDate}`}
                            sub={`Starting at ${data.serviceTime} · ${data.address}`}
                            icon={Calendar}
                            stepId="logistics"
                            onEdit={onEditStep}
                        />
                        <SummaryBlock
                            title="The Contact"
                            value={`${data.firstName} ${data.lastName}`}
                            sub={`${data.email} · ${data.phone}`}
                            icon={User}
                            stepId="price_and_quote"
                            onEdit={onEditStep}
                        />
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: FINAL AUTHORIZATION */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <ShieldCheck size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Final Authorization</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 flex flex-col justify-between items-center text-center relative overflow-hidden">
                        <div className="bg-white border-2 border-[#05D16E]/20 rounded-2xl p-8 shadow-2xl shadow-[#05D16E]/5 w-full relative z-10">
                            <div className="absolute top-2 right-4 text-[#05D16E] opacity-10">
                                <ShieldCheck size={50} />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#05D16E] block mb-4 italic">Commitment Price</span>
                            <div className="flex items-start justify-center text-[#024653]">
                                <span className="text-2xl font-black mt-2 opacity-20 pr-1">$</span>
                                <span className="text-[80px] font-black tracking-tighter tabular-nums leading-none">
                                    {data.totalPrice || total}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-4 w-full pt-8 relative z-10">
                            <div className="flex items-center justify-center gap-3">
                                <div className="w-1.5 h-1.5 rounded-full bg-[#05D16E] animate-pulse" />
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#024653]">Verified Elite Standards</span>
                            </div>
                            <p className="text-[8px] font-bold text-[#024653]/40 leading-relaxed max-w-[240px] mx-auto">
                                By confirming, you authorize our elite crews to transform your space. Changes allowed up to 24h prior.
                            </p>
                        </div>

                        {/* Background Decoration */}
                        <div className="absolute -left-20 -bottom-20 w-64 h-64 bg-[#05D16E]/5 rounded-full blur-3xl pointer-events-none" />
                    </div>
                </div>

            </div>
        </div>
    );
}

function SummaryBlock({ title, value, sub, icon: Icon, onEdit, stepId }: any) {
    return (
        <div className="group bg-white border border-[#024653]/5 rounded-xl p-4 transition-all flex items-center justify-between hover:border-[#024653]/20 hover:shadow-md">
            <div className="flex items-center gap-4 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-[#024653]/5 flex items-center justify-center text-[#024653] group-hover:bg-[#05D16E] group-hover:text-white transition-all">
                    <Icon size={18} />
                </div>
                <div className="text-left space-y-0.5 min-w-0">
                    <span className="text-[7px] font-black uppercase tracking-widest text-[#05D16E]">{title}</span>
                    <h4 className="text-xs font-black text-[#024653] tracking-tight leading-none mb-1 truncate">{value}</h4>
                    <p className="text-[9px] font-bold text-[#024653]/40 leading-none truncate">{sub}</p>
                </div>
            </div>
            <button
                onClick={() => onEdit(stepId)}
                className="w-8 h-8 rounded-md bg-[#024653]/5 flex items-center justify-center text-[#024653]/20 hover:text-white hover:bg-[#024653] transition-all shrink-0 ml-4 group-hover:opacity-100"
            >
                <Edit3 size={14} />
            </button>
        </div>
    );
}
