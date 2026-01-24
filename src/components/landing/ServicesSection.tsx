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
        <section className="py-24 bg-ecs-paramount relative overflow-hidden" id="services">
            <div className="container px-4 mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div className="max-w-xl space-y-4">
                        <span className="text-ecs-brand-dark/50 font-black tracking-[0.2em] text-xs uppercase">Our Expertise</span>
                        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-ecs-brand-dark leading-[0.9]">
                            Curated Services <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-ecs-brand-dark to-ecs-brand-light">For Any Space.</span>
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
                            className="group relative flex flex-col h-full rounded-3xl overflow-hidden cursor-pointer bg-ecs-secondary transition-transform duration-300 hover:-translate-y-2 hover:shadow-lg"
                        >
                            {/* Image Area - Top Half */}
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src={service.image}
                                    alt={service.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                            </div>

                            {/* Content Area - Bottom Half */}
                            <div className="p-8 flex flex-col flex-grow relative">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-white rounded-xl shadow-sm text-ecs-brand-dark">
                                        <service.icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-black tracking-tight text-ecs-brand-dark">{service.title}</h3>
                                </div>

                                <p className="text-ecs-brand-dark/70 font-medium leading-relaxed mb-6">
                                    {service.description}
                                </p>

                                <div className="mt-auto flex items-center gap-2 text-ecs-accent font-bold uppercase tracking-wider text-sm group-hover:gap-3 transition-all">
                                    <span>Learn More</span>
                                    <ArrowRight size={16} />
                                </div>

                                <Link href={service.link} className="absolute inset-0 z-20" aria-label={`View ${service.title} services`} />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
