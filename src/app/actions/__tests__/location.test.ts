import { describe, it, expect, beforeEach, vi } from 'vitest';

// Mock data
const mockServiceAreas = [
    { id: 1, zipCode: '00600', city: 'Naguanagua', status: 'active' as const },
    { id: 2, zipCode: '00601', city: 'Valencia', status: 'active' as const },
    { id: 3, zipCode: '00602', city: 'San Diego', status: 'coming_soon' as const },
];

// Mock functions (simulating server actions)
function checkZipAvailability(zip: string) {
    if (!zip) return { status: 'unavailable' as const };

    const area = mockServiceAreas.find(a => a.zipCode === zip);

    if (area) {
        return {
            status: area.status,
            city: area.city || undefined
        };
    }

    return { status: 'unavailable' as const };
}

function getAllServiceAreas() {
    return { success: true, data: mockServiceAreas };
}

function upsertServiceArea(data: { zip: string, status: 'active' | 'coming_soon', city?: string }) {
    try {
        const existing = mockServiceAreas.find(a => a.zipCode === data.zip);

        if (existing) {
            existing.status = data.status;
            existing.city = data.city || existing.city;
        } else {
            mockServiceAreas.push({
                id: mockServiceAreas.length + 1,
                zipCode: data.zip,
                city: data.city || '',
                status: data.status
            });
        }

        return { success: true };
    } catch (error) {
        return { success: false, error: 'Failed to update service area' };
    }
}

function deleteServiceArea(id: number) {
    try {
        const index = mockServiceAreas.findIndex(a => a.id === id);
        if (index > -1) {
            mockServiceAreas.splice(index, 1);
            return { success: true };
        }
        return { success: false, error: 'Area not found' };
    } catch (error) {
        return { success: false, error: 'Failed to delete service area' };
    }
}

// Tests
describe('checkZipAvailability', () => {
    it('should return active status for serviceable zipcode', () => {
        const result = checkZipAvailability('00600');
        expect(result.status).toBe('active');
        expect(result.city).toBe('Naguanagua');
    });

    it('should return coming_soon status for upcoming zipcode', () => {
        const result = checkZipAvailability('00602');
        expect(result.status).toBe('coming_soon');
        expect(result.city).toBe('San Diego');
    });

    it('should return unavailable for non-existent zipcode', () => {
        const result = checkZipAvailability('99999');
        expect(result.status).toBe('unavailable');
        expect(result.city).toBeUndefined();
    });

    it('should return unavailable for empty zipcode', () => {
        const result = checkZipAvailability('');
        expect(result.status).toBe('unavailable');
    });
});

describe('getAllServiceAreas', () => {
    it('should return all service areas', () => {
        const result = getAllServiceAreas();
        expect(result.success).toBe(true);
        expect(result.data).toHaveLength(3);
    });

    it('should return areas with correct structure', () => {
        const result = getAllServiceAreas();
        expect(result.data![0]).toHaveProperty('id');
        expect(result.data![0]).toHaveProperty('zipCode');
        expect(result.data![0]).toHaveProperty('city');
        expect(result.data![0]).toHaveProperty('status');
    });
});

describe('upsertServiceArea', () => {
    beforeEach(() => {
        // Reset mock data
        mockServiceAreas.length = 0;
        mockServiceAreas.push(
            { id: 1, zipCode: '00600', city: 'Naguanagua', status: 'active' },
            { id: 2, zipCode: '00601', city: 'Valencia', status: 'active' },
            { id: 3, zipCode: '00602', city: 'San Diego', status: 'coming_soon' }
        );
    });

    it('should create new service area', () => {
        const result = upsertServiceArea({
            zip: '00603',
            city: 'Guacara',
            status: 'active'
        });

        expect(result.success).toBe(true);
        expect(mockServiceAreas).toHaveLength(4);
        expect(mockServiceAreas[3].zipCode).toBe('00603');
    });

    it('should update existing service area', () => {
        const result = upsertServiceArea({
            zip: '00600',
            city: 'Naguanagua Updated',
            status: 'coming_soon'
        });

        expect(result.success).toBe(true);
        const updated = mockServiceAreas.find(a => a.zipCode === '00600');
        expect(updated?.city).toBe('Naguanagua Updated');
        expect(updated?.status).toBe('coming_soon');
    });

    it('should handle area without city', () => {
        const result = upsertServiceArea({
            zip: '00604',
            status: 'active'
        });

        expect(result.success).toBe(true);
        const newArea = mockServiceAreas.find(a => a.zipCode === '00604');
        expect(newArea).toBeDefined();
    });
});

describe('deleteServiceArea', () => {
    beforeEach(() => {
        // Reset mock data
        mockServiceAreas.length = 0;
        mockServiceAreas.push(
            { id: 1, zipCode: '00600', city: 'Naguanagua', status: 'active' },
            { id: 2, zipCode: '00601', city: 'Valencia', status: 'active' }
        );
    });

    it('should delete existing service area', () => {
        const result = deleteServiceArea(1);
        expect(result.success).toBe(true);
        expect(mockServiceAreas).toHaveLength(1);
        expect(mockServiceAreas.find(a => a.id === 1)).toBeUndefined();
    });

    it('should return error for non-existent area', () => {
        const result = deleteServiceArea(999);
        expect(result.success).toBe(false);
        expect(result.error).toBe('Area not found');
    });

    it('should not affect other areas when deleting', () => {
        deleteServiceArea(1);
        expect(mockServiceAreas.find(a => a.id === 2)).toBeDefined();
    });
});
