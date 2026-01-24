"use client";

import { useState } from "react";
import { Eye, User, Mail, Phone, Calendar, DollarSign, Clock } from "lucide-react";

export default function ClientsTable({ clients }: { clients: any[] }) {
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = clients.filter(client =>
        client.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <>
            <div className="space-y-4">
                {/* Search */}
                <div className="flex justify-end">
                    <input
                        type="text"
                        placeholder="Search clients..."
                        className="px-4 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#0891B2] outline-none text-sm w-full md:w-64"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="bg-white rounded-xl shadow-sm border border-[#D1D5DB] overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b border-[#D1D5DB]">
                                <tr>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Client</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Contact</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Bookings</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Total Spent</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Last Service</th>
                                    <th className="px-6 py-4 font-medium text-[#4B5563]">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#D1D5DB]">
                                {filteredClients && filteredClients.length > 0 ? (
                                    filteredClients.map((client: any) => (
                                        <tr key={client.email} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                                                        <User size={20} />
                                                    </div>
                                                    <div>
                                                        <div className="font-medium text-[#1C1C1C]">{client.firstName} {client.lastName}</div>
                                                        <div className="text-xs text-[#6B7280]">ID: {client.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                                                        <Mail size={14} className="text-gray-400" /> {client.email}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm text-[#4B5563]">
                                                        <Phone size={14} className="text-gray-400" /> {client.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#1C1C1C]">
                                                <span className="inline-flex px-2 py-1 bg-blue-50 text-blue-700 rounded-md text-sm font-medium">
                                                    {client.bookingsCount} visits
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-[#0891B2] text-lg">
                                                    ${client.totalSpent}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-[#1C1C1C]">
                                                <div className="flex items-center gap-2 text-sm">
                                                    <Clock size={14} className="text-gray-400" />
                                                    {new Date(client.lastBooking).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedClient(client)}
                                                    className="p-2 hover:bg-gray-100 rounded-full text-gray-500 hover:text-[#1C1C1C] transition-colors"
                                                    title="View Full History"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={6} className="px-6 py-12 text-center text-[#6B7280]">
                                            No clients found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* Client History Modal */}
            {selectedClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
                            <div>
                                <h2 className="text-2xl font-serif text-[#1C1C1C] flex items-center gap-3">
                                    {selectedClient.firstName} {selectedClient.lastName}
                                    <span className="text-sm font-sans font-normal bg-gray-100 px-2 py-1 rounded text-gray-600">
                                        Lifetime Value: ${selectedClient.totalSpent}
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedClient(null)}
                                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition-colors"
                            >
                                Close
                            </button>
                        </div>

                        <div className="p-6">
                            <h3 className="font-bold text-gray-400 uppercase tracking-wider text-sm mb-4">Service History</h3>
                            <div className="space-y-4">
                                {selectedClient.leads.map((lead: any) => (
                                    <div key={lead.id} className="border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shrink-0">
                                                <Calendar size={20} />
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#1C1C1C]">{lead.serviceType}</p>
                                                <p className="text-sm text-gray-500">{new Date(lead.createdAt).toLocaleDateString()} • {lead.frequency}</p>
                                            </div>
                                        </div>

                                        <div className="text-right w-full md:w-auto">
                                            <p className="font-bold text-[#0891B2] text-lg">${lead.totalPrice}</p>
                                            <span className={`inline-flex px-2 py-0.5 rounded text-xs lowercase ${lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                {lead.status}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-600 md:max-w-xs">
                                            <p className="line-clamp-2">{lead.details?.address}, {lead.details?.city}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
