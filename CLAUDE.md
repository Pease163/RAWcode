# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Frontend dev server (port 5173)
npm run dev

# Production build
npm run build

# Express API server (port 3001, hot-reload)
npm run server:dev

# Express API server (no hot-reload, for production)
npm run server:start

# Telegram bot polling (long-polling mode)
npm run bot:start

# Full local dev: run frontend + server in parallel
# (use two terminals: npm run dev + npm run server:dev)

# No lint or test scripts — TypeScript strict mode is the only static check
# Run `npm run build` to verify there are no type errors
```

## Architecture

Two independent runtimes sharing one repo:

**Client** — React 18 SPA built with Vite 6, Tailwind CSS 4 (`@tailwindcss/vite` plugin, no PostCSS), Framer Motion (`motion/react`), vite-imagetools.
- Routes: `/` → HomePage, `/services/:slug` → ServiceDetailPage, `/privacy` → PrivacyPage, `/terms` → TermsPage, `*` → NotFoundPage
- Vite proxies `/api/*` to `http://localhost:3001` in dev
- Build splits chunks: `motion`, `react-vendor`, `lenis` (configured in `vite.config.ts`)

**Server** — Express on port 3001 with Telegram bot integration. Runs via `tsx` (TypeScript executor). Uses `.js` extensions in imports (ESM convention with tsx).
- `server/index.ts` — Express app, helmet (HSTS on, CSP with whitelist), CORS, rate limiter, JSON body limit 10kb, `trust proxy` in production
- `server/routes/submit.ts` — form submission → Telegram notifications. Validates with regex (NAME_RE, EMAIL_RE, PHONE_RE, TELEGRAM_RE), honeypot field `_hp`, 5-min sha256-hashed dedup window
- `server/routes/telegram.ts` — webhook handler for bot `/start <token>` command. Requires `TELEGRAM_WEBHOOK_SECRET` header and `ADMIN_TOKEN` for registration
- `server/polling.ts` — standalone long-polling alternative to webhooks. Also requires `ADMIN_TOKEN` for `/start`
- `server/lib/telegram.ts` — shared module: getAdmins, saveAdmins (with mutex lock), sendTelegramMessage (10s timeout), escapeHtml, deleteWebhook, getUpdates, `handleStartCommand` (shared admin registration logic used by both webhook and polling). Types: `TelegramMessage`, `TelegramUpdate`. MAX_ADMINS = 2

**Provider stack** (`main.tsx`): `ErrorBoundary` → `BrowserRouter` → `SmoothScrollProvider (Lenis)` → `App` → `PageTransition (AnimatePresence, fade 0.3s)`

## Key Patterns

**Path alias:** `@/*` → `./src/*` (configured in both `vite.config.ts` and `tsconfig.json`)

**Data layer:** Static data lives in `src/app/data/*.ts` — typed arrays/interfaces exported by name. Components import data, never define it inline. Follow `services-data.ts` as the reference pattern.

**SEO:** `src/app/lib/seo.ts` exports `useSEO(config: SEOConfig | null)` hook — manages title, meta description, canonical, OG tags, Twitter Card, robots, and JSON-LD via DOM. Properly restores previous values on unmount. Pass `null` config for no-op (e.g., when service not found). Used in ServiceDetailPage, PrivacyPage, TermsPage. Static pages (HomePage) rely on tags in `index.html`.

**Shared animations:** `src/app/lib/animations.ts` exports static motion preset objects (`fadeInUp`, `fadeInUp30`, `fadeInLeft`, `fadeInRight`, `staggerDelay`, `withDelay`, `scaleIn`, `blurIn`, `clipRevealUp`, `hoverLift`, `charVariants`, `splitTextToChars`). Spread into `<motion.div {...fadeInUp}>` — never duplicate `initial/whileInView/viewport` inline.

**Shared styles:** `src/app/lib/styles.ts` exports class string constants (`ctaButtonClass`, `cardClass`, `sectionClass`, `focusRingClass`). Use these instead of repeating long Tailwind class lists. In particular, always use `focusRingClass` for focus-visible rings — never write `focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00]...` inline.

**Analytics:** `src/app/lib/analytics.ts` exports `trackGoal(goal, params?)` and `trackPageView(url, title)`. In dev mode logs to console; in prod sends to Yandex.Metrika + MS Clarity. `YM_ID = 0` is a placeholder — awaiting real counter ID.

**Validation:** `src/app/lib/validation.ts` — form validation utilities (`formatPhone`, `looksLikePhone`, `validateContact` with Levenshtein-based email domain suggestions). Used by `ContactForm.tsx`.

**Events:** `src/app/lib/events.ts` — `dispatchSelectPackage(packageName)` dispatches a `selectPackage` CustomEvent and scrolls to footer. Use this instead of inline `new CustomEvent(...)` + `scrollIntoView`.

**AnimatedNumber:** `src/app/components/ui/AnimatedNumber.tsx` — reusable animated counter (`{to, suffix?, prefix?, duration?, format?}`). Uses `useMotionValue` + `animate` with `easeOutExpo`. Used in Hero (stats), CostCalculator (price), Process (step numbers).

**useAccordion:** `src/app/hooks/useAccordion.ts` — shared accordion state (`toggle`, `isOpen`). Used in FAQ and ServiceFAQ.

**SectionHeader:** `src/app/components/ui/SectionHeader.tsx` — reusable badge + title + subtitle block used in 10+ sections. Always use it for section headers.

**Breadcrumbs:** `src/app/components/ui/Breadcrumbs.tsx` — visual breadcrumbs with optional `scrollTo` state for same-page section navigation. Used in ServiceHero, PrivacyPage, TermsPage.

**Component splitting:** Large components are split into subdirectories (e.g., `Footer.tsx` orchestrates `footer/ContactForm.tsx`, `footer/ContactInfo.tsx`, `footer/SocialLinks.tsx`). Service detail pages use `service-page/` subdirectory with 7 sub-components.

**Responsive breakpoints:** Mobile-first with `sm:` (640px), `md:` (768px), `lg:` (1024px), `xl:` (1280px). All text sizes, paddings, and decorative elements must have mobile-appropriate values at the base level. Decorative blurs/circles should be halved on mobile to prevent horizontal overflow.

**Cross-component communication:** Custom `selectPackage` event dispatched via `dispatchSelectPackage()` from ServiceCard/ServicePricing/ServiceCTA, listened in Footer ContactForm.

**Navbar:** Sticky CTA appears after hero, hides when footer is visible. Mobile menu locks body scroll, supports Escape key. Section navigation uses pending scroll (closes menu → scrolls) or routes to home with `scrollTo` state.

## File Naming Conventions

- **Components** (`src/app/components/`): PascalCase (e.g., `Hero.tsx`, `CostCalculator.tsx`, `MagneticButton.tsx`, `ServiceCard.tsx`)
- **Component subdirectories** (`footer/`, `service-page/`, `ui/`, `providers/`): PascalCase files inside
- **Data files** (`src/app/data/`): kebab-case (e.g., `services-data.ts`, `faq-data.ts`)
- **Lib modules** (`src/app/lib/`): lowercase (e.g., `animations.ts`, `styles.ts`, `events.ts`, `validation.ts`)
- **Hooks** (`src/app/hooks/`): camelCase with `use` prefix (e.g., `useAccordion.ts`)
- **Server** (`server/`): lowercase with `.js` import extensions (ESM tsx convention)

## Project Conventions

- Language: Russian for all UI text and user-facing strings
- ESM project (`"type": "module"` in package.json)
- TypeScript strict mode with `noUnusedLocals` and `noUnusedParameters`
- Fonts are self-hosted WOFF2 in `src/assets/fonts/` — no Google Fonts CDN
  - **Unbounded** (`--font-heading`) — headings, cyrillic + latin, weights 400/700
  - **SF Pro Display** (`--font-body`) — body text + prices, cyrillic + latin, weights 400/500/600/700
- CSS structure: `src/styles/index.css` (fonts + animations) imports `tailwind.css` (directives) and `theme.css` (custom properties)
- Portfolio images are local JPEGs + WebP in `src/assets/` (imported in `portfolio-data.ts`), compressed to ~1600px wide, JPEG quality 85
- Colors are hardcoded hex values (not CSS variables): primary lime `#CCFF00`, accent orange `#FF3B00`, dark bg `#0F0F11`, card bg `#1E1E22`
- OG images in `public/` (og-image.jpg, og-web.jpg, og-systems.jpg, og-apps.jpg — 1200x630)
- SEO: `public/sitemap.xml` (6 pages), `public/robots.txt`, JSON-LD in `index.html` (LocalBusiness with reviews, WebSite, FAQPage with all 10 questions), dynamic JSON-LD via `useSEO` on subpages
- Yandex.Metrika, MS Clarity, and VK Pixel scripts in `index.html` — all commented out, awaiting real IDs
- Contact info: denisdikarvit@gmail.com, +7 (921) 109-54-30 (ИП Сторожев Денис Максимович)
- Anti-spam: honeypot field `_hp` on contact form + server-side rate limiter (5/hour/IP) + 5-min sha256-hashed dedup
- CookieBanner uses `localStorage` key `cookies_accepted`
- Accessibility: skip-to-content link, `prefers-reduced-motion` support in CSS, focus-visible rings on all interactive elements (via `focusRingClass`)

## Environment Variables

Server reads from `.env` (see `.env.example` for template):
- `TELEGRAM_BOT_TOKEN` — Telegram bot API token (required for server)
- `TELEGRAM_WEBHOOK_SECRET` — Secret for verifying Telegram webhook requests (required for webhook mode)
- `ADMIN_TOKEN` — Pre-shared token for admin registration via `/start <token>` (required for bot)
- `PORT` — Express port (default: 3001)
- `CORS_ORIGIN` — Allowed CORS origin (default: `http://localhost:5173`)
- `NODE_ENV` — Set to `production` behind reverse proxy for correct IP detection in rate limiter
