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
        await db.insert(leads).values({
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            serviceType: data.serviceType,
            frequency: data.frequency,
            totalPrice: data.totalPrice,
            status: "new",
            details: data,
        });
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to create lead:", error);
        return { success: false, error: "Failed to create lead" };
    }
}
