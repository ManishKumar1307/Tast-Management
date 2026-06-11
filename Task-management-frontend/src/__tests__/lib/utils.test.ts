import { describe, it, expect } from '@jest/globals';
import { formatDate, getPriorityColor, getStatusColor, isOverdue } from '@/lib/utils';

describe('Utils', () => {
    describe('formatDate', () => {
        it('should format date correctly', () => {
            const date = '2024-12-25';
            const result = formatDate(date);
            expect(result).toContain('Dec');
            expect(result).toContain('25');
        });

        it('should handle different date formats', () => {
            const date = new Date('2024-12-25').toISOString();
            const result = formatDate(date);
            expect(result).toBeDefined();
        });
    });

    describe('getPriorityColor', () => {
        it('should return correct color for low priority', () => {
            const color = getPriorityColor('low');
            expect(color).toContain('slate');
        });

        it('should return correct color for medium priority', () => {
            const color = getPriorityColor('medium');
            expect(color).toContain('accent');
        });

        it('should return correct color for high priority', () => {
            const color = getPriorityColor('high');
            expect(color).toContain('red');
        });

        it('should return default color for unknown priority', () => {
            const color = getPriorityColor('unknown');
            expect(color).toBeDefined();
        });
    });

    describe('getStatusColor', () => {
        it('should return correct color for pending status', () => {
            const color = getStatusColor('pending');
            expect(color).toContain('slate');
        });

        it('should return correct color for in-progress status', () => {
            const color = getStatusColor('in-progress');
            expect(color).toContain('blue');
        });

        it('should return correct color for completed status', () => {
            const color = getStatusColor('completed');
            expect(color).toContain('green');
        });
    });

    describe('isOverdue', () => {
        it('should return false for future dates', () => {
            const futureDate = new Date();
            futureDate.setDate(futureDate.getDate() + 1);
            const result = isOverdue(futureDate.toISOString().split('T')[0]);
            expect(result).toBe(false);
        });

        it('should return true for past dates', () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1);
            const result = isOverdue(pastDate.toISOString().split('T')[0]);
            expect(result).toBe(true);
        });

        it('should return false for null date', () => {
            const result = isOverdue(null);
            expect(result).toBe(false);
        });
    });
});
