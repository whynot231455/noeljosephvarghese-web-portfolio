import { Project } from '../types';

// Auto-load every project JSON in this folder.
// To add a project: copy `_template.json` to `<my-id>.json` and fill it in.
// To remove: delete the `<id>.json` file.
// To reorder: change the `order` number (lowest first).
const modules = import.meta.glob<{ default: Project }>('./projects/*.json', { eager: true });

const VALID_CATEGORIES = new Set(['VIDEO', 'AI_CODE', 'DESIGN']);

function isValidProject(p: Partial<Project>): p is Project {
  return (
    typeof p.id === 'string' &&
    p.id.length > 0 &&
    typeof p.title === 'string' &&
    p.title.length > 0 &&
    typeof p.imageUrl === 'string' &&
    p.imageUrl.length > 0 &&
    typeof p.category === 'string' &&
    VALID_CATEGORIES.has(p.category) &&
    typeof p.date === 'string' &&
    typeof p.description === 'string' &&
    Array.isArray(p.tags) &&
    Array.isArray(p.tech)
  );
}

function load(): Project[] {
  const projects: Project[] = [];
  const seen = new Set<string>();

  for (const [path, mod] of Object.entries(modules)) {
    if (path.endsWith('_template.json')) continue;
    const data = (mod as { default: Project }).default;
    if (!isValidProject(data)) {
      console.warn(`[projects] Skipping invalid project file: ${path}`);
      continue;
    }
    if (seen.has(data.id)) {
      console.warn(`[projects] Duplicate id "${data.id}" in ${path} — skipping.`);
      continue;
    }
    seen.add(data.id);
    projects.push(data);
  }

  projects.sort((a, b) => (a.order ?? 999) - (b.order ?? 999) || a.id.localeCompare(b.id));
  return projects;
}

export const PROJECTS: Project[] = load();
