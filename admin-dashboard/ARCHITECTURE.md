# Architecture Documentation

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                         Browser (Client)                         │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    Next.js App Router                       │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │              app/page.tsx (Dashboard)                 │  │ │
│  │  │  • State Management (events, filters, modals)        │  │ │
│  │  │  • Data Fetching (useEffect)                         │  │ │
│  │  │  • Event Handlers                                    │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  │                            │                                │ │
│  │           ┌────────────────┼────────────────┐              │ │
│  │           │                │                │              │ │
│  │           ▼                ▼                ▼              │ │
│  │  ┌──────────────┐  ┌──────────────┐  ┌─────────────────┐ │ │
│  │  │   Filters    │  │ EventsTable  │  │ EditEventModal  │ │ │
│  │  │  Component   │  │  Component   │  │   Component     │ │ │
│  │  └──────────────┘  └──────────────┘  └─────────────────┘ │ │
│  │           │                │                │              │ │
│  │           └────────────────┼────────────────┘              │ │
│  │                            │                                │ │
│  │                            ▼                                │ │
│  │                  ┌──────────────────┐                      │ │
│  │                  │  UI Components   │                      │ │
│  │                  │  • Button        │                      │ │
│  │                  │  • Input         │                      │ │
│  │                  │  • Select        │                      │ │
│  │                  │  • Checkbox      │                      │ │
│  │                  │  • Modal         │                      │ │
│  │                  │  • Badge         │                      │ │
│  │                  └──────────────────┘                      │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────┬───────────────────────────────────┘
                                │
                                │ Supabase Client
                                │ (lib/supabase.ts)
                                │
                                ▼
┌─────────────────────────────────────────────────────────────────┐
│                       Supabase Backend                           │
│                                                                   │
│  ┌────────────────────────────────────────────────────────────┐ │
│  │                    PostgreSQL Database                      │ │
│  │                                                             │ │
│  │  ┌──────────────────────────────────────────────────────┐  │ │
│  │  │                    events table                       │  │ │
│  │  │  • id, event, location, dates                        │  │ │
│  │  │  • venue_type, ecosystem_focus                       │  │ │
│  │  │  • approved, highlighted                             │  │ │
│  │  │  • logo, banner_image                                │  │ │
│  │  │  • social links, themes, categories                  │  │ │
│  │  └──────────────────────────────────────────────────────┘  │ │
│  └─────────────────────────────────────────────────────────────┘ │
│                                                                   │
└───────────────────────────────────────────────────────────────────┘
```

## 📊 Data Flow

```
┌─────────────┐
│   User      │
│  Action     │
└──────┬──────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Event Handlers                            │
│  • handleEdit()      → Opens edit modal                     │
│  • handleSave()      → Saves changes to Supabase            │
│  • handleFilter()    → Updates filter state                 │
│  • fetchEvents()     → Fetches data from Supabase           │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    State Updates                             │
│  • events[]          → All events from database             │
│  • filteredEvents[]  → Filtered subset of events            │
│  • filters{}         → Current filter values                │
│  • selectedEvent     → Event being edited                   │
│  • isEditModalOpen   → Modal visibility state               │
└──────┬──────────────────────────────────────────────────────┘
       │
       ▼
┌─────────────────────────────────────────────────────────────┐
│                    Re-render                                 │
│  • Components receive new props                             │
│  • UI updates to reflect state changes                      │
│  • Smooth transitions applied                               │
└─────────────────────────────────────────────────────────────┘
```

## 🔄 Component Lifecycle

### Dashboard Page (app/page.tsx)

```
Mount
  │
  ├─→ fetchEvents() ──→ Supabase Query ──→ Set events state
  │
  ├─→ Initialize filters state
  │
  └─→ Render components

Filter Change
  │
  ├─→ Update filters state
  │
  ├─→ useEffect triggers
  │
  ├─→ Apply filters to events
  │
  └─→ Update filteredEvents state ──→ Re-render table

Edit Event
  │
  ├─→ Set selectedEvent state
  │
  ├─→ Open modal (isEditModalOpen = true)
  │
  ├─→ User edits form
  │
  ├─→ Submit ──→ Supabase Update
  │
  ├─→ fetchEvents() to refresh data
  │
  └─→ Close modal ──→ Clear selectedEvent

Unmount
  │
  └─→ Cleanup (close modals, clear intervals)
```

## 🎨 Component Hierarchy

```
App
└── Layout (app/layout.tsx)
    └── Dashboard Page (app/page.tsx)
        ├── Header
        │   ├── Logo & Title
        │   └── Refresh Button
        │
        ├── Statistics Cards
        │   ├── Total Events Card
        │   ├── Approved Events Card
        │   ├── Highlighted Events Card
        │   └── Filtered Results Card
        │
        ├── Filters Component
        │   ├── Search Input
        │   ├── Filter Button
        │   ├── Clear Button
        │   └── Expandable Panel
        │       ├── Venue Type Select
        │       ├── Approval Status Select
        │       ├── Highlighted Select
        │       ├── Ecosystem Focus Select
        │       ├── Start Date Input
        │       └── End Date Input
        │
        ├── Events Table Component
        │   ├── Table Header
        │   └── Table Body
        │       └── Event Rows
        │           ├── Event Info Cell
        │           │   ├── Logo Image
        │           │   ├── Event Name
        │           │   └── Theme Badges
        │           ├── Location Cell
        │           ├── Date Cell
        │           ├── Venue Type Cell
        │           ├── Status Cell
        │           │   ├── Approval Badge
        │           │   └── Highlighted Badge
        │           ├── Ecosystem Cell
        │           └── Actions Cell
        │               ├── Edit Button
        │               └── External Link
        │
        └── Edit Event Modal Component
            ├── Modal Header
            │   ├── Title
            │   └── Close Button
            │
            ├── Modal Body (Form)
            │   ├── Basic Information Section
            │   │   ├── Event Name Input
            │   │   ├── Location Input
            │   │   ├── Start Date Input
            │   │   ├── End Date Input
            │   │   ├── Venue Type Select
            │   │   ├── Ecosystem Focus Select
            │   │   └── Season Input
            │   │
            │   ├── Links & Social Section
            │   │   ├── Website Links Input
            │   │   ├── Twitter Input
            │   │   ├── Farcaster Input
            │   │   ├── Discord Input
            │   │   └── Telegram Input
            │   │
            │   ├── Media Section
            │   │   ├── Logo URL Input + Preview
            │   │   └── Banner URL Input + Preview
            │   │
            │   ├── Categories & Themes Section
            │   │   ├── Categories Input
            │   │   └── Themes Input
            │   │
            │   └── Status Section
            │       ├── Approved Checkbox
            │       └── Highlighted Checkbox
            │
            └── Modal Footer
                ├── Cancel Button
                └── Save Button
```

## 🗂️ File Structure & Responsibilities

```
admin-dashboard/
│
├── app/                          # Next.js App Router
│   ├── page.tsx                  # Main dashboard page
│   │   • Fetches events from Supabase
│   │   • Manages filter state
│   │   • Handles modal state
│   │   • Renders all components
│   │
│   ├── layout.tsx                # Root layout
│   │   • Sets up HTML structure
│   │   • Includes metadata
│   │   • Wraps all pages
│   │
│   └── globals.css               # Global styles
│       • Custom CSS variables
│       • Tailwind imports
│       • Global animations
│
├── components/                   # React components
│   │
│   ├── filters.tsx               # Filter panel
│   │   • Search input
│   │   • Filter dropdowns
│   │   • Filter state management
│   │   • Expandable panel logic
│   │
│   ├── events-table.tsx          # Events table
│   │   • Table rendering
│   │   • Row formatting
│   │   • Badge display
│   │   • Action buttons
│   │
│   ├── edit-event-modal.tsx      # Edit modal
│   │   • Form rendering
│   │   • Form state management
│   │   • Supabase update logic
│   │   • Validation
│   │
│   └── ui/                       # Reusable UI components
│       ├── button.tsx            # Button with variants
│       ├── input.tsx             # Styled input field
│       ├── select.tsx            # Styled dropdown
│       ├── checkbox.tsx          # Custom checkbox
│       ├── modal.tsx             # Modal dialog
│       ├── badge.tsx             # Status badges
│       └── skeleton.tsx          # Loading skeleton
│
├── lib/                          # Utilities & config
│   │
│   ├── supabase.ts               # Supabase client
│   │   • Client initialization
│   │   • Type-safe client
│   │
│   ├── database.types.ts         # TypeScript types
│   │   • Database schema types
│   │   • Event type definition
│   │
│   └── utils.ts                  # Utility functions
│       • cn() - Class name merger
│       • parseJsonField() - JSON parser
│       • formatJsonField() - JSON formatter
│
└── Documentation files
    ├── README.md                 # Project overview
    ├── SETUP.md                  # Setup instructions
    ├── FEATURES.md               # Feature documentation
    ├── QUICK_REFERENCE.md        # Quick reference
    ├── PROJECT_SUMMARY.md        # Project summary
    └── ARCHITECTURE.md           # This file
```

## 🔌 API Integration

### Supabase Queries

```typescript
// Fetch all events
const { data, error } = await supabase
  .from('events')
  .select('*')
  .order('start_value', { ascending: false })

// Update event
const { error } = await supabase
  .from('events')
  .update({
    event: "Updated Name",
    approved: true,
    updated_at: new Date().toISOString()
  })
  .eq('id', eventId)

// Filter events (example - done client-side in our app)
const { data } = await supabase
  .from('events')
  .select('*')
  .eq('venue_type', 'IRL')
  .eq('approved', true)
```

## 🎯 State Management Strategy

### Local State (useState)
- `events[]` - All events from database
- `filteredEvents[]` - Filtered subset
- `filters{}` - Current filter values
- `selectedEvent` - Event being edited
- `isEditModalOpen` - Modal visibility
- `isLoading` - Loading state
- `error` - Error messages

### Derived State (useMemo/useEffect)
- Filtered events calculated from events + filters
- Statistics calculated from events array

### Props Flow
```
Dashboard (State Owner)
  │
  ├─→ Filters (receives: filters, onFilterChange)
  │
  ├─→ EventsTable (receives: filteredEvents, onEdit)
  │
  └─→ EditEventModal (receives: event, isOpen, onClose, onSave)
```

## 🔄 Update Cycle

```
1. User Action
   ↓
2. Event Handler
   ↓
3. State Update (setState)
   ↓
4. React Re-render
   ↓
5. Components Receive New Props
   ↓
6. DOM Update
   ↓
7. Browser Paint
```

## 🎨 Styling Architecture

### Tailwind CSS Utility Classes
- Used for most styling
- Responsive modifiers (md:, lg:)
- State modifiers (hover:, focus:)

### Custom CSS Variables
```css
:root {
  --color-primary: #52c7f3;
  --color-dark: #222222;
  --color-light: #ffffff;
}
```

### Component-Specific Styles
- Inline styles for dynamic values
- CSS modules not used (Tailwind preferred)
- Global styles in globals.css

## 🔒 Security Architecture

```
Browser
  │
  ├─→ Environment Variables (NEXT_PUBLIC_*)
  │   • Supabase URL
  │   • Supabase Anon Key
  │
  ├─→ Supabase Client
  │   • Authenticated requests
  │   • Row Level Security (RLS)
  │
  └─→ Next.js Security Features
      • XSS protection
      • CSRF protection
      • Secure headers
```

## 📱 Responsive Strategy

```
Mobile First Approach
  │
  ├─→ Base styles for mobile
  │
  ├─→ md: breakpoint (768px) for tablet
  │
  ├─→ lg: breakpoint (1024px) for desktop
  │
  └─→ xl: breakpoint (1280px) for large screens
```

## ⚡ Performance Optimizations

1. **Client-side filtering** - No server requests for filters
2. **useCallback** - Memoized event handlers
3. **React.memo** - Prevent unnecessary re-renders (can be added)
4. **Lazy loading** - Components load on demand
5. **Code splitting** - Next.js automatic splitting
6. **Image optimization** - Next.js Image component ready

## 🧪 Testing Strategy (Future)

```
Unit Tests
  ├─→ UI Components (Button, Input, etc.)
  ├─→ Utility Functions (cn, parseJsonField, etc.)
  └─→ Type Checking (TypeScript)

Integration Tests
  ├─→ Filter functionality
  ├─→ Edit modal workflow
  └─→ Data fetching

E2E Tests
  ├─→ Complete user workflows
  ├─→ Edit event flow
  └─→ Filter and search flow
```

## 🚀 Deployment Architecture

```
Development
  ├─→ Local (pnpm dev)
  └─→ Hot reload enabled

Production
  ├─→ Build (pnpm build)
  ├─→ Optimize assets
  ├─→ Deploy to Vercel/Netlify
  └─→ CDN distribution
```

## 📊 Monitoring & Analytics (Future)

```
Performance Monitoring
  ├─→ Core Web Vitals
  ├─→ Load times
  └─→ Error tracking

User Analytics
  ├─→ Page views
  ├─→ Feature usage
  └─→ User flows
```

---

This architecture provides a solid foundation for a scalable, maintainable, and performant admin dashboard.

