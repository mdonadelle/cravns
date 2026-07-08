// src/components/Button.jsx
//
// What this component does:
// A single button component that handles all button variants used
// across Cravns. Instead of styling buttons individually on each
// screen, you define the variants once here and reference them
// by name. Consistent look guaranteed everywhere.
//
// Props:
// label (string) — the button text
// onClick (function) — what happens when tapped
// variant (string) — which visual style to use (default: 'primary')
// fullWidth (boolean) — whether the button stretches full width (default: true)

export default function Button({ label, onClick, variant = 'primary', fullWidth = true }) {

    // Base styles applied to every button regardless of variant
    // h-[52px] — standard full button height from design system
    // rounded-xl — 12px border radius from design system
    // font-outfit font-medium — Outfit 500 weight
    // text-[15px] — standard button font size
    // flex items-center justify-content — centers the label
    // transition-opacity active:opacity-80 — subtle press feedback on tap
    const base = `
      h-[52px] rounded-xl font-outfit font-medium text-[15px]
      flex items-center justify-center
      transition-opacity active:opacity-80
      ${fullWidth ? 'w-full' : 'px-6'}
    `
  
    // Variant-specific styles
    // primary — forest green fill, white text. Used for all main CTAs.
    // ghost — transparent with forest green border and text. Used for secondary actions.
    // amber — amber fill, dark forest text. Used on dark surface cards only.
    // small — shorter height for inline card actions like "Vote now"
    const variants = {
      primary: 'bg-forest text-white border-0',
      ghost: 'bg-transparent text-forest border-[1.5px] border-forest',
      amber: 'bg-amber text-dark-forest border-0 font-semibold',
      small: 'h-[36px] bg-forest text-white text-[13px] px-4 rounded-lg w-auto',
    }
  
    return (
      <button onClick={onClick} className={`${base} ${variants[variant]}`}>
        {label}
      </button>
    )
  }