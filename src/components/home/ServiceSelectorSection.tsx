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
        <section className="w-full bg-[#F9F8F2] relative lg:h-[100svh] lg:max-h-[1000px] flex flex-col py-10 lg:py-16 overflow-hidden">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10 w-full h-full flex flex-col">

                {/* HEADLINE & TABS - Compact for single frame height */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 lg:mb-10 shrink-0">
                    <h2 className="text-3xl lg:text-4xl xl:text-5xl font-normal tracking-tight text-[#024653] text-center md:text-left leading-[1.1]">
                        Cleaning Solutions <br /> <span className="font-light italic opacity-60">Tailored to You</span>
                    </h2>

                    {/* TOGGLE PILL */}
                    <div className="inline-flex bg-white/50 p-1 rounded-full relative border border-slate-200 shrink-0 shadow-sm">
                        {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setSelectedOption(null); }}
                                className={`
                                    relative px-5 py-2 rounded-full text-[10px] lg:text-[11px] font-bold uppercase tracking-widest transition-all z-10
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

                {/* CONTENT GRID - Optimized to match Hero Image Aspect/Height */}
                <div className="flex-1 min-h-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 pb-4">

                    {/* LEFT: INFO CARD (Dynamic) - Dark Navy Card */}
                    <motion.div
                        layout
                        className="lg:col-span-4 bg-[#024653] rounded-[2.5rem] p-8 lg:p-10 xl:p-12 text-white flex flex-col relative overflow-hidden h-full shadow-2xl shadow-[#024653]/10"
                    >
                        {/* Blob Decoration */}
                        <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay" />

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
                                    <div className="flex items-center gap-4 mb-6 lg:mb-8 shrink-0">
                                        <div className="w-12 h-12 lg:w-16 lg:h-16 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm shrink-0">
                                            {activeContent.icon}
                                        </div>
                                        <h3 className="text-xl lg:text-2xl font-bold tracking-tight">{activeContent.title}</h3>
                                    </div>

                                    <p className="text-white/80 leading-relaxed mb-6 lg:mb-8 font-normal text-sm lg:text-base xl:text-lg">
                                        {activeContent.description}
                                    </p>

                                    <ul className="space-y-4 mb-auto">
                                        {activeContent.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="p-0.5 rounded-full bg-white/20 shrink-0">
                                                    <CheckCircle2 size={14} className="text-white" />
                                                </div>
                                                <span className="font-normal text-white/90 text-xs lg:text-sm">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* DYNAMIC ACTION BUTTON AREA */}
                                    <div className="mt-8 relative pt-6 lg:pt-8 border-t border-white/5 shrink-0 min-h-[100px] flex items-center">
                                        <motion.div
                                            className="w-full"
                                            initial={false}
                                            animate={{
                                                opacity: selectedOption ? 1 : 0,
                                                y: selectedOption ? 0 : 20,
                                                pointerEvents: selectedOption ? "auto" : "none"
                                            }}
                                            transition={{ duration: 0.4, ease: "easeOut" }}
                                        >
                                            <Link
                                                href={getWizardLink()}
                                                className="inline-flex w-full items-center justify-between gap-4 px-8 py-5 bg-[#05D16E] text-[#024653] rounded-2xl font-bold text-xs lg:text-sm uppercase tracking-widest shadow-xl shadow-[#05D16E]/10 hover:-translate-y-1 hover:shadow-2xl transition-all"
                                            >
                                                <span>Continue to Booking</span>
                                                <ArrowRight size={20} />
                                            </Link>
                                        </motion.div>

                                        {!selectedOption && (
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="absolute inset-0 flex items-center justify-center"
                                            >
                                                <p className="text-[10px] uppercase tracking-widest text-white/30 italic font-medium">Select a plan on the right</p>
                                            </motion.div>
                                        )}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* RIGHT: INTERACTIVE SELECTION - Balanced with Hero sync */}
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
                                            relative p-8 lg:p-10 rounded-[2.5rem] text-center border-2 transition-all group flex flex-col h-full justify-center
                                            ${selectedOption === option.id
                                                ? 'bg-white border-transparent shadow-2xl shadow-[#024653]/10 z-10 scale-[1.02]'
                                                : 'bg-white/60 border-transparent hover:bg-white hover:shadow-xl'
                                            }
                                        `}
                                    >
                                        {option.tag && (
                                            <span className={`
                                                absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-2 text-[9px] font-bold uppercase tracking-widest rounded-full shadow-sm
                                                ${selectedOption === option.id ? 'bg-[#024653] text-white' : 'bg-slate-200 text-slate-500'}
                                            `}>
                                                {option.tag}
                                            </span>
                                        )}

                                        <div className="mb-6 lg:mb-10">
                                            <h5 className={`font-bold text-lg lg:text-2xl leading-tight mb-3 ${selectedOption === option.id ? 'text-[#024653]' : 'text-slate-600'}`}>
                                                {option.label}
                                            </h5>
                                            <div className="flex justify-center">
                                                <div className={`h-[2px] w-10 rounded-full ${selectedOption === option.id ? 'bg-[#05D16E]' : 'bg-slate-200'}`} />
                                            </div>
                                        </div>

                                        <div className="flex flex-col items-center gap-6">
                                            <span className="text-xs lg:text-sm font-normal text-slate-400 uppercase tracking-widest font-medium">
                                                {option.price}
                                            </span>
                                            {selectedOption === option.id && (
                                                <motion.div
                                                    initial={{ scale: 0 }}
                                                    animate={{ scale: 1 }}
                                                    className="w-10 h-10 rounded-full bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/20"
                                                >
                                                    <CheckCircle2 size={20} className="text-white" />
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
