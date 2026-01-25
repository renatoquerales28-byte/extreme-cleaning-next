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
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-8">
                    <div className="flex flex-col items-center w-full space-y-8">
                        <div className="w-16 h-16 bg-[#05D16E]/10 text-[#024653] border-2 border-[#05D16E]/20 rounded-full flex items-center justify-center">
                            <User size={32} strokeWidth={2.5} />
                        </div>

                        <div className="space-y-2">
                            <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                                Welcome <span className="text-[#05D16E]">Back</span>
                            </h2>
                            <p className="text-sm text-[#024653]/40 font-bold uppercase tracking-widest text-[10px]">
                                Access your profile
                            </p>
                        </div>

                        <div className="w-full relative flex items-center">
                            <Phone className="absolute left-6 text-[#024653]/20" size={20} />
                            <input
                                type="tel"
                                placeholder="(509) 555-0123"
                                className="w-full pl-16 pr-8 py-5 bg-white border-2 border-slate-50 rounded-2xl text-xl font-bold tracking-tight focus:border-[#024653] focus:ring-0 transition-all outline-none"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="absolute bottom-0 left-0 w-full z-20 bg-white border-t border-gray-100">
                <div className="w-full max-w-xl mx-auto p-6 flex flex-col items-center justify-center">
                    <button onClick={onBack} className="w-full text-[10px] font-black uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors py-2 mb-4">
                        I&apos;m a new customer
                    </button>

                    <button
                        onClick={handleSearch}
                        disabled={phone.length < 10 || loading}
                        className="w-full py-6 bg-[#024653] text-white rounded-2xl flex items-center justify-center gap-3 hover:bg-[#0E6168] transition-all disabled:opacity-50"
                    >
                        {loading ? (
                            <div className="w-5 h-5 border-3 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                            <><Search size={18} strokeWidth={2.5} /> Find My Profile</>
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
}
