"use server";

import { db } from "@/lib/db";
import { leads, pricingConfig, promotions } from "@/lib/db/schema";
import { desc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function getRecentLeads() {
    try {
        const data = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(50);
        return { success: true, data };
    } catch (error) {
        console.error("Failed to fetch leads:", error);
        return { success: false, error: "Failed to fetch leads" };
    }
}

export async function getPricingConfig() {
    try {
        const data = await db.select().from(pricingConfig);
        return { success: true, data };
    } catch (error) {
        console.error("Failed to fetch pricing config:", error);
        return { success: false, error: "Failed to fetch pricing config" };
    }
}

export async function updatePricingConfig(key: string, value: number) {
    try {
        // Check if exists, update or insert
        const existing = await db.select().from(pricingConfig).where(eq(pricingConfig.key, key));

        if (existing.length > 0) {
            await db.update(pricingConfig).set({ value }).where(eq(pricingConfig.key, key));
        } else {
            await db.insert(pricingConfig).values({ key, value, description: "Auto-generated" });
        }

        revalidatePath("/admin/pricing");
        return { success: true };
    } catch (error) {
        console.error("Failed to update pricing:", error);
        return { success: false, error: "Failed to update pricing" };
    }
}

export async function getPromotions() {
    try {
        const data = await db.select().from(promotions).orderBy(desc(promotions.createdAt));
        return { success: true, data };
    } catch (error) {
        console.error("Failed to fetch promotions:", error);
        return { success: false, error: "Failed to fetch promotions" };
    }
}

export async function createPromotion(data: { code: string; discountType: string; discountValue: number; active: boolean }) {
    try {
        await db.insert(promotions).values(data);
        revalidatePath("/admin/promotions");
        return { success: true };
    } catch (error) {
        console.error("Failed to create promotion:", error);
        return { success: false, error: "Failed to create promotion" };
    }
}

export async function togglePromotion(id: number, active: boolean) {
    try {
        await db.update(promotions).set({ active }).where(eq(promotions.id, id));
        revalidatePath("/admin/promotions");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to toggle promotion" };
    }
}

export async function deletePromotion(id: number) {
    try {
        await db.delete(promotions).where(eq(promotions.id, id));
        revalidatePath("/admin/promotions");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete promotion" };
    }
}

export async function createLead(data: any) {
    try {
        const result = await db.insert(leads).values({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            serviceType: data.serviceType,
            frequency: data.frequency,
            totalPrice: data.totalPrice,
            status: "new",
            details: data,
            // Capture date/time if available upfront
            serviceDate: data.serviceDate ? new Date(data.serviceDate) : null,
            serviceTime: data.serviceTime,
        }).returning({ insertedId: leads.id });

        revalidatePath("/admin");
        return { success: true, leadId: result[0].insertedId };
    } catch (error) {
        console.error("Failed to create lead:", error);
        return { success: false, error: "Failed to create lead" };
    }
}

export async function updateLead(id: number, data: any) {
    try {
        await db.update(leads).set({
            // Update fields that might change in later steps
            serviceDate: data.serviceDate ? new Date(data.serviceDate) : undefined,
            serviceTime: data.serviceTime,
            details: data, // Update full details JSON
            // If address is provided in data
            // Note: Schema 'leads' table doesn't have address columns explicitly usually, 
            // but we store it in 'details' JSONB. 
            // If we needed specific columns for address we'd add them, but details JSON is fine.
        }).where(eq(leads.id, id));

        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to update lead:", error);
        return { success: false, error: "Failed to update lead" };
    }
}

export async function getClients() {
    try {
        const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt));

        // Aggregate leads by email
        const clientsMap = new Map();

        allLeads.forEach(lead => {
            if (!lead.email) return;

            if (!clientsMap.has(lead.email)) {
                clientsMap.set(lead.email, {
                    id: lead.id, // Use latest lead ID as pseudo-client ID
                    firstName: lead.firstName,
                    lastName: lead.lastName,
                    email: lead.email,
                    phone: lead.phone,
                    totalSpent: 0,
                    bookingsCount: 0,
                    lastBooking: lead.createdAt,
                    leads: []
                });
            }

            const client = clientsMap.get(lead.email);
            client.totalSpent += (lead.totalPrice || 0);
            client.bookingsCount += 1;
            client.leads.push(lead);
        });

        const clients = Array.from(clientsMap.values());
        return { success: true, data: clients };
    } catch (error) {
        console.error("Failed to fetch clients:", error);
        return { success: false, error: "Failed to fetch clients" };
    }
}
