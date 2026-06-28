<div align="center">
  <img width="1200" height="auto" alt="Noel Joseph Varghese Portfolio" src="https://noeljosephvarghese.vercel.app/og-image.png" style="border: 4px solid #131b2e; border-radius: 0;" />
</div>

<h1 align="center">🎨 Noel Joseph Varghese — Portfolio</h1>

<p align="center">
  <strong>AI Engineer × Visual Designer × Content Creator</strong>
  <br />
  <a href="https://noeljosephvarghese.vercel.app">🌐 Live Site</a> &nbsp;·&nbsp;
  <a href="mailto:noeljosephvarghese@gmail.com">✉️ Email</a> &nbsp;·&nbsp;
  <a href="https://linkedin.com/in/noel-joseph-varghese-576507273">💼 LinkedIn</a> &nbsp;·&nbsp;
  <a href="https://github.com/whynot231455">🐙 GitHub</a>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white" />
  <img alt="TypeScript" src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=flat-square&logo=typescript&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white" />
  <img alt="Tailwind CSS" src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" />
  <img alt="Express" src="https://img.shields.io/badge/Express-4-000000?style=flat-square&logo=express&logoColor=white" />
</p>

---

## 📖 Overview

A brutalist, zine-inspired personal portfolio showcasing the dual-discipline work of **Noel Joseph Varghese** — an AI Engineer & Visual Designer based in Sharjah, UAE. The site blends high-energy typography, motion design, and structured data visualization to present projects, skills, certifications, and a full interactive resume.

**Live URL:** [`https://noeljosephvarghese.vercel.app`](https://noeljosephvarghese.vercel.app)

---

## ✨ Features

- **4-View Navigation** — About, Gallery (projects), Studio, Tools & Skills
- **Interactive Resume Drawer** — Tabs for Profile, Experience, Projects, Skills, Content/Certifications
- **Animated Transitions** — Smooth view switching using Motion (Framer Motion)
- **Brutalist Design System** — Bold typography, dashed borders, monospace accents, yellow/red/blue palette
- **Live Social Stats** — Auto-refreshing YouTube subscriber & Instagram follower counts (via server-side scraping)
- **6 Featured Projects** — With badges, tech stacks, KPI stats, and live demo links
- **8 Skill Domains** — Content & Creative, AI/ML Engineering, Data & Analytics, Product Delivery, Design & UX, Visual Production, Front-End, Tools & Platforms
- **PDF Resume Download** — One-click download of latest CV
- **VHS + Halftone Overlays** — Subtle retro screen effects for visual flavor

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Framework** | React 19 (with Hooks & Motion) |
| **Language** | TypeScript 5.8 |
| **Bundler** | Vite 6 |
| **Styling** | Tailwind CSS 4 |
| **Animation** | Motion (Framer Motion) |
| **Icons** | Lucide React |
| **Backend** | Express 4 (Node.js) |
| **Rendering** | SSR via Vite middleware (dev) / static SPA (prod) |
| **Deployment** | Vercel (frontend) |
| **Scraping** | Native fetch for YouTube / Instagram counts |

---

## 🗂️ Project Structure

```
src/
├── App.tsx                     # Main app shell + navigation + resume drawer
├── data.ts                     # Projects, skills, and content data
├── types.ts                    # TypeScript type definitions
├── assets/
│   ├── documents/              # Resume PDF
│   └── images/                 # Project cover images
└── components/
    ├── Navigation.tsx          # Sidebar navigation
    └── views/
        ├── AboutView.tsx       # Personal intro + social proof
        ├── GalleryView.tsx     # Project cards grid
        ├── StudioView.tsx      # Social links & contact hub
        └── ToolsSkillsView.tsx # Skills & tools categorized
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Gemini API key

### Local Development

```bash
# 1. Install dependencies
npm install

# 2. Set your Gemini API key
cp .env.example .env.local
# Edit .env.local and add your key

# 3. Start dev server (Vite + Express middleware)
npm run dev
# → http://localhost:3000

# 4. Production build
npm run build

# 5. Preview production build
npm start
```
## 📦 Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with hot reload |
| `npm run build` | Production build (Vite + Express server bundle) |
| `npm start` | Run production build |
| `npm run preview` | Preview Vite build |
| `npm run lint` | TypeScript type-checking |
| `npm run clean` | Remove dist and temp files |

---

## 🧩 Featured Projects

| Project | Category | Badge |
|---|---|---|
| [Automotive ERP System](https://sol-garage-erp.vercel.app/) | AI/Code | ERP SYSTEM |
| [MMM Analytics Dashboard](https://mmm-sol-dashboard.vercel.app/) | AI/Code | ANALYTICS |
| [Tripssecure Design System](https://www.figma.com/proto/OryYKib7f2D4dWnQ0BXVlN/) | Design | DESIGN SYSTEM |
| [Web-Blocker Chrome Extension](https://ctrl-blck.vercel.app/) | Design | PRODUCTIVITY |
| [SproutPlus App Mockup](https://www.behance.net/gallery/250502839/) | Design | UI/UX |
| [SafeScan Mobile App](https://www.behance.net/gallery/250302877/) | Design | UI/UX |

---

## 🧠 Skill Domains

1. **Content & Creative** — Content strategy, audience growth, video production
2. **AI & ML Engineering** — Generative AI, LangGraph, RAG, predictive analytics
3. **Data & Analytics** — SQL, Python, Power BI, KPI design
4. **Product Delivery** — Agile, BRD/FRD, stakeholder management
5. **Design & UX** — Figma (expert), design systems, prototyping
6. **Visual Production** — Photoshop, CapCut, Midjourney, brand collateral
7. **Front-End** — React, TypeScript, Tailwind, Chrome extensions
8. **Tools & Platforms** — Git, Supabase, Canva, Codex, Hermes CLI

---

## 📄 License

MIT © 2026 Noel Joseph Varghese

---

<p align="center">
  <sub>Built with ☕ and a borderline unhealthy obsession with brutalist typography.</sub>
  <br />
  <sub>VIT Chennai · AI & Robotics '26</sub>
</p>
