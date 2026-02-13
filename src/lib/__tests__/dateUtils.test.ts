import { describe, it, expect } from 'vitest';

// Date utility functions
function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

function formatTime(date: Date): string {
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });
}

function isWeekend(date: Date): boolean {
    const day = date.getDay();
    return day === 0 || day === 6; // Sunday = 0, Saturday = 6
}

function isBusinessHours(date: Date): boolean {
    const hour = date.getHours();
    const day = date.getDay();

    // Monday-Friday, 8 AM - 6 PM
    return day >= 1 && day <= 5 && hour >= 8 && hour < 18;
}

function addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate();
}

function getNextAvailableDate(startDate: Date, blockedDates: Date[] = []): Date {
    let current = new Date(startDate);
    current.setDate(current.getDate() + 1); // Start from tomorrow

    while (isWeekend(current) || blockedDates.some(blocked => isSameDay(blocked, current))) {
        current = addDays(current, 1);
    }

    return current;
}

function getTimeSlots(date: Date): string[] {
    const slots: string[] = [];

    if (isWeekend(date)) {
        return slots; // No slots on weekends
    }

    // Generate slots from 8 AM to 5 PM (last slot starts at 5 PM)
    for (let hour = 8; hour <= 17; hour++) {
        const time = new Date(date);
        time.setHours(hour, 0, 0, 0);
        slots.push(formatTime(time));
    }

    return slots;
}

// Tests
describe('formatDate', () => {
    it('should format date correctly', () => {
        // Usamos hora 12:00 para evitar problemas de zona horaria
        const date = new Date('2026-01-28T12:00:00');
        const formatted = formatDate(date);
        expect(formatted).toContain('January');
        expect(formatted).toContain('28');
        expect(formatted).toContain('2026');
    });

    it('should handle different months', () => {
        const date = new Date('2026-12-25T12:00:00');
        const formatted = formatDate(date);
        expect(formatted).toContain('December');
    });
});

describe('formatTime', () => {
    it('should format morning time with AM', () => {
        const date = new Date('2026-01-28T09:00:00');
        const formatted = formatTime(date);
        expect(formatted).toContain('9');
        expect(formatted).toContain('AM');
    });

    it('should format afternoon time with PM', () => {
        const date = new Date('2026-01-28T14:00:00');
        const formatted = formatTime(date);
        expect(formatted).toContain('PM');
    });

    it('should format noon correctly', () => {
        const date = new Date('2026-01-28T12:00:00');
        const formatted = formatTime(date);
        expect(formatted).toContain('12');
        expect(formatted).toContain('PM');
    });
});

describe('isWeekend', () => {
    it('should return true for Saturday', () => {
        const saturday = new Date('2026-01-31T12:00:00'); // Saturday
        expect(isWeekend(saturday)).toBe(true);
    });

    it('should return true for Sunday', () => {
        const sunday = new Date('2026-02-01T12:00:00'); // Sunday
        expect(isWeekend(sunday)).toBe(true);
    });

    it('should return false for weekdays', () => {
        const monday = new Date('2026-01-26T12:00:00'); // Monday
        const wednesday = new Date('2026-01-28T12:00:00'); // Wednesday
        const friday = new Date('2026-01-30T12:00:00'); // Friday

        expect(isWeekend(monday)).toBe(false);
        expect(isWeekend(wednesday)).toBe(false);
        expect(isWeekend(friday)).toBe(false);
    });
});

describe('isBusinessHours', () => {
    it('should return true for business hours on weekday', () => {
        const date = new Date('2026-01-28T10:00:00'); // Wednesday 10 AM
        expect(isBusinessHours(date)).toBe(true);
    });

    it('should return false for early morning', () => {
        const date = new Date('2026-01-28T07:00:00'); // Wednesday 7 AM
        expect(isBusinessHours(date)).toBe(false);
    });

    it('should return false for evening', () => {
        const date = new Date('2026-01-28T19:00:00'); // Wednesday 7 PM
        expect(isBusinessHours(date)).toBe(false);
    });

    it('should return false for weekend even during business hours', () => {
        const date = new Date('2026-01-31T10:00:00'); // Saturday 10 AM
        expect(isBusinessHours(date)).toBe(false);
    });

    it('should return true for 8 AM (start of business hours)', () => {
        const date = new Date('2026-01-28T08:00:00');
        expect(isBusinessHours(date)).toBe(true);
    });

    it('should return false for 6 PM (end of business hours)', () => {
        const date = new Date('2026-01-28T18:00:00');
        expect(isBusinessHours(date)).toBe(false);
    });
});

describe('addDays', () => {
    it('should add days correctly', () => {
        const date = new Date('2026-01-28T12:00:00');
        const result = addDays(date, 5);
        expect(result.getDate()).toBe(2); // February 2
    });

    it('should handle negative days (subtract)', () => {
        const date = new Date('2026-01-28T12:00:00');
        const result = addDays(date, -3);
        expect(result.getDate()).toBe(25); // January 25
    });

    it('should not modify original date', () => {
        const date = new Date('2026-01-28T12:00:00');
        const originalDate = date.getDate();
        addDays(date, 5);
        expect(date.getDate()).toBe(originalDate);
    });
});

describe('isSameDay', () => {
    it('should return true for same day', () => {
        const date1 = new Date('2026-01-28T10:00:00');
        const date2 = new Date('2026-01-28T15:00:00');
        expect(isSameDay(date1, date2)).toBe(true);
    });

    it('should return false for different days', () => {
        const date1 = new Date('2026-01-28T12:00:00');
        const date2 = new Date('2026-01-29T12:00:00');
        expect(isSameDay(date1, date2)).toBe(false);
    });

    it('should return false for same day different month', () => {
        const date1 = new Date('2026-01-28T12:00:00');
        const date2 = new Date('2026-02-28T12:00:00');
        expect(isSameDay(date1, date2)).toBe(false);
    });
});

describe('getNextAvailableDate', () => {
    it('should skip weekend and return next weekday', () => {
        const friday = new Date('2026-01-30T12:00:00'); // Friday
        const next = getNextAvailableDate(friday);
        expect(isWeekend(next)).toBe(false);
        expect(next.getDate()).toBe(2); // Monday, Feb 2
    });

    it('should skip blocked dates', () => {
        const monday = new Date('2026-01-26T12:00:00');
        const blockedDates = [
            new Date('2026-01-27T12:00:00'), // Tuesday
            new Date('2026-01-28T12:00:00')  // Wednesday
        ];
        const next = getNextAvailableDate(monday, blockedDates);
        expect(next.getDate()).toBe(29); // Thursday
    });

    it('should skip both weekend and blocked dates', () => {
        const thursday = new Date('2026-01-29T12:00:00');
        const blockedDates = [
            new Date('2026-01-30T12:00:00'), // Friday (blocked)
            new Date('2026-02-02T12:00:00')  // Monday (blocked)
        ];
        const next = getNextAvailableDate(thursday, blockedDates);
        expect(next.getDate()).toBe(3); // Tuesday, Feb 3
    });
});

describe('getTimeSlots', () => {
    it('should return empty array for weekend', () => {
        const saturday = new Date('2026-01-31T12:00:00');
        const slots = getTimeSlots(saturday);
        expect(slots).toHaveLength(0);
    });

    it('should return 10 time slots for weekday', () => {
        const wednesday = new Date('2026-01-28T12:00:00');
        const slots = getTimeSlots(wednesday);
        expect(slots).toHaveLength(10); // 8 AM to 5 PM
    });

    it('should include 8 AM as first slot', () => {
        const wednesday = new Date('2026-01-28T12:00:00');
        const slots = getTimeSlots(wednesday);
        expect(slots[0]).toContain('8');
        expect(slots[0]).toContain('AM');
    });

    it('should include 5 PM as last slot', () => {
        const wednesday = new Date('2026-01-28T12:00:00');
        const slots = getTimeSlots(wednesday);
        expect(slots[slots.length - 1]).toContain('5');
        expect(slots[slots.length - 1]).toContain('PM');
    });
});
