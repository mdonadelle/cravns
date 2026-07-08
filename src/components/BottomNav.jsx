// src/components/BottomNav.jsx
//
// What this component does:
// The persistent 4-tab navigation bar that appears at the bottom
// of every in-app screen (Dashboard, Recipes, Household, Profile).
// Highlights the active tab in forest green based on the current URL.
// Tapping a tab navigates to that screen.
//
// useNavigate: a React Router hook that gives you a function to
// programmatically change the URL (and therefore the screen).
//
// useLocation: a React Router hook that tells you the current URL path.
// We use it to know which tab to highlight as active.

import { useNavigate, useLocation } from 'react-router-dom'

// The four tabs — label, emoji icon, and URL path for each
const tabs = [
  { label: 'Home',      icon: '🏠', path: '/dashboard' },
  { label: 'Recipes',   icon: '📖', path: '/recipes'   },
  { label: 'Household', icon: '👥', path: '/household' },
  { label: 'Profile',   icon: '👤', path: '/profile'   },
]

export default function BottomNav() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    // h-[76px] — total nav height including home indicator space
    // bg-white border-t — white surface with top border separator
    // flex — lays the four tabs out horizontally
    // flex-shrink-0 — prevents the nav from being squished by scrolling content
    <div className="h-[76px] bg-white border-t border-pill flex items-start pt-[10px] flex-shrink-0">
      {tabs.map(tab => {
        const isActive = location.pathname === tab.path
        return (
          <button
            key={tab.path}
            onClick={() => navigate(tab.path)}
            className="flex-1 flex flex-col items-center gap-[3px] bg-transparent border-0">
            <span className="text-[20px]">{tab.icon}</span>
            <span className={`text-[10px] font-medium font-outfit ${
              isActive ? 'text-forest' : 'text-text-hint'
            }`}>
              {tab.label}
            </span>
          </button>
        )
      })}
    </div>
  )
}