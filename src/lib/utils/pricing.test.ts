import { describe, it, expect } from 'vitest';
import { calculateTotal, calculateBasePrice } from './pricing';
import { WizardData } from '@/lib/schemas/wizard';

describe('Pricing Logic', () => {
    describe('calculateBasePrice', () => {
        it('calculates standard residential base price correctly', () => {
            // Base = 100 + (1*20) + (1*30) + (1000/1000 * 15) = 100 + 20 + 30 + 15 = 165
            const price = calculateBasePrice(1, 1, 1000, 'regular');
            expect(price).toBe(165);
        });

        it('applies deep cleaning multiplier (1.5x)', () => {
            // 165 * 1.5 = 247.5
            const price = calculateBasePrice(1, 1, 1000, 'deep');
            expect(price).toBe(247.5);
        });

        it('applies move-in/out multiplier (1.8x)', () => {
            // 165 * 1.8 = 297
            const price = calculateBasePrice(1, 1, 1000, 'move');
            expect(price).toBe(297);
        });
    });

    describe('calculateTotal', () => {
        it('applies weekly frequency discount (20%)', () => {
            const data: WizardData = {
                serviceType: 'residential',
                bedrooms: 1,
                bathrooms: 1,
                sqFt: 1000,
                cleaningType: 'regular',
                frequency: 'weekly',
                zipCode: '99201',
                city: 'Spokane',
                state: 'WA',
                step: 4,
                smallPortfolio: []
            };
            // Base 165 * (1 - 0.20) = 165 * 0.8 = 132
            expect(calculateTotal(data)).toBe(132);
        });

        it('applies monthly frequency discount (10%)', () => {
            const data: WizardData = {
                serviceType: 'residential',
                bedrooms: 1,
                bathrooms: 1,
                sqFt: 1000,
                cleaningType: 'regular',
                frequency: 'monthly',
                zipCode: '99201',
                city: 'Spokane',
                state: 'WA',
                step: 4,
                smallPortfolio: []
            };
            // Base 165 * (1 - 0.10) = 165 * 0.9 = 148.5 -> rounded to 149
            expect(calculateTotal(data)).toBe(149);
        });

        it('handles commercial per sqft pricing', () => {
            const data: WizardData = {
                serviceType: 'commercial',
                commSqFt: '2000',
                zipCode: '99201',
                frequency: 'weekly',
                step: 4
            } as any;
            // 2000 * 0.12 = 240. Max(150, 240) = 240
            expect(calculateTotal(data)).toBe(240);
        });

        it('enforces minimum commercial price', () => {
            const data: WizardData = {
                serviceType: 'commercial',
                commSqFt: '500',
                zipCode: '99201',
                frequency: 'weekly',
                step: 4
            } as any;
            // 500 * 0.12 = 60. Max(150, 60) = 150
            expect(calculateTotal(data)).toBe(150);
        });
    });
});
