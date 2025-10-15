'use client'

import { motion } from 'framer-motion'
import { cn } from './cn'

interface MotionTextProps {
  children: React.ReactNode
  className?: string
  variant?: 'gradient' | 'neon' | 'glow'
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}

export function MotionText({
  children,
  className,
  variant = 'gradient',
  delay = 0,
  stagger = 0.1,
  as: Component = 'p'
}: MotionTextProps) {
  const variantClasses = {
    gradient: 'gradient-celestial',
    neon: 'gradient-neon',
    glow: 'text-cosmic-100 drop-shadow-[0_0_8px_rgba(0,198,255,0.5)]'
  }

  // Split text into words for staggered animation
  const words = typeof children === 'string' ? children.split(' ') : [children]

  return (
    <motion.div
      className={cn('flex flex-wrap', className)}
      initial="hidden"
      animate="visible"
      transition={{ delay, staggerChildren: stagger }}
    >
      {words.map((word, index) => (
        <motion.span
          key={index}
          className={cn('inline-block mr-2', variantClasses[variant])}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { 
              opacity: 1, 
              y: 0,
              transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
            }
          }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  )
}

// Specialized heading components
export function MotionHeading({
  children,
  level = 1,
  className,
  variant = 'gradient',
  delay = 0,
  stagger = 0.05
}: {
  children: React.ReactNode
  level?: 1 | 2 | 3 | 4 | 5 | 6
  className?: string
  variant?: 'gradient' | 'neon' | 'glow'
  delay?: number
  stagger?: number
}) {
  const HeadingComponent = `h${level}` as keyof JSX.IntrinsicElements
  
  const sizeClasses = {
    1: 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold heading-tighter',
    2: 'text-3xl md:text-4xl lg:text-5xl font-bold heading-tight',
    3: 'text-2xl md:text-3xl lg:text-4xl font-bold heading-tight',
    4: 'text-xl md:text-2xl lg:text-3xl font-bold',
    5: 'text-lg md:text-xl lg:text-2xl font-bold',
    6: 'text-base md:text-lg lg:text-xl font-bold'
  }

  return (
    <MotionText
      as={HeadingComponent}
      className={cn(sizeClasses[level], className)}
      variant={variant}
      delay={delay}
      stagger={stagger}
    >
      {children}
    </MotionText>
  )
}
