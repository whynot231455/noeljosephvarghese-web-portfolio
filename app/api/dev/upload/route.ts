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

function validateImageMagicBytes(buffer: Buffer): boolean {
  if (buffer.length < 12) return false;

  // JPEG: FF D8 FF
  if (buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff) return true;
  
  // PNG: 89 50 4E 47 0D 0A 1A 0A
  if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4e && buffer[3] === 0x47 &&
      buffer[4] === 0x0d && buffer[5] === 0x0a && buffer[6] === 0x1a && buffer[7] === 0x0a) return true;
      
  // WEBP: RIFF....WEBP
  if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46 &&
      buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) return true;
      
  // GIF: GIF87a or GIF89a
  if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38 &&
      (buffer[4] === 0x37 || buffer[4] === 0x39) && buffer[5] === 0x61) return true;
      
  // AVIF: ....ftypavif (ftyp starts at 4, avif at 8)
  if (buffer[4] === 0x66 && buffer[5] === 0x74 && buffer[6] === 0x79 && buffer[7] === 0x70 &&
      buffer[8] === 0x61 && buffer[9] === 0x76 && buffer[10] === 0x69 && buffer[11] === 0x66) return true;

  return false;
}

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

    const stream = file.stream();
    const chunks: Uint8Array[] = [];
    let totalLength = 0;

    const reader = stream.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      
      totalLength += value.length;
      if (totalLength > MAX_FILE_SIZE) {
        await reader.cancel(); // Abort the stream to free resources quickly
        return NextResponse.json({ error: 'Streamed file size exceeds maximum limit (max 5MB)' }, { status: 400 });
      }
      chunks.push(value);
    }

    const buffer = Buffer.concat(chunks);

    // Validate magic bytes to prevent forged Content-Type / File Extension attacks
    if (!validateImageMagicBytes(buffer)) {
      return NextResponse.json({ error: 'File content does not match an allowed image type' }, { status: 400 });
    }

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
    
    const filePath = path.resolve(publicDir, filename);
    if (!filePath.startsWith(publicDir + path.sep)) {
      return NextResponse.json({ error: 'Invalid path: Path traversal detected' }, { status: 400 });
    }

    await fs.writeFile(filePath, buffer);

    // Return the path that the frontend can use to load the image
    return NextResponse.json({ success: true, url: `/projects/${filename}` });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
  }
}
