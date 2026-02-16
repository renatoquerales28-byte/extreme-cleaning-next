"use server";

import { db } from "@/lib/db";
import { leads, calendarSettings, blockedDates, pricingConfig, staff } from "@/lib/db/schema";
import { eq, and, gte, lte, inArray, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addHours, format, startOfMonth, endOfMonth, getDay, parse, isSameDay } from "date-fns";

export async function getStaff() {
    try {
        const team = await db.select().from(staff).where(eq(staff.active, true));
        return { success: true, data: team };
    } catch (error) {
        return { success: false, error: "Failed to fetch staff" };
    }
}

export async function createStaff(name: string, color: string) {
    try {
        await db.insert(staff).values({ name, color });
        revalidatePath("/admin/calendar");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to create staff" };
    }
}

export async function deleteStaff(id: number) {
    try {
        await db.update(staff).set({ active: false }).where(eq(staff.id, id));
        revalidatePath("/admin/calendar");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to delete staff" };
    }
}

export async function assignStaff(leadId: number, staffId: number | null) {
    try {
        await db.update(leads).set({ assignedStaffId: staffId }).where(eq(leads.id, leadId));
        revalidatePath("/admin/calendar");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to assign staff" };
    }
}

export async function getCalendarSettings() {
    try {
        const settings = await db.select().from(calendarSettings);
        return { success: true, data: settings };
    } catch (error) {
        console.error("Failed to fetch calendar settings", error);
        return { success: false, error: "Failed to fetch settings" };
    }
}

// ... existing updateCalendarSettings ...
export async function updateCalendarSettings(data: any[]) {
    try {
        for (const setting of data) {
            const existing = await db.select().from(calendarSettings).where(eq(calendarSettings.dayOfWeek, setting.dayOfWeek));
            if (existing.length > 0) {
                await db.update(calendarSettings)
                    .set({
                        isOpen: setting.isOpen,
                        startTime: setting.startTime,
                        endTime: setting.endTime,
                        dailyCapacity: setting.dailyCapacity
                    })
                    .where(eq(calendarSettings.dayOfWeek, setting.dayOfWeek));
            } else {
                await db.insert(calendarSettings).values(setting);
            }
        }
        revalidatePath("/admin/calendar");
        return { success: true };
    } catch (error) {
        console.error("Failed to update settings", error);
        return { success: false, error: "Failed to update settings" };
    }
}

// ... existing initializeDefaultSettings ...
export async function initializeDefaultSettings() {
    try {
        const existing = await db.select().from(calendarSettings);

        if (existing.length === 0) {
            const defaultSettings = [
                { dayOfWeek: 0, isOpen: false, startTime: "09:00", endTime: "17:00", dailyCapacity: 0 },
                { dayOfWeek: 1, isOpen: true, startTime: "09:00", endTime: "17:00", dailyCapacity: 5 },
                { dayOfWeek: 2, isOpen: true, startTime: "09:00", endTime: "17:00", dailyCapacity: 5 },
                { dayOfWeek: 3, isOpen: true, startTime: "09:00", endTime: "17:00", dailyCapacity: 5 },
                { dayOfWeek: 4, isOpen: true, startTime: "09:00", endTime: "17:00", dailyCapacity: 5 },
                { dayOfWeek: 5, isOpen: true, startTime: "09:00", endTime: "17:00", dailyCapacity: 5 },
                { dayOfWeek: 6, isOpen: true, startTime: "10:00", endTime: "15:00", dailyCapacity: 3 },
            ];

            await db.insert(calendarSettings).values(defaultSettings);
            console.log("Default calendar settings initialized");
            return { success: true, message: "Default settings created" };
        }

        return { success: true, message: "Settings already exist" };
    } catch (error) {
        console.error("Failed to initialize default settings", error);
        return { success: false, error: "Failed to initialize settings" };
    }
}

export async function blockDate(date: Date, reason: string = "Closed") {
    try {
        await db.insert(blockedDates).values({ date, reason });
        revalidatePath("/admin/calendar");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to block date" };
    }
}

export async function unblockDate(id: number) {
    try {
        await db.delete(blockedDates).where(eq(blockedDates.id, id));
        revalidatePath("/admin/calendar");
        return { success: true };
    } catch (error) {
        return { success: false, error: "Failed to unblock date" };
    }
}

export async function getMonthEvents(date: Date) {
    try {
        const start = startOfMonth(date);
        const end = endOfMonth(date);

        const blocked = await db.select().from(blockedDates)
            .where(and(gte(blockedDates.date, start), lte(blockedDates.date, end)));

        // Join with staff to get assignee info
        const bookings = await db.select({
            id: leads.id,
            firstName: leads.firstName,
            lastName: leads.lastName,
            serviceDate: leads.serviceDate,
            serviceTime: leads.serviceTime,
            serviceType: leads.serviceType,
            frequency: leads.frequency,
            assignedStaffId: leads.assignedStaffId,
            staffName: staff.name,
            staffColor: staff.color
        })
            .from(leads)
            .leftJoin(staff, eq(leads.assignedStaffId, staff.id))
            .where(and(gte(leads.serviceDate, start), lte(leads.serviceDate, end)));

        return { success: true, data: { blocked, bookings } };
    } catch (error) {
        return { success: false, error: "Failed to fetch events" };
    }
}

export async function getAvailableSlots(date: Date) {
    try {
        const blocked = await db.select().from(blockedDates).where(eq(blockedDates.date, date));
        if (blocked.length > 0) return { success: true, slots: [], reason: blocked[0].reason };

        const dayOfWeek = getDay(date);
        let settings = await db.select().from(calendarSettings).where(eq(calendarSettings.dayOfWeek, dayOfWeek));

        if (settings.length === 0) {
            await initializeDefaultSettings();
            settings = await db.select().from(calendarSettings).where(eq(calendarSettings.dayOfWeek, dayOfWeek));
        }

        if (settings.length === 0 || !settings[0].isOpen) {
            return { success: true, slots: [], reason: "Closed" };
        }

        const { startTime, endTime, dailyCapacity } = settings[0];

        // Fetch global master capacity
        const pricingRes = await db.select().from(pricingConfig).where(eq(pricingConfig.key, 'max_capacity_per_day'));
        const globalCapacity = pricingRes.length > 0 ? pricingRes[0].value : null;

        const MAX_BOOKINGS_PER_DAY = globalCapacity !== null ? globalCapacity : (dailyCapacity || 3);

        const startOfDay = new Date(date);
        startOfDay.setHours(0, 0, 0, 0);
        const endOfDay = new Date(date);
        endOfDay.setHours(23, 59, 59, 999);

        const existingBookingsCount = await db.select({ count: sql<number>`count(*)` })
            .from(leads)
            .where(and(
                gte(leads.serviceDate, startOfDay),
                lte(leads.serviceDate, endOfDay)
            ));

        const count = existingBookingsCount[0].count;
        if (count >= MAX_BOOKINGS_PER_DAY) {
            return {
                success: true,
                slots: [],
                reason: `Fully Booked (Daily capacity of ${MAX_BOOKINGS_PER_DAY} reached)`
            };
        }

        // 5. Generate slots (hourly)
        const slots = [];
        let current = parse(startTime, "HH:mm", date);
        const end = parse(endTime, "HH:mm", date);

        // Fetch bookings for this day to exclude exact taken slots
        const bookings = await db.select().from(leads).where(and(
            gte(leads.serviceDate, startOfDay),
            lte(leads.serviceDate, endOfDay)
        ));
        const takenTimes = new Set(bookings.map(b => b.serviceTime));

        while (current < end) {
            const timeString = format(current, "HH:mm");
            if (!takenTimes.has(timeString)) {
                slots.push(timeString);
            }
            // Increment by 1 hour (customize duration here)
            current = addHours(current, 1);
        }

        return { success: true, slots };

    } catch (error) {
        console.error("Error getting slots", error);
        return { success: false, error: "Could not fetch slots" };
    }
}
