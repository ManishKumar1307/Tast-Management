# Architecture & Design

## Overview

This is a modern Next.js frontend for a task management application. The architecture follows React best practices with TypeScript for type safety and Tailwind CSS for styling.

## Technology Choices

### Framework: Next.js 14
- App Router for modern routing
- Server-side rendering capability
- Built-in API route support
- Excellent developer experience
- Optimized performance

### Styling: Tailwind CSS
- Utility-first CSS framework
- Rapid development
- Consistent design system
- Small bundle size
- Excellent performance

### State Management: Zustand
- Lightweight and minimal
- Simple API
- Great TypeScript support
- No boilerplate
- Perfect for auth state

### HTTP Client: Axios
- Promise-based HTTP requests
- Request/response interceptors
- Automatic token injection
- Better error handling
- Widely adopted

### Type Safety: TypeScript
- Full type coverage
- Better IDE support
- Fewer runtime errors
- Self-documenting code
- Improved maintainability

## Architectural Patterns

### Component Structure

All components are located in `src/components/`:

#### Presentational Components
- `Button.tsx` - Reusable button with variants
- `Input.tsx` - Form controls (Input, Textarea, Select)
- `TaskCard.tsx` - Individual task display

#### Container Components
- `TaskList.tsx` - Wraps multiple TaskCards
- `TaskForm.tsx` - Handles form submission
- `TaskFilters.tsx` - Filter controls with state management

#### Layout Components
- `Navbar.tsx` - Navigation and user menu

### State Management Pattern

**Zustand Store** (`src/lib/store.ts`):
```typescript
interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user, token) => void;
  logout: () => void;
  setError: (error) => void;
  setLoading: (loading) => void;
  hydrate: () => void;
}
```

Features:
- Persistent login with localStorage
- Automatic hydration on app mount
- Clean API for auth state

### API Integration Pattern

**API Client** (`src/lib/api.ts`):
- Singleton pattern for Axios instance
- Automatic token injection via interceptors
- Type-safe method signatures
- Centralized error handling

```typescript
const { token, user } = await apiClient.login(email, password);
const response = await apiClient.getTasks(...params);
```

## Data Flow

### Authentication Flow

1. **Signup/Login Page** → User enters credentials
2. **API Client** → Sends request to backend
3. **Backend** → Returns JWT token and user data
4. **Auth Store** → Saves to state and localStorage
5. **Router** → Redirects to tasks page
6. **Protected Routes** → Check for token via hydrate()

### Task Management Flow

1. **Tasks Page** → Mounted, calls `hydrate()` for auth
2. **Effect Hook** → Calls `loadTasks()` with filters
3. **API Client** → Sends request with JWT token
4. **Backend** → Returns tasks filtered by user_id
5. **Component State** → Sets tasks array
6. **TaskList** → Renders TaskCard components

### Filter Flow

1. **TaskFilters Component** → User updates filter
2. **State Update** → `setFilters({ ...filters, ... })`
3. **Effect Hook** → Triggers with filter changes
4. **loadTasks()** → Called with new parameters
5. **Query Params** → Built and sent to API
6. **Results** → Updated task list displayed

## Component Hierarchy

```
<html>
  <body>
    <layout>
      <Navbar />
      <page>
        // Page-specific components
      </page>
    </layout>
  </body>
</html>
```

### Tasks Page Structure

```
Tasks Page
├── Filter Controls (TaskFilters)
├── Task Form (TaskForm) [conditional]
└── Task List (TaskList)
    ├── TaskCard
    ├── TaskCard
    └── TaskCard
└── Pagination
```

## Styling Architecture

### Tailwind Configuration

**Custom Colors** in `tailwind.config.js`:
- `primary-*` - Main brand color (navy blue)
- `accent-*` - Secondary color (purple)
- `slate-*` - Gray tones

**Custom Shadows**:
- `shadow-card` - Subtle elevation
- `shadow-card-lg` - Medium elevation
- `shadow-hover` - Prominent elevation

**Custom Animations**:
- `fade-in` - Opacity transition
- `slide-up` - Translate Y transition

### Class Naming Convention

- Tailwind utility classes for styling
- BEM-like naming for complex components
- Consistent spacing scale (4px base)
- Responsive modifiers: `md:`, `lg:`, `xl:`

## Error Handling

### API Errors
```typescript
try {
  const data = await apiClient.getTasks(...);
} catch (err: any) {
  setError(err.response?.data?.error || 'Default error');
}
```

### Form Validation
```typescript
const validateForm = () => {
  const newErrors = {};
  if (!formData.title.trim()) {
    newErrors.title = 'Title is required';
  }
  return Object.keys(newErrors).length === 0;
};
```

### UI Error Display
- Alert boxes for page-level errors
- Inline error messages for form fields
- Toast-like notifications
- Loading states for async operations

## Performance Optimizations

### Code Splitting
- Page-level code splitting with Next.js routing
- Component-level lazy loading where needed

### Caching
- Browser cache for API responses
- LocalStorage for auth state

### Optimization Techniques
- Efficient re-renders with React hooks
- Memoization for expensive computations
- Proper dependency arrays in useEffect

## Testing Strategy

### Types of Tests

**Unit Tests**:
- Utility functions in `src/lib/utils.ts`
- Component render tests

**Integration Tests**:
- API client calls
- Component interactions

**E2E Tests** (optional):
- Full user workflows
- Authentication flows

### Test File Structure

```
src/
├── components/
│   ├── Button.tsx
│   └── Button.test.tsx
├── lib/
│   ├── api.ts
│   └── api.test.ts
└── __tests__/
    └── integration/
```

## Security Considerations

### Authentication
- JWT tokens stored securely in localStorage
- Automatic token injection in API headers
- Token cleared on logout
- Protected routes check for token

### API Security
- HTTPS enforced in production
- CORS configured on backend
- Request validation on backend
- SQL injection prevention via backend

### Input Sanitization
- Form validation on client
- Backend validation as source of truth
- HTML escaping via React

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

## Accessibility

- Semantic HTML elements
- ARIA labels where needed
- Keyboard navigation support
- Color contrast compliance
- Form labels associated with inputs

## SEO Considerations

- Meta tags in `layout.tsx`
- Semantic HTML structure
- Dynamic title generation possible
- Robots.txt configuration needed

## Deployment Considerations

### Environment Variables
- `NEXT_PUBLIC_API_URL` - Backend API endpoint
- Must be set at build time for `NEXT_PUBLIC_*` vars

### Performance
- Image optimization via Next.js
- CSS minification via Tailwind
- JavaScript bundling and minification

### Monitoring
- Error tracking (Sentry integration possible)
- Performance monitoring (Vercel Analytics)
- Log aggregation

## Future Enhancements

- Real-time updates with WebSocket
- Task comments and collaboration
- File attachments
- Calendar view
- Dark mode support
- Notifications system
- Advanced filtering with saved filters
- Task templates
- Team/workspace support
- Activity history

## Code Quality

- ESLint for code standards
- TypeScript strict mode
- Pre-commit hooks (husky + lint-staged)
- Type checking: `npx tsc --noEmit`
- Linting: `npm run lint`

## Documentation

- README.md - Overview and setup
- QUICK_START.md - Getting started guide
- ARCHITECTURE.md - This file
- Inline comments for complex logic
- JSDoc for utility functions
