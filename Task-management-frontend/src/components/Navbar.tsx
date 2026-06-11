'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';
import { useEffect, useState } from 'react';

export function Navbar() {
    const router = useRouter();
    const { user, logout } = useAuthStore();
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleLogout = () => {
        logout();
        router.push('/login');
    };

    if (!isClient) return null;

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-card">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">TM</span>
                        </div>
                        <span className="font-semibold text-slate-900 text-lg">TaskMaster</span>
                    </Link>

                    <div className="flex items-center gap-6">
                        {user ? (
                            <>
                                <div className="text-sm text-slate-600">
                                    {user.email}
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="text-sm font-medium text-slate-600 hover:text-primary-600 transition-colors"
                                >
                                    Login
                                </Link>
                                <Link
                                    href="/signup"
                                    className="px-4 py-2 text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 rounded-lg transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
