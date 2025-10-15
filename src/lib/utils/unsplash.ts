/**
 * Unsplash image utilities for AI-style visuals
 */

const UNSPLASH_BASE_URL = 'https://images.unsplash.com'
const UNSPLASH_SOURCE = 'https://source.unsplash.com'

// AI and tech-related keywords for generating relevant images
const AI_KEYWORDS = [
  'artificial-intelligence',
  'neural-network',
  'machine-learning',
  'data-science',
  'technology',
  'futuristic',
  'digital-art',
  'cyberpunk',
  'abstract',
  'geometric',
  'minimalist',
  'tech',
  'innovation',
  'coding',
  'programming',
  'algorithm',
  'blockchain',
  'quantum',
  'robotics',
  'automation'
]

const PROMPT_CATEGORIES = {
  'Writing': ['writing', 'creative-writing', 'author', 'typewriter', 'notebook'],
  'Art': ['digital-art', 'painting', 'creativity', 'artist', 'design'],
  'Development': ['coding', 'programming', 'developer', 'computer', 'code'],
  'Business': ['business', 'meeting', 'office', 'strategy', 'entrepreneur'],
  'Finance': ['finance', 'money', 'investment', 'trading', 'economy'],
  'Marketing': ['marketing', 'advertising', 'social-media', 'campaign', 'brand'],
  'Education': ['education', 'learning', 'school', 'student', 'knowledge'],
  'Health': ['health', 'wellness', 'medical', 'fitness', 'therapy'],
  'Entertainment': ['entertainment', 'movie', 'music', 'gaming', 'fun']
}

/**
 * Generate a random AI-themed image URL from Unsplash
 */
export function getRandomAIImage(width: number = 400, height: number = 300): string {
  const index = Math.floor(Date.now() / 1000) % AI_KEYWORDS.length // Use timestamp for deterministic but varied results
  const keyword = AI_KEYWORDS[index]
  return `${UNSPLASH_SOURCE}/${width}x${height}/?${keyword}&sig=${index}`
}

/**
 * Get a category-specific image URL
 */
export function getCategoryImage(category: string, width: number = 400, height: number = 300): string {
  const keywords = PROMPT_CATEGORIES[category as keyof typeof PROMPT_CATEGORIES] || ['technology']
  const index = category.length % keywords.length // Use category length for deterministic selection
  const keyword = keywords[index]
  return `${UNSPLASH_SOURCE}/${width}x${height}/?${keyword}&sig=${category.length}`
}

/**
 * Generate a deterministic image URL based on prompt ID
 */
export function getPromptImage(promptId: number, category?: string, width: number = 400, height: number = 300): string {
  if (category && PROMPT_CATEGORIES[category as keyof typeof PROMPT_CATEGORIES]) {
    return getCategoryImage(category, width, height)
  }
  
  // Use prompt ID to generate a consistent but varied image
  const keyword = AI_KEYWORDS[promptId % AI_KEYWORDS.length]
  return `${UNSPLASH_SOURCE}/${width}x${height}/?${keyword}&sig=${promptId}`
}

/**
 * Get hero/banner images for different sections
 */
export function getHeroImage(section: 'marketplace' | 'chat' | 'overview' | 'myprompts'): string {
  const heroImages = {
    marketplace: 'artificial-intelligence',
    chat: 'conversation',
    overview: 'dashboard',
    myprompts: 'creativity'
  }
  
  const keyword = heroImages[section]
  const seed = section.charCodeAt(0) + section.length // Deterministic seed based on section name
  return `${UNSPLASH_SOURCE}/1200x600/?${keyword}&sig=${seed}`
}

/**
 * Get avatar images for users
 */
export function getUserAvatar(userId: string, size: number = 100): string {
  return `${UNSPLASH_SOURCE}/${size}x${size}/?portrait&sig=${userId}`
}

/**
 * Get placeholder image with blur data URL
 */
export function getBlurDataURL(): string {
  return 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCBmaWxsPSIjMEEwRjFGIiB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIi8+PC9zdmc+'
}

/**
 * Optimized image URLs with Unsplash API parameters
 */
export const UnsplashImage = {
  /**
   * Get optimized image URL with quality and format
   */
  getOptimized: (url: string, options: {
    quality?: number
    format?: 'jpg' | 'webp'
    blur?: number
  } = {}) => {
    const params = new URLSearchParams()
    
    if (options.quality) params.set('q', options.quality.toString())
    if (options.format) params.set('fm', options.format)
    if (options.blur) params.set('blur', options.blur.toString())
    
    return `${url}${params.toString() ? '?' + params.toString() : ''}`
  },

  /**
   * Get responsive image URLs for different screen sizes
   */
  getResponsive: (baseUrl: string) => ({
    mobile: baseUrl.replace(/\/\d+x\d+/, '/300x200'),
    tablet: baseUrl.replace(/\/\d+x\d+/, '/600x400'),
    desktop: baseUrl.replace(/\/\d+x\d+/, '/800x600'),
    large: baseUrl.replace(/\/\d+x\d+/, '/1200x800')
  })
}
