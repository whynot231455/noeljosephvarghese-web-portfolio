import { GearItem, SkillDomain } from './types';

// Projects now live as individual JSON files in `src/content/projects/*.json`
// and are loaded via `src/content/loader.ts`.
// Add: copy `_template.json` to `<id>.json`. Remove: delete the file.
// Reorder: change the `order` number. Images go in `public/projects/<id>/cover.png`.

export const SKILL_DOMAINS: SkillDomain[] = [
  {
    id: 'content-creative',
    domain: 'Content & Creative',
    description: 'Developing high-engagement content strategies, ecosystem flows, and visual campaigns that cultivate authentic audience growth.',
    icon: 'Video',
    skills: [
      'Content Operations',
      'Content Strategy',
      'Content Ecosystem Analysis',
      'Visual Content Production',
      'Social Media Content Creation',
      'Audience Growth Strategy (600+ followers across YT/IG)',
      'Video Editing & Reels'
    ]
  },
  {
    id: 'ai-ml',
    domain: 'AI & ML Engineering',
    description: 'Engineering intelligent systems, multi-agent frameworks, predictive data modeling, and robust market analytics workflows.',
    icon: 'Cpu',
    skills: [
      'Generative AI',
      'LangGraph',
      'ReACT Agents',
      'Retrieval-Augmented Generation (RAG)',
      'Multi-Agent Architectures',
      'Marketing Mix Modelling',
      'Predictive Analytics',
      'Dataiku DSS',
      'Gemini API',
      'AI Image Generation'
    ]
  },
  {
    id: 'data-analytics',
    domain: 'Data & Analytics',
    description: 'Transforming complex datasets into high-impact corporate intelligence, KPI frameworks, and seamless cloud integrations.',
    icon: 'BarChart3',
    skills: [
      'SQL/MySQL',
      'Python',
      'Power BI',
      'ETL Pipelines',
      'Data Visualization',
      'KPI Hierarchy Design',
      'Cloud Deployment (Vercel)',
      'Recharts'
    ]
  },
  {
    id: 'product-delivery',
    domain: 'Product Delivery',
    description: 'Governing product lifecycles through precise agile governance, requirements scoping, and senior stakeholder handoffs.',
    icon: 'Briefcase',
    skills: [
      'Agile / Scrum',
      'Sprint Planning & Execution',
      'Release Management',
      'Business Analysis',
      'Requirements Gathering (BRD/FRD)',
      'Technical Documentation',
      'Stakeholder Reporting',
      'Vendor Management'
    ]
  },
  {
    id: 'design-ux',
    domain: 'Design & UX',
    description: 'Crafting responsive user experiences, design tokens, complete component libraries, and unified brand interfaces.',
    icon: 'Figma',
    skills: [
      'Figma (expert)',
      'UI/UX Design',
      'Design Systems & Component Libraries',
      'Wireframing & Prototyping',
      'User Research',
      'Journey Mapping',
      'Service Blueprints',
      'Responsive Web & Mobile Design',
      'ChatGPT Images 2.0'
    ]
  },
  {
    id: 'visual-production',
    domain: 'Visual Production',
    description: 'Producing striking cinematic visual assets, mood boards, storyboards, and multi-media campaign collaterals.',
    icon: 'Palette',
    skills: [
      'Adobe Photoshop',
      'CapCut',
      'Digital Assets',
      'Brand Collateral',
      'Storyboards',
      'Mood Boards',
      'Marketing Comps',
      'Midjourney'
    ]
  },
  {
    id: 'front-end',
    domain: 'Front-End',
    description: 'Translating design visions into highly interactive, modular front-end interfaces and secure browser extensions.',
    icon: 'Code',
    skills: [
      'HTML',
      'CSS',
      'Tailwind CSS',
      'JavaScript',
      'TypeScript',
      'React',
      'Vite',
      'Chrome Extension Development',
      'Feasibility Assessment',
      'Dev Handoff'
    ]
  },
  {
    id: 'tools-platforms',
    domain: 'Tools & Platforms',
    description: 'Utilizing next-generation developer tooling, AI coding agents, headless backends, and collaborative platforms.',
    icon: 'Terminal',
    skills: [
      'Git',
      'Figma Make',
      'Supabase',
      'Canva',
      'Lovable',
      'Microsoft Office Suite (Advanced Excel, PowerPoint)',
      'Codex',
      'Hermes CLI',
      'Antigravity',
      'Claude Code'
    ]
  }
];
