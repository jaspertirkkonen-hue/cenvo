import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
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
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8, transition: { duration: 0.3 } }}
      className="bg-[#151821] backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden flex flex-col hover:border-[#4F46E5]/50 transition-all duration-300 shadow-lg hover-glow gpu-accelerated"
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
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzAwJyBoZWlnaHQ9JDE3MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCBmaWxsPSIjMTIxNDFCIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-[#E5E7EB] mb-2 heading-tight">{title}</h3>
        <p className="text-[#9CA3AF] text-sm mb-4 flex-grow line-clamp-2">{description}</p>
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-700/50">
          <span className="gradient-text font-bold text-lg" aria-label={`Price: $${price.toFixed(2)}`}>
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
            href={`/prompt/${id}`}
            className="flex-1 border border-slate-600 hover:border-[#4F46E5] text-[#E5E7EB] text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-200 text-center"
          >
            View Details
          </Link>
          <Link
            href={`/prompt/${id}`}
            className="flex-1 bg-gradient-to-r from-[#4F46E5] to-[#0EA5E9] hover:shadow-[0_0_20px_rgba(79,70,229,0.35)] text-white text-sm font-semibold py-2.5 px-4 rounded-lg transition-all duration-300 text-center"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </motion.article>
  )
})