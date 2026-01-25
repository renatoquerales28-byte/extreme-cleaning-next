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
                    setError(result.reason || "No available slots for this day.");
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
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto py-2 antialiased">
            {/* Header */}
            <div className="text-center space-y-2 mb-10 shrink-0">
                <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-[#024653] leading-[0.85]">
                    When should we <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-[#024653] via-[#0E6168] to-[#05D16E]">Clean?</span>
                </h2>
                <p className="text-[10px] text-[#024653]/40 font-black tracking-[0.3em] uppercase">Select Your Preferred Date & Time</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 w-full shrink-0">
                {/* Calendar */}
                <div className="flex-1">
                    <div className="bg-white p-6 rounded-[3rem] border-2 border-slate-50 shadow-xl">
                        <style>{`
                            .rdp { 
                                --rdp-cell-size: 48px; 
                                --rdp-accent-color: #024653; 
                                --rdp-background-color: #05D16E; 
                                margin: 0 auto;
                            }
                            .rdp-day_selected:not([disabled]) { 
                                background-color: #024653; 
                                color: white; 
                                border-radius: 12px; 
                                font-weight: bold; 
                            }
                            .rdp-day_today { 
                                color: #05D16E; 
                                font-weight: bold; 
                            }
                            .rdp-day:hover:not([disabled]):not(.rdp-day_selected) {
                                background-color: #05D16E20;
                                border-radius: 12px;
                            }
                        `}</style>
                        <DayPicker
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            disabled={{ before: new Date() }}
                            className="w-full"
                        />
                    </div>
                </div>

                {/* Time Slots */}
                <div className="flex-1">
                    <div className="bg-white p-6 rounded-[3rem] border-2 border-slate-50 shadow-xl min-h-[400px] flex flex-col">
                        <div className="flex items-center gap-2 mb-6">
                            <Clock size={20} className="text-[#024653]" />
                            <h3 className="font-black text-[#024653] text-sm uppercase tracking-widest">
                                Available Times
                            </h3>
                        </div>

                        {selectedDate && (
                            <p className="text-[10px] text-[#024653]/40 font-black uppercase tracking-wider mb-4">
                                {format(selectedDate, "EEEE, MMMM do")}
                            </p>
                        )}

                        <div className="flex-1">
                            {!selectedDate ? (
                                <div className="h-full flex flex-col items-center justify-center text-[#024653]/20 py-12">
                                    <Calendar size={48} className="mb-4" />
                                    <p className="text-sm font-bold uppercase tracking-wider">Select a date first</p>
                                </div>
                            ) : loading ? (
                                <div className="grid grid-cols-2 gap-3 animate-pulse">
                                    {[...Array(6)].map((_, i) => (
                                        <div key={i} className="h-12 bg-slate-100 rounded-2xl"></div>
                                    ))}
                                </div>
                            ) : error ? (
                                <div className="h-full flex flex-col items-center justify-center text-rose-500 py-8">
                                    <AlertCircle size={32} className="mb-2" />
                                    <p className="font-bold text-sm">{error}</p>
                                    <p className="text-xs text-slate-400 mt-1">Please try another date.</p>
                                </div>
                            ) : availableSlots.length > 0 ? (
                                <div className="grid grid-cols-2 gap-3">
                                    {availableSlots.map((time) => (
                                        <button
                                            key={time}
                                            type="button"
                                            onClick={() => handleTimeSelect(time)}
                                            className={`px-4 py-3 rounded-2xl text-sm font-black transition-all border-2 ${selectedTime === time
                                                    ? "bg-[#024653] text-white border-[#024653] shadow-lg scale-105"
                                                    : "bg-white text-[#024653]/60 border-slate-100 hover:border-[#05D16E] hover:text-[#024653] hover:shadow-sm"
                                                }`}
                                        >
                                            {time}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-slate-400">
                                    <p className="text-sm font-bold">No slots available</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Summary & Action Button */}
            {selectedDate && selectedTime && (
                <div className="mt-10 space-y-6 shrink-0">
                    <div className="flex items-center justify-center gap-2 px-6 py-3 bg-[#05D16E]/10 border-2 border-[#05D16E]/20 rounded-full w-fit mx-auto">
                        <CheckCircle2 size={16} className="text-[#05D16E]" />
                        <span className="text-[#024653] font-black text-xs uppercase tracking-widest">
                            {format(selectedDate, "MMM do")} at {selectedTime}
                        </span>
                    </div>

                    <button
                        onClick={handleContinue}
                        disabled={isSubmitting}
                        className="btn-accent shadow-2xl shadow-[#05D16E]/20 flex items-center justify-center gap-4 w-full py-8 text-base rounded-[2.5rem] group disabled:opacity-50"
                    >
                        <span className="text-[12px] font-black uppercase tracking-[0.4em]">
                            {isSubmitting ? "Saving..." : "Continue to Address"}
                        </span>
                        {!isSubmitting && <ArrowRight size={24} strokeWidth={3} className="transition-transform group-hover:translate-x-2" />}
                    </button>
                </div>
            )}
        </div>
    );
}
