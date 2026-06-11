'use client';

import { cn } from '@/lib/utils';
import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Input({
    label,
    error,
    helperText,
    className,
    ...props
}: InputProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <input
                className={cn(
                    'w-full px-4 py-2.5 border rounded-lg text-slate-900 placeholder-slate-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    'transition-colors',
                    error
                        ? 'border-red-300 bg-red-50'
                        : 'border-slate-300 bg-white hover:border-slate-400',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {helperText && !error && (
                <p className="mt-1 text-sm text-slate-500">{helperText}</p>
            )}
        </div>
    );
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    label?: string;
    error?: string;
    helperText?: string;
}

export function Textarea({
    label,
    error,
    helperText,
    className,
    ...props
}: TextareaProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <textarea
                className={cn(
                    'w-full px-4 py-2.5 border rounded-lg text-slate-900 placeholder-slate-400',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    'transition-colors resize-vertical',
                    error
                        ? 'border-red-300 bg-red-50'
                        : 'border-slate-300 bg-white hover:border-slate-400',
                    className
                )}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {helperText && !error && (
                <p className="mt-1 text-sm text-slate-500">{helperText}</p>
            )}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
    helperText?: string;
    options: Array<{ value: string; label: string }>;
}

export function Select({
    label,
    error,
    helperText,
    options,
    className,
    ...props
}: SelectProps) {
    return (
        <div className="w-full">
            {label && (
                <label className="block text-sm font-medium text-slate-700 mb-1.5">
                    {label}
                </label>
            )}
            <select
                className={cn(
                    'w-full px-4 py-2.5 border rounded-lg text-slate-900 bg-white',
                    'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent',
                    'transition-colors cursor-pointer appearance-none',
                    error
                        ? 'border-red-300 bg-red-50'
                        : 'border-slate-300 hover:border-slate-400',
                    className
                )}
                {...props}
            >
                <option value="">Select an option</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
            {helperText && !error && (
                <p className="mt-1 text-sm text-slate-500">{helperText}</p>
            )}
        </div>
    );
}
