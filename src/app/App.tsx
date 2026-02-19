import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/app/components/Navbar';
import { HomePage } from '@/app/pages/HomePage';
import { ServiceDetailPage } from '@/app/pages/ServiceDetailPage';
import { PrivacyPage } from '@/app/pages/PrivacyPage';
import { TermsPage } from '@/app/pages/TermsPage';
import { NotFoundPage } from '@/app/pages/NotFoundPage';
import { PageTransition } from '@/app/components/providers/PageTransition';
import { BackToTop } from '@/app/components/ui/BackToTop';
import { CookieBanner } from '@/app/components/ui/CookieBanner';

export default function App() {
  return (
    <div className="min-h-screen bg-[#0F0F11] overflow-x-hidden relative">
      {/* Skip to content — accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-[#CCFF00] focus:text-[#0F0F11] focus:rounded-full focus:font-bold focus:text-sm"
      >
        Перейти к содержимому
      </a>
      {/* Global Background Grid */}
      <div className="fixed inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none z-0"></div>
      <Navbar />
      <main id="main-content">
      <PageTransition>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services/:slug" element={<ServiceDetailPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </PageTransition>
      </main>
      <BackToTop />
      <CookieBanner />
    </div>
  );
}
