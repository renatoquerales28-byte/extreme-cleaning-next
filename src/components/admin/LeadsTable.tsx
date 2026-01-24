"use client";

import { useState } from "react";
import { Eye, X } from "lucide-react";

export default function LeadsTable({ leads }: { leads: any[] }) {
    const [selectedLead, setSelectedLead] = useState<any>(null);

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
                                onClick={() => setSelectedLead(null)}
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
                        </div>

                        <div className="p-6 border-t border-gray-100 flex justify-end">
                            <button
                                onClick={() => setSelectedLead(null)}
                                className="px-6 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Close
                            </button>
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
