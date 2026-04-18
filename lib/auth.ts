import { NextResponse } from 'next/server';

export const DEV_AUTH_HEADER = 'X-Dev-Auth';

export function verifyDevAuth(request: Request) {
  const password = process.env.DEV_API_PASSWORD;
  
  // If no password is set, deny by default in production or any non-dev env
  if (!password) {
    if (process.env.NODE_ENV !== 'development') {
      return {
        authorized: false,
        response: NextResponse.json({ error: 'Dev Auth not configured' }, { status: 401 })
      };
    }
    // In local development with no password set, we allow access.
    return { authorized: true }; 
  }

  const authHeader = request.headers.get(DEV_AUTH_HEADER);

  if (!authHeader || authHeader !== password) {
    return { 
      authorized: false, 
      response: NextResponse.json({ error: 'Unauthorized: Invalid or Missing Dev Password' }, { status: 401 })
    };
  }

  return { authorized: true };
}
