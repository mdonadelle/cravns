// src/screens/Login.jsx
//
// What this screen does:
// The login screen for returning users. Matches the dark forest
// visual feel of Onboarding — the pre-login experience is consistently dark.
// Contains email/password fields, social login options, and a sign up link.
//
// useState is used here to track what the user types in the fields.
// This is called a "controlled input" — React owns the value,
// not the browser. This lets us read and validate the input.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import TextInput from '../components/TextInput'

export default function Login() {
  const navigate = useNavigate()

  // Controlled state for both form fields
  // Every keystroke updates these values via the onChange handlers
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  // This will connect to Supabase auth in Phase 3
  // For now it just navigates to the dashboard to test the flow
  const handleLogin = () => {
    navigate('/dashboard')
  }

  return (
    <div className="min-h-screen bg-dark-forest flex flex-col px-8">

      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Logo — centered at top */}
      <div className="flex flex-col items-center mt-8 mb-10">
        <h1 className="font-urbanist font-semibold text-[40px] text-app-bg tracking-tight mb-2">
          Cravns
        </h1>
        <p className="font-outfit text-[13px] text-text-hint">
          Welcome back
        </p>
      </div>

      {/* Form fields */}
      <div className="space-y-3 mb-2">
        {/* TextInput component handles its own styling and focus state */}
        <div>
          <p className="text-[12px] font-medium font-outfit text-text-hint mb-[6px]">
            Email
          </p>
          <div className="w-full h-[52px] bg-white/[0.06] border-[1.5px] border-white/[0.12] rounded-xl flex items-center px-4 gap-3">
            <span className="text-[16px] opacity-60">✉️</span>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] font-outfit text-app-bg placeholder:text-text-hint"
            />
          </div>
        </div>

        <div>
          <p className="text-[12px] font-medium font-outfit text-text-hint mb-[6px]">
            Password
          </p>
          <div className="w-full h-[52px] bg-white/[0.06] border-[1.5px] border-white/[0.12] rounded-xl flex items-center px-4 gap-3">
            <span className="text-[16px] opacity-60">🔒</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="flex-1 bg-transparent outline-none text-[14px] font-outfit text-app-bg placeholder:text-text-hint"
            />
          </div>
        </div>
      </div>

      {/* Forgot password */}
      <div className="flex justify-end mb-7">
        <span className="text-[12px] font-medium font-outfit text-amber cursor-pointer">
          Forgot password?
        </span>
      </div>

      {/* Login button */}
      <button
        onClick={handleLogin}
        className="w-full h-[52px] bg-forest text-white rounded-xl font-outfit font-medium text-[15px] mb-4 active:opacity-80 transition-opacity"
      >
        Log in
      </button>

      {/* Divider */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex-1 h-[1px] bg-white/10" />
        <span className="text-[12px] font-outfit text-text-hint">or continue with</span>
        <div className="flex-1 h-[1px] bg-white/10" />
      </div>

      {/* Social login buttons */}
      <div className="flex gap-3 mb-auto">
        <button className="flex-1 h-[48px] bg-white/[0.06] border-[1.5px] border-white/[0.12] rounded-xl flex items-center justify-center gap-2 active:opacity-80">
          <span className="text-[16px] font-semibold text-app-bg">G</span>
          <span className="text-[13px] font-medium font-outfit text-app-bg">Google</span>
        </button>
        <button className="flex-1 h-[48px] bg-white/[0.06] border-[1.5px] border-white/[0.12] rounded-xl flex items-center justify-center gap-2 active:opacity-80">
          <span className="text-[16px]">🍎</span>
          <span className="text-[13px] font-medium font-outfit text-app-bg">Apple</span>
        </button>
      </div>

      {/* Sign up link */}
      <div className="pb-12 pt-6 text-center">
        <p className="text-[13px] font-outfit text-text-hint">
          Don't have an account?{' '}
          <span
            onClick={() => navigate('/setup/account')}
            className="text-amber font-medium cursor-pointer"
          >
            Sign up
          </span>
        </p>
        <p className="text-[11px] font-outfit text-text-hint opacity-50 mt-3 leading-relaxed">
          By continuing you accept our Terms of Use and Privacy Notice
        </p>
      </div>
    </div>
  )
}