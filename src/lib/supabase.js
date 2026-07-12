// src/lib/supabase.js
//
// What this file does:
// Creates and exports a single Supabase client that the entire app uses
// to communicate with the database and authentication system.
//
// createClient takes the URL and key and returns a client object
// with methods for auth, database queries, storage, and more.
// We export it so any file in the project can import and use it
// without creating multiple connections.

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)