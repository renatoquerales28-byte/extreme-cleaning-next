"use server";

import { db } from "@/lib/db";
import { serviceAreas } from "@/lib/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function checkZipAvailability(zip: string) {
    if (!zip) return { status: 'unavailable' as const };

    // HARDCODED FALLBACK FOR DEMO/TESTING (Spokane + Test ZIP)
    const fallbackZips = ["99201", "99202", "99203", "99204", "99205", "99208", "99212", "99223", "99224", "00000"];

    try {
        const area = await db.select().from(serviceAreas).where(eq(serviceAreas.zipCode, zip));

        if (area.length > 0) {
            return {
                status: area[0].status,
                city: area[0].city || undefined
            };
        }

        // If not in DB, check fallback
        if (fallbackZips.includes(zip)) {
            return {
                status: 'active' as const,
                city: 'Spokane (Verified Hub)'
            };
        }

        return { status: 'unavailable' as const };
    } catch (error) {
        console.warn("DB Connection failed, using fallback logic for:", zip);
        if (fallbackZips.includes(zip)) {
            return { status: 'active' as const, city: 'Spokane (Regional Node)' };
        }
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
        revalidatePath("/admin/locations");
        return { success: true };
    } catch (error) {
        console.error("Failed to upsert service area:", error);
        return { success: false, error: "Failed to update service area" };
    }
}

export async function getAllServiceAreas() {
    try {
        const areas = await db.select().from(serviceAreas);
        return { success: true, data: areas };
    } catch (error) {
        console.error("Failed to fetch service areas:", error);
        return { success: false, error: "Failed to fetch service areas" };
    }
}

export async function deleteServiceArea(id: number) {
    try {
        await db.delete(serviceAreas).where(eq(serviceAreas.id, id));
        revalidatePath("/admin/locations");
        revalidatePath("/");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete service area:", error);
        return { success: false, error: "Failed to delete service area" };
    }
}
