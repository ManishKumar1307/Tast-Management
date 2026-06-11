'use client';

import { Task } from '@/types';
import { cn, formatDate, getPriorityColor, getPriorityLabel, getStatusColor, getStatusLabel, isOverdue } from '@/lib/utils';

interface TaskCardProps {
    task: Task;
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
    isDeleting?: boolean;
}

export function TaskCard({
    task,
    onEdit,
    onDelete,
    onStatusChange,
    isDeleting = false,
}: TaskCardProps) {
    const isTaskOverdue = isOverdue(task.due_date) && task.status !== 'completed';

    return (
        <div className="bg-white border border-slate-200 rounded-lg p-5 hover:shadow-card-lg transition-all animate-fade-in hover:border-slate-300">
            <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-semibold text-slate-900 truncate">
                        {task.title}
                    </h3>
                    {task.description && (
                        <p className="text-sm text-slate-600 line-clamp-2 mt-1">
                            {task.description}
                        </p>
                    )}
                </div>
                <div className="flex gap-2">
                    <button
                        onClick={() => onEdit(task)}
                        className="px-3 py-1.5 text-sm font-medium text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                    >
                        Edit
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        disabled={isDeleting}
                        className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                    >
                        {isDeleting ? 'Deleting...' : 'Delete'}
                    </button>
                </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => onStatusChange(task.id, task.status === 'completed' ? 'pending' : 'completed')}
                    className={cn(
                        'inline-block px-3 py-1 text-xs font-medium rounded border transition-colors',
                        getStatusColor(task.status)
                    )}
                >
                    {getStatusLabel(task.status)}
                </button>

                <span
                    className={cn(
                        'inline-block px-3 py-1 text-xs font-medium rounded border',
                        getPriorityColor(task.priority)
                    )}
                >
                    {getPriorityLabel(task.priority)}
                </span>

                {isTaskOverdue && (
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded bg-red-100 text-red-700 border border-red-200">
                        Overdue
                    </span>
                )}
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
                {task.due_date && (
                    <span>Due: {formatDate(task.due_date)}</span>
                )}
                <span>Created: {formatDate(task.created_at)}</span>
            </div>
        </div>
    );
}
