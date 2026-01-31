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
            // Map simple IDs to wizard compatible query params if needed
            // For now passing as generic 'intensity' or 'service'
            url += `&intensity=${selectedOption}`;
        }
        return url;
    };

    return (
        <section className="w-full bg-white py-20 relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 relative z-10">

                {/* HEADLINE */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-[#024653] mb-6">
                        Cleaning Solutions <br /> <span className="text-[#05D16E]">Tailored to You</span>
                    </h2>

                    {/* TOGGLE PILL */}
                    <div className="inline-flex bg-slate-100 p-1.5 rounded-full relative">
                        {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => { setActiveTab(tab); setSelectedOption(null); }}
                                className={`
                                    relative px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider transition-all z-10
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

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                    {/* LEFT: INFO CARD (Dynamic) */}
                    <motion.div
                        layout
                        className="lg:col-span-4 bg-[#024653] rounded-[2.5rem] p-10 text-white flex flex-col justify-between relative overflow-hidden min-h-[500px]"
                    >
                        {/* Blob Decoration */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-[#05D16E]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2" />

                        <div className="relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTab}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-8 backdrop-blur-sm">
                                        {activeContent.icon}
                                    </div>
                                    <h3 className="text-3xl font-bold mb-4">{activeContent.title}</h3>
                                    <p className="text-white/70 leading-relaxed mb-8">
                                        {activeContent.description}
                                    </p>

                                    <ul className="space-y-4">
                                        {activeContent.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="p-1 rounded-full bg-[#05D16E]/20">
                                                    <CheckCircle2 size={14} className="text-[#05D16E]" />
                                                </div>
                                                <span className="text-sm font-medium text-white/90">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        <div className="relative z-10 mt-12 pt-8 border-t border-white/10">
                            <p className="text-[10px] font-black uppercase tracking-widest text-[#05D16E] mb-2">Need a Custom Plan?</p>
                            <a href="/contact" className="text-sm font-bold underline decoration-white/30 underline-offset-4 hover:decoration-[#05D16E] transition-all">
                                Contact our team directly →
                            </a>
                        </div>
                    </motion.div>

                    {/* RIGHT: INTERACTIVE SELECTION */}
                    <div className="lg:col-span-8 flex flex-col justify-between gap-8">
                        <div className="bg-slate-50 rounded-[2.5rem] p-10 h-full border border-slate-100 flex flex-col justify-center">

                            <h4 className="text-lg font-bold text-[#024653] mb-6 flex items-center gap-2">
                                <Sparkles className="text-[#05D16E]" size={20} />
                                Select Your Service Class
                            </h4>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                                <AnimatePresence mode="wait">
                                    {activeContent.options.map((option) => (
                                        <motion.button
                                            key={`${activeTab}-${option.id}`}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            onClick={() => setSelectedOption(option.id)}
                                            className={`
                                                relative p-6 rounded-2xl text-left border-2 transition-all group
                                                ${selectedOption === option.id
                                                    ? 'bg-white border-[#05D16E] shadow-xl shadow-[#05D16E]/10 ring-4 ring-[#05D16E]/5'
                                                    : 'bg-white border-transparent hover:border-slate-200 shadow-sm hover:shadow-md'
                                                }
                                            `}
                                        >
                                            {option.tag && (
                                                <span className={`
                                                    absolute -top-3 left-6 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-full
                                                    ${selectedOption === option.id ? 'bg-[#05D16E] text-[#024653]' : 'bg-slate-800 text-white'}
                                                `}>
                                                    {option.tag}
                                                </span>
                                            )}

                                            <div className="h-full flex flex-col justify-between gap-4 mt-2">
                                                <h5 className={`font-bold text-lg ${selectedOption === option.id ? 'text-[#024653]' : 'text-slate-700'}`}>
                                                    {option.label}
                                                </h5>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs font-medium text-slate-400">{option.price}</span>
                                                    <div className={`
                                                        w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors
                                                        ${selectedOption === option.id ? 'border-[#05D16E] bg-[#05D16E]' : 'border-slate-200'}
                                                    `}>
                                                        {selectedOption === option.id && <CheckCircle2 size={14} className="text-white" />}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.button>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* ACTION AREA */}
                            <div className="flex justify-end">
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
