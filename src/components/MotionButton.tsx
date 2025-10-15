'use client'

import { motion } from 'framer-motion'
import { cn } from './cn'
import { ReactNode } from 'react'

interface MotionButtonProps {
  children: ReactNode
  className?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'neon'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  delay?: number
}

export function MotionButton({
  children,
  className,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  type = 'button',
  delay = 0
}: MotionButtonProps) {
  const baseClasses = 'relative inline-flex items-center justify-center font-semibold transition-all duration-300 focus-celestial disabled:opacity-50 disabled:cursor-not-allowed'
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 text-base rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl'
  }
  
  const variantClasses = {
    primary: 'bg-gradient-celestial text-white shadow-celestial hover:shadow-celestial-strong',
    secondary: 'glass-card text-cosmic-100 border border-cosmic-700/50 hover:border-celestial-500/50',
    ghost: 'text-cosmic-300 hover:text-celestial-400 hover:bg-cosmic-800/30',
    neon: 'bg-gradient-neon bg-[length:200%_200%] text-white animate-gradient-shift shadow-neon hover:shadow-celestial-strong'
  }
  
  const hoverAnimation = {
    y: -2,
    scale: 1.05,
    transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }
  }
  
  const tapAnimation = {
    scale: 0.95,
    transition: { duration: 0.1 }
  }

  return (
    <motion.button
      type={type}
      className={cn(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={!disabled ? hoverAnimation : undefined}
      whileTap={!disabled ? tapAnimation : undefined}
      onClick={onClick}
      disabled={disabled}
    >
      {/* Shimmer effect for neon variant */}
      {variant === 'neon' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '100%' }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
        />
      )}
      
      {/* Inner glow for primary variant */}
      {variant === 'primary' && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent rounded-inherit"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}
      
      <span className="relative z-10">{children}</span>
    </motion.button>
  )
}
