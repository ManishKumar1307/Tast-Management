'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Input, Button } from '@/components';
import { apiClient } from '@/lib/api';
import { useAuthStore } from '@/lib/store';

export default function LoginPage() {
    const router = useRouter();
    const { setUser, user } = useAuthStore();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (user) {
            router.push('/tasks');
        }
    }, [user, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const { token, user: userData } = await apiClient.login(email, password);
            setUser(userData, token);
            router.push('/tasks');
        } catch (err: any) {
            setError(err.response?.data?.error || 'Login failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-xl mb-4">
                            <span className="text-white font-bold text-xl">TM</span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Welcome Back</h1>
                        <p className="text-slate-600 mt-2">Sign in to your TaskMaster account</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                            <p className="text-red-700 text-sm">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <Input
                            label="Email"
                            type="email"
                            placeholder="your@email.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <Input
                            label="Password"
                            type="password"
                            placeholder="Your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            className="w-full"
                            isLoading={isLoading}
                        >
                            Sign In
                        </Button>
                    </form>

                    <p className="text-center text-slate-600 text-sm mt-6">
                        Don't have an account?{' '}
                        <Link
                            href="/signup"
                            className="text-primary-600 hover:text-primary-700 font-medium"
                        >
                            Sign up here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
