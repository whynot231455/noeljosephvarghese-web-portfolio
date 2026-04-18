# 🎨⌨️ Personal Portfolio Website

> A dual-identity portfolio for the creative and the coder — built with Next.js 16, Tailwind CSS, and Framer Motion.

---

## 📌 Overview

This portfolio showcases two distinct professional identities through a single, seamless experience:

- **Creative Mode** — UI/UX Design, Photo Editing, Video Editing
- **Developer Mode** — Software projects, apps, and engineering work

The centrepiece is an animated **Creative ↔ Developer toggle** on the Home Page that transforms the entire UI — palette, typography, layout, and feel — without a page reload.

---

## 🚀 Tech Stack

| Layer | Technology | Purpose |
|-------|------------|---------|
| Framework | Next.js 16 (App Router) | Routing, SSR/SSG, image optimisation |
| Language | TypeScript | Type safety across all components |
| Styling | Tailwind CSS | Utility-first, theme-aware styling |
| Animation | Framer Motion | Toggle morph & page transitions |
| UI Components | shadcn/ui + Lucide React | Accessible components & icons |
| Media | Cloudinary | Image hosting & upload for projects |
| Music | Spotify API | Fetch and display personal playlists |
| Forms | React Hook Form + Zod | Form state & validation |
| Email | Resend (free tier) | Contact email delivery |
| Deployment | Vercel | CI/CD, edge functions, analytics |

---

## 📁 Project Structure

```
web-portfolio/
├── app/
│   ├── page.tsx                  ← Home Page (toggle, hero, projects, skills, contact)
│   ├── layout.tsx
│   ├── globals.css
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── dev/
│   │   ├── layout.tsx            ← Dev admin layout
│   │   └── projects/
│   │       └── new/
│   │           └── page.tsx      ← Add / edit project (admin)
│   └── api/
│       ├── spotify/
│       │   └── playlists/
│       │       └── route.ts      ← Spotify playlists endpoint
│       └── dev/
│           ├── projects/
│           │   ├── route.ts      ← CRUD project data
│           │   └── [id]/
│           │       └── route.ts  ← Single project operations
│           └── upload/
│               └── route.ts      ← Image upload endpoint
│
├── components/
│   ├── home/
│   │   ├── CreativeHero.tsx
│   │   ├── DeveloperHero.tsx
│   │   ├── ModeToggle.tsx
│   │   ├── FluidShapes.tsx
│   │   └── Skills.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── ProjectGrid.tsx
│   ├── dev/
│   │   └── ProjectSidebar.tsx
│   ├── spotify/
│   │   └── SpotifyPlaylists.tsx
│   └── shared/
│       ├── Navbar.tsx
│       ├── MatrixBackground.tsx
│       ├── TerminalWindow.tsx
│       ├── SegmentedText.tsx
│       └── SegmentedCharacter.tsx
│
├── lib/
│   ├── ModeContext.tsx            ← Creative / Developer mode state
│   ├── projects.ts                ← Project schema & helpers
│   ├── auth.ts                    ← Dev API password auth
│   ├── utils.ts
│   └── character-map.ts
│
├── content/
│   └── projects.json              ← Project data
│
├── public/                        ← Static assets & uploaded project images
├── next.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 Pages

### `/` — Home Page
The single-page experience. Features a **dual-mode hero** controlled by an animated toggle:

| Property | Creative Mode | Developer Mode |
|----------|--------------|----------------|
| Background | `#FFFDF7` warm off-white | `#0D1117` near-black |
| Primary Accent | `#E8634A` coral | `#58A6FF` blue |
| Display Font | Playfair Display / Cormorant | JetBrains Mono / Space Mono |
| Layout Feel | Editorial, fluid, imagery-led | Terminal-style, grid-lines, code |
| CTA Label | "See My Creative Work" | "View My Projects" |

**Sections:**
- Hero with animated name & subtitle (switches between `CreativeHero` and `DeveloperHero`)
- Mode Toggle (sticky, persists to `localStorage`)
- Projects Grid (auto-filters by active mode)
- Skills Grid
- Spotify Playlists
- Contact section (inline — email link + social links)

---

### `/dev/projects/new` — Admin: Add / Edit Project
Password-protected admin UI for managing portfolio projects without touching code directly.

- Add a new project (title, category, summary, description, tags, cover image, URLs)
- Edit or delete existing projects via the sidebar
- Cover image upload via the `/api/dev/upload` endpoint
- Requires the `DEV_API_PASSWORD` environment variable

---

## 🎞️ Animation Spec

### Creative ↔ Developer Toggle
```
Trigger:   onClick toggle switch
Library:   Framer Motion AnimatePresence + layoutId
Duration:  Background  400ms ease-in-out
           Text swap   300ms
           Layout morph 500ms
Persist:   localStorage ('portfolio-mode')
```

### Page Transitions
```
Route change:  fade-out 150ms → fade-in 200ms
```

### Scroll Animations
```
Section entry:  translateY 24px → 0, opacity 0 → 1, 500ms
                staggered 80ms per child
Project cards:  scale 0.96 → 1 on hover + shadow elevation
Accessibility:  all animations disabled when prefers-reduced-motion
```

---

## 🗂️ Data Models

### Project
```typescript
interface Project {
  id: string;               // URL-safe slug
  title: string;
  category: 'dev' | 'software' | 'uiux' | 'photo' | 'video';
  summary: string;          // One-line description (max 240 chars)
  description: string;      // Full markdown body (max 4000 chars)
  coverImage: string;       // Path to uploaded asset (e.g. /projects/my-image.png)
  tags: string[];           // Tools / technologies (1–12 items)
  featured: boolean;        // Show on Home page grid
  publishedAt: string;      // YYYY-MM-DD
  repoUrl?: string;
  figmaUrl?: string;
  liveUrl?: string;
}
```

---

## ⚙️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/whynot231455/web-portfolio.git
cd web-portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in the required variables (see section below)

# 4. Run development server
npm run dev
# → http://localhost:3000
```

---

## 🔑 Environment Variables

```env
# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx

# Cloudinary (image uploads)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Spotify (playlists section)
SPOTIFY_CLIENT_ID=your_client_id
SPOTIFY_CLIENT_SECRET=your_client_secret
SPOTIFY_REFRESH_TOKEN=your_refresh_token
# Comma-separated list of playlist IDs or URLs to display (leave empty to show all)
SPOTIFY_ALLOWED_PLAYLIST_IDS=

# Dev Admin (protects /dev routes and /api/dev/* endpoints)
DEV_API_PASSWORD=your_dev_password
```

---

## 🚢 Deployment

This project is optimised for **Vercel**:

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

1. Connect your GitHub repo to Vercel
2. Add all environment variables in the Vercel dashboard
3. Add your custom domain under **Settings → Domains**
4. Automatic deploys trigger on every push to `main`

---

## 📋 Development Milestones

| Phase | Deliverables | Est. Time |
|-------|-------------|-----------|
| 1 — Setup | Repo, Next.js scaffold, Tailwind config, Vercel deploy | 1 day |
| 2 — Design Tokens | Theme files, CSS variables, fonts for both modes | 0.5 day |
| 3 — Shared Components | Navbar, ModeToggle, layout wrappers | 1 day |
| 4 — Home Page | CreativeHero, DeveloperHero, ModeToggle, ProjectGrid, Skills | 2 days |
| 5 — Spotify Section | Spotify API integration, playlist cards | 1 day |
| 6 — Contact Section | Inline contact section with email link | 0.5 day |
| 7 — Dev Admin | /dev/projects/new, project CRUD API, image upload | 1.5 days |
| 8 — Content | Projects data, copy, images via Cloudinary | 1 day |
| 9 — QA & Polish | Lighthouse audit, a11y review, cross-browser testing | 1 day |
| 10 — Launch | Custom domain, production deploy, analytics | 0.5 day |
| **Total** | | **~10 days** |

---

## ✅ Non-Functional Requirements

- **Performance** — Lighthouse score ≥ 90 across all categories
- **Accessibility** — WCAG 2.1 Level AA; keyboard navigable; ARIA labels throughout
- **SEO** — Meta/OG tags on every page; JSON-LD structured data; auto sitemap
- **Security** — All API keys in env vars; CSP headers; form rate limiting

---

## 🚫 Out of Scope (V1)

- Blog / article section
- Authentication / admin dashboard
- E-commerce or paid booking
- Multi-language (i18n) support
- Client portal or project tracking

---

## 📜 License

MIT — feel free to use this as a base for your own portfolio.

---

*Built with Next.js 16 · Deployed on Vercel · Designed for humans*