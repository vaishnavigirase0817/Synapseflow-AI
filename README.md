# SynapseFlow AI

![SynapseFlow AI Logo Placeholder](https://via.placeholder.com/1200x400?text=SynapseFlow+AI)

> **Transform scattered business data into intelligent automated workflows powered by AI.**

SynapseFlow AI is a premium, production-ready SaaS landing page built for high performance, accessibility, and exceptional user experience. Designed with a modern "AI Control Room" aesthetic, it features complex UI components like a responsive Bento Grid, a dynamic Pricing Engine, and an Interactive Dashboard Preview.

## 🚀 Live Demo
*[(https://courageous-gnome-dd419e.netlify.app/)*

## ✨ Features

- **Pure CSS Animations:** 100% custom animations utilizing CSS transitions, `@keyframes`, and `IntersectionObserver`. No runtime CSS-in-JS or external animation libraries (like Framer Motion) are used.
- **Premium Aesthetics:** Glassmorphism, aurora backgrounds, animated gradient borders, cursor spotlights, and floating UI elements.
- **Dynamic Pricing Engine:** Multi-currency (USD, INR, EUR) and billing cycle toggles that recalculate without triggering global DOM re-renders.
- **Responsive Bento Grid:** A highly interactive Bento Grid on desktop that seamlessly transforms into a smooth-expanding Accordion on mobile, preserving active states across breakpoints.
- **Interactive Dashboard:** A premium mock AI dashboard featuring SVG charts, analytics cards, activity timelines, and animated skeleton loading states.
- **Production Ready:** Optimized with React.lazy code-splitting, a sub-500ms initial CSS loader, ARIA accessibility, HTML5 form validation, and Schema.org JSON-LD for SEO.

## 🛠️ Tech Stack

- **Framework:** [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- **Styling:** [Tailwind CSS v3](https://tailwindcss.com/) (Utility-first, no pre-built component libraries like Shadcn or Headless UI)
- **Icons:** Inline SVGs
- **Deployment:** Pre-configured for [Vercel](https://vercel.com/) with `vercel.json` caching and security headers.

## 📦 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/vaishnavigirase0817/Synapseflow-AI.git
   cd Synapseflow-AI
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

## 📁 Project Structure

```text
src/
├── components/
│   ├── common/         # Reusable UI primitives (Buttons, Cards, ScrollReveal)
│   ├── hero/           # AI Control Room hero components
│   ├── layout/         # Navbar, Mobile Menu
│   └── sections/       # Landing page sections (Pricing, Features, Dashboard, etc.)
├── hooks/              # Custom React hooks (useScrollReveal, useMediaQuery, etc.)
├── index.css           # Global Tailwind directives and base styles
└── animations.css      # Custom CSS keyframes and animation utility classes
```

## 🔒 License

Copyright © 2026 SynapseFlow AI. All rights reserved.
