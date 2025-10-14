export function SkeletonCard() {
  return (
    <div className="bg-[#151821] border border-slate-700/50 rounded-2xl overflow-hidden animate-pulse">
      <div className="h-48 bg-slate-800/50 skeleton"></div>
      <div className="p-6 space-y-3">
        <div className="h-6 bg-slate-800/50 rounded w-3/4"></div>
        <div className="h-4 bg-slate-800/50 rounded w-full"></div>
        <div className="h-4 bg-slate-800/50 rounded w-5/6"></div>
        <div className="flex justify-between items-center pt-4">
          <div className="h-8 bg-slate-800/50 rounded w-20"></div>
          <div className="h-6 bg-slate-800/50 rounded w-16"></div>
        </div>
      </div>
    </div>
  )
}

export function SkeletonStats() {
  return (
    <div className="bg-[#151821] border border-slate-700 rounded-xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 bg-slate-800/50 rounded w-24"></div>
        <div className="w-10 h-10 bg-slate-800/50 rounded-lg"></div>
      </div>
      <div className="h-8 bg-slate-800/50 rounded w-32"></div>
    </div>
  )
}

export function SkeletonLoader({ count = 6 }: { count?: number }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  )
}

