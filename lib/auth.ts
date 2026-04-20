import { NextResponse } from 'next/server';
import crypto from 'crypto';

export const DEV_AUTH_HEADER = 'X-Dev-Auth';

export function verifyDevAuth(request: Request) {
  const password = process.env.DEV_API_PASSWORD;
  
  // Unconditionally require a password
  if (!password) {
    return {
      authorized: false,
      response: NextResponse.json({ error: 'Dev Auth not configured' }, { status: 401 })
    };
  }

  const authHeader = request.headers.get(DEV_AUTH_HEADER);

  if (!authHeader) {
    return { 
      authorized: false, 
      response: NextResponse.json({ error: 'Unauthorized: Invalid or Missing Dev Password' }, { status: 401 })
    };
  }

  const expectedPassword = Buffer.from(password);
  const providedPassword = Buffer.from(authHeader);

  const maxLen = Math.max(expectedPassword.length, providedPassword.length);
  const a = Buffer.alloc(maxLen);
  const b = Buffer.alloc(maxLen);
  expectedPassword.copy(a);
  providedPassword.copy(b);

  const lengthMatch = expectedPassword.length === providedPassword.length;
  const contentMatch = crypto.timingSafeEqual(a, b);
  const isMatch = lengthMatch && contentMatch;

  if (!isMatch) {
    return { 
      authorized: false, 
      response: NextResponse.json({ error: 'Unauthorized: Invalid or Missing Dev Password' }, { status: 401 })
    };
  }

  // CSRF Protection for state-mutating requests
  if (['POST', 'PUT', 'DELETE', 'PATCH'].includes(request.method)) {
    const origin = request.headers.get('origin');
    const referer = request.headers.get('referer');
    const host = request.headers.get('x-forwarded-host') || request.headers.get('host');

    let isSafeOrigin = false;

    if (origin && host) {
      try {
        const originUrl = new URL(origin);
        if (originUrl.host === host) isSafeOrigin = true;
      } catch (e) {}
    } else if (referer && host) {
      try {
        const refererUrl = new URL(referer);
        if (refererUrl.host === host) isSafeOrigin = true;
      } catch (e) {}
    } else if (!origin && !referer && process.env.NODE_ENV === 'development') {
      // Allow direct API calls (e.g., cURL, Postman) in development
      isSafeOrigin = true;
    }

    if (!isSafeOrigin) {
      return {
        authorized: false,
        response: NextResponse.json({ error: 'Forbidden: CSRF Origin Mismatch' }, { status: 403 })
      };
    }
  }

  return { authorized: true };
}
