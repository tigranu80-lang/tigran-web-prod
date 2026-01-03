# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**EsperaStudio** is a React + TypeScript single-page application for an agency automation infrastructure platform. Built with Vite, styled with Tailwind CSS (Neubrutalism aesthetic), and integrated with Google Gemini AI for an interactive chat consultant. Deployed on Vercel with serverless API functions.

**Context:** EsperaStudio | High-end Neubrutalism UI  
**Role:** Senior Full-Stack Architect & Framer Motion Expert

---

## Working Directory

All project files are in the repository root (`tigran-web-prod/`) — no subdirectory navigation needed.

---

## Development Commands

```bash
npm install              # Install dependencies
npm run dev              # Dev server at http://localhost:3000
npm run build            # Production build
npm run preview          # Preview production build
npm test                 # Unit tests (Vitest)
npm run test:ui          # Vitest UI
npm run test:coverage    # Test coverage report
npm run test:e2e         # E2E tests (Playwright)
npm run test:e2e:ui      # Playwright UI
npm run build:analyze    # Bundle analyzer
```

---

## Environment Setup

Create `.env.local` in the project root:
- `GEMINI_API_KEY` — Google Gemini API key for AI consultant
- `RESEND_API_KEY` — Resend API key for contact form emails
- `CONTACT_EMAIL` — Destination email for contact form

---

## Code Style & Architecture

### Implementation Protocol (Think First)

1. **Chain of Thought:** Before ANY code change, provide a brief "Reasoning Block"
   - Explain why this approach was chosen
   - Analyze impact on overall architecture
2. **Plan Verification:** For complex refactors, list all files to be modified/deleted before execution

### Naming & Exports

```typescript
// ❌ BAD
export default function Component() {}

// ✅ GOOD
export function Component() {}
```

**Always use Named Exports only.**

### File Size Limits

**Strict 200-line limit per file.** If exceeded, decompose immediately:
- `[Component]Container.tsx` — Logic/State
- `[Component]View.tsx` — JSX/Render
- `[Component]Utils.ts` — Helpers/Types

### TypeScript

- **Strict mode:** No `any` types
- Use explicit interfaces for all component props and animation variants
- See `tsconfig.json` for full configuration

### Directory Structure

```
./  (tigran-web-prod)
├── src/
│   ├── App.tsx              - Main app with React Router
│   ├── index.tsx            - Entry point
│   ├── pages/               - Top-level route pages
│   ├── features/            - Feature-based modules
│   │   ├── hero/            - Hero section (HeroNew, GlobeSection, TechTicker, AIConsultant)
│   │   ├── services/        - Services with interactive diagrams
│   │   │   ├── components/  - Blueprint modals/cards
│   │   │   ├── diagrams/    - SVG-based architecture diagrams
│   │   │   ├── constants/   - Data files
│   │   │   └── hooks/       - Custom hooks
│   │   ├── layout/          - Header, Footer, Background
│   │   ├── pricing/         - Pricing section
│   │   ├── contact/         - Contact form
│   │   ├── team/            - Team/About section
│   │   └── ui/              - Shared UI (FadeIn, DecryptedText) [Legacy: migrate to @/components/ui]
│   ├── services/            - External services (geminiService.ts)
│   ├── components/          - Global components (ErrorBoundary)
│   │   └── ui/              - Standard shared primitives (Buttons, Inputs)
│   ├── config/theme.ts      - Design tokens (must sync with CSS vars)
│   └── types.ts             - Shared TypeScript types
├── api/contact.ts           - Vercel serverless function
├── e2e/                     - Playwright E2E tests
└── public/                  - Static assets
```

**Path alias:** `@/` resolves to project root

---

## Styling & Neubrutalism

### Technology Stack

- **Tailwind CSS only** — No external `.css` files (except global entry), No CSS Modules
- Use `tailwind-merge` and `clsx` for dynamic classes

### Design Tokens

> ❌ **NEVER use raw hex codes** (e.g., `#F5F5F0`) directly in JSX props or inline styles  
> ✅ Use Tailwind classes (`bg-brand-bg`) or CSS variables (`var(--color-brand-bg)`)

| Token | Hex | Usage |
|-------|-----|-------|
| `brand-bg` | #F5F5F0 | Background (alabaster) |
| `brand-text` | #0A0A0A | Borders/Text (ink-950) |
| `brand-accent` | #ea580c | Accent (orange-600) |

**Hard Shadow:** `shadow-[4px_4px_0px_0px_#0A0A0A]`

**Critical:** Colors defined in TWO places (must stay in sync):
1. `src/config/theme.ts` — For JavaScript/Framer Motion
2. CSS variables in `src/index.css` — For Tailwind/HTML

### Typography Triad

| Type | Font | Example |
|------|------|---------|
| Headlines | `font-serif` | "From leaks to stable systems" |
| Labels/Buttons/Tech | `font-mono` | "SYS.01", "CONFIGURE" |
| Body/Text | `font-sans` | Clean readability |

### UI Primitives (Buttons)

```tsx
// Standard Neubrutalist button
className="rounded-none uppercase tracking-widest font-mono text-xs 
           hover:translate-x-[2px] hover:translate-y-[2px]"
```

### Section Layout Pattern

```tsx
// Every major section
<section className="border-t border-[#0A0A0A]">
  <div className="container mx-auto px-6 max-w-7xl">
    {/* Floating label on top border */}
    <div className="bg-[#0A0A0A] text-white">
      <div className="w-2 h-2 bg-orange-600" />
      SYS.XX /// SECTION_NAME
    </div>
    {/* Content */}
  </div>
</section>
```

**Desktop Decorators:** Vertical dashed lines (`border-l/r border-dashed`) + corner details

---

## Animation Guidelines

### Framer Motion

```typescript
// ⚠️ CRITICAL: Import strictly from 'framer-motion'
import { motion, useScroll, useTransform } from 'framer-motion';

// ❌ DO NOT import from 'motion/react' (project version constraint)
```

### Patterns

- Use `useScroll`, `useTransform`, `useSpring` for scroll-linked animations
- Avoid `useEffect` for animation triggers unless absolutely necessary
- Apply `MotionValue` directly to `style` prop for GPU acceleration

### SVG Diagrams

```tsx
// ✅ Use motion.g for interactive SVG elements
<motion.g animate={{ opacity: 1 }}>
  <rect />
</motion.g>

// ❌ Don't use div inside SVG
```

### Icons

- Library: `lucide-react`
- Style: `strokeWidth={1}` or `1.5` for technical elegance

---

## Prohibited List ("The Burn List")

### Forbidden Packages
- ❌ `reactflow`
- ❌ `dagre`
- ❌ `react-script`

### Legacy Code Rules
- No commented-out code blocks
- No "ghost" files (orphaned/unused) — if not imported, delete it

---

## Testing Infrastructure

### Unit Testing (Vitest + React Testing Library)

- Config: `vitest.config.ts` and `vitest.setup.ts`
- Tests co-located with source: `.test.tsx` / `.test.ts`
- Globals enabled (describe, it, expect without imports)
- jsdom environment for DOM testing

### E2E Testing (Playwright)

- Config: `playwright.config.ts`
- Tests in `e2e/` directory
- Dev server auto-starts before tests

**Known Issues:**
- Use `domcontentloaded` instead of `networkidle` (analytics blocks idle state)
- Use extended timeouts (15s) for React hydration

---

## Performance Optimization

### Code Splitting

All routes lazy-loaded via `React.lazy()`. Vendor chunks:
- `react-vendor` — React core
- `framer-motion` — Animation library
- `ui-vendor` — lucide-react, clsx, tailwind-merge
- `external-services` — @google/genai, @vercel/analytics

### Build Optimization

- Terser minification (removes console/debugger in production)
- Target: ES2020
- Chunk size warning: 600KB threshold

---

## Key Integrations

### AI Consultant

- Component: `src/features/hero/AIConsultant.tsx`
- Service: `src/services/geminiService.ts`
- Model: `gemini-2.5-flash`
- Personality: Retro-futuristic "AutoBot" (2007-2010 tech optimism)
- Response limit: 100 words

### Contact Form

- Component: `src/features/contact/Contact.tsx`
- API: `/api/contact` (Vercel serverless)
- Email: Resend API
- Redirect: `/thank-you` on success

---

## Common Tasks

### Adding a new page
1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Update navigation in `src/features/layout/Header.tsx`

### Adding a new feature section
1. Create directory in `src/features/[feature-name]/`
2. Add main component
3. Import and compose in `src/pages/Home.tsx`

### Modifying AI behavior
Edit `SYSTEM_INSTRUCTION` in `src/services/geminiService.ts`

### Updating design tokens
1. Update `src/config/theme.ts`
2. Update matching CSS variables in `src/index.css`
3. Update Tailwind config if adding new utility classes

### Writing tests
1. Unit: Create `.test.tsx` next to component
2. E2E: Add `.spec.ts` to `e2e/` directory

---

## Deployment

Configured for **Vercel**:
- `vercel.json` routes API requests to serverless functions
- Build: `npm run build` → outputs to `dist/`
- API functions in `api/` use Vercel Node runtime
- Set environment variables in Vercel dashboard
