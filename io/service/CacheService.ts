import type { Translation } from "domain/types/Translation";

class CacheService {
  private cache: Record<string, Translation> = {};

  get(key: string): Translation | undefined {
    return this.cache[key];
  }

  set(key: string, translation: Translation) {
    this.cache[key] = translation;
  }

  has(key: string): boolean {
    return key in this.cache;
  }
}

const cacheService = new CacheService();

export default cacheService;
