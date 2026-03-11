"use server";

import { db } from "@/lib/db";
import { leads, pricingConfig, promotions } from "@/lib/db/schema";
import { desc, eq, sql, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "extremecleaning.ops@gmail.com";
const SENDER_EMAIL = process.env.SENDER_EMAIL || "no-reply@extremecleaning509.com";

async function sendAdminNotification(leadData: any) {
    if (!process.env.RESEND_API_KEY) return;
    try {
        const resend = new Resend(process.env.RESEND_API_KEY);
        const d = leadData.details || {};

        const adminEmailClean = ADMIN_EMAIL.trim();
        const senderEmailClean = SENDER_EMAIL.trim();

        // 1. Email to Operations (Admin)
        const adminRes = await resend.emails.send({
            from: `ECS Bookings <${senderEmailClean}>`,
            to: [adminEmailClean],
            replyTo: leadData.email || undefined,
            subject: `New Lead — ${leadData.firstName || ""} ${leadData.lastName || ""}`,
            html: `
                <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f9fafb; border-radius: 12px; overflow: hidden; border: 1px solid #e5e7eb;">
                    <div style="background: #024653; padding: 28px 32px;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 22px; font-weight: 700;">New Booking Request</h1>
                        <p style="margin: 6px 0 0; color: #a7d9e0; font-size: 14px;">Extreme Cleaning Services — Admin Notification</p>
                    </div>
                    <div style="padding: 28px 32px;">
                        <h2 style="color: #024653; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Client Info</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 40%;">Name</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${leadData.firstName || ""} ${leadData.lastName || ""}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Email</td>
                                <td style="padding: 10px 0; font-size: 14px; font-weight: 600;"><a href="mailto:${leadData.email}" style="color: #024653;">${leadData.email || "N/A"}</a></td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Phone</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${leadData.phone || "N/A"}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">ZIP Code</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${d.zipCode || "N/A"}</td>
                            </tr>
                        </table>
                        <h2 style="color: #024653; font-size: 15px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 12px;">Service Details</h2>
                        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px; width: 40%;">Service Type</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px; font-weight: 600;">${leadData.serviceType || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Frequency</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${leadData.frequency || d.frequency || "N/A"}</td>
                            </tr>
                            <tr style="border-bottom: 1px solid #e5e7eb;">
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Address</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${d.address || "N/A"}, ${d.city || ""}</td>
                            </tr>
                            <tr>
                                <td style="padding: 10px 0; color: #6b7280; font-size: 14px;">Cleaning Type</td>
                                <td style="padding: 10px 0; color: #111827; font-size: 14px;">${d.cleaningType || "N/A"}</td>
                            </tr>
                        </table>
                    </div>
                </div>
            `,
        });

        if (adminRes.error) {
            console.error("❌ Resend Admin Error:", adminRes.error);
        } else {
            console.log("✅ Admin notification sent to", adminEmailClean, "ID:", adminRes.data?.id);
        }

        // 2. Auto-Reply Email to Customer
        if (leadData.email) {
            const customerRes = await resend.emails.send({
                from: `Extreme Cleaning <${senderEmailClean}>`,
                to: [leadData.email.trim()],
                subject: `Request Received! | Extreme Cleaning`,
                html: `
                    <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; padding: 32px; border: 1px solid #e5e7eb; border-radius: 12px;">
                        <h1 style="color: #024653; font-size: 24px; margin-top: 0;">Hi ${leadData.firstName || "there"},</h1>
                        <p style="color: #4b5563; font-size: 16px; line-height: 1.6;">
                            Thank you for contacting <strong>Extreme Cleaning</strong>! We have received your request and an advisor will contact you soon.
                        </p>
                        <br/>
                        <p style="color: #9ca3af; font-size: 14px;">
                            Best regards,<br/>
                            <strong>The Extreme Cleaning Team</strong><br/>
                            <a href="https://extreme-cleaning-next.vercel.app" style="color: #05D16E; text-decoration: none;">extreme-cleaning.com</a>
                        </p>
                    </div>
                `
            });

            if (customerRes.error) {
                console.error("❌ Resend Customer Error:", customerRes.error);
            } else {
                console.log("✅ Customer auto-reply sent to", leadData.email, "ID:", customerRes.data?.id);
            }
        }

    } catch (err: any) {
        console.error("Email notifications failed context:", err.message);
    }
}

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

        // Await the email notification so Vercel doesn't kill the function prematurely
        await sendAdminNotification(data);

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

export async function findCustomerByPhone(phone: string) {
    try {
        // Clean phone number for better matching
        const cleanPhone = phone.replace(/\D/g, '');
        if (cleanPhone.length < 10) return { success: false, error: "Invalid phone" };

        const results = await db.select()
            .from(leads)
            .where(sql`REPLACE(REPLACE(REPLACE(REPLACE(${leads.phone}, ' ', ''), '-', ''), '(', ''), ')', '') LIKE ${'%' + cleanPhone + '%'}`)
            .orderBy(desc(leads.createdAt))
            .limit(50);

        if (results.length === 0) return { success: false, error: "No customer found" };

        // Aggregate unique properties found for this customer
        const propertiesMap = new Map();
        results.forEach(lead => {
            const details = lead.details as any;
            if (details?.address) {
                const key = `${details.address}-${details.zipCode}`.toLowerCase();
                if (!propertiesMap.has(key)) {
                    propertiesMap.set(key, {
                        address: details.address,
                        city: details.city || "Spokane",
                        zipCode: details.zipCode,
                        bedrooms: details.bedrooms,
                        bathrooms: details.bathrooms,
                        sqFt: details.sqFt,
                        serviceType: lead.serviceType
                    });
                }
            }
        });

        return {
            success: true,
            customer: {
                firstName: results[0].firstName,
                lastName: results[0].lastName,
                email: results[0].email,
                phone: results[0].phone
            },
            properties: Array.from(propertiesMap.values())
        };
    } catch (error) {
        console.error("Search error:", error);
        return { success: false, error: "Database search failed" };
    }
}

export async function deleteLeads(ids: number[]) {
    try {
        if (!ids || ids.length === 0) return { success: true };
        await db.delete(leads).where(inArray(leads.id, ids));
        revalidatePath("/admin");
        return { success: true };
    } catch (error) {
        console.error("Failed to delete leads:", error);
        return { success: false, error: "Failed to delete leads" };
    }
}
