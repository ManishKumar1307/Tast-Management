import axios, { AxiosInstance } from 'axios';
import { AuthResponse, Task, TasksResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class ApiClient {
    private client: AxiosInstance;

    constructor() {
        this.client = axios.create({
            baseURL: API_BASE_URL,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Add request interceptor to include auth token
        this.client.interceptors.request.use((config) => {
            const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });
    }

    // Auth endpoints
    async signup(email: string, password: string): Promise<AuthResponse> {
        const response = await this.client.post('/auth/signup', { email, password });
        return response.data;
    }

    async login(email: string, password: string): Promise<AuthResponse> {
        const response = await this.client.post('/auth/login', { email, password });
        return response.data;
    }

    // Task endpoints
    async getTasks(
        page: number = 1,
        limit: number = 10,
        status?: string,
        search?: string,
        sortBy: string = 'created_at',
        sortOrder: 'asc' | 'desc' = 'desc'
    ): Promise<TasksResponse> {
        const response = await this.client.get('/tasks', {
            params: {
                page,
                limit,
                ...(status && { status }),
                ...(search && { search }),
                sortBy,
                sortOrder,
            },
        });
        return response.data;
    }

    async getTask(id: string): Promise<Task> {
        const response = await this.client.get(`/tasks/${id}`);
        return response.data;
    }

    async createTask(data: {
        title: string;
        description?: string;
        status?: string;
        priority?: string;
        due_date?: string;
    }): Promise<Task> {
        const response = await this.client.post('/tasks', data);
        return response.data;
    }

    async updateTask(id: string, data: Partial<Task>): Promise<Task> {
        const response = await this.client.patch(`/tasks/${id}`, data);
        return response.data;
    }

    async deleteTask(id: string): Promise<void> {
        await this.client.delete(`/tasks/${id}`);
    }
}

export const apiClient = new ApiClient();
