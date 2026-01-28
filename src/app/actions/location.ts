"use server";

import { db } from "@/lib/db";
import { serviceAreas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function checkZipAvailability(zip: string) {
    if (!zip) return { status: 'unavailable' as const };

    try {
        const area = await db.select().from(serviceAreas).where(eq(serviceAreas.zipCode, zip));

        if (area.length > 0) {
            return {
                status: area[0].status,
                city: area[0].city || undefined
            };
        }

        return { status: 'unavailable' as const };
    } catch (error) {
        console.error("Failed to check zip availability:", error);
        return { status: 'unavailable' as const };
    }
}

export async function upsertServiceArea(data: { zip: string, status: 'active' | 'coming_soon', city?: string }) {
    // TODO: Add admin authentication check here

    try {
        const existing = await db.select().from(serviceAreas).where(eq(serviceAreas.zipCode, data.zip));

        if (existing.length > 0) {
            await db.update(serviceAreas)
                .set({ status: data.status, city: data.city })
                .where(eq(serviceAreas.zipCode, data.zip));
        } else {
            await db.insert(serviceAreas).values({
                zipCode: data.zip,
                status: data.status,
                city: data.city
            });
        }

        revalidatePath("/"); // Revalidate wizard or other pages
        return { success: true };
    } catch (error) {
        console.error("Failed to upsert service area:", error);
        return { success: false, error: "Failed to update service area" };
    }
}
