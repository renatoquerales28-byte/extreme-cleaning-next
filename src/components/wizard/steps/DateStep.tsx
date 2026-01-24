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
            <h2 className="text-2xl md:text-3xl font-serif text-[#1C1C1C] mb-2 text-center">
                When should we come?
            </h2>
            <p className="text-gray-500 text-center mb-8">
                Select a date and time that works best for you.
            </p>

            <div className="flex flex-col md:flex-row gap-8 justify-center items-start max-w-4xl mx-auto">
                {/* Calendar */}
                <div className="w-full md:w-auto bg-white p-4 rounded-2xl shadow-sm border border-[#D1D5DB] flex justify-center">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        disabled={{ before: new Date() }}
                        modifiersStyles={{
                            selected: { backgroundColor: '#1C1C1C', color: 'white' }
                        }}
                        className="p-2"
                    />
                </div>

                {/* Slots */}
                <div className="w-full md:flex-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-[#D1D5DB] min-h-[350px]">
                        <h3 className="font-bold text-[#1C1C1C] mb-4 flex items-center gap-2">
                            <Clock size={20} className="text-[#0891B2]" />
                            Available Times
                            {selectedDate && <span className="font-normal text-gray-500 text-sm">for {format(selectedDate, "MMMM do")}</span>}
                        </h3>

                        {!selectedDate ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-400 py-12">
                                <Calendar size={48} className="mb-4 opacity-50" />
                                <p>Please select a date first</p>
                            </div>
                        ) : loading ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 animate-pulse">
                                {[...Array(6)].map((_, i) => (
                                    <div key={i} className="h-10 bg-gray-100 rounded-lg"></div>
                                ))}
                            </div>
                        ) : error ? (
                            <div className="h-full flex flex-col items-center justify-center text-gray-500 py-8">
                                <AlertCircle size={32} className="mb-2 text-orange-400" />
                                <p>{error}</p>
                                <p className="text-xs text-gray-400 mt-1">Please try another date.</p>
                            </div>
                        ) : availableSlots.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {availableSlots.map((time) => (
                                    <button
                                        key={time}
                                        onClick={() => handleTimeSelect(time)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTime === time
                                            ? "bg-[#1C1C1C] text-white shadow-md transform scale-105"
                                            : "bg-gray-50 text-gray-700 hover:bg-gray-100 border border-transparent hover:border-gray-200"
                                            }`}
                                    >
                                        {time}
                                    </button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500">
                                No slots available for this date.
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Summary Preview & Next Button */}
            {selectedDate && selectedTime && (
                <div className="mt-8 text-center animate-in fade-in zoom-in duration-300 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm font-medium border border-green-100">
                        <CheckCircleIcon /> Scheduled for {format(selectedDate, "MMMM do")} at {selectedTime}
                    </div>

                    <button
                        onClick={onNext}
                        className="btn-sentient bg-[#1C1C1C] hover:bg-black text-white w-full max-w-sm mx-auto py-5 text-sm font-black uppercase tracking-[0.2em] flex items-center justify-center gap-3 shadow-md hover:scale-[1.02] active:scale-95 transition-all"
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
