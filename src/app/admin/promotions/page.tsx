"use client";

import { getPromotions, createPromotion, togglePromotion, deletePromotion } from "@/app/actions/admin";
import { useState, useEffect } from "react";
import { Trash2, Plus, Tag } from "lucide-react";

export const dynamic = 'force-dynamic';

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newCode, setNewCode] = useState("");
    const [newValue, setNewValue] = useState(10);
    const [newType, setNewType] = useState("percent");

    useEffect(() => {
        loadPromotions();
    }, []);

    const loadPromotions = async () => {
        const { data } = await getPromotions();
        if (data) setPromotions(data);
        setLoading(false);
    };

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCode) return;

        const result = await createPromotion({
            code: newCode.toUpperCase(),
            discountType: newType,
            discountValue: Number(newValue),
            active: true
        });

        if (result.success) {
            setNewCode("");
            loadPromotions();
        }
    };

    const handleToggle = async (id: number, current: boolean) => {
        // Optimistic
        setPromotions(prev => prev.map(p => p.id === id ? { ...p, active: !current } : p));
        await togglePromotion(id, !current);
    };

    const handleDelete = async (id: number) => {
        if (!confirm("Are you sure?")) return;
        setPromotions(prev => prev.filter(p => p.id !== id));
        await deletePromotion(id);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Promotions</h1>

            {/* Create New */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB] mb-8">
                <h3 className="font-semibold text-lg text-[#1C1C1C] mb-4 flex items-center gap-2">
                    <Plus size={20} /> Create New Code
                </h3>
                <form onSubmit={handleCreate} className="flex flex-col md:flex-row gap-4 items-end">
                    <div className="flex-1 w-full">
                        <label className="block text-sm font-medium text-[#4B5563] mb-1">Code</label>
                        <input
                            type="text"
                            value={newCode}
                            onChange={(e) => setNewCode(e.target.value)}
                            placeholder="SUMMER2026"
                            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg uppercase"
                            required
                        />
                    </div>
                    <div className="w-full md:w-32">
                        <label className="block text-sm font-medium text-[#4B5563] mb-1">Type</label>
                        <select
                            value={newType}
                            onChange={(e) => setNewType(e.target.value)}
                            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg"
                        >
                            <option value="percent">% Off</option>
                            <option value="fixed">$ Off</option>
                        </select>
                    </div>
                    <div className="w-full md:w-32">
                        <label className="block text-sm font-medium text-[#4B5563] mb-1">Value</label>
                        <input
                            type="number"
                            value={newValue}
                            onChange={(e) => setNewValue(Number(e.target.value))}
                            className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg"
                            required
                            min="1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-[#1C1C1C] text-white px-6 py-2 rounded-lg font-medium hover:bg-[#333333] transition-colors w-full md:w-auto"
                    >
                        Create
                    </button>
                </form>
            </div>

            {/* List */}
            <div className="grid gap-4">
                {promotions.map((promo) => (
                    <div key={promo.id} className={`bg-white p-4 rounded-xl border flex items-center justify-between ${promo.active ? 'border-[#D1D5DB]' : 'border-gray-100 opacity-60'}`}>
                        <div className="flex items-center gap-4">
                            <div className={`p-3 rounded-full ${promo.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-400'}`}>
                                <Tag size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-lg text-[#1C1C1C]">{promo.code}</h4>
                                <p className="text-sm text-[#6B7280]">
                                    {promo.discountType === 'percent' ? `${promo.discountValue}% Off` : `$${promo.discountValue} Off`}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <label className="flex items-center gap-2 cursor-pointer text-sm">
                                <input
                                    type="checkbox"
                                    checked={promo.active}
                                    onChange={() => handleToggle(promo.id, promo.active)}
                                    className="rounded text-[#1C1C1C] focus:ring-[#1C1C1C]"
                                />
                                <span className="text-[#4B5563]">Active</span>
                            </label>
                            <button
                                onClick={() => handleDelete(promo.id)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                            >
                                <Trash2 size={20} />
                            </button>
                        </div>
                    </div>
                ))}

                {promotions.length === 0 && (
                    <div className="text-center py-12 text-[#6B7280]">No active promotions</div>
                )}
            </div>
        </div>
    );
}
