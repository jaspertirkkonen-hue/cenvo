export function MeshBG({ className = "" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 800 600"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="mesh1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" stopOpacity="0.3" />
          <stop offset="50%" stopColor="#7c3aed" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0.1" />
        </linearGradient>
        <linearGradient id="mesh2" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0ea5e9" stopOpacity="0.2" />
          <stop offset="50%" stopColor="#2563eb" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#mesh1)" />
      <circle cx="200" cy="150" r="120" fill="url(#mesh2)" />
      <circle cx="600" cy="400" r="100" fill="url(#mesh1)" />
      <circle cx="400" cy="300" r="80" fill="url(#mesh2)" />
    </svg>
  )
}

export default MeshBG
