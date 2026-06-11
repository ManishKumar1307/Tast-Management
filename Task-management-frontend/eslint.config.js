import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import nextPlugin from '@next/eslint-plugin-next';

/** @type {import('eslint').Linter.Config[]} */
export default [
    { ignores: ['node_modules', '.next'] },
    {
        files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'],
        languageOptions: {
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: globals.browser,
        },
        plugins: {
            react,
            'react-hooks': reactHooks,
            '@next/next': nextPlugin,
        },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...nextPlugin.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/prop-types': 'off',
            'react-hooks/rules-of-hooks': 'error',
        },
    },
];
