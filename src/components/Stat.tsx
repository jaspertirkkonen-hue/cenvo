import { LucideIcon } from 'lucide-react'

interface StatProps {
  label: string
  value: string | number
  icon?: LucideIcon
  trend?: string
}

export function Stat({ label, value, icon: Icon, trend }: StatProps) {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 bg-blue-600/20 rounded-lg">
              <Icon className="h-5 w-5 text-blue-400" />
            </div>
          )}
          <span className="text-slate-400 text-sm font-medium">{label}</span>
        </div>
        {trend && (
          <span className="text-green-400 text-sm font-medium">{trend}</span>
        )}
      </div>
      <div className="text-2xl font-bold text-white">{value}</div>
    </div>
  )
}