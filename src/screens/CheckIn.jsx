// src/screens/CheckIn.jsx
//
// What this screen does:
// The daily meal logging screen — triggered by push notification each evening.
// Must be completable in under 20 seconds or users abandon it.
// Pre-selects the most likely option based on the day.
//
// expandedOption tracks which option card is open showing
// the cuisine tile grid below it. Only one expands at a time.

import { useUser } from '../context/UserContext'
import { useMeals } from '../hooks/useMeals'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import CuisineTile from '../components/CuisineTile'

const CUISINES = [
  { emoji: '🍕', name: 'Italian'  },
  { emoji: '🍜', name: 'Thai'     },
  { emoji: '🥘', name: 'Indian'   },
  { emoji: '🍣', name: 'Japanese' },
  { emoji: '🍔', name: 'American' },
  { emoji: '🌮', name: 'Mexican'  },
]

export default function CheckIn() {
  const navigate = useNavigate()
  const [selectedOption, setSelectedOption] = useState('home') // pre-selected
  const [selectedCuisine, setSelectedCuisine] = useState('')
  const [customEntry, setCustomEntry] = useState('')
  const { user } = useUser()
  const { logMeal } = useMeals()
  const [saving, setSaving] = useState(false)

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric'
  })

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <div className="h-[44px]" />

      <div className="flex-1 px-6 pt-6 flex flex-col">
        {/* Header */}
        <p className="text-[11px] font-medium font-outfit text-amber uppercase tracking-widest mb-2">
          Daily check-in
        </p>
        <h1 className="text-[26px] font-bold font-outfit text-text-primary leading-tight mb-1">
          What did you eat today?
        </h1>
        <p className="text-[13px] font-outfit text-text-hint mb-6">{today}</p>

        {/* Option cards */}
        <div className="space-y-3 flex-1">

          {/* Cooked at home */}
          <div>
            <button
              onClick={() => setSelectedOption('home')}
              className={`w-full flex items-center gap-4 p-[18px] rounded-[14px] border-[1.5px] text-left transition-all ${
                selectedOption === 'home'
                  ? 'border-forest bg-pill'
                  : 'border-pill bg-white'
              }`}
            >
              <span className="text-[26px]">🏠</span>
              <div className="flex-1">
                <p className="text-[15px] font-medium font-outfit text-text-primary">I cooked at home</p>
                <p className="text-[12px] font-outfit text-text-hint">You usually cook on Wednesdays</p>
              </div>
              {selectedOption === 'home' && (
                <div className="w-[22px] h-[22px] rounded-full bg-forest flex items-center justify-center text-white text-[12px] flex-shrink-0">
                  ✓
                </div>
              )}
            </button>

            {/* Expanded cuisine picker — only shows when this option is selected */}
            {selectedOption === 'home' && (
              <div className="bg-pill rounded-[12px] p-4 mt-2">
                <p className="text-[11px] font-medium font-outfit text-text-secondary mb-3">
                  What did you make?
                </p>
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {CUISINES.map(c => (
                    <CuisineTile
                      key={c.name}
                      emoji={c.emoji}
                      name={c.name}
                      selected={selectedCuisine === c.name}
                      onToggle={() => setSelectedCuisine(
                        selectedCuisine === c.name ? '' : c.name
                      )}
                    />
                  ))}
                </div>

                {/* Custom food entry field */}
                {/* This is the escape hatch for meals that don't fit a category */}
                <div className="border-t border-[#C8E0D5] pt-3">
                  <p className="text-[11px] font-medium font-outfit text-text-secondary mb-2">
                    Something else?
                  </p>
                  <div className="flex items-center gap-2 bg-white rounded-[10px] border-[1.5px] border-[#C8E0D5] px-3 h-[38px] focus-within:border-forest transition-colors">
                    <span className="text-[14px]">✏️</span>
                    <input
                      type="text"
                      placeholder="e.g. charcuterie, leftovers, soup..."
                      value={customEntry}
                      onChange={(e) => setCustomEntry(e.target.value)}
                      className="flex-1 bg-transparent font-outfit text-[13px] text-text-primary placeholder:text-text-hint outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Ate out */}
          <button
            onClick={() => setSelectedOption('out')}
            className={`w-full flex items-center gap-4 p-[18px] rounded-[14px] border-[1.5px] text-left transition-all ${
              selectedOption === 'out'
                ? 'border-forest bg-pill'
                : 'border-pill bg-white opacity-60'
            }`}
          >
            <span className="text-[26px]">🍽️</span>
            <div>
              <p className="text-[15px] font-medium font-outfit text-text-primary">I ate out</p>
              <p className="text-[12px] font-outfit text-text-hint">Restaurants, takeout, delivery</p>
            </div>
          </button>

          {/* Both */}
          <button
            onClick={() => setSelectedOption('both')}
            className={`w-full flex items-center gap-4 p-[18px] rounded-[14px] border-[1.5px] text-left transition-all ${
              selectedOption === 'both'
                ? 'border-forest bg-pill'
                : 'border-pill bg-white opacity-60'
            }`}
          >
            <span className="text-[26px]">⚖️</span>
            <div>
              <p className="text-[15px] font-medium font-outfit text-text-primary">Both today</p>
              <p className="text-[12px] font-outfit text-text-hint">Cooked and ate out</p>
            </div>
          </button>
        </div>
      </div>

      {/* Bottom actions */}
      <div className="px-6 pb-10 pt-4">
      <button
  onClick={async () => {
    setSaving(true)

    const { error } = await logMeal({
      mealType: selectedOption,        // 'home', 'out', or 'both'
      cuisine: selectedCuisine,        // e.g. 'Thai' or ''
      customEntry: customEntry,        // free text entry
      locationName: '',                // restaurant name — added later
    })

    setSaving(false)

    if (!error) {
      navigate('/dashboard')
    }
  }}
  className="w-full h-[52px] bg-forest text-white rounded-xl font-outfit font-medium text-[15px] mb-3 active:opacity-80 disabled:opacity-60"
  disabled={saving}
>
  {saving ? 'Saving...' : 'Done ✓'}
</button>
        <p className="text-center text-[13px] font-outfit text-text-hint underline cursor-pointer">
          Skip today
        </p>
      </div>
    </div>
  )
}