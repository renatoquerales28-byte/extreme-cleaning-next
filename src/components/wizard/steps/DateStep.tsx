"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { getAvailableSlots } from "@/app/actions/calendar";

interface DateStepProps {
    onNext: () => void;
}

export default function DateStep({ onNext }: DateStepProps) {
    const { setValue, watch } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const selectedDate = watch("serviceDate");
    const selectedTime = watch("serviceTime");
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Slots state
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [isLoadingSlots, setIsLoadingSlots] = useState(false);
    const [slotError, setSlotError] = useState<string | null>(null);

    const leadId = watch("leadId");

    // Date validation: block past dates
    const today = useMemo(() => {
        const d = new Date();
        d.setHours(0, 0, 0, 0); // Normalize to midnight
        return d;
    }, []);

    const isDateDisabled = (date: Date) => {
        return date < today;
    };

    // Fetch slots when date changes
    useEffect(() => {
        const fetchSlots = async () => {
            if (!selectedDate) {
                setAvailableSlots([]);
                return;
            }

            setIsLoadingSlots(true);
            setSlotError(null);

            try {
                const dateObj = new Date(selectedDate);
                const res = await getAvailableSlots(dateObj);

                if (res.success && res.slots) {
                    setAvailableSlots(res.slots);
                    if (res.slots.length === 0) {
                        setSlotError(res.reason || "No slots available for this date");
                    }
                } else {
                    setSlotError("Could not load availability");
                    setAvailableSlots([]);
                }
            } catch (err) {
                console.error(err);
                setSlotError("Error loading slots");
            } finally {
                setIsLoadingSlots(false);
            }
        };

        fetchSlots();
    }, [selectedDate]);

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

    // Helper to format time for display (24h -> 12h)
    const formatTimeDisplay = (time: string) => {
        try {
            const [hours, minutes] = time.split(':');
            const date = new Date();
            date.setHours(parseInt(hours), parseInt(minutes));
            return format(date, "hh:mm a");
        } catch (e) {
            return time;
        }
    };

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
                                        setValue("serviceTime", undefined); // Clear time on date change
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
                        <div className="min-h-[200px]">
                            {isLoadingSlots ? (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 animate-pulse">
                                    {[1, 2, 3, 4, 5, 6].map((i) => (
                                        <div key={i} className="h-10 bg-slate-100 rounded-xl" />
                                    ))}
                                </div>
                            ) : slotError ? (
                                <div className="flex flex-col items-center justify-center h-full p-4 text-center border-2 border-slate-50 border-dashed rounded-xl bg-slate-50/50">
                                    <p className="text-[#024653] font-bold mb-1">Unavailable</p>
                                    <p className="text-xs text-slate-500">{slotError}</p>
                                </div>
                            ) : availableSlots.length === 0 && selectedDate ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl text-slate-400 text-sm">
                                    No available slots for this date
                                </div>
                            ) : !selectedDate ? (
                                <div className="flex flex-col items-center justify-center p-8 text-center bg-slate-50 rounded-xl text-slate-400 text-sm">
                                    Select a date first
                                </div>
                            ) : (
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                    {availableSlots.map((time) => (
                                        <button
                                            key={time}
                                            onClick={() => setValue("serviceTime", time)}
                                            className={`p-3 rounded-xl border-2 text-xs font-bold uppercase tracking-wider transition-all ${selectedTime === time
                                                ? "bg-[#024653] border-[#024653] text-white"
                                                : "bg-white border-slate-50 text-[#024653]/60 hover:border-[#05D16E]"
                                                }`}
                                        >
                                            {formatTimeDisplay(time)}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
