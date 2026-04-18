import { NextResponse } from 'next/server';

export const DEV_AUTH_HEADER = 'X-Dev-Auth';

export function verifyDevAuth(request: Request) {
  const password = process.env.DEV_API_PASSWORD;
  
  // If no password is set, deny by default in production
  if (!password) {
    if (process.env.NODE_ENV === 'production') {
      return { authorized: false, response: NextResponse.json({ error: 'Auth not configured' }, { status: 500 }) };
    }
    // In dev, if no password is set, we can allow or deny. 
    // User requested password protection, so let's require it if set.
    return { authorized: true }; 
  }

  const authHeader = request.headers.get(DEV_AUTH_HEADER);

  if (authHeader !== password) {
    return { 
      authorized: false, 
      response: NextResponse.json({ error: 'Unauthorized: Invalid Dev Password' }, { status: 401 }) 
    };
  }

  return { authorized: true };
}
