'use client';

import { Button } from './Button';

interface PaginationProps {
    page: number;
    limit: number;
    total: number;
    onPageChange: (page: number) => void;
}

export function Pagination({
    page,
    limit,
    total,
    onPageChange,
}: PaginationProps) {
    const totalPages = Math.ceil(total / limit);
    const startItem = (page - 1) * limit + 1;
    const endItem = Math.min(page * limit, total);

    if (totalPages <= 1) return null;

    return (
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
            <div className="text-sm text-slate-600">
                Showing {startItem} to {endItem} of {total} tasks
            </div>

            <div className="flex gap-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page - 1)}
                    disabled={page === 1}
                >
                    Previous
                </Button>

                <div className="flex items-center gap-1">
                    {[...Array(totalPages)].map((_, i) => {
                        const pageNum = i + 1;
                        const isCurrentPage = pageNum === page;

                        if (totalPages > 7) {
                            if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= page - 1 && pageNum <= page + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => onPageChange(pageNum)}
                                        className={`px-3 py-1 rounded text-sm font-medium transition-colors ${isCurrentPage
                                                ? 'bg-primary-600 text-white'
                                                : 'text-slate-600 hover:bg-slate-100'
                                            }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (
                                (pageNum === page - 2 && pageNum > 1) ||
                                (pageNum === page + 2 && pageNum < totalPages)
                            ) {
                                return (
                                    <span key={pageNum} className="text-slate-400">
                                        ...
                                    </span>
                                );
                            }
                        } else {
                            return (
                                <button
                                    key={pageNum}
                                    onClick={() => onPageChange(pageNum)}
                                    className={`px-3 py-1 rounded text-sm font-medium transition-colors ${isCurrentPage
                                            ? 'bg-primary-600 text-white'
                                            : 'text-slate-600 hover:bg-slate-100'
                                        }`}
                                >
                                    {pageNum}
                                </button>
                            );
                        }
                    })}
                </div>

                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onPageChange(page + 1)}
                    disabled={page === totalPages}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}
