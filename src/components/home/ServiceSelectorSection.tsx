"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, Check } from "lucide-react";

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
                shortDesc: "Our essential maintenance service to keep your home consistently fresh. Includes vacuuming, mopping, dusting, and full sanitization of kitchens and bathrooms for everyday comfort."
            },
            {
                id: 'deep',
                label: 'Deep Clean',
                price: 'From $250',
                tag: 'Best Value',
                shortDesc: "A comprehensive bottom-to-top restoration of your living space. We target overlooked areas like baseboards, behind appliances, interior windows, and heavy-duty lime scale removal."
            },
            {
                id: 'move',
                label: 'Move In / Out',
                price: 'Custom Quote',
                tag: null,
                shortDesc: "Ensure your transition is flawless with a detailed sanitization of every square inch. We make sure every cabinet, drawer, and hidden corner is pristine for the next attendee."
            },
            {
                id: 'post-construction-res',
                label: 'Post Construction',
                price: 'Custom Quote',
                tag: 'New',
                shortDesc: "The final touch for your renovation project. We remove fine dust, paint splatters, and construction debris to reveal the true beauty of your new home improvements."
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
                shortDesc: "Keep your workspace productive and professional with our routine janitorial services. We handle trash removal, desk sanitization, and restroom maintenance on your schedule."
            },
            {
                id: 'deep',
                label: 'Deep Sanitization',
                price: 'Custom Quote',
                tag: null,
                shortDesc: "Advanced high-touch surface disinfection for high-traffic environments. Ideal for maintaining a healthy workspace during flu seasons or after company events."
            },
            {
                id: 'post-construction',
                label: 'Post Construction',
                price: 'Custom Quote',
                tag: 'Heavy Duty',
                shortDesc: "Expert removal of fine construction dust and debris from every surface. We ensure your new build or renovation is ready for immediate occupancy."
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
                shortDesc: "Fast-track your property listings with our high-efficiency turnover service. We specialize in getting units rent-ready within 24 hours while maintaining elite standards."
            },
            {
                id: 'common',
                label: 'Common Areas',
                price: 'Contract',
                tag: null,
                shortDesc: "Reliable maintenance for shared building amenities, lobbies, and corridors. We ensure first impressions for potential tenants are always impeccable and corridors remain spot-free."
            },
            {
                id: 'eviction',
                label: 'Trash Out',
                price: 'Heavy Duty',
                tag: null,
                shortDesc: "Complete debris removal and heavy-duty sanitization for challenging unit conditions. We handle full clear-outs and deep odor removal to restore units to market-ready condition."
            },
        ]
    }
};

// Helper for mobile descriptions - short & effective
const getMobileDesc = (id: string, label: string) => {
    const descs: Record<string, string> = {
        'standard': "Essential maintenance for a fresh and healthy home.",
        'deep': "Top-to-bottom detailed clean for maximum hygiene.",
        'move': "Complete sanitization for a flawless move transition.",
        'post-construction-res': "Post-renovation dust and debris removal service.",
        'turnover': "High-efficiency turnover for rent-ready units.",
        'common': "Pristine maintenance for lobbies and shared spaces.",
        'eviction': "Heavy-duty debris removal and deep sanitization.",
        'post-construction': "Expert build cleanup for immediate occupancy."
    };
    return descs[id] || "Professional cleaning service tailored for you.";
};

export default function ServiceSelectorSection({ onOpenWizard }: { onOpenWizard?: (type?: string, intensity?: string) => void }) {
    const [activeTab, setActiveTab] = useState<ServiceType>('residential');
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [startIndex, setStartIndex] = useState(0);

    const activeContent = SERVICE_CONTENT[activeTab];

    // Reset carousel when tab changes
    useEffect(() => {
        setStartIndex(0);
        setSelectedOption(null);
    }, [activeTab]);

    const nextSlide = () => {
        setStartIndex((prev) => (prev + 1) % activeContent.options.length);
    };

    const handleContinue = (e?: React.MouseEvent) => {
        if (e) e.preventDefault();

        const typeMap: any = {
            'residential': 'residential',
            'commercial': 'commercial',
            'pm': 'property_mgmt'
        };

        const intensityMap: any = {
            'standard': 'standard',
            'deep': 'deep',
            'move': 'move_in_out',
            'post-construction-res': 'post_construction',
            'post-construction': 'post_construction',
            'turnover': 'move_in_out'
        };

        const serviceType = typeMap[activeTab] || activeTab;
        const intensity = selectedOption ? (intensityMap[selectedOption] || selectedOption) : undefined;

        if (onOpenWizard) {
            onOpenWizard(serviceType, intensity);

            // Sync URL for marketing/analytics
            const url = new URL(window.location.href);
            url.searchParams.set('type', serviceType);
            if (intensity) url.searchParams.set('intensity', intensity);
            window.history.pushState({}, '', url);
        } else {
            // Fallback for safety
            let url = `/quote?type=${serviceType}`;
            if (intensity) url += `&intensity=${intensity}`;
            window.location.href = url;
        }
    };

    return (
        <section id="services" className="w-full bg-transparent relative h-auto py-20 lg:py-0 lg:h-[100svh] lg:max-h-[1000px] flex flex-col items-center justify-center snap-start scroll-mt-[60px] lg:-translate-y-[30px]">

            {/* =========================================
                MOBILE LAYOUT (lg:hidden)
               ========================================= */}
            <div className="lg:hidden w-full px-5 pt-[20px] pb-[15px] flex flex-col gap-8 bg-[#F9F8F2]">
                {/* 1. Header Sector Switcher (Pill shape, rounded-full) */}
                <div className="w-full bg-[#024653] p-1.5 rounded-full flex relative shadow-lg">
                    {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`relative flex-1 py-3 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all z-10 ${activeTab === tab ? 'text-[#024653]' : 'text-white/40'
                                }`}
                        >
                            {activeTab === tab && (
                                <motion.div
                                    layoutId="mobileTabIndicator"
                                    className="absolute inset-0 bg-white/20 backdrop-blur-md rounded-full shadow-sm"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                                />
                            )}
                            <span className={`relative z-10 transition-colors ${activeTab === tab ? 'text-white' : ''}`}>
                                {tab === 'pm' ? 'Property' : tab}
                            </span>
                        </button>
                    ))}
                </div>

                {/* 2. Short Dynamic Description */}
                <div className="text-center space-y-2">
                    <h3 className="text-xl font-bold text-[#024653] capitalize">
                        {activeTab === 'pm' ? 'Property Management' : activeTab} Services
                    </h3>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={activeTab}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            className="text-sm text-[#024653]/70 leading-relaxed font-light px-4"
                        >
                            {activeContent.description.split('.')[0]}.
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* 3. Stacked Service Cards (Vertical List) */}
                <div className="flex flex-col gap-3">
                    {activeContent.options.map((option) => (
                        <motion.button
                            key={`${activeTab}-${option.id}`}
                            onClick={() => setSelectedOption(option.id)}
                            className={`relative w-full p-5 rounded-2xl text-left transition-all flex items-center gap-4 border-2 ${selectedOption === option.id
                                ? 'bg-white border-transparent shadow-xl scale-[1.01]'
                                : 'bg-white border-transparent shadow-sm'
                                }`}
                        >
                            {/* Left: Check Selection Circle */}
                            <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${selectedOption === option.id ? 'border-[#024653] bg-[#024653]' : 'border-gray-200'
                                }`}>
                                {selectedOption === option.id && <Check size={14} className="text-white" strokeWidth={3} />}
                            </div>

                            {/* Center: Info */}
                            <div className="flex-1 min-w-0">
                                <div className="flex items-center gap-2 mb-0.5">
                                    <h5 className="font-bold text-sm text-[#024653] truncate">{option.label}</h5>
                                    {option.tag && (
                                        <span className="bg-[#024653] text-white text-[7px] px-2 py-0.5 rounded-full font-normal uppercase">
                                            {option.tag}
                                        </span>
                                    )}
                                </div>
                                <p className="text-[11px] text-[#024653]/60 font-light truncate">
                                    {getMobileDesc(option.id, option.label)}
                                </p>
                            </div>

                            {/* Right: Price (Remove Custom Quote) */}
                            <div className="text-right shrink-0">
                                <span className="text-[11px] font-bold text-[#024653] whitespace-nowrap">
                                    {option.price === 'Custom Quote' ? '' : (option.price.includes('From') ? option.price.replace('From ', '') : option.price)}
                                </span>
                            </div>
                        </motion.button>
                    ))}
                </div>

                {/* 4. Action Button */}
                <div className="pt-4">
                    <AnimatePresence>
                        {selectedOption ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                            >
                                <button
                                    onClick={handleContinue}
                                    className="w-full flex items-center justify-center gap-3 py-5 bg-[#024653] text-white rounded-2xl font-normal text-xs uppercase tracking-widest shadow-xl active:scale-95 transition-all"
                                >
                                    <span>Get Clean!</span>
                                    <ArrowRight size={18} className="text-white" />
                                </button>
                                <p className="text-center text-[10px] text-[#024653]/40 mt-3 font-medium">
                                    Appointments available 7 days a week
                                </p>
                            </motion.div>
                        ) : (
                            <div className="py-5 flex items-center justify-center italic text-[#024653]/30 text-[10px] uppercase tracking-widest">
                                Select a plan to continue
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>

            {/* =========================================
                DESKTOP LAYOUT (hidden lg:flex)
               ========================================= */}
            <div className="hidden lg:flex max-w-[1700px] w-full h-full mx-auto px-10 items-center justify-center">
                <div className="w-full h-[78%] grid grid-cols-12 gap-8 translate-y-[15px]">
                    {/* LEFT: INFO CARD */}
                    <motion.div
                        layout
                        className="col-span-4 bg-[#024653] rounded-3xl p-10 text-white flex flex-col relative overflow-hidden h-full shadow-2xl shadow-[#024653]/30"
                    >
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 mix-blend-overlay" />
                        <div className="relative z-10 flex flex-col h-full">
                            <div className="inline-flex bg-white/5 p-1 rounded-full relative border border-white/10 mb-10 shadow-inner w-full">
                                {(['residential', 'commercial', 'pm'] as ServiceType[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`relative flex-1 py-2.5 rounded-full text-[9.5px] font-bold uppercase tracking-[0.15em] transition-all z-10 ${activeTab === tab ? 'text-[#024653]' : 'text-white/40 hover:text-white/60'}`}
                                    >
                                        {activeTab === tab && (
                                            <motion.div layoutId="dActiveTab" className="absolute inset-0 bg-white rounded-full shadow-sm" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                                        )}
                                        <span className="relative z-10">{tab === 'pm' ? 'Property Mgmt' : tab}</span>
                                    </button>
                                ))}
                            </div>

                            <AnimatePresence mode="wait">
                                <motion.div key={activeTab} initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col h-full">
                                    <p className="text-white/70 leading-relaxed mb-auto font-normal text-sm">{activeContent.description}</p>
                                    <ul className="space-y-4 mb-auto pt-8">
                                        {activeContent.benefits.map((benefit, idx) => (
                                            <li key={idx} className="flex items-center gap-3">
                                                <div className="p-0.5 rounded-full bg-white/20 shrink-0"><CheckCircle2 size={12} className="text-white" /></div>
                                                <span className="font-normal text-white/80 text-xs tracking-wide">{benefit}</span>
                                            </li>
                                        ))}
                                    </ul>
                                    <div className="mt-8 relative pt-8 border-t border-white/5 shrink-0 min-h-[70px] flex items-center">
                                        <AnimatePresence>
                                            {selectedOption ? (
                                                <motion.div key="action" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="w-full">
                                                    <button
                                                        onClick={handleContinue}
                                                        className="inline-flex w-full items-center justify-between gap-4 px-8 py-4 bg-[#05D16E] text-[#024653] rounded-xl font-bold text-xs uppercase tracking-widest shadow-xl shadow-[#05D16E]/10 hover:-translate-y-0.5 transition-all"
                                                    >
                                                        <span>Continue to Booking</span>
                                                        <ArrowRight size={16} />
                                                    </button>
                                                </motion.div>
                                            ) : (
                                                <motion.p key="hint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full text-center text-[9px] uppercase tracking-widest text-white/30 italic font-medium">Select a plan to proceed</motion.p>
                                            )}
                                        </AnimatePresence>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </motion.div>

                    {/* RIGHT: SERVICE OPTIONS */}
                    <div className="col-span-8 flex flex-col h-full relative">
                        {activeContent.options.length > 3 && (
                            <div className="absolute -top-5 right-10 z-30">
                                <button onClick={nextSlide} className="bg-[#085560] border border-white/10 p-3 rounded-full shadow-sm hover:bg-[#064a54] transition-all active:scale-95 group">
                                    <ArrowRight size={20} className="text-white group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        )}

                        <div className="grid grid-cols-3 gap-6 h-full">
                            <AnimatePresence mode="popLayout" initial={false}>
                                {[0, 1, 2].map((offset) => {
                                    const option = activeContent.options[(startIndex + offset) % activeContent.options.length];
                                    if (!option) return null;
                                    return (
                                        <motion.button
                                            layout
                                            key={`${activeTab}-${option.id}`}
                                            initial={{ opacity: 0, x: 20, scale: 0.95 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: -20, scale: 0.95 }}
                                            transition={{ duration: 0.4 }}
                                            onClick={() => setSelectedOption(option.id)}
                                            className={`relative p-10 rounded-3xl text-left transition-all duration-500 group flex flex-col h-full items-start border border-gray-100/50 overflow-hidden ${selectedOption === option.id ? 'bg-white shadow-[0_20px_50px_rgba(2,70,83,0.15)] z-20 scale-[1.02] -translate-y-2' : 'bg-white shadow-[0_4px_12px_rgba(2,70,83,0.05)] hover:shadow-[0_12px_30px_rgba(2,70,83,0.08)] hover:-translate-y-1'}`}
                                        >
                                            {option.tag && (
                                                <span className={`absolute top-8 left-8 px-3 py-1 text-[8px] font-bold uppercase tracking-widest rounded-full shadow-sm z-30 ${selectedOption === option.id ? 'bg-[#024653] text-white' : 'bg-slate-200 text-slate-500'}`}>
                                                    {option.tag}
                                                </span>
                                            )}
                                            <div className="mt-12 w-full h-full flex flex-col relative z-20">
                                                <h5 className={`font-bold text-base xl:text-lg leading-tight mb-2 ${selectedOption === option.id ? 'text-[#024653]' : 'text-slate-600'}`}>
                                                    {option.label}
                                                </h5>
                                                <div className={`h-[1.5px] w-8 rounded-full ${selectedOption === option.id ? 'bg-[#05D16E]' : 'bg-slate-200'}`} />
                                                <p className="mt-6 text-[12px] text-slate-400 font-normal leading-relaxed">{option.shortDesc}</p>
                                                <div className="mt-auto pt-6 flex flex-col items-start gap-1">
                                                    <span className="text-[11px] font-bold text-[#024653] uppercase tracking-widest">{option.price}</span>
                                                </div>
                                            </div>
                                            <div className="absolute top-10 right-10">
                                                {selectedOption === option.id && <div className="w-10 h-10 rounded-xl bg-[#05D16E] flex items-center justify-center shadow-lg"><CheckCircle2 size={20} className="text-white" /></div>}
                                            </div>
                                        </motion.button>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
