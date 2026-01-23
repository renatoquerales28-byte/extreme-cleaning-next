"use client";

import React from "react";
import { Gift, AlertCircle, ArrowRight } from "lucide-react";

export default function StrategySection() {
    return (
        <section className="py-20 px-4 w-full max-w-7xl mx-auto">
            <div className="glass-card p-12 rounded-[3rem] bg-brand-dark/5 border-brand-dark/10 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-accent/30 transition-colors duration-1000" />

                <div className="relative z-10 flex flex-col md:flex-row items-center gap-12">
                    <div className="flex-1 space-y-6">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-black uppercase tracking-widest">
                            <Gift size={14} /> Alternative Strategy
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-brand-dark">
                            Unexpected Guests? <br />
                            <span className="text-accent">Post-Party Emergency?</span>
                        </h2>
                        <p className="text-lg text-slate-600 font-medium">
                            We offer same-day &quot;Emergency&quot; slots for when life gets messy. Perfect for post-party recovery or surprise in-law visits.
                        </p>
                        <button className="flex items-center gap-2 text-brand-dark font-black uppercase tracking-widest hover:gap-4 transition-all">
                            Check Emergency Slots <ArrowRight size={20} className="text-accent" />
                        </button>
                    </div>

                    <div className="w-full md:w-1/3">
                        <div className="aspect-[4/5] bg-white rounded-[2rem] shadow-xl p-8 flex flex-col items-center justify-center text-center gap-4">
                            <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mb-4">
                                <AlertCircle size={32} />
                            </div>
                            <h3 className="text-xl font-black tracking-tight">SOS Protocol</h3>
                            <p className="text-sm text-slate-500">2-hour arrival window for qualified emergencies.</p>
                            <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden mt-4">
                                <div className="w-2/3 h-full bg-red-500 rounded-full animate-pulse" />
                            </div>
                            <p className="text-[10px] font-bold text-slate-400 mt-2">High Demand</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Actions Row from Wireframe */}
            <div className="mt-12 grid md:grid-cols-3 gap-6">
                <div className="bg-slate-100/50 rounded-full px-8 py-6 flex items-center text-slate-400 font-bold tracking-widest uppercase text-sm border border-slate-200">
                    Zip Code ...
                </div>
                <button className="bg-slate-200 text-slate-400 rounded-full font-black uppercase tracking-widest hover:bg-slate-300 transition-colors">
                    Send
                </button>
                <button className="bg-brand-dark text-white rounded-full font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg">
                    Call to Action
                </button>
            </div>
        </section>
    );
}
