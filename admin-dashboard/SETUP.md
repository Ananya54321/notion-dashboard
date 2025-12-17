# Quick Setup Guide

## Prerequisites

- Node.js 18+ installed
- pnpm installed (`npm install -g pnpm`)
- Supabase service key

## Step-by-Step Setup

### 1. Navigate to the project directory

```bash
cd admin-dashboard
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up environment variables

Create a `.env.local` file in the `admin-dashboard` directory:

```bash
# Create the file
touch .env.local
```

Add the following content to `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pvvrtckedmrkyzfxubkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SERVICE_KEY_HERE
```

**Important:** Replace `YOUR_SERVICE_KEY_HERE` with your actual Supabase service key.

### 4. Start the development server

```bash
pnpm dev
```

The dashboard will be available at [http://localhost:3000](http://localhost:3000)

## Environment Variables

You need to set the following environment variables in `.env.local`:

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL | `https://pvvrtckedmrkyzfxubkk.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase service/anon key | Your actual service key |

## Troubleshooting

### "Cannot find module" errors

Run `pnpm install` again to ensure all dependencies are installed.

### "Invalid Supabase credentials"

Make sure your `.env.local` file exists and contains the correct Supabase URL and service key.

### Port 3000 already in use

You can specify a different port:

```bash
pnpm dev -- -p 3001
```

## Production Build

To create a production build:

```bash
pnpm build
pnpm start
```

## Features Overview

Once running, you'll have access to:

- **Dashboard View**: See all events with statistics
- **Search & Filter**: Find events by various criteria
- **Edit Events**: Click "Edit" on any event to modify its details
- **Real-time Updates**: Changes are immediately reflected in the UI
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## Support

For issues or questions, refer to the main README.md file.

