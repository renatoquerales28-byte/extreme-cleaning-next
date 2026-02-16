"use client";

import { useFormContext, Controller } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../../WizardActionContext";
import { useEffect, useState, useCallback } from "react";
import { Calendar as CalendarIcon, Clock, MapPin, Loader2, ArrowRight, Target, ShieldCheck, Phone } from "lucide-react";
import { SimpleCalendar } from "@/components/ui/SimpleCalendar";
import { getAvailableSlots } from "@/app/actions/calendar";
import { toast } from "sonner";

interface LogisticsStepProps {
    onNext: () => void;
}

export default function LogisticsStep({ onNext }: LogisticsStepProps) {
    const { register, watch, control, setValue } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);

    const loadSlots = useCallback(async (date: Date) => {
        setIsLoadingSlots(true);
        try {
            const res = await getAvailableSlots(date);
            if (res.success && res.slots) {
                setAvailableSlots(res.slots);
            } else {
                setAvailableSlots([]);
                if (res.reason) toast.info(res.reason);
            }
        } catch (e) {
            toast.error("Error loading time slots");
        } finally {
            setIsLoadingSlots(false);
        }
    }, []);

    useEffect(() => {
        if (data.serviceDate) {
            loadSlots(new Date(data.serviceDate));
        }
    }, [data.serviceDate, loadSlots]);

    useEffect(() => {
        const isValid = data.serviceDate && data.serviceTime && data.address && data.city && data.phone;
        setAction({
            label: "Final Verification",
            disabled: !isValid,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [data, onNext, setAction]);

    return (
        <div className="w-full flex-1 flex flex-col justify-center py-2">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: CHRONOS PROTOCOL (Calendar) */}
                <div className="flex flex-col space-y-3">
                    <div className="flex items-center gap-2 ml-1">
                        <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            <CalendarIcon size={10} className="text-white" />
                        </div>
                        <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">1. Selection Window</span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 flex flex-col">
                        <div className="bg-white border-2 border-[#024653]/5 rounded-xl p-2 shadow-sm">
                            <Controller
                                control={control}
                                name="serviceDate"
                                render={({ field }) => (
                                    <SimpleCalendar
                                        mode="single"
                                        selected={field.value ? new Date(field.value) : undefined}
                                        onSelect={(date) => {
                                            field.onChange(date?.toISOString());
                                            if (date) loadSlots(date);
                                        }}
                                        disabled={(date) => date < new Date() || date.getDay() === 0}
                                        className="w-full"
                                    />
                                )}
                            />
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: LOGISTICS HUB */}
                <div className="flex flex-col space-y-6">

                    {/* TOP: TIME SLOTS */}
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 ml-1">
                            <div className="w-4 h-4 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                                <Clock size={10} className="text-white" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">2. Arrival Protocol</span>
                        </div>
                        <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-4 min-h-[140px]">
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                                {isLoadingSlots ? (
                                    Array.from({ length: 4 }).map((_, i) => (
                                        <div key={i} className="h-10 bg-white rounded-lg animate-pulse border border-[#024653]/5" />
                                    ))
                                ) : availableSlots.length > 0 ? (
                                    availableSlots.map((time) => {
                                        const isSelected = data.serviceTime === time;
                                        return (
                                            <button
                                                key={time}
                                                type="button"
                                                onClick={() => setValue("serviceTime", time)}
                                                className={`
                                                    p-3 rounded-lg text-[10px] font-black transition-all border text-center uppercase tracking-widest
                                                    ${isSelected
                                                        ? "bg-[#024653] border-[#024653] text-white shadow-xl shadow-[#024653]/20"
                                                        : "bg-white border-[#024653]/10 text-[#024653] hover:border-[#024653]/30"
                                                    }
                                                `}
                                            >
                                                {time}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="col-span-full h-24 flex flex-col items-center justify-center text-[#024653]/20 italic bg-white/50 rounded-lg">
                                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-center px-4">
                                            {data.serviceDate ? "All windows occupied" : "Scan date for sync"}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* BOTTOM: LOCATION DETAILS */}
                    <div className="space-y-3 flex-1 flex flex-col">
                        <div className="flex items-center gap-2 ml-1">
                            <div className="w-4 h-4 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                                <MapPin size={10} className="text-white" />
                            </div>
                            <span className="text-[9px] font-black uppercase tracking-[0.25em] text-[#024653]">3. Deployment Point</span>
                        </div>
                        <div className="bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 flex-1 space-y-4">
                            <div className="space-y-2">
                                <label className="text-[8px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Street Address</label>
                                <div className="relative">
                                    <input
                                        {...register("address")}
                                        placeholder="123 Elite Ave"
                                        className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">City Hub</label>
                                    <input
                                        {...register("city")}
                                        placeholder="Spokane"
                                        className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[8px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Contact Signal</label>
                                    <div className="relative">
                                        <Phone size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#024653]/20" />
                                        <input
                                            {...register("phone")}
                                            placeholder="509-000-0000"
                                            className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 pl-9 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 mt-auto border-t border-[#024653]/5 opacity-30 flex items-center justify-between">
                                <ShieldCheck size={12} className="text-[#05D16E]" />
                                <p className="text-[8px] font-black uppercase tracking-[0.2em]">Spokane Logistics Secured</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
