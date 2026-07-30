# NeuralSyntax Project Context

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion.
**Brand Colors:** Background #131420, Surface #1A233A, Card #20283A, Border #2A3245, Cyan #17DED1, Blue #3D8EFF, Purple #8A3DFF, Green #00E6A8.
**Design Principle:** Cinematic dark mode with glassmorphism. Every card uses `backdrop-filter: blur(16px) saturate(180%)` and inset shadows.
**Glass Formula:**
  ```css
  background: rgba(32, 40, 58, 0.65);
  backdrop-filter: blur(16px) saturate(180%);
  border: 1px solid rgba(42, 50, 69, 0.6);
  box-shadow: 0 20px 40px -12px rgba(0,0,0,0.8), inset 0 1px 0 rgba(255,255,255,0.06);
  ```
**Data:** YouTube API + Blogger API with ISR (`revalidate: 3600`). No client-side API calls.
**Fonts:** Inter, Space Grotesk, JetBrains Mono (via next/font/google).
**Tagline:** "Master AI and Coding Before AnyOne Else" — uses brand gradient everywhere.
**Commands:**
  - `npm run dev` — start dev server
  - `npm run build` — production build
  - `npm run lint` — run ESLint
**Key Files:**
  - `src/app/globals.css` — all brand tokens, glass utilities, animations
  - `src/lib/youtube.ts` — YouTube API fetching with pagination
  - `src/lib/blogger.ts` — Blogger API fetching with blog URL resolution + pagination
  - `src/components/neural-background.tsx` — Canvas particle system (80 nodes)
  - `src/components/typing-terminal.tsx` — 3D auto-typing terminal
  - `src/app/api/revalidate/route.ts` — on-demand ISR webhook
  - `src/app/api/newsletter/route.ts` — Resend newsletter signup
