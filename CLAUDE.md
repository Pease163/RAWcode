# CLAUDE.md — RAWcode Studio

Полная архитектурная документация проекта для Claude Code.

## 1. Commands

```bash
npm run dev            # Vite dev server (порт 5173)
npm run build          # Production build + type-check
npm run server:dev     # Express API (порт 3001, hot-reload через tsx watch)
npm run server:start   # Express API (без hot-reload)
npm run bot:start      # Telegram bot в режиме long-polling
```

Полное dev-окружение — два терминала: `npm run dev` + `npm run server:dev`.
Линтера нет — `npm run build` единственная статическая проверка (TypeScript strict).

## 2. Architecture

Два независимых рантайма в одном репозитории:

**Client** — React 18 SPA, Vite 6, Tailwind CSS 4 (`@tailwindcss/vite`, без PostCSS), motion 12.x (`motion/react`), vite-imagetools.
- Маршруты: `/` → HomePage, `/services/:slug` → ServiceDetailPage, `/privacy` → PrivacyPage, `/terms` → TermsPage, `*` → NotFoundPage
- Все страницы — `React.lazy` + `Suspense` (fallback: пустой `min-h-screen`)
- Vite proxy: `/api/*` → `http://localhost:3001`
- Чанки сборки: `motion`, `react-vendor` (react + react-dom + react-router-dom), `lenis`, `icons` (lucide-react)

**Server** — Express 4 на порту 3001, Telegram-интеграция. Запуск через `tsx`. Импорты с `.js` расширениями (ESM tsx).

**Provider stack** (`main.tsx`): `ErrorBoundary → BrowserRouter → SmoothScrollProvider(Lenis) → App → PageTransition(AnimatePresence, fade 0.3s)`

## 3. File Structure

```
src/
├── main.tsx                          # Entry: ErrorBoundary → BrowserRouter → SmoothScrollProvider → App
├── styles/
│   ├── index.css                     # @font-face (8 шрифтов) + CSS-анимации (marquee, shimmer) + .cv-auto
│   ├── tailwind.css                  # @import 'tailwindcss' source(none) + @source
│   └── theme.css                     # CSS custom properties + @theme inline + @layer base
├── assets/fonts/                     # Self-hosted WOFF2: Unbounded (400,700) + SF Pro Display (400-700)
├── app/
│   ├── App.tsx                       # Routes + skip-to-content + Navbar + BackToTop + CookieBanner
│   ├── pages/
│   │   ├── HomePage.tsx              # Секции: Hero→Marquee→About→Services→Calculator→Process→Portfolio→Testimonials→FAQ→Footer
│   │   ├── ServiceDetailPage.tsx     # useParams slug → ServiceHero→Pricing→Features→TechStack→Process→FAQ→CTA→Footer
│   │   ├── PrivacyPage.tsx           # Политика конфиденциальности (152-ФЗ)
│   │   ├── TermsPage.tsx             # Условия использования
│   │   └── NotFoundPage.tsx          # 404
│   ├── components/
│   │   ├── Hero.tsx                  # Parallax круги, KineticTitle (посимвольная), AnimatedNumber статистика
│   │   ├── Navbar.tsx                # Sticky CTA, mobile drawer, pendingScroll, IntersectionObserver
│   │   ├── About.tsx                 # Манифест с parallax, анимированный underline, values grid
│   │   ├── Services.tsx              # SectionHeader + bento grid из ServiceCard
│   │   ├── ServiceCard.tsx           # 3D tilt (useSpring), hover glow, dispatchSelectPackage
│   │   ├── MagneticButton.tsx        # Магнитный эффект (50px radius, spring), fallback для touch
│   │   ├── Portfolio.tsx             # Alternating layout, clipReveal, ImageSkeleton WebP/AVIF
│   │   ├── Process.tsx              # 4-step grid, AnimatedNumber (zero-padded), hover lift
│   │   ├── CostCalculator.tsx        # 3 категории → 4 вопроса → результат с breakdown, multipliers
│   │   ├── FAQ.tsx                   # useAccordion, height auto, aria-expanded, keyboard
│   │   ├── Testimonials.tsx          # Star rating, initials avatar, stagger + hoverLift
│   │   ├── Marquee.tsx              # CSS-анимация marquee-track, pause on hover
│   │   ├── Footer.tsx               # id="footer", ContactForm + ContactInfo + SocialLinks
│   │   ├── ErrorBoundary.tsx         # Class component, getDerivedStateFromError
│   │   ├── footer/
│   │   │   ├── ContactForm.tsx       # selectPackage listener, phone formatting, custom dropdown, honeypot
│   │   │   ├── ContactInfo.tsx       # Email + phone links, stagger animations
│   │   │   └── SocialLinks.tsx       # Telegram + VK, hover scale
│   │   ├── service-page/
│   │   │   ├── ServiceHero.tsx       # Breadcrumbs, stats grid, decorative blur
│   │   │   ├── ServicePricing.tsx    # PricingCard, recommended tier, dispatchSelectPackage
│   │   │   ├── ServiceFeatures.tsx   # detailedFeatures groups with check icons
│   │   │   ├── ServiceTechStack.tsx  # techStack groups (frontend/backend/infra/tools)
│   │   │   ├── ServiceProcess.tsx    # Timeline layout, duration pills
│   │   │   ├── ServiceFAQ.tsx        # useAccordion, AnimatePresence height auto
│   │   │   └── ServiceCTA.tsx        # dispatchSelectPackage, decorative blur
│   │   ├── ui/
│   │   │   ├── SectionHeader.tsx     # Badge + title (white+accent) + subtitle
│   │   │   ├── AnimatedNumber.tsx    # useMotionValue + animate, useInView once
│   │   │   ├── ImageSkeleton.tsx     # Shimmer skeleton, <picture> WebP/AVIF
│   │   │   ├── Breadcrumbs.tsx       # Nav links with scrollTo state
│   │   │   ├── BackToTop.tsx         # Appears at 15% scroll, hidden on mobile
│   │   │   ├── ScrollProgress.tsx    # 2px top bar #CCFF00, useSpring scaleX (не подключён в App)
│   │   │   └── CookieBanner.tsx      # localStorage cookies_accepted, slide from bottom
│   │   └── providers/
│   │       ├── SmoothScrollProvider.tsx  # Lenis (duration 0.8), prefers-reduced-motion skip, RAF loop
│   │       └── PageTransition.tsx        # AnimatePresence mode="wait", opacity fade 0.3s
│   ├── data/
│   │   ├── services-data.ts          # ServiceCategory[] (3): web, systems, apps — с tiers, techStack, FAQ
│   │   ├── portfolio-data.ts         # PortfolioCase[] (3) — с image/imageWebp/imageAvif
│   │   ├── testimonials-data.ts      # Testimonial[] (3) — rating, initials
│   │   ├── process-data.ts           # ProcessStep[] (4) — icon, deliverables
│   │   ├── calculator-data.ts        # CategoryChoice[] + categoryQuestions Record
│   │   ├── about-data.ts             # AboutValue[] (4) — icon, title, description
│   │   ├── faq-data.ts               # FAQItem[] (10) — id, question, answer
│   │   └── marquee-data.ts           # string[] (8 слов)
│   ├── lib/
│   │   ├── animations.ts            # 20+ motion presets + easings + splitTextToChars
│   │   ├── styles.ts                 # 4 Tailwind class constants
│   │   ├── seo.ts                    # useSEO hook — title, meta, OG, JSON-LD
│   │   ├── events.ts                 # dispatchSelectPackage — CustomEvent + scroll
│   │   ├── validation.ts            # formatPhone, looksLikePhone, validateContact (Levenshtein)
│   │   └── analytics.ts             # trackGoal, trackPageView — YM + Clarity (dev: console.log)
│   └── hooks/
│       ├── useAccordion.ts           # openIndex, toggle, isOpen
│       └── useIsCoarsePointer.ts     # pointer: coarse media query
server/
├── index.ts                          # Express app, helmet, CORS, rate limiters, routes
├── routes/
│   ├── submit.ts                     # POST /api/submit — форма → Telegram
│   └── telegram.ts                   # POST /api/telegram — webhook /start
├── polling.ts                        # Long-polling альтернатива webhook
├── lib/
│   └── telegram.ts                   # getAdmins, saveAdmins, sendTelegramMessage, handleStartCommand
└── data/
    └── admins.json                   # { admins: number[] }
```

## 4. Component API Reference

### SectionHeader
```typescript
interface SectionHeaderProps {
  badge?: string;                    // Pill-бейдж над заголовком
  badgeColor?: 'lime' | 'orange';   // default: 'lime'
  titleWhite: string;                // Белая часть h2
  titleAccent: string;               // #CCFF00 часть h2
  subtitle?: string;
  centered?: boolean;                // default: true
  className?: string;                // default: 'mb-12 md:mb-16 lg:mb-20'
}
```

### AnimatedNumber
```typescript
interface AnimatedNumberProps {
  to: number;                                  // Целевое значение
  suffix?: string;                             // default: ''
  prefix?: string;                             // default: ''
  duration?: number;                           // default: 2 (секунды)
  format?: (value: number) => string;          // default: Math.round → String
}
```
Триггер: `useInView(ref, { once: true })`. Анимация: `useMotionValue(0)` + `animate(mv, to, { ease: easeOutExpo })`.

### ImageSkeleton
```typescript
interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';  // default: 'lazy'
  width?: number;
  height?: number;
  srcWebp?: string;             // <source type="image/webp"> в <picture>
  srcAvif?: string;             // <source type="image/avif"> в <picture>
}
```

### Breadcrumbs
```typescript
interface BreadcrumbItem {
  label: string;
  to?: string;         // Путь для <Link>
  scrollTo?: string;   // state.scrollTo для навигации к секции
}
// Props: { items: BreadcrumbItem[] }
```

### MagneticButton
```typescript
interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;    // Если указан — рендерит <a>, иначе <button>
  onClick?: () => void;
}
```
На touch (`useIsCoarsePointer()`) — plain элемент без motion. На desktop — magnetic offset (50px radius, spring stiffness 150).

### ServiceCard
```typescript
{ service: ServiceCategory; index: number }
```
3D tilt на desktop (useSpring stiffness 300), отключён на touch. `{...fadeInUp30}` + `{...staggerDelay(index)}`.

### ErrorBoundary
```typescript
{ children: ReactNode }
```
Class component. Fallback: кнопка "Обновить страницу" (`window.location.reload()`).

## 5. Data Schemas

### ServiceCategory (services-data.ts)
```typescript
interface Tier { name: string; price: string; audience: string; duration: string; features: string[]; recommended?: boolean }
interface DetailedFeatureGroup { category: string; items: string[] }
interface ProcessStep { step: number; title: string; description: string; duration: string }  // ⚠️ отличается от process-data.ts
interface TechStack { frontend: string[]; backend?: string[]; infrastructure: string[]; tools: string[] }
interface FAQ { question: string; answer: string }  // ⚠️ без id, отличается от FAQItem

interface ServiceCategory {
  id: string; slug: string; icon: LucideIcon; title: string; priceRange: string;
  description: string; features: string[]; tiers: Tier[];
  longDescription: string; seoTitle: string; seoDescription: string; ogImage?: string;
  techStack: TechStack; processSteps: ProcessStep[];
  detailedFeatures: DetailedFeatureGroup[]; faqs: FAQ[];
}
export const services: ServiceCategory[]  // 3 записи: web, systems, apps
```

### PortfolioCase (portfolio-data.ts)
```typescript
interface PortfolioCase {
  id: number; title: string; category: string; description: string;
  image: string; imageWebp: string; imageAvif: string;  // vite-imagetools imports
  width: number; height: number; tags: string[]; url: string; reverse?: boolean;
}
export const cases: PortfolioCase[]  // 3 записи
```

### Testimonial (testimonials-data.ts)
```typescript
interface Testimonial { id: number; name: string; role: string; text: string; rating: number; initials: string }
export const testimonials: Testimonial[]  // 3 записи
```

### ProcessStep (process-data.ts)
```typescript
interface ProcessStep {
  number: string;  // '01'–'04' (⚠️ string, не number как в services-data)
  icon: LucideIcon; title: string; description: string; duration: string; deliverables: string[];
}
export const steps: ProcessStep[]  // 4 записи
```

### Calculator (calculator-data.ts)
```typescript
interface CalculatorOption { label: string; value: number }  // value: цена в ₽; -1 = ×1.3, -2 = ×1.5
interface CalculatorQuestion { id: string; question: string; options: CalculatorOption[] }
interface CategoryChoice { id: string; label: string; description: string; icon: string }

export const categories: CategoryChoice[]  // 3: web, systems, apps
export const categoryQuestions: Record<string, CalculatorQuestion[]>  // по 4 вопроса на категорию
```

### Остальные
```typescript
// about-data.ts
interface AboutValue { icon: LucideIcon; title: string; description: string }
export const values: AboutValue[]  // 4 записи

// faq-data.ts
interface FAQItem { id: string; question: string; answer: string }  // id: kebab-case
export const faqItems: FAQItem[]  // 10 записей

// marquee-data.ts
export const marqueeItems: string[]  // 8 слов: DESIGN, DEVELOPMENT, STRATEGY...
```

## 6. Animation Presets (lib/animations.ts)

**Easings:**
- `easeOutExpo` = `[0.16, 1, 0.3, 1]` — быстрый "выброс"
- `easeInOutCubic` = `[0.65, 0, 0.35, 1]`

**Fade/Slide** (spread в `<motion.div {...preset}>`):
Все: `viewport: { once: true, margin: '0px 0px -80px 0px' }`

| Пресет | initial | whileInView |
|--------|---------|-------------|
| `fadeInUp` | `opacity: 0, y: 20` | `opacity: 1, y: 0` |
| `fadeInUp30` | `opacity: 0, y: 30` | `opacity: 1, y: 0` |
| `fadeInLeft` | `opacity: 0, x: -30` | `opacity: 1, x: 0` |
| `fadeInRight` | `opacity: 0, x: 30` | `opacity: 1, x: 0` |
| `blurIn` | `opacity: 0, y: 12, scale: 0.98` | `opacity: 1, y: 0, scale: 1` (0.7s) |
| `scaleIn` | `opacity: 0, scale: 0.8` | `opacity: 1, scale: 1` (0.6s) |
| `scaleInSm` | `opacity: 0, scale: 0.95` | `opacity: 1, scale: 1` (0.5s) |
| `clipRevealUp` | `clipPath: inset(100% 0% 0% 0%)` | `clipPath: inset(0%)` (0.8s) |
| `clipRevealLeft` | `clipPath: inset(0% 100% 0% 0%)` | `clipPath: inset(0%)` (0.8s) |

**Stagger (Variants-based):**
```tsx
// Контейнер
staggerContainer(stagger = 0.08, delay = 0)  // → { hidden: {}, visible: { transition: { staggerChildren, delayChildren } } }

// Дочерние варианты
staggerItem        // fade + y: 20 → 0
staggerItemScale   // scale: 0.8 → 1 (spring 300/20)
staggerItemLeft    // x: -20 → 0

// Использование:
<motion.ul variants={staggerContainer(0.1)} initial="hidden" whileInView="visible" viewport={{ once: true }}>
  <motion.li variants={staggerItem}>...</motion.li>
</motion.ul>
```

**Delay-хелперы:**
```tsx
staggerDelay(index, base = 0.1)  // → { transition: { delay: index * base } }
withDelay(delay)                 // → { transition: { delay } }
// Пример: <motion.div {...fadeInUp} {...staggerDelay(2)} />
```

**Hover:**
```tsx
hoverLift                // whileHover: { y: -8 }
hoverScale               // whileHover: { scale: 1.05 }
hoverGlow(color = '#CCFF00')  // whileHover: { boxShadow: '0 0 30px color33, 0 0 60px color1a' }
```

**Кинетическая типографика:**
```tsx
charContainer   // Variants: staggerChildren: 0.03
charVariants    // Variants: y: 40 → 0, opacity 0 → 1
splitTextToChars(text: string): string[]  // пробелы → \u00A0
```

## 7. Shared Styles (lib/styles.ts)

```typescript
ctaButtonClass   // px-8 py-4 bg-[#CCFF00] text-[#0F0F11] rounded-full font-bold hover:bg-[#FF3B00] hover:text-white transition-all duration-300 uppercase tracking-wider
cardClass        // p-6 md:p-8 bg-[#1E1E22] rounded-3xl border border-white/10
sectionClass     // py-16 md:py-24 lg:py-32 px-6 relative overflow-hidden
focusRingClass   // focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#CCFF00] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F0F11]
```

**Палитра:** lime `#CCFF00`, orange `#FF3B00`, bg `#0F0F11`, card `#1E1E22`, text `#F4F4F0`, text-secondary `#D4D4D0`, text-tertiary `#B4B4B0`, muted `#717182`.

## 8. Lib Modules

### seo.ts — `useSEO(config: SEOConfig | null)`
```typescript
interface SEOConfig {
  title: string; description: string; canonical: string;
  ogImage?: string; ogType?: string; robots?: string;
  jsonLd?: object[];  // каждый → отдельный <script type="application/ld+json">
}
```
Устанавливает title, meta, link[canonical], OG, Twitter, JSON-LD. При unmount восстанавливает предыдущие значения. `null` = no-op.

### events.ts — `dispatchSelectPackage(packageName: string)`
Диспатчит `CustomEvent('selectPackage', { detail: { packageName } })` на window + scroll to `#footer`. Слушатель в `ContactForm.tsx`.

### validation.ts
- `formatPhone(value)` — форматирует в `+7 (XXX) XXX-XX-XX`; `8` → `7`, обрезка до 11 цифр
- `looksLikePhone(value)` — `true` если начинается с `+`/цифры/`(` или содержит 4+ цифр
- `validateContact(value)` — возвращает string ошибки или null. Ветвление: phone (11 цифр) / email (regex + Levenshtein подсказки домена, порог ≤2) / всё остальное (принимается)
- Известные домены для подсказок: gmail.com, mail.ru, yandex.ru, outlook.com, yahoo.com, icloud.com, hotmail.com, rambler.ru, bk.ru, list.ru, inbox.ru, ya.ru

### analytics.ts
- `trackGoal(goal: string, params?: Record<string, string|number>)` — DEV: console.log; PROD: `window.ym()` + `window.clarity()`
- `trackPageView(url: string, title: string)` — DEV: console.log; PROD: `window.ym()` only
- `YM_ID = 0` — placeholder, ожидает реальный ID

## 9. Server API

### POST /api/submit — Форма обратной связи
**Body:** `{ name: string, contact: string, project: string, _hp?: string }`

**Validation:**
- Только поля `name, contact, project, _hp` — лишние → 400
- `NAME_RE = /^[\p{L}\s.\-']{1,100}$/u` (max 100)
- `contact` (max 200): EMAIL\_RE `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` ∨ PHONE\_RE `/^\+?[\d\s\-()]{7,20}$/` ∨ TELEGRAM\_RE `/^@[\w]{4,32}$/`
- `project`: max 2000 символов

**Anti-spam:** honeypot `_hp` (заполнено → тихий `{ success: true }`), rate limit 5/час/IP, SHA256 dedup 5 мин (Map, cleanup при >1000 записей).

**Telegram:** HTML-сообщение всем adminам параллельно (`Promise.all`). Формат: `<b>Новая заявка</b>` + имя, контакт, описание.

### POST /api/telegram — Webhook
Заголовок `x-telegram-bot-api-secret-token` = `TELEGRAM_WEBHOOK_SECRET`. Обрабатывает `/start <token>` → `handleStartCommand()`.

### GET /health → `{ status: 'ok' }`

### server/lib/telegram.ts
- `getAdmins(): number[]` — синхронное чтение `server/data/admins.json`
- `saveAdmins(admins: number[])` — синхронная запись
- `sendTelegramMessage(chatId, text): Promise<boolean>` — POST sendMessage, parse\_mode HTML, timeout 10s
- `escapeHtml(text)` — &, <, >, ", '
- `handleStartCommand(chatId, firstName, token, adminToken)` — регистрация через `withAdminLock`, MAX\_ADMINS = 2
- `deleteWebhook()`, `getUpdates(offset)` — для polling

### Express middleware
Helmet (CSP whitelist: mc.yandex.ru, clarity.ms, vk.com), compression, CORS (CORS\_ORIGIN env), express.json 10kb.
Rate limiters: submit 5/час, telegram 30/мин.
`trust proxy` = 1 только в production.
Таймауты: server 30s, keepAlive 65s, headers 70s.

## 10. Key Patterns

**Path alias:** `@/*` → `./src/*` (vite.config.ts + tsconfig.json)

**Data layer:** Данные в `src/app/data/*.ts` — типизированные массивы/интерфейсы. Компоненты импортируют, не определяют inline.

**Cross-component events:** `dispatchSelectPackage()` из ServiceCard/ServicePricing/ServiceCTA → слушатель в ContactForm (pre-fill dropdown).

**Responsive:** Mobile-first. `sm:` 640px, `md:` 768px, `lg:` 1024px, `xl:` 1280px. Декоративные blur-круги — в 2 раза меньше на mobile.

**Touch awareness:** `useIsCoarsePointer()` — отключает hover-эффекты (MagneticButton, ServiceCard tilt) на touch-устройствах.

**Performance:** lazy routes (React.lazy), `content-visibility: auto` (.cv-auto), useInView, font preload (custom Vite plugin), build compression, manual chunks.

**Accessibility:** Skip-to-content link, `focusRingClass` на всех интерактивных, ARIA (aria-expanded, role="region"), `prefers-reduced-motion: reduce` (CSS: все анимации 0.01ms, Lenis: skip).

**File naming:** Компоненты — PascalCase, данные — kebab-case, lib — lowercase, хуки — camelCase с `use`, сервер — lowercase + `.js` расширения в импортах.

**Navbar scroll:** Hide on scroll-down (>5px diff после 100px), show on scroll-up. Sticky CTA: IntersectionObserver на hero/footer. Mobile drawer: `x: 100%→0`, body scroll lock, Escape key.

**HomePage scrollTo:** `location.state.scrollTo` → `getElementById().scrollIntoView()` после 100ms, затем `history.replaceState` для очистки state.

## 11. Environment Variables

| Переменная | Обязательна | Default | Описание |
|---|---|---|---|
| `TELEGRAM_BOT_TOKEN` | Да (сервер) | — | API-токен Telegram бота |
| `TELEGRAM_WEBHOOK_SECRET` | Да (webhook) | — | Секрет для верификации webhook |
| `ADMIN_TOKEN` | Да (бот) | — | Токен для `/start` регистрации |
| `PORT` | Нет | 3001 | Порт Express |
| `CORS_ORIGIN` | Нет | `http://localhost:5173` | Разрешённый origin |
| `NODE_ENV` | Нет | — | `production` для trust proxy + корректного IP |

## 12. Library API Quick Reference

### motion (Framer Motion 12.x)
```tsx
// Базовый элемент
<motion.div animate initial exit whileHover whileTap whileInView viewport transition />

// Хуки (все из 'motion/react')
useScroll({ target?, container? })       → { scrollY, scrollYProgress }
useTransform(value, inputRange, outputRange) → MotionValue
useInView(ref, { once?, margin? })       → boolean
useMotionValue(initial)                  → MotionValue
useSpring(value, { stiffness, damping, mass }) → MotionValue
useMotionValueEvent(value, 'change', callback)
useAnimationControls()                   → { start(), stop() }
animate(motionValue, target, { duration, ease }) → AnimationPlaybackControls

// AnimatePresence — анимация exit дочерних
<AnimatePresence mode="wait">
  <motion.div key={key} initial exit animate />
</AnimatePresence>

// Variants — каскадные анимации
<motion.div variants={parent} initial="hidden" whileInView="visible">
  <motion.div variants={child} />  {/* наследует initial/whileInView от родителя */}
</motion.div>
```

### Tailwind CSS 4
```css
/* tailwind.css — новый синтаксис */
@import 'tailwindcss' source(none);
@source '../**/*.{js,ts,jsx,tsx}';

/* theme.css — custom design tokens */
@theme inline {
  --color-background: var(--background);
  --color-primary: var(--primary);
  /* ... */
}

/* @tailwindcss/vite плагин — без PostCSS, без postcss.config */
```

### Lenis
```typescript
new Lenis({ duration: 0.8, smoothWheel: true, wheelMultiplier: 1.2, syncTouch: false })
lenis.raf(time)    // вызывать в requestAnimationFrame loop
lenis.destroy()    // cleanup при unmount
```

### React Router v7
```tsx
useNavigate()           → navigate(path, { state })
useLocation()           → { pathname, state }
useParams<{ slug }>()   → { slug }
<Link to={path} state={{ scrollTo: 'section' }}>
<Routes><Route path="/" element={<Page />} /></Routes>
<Navigate to="/" replace />
```

### vite-imagetools
```typescript
import img from './photo.jpg?format=webp&quality=85'    // → string (URL)
import avif from './photo.jpg?format=avif&quality=80'
// Форматы: webp, avif, png. Параметры: format, quality, width, height
```

## 13. Project Conventions

- **Язык:** русский для всего UI и пользовательского текста
- **ESM:** `"type": "module"` в package.json
- **TypeScript:** strict, noUnusedLocals, noUnusedParameters, noFallthroughCasesInSwitch
- **Шрифты:** self-hosted WOFF2: Unbounded (--font-heading, 400/700) + SF Pro Display (--font-body, 400-700)
- **CSS:** `index.css` → imports `tailwind.css` + `theme.css`. Анимации marquee/shimmer в index.css
- **Изображения:** local JPEG + WebP/AVIF через vite-imagetools, ~1600px wide, quality 80–85
- **OG images:** `public/` — og-image.jpg, og-web.jpg, og-systems.jpg, og-apps.jpg (1200×630)
- **SEO:** sitemap.xml (6 страниц), robots.txt, JSON-LD в index.html (LocalBusiness, WebSite, FAQPage), dynamic JSON-LD через useSEO
- **Аналитика:** YM + Clarity + VK Pixel — все закомментированы в index.html, ожидают реальных ID
- **Контакты:** denisdikarvit@gmail.com, +7 (921) 109-54-30, ИП Сторожев Денис Максимович
- **Anti-spam:** honeypot `_hp` + rate limiter 5/час/IP + SHA256 dedup 5 мин
- **Cookie:** `localStorage` ключ `cookies_accepted`
- **A11y:** skip-to-content, focusRingClass, prefers-reduced-motion, aria-expanded, keyboard nav
