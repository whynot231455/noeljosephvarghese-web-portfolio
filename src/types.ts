export enum ViewType {
  ABOUT = 'ABOUT',
  GALLERY = 'GALLERY',
  STUDIO = 'STUDIO',
  TOOLS_SKILLS = 'TOOLS_SKILLS'
}

export interface Project {
  id: string;
  title: string;
  category: 'VIDEO' | 'AI_CODE' | 'DESIGN';
  date: string;
  imageUrl: string;
  description: string;
  summary?: string;
  longDescription?: string;
  highlights?: string[];
  outcome?: string;
  role?: string;
  tags: string[];
  tech: string[];
  featured?: boolean;
  link?: string;
  githubUrl?: string;
  badge?: string;
  order?: number;
  stats?: { label: string; value: string }[];
}

export interface GearItem {
  id: string;
  name: string;
  category: 'HARDWARE' | 'SOFTWARE' | 'RIG';
  spec: string;
  description: string;
  rating: number;
  highlight?: string;
}

export interface SkillDomain {
  id: string;
  domain: string;
  skills: string[];
  description: string;
  icon: string; // lucide icon identifier
}
