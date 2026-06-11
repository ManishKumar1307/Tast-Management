'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuthStore } from '@/lib/store';
import { Button } from '@/components';

export default function Home() {
    const router = useRouter();
    const { user, hydrate } = useAuthStore();

    useEffect(() => {
        hydrate();
    }, [hydrate]);

    useEffect(() => {
        if (user) {
            router.push('/tasks');
        }
    }, [user, router]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-900 via-primary-900 to-slate-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="text-center space-y-8">
                    <div className="space-y-4">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-accent-400 to-primary-600 rounded-2xl">
                            <span className="text-white font-bold text-3xl">TM</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-bold text-white">
                            TaskMaster

                        </h1>

                        <p className="text-xl text-slate-200 max-w-2xl mx-auto">
                            Take control of your productivity. Create, organize, and complete
                            tasks with ease using our intuitive task management platform.
                        </p>
                    </div>

                    <div className="flex gap-4 justify-center pt-8">
                        <Link href="/login">
                            <Button variant="primary" size="lg">
                                Sign In
                            </Button>
                        </Link>

                        <Link href="/signup">
                            <Button variant="outline" size="lg" className="text-white border-white hover:bg-white hover:bg-opacity-10">
                                Create Account
                            </Button>
                        </Link>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 pt-20">
                        <div className="bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-lg p-6">
                            <div className="text-3xl mb-3 text-white">Organize</div>
                            <p className="text-slate-200">
                                Categorize tasks by status and priority
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-lg p-6">
                            <div className="text-3xl mb-3 text-white">Track</div>
                            <p className="text-slate-200">
                                Monitor progress and due dates
                            </p>
                        </div>

                        <div className="bg-white bg-opacity-10 backdrop-blur border border-white border-opacity-20 rounded-lg p-6">
                            <div className="text-3xl mb-3 text-white">Achieve</div>
                            <p className="text-slate-200">
                                Complete tasks and boost productivity
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
