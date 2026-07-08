// src/components/PillBadge.jsx
//
// What this component does:
// The small rounded tag labels used throughout the app.
// Examples: "18 days overdue", "House fave", "AI pick 🤖", "94% match"
//
// Three color variants matching the Cravns design system:
// green — for general labels (pill bg + forest text)
// amber — for AI and urgency labels (amber bg + amber text)
// dark — for labels on dark surfaces (dark forest bg + mint white text)

export default function PillBadge({ label, variant = 'green' }) {

    const variants = {
      green: 'bg-pill text-forest',
      amber: 'bg-amber-bg text-amber-text',
      dark:  'bg-dark-forest text-app-bg',
    }
  
    return (
      <span className={`
        text-[11px] font-medium font-outfit
        px-[10px] py-[4px] rounded-full
        ${variants[variant]}
      `}>
        {label}
      </span>
    )
  }