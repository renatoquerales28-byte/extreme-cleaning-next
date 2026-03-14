"use client";

import React, { useState } from "react";
import { ArrowRight, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useZipSelection } from "@/hooks/useZipSelection";

interface ZipCodeInputProps {
    variant: "hero-desktop" | "hero-mobile" | "process" | "sticky";
    onSuccess?: (zip: string) => void;
    className?: string;
}

export default function ZipCodeInput({ variant, onSuccess, className = "" }: ZipCodeInputProps) {
    const [isFocused, setIsFocused] = useState(false);
    const { 
        zipCode, 
        isChecking, 
        error, 
        handleZipChange, 
        validateAndProceed 
    } = useZipSelection(onSuccess);

    const isHero = variant.startsWith("hero");
    const isMobile = variant.endsWith("mobile") || variant === "sticky";

    if (variant === "process") {
        return (
            <form onSubmit={validateAndProceed} className={`flex gap-3 justify-center items-center w-full ${className}`}>
                <div className="relative flex-1 sm:flex-none sm:min-w-[240px]">
                    <div className={`flex items-center bg-white rounded-full px-4 py-3 shadow-[0_4px_20px_rgba(2,70,83,0.06)] border transition-all duration-300 ${error ? 'border-red-500 shadow-[0_4px_25px_rgba(239,68,68,0.1)]' : isFocused ? 'border-[#05D16E]/40 shadow-[0_4px_25px_rgba(5,209,110,0.1)]' : 'border-gray-100'}`}>
                        <MapPin size={16} className={error ? 'text-red-500' : isFocused ? 'text-[#05D16E]' : 'text-[#024653]/30'} />
                        <input
                            type="text"
                            value={zipCode}
                            onChange={(e) => handleZipChange(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            placeholder="Enter Zipcode"
                            className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-sm ml-2 w-full"
                        />
                    </div>
                    <AnimatePresence>
                        {error && (
                            <motion.p
                                initial={{ opacity: 0, y: -5 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -5 }}
                                className="absolute left-6 top-full mt-2 text-red-500 text-[11px] font-medium whitespace-nowrap"
                            >
                                {error}
                            </motion.p>
                        )}
                    </AnimatePresence>
                </div>

                <button
                    type="submit"
                    disabled={isChecking}
                    className={`${error ? 'bg-red-500' : 'bg-[#024653]'} group text-white px-6 py-3 rounded-full font-semibold text-sm flex items-center justify-center gap-2 hover:bg-[#02333d] transition-all duration-300 hover:shadow-[0_10px_30px_rgba(2,70,83,0.2)] whitespace-nowrap min-w-[180px]`}
                >
                    {isChecking ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            Get Your Free Quote
                            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                        </>
                    )}
                </button>
            </form>
        );
    }

    if (variant === "sticky") {
        return (
            <div className={`flex items-center gap-2 w-full ${className}`}>
                <div className={`flex-1 flex items-center bg-white rounded-full px-4 h-12 shadow-[0_4px_20px_rgba(2,70,83,0.06)] border transition-all duration-300 ${error ? 'border-red-500' : isFocused ? 'border-[#05D16E]/40 shadow-[0_4px_25px_rgba(5,209,110,0.1)]' : 'border-gray-100'}`}>
                    <MapPin size={16} className={`shrink-0 transition-colors ${error ? 'text-red-500' : isFocused ? 'text-[#05D16E]' : 'text-[#024653]/30'}`} />
                    <input
                        type="text"
                        value={zipCode}
                        onChange={(e) => handleZipChange(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        placeholder="Zipcode"
                        className="bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-sm ml-2 w-full"
                    />
                </div>
                <button
                    onClick={() => validateAndProceed()}
                    disabled={isChecking}
                    className="bg-[#024653] text-white px-5 h-12 rounded-full font-semibold text-[10px] uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_10px_25px_rgba(2,70,83,0.2)] active:scale-95 whitespace-nowrap"
                >
                    {isChecking ? (
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <>
                            <span>Get Free Quote</span>
                            <ArrowRight size={14} />
                        </>
                    )}
                </button>
            </div>
        );
    }

    // Hero Variants
    return (
        <div className={`relative group ${className}`}>
            <form onSubmit={validateAndProceed} className={`flex items-center bg-white rounded-2xl p-1.5 transition-all duration-500 border ${error
                ? 'border-red-500 shadow-[0_12px_30px_rgba(239,68,68,0.1)]'
                : isFocused
                    ? 'border-gray-100 shadow-[0_12px_30px_rgba(2,70,83,0.12)] scale-[1.01]'
                    : 'border-gray-100/50 shadow-[0_4px_12px_rgba(2,70,83,0.05)]'
                }`}>
                <div className={`pl-5 transition-colors duration-300 ${error ? 'text-red-500' : isFocused ? 'text-[#024653]' : 'text-[#024653]/40'}`}>
                    <MapPin size={20} />
                </div>
                <input
                    type="text"
                    value={zipCode}
                    onChange={(e) => handleZipChange(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    placeholder="Enter Zip Code"
                    className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-[#024653] font-medium placeholder:text-[#024653]/30 text-base px-4 py-2 h-12"
                />
                <button
                    type="submit"
                    disabled={isChecking}
                    className={`${error ? 'bg-red-500 hover:bg-red-600' : 'bg-[#05D16E] hover:bg-[#04bd63]'} text-white w-12 h-12 rounded-xl flex items-center justify-center transition-all shrink-0 shadow-[0_2px_4px_rgba(5,209,110,0.1)] active:scale-95`}
                >
                    {isChecking ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <ArrowRight size={20} className="stroke-[3px]" />
                    )}
                </button>
            </form>
            <AnimatePresence>
                {error && (
                    <motion.p
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="absolute left-5 top-full mt-1 text-red-500 text-[12px] font-medium whitespace-nowrap"
                    >
                        {error}
                    </motion.p>
                )}
            </AnimatePresence>
        </div>
    );
}
