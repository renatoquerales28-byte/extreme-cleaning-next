"use client";

import React from "react";
import ZipStep from "@/components/wizard/steps/ZipStep";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { wizardSchema } from "@/lib/schemas/wizard";

export default function HeroSection() {
    // This form context is specifically for the ZipStep entry
    const methods = useForm({
        resolver: zodResolver(wizardSchema),
        defaultValues: {
            zipCode: "",
        },
    });

    const handleZipSubmit = () => {
        // In the full implementation, this would navigate to the wizard page
        // or trigger the wizard modal with the pre-filled zip
        window.location.href = "/quote";
    };

    return (
        <section className="relative pt-32 pb-20 px-4 flex flex-col items-center justify-center min-h-[80vh] w-full max-w-7xl mx-auto">

            {/* Promo Banner */}
            <div className="w-full max-w-4xl mb-12 animate-in fade-in slide-in-from-top-8 duration-700">
                <div className="bg-brand-light/10 border border-brand-light/20 rounded-2xl p-6 md:p-8 backdrop-blur-md text-center relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

                    <h3 className="text-sm font-black uppercase tracking-widest text-brand-light mb-2">Limited Time Offer</h3>
                    <p className="text-2xl md:text-3xl font-black text-brand-dark tracking-tight">
                        Get <span className="text-accent underline decoration-4 decoration-accent/30">20% OFF</span> your first Deep Clean
                    </p>
                    <p className="text-slate-500 font-medium mt-2 text-sm">Valid until Feb 28th for new residential customers.</p>
                </div>
            </div>

            {/* Wizard Zip Entry */}
            <div className="w-full max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-100">
                <div className="glass-card p-12 rounded-[3rem] text-center shadow-2xl relative">
                    <FormProvider {...methods}>
                        {/* We reuse the Logic from ZipStep but we might need to adjust it if it expects props */}
                        <ZipStep onNext={handleZipSubmit} />
                    </FormProvider>
                </div>
            </div>

        </section>
    );
}
