import { Project, GearItem, SkillDomain } from './types';
import solGarageErpCover from './assets/images/sol-garage-erp-cover.png';
import mmmDashboardCover from './assets/images/mmm-dashboard-cover.png';
import tripssecureWebsiteCover from './assets/images/tripssecure-website-cover.png';
import ctrlBlckCover from './assets/images/ctrl-blck-cover.png';

import jivikaCover from './assets/images/jivika-cover.png';

export const PROJECTS: Project[] = [
  {
    id: 'automotive-erp',
    title: 'Automotive ERP System',
    category: 'AI_CODE',
    date: '04 // 2026',
    imageUrl: solGarageErpCover,
    description: 'Transformed fragmented workshop operations into a scalable multi-tenant SaaS architecture MVP.',
    longDescription: 'Sol Garage is an end-to-end multi-tenant automotive ERP system built to optimize workflow management for garage operations. Designed through rigorous requirements gathering and on-ground operator interviews to define clear boundaries, it reduced developmental scope creep by 30% using interactive functional wireframes. It features a strict tenant permission hierarchy design, ensuring zero privilege escalation vulnerabilities during security testing.',
    tags: ['Multi-Tenant', 'ERP SaaS', 'Access Control', 'PRDs', 'Product Delivery'],
    tech: ['Figma', 'React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Motion', 'Recharts'],
    featured: true,
    badge: 'ERP SYSTEM',
    link: 'https://sol-garage-erp.vercel.app/',
    stats: [
      { label: 'Scope Creep Reduction', value: '30%' },
      { label: 'Vulnerability Rate', value: '0.0%' },
      { label: 'Operator Adoption', value: '100% verified' }
    ]
  },
  {
    id: 'mmm-dashboard',
    title: 'MMM Analytics Dashboard',
    category: 'AI_CODE',
    date: '02 // 2026',
    imageUrl: mmmDashboardCover,
    description: 'Intuitive corporate visualization layer translating advanced Marketing Mix Modeling and predictive AI outputs.',
    longDescription: 'Reduced time-to-insight for non-technical corporate executives by 40% through end-to-end delivery management of a complex data visualization layer. Translated advanced ML outputs—Marketing Mix Modeling and predictive analytics—into intuitive corporate tools, achieving on-time deployment through close collaboration with ML engineering teams on data-driven KPI hierarchies.',
    tags: ['Marketing Mix Modeling', 'Predictive Analytics', 'Data Visualization', 'KPI Hierarchy', 'Vercel Deployment'],
    tech:  ['React 19', 'TypeScript', 'Vite 7', 'Tailwind CSS 4', 'Express 5', 'Supabase', 'Recharts', 'Zustand', 'Lucide React', 'PapaParse', 'Axios', 'idb-keyval', 'Sonner', 'Dataiku DSS', 'Gemini AI', 'Meta Graph API', 'Python', 'PostgreSQL', 'Vitest'],
    featured: true,
    badge: 'ANALYTICS',
    link: 'https://mmm-sol-dashboard-829j8q7ip-whynot231455s-projects.vercel.app/',
    stats: [
      { label: 'Time-to-Insight Red.', value: '40%' },
      { label: 'Deployment Stability', value: '99.9%' },
      { label: 'Client Handoff Defect', value: '0%' }
    ]
  },
  {
    id: 'tripssecure-brand',
    title: 'Tripssecure Website Design',
    category: 'DESIGN',
    date: '05 // 2025',
    imageUrl: tripssecureWebsiteCover,
    description: 'Designed a high-impact travel ancillary website with responsive UI, brand identity system, and clear information architecture for the Asia, Africa, and Middle East market.',
    longDescription: 'Tripssecure Brand & Design System is built from the ground up to establish typography tokens, colour systems, interaction patterns, and style guides ensuring brand consistency across all web and mobile surfaces. It optimizes information architecture and site navigation, driving measurable improvements in engagement and session depth.',
    tags: ['UI/UX Design', 'Website Design', 'Information Architecture', 'Brand Identity', 'Travel Ancillary'],
    tech: ['Figma', 'Adobe Photoshop', 'React'],
    featured: true,
    badge: 'DESIGN SYSTEM',
    link: 'https://www.figma.com/proto/OryYKib7f2D4dWnQ0BXVlN/tripssecure-website?page-id=0%3A1&node-id=293-178&starting-point-node-id=293%3A178&t=SyBhwERguJpZ4YbH-1',
    stats: [
      { label: 'Typography Tokens', value: 'Global Scale' },
      { label: 'Interaction Patterns', value: '25+ custom UI' },
      { label: 'Responsive Surfaces', value: 'Web & Mobile' }
    ]
  },
  {
    id: 'web-blocker',
    title: 'CTRL+BLCK Web Extension',
    category: 'AI_CODE',
    date: '06 // 2026',
    imageUrl: ctrlBlckCover,
    description: 'Designed the CTRL+BLCK Chrome extension — a sleek, distraction-blocking productivity tool with Supabase-powered sync and a clean, focused UI.',
    longDescription: 'Designed and developed a highly optimized Chrome extension UI (HTML/CSS/JS + Supabase), demonstrating end-to-end ownership from concept and interaction design through front-end implementation. It provides a clean, user-centric dashboard to block distracting web domains and record focused sessions, keeping remote professionals productive.',
    tags: ['Chrome Extension', 'Productivity', 'Supabase Integration', 'UI Design', 'Front-End Handoff'],
    tech: ['Chrome Extension MV3', 'Next.js 16', 'React 19', 'TypeScript', 'Tailwind CSS 4', 'Supabase', 'JavaScript', 'HTML', 'CSS', 'Vercel', 'JSZip'],
    badge: 'PRODUCTIVITY',
    link: 'https://ctrl-blck.vercel.app/',
    stats: [
      { label: 'Extension UI Size', value: 'Lightweight' },
      { label: 'Backend Integration', value: 'Supabase Realtime' },
      { label: 'Concept to Ship', value: 'End-to-End' }
    ]
  },
  {
    id: 'sproutplus-mockup',
    title: 'SproutPlus App Mockup Design',
    category: 'DESIGN',
    date: '06 // 2026',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/408178250502839.6a208bb65174f.png',
    description: 'A conceptual mobile application design for frictionless surplus food redistribution, connecting donors with receivers to reduce waste and build community impact.',
    longDescription: 'SproutPlus is a purpose-driven app designed to rescue surplus food and build a hunger-free, sustainable future. The UI features onboarding choice screens for donors and receivers, impact tracking (CO₂ saved, meals provided), nearby hub discovery, and food category browsing — all wrapped in a green-themed, modern Poppins-typography interface that emphasizes sustainability and dignity.',
    tags: ['UI/UX Design', 'Mobile App', 'Food Rescue', 'Social Impact', 'Brand Identity'],
    tech: ['Figma'],
    featured: true,
    badge: 'UI/UX',
    link: 'https://www.behance.net/gallery/250502839/SproutPlus-App-Mockup-Design',
    stats: [
      { label: 'User Personas', value: 'Donor & Receiver' },
      { label: 'Key Screens', value: 'Onboarding & Home' },
      { label: 'Design Tool', value: 'ChatGPT 2.0' }
    ]
  },
  {
    id: 'safescan-mockup',
    title: 'SafeScan Mobile App Mockup Design',
    category: 'DESIGN',
    date: '06 // 2026',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/project_modules/1400/7c7cae250302877.6a1c630994f4d.png',
    description: 'An AI-powered food safety mobile application that scans ingredients to detect allergens, identify health risks, and recommend smarter food choices.',
    longDescription: 'SafeScan is an AI-powered food safety app that lets users scan any food item or ingredient list to detect hidden allergens, assess health risks, and get personalized smarter-swap recommendations. The design features a dashboard with weekly scan tracking, urgent risk alerts, smart product alternatives, and a barcode-free AI scanning mode — all built with a Mint & Orange color palette, Space Grotesk typography, and clear color-coded risk indicators (Safe, High Risk, Low Risk).',
    tags: ['UI/UX Design', 'Mobile App', 'Food Safety', 'AI Scanning', 'Allergen Detection'],
    tech: ['Figma'],
    featured: true,
    badge: 'UI/UX',
    link: 'https://www.behance.net/gallery/250302877/SafeScan-Mobile-App-Mockup-Design',
    stats: [
      { label: 'Risk Levels', value: 'Safe / High / Low' },
      { label: 'Allergen Coverage', value: '100+ types' },
      { label: 'Design Tool', value: 'ChatGPT 2.0' }
    ]
  },
  {
    id: 'jivika-branding',
    title: 'Jivika Branding & Design System',
    category: 'DESIGN',
    date: '06 // 2026',
    imageUrl: jivikaCover,
    description: 'A complete brand identity and design system for Jivika — a dual-sided job platform connecting India\'s blue-collar workforce with verified employers — spanning typography tokens, color system, app store assets, social campaigns, and YouTube channel banners.',
    longDescription: 'Jivika is a job-matching platform connecting blue-collar and skilled trade workers with verified employers across Chennai, India. I designed the end-to-end brand identity and design system — establishing the color palette (deep blue #2649C0 primary, cyan secondary, white neutral), Suncoast GROT typography system with four weight tiers (Regular, Medium, Semibold, Black), and a cohesive visual language. Deliverables span brand guidelines, Google Play Store screenshots (featuring multilingual support in English, Hindi & Tamil), Instagram promotional posts, a Myth-vs-Fact social carousel debunking job-search misconceptions, in-app referral and trust banners, YouTube channel banners for both job seekers ("Chennai\'s Trusted Job App") and employer partners ("Hire With Jivika"), and a launch announcement thumbnail. The system balances trust and approachability with a clean, modern, mobile-first aesthetic designed to resonate with India\'s multilingual, diverse workforce.',
    tags: ['Brand Identity', 'Design System', 'Typography System', 'Color Palette', 'Social Media Design', 'App Store Assets'],
    tech: ['Figma', 'Google Nano Banana', 'ChatGPT Images 2.0'],
    featured: true,
    badge: 'BRAND SYSTEM',
    link: 'https://www.behance.net/gallery/250906651/Jivika-Visual-Assests',
    stats: [
      { label: 'Brand Assets', value: '40+ deliverables' },
      { label: 'Language Support', value: 'EN / HI / TA' },
      { label: 'Platform Coverage', value: 'App, Social & Video' }
    ]
  }
];


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
