"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameDay, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon, Ban, Clock, CheckCircle } from "lucide-react";
import { getMonthEvents, blockDate, unblockDate } from "@/app/actions/calendar";

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date>(new Date());
    const [blockedDates, setBlockedDates] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [blockReason, setBlockReason] = useState("Holiday/Closed");

    useEffect(() => {
        loadEvents(month);
    }, [month]);

    const loadEvents = async (date: Date) => {
        setLoading(true);
        const { data } = await getMonthEvents(date);
        if (data) {
            setBlockedDates(data.blocked);
            setBookings(data.bookings);
        }
        setLoading(false);
    };

    const handleBlockDate = async () => {
        if (!selectedDate) return;
        if (confirm(`Are you sure you want to block ${format(selectedDate, "PP")}?`)) {
            await blockDate(selectedDate, blockReason);
            await loadEvents(month);
            setBlockReason("Holiday/Closed");
        }
    };

    const handleUnblockDate = async (id: number) => {
        if (confirm("Unblock this date?")) {
            await unblockDate(id);
            await loadEvents(month);
        }
    };

    const modifiers = {
        booked: (date: Date) => bookings.some(b => isSameDay(new Date(b.serviceDate), date)),
        blocked: (date: Date) => blockedDates.some(b => isSameDay(new Date(b.date), date)),
    };

    const modifiersStyles = {
        booked: { color: 'white', backgroundColor: '#0891B2' },
        blocked: { color: 'white', backgroundColor: '#EF4444' },
    };

    const selectedDayBlocked = blockedDates.find(b => selectedDate && isSameDay(new Date(b.date), selectedDate));
    const selectedDayBookings = bookings.filter(b => selectedDate && isSameDay(new Date(b.serviceDate), selectedDate));

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB]">
                <h2 className="text-xl font-serif text-[#1C1C1C] mb-6 flex items-center gap-2">
                    <CalendarIcon className="text-[#0891B2]" /> Calendar Management
                </h2>

                <div className="flex justify-center">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        month={month}
                        onMonthChange={setMonth}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                        className="border rounded-lg p-4"
                    />
                </div>

                <div className="mt-6 space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#0891B2]"></span> Has Bookings
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Blocked / Closed
                    </div>
                </div>
            </div>

            <div className="w-full lg:w-96 space-y-6">
                {/* Actions for Selected Date */}
                <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB]">
                    <h3 className="font-bold text-[#1C1C1C] mb-4">
                        {selectedDate ? format(selectedDate, "PPPP") : "Select a date"}
                    </h3>

                    {selectedDate && (
                        <div className="space-y-6">
                            {/* Blocking Controls */}
                            {!selectedDayBlocked ? (
                                <div className="space-y-3">
                                    <label className="block text-sm font-medium text-gray-700">Block this date</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={blockReason}
                                            onChange={(e) => setBlockReason(e.target.value)}
                                            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"
                                        >
                                            <option>Holiday/Closed</option>
                                            <option>fully Booked</option>
                                            <option>Maintenance</option>
                                            <option>Other</option>
                                        </select>
                                        <button
                                            onClick={handleBlockDate}
                                            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-red-100 transition-colors"
                                        >
                                            Block
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                                    <div className="flex items-start justify-between">
                                        <div className="flex gap-2">
                                            <Ban size={16} className="text-red-500 mt-0.5" />
                                            <div>
                                                <p className="font-bold text-red-700 text-sm">Date Blocked</p>
                                                <p className="text-red-600 text-xs">{selectedDayBlocked.reason}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleUnblockDate(selectedDayBlocked.id)}
                                            className="text-xs text-red-500 hover:text-red-700 underline"
                                        >
                                            Unblock
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Bookings List */}
                            <div>
                                <h4 className="font-bold text-gray-500 text-xs uppercase tracking-wider mb-3">Bookings for this day</h4>
                                {selectedDayBookings.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedDayBookings.map(booking => (
                                            <div key={booking.id} className="bg-gray-50 p-3 rounded-lg border border-gray-100 dark:border-gray-200">
                                                <div className="flex justify-between items-start mb-1">
                                                    <span className="font-medium text-[#1C1C1C] text-sm">
                                                        {booking.firstName} {booking.lastName}
                                                    </span>
                                                    <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded">
                                                        {booking.serviceTime || "N/A"}
                                                    </span>
                                                </div>
                                                <div className="text-xs text-gray-500">
                                                    {booking.serviceType} • {booking.frequency}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">No bookings scheduled.</p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
