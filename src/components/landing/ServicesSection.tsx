"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Home, Building2, Key } from "lucide-react";
import { motion } from "framer-motion";

export default function ServicesSection() {
    const services = [
        {
            id: "residential",
            title: "Residential",
            icon: Home,
            description: "From routine maintenance to deep seasonality cleaning. Move-in/move-out services available.",
            image: "/brand/service-residential.png",
            link: "/quote?type=residential"
        },
        {
            id: "commercial",
            title: "Commercial",
            icon: Building2,
            description: "Offices, retail spaces, medical facilities, and banks. We work around your schedule.",
            image: "/brand/service-commercial.png",
            link: "/quote?type=commercial"
        },
        {
            id: "move",
            title: "Move In/Out",
            icon: Key,
            description: "Ensure every corner is spotless for the next chapter. Deep cleaning for smooth transitions.",
            image: "/brand/service-airbnb.png",
            link: "/quote?type=residential&intensity=move"
        }
    ];

    return (
        <section className="py-24 bg-[#F9F8F2] relative overflow-hidden" id="services">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl space-y-4">
                        <span className="text-brand-dark/50 font-black tracking-[0.2em] text-xs uppercase">Our Expertise</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-brand-dark leading-[0.9]">
                            Curated Services <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-dark to-brand-light">For Any Space.</span>
                        </h2>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            viewport={{ once: true }}
                            className="group relative h-[500px] rounded-[2.5rem] overflow-hidden cursor-pointer"
                        >
                            {/* Background Image */}
                            <Image
                                src={service.image}
                                alt={service.title}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                            {/* Content */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end text-white">
                                <div className="mb-auto opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-y-4 group-hover:translate-y-0">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                                        <ArrowRight className="text-white" size={20} />
                                    </div>
                                </div>

                                <div className="space-y-4 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-white/10 backdrop-blur-md rounded-xl">
                                            <service.icon size={24} className="text-accent" />
                                        </div>
                                        <h3 className="text-3xl font-black tracking-tighter">{service.title}</h3>
                                    </div>
                                    <p className="text-white/80 font-medium leading-relaxed max-w-xs">{service.description}</p>
                                </div>
                            </div>

                            <Link href={service.link} className="absolute inset-0 z-20" aria-label={`View ${service.title} services`} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
