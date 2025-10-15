'use client'

import { motion } from 'framer-motion'
import { cn } from './cn'

interface MotionCardProps {
  children: React.ReactNode
  className?: string
  variant?: 'glass' | 'strong' | 'neon'
  hover?: boolean
  delay?: number
  duration?: number
}

export function MotionCard({ 
  children, 
  className, 
  variant = 'glass', 
  hover = true,
  delay = 0,
  duration = 0.6
}: MotionCardProps) {
  const baseClasses = 'relative overflow-hidden'
  
  const variantClasses = {
    glass: 'glass-card',
    strong: 'glass-card-strong',
    neon: 'glass-card neon-glow'
  }
  
  const hoverClasses = hover ? 'gpu-accelerated' : ''

  return (
    <motion.div
      className={cn(
        baseClasses,
        variantClasses[variant],
        hoverClasses,
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration,
        delay
      }}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {/* Subtle inner glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/[0.02] to-transparent pointer-events-none" />
      
      {/* Hover glow effect */}
      {hover && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-celestial-500/10 via-transparent to-celestial-600/10 pointer-events-none"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      {children}
    </motion.div>
  )
}
