"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

interface DateStepProps {
    onNext: () => void;
}

export default function DateStep({ onNext }: DateStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedDate = watch("date");
    const selectedTime = watch("time");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleContinue = useCallback(() => {
        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            onNext();
        }, 500);
    }, [onNext]);

    useEffect(() => {
        setAction({
            label: isSubmitting ? "Saving..." : "Continue to Address",
            disabled: !selectedDate || !selectedTime || isSubmitting,
            onClick: handleContinue,
            secondaryContent: selectedDate && selectedTime && (
                <div className="pointer-events-auto flex items-center justify-center gap-2 px-6 py-2 bg-[#05D16E]/10 border-2 border-[#05D16E]/20 rounded-full w-fit">
                    <CheckCircle2 size={12} className="text-[#05D16E]" />
                    <span className="text-[#024653] font-black text-[9px] uppercase tracking-widest">
                        {format(new Date(selectedDate), "MMM do")} at {selectedTime}
                    </span>
                </div>
            )
        });
    }, [selectedDate, selectedTime, isSubmitting, onNext, setAction]);

    const timeSlots = ["08:00 AM", "10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM"];

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            When can <br /> <span className="text-[#05D16E]">we come?</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">Select date and time</p>
                    </div>

                    <div className="flex flex-col gap-6">
                        {/* Calendar */}
                        <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm flex justify-center">
                            <Calendar
                                mode="single"
                                selected={selectedDate ? new Date(selectedDate) : undefined}
                                onSelect={(date) => setValue("date", date?.toISOString() || "")}
                                className="rounded-md border-none"
                            />
                        </div>

                        {/* Times */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setValue("time", time)}
                                    className={`p-3 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all ${selectedTime === time
                                        ? "bg-[#024653] border-[#024653] text-white"
                                        : "bg-white border-slate-50 text-[#024653]/60 hover:border-[#05D16E]"
                                        }`}
                                >
                                    {time}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
