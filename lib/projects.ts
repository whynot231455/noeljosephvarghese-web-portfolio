import { z } from 'zod';

export const projectCategories = ['dev', 'software', 'uiux', 'photo', 'video'] as const;

const projectIdSchema = z
  .string()
  .trim()
  .min(1, 'Project ID is required.')
  .max(120, 'Project ID is too long.')
  .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Project ID must use lowercase letters, numbers, and hyphens only.');

const projectDateSchema = z
  .string()
  .trim()
  .regex(/^\d{4}-\d{2}-\d{2}$/, 'Published date must use YYYY-MM-DD format.');

const optionalHttpUrlSchema = z.preprocess((value) => {
  if (typeof value !== 'string') return undefined;

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}, z.string().url().refine((value) => {
  const protocol = new URL(value).protocol;
  return protocol === 'http:' || protocol === 'https:';
}, 'URL must use http or https.'));

const projectImageSchema = z
  .string()
  .trim()
  .min(1, 'Cover image is required.')
  .refine((value) => value.startsWith('/projects/'), {
    message: 'Cover image must point to an uploaded project asset.',
  });

export const projectStorageSchema = z.object({
  id: projectIdSchema,
  title: z.string().trim().min(1).max(120),
  category: z.enum(projectCategories),
  summary: z.string().trim().min(1).max(240),
  description: z.string().trim().min(1).max(4000),
  coverImage: projectImageSchema,
  tags: z.array(z.string().trim().min(1).max(40)).min(1).max(12),
  featured: z.boolean(),
  publishedAt: projectDateSchema,
  repoUrl: optionalHttpUrlSchema.optional(),
  figmaUrl: optionalHttpUrlSchema.optional(),
  liveUrl: optionalHttpUrlSchema.optional(),
});

export const projectDraftSchema = projectStorageSchema
  .omit({ publishedAt: true })
  .extend({
    publishedAt: projectDateSchema.optional(),
    oldId: projectIdSchema.optional(),
  })
  .strict();

export type ProjectRecord = z.infer<typeof projectStorageSchema>;
export type ProjectDraft = z.infer<typeof projectDraftSchema>;

export function slugifyProjectId(input: string): string {
  const slug = input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  return slug || `project-${Date.now()}`;
}

export function normalizeProjectDraft(raw: unknown): {
  project: ProjectRecord;
  oldId?: string;
} {
  const { oldId, ...draft } = projectDraftSchema.parse(raw);
  const normalizedId = slugifyProjectId(draft.id || draft.title);

  return {
    oldId,
    project: {
      ...draft,
      id: normalizedId,
      publishedAt: draft.publishedAt ?? new Date().toISOString().split('T')[0],
      tags: draft.tags.map((tag) => tag.trim()).filter(Boolean),
    },
  };
}
