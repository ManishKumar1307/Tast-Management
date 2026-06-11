export interface User {
    id: string;
    email: string;
}

export interface Task {
    id: string;
    user_id: string;
    title: string;
    description: string;
    status: TaskStatus;
    priority: TaskPriority;
    due_date: string | null;
    created_at: string;
    updated_at: string;
}

export type TaskStatus = 'pending' | 'in-progress' | 'completed';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface TasksResponse {
    tasks: Task[];
    total: number;
    page: number;
    limit: number;
}

export interface AuthResponse {
    token: string;
    user: User;
}

export interface ApiError {
    error: string;
    errors?: Array<{ msg: string; param: string }>;
}
