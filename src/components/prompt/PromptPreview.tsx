'use client'
import { useState } from 'react'

export default function PromptPreview({ template, defaultInput, language = 'English' }: { template: string; defaultInput?: string; language?: string }) {
  const [input, setInput] = useState(defaultInput || '')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string>('')

  async function runPreview() {
    try {
      setLoading(true)
      setError(null)
      setPreview('')
      const res = await fetch('/api/preview', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: template, input, language }),
      })
      const json = await res.json()
      if (!res.ok) throw new Error(json?.error || 'Preview failed')
      setPreview(json.preview || '')
    } catch (e: any) {
      setError(e.message || 'Preview failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4 space-y-3">
      <div className="space-y-2">
        <label className="text-sm text-slate-300">Try your input</label>
        <textarea
          className="w-full rounded-lg bg-slate-800/70 p-3 text-slate-100 outline-none ring-1 ring-slate-700 focus:ring-blue-500 min-h-[96px]"
          placeholder="Describe what you want the prompt to generate..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>
      <button
        onClick={runPreview}
        disabled={loading}
        className="inline-flex items-center gap-2 rounded-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-emerald-400 text-slate-900 font-semibold disabled:opacity-60"
      >
        {loading ? 'Generating…' : 'Preview with AI'}
      </button>
      {error && <div className="text-sm text-red-400">{error}</div>}
      {preview && (
        <div className="rounded-lg bg-slate-800/60 p-4 whitespace-pre-wrap text-slate-100">{preview}</div>
      )}
    </div>
  )
}


