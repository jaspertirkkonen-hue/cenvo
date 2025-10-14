import { LucideIcon } from 'lucide-react'

interface KpiCardProps {
  label: string
  value: string | number
  icon: LucideIcon
  change?: string
  changeType?: 'positive' | 'negative' | 'neutral'
}

export function KpiCard({ label, value, icon: Icon, change, changeType = 'neutral' }: KpiCardProps) {
  const changeColor = changeType === 'positive' ? 'text-green-400' : changeType === 'negative' ? 'text-red-400' : 'text-slate-400'

  return (
    <article 
      className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 flex flex-col justify-between hover:border-[#2563eb]/30 transition-all duration-300 hover-lift gpu-accelerated focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:ring-offset-2 focus-within:ring-offset-[#030712]"
      role="region"
      aria-label={`${label}: ${value}`}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-slate-400">{label}</h3>
        <div 
          className="w-10 h-10 bg-[#2563eb]/20 rounded-lg flex items-center justify-center" 
          aria-hidden="true"
          style={{ width: '40px', height: '40px' }}
        >
          <Icon size={20} className="text-[#2563eb]" />
        </div>
      </div>
      <div className="flex items-end justify-between">
        <p className="text-3xl font-bold text-white">{value}</p>
        {change && (
          <span className={`text-sm font-semibold ${changeColor}`} aria-label={`Change: ${change}`}>
            {change}
          </span>
        )}
      </div>
    </article>
  )
}