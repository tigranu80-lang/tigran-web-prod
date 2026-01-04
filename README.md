# EsperaStudio

**Agency Automation Infrastructure Platform**

A modern React + TypeScript single-page application featuring a Neubrutalist design aesthetic, interactive architecture diagrams, and AI-powered consultation via Google Gemini.

## Tech Stack

- **Frontend:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS (Neubrutalism aesthetic)
- **Animation:** Framer Motion
- **AI Integration:** Google Gemini 2.5 Flash
- **Deployment:** Vercel
- **Testing:** Vitest + Playwright

## Quick Start

```bash
# Install dependencies
npm install

# Set environment variables
cp .env.example .env.local
# Add your GEMINI_API_KEY and RESEND_API_KEY

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run unit tests |
| `npm run test:e2e` | Run E2E tests |

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Google Gemini API key |
| `RESEND_API_KEY` | Resend email API key |
| `CONTACT_EMAIL` | Contact form recipient |

## Project Structure

```
src/
├── features/       # Feature-based modules
│   ├── hero/       # Hero section + AI Consultant
│   ├── services/   # Core Functions, Use Cases, Blueprints
│   ├── pricing/    # Pricing section
│   ├── contact/    # Contact form
│   └── layout/     # Header, Footer, Background
├── pages/          # Route pages
├── components/     # Shared components
└── utils/          # Utilities
```

## License

Private — All rights reserved.
