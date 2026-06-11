import { create } from 'zustand';
import { User } from '@/types';

interface AuthStore {
    user: User | null;
    token: string | null;
    isLoading: boolean;
    error: string | null;
    setUser: (user: User | null, token?: string) => void;
    logout: () => void;
    setError: (error: string | null) => void;
    setLoading: (loading: boolean) => void;
    hydrate: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    token: null,
    isLoading: false,
    error: null,
    setUser: (user, token) => {
        if (typeof window !== 'undefined') {
            if (user && token) {
                localStorage.setItem('authToken', token);
                localStorage.setItem('user', JSON.stringify(user));
            }
        }
        set({ user, token });
    },
    logout: () => {
        if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            localStorage.removeItem('user');
        }
        set({ user: null, token: null });
    },
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ isLoading: loading }),
    hydrate: () => {
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            const userStr = localStorage.getItem('user');
            if (token && userStr) {
                try {
                    const user = JSON.parse(userStr);
                    set({ user, token });
                } catch (e) {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('user');
                }
            }
        }
    },
}));
