# Todo App with TypeScript & Supabase

A modern, full-featured todo application built with React, TypeScript, Tailwind CSS, and Supabase.

## Features

- 🔐 Google OAuth authentication via Supabase
- ✅ Create, read, update, delete todos
- 🎯 Filter todos (All, Active, Completed)
- 🌙 Dark/light mode toggle
- 📱 Mobile-first responsive design
- 💾 Real-time sync with Supabase backend
- 🔄 Offline fallback with localStorage
- ✨ Modern UI with smooth animations

## Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, Real-time)
- **Build Tool**: Vite
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ 
- A Supabase account

### Setup

1. **Clone and install dependencies**
   ```bash
   npm install
   ```

2. **Set up Supabase**
   - Create a new project at [supabase.com](https://supabase.com)
   - Go to Settings → API to get your project URL and anon key
   - In Authentication → Providers, enable Google OAuth
   - Set your site URL and redirect URLs

3. **Create the todos table**
   Run this SQL in your Supabase SQL editor:
   ```sql
   create table public.todos (
     id uuid default gen_random_uuid() primary key,
     user_id uuid references auth.users not null,
     text text not null,
     completed boolean default false,
     created_at timestamp with time zone default timezone('utc'::text, now()) not null
   );

   -- Enable RLS
   alter table public.todos enable row level security;

   -- Create policies
   create policy "Users can view own todos" on public.todos
     for select using (auth.uid() = user_id);

   create policy "Users can create own todos" on public.todos
     for insert with check (auth.uid() = user_id);

   create policy "Users can update own todos" on public.todos
     for update using (auth.uid() = user_id);

   create policy "Users can delete own todos" on public.todos
     for delete using (auth.uid() = user_id);
   ```

4. **Environment variables**
   Copy `.env.example` to `.env` and fill in your Supabase credentials:
   ```bash
   cp .env.example .env
   ```

5. **Start development server**
   ```bash
   npm run dev
   ```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
├── hooks/              # Custom React hooks
├── lib/                # External service configs
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
├── App.tsx             # Main app component
├── main.tsx           # App entry point
└── index.css          # Global styles
```

## Key Features Explained

### Authentication
- Uses Supabase Auth with Google OAuth
- Automatic session management and persistence
- Secure user-specific data access

### Data Management
- Real-time sync with Supabase PostgreSQL
- Optimistic updates for better UX
- LocalStorage fallback for offline functionality
- Row Level Security (RLS) for data protection

### UI/UX
- Mobile-first responsive design
- Dark/light mode with system preference detection
- Smooth animations and transitions
- Accessible keyboard navigation

## Deployment

### Vercel (Recommended)
1. Connect your GitHub repo to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy!

### Netlify
1. Build the project: `npm run build`
2. Deploy the `dist` folder to Netlify
3. Add environment variables in Netlify dashboard

## License

MIT License - feel free to use this project however you'd like!