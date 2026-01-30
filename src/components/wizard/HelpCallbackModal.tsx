"use client";

import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createLead } from "@/app/actions/admin";
import { Phone, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";

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

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-md bg-white border-0 shadow-2xl rounded-3xl p-8">
                {status === "success" ? (
                    <div className="flex flex-col items-center justify-center text-center py-8 space-y-4">
                        <div className="w-16 h-16 bg-[#05D16E]/10 rounded-full flex items-center justify-center text-[#05D16E]">
                            <CheckCircle2 size={32} strokeWidth={3} />
                        </div>
                        <h3 className="text-xl font-black text-[#024653]">We're on it!</h3>
                        <p className="text-sm text-[#024653]/70 font-medium">Please keep your phone nearby. <br /> A specialist will call you shortly.</p>
                    </div>
                ) : (
                    <>
                        <DialogHeader>
                            <DialogTitle className="text-2xl font-black text-[#024653] text-center">Need a hand?</DialogTitle>
                            <DialogDescription className="text-center font-medium text-[#024653]/60">
                                Enter your number and we'll call you in <span className="text-[#05D16E] font-bold">5 minutes</span>.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
                            <div className="space-y-2">
                                <Label htmlFor="help-name" className="text-xs font-bold uppercase tracking-wider text-[#024653]/70">Name</Label>
                                <Input
                                    id="help-name"
                                    placeholder="Your name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:ring-[#05D16E] focus:border-[#05D16E]"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="help-phone" className="text-xs font-bold uppercase tracking-wider text-[#024653]/70">Phone Number</Label>
                                <Input
                                    id="help-phone"
                                    type="tel"
                                    placeholder="(555) 000-0000"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    className="h-12 rounded-xl border-slate-200 bg-slate-50 focus:ring-[#05D16E] focus:border-[#05D16E]"
                                    required
                                />
                            </div>
                            <Button
                                type="submit"
                                disabled={status === "sending"}
                                className="w-full h-12 rounded-xl bg-[#024653] hover:bg-[#02333d] text-white font-black uppercase tracking-widest text-xs shadow-lg shadow-[#024653]/20"
                            >
                                {status === "sending" ? "Sending..." : "Request Call"}
                            </Button>
                        </form>
                    </>
                )}
            </DialogContent>
        </Dialog>
    );
}
