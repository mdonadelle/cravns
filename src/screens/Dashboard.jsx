// src/screens/Dashboard.jsx
//
// What this screen does:
// The main daily hub — the screen users return to every day.
// Shows the AI craving suggestion, household voting banner,
// and recent meal history.
//
// The AI craving card is the hero element — it must be the first
// thing the eye goes to. Everything else is secondary.
//
// In Phase 5 this screen will fetch real AI suggestions from Claude.
// For now we use placeholder data to build the layout.

import { useNavigate } from 'react-router-dom'
import BottomNav from '../components/BottomNav'
import PillBadge from '../components/PillBadge'

// Placeholder data — replaced with real Supabase + AI data in Phase 3 and 5
const PLACEHOLDER_CRAVING = {
  cuisine: 'Thai food',
  reason: "You haven't had it in 18 days — you usually crave it around now",
  daysSince: 18,
}

const PLACEHOLDER_MEALS = [
  { emoji: '🍕', name: 'Italian',  date: 'Mon', type: '🏠' },
  { emoji: '🍔', name: 'Burgers',  date: 'Sun', type: '🍽️' },
  { emoji: '🥘', name: 'Indian',   date: 'Fri', type: '🏠' },
  { emoji: '🍣', name: 'Japanese', date: 'Thu', type: '🍽️' },
]

export default function Dashboard() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">

      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <p className="text-[12px] font-outfit text-text-hint mb-[2px]">Wednesday evening</p>
          <p className="text-[20px] font-semibold font-outfit text-text-primary">Hey, Malik 👋</p>
        </div>
        {/* Avatar */}
        <div className="w-[38px] h-[38px] rounded-full bg-pill border-[2px] border-forest flex items-center justify-center font-semibold font-outfit text-forest text-[15px]">
          M
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3">

        {/* AI Craving Card — hero element, takes ~40% of visible screen */}
        <div className="bg-white rounded-[20px] border border-pill p-5 shadow-sm">
          {/* Amber eyebrow label — amber color reserved for AI/delight moments */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[6px] h-[6px] rounded-full bg-amber" />
            <p className="text-[10px] font-semibold font-outfit text-amber uppercase tracking-widest">
              Tonight's craving
            </p>
          </div>

          {/* Cuisine name — largest text on the screen */}
          <p className="text-[32px] font-bold font-outfit text-text-primary leading-none mb-2">
            {PLACEHOLDER_CRAVING.cuisine}
          </p>

          {/* AI reason line */}
          <p className="text-[13px] font-outfit text-text-secondary leading-relaxed mb-4">
            {PLACEHOLDER_CRAVING.reason}
          </p>

          {/* Pill badges */}
          <div className="flex gap-2 mb-4">
            <PillBadge label={`${PLACEHOLDER_CRAVING.daysSince} days overdue`} variant="amber" />
            <PillBadge label="House fave" variant="green" />
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2">
            <button className="flex-1 h-[44px] bg-forest text-white rounded-[10px] font-outfit font-medium text-[13px] active:opacity-80">
              🍽️ Restaurant
            </button>
            <button className="flex-1 h-[44px] border-[1.5px] border-forest text-forest rounded-[10px] font-outfit font-medium text-[13px] active:opacity-80">
              📖 Recipe
            </button>
          </div>
        </div>

        {/* Household Voting Banner — dark forest creates contrast */}
        <div
          onClick={() => navigate('/household')}
          className="bg-dark-forest rounded-[16px] p-4 flex items-center justify-between cursor-pointer active:opacity-90"
        >
          <div>
            <p className="text-[14px] font-medium font-outfit text-app-bg mb-1">
              Household vote is open 🗳️
            </p>
            <p className="text-[11px] font-outfit text-text-hint">
              2 of 3 voted · Waiting on Mike
            </p>
          </div>
          {/* Amber button on dark surface */}
          <button className="bg-amber text-dark-forest text-[12px] font-semibold font-outfit px-4 py-2 rounded-lg flex-shrink-0">
            Vote now
          </button>
        </div>

        {/* Recent Meals */}
        <div>
          <p className="text-[15px] font-semibold font-outfit text-text-primary mb-3">
            Recent meals
          </p>
          {/* Horizontal scroll — overflow-x-auto enables horizontal scrolling */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {PLACEHOLDER_MEALS.map((meal, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] border border-pill p-3 min-w-[110px] flex-shrink-0"
              >
                <p className="text-[20px] mb-2">{meal.emoji}</p>
                <p className="text-[12px] font-medium font-outfit text-text-primary mb-1">{meal.name}</p>
                <p className="text-[10px] font-outfit text-text-hint">{meal.date} · {meal.type}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom nav — always visible, never scrolls */}
      <BottomNav />
    </div>
  )
}