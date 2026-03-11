"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, X, Gift, Copy, Check, Sparkles, Trash2, AlertTriangle } from "lucide-react";
import { generateOneTimePromo } from "@/app/actions/promotions";
import { deleteLeads } from "@/app/actions/admin";
import { toast } from "sonner";
import { FEATURE_FLAGS } from "@/lib/config/features";

export default function LeadsTable({ leads }: { leads: any[] }) {
    const [selectedLead, setSelectedLead] = useState<any>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedCode, setGeneratedCode] = useState<string | null>(null);
    const [discountAmount, setDiscountAmount] = useState(10);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const router = useRouter();
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 6;
    const totalPages = Math.ceil(leads.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedLeads = leads.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    const toggleSelectAll = () => {
        const paginatedIds = paginatedLeads.map(l => l.id);
        const allPaginatedSelected = paginatedIds.length > 0 && paginatedIds.every(id => selectedIds.includes(id));
        
        if (allPaginatedSelected) {
            // If all on current page are selected, unselect them
            setSelectedIds(prev => prev.filter(id => !paginatedIds.includes(id)));
        } else {
            // Otherwise, select all on current page
            setSelectedIds(prev => [...new Set([...prev, ...paginatedIds])]);
        }
    };

    const selectAllTotal = () => {
        setSelectedIds(leads.map(l => l.id));
    };

    const toggleSelectOne = (id: number) => {
        setSelectedIds(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const handleDeleteRows = async () => {
        setIsDeleting(true);
        const res = await deleteLeads(selectedIds);
        setIsDeleting(false);
        if (res.success) {
            toast.success(`${selectedIds.length} lead(s) deleted successfully`);
            setSelectedIds([]);
            setShowDeleteConfirm(false);
            router.refresh(); // Force refresh to update the list
        } else {
            toast.error("Failed to delete leads");
        }
    };



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
            <div className="bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
                <div className="overflow-x-auto relative">
                    <table className="w-full text-left border-collapse table-fixed min-w-[1000px]">
                        <colgroup>
                            <col className="w-[50px]" /> {/* Checkbox */}
                            <col className="w-[120px]" /> {/* Date */}
                            <col className="w-[200px]" /> {/* Contact */}
                            <col className="w-[180px]" /> {/* Service */}
                            <col className="w-[350px]" /> {/* Location */}
                            <col className="w-[100px]" /> {/* Actions */}
                        </colgroup>
                        <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 transition-colors">
                            {selectedIds.length > 0 ? (
                                <tr className="h-[60px] animate-in fade-in duration-200 bg-[#024653]/5">
                                    <th colSpan={6} className="p-0">
                                        <div className="flex items-center justify-between px-6 h-full">
                                            <div className="flex items-center gap-4">
                                                <input
                                                    type="checkbox"
                                                    checked={paginatedLeads.length > 0 && paginatedLeads.every(l => selectedIds.includes(l.id))}
                                                    onChange={toggleSelectAll}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                                />
                                                <span className="text-sm font-bold text-[#024653] dark:text-[#a7d9e0] tracking-tight">
                                                    {selectedIds.length === leads.length ? "All" : selectedIds.length} leads selected
                                                </span>
                                                
                                                {paginatedLeads.every(l => selectedIds.includes(l.id)) && selectedIds.length < leads.length && (
                                                    <button
                                                        onClick={selectAllTotal}
                                                        className="bg-[#024653]/10 hover:bg-[#024653]/20 text-[#024653] dark:text-[#a7d9e0] px-3 py-1 rounded-full text-xs font-bold transition-all border border-[#024653]/10"
                                                    >
                                                        Select all {leads.length} leads
                                                    </button>
                                                )}

                                                <button
                                                    onClick={() => setSelectedIds([])}
                                                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs font-semibold underline underline-offset-4 decoration-slate-200 hover:decoration-slate-400 transition-colors"
                                                >
                                                    Clear selection
                                                </button>
                                            </div>
                                            <button
                                                onClick={() => setShowDeleteConfirm(true)}
                                                className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-1.5 rounded-lg text-sm font-black text-white transition-all shadow-md shadow-red-500/10 active:scale-95"
                                            >
                                                <Trash2 size={16} />
                                                Delete Selected
                                            </button>
                                        </div>
                                    </th>
                                </tr>
                            ) : (
                                <tr className="h-[60px]">
                                    <th className="pl-6 w-10">
                                        <input
                                            type="checkbox"
                                            checked={paginatedLeads.length > 0 && paginatedLeads.every(l => selectedIds.includes(l.id))}
                                            onChange={toggleSelectAll}
                                            className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                        />
                                    </th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Date</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Contact</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Service</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">Location</th>
                                    <th className="px-6 font-bold text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            )}
                        </thead>
                        <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                            {paginatedLeads && paginatedLeads.length > 0 ? (
                                <>
                                    {paginatedLeads.map((lead: any) => (
                                        <tr key={lead.id} className={`h-[92px] hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors ${selectedIds.includes(lead.id) ? 'bg-blue-50/50 dark:bg-blue-900/10' : ''}`}>
                                            <td className="pl-6 py-4">
                                                <input
                                                    type="checkbox"
                                                    checked={selectedIds.includes(lead.id)}
                                                    onChange={() => toggleSelectOne(lead.id)}
                                                    className="w-4 h-4 rounded border-gray-300 text-[#05D16E] focus:ring-[#05D16E]"
                                                />
                                            </td>
                                            <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                                                <div>{new Date(lead.createdAt).toLocaleDateString()}</div>
                                                <div className="text-xs text-slate-500 dark:text-slate-500">{new Date(lead.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-900 dark:text-slate-100">{lead.firstName} {lead.lastName}</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-500">{lead.email}</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-500">{lead.phone}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                                                {lead.serviceType}
                                                <div className="text-sm text-slate-500 dark:text-slate-500">{lead.frequency}</div>
                                            </td>
                                            <td className="px-6 py-4 text-slate-900 dark:text-slate-100">
                                                <div className="font-medium">{lead.details?.address || "No Address Provided"}</div>
                                                <div className="text-sm text-slate-500 dark:text-slate-500">{lead.details?.zipCode || "N/A"} {lead.details?.city || ""}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <button
                                                    onClick={() => setSelectedLead(lead)}
                                                    className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                                                    title="View Full Details"
                                                >
                                                    <Eye size={20} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    {/* Placeholder rows to keep the table at a fixed height of 6 rows */}
                                    {Array.from({ length: Math.max(0, ITEMS_PER_PAGE - paginatedLeads.length) }).map((_, idx) => (
                                        <tr key={`empty-${idx}`} className="h-[92px]">
                                            <td colSpan={6} className="px-6 py-4">&nbsp;</td>
                                        </tr>
                                    ))}
                                </>
                            ) : (
                                <>
                                    {Array.from({ length: ITEMS_PER_PAGE }).map((_, idx) => (
                                        <tr key={`empty-init-${idx}`} className="h-[92px]">
                                            <td colSpan={6} className="px-6 py-4 text-center">
                                                {idx === 2 ? (
                                                    <span className="text-slate-500 dark:text-slate-400">No leads found yet.</span>
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
                            Showing <span className="font-medium text-slate-900 dark:text-slate-100">{startIndex + 1}</span> to <span className="font-medium text-slate-900 dark:text-slate-100">{Math.min(startIndex + ITEMS_PER_PAGE, leads.length)}</span> of <span className="font-medium text-slate-900 dark:text-slate-100">{leads.length}</span> leads
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Previous
                            </button>
                            
                            <div className="flex items-center gap-1">
                                {[...Array(totalPages)].map((_, i) => (
                                    <button
                                        key={i + 1}
                                        onClick={() => setCurrentPage(i + 1)}
                                        className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition-colors ${
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
                                className="px-4 py-2 text-sm font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Details Modal */}
            {selectedLead && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-100 sticky top-0 bg-white">
                            <h2 className="text-2xl font-bold tracking-tight text-[#024653]">Lead Details</h2>
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

            {/* Delete Confirmation Modal */}
            {showDeleteConfirm && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6 border border-slate-200 dark:border-slate-800">
                        <div className="flex flex-col items-center text-center space-y-4">
                            <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center text-red-600">
                                <AlertTriangle size={32} />
                            </div>
                            <div className="space-y-2">
                                <h3 className="text-xl font-bold text-slate-900 dark:text-white">Delete {selectedIds.length} Lead(s)?</h3>
                                <p className="text-slate-500 dark:text-slate-400">
                                    This action cannot be undone. All selected lead data will be permanently removed from the database.
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col gap-3">
                            <button
                                onClick={handleDeleteRows}
                                disabled={isDeleting}
                                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                            >
                                {isDeleting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Deleting...
                                    </>
                                ) : (
                                    "Yes, delete permanently"
                                )}
                            </button>
                            <button
                                onClick={() => setShowDeleteConfirm(false)}
                                disabled={isDeleting}
                                className="w-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-bold transition-all"
                            >
                                Cancel
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
