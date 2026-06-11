# Task Management Backend

Express backend for a task management application using Supabase as the PostgreSQL database.

## What’s included

- REST API with task CRUD endpoints
- JWT auth with signup/login
- Users can only access their own tasks
- Search, filter, sort, and pagination for tasks
- Input validation and consistent error responses
- Supabase database access via `@supabase/supabase-js`

## Setup

1. Copy `.env.example` to `.env`.
2. Fill in `SUPABASE_URL`, `SUPABASE_KEY`, `JWT_SECRET`, `JWT_EXPIRES_IN`, and `PORT`.
3. Create required tables in your Supabase database.
4. Install dependencies:

```bash
npm install
```

## Database schema

Run this SQL in your Supabase project:

```sql
create table if not exists users (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  password text not null,
  role text not null default 'user',
  created_at timestamptz not null default now()
);

create table if not exists tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references users(id) on delete cascade,
  title text not null,
  description text,
  status text not null default 'pending',
  priority text not null default 'medium',
  due_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

> If your Supabase database does not already have the `pgcrypto` extension enabled, enable it with:
>
> ```sql
> create extension if not exists pgcrypto;
> ```

## Run

```bash
npm run dev
```

## Tests

```bash
npm test
```
