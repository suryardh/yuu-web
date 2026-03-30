# Yuuishikii | Digital Experiences

A high-performance atmospheric portfolio website built with Next.js 15 App Router, React 19, TypeScript, and Tailwind CSS v4. Features a cinematic **Night City** pixel skyline background with meticulously optimized Core Web Vitals (zero CLS, minimal INP, fast LCP). Deployed as a static site on Cloudflare Pages.

---

## ✨ Features

- **Cinematic Night City Background** — Deterministic server-side rendered pixel skyline. Uses a seed-based `pseudoRandom()` generator (no `Math.random()`) so the building windows and floating stars are always 100% in sync between Node.js (SSR) and the browser (hydration). Zero CLS, zero hydration mismatch.
- **Floating Star Layer** — Animated twinkling stars in the sky layer above the buildings, fully deterministic.
- **Global Glassmorphism Navbar** — Sticky navigation bar with backdrop blur, present on all pages.
- **API Lab Workspace (`/lab`)** — In-browser API testing playground with method selector, URL input, JSON body editor, and response viewer — all styled with glassmorphism on top of the Night City background.
- **Pure Dark Mode** — Hardcoded `dark` class on `<html>`, no theme-switching overhead.
- **Optimized Core Web Vitals**:
  - ✅ **CLS = 0** — Deterministic generation, no client-mount shifts
  - ✅ **INP optimized** — Removed universal `* { transition }` wildcard
  - ✅ **LCP optimized** — Homepage is a pure Server Component, no animation delay on hero text
- **Static Export** — Built with `output: "export"` for edge deployment.

---

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js `^15.5.12` (App Router) |
| UI Library | React `19.2.3` |
| Language | TypeScript `^5` |
| Styling | Tailwind CSS `^4` |
| Fonts | Geist Sans & Geist Mono (via `next/font/google`) |
| Linting | ESLint `^9` + `eslint-config-next` |
| Deployment | Cloudflare Pages (static export) |

> **Note**: No `lucide-react` or external icon library is declared in `package.json`. Icons are implemented inline via Tailwind utilities.

---

## 📦 Getting Started

```bash
# Clone the repository
git clone https://github.com/suryardh/yuu-web.git
cd yuu-web

# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🏗️ Project Structure

```text
yuu-web/
├── src/
│   ├── app/
│   │   ├── (public)/              # Public-facing route group
│   │   │   ├── layout.tsx         # Layout wrapper for public pages
│   │   │   ├── page.tsx           # Home page (Server Component)
│   │   │   ├── about/
│   │   │   │   └── page.tsx       # About page
│   │   │   └── portfolio/
│   │   │       └── page.tsx       # Portfolio page
│   │   ├── lab/
│   │   │   └── page.tsx           # API Lab Workspace (Client Component)
│   │   ├── globals.css            # Global styles & Tailwind directives
│   │   └── layout.tsx             # Root layout (Navbar + CityBackground + HUD overlays)
│   ├── components/
│   │   ├── ThemeProvider.tsx      # Theme context provider
│   │   ├── ui/
│   │   │   ├── Button.tsx         # Reusable Button component
│   │   │   ├── Card.tsx           # Reusable Card component
│   │   │   ├── CityBackground.tsx # Deterministic animated pixel cityscape (SSR)
│   │   │   ├── Navbar.tsx         # Global sticky navigation bar
│   │   │   └── ThemeToggle.tsx    # Theme toggle button
│   │   └── shared/
│   │       ├── Footer.tsx         # Site footer
│   │       └── Navbar.tsx         # Alternate/shared navbar variant
│   └── hooks/
│       └── useDarkMode.ts         # Custom dark mode hook
├── next.config.ts                 # Next.js config (output: "export", trailingSlash, unoptimized images)
├── tailwind.config.ts             # Tailwind CSS configuration
├── postcss.config.mjs             # PostCSS config
├── tsconfig.json                  # TypeScript config
├── eslint.config.mjs              # ESLint config
├── wrangler.jsonc                 # Cloudflare Wrangler config
└── package.json
```

---

## 🔑 Key Technical Decisions

### Deterministic SSR for CityBackground
The `CityBackground` component generates its buildings, windows, and stars using a custom `pseudoRandom(seed)` function based on `Math.sin()` — not `Math.random()`. This guarantees that the *exact same* HTML is generated on the server (Node.js) and during client hydration (V8/Chrome), eliminating React hydration warnings and achieving **CLS = 0**.

```ts
const pseudoRandom = (seed: number) => {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
};
```

Star positions are also clamped to 2 decimal places with `.toFixed(2)` to prevent floating-point divergence between Node and V8.

### No Wildcard CSS Transitions
The previous `* { transition: all 0.3s }` in `globals.css` was causing severe **INP degradation** (1700ms+). It has been removed. Transitions are now applied per-component only where needed.

### Pure Server Component for LCP
The `HomePage` (`page.tsx`) is a pure Server Component with no `"use client"` directive. This allows Next.js to stream the hero heading instantly, achieving optimal **LCP** without waiting for any client-side JS.

---

## 🌐 Building for Production

```bash
npm run build
```

Output is generated in the `out/` directory as a fully static site (HTML, CSS, JS) — no server required.

---

## ☁️ Deployment (Cloudflare Pages)

1. Push the repository to GitHub.
2. Connect the repo to [Cloudflare Pages](https://pages.cloudflare.com/).
3. Set **Build Command**: `npm run build`
4. Set **Build Output Directory**: `out`

Cloudflare Pages serves the static `out/` directory from its global edge network.

---

## 📄 License

MIT License. Designed and engineered for high aesthetic fidelity.
