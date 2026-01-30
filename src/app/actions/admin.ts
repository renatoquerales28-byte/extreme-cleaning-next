"use server";

import { db } from "@/lib/db";
import { leads, pricingConfig, promotions } from "@/lib/db/schema";
import { desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function warmUpServer() {
    try {
        await db.execute(sql`SELECT 1`);
        return { success: true };
    } catch (e) {
        return { success: false };
    }
}

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
        const raw = await db.select().from(pricingConfig);
        // Transform to key-value map
        const config: Record<string, number> = {};
        raw.forEach(row => {
            config[row.key] = row.value;
        });
        return { success: true, data: raw, config };
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

export async function createLead(data: typeof leads.$inferInsert) {
    const startTime = Date.now();
    try {
        console.log('📝 Creating lead...');
        const result = await db.insert(leads).values({
            ...data,
            status: "new",
            createdAt: new Date(),
        }).returning({ insertedId: leads.id });

        const duration = Date.now() - startTime;
        console.log(`✅ Lead created in ${duration}ms (ID: ${result[0].insertedId})`);

        // revalidatePath("/admin"); // Disabled for performance
        return { success: true, leadId: result[0].insertedId };
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`❌ Failed to create lead after ${duration}ms:`, error);
        return { success: false, error: "Failed to create lead" };
    }
}

export async function updateLead(id: number, data: Partial<typeof leads.$inferInsert>) {
    const startTime = Date.now();

    // Input validation
    if (!id || typeof id !== 'number') {
        return { success: false, error: "Invalid lead ID" };
    }

    // Validate serviceDate if present
    if (data.serviceDate) {
        if (!(data.serviceDate instanceof Date)) {
            return { success: false, error: "Invalid date format" };
        }

        // Ensure date is not in the past
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (data.serviceDate < today) {
            return { success: false, error: "Cannot set past date" };
        }
    }

    try {
        console.log(`📝 Updating lead ${id}...`);
        await db.update(leads).set(data).where(eq(leads.id, id));

        const duration = Date.now() - startTime;
        console.log(`✅ Lead ${id} updated in ${duration}ms`);

        // revalidatePath("/admin"); // Disabled for performance
        return { success: true };
    } catch (error) {
        const duration = Date.now() - startTime;
        console.error(`❌ Failed to update lead ${id} after ${duration}ms:`, error);
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

export async function getSupportRequests() {
    try {
        // Fetch all leads. Since 'details' is JSONB, we can filter using SQL operator or fetch and filter in JS.
        // Drizzle specific JSON filtering might be complex, so for now we'll fetch recent leads and filter.
        // Depending on volume, a raw SQL query would be better: WHERE details->>'source' = 'wizard_help_callback'

        // Let's try raw SQL for efficiency if possible, or simple JS filter for MVP
        const allLeads = await db.select().from(leads).orderBy(desc(leads.createdAt)).limit(100);

        const supportRequests = allLeads.filter(lead => {
            const details = lead.details as any;
            return details?.source === 'wizard_help_callback';
        });

        return { success: false, data: supportRequests };
    } catch (error) {
        console.error("Failed to fetch support requests:", error);
        return { success: false, error: "Failed to fetch support requests" };
    }
}

export async function resolveSupportRequest(id: number) {
    try {
        await db.update(leads).set({ status: 'contacted' }).where(eq(leads.id, id));
        revalidatePath("/admin/support");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to resolve support request" };
    }
}
