# Environment Variable Setup

## 🔐 Setting Up Your Supabase Credentials

The admin dashboard needs to connect to your Supabase database. Follow these steps to configure the connection.

## Step 1: Create the Environment File

In the `admin-dashboard` directory, create a file named `.env.local`:

```bash
cd admin-dashboard
touch .env.local
```

## Step 2: Add Your Credentials

Open `.env.local` in your text editor and add the following:

```env
NEXT_PUBLIC_SUPABASE_URL=https://pvvrtckedmrkyzfxubkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_SERVICE_KEY_HERE
```

## Step 3: Replace the Service Key

You mentioned you have `SERVICE_KEY=` in your environment. Replace `YOUR_SERVICE_KEY_HERE` with that actual key value.

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://pvvrtckedmrkyzfxubkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2dnJ0Y2tlZG1ya3l6Znh1YmtrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk5OTk5OTksImV4cCI6MjAxNTU3NTk5OX0.example_signature_here
```

## Step 4: Verify the Setup

After creating the file, verify it exists:

```bash
ls -la .env.local
```

You should see the file listed.

## 🔍 Finding Your Supabase Keys

If you need to find your Supabase keys:

1. Go to [https://supabase.com/dashboard](https://supabase.com/dashboard)
2. Select your project
3. Click on "Settings" (gear icon) in the left sidebar
4. Click on "API" in the settings menu
5. You'll see:
   - **Project URL**: Use this for `NEXT_PUBLIC_SUPABASE_URL`
   - **anon/public key**: Use this for `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role key**: For admin operations (use with caution)

## ⚠️ Important Security Notes

### DO NOT:
- ❌ Commit `.env.local` to git (it's already in .gitignore)
- ❌ Share your service key publicly
- ❌ Use service_role key in client-side code (use anon key)
- ❌ Expose keys in screenshots or documentation

### DO:
- ✅ Keep `.env.local` file local to your machine
- ✅ Use environment variables for all sensitive data
- ✅ Use the anon key for client-side operations
- ✅ Set up Row Level Security (RLS) in Supabase

## 🔄 After Setup

Once you've created `.env.local`:

1. Restart your development server if it's running:
   ```bash
   # Stop the server (Ctrl+C)
   # Then restart
   pnpm dev
   ```

2. Open [http://localhost:3000](http://localhost:3000)

3. You should see the dashboard load with your events data

## 🐛 Troubleshooting

### "Cannot connect to Supabase"
- Check that `.env.local` exists in the `admin-dashboard` directory
- Verify the URL and key are correct (no extra spaces)
- Make sure you restarted the dev server after creating the file

### "Invalid API key"
- Double-check you copied the entire key
- Make sure there are no line breaks in the key
- Verify you're using the correct key for your project

### "No events showing"
- Check that your Supabase project has data in the `events` table
- Verify the table name is exactly `events` (lowercase)
- Check browser console for error messages

## 📝 Example Complete Setup

Here's what your `.env.local` file should look like (with your actual values):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://pvvrtckedmrkyzfxubkk.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_key_here_no_quotes_needed
```

## 🎯 Quick Test

To test if your environment is set up correctly, you can add this to any component temporarily:

```typescript
console.log('Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
console.log('Key exists:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
```

You should see:
```
Supabase URL: https://pvvrtckedmrkyzfxubkk.supabase.co
Key exists: true
```

## 🔐 Production Deployment

When deploying to production (Vercel, Netlify, etc.):

1. Add environment variables in your hosting platform's dashboard
2. Use the same variable names: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
3. Never commit `.env.local` to your repository

### Vercel:
- Go to Project Settings → Environment Variables
- Add both variables
- Redeploy

### Netlify:
- Go to Site Settings → Build & Deploy → Environment
- Add both variables
- Redeploy

## ✅ Checklist

Before running the app, make sure:

- [ ] `.env.local` file exists in `admin-dashboard` directory
- [ ] File contains `NEXT_PUBLIC_SUPABASE_URL`
- [ ] File contains `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- [ ] Both values are correct (no typos, no extra spaces)
- [ ] File is not committed to git
- [ ] Development server has been restarted

## 🎉 Success!

Once everything is set up correctly, you'll see:
- Dashboard loads without errors
- Events appear in the table
- Filters work correctly
- Edit modal opens and saves changes

If you see all of this, congratulations! Your environment is properly configured.

---

**Need Help?** Check the browser console (F12) for detailed error messages.

