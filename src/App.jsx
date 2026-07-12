// src/App.jsx
// What this file does: The root of the entire Cravns app.
// BrowserRouter enables URL-based navigation.
// Routes defines which component renders for each URL path.
// max-w-[390px] constrains the app to iPhone width on any screen.
// overflow-hidden prevents anything from spilling outside the phone frame.

// src/App.jsx
// What this file does: The root of the Cravns app.
// Every screen is imported here and mapped to a URL path.
// BrowserRouter enables URL-based navigation.
// max-w-[390px] constrains to iPhone width on any display.

import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { UserProvider, useUser } from './context/UserContext'

import Onboarding   from './screens/Onboarding'
import Login        from './screens/Login'
import AccountSetup from './screens/AccountSetup'
import TasteSetup   from './screens/TasteSetup'
import Dashboard    from './screens/Dashboard'
import CheckIn      from './screens/CheckIn'
import Household    from './screens/Household'
import Recipes      from './screens/Recipes'

// AppRoutes is a separate component so it can use useUser()
// (hooks can only be used inside components, not at the module level)
function AppRoutes() {
  const { user, loading } = useUser()

  // Show a simple loading screen while checking for existing session
  if (loading) {
    return (
      <div className="min-h-screen bg-dark-forest flex items-center justify-center">
        <p className="font-urbanist text-[32px] font-semibold text-app-bg">Cravns</p>
      </div>
    )
  }

  return (
    <Routes>
      {/* If user is logged in, redirect root to dashboard */}
      <Route
        path="/"
        element={user ? <Navigate to="/dashboard" /> : <Onboarding />}
      />

      {/* Auth screens — redirect to dashboard if already logged in */}
      <Route
        path="/login"
        element={user ? <Navigate to="/dashboard" /> : <Login />}
      />

      {/* Setup flow */}
      <Route path="/setup/account"  element={<AccountSetup />}  />
      <Route path="/setup/taste"    element={<TasteSetup />}    />

      {/* Protected screens — redirect to onboarding if not logged in */}
      <Route
        path="/dashboard"
        element={user ? <Dashboard /> : <Navigate to="/" />}
      />
      <Route
        path="/checkin"
        element={user ? <CheckIn /> : <Navigate to="/" />}
      />
      <Route
        path="/household"
        element={user ? <Household /> : <Navigate to="/" />}
      />
      <Route
        path="/recipes"
        element={user ? <Recipes /> : <Navigate to="/" />}
      />
    </Routes>
  )
}

export default function App() {
  return (
    // UserProvider wraps everything — auth state available to all screens
    <UserProvider>
      <BrowserRouter>
        <div className="max-w-[390px] mx-auto min-h-screen bg-app-bg overflow-hidden">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </UserProvider>
  )
}