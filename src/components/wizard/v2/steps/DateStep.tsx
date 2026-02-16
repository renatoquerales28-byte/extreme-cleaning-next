import { useFormContext, Controller } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../../WizardActionContext";
import { useEffect, useState, useCallback, useMemo } from "react";
import { format } from "date-fns";
import { Check, Loader2, Calendar as CalendarIcon, Clock } from "lucide-react";
import { SimpleCalendar } from "@/components/ui/SimpleCalendar";
import { getAvailableSlots } from "@/app/actions/calendar";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

interface DateStepProps {
    onNext: () => void;
}

export default function DateStep({ onNext }: DateStepProps) {
    const { setValue, watch, control } = useFormContext<WizardData>();
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
        d.setHours(0, 0, 0, 0);
        return d;
    }, []);

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
        if (!selectedDate || !selectedTime) { return; }

        const dateObj = new Date(selectedDate);
        if (isNaN(dateObj.getTime()) || dateObj < today) {
            toast.error("Please select a valid future date");
            return;
        }

        setIsSubmitting(true);
        const toastId = toast.loading("Saving schedule...");

        try {
            if (!leadId) {
                toast.dismiss(toastId);
                onNext();
                return;
            }

            const { updateLead } = await import("@/app/actions/admin");
            const res = await updateLead(Number(leadId), {
                serviceDate: dateObj,
                serviceTime: selectedTime
            });

            if (res.success) {
                toast.success("Schedule saved", { id: toastId });
                onNext();
            } else {
                toast.error("Failed to save schedule: " + (res.error || "Unknown error"), { id: toastId });
            }
        } catch (error) {
            toast.error("An unexpected error occurred", { id: toastId });
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
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="pointer-events-auto flex items-center justify-center gap-3 px-6 py-3 bg-white shadow-sm border border-[#024653]/5 rounded-xl w-fit"
                >
                    <div className="w-8 h-8 rounded-lg bg-[#05D16E]/10 flex items-center justify-center text-[#05D16E]">
                        <Check size={14} strokeWidth={4} />
                    </div>
                    <div>
                        <p className="text-[#024653]/40 text-[9px] font-bold uppercase tracking-widest leading-none">Booking for</p>
                        <p className="text-[#024653] font-bold text-xs">
                            {format(new Date(selectedDate), "MMM do")} at {selectedTime}
                        </p>
                    </div>
                </motion.div>
            )
        });
    }, [selectedDate, selectedTime, isSubmitting, setAction, handleContinue]);

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
        <div className="h-full w-full flex items-center justify-center p-6 md:p-0">
            <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-6 items-start">

                {/* Left: Calendar Card */}
                <div className="bg-white p-8 rounded-xl border border-[#024653]/5 shadow-sm space-y-6">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                            <CalendarIcon size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-[#024653]">Select Date</h3>
                    </div>
                    <div className="relative">
                        <Controller
                            control={control}
                            name="serviceDate"
                            render={({ field }) => (
                                <SimpleCalendar
                                    selected={field.value ? new Date(field.value) : undefined}
                                    onSelect={(date) => {
                                        field.onChange(date);
                                        setValue("serviceTime", undefined);
                                    }}
                                    className="border-none shadow-none p-0 w-full"
                                />
                            )}
                        />
                        {isSubmitting && (
                            <div className="absolute inset-0 bg-white/80 flex items-center justify-center rounded-2xl">
                                <Loader2 className="animate-spin text-[#024653]" size={32} />
                            </div>
                        )}
                    </div>
                </div>

                {/* Right: Time Card */}
                <div className="bg-white p-8 rounded-xl border border-[#024653]/5 shadow-sm space-y-6 h-full min-h-[400px] md:min-h-0">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-[#024653]/5 flex items-center justify-center text-[#024653]">
                            <Clock size={20} />
                        </div>
                        <h3 className="text-xl font-bold text-[#024653]">Select Time</h3>
                    </div>

                    <AnimatePresence mode="wait">
                        {isLoadingSlots ? (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {[1, 2, 3, 4, 5, 6].map((i) => (
                                    <div key={i} className="h-12 bg-[#F9F8F2] rounded-xl animate-pulse" />
                                ))}
                            </motion.div>
                        ) : !selectedDate ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="flex flex-col items-center justify-center h-48 md:h-64 text-center border border-dashed border-[#024653]/10 rounded-xl"
                            >
                                <p className="text-[#024653]/30 text-sm font-medium">Please select a date <br /> to see available times</p>
                            </motion.div>
                        ) : (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="grid grid-cols-2 gap-3"
                            >
                                {availableSlots.map((time) => (
                                    <motion.button
                                        key={time}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => setValue("serviceTime", time)}
                                        className={`py-4 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${selectedTime === time
                                            ? "bg-[#024653] text-white shadow-md"
                                            : "bg-[#F9F8F2] text-[#024653]/60 hover:bg-[#05D16E]/10 hover:text-[#05D16E]"
                                            }`}
                                    >
                                        {formatTimeDisplay(time)}
                                    </motion.button>
                                ))}

                                {availableSlots.length === 0 && !isLoadingSlots && (
                                    <div className="col-span-2 py-12 text-center text-[#024653]/40">
                                        No slots available for this date
                                    </div>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
