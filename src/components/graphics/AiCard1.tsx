export function AiCard1({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 400 300"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="ai1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="ai2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.5" />
        </linearGradient>
      </defs>
      <rect width="400" height="300" rx="16" fill="url(#ai1)" />
      <rect x="50" y="50" width="80" height="80" rx="12" fill="url(#ai2)" />
      <rect x="150" y="80" width="60" height="60" rx="8" fill="url(#ai1)" />
      <rect x="250" y="60" width="70" height="70" rx="10" fill="url(#ai2)" />
      <circle cx="100" cy="200" r="40" fill="url(#ai1)" />
      <circle cx="250" cy="180" r="30" fill="url(#ai2)" />
      <circle cx="320" cy="220" r="35" fill="url(#ai1)" />
    </svg>
  )
}

export default AiCard1
