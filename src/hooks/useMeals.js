// src/hooks/useMeals.js
//
// What this hook does:
// All database operations related to meal logging.
// Used by the CheckIn screen (logMeal) and Dashboard (getRecentMeals).
// Used by the AI hook in Phase 5 (getMealHistory).
//
// Why async/await:
// Database operations take time — they're network requests.
// async/await lets JavaScript wait for the response before
// continuing, without freezing the whole app.
// async marks a function as asynchronous.
// await pauses that function until the promise resolves.

import { supabase } from '../lib/supabase'
import { useUser } from '../context/UserContext'

export function useMeals() {
  const { user } = useUser()

  // logMeal: inserts one row into meal_logs
  // Called when user taps "Done ✓" on the Check-In screen
  // All fields are optional except meal_type — cuisine can be null
  // if the user only entered a custom_entry
  const logMeal = async ({ mealType, cuisine, customEntry, locationName }) => {
    if (!user) return { error: 'Not logged in' }

    const { data, error } = await supabase
      .from('meal_logs')
      .insert({
        user_id: user.id,
        meal_type: mealType,
        cuisine: cuisine || null,
        custom_entry: customEntry || null,
        location_name: locationName || null,
        logged_at: new Date().toISOString().split('T')[0], // YYYY-MM-DD format
      })

    return { data, error }
  }

  // getRecentMeals: fetches the last N meals for the dashboard strip
  // .order('logged_at', { ascending: false }) = newest first
  // .limit(limit) = only fetch what we need, not the whole table
  const getRecentMeals = async (limit = 6) => {
    if (!user) return { data: [], error: null }

    const { data, error } = await supabase
      .from('meal_logs')
      .select('*')
      .eq('user_id', user.id)
      .order('logged_at', { ascending: false })
      .limit(limit)

    return { data: data || [], error }
  }

  // getMealHistory: fetches up to 90 days of history for the AI
  // .gte = greater than or equal to (SQL >= operator)
  // This gives the AI enough data to find weekly and monthly patterns
  const getMealHistory = async (days = 90) => {
    if (!user) return { data: [], error: null }

    const since = new Date()
    since.setDate(since.getDate() - days)
    const sinceDate = since.toISOString().split('T')[0]

    const { data, error } = await supabase
      .from('meal_logs')
      .select('*')
      .eq('user_id', user.id)
      .gte('logged_at', sinceDate)
      .order('logged_at', { ascending: false })

    return { data: data || [], error }
  }

  // checkTodayLogged: returns true if the user already logged a meal today
  // Used to show a "Already logged today ✓" state on the dashboard
  const checkTodayLogged = async () => {
    if (!user) return false

    const today = new Date().toISOString().split('T')[0]

    const { data } = await supabase
      .from('meal_logs')
      .select('id')
      .eq('user_id', user.id)
      .eq('logged_at', today)
      .limit(1)

    return data && data.length > 0
  }

  return { logMeal, getRecentMeals, getMealHistory, checkTodayLogged }
}