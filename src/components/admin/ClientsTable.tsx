"use client";

import { useState } from "react";

export default function ClientsTable({ clients, searchTerm = "", onSearch }: { clients: any[], searchTerm?: string, onSearch?: (v: string) => void }) {
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [internalSearch, setInternalSearch] = useState("");

    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    const term = onSearch ? searchTerm : internalSearch;

    const filteredClients = clients.filter(client =>
        client.firstName?.toLowerCase().includes(term.toLowerCase()) ||
        client.lastName?.toLowerCase().includes(term.toLowerCase()) ||
        client.email?.toLowerCase().includes(term.toLowerCase())
    );

    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(filteredClients.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedClients = filteredClients.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const toggleSelectAll = () => {
        const paginatedIds = paginatedClients.map(c => c.id.toString());
        const allPaginatedSelected = paginatedIds.length > 0 && paginatedIds.every(id => selectedIds.includes(id));
        
        if (allPaginatedSelected) {
            setSelectedIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            setSelectedIds(prev => [...new Set([...prev, ...paginatedIds])]);
        }
    };

    const toggleSelectOne = (id: string) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    return (
        <>
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                        <colgroup>
                            <col className="w-[50px]" /> {/* Checkbox */}
                            <col className="w-[180px]" /> {/* Client */}
                            <col className="w-[250px]" /> {/* Contact */}
                            <col className="w-[140px]" /> {/* Bookings */}
                            <col className="w-[140px]" /> {/* Total Spent */}
                            <col className="w-[140px]" /> {/* Last Service */}
                            <col className="w-[100px]" /> {/* Actions */}
                        </colgroup>
                        <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
                            {selectedIds.length > 0 ? (
                                <tr className="h-[60px] animate-in fade-in duration-200 bg-[#024653]/5">
                                    <th colSpan={7} className="p-0">
                                        <div className="flex items-center justify-between px-6 h-full">
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={paginatedClients.length > 0 && paginatedClients.every(c => selectedIds.includes(c.id.toString()))}
                                                    onChange={toggleSelectAll}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                                />
                                                <span className="text-sm font-bold text-[#024653] dark:text-[#a7d9e0] tracking-tight">
                                                    {selectedIds.length} clients selected
                                                </span>
                                                <button
                                                    onClick={() => setSelectedIds([])}
                                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-semibold underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400 transition-colors"
                                                >
                                                    Clear selection
                                                </button>
                                            </div>
                                            <button
                                                className="bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-black text-white transition-all shadow-md shadow-red-500/10 active:scale-95"
                                            >
                                                Delete Selected
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ) : (
                                <tr className="h-[60px]">
                                    <th className="pl-6 w-12">
                                        <input
                                            type="checkbox"
                                            checked={paginatedClients.length > 0 && paginatedClients.every(c => selectedIds.includes(c.id.toString()))}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                        />
                                    </th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Client</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Contact</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Bookings</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Total Spent</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Last Service</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {paginatedClients && paginatedClients.length > 0 ? (
                                <>
                                    {paginatedClients.map((client: any) => (
                                        <tr key={client.email} className={`h-[92px] hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${selectedIds.includes(client.id.toString()) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                            <td className="pl-6">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(client.id.toString())}
                                                    onChange={() => toggleSelectOne(client.id.toString())}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                                />
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 font-bold text-xs uppercase">
                                                        {client.firstName[0]}{client.lastName[0]}
                                                    </div>
                                                    <div className="truncate">
                                                        <div className="font-bold text-[#024653] dark:text-white truncate">{client.firstName} {client.lastName}</div>
                                                        <div className="text-[10px] text-slate-400 dark:text-slate-500">ID: {client.id}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col gap-0">
                                                    <div className="text-sm font-medium text-slate-600 dark:text-slate-300 truncate">
                                                        {client.email}
                                                    </div>
                                                    <div className="text-xs text-slate-400 dark:text-slate-500">
                                                        {client.phone}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                                                    {client.bookingsCount} visits
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-black text-[#024653] dark:text-[#a7d9e0] text-lg">
                                                    ${client.totalSpent}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-600 dark:text-slate-400">
                                                <div className="text-sm">
                                                    {new Date(client.lastBooking).toLocaleDateString()}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button
                                                    onClick={() => setSelectedClient(client)}
                                                    className="text-xs font-bold text-[#024653] dark:text-[#a7d9e0] hover:underline uppercase tracking-wider transition-colors"
                                                >
                                                    Manage
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Placeholder rows to keep the table at a fixed height of 6 rows */}
                                    {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedClients.length) }).map((_, idx) => (
                                        <tr key={`empty-${idx}`} className="h-[92px]">
                                            <td colSpan={7} className="px-6 py-4">&nbsp;</td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                                        <tr key={`empty-init-${idx}`} className="h-[92px]">
                                            <td colSpan={7} className="px-6 py-4 text-center">
                                                {idx === 2 ? (
                                                    <span className="text-slate-500 dark:text-slate-400">No clients found.</span>
                                                ) : (
                                                    <span>&nbsp;</span>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="px-6 py-4 bg-gray-50/50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                        <div className="text-sm text-slate-500 dark:text-slate-400">
                            Showing <span className="font-medium text-slate-900 dark:text-slate-100">{startIndex + 1}</span> to <span className="font-medium text-slate-900 dark:text-slate-100">{Math.min(startIndex + ITEMS_PER_PAGE, filteredClients.length)}</span> of <span className="font-medium text-slate-900 dark:text-slate-100">{filteredClients.length}</span> clients
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            
                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-bold transition-colors ${
                                            currentPage === i + 1 
                                            ? 'bg-[#024653] text-white' 
                                            : 'text-slate-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-800'
                                        }`}
                                    >
                                        {i + 1}
                                    </button>
                                ))}
                            </div>

                            <button
                                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 text-sm font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Client History Modal */}
            {selectedClient && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto border dark:border-slate-800">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-slate-800 sticky top-0 bg-white dark:bg-slate-900 z-10">
                            <div>
                                <h2 className="text-2xl font-black tracking-tight text-[#024653] dark:text-white flex items-center gap-3">
                                    {selectedClient.firstName} {selectedClient.lastName}
                                    <span className="text-xs font-bold bg-slate-100 dark:bg-slate-800 px-2 py-1 text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                                        Value: ${selectedClient.totalSpent}
                                    </span>
                                </h2>
                            </div>
                            <button
                                onClick={() => setSelectedClient(null)}
                                className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors font-bold text-sm uppercase tracking-widest"
                            >
                                Close
                            </button>
                        </div>

                        <div className="p-6">
                            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mb-6">Service History</h3>
                            <div className="space-y-4">
                                {selectedClient.leads.map((lead: any) => (
                                    <div key={lead.id} className="border border-gray-100 dark:border-slate-800 rounded-xl p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors flex flex-col md:flex-row gap-4 justify-between items-start md:items-center">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-lg flex items-center justify-center shrink-0 font-bold uppercase">
                                                {lead.serviceType[0]}
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#024653] dark:text-white">{lead.serviceType}</p>
                                                <p className="text-sm text-gray-500 dark:text-slate-400">{new Date(lead.createdAt).toLocaleDateString()} • {lead.frequency}</p>
                                            </div>
                                        </div>

                                        <div className="text-right w-full md:w-auto">
                                            <p className="font-black text-[#024653] dark:text-[#22d3ee] text-lg">${lead.totalPrice}</p>
                                            <span className={`inline-flex px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest ${lead.status === 'new' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' : 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'}`}>
                                                {lead.status}
                                            </span>
                                        </div>

                                        <div className="text-sm text-gray-600 dark:text-slate-400 md:max-w-xs truncate">
                                            <p className="truncate">{lead.details?.address}, {lead.details?.city}</p>
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
