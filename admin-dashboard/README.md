# Events Admin Dashboard

A beautiful, ServiceNow-like admin dashboard for managing events with a modern UI built using Next.js, Supabase, and custom components.

## Features

✨ **Comprehensive Event Management**
- View all events in a clean, organized table
- Filter events by multiple criteria (venue type, approval status, dates, etc.)
- Edit event information with an intuitive modal interface
- Real-time data synchronization with Supabase

🎨 **Beautiful UI**
- Custom color scheme (#222222, #ffffff, #52c7f3)
- Responsive design that works on all devices
- Smooth animations and transitions
- Clean, professional ServiceNow-inspired interface

🔍 **Powerful Filtering**
- Search by event name, location, or theme
- Filter by venue type (IRL, Virtual, Hybrid)
- Filter by approval and highlighted status
- Filter by ecosystem focus
- Date range filtering

✏️ **Easy Editing**
- Inline edit modal with all event fields
- Image preview for logos and banners
- Support for JSON array fields (themes, categories, links)
- Real-time validation and error handling

## Setup

### 1. Install Dependencies

```bash
pnpm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pvvrtckedmrkyzfxubkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_service_key_here
```

**Important:** Replace `your_service_key_here` with your actual Supabase service key (the value you have in `SERVICE_KEY` environment variable).

### 3. Run the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the dashboard.

## Project Structure

```
admin-dashboard/
├── app/
│   ├── page.tsx           # Main dashboard page
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── button.tsx
│   │   ├── input.tsx
│   │   ├── select.tsx
│   │   ├── checkbox.tsx
│   │   ├── modal.tsx
│   │   └── badge.tsx
│   ├── filters.tsx        # Filter component
│   ├── events-table.tsx   # Events table component
│   └── edit-event-modal.tsx # Edit modal component
├── lib/
│   ├── supabase.ts        # Supabase client
│   ├── database.types.ts  # TypeScript types
│   └── utils.ts           # Utility functions
└── package.json
```

## Usage

### Viewing Events

The dashboard displays all events in a table format with the following information:
- Event name and logo
- Location
- Start and end dates
- Venue type
- Approval and highlighted status
- Ecosystem focus

### Filtering Events

1. Use the search bar to search by event name, location, or theme
2. Click the "Filters" button to expand advanced filters
3. Select criteria from dropdowns or date pickers
4. Click "Clear" to reset all filters

### Editing Events

1. Click the "Edit" button on any event row
2. Modify the event information in the modal
3. For array fields (themes, categories, links), enter comma-separated values
4. Check/uncheck the "Approved" and "Highlighted" checkboxes
5. Click "Save Changes" to update the event

## Color Scheme

The dashboard uses a professional color palette:
- **Primary:** #52c7f3 (Sky Blue) - Used for buttons, highlights, and accents
- **Dark:** #222222 (Near Black) - Used for text and headers
- **Light:** #ffffff (White) - Used for backgrounds and cards

## Technologies Used

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type-safe development
- **Supabase** - Backend and database
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons
- **date-fns** - Date formatting
- **@tanstack/react-table** - Table management

## Database Schema

The dashboard works with the following events table schema:

```sql
create table public.events (
  id bigserial primary key,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now(),
  event text,
  location_optional text,
  start_value timestamp with time zone,
  end_value timestamp with time zone,
  venue_type text,
  ecosystem_focus text,
  approved boolean,
  highlighted boolean,
  logo text,
  banner_image text,
  theme_optional text,
  category_optional text,
  link text,
  twitter text,
  farcaster text,
  discord text,
  telegram text,
  season text,
  created_time timestamp with time zone,
  last_edited_time timestamp with time zone
);
```

## Best Practices

- **Reusable Components:** All UI components are modular and reusable
- **Type Safety:** Full TypeScript coverage for type-safe development
- **Performance:** Optimized rendering with React hooks and memoization
- **Accessibility:** Keyboard navigation and ARIA labels
- **Responsive Design:** Works seamlessly on desktop, tablet, and mobile

## Support

For issues or questions, please refer to the documentation or contact the development team.
