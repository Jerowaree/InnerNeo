import { describe, it, expect, beforeEach } from 'vitest';
import { isRateLimited, sanitize, MAX_REQUESTS_PER_WINDOW, resetRateLimiter } from './security';

describe('Security Utility Library', () => {
  beforeEach(() => {
    resetRateLimiter();
  });

  describe('XSS Sanitization', () => {
    it('should strip malicious script tags', () => {
      const dirty = '<script>alert("xss")</script>Hello';
      const clean = sanitize(dirty);
      expect(clean).toBe('Hello');
    });

    it('should strip event handlers like onerror', () => {
      const dirty = '<img src=x onerror=alert(1)>';
      const clean = sanitize(dirty);
      expect(clean).toBe('<img src="x">');
    });

    it('should preserve safe HTML if needed (though we mostly use it for plain text)', () => {
      const dirty = '<strong>Safe</strong>';
      const clean = sanitize(dirty);
      expect(clean).toBe('<strong>Safe</strong>');
    });
  });

  describe('Rate Limiting', () => {
    const ip = '192.168.1.1';

    it('should allow requests under the limit', () => {
      for (let i = 0; i < MAX_REQUESTS_PER_WINDOW; i++) {
        expect(isRateLimited(ip)).toBe(false);
      }
    });

    it('should block requests over the limit', () => {
      for (let i = 0; i < MAX_REQUESTS_PER_WINDOW; i++) {
        isRateLimited(ip);
      }
      expect(isRateLimited(ip)).toBe(true);
    });

    it('should reset after the time window', () => {
      const now = Date.now();
      for (let i = 0; i < MAX_REQUESTS_PER_WINDOW; i++) {
        isRateLimited(ip, now);
      }
      expect(isRateLimited(ip, now)).toBe(true);

      // Fast forward 1 minute + 1 second
      const future = now + (61 * 1000);
      expect(isRateLimited(ip, future)).toBe(false);
    });
  });
});
