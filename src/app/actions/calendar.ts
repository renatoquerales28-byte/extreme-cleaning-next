"use server";

import { db } from "@/lib/db";
import { leads, calendarSettings, blockedDates } from "@/lib/db/schema";
import { eq, and, gte, lte, inArray } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { addHours, format, startOfMonth, endOfMonth, getDay, parse, isSameDay } from "date-fns";

export async function getCalendarSettings() {
    try {
        const settings = await db.select().from(calendarSettings);
        // Return aggregation keyed by dayOfWeek for easier frontend use
        return { success: true, data: settings };
    } catch (error) {
        console.error("Failed to fetch calendar settings", error);
        return { success: false, error: "Failed to fetch settings" };
    }
}

export async function updateCalendarSettings(data: any[]) {
    try {
        // Upsert settings for each day
        for (const setting of data) {
            const existing = await db.select().from(calendarSettings).where(eq(calendarSettings.dayOfWeek, setting.dayOfWeek));
            if (existing.length > 0) {
                await db.update(calendarSettings)
                    .set({ isOpen: setting.isOpen, startTime: setting.startTime, endTime: setting.endTime })
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

// Initialize default calendar settings if they don't exist
export async function initializeDefaultSettings() {
    try {
        const existing = await db.select().from(calendarSettings);

        if (existing.length === 0) {
            // Default: Monday-Friday 9AM-5PM, Saturday 10AM-3PM, Sunday closed
            const defaultSettings = [
                { dayOfWeek: 0, isOpen: false, startTime: "09:00", endTime: "17:00" }, // Sunday - Closed
                { dayOfWeek: 1, isOpen: true, startTime: "09:00", endTime: "17:00" },  // Monday
                { dayOfWeek: 2, isOpen: true, startTime: "09:00", endTime: "17:00" },  // Tuesday
                { dayOfWeek: 3, isOpen: true, startTime: "09:00", endTime: "17:00" },  // Wednesday
                { dayOfWeek: 4, isOpen: true, startTime: "09:00", endTime: "17:00" },  // Thursday
                { dayOfWeek: 5, isOpen: true, startTime: "09:00", endTime: "17:00" },  // Friday
                { dayOfWeek: 6, isOpen: true, startTime: "10:00", endTime: "15:00" },  // Saturday
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

        const bookings = await db.select().from(leads)
            .where(and(gte(leads.serviceDate, start), lte(leads.serviceDate, end)));

        return { success: true, data: { blocked, bookings } };
    } catch (error) {
        return { success: false, error: "Failed to fetch events" };
    }
}

export async function getAvailableSlots(date: Date) {
    try {
        // 1. Check if date is blocked
        const blocked = await db.select().from(blockedDates).where(eq(blockedDates.date, date));
        if (blocked.length > 0) return { success: true, slots: [], reason: blocked[0].reason };

        // 2. Check working hours for this day of week
        const dayOfWeek = getDay(date);
        let settings = await db.select().from(calendarSettings).where(eq(calendarSettings.dayOfWeek, dayOfWeek));

        // Initialize default settings if none exist
        if (settings.length === 0) {
            console.log("No calendar settings found, initializing defaults...");
            await initializeDefaultSettings();
            settings = await db.select().from(calendarSettings).where(eq(calendarSettings.dayOfWeek, dayOfWeek));
        }

        if (settings.length === 0 || !settings[0].isOpen) {
            return { success: true, slots: [], reason: "Closed" };
        }

        const { startTime, endTime } = settings[0];

        // 3. Generate slots (hourly for now)
        const slots = [];
        let current = parse(startTime, "HH:mm", date);
        const end = parse(endTime, "HH:mm", date);

        // Fetch bookings for this day to exclude taken slots
        // Note: Ideally we'd filter by exact timestamp range, but for simplicity let's assume serviceTime string match for now
        // A more robust system would calculate duration.
        const bookings = await db.select().from(leads).where(eq(leads.serviceDate, date));
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
