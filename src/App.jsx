// src/App.jsx
// What this file does: The root of the entire Cravns app.
// BrowserRouter enables URL-based navigation.
// Routes defines which component renders for each URL path.
// max-w-[390px] constrains the app to iPhone width on any screen.
// overflow-hidden prevents anything from spilling outside the phone frame.

import { BrowserRouter, Routes, Route } from 'react-router-dom'

// We'll import screens here as we build them — for now just a placeholder
export default function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[390px] mx-auto min-h-screen bg-app-bg overflow-hidden">
        <Routes>
          {/* Screens get added here as you build them */}
          <Route path="/" element={<div className="flex items-center justify-center min-h-screen"><p className="font-outfit text-forest">Cravns is loading...</p></div>} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}