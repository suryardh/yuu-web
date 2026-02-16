# Yuuishikii

A cinematic, atmospheric portfolio website built with Next.js App Router, TypeScript, and Tailwind CSS. Designed for static deployment on Cloudflare Pages.

## Features

- Dark/Light mode with smooth transitions
- Responsive design with hamburger menu on mobile
- Cinematic skyline background
- Clean, scalable architecture
- Static export ready for Cloudflare Pages

## Tech Stack

- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS v4
- Cloudflare Pages (deployment target)

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view.

## Project Structure

```
src/
├── app/
│   ├── (public)/      # Public routes
│   │   ├── page.tsx   # Landing page
│   │   ├── about/
│   │   └── portfolio/
│   ├── lab/           # Experimental page
│   └── layout.tsx    # Root layout
├── components/
│   ├── ui/           # Design system components
│   └── shared/       # Navbar, Footer
├── hooks/            # Custom hooks (useDarkMode)
└── globals.css       # Global styles
```

## Building for Production

```bash
# Build static files
npm run build
```

Output will be in the `out/` directory, ready for deployment to Cloudflare Pages.

## Deployment to Cloudflare Pages

1. Push to GitHub
2. Connect repo to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `out`

## License

MIT
