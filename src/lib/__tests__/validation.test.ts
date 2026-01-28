import { describe, it, expect } from 'vitest';

// Utility functions to test
export function validateZipCode(zip: string): boolean {
    if (!zip) return false;
    if (zip.length !== 5) return false;
    if (!/^\d+$/.test(zip)) return false;
    return true;
}

export function validateEmail(email: string): boolean {
    if (!email) return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
    if (!phone) return false;
    const cleaned = phone.replace(/\D/g, '');
    return cleaned.length >= 10;
}

export function calculateTotal(
    basePrice: number,
    extras: number = 0,
    discount: number = 0
): number {
    const subtotal = basePrice + extras;
    const discountAmount = subtotal * (discount / 100);
    return subtotal - discountAmount;
}

// Tests
describe('validateZipCode', () => {
    it('should accept valid 5-digit zipcode', () => {
        expect(validateZipCode('00600')).toBe(true);
        expect(validateZipCode('12345')).toBe(true);
        expect(validateZipCode('90210')).toBe(true);
    });

    it('should reject zipcode with less than 5 digits', () => {
        expect(validateZipCode('123')).toBe(false);
        expect(validateZipCode('1234')).toBe(false);
    });

    it('should reject zipcode with more than 5 digits', () => {
        expect(validateZipCode('123456')).toBe(false);
        expect(validateZipCode('1234567')).toBe(false);
    });

    it('should reject zipcode with letters', () => {
        expect(validateZipCode('ABC12')).toBe(false);
        expect(validateZipCode('12A45')).toBe(false);
        expect(validateZipCode('ABCDE')).toBe(false);
    });

    it('should reject empty string', () => {
        expect(validateZipCode('')).toBe(false);
    });

    it('should reject zipcode with special characters', () => {
        expect(validateZipCode('12-45')).toBe(false);
        expect(validateZipCode('12 45')).toBe(false);
    });
});

describe('validateEmail', () => {
    it('should accept valid email addresses', () => {
        expect(validateEmail('test@example.com')).toBe(true);
        expect(validateEmail('user.name@domain.co')).toBe(true);
        expect(validateEmail('user+tag@example.com')).toBe(true);
    });

    it('should reject email without @', () => {
        expect(validateEmail('testexample.com')).toBe(false);
    });

    it('should reject email without domain', () => {
        expect(validateEmail('test@')).toBe(false);
        expect(validateEmail('test@domain')).toBe(false);
    });

    it('should reject empty string', () => {
        expect(validateEmail('')).toBe(false);
    });

    it('should reject email with spaces', () => {
        expect(validateEmail('test @example.com')).toBe(false);
        expect(validateEmail('test@ example.com')).toBe(false);
    });
});

describe('validatePhone', () => {
    it('should accept valid phone numbers', () => {
        expect(validatePhone('1234567890')).toBe(true);
        expect(validatePhone('123-456-7890')).toBe(true);
        expect(validatePhone('(123) 456-7890')).toBe(true);
        expect(validatePhone('+1 123 456 7890')).toBe(true);
    });

    it('should reject phone with less than 10 digits', () => {
        expect(validatePhone('123456789')).toBe(false);
        expect(validatePhone('12345')).toBe(false);
    });

    it('should reject empty string', () => {
        expect(validatePhone('')).toBe(false);
    });

    it('should accept phone with more than 10 digits (international)', () => {
        expect(validatePhone('12345678901')).toBe(true);
        expect(validatePhone('+58 412 1234567')).toBe(true);
    });
});

describe('calculateTotal', () => {
    it('should calculate total with base price only', () => {
        expect(calculateTotal(100)).toBe(100);
        expect(calculateTotal(250)).toBe(250);
    });

    it('should calculate total with base price and extras', () => {
        expect(calculateTotal(100, 50)).toBe(150);
        expect(calculateTotal(200, 75)).toBe(275);
    });

    it('should calculate total with discount', () => {
        expect(calculateTotal(100, 0, 10)).toBe(90); // 10% off
        expect(calculateTotal(200, 0, 25)).toBe(150); // 25% off
    });

    it('should calculate total with extras and discount', () => {
        expect(calculateTotal(100, 50, 10)).toBe(135); // 150 - 10%
        expect(calculateTotal(200, 100, 20)).toBe(240); // 300 - 20%
    });

    it('should handle 0 values', () => {
        expect(calculateTotal(0)).toBe(0);
        expect(calculateTotal(100, 0, 0)).toBe(100);
    });

    it('should handle 100% discount', () => {
        expect(calculateTotal(100, 0, 100)).toBe(0);
    });
});
