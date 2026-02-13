import { describe, it, expect } from 'vitest';

// Mock pricing config
const mockPricingConfig = {
    residential: {
        base: {
            studio: 80,
            oneBed: 100,
            twoBed: 120,
            threeBed: 150,
            fourPlusBed: 180
        },
        extras: {
            deepCleaning: 50,
            windows: 30,
            oven: 25,
            fridge: 20,
            laundry: 15
        }
    },
    commercial: {
        base: {
            small: 150,
            medium: 250,
            large: 400
        },
        perSqFt: 0.15
    },
    frequency: {
        oneTime: 1.0,
        weekly: 0.85,
        biweekly: 0.90,
        monthly: 0.95
    }
};

// Pricing calculation functions
function calculateResidentialPrice(
    bedrooms: string,
    extras: string[] = [],
    frequency: string = 'oneTime'
): number {
    const basePrice = mockPricingConfig.residential.base[bedrooms as keyof typeof mockPricingConfig.residential.base] || 0;

    const extrasTotal = extras.reduce((sum, extra) => {
        return sum + (mockPricingConfig.residential.extras[extra as keyof typeof mockPricingConfig.residential.extras] || 0);
    }, 0);

    const subtotal = basePrice + extrasTotal;
    const frequencyMultiplier = mockPricingConfig.frequency[frequency as keyof typeof mockPricingConfig.frequency] || 1.0;

    return Math.round(subtotal * frequencyMultiplier);
}

function calculateCommercialPrice(
    size: string,
    sqft: number = 0,
    frequency: string = 'oneTime'
): number {
    let basePrice = mockPricingConfig.commercial.base[size as keyof typeof mockPricingConfig.commercial.base] || 0;

    if (sqft > 0) {
        basePrice += sqft * mockPricingConfig.commercial.perSqFt;
    }

    const frequencyMultiplier = mockPricingConfig.frequency[frequency as keyof typeof mockPricingConfig.frequency] || 1.0;

    return Math.round(basePrice * frequencyMultiplier);
}

function applyPromoCode(price: number, code: string): { price: number; discount: number } {
    const promoCodes: Record<string, number> = {
        'FIRST10': 0.10,
        'SUMMER20': 0.20,
        'VIP25': 0.25
    };

    const discount = promoCodes[code] || 0;
    const finalPrice = Math.round(price * (1 - discount));

    return {
        price: finalPrice,
        discount: Math.round(price * discount)
    };
}

// Tests
describe('calculateResidentialPrice', () => {
    it('should calculate base price for studio', () => {
        expect(calculateResidentialPrice('studio')).toBe(80);
    });

    it('should calculate base price for different bedroom counts', () => {
        expect(calculateResidentialPrice('oneBed')).toBe(100);
        expect(calculateResidentialPrice('twoBed')).toBe(120);
        expect(calculateResidentialPrice('threeBed')).toBe(150);
        expect(calculateResidentialPrice('fourPlusBed')).toBe(180);
    });

    it('should add extras to base price', () => {
        expect(calculateResidentialPrice('studio', ['deepCleaning'])).toBe(130); // 80 + 50
        expect(calculateResidentialPrice('oneBed', ['windows', 'oven'])).toBe(155); // 100 + 30 + 25
    });

    it('should apply frequency discount for weekly', () => {
        expect(calculateResidentialPrice('oneBed', [], 'weekly')).toBe(85); // 100 * 0.85
    });

    it('should apply frequency discount for biweekly', () => {
        expect(calculateResidentialPrice('oneBed', [], 'biweekly')).toBe(90); // 100 * 0.90
    });

    it('should apply frequency discount for monthly', () => {
        expect(calculateResidentialPrice('oneBed', [], 'monthly')).toBe(95); // 100 * 0.95
    });

    it('should calculate complex pricing with extras and frequency', () => {
        // 120 (base) + 50 (deep) + 30 (windows) = 200 * 0.85 (weekly) = 170
        expect(calculateResidentialPrice('twoBed', ['deepCleaning', 'windows'], 'weekly')).toBe(170);
    });

    it('should handle multiple extras', () => {
        const price = calculateResidentialPrice('threeBed', ['deepCleaning', 'windows', 'oven', 'fridge']);
        expect(price).toBe(275); // 150 + 50 + 30 + 25 + 20
    });
});

describe('calculateCommercialPrice', () => {
    it('should calculate base price for small commercial', () => {
        expect(calculateCommercialPrice('small')).toBe(150);
    });

    it('should calculate base price for different sizes', () => {
        expect(calculateCommercialPrice('medium')).toBe(250);
        expect(calculateCommercialPrice('large')).toBe(400);
    });

    it('should add square footage charge', () => {
        expect(calculateCommercialPrice('small', 1000)).toBe(300); // 150 + (1000 * 0.15)
    });

    it('should apply frequency discount', () => {
        expect(calculateCommercialPrice('medium', 0, 'weekly')).toBe(213); // 250 * 0.85
    });

    it('should calculate complex pricing with sqft and frequency', () => {
        // 400 (base) + (500 * 0.15) = 475 * 0.90 (biweekly) = 428
        expect(calculateCommercialPrice('large', 500, 'biweekly')).toBe(428);
    });
});

describe('applyPromoCode', () => {
    it('should apply 10% discount for FIRST10', () => {
        const result = applyPromoCode(100, 'FIRST10');
        expect(result.price).toBe(90);
        expect(result.discount).toBe(10);
    });

    it('should apply 20% discount for SUMMER20', () => {
        const result = applyPromoCode(200, 'SUMMER20');
        expect(result.price).toBe(160);
        expect(result.discount).toBe(40);
    });

    it('should apply 25% discount for VIP25', () => {
        const result = applyPromoCode(100, 'VIP25');
        expect(result.price).toBe(75);
        expect(result.discount).toBe(25);
    });

    it('should return original price for invalid code', () => {
        const result = applyPromoCode(100, 'INVALID');
        expect(result.price).toBe(100);
        expect(result.discount).toBe(0);
    });

    it('should handle large prices', () => {
        const result = applyPromoCode(1000, 'SUMMER20');
        expect(result.price).toBe(800);
        expect(result.discount).toBe(200);
    });
});

describe('Pricing Edge Cases', () => {
    it('should handle zero price', () => {
        const result = applyPromoCode(0, 'FIRST10');
        expect(result.price).toBe(0);
        expect(result.discount).toBe(0);
    });

    it('should round prices correctly', () => {
        // 155 * 0.85 = 131.75, should round to 132
        expect(calculateResidentialPrice('oneBed', ['windows', 'oven'], 'weekly')).toBe(132);
    });

    it('should handle empty extras array', () => {
        expect(calculateResidentialPrice('studio', [])).toBe(80);
    });

    it('should handle invalid bedroom type', () => {
        expect(calculateResidentialPrice('invalid')).toBe(0);
    });

    it('should handle invalid frequency', () => {
        expect(calculateResidentialPrice('oneBed', [], 'invalid')).toBe(100);
    });
});
