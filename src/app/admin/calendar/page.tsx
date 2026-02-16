"use client";

import { useState, useEffect } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { format, isSameDay, startOfMonth } from "date-fns";
import { Calendar as CalendarIcon, Ban, Clock, CheckCircle, UserCheck } from "lucide-react";
import { getMonthEvents, blockDate, unblockDate, getStaff, assignStaff } from "@/app/actions/calendar";
import CalendarSettingsModal from "@/components/admin/CalendarSettingsModal";
import StaffManager from "@/components/admin/StaffManager";
import { toast } from "sonner";

export default function CalendarPage() {
    const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
    const [month, setMonth] = useState<Date>(new Date());
    const [blockedDates, setBlockedDates] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [staff, setStaff] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [blockReason, setBlockReason] = useState("Holiday/Closed");

    useEffect(() => {
        loadEvents(month);
        loadStaff();
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

    const loadStaff = async () => {
        const res = await getStaff();
        if (res.success) setStaff(res.data || []);
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

    const handleAssign = async (bookingId: number, staffId: string) => {
        const id = staffId === "unassigned" ? null : parseInt(staffId);
        const res = await assignStaff(bookingId, id);
        if (res.success) {
            toast.success("Team assigned");
            loadEvents(month); // Reload to update UI
        } else {
            toast.error("Failed to assign team");
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
        <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Main Calendar Area */}
            <div className="flex-1 bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 min-h-[600px] transition-colors">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-xl font-serif text-slate-900 dark:text-white flex items-center gap-2">
                        <CalendarIcon className="text-[#0891B2] dark:text-[#22d3ee]" /> Calendar Management
                    </h2>
                    <CalendarSettingsModal />
                </div>

                <div className="flex justify-center p-4">
                    <DayPicker
                        mode="single"
                        selected={selectedDate}
                        onSelect={setSelectedDate}
                        month={month}
                        onMonthChange={setMonth}
                        modifiers={modifiers}
                        modifiersStyles={modifiersStyles}
                        className="border dark:border-slate-700 rounded-2xl p-6 shadow-sm bg-white dark:bg-slate-950 dark:text-slate-100"
                        classNames={{
                            day_selected: "bg-[#024653] text-white hover:bg-[#023641] dark:bg-[#22d3ee] dark:text-slate-900",
                            day_today: "font-bold text-[#05D16E]",
                            head_cell: "text-slate-500 dark:text-slate-400 font-medium",
                            cell: "text-slate-700 dark:text-slate-300",
                            nav_button: "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg",
                            caption: "text-slate-900 dark:text-white font-bold"
                        }}
                    />
                </div>

                <div className="mt-8 flex justify-center gap-6 text-sm text-gray-600 dark:text-slate-400">
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#0891B2]"></span> Has Bookings
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#EF4444]"></span> Blocked / Closed
                    </div>
                </div>
            </div>

            {/* Sidebar Controls */}
            <div className="w-full lg:w-96 space-y-6">

                {/* 1. Selected Date Details */}
                <div className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 transition-colors">
                    <h3 className="font-bold text-xl text-slate-900 dark:text-white mb-1">
                        {selectedDate ? format(selectedDate, "EEEE") : "Select a date"}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 border-b border-slate-100 dark:border-slate-800 pb-4">
                        {selectedDate ? format(selectedDate, "MMMM do, yyyy") : "Click on the calendar to manage availability"}
                    </p>

                    {selectedDate && (
                        <div className="space-y-6">
                            {/* Blocking Controls */}
                            {!selectedDayBlocked ? (
                                <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-400">Availability</label>
                                    <div className="flex gap-2">
                                        <select
                                            value={blockReason}
                                            onChange={(e) => setBlockReason(e.target.value)}
                                            className="flex-1 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-white rounded-lg px-3 py-2 text-sm outline-none"
                                        >
                                            <option>Holiday/Closed</option>
                                            <option>Fully Booked</option>
                                            <option>Maintenance</option>
                                            <option>Other</option>
                                        </select>
                                        <button
                                            onClick={handleBlockDate}
                                            className="bg-white dark:bg-slate-950 border border-red-200 dark:border-red-900/50 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg text-xs font-bold uppercase hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors"
                                        >
                                            Block Date
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex gap-3 items-center">
                                            <div className="w-8 h-8 rounded-full bg-white dark:bg-red-900/20 flex items-center justify-center shadow-sm">
                                                <Ban size={16} className="text-red-500 dark:text-red-400" />
                                            </div>
                                            <div>
                                                <p className="font-bold text-red-800 dark:text-red-300 text-sm">Date Blocked</p>
                                                <p className="text-red-600 dark:text-red-400 text-xs">{selectedDayBlocked.reason}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => handleUnblockDate(selectedDayBlocked.id)}
                                            className="text-xs font-bold text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-md shadow-sm"
                                        >
                                            Unblock
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Bookings List */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-bold text-slate-400 text-xs uppercase tracking-wider">
                                        Bookings ({selectedDayBookings.length})
                                    </h4>
                                </div>

                                {selectedDayBookings.length > 0 ? (
                                    <div className="space-y-3">
                                        {selectedDayBookings.map(booking => (
                                            <div key={booking.id} className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md transition-all group">
                                                <div className="flex justify-between items-start mb-3">
                                                    <div>
                                                        <span className="font-black text-[#024653] dark:text-[#22d3ee] text-sm block">
                                                            {booking.firstName} {booking.lastName}
                                                        </span>
                                                        <span className="text-xs text-slate-400 font-medium">
                                                            {booking.serviceType} • {booking.frequency}
                                                        </span>
                                                    </div>
                                                    <span className="text-xs font-bold bg-[#0891B2]/10 dark:bg-[#0891B2]/20 text-[#0891B2] dark:text-[#22d3ee] px-2 py-1 rounded-md">
                                                        {booking.serviceTime || "N/A"}
                                                    </span>
                                                </div>

                                                {/* Assignment Dropdown */}
                                                <div className="pt-3 border-t border-slate-50 dark:border-slate-700 flex items-center gap-2">
                                                    <UserCheck size={14} className="text-slate-300 dark:text-slate-500" />
                                                    <select
                                                        className="flex-1 text-xs border-none bg-slate-50 dark:bg-slate-900/50 rounded-lg py-1.5 px-2 text-slate-600 dark:text-slate-300 outline-none cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors"
                                                        value={booking.assignedStaffId || "unassigned"}
                                                        onChange={(e) => handleAssign(booking.id, e.target.value)}
                                                        style={{
                                                            color: booking.staffColor || 'inherit',
                                                            fontWeight: booking.assignedStaffId ? 'bold' : 'normal'
                                                        }}
                                                    >
                                                        <option value="unassigned" className="dark:text-slate-400">Unassigned</option>
                                                        {staff.map(s => (
                                                            <option key={s.id} value={s.id} style={{ color: s.color || 'black' }}>
                                                                {s.name}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8 bg-slate-50 dark:bg-slate-800/30 rounded-xl border border-dashed border-slate-200 dark:border-slate-700">
                                        <p className="text-sm text-slate-400 mb-1">No bookings yet</p>
                                        <p className="text-xs text-slate-300 dark:text-slate-600">Slots open: Check Settings</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* 2. Staff Manager */}
                <StaffManager onUpdate={loadStaff} />
            </div>
        </div>
    );
}
