import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { verifyDevAuth } from '@/lib/auth';
import { projectStorageSchema } from '@/lib/projects';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = verifyDevAuth(request);
  if (!auth.authorized) {
    return auth.response;
  }

  try {
    const resolvedParams = await params;
    const { id } = resolvedParams;
    const dataFilePath = path.join(process.cwd(), 'content', 'projects.json');
    
    const fileContents = await fs.readFile(dataFilePath, 'utf8');
    const projects = projectStorageSchema.array().parse(JSON.parse(fileContents));
    
    const filteredProjects = projects.filter((p) => p.id !== id);
    
    if (projects.length === filteredProjects.length) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    await fs.writeFile(dataFilePath, JSON.stringify(filteredProjects, null, 2), 'utf8');
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
