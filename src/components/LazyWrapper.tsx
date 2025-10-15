'use client'

import { Suspense, lazy, ComponentType, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LazyWrapperProps {
  children: ReactNode
  fallback?: ReactNode
  delay?: number
}

/**
 * Wrapper component for lazy loading with custom fallback
 */
export function LazyWrapper({ children, fallback, delay = 0 }: LazyWrapperProps) {
  const defaultFallback = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className="w-full h-full bg-cosmic-900/20 rounded-xl animate-pulse flex items-center justify-center"
    >
      <div className="w-8 h-8 border-2 border-celestial-500 border-t-transparent rounded-full animate-spin" />
    </motion.div>
  )

  return (
    <Suspense fallback={fallback || defaultFallback}>
      {children}
    </Suspense>
  )
}

/**
 * Higher-order component for lazy loading React components
 */
export function withLazyLoading<T extends object>(
  importFunc: () => Promise<{ default: ComponentType<T> }>,
  fallback?: ReactNode
) {
  const LazyComponent = lazy(importFunc)

  return function LazyLoadedComponent(props: T) {
    return (
      <LazyWrapper fallback={fallback}>
        <LazyComponent {...props} />
      </LazyWrapper>
    )
  }
}

/**
 * Lazy load images with intersection observer
 */
export function LazyImage({ 
  src, 
  alt, 
  className, 
  ...props 
}: {
  src: string
  alt: string
  className?: string
  [key: string]: any
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true, margin: '50px' }}
    >
      <img src={src} alt={alt} {...props} />
    </motion.div>
  )
}

/**
 * Progressive loading for heavy components
 */
export function ProgressiveLoader({ 
  children, 
  threshold = 0.1 
}: { 
  children: ReactNode
  threshold?: number 
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, margin: '100px', amount: threshold }}
    >
      {children}
    </motion.div>
  )
}
