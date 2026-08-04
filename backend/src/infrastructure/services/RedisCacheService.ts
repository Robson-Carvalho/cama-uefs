import { ICacheService } from '../../core/interfaces/ICacheService';

class MemoryCacheService implements ICacheService {
  private cache: Map<string, { value: any; expiry: number | null }> = new Map();

  async get<T>(key: string): Promise<T | null> {
    const item = this.cache.get(key);
    if (!item) return null;

    if (item.expiry && Date.now() > item.expiry) {
      this.cache.delete(key);
      return null;
    }

    return item.value as T;
  }

  async set<T>(key: string, value: T, ttlInSeconds?: number): Promise<void> {
    const expiry = ttlInSeconds ? Date.now() + ttlInSeconds * 1000 : null;
    this.cache.set(key, { value, expiry });
  }

  async del(key: string): Promise<void> {
    this.cache.delete(key);
  }

  async delByPrefix(prefix: string): Promise<void> {
    for (const key of this.cache.keys()) {
      if (key.startsWith(prefix)) {
        this.cache.delete(key);
      }
    }
  }

  async clearAll(): Promise<void> {
    this.cache.clear();
  }

  async disconnect(): Promise<void> {
    // No-op for memory cache
  }
}

export const cacheService = new MemoryCacheService();
