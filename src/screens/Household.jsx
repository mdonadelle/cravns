// src/screens/Household.jsx
//
// What this screen does:
// The household voting screen — the most socially engaging screen.
// Shows who in the household has voted, three dinner options to
// vote on, and reveals the winner when everyone has voted.
//
// In Phase 4 this connects to real Supabase voting data.
// For now, placeholder data shows the full interactive layout.

import { useState } from 'react'
import BottomNav from '../components/BottomNav'

const VOTE_OPTIONS = [
  {
    emoji: '🍜',
    cuisine: 'Thai food',
    context: 'House fave · 18 days since last time',
    isAiPick: true,
  },
  {
    emoji: '🍕',
    cuisine: 'Pizza',
    context: 'Quick weeknight pick · 5 days ago',
    isAiPick: false,
  },
  {
    emoji: '🌮',
    cuisine: 'Mexican',
    context: "Sarah's top craving right now",
    isAiPick: false,
  },
]

const MEMBERS = [
  { initial: 'M', voted: true  },
  { initial: 'S', voted: true  },
  { initial: 'J', voted: false },
]

export default function Household() {
  const [myVote, setMyVote] = useState('')

  const allVoted = MEMBERS.every(m => m.voted) && myVote !== ''

  return (
    <div className="min-h-screen bg-app-bg flex flex-col">
      <div className="h-[44px]" />

      <div className="flex-1 px-6 pt-4 flex flex-col gap-3 overflow-y-auto pb-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-[22px] font-bold font-outfit text-text-primary">
            Tonight's vote 🗳️
          </h1>
          <p className="text-[12px] font-outfit text-text-hint">
            {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
          </p>
        </div>

        {/* Member status strip */}
        <div className="bg-white rounded-[14px] border border-pill p-4">
          <p className="text-[11px] font-medium font-outfit text-text-hint mb-3">Who's voted</p>
          <div className="flex items-center gap-3">
            {MEMBERS.map((member, i) => (
              <div key={i} className="relative">
                <div className={`w-[36px] h-[36px] rounded-full flex items-center justify-center font-semibold font-outfit text-[13px] border-2 ${
                  member.voted
                    ? 'bg-pill text-forest border-forest'
                    : 'bg-gray-100 text-gray-400 border-gray-200'
                }`}>
                  {member.initial}
                </div>
                {/* Status dot */}
                <div className={`absolute -bottom-[1px] -right-[1px] w-[10px] h-[10px] rounded-full border-[1.5px] border-white ${
                  member.voted ? 'bg-forest' : 'bg-gray-300'
                }`} />
              </div>
            ))}
            <p className="text-[12px] font-outfit text-text-hint ml-1">
              Waiting on Jake...
            </p>
          </div>
        </div>

        {/* Vote cards */}
        <div>
          <p className="text-[11px] font-medium font-outfit text-text-hint uppercase tracking-widest mb-3">
            Pick tonight's dinner
          </p>

          <div className="space-y-2">
            {VOTE_OPTIONS.map((option) => {
              const isSelected = myVote === option.cuisine
              return (
                <div key={option.cuisine} className="relative">
                  <button
                    onClick={() => setMyVote(option.cuisine)}
                    className={`w-full flex items-center p-4 rounded-[14px] border-[1.5px] text-left transition-all ${
                      isSelected
                        ? 'bg-forest border-forest'
                        : option.isAiPick
                          ? 'bg-white border-amber'
                          : 'bg-white border-pill'
                    }`}
                  >
                    <span className="text-[24px] mr-4">{option.emoji}</span>
                    <div className="flex-1">
                      <p className={`text-[16px] font-medium font-outfit ${isSelected ? 'text-white' : 'text-text-primary'}`}>
                        {option.cuisine}
                      </p>
                      <p className={`text-[11px] font-outfit ${isSelected ? 'text-white/70' : 'text-text-secondary'}`}>
                        {option.context}
                      </p>
                    </div>
                    {isSelected ? (
                      <div className="w-[24px] h-[24px] rounded-full bg-white/25 flex items-center justify-center text-white text-[12px]">
                        ✓
                      </div>
                    ) : (
                      <p className="text-[11px] font-outfit text-text-hint">Tap to vote</p>
                    )}
                  </button>

                  {/* AI pick badge — sits on the top edge of the card */}
                  {option.isAiPick && (
                    <div className="absolute -top-[10px] right-4 bg-amber-bg text-amber-text text-[10px] font-semibold font-outfit px-2 py-[3px] rounded-full border border-amber">
                      AI pick 🤖
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Waiting hint */}
        {!allVoted && (
          <div className="bg-pill rounded-[12px] p-3 flex items-center gap-3">
            <span className="text-[18px]">💡</span>
            <p className="text-[12px] font-outfit text-text-secondary leading-relaxed">
              Result reveals once everyone votes. Waiting on Jake.
            </p>
          </div>
        )}

        {/* Winner result — shows when everyone has voted */}
        {allVoted && (
          <div className="bg-forest rounded-[16px] p-5 text-center">
            <p className="text-[28px] mb-2">🎉</p>
            <p className="text-[20px] font-bold font-outfit text-white mb-1">
              The house agrees!
            </p>
            <p className="text-[15px] font-outfit text-white/80 mb-4">{myVote} tonight</p>
            <div className="flex gap-2">
              <button className="flex-1 h-[44px] bg-white text-forest rounded-[10px] font-outfit font-medium text-[13px]">
                Find a restaurant
              </button>
              <button className="flex-1 h-[44px] border-[1.5px] border-white text-white rounded-[10px] font-outfit font-medium text-[13px]">
                Find a recipe
              </button>
            </div>
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  )
}