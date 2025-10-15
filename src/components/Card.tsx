import { cn } from './cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'strong' | 'neon'
  hover?: boolean
}

export function Card({ children, className, variant = 'glass', hover = true }: CardProps) {
  const baseClasses = 'relative overflow-hidden'
  
  const variantClasses = {
    glass: 'glass-card',
    strong: 'glass-card-strong',
    neon: 'glass-card neon-glow'
  }
  
  const hoverClasses = hover ? 'hover-glass gpu-accelerated' : ''
  
  return (
    <div className={cn(
      baseClasses,
      variantClasses[variant],
      hoverClasses,
      className
    )}>
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      {children}
    </div>
  )
}