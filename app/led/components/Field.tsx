"use client"
import { useState } from "react"
import type { InputHTMLAttributes, SelectHTMLAttributes, TextareaHTMLAttributes } from "react"

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/

/**
 * Styled ISO date input (YYYY-MM-DD). Replaces the native picker so it
 * matches the document header convention. Flags red on blur if dirty
 * and malformed; no popups.
 */
export function DateInput({
  value,
  onChange,
  placeholder = "YYYY-MM-DD",
}: {
  value: string
  onChange: (v: string) => void
  placeholder?: string
}) {
  const [touched, setTouched] = useState(false)
  const invalid = touched && value.length > 0 && !ISO_DATE.test(value)
  return (
    <div>
      <input
        type="text"
        inputMode="numeric"
        autoComplete="off"
        value={value}
        placeholder={placeholder}
        aria-invalid={invalid}
        onChange={(e) => onChange(e.target.value.trim())}
        onBlur={() => setTouched(true)}
      />
      {invalid ? (
        <div className="mono text-[10px] uppercase mt-1" style={{ color: "var(--led-error)" }}>
          DATE FORMAT / YYYY-MM-DD
        </div>
      ) : null}
    </div>
  )
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="label">{label}</span>
        {hint ? (
          <span className="mono text-[10px] uppercase text-[var(--led-ink-faint)]">{hint}</span>
        ) : null}
      </div>
      {children}
    </label>
  )
}

export function TextInput(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} />
}

export function TextArea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} />
}
