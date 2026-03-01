# VOLTERA — 10 Years of Powering the Future

An animation-heavy, single-page anniversary website celebrating **VOLTERA Energy's** 10th year milestone (2016–2026). Built with Next.js 16, Framer Motion, and GSAP.

**Live Demo:** [https://regionals-module-d-2.vercel.app/](https://regionals-module-d-2.vercel.app/)

---

## Tech Stack

| Layer       | Technology                          |
| ----------- | ----------------------------------- |
| Framework   | Next.js 16 (App Router, Turbopack) |
| Language    | TypeScript                          |
| Styling     | Tailwind CSS v4                     |
| Animations  | Framer Motion, GSAP + ScrollTrigger |
| Font        | Geist Sans & Geist Mono (next/font) |
| Deployment  | Vercel                              |

## Features

- **Cinematic Hero** — GSAP-driven entrance timeline with animated counter (0 → 10), staggered text reveal, floating particles, and energy ring effects.
- **Interactive Timeline** — Scroll-driven 11-milestone journey from 2016 to 2026 with a GSAP ScrollTrigger vertical line that draws as you scroll, and cards that slide in from alternating sides.
- **Product Showcase** — 6 product cards with real-time 3D perspective tilt on mouse movement, staggered scroll reveals, and gradient glow borders.
- **Animated Stats** — GSAP-powered number counters (10M+, 50+, 10K+, 99.9%) triggered on scroll into view.
- **Testimonial Carousel** — AnimatePresence-driven transitions with staggered star rating reveals.
- **Sustainability Section** — Parallax background via `useScroll`/`useTransform`, hover-float cards with green gradient accents.
- **CTA Section** — Scroll-driven scale and opacity reveal with glowing gradient buttons.
- **Responsive Navbar** — Transparent-to-blur on scroll, animated mobile hamburger menu.
- **Section Dividers** — Scroll-aware gradient lines that scale in between sections.

## Project Structure

```
app/
├── components/
│   ├── navbar.tsx           # Fixed navbar with scroll detection
│   ├── hero.tsx             # Hero with particles, GSAP timeline, parallax
│   ├── timeline.tsx         # 10-year milestone timeline
│   ├── products.tsx         # Product grid with 3D tilt cards
│   ├── stats.tsx            # Animated counter section
│   ├── testimonials.tsx     # Rotating testimonial carousel
│   ├── sustainability.tsx   # Parallax sustainability section
│   ├── cta.tsx              # Call-to-action section
│   ├── footer.tsx           # Footer with links and socials
│   └── section-divider.tsx  # Animated gradient dividers
├── globals.css              # Theme variables, custom utilities
├── layout.tsx               # Root layout with metadata and fonts
└── page.tsx                 # Main page composing all sections
```

## Getting Started

### Prerequisites

- Node.js 20+ 
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd indiaskills-regionals

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Build for Production

```bash
npm run build
npm start
```

## Deployment

Deployed on [Vercel](https://vercel.com). Push to `main` triggers automatic builds.

**Live at:** [https://regionals-module-d-2.vercel.app/](https://regionals-module-d-2.vercel.app/)
