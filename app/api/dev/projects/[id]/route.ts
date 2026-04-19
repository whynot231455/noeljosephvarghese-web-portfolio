import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { verifyDevAuth } from '@/lib/auth';
import { projectStorageSchema, withProjectLock } from '@/lib/projects';

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
    
    return await withProjectLock(async () => {
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      const projects = projectStorageSchema.array().parse(JSON.parse(fileContents));
      
      const projectToDelete = projects.find((p) => p.id === id);
      if (!projectToDelete) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
      }

      // Attempt to delete image if it's a local path
      if (projectToDelete.coverImage && projectToDelete.coverImage.startsWith('/projects/')) {
        const publicProjectsDir = path.resolve(process.cwd(), 'public', 'projects');
        const cleanPath = projectToDelete.coverImage.replace(/^\//, '');
        const filePath = path.resolve(process.cwd(), 'public', cleanPath);

        if (!filePath.startsWith(publicProjectsDir + path.sep)) {
          throw new Error('Invalid image path: Path traversal detected');
        }

        await fs.unlink(filePath);

      }

      const filteredProjects = projects.filter((p) => p.id !== id);
      await fs.writeFile(dataFilePath, JSON.stringify(filteredProjects, null, 2), 'utf8');
      
      return NextResponse.json({ success: true });
    });

  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
