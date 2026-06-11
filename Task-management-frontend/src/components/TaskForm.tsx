'use client';

import { useState } from 'react';
import { Task, TaskPriority, TaskStatus } from '@/types';
import { Button } from './Button';
import { Input, Textarea, Select } from './Input';
import { formatDateInput } from '@/lib/utils';

interface TaskFormProps {
    task?: Task;
    onSubmit: (data: any) => Promise<void>;
    onCancel: () => void;
    isLoading?: boolean;
}

export function TaskForm({ task, onSubmit, onCancel, isLoading = false }: TaskFormProps) {
    const [formData, setFormData] = useState({
        title: task?.title || '',
        description: task?.description || '',
        status: task?.status || 'pending',
        priority: task?.priority || 'medium',
        due_date: task?.due_date ? formatDateInput(task.due_date) : '',
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (formData.due_date && new Date(formData.due_date) < new Date()) {
            // Allow past dates for editing
            if (!task) {
                newErrors.due_date = 'Due date cannot be in the past';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        await onSubmit({
            ...formData,
            due_date: formData.due_date || null,
        });
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Title"
                placeholder="Enter task title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                error={errors.title}
                required
            />

            <Textarea
                label="Description"
                placeholder="Enter task description (optional)"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={4}
            />

            <div className="grid grid-cols-2 gap-4">
                <Select
                    label="Priority"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as TaskPriority })}
                    options={[
                        { value: 'low', label: 'Low' },
                        { value: 'medium', label: 'Medium' },
                        { value: 'high', label: 'High' },
                    ]}
                />

                <Select
                    label="Status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as TaskStatus })}
                    options={[
                        { value: 'pending', label: 'Pending' },
                        { value: 'in-progress', label: 'In Progress' },
                        { value: 'completed', label: 'Completed' },
                    ]}
                />
            </div>

            <Input
                type="date"
                label="Due Date"
                value={formData.due_date}
                onChange={(e) => setFormData({ ...formData, due_date: e.target.value })}
                error={errors.due_date}
            />

            <div className="flex gap-3 justify-end">
                <Button
                    type="button"
                    variant="outline"
                    onClick={onCancel}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    variant="primary"
                    isLoading={isLoading}
                >
                    {task ? 'Update Task' : 'Create Task'}
                </Button>
            </div>
        </form>
    );
}
