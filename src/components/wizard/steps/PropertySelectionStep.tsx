"use client";

import React from "react";
import { Home, Plus, ChevronLeft, ArrowRight } from "lucide-react";

interface PropertySelectionStepProps {
    onSelectSaved: () => void;
    onStartNew: () => void;
    onBack: () => void;
    customerName: string;
}

export default function PropertySelectionStep({ onSelectSaved, onStartNew, onBack, customerName }: PropertySelectionStepProps) {
    return (
        <div className="h-full w-full relative flex flex-col">
            {/* SCROLLABLE CONTENT AREA */}
            <div className="flex-1 overflow-y-auto w-full px-6 pt-8 pb-32 no-scrollbar">
                <div className="max-w-xl mx-auto space-y-6">
                    <div className="text-center space-y-2">
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-[#024653] leading-tight">
                            Hello, <span className="text-[#05D16E]">{customerName}</span>
                        </h2>
                        <p className="text-[10px] text-[#024653]/40 font-bold uppercase tracking-widest text-center w-full">What would you like to clean today?</p>
                    </div>

                    <div className="grid gap-3 w-full">
                        <button
                            onClick={onSelectSaved}
                            className="w-full bg-white border-2 border-slate-50 p-6 rounded-2xl text-left hover:border-[#05D16E]/50 transition-all group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 p-3">
                                <span className="bg-[#05D16E] text-[#024653] text-[8px] px-2 py-1 rounded-md font-black uppercase tracking-widest">Saved</span>
                            </div>
                            <div className="flex items-center gap-2 text-[#05D16E] font-black mb-1">
                                <Home size={18} /> <span className="text-[10px] uppercase tracking-widest">Main Residence</span>
                            </div>
                            <div className="text-[#024653] font-black text-xl mb-0.5 truncate uppercase tracking-tighter">123 South Hill Dr</div>
                            <div className="text-[#024653]/30 text-[9px] font-black uppercase tracking-widest">3 Bed • 2 Bath • 1800 SQ FT</div>
                        </button>

                        <button
                            onClick={onStartNew}
                            className="w-full bg-white border-2 border-slate-50 p-6 rounded-2xl text-left hover:border-[#024653]/10 transition-all group flex items-center justify-between"
                        >
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-xl bg-[#F9F8F2] flex items-center justify-center text-[#024653]/40 group-hover:text-[#024653] transition-colors">
                                    <Plus size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <h3 className="text-base font-black tracking-tighter text-[#024653] uppercase">New Property</h3>
                                    <p className="text-[9px] text-[#024653]/30 font-black uppercase tracking-widest">Add a different location</p>
                                </div>
                            </div>
                            <ArrowRight size={18} className="text-[#024653]/20 group-hover:text-[#05D16E] transition-all" />
                        </button>
                    </div>
                </div>
            </div>

            {/* DOCKED FOOTER */}
            <div className="absolute bottom-0 left-0 w-full z-50 bg-white border-t border-gray-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                <div className="w-full max-w-xl mx-auto p-6 flex flex-col items-center justify-center">
                    <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-[#024653]/40 hover:text-[#024653] transition-colors py-2">
                        Not {customerName}? Switch account
                    </button>
                </div>
            </div>
        </div>
    );
}
