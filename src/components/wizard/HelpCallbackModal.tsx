"use client";

import React, { useState } from "react";
import { createLead } from "@/app/actions/admin";
import { Phone, CheckCircle2, X } from "lucide-react";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";

export default function HelpCallbackModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
    const [phone, setPhone] = useState("");
    const [name, setName] = useState("");
    const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus("sending");

        try {
            await createLead({
                firstName: name,
                lastName: "Help Request",
                phone,
                serviceType: "residential", // Default for help request
                status: "new",
                notes: "URGENT: Customer requested help callback from wizard.",
                details: { source: "wizard_help_callback" }
            });
            setStatus("success");
            setTimeout(() => {
                onOpenChange(false);
                setStatus("idle");
                setPhone("");
                setName("");
            }, 3000);
        } catch (error) {
            toast.error("Something went wrong. Please try again.");
            setStatus("idle");
        }
    };

    if (!open) return null;

    return (
        <AnimatePresence>
            {open && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => onOpenChange(false)}
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="relative w-full max-w-sm bg-white rounded-3xl p-8 shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={() => onOpenChange(false)}
                            className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 transition-colors"
                        >
                            <X size={20} />
                        </button>

                        {status === "success" ? (
                            <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                                <div className="w-16 h-16 bg-[#05D16E]/10 rounded-full flex items-center justify-center text-[#05D16E]">
                                    <CheckCircle2 size={32} strokeWidth={3} />
                                </div>
                                <h3 className="text-xl font-black text-[#024653]">We&apos;re on it!</h3>
                                <p className="text-sm text-[#024653]/70 font-medium">Please keep your phone nearby. <br /> A specialist will call you shortly.</p>
                            </div>
                        ) : (
                            <>
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-black text-[#024653] mb-2">Need a hand?</h3>
                                    <p className="text-sm font-medium text-[#024653]/60">
                                        Enter your number and we&apos;ll call you in <span className="text-[#05D16E] font-bold">5 minutes</span>.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <label htmlFor="help-name" className="text-xs font-bold uppercase tracking-wider text-[#024653]/70 block">Name</label>
                                        <input
                                            id="help-name"
                                            placeholder="Your name"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#05D16E] text-[#024653]"
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="help-phone" className="text-xs font-bold uppercase tracking-wider text-[#024653]/70 block">Phone Number</label>
                                        <input
                                            id="help-phone"
                                            type="tel"
                                            placeholder="(555) 000-0000"
                                            value={phone}
                                            onChange={(e) => setPhone(e.target.value)}
                                            className="w-full h-12 px-4 rounded-xl border border-slate-200 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-[#05D16E] text-[#024653]"
                                            required
                                        />
                                    </div>
                                    <button
                                        type="submit"
                                        disabled={status === "sending"}
                                        className="w-full h-12 rounded-xl bg-[#024653] hover:bg-[#02333d] text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-[#024653]/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                                    >
                                        {status === "sending" ? "Sending..." : "Request Call"}
                                    </button>
                                </form>
                            </>
                        )}
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
