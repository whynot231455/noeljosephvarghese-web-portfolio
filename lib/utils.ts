import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function sanitizeUrl(url: string | undefined): string {
  if (!url) return "#";
  
  const trimmedUrl = url.trim();

  if (trimmedUrl.startsWith('//')) {
    console.warn(`[Security] Blocked protocol-relative URL: ${trimmedUrl}`);
    return "#";
  }

  if (trimmedUrl.startsWith('/') || trimmedUrl.startsWith('#')) {
    return trimmedUrl;
  }

  try {
    const parsed = new URL(trimmedUrl);
    if (parsed.protocol === 'http:' || parsed.protocol === 'https:' || parsed.protocol === 'mailto:') {
      return trimmedUrl;
    }
  } catch {
    // Fall through to the blocked case below.
  }

  console.warn(`[Security] Blocked unsafe URL: ${trimmedUrl}`);
  return "#";
}
