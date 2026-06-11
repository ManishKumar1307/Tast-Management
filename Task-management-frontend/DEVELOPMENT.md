# Development Guide

## Getting Started with Development

### Environment Setup

1. **Install Dependencies**
```bash
npm install
```

2. **Run Development Server**
```bash
npm run dev
```

3. **Access Application**
Open http://localhost:3000 in your browser

### Development Tools

**VS Code Extensions (Recommended)**
- ES7+ React/Redux/React-Native snippets
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- ESLint
- Prettier

## Project Workflow

### 1. Creating a New Component

**File Location**: `src/components/YourComponent.tsx`

```typescript
'use client';

import React from 'react';
import { cn } from '@/lib/utils';

interface YourComponentProps {
  title: string;
  onClick?: () => void;
  className?: string;
}

export function YourComponent({
  title,
  onClick,
  className,
}: YourComponentProps) {
  return (
    <div className={cn('bg-white rounded-lg p-4', className)}>
      <h2 className="text-lg font-semibold">{title}</h2>
      {onClick && (
        <button onClick={onClick} className="mt-4 px-4 py-2 bg-primary-600 text-white rounded">
          Click Me
        </button>
      )}
    </div>
  );
}
```

**Export in `src/components/index.ts`**:
```typescript
export * from '@/components/YourComponent';
```

### 2. Adding a New Page

**File Location**: `src/app/yourpage/page.tsx`

```typescript
'use client';

export default function YourPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold">Your Page</h1>
      {/* Page content */}
    </div>
  );
}
```

### 3. Using the API Client

```typescript
'use client';

import { useEffect, useState } from 'react';
import { apiClient } from '@/lib/api';
import { Task } from '@/types';

export function MyComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      setIsLoading(true);
      const response = await apiClient.getTasks(1, 10);
      setTasks(response.tasks);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to load tasks');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>{task.title}</li>
      ))}
    </ul>
  );
}
```

## Common Development Tasks

### Adding Authentication to a Page

```typescript
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store';

export default function ProtectedPage() {
  const router = useRouter();
  const { user, hydrate } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  return (
    <div>
      <h1>Welcome {user.email}</h1>
    </div>
  );
}
```

### Adding Form Handling

```typescript
'use client';

import { useState } from 'react';
import { Input, Button } from '@/components';

export function MyForm() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Submit logic here
      console.log('Form submitted:', formData);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        value={formData.title}
        onChange={(e) =>
          setFormData({ ...formData, title: e.target.value })
        }
        error={errors.title}
      />

      <Input
        label="Description"
        value={formData.description}
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <Button type="submit" isLoading={isSubmitting}>
        Submit
      </Button>
    </form>
  );
}
```

### Implementing Search/Filter Logic

```typescript
'use client';

import { useState, useEffect } from 'react';

export function FilterableList() {
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
  });

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesStatus =
      filters.status === 'all' || item.status === filters.status;
    const matchesPriority =
      filters.priority === 'all' || item.priority === filters.priority;

    return matchesSearch && matchesStatus && matchesPriority;
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={filters.status}
        onChange={(e) =>
          setFilters({ ...filters, status: e.target.value })
        }
      >
        <option value="all">All</option>
        <option value="pending">Pending</option>
      </select>

      {/* Render filteredItems */}
    </div>
  );
}
```

## Testing

### Running Tests

```bash
npm test
```

### Writing Component Tests

```typescript
// src/components/__tests__/Button.test.tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Button } from '@/components/Button';

describe('Button', () => {
  it('renders with text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('calls onClick when clicked', async () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    await userEvent.click(screen.getByText('Click me'));
    expect(handleClick).toHaveBeenCalled();
  });

  it('applies variant styles', () => {
    render(<Button variant="danger">Delete</Button>);
    const button = screen.getByText('Delete');
    expect(button).toHaveClass('bg-red-600');
  });
});
```

## Building for Production

### Build Process

```bash
# Build the application
npm run build

# Start production server
npm run start
```

### Performance Optimization Checklist

- [ ] Run Lighthouse audit
- [ ] Optimize images
- [ ] Check bundle size: `npm run build` and review output
- [ ] Enable compression on server
- [ ] Set up CDN for static assets
- [ ] Monitor Core Web Vitals

### Environment Configuration

Create `.env.production`:
```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

## Debugging

### Browser DevTools

1. **React Developer Tools**
   - Inspect component hierarchy
   - Check props and state
   - Trace re-renders

2. **Network Tab**
   - Monitor API requests
   - Check response status
   - Verify CORS headers

3. **Console**
   - Check for errors and warnings
   - Use `console.log()` for debugging
   - Try API calls manually

### TypeScript Checking

```bash
# Check for TypeScript errors
npx tsc --noEmit
```

### Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable issues
npm run lint -- --fix
```

## Git Workflow

### Commit Message Format

```
type(scope): subject

- feat: new feature
- fix: bug fix
- docs: documentation
- style: formatting
- refactor: code refactoring
- perf: performance
- test: testing

Example: feat(tasks): add task deletion feature
```

### Useful Commands

```bash
# Check status
git status

# Stage changes
git add .

# Commit changes
git commit -m "feat: add new feature"

# Push to remote
git push origin branch-name

# Create pull request on GitHub
```

## Common Issues & Solutions

### Hot Module Replacement Not Working

```bash
# Clear Next.js cache
rm -rf .next

# Restart dev server
npm run dev
```

### TypeScript Errors

```bash
# Check for type errors
npx tsc --noEmit

# In VS Code, restart TypeScript server
Cmd+Shift+P → "TypeScript: Restart TS Server"
```

### API Connection Issues

```bash
# Check if backend is running
curl http://localhost:5000/health

# Check CORS configuration in backend
# Ensure NEXT_PUBLIC_API_URL is correct in .env.local
```

### Module Resolution Issues

- Ensure path alias is in `tsconfig.json`
- Check `baseUrl` and `paths` configuration
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`

## Performance Monitoring

### Metrics to Track

- **FCP** (First Contentful Paint): < 1.8s
- **LCP** (Largest Contentful Paint): < 2.5s
- **CLS** (Cumulative Layout Shift): < 0.1
- **Time to Interactive**: < 3.8s

### Tools

- Lighthouse (Chrome DevTools)
- Web Vitals library
- Vercel Analytics
- Sentry for error tracking

## Resources for Developers

- [Next.js Documentation](https://nextjs.org/docs)
- [React Hooks API](https://react.dev/reference/react)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Zustand Documentation](https://github.com/pmndrs/zustand)
- [Axios Documentation](https://axios-http.com/docs/intro)

## Code Style Guide

### Naming Conventions

- **Components**: PascalCase (e.g., `TaskCard`)
- **Functions**: camelCase (e.g., `handleSubmit`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_TASKS`)
- **CSS Classes**: kebab-case (Tailwind default)

### File Organization

```
Feature/
├── components/
│   ├── FeatureCard.tsx
│   ├── FeatureForm.tsx
│   └── FeatureList.tsx
├── hooks/
│   └── useFeature.ts
├── types/
│   └── feature.ts
└── utils/
    └── featureHelpers.ts
```

### Import Order

```typescript
// External libraries
import React from 'react';
import { useRouter } from 'next/navigation';

// Internal modules
import { Button } from '@/components';
import { useAuthStore } from '@/lib/store';
import { Task } from '@/types';

// Styles (if any)
import styles from './component.module.css';
```
