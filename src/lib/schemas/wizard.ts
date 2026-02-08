import * as z from "zod";

export const serviceTypes = ["residential", "commercial", "property_mgmt"] as const;
export const cleaningTypes = ["regular", "standard", "deep", "move_in_out", "post_construction"] as const;
export const frequencies = ["weekly", "biweekly", "monthly", "onetime"] as const;

export const wizardSchema = z.object({
    // Navigation
    step: z.number().optional(),
    zipCode: z.string().length(5, "ZIP code must be 5 digits").regex(/^\d+$/, "Must be digits only"),
    serviceType: z.enum(serviceTypes).optional(),

    // Residential / PM Details
    bedrooms: z.number().min(1).max(10).default(1),
    bathrooms: z.number().min(1).max(10).default(1),
    sqFt: z.number().min(100).max(10000).default(1000),
    cleaningType: z.enum(cleaningTypes).default("regular"),
    frequency: z.enum(frequencies).default("biweekly"),

    // Commercial
    businessType: z.string().optional(),
    commSqFt: z.coerce.number().optional(), // Coerce because input might return string
    floors: z.number().min(1).default(1),

    // Portfolio (PM)
    propertyCount: z.number().min(1).default(1),
    serviceNeeds: z.array(z.string()).default([]),
    smallPortfolio: z.array(z.object({
        id: z.number(),
        name: z.string(),
        bedrooms: z.number(),
        bathrooms: z.number(),
        sqFt: z.number(),
        cleaningType: z.enum(cleaningTypes)
    })).default([]),

    // Contact
    firstName: z.preprocess((val) => val === "" ? undefined : val, z.string().min(2, "First identity required")),
    lastName: z.preprocess((val) => val === "" ? undefined : val, z.string().min(2, "Last identity required")),
    email: z.preprocess((val) => val === "" ? undefined : val, z.string().email("Invalid email")),
    phone: z.preprocess((val) => val === "" ? undefined : val, z.string().min(10, "Valid contact number required")),
    notes: z.string().optional(),

    // Address (New Step)
    address: z.preprocess((val) => val === "" ? undefined : val, z.string().min(5, "Full service address required")),
    unit: z.string().optional(),
    city: z.string().default("Spokane"),
    state: z.string().default("WA"),

    // Date & Time Selection
    serviceDate: z.union([z.string(), z.date()]).optional(), // ISO string or Date object
    serviceTime: z.string().optional(), // HH:mm format

    // Logic helpers
    referralCode: z.string().optional(),
    promoCode: z.string().optional(),
    discountApplied: z.boolean().optional(),
    originalPrice: z.number().optional(),
    totalPrice: z.number().optional(),
    leadId: z.union([z.number(), z.string()]).optional(),
    mode: z.string().optional(), // 'returning' or other modes
    extras: z.array(z.string()).default([]), // Selected add-on services IDs
});

export type WizardData = z.infer<typeof wizardSchema>;
