import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { verifyDevAuth } from '@/lib/auth';

const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.avif'];
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/avif',
]);
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function POST(request: Request) {
  // Check Password
  const auth = verifyDevAuth(request);
  if (!auth.authorized) return auth.response;

  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Check File size
    if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json({ error: 'File size too large (max 5MB)' }, { status: 400 });
    }

    // Check File extension
    const ext = path.extname(file.name).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return NextResponse.json({ error: 'Invalid file type. Allowed: ' + ALLOWED_EXTENSIONS.join(', ') }, { status: 400 });
    }

    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return NextResponse.json({ error: 'Invalid image MIME type' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename based on current timestamp to avoid collisions
    const filename = `project-${Date.now()}${ext}`;
    
    // Save to public/projects/ directory
    const publicDir = path.join(process.cwd(), 'public', 'projects');
    
    // Ensure directory exists
    try {
      await fs.access(publicDir);
    } catch {
      await fs.mkdir(publicDir, { recursive: true });
    }
    
    const filePath = path.join(publicDir, filename);
    await fs.writeFile(filePath, buffer);

    // Return the path that the frontend can use to load the image
    return NextResponse.json({ success: true, url: `/projects/${filename}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
