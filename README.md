# 🎨⌨️ Personal Portfolio Website

> A dual-identity portfolio for the creative and the coder — built with Next.js 14, Tailwind CSS, and Framer Motion.

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
| Framework | Next.js 14 (App Router) | Routing, SSR/SSG, image optimisation |
| Language | TypeScript | Type safety across all components |
| Styling | Tailwind CSS | Utility-first, theme-aware styling |
| Animation | Framer Motion | Toggle morph & page transitions |
| UI Components | shadcn/ui + Lucide React | Accessible components & icons |
| Media | Cloudinary (free tier) | Image & video hosting |
| Video | React Player | Render video editing showreels |
| Forms | React Hook Form + Zod | Form state & validation |
| Email | Resend (free tier) | Contact form email delivery |
| CMS (optional) | Notion API or Sanity.io | Edit projects without code changes |
| Deployment | Vercel | CI/CD, edge functions, analytics |

---

## 📁 Project Structure

```
portfolio/
├── app/
│   ├── page.tsx                  ← Home Page (toggle lives here)
│   ├── about/
│   │   └── page.tsx
│   ├── projects/
│   │   ├── page.tsx              ← Projects grid
│   │   └── [slug]/
│   │       └── page.tsx          ← Project detail
│   └── contact/
│       └── page.tsx
│
├── components/
│   ├── home/
│   │   ├── CreativeHero.tsx
│   │   ├── DeveloperHero.tsx
│   │   ├── ModeToggle.tsx
│   │   └── ExperienceTimeline.tsx
│   ├── projects/
│   │   ├── ProjectCard.tsx
│   │   └── FilterBar.tsx
│   ├── about/
│   │   └── SkillGrid.tsx
│   ├── contact/
│   │   └── ContactForm.tsx
│   └── shared/
│       ├── Navbar.tsx
│       └── Footer.tsx
│
├── lib/
│   ├── utils.ts
│   └── api.ts                    ← Notion/Sanity helpers (optional)
│
├── content/
│   ├── projects.json             ← Project data
│   └── experience.json           ← Work experience data
│
├── public/                       ← Static assets
├── styles/
│   └── globals.css
├── next.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## 📄 Pages

### `/` — Home Page
The flagship page. Features a **dual-mode hero** controlled by an animated toggle:

| Property | Creative Mode | Developer Mode |
|----------|--------------|----------------|
| Background | `#FFFDF7` warm off-white | `#0D1117` near-black |
| Primary Accent | `#E8634A` coral | `#58A6FF` blue |
| Display Font | Playfair Display / Cormorant | JetBrains Mono / Space Mono |
| Layout Feel | Editorial, fluid, imagery-led | Terminal-style, grid-lines, code |
| CTA Label | "See My Creative Work" | "View My Projects" |

**Sections (both modes):**
- Hero with animated name & subtitle
- Mode Toggle (sticky, persists to `localStorage`)
- About Snapshot (2–3 sentences + link)
- Work Experience Timeline
- Featured Projects Strip (auto-filters by active mode)
- Skills Grid
- Footer

---

### `/about` — About Me
- Full bio (3–4 paragraphs)
- Two-column skills: **Creative Tools** | **Dev Tools**
- Detailed experience timeline with roles, dates, and bullet points
- Education & certifications block
- Downloadable resume (PDF, opens new tab)

---

### `/projects` — Projects
- Filter Bar: **All | Creative | Developer**
- Masonry / CSS Grid responsive layout
- Each card: cover image/video, title, category badge, tech tags, CTA link

**Project Detail** `/projects/[slug]`:
- Hero image/video
- Full description + process notes + outcomes
- Tools used
- Prev / Next project navigation

---

### `/contact` — Contact
- Social links row (LinkedIn, GitHub, Dribbble, Instagram, Email)
- Collaboration form with fields:
  - Name (required)
  - Email (required, validated)
  - Subject (dropdown: UI/UX | Photo | Video | Dev | Other)
  - Message (required, min 20 chars)
  - Budget range (optional)
- Submit via Next.js Server Action → Resend email
- Toast notification on success/error
- Spam protection: honeypot field + rate limiting (3 per IP/hour)

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
  category: 'uiux' | 'photo' | 'video' | 'dev';
  summary: string;          // One-line description
  description: string;      // Full markdown body
  coverImage: string;       // Cloudinary URL
  tags: string[];           // Tools / technologies
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;       // Show on Home page strip
  publishedAt: string;      // YYYY-MM-DD
}
```

### Work Experience
```typescript
interface Experience {
  company: string;
  role: string;
  startDate: string;        // YYYY-MM
  endDate: string;          // YYYY-MM or 'Present'
  description: string[];    // Bullet points
  type: 'creative' | 'dev' | 'both';
}
```

---

## ⚙️ Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/portfolio.git
cd portfolio

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env.local
# Fill in: RESEND_API_KEY, CLOUDINARY_URL, NOTION_SECRET (optional)

# 4. Run development server
npm run dev
# → http://localhost:3000
```

---

## 🔑 Environment Variables

```env
# Email (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxx
RESEND_FROM_EMAIL=hello@yourdomain.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# CMS — Notion (optional)
NOTION_SECRET=secret_xxxxxxxxxx
NOTION_PROJECTS_DB_ID=xxxxxxxxxx
NOTION_EXPERIENCE_DB_ID=xxxxxxxxxx

# CMS — Sanity (optional alternative)
NEXT_PUBLIC_SANITY_PROJECT_ID=xxxxxxxxxx
NEXT_PUBLIC_SANITY_DATASET=production
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
| 3 — Shared Components | Navbar, Footer, ProjectCard, layout wrappers | 1 day |
| 4 — Home Page | CreativeHero, DeveloperHero, ModeToggle, timeline | 2 days |
| 5 — About Page | Bio, skills grid, timeline, resume download | 1 day |
| 6 — Projects Page | Grid, FilterBar, [slug] detail page | 1.5 days |
| 7 — Contact Page | Form, validation, Resend integration | 1 day |
| 8 — Content | Projects data, copy, images via Cloudinary | 1 day |
| 9 — QA & Polish | Lighthouse audit, a11y review, cross-browser testing | 1 day |
| 10 — Launch | Custom domain, production deploy, analytics | 0.5 day |
| **Total** | | **~11 days** |

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

*Built with Next.js 14 · Deployed on Vercel · Designed for humans*