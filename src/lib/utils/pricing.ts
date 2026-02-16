import { type WizardData } from "@/lib/schemas/wizard";

export const FREQUENCIES = [
    { id: "weekly", label: "Weekly", discount: 0.20, labelDiscount: "-20%" },
    { id: "biweekly", label: "Biweekly", discount: 0.15, labelDiscount: "-15%" },
    { id: "monthly", label: "Monthly", discount: 0.10, labelDiscount: "-10%" },
    { id: "onetime", label: "One-time", discount: 0, labelDiscount: "Regular" },
];

// Default dictionary
export const DEFAULT_PRICING = {
    base_price_residential: 100,
    price_per_bedroom: 20,
    price_per_bathroom: 30,
    price_per_sq_ft: 0.015, // /1000 * 15 = 0.015
    multiplier_deep: 1.5,
    multiplier_first_cleaning: 1.5,
    multiplier_move: 1.8,
    multiplier_post_construction: 2.0,
    commercial_min: 150,
    commercial_sq_ft_rate: 0.12,
    property_mgmt_flat: 120,
    // Extras
    extra_oven: 35,
    extra_fridge: 30,
    extra_windows: 50,
    extra_cabinets: 40,
    extra_pets: 25,
};

export const EXTRAS_LIST = [
    { id: "oven", label: "Oven Interior", icon: "🍳", priceKey: "extra_oven" },
    { id: "fridge", label: "Fridge Interior", icon: "🧊", priceKey: "extra_fridge" },
    { id: "windows", label: "Interior Windows", icon: "🪟", priceKey: "extra_windows" },
    { id: "cabinets", label: "Inside Cabinets", icon: "📂", priceKey: "extra_cabinets" },
    { id: "pets", label: "Pet Surcharge", icon: "🐾", priceKey: "extra_pets" },
] as const;

export type PricingConfig = typeof DEFAULT_PRICING;

export const calculateBasePrice = (beds: number, baths: number, sq: number, type: string, config: Partial<PricingConfig> = {}) => {
    const p = { ...DEFAULT_PRICING, ...config };

    let base = p.base_price_residential;
    base += beds * p.price_per_bedroom;
    base += baths * p.price_per_bathroom;
    base += sq * p.price_per_sq_ft;

    if (type === "deep" || type === "first_cleaning") base *= p.multiplier_deep;
    if (type === "move" || type === "move_in_out") base *= p.multiplier_move;
    if (type === "post_construction") base *= p.multiplier_post_construction;

    return base;
};

export const calculateTotal = (data: WizardData, config: Partial<PricingConfig> = {}) => {
    const p = { ...DEFAULT_PRICING, ...config };
    let total = 0;
    const freq = FREQUENCIES.find(f => f.id === data.frequency);
    const discount = freq?.discount || 0;

    if (data.serviceType === "residential") {
        const base = calculateBasePrice(data.bedrooms, data.bathrooms, data.sqFt, data.cleaningType, config);
        total = base * (1 - discount);
    } else if (data.serviceType === "commercial") {
        const sq = data.commSqFt || 0;
        total = Math.max(p.commercial_min, Math.round(sq * p.commercial_sq_ft_rate));
    } else if (data.serviceType === "property_mgmt") {
        const count = data.propertyCount || 1;
        total = p.property_mgmt_flat * count;
    }

    // Add Extras
    if (data.extras && data.extras.length > 0) {
        data.extras.forEach(extraId => {
            const extraInfo = EXTRAS_LIST.find(e => e.id === extraId);
            if (extraInfo) {
                const price = (p as any)[extraInfo.priceKey] || 0;
                total += price;
            }
        });
    }

    return Math.round(total);
};
