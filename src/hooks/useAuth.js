// src/hooks/useAuth.js
//
// What this hook does:
// Wraps Supabase's authentication system in a clean, reusable hook.
// Any screen that needs to know if a user is logged in,
// sign them in, or sign them out imports this hook.
//
// The hook tracks three things:
// user — the currently logged in user object (null if not logged in)
// loading — true while we're checking if there's an existing session
// profile — the user's profile data from our profiles table
//
// Why we check for an existing session on load:
// If a user logged in yesterday and comes back today, we don't
// want them to see the login screen again. Supabase stores the
// session in localStorage and this check finds it automatically.

import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export function useAuth() {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  // fetchProfile: gets the user's profile row from our profiles table
  // Called whenever the auth state changes to a logged-in user
  const fetchProfile = async (userId) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single() // .single() returns one object instead of an array

    if (data) setProfile(data)
  }

  useEffect(() => {
    // Check for an existing session when the app first loads
    // This is what keeps users logged in between visits
    supabase.auth.getSession().then(({ data: { session } }) => {
      const currentUser = session?.user ?? null
      setUser(currentUser)
      if (currentUser) fetchProfile(currentUser.id)
      setLoading(false)
    })

    // Subscribe to auth state changes
    // This fires whenever: user logs in, logs out, or session refreshes
    // The ?. optional chaining prevents errors if session is null
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        const currentUser = session?.user ?? null
        setUser(currentUser)
        if (currentUser) fetchProfile(currentUser.id)
        else setProfile(null)
      }
    )

    // Cleanup function — unsubscribes when the component using this
    // hook unmounts. Prevents memory leaks in long-running apps.
    return () => subscription.unsubscribe()
  }, [])

  // signUp: creates a new account with email and password
  // The options.data object passes extra info to the auth.users table
  // which our trigger uses to create the profile row
  const signUp = async (email, password, firstName) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { first_name: firstName }
      }
    })
    return { data, error }
  }

  // signIn: authenticates with existing email and password
  // Supabase handles the password hashing and verification
  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password
    })
    return { data, error }
  }

  // signOut: ends the session and clears localStorage
  // After this runs, user becomes null and the app redirects to Onboarding
  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    return { error }
  }

  // updateProfile: saves changes to the profiles table
  // Used when the user updates their name, username, or notification time
  const updateProfile = async (updates) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)

    if (data) setProfile(prev => ({ ...prev, ...updates }))
    return { data, error }
  }

  return { user, profile, loading, signUp, signIn, signOut, updateProfile }
}