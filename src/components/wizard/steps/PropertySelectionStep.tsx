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
        <div className="flex flex-col h-full justify-start md:justify-center gap-8 w-full max-w-xl mx-auto py-2 antialiased">


            <div className="text-center space-y-4">
                <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-brand-dark leading-[0.85] py-1 text-center w-full">
                    Hello, <span className="text-brand-light">{customerName}</span>
                </h2>
                <p className="text-sm text-slate-500 font-medium tracking-tight">What would you like to clean today?</p>
            </div>

            <div className="grid gap-4 w-full">
                <button
                    onClick={onSelectSaved}
                    className="w-full bg-white border-2 border-brand-light/20 p-6 rounded-3xl text-left hover:border-brand-light transition-all group relative overflow-hidden shadow-sm"
                >
                    <div className="absolute top-0 right-0 p-3">
                        <span className="bg-brand-light text-white text-[9px] px-3 py-1 rounded-full font-black uppercase tracking-widest">Saved</span>
                    </div>
                    <div className="flex items-center gap-3 text-brand-light font-black mb-2">
                        <Home size={22} /> <span className="text-sm uppercase tracking-widest">Main Residence</span>
                    </div>
                    <div className="text-brand-dark font-black text-xl mb-1 truncate">123 South Hill Dr</div>
                    <div className="text-slate-400 text-xs font-black uppercase tracking-wider">3 Bed • 2 Bath • 1800 SQ FT</div>
                </button>

                <button
                    onClick={onStartNew}
                    className="w-full bg-white border-2 border-slate-100 p-6 rounded-3xl text-left hover:border-brand-light/50 transition-all group flex items-center justify-between shadow-sm"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-brand-light transition-colors">
                            <Plus size={24} strokeWidth={2.5} />
                        </div>
                        <div>
                            <h3 className="text-lg font-black tracking-tighter text-brand-dark">New Property</h3>
                            <p className="text-xs text-slate-400 font-black uppercase tracking-wider">Add a different location</p>
                        </div>
                    </div>
                    <ArrowRight size={20} className="text-slate-300 group-hover:text-brand-light transition-all" />
                </button>
            </div>

            <button onClick={onBack} className="text-[10px] text-center font-black uppercase tracking-widest text-slate-300 hover:text-slate-500 transition-colors">
                Not {customerName}? Switch account
            </button>
        </div>
    );
}
