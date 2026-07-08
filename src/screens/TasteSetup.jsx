// src/screens/TasteSetup.jsx
//
// What this screen does:
// A 3-step taste preference flow that seeds the AI with the user's
// food preferences. All tap-based — no typing required.
// Should feel like a quiz, not a form. Under 60 seconds to complete.
//
// selectedCuisines uses an array in state — each tap adds or removes
// a cuisine from the array. This is called a toggle pattern.

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ProgressBar from '../components/ProgressBar'
import CuisineTile from '../components/CuisineTile'

// All available cuisines with their emojis
const CUISINES = [
  { emoji: '🍕', name: 'Italian'       },
  { emoji: '🌮', name: 'Mexican'       },
  { emoji: '🍣', name: 'Japanese'      },
  { emoji: '🍜', name: 'Thai'          },
  { emoji: '🥘', name: 'Indian'        },
  { emoji: '🍔', name: 'American'      },
  { emoji: '🫕', name: 'Mediterranean' },
  { emoji: '🥡', name: 'Chinese'       },
  { emoji: '🧆', name: 'Middle Eastern'},
  { emoji: '🥗', name: 'Healthy'       },
]

export default function TasteSetup() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedCuisines, setSelectedCuisines] = useState([])
  const [eatingStyle, setEatingStyle] = useState('')
  const [cookFrequency, setCookFrequency] = useState(3)
  const [householdType, setHouseholdType] = useState('')

  // Toggle a cuisine on/off in the selectedCuisines array
  // If it's already in the array, remove it. If not, add it.
  const toggleCuisine = (name) => {
    setSelectedCuisines(prev =>
      prev.includes(name)
        ? prev.filter(c => c !== name)   // remove it
        : [...prev, name]                 // add it
    )
  }

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <div className="h-[44px]" />

      <div className="px-6 mt-2 mb-4">
        <ProgressBar current={currentStep} total={3} />
      </div>

      {/* ---- STEP 1 — Cuisines ---- */}
      {currentStep === 1 && (
        <div className="flex flex-col flex-1 px-6">
          <p className="text-[11px] font-medium font-outfit text-text-hint uppercase tracking-widest mb-2">
            Step 1 of 3
          </p>
          <h1 className="text-[24px] font-semibold font-outfit text-text-primary leading-tight mb-1">
            What cuisines do you love?
          </h1>
          <p className="text-[13px] font-outfit text-text-secondary mb-5">
            Tap everything you love — pick at least 3
          </p>

          {/* 2-column cuisine grid */}
          <div className="grid grid-cols-2 gap-[8px] flex-1">
            {CUISINES.map(cuisine => (
              <CuisineTile
                key={cuisine.name}
                emoji={cuisine.emoji}
                name={cuisine.name}
                selected={selectedCuisines.includes(cuisine.name)}
                onToggle={() => toggleCuisine(cuisine.name)}
              />
            ))}
          </div>

          <div className="pb-10 pt-4">
            <button
              onClick={() => {
                if (selectedCuisines.length >= 3) setCurrentStep(2)
              }}
              className={`w-full h-[52px] rounded-xl font-outfit font-medium text-[15px] transition-colors ${
                selectedCuisines.length >= 3
                  ? 'bg-forest text-white'      // enough selected — active
                  : 'bg-pill text-text-hint'    // not enough — greyed out
              }`}
            >
              Next → {selectedCuisines.length > 0 && `(${selectedCuisines.length} selected)`}
            </button>
          </div>
        </div>
      )}

      {/* ---- STEP 2 — Cooking Habits ---- */}
      {currentStep === 2 && (
        <div className="flex flex-col flex-1 px-6">
          <p className="text-[11px] font-medium font-outfit text-text-hint uppercase tracking-widest mb-2">
            Step 2 of 3
          </p>
          <h1 className="text-[24px] font-semibold font-outfit text-text-primary leading-tight mb-1">
            How do you usually eat?
          </h1>
          <p className="text-[13px] font-outfit text-text-secondary mb-6">
            This helps us learn your patterns faster
          </p>

          <div className="space-y-3 mb-6">
            {[
              { value: 'home', emoji: '🥘', label: 'I mostly cook at home', sub: 'You love a home-cooked meal' },
              { value: 'out',  emoji: '🍽️', label: 'I mostly eat out',       sub: 'Restaurants, delivery, takeout' },
              { value: 'both', emoji: '⚖️', label: 'Both equally',            sub: 'Mix of home cooking and going out' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setEatingStyle(option.value)}
                className={`w-full flex items-center gap-4 p-[18px] rounded-[14px] border-[1.5px] text-left transition-all ${
                  eatingStyle === option.value
                    ? 'border-forest bg-pill'
                    : 'border-pill bg-white'
                }`}
              >
                <span className="text-[24px]">{option.emoji}</span>
                <div>
                  <p className="text-[15px] font-medium font-outfit text-text-primary">{option.label}</p>
                  <p className="text-[12px] font-outfit text-text-hint">{option.sub}</p>
                </div>
              </button>
            ))}
          </div>

          {/* Cook frequency slider */}
          <div className="bg-white rounded-[14px] border border-pill p-4 mb-auto">
            <p className="text-[13px] font-medium font-outfit text-text-primary mb-1">
              How many nights a week do you cook?
            </p>
            <p className="text-[24px] font-semibold font-outfit text-forest mb-3 text-center">
              {cookFrequency} {cookFrequency === 1 ? 'night' : 'nights'}
            </p>
            {/* HTML range input — styled with Tailwind accent color */}
            <input
              type="range"
              min="0"
              max="7"
              value={cookFrequency}
              onChange={(e) => setCookFrequency(Number(e.target.value))}
              className="w-full accent-forest"
            />
            <div className="flex justify-between text-[11px] font-outfit text-text-hint mt-1">
              <span>Never</span>
              <span>Every night</span>
            </div>
          </div>

          <div className="pb-10 pt-4">
            <button
              onClick={() => setCurrentStep(3)}
              className="w-full h-[52px] bg-forest text-white rounded-xl font-outfit font-medium text-[15px] active:opacity-80"
            >
              Next →
            </button>
          </div>
        </div>
      )}

      {/* ---- STEP 3 — Household ---- */}
      {currentStep === 3 && (
        <div className="flex flex-col flex-1 px-6">
          <p className="text-[11px] font-medium font-outfit text-text-hint uppercase tracking-widest mb-2">
            Step 3 of 3
          </p>
          <h1 className="text-[24px] font-semibold font-outfit text-text-primary leading-tight mb-1">
            Are you eating solo or with others?
          </h1>
          <p className="text-[13px] font-outfit text-text-secondary mb-8">
            You can always add a household later
          </p>

          <div className="space-y-4 flex-1">
            {[
              { value: 'solo',      emoji: '🙋', label: 'Just me',           sub: 'Personal craving predictions' },
              { value: 'household', emoji: '🏠', label: 'Set up a household', sub: 'Voting + group suggestions' },
            ].map(option => (
              <button
                key={option.value}
                onClick={() => setHouseholdType(option.value)}
                className={`w-full flex items-center gap-4 p-[22px] rounded-[16px] border-[1.5px] text-left transition-all ${
                  householdType === option.value
                    ? 'border-forest bg-pill'
                    : 'border-pill bg-white'
                }`}
              >
                <span className="text-[32px]">{option.emoji}</span>
                <div>
                  <p className="text-[16px] font-semibold font-outfit text-text-primary">{option.label}</p>
                  <p className="text-[12px] font-outfit text-text-hint mt-1">{option.sub}</p>
                </div>
              </button>
            ))}
          </div>

          <div className="pb-10 pt-4">
            <button
              onClick={() => navigate('/dashboard')}
              className={`w-full h-[52px] rounded-xl font-outfit font-medium text-[15px] transition-colors ${
                householdType
                  ? 'bg-forest text-white'
                  : 'bg-pill text-text-hint'
              }`}
            >
              {householdType === 'household' ? 'Set up household →' : householdType === 'solo' ? 'Take me to Cravns →' : 'Choose an option'}
            </button>
          </div>
        </div>
      )}
    </div>
  )
}