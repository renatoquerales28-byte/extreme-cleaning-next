import { type WizardData } from "@/lib/schemas/wizard";

export const FREQUENCIES = [
    { id: "weekly", label: "Weekly", discount: 0.20, labelDiscount: "-20%" },
    { id: "biweekly", label: "Biweekly", discount: 0.15, labelDiscount: "-15%" },
    { id: "monthly", label: "Monthly", discount: 0.10, labelDiscount: "-10%" },
    { id: "onetime", label: "One-time", discount: 0, labelDiscount: "Regular" },
];

export const calculateBasePrice = (beds: number, baths: number, sq: number, type: string) => {
    let base = 100;
    base += beds * 20;
    base += baths * 30;
    base += (sq / 1000) * 15;
    if (type === "deep") base *= 1.5;
    if (type === "move") base *= 1.8;
    return base;
};

export const calculateTotal = (data: WizardData) => {
    let total = 0;
    const freq = FREQUENCIES.find(f => f.id === data.frequency);
    const discount = freq?.discount || 0;

    if (data.serviceType === "residential") {
        const base = calculateBasePrice(data.bedrooms, data.bathrooms, data.sqFt, data.cleaningType);
        total = base * (1 - discount);
    } else if (data.serviceType === "commercial") {
        const sq = parseInt(data.commSqFt || "0");
        total = Math.max(150, Math.round(sq * 0.12));
    } else if (data.serviceType === "property_mgmt") {
        total = 120; // Default flat rate estimate for property turnovers
    }

    return Math.round(total);
};
