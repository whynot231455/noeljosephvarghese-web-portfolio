import { describe, it, expect, vi, beforeEach } from 'vitest';
import { verifyDevAuth, DEV_AUTH_HEADER } from './auth';
import { NextResponse } from 'next/server';

describe('verifyDevAuth', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
  });

  it('allows access in development when no password is set', () => {
    process.env.NODE_ENV = 'development';
    delete process.env.DEV_API_PASSWORD;
    const request = new Request('http://localhost', { headers: {} });
    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(true);
  });

  it('denies access in production when no password is set', () => {
    process.env.NODE_ENV = 'production';
    delete process.env.DEV_API_PASSWORD;
    const request = new Request('http://localhost', { headers: {} });
    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('denies access when password is set but header is missing', () => {
    process.env.DEV_API_PASSWORD = 'secret-password';
    const request = new Request('http://localhost', { headers: {} });
    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('denies access when password is set but header is incorrect', () => {
    process.env.DEV_API_PASSWORD = 'secret-password';
    const request = new Request('http://localhost', {
      headers: { [DEV_AUTH_HEADER]: 'wrong-password' },
    });
    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
    expect(result.response?.status).toBe(401);
  });

  it('allows access when password is set and header is correct', () => {
    process.env.DEV_API_PASSWORD = 'secret-password';
    const request = new Request('http://localhost', {
      headers: { [DEV_AUTH_HEADER]: 'secret-password' },
    });
    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(true);
  });
});
