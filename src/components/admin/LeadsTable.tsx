"use client";

import { useState } from "react";
import { Eye, X, Gift, Copy, Check, Sparkles } from "lucide-react";
import { generateOneTimePromo } from "@/app/actions/promotions";
import { toast } from "sonner";
import { FEATURE_FLAGS } from "@/lib/config/features";

export default function LeadsTable({ leads }: { leads: any[] }) {
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [discountAmount, setDiscountAmount] = useState(10);



    const handleGenerateCoupon = async () => {
        setIsGenerating(true);
        const res = await generateOneTimePromo(discountAmount, "fixed", "VIP");
        setIsGenerating(false);
        if (res.success && res.code) {
            setGeneratedCode(res.code);
            toast.success("Coupon generated!");
        } else {
            toast.error("Failed to generate coupon");
        }
    };

    const handleCloseModal = () => {
        setSelectedLead(null);
        setGeneratedCode(null);
        setDiscountAmount(10);
    };

    return (
        <>
            <div className="bg-white rounded-xl shadow-sm border border-[#D1D5DB] overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="bg-gray-50 border-b border-[#D1D5DB]">
                            <tr>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Date</th>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Contact</th>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Service</th>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Location</th>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Price</th>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Status</th>
                                <th className="px-6 py-4 font-medium text-[#4B5563]">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#D1D5DB]">
                            {leads && leads.length > 0 ? (
                                leads.map((lead: any) => (
                                    <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 text-[#1C1C1C]">
                                            <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                                            <div className="text-xs text-[#6B7280]">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-[#1C1C1C]">{lead.firstName} {lead.lastName}</div>
                                            <div className="text-sm text-[#6B7280]">{lead.email}</div>
                                            <div className="text-sm text-[#6B7280]">{lead.phone}</div>
                                        </td>
                                        <td className="px-6 py-4 text-[#1C1C1C]">
                                            {lead.serviceType}
                                            <div className="text-sm text-[#6B7280]">{lead.frequency}</div>
                                        </td>
                                        <td className="px-6 py-4 text-[#1C1C1C]">
                                            <div className="font-medium">{lead.details?.address || "No Address Provided"}</div>
                                            <div className="text-sm text-[#6B7280]">{lead.details?.zipCode || "N/A"} {lead.details?.city || ""}</div>
                                        </td>
                                        <td className="px-6 py-4 font-semibold text-[#0891B2]">
                                            ${lead.totalPrice}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' :
                                                lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-green-100 text-green-700'
                                                }`}>
                                                {lead.status.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <button
                                                onClick={() => setSelectedLead(lead)}
                                                className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#1C1C1C] transition-colors"
                                                title="View Full Details"
                                            >
                                                <Eye size={20} />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={7} className="px-6 py-12 text-center text-[#6B7280]">
                                        No leads found yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Details Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="text-2xl font-serif text-[#1C1C1C]">Lead Details</h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={24} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6">
                            {/* Contact Info */}
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Contact Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DetailItem label="Name" value={`${selectedLead.firstName} ${selectedLead.lastName}`} />
                                    <DetailItem label="Email" value={selectedLead.email} />
                                    <DetailItem label="Phone" value={selectedLead.phone} />
                                    <DetailItem label="Date" value={new Date(selectedLead.createdAt).toLocaleString()} />
                                </div>
                            </section>

                            {/* Service Details */}
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Service Requirements</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <DetailItem label="Service Type" value={selectedLead.serviceType} />
                                    <DetailItem label="Frequency" value={selectedLead.frequency} highlight />
                                    <DetailItem label="Estimated Price" value={`$${selectedLead.totalPrice}`} highlight />
                                </div>
                            </section>

                            {/* Address Details */}
                            <section className="bg-brand-light/5 border border-brand-light/10 p-4 rounded-xl">
                                <h3 className="text-sm font-bold uppercase tracking-wider text-brand-dark mb-4 flex items-center gap-2">
                                    <span className="w-2 h-2 bg-brand-light rounded-full"></span>
                                    Service Address
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                    <DetailItem label="Street Address" value={selectedLead.details?.address} />
                                    <DetailItem label="Unit / Apt" value={selectedLead.details?.unit || "N/A"} />
                                    <DetailItem label="City" value={selectedLead.details?.city} />
                                    <DetailItem label="Zip Code" value={selectedLead.details?.zipCode} />
                                </div>
                            </section>

                            {/* Property Details (from JSON) */}
                            <section>
                                <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-3">Property Details</h3>
                                <div className="bg-gray-50 rounded-xl p-4 font-mono text-sm overflow-x-auto">
                                    <pre>{JSON.stringify(selectedLead.details, null, 2)}</pre>
                                </div>
                            </section>

                            {/* Coupon Generation Section */}
                            {FEATURE_FLAGS.ENABLE_PROMOTIONS && (isGenerating || generatedCode) ? (
                                <section className="bg-gradient-to-br from-[#024653] to-[#012f38] text-white p-6 rounded-2xl relative overflow-hidden">
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="p-2 bg-white/10 rounded-lg backdrop-blur-sm">
                                                <Gift size={20} className="text-[#05D16E]" />
                                            </div>
                                            <h3 className="font-bold text-lg">Send a Special Offer</h3>
                                        </div>

                                        {generatedCode ? (
                                            <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4">
                                                <p className="text-white/80 text-sm">Review this code and share it with the customer manually.</p>
                                                <div className="bg-white/10 border border-white/20 rounded-xl p-4 flex items-center justify-between gap-4">
                                                    <code className="text-2xl font-mono font-black text-[#05D16E] tracking-widest">{generatedCode}</code>
                                                    <button
                                                        onClick={() => {
                                                            navigator.clipboard.writeText(generatedCode);
                                                            toast.success("Copied to clipboard!");
                                                        }}
                                                        className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white/50 hover:text-white"
                                                    >
                                                        <Copy size={20} />
                                                    </button>
                                                </div>
                                                <div className="flex items-center gap-2 text-xs text-[#05D16E] bg-[#05D16E]/10 w-fit px-3 py-1 rounded-full">
                                                    <Check size={12} />
                                                    <span>Single use • Expires in 48h</span>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-4">
                                                <p className="text-white/80 text-sm">Create a one-time use coupon ($) for this customer.</p>
                                                <div className="flex gap-2">
                                                    {[10, 15, 20, 25, 50].map((amount) => (
                                                        <button
                                                            key={amount}
                                                            onClick={() => setDiscountAmount(amount)}
                                                            className={`px-4 py-2 rounded-lg font-bold text-sm transition-all ${discountAmount === amount
                                                                ? "bg-[#05D16E] text-[#024653] shadow-lg scale-105"
                                                                : "bg-white/10 text-white hover:bg-white/20"
                                                                }`}
                                                        >
                                                            ${amount}
                                                        </button>
                                                    ))}
                                                </div>
                                                <button
                                                    onClick={handleGenerateCoupon}
                                                    disabled={isGenerating}
                                                    className="w-full bg-white text-[#024653] py-3 rounded-xl font-black uppercase tracking-wider hover:bg-gray-500 transition-colors mt-4 disabled:opacity-50"
                                                >
                                                    {isGenerating ? "Generating..." : "Generate Code"}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                    <Sparkles className="absolute -bottom-4 -right-4 text-white/5 w-32 h-32 rotate-12" />
                                </section>
                            ) : null}

                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-between items-center">
                            {FEATURE_FLAGS.ENABLE_PROMOTIONS && !generatedCode && !isGenerating && (
                                <button
                                    onClick={() => setIsGenerating(true)}
                                    className="flex items-center gap-2 px-4 py-2 text-[#024653] font-bold hover:bg-[#024653]/5 rounded-lg transition-colors"
                                >
                                    <Gift size={18} />
                                    Gift Discount
                                </button>
                            )}
                            <div className="flex gap-3 ml-auto">
                                <button
                                    onClick={handleCloseModal}
                                    className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

function DetailItem({ label, value, highlight = false }: { label: string, value: string | number, highlight?: boolean }) {
    if (!value) return null;
    return (
        <div>
            <p className="text-xs text-gray-500 mb-1">{label}</p>
            <p className={`font-medium ${highlight ? 'text-[#0891B2] text-lg' : 'text-[#1C1C1C]'}`}>
                {value}
            </p>
        </div>
    );
}
