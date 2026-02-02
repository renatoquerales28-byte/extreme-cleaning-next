"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Building2, Home, Briefcase } from "lucide-react";

type ServiceType = 'residential' | 'commercial' | 'pm';

const SERVICE_CONTENT = {
    residential: {
        title: "Residential Cleaning",
        description: "Experience the luxury of a spotless home without lifting a finger. Our vetted professionals deliver perfection every time.",
        benefits: [
            "Eco-friendly & Safe Products",
            "Background Checked Staff",
            "100% Satisfaction Guarantee",
            "Customizable Checklists"
        ],
        icon: <Home size={32} />,
        options: [
            { id: 'standard', label: 'Standard Clean', price: 'From $150', tag: 'Most Popular' },
            { id: 'deep', label: 'Deep Clean', price: 'From $250', tag: 'Best Value' },
            { id: 'move', label: 'Move In / Out', price: 'Custom Quote', tag: null },
        ]
    },
    commercial: {
        title: "Commercial & Office",
        description: "Create a pristine work environment that impresses clients and boosts employee productivity.",
        benefits: [
            "After-hours Service Available",
            "Licensed & Insured",
            "Customized Frequency",
            "Supply Management"
        ],
        icon: <Building2 size={32} />,
        options: [
            { id: 'standard', label: 'Office Maintenance', price: 'Custom Quote', tag: 'Daily/Weekly' },
            { id: 'deep', label: 'Deep Sanitization', price: 'Custom Quote', tag: null },
            { id: 'post-construction', label: 'Post Construction', price: 'Custom Quote', tag: 'Heavy Duty' },
        ]
    },
    pm: {
        title: "Property Management",
        description: "Reliable turnover cleaning for property managers and landlords. We ensure your units are rent-ready faster.",
        benefits: [
            "Rapid Turnaround Times",
            "Photo Documentation",
            "Key Management Secure",
            "Volume Discounts"
        ],
        icon: <Briefcase size={32} />,
        options: [
            { id: 'turnover', label: 'Tenant Turnover', price: 'Flat Rates', tag: 'Priority' },
            { id: 'common', label: 'Common Areas', price: 'Contract', tag: null },
            { id: 'eviction', label: 'Trash Out', price: 'Heavy Duty', tag: null },
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
        <section className="w-full bg-[#F9F8F2] relative overflow-hidden lg:h-[80svh] lg:max-h-[850px] flex flex-col pt-8 pb-12 lg:pt-10 lg:pb-16">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10 w-full h-full flex flex-col">

                {/* HEADLINE & TABS - Fixed Height portion */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-4 lg:mb-8 shrink-0">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-[#024653] text-center md:text-left leading-[1.1]">
                        Cleaning Solutions <br /> <span className="font-light italic opacity-60">Tailored to You</span>
                    </h2>

                    {/* TOGGLE PILL */}
                    <div className="inline-flex bg-white/50 p-1 rounded-full relative border border-slate-200 shrink-0">
                        {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setSelectedOption(null); }}
                                className={`
                                    relative px-4 py-2 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-widest transition-all z-10
                                    ${activeTab === tab ? 'text-[#024653]' : 'text-slate-400 hover:text-slate-600'}
                                `}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {tab === 'pm' ? 'Property Mgmt' : tab}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* CONTENT GRID - Fills remaining space */}
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 min-h-0">

                    {/* LEFT: INFO CARD (Dynamic) - Dark Navy Card */}
                    <motion.div
                        layout
                        className="lg:col-span-4 bg-[#024653] rounded-[2rem] px-8 py-10 lg:px-10 lg:py-12 text-white flex flex-col relative overflow-hidden h-full shadow-2xl shadow-[#024653]/10"
                    >
                        {/* Blob Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay" />

                        <div className="relative z-10 flex flex-col h-full">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="flex items-center gap-4 mb-4 lg:mb-6 shrink-0">
                                        <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                                            {activeContent.icon}
                                        </div>
                                        <h3 className="text-lg lg:text-xl font-bold tracking-tight">{activeContent.title}</h3>
                                    </div>

                                    <p className="text-white/80 leading-relaxed mb-6 lg:mb-8 font-normal text-[13px] lg:text-sm xl:text-base">
                                        {activeContent.description}
                                    </p>

                                    <ul className="space-y-3 lg:space-y-4 mb-auto">
                                        {activeContent.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="p-0.5 rounded-full bg-white/20 shrink-0">
                                                    <CheckCircle2 size={12} className="text-white" />
                                                </div>
                                                <span className="font-normal text-white/90 text-[11px] lg:text-xs xl:text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* DYNAMIC ACTION BUTTON */}
                                    <AnimatePresence>
                                        {selectedOption && (
                                            <motion.div
                                                initial={{ opacity: 0, x: 20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: 20 }}
                                                className="mt-8 pt-6"
                                            >
                                                <Link
                                                    href={getWizardLink()}
                                                    className="inline-flex w-full items-center justify-between gap-4 px-6 lg:px-8 py-4 lg:py-5 bg-white text-[#024653] rounded-full font-normal text-[10px] lg:text-xs uppercase tracking-widest shadow-xl hover:-translate-y-1 hover:shadow-2xl transition-all"
                                                >
                                                    <span>Continue to Booking</span>
                                                    <ArrowRight size={16} />
                                                </Link>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* RIGHT: INTERACTIVE SELECTION */}
                    <div className="lg:col-span-8 flex flex-col h-full min-h-0">
                        {/* Options Grid - Matches Left Card Height */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 h-full">
                            <AnimatePresence mode="wait">
                                {activeContent.options.map((option) => (
                                    <motion.button
                                        key={`${activeTab}-${option.id}`}
                                        initial={{ opacity: 0, scale: 0.98 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.98 }}
                                        onClick={() => setSelectedOption(option.id)}
                                        className={`
                                            relative p-5 lg:p-8 rounded-[2rem] text-center border-2 transition-all group flex flex-col h-full justify-center
                                            ${selectedOption === option.id
                                                ? 'bg-white border-transparent shadow-2xl shadow-[#024653]/5 z-10'
                                                : 'bg-white/40 border-transparent hover:bg-white hover:shadow-xl'
                                            }
                                        `}
                                    >
                                        {option.tag && (
                                            <span className={`
                                                absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1.5 text-[8px] lg:text-[9px] font-normal uppercase tracking-widest rounded-full shadow-sm
                                                ${selectedOption === option.id ? 'bg-[#024653] text-white' : 'bg-slate-200 text-slate-500'}
                                            `}>
                                                {option.tag}
                                            </span>
                                        )}

                                        <div className="mb-4">
                                            <h5 className={`font-bold text-base lg:text-xl leading-tight mb-2 ${selectedOption === option.id ? 'text-[#024653]' : 'text-slate-600'}`}>
                                                {option.label}
                                            </h5>
                                            <div className="flex justify-center">
                                                <div className={`h-[2px] w-8 rounded-full ${selectedOption === option.id ? 'bg-[#05D16E]' : 'bg-slate-200'}`} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-3">
                                            <span className="text-[11px] lg:text-xs font-normal text-slate-400 uppercase tracking-widest">
                                                {option.price}
                                            </span>
                                            {selectedOption === option.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-8 h-8 rounded-full bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20"
                                                >
                                                    <CheckCircle2 size={16} className="text-white" />
                                                </motion.div>
                                            )}
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
