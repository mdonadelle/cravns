// src/components/TextInput.jsx
//
// What this component does:
// A labeled text input field used across Login, Account Setup,
// Household Setup, and the Check-In custom entry field.
//
// Handles its own focus state — border turns forest green when
// the user taps into the field, back to pill color when they leave.
//
// Props:
// label (string) — the label above the input (optional)
// placeholder (string) — the grey hint text inside the input
// type (string) — 'text', 'email', 'password' (default: 'text')
// value (string) — the current input value (controlled by parent)
// onChange (function) — called every time the user types a character
// icon (emoji/string) — optional icon shown left of the input

import { useState } from 'react'

export default function TextInput({
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  icon
}) {
  // focused tracks whether the user is currently typing in this field
  // Used to switch the border color between active (forest) and inactive (pill)
  const [focused, setFocused] = useState(false)

  return (
    <div className="w-full">
      {/* Label — only renders if a label prop was passed */}
      {label && (
        <p className="text-[12px] font-medium font-outfit text-text-secondary mb-[6px]">
          {label}
        </p>
      )}

      {/* Input container */}
      <div className={`
        w-full h-[52px] bg-white rounded-xl
        border-[1.5px] transition-colors
        flex items-center px-4 gap-3
        ${focused ? 'border-forest' : 'border-pill'}
      `}>
        {/* Optional icon left of the text */}
        {icon && <span className="text-[16px] opacity-60">{icon}</span>}

        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="
            flex-1 bg-transparent outline-none
            text-[14px] font-outfit text-text-primary
            placeholder:text-text-hint
          "
        />
      </div>
    </div>
  )
}