import { unstable_cache } from 'next/cache'

// Cache configuration for different data types
const CACHE_TAGS = {
  PROMPTS: 'prompts',
  USERS: 'users',
  CATEGORIES: 'categories',
  TRENDING: 'trending'
} as const

// Cache durations (in seconds)
const CACHE_DURATIONS = {
  PROMPTS: 300, // 5 minutes
  USERS: 600, // 10 minutes
  CATEGORIES: 1800, // 30 minutes
  TRENDING: 600, // 10 minutes
  STATIC: 3600 // 1 hour
} as const

/**
 * Cached function to fetch prompts with pagination
 */
export const getCachedPrompts = unstable_cache(
  async (page: number = 1, limit: number = 24, category?: string) => {
    const { createServerSupabase } = await import('@/lib/supabase/server')
    const supabase = createServerSupabase()
    
    let query = supabase
      .from('prompts')
      .select('id, title, description, price, image_url, created_at, category, rating, downloads')
      .order('created_at', { ascending: false })
      .range((page - 1) * limit, page * limit - 1)
    
    if (category && category !== 'All') {
      query = query.eq('category', category)
    }
    
    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching prompts:', error)
      return []
    }
    
    return data || []
  },
  ['prompts'],
  {
    tags: [CACHE_TAGS.PROMPTS],
    revalidate: CACHE_DURATIONS.PROMPTS
  }
)

/**
 * Cached function to fetch trending prompts
 */
export const getCachedTrendingPrompts = unstable_cache(
  async () => {
    const { createServerSupabase } = await import('@/lib/supabase/server')
    const supabase = createServerSupabase()
    
    const { data, error } = await supabase
      .from('prompts')
      .select('id, title, description, price, image_url, rating, downloads')
      .order('downloads', { ascending: false })
      .limit(6)
    
    if (error) {
      console.error('Error fetching trending prompts:', error)
      return []
    }
    
    return data || []
  },
  ['trending-prompts'],
  {
    tags: [CACHE_TAGS.TRENDING],
    revalidate: CACHE_DURATIONS.TRENDING
  }
)

/**
 * Cached function to fetch categories
 */
export const getCachedCategories = unstable_cache(
  async () => {
    const { createServerSupabase } = await import('@/lib/supabase/server')
    const supabase = createServerSupabase()
    
    const { data, error } = await supabase
      .from('prompts')
      .select('category')
      .not('category', 'is', null)
    
    if (error) {
      console.error('Error fetching categories:', error)
      return []
    }
    
    // Extract unique categories
    const categories = [...new Set(data.map(item => item.category))].filter(Boolean)
    return categories.sort()
  },
  ['categories'],
  {
    tags: [CACHE_TAGS.CATEGORIES],
    revalidate: CACHE_DURATIONS.CATEGORIES
  }
)

/**
 * Cached function to fetch prompt by ID
 */
export const getCachedPromptById = unstable_cache(
  async (id: number) => {
    const { createServerSupabase } = await import('@/lib/supabase/server')
    const supabase = createServerSupabase()
    
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('id', id)
      .single()
    
    if (error) {
      console.error('Error fetching prompt by ID:', error)
      return null
    }
    
    return data
  },
  ['prompt-by-id'],
  {
    tags: [CACHE_TAGS.PROMPTS],
    revalidate: CACHE_DURATIONS.PROMPTS
  }
)

/**
 * Cached function to fetch user prompts
 */
export const getCachedUserPrompts = unstable_cache(
  async (userId: string) => {
    const { createServerSupabase } = await import('@/lib/supabase/server')
    const supabase = createServerSupabase()
    
    const { data, error } = await supabase
      .from('prompts')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
    
    if (error) {
      console.error('Error fetching user prompts:', error)
      return []
    }
    
    return data || []
  },
  ['user-prompts'],
  {
    tags: [CACHE_TAGS.PROMPTS, CACHE_TAGS.USERS],
    revalidate: CACHE_DURATIONS.PROMPTS
  }
)

/**
 * Invalidate cache by tags
 */
export const invalidateCache = async (tags: string[]) => {
  const { revalidateTag } = await import('next/cache')
  
  for (const tag of tags) {
    revalidateTag(tag)
  }
}

/**
 * Search prompts with caching
 */
export const searchCachedPrompts = unstable_cache(
  async (searchTerm: string, limit: number = 24) => {
    const { createServerSupabase } = await import('@/lib/supabase/server')
    const supabase = createServerSupabase()
    
    const { data, error } = await supabase
      .from('prompts')
      .select('id, title, description, price, image_url, created_at, category, rating, downloads')
      .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`)
      .order('created_at', { ascending: false })
      .limit(limit)
    
    if (error) {
      console.error('Error searching prompts:', error)
      return []
    }
    
    return data || []
  },
  ['search-prompts'],
  {
    tags: [CACHE_TAGS.PROMPTS],
    revalidate: CACHE_DURATIONS.PROMPTS
  }
)
