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

import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Onboarding   from './screens/Onboarding'
import Login        from './screens/Login'
import AccountSetup from './screens/AccountSetup'
import TasteSetup   from './screens/TasteSetup'
import Dashboard    from './screens/Dashboard'
import CheckIn      from './screens/CheckIn'
import Household    from './screens/Household'
import Recipes      from './screens/Recipes'

export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[390px] mx-auto min-h-screen bg-app-bg overflow-hidden">
        <Routes>
          {/* Pre-login — dark forest background */}
          <Route path="/"               element={<Onboarding />}   />
          <Route path="/login"          element={<Login />}         />

          {/* Account creation flow */}
          <Route path="/setup/account"  element={<AccountSetup />}  />
          <Route path="/setup/taste"    element={<TasteSetup />}    />

          {/* Main app */}
          <Route path="/dashboard"      element={<Dashboard />}     />
          <Route path="/checkin"        element={<CheckIn />}       />
          <Route path="/household"      element={<Household />}     />
          <Route path="/recipes"        element={<Recipes />}       />
        </Routes>
      </div>
    </BrowserRouter>
  )
}