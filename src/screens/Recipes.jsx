// src/screens/Recipes.jsx
//
// What this screen does:
// Shows AI-matched recipe suggestions based on the user's taste profile.
// The featured hero card is the AI's top pick.
// The "cook tonight" horizontal scroll shows ingredient-matched options.
// The "94% match" labels plant the seed for the full AI feature
// even before it's technically built in Phase 5.
//
// In Phase 5 these suggestions come from real Claude AI calls.
// For now, placeholder data builds the layout.

import BottomNav from '../components/BottomNav'
import PillBadge from '../components/PillBadge'

const FEATURED = {
  emoji: '🍜',
  name: 'Spicy Thai Basil Chicken',
  cookTime: 25,
  difficulty: 'Medium',
  matchPercent: 94,
}

const COOK_TONIGHT = [
  { emoji: '🥗', name: 'Thai Green Curry',  cookTime: 30, match: 92 },
  { emoji: '🍳', name: 'Pad Thai Noodles',  cookTime: 20, match: 88 },
  { emoji: '🥘', name: 'Tom Kha Soup',      cookTime: 35, match: 85 },
]

const SAVED = [
  { emoji: '🍕', name: 'Margherita Pizza',     made: true  },
  { emoji: '🌮', name: 'Fish Tacos',            made: false },
  { emoji: '🍣', name: 'Salmon Teriyaki',       made: true  },
  { emoji: '🥘', name: 'Chicken Tikka Masala', made: false },
]

export default function Recipes() {
  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <div className="h-[44px]" />

      <div className="flex-1 overflow-y-auto px-6 pt-4 pb-4 space-y-5">

        {/* Header */}
        <div>
          <h1 className="text-[22px] font-bold font-outfit text-text-primary mb-1">
            Recipes for you
          </h1>
          <p className="text-[12px] font-outfit text-text-secondary">
            Based on your taste profile
          </p>
        </div>

        {/* Featured recipe card */}
        <div className="bg-white rounded-[20px] border border-pill overflow-hidden shadow-sm">
          {/* Image placeholder — gradient with emoji */}
          <div className="h-[150px] bg-gradient-to-br from-[#2d8a5e] to-dark-forest flex items-center justify-center relative">
            <span className="text-[56px]">{FEATURED.emoji}</span>
            <div className="absolute top-3 left-3 bg-amber text-dark-forest text-[10px] font-bold font-outfit px-3 py-[4px] rounded-full uppercase tracking-wide">
              AI Pick
            </div>
          </div>

          <div className="p-4">
            <p className="text-[18px] font-semibold font-outfit text-text-primary mb-3">
              {FEATURED.name}
            </p>
            <div className="flex gap-2 flex-wrap mb-4">
              <PillBadge label={`🕐 ${FEATURED.cookTime} min`} variant="green" />
              <PillBadge label={`🔥 ${FEATURED.difficulty}`} variant="green" />
              <PillBadge label={`⭐ ${FEATURED.matchPercent}% match`} variant="amber" />
            </div>
            <div className="flex gap-2">
              <button className="flex-1 h-[44px] bg-forest text-white rounded-[10px] font-outfit font-medium text-[13px] active:opacity-80">
                Save recipe
              </button>
              <button className="flex-1 h-[44px] border-[1.5px] border-forest text-forest rounded-[10px] font-outfit font-medium text-[13px] active:opacity-80">
                I made this ✓
              </button>
            </div>
          </div>
        </div>

        {/* Cook tonight — horizontal scroll */}
        <div>
          <p className="text-[15px] font-semibold font-outfit text-text-primary mb-3">
            You probably have these ingredients
          </p>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {COOK_TONIGHT.map((recipe, i) => (
              <div
                key={i}
                className="bg-white rounded-[14px] border border-pill min-w-[140px] flex-shrink-0 overflow-hidden"
              >
                <div className={`h-[80px] flex items-center justify-center text-[32px] ${
                  i === 0 ? 'bg-[#c8e6d8]' : i === 1 ? 'bg-[#f8e8c0]' : 'bg-[#d4e8f8]'
                }`}>
                  {recipe.emoji}
                </div>
                <div className="p-3">
                  <p className="text-[12px] font-medium font-outfit text-text-primary mb-1">
                    {recipe.name}
                  </p>
                  <p className="text-[10px] font-outfit text-text-hint mb-2">
                    🕐 {recipe.cookTime} min
                  </p>
                  <span className="text-[10px] font-semibold font-outfit text-amber-text bg-amber-bg px-2 py-[2px] rounded-full">
                    {recipe.match}% match
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved recipes — 2 column grid */}
        <div>
          <p className="text-[15px] font-semibold font-outfit text-text-primary mb-3">
            Your cookbook
          </p>
          <div className="grid grid-cols-2 gap-2">
            {SAVED.map((recipe, i) => (
              <div
                key={i}
                className="bg-white rounded-[12px] border border-pill p-3"
              >
                <p className="text-[24px] mb-2">{recipe.emoji}</p>
                <p className="text-[12px] font-medium font-outfit text-text-primary mb-2">
                  {recipe.name}
                </p>
                <span className={`text-[10px] font-medium font-outfit px-2 py-[2px] rounded-full ${
                  recipe.made
                    ? 'bg-pill text-forest'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {recipe.made ? '✅ Made it' : '⭐ Saved'}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}