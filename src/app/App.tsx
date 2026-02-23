import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { PageTransition } from '@/app/components/providers/PageTransition';
import { BackToTop } from '@/app/components/ui/BackToTop';
import { CookieBanner } from '@/app/components/ui/CookieBanner';

const HomePage = lazy(() => import('@/app/pages/HomePage').then(m => ({ default: m.HomePage })));
const ServiceDetailPage = lazy(() => import('@/app/pages/ServiceDetailPage').then(m => ({ default: m.ServiceDetailPage })));
const PrivacyPage = lazy(() => import('@/app/pages/PrivacyPage').then(m => ({ default: m.PrivacyPage })));
const TermsPage = lazy(() => import('@/app/pages/TermsPage').then(m => ({ default: m.TermsPage })));
const NotFoundPage = lazy(() => import('@/app/pages/NotFoundPage').then(m => ({ default: m.NotFoundPage })));

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F0F11] overflow-x-hidden relative bg-grid">
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#CCFF00] focus:text-[#0F0F11] focus:rounded-full focus:font-bold focus:text-sm"
      >
        Перейти к содержимому
      </a>
      <Navbar />
      <main id="main-content">
      <PageTransition>
        <Suspense fallback={<div className="min-h-screen" />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services/:slug" element={<ServiceDetailPage />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </PageTransition>
      </main>
      <BackToTop />
      <CookieBanner />
    </div>
  );
}
