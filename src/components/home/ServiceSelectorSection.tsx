"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Building2, Home, Briefcase } from "lucide-react";

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
        <section className="w-full bg-[#024653] relative overflow-hidden lg:h-[100svh] lg:max-h-[1000px] flex flex-col pt-24 pb-12 lg:pt-28 lg:pb-12 border-t border-white/5">
            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10 w-full h-full flex flex-col">

                {/* HEADLINE & TABS - Fixed Height portion */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-8 lg:mb-10 shrink-0">
                    <h2 className="text-3xl lg:text-5xl font-normal tracking-tight text-white text-center md:text-left leading-[1.1]">
                        Cleaning Solutions <br /> <span className="font-light italic opacity-80">Tailored to You</span>
                    </h2>

                    {/* TOGGLE PILL */}
                    <div className="inline-flex bg-white/5 p-1.5 rounded-full relative backdrop-blur-sm border border-white/10">
                        {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setSelectedOption(null); }}
                                className={`
                                    relative px-5 py-2.5 rounded-full text-[11px] font-bold uppercase tracking-widest transition-all z-10
                                    ${activeTab === tab ? 'text-[#024653]' : 'text-white/60 hover:text-white'}
                                `}
                            >
                                {activeTab === tab && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 bg-white rounded-full shadow-lg"
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
                <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-0">

                    {/* LEFT: INFO CARD (Dynamic) - Green Card */}
                    <motion.div
                        layout
                        className="lg:col-span-4 bg-[#05D16E] rounded-[2.5rem] p-8 lg:p-10 text-[#024653] flex flex-col relative overflow-hidden h-full shadow-2xl shadow-black/10"
                    >
                        {/* Blob Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay" />

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
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
                                        {activeContent.icon}
                                    </div>

                                    <h3 className="text-3xl font-bold mb-4 tracking-tight">{activeContent.title}</h3>
                                    <p className="text-[#024653]/80 leading-relaxed mb-8 font-medium text-lg">
                                        {activeContent.description}
                                    </p>

                                    <ul className="space-y-4 mb-auto">
                                        {activeContent.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="p-1 rounded-full bg-white/20">
                                                    <CheckCircle2 size={16} className="text-[#024653]" />
                                                </div>
                                                <span className="font-bold text-[#024653]/90">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>

                            <div className="relative z-10 mt-8 pt-6 border-t border-[#024653]/10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-[#024653]/60 mb-2">Need a Custom Plan?</p>
                                <a href="/contact" className="text-sm font-bold underline decoration-[#024653]/30 underline-offset-4 hover:decoration-[#024653] transition-all text-[#024653]">
                                    Contact our team directly →
                                </a>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: INTERACTIVE SELECTION - White Card */}
                    <div className="lg:col-span-8 flex flex-col h-full min-h-0">
                        <div className="bg-[#F9F8F2] rounded-[2.5rem] p-8 lg:p-10 h-full w-full border border-white/10 flex flex-col shadow-2xl shadow-black/20 overflow-hidden relative">

                            <div className="mb-6 flex items-center justify-between shrink-0">
                                <h4 className="text-xl font-bold text-[#024653] flex items-center gap-3">
                                    <Sparkles className="text-[#05D16E]" size={24} />
                                    Select Your Service Class
                                </h4>
                            </div>

                            {/* Options Grid - Scrollable if needed but designed to fit */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 flex-1 min-h-0 overflow-y-auto pr-1 pb-1">
                                <AnimatePresence mode="wait">
                                    {activeContent.options.map((option) => (
                                        <motion.button
                                            key={`${activeTab}-${option.id}`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.95 }}
                                            onClick={() => setSelectedOption(option.id)}
                                            className={`
                                                relative p-6 rounded-[1.5rem] text-left border-2 transition-all group flex flex-col h-full min-h-[220px] justify-between
                                                ${selectedOption === option.id
                                                    ? 'bg-white border-[#05D16E] shadow-xl shadow-[#05D16E]/10 ring-4 ring-[#05D16E]/5 z-10'
                                                    : 'bg-white border-transparent hover:border-slate-200 shadow-sm hover:shadow-lg'
                                                }
                                            `}
                                        >
                                            {option.tag && (
                                                <span className={`
                                                    absolute -top-3 left-6 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full shadow-sm
                                                    ${selectedOption === option.id ? 'bg-[#024653] text-white' : 'bg-slate-100 text-slate-500'}
                                                `}>
                                                    {option.tag}
                                                </span>
                                            )}

                                            <div className="mt-4">
                                                <h5 className={`font-bold text-xl leading-tight mb-2 ${selectedOption === option.id ? 'text-[#024653]' : 'text-slate-700'}`}>
                                                    {option.label}
                                                </h5>
                                                <div className={`h-1 w-8 rounded-full ${selectedOption === option.id ? 'bg-[#05D16E]' : 'bg-slate-200'}`} />
                                            </div>

                                            <div className="flex items-end justify-between mt-6">
                                                <span className="text-sm font-bold text-slate-400 block">{option.price}</span>
                                                <div className={`
                                                    w-8 h-8 shrink-0 rounded-full border-2 flex items-center justify-center transition-colors
                                                    ${selectedOption === option.id ? 'border-[#05D16E] bg-[#05D16E]' : 'border-slate-200'}
                                                `}>
                                                    {selectedOption === option.id && <CheckCircle2 size={16} className="text-white" />}
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* ACTION AREA - Fixed at bottom */}
                            <div className="flex justify-end mt-8 shrink-0 pt-6 border-t border-[#024653]/5">
                                <Link
                                    href={selectedOption ? getWizardLink() : '#'}
                                    className={`
                                        inline-flex items-center gap-4 px-10 py-5 rounded-full font-black text-xs uppercase tracking-widest transition-all
                                        ${selectedOption
                                            ? 'bg-[#024653] text-white shadow-xl hover:-translate-y-1 hover:shadow-2xl hover:bg-[#02333d]'
                                            : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                                        }
                                    `}
                                    onClick={(e) => !selectedOption && e.preventDefault()}
                                >
                                    <span>Continue to Booking</span>
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
