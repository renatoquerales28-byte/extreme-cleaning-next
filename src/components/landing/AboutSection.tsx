"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function AboutSection() {
    return (
        <section className="w-full bg-[#024653] relative py-16 lg:py-24 -translate-y-[80px] overflow-hidden">

            {/* Spokane Map Dotted Pattern - Background */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.08]">
                <svg
                    viewBox="0 0 400 300"
                    className="w-full max-w-4xl h-auto"
                    fill="none"
                >
                    {/* Simplified Spokane area representation with dots */}
                    {/* Spokane River path represented with dots */}
                    {Array.from({ length: 60 }, (_, i) => (
                        <circle
                            key={`river-${i}`}
                            cx={50 + i * 5 + Math.sin(i * 0.3) * 20}
                            cy={150 + Math.sin(i * 0.2) * 30}
                            r={2}
                            fill="white"
                        />
                    ))}
                    {/* City grid dots */}
                    {Array.from({ length: 15 }, (_, row) =>
                        Array.from({ length: 20 }, (_, col) => {
                            const x = 80 + col * 12;
                            const y = 80 + row * 10;
                            const distFromCenter = Math.sqrt(Math.pow(x - 200, 2) + Math.pow(y - 150, 2));
                            if (distFromCenter < 100) {
                                return (
                                    <circle
                                        key={`grid-${row}-${col}`}
                                        cx={x}
                                        cy={y}
                                        r={1.5}
                                        fill="white"
                                        opacity={1 - distFromCenter / 150}
                                    />
                                );
                            }
                            return null;
                        })
                    )}
                    {/* Downtown marker */}
                    <circle cx={200} cy={150} r={6} fill="white" opacity={0.5} />
                    <circle cx={200} cy={150} r={3} fill="white" />
                </svg>
            </div>

            <div className="max-w-[1700px] mx-auto px-6 lg:px-10 relative z-10">

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

                    {/* LEFT: Headline & Description */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-6"
                    >
                        <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light leading-[1.1] tracking-tight text-white">
                            A Story of
                            <br />
                            <span className="font-black">Resilience</span>
                            <span className="inline-block w-3 h-3 md:w-4 md:h-4 rounded-full bg-[#05D16E] mx-3 align-middle" />
                            <span className="font-black">Growth.</span>
                        </h2>

                        <p className="text-white/60 font-light text-base lg:text-lg leading-relaxed max-w-lg">
                            From humble beginnings in Spokane to becoming the region&apos;s most trusted
                            cleaning partner, ECS was built on hard work, integrity, and an unwavering
                            commitment to transforming every space we touch.
                        </p>

                        <Link
                            href="/about"
                            className="inline-flex items-center gap-2 px-6 py-3 border border-white/20 text-white rounded-full text-sm font-medium hover:bg-white/10 transition-all"
                        >
                            About us
                        </Link>
                    </motion.div>

                    {/* RIGHT: Photo Collage */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="grid grid-cols-2 gap-3 lg:gap-4"
                    >
                        {/* Top Left - Tall */}
                        <div className="row-span-2 rounded-2xl lg:rounded-3xl overflow-hidden bg-white/10 aspect-[3/4] relative">
                            <Image
                                src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=800&fit=crop"
                                alt="Professional cleaner"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Top Right */}
                        <div className="rounded-2xl lg:rounded-3xl overflow-hidden bg-white/10 aspect-square relative">
                            <Image
                                src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400&h=400&fit=crop"
                                alt="Cleaning service"
                                fill
                                className="object-cover"
                            />
                        </div>

                        {/* Bottom Right */}
                        <div className="rounded-2xl lg:rounded-3xl overflow-hidden bg-white/10 aspect-square relative">
                            <Image
                                src="https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=400&h=400&fit=crop"
                                alt="Clean home"
                                fill
                                className="object-cover"
                            />
                        </div>
                    </motion.div>

                </div>

            </div>
        </section>
    );
}
