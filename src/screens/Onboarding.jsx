// src/screens/Onboarding.jsx
//
// What this screen does:
// The very first screen anyone sees when they open Cravns.
// Dark forest background creates a dramatic, premium first impression
// distinct from every other screen in the app.
// No form fields — one button, one login link. Zero friction.
//
// useNavigate: lets us programmatically send the user to the next screen
// when they tap "Get started"

import { useNavigate } from 'react-router-dom'

export default function Onboarding() {
  const navigate = useNavigate()

  return (
    // min-h-screen — fills the full screen height
    // bg-dark-forest — the deep green background unique to pre-login screens
    // flex flex-col — stack children vertically
    // px-8 — 32px horizontal padding (slightly more than standard for this screen)
    <div className="min-h-screen bg-dark-forest flex flex-col items-center justify-between px-8 py-12">

      {/* Top spacer — pushes logo to vertical center */}
      <div className="flex-1" />

      {/* Center — Logo and tagline */}
      <div className="flex flex-col items-center text-center">
        {/* Urbanist 600 — logo font only, never used for UI text */}
        <h1 className="font-urbanist font-semibold text-[48px] text-app-bg tracking-tight mb-3">
          Cravns
        </h1>
        <p className="font-outfit text-[14px] text-text-hint leading-relaxed">
          Know what you want before you want it.
        </p>
      </div>

      {/* Bottom spacer */}
      <div className="flex-1" />

      {/* Bottom actions — anchored to bottom of screen */}
      <div className="w-full space-y-4">
        <button
          onClick={() => navigate('/setup/account')}
          className="w-full h-[52px] bg-forest text-white rounded-xl font-outfit font-medium text-[15px] active:opacity-80 transition-opacity"
        >
          Get started
        </button>

        <p className="text-center text-[13px] text-text-hint">
          Already have an account?{' '}
          <span
            onClick={() => navigate('/login')}
            className="text-amber font-medium cursor-pointer"
          >
            Login
          </span>
        </p>

        <p className="text-center text-[11px] text-text-hint opacity-60 leading-relaxed">
          By continuing you accept our Terms of Use and Privacy Notice
        </p>
      </div>
    </div>
  )
}