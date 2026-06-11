'use client';

import { Input, Select } from './Input';
import { Button } from './Button';

interface TaskFiltersProps {
    filters: {
        status: string;
        priority?: string;
        search: string;
        sortBy: string;
        sortOrder: 'asc' | 'desc';
    };
    onFiltersChange: (filters: any) => void;
}

export function TaskFilters({ filters, onFiltersChange }: TaskFiltersProps) {
    const handleSearchChange = (search: string) => {
        onFiltersChange({ ...filters, search, page: 1 });
    };

    const handleStatusChange = (status: string) => {
        onFiltersChange({ ...filters, status, page: 1 });
    };

    const handleSortChange = (sortBy: string) => {
        onFiltersChange({ ...filters, sortBy, page: 1 });
    };

    const handleSortOrderChange = () => {
        onFiltersChange({
            ...filters,
            sortOrder: filters.sortOrder === 'asc' ? 'desc' : 'asc',
        });
    };

    const handleReset = () => {
        onFiltersChange({
            status: '',
            search: '',
            sortBy: 'created_at',
            sortOrder: 'desc',
            page: 1,
        });
    };

    const isFiltered = filters.search || filters.status || filters.sortBy !== 'created_at';

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5 space-y-4">
            <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-slate-900">Filters & Sort</h3>
                {isFiltered && (
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleReset}
                    >
                        Reset
                    </Button>
                )}
            </div>

            <Input
                placeholder="Search tasks by title..."
                value={filters.search}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="flex-1"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Select
                    label="Status"
                    value={filters.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    options={[
                        { value: '', label: 'All Statuses' },
                        { value: 'pending', label: 'Pending' },
                        { value: 'in-progress', label: 'In Progress' },
                        { value: 'completed', label: 'Completed' },
                    ]}
                />

                <Select
                    label="Sort By"
                    value={filters.sortBy}
                    onChange={(e) => handleSortChange(e.target.value)}
                    options={[
                        { value: 'created_at', label: 'Date Created' },
                        { value: 'due_date', label: 'Due Date' },
                        { value: 'priority', label: 'Priority' },
                    ]}
                />

                <div className="flex items-end">
                    <Button
                        variant="outline"
                        onClick={handleSortOrderChange}
                        className="w-full"
                    >
                        {filters.sortOrder === 'asc' ? 'Ascending' : 'Descending'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
