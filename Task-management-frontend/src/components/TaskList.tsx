'use client';

import { Task } from '@/types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
    tasks: Task[];
    onEdit: (task: Task) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: string) => void;
    isDeleting?: Record<string, boolean>;
    isLoading?: boolean;
    isEmpty?: boolean;
}

export function TaskList({
    tasks,
    onEdit,
    onDelete,
    onStatusChange,
    isDeleting = {},
    isLoading = false,
    isEmpty = false,
}: TaskListProps) {
    if (isLoading) {
        return (
            <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                    <div
                        key={i}
                        className="bg-slate-100 h-32 rounded-lg animate-pulse"
                    />
                ))}
            </div>
        );
    }

    if (isEmpty) {
        return (
            <div className="text-center py-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-4">
                    <svg
                        className="w-8 h-8 text-slate-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">
                    No tasks found
                </h3>
                <p className="text-slate-500">
                    Create a new task to get started
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <TaskCard
                    key={task.id}
                    task={task}
                    onEdit={onEdit}
                    onDelete={onDelete}
                    onStatusChange={onStatusChange}
                    isDeleting={isDeleting[task.id]}
                />
            ))}
        </div>
    );
}
