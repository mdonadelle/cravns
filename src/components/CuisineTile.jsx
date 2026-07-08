// src/components/CuisineTile.jsx
//
// What this component does:
// The tappable cuisine selection tiles used in Taste Setup (Step 1)
// and the Daily Check-In expanded cuisine picker.
// Toggles between selected (forest green fill) and unselected (white)
// when tapped. Parent component tracks which ones are selected.
//
// Props:
// emoji (string) — the cuisine emoji e.g. "🍕"
// name (string) — the cuisine name e.g. "Italian"
// selected (boolean) — whether this tile is currently selected
// onToggle (function) — called when the tile is tapped

export default function CuisineTile({ emoji, name, selected, onToggle }) {
    return (
      <button
        onClick={onToggle}
        className={`
          flex items-center gap-[10px] p-[14px]
          rounded-[14px] border-[1.5px] w-full
          transition-all active:scale-95
          ${selected
            ? 'bg-forest border-forest'        // selected — green fill
            : 'bg-white border-pill'           // unselected — white with pill border
          }
        `}
      >
        <span className="text-[22px]">{emoji}</span>
        <span className={`text-[13px] font-medium font-outfit ${
          selected ? 'text-white' : 'text-text-primary'
        }`}>
          {name}
        </span>
      </button>
    )
  }