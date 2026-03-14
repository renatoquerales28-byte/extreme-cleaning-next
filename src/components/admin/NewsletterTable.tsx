"use client";

import { useState } from "react";

export default function NewsletterTable({ subscribers }: { subscribers: any[] }) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);
    
    const ITEMS_PER_PAGE = 6;
    const paginatedSubscribers = subscribers.slice(0, ITEMS_PER_PAGE);

    const toggleSelectAll = () => {
        const paginatedIds = paginatedSubscribers.map(s => s.id.toString());
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
        <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
            <div className="overflow-x-auto relative">
                <table className="w-full text-left border-collapse table-fixed min-w-[800px]">
                    <colgroup>
                        <col className="w-[50px]" /> {/* Checkbox */}
                        <col className="w-[150px]" /> {/* Date */}
                        <col className="w-[250px]" /> {/* Email */}
                        <col className="w-[150px]" /> {/* City */}
                        <col className="w-[150px]" /> {/* Source */}
                    </colgroup>
                    <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
                        {selectedIds.length > 0 ? (
                            <tr className="h-[60px] animate-in fade-in duration-200 bg-[#024653]/5">
                                <th colSpan={5} className="p-0">
                                    <div className="flex items-center justify-between px-6 h-full">
                                        <div className="flex items-center gap-4">
                                            <input
                                                type="checkbox"
                                                checked={paginatedSubscribers.length > 0 && paginatedSubscribers.every(s => selectedIds.includes(s.id.toString()))}
                                                onChange={toggleSelectAll}
                                                className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                            />
                                            <span className="text-sm font-bold text-[#024653] dark:text-[#a7d9e0] tracking-tight">
                                                {selectedIds.length} subscribers selected
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
                                        checked={paginatedSubscribers.length > 0 && paginatedSubscribers.every(s => selectedIds.includes(s.id.toString()))}
                                        onChange={toggleSelectAll}
                                        className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                    />
                                </th>
                                <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                                <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Email Address</th>
                                <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">City</th>
                                <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Source</th>
                            </tr>
                        )}
                    </thead>
                    <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                        {paginatedSubscribers && paginatedSubscribers.length > 0 ? (
                            <>
                                {paginatedSubscribers.map((sub: any) => (
                                    <tr key={sub.id} className={`h-[92px] hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${selectedIds.includes(sub.id.toString()) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                        <td className="pl-6">
                                            <input
                                                type="checkbox"
                                                checked={selectedIds.includes(sub.id.toString())}
                                                onChange={() => toggleSelectOne(sub.id.toString())}
                                                className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                            />
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                                            <div>{new Date(sub.createdAt).toLocaleDateString()}</div>
                                            <div className="text-xs text-slate-500 dark:text-slate-500">{new Date(sub.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-[#024653] dark:text-slate-200 truncate">{sub.email}</div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                                            {sub.city}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="inline-flex px-3 py-1 rounded-full text-[10px] font-black uppercase bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300 tracking-widest">
                                                {sub.source}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                                {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedSubscribers.length) }).map((_, idx) => (
                                    <tr key={`empty-${idx}`} className="h-[92px]">
                                        <td colSpan={5} className="px-6 py-4">&nbsp;</td>
                                    </tr>
                                ))}
                            </>
                        ) : (
                            <>
                                {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                                    <tr key={`empty-init-${idx}`} className="h-[92px]">
                                        <td colSpan={5} className="px-6 py-4 text-center">
                                            {idx === 2 ? (
                                                <span className="text-slate-500 dark:text-slate-400">No subscribers found yet.</span>
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
        </div>
    );
}
