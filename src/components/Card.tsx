import { cn } from './cn'

interface CardProps {
  children: React.ReactNode
  className?: string
}

export function Card({ children, className }: CardProps) {
  return (
    <div className={cn(
      'bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl',
      className
    )}>
      {children}
    </div>
  )
}