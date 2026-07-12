// src/context/UserContext.jsx
//
// What this file does:
// Creates a React Context that makes the logged-in user and their
// profile data available to every screen and component in the app
// without prop drilling.
//
// UserProvider: a wrapper component that goes around the entire app.
// It runs useAuth() once and shares the result with everything inside it.
//
// useUser: a custom hook that any component calls to get the current
// user data. Much cleaner than importing useAuth everywhere.
//
// How it works:
// 1. UserProvider wraps the app in App.jsx
// 2. It runs useAuth() to get user, profile, loading, and auth functions
// 3. It passes all of that through UserContext.Provider
// 4. Any component calls useUser() to access it

import { createContext, useContext } from 'react'
import { useAuth } from '../hooks/useAuth'

// Create the context object — this is just an empty container
// The actual value gets provided by UserProvider below
const UserContext = createContext(null)

// UserProvider — wraps the entire app to provide auth state everywhere
export function UserProvider({ children }) {
  // useAuth() runs here — once for the whole app
  const auth = useAuth()

  return (
    // auth contains: user, profile, loading, signUp, signIn, signOut, updateProfile
    // Everything from useAuth is now available to all children
    <UserContext.Provider value={auth}>
      {children}
    </UserContext.Provider>
  )
}

// useUser — the hook components call to access the context
// Throws a helpful error if used outside of UserProvider
export function useUser() {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used inside UserProvider')
  }
  return context
}