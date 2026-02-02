"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type ServiceType = 'residential' | 'commercial' | 'pm';

const SERVICE_CONTENT = {
    residential: {
        description: "Experience the luxury of a spotless home without lifting a finger. Our vetted professionals deliver perfection every time.",
        benefits: [
            "Eco-friendly & Safe Products",
            "Background Checked Staff",
            "100% Satisfaction Guarantee",
            "Customizable Checklists"
        ],
        options: [
            {
                id: 'standard',
                label: 'Standard Clean',
                price: 'From $150',
                tag: 'Most Popular',
                shortDesc: "Comprehensive surface cleaning for your primary living spaces."
            },
            {
                id: 'deep',
                label: 'Deep Clean',
                price: 'From $250',
                tag: 'Best Value',
                shortDesc: "Intensive restoration cleaning, targeting every corner and hidden detail."
            },
            {
                id: 'move',
                label: 'Move In / Out',
                price: 'Custom Quote',
                tag: null,
                shortDesc: "Stress-free turnover cleaning to ensure your new or old home is pristine."
            },
        ]
    },
    commercial: {
        description: "Create a pristine work environment that impresses clients and boosts employee productivity.",
        benefits: [
            "After-hours Service Available",
            "Licensed & Insured",
            "Customized Frequency",
            "Supply Management"
        ],
        options: [
            {
                id: 'standard',
                label: 'Office Maintenance',
                price: 'Custom Quote',
                tag: 'Daily/Weekly',
                shortDesc: "Reliable daily or weekly upkeep for a consistently professional workplace."
            },
            {
                id: 'deep',
                label: 'Deep Sanitization',
                price: 'Custom Quote',
                tag: null,
                shortDesc: "Heavy-duty disinfection and deep cleaning for high-traffic office areas."
            },
            {
                id: 'post-construction',
                label: 'Post Construction',
                price: 'Custom Quote',
                tag: 'Heavy Duty',
                shortDesc: "Expert dust and debris removal after renovations or new builds."
            },
        ]
    },
    pm: {
        description: "Reliable turnover cleaning for property managers and landlords. We ensure your units are rent-ready faster.",
        benefits: [
            "Rapid Turnaround Times",
            "Photo Documentation",
            "Key Management Secure",
            "Volume Discounts"
        ],
        options: [
            {
                id: 'turnover',
                label: 'Tenant Turnover',
                price: 'Flat Rates',
                tag: 'Priority',
                shortDesc: "Speedy, thorough cleans to get your units listed and rented faster."
            },
            {
                id: 'common',
                label: 'Common Areas',
                price: 'Contract',
                tag: null,
                shortDesc: "Consistent maintenance for lobbies, hallways, and shared building spaces."
            },
            {
                id: 'eviction',
                label: 'Trash Out',
                price: 'Heavy Duty',
                tag: null,
                shortDesc: "Full unit clearing and sanitization after evictions or move-outs."
            },
        ]
    }
};

export default function ServiceSelectorSection() {
    const [activeTab, setActiveTab] = useState<ServiceType>('residential');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);

    const activeContent = SERVICE_CONTENT[activeTab];

    const getWizardLink = () => {
        let url = `/wizard?type=${activeTab}`;
        if (selectedOption) {
            url += `&intensity=${selectedOption}`;
        }
        return url;
    };

    return (
        <section className="w-full bg-[#F9F8F2] relative lg:h-[100svh] lg:max-h-[1000px] flex flex-col items-center justify-center overflow-hidden">
            <div className="max-w-[1700px] w-full h-full mx-auto px-6 lg:px-10 relative z-10 flex items-center justify-center py-0">

                {/* CONTENT GRID - Optimized for laptop viewports to match Hero's visual balance */}
                <div className="w-full h-[85%] lg:h-[70%] grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8">

                    {/* LEFT: INFO CARD (Compact) */}
                    <motion.div
                        layout
                        className="lg:col-span-4 bg-[#024653] rounded-2xl lg:rounded-3xl p-6 lg:p-10 text-white flex flex-col relative overflow-hidden h-full shadow-2xl shadow-[#024653]/30"
                    >
                        {/* Blob Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay" />

                        <div className="relative z-10 flex flex-col h-full">

                            {/* INTEGRATED SERVICE SWITCHER - Text only, compact */}
                            <div className="inline-flex bg-white/5 p-1 rounded-full relative border border-white/10 mb-8 lg:mb-10 shadow-inner w-full">
                                {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => { setActiveTab(tab); setSelectedOption(null); }}
                                        className={`
                                            relative flex-1 py-2.5 rounded-full text-[8.5px] lg:text-[9.5px] font-bold uppercase tracking-[0.15em] transition-all z-10
                                            ${activeTab === tab ? 'text-[#024653]' : 'text-white/40 hover:text-white/60'}
                                        `}
                                    >
                                        {activeTab === tab && (
                                            <motion.div
                                                layoutId="activeTabCompact"
                                                className="absolute inset-0 bg-white rounded-full shadow-sm"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        <span className="relative z-10">{tab === 'pm' ? 'Property Mgmt' : tab}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -5 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    <p className="text-white/70 leading-relaxed mb-auto font-normal text-xs lg:text-sm">
                                        {activeContent.description}
                                    </p>

                                    <ul className="space-y-4 mb-auto pt-8">
                                        {activeContent.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="p-0.5 rounded-full bg-white/20 shrink-0">
                                                    <CheckCircle2 size={12} className="text-white" />
                                                </div>
                                                <span className="font-normal text-white/80 text-[10px] lg:text-xs tracking-wide">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* ACTION BUTTON - Elevated & Compact */}
                                    <div className="mt-8 relative pt-8 border-t border-white/5 shrink-0 min-h-[70px] flex items-center">
                                        <motion.div
                                            className="w-full"
                                            initial={false}
                                            animate={{
                                                opacity: selectedOption ? 1 : 0,
                                                y: selectedOption ? 0 : 5,
                                                pointerEvents: selectedOption ? "auto" : "none"
                                            }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={getWizardLink()}
                                                className="inline-flex w-full items-center justify-between gap-4 px-6 lg:px-8 py-4 bg-[#05D16E] text-[#024653] rounded-xl font-bold text-[10px] lg:text-xs uppercase tracking-widest shadow-xl shadow-[#05D16E]/10 hover:-translate-y-0.5 hover:shadow-2xl transition-all"
                                            >
                                                <span>Continue to Booking</span>
                                                <ArrowRight size={16} />
                                            </Link>
                                        </motion.div>

                                        {!selectedOption && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 flex items-center justify-center pt-8"
                                            >
                                                <p className="text-[9px] uppercase tracking-widest text-white/30 italic font-medium">Select a plan to proceed</p>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* RIGHT: SERVICE OPTIONS - Optimized Height */}
                    <div className="lg:col-span-8 flex flex-col h-full min-h-0">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 h-full">
                            <AnimatePresence mode="wait">
                                {activeContent.options.map((option) => (
                                    <motion.button
                                        key={`${activeTab}-${option.id}`}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        onClick={() => setSelectedOption(option.id)}
                                        className={`
                                            relative p-6 lg:p-10 rounded-2xl lg:rounded-3xl text-left transition-all group flex flex-col h-full items-start
                                            ${selectedOption === option.id
                                                ? 'bg-white ring-1 ring-[#024653]/10 shadow-2xl shadow-[#024653]/10 z-10 scale-[1.01]'
                                                : 'bg-white shadow-sm hover:shadow-xl hover:ring-1 hover:ring-[#024653]/5'
                                            }
                                        `}
                                    >
                                        {option.tag && (
                                            <span className={`
                                                absolute -top-2.5 left-8 px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full shadow-sm
                                                ${selectedOption === option.id ? 'bg-[#024653] text-white' : 'bg-slate-200 text-slate-500'}
                                            `}>
                                                {option.tag}
                                            </span>
                                        )}

                                        <div className="mt-4 w-full h-full flex flex-col">
                                            <h5 className={`font-bold text-sm lg:text-base xl:text-lg leading-tight mb-2 ${selectedOption === option.id ? 'text-[#024653]' : 'text-slate-600'}`}>
                                                {option.label}
                                            </h5>
                                            <div className={`h-[1.5px] w-8 rounded-full ${selectedOption === option.id ? 'bg-[#05D16E]' : 'bg-slate-200'}`} />

                                            <p className="mt-6 text-[11px] lg:text-[12px] text-slate-400 font-normal leading-relaxed">
                                                {option.shortDesc}
                                            </p>

                                            <div className="mt-auto pt-6 flex flex-col items-start gap-1">
                                                <span className="text-[10px] lg:text-[11px] font-bold text-[#024653] uppercase tracking-widest">
                                                    {option.price}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute top-10 right-10">
                                            <AnimatePresence>
                                                {selectedOption === option.id && (
                                                    <motion.div
                                                        initial={{ scale: 0, opacity: 0 }}
                                                        animate={{ scale: 1, opacity: 1 }}
                                                        exit={{ scale: 0, opacity: 0 }}
                                                        className="w-10 h-10 rounded-xl bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20"
                                                    >
                                                        <CheckCircle2 size={20} className="text-white" />
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </motion.button>
                                ))}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
