"use client";

import { updatePricingConfig } from "@/app/actions/admin";
import { useState } from "react";

interface PricingContentProps {
    initialConfigs: any[];
}

export default function PricingContent({ initialConfigs }: PricingContentProps) {
    const [configs, setConfigs] = useState(initialConfigs);

    const handleUpdate = async (key: string, newValue: number) => {
        // Optimistic update
        setConfigs(prev => prev.map(c => c.key === key ? { ...c, value: newValue } : c));
        await updatePricingConfig(key, newValue);
    };

    return (
        <div>
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
