import { cn } from './cn'

interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  onClick?: () => void
  disabled?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  onClick,
  disabled = false
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'font-semibold rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        {
          'bg-blue-600 hover:bg-blue-700 text-white': variant === 'primary',
          'bg-slate-700 hover:bg-slate-600 text-white': variant === 'secondary',
          'bg-transparent hover:bg-slate-700 text-slate-300': variant === 'ghost',
        },
        {
          'px-3 py-2 text-sm': size === 'sm',
          'px-4 py-2': size === 'md',
          'px-6 py-3 text-lg': size === 'lg',
        },
        {
          'opacity-50 cursor-not-allowed': disabled,
        },
        className
      )}
    >
      {children}
    </button>
  )
}