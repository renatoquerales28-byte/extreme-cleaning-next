import { useState, useEffect } from "react";
import { getCalendarSettings, updateCalendarSettings } from "@/app/actions/calendar";
import { Loader2, Save, Settings, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export default function CalendarSettingsModal() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [settings, setSettings] = useState<any[]>([]);

    useEffect(() => {
        if (open) {
            fetchSettings();
        }
    }, [open]);


    const fetchSettings = async () => {
        setLoading(true);
        const res = await getCalendarSettings();
        if (res.success) {
            // Sort by valid day index if needed, though usually 0-6
            setSettings(res.data.sort((a: any, b: any) => a.dayOfWeek - b.dayOfWeek));
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setLoading(true);
        const res = await updateCalendarSettings(settings);
        if (res.success) {
            toast.success("Calendar settings updated!");
            setOpen(false);
        } else {
            toast.error("Failed to save settings.");
        }
        setLoading(false);
    };

    const handleChange = (index: number, field: string, value: any) => {
        const newSettings = [...settings];
        newSettings[index] = { ...newSettings[index], [field]: value };
        setSettings(newSettings);
    };

    if (loading && settings.length === 0) return null;

    if (loading && settings.length === 0) return null;

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:bg-slate-50 transition-colors text-slate-600 text-sm font-medium"
            >
                <Settings size={16} />
                Settings & Capacity
            </button>

            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setOpen(false)}
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.95, opacity: 0 }}
                            className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                        >
                            <div className="p-6 border-b flex items-center justify-between bg-slate-50">
                                <h3 className="text-xl font-serif text-[#024653]">Calendar Configuration</h3>
                                <button onClick={() => setOpen(false)} className="text-slate-400 hover:text-slate-600">
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                <div className="grid grid-cols-[1fr_80px_1fr_1fr_80px] gap-4 items-center text-xs font-bold text-slate-400 uppercase tracking-wider px-2">
                                    <div>Day</div>
                                    <div className="text-center">Active</div>
                                    <div>Start</div>
                                    <div>End</div>
                                    <div className="text-center">Cap.</div>
                                </div>

                                {settings.map((day, idx) => (
                                    <div key={day.dayOfWeek} className={`grid grid-cols-[1fr_80px_1fr_1fr_80px] gap-4 items-center p-3 rounded-xl border ${day.isOpen ? "bg-white border-slate-200" : "bg-slate-50 border-transparent text-slate-400"}`}>
                                        <div className="font-bold">{DAYS[day.dayOfWeek]}</div>
                                        <div className="flex justify-center">
                                            <input
                                                type="checkbox"
                                                checked={day.isOpen}
                                                onChange={(e) => handleChange(idx, "isOpen", e.target.checked)}
                                                className="w-5 h-5 accent-[#05D16E] rounded cursor-pointer"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="time"
                                                value={day.startTime}
                                                disabled={!day.isOpen}
                                                onChange={(e) => handleChange(idx, "startTime", e.target.value)}
                                                className="w-full p-2 border rounded-lg bg-transparent disabled:opacity-50 text-sm"
                                            />
                                        </div>
                                        <div>
                                            <input
                                                type="time"
                                                value={day.endTime}
                                                disabled={!day.isOpen}
                                                onChange={(e) => handleChange(idx, "endTime", e.target.value)}
                                                className="w-full p-2 border rounded-lg bg-transparent disabled:opacity-50 text-sm"
                                            />
                                        </div>
                                        <div className="flex justify-center">
                                            <input
                                                type="number"
                                                min="0"
                                                value={day.dailyCapacity}
                                                disabled={!day.isOpen}
                                                onChange={(e) => handleChange(idx, "dailyCapacity", parseInt(e.target.value))}
                                                className="w-16 p-2 border rounded-lg bg-transparent font-bold text-center disabled:opacity-50 text-sm"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end p-6 border-t bg-slate-50">
                                <button
                                    onClick={handleSave}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-[#024653] text-white rounded-xl font-bold transition-all hover:bg-[#023641] disabled:opacity-50 shadow-lg shadow-[#024653]/10"
                                >
                                    {loading ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );

}
