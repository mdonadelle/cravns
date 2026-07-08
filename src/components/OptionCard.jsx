// src/components/OptionCard.jsx
//
// What this component does:
// The large selectable option cards used on the Daily Check-In screen
// ("I cooked at home", "I ate out", "Both today") and the
// Account Setup household choice screen.
// Shows a checkmark and green tint when selected.
//
// Props:
// emoji (string) — large emoji icon on the left
// title (string) — the main option label
// subtitle (string) — supporting description below the title
// selected (boolean) — whether this option is active
// onSelect (function) — called when the card is tapped

export default function OptionCard({ emoji, title, subtitle, selected, onSelect }) {
    return (
      <button
        onClick={onSelect}
        className={`
          w-full flex items-center gap-[14px]
          p-[18px] rounded-[14px] border-[1.5px]
          transition-all active:scale-[0.98] text-left
          ${selected
            ? 'border-forest bg-pill'    // selected — green border + tint
            : 'border-pill bg-white'     // default — pill border + white
          }
        `}
      >
        <span className="text-[26px]">{emoji}</span>
  
        <div className="flex-1">
          <p className="text-[15px] font-medium font-outfit text-text-primary mb-[2px]">
            {title}
          </p>
          {subtitle && (
            <p className="text-[12px] font-outfit text-text-hint">{subtitle}</p>
          )}
        </div>
  
        {/* Checkmark — only visible when selected */}
        {selected && (
          <div className="w-[22px] h-[22px] rounded-full bg-forest flex items-center justify-center flex-shrink-0">
            <span className="text-white text-[12px]">✓</span>
          </div>
        )}
      </button>
    )
  }