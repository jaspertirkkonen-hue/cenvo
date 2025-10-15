// Simple in-memory cache utility for client/server usage
// Not persisted across deployments; suitable for short-lived caching

type CacheEntry<T> = {
  value: T
  expiresAt: number
}

const cacheStore = new Map<string, CacheEntry<any>>()

export function withCache<T>(key: string, ttlMs: number, loader: () => Promise<T>): Promise<T> {
  const now = Date.now()
  const existing = cacheStore.get(key)
  if (existing && existing.expiresAt > now) {
    return Promise.resolve(existing.value as T)
  }

  return loader().then((value) => {
    cacheStore.set(key, { value, expiresAt: now + ttlMs })
    return value
  })
}

export function cacheKey(parts: Array<string | number | null | undefined>): string {
  return parts.map((p) => (p === undefined || p === null ? '∅' : String(p))).join('|')
}


