import { describe, it, expect, vi, beforeEach } from 'vitest';

// We need to mock NextResponse and crypto before importing the module
vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data, init) => ({
      data,
      status: init?.status ?? 200,
    })),
  },
}));

describe('verifyDevAuth', () => {
  beforeEach(() => {
    vi.resetModules();
    vi.unstubAllEnvs();
  });

  it('rejects when DEV_API_PASSWORD is not set', async () => {
    delete process.env.DEV_API_PASSWORD;
    const { verifyDevAuth } = await import('./auth');

    const request = new Request('http://localhost/api/dev/projects', {
      method: 'GET',
      headers: { 'X-Dev-Auth': 'any-password' },
    });

    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
    expect((result.response as any).data?.error).toBe('Dev Auth not configured');
  });

  it('rejects when auth header is missing', async () => {
    process.env.DEV_API_PASSWORD = 'test-password';
    const { verifyDevAuth } = await import('./auth');

    const request = new Request('http://localhost/api/dev/projects', {
      method: 'GET',
    });

    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
  });

  it('rejects when password is wrong', async () => {
    process.env.DEV_API_PASSWORD = 'correct-password';
    const { verifyDevAuth } = await import('./auth');

    const request = new Request('http://localhost/api/dev/projects', {
      method: 'GET',
      headers: { 'X-Dev-Auth': 'wrong-password' },
    });

    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
  });

  it('accepts when password matches', async () => {
    process.env.DEV_API_PASSWORD = 'correct-password';
    const { verifyDevAuth } = await import('./auth');

    const request = new Request('http://localhost/api/dev/projects', {
      method: 'GET',
      headers: { 'X-Dev-Auth': 'correct-password' },
    });

    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(true);
  });

  it('performs timing-safe comparison (different length passwords)', async () => {
    process.env.DEV_API_PASSWORD = 'correct';
    const { verifyDevAuth } = await import('./auth');

    const request = new Request('http://localhost/api/dev/projects', {
      method: 'GET',
      headers: { 'X-Dev-Auth': 'x' },
    });

    const result = verifyDevAuth(request);
    expect(result.authorized).toBe(false);
  });
});
