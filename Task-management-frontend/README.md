# TaskMaster Frontend

A modern, responsive task management frontend built with Next.js and TypeScript. Features authentication, task CRUD operations, filtering, searching, and sorting.

## Features

- **Authentication**: Secure signup and login with JWT
- **Task Management**: Create, read, update, and delete tasks
- **Filtering & Search**: Filter by status, search by title, and sort by due date, priority, or creation date
- **Responsive Design**: Mobile-first design that works on all devices
- **Premium UI**: Modern, clean design with premium color palette
- **Real-time Updates**: Instant feedback on all operations

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Utilities**: date-fns, clsx

## Setup

### Prerequisites

- Node.js 18+
- npm or yarn
- Backend API running (see task-management-backend)

### Installation

1. Clone or navigate to the frontend directory
2. Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

3. Update `.env.local` with your backend API URL:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000
```

4. Install dependencies:

```bash
npm install
```

### Running the Application

**Development mode:**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Production build:**

```bash
npm run build
npm run start
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── login/             # Login page
│   ├── signup/            # Signup page
│   ├── tasks/             # Tasks dashboard
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Navbar.tsx         # Navigation bar
│   ├── Button.tsx         # Button component
│   ├── Input.tsx          # Form inputs
│   ├── TaskForm.tsx       # Task creation/edit form
│   ├── TaskCard.tsx       # Individual task card
│   ├── TaskList.tsx       # List of tasks
│   ├── TaskFilters.tsx    # Filter and sort controls
│   └── Pagination.tsx     # Pagination controls
├── lib/
│   ├── api.ts             # API client
│   ├── store.ts           # Zustand store for auth
│   └── utils.ts           # Utility functions
└── types/
    └── index.ts           # TypeScript types
```

## API Integration

The frontend connects to the backend API at `http://localhost:5000` by default.

### Authentication Endpoints

- `POST /auth/signup` - User registration
- `POST /auth/login` - User login

### Task Endpoints

- `GET /tasks` - List tasks with filters
- `POST /tasks` - Create a task
- `GET /tasks/:id` - Get a single task
- `PATCH /tasks/:id` - Update a task
- `DELETE /tasks/:id` - Delete a task

### Query Parameters

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by status (pending, in-progress, completed)
- `search` - Search by title
- `sortBy` - Sort field (created_at, due_date, priority)
- `sortOrder` - Sort order (asc, desc)

## Features in Detail

### Task Management

- Create new tasks with title, description, priority, status, and due date
- Edit existing tasks inline
- Delete tasks with confirmation
- Mark tasks as complete by changing status
- View task details

### Filtering and Search

- Filter tasks by status (Pending, In Progress, Completed)
- Search tasks by title
- Sort by creation date, due date, or priority
- Combined filtering and searching

### Responsive Design

- Mobile-first approach
- Adaptive layouts for tablets and desktops
- Touch-friendly interface
- Optimized performance

### Authentication

- Secure JWT-based authentication
- Persistent login state
- Session management with localStorage
- Protected routes

## Color Palette

The application uses a premium color scheme:

- **Primary**: Deep blue (#5573b4)
- **Accent**: Purple (#a855f7)
- **Slate**: Gray tones for backgrounds and text
- **Status Colors**: Green (completed), Blue (in-progress), Slate (pending)
- **Priority Colors**: Red (high), Purple (medium), Slate (low)

## Testing

Currently, there are no automated tests. To add tests, use Jest and React Testing Library:

```bash
npm install --save-dev jest @testing-library/react @testing-library/jest-dom
```

## Best Practices

- All components are client-side with 'use client' directive
- Type-safe with TypeScript
- Responsive and accessible
- Error handling and loading states
- Clean code with proper separation of concerns

## Troubleshooting

### API Connection Issues

Ensure the backend is running at `http://localhost:4000` and the CORS is properly configured.

### Auth Issues

Clear browser localStorage and try logging in again:

```javascript
localStorage.clear();
```

### Build Issues

Clear the Next.js cache:

```bash
rm -rf .next
npm run build
```

## License

MIT
