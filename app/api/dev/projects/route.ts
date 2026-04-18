import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { verifyDevAuth } from '@/lib/auth';
import { normalizeProjectDraft, projectStorageSchema, type ProjectRecord } from '@/lib/projects';

const DATA_FILE_PATH = path.join(process.cwd(), 'content', 'projects.json');
const PUBLIC_PROJECTS_DIR = path.join(process.cwd(), 'public', 'projects');

async function readProjects(): Promise<ProjectRecord[]> {
  const fileContents = await fs.readFile(DATA_FILE_PATH, 'utf8');
  return projectStorageSchema.array().parse(JSON.parse(fileContents));
}

async function writeProjects(projects: ProjectRecord[]) {
  await fs.writeFile(DATA_FILE_PATH, JSON.stringify(projects, null, 2), 'utf8');
}

// GET: Fetch all projects
export async function GET(request: Request) {
  const auth = verifyDevAuth(request);
  if (!auth.authorized) return auth.response;

  if (process.env.NODE_ENV !== 'development' && !process.env.DEV_API_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const projects = await readProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST: Add new project
export async function POST(request: Request) {
  const auth = verifyDevAuth(request);
  if (!auth.authorized) return auth.response;

  if (process.env.NODE_ENV !== 'development' && !process.env.DEV_API_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { project: newProject } = normalizeProjectDraft(await request.json());
    const projects = await readProjects();
    
    // Check for duplicate ID
    if (projects.some((p: ProjectRecord) => p.id === newProject.id)) {
      return NextResponse.json({ error: 'Project ID already exists' }, { status: 400 });
    }

    projects.unshift(newProject);
    await writeProjects(projects);
    
    return NextResponse.json({ success: true, project: newProject });
  } catch (error) {
    console.error('Error adding project:', error);
    return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
  }
}

// PUT: Update existing project
export async function PUT(request: Request) {
  const auth = verifyDevAuth(request);
  if (!auth.authorized) return auth.response;

  if (process.env.NODE_ENV !== 'development' && !process.env.DEV_API_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { project: updatedProject, oldId } = normalizeProjectDraft(await request.json());
    const projects = await readProjects();
    
    // Use oldId if provided (for renaming), otherwise use the project id
    const idToFind = oldId || updatedProject.id;
    const index = projects.findIndex((p: ProjectRecord) => p.id === idToFind);
    
    if (index === -1) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const duplicateId = projects.some(
      (project: ProjectRecord, currentIndex: number) => currentIndex !== index && project.id === updatedProject.id
    );

    if (duplicateId) {
      return NextResponse.json({ error: 'Project ID already exists' }, { status: 400 });
    }

    // Update the project data
    projects[index] = {
      ...projects[index],
      ...updatedProject,
      publishedAt: updatedProject.publishedAt || projects[index].publishedAt,
    };
    
    await writeProjects(projects);
    
    return NextResponse.json({ success: true, project: projects[index] });
  } catch (error) {
    console.error('Error updating project:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE: Remove project and associated image
export async function DELETE(request: Request) {
  const auth = verifyDevAuth(request);
  if (!auth.authorized) return auth.response;

  if (process.env.NODE_ENV !== 'development' && !process.env.DEV_API_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await request.json();
    const projects = await readProjects();
    
    const projectToDelete = projects.find((p: ProjectRecord) => p.id === id);
    if (!projectToDelete) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    // Attempt to delete image if it's a local path
    if (projectToDelete.coverImage && projectToDelete.coverImage.startsWith('/projects/')) {
      // Sanitize filename to prevent path traversal
      const fileName = path.basename(projectToDelete.coverImage);
      const filePath = path.join(PUBLIC_PROJECTS_DIR, fileName);
      
      try {
        await fs.unlink(filePath);
        console.log(`Deleted associated image: ${filePath}`);
      } catch (err) {
        console.error(`Failed to delete image file: ${filePath}`, err);
        // Continue even if image deletion fails
      }
    }

    const updatedProjects = projects.filter((p: ProjectRecord) => p.id !== id);
    await writeProjects(updatedProjects);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting project:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}
