"use client";

import React, { useState } from "react";
import { Search, User, Phone, ChevronLeft } from "lucide-react";

interface ReturningLookupStepProps {
    onNext: () => void;
    onBack: () => void;
    setCustomerName: (name: string) => void;
}

export default function ReturningLookupStep({ onNext, onBack, setCustomerName }: ReturningLookupStepProps) {
    const [phone, setPhone] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate API lookup
        setTimeout(() => {
            setLoading(false);
            setCustomerName("Alex");
            onNext();
        }, 1500);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-8 text-center py-4 antialiased">
            <button
                onClick={onBack}
                className="absolute top-0 left-0 flex items-center gap-1.5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-ecs-brand-dark transition-all"
            >
                <ChevronLeft size={14} strokeWidth={3} /> Back
            </button>

            <div className="w-16 h-16 bg-ecs-brand-light text-white rounded-full flex items-center justify-center mb-2">
                <User size={32} strokeWidth={2.5} />
            </div>

            <div className="space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-ecs-brand-dark leading-[0.85] py-1">
                    Welcome <span className="text-ecs-brand-light">Back</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">
                    Enter your phone number to find your profile.
                </p>
            </div>

            <form onSubmit={handleSearch} className="w-full max-w-sm space-y-6">
                <div className="relative flex items-center">
                    <Phone className="absolute left-6 text-slate-400" size={20} />
                    <input
                        type="tel"
                        placeholder="(509) 555-0123"
                        className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-100 rounded-[2.5rem] text-xl font-bold tracking-tight focus:border-ecs-brand-dark focus:ring-0 transition-all outline-none"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>

                <button
                    type="submit"
                    disabled={phone.length < 10 || loading}
                    className="btn-primary w-full py-5 flex items-center justify-center gap-3 shadow-md disabled:opacity-50 transition-all"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                        <><Search size={18} strokeWidth={2.5} /> Find My Profile</>
                    )}
                </button>
            </form>

            <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-ecs-brand-dark transition-colors">
                I&apos;m a new customer
            </button>
        </div>
    );
}
