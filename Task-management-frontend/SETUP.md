# Frontend Setup Instructions

## Complete Setup Guide for Task Management Frontend

### Prerequisites

Before you start, make sure you have:

1. **Node.js 18 or higher**
   - Download from https://nodejs.org/
   - Verify: `node --version` and `npm --version`

2. **Backend API Running**
   - Follow the backend setup in task-management-backend/README.md
   - Backend should be running on http://localhost:5000
   - Database tables should be created

3. **Git (optional)**
   - For version control

### Step 1: Navigate to Frontend Directory

```bash
cd task-management-frontend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages:
- next
- react & react-dom
- axios
- date-fns
- zustand
- tailwindcss
- TypeScript

### Step 3: Configure Environment Variables

The `.env.local` file is already created with default settings:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

**For production**, update this to your deployed backend URL:

```env
NEXT_PUBLIC_API_URL=https://your-api.com
```

### Step 4: Start Development Server

```bash
npm run dev
```

Output should show:
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environment:  .env.local

Ready in 2.1s
```

### Step 5: Open in Browser

Go to http://localhost:3000 in your web browser.

## First Time User Flow

### 1. Landing Page
- You'll see the TaskMaster landing page
- Click "Create Account" to sign up or "Sign In" if you already have an account

### 2. Create an Account
1. Click "Create Account"
2. Enter your email: `user@example.com`
3. Enter password: `password123`
4. Confirm password: `password123`
5. Click "Create Account"
6. You'll be automatically logged in and redirected to the tasks page

### 3. Create Your First Task
1. Click "New Task" button
2. Fill in the form:
   - Title: "Complete project documentation"
   - Description: "Write comprehensive docs for the project"
   - Priority: "High"
   - Status: "In Progress"
   - Due Date: Select a date 5 days from now
3. Click "Create Task"

### 4. Try the Features
- **Filter**: Select status "In Progress" to filter tasks
- **Search**: Type "documentation" to search by title
- **Sort**: Sort by "Due Date" in descending order
- **Edit**: Click "Edit" on the task to modify it
- **Mark Complete**: Click the status badge to change it
- **Delete**: Click "Delete" to remove (requires confirmation)

### 5. Create More Tasks
Create a few more tasks with different:
- Priorities (Low, Medium, High)
- Statuses (Pending, In Progress, Completed)
- Due dates

## File Structure Overview

```
task-management-frontend/
├── src/
│   ├── app/                          # Next.js app directory
│   │   ├── page.tsx                  # Landing page (/)
│   │   ├── login/page.tsx            # Login page (/login)
│   │   ├── signup/page.tsx           # Sign up page (/signup)
│   │   ├── tasks/page.tsx            # Main app (/tasks)
│   │   ├── layout.tsx                # Root layout
│   │   └── globals.css               # Global styles
│   │
│   ├── components/                   # Reusable components
│   │   ├── Navbar.tsx                # Top navigation bar
│   │   ├── Button.tsx                # Button component
│   │   ├── Input.tsx                 # Form inputs
│   │   ├── TaskForm.tsx              # Create/edit task form
│   │   ├── TaskCard.tsx              # Individual task
│   │   ├── TaskList.tsx              # List of tasks
│   │   ├── TaskFilters.tsx           # Filters and sort
│   │   ├── Pagination.tsx            # Pagination
│   │   └── index.ts                  # Component exports
│   │
│   ├── lib/                          # Utilities and config
│   │   ├── api.ts                    # Axios API client
│   │   ├── store.ts                  # Zustand auth store
│   │   └── utils.ts                  # Helper functions
│   │
│   └── types/
│       └── index.ts                  # TypeScript types
│
├── public/                           # Static files
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind CSS config
├── postcss.config.js                 # PostCSS config
├── next.config.js                    # Next.js config
├── eslint.config.js                  # ESLint config
├── jest.config.cjs                   # Jest config
├── README.md                         # Main documentation
├── QUICK_START.md                    # Quick start guide
├── ARCHITECTURE.md                   # Architecture docs
└── SETUP.md                          # This file
```

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Run linting
npm run lint

# Run tests (if added)
npm test
```

## Styling System

The project uses **Tailwind CSS** with a custom premium color scheme:

### Color Palette

**Primary Colors**
- Primary Blue: `#5573b4` - Main brand color
- Accent Purple: `#a855f7` - Secondary highlights

**Neutral Palette**
- Slate 50-900: Gray tones for text and backgrounds

### Using Colors in JSX

```typescript
// Button with primary color
<button className="bg-primary-600 text-white hover:bg-primary-700">
  Click me
</button>

// Text with accent color
<span className="text-accent-600">Highlighted text</span>

// Background with gradient
<div className="bg-gradient-to-br from-primary-600 to-accent-600">
  Gradient background
</div>
```

## Component Usage Examples

### Button Component

```typescript
import { Button } from '@/components';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Click Me
</Button>

// Outline button
<Button variant="outline">
  Outline Button
</Button>

// Danger button
<Button variant="danger">
  Delete
</Button>

// Loading state
<Button isLoading={isSubmitting}>
  Saving...
</Button>
```

### Input Component

```typescript
import { Input, Textarea, Select } from '@/components';

// Text input
<Input
  label="Title"
  placeholder="Enter title"
  value={title}
  onChange={(e) => setTitle(e.target.value)}
  error={errors.title}
/>

// Textarea
<Textarea
  label="Description"
  placeholder="Enter description"
  rows={4}
/>

// Select dropdown
<Select
  label="Priority"
  value={priority}
  onChange={(e) => setPriority(e.target.value)}
  options={[
    { value: 'low', label: 'Low' },
    { value: 'high', label: 'High' },
  ]}
/>
```

## API Integration

### Making API Calls

```typescript
import { apiClient } from '@/lib/api';

// Fetch tasks
const response = await apiClient.getTasks(
  page = 1,
  limit = 10,
  status = 'pending',
  search = 'keyword',
  sortBy = 'created_at',
  sortOrder = 'desc'
);

// Create task
const task = await apiClient.createTask({
  title: 'New Task',
  description: 'Description',
  priority: 'high',
  status: 'pending',
  due_date: '2024-12-31'
});

// Update task
const updated = await apiClient.updateTask(taskId, {
  status: 'completed'
});

// Delete task
await apiClient.deleteTask(taskId);
```

## Authentication State

### Using Auth Store

```typescript
import { useAuthStore } from '@/lib/store';

export function MyComponent() {
  const { user, token, logout, hydrate } = useAuthStore();

  // Load persisted auth state
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      {user ? (
        <div>
          <p>Hello {user.email}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <p>Not logged in</p>
      )}
    </>
  );
}
```

## Troubleshooting

### Issue: "npm: command not found"
**Solution**: Node.js/npm not installed
- Download from https://nodejs.org/
- Add to PATH if needed

### Issue: "Cannot connect to API"
**Solution**: Backend not running
- Start backend: `cd ../task-management-backend && npm run dev`
- Check it's on http://localhost:5000

### Issue: "Port 3000 already in use"
**Solution**: Another app using port 3000
```bash
# Find and kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# On Mac/Linux:
lsof -i :3000
kill -9 <PID>
```

### Issue: "Module not found"
**Solution**: Dependencies not installed
```bash
rm -rf node_modules package-lock.json
npm install
```

### Issue: "Build errors"
**Solution**: Clear cache and rebuild
```bash
rm -rf .next
npm run build
```

## Best Practices

### Code Organization
- Keep components focused and single-purpose
- Use TypeScript for type safety
- Extract repeated logic to utilities
- Use meaningful variable names

### Performance
- Use React.memo for expensive components
- Optimize re-renders with proper dependencies
- Lazy load components when appropriate
- Use proper key props in lists

### Error Handling
- Always wrap API calls in try-catch
- Show user-friendly error messages
- Log errors for debugging
- Provide recovery options

### Security
- Never hardcode sensitive information
- Use environment variables for configuration
- Validate input on both client and server
- Keep dependencies up to date

## Next Steps

1. **Explore the codebase**: Read through the components to understand structure
2. **Add more features**: Implement new functionality as needed
3. **Write tests**: Add unit and integration tests
4. **Deploy**: Follow deployment section in README.md
5. **Monitor**: Set up error tracking and analytics

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [TypeScript](https://www.typescriptlang.org)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com)

## Support

- Check the README.md for overview
- Check QUICK_START.md for getting started
- Check ARCHITECTURE.md for technical details
- Review inline comments in code
- Check browser console for error messages

## Production Deployment

See the "Deployment" section in README.md for production setup instructions including environment configuration, build optimization, and hosting options.
