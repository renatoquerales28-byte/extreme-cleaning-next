"use client";

import React, { useEffect, useState } from "react";
import { getSupportRequests, resolveSupportRequest } from "@/app/actions/admin";
import { formatDistanceToNow } from "date-fns";
import { CheckCircle2, Clock, MessageSquare, Phone } from "lucide-react";
import { toast } from "sonner";

export default function SupportPage() {
    const [requests, setRequests] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchRequests = async () => {
        setLoading(true);
        const res = await getSupportRequests();
        if (res.data) {
            setRequests(res.data);
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleResolve = async (id: number) => {
        toast.promise(resolveSupportRequest(id), {
            loading: 'Resolving ticket...',
            success: () => {
                fetchRequests();
                return 'Marked as resolved!';
            },
            error: 'Failed to resolve'
        });
    };

    return (
        <div className="p-8 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-[#024653] dark:text-white transition-colors">Support & Help Requests</h1>
                    <p className="text-slate-500 dark:text-slate-400 font-medium">Urgent callbacks and help messages.</p>
                </div>
                <button
                    onClick={fetchRequests}
                    className="px-4 py-2 bg-slate-100 dark:bg-slate-800 text-[#024653] dark:text-white font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                >
                    Refresh
                </button>
            </div>

            {loading ? (
                <div className="text-center py-20 text-slate-400">Loading requests...</div>
            ) : requests.length === 0 ? (
                <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border-2 border-dashed border-slate-200 dark:border-slate-800 transition-colors">
                    <div className="w-16 h-16 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300 dark:text-slate-500">
                        <MessageSquare size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-slate-400 dark:text-slate-300">All caught up!</h3>
                    <p className="text-slate-400 dark:text-slate-500">No pending help requests.</p>
                </div>
            ) : (
                <div className="grid gap-4">
                    {requests.map((req) => (
                        <div
                            key={req.id}
                            className={`
                                relative bg-white dark:bg-slate-900 p-6 rounded-2xl border-l-[6px] shadow-sm flex items-center justify-between group transition-all
                                ${req.status === 'contacted' ? 'border-slate-300 dark:border-slate-700 opacity-60' : 'border-[#FF4D4D]'}
                            `}
                        >
                            <div className="flex items-center gap-6">
                                <div className={`
                                    w-12 h-12 rounded-full flex items-center justify-center shrink-0
                                    ${req.status === 'contacted' ? 'bg-slate-100 dark:bg-slate-800 text-slate-400' : 'bg-[#FF4D4D]/10 text-[#FF4D4D]'}
                                `}>
                                    <Phone size={20} strokeWidth={2.5} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-lg font-bold text-[#024653] dark:text-white">{req.firstName}</h3>
                                        <span className="text-xs font-mono bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500 dark:text-slate-400">{req.phone}</span>
                                        {req.status === 'contacted' && (
                                            <span className="text-[10px] font-bold uppercase bg-slate-100 dark:bg-slate-800 text-slate-400 px-2 py-0.5 rounded-full">Resolved</span>
                                        )}
                                    </div>
                                    <p className="text-sm font-medium text-slate-500 dark:text-slate-400 flex items-center gap-2">
                                        <Clock size={14} />
                                        Requested {formatDistanceToNow(new Date(req.createdAt), { addSuffix: true })}
                                    </p>
                                    {(req.details as any)?.urgentNote && (
                                        <p className="mt-2 text-xs font-bold text-[#FF4D4D] bg-[#FF4D4D]/5 inline-block px-2 py-1 rounded">
                                            {(req.details as any).urgentNote}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {req.status !== 'contacted' && (
                                <button
                                    onClick={() => handleResolve(req.id)}
                                    className="px-6 py-3 bg-[#05D16E] text-white font-bold rounded-xl shadow-lg shadow-[#05D16E]/20 hover:bg-[#04b860] hover:-translate-y-0.5 transition-all flex items-center gap-2"
                                >
                                    <CheckCircle2 size={18} />
                                    Mark Resolved
                                </button>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
