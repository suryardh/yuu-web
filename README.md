# Yuuishikii | Digital Experiences

A sleek, high-performance portfolio and experimental workspace built with Next.js App Router, TypeScript, and Tailwind CSS. Designed to deliver a cinematic, atmospheric "Night City" aesthetic with meticulously optimized Core Web Vitals.

## 🚀 Features

- **Cinematic Night Cityscape**: A deterministic, server-side rendered (SSR) animated skyline background. It uses a custom pseudo-random seed generator to guarantee zero Cumulative Layout Shift (CLS) and absolute hydration sync between Node and V8, ensuring perfectly matching windows and stars.
- **API Lab Workspace (`/lab`)**: A fully functional, glassmorphism-styled API testing playground built directly into the site. Features request/response JSON formatting and method switching—all running elegantly over the animated cityscape context without visual collision.
- **Extreme Performance**:
  - **Zero CLS**: Achieved via deterministic math generation of the background elements, entirely skipping client-side JS mounting delays.
  - **Optimal INP (Interaction to Next Paint)**: Targeted removal of universal CSS transitions guarantees instant, unblocked user interaction and smooth hovering.
  - **Lightning LCP**: Refactored major views into pure React Server Components for instantaneous text-rendering void of fade-in latency.
- **Pure Dark Mode**: A unified, elegant deep-dark aesthetic leveraging the **Geist** sans-serif font for professional legibility, complemented by subtle handwritten brand accents.

## 🛠️ Tech Stack

- **Core**: Next.js 15.5+ (App Router)
- **Typing**: TypeScript
- **Styling**: Tailwind CSS v4
- **Icons**: Lucide React
- **Deployment Target**: Cloudflare Pages (Configured for static `output: "export"`)

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

Open [http://localhost:3000](http://localhost:3000) with your browser to explore the experience.

## 🏗️ Project Architecture

```text
src/
├── app/
│   ├── (public)/          # Marketing / Public facing routes: Home, About, Portfolio
│   ├── lab/               # The API Workspace Experimental Playground
│   ├── globals.css        # Global styles and tailwind directives
│   └── layout.tsx         # Root HTML layout and Theme wrappers
├── components/
│   ├── ui/                # Core design features (CityBackground, Code blocks)
│   └── shared/            # Reusable UI parts (Navbar, Global Navigation)
└── lib/                   # Utility scripts and helpers
```

## 🌐 Building for Production

This project is tailored strictly for Static Site Generation (SSG) to achieve maximum edge-cache reliability.

```bash
# Export static files
npm run build
```

The resulting optimized static bundle will be located inside the `out/` directory.

## ☁️ Deployment (Cloudflare Pages)

1. Push your repository to GitHub.
2. Link the repository to your Cloudflare Pages dashboard.
3. **Build Command**: `npm run build`
4. **Build Output Directory**: `out`

## 📄 License

MIT License. Designed and engineered for high aesthetic fidelity.
