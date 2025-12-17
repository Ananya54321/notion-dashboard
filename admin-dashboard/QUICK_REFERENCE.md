# Quick Reference Guide

## 🚀 Getting Started (3 Steps)

1. **Install**: `pnpm install`
2. **Configure**: Create `.env.local` with your Supabase credentials
3. **Run**: `pnpm dev`

## 🎨 Color Palette

```
Primary:  #52c7f3  (Sky Blue)
Dark:     #222222  (Near Black)
Light:    #ffffff  (White)
```

## 📁 Project Structure

```
admin-dashboard/
├── app/
│   ├── page.tsx          → Main dashboard
│   ├── layout.tsx        → Root layout
│   └── globals.css       → Global styles
├── components/
│   ├── ui/               → Reusable UI components
│   ├── filters.tsx       → Filter panel
│   ├── events-table.tsx  → Events table
│   └── edit-event-modal.tsx → Edit modal
└── lib/
    ├── supabase.ts       → Supabase client
    ├── database.types.ts → TypeScript types
    └── utils.ts          → Utility functions
```

## 🔑 Key Components

### Button
```tsx
<Button variant="default|outline|ghost|destructive" size="default|sm|lg|icon">
  Click me
</Button>
```

### Input
```tsx
<Input placeholder="Enter text..." value={value} onChange={handleChange} />
```

### Select
```tsx
<Select value={value} onChange={handleChange}>
  <option value="1">Option 1</option>
</Select>
```

### Checkbox
```tsx
<Checkbox checked={checked} onChange={handleChange} />
```

### Modal
```tsx
<Modal isOpen={isOpen} onClose={handleClose} title="Modal Title">
  Content here
</Modal>
```

### Badge
```tsx
<Badge variant="default|success|warning|error">Label</Badge>
```

## 🔍 Filter Options

| Filter | Type | Options |
|--------|------|---------|
| Search | Text | Event name, location, theme |
| Venue Type | Dropdown | IRL, Virtual, Hybrid |
| Approved | Dropdown | Yes, No, All |
| Highlighted | Dropdown | Yes, No, All |
| Ecosystem | Dropdown | Adjacent, Core, Ecosystem |
| Start Date | Date | From date |
| End Date | Date | To date |

## 📊 Event Fields

### Required
- Event Name

### Optional - Basic
- Location
- Start Date/Time
- End Date/Time
- Venue Type
- Ecosystem Focus
- Season

### Optional - Social
- Twitter
- Farcaster
- Discord
- Telegram
- Website Links

### Optional - Media
- Logo URL
- Banner Image URL

### Optional - Categorization
- Categories (array)
- Themes (array)

### Optional - Status
- Approved (boolean)
- Highlighted (boolean)

## 🛠️ Common Tasks

### Add New Event
Currently view-only. To add events, use Supabase dashboard or API.

### Edit Event
1. Find event in table
2. Click "Edit" button
3. Modify fields
4. Click "Save Changes"

### Filter Events
1. Use search bar for quick search
2. Click "Filters" for advanced options
3. Select criteria
4. Click "Clear" to reset

### Refresh Data
Click the "Refresh" button in the header

## 🎯 Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Esc` | Close modal |
| `Tab` | Navigate between fields |
| `Enter` | Submit form (in modal) |

## 🔧 Environment Variables

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_service_key
```

## 📦 Dependencies

| Package | Purpose |
|---------|---------|
| `next` | React framework |
| `@supabase/supabase-js` | Database client |
| `@tanstack/react-table` | Table management |
| `date-fns` | Date formatting |
| `lucide-react` | Icons |
| `tailwindcss` | Styling |

## 🐛 Troubleshooting

### Events not loading
- Check `.env.local` exists
- Verify Supabase credentials
- Check browser console for errors

### Edit not saving
- Check network connection
- Verify Supabase permissions
- Check browser console for errors

### Filters not working
- Clear browser cache
- Check if data exists
- Try refreshing the page

## 📝 API Endpoints (Supabase)

```typescript
// Fetch all events
supabase.from('events').select('*')

// Update event
supabase.from('events').update(data).eq('id', eventId)

// Filter events
supabase.from('events').select('*').eq('approved', true)
```

## 🎨 Styling Utilities

```typescript
// Combine classes
cn("class1", "class2", condition && "class3")

// Parse JSON fields
parseJsonField(jsonString) // → array

// Format JSON fields
formatJsonField(array) // → JSON string
```

## 📱 Responsive Design

| Breakpoint | Width | Layout |
|------------|-------|--------|
| Mobile | < 768px | Single column |
| Tablet | 768px - 1024px | Two columns |
| Desktop | > 1024px | Full layout |
| Large | > 1600px | Max width container |

## 🚀 Performance Tips

1. Use filters to reduce visible events
2. Close modal when not editing
3. Refresh only when needed
4. Use search for quick lookups

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## 💡 Pro Tips

1. **Comma-separated values**: For themes, categories, and links, enter values separated by commas
2. **Image URLs**: Paste full URLs including `https://`
3. **Date formats**: Use the date picker for consistent formatting
4. **Bulk editing**: Edit similar events one after another for efficiency
5. **Filter combinations**: Combine multiple filters for precise results

