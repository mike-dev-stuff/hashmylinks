# HashMyLinks

Like Linktree, but actually free. No accounts, no servers, no limits.

HashMyLinks is a serverless link-in-bio tool built with Next.js. Create a personalized profile page with your links, customize the look, and share it with a single URL — no backend or database required.

## How It Works

All profile data is encoded directly into the URL hash using Base64. When someone opens your link, the app decodes the hash and renders your profile entirely client-side. No sign-ups, no storage, no servers.

Since encoded URLs can get long, we recommend pairing with a free URL shortener like Bitly or TinyURL.

## Features

- **Profile** — Name, bio, and avatar with customizable shapes (circle, rounded, square)
- **Links** — Add unlimited links, each with its own title, URL, and optional background
- **Themes** — Per-element color and font customization via Google Fonts
- **Backgrounds** — Preset images or custom colors for both the page and individual link buttons
- **Image Upload** — Upload profile pictures and backgrounds via ImgBB
- **Live Preview** — See changes in real-time as you edit
- **One-Click Share** — Generate and copy your shareable link instantly

## Tech Stack

- [Next.js](https://nextjs.org) 15 with React 19 and Turbopack
- [Tailwind CSS](https://tailwindcss.com) + [Radix UI](https://www.radix-ui.com) / shadcn/ui
- [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) for validation
- [ImgBB](https://imgbb.com) for image hosting

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env
# Add your ImgBB API key (free at https://api.imgbb.com/)

# Run development server
npm run dev
```

The app runs at [http://localhost:9002](http://localhost:9002).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server with Turbopack |
| `npm run build` | Production build |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Type-check with TypeScript |
