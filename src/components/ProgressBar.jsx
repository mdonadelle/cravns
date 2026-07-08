// src/components/ProgressBar.jsx
//
// What this component does:
// The step progress bar shown at the top of multi-step flows —
// Taste Setup (3 steps) and Account Setup (2 steps).
// The filled green portion grows based on current/total steps.
//
// Props:
// current (number) — which step the user is on (1, 2, 3...)
// total (number) — how many steps in the flow

export default function ProgressBar({ current, total }) {
    // Calculate fill percentage — e.g. step 2 of 3 = 66.6%
    const fillPercent = (current / total) * 100
  
    return (
      // Outer track — full width, pill background color, 4px tall
      <div className="w-full h-[4px] bg-pill rounded-full overflow-hidden">
        {/* Inner fill — forest green, width driven by the percentage */}
        <div
          className="h-full bg-forest rounded-full transition-all duration-300"
          style={{ width: `${fillPercent}%` }}
        />
      </div>
    )
  }