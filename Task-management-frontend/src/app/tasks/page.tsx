'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Task } from '@/types';
import {
    TaskForm,
    TaskList,
    TaskFilters,
    Pagination,
    Button,
} from '@/components';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function TasksPage() {
    const router = useRouter();
    const { user, hydrate } = useAuthStore();
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [deleting, setDeleting] = useState<Record<string, boolean>>({});
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [error, setError] = useState('');
    const [total, setTotal] = useState(0);

    const [filters, setFilters] = useState({
        page: 1,
        limit: 10,
        status: '',
        search: '',
        sortBy: 'created_at',
        sortOrder: 'desc' as const,
    });

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    useEffect(() => {
        if (!user) {
            router.push('/login');
            return;
        }

        loadTasks();
    }, [user, router, filters]);

    const loadTasks = async () => {
        try {
            setIsLoading(true);
            setError('');
            const response = await apiClient.getTasks(
                filters.page,
                filters.limit,
                filters.status || undefined,
                filters.search || undefined,
                filters.sortBy,
                filters.sortOrder
            );
            setTasks(response.tasks);
            setTotal(response.total);
        } catch (err: any) {
            setError('Failed to load tasks');
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSubmitForm = async (data: any) => {
        try {
            setIsSubmitting(true);
            setError('');

            if (editingTask) {
                await apiClient.updateTask(editingTask.id, data);
            } else {
                await apiClient.createTask(data);
            }

            setShowForm(false);
            setEditingTask(null);
            setFilters({ ...filters, page: 1 });
            await loadTasks();
        } catch (err: any) {
            setError(err.response?.data?.error || 'Failed to save task');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this task?')) return;

        try {
            setDeleting({ ...deleting, [id]: true });
            await apiClient.deleteTask(id);
            await loadTasks();
        } catch (err) {
            setError('Failed to delete task');
        } finally {
            setDeleting({ ...deleting, [id]: false });
        }
    };

    const handleStatusChange = async (id: string, currentStatus: string) => {
        try {
            const task = tasks.find((t) => t.id === id);
            if (!task) return;

            const newStatus =
                currentStatus === 'completed'
                    ? 'pending'
                    : currentStatus === 'pending'
                        ? 'in-progress'
                        : 'completed';

            await apiClient.updateTask(id, { status: newStatus });
            await loadTasks();
        } catch (err) {
            setError('Failed to update task status');
        }
    };

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900">My Tasks</h1>
                        <p className="text-slate-600 mt-2">
                            Manage and organize your tasks efficiently
                        </p>
                    </div>

                    <Button
                        variant="primary"
                        onClick={() => {
                            setEditingTask(null);
                            setShowForm(!showForm);
                        }}
                    >
                        {showForm ? 'Cancel' : 'New Task'}
                    </Button>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-700">{error}</p>
                    </div>
                )}

                {showForm && (
                    <div className="mb-8 bg-white border border-slate-200 rounded-lg p-6 shadow-card animate-slide-up">
                        <h2 className="text-xl font-semibold text-slate-900 mb-6">
                            {editingTask ? 'Edit Task' : 'Create New Task'}
                        </h2>
                        <TaskForm
                            task={editingTask || undefined}
                            onSubmit={handleSubmitForm}
                            onCancel={() => {
                                setShowForm(false);
                                setEditingTask(null);
                            }}
                            isLoading={isSubmitting}
                        />
                    </div>
                )}

                <div className="space-y-6">
                    <TaskFilters
                        filters={filters}
                        onFiltersChange={setFilters}
                    />

                    <TaskList
                        tasks={tasks}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                        onStatusChange={handleStatusChange}
                        isDeleting={deleting}
                        isLoading={isLoading}
                        isEmpty={!isLoading && tasks.length === 0}
                    />

                    {tasks.length > 0 && (
                        <Pagination
                            page={filters.page}
                            limit={filters.limit}
                            total={total}
                            onPageChange={(page) => setFilters({ ...filters, page })}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}
