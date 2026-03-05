"use client";

import React, { useState } from "react";
import { Check } from "lucide-react";
import { subscribeToNewsletter } from "@/app/actions/newsletter";
import { toast } from "sonner";

interface NewsletterFormProps {
    className?: string;
    isDesktop?: boolean;
}

export function NewsletterForm({ className = "", isDesktop = false }: NewsletterFormProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [accepted, setAccepted] = useState(false);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!accepted) {
            toast.error("Please agree to the privacy statement to continue");
            return;
        }

        const formData = new FormData(e.currentTarget);
        const email = formData.get("email") as string;

        if (!email) {
            toast.error("Please enter a valid email address");
            return;
        }

        setIsLoading(true);

        try {
            const res = await subscribeToNewsletter(formData);

            if (res.success) {
                toast.success("Thanks for subscribing to our special offers! 🎉");
                (e.target as HTMLFormElement).reset();
                setAccepted(false);
            } else {
                toast.error(res.error || "Something went wrong.");
            }
        } catch (error) {
            toast.error("Failed to subscribe. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className={className}>
            <div className="space-y-8">
                <h2 className={isDesktop
                    ? "text-3xl xl:text-4xl font-light leading-tight tracking-tight"
                    : "text-3xl font-light leading-tight tracking-tight"}
                >
                    Are you from Spokane? <br />
                    <span className="italic font-normal">Get special offers here.</span>
                </h2>

                <div className="space-y-6">
                    <div className={`relative group w-full ${isDesktop ? "max-w-[360px]" : ""}`}>
                        <input
                            type="email"
                            name="email"
                            required
                            disabled={isLoading}
                            placeholder="Type your email..."
                            className={`w-full bg-white border border-[#024653]/10 px-6 ${isDesktop ? "py-3.5 rounded-full" : "h-14 rounded-2xl"} text-sm focus:outline-none focus:ring-2 focus:ring-[#085560]/10 transition-all font-normal text-[#024653] shadow-sm disabled:opacity-50`}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`absolute ${isDesktop ? "right-1.5 top-1.5 bottom-1.5 hover:bg-[#064a54]" : "right-2 top-2 bottom-2"} px-6 bg-[#085560] text-white ${isDesktop ? "rounded-full" : "rounded-xl"} text-[10px] font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center`}
                        >
                            {isLoading ? "Sending..." : (isDesktop ? "SEND" : "SUBSCRIBE")}
                        </button>
                    </div>
                    <label className="flex items-start gap-3 cursor-pointer group">
                        <div className={`relative flex items-center justify-center ${isDesktop ? "" : "mt-0.5"}`}>
                            <input
                                type="checkbox"
                                name="consent"
                                required
                                checked={accepted}
                                onChange={(e) => setAccepted(e.target.checked)}
                                disabled={isLoading}
                                className={`peer appearance-none ${isDesktop ? "w-3.5 h-3.5" : "w-4 h-4"} rounded border ${isDesktop ? "border-[#024653]/30 bg-transparent" : "border-[#024653]/20 bg-white"} checked:border-[#085560] checked:bg-[#085560] transition-colors cursor-pointer`}
                            />
                            <Check
                                size={isDesktop ? 9 : 10}
                                strokeWidth={4}
                                className={`absolute ${isDesktop ? "text-[#085560]" : "text-white"} opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none`}
                            />
                        </div>
                        <span className={`${isDesktop ? "text-[9px]" : "text-[10px]"} font-normal ${isDesktop ? "text-[#024653]/40 group-hover:text-[#024653]/60" : "text-[#024653]/50"} leading-snug transition-colors`}>
                            I agree to receive updates and news from ECS. You can unsubscribe at any time.
                        </span>
                    </label>
                </div>
            </div>
        </form>
    );
}
