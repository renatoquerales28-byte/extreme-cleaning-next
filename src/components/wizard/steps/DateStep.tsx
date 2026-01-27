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
    const selectedDate = watch("serviceDate");
    const selectedTime = watch("serviceTime");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const leadId = watch("leadId");

    // Date validation: block past dates
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to midnight

    const isDateDisabled = (date: Date) => {
        return date < today;
    };

    const handleContinue = useCallback(async () => {
        // Preventive validation
        if (!selectedDate || !selectedTime) {
            console.error("Date or time not selected");
            return;
        }

        // Validate date is valid
        const dateObj = new Date(selectedDate);
        if (isNaN(dateObj.getTime())) {
            console.error("Invalid date format");
            return;
        }

        // Validate date is not in the past
        if (dateObj < today) {
            console.error("Cannot select past date");
            return;
        }

        setIsSubmitting(true);
        try {
            if (!leadId) {
                console.error("No lead ID found");
                // TODO: Show error toast to user
                onNext(); // Fallback for testing
                return;
            }

            const { updateLead } = await import("@/app/actions/admin");
            const res = await updateLead(leadId, {
                serviceDate: dateObj,
                serviceTime: selectedTime
            });

            if (res.success) {
                onNext();
            } else {
                console.error("Failed to update lead:", res.error);
                // TODO: Show error toast to user
            }
        } catch (error) {
            console.error("Unexpected error:", error);
            // TODO: Show generic error toast
        } finally {
            setIsSubmitting(false);
        }
    }, [leadId, selectedDate, selectedTime, onNext, today]);

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
    }, [selectedDate, selectedTime, isSubmitting, setAction, handleContinue]);

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
                        <div className="bg-white p-6 rounded-[2rem] border-2 border-slate-50 shadow-sm flex justify-center relative">
                            <Calendar
                                mode="single"
                                selected={selectedDate ? new Date(selectedDate) : undefined}
                                onSelect={(date) => {
                                    if (date && date >= today) {
                                        setValue("serviceDate", date.toISOString());
                                    }
                                }}
                                disabled={isDateDisabled}
                                className="rounded-md border-none"
                            />
                            {isSubmitting && (
                                <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-[2rem]">
                                    <div className="animate-spin h-8 w-8 border-4 border-[#024653] border-t-transparent rounded-full" />
                                </div>
                            )}
                        </div>

                        {/* Times */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {timeSlots.map((time) => (
                                <button
                                    key={time}
                                    onClick={() => setValue("serviceTime", time)}
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
