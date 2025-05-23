# Supabase Integration Setup Guide

This guide provides instructions for setting up the Supabase integration for the World Cup Itinerary application.

## Prerequisites

1. A Supabase account (sign up at [supabase.com](https://supabase.com))
2. Node.js and npm installed
3. The World Cup Itinerary application codebase

## Setup Steps

### 1. Create a Supabase Project

1. Log in to your Supabase account
2. Click "New Project"
3. Enter a name for your project (e.g., "World Cup Itinerary")
4. Choose a database password (save this for later)
5. Select a region close to your users
6. Click "Create new project"

### 2. Set Up Environment Variables

Create a `.env` file in the root of your project with the following variables:

```
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_KEY=your-service-key
```

Replace the values with your actual Supabase project URL and keys, which you can find in your Supabase project dashboard under "Settings" > "API".

### 3. Set Up the Database Schema

1. Go to your Supabase project dashboard
2. Navigate to the "SQL Editor" section
3. Create a new query
4. Copy and paste the contents of `supabase/schema.sql` into the editor
5. Click "Run" to execute the SQL and create the database schema
6. Repeat this process for `supabase/schema_updates.sql`, `supabase/rls.sql`, and `supabase/functions.sql` in that order

### 4. Configure Storage Buckets

1. Go to the "Storage" section in your Supabase dashboard
2. Create the following buckets:
   - `avatars`: For user profile avatars
   - `documents`: For itinerary day documents
   - `attachments`: For activity attachments

3. Set appropriate bucket policies:

For the `avatars` bucket:
- Enable public access for read operations
- Restrict write operations to authenticated users

For the `documents` and `attachments` buckets:
- Restrict both read and write operations to authenticated users

### 5. Configure Authentication

1. Go to the "Authentication" section in your Supabase dashboard
2. Under "Settings", configure the following:
   - Site URL: Set to your application's URL (e.g., `http://localhost:5173` for development)
   - Redirect URLs: Add your application's URL followed by `/auth/callback` (e.g., `http://localhost:5173/auth/callback`)

3. Enable the email provider and configure email templates as needed

### 6. Migrate Data to Supabase

To migrate your existing standardized JSON files to Supabase:

1. Make sure you're logged in to Supabase in your application
2. Use the admin setup page to run the migration:

```
npm run dev
```

Then navigate to `/admin-setup` in your browser and follow the instructions.

Alternatively, you can use the migration utility directly:

```javascript
import { migrateAllToSupabase } from './app/api/migrationUtils';

// Replace with your user ID
const userId = 'your-user-id';

migrateAllToSupabase(userId)
  .then(results => {
    console.log('Migration complete:', results);
  })
  .catch(error => {
    console.error('Migration failed:', error);
  });
```

### 7. Test the Integration

1. Start your application:

```
npm run dev
```

2. Navigate to the login page and create an account
3. Verify that you can view, create, update, and delete itineraries
4. Test offline functionality by disabling your network connection

## Troubleshooting

### Common Issues

1. **Authentication Issues**:
   - Verify that your Supabase URL and keys are correct
   - Check that your site URL and redirect URLs are properly configured

2. **Database Schema Issues**:
   - Make sure you've run all SQL files in the correct order
   - Check for any error messages in the SQL Editor

3. **Data Migration Issues**:
   - Ensure your user has the necessary permissions
   - Check that your standardized JSON files are valid

4. **Storage Issues**:
   - Verify that your storage buckets are properly configured
   - Check that your bucket policies are set correctly

### Getting Help

If you encounter issues not covered in this guide:

1. Check the Supabase documentation: [supabase.com/docs](https://supabase.com/docs)
2. Review the error messages in your browser console and server logs
3. Reach out to the development team for assistance

## Additional Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase JavaScript Client](https://supabase.com/docs/reference/javascript/introduction)
- [Supabase Auth Documentation](https://supabase.com/docs/guides/auth)
- [Supabase Storage Documentation](https://supabase.com/docs/guides/storage)
