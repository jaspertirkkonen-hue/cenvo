import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Star, Download } from 'lucide-react'

interface PromptCardProps {
  id: number
  title: string
  description: string
  price: number
  imageUrl?: string | null
  rating?: number
  downloads?: number
}

export const PromptCard = memo(function PromptCard({ id, title, description, price, imageUrl, rating, downloads }: PromptCardProps) {
  // Use fallback AI preview image if no image provided
  const displayImage = imageUrl || '/images/ai-preview.svg'

  return (
    <article 
      className="bg-[#0f172a]/50 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-[#2563eb]/30 transition-all duration-300 shadow-lg hover-lift gpu-accelerated focus-within:ring-2 focus-within:ring-[#2563eb] focus-within:ring-offset-2 focus-within:ring-offset-[#030712]"
    >
      <div className="relative h-48 w-full bg-gradient-to-br from-slate-800 to-slate-900 overflow-hidden">
        <Image 
          src={displayImage} 
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          loading="lazy"
          quality={75}
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-white mb-2 heading-tight">{title}</h3>
        <p className="text-slate-400 text-sm mb-4 flex-grow line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
          <span className="text-[#2563eb] font-bold text-lg" aria-label={`Price: $${price.toFixed(2)}`}>
            ${price.toFixed(2)}
          </span>
          <div className="flex items-center gap-3">
            {rating && (
              <span className="flex items-center text-sm text-slate-400" aria-label={`Rating: ${rating.toFixed(1)} stars`}>
                <Star size={16} className="text-yellow-400 mr-1" aria-hidden="true" /> 
                {rating.toFixed(1)}
              </span>
            )}
            {downloads && (
              <span className="flex items-center text-sm text-slate-400" aria-label={`${downloads} downloads`}>
                <Download size={16} className="text-slate-400 mr-1" aria-hidden="true" /> 
                {downloads}
              </span>
            )}
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link
            href={`/market/${id}`}
            className="flex-1 border border-slate-600 hover:border-slate-500 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-center focus-ring inline-block"
          >
            View Details
          </Link>
          <button
            className="flex-1 bg-[#2563eb] hover:bg-blue-700 text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 focus-ring"
            aria-label={`Buy ${title} for $${price.toFixed(2)}`}
          >
            Buy Prompt
          </button>
        </div>
      </div>
    </article>
  )
})