# Quick Start Guide

## Installation & Setup

### 1. Prerequisites
- Node.js 18+ installed
- Backend API running on http://localhost:5000
- PostgreSQL database set up (from backend)

### 2. Install Dependencies

```bash
cd task-management-frontend
npm install
```

### 3. Configure Environment

The `.env.local` file is pre-configured for local development:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

To change the API URL, update this value.

### 4. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Landing Page
- Visit http://localhost:3000 to see the landing page
- Click "Sign In" or "Create Account"

### Create Account
1. Go to the signup page
2. Enter email and password (min 6 characters)
3. Confirm password and submit
4. Automatically logged in and redirected to tasks

### Login
1. Go to the login page
2. Enter credentials
3. Click "Sign In"

### Task Management

#### Creating a Task
1. Click "New Task" button
2. Fill in the form:
   - **Title** (required)
   - **Description** (optional)
   - **Priority** (Low, Medium, High)
   - **Status** (Pending, In Progress, Completed)
   - **Due Date** (optional)
3. Click "Create Task"

#### Editing a Task
1. Click "Edit" on any task card
2. Form loads in the panel above
3. Update fields as needed
4. Click "Update Task"

#### Deleting a Task
1. Click "Delete" on any task card
2. Confirm the deletion

#### Changing Task Status
- Click the status badge on a task card to cycle through statuses
- Or edit the task and change the status dropdown

### Filtering & Sorting

#### Search
- Type in the search box to filter tasks by title
- Search updates in real-time

#### Filter by Status
- Use the Status dropdown to show only:
  - All Statuses
  - Pending
  - In Progress
  - Completed

#### Sort Options
- Sort by:
  - Date Created (default)
  - Due Date
  - Priority
- Choose Ascending or Descending order

#### Reset Filters
- Click "Reset" button when filters are active

### Pagination
- Default: 10 tasks per page
- Navigate with Previous/Next buttons or click page numbers

## File Structure

```
src/
├── app/
│   ├── page.tsx              # Landing page
│   ├── login/page.tsx        # Login page
│   ├── signup/page.tsx       # Signup page
│   ├── tasks/page.tsx        # Main tasks dashboard
│   ├── layout.tsx            # Root layout
│   └── globals.css           # Global styles
├── components/
│   ├── Navbar.tsx            # Top navigation
│   ├── Button.tsx            # Reusable button
│   ├── Input.tsx             # Form inputs (Input, Textarea, Select)
│   ├── TaskForm.tsx          # Create/Edit task form
│   ├── TaskCard.tsx          # Individual task display
│   ├── TaskList.tsx          # List of tasks with state handling
│   ├── TaskFilters.tsx       # Search, filter, sort controls
│   ├── Pagination.tsx        # Pagination controls
│   └── index.ts              # Component exports
├── lib/
│   ├── api.ts                # Axios API client with interceptors
│   ├── store.ts              # Zustand auth store
│   └── utils.ts              # Helper functions
└── types/
    └── index.ts              # TypeScript types
```

## Key Features

### Premium Design
- Modern color palette (Navy blue, Purple, Slate)
- Smooth animations and transitions
- Shadow effects for depth
- Responsive grid layouts

### Type Safety
- Full TypeScript coverage
- Type-safe API responses
- Component prop validation

### State Management
- Zustand for auth state
- Local component state for task management
- Automatic localStorage persistence

### Error Handling
- API error display
- Form validation
- Network error recovery

### Performance
- Client-side rendering
- Efficient re-renders
- Optimized assets

## Development

### Adding a New Component

1. Create file in `src/components/`
2. Use TypeScript interfaces for props
3. Export from `src/components/index.ts`
4. Import where needed: `import { Component } from '@/components'`

### Styling

Uses Tailwind CSS utility classes:
- Colors: `text-primary-600`, `bg-accent-500`
- Spacing: `p-4`, `gap-6`, `mt-8`
- Responsive: `md:grid-cols-2`, `lg:px-8`

### API Calls

Use the `apiClient` from `@/lib/api.ts`:

```typescript
import { apiClient } from '@/lib/api';

// Get tasks
const response = await apiClient.getTasks(page, limit, status, search, sortBy, sortOrder);

// Create task
await apiClient.createTask({ title, description, priority, status, due_date });

// Update task
await apiClient.updateTask(id, { status: 'completed' });

// Delete task
await apiClient.deleteTask(id);
```

### Auth State

Use the `useAuthStore` hook:

```typescript
import { useAuthStore } from '@/lib/store';

const { user, token, setUser, logout, hydrate } = useAuthStore();

// Hydrate on mount
useEffect(() => {
  hydrate();
}, [hydrate]);
```

## Deployment

### Build for Production

```bash
npm run build
npm run start
```

### Environment Variables for Production

Update `NEXT_PUBLIC_API_URL` in production environment:

```env
NEXT_PUBLIC_API_URL=https://your-api-domain.com
```

### Hosting Options

- Vercel (recommended for Next.js)
- Netlify
- AWS
- Docker

## Troubleshooting

### Issue: "Cannot connect to API"
- Check if backend is running on http://localhost:5000
- Verify `NEXT_PUBLIC_API_URL` in `.env.local`
- Check browser console for CORS errors

### Issue: "Not logged in after refresh"
- Auth state is stored in localStorage
- Clear localStorage and login again if needed
- Check if `hydrate()` is called on app mount

### Issue: "Tasks not loading"
- Verify authentication token is valid
- Check network tab for API errors
- Try logging out and logging back in

### Issue: "Build fails"
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check TypeScript errors: `npx tsc --noEmit`

## Support

For issues or questions, check:
1. Browser console for error messages
2. Network tab in DevTools for API errors
3. Backend logs for server-side issues
4. This README for common solutions
