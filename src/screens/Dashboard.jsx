// src/screens/Dashboard.jsx

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'
import { useMeals } from '../hooks/useMeals'
import BottomNav from '../components/BottomNav'
import PillBadge from '../components/PillBadge'

const PLACEHOLDER_CRAVING = {
  cuisine: 'Thai food',
  reason: "You haven't had it in 18 days — you usually crave it around now",
  daysSince: 18,
}

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, profile, signOut } = useUser()
  const { getRecentMeals, checkTodayLogged } = useMeals()
  const [recentMeals, setRecentMeals] = useState([])
  const [todayLogged, setTodayLogged] = useState(false)

  const firstName = profile?.first_name || 'there'
  const hour = new Date().getHours()
  const greeting = hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  useEffect(() => {
    async function loadDashboardData() {
      const { data: meals } = await getRecentMeals(6)
      setRecentMeals(meals)

      const logged = await checkTodayLogged()
      setTodayLogged(logged)
    }

    loadDashboardData()
  }, [user?.id])

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">

      {/* Status bar spacer */}
      <div className="h-[44px]" />

      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-3">
        <div>
          <p className="text-[12px] font-outfit text-text-hint mb-[2px]">{greeting}</p>
          <p className="text-[20px] font-semibold font-outfit text-text-primary">Hey, {firstName} 👋</p>
        </div>
        <div
          onClick={signOut}
          className="w-[38px] h-[38px] rounded-full bg-pill border-[2px] border-forest flex items-center justify-center font-semibold font-outfit text-forest text-[15px] cursor-pointer"
        >
          {firstName[0]?.toUpperCase() || 'U'}
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-6 pb-4 space-y-3">

        {/* AI Craving Card */}
        <div className="bg-white rounded-[20px] border border-pill p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-[6px] h-[6px] rounded-full bg-amber" />
            <p className="text-[10px] font-semibold font-outfit text-amber uppercase tracking-widest">
              Tonight's craving
            </p>
          </div>
          <p className="text-[32px] font-bold font-outfit text-text-primary leading-none mb-2">
            {PLACEHOLDER_CRAVING.cuisine}
          </p>
          <p className="text-[13px] font-outfit text-text-secondary leading-relaxed mb-4">
            {PLACEHOLDER_CRAVING.reason}
          </p>
          <div className="flex gap-2 mb-4">
            <PillBadge label={`${PLACEHOLDER_CRAVING.daysSince} days overdue`} variant="amber" />
            <PillBadge label="House fave" variant="green" />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 h-[44px] bg-forest text-white rounded-[10px] font-outfit font-medium text-[13px] active:opacity-80">
              🍽️ Restaurant
            </button>
            <button className="flex-1 h-[44px] border-[1.5px] border-forest text-forest rounded-[10px] font-outfit font-medium text-[13px] active:opacity-80">
              📖 Recipe
            </button>
          </div>
        </div>

        {/* Household Voting Banner */}
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
          <button className="bg-amber text-dark-forest text-[12px] font-semibold font-outfit px-4 py-2 rounded-lg flex-shrink-0">
            Vote now
          </button>
        </div>

        {/* Check-in prompt */}
        {!todayLogged ? (
          <div
            onClick={() => navigate('/checkin')}
            className="bg-pill rounded-[14px] p-4 flex items-center justify-between cursor-pointer border border-forest/20"
          >
            <div>
              <p className="text-[14px] font-medium font-outfit text-text-primary mb-1">
                Log today's meal 🍽️
              </p>
              <p className="text-[11px] font-outfit text-text-hint">
                Takes 15 seconds — helps your AI learn
              </p>
            </div>
            <span className="text-forest text-[20px]">→</span>
          </div>
        ) : (
          <div className="bg-pill rounded-[14px] p-4 flex items-center gap-3 border border-forest/20">
            <span className="text-[20px]">✅</span>
            <p className="text-[13px] font-outfit text-text-secondary">
              Today's meal logged — great streak!
            </p>
          </div>
        )}

        {/* Recent Meals */}
        <div>
          <p className="text-[15px] font-semibold font-outfit text-text-primary mb-3">
            Recent meals
          </p>
          {recentMeals.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {recentMeals.map((meal, i) => (
                <div
                  key={i}
                  className="bg-white rounded-[12px] border border-pill p-3 min-w-[110px] flex-shrink-0"
                >
                  <p className="text-[20px] mb-2">
                    {meal.meal_type === 'cooked' ? '🏠' : '🍽️'}
                  </p>
                  <p className="text-[12px] font-medium font-outfit text-text-primary mb-1">
                    {meal.cuisine || meal.custom_entry || 'Meal'}
                  </p>
                  <p className="text-[10px] font-outfit text-text-hint">
                    {new Date(meal.logged_at).toLocaleDateString('en-US', { weekday: 'short' })}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-[12px] border border-pill p-4 text-center">
              <p className="text-[13px] font-outfit text-text-hint">
                No meals logged yet — check in after dinner 🍽️
              </p>
            </div>
          )}
        </div>

      </div>

      {/* Bottom nav */}
      <BottomNav />
    </div>
  )
}