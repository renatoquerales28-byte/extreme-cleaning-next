import { getPricingConfig } from "@/app/actions/admin";
import PricingContent from "@/components/admin/PricingContent";

export const dynamic = 'force-dynamic';

export default async function PricingPage() {
    const { data } = await getPricingConfig();

    let initialConfigs = data || [];

    // Default configs if empty
    if (initialConfigs.length === 0) {
        initialConfigs = [
            { id: 1, key: 'base_price_residential', value: 150, description: 'Base price for residential cleaning' },
            { id: 2, key: 'base_price_deep_clean', value: 250, description: 'Base price for deep cleaning' },
            { id: 3, key: 'price_per_sqft', value: 0.15, description: 'Price per square foot' },
            { id: 4, key: 'price_per_bedroom', value: 20, description: 'Price per bedroom' },
        ];
    }

    return (
        <div>
            <h1 className="text-3xl font-serif text-[#1C1C1C] mb-8">Pricing Configuration</h1>
            <PricingContent initialConfigs={initialConfigs} />
        </div>
    );
}
