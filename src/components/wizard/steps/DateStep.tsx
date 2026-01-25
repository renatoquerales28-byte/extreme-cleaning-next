"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format } from "date-fns";
import { Calendar, Clock, AlertCircle, ArrowRight, CheckCircle2 } from "lucide-react";
import { getAvailableSlots } from "@/app/actions/calendar";
import { updateLead } from "@/app/actions/admin";

interface DateStepProps {
    onNext: () => void;
    onBack: () => void;
}

export default function DateStep({ onNext, onBack }: DateStepProps) {
    const { watch, setValue } = useFormContext<WizardData>();
    const data = watch();

    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        data.serviceDate ? new Date(data.serviceDate) : undefined
    );
    const [selectedTime, setSelectedTime] = useState<string | null>(data.serviceTime || null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Fetch slots when date changes
    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
        } else {
            setAvailableSlots([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedDate]);

    const fetchSlots = async (date: Date) => {
        setLoading(true);
        setError(null);
        setAvailableSlots([]);

        try {
            const result = await getAvailableSlots(date);
            if (result.success && result.slots) {
                setAvailableSlots(result.slots);
                if (result.slots.length === 0) {
                    setError(result.reason || "No available slots.");
                }
            } else {
                setError(result.error || "Failed to load slots.");
            }
        } catch (e) {
            setError("Could not load availability.");
        } finally {
            setLoading(false);
        }
    };

    const handleTimeSelect = (time: string) => {
        setSelectedTime(time);
        setValue("serviceTime", time);
    };

    const handleDateSelect = (date: Date | undefined) => {
        setSelectedDate(date);
        if (date) {
            setValue("serviceDate", date.toISOString());
        }
        // Reset time when date changes
        setSelectedTime(null);
        setValue("serviceTime", undefined);
    };

    const handleContinue = async () => {
        if (!selectedDate || !selectedTime) return;

        setIsSubmitting(true);
        try {
            // Update lead with date/time if leadId exists
            if (data.leadId) {
                await updateLead(data.leadId, {
                    ...data,
                    serviceDate: selectedDate.toISOString(),
                    serviceTime: selectedTime
                });
                console.log("Lead updated with date/time");
            }
            onNext();
        } catch (e) {
            console.error("Error saving date/time:", e);
            // Continue anyway
            onNext();
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-4xl mx-auto">
                    <div className="min-h-full flex flex-col lg:flex-row gap-4 w-full justify-center items-stretch lg:items-center py-4">
                        {/* Calendar */}
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="bg-white p-3 rounded-2xl border-2 border-slate-50 w-full max-w-xs mx-auto">
                                <style>{`
                                    .rdp { 
                                        --rdp-cell-size: 32px; 
                                        --rdp-accent-color: #024653; 
                                        --rdp-background-color: #05D16E; 
                                        margin: 0 auto;
                                    }
                                    .rdp-day_selected:not([disabled]) { 
                                        background-color: #024653; 
                                        color: white; 
                                        border-radius: 6px; 
                                        font-weight: bold; 
                                    }
                                    .rdp-day_today { 
                                        color: #05D16E; 
                                        font-weight: bold; 
                                    }
                                    .rdp-day:hover:not([disabled]):not(.rdp-day_selected) {
                                        background-color: #05D16E20;
                                        border-radius: 6px;
                                    }
                                    .rdp-caption_label { font-size: 0.8rem; font-weight: 800; color: #024653; }
                                    .rdp-nav_button { width: 20px; height: 20px; }
                                `}</style>
                                <DayPicker
                                    mode="single"
                                    selected={selectedDate}
                                    onSelect={handleDateSelect}
                                    disabled={{ before: new Date() }}
                                    className="w-full text-xs"
                                />
                            </div>
                        </div>

                        {/* Time Slots */}
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="bg-white p-4 rounded-2xl border-2 border-slate-50 min-h-[200px] max-h-[300px] flex flex-col w-full max-w-xs mx-auto">
                                <div className="flex items-center gap-2 mb-2 shrink-0">
                                    <Clock size={14} className="text-[#024653]" />
                                    <h3 className="font-black text-[#024653] text-[9px] uppercase tracking-widest">
                                        Available Times
                                    </h3>
                                </div>

                                {selectedDate && (
                                    <p className="text-[8px] text-[#024653]/40 font-black uppercase tracking-wider mb-2 shrink-0">
                                        {format(selectedDate, "EEEE, MMMM do")}
                                    </p>
                                )}

                                <div className="flex-1 overflow-y-auto pr-2">
                                    {!selectedDate ? (
                                        <div className="h-full flex flex-col items-center justify-center text-[#024653]/20 py-4">
                                            <Calendar size={24} className="mb-2" />
                                            <p className="text-[10px] font-bold uppercase tracking-wider">Select a date first</p>
                                        </div>
                                    ) : loading ? (
                                        <div className="grid grid-cols-2 gap-2 opacity-50">
                                            {[...Array(6)].map((_, i) => (
                                                <div key={i} className="h-8 bg-slate-100 rounded-lg"></div>
                                            ))}
                                        </div>
                                    ) : error ? (
                                        <div className="h-full flex flex-col items-center justify-center text-rose-500 py-4">
                                            <AlertCircle size={20} className="mb-2" />
                                            <p className="font-bold text-[10px]">{error}</p>
                                        </div>
                                    ) : availableSlots.length > 0 ? (
                                        <div className="grid grid-cols-2 gap-2">
                                            {availableSlots.map((time) => (
                                                <button
                                                    key={time}
                                                    type="button"
                                                    onClick={() => handleTimeSelect(time)}
                                                    className={`px-3 py-2 rounded-lg text-[10px] font-black transition-all border-2 ${selectedTime === time
                                                        ? "bg-[#024653] text-white border-[#024653]"
                                                        : "bg-white text-[#024653]/60 border-slate-100 hover:border-[#05D16E] hover:text-[#024653]"
                                                        }`}
                                                >
                                                    {time}
                                                </button>
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="text-center py-4 text-slate-400">
                                            <p className="text-[10px] font-bold">No slots available</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="fixed bottom-6 right-0 w-full lg:w-[60%] z-50 flex flex-col items-center justify-end pointer-events-none bg-transparent border-none shadow-none">
                {selectedDate && selectedTime && (
                    <div className="pointer-events-auto flex items-center justify-center gap-2 px-6 py-2 bg-[#05D16E]/10 border-2 border-[#05D16E]/20 rounded-full w-fit mb-4">
                        <CheckCircle2 size={12} className="text-[#05D16E]" />
                        <span className="text-[#024653] font-black text-[9px] uppercase tracking-widest">
                            {format(selectedDate, "MMM do")} at {selectedTime}
                        </span>
                    </div>
                )}
                <button
                    onClick={handleContinue}
                    disabled={isSubmitting || !selectedDate || !selectedTime}
                    className="pointer-events-auto w-[380px] h-[56px] bg-[#024653] text-white font-bold rounded-xl shadow-2xl flex items-center justify-center gap-3 uppercase tracking-[0.25em] text-xs hover:bg-[#0E6168] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    <span className="text-xs font-black uppercase tracking-[0.25em]">
                        {isSubmitting ? "Saving..." : "Continue to Address"}
                    </span>
                    {!isSubmitting && <ArrowRight size={18} strokeWidth={2.5} />}
                </button>
            </div>
        </div>
    );
}
