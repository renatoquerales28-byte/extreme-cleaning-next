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
                    <div key={config.key} className="bg-white dark:bg-slate-900 p-6 rounded-xl shadow-sm border border-[#D1D5DB] dark:border-slate-800 transition-colors">
                        <h3 className="font-semibold text-lg text-[#1C1C1C] dark:text-white mb-2">
                            {config.key.split('_').map((w: string) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                        </h3>
                        <p className="text-sm text-[#6B7280] dark:text-slate-400 mb-4">{config.description}</p>

                        <div className="flex items-center gap-2">
                            <span className="text-[#1C1C1C] dark:text-slate-300 font-medium">$</span>
                            <input
                                type="number"
                                value={config.value}
                                onChange={(e) => handleUpdate(config.key, Number(e.target.value))}
                                className="w-full px-3 py-2 border border-[#D1D5DB] dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-[#0891B2] outline-none bg-white dark:bg-slate-950 dark:text-white transition-colors"
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-300 p-4 rounded-lg text-sm transition-colors">
                Changes are saved automatically.
            </div>
        </div>
    );
}
