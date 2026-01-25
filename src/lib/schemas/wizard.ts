import * as z from "zod";

export const serviceTypes = ["residential", "commercial", "property_mgmt"] as const;
export const cleaningTypes = ["regular", "deep", "move"] as const;
export const frequencies = ["weekly", "biweekly", "monthly", "onetime"] as const;

export const wizardSchema = z.object({
    step: z.number(),
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
    smallPortfolio: z.array(z.object({
        id: z.number(),
        name: z.string(),
        bedrooms: z.number(),
        bathrooms: z.number(),
        sqFt: z.number(),
        cleaningType: z.enum(cleaningTypes)
    })).default([]),

    // Contact
    firstName: z.string().min(2, "Required").optional(),
    lastName: z.string().min(2, "Required").optional(),
    email: z.string().email("Invalid email").optional(),
    phone: z.string().min(10, "Invalid phone").optional(),
    notes: z.string().optional(),

    // Address (New Step)
    address: z.string().min(5, "Full address required").optional(),
    unit: z.string().optional(),
    city: z.string().default("Spokane"),
    state: z.string().default("WA"),

    // Date & Time Selection
    serviceDate: z.string().optional(), // ISO string
    serviceTime: z.string().optional(), // HH:mm format

    // Logic helpers
    referralCode: z.string().optional(),
    promoCode: z.string().optional(),
    leadId: z.number().optional(),
});

export type WizardData = z.infer<typeof wizardSchema>;
