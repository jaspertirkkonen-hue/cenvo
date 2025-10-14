export function AiCard2({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ai3" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#7c3aed" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="ai4" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="16" fill="url(#ai3)" />
      <path
        d="M80 80 L150 120 L220 80 L290 120 L360 80"
        stroke="url(#ai4)"
        strokeWidth="4"
        fill="none"
      />
      <path
        d="M80 160 L150 200 L220 160 L290 200 L360 160"
        stroke="url(#ai4)"
        strokeWidth="3"
        fill="none"
      />
      <path
        d="M80 240 L150 280 L220 240 L290 280 L360 240"
        stroke="url(#ai4)"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="120" cy="100" r="8" fill="url(#ai4)" />
      <circle cx="200" cy="100" r="6" fill="url(#ai4)" />
      <circle cx="280" cy="100" r="10" fill="url(#ai4)" />
    </svg>
  )
}

export default AiCard2
