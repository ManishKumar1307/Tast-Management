export function cn(...classes: (string | undefined | null | false)[]): string {
    return classes.filter(Boolean).join(' ');
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

export function formatDateInput(date: string | null): string {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
}

export function getPriorityColor(priority: string): string {
    const colors: Record<string, string> = {
        low: 'bg-slate-100 text-slate-700 border-slate-200',
        medium: 'bg-accent-100 text-accent-700 border-accent-200',
        high: 'bg-red-100 text-red-700 border-red-200',
    };
    return colors[priority] || colors.medium;
}

export function getStatusColor(status: string): string {
    const colors: Record<string, string> = {
        pending: 'bg-slate-100 text-slate-700 border-slate-200',
        'in-progress': 'bg-blue-100 text-blue-700 border-blue-200',
        completed: 'bg-green-100 text-green-700 border-green-200',
    };
    return colors[status] || colors.pending;
}

export function getStatusLabel(status: string): string {
    const labels: Record<string, string> = {
        pending: 'Pending',
        'in-progress': 'In Progress',
        completed: 'Completed',
    };
    return labels[status] || status;
}

export function getPriorityLabel(priority: string): string {
    const labels: Record<string, string> = {
        low: 'Low',
        medium: 'Medium',
        high: 'High',
    };
    return labels[priority] || priority;
}

export function isOverdue(dueDate: string | null): boolean {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due < today;
}

export function isDueToday(dueDate: string | null): boolean {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return due.getTime() === today.getTime();
}

export function isDueSoon(dueDate: string | null): boolean {
    if (!dueDate) return false;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    const diff = (due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 3;
}
