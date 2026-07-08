// src/screens/AccountSetup.jsx
//
// What this screen does:
// A 2-step account creation flow after sign up.
// Step 1: Name and username
// Step 2: Notification preferences and permissions
//
// currentStep state controls which step is visible.
// Incrementing it from 1 to 2 shows the second step.
// This is called a multi-step form pattern — common in onboarding flows.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'

export default function AccountSetup() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [notifTime, setNotifTime] = useState('19:00')

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">

      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Progress bar */}
      <div className="px-6 mt-2">
        <ProgressBar current={currentStep} total={2} />
      </div>

      {/* ---- STEP 1 — Profile ---- */}
      {currentStep === 1 && (
        <div className="flex flex-col flex-1 px-6 pt-6">
          <p className="text-[11px] font-medium font-outfit text-text-hint uppercase tracking-widest mb-2">
            Step 1 of 2
          </p>
          <h1 className="text-[26px] font-semibold font-outfit text-text-primary leading-tight mb-1">
            Set up your profile
          </h1>
          <p className="text-[13px] font-outfit text-text-secondary mb-8">
            This is how your household will see you
          </p>

          {/* Avatar placeholder */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-[88px] h-[88px] rounded-full bg-pill border-[3px] border-forest flex items-center justify-center text-[36px] mb-3 relative">
              👤
              {/* Camera icon overlay */}
              <div className="absolute bottom-0 right-0 w-[26px] h-[26px] bg-forest rounded-full border-[2px] border-app-bg flex items-center justify-center text-[12px]">
                📷
              </div>
            </div>
            <span className="text-[12px] font-medium font-outfit text-forest">
              Add a photo
            </span>
          </div>

          {/* Name fields */}
          <div className="space-y-3 mb-auto">
            <div>
              <p className="text-[12px] font-medium font-outfit text-text-secondary mb-[6px]">First name</p>
              <input
                type="text"
                placeholder="Your first name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full h-[52px] bg-white border-[1.5px] border-pill rounded-xl px-4 font-outfit text-[14px] text-text-primary placeholder:text-text-hint outline-none focus:border-forest transition-colors"
              />
            </div>
            <div>
              <p className="text-[12px] font-medium font-outfit text-text-secondary mb-[6px]">Last name</p>
              <input
                type="text"
                placeholder="Your last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full h-[52px] bg-white border-[1.5px] border-pill rounded-xl px-4 font-outfit text-[14px] text-text-primary placeholder:text-text-hint outline-none focus:border-forest transition-colors"
              />
            </div>
            <div>
              <p className="text-[12px] font-medium font-outfit text-text-secondary mb-[6px]">Username</p>
              <div className="w-full h-[52px] bg-white border-[1.5px] border-pill rounded-xl px-4 flex items-center gap-1 focus-within:border-forest transition-colors">
                <span className="font-outfit text-[14px] text-text-hint">@</span>
                <input
                  type="text"
                  placeholder="chooseyourusername"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="flex-1 bg-transparent font-outfit text-[14px] text-text-primary placeholder:text-text-hint outline-none"
                />
              </div>
            </div>
          </div>

          <div className="pb-10 pt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full h-[52px] bg-forest text-white rounded-xl font-outfit font-medium text-[15px] active:opacity-80"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* ---- STEP 2 — Notifications ---- */}
      {currentStep === 2 && (
        <div className="flex flex-col flex-1 px-6 pt-6">
          <p className="text-[11px] font-medium font-outfit text-text-hint uppercase tracking-widest mb-2">
            Step 2 of 2
          </p>
          <h1 className="text-[26px] font-semibold font-outfit text-text-primary leading-tight mb-1">
            Almost there
          </h1>
          <p className="text-[13px] font-outfit text-text-secondary mb-6">
            Set up how Cravns keeps you in the loop
          </p>

          <div className="space-y-4 flex-1">
            {/* Push notifications card */}
            <div className="bg-white rounded-[16px] border border-pill p-[18px] flex gap-4">
              <div className="w-[44px] h-[44px] bg-pill rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0">
                🔔
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold font-outfit text-text-primary mb-1">Push notifications</p>
                <p className="text-[12px] font-outfit text-text-secondary leading-relaxed mb-3">
                  Daily check-in reminders and household voting alerts. Essential for the app to work.
                </p>
                <button className="h-[30px] px-4 bg-forest text-white rounded-lg text-[12px] font-medium font-outfit">
                  Enable
                </button>
              </div>
            </div>

            {/* Check-in time card */}
            <div className="bg-white rounded-[16px] border border-pill p-[18px] flex gap-4">
              <div className="w-[44px] h-[44px] bg-amber-bg rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0">
                🕐
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold font-outfit text-text-primary mb-1">Daily check-in time</p>
                <p className="text-[12px] font-outfit text-text-secondary leading-relaxed mb-3">
                  When should we remind you to log what you ate?
                </p>
                <div className="flex gap-2 flex-wrap">
                  {['19:00', '20:00', '21:00'].map(time => (
                    <button
                      key={time}
                      onClick={() => setNotifTime(time)}
                      className={`h-[30px] px-3 rounded-lg text-[12px] font-medium font-outfit transition-colors ${
                        notifTime === time
                          ? 'bg-forest text-white'
                          : 'bg-pill text-forest'
                      }`}
                    >
                      {time === '19:00' ? '7 PM' : time === '20:00' ? '8 PM' : '9 PM'}
                    </button>
                  ))}
                  <button className="h-[30px] px-3 bg-pill text-text-hint rounded-lg text-[12px] font-medium font-outfit">
                    Custom
                  </button>
                </div>
              </div>
            </div>

            {/* Location card */}
            <div className="bg-white rounded-[16px] border border-pill p-[18px] flex gap-4">
              <div className="w-[44px] h-[44px] bg-pill rounded-[12px] flex items-center justify-center text-[22px] flex-shrink-0">
                📍
              </div>
              <div className="flex-1">
                <p className="text-[14px] font-semibold font-outfit text-text-primary mb-1">Location access</p>
                <p className="text-[12px] font-outfit text-text-secondary leading-relaxed mb-3">
                  Used to find restaurants near you. Optional but recommended.
                </p>
                <div className="flex gap-2">
                  <button className="h-[30px] px-4 bg-forest text-white rounded-lg text-[12px] font-medium font-outfit">
                    Allow
                  </button>
                  <button className="h-[30px] px-4 text-text-hint text-[12px] font-outfit underline">
                    Skip
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-10 pt-4">
            <button
              onClick={() => navigate('/setup/taste')}
              className="w-full h-[52px] bg-forest text-white rounded-xl font-outfit font-medium text-[15px] mb-2 active:opacity-80"
            >
              Let's go 🎉
            </button>
            <p className="text-center text-[11px] font-outfit text-text-hint">
              You can change these anytime in Settings
            </p>
          </div>
        </div>
      )}
    </div>
  )
}