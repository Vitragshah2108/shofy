import { getCachedData, setCachedData, generateCacheKey, TTL_CONFIG } from '@/lib/redis';

const BACKEND_BASE_URL = process.env.BACKEND_API_URL || 'https://shofy-backend.vercel.app';

// Sensitive endpoints that MUST NEVER be cached
const SENSITIVE_PATH_PATTERNS = [
  /^user\//i,
  /^auth\//i,
  /^order\//i,
  /^payment\//i,
  /create-payment-intent/i,
  /save-order/i,
  /update-status/i,
];

function isSensitive(path) {
  return SENSITIVE_PATH_PATTERNS.some((pattern) => pattern.test(path));
}

function resolveTTL(path) {
  if (/^category\//i.test(path)) return TTL_CONFIG.CATEGORIES;
  if (/^brand\//i.test(path)) return TTL_CONFIG.BRANDS;
  if (/^coupon/i.test(path)) return TTL_CONFIG.COUPONS;
  if (/^review/i.test(path)) return TTL_CONFIG.REVIEWS;
  if (/^product\/all/i.test(path)) return TTL_CONFIG.PRODUCTS_ALL;
  if (/^product\/offer/i.test(path)) return TTL_CONFIG.PRODUCT_OFFER;
  if (/^product\/popular/i.test(path)) return TTL_CONFIG.PRODUCT_POPULAR;
  if (/^product\/top-rated/i.test(path)) return TTL_CONFIG.PRODUCT_TOP_RATED;
  if (/^product\/single-product/i.test(path)) return TTL_CONFIG.PRODUCT_SINGLE;
  if (/^product\/related-product/i.test(path)) return TTL_CONFIG.PRODUCT_SINGLE;
  if (/^product\//i.test(path)) return TTL_CONFIG.PRODUCT_TYPE;
  return TTL_CONFIG.DEFAULT;
}

export default async function handler(req, res) {
  const { path: pathSegments, ...queryParams } = req.query;
  const targetPath = Array.isArray(pathSegments) ? pathSegments.join('/') : (pathSegments || '');

  // 1. If method is not GET or is a sensitive endpoint, proxy directly without caching
  if (req.method !== 'GET' || isSensitive(targetPath)) {
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const targetUrl = `${BACKEND_BASE_URL}/api/${targetPath}${queryString ? `?${queryString}` : ''}`;

      const headers = { ...req.headers };
      delete headers.host;
      delete headers['content-length'];

      const response = await fetch(targetUrl, {
        method: req.method,
        headers: {
          'Content-Type': 'application/json',
          ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
        },
        body: req.method !== 'GET' && req.body ? JSON.stringify(req.body) : undefined,
      });

      const data = await response.json().catch(() => ({}));
      res.setHeader('X-Cache', 'BYPASS');
      return res.status(response.status).json(data);
    } catch (error) {
      console.error(`[BFF Proxy Error] Direct proxy to ${targetPath}:`, error.message);
      return res.status(502).json({ error: 'Bad Gateway: Backend unreachable', message: error.message });
    }
  }

  // 2. Cachable GET Request: Check Redis
  const cacheKey = generateCacheKey(targetPath, queryParams);
  const ttl = resolveTTL(targetPath);

  try {
    const cachedData = await getCachedData(cacheKey);
    if (cachedData) {
      res.setHeader('X-Cache', 'HIT');
      res.setHeader('X-Cache-Key', cacheKey);
      res.setHeader('Cache-Control', `public, s-maxage=${ttl}, stale-while-revalidate=86400`);
      return res.status(200).json(cachedData);
    }
  } catch (err) {
    console.warn('[BFF Cache Read Warning]:', err.message);
  }

  // 3. Cache Miss: Fetch from slow remote backend
  try {
    const queryString = new URLSearchParams(queryParams).toString();
    const targetUrl = `${BACKEND_BASE_URL}/api/${targetPath}${queryString ? `?${queryString}` : ''}`;

    const headers = {
      'Content-Type': 'application/json',
      ...(req.headers.authorization ? { Authorization: req.headers.authorization } : {}),
    };

    const response = await fetch(targetUrl, {
      method: 'GET',
      headers,
    });

    const data = await response.json().catch(() => null);

    if (response.ok && data) {
      // Asynchronously cache successful response in Redis
      setCachedData(cacheKey, data, ttl).catch((err) => {
        console.warn('[BFF Cache Write Warning]:', err.message);
      });

      res.setHeader('X-Cache', 'MISS');
      res.setHeader('X-Cache-Key', cacheKey);
      res.setHeader('Cache-Control', `public, s-maxage=${ttl}, stale-while-revalidate=86400`);
      return res.status(200).json(data);
    }

    res.setHeader('X-Cache', 'MISS-UNCLEAN');
    return res.status(response.status).json(data || { error: 'Failed to fetch from backend' });
  } catch (error) {
    console.error(`[BFF Fetch Error] ${targetPath}:`, error.message);
    return res.status(502).json({ error: 'Bad Gateway', message: error.message });
  }
}
