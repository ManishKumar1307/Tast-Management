import type { Metadata } from 'next';
import { Navbar } from '@/components/Navbar';
import './globals.css';

export const metadata: Metadata = {
    title: 'TaskMaster - Task Management',
    description: 'Organize and manage your tasks efficiently',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className="bg-slate-50">
                <Navbar />
                {children}
            </body>
        </html>
    );
}
