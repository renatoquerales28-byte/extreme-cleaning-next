"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, addDays } from "date-fns";
import { Calendar, Clock, AlertCircle } from "lucide-react";
import { getAvailableSlots } from "@/app/actions/calendar";

interface DateStepProps {
    data: any;
    updateData: (data: any) => void;
    onNext: () => void;
}

export default function DateStep({ data, updateData, onNext }: DateStepProps) {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(
        data.serviceDate ? new Date(data.serviceDate) : undefined
    );
    const [selectedTime, setSelectedTime] = useState<string | null>(data.serviceTime || null);
    const [availableSlots, setAvailableSlots] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Fetch slots when date changes
    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
            // Reset time if date changes unless it was initial load
            if (selectedDate.toISOString() !== data.serviceDate) {
                setSelectedTime(null);
                updateData({ ...data, serviceDate: selectedDate.toISOString(), serviceTime: null });
            }
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
        updateData({
            ...data,
            serviceDate: selectedDate?.toISOString(),
            serviceTime: time
        });
    };

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-2xl md:text-3xl font-serif text-ecs-brand-dark mb-2 text-center">
                When should we come?
            </h2>
            <p className="text-slate-500 text-center mb-8">
                Select a date and time that works best for you.
            </p>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-4xl mx-auto">
                {/* Calendar */}
                <div className="calendar-container">
                    <style>{`
                            .rdp { --rdp-cell-size: 44px; --rdp-accent-color: #024653; --rdp-background-color: #EAE8DF; }
                            .rdp-day_selected:not([disabled]) { background-color: #024653; color: white; border-radius: 8px; font-weight: bold; }
                            .rdp-day_today { color: #1D7F7F; font-weight: bold; }
                        `}</style>
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        className="p-4 bg-white/50"
                    />
                </div>

                {/* Slots */}
                <div className="w-full md:flex-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 min-h-[350px]">
                        <h3 className="font-bold text-ecs-brand-dark mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-ecs-brand-light" />
                            Available Times
                            {selectedDate && <span className="font-normal text-slate-500 text-sm">for {format(selectedDate, "MMMM do")}</span>}
                        </h3>

                        {!selectedDate ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12">
                                <Calendar size={48} className="mb-4 opacity-50" />
                                <p>Please select a date first</p>
                            </div>
                        ) : loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-10 bg-slate-100 rounded-lg"></div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="h-full flex flex-col items-center justify-center text-slate-500 py-8">
                                <AlertCircle size={32} className="mb-2 text-rose-400" />
                                <p>{error}</p>
                                <p className="text-xs text-slate-400 mt-1">Please try another date.</p>
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availableSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${selectedTime === time
                                            ? "bg-ecs-brand-dark text-white border-ecs-brand-dark shadow-lg scale-105"
                                            : "bg-white text-slate-600 border-slate-100 hover:border-ecs-brand-light hover:text-ecs-brand-light hover:shadow-sm"
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-500">
                                No slots available for this date.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Preview & Next Button */}
            {selectedDate && selectedTime && (
                <div className="mt-8 text-center animate-in fade-in zoom-in duration-300 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-ecs-secondary text-ecs-brand-dark rounded-full text-sm font-medium border border-ecs-brand-light/20">
                        <CheckCircleIcon /> Scheduled for {format(selectedDate, "MMMM do")} at {selectedTime}
                    </div>

                    <button
                        onClick={async () => {
                            if (data.leadId) {
                                try {
                                    // Soft save of date/time
                                    const { updateLead } = await import("@/app/actions/admin");
                                    await updateLead(data.leadId, {
                                        ...data,
                                        serviceDate: selectedDate?.toISOString(),
                                        serviceTime: selectedTime
                                    });
                                } catch (e) {
                                    console.error("Background save failed", e);
                                }
                            }
                            onNext();
                        }}
                        className="btn-primary w-full max-w-sm mx-auto py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
                    >
                        Continue to Address <CheckCircleIcon />
                    </button>
                </div>
            )}
        </div>
    );
}

function CheckCircleIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    )
}
