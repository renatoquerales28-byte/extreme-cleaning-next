"use client";

import { useFormContext } from "react-hook-form";
import { type WizardData } from "@/lib/schemas/wizard";
import { useWizardAction } from "../WizardActionContext";
import { useEffect, useCallback } from "react";
import { User, Mail, Phone, MapPin, ArrowRight, Lock, ShieldCheck, Building2 } from "lucide-react";

interface ContactStepProps {
    onNext: () => void;
}

export default function ContactStep({ onNext }: ContactStepProps) {
    const { register, watch, formState: { errors } } = useFormContext<WizardData>();
    const { setAction } = useWizardAction();
    const data = watch();

    const isValid = !!(
        data.firstName &&
        data.lastName &&
        data.email &&
        data.phone &&
        data.address &&
        data.city &&
        !errors.firstName &&
        !errors.lastName &&
        !errors.email &&
        !errors.phone
    );

    useEffect(() => {
        setAction({
            label: "REQUEST EXPERT REVIEW",
            disabled: !isValid,
            onClick: onNext,
            icon: <ArrowRight size={18} strokeWidth={4} />
        });
    }, [isValid, onNext, setAction]);

    return (
        <div className="w-full h-full flex flex-col justify-center py-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto w-full px-6 items-stretch">

                {/* 1. LEFT COLUMN: PERSONAL INFO */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3 ml-1 mb-1">
                        <div className="w-5 h-5 rounded-md bg-[#024653] flex items-center justify-center shadow-lg shadow-[#024653]/10">
                            {(data.serviceType === 'commercial' || data.serviceType === 'property_mgmt') ? <Building2 size={12} className="text-white" /> : <User size={12} className="text-white" />}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">
                            {(data.serviceType === 'commercial' || data.serviceType === 'property_mgmt') ? '1. Business & Contact' : '1. Personal Information'}
                        </span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 space-y-6 flex flex-col justify-center">
                        {(data.serviceType === "commercial" || data.serviceType === "property_mgmt") && (
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Company Name</label>
                                <div className="relative">
                                    <Building2 size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#024653]/20" />
                                    <input
                                        {...register("companyName")}
                                        placeholder="Business Name Ltd."
                                        className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 pl-10 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                    />
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">First Name</label>
                                <input
                                    {...register("firstName")}
                                    placeholder="Jane"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Last Name</label>
                                <input
                                    {...register("lastName")}
                                    placeholder="Doe"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Email Address</label>
                            <div className="relative">
                                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#024653]/20" />
                                <input
                                    {...register("email")}
                                    type="email"
                                    placeholder="jane.doe@example.com"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 pl-10 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#024653]/20" />
                                <input
                                    {...register("phone")}
                                    placeholder="509-000-0000"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 pl-10 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. RIGHT COLUMN: PROPERTY ADDRESS */}
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center gap-3 ml-1 mb-1">
                        <div className="w-5 h-5 rounded-md bg-[#05D16E] flex items-center justify-center shadow-lg shadow-[#05D16E]/10">
                            <MapPin size={12} className="text-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.25em] text-[#024653]">
                            {data.serviceType === 'property_mgmt' ? '2. Account Billing Address' : '2. Service address'}
                        </span>
                    </div>

                    <div className="flex-1 bg-[#F9F8F2] border border-[#024653]/10 rounded-xl p-6 lg:p-8 space-y-6 flex flex-col justify-center">
                        {data.serviceType === 'property_mgmt' && (
                            <p className="text-[9px] font-bold text-[#05D16E] bg-[#05D16E]/5 p-3 rounded-lg uppercase tracking-widest border border-[#05D16E]/10">
                                Portfolio Review Complete. Provide your master billing address below.
                            </p>
                        )}
                        <div className="space-y-2">
                            <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Street Address</label>
                            <input
                                {...register("address")}
                                placeholder="123 Corporate Way"
                                className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">City</label>
                                <input
                                    {...register("city")}
                                    placeholder="Spokane"
                                    className="w-full bg-white border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] outline-none focus:border-[#05D16E] transition-all"
                                />
                            </div>
                            <div className="space-y-2 opacity-50">
                                <label className="text-[9px] font-black uppercase tracking-widest text-[#024653]/40 ml-1">Zip Code</label>
                                <input
                                    {...register("zipCode")}
                                    disabled
                                    className="w-full bg-white/50 border border-[#024653]/10 rounded-lg p-3 text-sm font-bold text-[#024653] cursor-not-allowed outline-none"
                                />
                            </div>
                        </div>

                        <div className="bg-white/50 rounded-xl p-4 border border-[#024653]/5 flex items-start gap-4">
                            <ShieldCheck size={20} className="text-[#05D16E] shrink-0 mt-0.5" />
                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-[#024653]">Professional Estimate Process</p>
                                <p className="text-[9px] text-[#024653]/40 leading-relaxed uppercase tracking-wider font-medium">
                                    Our team will review your property details and contact you within 24 hours to provide a customized quote.
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 pt-4 border-t border-[#024653]/5 opacity-30 mt-auto">
                            <Lock size={12} />
                            <p className="text-[8px] font-black uppercase tracking-[0.2em]">Spokane Secure Data Node</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
