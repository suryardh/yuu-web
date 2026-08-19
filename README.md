# Yuuishikii

Personal website and developer lab. Built with Next.js 15, deployed as a static site on Cloudflare Pages.

**Live:** [yuuishikii.eu.org](https://yuuishikii.eu.org)

---

## Features

- **Monochrome theme** — Black and white aesthetic with a deterministic pixel cityscape background
- **Lab** — Collection of client-side developer tools:
  - **Chess** — Play against Stockfish 18 (WASM, ELO 800–3190) with eval bar
  - **Markdown Editor** — Live preview with syntax highlighting
  - **Regex Tester** — Test and debug regular expressions
  - **Pomodoro Timer** — Focus timer with session tracking
  - **Word Counter** — Character, word, and line statistics
  - **Diff Tool** — Side-by-side text comparison
- **Static export** — Zero server, runs entirely on Cloudflare's edge network

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | Next.js 15 (App Router) |
| UI | React 19, TypeScript |
| Styling | Tailwind CSS v4 |
| Fonts | Geist Sans & Mono |
| Chess Engine | Stockfish 18 (WASM, single-threaded) |
| Deployment | Cloudflare Pages |

---

## Getting Started

```bash
git clone https://github.com/suryardh/yuu-web.git
cd yuu-web
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```text
src/
├── app/
│   ├── (public)/
│   │   ├── page.tsx           # Home
│   │   ├── about/page.tsx     # About
│   │   └── portfolio/page.tsx # Portfolio
│   ├── lab/
│   │   ├── page.tsx           # Lab hub
│   │   ├── chess/page.tsx     # Chess + Stockfish
│   │   ├── markdown-editor/
│   │   ├── regex-tester/
│   │   ├── pomodoro/
│   │   ├── word-counter/
│   │   └── diff/
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── shared/                # Navbar, Footer
│   └── ui/                    # Button, Card, CityBackground, Progress
public/
├── stockfish-18-lite-single.js
└── stockfish-18-lite-single.wasm
```

---

## Build & Deploy

```bash
npm run build
```

Output goes to `out/`. Connected to Cloudflare Pages via GitHub integration — push to `master` triggers auto-deploy.

---

## License

MIT
