"use client";

import { getPricingConfig, updatePricingConfig } from "@/app/actions/admin";
import { useState, useEffect } from "react";

export const dynamic = 'force-dynamic';

export default function PricingPage() {
    const [configs, setConfigs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadPricing();
    }, []);

    const loadPricing = async () => {
        const { data } = await getPricingConfig();
        // Default configs if empty
        if (!data || data.length === 0) {
            setConfigs([
                { key: 'base_price_residential', value: 150, description: 'Base price for residential cleaning' },
                { key: 'base_price_deep_clean', value: 250, description: 'Base price for deep cleaning' },
                { key: 'price_per_sqft', value: 0.15, description: 'Price per square foot' },
                { key: 'price_per_bedroom', value: 20, description: 'Price per bedroom' },
            ]);
        } else {
            setConfigs(data);
        }
        setLoading(false);
    };

    const handleUpdate = async (key: string, newValue: number) => {
        // Optimistic update
        setConfigs(prev => prev.map(c => c.key === key ? { ...c, value: newValue } : c));
        await updatePricingConfig(key, newValue);
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Pricing Configuration</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {configs.map((config) => (
                    <div key={config.key} className="bg-white p-6 rounded-xl shadow-sm border border-[#D1D5DB]">
                        <h3 className="font-semibold text-lg text-[#1C1C1C] mb-2">
                            {config.key.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </h3>
                        <p className="text-sm text-[#6B7280] mb-4">{config.description}</p>

                        <div className="flex items-center gap-2">
                            <span className="text-[#1C1C1C] font-medium">$</span>
                            <input
                                type="number"
                                value={config.value}
                                onChange={(e) => handleUpdate(config.key, Number(e.target.value))}
                                className="w-full px-3 py-2 border border-[#D1D5DB] rounded-lg focus:ring-2 focus:ring-[#0891B2] outline-none"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 text-blue-800 p-4 rounded-lg text-sm">
                Changes are saved automatically.
            </div>
        </div>
    );
}
