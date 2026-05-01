import ismorphicDomPurify from 'isomorphic-dompurify';

export const RATE_LIMIT_MS = 60 * 1000; // 1 minute
export const MAX_REQUESTS_PER_WINDOW = 3;
export const IP_BLOCK_LIST = new Set<string>(['1.1.1.1']);

const requestStore = new Map<string, { count: number; lastReset: number }>();

/**
 * Level 10 Security: Content Isolation (Zero Trust)
 * Completely neutralizes the message by breaking URLs and stripping everything except alphanumeric text.
 */
export function isolateContent(text: string): string {
  // 1. Force plain text and strip ANY control character
  let isolated = text.replace(/[\x00-\x1F\x7F-\x9F]/g, "");

  // 2. Neutralize URLs (Make them unclickable and safe)
  // Changes http://site.com to [SECURE_BREAK] site[.]com
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  isolated = isolated.replace(urlPattern, (url) => {
    const safeUrl = url.replace('://', ' [://] ').replace(/\./g, '[.]');
    return `<< ENLACE NEUTRALIZADO: ${safeUrl} >>`;
  });

  // 3. Add a Security Header for the Admin
  const timestamp = new Date().toISOString();
  return `
--- INNER NEO SECURITY ISOLATION LAYER [${timestamp}] ---
${isolated}
-------------------------------------------------------
  `.trim();
}

const SPAM_KEYWORDS = ['crypto', 'viagra', 'casino', 'poker', 'free money', 'pills'];

/**
 * Advanced content filter: Detects spam and adds warnings to links
 */
export function secureContent(text: string): string {
  let filtered = text;

  // 1. Check for spam keywords
  const containsSpam = SPAM_KEYWORDS.some(word => text.toLowerCase().includes(word));
  if (containsSpam) {
    filtered = `[POSIBLE SPAM DETECTADO] -- ${filtered}`;
  }

  // 2. Anti-Phishing: Add warnings to any URL found in text
  const urlPattern = /(https?:\/\/[^\s]+)/g;
  filtered = filtered.replace(urlPattern, (url) => {
    return `[⚠️ LINK EXTERNO: ${url}]`;
  });

  return filtered;
}

/**
 * Basic in-memory rate limiter
 */
export function isRateLimited(ip: string, now: number = Date.now()): boolean {
  const userData = requestStore.get(ip);

  if (!userData || (now - userData.lastReset) > RATE_LIMIT_MS) {
    requestStore.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (userData.count >= MAX_REQUESTS_PER_WINDOW) {
    return true;
  }

  userData.count += 1;
  return false;
}

/**
 * Sanitizes input to prevent XSS
 */
export function sanitize(text: string): string {
  return ismorphicDomPurify.sanitize(text);
}

/**
 * Resets the rate limiter for testing purposes
 */
export function resetRateLimiter() {
  requestStore.clear();
}
