import { describe, it, expect } from 'vitest';
import { cn, sanitizeUrl } from './utils';

describe('cn utility', () => {
  it('merges tailwind classes correctly', () => {
    expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
  });

  it('handles conditional classes properly', () => {
    const isTrue = true;
    const isFalse = false;
    expect(cn('base', isTrue && 'true-class', isFalse && 'false-class')).toBe('base true-class');
  });

  it('resolves tailwind conflicts correctly using tailwind-merge', () => {
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('blocks protocol-relative and javascript URLs', () => {
    expect(sanitizeUrl('//evil.example')).toBe('#');
    expect(sanitizeUrl('javascript:alert(1)')).toBe('#');
  });

  it('allows safe absolute and relative URLs', () => {
    expect(sanitizeUrl('https://example.com')).toBe('https://example.com');
    expect(sanitizeUrl('/contact')).toBe('/contact');
  });
});
