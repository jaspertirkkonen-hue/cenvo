'use client'
import { createContext, useCallback, useContext, useMemo, useState } from 'react'

type Toast = { id: string; message: string; type?: 'success' | 'error' | 'info' }

type ToastContextType = {
  show: (message: string, type?: Toast['type']) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const show = useCallback((message: string, type: Toast['type'] = 'info') => {
    const id = Math.random().toString(36).slice(2)
    setToasts((prev) => [...prev, { id, message, type }])
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id))
    }, 3000)
  }, [])

  const value = useMemo(() => ({ show }), [show])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-[100]">
        {toasts.map((t) => (
          <div key={t.id} className={`px-4 py-3 rounded-lg shadow-lg backdrop-blur-xl bg-opacity-70 border ${t.type === 'success' ? 'bg-green-500/15 border-green-500/40 text-green-200' : t.type === 'error' ? 'bg-red-500/15 border-red-500/40 text-red-200' : 'bg-slate-800/70 border-slate-600 text-white'}`}>
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}


