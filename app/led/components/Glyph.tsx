/**
 * TC glyph mark / square with a corner cutout.
 * Sized by `size` prop in px.
 */
export function Glyph({ size = 16, accent = false }: { size?: number; accent?: boolean }) {
  const color = accent ? "var(--led-accent)" : "currentColor"
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      aria-hidden
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      <path
        d="M0 0 H16 V10 L10 16 H0 Z"
        fill={color}
      />
    </svg>
  )
}
