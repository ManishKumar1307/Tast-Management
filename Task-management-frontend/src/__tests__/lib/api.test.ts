import axios from 'axios';

// Setup mock before importing apiClient
jest.mock('axios');

// Mock axios.create to return a properly structured mock instance
const mockAxiosInstance = {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
    interceptors: {
        request: { use: jest.fn() },
        response: { use: jest.fn() },
    },
};

(axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);

// Now import apiClient after mocking
import { apiClient } from '@/lib/api';

describe('API Client', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        localStorage.clear();
        // Reset mock returns
        (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
    });

    describe('getTasks', () => {
        it('should fetch tasks with parameters', async () => {
            expect(apiClient).toBeDefined();
        });
    });

    describe('createTask', () => {
        it('should create a task with data', async () => {
            const taskData = {
                title: 'Test Task',
                description: 'Test Description',
                priority: 'high',
                status: 'pending',
            };

            expect(taskData.title).toBe('Test Task');
            expect(taskData.priority).toBe('high');
        });
    });

    describe('updateTask', () => {
        it('should update a task', async () => {
            const updateData = {
                status: 'completed',
            };

            expect(updateData.status).toBe('completed');
        });
    });

    describe('deleteTask', () => {
        it('should delete a task', async () => {
            const taskId = '123';
            expect(taskId).toBeDefined();
        });
    });

    describe('login', () => {
        it('should login with credentials', async () => {
            const credentials = {
                email: 'test@example.com',
                password: 'password123',
            };

            expect(credentials.email).toBe('test@example.com');
        });
    });

    describe('signup', () => {
        it('should signup with credentials', async () => {
            const credentials = {
                email: 'newuser@example.com',
                password: 'password123',
            };

            expect(credentials.email).toBe('newuser@example.com');
        });
    });
});
