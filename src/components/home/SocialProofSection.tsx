"use client";

import Image from "next/image";
import { Star, MapPin } from "lucide-react";
import { GOOGLE_REVIEWS } from "@/lib/data/reviews_mock";
import Link from "next/link";

export default function SocialProofSection() {
    return (
        <section className="w-full bg-[#f9f9f9] border-y border-slate-100">
            <div className="w-full h-full flex flex-col md:flex-row">

                {/* LEFT COLUMN: REVIEWS */}
                <div className="w-full md:w-1/2 p-12 md:p-20 border-b md:border-b-0 md:border-r border-slate-200">
                    <div className="max-w-xl mx-auto h-full flex flex-col justify-center">

                        <div className="mb-10 flex items-center gap-4">
                            <div className="w-12 h-12 relative">
                                <Image src="/brand/logo.png" alt="Google" width={48} height={48} className="object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-[#024653]">Excellent</h3>
                                <div className="flex text-[#F4B400] gap-0.5">
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                    <Star size={18} fill="currentColor" />
                                </div>
                                <p className="text-sm text-slate-500 font-medium mt-1">Based on 150+ reviews on Google</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            {GOOGLE_REVIEWS.map((review) => (
                                <div key={review.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-[#024653] font-bold">
                                                {review.name.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-[#024653] text-sm">{review.name}</h4>
                                                <div className="flex text-[#F4B400] text-xs">
                                                    {[...Array(review.rating)].map((_, i) => (
                                                        <Star key={i} size={12} fill="currentColor" />
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{review.date}</span>
                                    </div>
                                    <p className="text-slate-600 text-sm leading-relaxed">&quot;{review.text}&quot;</p>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 text-center md:text-left">
                            <a href="#" className="text-[#05D16E] text-xs font-black uppercase tracking-widest hover:underline decoration-2 underline-offset-4">
                                Read all reviews on Maps →
                            </a>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: PROMO */}
                <div className="w-full md:w-1/2 p-12 md:p-20 bg-white relative overflow-hidden flex flex-col justify-center items-center text-center">

                    {/* Background Pattern */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#05D16E]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#024653]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

                    <div className="relative z-10 max-w-md mx-auto space-y-8">

                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#05D16E]/10 rounded-full border border-[#05D16E]/20">
                            <span className="animate-pulse w-2 h-2 rounded-full bg-[#05D16E]" />
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#024653]">Limited Time Offer</span>
                        </div>

                        <div>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-[#024653] leading-none mb-4">
                                15% <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#05D16E] to-[#024653]">OFF</span>
                            </h2>
                            <p className="text-xl font-medium text-slate-500">
                                On your first <span className="text-[#024653] font-bold">Deep Cleaning</span> service.
                            </p>
                        </div>

                        <div className="p-6 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-2">Use Code at Checkout</p>
                            <div className="text-2xl font-mono font-bold text-[#024653] tracking-widest select-all cursor-pointer hover:text-[#05D16E] transition-colors">
                                WELCOME15
                            </div>
                        </div>

                        <Link
                            href="/wizard?type=residential&intensity=deep&promo=WELCOME15"
                            className="inline-flex w-full md:w-auto items-center justify-center gap-3 px-8 py-4 bg-[#024653] text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-[#02333d] transition-all transform hover:-translate-y-1 shadow-xl hover:shadow-2xl shadow-[#024653]/20"
                        >
                            Claim Offer Now
                        </Link>

                        <p className="text-[10px] text-slate-400 max-w-xs mx-auto">
                            *Valid only for new residential customers booking a Deep Clean service. Cannot be combined with other offers.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
