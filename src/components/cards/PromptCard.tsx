import { memo } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Star, Download, Sparkles, Zap } from 'lucide-react'
import { getPromptImage, getBlurDataURL } from '@/lib/utils/unsplash'

interface PromptCardProps {
  id: number
  title: string
  description: string
  price: number
  imageUrl?: string | null
  category?: string
  rating?: number
  downloads?: number
}

export const PromptCard = memo(function PromptCard({ id, title, description, price, imageUrl, category, rating, downloads }: PromptCardProps) {
  // Use Unsplash AI-style image or fallback
  const displayImage = imageUrl || getPromptImage(id, category, 400, 300)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -12, 
        scale: 1.02,
        transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] }
      }}
      className="glass-card-strong overflow-hidden flex flex-col group hover:neon-glow-strong transition-all duration-300 gpu-accelerated"
    >
      {/* Image Section */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image 
          src={displayImage} 
          alt={`${title} preview`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          quality={75}
          placeholder="blur"
          blurDataURL={getBlurDataURL()}
        />
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-cosmic-950/80 via-transparent to-transparent" />
        
        {/* Premium badge */}
        <div className="absolute top-3 right-3">
          <div className="flex items-center gap-1 bg-gradient-celestial px-2 py-1 rounded-full shadow-celestial">
            <Sparkles size={12} className="text-white" />
            <span className="text-xs font-semibold text-white">Premium</span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6 flex-grow flex flex-col">
        <h3 className="text-xl font-semibold text-cosmic-100 mb-2 heading-tight group-hover:text-celestial-400 transition-colors duration-300">
          {title}
        </h3>
        <p className="text-cosmic-400 text-sm mb-4 flex-grow line-clamp-2">
          {description}
        </p>

        {/* Stats Row */}
        <div className="flex justify-between items-center mt-auto pt-4 border-t border-cosmic-700/30">
          <span className="gradient-celestial font-bold text-lg" aria-label={`Price: $${price.toFixed(2)}`}>
            ${price.toFixed(2)}
          </span>
          <div className="flex items-center gap-3">
            {rating && (
              <span className="flex items-center text-sm text-cosmic-400" aria-label={`Rating: ${rating.toFixed(1)} stars`}>
                <Star size={16} className="text-yellow-400 mr-1" aria-hidden="true" /> 
                {rating.toFixed(1)}
              </span>
            )}
            {downloads && (
              <span className="flex items-center text-sm text-cosmic-400" aria-label={`${downloads} downloads`}>
                <Download size={16} className="text-cosmic-400 mr-1" aria-hidden="true" /> 
                {downloads}
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex gap-3">
          <Link
            href={`/prompt/${id}`}
            className="flex-1 glass-card text-cosmic-300 hover:text-celestial-400 text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 text-center hover:border-celestial-500/50 group/btn"
          >
            <span className="group-hover/btn:translate-x-1 transition-transform duration-300 inline-block">
              View Details
            </span>
          </Link>
          <Link
            href={`/prompt/${id}`}
            className="flex-1 bg-gradient-celestial hover:shadow-celestial-strong text-white text-sm font-semibold py-2.5 px-4 rounded-xl transition-all duration-300 text-center group/btn relative overflow-hidden"
          >
            <span className="relative z-10 group-hover/btn:translate-x-1 transition-transform duration-300 inline-block">
              <Zap size={16} className="inline mr-1" />
              Buy Now
            </span>
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
          </Link>
        </div>
      </div>
    </motion.article>
  )
})