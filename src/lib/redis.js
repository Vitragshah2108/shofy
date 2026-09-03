import { Redis } from '@upstash/redis';

// Default TTL configurations (in seconds)
export const TTL_CONFIG = {
  PRODUCTS_ALL: 3600,       // 1 hour
  PRODUCT_TYPE: 3600,       // 1 hour
  PRODUCT_SINGLE: 3600,     // 1 hour
  PRODUCT_OFFER: 1800,      // 30 minutes
  PRODUCT_POPULAR: 3600,    // 1 hour
  PRODUCT_TOP_RATED: 3600,  // 1 hour
  CATEGORIES: 7200,         // 2 hours
  BRANDS: 7200,             // 2 hours
  COUPONS: 1800,            // 30 minutes
  REVIEWS: 1800,            // 30 minutes
  DEFAULT: 3600,            // 1 hour
};

let redisClient = null;

export function getRedis() {
  if (redisClient) return redisClient;

  const url = process.env.UPSTASH_REDIS_REST_URL || process.env.REDIS_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (url && token) {
    try {
      redisClient = new Redis({
        url,
        token,
      });
      return redisClient;
    } catch (err) {
      console.warn('[Redis] Initialization warning:', err.message);
      return null;
    }
  }

  return null;
}

/**
 * Generate a safe, deterministic cache key
 */
export function generateCacheKey(prefix, queryObj = {}) {
  const cleanPrefix = prefix.replace(/^\/+|\/+$/g, '').replace(/\//g, ':');
  
  if (!queryObj || Object.keys(queryObj).length === 0) {
    return `shofy:${cleanPrefix}`;
  }

  // Sort query keys deterministically
  const sortedKeys = Object.keys(queryObj).sort();
  const queryString = sortedKeys
    .filter((k) => queryObj[k] !== undefined && queryObj[k] !== null && queryObj[k] !== '')
    .map((k) => `${k}=${encodeURIComponent(queryObj[k])}`)
    .join('&');

  return queryString ? `shofy:${cleanPrefix}:${queryString}` : `shofy:${cleanPrefix}`;
}

/**
 * Retrieve cached JSON data
 */
export async function getCachedData(key) {
  const redis = getRedis();
  if (!redis) return null;

  try {
    const data = await redis.get(key);
    if (!data) return null;
    return typeof data === 'string' ? JSON.parse(data) : data;
  } catch (err) {
    console.warn(`[Redis Cache Error] getCachedData for key "${key}":`, err.message);
    return null;
  }
}

/**
 * Store JSON data with configurable TTL
 */
export async function setCachedData(key, value, ttlSeconds = TTL_CONFIG.DEFAULT) {
  const redis = getRedis();
  if (!redis || value === undefined || value === null) return;

  try {
    const payload = typeof value === 'string' ? value : JSON.stringify(value);
    await redis.set(key, payload, { ex: ttlSeconds });
  } catch (err) {
    console.warn(`[Redis Cache Error] setCachedData for key "${key}":`, err.message);
  }
}
